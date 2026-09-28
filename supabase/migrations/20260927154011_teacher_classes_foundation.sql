-- NabuLab Professores + Turmas foundation.
-- This domain deliberately does not depend on the legacy institutional model.

create type public.teacher_plan as enum ('free', 'basic', 'intermediate', 'advanced');
create type public.teacher_class_visibility as enum ('private', 'unlisted', 'public_approval');
create type public.teacher_class_status as enum ('active', 'inactive');
create type public.teacher_membership_status as enum ('pending', 'active', 'rejected', 'removed');
create type public.teacher_invite_status as enum ('pending', 'accepted', 'rejected', 'revoked', 'expired');
create type public.teacher_question_visibility as enum ('private', 'shared');
create type public.teacher_activity_status as enum ('draft', 'published', 'closed');
create type public.teacher_attempt_status as enum ('assigned', 'in_progress', 'submitted');

create table public.teacher_plan_limits (
  plan public.teacher_plan primary key,
  active_classes integer check (active_classes is null or active_classes > 0),
  students_per_class integer check (students_per_class is null or students_per_class > 0),
  exams_per_week integer check (exams_per_week is null or exams_per_week > 0),
  features jsonb not null default '{}'::jsonb check (jsonb_typeof(features) = 'object')
);

insert into public.teacher_plan_limits (plan, active_classes, students_per_class, exams_per_week, features) values
  ('free', 1, 40, 2, '{"own_questions":true,"share_questions":true,"share_exams":true,"activities":true,"class_grades":true,"collective_charts":true,"individual_charts":true}'::jsonb),
  ('basic', null, null, null, '{}'::jsonb),
  ('intermediate', null, null, null, '{}'::jsonb),
  ('advanced', null, null, null, '{}'::jsonb);

