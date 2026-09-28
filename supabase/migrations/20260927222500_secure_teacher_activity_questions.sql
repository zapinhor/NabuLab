-- Return only the public question fields needed by an active class member.
-- Grading data stays private and is used only by submit_teacher_activity().
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
    coalesce(q.statement, eq.question_snapshot ->> 'statement') as statement,
    coalesce(q.alternatives, eq.question_snapshot -> 'alternatives') as alternatives,
    coalesce(
      q.question_type,
      eq.question_snapshot ->> 'question_type',
      eq.question_snapshot ->> 'type'
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
