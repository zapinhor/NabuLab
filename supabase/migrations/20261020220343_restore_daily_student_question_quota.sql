-- Restore the Student Free allowance to 10 questions per calendar day.
-- The quota day is always calculated in America/Sao_Paulo so browser and
-- server time zones cannot change when the allowance resets.

alter table public.student_question_usage
  add column usage_date date;

update public.student_question_usage
set usage_date = (updated_at at time zone 'America/Sao_Paulo')::date
where usage_date is null;

alter table public.student_question_usage
  alter column usage_date set default ((now() at time zone 'America/Sao_Paulo')::date),
  alter column usage_date set not null;

alter table public.student_question_usage_events
  add column usage_date date;

update public.student_question_usage_events
set usage_date = (answered_at at time zone 'America/Sao_Paulo')::date
where usage_date is null;

alter table public.student_question_usage_events
  alter column usage_date set default ((now() at time zone 'America/Sao_Paulo')::date),
  alter column usage_date set not null;

alter table public.student_question_usage_events
  drop constraint student_question_usage_events_pkey;

alter table public.student_question_usage_events
  add constraint student_question_usage_events_pkey
  primary key (user_id, usage_date, exam_id, question_id);

create index student_question_usage_events_user_date_idx
  on public.student_question_usage_events (user_id, usage_date);

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
  quota_date date := (now() at time zone 'America/Sao_Paulo')::date;
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

  -- Serialize reset and consumption for this user. Different students remain
  -- independent, while concurrent tabs cannot exceed the daily allowance.
  perform pg_advisory_xact_lock(hashtextextended(current_user_id::text, 0));

  insert into public.student_question_usage (user_id, usage_date, used_count)
  values (current_user_id, quota_date, 0)
  on conflict (user_id) do update
  set usage_date = excluded.usage_date,
      used_count = case
        when student_question_usage.usage_date = excluded.usage_date
          then student_question_usage.used_count
        else 0
      end;

  if exists (
    select 1
    from public.student_question_usage_events e
    where e.user_id = current_user_id
      and e.usage_date = quota_date
      and e.exam_id = p_exam_id
      and e.question_id = p_question_id
  ) then
    select u.used_count
      into current_used
    from public.student_question_usage u
    where u.user_id = current_user_id
      and u.usage_date = quota_date;

    current_used := coalesce(current_used, 0);
    return query select true, false, current_used, 10, greatest(0, 10 - current_used), false;
    return;
  end if;

  update public.student_question_usage u
  set used_count = u.used_count + 1
  where u.user_id = current_user_id
    and u.usage_date = quota_date
    and u.used_count < 10
  returning u.used_count into current_used;

  if current_used is null then
    select u.used_count into current_used
    from public.student_question_usage u
    where u.user_id = current_user_id
      and u.usage_date = quota_date;

    current_used := coalesce(current_used, 10);
    return query select false, false, current_used, 10, 0, false;
    return;
  end if;

  insert into public.student_question_usage_events (
    user_id,
    usage_date,
    exam_id,
    question_id
  ) values (
    current_user_id,
    quota_date,
    p_exam_id,
    p_question_id
  );

  return query select true, true, current_used, 10, greatest(0, 10 - current_used), false;
end;
$$;

revoke execute on function public.consume_student_question_quota(text, text)
from public, anon;
grant execute on function public.consume_student_question_quota(text, text)
to authenticated;

comment on table public.student_question_usage is
  'Current daily answered-question total for Student Free accounts, keyed to America/Sao_Paulo. Teacher activities are excluded.';
comment on table public.student_question_usage_events is
  'Private daily idempotency ledger for Student Free personal exam answers.';
comment on function public.consume_student_question_quota(text, text) is
  'Atomically consumes one of 10 daily Student Free questions in America/Sao_Paulo, once per day/exam/question; active Premium bypasses the limit.';
