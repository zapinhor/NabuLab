-- Questões de verdadeiro/falso guardam alternatives = JSON null. Com "embaralhar alternativas"
-- ligado, jsonb_array_elements(null) falhava e a tentativa do aluno ficava indisponível.
create or replace function public.get_teacher_attempt_questions(p_attempt_id uuid)
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
    case when o.shuffle_alternatives and jsonb_typeof(o.question_snapshot->'alternatives') = 'array' then (
      select jsonb_agg(value order by md5(o.attempt_id::text||':'||o.source_position::text||':'||value::text))
      from jsonb_array_elements(o.question_snapshot->'alternatives')
    ) else o.question_snapshot->'alternatives' end,
    coalesce(o.question_snapshot->>'question_type',o.question_snapshot->>'type'),
    nullif(o.question_snapshot->>'image_path','')
  from ordered o order by o.display_position;
$$;
