-- P2 — Conteúdo, simulados e atividades do NabuLab Professores.
-- Incremental and backwards compatible with every P1 row.

create type public.teacher_exam_status as enum ('draft', 'published');
create type public.teacher_result_policy as enum ('immediate', 'after_due', 'never');

alter table public.teacher_questions
  add column archived_at timestamptz;

alter table public.teacher_exams
  add column status public.teacher_exam_status not null default 'draft',
  add column published_at timestamptz;

-- P1 exams that were already used by a published activity were effectively
-- published. Preserve that meaning during the upgrade.
update public.teacher_exams e
set status = 'published', published_at = coalesce(e.updated_at, e.created_at)
where exists (
  select 1 from public.teacher_class_activities a
  where a.exam_id = e.id and a.status = 'published'
);

alter table public.teacher_class_activities
  add column max_attempts integer check (max_attempts is null or max_attempts > 0),
  add column shuffle_questions boolean not null default false,
  add column shuffle_alternatives boolean not null default false,
  add column show_score boolean not null default true,
  add column answer_policy public.teacher_result_policy not null default 'never';

alter table public.teacher_activity_attempts
  drop constraint teacher_activity_attempts_activity_id_student_id_key,
  add column attempt_number integer not null default 1 check (attempt_number > 0),
  add constraint teacher_activity_attempts_activity_student_number_key
    unique (activity_id, student_id, attempt_number);

create index teacher_activity_attempts_activity_student_idx
  on public.teacher_activity_attempts(activity_id, student_id, attempt_number desc);

create table public.teacher_activity_questions (
  activity_id uuid not null references public.teacher_class_activities(id) on delete cascade,
  position integer not null check (position > 0),
  source_position integer not null check (source_position > 0),
  question_snapshot jsonb not null check (jsonb_typeof(question_snapshot) = 'object'),
  primary key (activity_id, position)
);

alter table public.teacher_activity_questions enable row level security;
revoke all on table public.teacher_activity_questions from public, anon, authenticated;

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
        'question_type', q.question_type
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

revoke all on function private.snapshot_teacher_activity() from public, anon, authenticated;
drop trigger if exists snapshot_teacher_activity on public.teacher_class_activities;
create trigger snapshot_teacher_activity
after insert or update of status on public.teacher_class_activities
for each row execute function private.snapshot_teacher_activity();

-- Backfill P1 activities without changing their content.
insert into public.teacher_activity_questions(activity_id, position, source_position, question_snapshot)
select a.id, eq.position, eq.position,
  coalesce(eq.question_snapshot, jsonb_build_object(
    'statement', q.statement,
    'alternatives', q.alternatives,
    'correct_answer', q.correct_answer,
    'explanation', q.explanation,
    'subject', q.subject,
    'topic', q.topic,
    'difficulty', q.difficulty,
    'question_type', q.question_type
  ))
from public.teacher_class_activities a
join public.teacher_exam_questions eq on eq.exam_id = a.exam_id
left join public.teacher_questions q on q.id = eq.teacher_question_id
where not exists (
  select 1 from public.teacher_activity_questions aq where aq.activity_id = a.id
);

drop function public.get_owned_teacher_questions();
create function public.get_owned_teacher_questions()
returns table (
  id uuid, visibility public.teacher_question_visibility, statement text,
  alternatives jsonb, correct_answer jsonb, explanation text, subject text,
  topic text, difficulty text, question_type text, created_at timestamptz,
  updated_at timestamptz, archived_at timestamptz
)
language sql stable security definer set search_path = '' as $$
  select q.id,q.visibility,q.statement,q.alternatives,q.correct_answer,q.explanation,
    q.subject,q.topic,q.difficulty,q.question_type,q.created_at,q.updated_at,q.archived_at
  from public.teacher_questions q
  where q.owner_id = (select auth.uid())
  order by q.archived_at nulls first, q.updated_at desc;
$$;

