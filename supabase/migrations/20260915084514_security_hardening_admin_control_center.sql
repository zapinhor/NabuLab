create type public.platform_admin_role as enum ('admin', 'super_admin');

alter table public.platform_admins
  add column role public.platform_admin_role not null default 'admin',
  add column mfa_required boolean not null default false;

update public.platform_admins set role = 'super_admin', mfa_required = true;

create or replace function private.is_super_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.platform_admins pa
    where pa.user_id = (select auth.uid()) and pa.role = 'super_admin'
  );
$$;

create table public.auth_login_limits (
  account_digest text not null check (account_digest ~ '^[0-9a-f]{64}$'),
  origin_digest text not null check (origin_digest ~ '^[0-9a-f]{64}$'),
  failure_count smallint not null default 0 check (failure_count >= 0),
  window_started_at timestamptz not null default now(),
  blocked_until timestamptz,
  last_failed_at timestamptz,
  primary key (account_digest, origin_digest)
);
alter table public.auth_login_limits enable row level security;
revoke all on table public.auth_login_limits from public, anon, authenticated;
grant select, insert, update, delete on table public.auth_login_limits to service_role;

create or replace function public.login_limit_status(
  p_account_digest text,
  p_origin_digest text
) returns table (blocked boolean, retry_after_seconds integer)
language sql security invoker set search_path = '' as $$
  select
    coalesce(l.blocked_until > now(), false),
    greatest(0, extract(epoch from coalesce(l.blocked_until, now()) - now())::integer)
  from (select 1) seed
  left join public.auth_login_limits l
    on l.account_digest = p_account_digest and l.origin_digest = p_origin_digest;
$$;

create or replace function public.record_login_failure(
  p_account_digest text,
  p_origin_digest text,
  p_max_attempts integer,
  p_window_minutes integer,
  p_cooldown_minutes integer
) returns table (blocked boolean, retry_after_seconds integer)
language plpgsql security invoker set search_path = '' as $$
declare v_row public.auth_login_limits%rowtype;
begin
  insert into public.auth_login_limits as limits (
    account_digest, origin_digest, failure_count, window_started_at, last_failed_at, blocked_until
  ) values (p_account_digest, p_origin_digest, 1, now(), now(), null)
  on conflict (account_digest, origin_digest) do update set
    failure_count = case
      when limits.window_started_at <= now() - make_interval(mins => p_window_minutes) then 1
      else limits.failure_count + 1
    end,
    window_started_at = case
      when limits.window_started_at <= now() - make_interval(mins => p_window_minutes) then now()
      else limits.window_started_at
    end,
    last_failed_at = now(),
    blocked_until = case
      when limits.blocked_until > now() then limits.blocked_until
      when (case when limits.window_started_at <= now() - make_interval(mins => p_window_minutes) then 1 else limits.failure_count + 1 end) >= p_max_attempts
        then now() + make_interval(mins => p_cooldown_minutes)
      else null
    end
  returning * into v_row;
  return query select v_row.blocked_until > now(), greatest(0, extract(epoch from coalesce(v_row.blocked_until, now()) - now())::integer);
end;
$$;

create or replace function public.clear_login_failures(p_account_digest text, p_origin_digest text)
returns void language sql security invoker set search_path = '' as $$
  delete from public.auth_login_limits
  where account_digest = p_account_digest and origin_digest = p_origin_digest;
$$;

revoke execute on function public.login_limit_status(text,text) from public, anon, authenticated;
revoke execute on function public.record_login_failure(text,text,integer,integer,integer) from public, anon, authenticated;
revoke execute on function public.clear_login_failures(text,text) from public, anon, authenticated;
grant execute on function public.login_limit_status(text,text) to service_role;
grant execute on function public.record_login_failure(text,text,integer,integer,integer) to service_role;
grant execute on function public.clear_login_failures(text,text) to service_role;

grant insert on table public.audit_events to service_role;

comment on table public.auth_login_limits is
  'HMAC-derived account and origin buckets for application login throttling; contains no raw email or IP.';
