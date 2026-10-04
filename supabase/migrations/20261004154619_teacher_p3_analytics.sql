-- P3 reads only results from activities owned by the requesting teacher.
-- No Student exam/history/quota table is read or modified.
create index teacher_p3_submitted_attempts_idx
  on public.teacher_activity_attempts (activity_id, submitted_at desc, student_id, attempt_number desc)
  where status = 'submitted';

create function public.get_teacher_class_p3_attempts(
  p_class_id uuid, p_from timestamptz, p_to timestamptz, p_activity_id uuid default null
)
returns table (
  attempt_id uuid, activity_id uuid, student_id uuid, attempt_number integer,
  status public.teacher_attempt_status, started_at timestamptz, submitted_at timestamptz,
  score numeric, correct_count integer, total_questions integer
)
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
  return query
    select at.id, at.activity_id, at.student_id, at.attempt_number,
      at.status, at.started_at, at.submitted_at, at.score, at.correct_count, at.total_questions
    from public.teacher_class_activities a
    join public.teacher_activity_attempts at on at.activity_id = a.id
    join public.teacher_class_members m on m.class_id = a.class_id and m.user_id = at.student_id and m.status = 'active'
    where a.class_id = p_class_id and a.status in ('published', 'closed')
      and (p_activity_id is null or a.id = p_activity_id)
      and ((at.status = 'submitted' and at.submitted_at >= p_from and at.submitted_at < p_to)
        or (at.status = 'in_progress' and at.started_at >= p_from and at.started_at < p_to))
    order by coalesce(at.submitted_at, at.started_at), at.id;
end;
$$;

create function public.get_teacher_class_p3_answers(
  p_class_id uuid, p_from timestamptz, p_to timestamptz,
  p_activity_id uuid default null, p_student_id uuid default null
)
returns table (
  activity_id uuid, question_position integer, subject text, topic text,
  difficulty text, statement text, response_count bigint, correct_count bigint, error_count bigint
)
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
  return query
    with latest as (
      select distinct on (at.activity_id, at.student_id)
        at.id, at.activity_id
      from public.teacher_class_activities a
      join public.teacher_activity_attempts at on at.activity_id = a.id
      join public.teacher_class_members m on m.class_id = a.class_id and m.user_id = at.student_id and m.status = 'active'
      where a.class_id = p_class_id and a.status in ('published', 'closed')
        and (p_activity_id is null or a.id = p_activity_id)
        and (p_student_id is null or at.student_id = p_student_id)
        and at.status = 'submitted'
        and at.submitted_at >= p_from and at.submitted_at < p_to
      order by at.activity_id, at.student_id, at.attempt_number desc, at.submitted_at desc, at.id desc
    )
    select l.activity_id, aq.position,
      coalesce(nullif(btrim(aq.question_snapshot->>'subjectName'), ''), nullif(btrim(aq.question_snapshot->>'subject'), ''), 'Não informado'),
      coalesce(nullif(btrim(aq.question_snapshot->>'topic'), ''), 'Não informado'),
      coalesce(nullif(btrim(aq.question_snapshot->>'difficulty'), ''), 'Não informado'),
      left(coalesce(aq.question_snapshot->>'statement', 'Questão sem enunciado'), 300),
      count(*)::bigint,
      count(*) filter (where aa.is_correct is true)::bigint,
      count(*) filter (where aa.is_correct is not true)::bigint
    from latest l
    join public.teacher_activity_answers aa on aa.attempt_id = l.id
    join public.teacher_activity_questions aq
      on aq.activity_id = l.activity_id and aq.position = aa.question_position
    group by l.activity_id, aq.position, aq.question_snapshot
    order by l.activity_id, aq.position;
end;
$$;

revoke all on function public.get_teacher_class_p3_attempts(uuid,timestamptz,timestamptz,uuid)
  from public, anon, authenticated;
revoke all on function public.get_teacher_class_p3_answers(uuid,timestamptz,timestamptz,uuid,uuid)
  from public, anon, authenticated;
grant execute on function public.get_teacher_class_p3_attempts(uuid,timestamptz,timestamptz,uuid)
  to authenticated;
grant execute on function public.get_teacher_class_p3_answers(uuid,timestamptz,timestamptz,uuid,uuid)
  to authenticated;