create or replace function public.duplicate_teacher_question(p_question_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  insert into public.teacher_questions(
    owner_id,visibility,statement,alternatives,correct_answer,explanation,
    subject,topic,difficulty,question_type
  )
  select (select auth.uid()),visibility,statement || ' — cópia',alternatives,
    correct_answer,explanation,subject,topic,difficulty,question_type
  from public.teacher_questions
  where id=p_question_id and owner_id=(select auth.uid())
  returning id into result;
  if result is null then raise exception 'question_owner_required'; end if;
  return result;
end;
$$;

create or replace function public.set_teacher_question_archived(p_question_id uuid,p_archived boolean)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.teacher_questions
  set archived_at=case when p_archived then now() else null end,updated_at=now()
  where id=p_question_id and owner_id=(select auth.uid());
  if not found then raise exception 'question_owner_required'; end if;
end;
$$;

create or replace function public.set_teacher_exam_status(p_exam_id uuid,p_status public.teacher_exam_status)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_status='published' and not exists (
    select 1 from public.teacher_exam_questions eq where eq.exam_id=p_exam_id
  ) then raise exception 'exam_has_no_questions'; end if;
  update public.teacher_exams
  set status=p_status,published_at=case when p_status='published' then coalesce(published_at,now()) else null end,updated_at=now()
  where id=p_exam_id and owner_id=(select auth.uid());
  if not found then raise exception 'exam_owner_required'; end if;
end;
$$;

create or replace function public.duplicate_teacher_exam(p_exam_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  insert into public.teacher_exams(owner_id,title,description,is_shared,status)
  select (select auth.uid()),title || ' — cópia',description,false,'draft'
  from public.teacher_exams where id=p_exam_id and owner_id=(select auth.uid())
  returning id into result;
  if result is null then raise exception 'exam_owner_required'; end if;
  insert into public.teacher_exam_questions(exam_id,position,bank_question_id,teacher_question_id,question_snapshot)
  select result,position,bank_question_id,teacher_question_id,question_snapshot
  from public.teacher_exam_questions where exam_id=p_exam_id order by position;
  return result;
end;
$$;

create or replace function public.remove_teacher_exam_question(p_exam_id uuid,p_position integer)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.teacher_exams where id=p_exam_id and owner_id=(select auth.uid())) then
    raise exception 'exam_owner_required';
  end if;
  if exists(select 1 from public.teacher_exams where id=p_exam_id and status='published') then
    raise exception 'published_exam_requires_draft_copy';
  end if;
  delete from public.teacher_exam_questions where exam_id=p_exam_id and position=p_position;
  update public.teacher_exam_questions set position=position+1000000 where exam_id=p_exam_id and position>p_position;
  update public.teacher_exam_questions set position=position-1000001 where exam_id=p_exam_id and position>1000000;
end;
$$;

create or replace function public.move_teacher_exam_question(p_exam_id uuid,p_position integer,p_direction integer)
returns void language plpgsql security definer set search_path = '' as $$
declare target integer := p_position + p_direction;
begin
  if p_direction not in (-1,1) then raise exception 'invalid_direction'; end if;
  if not exists(select 1 from public.teacher_exams where id=p_exam_id and owner_id=(select auth.uid()) and status='draft') then
    raise exception 'draft_exam_owner_required';
  end if;
  if not exists(select 1 from public.teacher_exam_questions where exam_id=p_exam_id and position=target) then return; end if;
  update public.teacher_exam_questions set position=1000000000 where exam_id=p_exam_id and position=p_position;
  update public.teacher_exam_questions set position=p_position where exam_id=p_exam_id and position=target;
  update public.teacher_exam_questions set position=target where exam_id=p_exam_id and position=1000000000;
end;
$$;

create or replace function private.guard_teacher_exam_composition()
returns trigger language plpgsql security definer set search_path = '' as $$
declare target_exam uuid:=coalesce(new.exam_id,old.exam_id);
begin
  if exists(select 1 from public.teacher_exams e where e.id=target_exam and e.status='published') then
    raise exception 'published_exam_requires_draft_copy';
  end if;
  return coalesce(new,old);
end;
$$;

revoke all on function private.guard_teacher_exam_composition() from public,anon,authenticated;
drop trigger if exists guard_teacher_exam_composition on public.teacher_exam_questions;
create trigger guard_teacher_exam_composition
before insert or update or delete on public.teacher_exam_questions
for each row execute function private.guard_teacher_exam_composition();

create or replace function public.create_teacher_activity(
  p_class_id uuid,p_exam_id uuid,p_title text,p_instructions text default null,
  p_available_from timestamptz default null,p_due_at timestamptz default null,
  p_max_attempts integer default 1,p_shuffle_questions boolean default false,
  p_shuffle_alternatives boolean default false,p_show_score boolean default true,
  p_answer_policy public.teacher_result_policy default 'never'
) returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); result uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if not private.can_assign_teacher_exam(p_exam_id,p_class_id) then raise exception 'activity_owner_required'; end if;
  if not exists(select 1 from public.teacher_exams where id=p_exam_id and owner_id=uid and status='published') then
    raise exception 'published_exam_required';
  end if;
  if p_due_at is not null and p_available_from is not null and p_due_at<=p_available_from then raise exception 'invalid_activity_dates'; end if;
  insert into public.teacher_class_activities(
    class_id,exam_id,assigned_by,title,instructions,status,opens_at,due_at,max_attempts,
    shuffle_questions,shuffle_alternatives,show_score,answer_policy
  ) values (
    p_class_id,p_exam_id,uid,btrim(p_title),nullif(btrim(p_instructions),''),'published',
    p_available_from,p_due_at,p_max_attempts,coalesce(p_shuffle_questions,false),
    coalesce(p_shuffle_alternatives,false),coalesce(p_show_score,true),p_answer_policy
  ) returning id into result;
  return result;
