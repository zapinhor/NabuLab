begin;

create table if not exists public.api_rate_limits (
  bucket_digest text not null,
  action text not null,
  window_started_at timestamptz not null,
  hits integer not null default 0 check (hits >= 0),
  updated_at timestamptz not null default now(),
  primary key (bucket_digest, action),
  constraint api_rate_limits_bucket_digest_length check (char_length(bucket_digest) between 32 and 128),
  constraint api_rate_limits_action_length check (char_length(action) between 1 and 80)
);

alter table public.api_rate_limits enable row level security;
revoke all on table public.api_rate_limits from anon, authenticated;
grant select, insert, update, delete on table public.api_rate_limits to service_role;

create or replace function public.consume_api_rate_limit(
  p_bucket_digest text,
  p_action text,
  p_limit integer,
  p_window_seconds integer,
  p_now timestamptz default now()
)
returns table(allowed boolean, current_hits integer, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.api_rate_limits%rowtype;
  v_window interval;
begin
  if p_bucket_digest is null or char_length(p_bucket_digest) not between 32 and 128
     or p_action is null or char_length(p_action) not between 1 and 80
     or p_limit not between 1 and 10000
     or p_window_seconds not between 1 and 86400 then
    raise exception 'invalid_rate_limit_arguments' using errcode = '22023';
  end if;

  v_window := make_interval(secs => p_window_seconds);

  insert into public.api_rate_limits as limits (
    bucket_digest, action, window_started_at, hits, updated_at
  ) values (
    p_bucket_digest, p_action, p_now, 1, p_now
  )
  on conflict (bucket_digest, action) do update
    set window_started_at = case
          when limits.window_started_at + v_window <= p_now then p_now
          else limits.window_started_at
        end,
        hits = case
          when limits.window_started_at + v_window <= p_now then 1
          else limits.hits + 1
        end,
        updated_at = p_now
  returning * into v_row;

  return query select
    v_row.hits <= p_limit,
    v_row.hits,
    greatest(1, ceil(extract(epoch from (v_row.window_started_at + v_window - p_now)))::integer);
end;
$$;

revoke all on function public.consume_api_rate_limit(text, text, integer, integer, timestamptz) from public, anon, authenticated;
grant execute on function public.consume_api_rate_limit(text, text, integer, integer, timestamptz) to service_role;

create table if not exists public.system_job_runs (
  id uuid primary key default gen_random_uuid(),
  job_name text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running',
  request_id text,
  safe_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint system_job_runs_job_name_length check (char_length(job_name) between 1 and 80),
  constraint system_job_runs_status_check check (status in ('running', 'success', 'failed')),
  constraint system_job_runs_request_id_length check (request_id is null or char_length(request_id) <= 128),
  constraint system_job_runs_finished_after_started check (finished_at is null or finished_at >= started_at)
);

create index if not exists system_job_runs_job_started_idx
  on public.system_job_runs (job_name, started_at desc);

alter table public.system_job_runs enable row level security;
revoke all on table public.system_job_runs from anon, authenticated;
grant select, insert, update, delete on table public.system_job_runs to service_role;

commit;