create table public.teacher_accounts (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  plan public.teacher_plan not null default 'free',
  activated_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teacher_classes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.teacher_accounts(user_id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 2 and 120),
  public_name text not null check (char_length(btrim(public_name)) between 2 and 120),
  description text check (description is null or char_length(description) <= 600),
  school_name text check (school_name is null or char_length(school_name) <= 160),
  subject text check (subject is null or char_length(subject) <= 80),
  status public.teacher_class_status not null default 'active',
  visibility public.teacher_class_visibility not null default 'private',
  student_limit integer not null default 40 check (student_limit between 1 and 500),
  access_code text unique check (access_code is null or access_code=upper(access_code)),
  access_code_enabled boolean not null default true,
  join_token uuid not null default gen_random_uuid() unique,
  join_link_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index teacher_classes_owner_idx on public.teacher_classes(owner_id, status, created_at desc);
create index teacher_classes_search_idx on public.teacher_classes(visibility, status);

create table public.teacher_class_members (
  class_id uuid not null references public.teacher_classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status public.teacher_membership_status not null default 'pending',
  source text not null check (source in ('invite', 'email', 'code', 'link', 'search')),
  requested_at timestamptz not null default now(),
  joined_at timestamptz,
  decided_at timestamptz,
  removed_at timestamptz,
  primary key (class_id, user_id)
);
create index teacher_class_members_user_idx on public.teacher_class_members(user_id, status, class_id);
create index teacher_class_members_class_idx on public.teacher_class_members(class_id, status, requested_at);

create table public.teacher_class_invites (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.teacher_classes(id) on delete cascade,
  invitee_user_id uuid references public.profiles(id) on delete cascade,
  email text,
  token uuid not null default gen_random_uuid() unique,
  status public.teacher_invite_status not null default 'pending',
  expires_at timestamptz not null default (now() + interval '14 days'),
  created_by uuid not null references public.profiles(id) on delete cascade,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  constraint teacher_class_invites_target check (invitee_user_id is not null or email is not null),
  constraint teacher_class_invites_email check (email is null or email = lower(btrim(email)))
);
create index teacher_class_invites_target_user_idx on public.teacher_class_invites(invitee_user_id, status, expires_at);
create index teacher_class_invites_target_email_idx on public.teacher_class_invites(lower(email), status, expires_at) where email is not null;
create index teacher_class_invites_class_idx on public.teacher_class_invites(class_id, status, created_at desc);
create unique index teacher_class_invites_pending_user_idx on public.teacher_class_invites(class_id,invitee_user_id) where status='pending' and invitee_user_id is not null;
create unique index teacher_class_invites_pending_email_idx on public.teacher_class_invites(class_id,email) where status='pending' and email is not null;

create table public.teacher_questions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.teacher_accounts(user_id) on delete cascade,
  visibility public.teacher_question_visibility not null default 'private',
  statement text not null check (char_length(btrim(statement)) >= 5),
  alternatives jsonb,
  correct_answer jsonb not null,
  explanation text,
  subject text,
  topic text,
  difficulty text check (difficulty is null or difficulty in ('iniciante', 'medio', 'avancado')),
  question_type text not null check (question_type in ('multiple_choice', 'true_false')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index teacher_questions_owner_idx on public.teacher_questions(owner_id, created_at desc);

create table public.teacher_exams (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.teacher_accounts(user_id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 3 and 160),
  description text check (description is null or char_length(description) <= 1000),
  is_shared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index teacher_exams_owner_week_idx on public.teacher_exams(owner_id, created_at desc);

create table public.teacher_exam_questions (
  exam_id uuid not null references public.teacher_exams(id) on delete cascade,
  position integer not null check (position > 0),
  bank_question_id text,
  teacher_question_id uuid references public.teacher_questions(id) on delete restrict,
  question_snapshot jsonb,
  primary key (exam_id, position),
  constraint teacher_exam_question_source check (
    num_nonnulls(bank_question_id, teacher_question_id) = 1
  )
);
create index teacher_exam_questions_teacher_question_idx on public.teacher_exam_questions(teacher_question_id) where teacher_question_id is not null;

create table public.teacher_class_activities (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.teacher_classes(id) on delete cascade,
  exam_id uuid not null references public.teacher_exams(id) on delete restrict,
  assigned_by uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 3 and 160),
  instructions text,
  status public.teacher_activity_status not null default 'draft',
  opens_at timestamptz,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint teacher_activity_dates check (due_at is null or opens_at is null or due_at > opens_at)
);
create index teacher_class_activities_class_idx on public.teacher_class_activities(class_id, status, due_at);
create index teacher_class_activities_exam_idx on public.teacher_class_activities(exam_id);

create table public.teacher_activity_attempts (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.teacher_class_activities(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status public.teacher_attempt_status not null default 'assigned',
  started_at timestamptz,
  submitted_at timestamptz,
  correct_count integer check (correct_count is null or correct_count >= 0),
  total_questions integer check (total_questions is null or total_questions >= 0),
  score numeric(5,2) check (score is null or score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (activity_id, student_id)
);
create index teacher_activity_attempts_student_idx on public.teacher_activity_attempts(student_id, status, created_at desc);

create table public.teacher_activity_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.teacher_activity_attempts(id) on delete cascade,
  question_position integer not null check (question_position > 0),
  answer jsonb,
  is_correct boolean,
  answered_at timestamptz,
  unique (attempt_id, question_position)
);

create function private.is_teacher_class_owner(p_class_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.teacher_classes c where c.id = p_class_id and c.owner_id = (select auth.uid()));
$$;

create function private.is_teacher_class_member(p_class_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.teacher_class_members m where m.class_id = p_class_id and m.user_id = (select auth.uid()) and m.status = 'active');
$$;

create function private.can_view_teacher_attempt(p_attempt_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.teacher_activity_attempts a
    join public.teacher_class_activities ca on ca.id = a.activity_id
    join public.teacher_classes c on c.id = ca.class_id
    where a.id = p_attempt_id and (a.student_id = (select auth.uid()) or c.owner_id = (select auth.uid()))
  );
$$;

create function private.is_teacher_invitee(p_invite_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.teacher_class_invites i
    join public.profiles p on p.id=(select auth.uid())
    where i.id=p_invite_id and (i.invitee_user_id=p.id or i.email=lower(p.email))
  );
$$;

create function private.can_use_teacher_question(p_question_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.teacher_questions q
    where q.id=p_question_id and (q.owner_id=(select auth.uid()) or (q.visibility='shared' and exists(select 1 from public.teacher_accounts ta where ta.user_id=(select auth.uid()))))
  );
$$;

create function private.can_assign_teacher_exam(p_exam_id uuid,p_class_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.teacher_exams e where e.id=p_exam_id and e.owner_id=(select auth.uid()))
    and exists(select 1 from public.teacher_classes c where c.id=p_class_id and c.owner_id=(select auth.uid()));
$$;

revoke all on function private.is_teacher_class_owner(uuid), private.is_teacher_class_member(uuid), private.can_view_teacher_attempt(uuid),private.is_teacher_invitee(uuid),private.can_use_teacher_question(uuid),private.can_assign_teacher_exam(uuid,uuid) from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_teacher_class_owner(uuid), private.is_teacher_class_member(uuid), private.can_view_teacher_attempt(uuid),private.is_teacher_invitee(uuid),private.can_use_teacher_question(uuid),private.can_assign_teacher_exam(uuid,uuid) to authenticated;

create function public.activate_teacher_account()
returns public.teacher_accounts language plpgsql security definer set search_path = '' as $$
declare result public.teacher_accounts;
begin
  if (select auth.uid()) is null then raise exception 'authentication_required'; end if;
  insert into public.teacher_accounts(user_id) values ((select auth.uid())) on conflict (user_id) do nothing;
  select * into result from public.teacher_accounts where user_id = (select auth.uid());
  return result;
end;
$$;

create function private.generate_teacher_class_code(p_name text)
returns text language plpgsql volatile security definer set search_path = '' as $$
declare prefix text; candidate text;
begin
  prefix := upper(regexp_replace(coalesce(p_name, 'TURMA'), '[^A-Za-z0-9]+', '', 'g'));
  prefix := coalesce(nullif(left(prefix, 8), ''), 'TURMA');
  loop
    candidate := prefix || '-' || upper(substr(encode(extensions.gen_random_bytes(8), 'hex'), 1, 12));
    exit when not exists (select 1 from public.teacher_classes where access_code = candidate);
  end loop;
  return candidate;
end;
$$;

revoke all on function private.generate_teacher_class_code(text) from public, anon, authenticated;

create function private.normalize_teacher_answer(p_value jsonb)
returns text language sql immutable set search_path = '' as $$
  select case lower(btrim(trim(both '"' from coalesce(p_value::text,''))))
    when 'v' then 'true' when 'verdadeiro' then 'true' when 'true' then 'true'
    when 'f' then 'false' when 'falso' then 'false' when 'false' then 'false'
    else lower(btrim(trim(both '"' from coalesce(p_value::text,''))))
  end;
$$;

create function private.create_teacher_join_request(p_class_id uuid,p_source text)
returns public.teacher_membership_status language plpgsql security invoker set search_path = '' as $$
declare uid uuid := (select auth.uid()); result public.teacher_membership_status;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if p_source not in ('code','link','search') then raise exception 'invalid_join_source'; end if;
  insert into public.teacher_class_members(class_id,user_id,status,source) values(p_class_id,uid,'pending',p_source)
  on conflict(class_id,user_id) do update set
    status=case when public.teacher_class_members.status='active' then 'active'::public.teacher_membership_status else 'pending'::public.teacher_membership_status end,
    source=case when public.teacher_class_members.status='active' then public.teacher_class_members.source else excluded.source end,
    requested_at=case when public.teacher_class_members.status='active' then public.teacher_class_members.requested_at else now() end,
    decided_at=case when public.teacher_class_members.status='active' then public.teacher_class_members.decided_at else null end,
    removed_at=case when public.teacher_class_members.status='active' then public.teacher_class_members.removed_at else null end
  returning status into result;
  return result;
end;
$$;

revoke all on function private.normalize_teacher_answer(jsonb),private.create_teacher_join_request(uuid,text) from public,anon,authenticated;

create function public.create_teacher_class(
  p_name text, p_public_name text, p_description text default null,
  p_school_name text default null, p_subject text default null,
  p_visibility public.teacher_class_visibility default 'private'
) returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); account public.teacher_accounts; limits public.teacher_plan_limits; result uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  insert into public.teacher_accounts(user_id) values (uid) on conflict (user_id) do nothing;
  select * into account from public.teacher_accounts where user_id = uid for update;
  select * into limits from public.teacher_plan_limits where plan = account.plan;
  if limits.active_classes is not null and (select count(*) from public.teacher_classes where owner_id = uid and status = 'active') >= limits.active_classes then
    raise exception 'teacher_active_class_limit_reached';
  end if;
  insert into public.teacher_classes(owner_id,name,public_name,description,school_name,subject,visibility,student_limit,access_code,access_code_enabled,join_link_enabled)
  values(uid,btrim(p_name),btrim(p_public_name),nullif(btrim(p_description),''),nullif(btrim(p_school_name),''),nullif(btrim(p_subject),''),p_visibility,coalesce(limits.students_per_class,500),private.generate_teacher_class_code(p_public_name),p_visibility<>'private',p_visibility<>'private') returning id into result;
  return result;
end;
$$;

create function public.create_teacher_exam(p_title text, p_description text default null, p_is_shared boolean default false)
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); account public.teacher_accounts; limits public.teacher_plan_limits; result uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select * into account from public.teacher_accounts where user_id = uid for update;
  if not found then raise exception 'teacher_account_required'; end if;
  select * into limits from public.teacher_plan_limits where plan = account.plan;
  if limits.exams_per_week is not null and (select count(*) from public.teacher_exams where owner_id=uid and created_at >= date_trunc('week', now())) >= limits.exams_per_week then
    raise exception 'teacher_weekly_exam_limit_reached';
  end if;
  insert into public.teacher_exams(owner_id,title,description,is_shared) values(uid,btrim(p_title),nullif(btrim(p_description),''),coalesce(p_is_shared,false)) returning id into result;
  return result;
end;
$$;

create function public.search_teacher_classes(p_query text default '')
returns table(id uuid, public_name text, teacher_name text, school_name text, subject text, description text, student_count bigint, student_limit integer)
language sql stable security definer set search_path = '' as $$
  select c.id,c.public_name,p.full_name,c.school_name,c.subject,c.description,
    (select count(*) from public.teacher_class_members m where m.class_id=c.id and m.status='active'),c.student_limit
  from public.teacher_classes c join public.profiles p on p.id=c.owner_id
  where c.status='active' and c.visibility='public_approval'
    and (coalesce(btrim(p_query),'')='' or concat_ws(' ',c.public_name,p.full_name,c.school_name,c.subject) ilike '%'||btrim(p_query)||'%')
  order by c.public_name limit 50;
$$;

create function public.preview_teacher_class_by_token(p_token uuid)
returns table(id uuid, public_name text, teacher_name text, school_name text, subject text, description text)
language sql stable security definer set search_path = '' as $$
  select c.id,c.public_name,p.full_name,c.school_name,c.subject,c.description
  from public.teacher_classes c join public.profiles p on p.id=c.owner_id
  where c.join_token=p_token and c.join_link_enabled and c.status='active' and c.visibility<>'private'
  limit 1;
$$;

create function public.get_owned_teacher_class(p_class_id uuid)
returns table(id uuid,name text,public_name text,description text,school_name text,subject text,status public.teacher_class_status,visibility public.teacher_class_visibility,student_limit integer,access_code text,access_code_enabled boolean,join_token uuid,join_link_enabled boolean)
language sql stable security definer set search_path = '' as $$
  select c.id,c.name,c.public_name,c.description,c.school_name,c.subject,c.status,c.visibility,c.student_limit,c.access_code,c.access_code_enabled,c.join_token,c.join_link_enabled
  from public.teacher_classes c where c.id=p_class_id and c.owner_id=(select auth.uid());
$$;

create function public.get_teacher_class_members(p_class_id uuid)
returns table(user_id uuid,status public.teacher_membership_status,source text,requested_at timestamptz,full_name text,username text)
language sql stable security definer set search_path = '' as $$
  select m.user_id,m.status,m.source,m.requested_at,p.full_name,p.username
  from public.teacher_class_members m join public.profiles p on p.id=m.user_id
  where m.class_id=p_class_id and (select private.is_teacher_class_owner(p_class_id))
  order by m.requested_at;
$$;

create function public.get_teacher_class_invites(p_class_id uuid)
returns table(id uuid,email text,status public.teacher_invite_status,expires_at timestamptz,full_name text,username text)
language sql stable security definer set search_path = '' as $$
  select i.id,i.email,i.status,i.expires_at,p.full_name,p.username
  from public.teacher_class_invites i left join public.profiles p on p.id=i.invitee_user_id
  where i.class_id=p_class_id and (select private.is_teacher_class_owner(p_class_id))
  order by i.created_at desc;
$$;

create function public.get_teacher_class_attempts(p_class_id uuid)
returns table(id uuid,student_id uuid,score numeric,correct_count integer,total_questions integer,submitted_at timestamptz,student_name text,student_username text,activity_title text)
language sql stable security definer set search_path = '' as $$
  select at.id,at.student_id,at.score,at.correct_count,at.total_questions,at.submitted_at,p.full_name,p.username,a.title
  from public.teacher_activity_attempts at join public.teacher_class_activities a on a.id=at.activity_id join public.profiles p on p.id=at.student_id
  where a.class_id=p_class_id and at.status='submitted' and (select private.is_teacher_class_owner(p_class_id))
  order by at.submitted_at desc;
$$;

create function public.get_teacher_class_for_member(p_class_id uuid)
returns table(id uuid,public_name text,description text,subject text,school_name text,student_limit integer,teacher_name text)
language sql stable security definer set search_path = '' as $$
  select c.id,c.public_name,c.description,c.subject,c.school_name,c.student_limit,p.full_name
  from public.teacher_classes c join public.profiles p on p.id=c.owner_id
  where c.id=p_class_id and (c.owner_id=(select auth.uid()) or (select private.is_teacher_class_member(c.id)) or exists(select 1 from public.teacher_class_members m where m.class_id=c.id and m.user_id=(select auth.uid()) and m.status='pending'));
$$;

create function public.request_teacher_class_join(p_class_id uuid)
returns public.teacher_membership_status language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); c public.teacher_classes;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select * into c from public.teacher_classes where id=p_class_id and status='active' for update;
  if not found then raise exception 'class_not_found'; end if;
  if c.visibility <> 'public_approval' then raise exception 'class_not_public'; end if;
  return private.create_teacher_join_request(c.id,'search');