end;
$$;

create or replace function public.get_teacher_activity_state(p_activity_id uuid)
returns table(
  activity_id uuid,class_id uuid,title text,instructions text,status text,
  available_from timestamptz,due_at timestamptz,max_attempts integer,
  attempts_used bigint,attempts_remaining integer,question_count bigint,
  show_score boolean,answer_policy public.teacher_result_policy,availability text
)
language sql stable security definer set search_path = '' as $$
  select a.id,a.class_id,a.title,a.instructions,a.status::text,a.opens_at,a.due_at,a.max_attempts,
    (select count(*) from public.teacher_activity_attempts x where x.activity_id=a.id and x.student_id=(select auth.uid()) and x.status='submitted'),
    case when a.max_attempts is null then null else greatest(a.max_attempts-(select count(*)::integer from public.teacher_activity_attempts x where x.activity_id=a.id and x.student_id=(select auth.uid()) and x.status='submitted'),0) end,
    (select count(*) from public.teacher_activity_questions aq where aq.activity_id=a.id),a.show_score,a.answer_policy,
    case when a.opens_at is not null and now()<a.opens_at then 'scheduled'
         when a.due_at is not null and now()>a.due_at then 'closed'
         when exists(select 1 from public.teacher_activity_attempts x where x.activity_id=a.id and x.student_id=(select auth.uid()) and x.status='in_progress') then 'in_progress'
         else 'available' end
  from public.teacher_class_activities a
  join public.teacher_class_members m on m.class_id=a.class_id and m.user_id=(select auth.uid()) and m.status='active'
  where a.id=p_activity_id and a.status='published';
$$;

create or replace function public.start_teacher_activity_attempt(p_activity_id uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); a public.teacher_class_activities; used integer; existing uuid; result uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select * into a from public.teacher_class_activities where id=p_activity_id and status='published' for update;
  if not found or not exists(select 1 from public.teacher_class_members m where m.class_id=a.class_id and m.user_id=uid and m.status='active') then raise exception 'activity_not_available'; end if;
  if a.opens_at is not null and now()<a.opens_at then raise exception 'activity_not_open'; end if;
  if a.due_at is not null and now()>a.due_at then raise exception 'activity_closed'; end if;
  select id into existing from public.teacher_activity_attempts where activity_id=a.id and student_id=uid and status='in_progress' order by attempt_number desc limit 1;
  if existing is not null then return existing; end if;
  select count(*) into used from public.teacher_activity_attempts where activity_id=a.id and student_id=uid and status='submitted';
  if a.max_attempts is not null and used>=a.max_attempts then raise exception 'activity_attempt_limit_reached'; end if;
  insert into public.teacher_activity_attempts(activity_id,student_id,status,started_at,attempt_number)
  values(a.id,uid,'in_progress',now(),used+1) returning id into result;
  return result;
end;
$$;

create or replace function public.get_teacher_attempt_questions(p_attempt_id uuid)
returns table(display_position integer,source_position integer,statement text,alternatives jsonb,question_type text)
language sql stable security definer set search_path = '' as $$
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
    coalesce(o.question_snapshot->>'question_type',o.question_snapshot->>'type')
  from ordered o order by o.display_position;
$$;

create or replace function public.submit_teacher_activity_attempt(p_attempt_id uuid,p_answers jsonb)
returns table(correct_count integer,total_questions integer,score numeric,show_score boolean,show_answers boolean)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); at public.teacher_activity_attempts; a public.teacher_class_activities; q record; answer jsonb; total integer:=0; correct integer:=0; final_score numeric(5,2); reveal boolean;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if jsonb_typeof(p_answers)<>'object' then raise exception 'invalid_activity_answers'; end if;
  select * into at from public.teacher_activity_attempts where id=p_attempt_id and student_id=uid and status='in_progress' for update;
  if not found then raise exception 'attempt_not_available'; end if;
  select * into a from public.teacher_class_activities where id=at.activity_id for update;
  if a.opens_at is not null and now()<a.opens_at then raise exception 'activity_not_open'; end if;
  if a.due_at is not null and now()>a.due_at then raise exception 'activity_closed'; end if;
  for q in select position,question_snapshot from public.teacher_activity_questions where activity_id=a.id order by position loop
    total:=total+1; answer:=p_answers->q.position::text;
    if private.normalize_teacher_answer(answer)=private.normalize_teacher_answer(q.question_snapshot->'correct_answer') then correct:=correct+1; end if;
  end loop;
  if total=0 then raise exception 'activity_has_no_questions'; end if;
  final_score:=round(correct::numeric/total::numeric*100,2);
  update public.teacher_activity_attempts set status='submitted',submitted_at=now(),correct_count=correct,total_questions=total,score=final_score,updated_at=now() where id=at.id;
  insert into public.teacher_activity_answers(attempt_id,question_position,answer,is_correct,answered_at)
  select at.id,aq.position,p_answers->aq.position::text,
    private.normalize_teacher_answer(p_answers->aq.position::text)=private.normalize_teacher_answer(aq.question_snapshot->'correct_answer'),now()
  from public.teacher_activity_questions aq where aq.activity_id=a.id;
  reveal:=a.answer_policy='immediate' or (a.answer_policy='after_due' and a.due_at is not null and now()>a.due_at);
  return query select correct,total,final_score,a.show_score,reveal;
