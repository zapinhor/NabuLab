create table public.analytics_events (
  id bigint generated always as identity primary key,
  event_name text not null check (event_name in (
    'landing_view', 'signup_cta_clicked', 'premium_cta_clicked',
    'signup_completed', 'login_completed', 'free_exam_started',
    'free_exam_completed', 'premium_page_viewed', 'checkout_started',
    'purchase_approved', 'subscription_canceled'
  )),
  user_id uuid references auth.users(id) on delete set null,
  anonymous_session_id uuid,
  path text check (path is null or (char_length(path) between 1 and 240 and left(path, 1) = '/')),
  properties jsonb not null default '{}'::jsonb check (jsonb_typeof(properties) = 'object'),
  source_event_key text unique,
  created_at timestamptz not null default now(),
  check (user_id is not null or anonymous_session_id is not null)
);

create index analytics_events_name_created_idx
  on public.analytics_events (event_name, created_at desc);
create index analytics_events_user_created_idx
  on public.analytics_events (user_id, created_at desc)
  where user_id is not null;

alter table public.analytics_events enable row level security;
revoke all on table public.analytics_events from public, anon, authenticated;
grant select, insert on table public.analytics_events to service_role;

comment on table public.analytics_events is
  'Minimal first-party funnel events. Global access is server-side and restricted to platform admins.';
