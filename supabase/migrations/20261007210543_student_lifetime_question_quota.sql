-- Student Free lifetime question quota.
--
-- A question is consumed only when an authenticated Free student records an
-- answer in a personal NabuLab exam. The event key makes the operation
-- idempotent across refreshes, answer changes and concurrent browser tabs.
-- Teacher activities use their own tables/RPCs and never call this function.

create table public.student_question_usage (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  used_count integer not null default 0 check (used_count between 0 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger student_question_usage_set_updated_at
before update on public.student_question_usage
for each row execute function private.set_updated_at();

create table public.student_question_usage_events (
  user_id uuid not null references public.profiles(id) on delete cascade,
  exam_id text not null check (char_length(exam_id) between 1 and 120),
  question_id text not null check (char_length(question_id) between 1 and 120),
  answered_at timestamptz not null default now(),
  primary key (user_id, exam_id, question_id)
);

alter table public.student_question_usage enable row level security;
alter table public.student_question_usage_events enable row level security;

create policy student_question_usage_select_own
on public.student_question_usage
for select to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.student_question_usage from public, anon, authenticated;
revoke all on table public.student_question_usage_events from public, anon, authenticated;
grant select on table public.student_question_usage to authenticated;

create or replace function public.consume_student_question_quota(
  p_exam_id text,
  p_question_id text
)
returns table (
  allowed boolean,
  counted boolean,
  used_count integer,
  total_limit integer,
  remaining integer,
  unlimited boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_used integer;
  has_premium boolean;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_exam_id is null or char_length(p_exam_id) not between 1 and 120
     or p_question_id is null or char_length(p_question_id) not between 1 and 120 then
    raise exception 'Invalid question usage key' using errcode = '22023';
  end if;

  select exists (
    select 1
    from public.subscriptions s
    where s.user_id = current_user_id
      and s.plan = 'premium'
      and (
        (
          s.status = 'active'
          and (
            s.provider is distinct from 'hotmart'
            or s.current_period_end is null
            or now() < s.current_period_end
          )
        )
        or (
          s.status = 'canceled'
          and s.cancel_at_period_end = true
          and s.termination_reason = 'subscription_cancellation'
          and s.current_period_end is not null
          and now() < s.current_period_end
        )
      )
  ) into has_premium;

  if has_premium then
    return query select true, false, 0, null::integer, null::integer, true;
    return;
  end if;

  -- Serialize quota changes for this user while still allowing different
  -- students to answer concurrently.
  perform pg_advisory_xact_lock(hashtextextended(current_user_id::text, 0));

  if exists (
    select 1
    from public.student_question_usage_events e
    where e.user_id = current_user_id
      and e.exam_id = p_exam_id
      and e.question_id = p_question_id
  ) then
    select coalesce(u.used_count, 0)
      into current_used
    from public.student_question_usage u
    where u.user_id = current_user_id;

    current_used := coalesce(current_used, 0);
    return query select true, false, current_used, 10, greatest(0, 10 - current_used), false;
    return;
  end if;

  insert into public.student_question_usage (user_id, used_count)
  values (current_user_id, 0)
  on conflict (user_id) do nothing;

  update public.student_question_usage u
  set used_count = u.used_count + 1
  where u.user_id = current_user_id
    and u.used_count < 10
  returning u.used_count into current_used;

  if current_used is null then
    select u.used_count into current_used
    from public.student_question_usage u
    where u.user_id = current_user_id;

    current_used := coalesce(current_used, 10);
    return query select false, false, current_used, 10, 0, false;
    return;
  end if;

  insert into public.student_question_usage_events (user_id, exam_id, question_id)
  values (current_user_id, p_exam_id, p_question_id);

  return query select true, true, current_used, 10, greatest(0, 10 - current_used), false;
end;
$$;

revoke execute on function public.consume_student_question_quota(text, text)
from public, anon;
grant execute on function public.consume_student_question_quota(text, text)
to authenticated;

comment on table public.student_question_usage is
  'Lifetime answered-question total for Student Free accounts. Teacher activities are excluded.';
comment on table public.student_question_usage_events is
  'Private idempotency ledger for Student Free personal exam answers.';
comment on function public.consume_student_question_quota(text, text) is
  'Atomically consumes one of 10 lifetime Student Free questions, once per exam/question; active Premium bypasses the limit.';

alter table public.analytics_events
  drop constraint analytics_events_event_name_check;

alter table public.analytics_events
  add constraint analytics_events_event_name_check check (event_name in (
    'landing_view', 'signup_cta_clicked', 'premium_cta_clicked',
    'signup_started', 'signup_completed', 'login_completed',
    'first_student_use', 'first_question_answered',
    'free_question_limit_reached', 'free_exam_started',
    'free_exam_completed', 'premium_page_viewed', 'checkout_started',
    'purchase_approved', 'subscription_canceled'
  ));

alter table public.acquisition_daily_metrics
  drop constraint acquisition_daily_metrics_event_type_check;

alter table public.acquisition_daily_metrics
  add constraint acquisition_daily_metrics_event_type_check check (
    event_type in (
      'landing_request', 'signup_started', 'signup_completed',
      'premium_viewed', 'checkout_started'
    )
  );