end;
$$;

create function public.join_teacher_class_by_code(p_code text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare c public.teacher_classes;
begin
  select * into c from public.teacher_classes where access_code=upper(btrim(p_code)) and access_code_enabled and status='active' and visibility<>'private';
  if not found then raise exception 'invalid_class_code'; end if;
  perform private.create_teacher_join_request(c.id,'code'); return c.id;
end;
$$;

create function public.join_teacher_class_by_token(p_token uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare c public.teacher_classes;
begin
  select * into c from public.teacher_classes where join_token=p_token and join_link_enabled and status='active' and visibility<>'private';
  if not found then raise exception 'invalid_class_link'; end if;
  perform private.create_teacher_join_request(c.id,'link'); return c.id;
end;
$$;

create function public.decide_teacher_class_member(p_class_id uuid,p_user_id uuid,p_approve boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare c public.teacher_classes; active_count bigint;
begin
  select * into c from public.teacher_classes where id=p_class_id and owner_id=(select auth.uid()) for update;
  if not found then raise exception 'class_owner_required'; end if;
  if p_approve then
    select count(*) into active_count from public.teacher_class_members where class_id=p_class_id and status='active';
    if active_count >= c.student_limit then raise exception 'teacher_class_student_limit_reached'; end if;
  end if;
  update public.teacher_class_members set status=case when p_approve then 'active'::public.teacher_membership_status else 'rejected'::public.teacher_membership_status end,
    joined_at=case when p_approve then now() else joined_at end,decided_at=now(),removed_at=null
  where class_id=p_class_id and user_id=p_user_id and status='pending';
end;
$$;

create function public.remove_teacher_class_member(p_class_id uuid,p_user_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_teacher_class_owner(p_class_id) then raise exception 'class_owner_required'; end if;
  update public.teacher_class_members set status='removed',removed_at=now(),decided_at=now() where class_id=p_class_id and user_id=p_user_id;
end;
$$;

create function public.create_teacher_class_invite(p_class_id uuid,p_identifier text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); target uuid; mail text; result uuid;
begin
  if not private.is_teacher_class_owner(p_class_id) then raise exception 'class_owner_required'; end if;
  select id into target from public.profiles where lower(username)=lower(btrim(p_identifier)) or lower(email)=lower(btrim(p_identifier)) limit 1;
  if target is null and position('@' in p_identifier)=0 then raise exception 'user_not_found'; end if;
  mail := case when position('@' in p_identifier)>0 then lower(btrim(p_identifier)) else null end;
  insert into public.teacher_class_invites(class_id,invitee_user_id,email,created_by) values(p_class_id,target,mail,uid) returning id into result;
  return result;
end;
$$;

create function public.respond_teacher_class_invite(p_invite_id uuid,p_accept boolean)
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); inv public.teacher_class_invites; c public.teacher_classes; active_count bigint;
begin
  select * into inv from public.teacher_class_invites where id=p_invite_id and status='pending' and expires_at>now() and (invitee_user_id=uid or email=(select lower(p.email) from public.profiles p where p.id=uid)) for update;
  if not found then raise exception 'invite_not_available'; end if;
  if p_accept then
    select * into c from public.teacher_classes where id=inv.class_id and status='active' for update;
    if not found then raise exception 'class_not_found'; end if;
    select count(*) into active_count from public.teacher_class_members where class_id=inv.class_id and status='active';
    if active_count >= c.student_limit then raise exception 'teacher_class_student_limit_reached'; end if;
    insert into public.teacher_class_members(class_id,user_id,status,source,joined_at,decided_at) values(inv.class_id,uid,'active','invite',now(),now()) on conflict(class_id,user_id) do update set status='active',source='invite',joined_at=now(),decided_at=now(),removed_at=null;
  end if;
  update public.teacher_class_invites set status=case when p_accept then 'accepted'::public.teacher_invite_status else 'rejected'::public.teacher_invite_status end,responded_at=now(),invitee_user_id=coalesce(inv.invitee_user_id,uid) where id=inv.id;
  return inv.class_id;
end;
$$;

create function public.regenerate_teacher_class_access(p_class_id uuid,p_kind text,p_enabled boolean default true)
returns text language plpgsql security definer set search_path = '' as $$
declare result text;
begin
  if not private.is_teacher_class_owner(p_class_id) then raise exception 'class_owner_required'; end if;
  if p_enabled and exists(select 1 from public.teacher_classes where id=p_class_id and visibility='private') then raise exception 'private_class_invite_only'; end if;
  if p_kind='code' then update public.teacher_classes set access_code=case when p_enabled then private.generate_teacher_class_code(public_name) else access_code end,access_code_enabled=p_enabled where id=p_class_id returning access_code into result;
  elsif p_kind='link' then update public.teacher_classes set join_token=case when p_enabled then gen_random_uuid() else join_token end,join_link_enabled=p_enabled where id=p_class_id returning join_token::text into result;
  else raise exception 'invalid_access_kind'; end if;
  return result;
end;
$$;

create function public.set_teacher_class_status(p_class_id uuid,p_status public.teacher_class_status)
returns void language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); account public.teacher_accounts; limits public.teacher_plan_limits;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select * into account from public.teacher_accounts where user_id=uid for update;
  if not found then raise exception 'teacher_account_required'; end if;
  if not exists(select 1 from public.teacher_classes where id=p_class_id and owner_id=uid) then raise exception 'class_owner_required'; end if;
  select * into limits from public.teacher_plan_limits where plan=account.plan;
  if p_status='active' and limits.active_classes is not null and
    (select count(*) from public.teacher_classes where owner_id=uid and status='active' and id<>p_class_id) >= limits.active_classes then
    raise exception 'teacher_active_class_limit_reached';
  end if;
  update public.teacher_classes set status=p_status,updated_at=now() where id=p_class_id and owner_id=uid;
end;
$$;

create function public.submit_teacher_activity(p_activity_id uuid,p_answers jsonb)
returns table(correct_count integer,total_questions integer,score numeric)
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := (select auth.uid()); activity public.teacher_class_activities; existing public.teacher_activity_attempts;
  question record; submitted jsonb; correct_total integer := 0; question_total integer := 0; result_score numeric(5,2); saved_attempt_id uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if jsonb_typeof(p_answers) <> 'object' then raise exception 'invalid_activity_answers'; end if;
  select a.* into activity from public.teacher_class_activities a
  where a.id=p_activity_id and a.status='published'
    and exists(select 1 from public.teacher_class_members m where m.class_id=a.class_id and m.user_id=uid and m.status='active')
  for update;
  if not found then raise exception 'activity_not_available'; end if;
  select * into existing from public.teacher_activity_attempts where activity_id=p_activity_id and student_id=uid for update;
  if found and existing.status='submitted' then raise exception 'activity_already_submitted'; end if;
  for question in
    select eq.position,q.correct_answer from public.teacher_exam_questions eq
    join public.teacher_questions q on q.id=eq.teacher_question_id
    where eq.exam_id=activity.exam_id order by eq.position
  loop
    question_total := question_total + 1;
    submitted := p_answers -> question.position::text;
    if private.normalize_teacher_answer(submitted)=private.normalize_teacher_answer(question.correct_answer) then correct_total := correct_total + 1; end if;
  end loop;
  if question_total=0 then raise exception 'activity_has_no_questions'; end if;
  result_score := round((correct_total::numeric/question_total::numeric)*100,2);
  insert into public.teacher_activity_attempts(activity_id,student_id,status,started_at,submitted_at,correct_count,total_questions,score)
  values(p_activity_id,uid,'submitted',coalesce(existing.started_at,now()),now(),correct_total,question_total,result_score)
  on conflict(activity_id,student_id) do update set status='submitted',submitted_at=excluded.submitted_at,correct_count=excluded.correct_count,total_questions=excluded.total_questions,score=excluded.score,updated_at=now()
  returning id into saved_attempt_id;
  insert into public.teacher_activity_answers(attempt_id,question_position,answer,is_correct,answered_at)
  select saved_attempt_id,eq.position,p_answers -> eq.position::text,
    private.normalize_teacher_answer(p_answers -> eq.position::text)=private.normalize_teacher_answer(q.correct_answer),now()
  from public.teacher_exam_questions eq join public.teacher_questions q on q.id=eq.teacher_question_id where eq.exam_id=activity.exam_id
  on conflict(attempt_id,question_position) do update set answer=excluded.answer,is_correct=excluded.is_correct,answered_at=excluded.answered_at;
  return query select correct_total,question_total,result_score;
end;
$$;

alter table public.teacher_plan_limits enable row level security;
alter table public.teacher_accounts enable row level security;
alter table public.teacher_classes enable row level security;
alter table public.teacher_class_members enable row level security;
alter table public.teacher_class_invites enable row level security;
alter table public.teacher_questions enable row level security;
alter table public.teacher_exams enable row level security;
alter table public.teacher_exam_questions enable row level security;
alter table public.teacher_class_activities enable row level security;
alter table public.teacher_activity_attempts enable row level security;
alter table public.teacher_activity_answers enable row level security;

create policy teacher_plan_limits_read on public.teacher_plan_limits for select to authenticated using (true);
create policy teacher_accounts_self on public.teacher_accounts for select to authenticated using (user_id=(select auth.uid()));
create policy teacher_classes_read on public.teacher_classes for select to authenticated using (owner_id=(select auth.uid()) or exists(select 1 from public.teacher_class_members m where m.class_id=id and m.user_id=(select auth.uid()) and m.status in ('pending','active')));
create policy teacher_classes_owner_update on public.teacher_classes for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
create policy teacher_members_read on public.teacher_class_members for select to authenticated using(user_id=(select auth.uid()) or (select private.is_teacher_class_owner(class_id)));
create policy teacher_invites_read on public.teacher_class_invites for select to authenticated using((select private.is_teacher_class_owner(class_id)) or (select private.is_teacher_invitee(id)));
create policy teacher_questions_read on public.teacher_questions for select to authenticated using(owner_id=(select auth.uid()) or (visibility='shared' and exists(select 1 from public.teacher_accounts ta where ta.user_id=(select auth.uid()))) or exists(select 1 from public.teacher_exam_questions eq join public.teacher_class_activities a on a.exam_id=eq.exam_id join public.teacher_class_members m on m.class_id=a.class_id where eq.teacher_question_id=id and a.status<>'draft' and m.user_id=(select auth.uid()) and m.status='active'));
create policy teacher_questions_owner_insert on public.teacher_questions for insert to authenticated with check(owner_id=(select auth.uid()) and exists(select 1 from public.teacher_accounts where user_id=(select auth.uid())));
create policy teacher_questions_owner_update on public.teacher_questions for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
create policy teacher_questions_owner_delete on public.teacher_questions for delete to authenticated using(owner_id=(select auth.uid()));
create policy teacher_exams_read on public.teacher_exams for select to authenticated using(owner_id=(select auth.uid()) or (is_shared and exists(select 1 from public.teacher_accounts ta where ta.user_id=(select auth.uid()))) or exists(select 1 from public.teacher_class_activities a join public.teacher_class_members m on m.class_id=a.class_id where a.exam_id=id and m.user_id=(select auth.uid()) and m.status='active'));
create policy teacher_exams_owner_update on public.teacher_exams for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
create policy teacher_exam_questions_read on public.teacher_exam_questions for select to authenticated using(exists(select 1 from public.teacher_exams e where e.id=exam_id and (e.owner_id=(select auth.uid()) or (e.is_shared and exists(select 1 from public.teacher_accounts ta where ta.user_id=(select auth.uid()))) or exists(select 1 from public.teacher_class_activities a join public.teacher_class_members m on m.class_id=a.class_id where a.exam_id=e.id and m.user_id=(select auth.uid()) and m.status='active'))));
create policy teacher_exam_questions_owner_insert on public.teacher_exam_questions for insert to authenticated with check(exists(select 1 from public.teacher_exams e where e.id=exam_id and e.owner_id=(select auth.uid())) and (teacher_question_id is null or (select private.can_use_teacher_question(teacher_question_id))));
create policy teacher_exam_questions_owner_delete on public.teacher_exam_questions for delete to authenticated using(exists(select 1 from public.teacher_exams e where e.id=exam_id and e.owner_id=(select auth.uid())));
create policy teacher_activities_read on public.teacher_class_activities for select to authenticated using((select private.is_teacher_class_owner(class_id)) or ((select private.is_teacher_class_member(class_id)) and status<>'draft'));
create policy teacher_activities_owner_insert on public.teacher_class_activities for insert to authenticated with check(assigned_by=(select auth.uid()) and (select private.can_assign_teacher_exam(exam_id,class_id)));
create policy teacher_activities_owner_update on public.teacher_class_activities for update to authenticated using((select private.is_teacher_class_owner(class_id))) with check((select private.is_teacher_class_owner(class_id)));
create policy teacher_attempts_read on public.teacher_activity_attempts for select to authenticated using(student_id=(select auth.uid()) or exists(select 1 from public.teacher_class_activities a where a.id=activity_id and (select private.is_teacher_class_owner(a.class_id))));
create policy teacher_answers_read on public.teacher_activity_answers for select to authenticated using((select private.can_view_teacher_attempt(attempt_id)));

revoke all on table public.teacher_plan_limits,public.teacher_accounts,public.teacher_classes,public.teacher_class_members,public.teacher_class_invites,public.teacher_questions,public.teacher_exams,public.teacher_exam_questions,public.teacher_class_activities,public.teacher_activity_attempts,public.teacher_activity_answers from anon,authenticated;
grant select on public.teacher_plan_limits,public.teacher_accounts,public.teacher_classes,public.teacher_class_members,public.teacher_class_invites,public.teacher_exams,public.teacher_class_activities,public.teacher_activity_attempts,public.teacher_activity_answers to authenticated;
grant select(id,owner_id,visibility,statement,alternatives,explanation,subject,topic,difficulty,question_type,created_at,updated_at) on public.teacher_questions to authenticated;
grant select(exam_id,position,bank_question_id,teacher_question_id) on public.teacher_exam_questions to authenticated;
grant update(name,public_name,description,school_name,subject,visibility) on public.teacher_classes to authenticated;
grant insert,update,delete on public.teacher_questions to authenticated;
grant update(title,description,is_shared) on public.teacher_exams to authenticated;
grant insert,delete on public.teacher_exam_questions to authenticated;
grant insert(class_id,exam_id,assigned_by,title,instructions,status,opens_at,due_at),update(title,instructions,status,opens_at,due_at) on public.teacher_class_activities to authenticated;

revoke all on function public.activate_teacher_account(),public.create_teacher_class(text,text,text,text,text,public.teacher_class_visibility),public.create_teacher_exam(text,text,boolean),public.search_teacher_classes(text),public.preview_teacher_class_by_token(uuid),public.get_owned_teacher_class(uuid),public.get_teacher_class_members(uuid),public.get_teacher_class_invites(uuid),public.get_teacher_class_attempts(uuid),public.get_teacher_class_for_member(uuid),public.request_teacher_class_join(uuid),public.join_teacher_class_by_code(text),public.join_teacher_class_by_token(uuid),public.decide_teacher_class_member(uuid,uuid,boolean),public.remove_teacher_class_member(uuid,uuid),public.create_teacher_class_invite(uuid,text),public.respond_teacher_class_invite(uuid,boolean),public.regenerate_teacher_class_access(uuid,text,boolean),public.set_teacher_class_status(uuid,public.teacher_class_status),public.submit_teacher_activity(uuid,jsonb) from public,anon,authenticated;
grant execute on function public.search_teacher_classes(text),public.preview_teacher_class_by_token(uuid) to anon,authenticated;
grant execute on function public.activate_teacher_account(),public.create_teacher_class(text,text,text,text,text,public.teacher_class_visibility),public.create_teacher_exam(text,text,boolean),public.get_owned_teacher_class(uuid),public.get_teacher_class_members(uuid),public.get_teacher_class_invites(uuid),public.get_teacher_class_attempts(uuid),public.get_teacher_class_for_member(uuid),public.request_teacher_class_join(uuid),public.join_teacher_class_by_code(text),public.join_teacher_class_by_token(uuid),public.decide_teacher_class_member(uuid,uuid,boolean),public.remove_teacher_class_member(uuid,uuid),public.create_teacher_class_invite(uuid,text),public.respond_teacher_class_invite(uuid,boolean),public.regenerate_teacher_class_access(uuid,text,boolean),public.set_teacher_class_status(uuid,public.teacher_class_status),public.submit_teacher_activity(uuid,jsonb) to authenticated;

-- Activity attempts are deliberately separate from exam_attempts and
-- consume_daily_exam_generation_quota. Teacher assignments never consume
-- Student Free quotas or personal exam limits.
