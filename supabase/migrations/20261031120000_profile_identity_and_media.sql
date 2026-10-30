-- Perfil: @username com regra única, data de nascimento (só para estatísticas de público),
-- foto de perfil, imagens nas questões do professor e categoria "questão" no suporte.

-- 1. Regra do @username -------------------------------------------------------
-- 3 a 24 caracteres: letras minúsculas sem acento, números e "_"; começa com letra.
-- Os usernames antigos que não seguem a regra continuam valendo até a pessoa trocar.
create or replace function private.is_valid_username(p_username text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select coalesce(p_username ~ '^[a-z][a-z0-9_]{2,23}$', false);
$$;

create or replace function public.username_available(p_username text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_valid_username(lower(btrim(p_username)))
    and not exists (
      select 1 from public.profiles p
      where lower(p.username) = lower(btrim(p_username))
        and p.id is distinct from (select auth.uid())
    );
$$;
revoke all on function public.username_available(text) from public;
grant execute on function public.username_available(text) to anon, authenticated;

-- 2. Dados privados do perfil -------------------------------------------------
-- Separados de profiles porque professores e gestores leem profiles dos alunos.
-- Só a própria pessoa lê; as estatísticas do admin são agregadas no servidor.
create table public.profile_private (
  user_id uuid primary key references auth.users(id) on delete cascade,
  birth_date date check (birth_date >= date '1900-01-01'),
  guardian_consent_at timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.profile_private enable row level security;
create policy profile_private_select_own on public.profile_private
  for select to authenticated using (user_id = (select auth.uid()));
revoke insert, update, delete on public.profile_private from anon, authenticated;

create or replace function private.age_on(p_birth date, p_day date)
returns integer
language sql
immutable
set search_path = ''
as $$
  select extract(year from age(p_day, p_birth))::integer;
$$;

-- Salva @username e data de nascimento da própria pessoa.
create or replace function public.update_profile_identity(p_username text, p_birth_date date, p_guardian_consent boolean default false)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  normalized text := lower(btrim(coalesce(p_username, '')));
  current_username text;
begin
  if uid is null then raise exception 'auth_required'; end if;
  select username into current_username from public.profiles where id = uid;

  if normalized <> '' and normalized is distinct from lower(current_username) then
    if not private.is_valid_username(normalized) then raise exception 'invalid_username'; end if;
    if exists (select 1 from public.profiles where lower(username) = normalized and id <> uid) then
      raise exception 'username_taken';
    end if;
    update public.profiles set username = normalized, updated_at = now() where id = uid;
  end if;

  if p_birth_date is not null then
    if p_birth_date > current_date or p_birth_date < date '1900-01-01' then raise exception 'invalid_birth_date'; end if;
    if private.age_on(p_birth_date, current_date) < 12 and not coalesce(p_guardian_consent, false) then
      raise exception 'guardian_consent_required';
    end if;
    insert into public.profile_private (user_id, birth_date, guardian_consent_at, updated_at)
    values (uid, p_birth_date, case when private.age_on(p_birth_date, current_date) < 12 then now() end, now())
    on conflict (user_id) do update
      set birth_date = excluded.birth_date,
          guardian_consent_at = coalesce(excluded.guardian_consent_at, public.profile_private.guardian_consent_at),
          updated_at = now();
  end if;
end;
$$;
revoke all on function public.update_profile_identity(text, date, boolean) from public;
grant execute on function public.update_profile_identity(text, date, boolean) to authenticated;
grant execute on function public.update_profile_identity(text, date, boolean) to service_role;

-- O cadastro grava @username e nascimento a partir dos metadados da conta.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  wanted text := nullif(lower(btrim(new.raw_user_meta_data ->> 'username')), '');
  birth date;
begin
  if wanted is not null and not private.is_valid_username(wanted) then wanted := null; end if;
  begin
    birth := nullif(new.raw_user_meta_data ->> 'birth_date', '')::date;
  exception when others then birth := null;
  end;
  if birth is not null and (birth > current_date or birth < date '1900-01-01') then birth := null; end if;

  begin
    insert into public.profiles (id, email, username, full_name, avatar_url)
    values (
      new.id,
      lower(new.email),
      wanted,
      coalesce(nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1)),
      nullif(btrim(new.raw_user_meta_data ->> 'avatar_url'), '')
    );
  exception
    when unique_violation then
      insert into public.profiles (id, email, full_name)
      values (new.id, lower(new.email), coalesce(split_part(new.email, '@', 1), 'Usuário'));
  end;

  if birth is not null then
    insert into public.profile_private (user_id, birth_date, guardian_consent_at)
    values (
      new.id,
      birth,
      case when private.age_on(birth, current_date) < 12
             and coalesce((new.raw_user_meta_data ->> 'guardian_consent')::boolean, false) then now() end
    );
  end if;
  return new;
end;
$$;

-- 3. Foto de perfil -----------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy avatars_insert_own on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy avatars_update_own on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy avatars_delete_own on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- A foto só pode apontar para a pasta da própria pessoa no bucket de fotos.
create or replace function private.guard_avatar_url()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.avatar_url is distinct from old.avatar_url and new.avatar_url is not null
     and position('/storage/v1/object/public/avatars/' || new.id::text || '/' in new.avatar_url) = 0 then
    raise exception 'invalid_avatar_url';
  end if;
  return new;
end;
$$;
create trigger profiles_guard_avatar_url before update of avatar_url on public.profiles
  for each row execute function private.guard_avatar_url();

-- 4. Imagens nas questões do professor -----------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('question-images', 'question-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy question_images_insert_teacher on storage.objects for insert to authenticated
  with check (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (select 1 from public.teacher_accounts ta where ta.user_id = (select auth.uid()))
  );
create policy question_images_delete_own on storage.objects for delete to authenticated
  using (bucket_id = 'question-images' and (storage.foldername(name))[1] = (select auth.uid())::text);

alter table public.teacher_questions
  add column image_path text check (image_path is null or image_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,120}$');

drop function public.create_owned_teacher_question(text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility);
create function public.create_owned_teacher_question(p_statement text, p_alternatives jsonb, p_correct_answer jsonb, p_explanation text, p_subject text, p_topic text, p_difficulty text, p_question_type text, p_visibility public.teacher_question_visibility default 'private', p_image_path text default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare uid uuid := (select auth.uid()); result uuid;
begin
  if uid is null or not exists(select 1 from public.teacher_accounts where user_id = uid) then raise exception 'teacher_account_required'; end if;
  if p_question_type not in ('multiple_choice','true_false') then raise exception 'invalid_question_type'; end if;
  if p_difficulty is not null and p_difficulty not in ('iniciante','medio','avancado') then raise exception 'invalid_difficulty'; end if;
  if char_length(btrim(p_statement)) < 5 then raise exception 'invalid_question_statement'; end if;
  if p_question_type = 'multiple_choice' and (jsonb_typeof(p_alternatives) <> 'array' or jsonb_array_length(p_alternatives) < 2 or not p_alternatives @> jsonb_build_array(p_correct_answer)) then raise exception 'invalid_question_alternatives'; end if;
  if nullif(p_image_path, '') is not null and split_part(p_image_path, '/', 1) <> uid::text then raise exception 'invalid_question_image'; end if;
  insert into public.teacher_questions(owner_id,visibility,statement,alternatives,correct_answer,explanation,subject,topic,difficulty,question_type,image_path)
  values(uid,p_visibility,btrim(p_statement),case when p_question_type='multiple_choice' then p_alternatives else null end,p_correct_answer,nullif(btrim(p_explanation),''),nullif(btrim(p_subject),''),nullif(btrim(p_topic),''),p_difficulty,p_question_type,nullif(p_image_path,''))
  returning id into result;
  return result;
end;
$$;
revoke all on function public.create_owned_teacher_question(text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) from public;
grant execute on function public.create_owned_teacher_question(text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) to authenticated;
grant execute on function public.create_owned_teacher_question(text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) to service_role;

drop function public.update_owned_teacher_question(uuid, text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility);
create function public.update_owned_teacher_question(p_question_id uuid, p_statement text, p_alternatives jsonb, p_correct_answer jsonb, p_explanation text, p_subject text, p_topic text, p_difficulty text, p_question_type text, p_visibility public.teacher_question_visibility, p_image_path text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_question_type not in ('multiple_choice','true_false') then raise exception 'invalid_question_type'; end if;
  if p_difficulty is not null and p_difficulty not in ('iniciante','medio','avancado') then raise exception 'invalid_difficulty'; end if;
  if p_question_type='multiple_choice' and (jsonb_typeof(p_alternatives)<>'array' or jsonb_array_length(p_alternatives)<2 or not p_alternatives @> jsonb_build_array(p_correct_answer)) then raise exception 'invalid_question_alternatives'; end if;
  if nullif(p_image_path, '') is not null and split_part(p_image_path, '/', 1) <> (select auth.uid())::text then raise exception 'invalid_question_image'; end if;
  update public.teacher_questions set visibility=p_visibility,statement=btrim(p_statement),alternatives=case when p_question_type='multiple_choice' then p_alternatives else null end,correct_answer=p_correct_answer,explanation=nullif(btrim(p_explanation),''),subject=nullif(btrim(p_subject),''),topic=nullif(btrim(p_topic),''),difficulty=p_difficulty,question_type=p_question_type,image_path=nullif(p_image_path,''),updated_at=now()
  where id=p_question_id and owner_id=(select auth.uid()) and archived_at is null;
  if not found then raise exception 'question_owner_required'; end if;
end;
$$;
revoke all on function public.update_owned_teacher_question(uuid, text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) from public;
grant execute on function public.update_owned_teacher_question(uuid, text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) to authenticated;
grant execute on function public.update_owned_teacher_question(uuid, text, jsonb, jsonb, text, text, text, text, text, public.teacher_question_visibility, text) to service_role;

drop function public.get_owned_teacher_questions();
create function public.get_owned_teacher_questions()
returns table(id uuid, visibility public.teacher_question_visibility, statement text, alternatives jsonb, correct_answer jsonb, explanation text, subject text, topic text, difficulty text, question_type text, created_at timestamptz, updated_at timestamptz, archived_at timestamptz, image_path text)
language sql
stable
security definer
set search_path = ''
as $$
  select q.id,q.visibility,q.statement,q.alternatives,q.correct_answer,q.explanation,
    q.subject,q.topic,q.difficulty,q.question_type,q.created_at,q.updated_at,q.archived_at,q.image_path
  from public.teacher_questions q
  where q.owner_id = (select auth.uid())
  order by q.archived_at nulls first, q.updated_at desc;
$$;
revoke all on function public.get_owned_teacher_questions() from public;
grant execute on function public.get_owned_teacher_questions() to authenticated;
grant execute on function public.get_owned_teacher_questions() to service_role;

-- As fotos entram nas cópias (snapshots) que simulados e atividades guardam.
create or replace function private.snapshot_teacher_exam_question()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.teacher_question_id is not null and new.question_snapshot is null then
    select jsonb_build_object(
      'statement', q.statement,
      'alternatives', q.alternatives,
      'correct_answer', q.correct_answer,
      'explanation', q.explanation,
      'subject', q.subject,
      'topic', q.topic,
      'difficulty', q.difficulty,
      'question_type', q.question_type,
      'image_path', q.image_path
    )
    into new.question_snapshot
    from public.teacher_questions q
    where q.id = new.teacher_question_id;
  end if;
  return new;
end;
$$;

create or replace function private.snapshot_teacher_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'published' and not exists (
    select 1 from public.teacher_activity_questions aq where aq.activity_id = new.id
  ) then
    insert into public.teacher_activity_questions(activity_id, position, source_position, question_snapshot)
    select new.id, eq.position, eq.position,
      coalesce(eq.question_snapshot, jsonb_build_object(
        'statement', q.statement,
        'alternatives', q.alternatives,
        'correct_answer', q.correct_answer,
        'explanation', q.explanation,
        'subject', q.subject,
        'topic', q.topic,
        'difficulty', q.difficulty,
        'question_type', q.question_type,
        'image_path', q.image_path
      ))
    from public.teacher_exam_questions eq
    left join public.teacher_questions q on q.id = eq.teacher_question_id
    where eq.exam_id = new.exam_id
    order by eq.position;
    if not found then raise exception 'activity_has_no_questions'; end if;
  end if;
  return new;
end;
$$;

drop function public.get_teacher_attempt_questions(uuid);
create function public.get_teacher_attempt_questions(p_attempt_id uuid)
returns table(display_position integer, source_position integer, statement text, alternatives jsonb, question_type text, image_path text)
language sql
stable
security definer
set search_path = ''
as $$
  with allowed as (
    select at.id,at.activity_id,a.shuffle_questions,a.shuffle_alternatives
    from public.teacher_activity_attempts at
    join public.teacher_class_activities a on a.id=at.activity_id
    where at.id=p_attempt_id and at.student_id=(select auth.uid()) and at.status='in_progress'
  ), ordered as (
    select aq.*,
      row_number() over(order by case when al.shuffle_questions then md5(al.id::text||':'||aq.position::text) end,aq.position)::integer as display_position,
      al.id as attempt_id,al.shuffle_alternatives
    from allowed al join public.teacher_activity_questions aq on aq.activity_id=al.activity_id
  )
  select o.display_position,o.source_position,o.question_snapshot->>'statement',
    case when o.shuffle_alternatives then (
      select jsonb_agg(value order by md5(o.attempt_id::text||':'||o.source_position::text||':'||value::text))
      from jsonb_array_elements(coalesce(o.question_snapshot->'alternatives','[]'::jsonb))
    ) else o.question_snapshot->'alternatives' end,
    coalesce(o.question_snapshot->>'question_type',o.question_snapshot->>'type'),
    nullif(o.question_snapshot->>'image_path','')
  from ordered o order by o.display_position;
$$;
revoke all on function public.get_teacher_attempt_questions(uuid) from public;
grant execute on function public.get_teacher_attempt_questions(uuid) to authenticated;
grant execute on function public.get_teacher_attempt_questions(uuid) to service_role;

drop function public.get_teacher_activity_questions(uuid);
create function public.get_teacher_activity_questions(p_activity_id uuid)
returns table("position" integer, statement text, alternatives jsonb, question_type text, image_path text)
language sql
stable
security definer
set search_path = ''
as $$
  select
    eq.position,
    coalesce(eq.question_snapshot ->> 'statement', q.statement) as statement,
    coalesce(eq.question_snapshot -> 'alternatives', q.alternatives) as alternatives,
    coalesce(eq.question_snapshot ->> 'question_type', eq.question_snapshot ->> 'type', q.question_type) as question_type,
    coalesce(nullif(eq.question_snapshot ->> 'image_path', ''), q.image_path) as image_path
  from public.teacher_class_activities a
  join public.teacher_class_members m
    on m.class_id = a.class_id
   and m.user_id = (select auth.uid())
   and m.status = 'active'
  join public.teacher_exam_questions eq on eq.exam_id = a.exam_id
  left join public.teacher_questions q on q.id = eq.teacher_question_id
  where a.id = p_activity_id
    and a.status = 'published'
  order by eq.position;
$$;
revoke all on function public.get_teacher_activity_questions(uuid) from public;
grant execute on function public.get_teacher_activity_questions(uuid) to authenticated;
grant execute on function public.get_teacher_activity_questions(uuid) to service_role;

-- 5. Reportar questão pelo suporte ----------------------------------------------
alter table public.support_tickets drop constraint if exists support_tickets_category_check;
alter table public.support_tickets add constraint support_tickets_category_check
  check (category in ('account', 'study', 'technical', 'billing', 'other', 'question'));

-- 6. Fotos nas turmas: professor vê a foto dos alunos; aluno vê a do professor ----
drop function public.get_teacher_class_members(uuid);
create function public.get_teacher_class_members(p_class_id uuid)
returns table(user_id uuid, status public.teacher_membership_status, source text, requested_at timestamptz, full_name text, username text, avatar_url text)
language sql
stable
security definer
set search_path = ''
as $$
  select m.user_id,m.status,m.source,m.requested_at,p.full_name,p.username,p.avatar_url
  from public.teacher_class_members m join public.profiles p on p.id=m.user_id
  where m.class_id=p_class_id and (select private.is_teacher_class_owner(p_class_id))
  order by m.requested_at;
$$;
revoke all on function public.get_teacher_class_members(uuid) from public;
grant execute on function public.get_teacher_class_members(uuid) to authenticated;
grant execute on function public.get_teacher_class_members(uuid) to service_role;

drop function public.get_teacher_class_for_member(uuid);
create function public.get_teacher_class_for_member(p_class_id uuid)
returns table(id uuid, public_name text, description text, subject text, school_name text, student_limit integer, teacher_name text, teacher_avatar_url text)
language sql
stable
security definer
set search_path = ''
as $$
  select c.id,c.public_name,c.description,c.subject,c.school_name,c.student_limit,p.full_name,p.avatar_url
  from public.teacher_classes c join public.profiles p on p.id=c.owner_id
  where c.id=p_class_id and (c.owner_id=(select auth.uid()) or (select private.is_teacher_class_member(c.id)) or exists(select 1 from public.teacher_class_members m where m.class_id=c.id and m.user_id=(select auth.uid()) and m.status='pending'));
$$;
revoke all on function public.get_teacher_class_for_member(uuid) from public;
grant execute on function public.get_teacher_class_for_member(uuid) to authenticated;
grant execute on function public.get_teacher_class_for_member(uuid) to service_role;
