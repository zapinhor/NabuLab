create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  email text not null,
  category text not null check (category in ('account', 'study', 'technical', 'billing', 'other')),
  subject text not null check (char_length(subject) between 5 and 120),
  message text not null check (char_length(message) between 20 and 4000),
  page_url text check (page_url is null or char_length(page_url) <= 500),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
  notification_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index support_tickets_user_created_idx
  on public.support_tickets (user_id, created_at desc);

create index support_tickets_status_created_idx
  on public.support_tickets (status, created_at desc);

create trigger support_tickets_set_updated_at
before update on public.support_tickets
for each row execute function private.set_updated_at();

alter table public.support_tickets enable row level security;

create policy support_tickets_select_own
on public.support_tickets
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy support_tickets_insert_own
on public.support_tickets
for insert
to authenticated
with check ((select auth.uid()) = user_id);

revoke all on table public.support_tickets from public, anon, authenticated;
grant select, insert on table public.support_tickets to authenticated;
grant all on table public.support_tickets to service_role;
