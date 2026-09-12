-- Student Account & Cloud Sync.
-- Completed attempts and answers are the durable academic source of truth.
-- Dashboard, history, review, mastery, evolution and recommendations remain
-- derived in the application instead of being duplicated in summary tables.

create table public.exam_attempts (
  user_id uuid not null references public.profiles(id) on delete cascade,
  id text not null check (char_length(id) between 1 and 200),
  created_at timestamptz not null,
  started_at timestamptz not null,
  submitted_at timestamptz not null,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  mode text not null check (mode in ('manual', 'review', 'recommended')),
  total_questions integer not null check (total_questions >= 0),
  answered integer not null check (answered >= 0 and answered <= total_questions),
  unanswered integer not null check (unanswered >= 0 and unanswered <= total_questions),
  correct integer not null check (correct >= 0 and correct <= total_questions),
  incorrect integer not null check (incorrect >= 0 and incorrect <= total_questions),
  percentage integer not null check (percentage between 0 and 100),
  difficulty text not null check (difficulty in ('iniciante', 'medio', 'avancado', 'misto')),
  question_type text not null check (question_type in ('multiple-choice', 'true-false', 'misto')),
  selected_subjects text[] not null default '{}',
  subjects text[] not null default '{}',
  question_ids text[] not null default '{}',
  alternative_orders jsonb not null default '{}'::jsonb check (jsonb_typeof(alternative_orders) = 'object'),
  synced_at timestamptz not null default now(),
  primary key (user_id, id),
  constraint exam_attempts_answer_totals check (answered + unanswered = total_questions),
  constraint exam_attempts_result_totals check (correct + incorrect = total_questions),
  constraint exam_attempts_dates check (created_at <= submitted_at and started_at <= submitted_at)
);

create index exam_attempts_user_submitted_idx
  on public.exam_attempts (user_id, submitted_at desc);

create table public.exam_answers (
  user_id uuid not null,
  id text not null check (char_length(id) between 1 and 400),
  exam_id text not null,
  question_id text not null,
  selected_answer text,
  is_correct boolean not null,
  was_answered boolean not null,
  marked_for_review boolean not null default false,
  synced_at timestamptz not null default now(),
  primary key (user_id, id),
  constraint exam_answers_attempt_fk
    foreign key (user_id, exam_id)
    references public.exam_attempts(user_id, id)
    on delete cascade,
  constraint exam_answers_one_per_question unique (user_id, exam_id, question_id),
  constraint exam_answers_selection_consistent check (
    (was_answered and selected_answer is not null)
    or (not was_answered and selected_answer is null)
  )
);

create index exam_answers_user_exam_idx
  on public.exam_answers (user_id, exam_id);
create index exam_answers_user_question_idx
  on public.exam_answers (user_id, question_id);
create index exam_answers_user_errors_idx
  on public.exam_answers (user_id, is_correct, question_id);

create table public.student_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  weekly_questions integer not null default 100 check (weekly_questions between 1 and 1000),
  weekly_exams integer not null default 5 check (weekly_exams between 1 and 100),
  weekly_study_days integer not null default 4 check (weekly_study_days between 1 and 7),
  goals_updated_at timestamptz not null default now(),
  local_migration_completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create trigger student_preferences_set_updated_at
before update on public.student_preferences
for each row execute function private.set_updated_at();

alter table public.exam_attempts enable row level security;
alter table public.exam_answers enable row level security;
alter table public.student_preferences enable row level security;

create policy exam_attempts_select_own on public.exam_attempts
for select to authenticated
using ((select auth.uid()) = user_id);

create policy exam_attempts_insert_own on public.exam_attempts
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy exam_attempts_update_own on public.exam_attempts
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy exam_attempts_delete_own on public.exam_attempts
for delete to authenticated
using ((select auth.uid()) = user_id);

create policy exam_answers_select_own on public.exam_answers
for select to authenticated
using ((select auth.uid()) = user_id);

create policy exam_answers_insert_own on public.exam_answers
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy exam_answers_update_own on public.exam_answers
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy exam_answers_delete_own on public.exam_answers
for delete to authenticated
using ((select auth.uid()) = user_id);

create policy student_preferences_select_own on public.student_preferences
for select to authenticated
using ((select auth.uid()) = user_id);

create policy student_preferences_insert_own on public.student_preferences
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy student_preferences_update_own on public.student_preferences
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy student_preferences_delete_own on public.student_preferences
for delete to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.exam_attempts, public.exam_answers, public.student_preferences
from anon, authenticated;
grant select, insert, update, delete on table
  public.exam_attempts, public.exam_answers, public.student_preferences
to authenticated;

comment on table public.exam_attempts is
  'Completed student exam attempts. Durable source for academic history and derived analytics.';
comment on table public.exam_answers is
  'Per-question student responses. Question text and metadata remain in the versioned bank and are not duplicated.';
comment on table public.student_preferences is
  'Persistent per-student goals and completion marker for legacy local-data migration.';
