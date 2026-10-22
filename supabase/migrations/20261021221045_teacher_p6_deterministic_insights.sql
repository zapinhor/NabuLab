-- P6A — deterministic pedagogical insights.  Evidence stays scoped to one
-- teacher-owned class and only to submitted class activities.

create index teacher_p6_class_activity_recent_questions_idx
  on public.teacher_class_activities (class_id, created_at desc, exam_id);

create or replace function public.get_teacher_class_p6_evidence(
  p_class_id uuid,
  p_from timestamptz,
  p_to timestamptz,
  p_activity_id uuid default null,
  p_subject text default null,
  p_topic text default null,
  p_difficulty text default null,
  p_student_id uuid default null
) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_from is null or p_to is null or p_to <= p_from or p_to - p_from > interval '367 days' then
    raise exception 'invalid_analytics_period';
  end if;
  if not exists (
    select 1 from public.teacher_classes c
    where c.id = p_class_id and c.owner_id = (select auth.uid())
  ) then
    raise exception 'teacher_class_not_available' using errcode = '42501';
  end if;
  if not private.teacher_feature_enabled((select auth.uid()), 'content_analytics') then
    raise exception 'teacher_feature_required:content_analytics' using errcode = '42501';
  end if;

  return (
    with latest as (
      select distinct on (at.activity_id, at.student_id)
        at.id, at.activity_id, at.student_id
      from public.teacher_class_activities a
      join public.teacher_activity_attempts at on at.activity_id = a.id
      join public.teacher_class_members m on m.class_id = a.class_id and m.user_id = at.student_id and m.status = 'active'
      where a.class_id = p_class_id
        and a.status in ('published', 'closed')
        and (p_activity_id is null or a.id = p_activity_id)
        and (p_student_id is null or at.student_id = p_student_id)
        and at.status = 'submitted'
        and at.submitted_at >= p_from and at.submitted_at < p_to
      order by at.activity_id, at.student_id, at.attempt_number desc, at.submitted_at desc, at.id desc
    ), answered as (
      select l.activity_id, l.student_id, aq.position,
        coalesce(nullif(btrim(aq.question_snapshot->>'subjectName'), ''), nullif(btrim(aq.question_snapshot->>'subject'), ''), 'Não informado') as subject,
        coalesce(nullif(btrim(aq.question_snapshot->>'topic'), ''), 'Não informado') as topic,
        coalesce(nullif(btrim(aq.question_snapshot->>'difficulty'), ''), 'Não informado') as difficulty,
        left(coalesce(aq.question_snapshot->>'statement', 'Questão sem enunciado'), 300) as statement,
        aa.is_correct
      from latest l
      join public.teacher_activity_answers aa on aa.attempt_id = l.id
      join public.teacher_activity_questions aq on aq.activity_id = l.activity_id and aq.position = aa.question_position
    ), filtered as (
      select * from answered
      where (p_subject is null or subject = p_subject)
        and (p_topic is null or topic = p_topic)
        and (p_difficulty is null or difficulty = p_difficulty)
    ), content as (
      select subject, topic, difficulty, count(*)::integer as responses,
        count(*) filter (where is_correct is true)::integer as correct,
        count(*) filter (where is_correct is not true)::integer as errors,
        count(distinct student_id)::integer as students
      from filtered group by subject, topic, difficulty
    ), questions as (
      select activity_id, position, subject, topic, difficulty, statement,
        count(*)::integer as responses,
        count(*) filter (where is_correct is true)::integer as correct,
        count(*) filter (where is_correct is not true)::integer as errors,
        count(distinct student_id)::integer as students
      from filtered group by activity_id, position, subject, topic, difficulty, statement
    ), student_topics as (
      select student_id, subject, topic, count(distinct activity_id)::integer as activities,
        count(*)::integer as responses,
        count(*) filter (where is_correct is true)::integer as correct,
        count(*) filter (where is_correct is not true)::integer as errors
      from filtered group by student_id, subject, topic
    )
    select jsonb_build_object(
      'content', coalesce((select jsonb_agg(to_jsonb(content) order by responses desc, subject, topic) from content), '[]'::jsonb),
      'questions', coalesce((select jsonb_agg(to_jsonb(questions) order by responses desc, activity_id, position) from questions), '[]'::jsonb),
      'student_topics', coalesce((select jsonb_agg(to_jsonb(student_topics) order by student_id, responses desc) from student_topics), '[]'::jsonb)
    )
  );
end;
$$;

create or replace function public.create_teacher_p6_review(
  p_class_id uuid,
  p_subject text,
  p_topic text,
  p_difficulty text default null,
  p_question_count integer default 8,
  p_prefer_easier boolean default false
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := (select auth.uid());
  result uuid;
  selected_count integer;
begin
  if uid is null or not exists (
    select 1 from public.teacher_classes c where c.id = p_class_id and c.owner_id = uid
  ) then
    raise exception 'teacher_class_not_available' using errcode = '42501';
  end if;
  if not private.teacher_feature_enabled(uid, 'content_analytics') then
    raise exception 'teacher_feature_required:content_analytics' using errcode = '42501';
  end if;
  if nullif(btrim(p_subject), '') is null or nullif(btrim(p_topic), '') is null then
    raise exception 'review_content_required';
  end if;
  if p_question_count < 3 or p_question_count > 20 then
    raise exception 'invalid_review_question_count';
  end if;

  insert into public.teacher_exams(owner_id, title, description, is_shared, status)
  values (
    uid,
    'Revisão: ' || left(btrim(p_topic), 100),
    'Rascunho criado a partir de um insight da turma. Revise as questões antes de publicar.',
    false,
    'draft'
  ) returning id into result;

  with candidates as (
    select q.id, row_number() over (
      order by
        case when not p_prefer_easier then 0
          when q.difficulty = 'iniciante' then 0
          when q.difficulty = 'medio' then 1 else 2 end,
        q.updated_at desc, q.id
    ) as position
    from public.teacher_questions q
    where q.archived_at is null
      and (q.owner_id = uid or q.visibility = 'shared')
      and q.subject = btrim(p_subject)
      and q.topic = btrim(p_topic)
      and (p_difficulty is null or p_prefer_easier or q.difficulty = p_difficulty)
      and not exists (
        select 1
        from public.teacher_class_activities a
        join public.teacher_exam_questions eq on eq.exam_id = a.exam_id
        where a.class_id = p_class_id and a.created_at >= now() - interval '90 days'
          and eq.teacher_question_id = q.id
      )
    limit p_question_count
  )
  insert into public.teacher_exam_questions(exam_id, position, teacher_question_id)
  select result, position::integer, id from candidates order by position;

  get diagnostics selected_count = row_count;
  if selected_count < 3 then
    delete from public.teacher_exams where id = result;
    raise exception 'review_questions_insufficient';
  end if;
  return result;
end;
$$;

revoke all on function public.get_teacher_class_p6_evidence(uuid,timestamptz,timestamptz,uuid,text,text,text,uuid) from public, anon, authenticated;
revoke all on function public.create_teacher_p6_review(uuid,text,text,text,integer,boolean) from public, anon, authenticated;
grant execute on function public.get_teacher_class_p6_evidence(uuid,timestamptz,timestamptz,uuid,text,text,text,uuid) to authenticated;
grant execute on function public.create_teacher_p6_review(uuid,text,text,text,integer,boolean) to authenticated;