end;
$$;

create or replace function public.get_teacher_attempt_result(p_attempt_id uuid)
returns table(attempt_number integer,submitted_at timestamptz,score numeric,correct_count integer,total_questions integer,answers jsonb)
language sql stable security definer set search_path = '' as $$
  select at.attempt_number,at.submitted_at,
    case when a.show_score then at.score else null end,
    case when a.show_score then at.correct_count else null end,
    at.total_questions,
    case when a.answer_policy='immediate' or (a.answer_policy='after_due' and a.due_at is not null and now()>a.due_at)
      then (select jsonb_agg(jsonb_build_object(
        'position',aq.position,'answer',aa.answer,'is_correct',aa.is_correct,
        'correct_answer',aq.question_snapshot->'correct_answer','explanation',aq.question_snapshot->>'explanation'
      ) order by aq.position)
      from public.teacher_activity_questions aq left join public.teacher_activity_answers aa on aa.attempt_id=at.id and aa.question_position=aq.position
      where aq.activity_id=a.id)
      else null end
  from public.teacher_activity_attempts at
  join public.teacher_class_activities a on a.id=at.activity_id
  where at.id=p_attempt_id and at.student_id=(select auth.uid()) and at.status='submitted';
$$;

-- P1 compatibility: old submit endpoint now delegates only to the active/new
-- attempt and keeps the server as the sole grading authority.
create or replace function public.submit_teacher_activity(p_activity_id uuid,p_answers jsonb)
returns table(correct_count integer,total_questions integer,score numeric)
language plpgsql security definer set search_path = '' as $$
declare attempt_id uuid; r record;
begin
  attempt_id:=public.start_teacher_activity_attempt(p_activity_id);
  select * into r from public.submit_teacher_activity_attempt(attempt_id,p_answers);
  return query select r.correct_count,r.total_questions,r.score;
end;
$$;

-- Direct reads would bypass result-release policies. Owners and students use
-- the safe projections above / existing owner reporting RPCs.
revoke select on table public.teacher_activity_attempts,public.teacher_activity_answers from authenticated;
grant select(id,activity_id,student_id,status,started_at,submitted_at,total_questions,created_at,updated_at,attempt_number)
  on public.teacher_activity_attempts to authenticated;

revoke all on function public.get_owned_teacher_questions(),public.duplicate_teacher_question(uuid),
  public.set_teacher_question_archived(uuid,boolean),public.set_teacher_exam_status(uuid,public.teacher_exam_status),
  public.duplicate_teacher_exam(uuid),public.remove_teacher_exam_question(uuid,integer),
  public.move_teacher_exam_question(uuid,integer,integer),
  public.create_teacher_activity(uuid,uuid,text,text,timestamptz,timestamptz,integer,boolean,boolean,boolean,public.teacher_result_policy),
  public.get_teacher_activity_state(uuid),public.start_teacher_activity_attempt(uuid),
  public.get_teacher_attempt_questions(uuid),public.submit_teacher_activity_attempt(uuid,jsonb),
  public.get_teacher_attempt_result(uuid),public.submit_teacher_activity(uuid,jsonb)
from public,anon,authenticated;

grant execute on function public.get_owned_teacher_questions(),public.duplicate_teacher_question(uuid),
  public.set_teacher_question_archived(uuid,boolean),public.set_teacher_exam_status(uuid,public.teacher_exam_status),
  public.duplicate_teacher_exam(uuid),public.remove_teacher_exam_question(uuid,integer),
  public.move_teacher_exam_question(uuid,integer,integer),
  public.create_teacher_activity(uuid,uuid,text,text,timestamptz,timestamptz,integer,boolean,boolean,boolean,public.teacher_result_policy),
  public.get_teacher_activity_state(uuid),public.start_teacher_activity_attempt(uuid),
  public.get_teacher_attempt_questions(uuid),public.submit_teacher_activity_attempt(uuid,jsonb),
  public.get_teacher_attempt_result(uuid),public.submit_teacher_activity(uuid,jsonb)
to authenticated;
