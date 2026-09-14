-- Student Free/Premium entitlements.
-- Absence of a row is deliberately interpreted by the application as Free.

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  plan text not null check (plan in ('free', 'premium')),
  status text not null check (status in ('active', 'canceled', 'past_due', 'expired')),
  price_tier text check (price_tier in ('founder_477', 'standard_990')),
  provider text check (provider in ('manual', 'hotmart')),
  provider_customer_id text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_plan_metadata check (
    (plan = 'free' and price_tier is null)
    or plan = 'premium'
  ),
  constraint subscriptions_period check (
    current_period_end is null
    or current_period_start is null
    or current_period_end >= current_period_start
  )
);

create unique index subscriptions_provider_reference_idx
  on public.subscriptions (provider, provider_subscription_id)
  where provider_subscription_id is not null;

create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function private.set_updated_at();

alter table public.subscriptions enable row level security;

create policy subscriptions_select_own on public.subscriptions
for select to authenticated
using ((select auth.uid()) = user_id);

-- There are intentionally no INSERT, UPDATE or DELETE policies for students.
-- Commercial mutations are reserved for trusted backend/webhook/admin contexts.
revoke all on table public.subscriptions from anon, authenticated;
grant select on table public.subscriptions to authenticated;

comment on table public.subscriptions is
  'Current commercial subscription state. No row means Free; only an active Premium row unlocks Premium features.';
comment on column public.subscriptions.price_tier is
  'Commercial price cohort only. It must never be used for feature authorization.';
