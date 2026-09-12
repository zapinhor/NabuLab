alter table public.exam_answers
  add column question_snapshot jsonb;

alter table public.exam_answers
  add constraint exam_answers_question_snapshot_object
  check (
    question_snapshot is null
    or jsonb_typeof(question_snapshot) = 'object'
  );

comment on column public.exam_answers.question_snapshot is
  'Minimal immutable question data captured when an answer is saved, used when the versioned question is no longer available.';
