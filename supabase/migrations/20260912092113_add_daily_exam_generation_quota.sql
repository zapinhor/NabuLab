-- Daily Free exam generation quota.
-- A generation consumes quota before its session is returned, including when
-- the student later abandons the exam. The RPC is atomic under concurrency.

create table public.daily_exam_usage (
  user_id uuid not null references public.profiles(id) on delete cascade,
  usage_date date not null,
  used_count integer not null check (used_count between 1 and 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, usage_date)
);

create trigger daily_exam_usage_set_updated_at
before update on public.daily_exam_usage
for each row execute function private.set_updated_at();

alter table public.daily_exam_usage enable row level security;

create policy daily_exam_usage_select_own on public.daily_exam_usage
for select to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.daily_exam_usage from anon, authenticated;
grant select on table public.daily_exam_usage to authenticated;

create or replace function public.consume_student_exam_quota()
returns table (
  allowed boolean,
  used_count integer,
  daily_limit integer,
  quota_date date
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_quota_date date := (timezone('America/Sao_Paulo', now()))::date;
  consumed_count integer;
  existing_count integer;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if exists (
    select 1
    from public.subscriptions
    where user_id = current_user_id
      and plan = 'premium'
      and status = 'active'
  ) then
    return query select true, 0, null::integer, current_quota_date;
    return;
  end if;

  insert into public.daily_exam_usage (user_id, usage_date, used_count)
  values (current_user_id, current_quota_date, 1)
  on conflict (user_id, usage_date) do update
    set used_count = public.daily_exam_usage.used_count + 1
    where public.daily_exam_usage.used_count < 2
  returning public.daily_exam_usage.used_count into consumed_count;

  if consumed_count is not null then
    return query select true, consumed_count, 2, current_quota_date;
    return;
  end if;

  select deu.used_count
  into existing_count
  from public.daily_exam_usage as deu
  where deu.user_id = current_user_id
    and deu.usage_date = current_quota_date;

  return query select false, coalesce(existing_count, 2), 2, current_quota_date;
end;
$$;

revoke execute on function public.consume_student_exam_quota() from public, anon;
grant execute on function public.consume_student_exam_quota() to authenticated;

comment on table public.daily_exam_usage is
  'Atomic per-student count of successfully generated Free exams by America/Sao_Paulo calendar date.';
comment on function public.consume_student_exam_quota() is
  'Atomically consumes one Free generation slot; active Premium subscriptions bypass the daily quota.';
