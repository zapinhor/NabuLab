-- Preserve the version of a teacher question used by each exam. Future edits
-- affect the question library, but never mutate existing exams or grading.
create or replace function private.snapshot_teacher_exam_question()
returns trigger
language plpgsql
security invoker
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
      'question_type', q.question_type
    )
    into new.question_snapshot
    from public.teacher_questions q
    where q.id = new.teacher_question_id;
  end if;
  return new;
end;
$$;

revoke all on function private.snapshot_teacher_exam_question() from public, anon, authenticated;

drop trigger if exists snapshot_teacher_exam_question on public.teacher_exam_questions;
create trigger snapshot_teacher_exam_question
before insert on public.teacher_exam_questions
for each row execute function private.snapshot_teacher_exam_question();

update public.teacher_exam_questions eq
set question_snapshot = jsonb_build_object(
  'statement', q.statement,
  'alternatives', q.alternatives,
  'correct_answer', q.correct_answer,
  'explanation', q.explanation,
  'subject', q.subject,
  'topic', q.topic,
  'difficulty', q.difficulty,
  'question_type', q.question_type
)
from public.teacher_questions q
where q.id = eq.teacher_question_id
  and eq.question_snapshot is null;

create or replace function public.get_owned_teacher_questions()
returns table (
  id uuid,
  visibility public.teacher_question_visibility,
  statement text,
  alternatives jsonb,
  correct_answer jsonb,
  explanation text,
  subject text,
  topic text,
  difficulty text,
  question_type text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select q.id,q.visibility,q.statement,q.alternatives,q.correct_answer,q.explanation,
    q.subject,q.topic,q.difficulty,q.question_type,q.created_at
  from public.teacher_questions q
  where q.owner_id = (select auth.uid())
  order by q.created_at desc;
$$;

revoke all on function public.get_owned_teacher_questions() from public, anon, authenticated;
grant execute on function public.get_owned_teacher_questions() to authenticated;

create or replace function public.update_teacher_class_settings(
  p_class_id uuid,
  p_name text,
  p_public_name text,
  p_description text,
  p_school_name text,
  p_subject text,
  p_visibility public.teacher_class_visibility
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then raise exception 'authentication_required'; end if;
  update public.teacher_classes
  set name = btrim(p_name),
      public_name = btrim(p_public_name),
      description = nullif(btrim(p_description),''),
      school_name = nullif(btrim(p_school_name),''),
      subject = nullif(btrim(p_subject),''),
      visibility = p_visibility,
      access_code_enabled = case when p_visibility = 'private' then false else access_code_enabled end,
      join_link_enabled = case when p_visibility = 'private' then false else join_link_enabled end,
      updated_at = now()
  where id = p_class_id and owner_id = (select auth.uid());
  if not found then raise exception 'class_owner_required'; end if;
end;
$$;

revoke all on function public.update_teacher_class_settings(uuid,text,text,text,text,text,public.teacher_class_visibility) from public, anon, authenticated;
grant execute on function public.update_teacher_class_settings(uuid,text,text,text,text,text,public.teacher_class_visibility) to authenticated;

create or replace function public.get_teacher_activity_questions(p_activity_id uuid)
returns table (
  "position" integer,
  statement text,
  alternatives jsonb,
  question_type text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    eq.position,
    coalesce(eq.question_snapshot ->> 'statement', q.statement) as statement,
    coalesce(eq.question_snapshot -> 'alternatives', q.alternatives) as alternatives,
    coalesce(
      eq.question_snapshot ->> 'question_type',
      eq.question_snapshot ->> 'type',
      q.question_type
    ) as question_type
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

revoke all on function public.get_teacher_activity_questions(uuid) from public, anon, authenticated;
grant execute on function public.get_teacher_activity_questions(uuid) to authenticated;

create or replace function public.submit_teacher_activity(p_activity_id uuid,p_answers jsonb)
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
    select eq.position,coalesce(eq.question_snapshot -> 'correct_answer',q.correct_answer) as correct_answer
    from public.teacher_exam_questions eq
    left join public.teacher_questions q on q.id=eq.teacher_question_id
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
    private.normalize_teacher_answer(p_answers -> eq.position::text)=private.normalize_teacher_answer(coalesce(eq.question_snapshot -> 'correct_answer',q.correct_answer)),now()
  from public.teacher_exam_questions eq left join public.teacher_questions q on q.id=eq.teacher_question_id where eq.exam_id=activity.exam_id
  on conflict(attempt_id,question_position) do update set answer=excluded.answer,is_correct=excluded.is_correct,answered_at=excluded.answered_at;
  return query select correct_total,question_total,result_score;
end;
$$;

revoke all on function public.submit_teacher_activity(uuid,jsonb) from public, anon, authenticated;
grant execute on function public.submit_teacher_activity(uuid,jsonb) to authenticated;
