-- Hotmart billing identities, idempotent webhook events and ordered subscription updates.

alter table public.subscriptions
  add column provider_event_id text,
  add column provider_updated_at timestamptz;

create table public.billing_customers (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  normalized_email text not null,
  provider text not null check (provider = 'hotmart'),
  provider_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint billing_customers_normalized_email check (
    normalized_email = lower(btrim(normalized_email))
    and normalized_email like '%@%'
  ),
  unique (provider, normalized_email)
);

create unique index billing_customers_provider_customer_idx
  on public.billing_customers (provider, provider_customer_id)
  where provider_customer_id is not null;

create trigger billing_customers_set_updated_at
before update on public.billing_customers
for each row execute function private.set_updated_at();

alter table public.billing_customers enable row level security;
revoke all on table public.billing_customers from anon, authenticated;
grant select, insert, update on table public.billing_customers to service_role;

comment on table public.billing_customers is
  'Server-only link between an authenticated NabuLab account and a Hotmart billing identity.';

create table public.hotmart_webhook_events (
  provider_event_id text primary key,
  event_type text not null,
  product_id text not null,
  transaction_id text,
  subscription_id text,
  event_created_at timestamptz not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_status text not null default 'received' check (
    processing_status in ('received', 'processed', 'unmatched', 'stale', 'conflict')
  ),
  processing_detail text,
  sanitized_payload jsonb not null default '{}'::jsonb,
  constraint hotmart_webhook_events_sanitized_payload_object check (
    jsonb_typeof(sanitized_payload) = 'object'
  )
);

alter table public.hotmart_webhook_events enable row level security;
revoke all on table public.hotmart_webhook_events from anon, authenticated;
grant select, insert, update on table public.hotmart_webhook_events to service_role;

comment on table public.hotmart_webhook_events is
  'Server-only idempotency and audit log for Hotmart webhooks. Payloads must not contain buyer PII.';

create or replace function public.process_hotmart_webhook_event(
  p_event_id text,
  p_event_type text,
  p_product_id text,
  p_event_created_at timestamptz,
  p_transaction_id text,
  p_subscription_id text,
  p_provider_customer_id text,
  p_normalized_email text,
  p_price_tier text,
  p_subscription_status text,
  p_current_period_start timestamptz,
  p_current_period_end timestamptz,
  p_sanitized_payload jsonb
)
returns table (result text, resolved_user_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_existing_user_id uuid;
  v_existing_tier text;
  v_existing_updated_at timestamptz;
begin
  if p_event_id is null or btrim(p_event_id) = '' then
    raise exception 'HOTMART_EVENT_ID_REQUIRED';
  end if;
  if p_subscription_status not in ('active', 'past_due', 'canceled', 'expired') then
    raise exception 'HOTMART_STATUS_INVALID';
  end if;
  if p_price_tier is not null and p_price_tier not in ('founder_477', 'standard_990') then
    raise exception 'HOTMART_TIER_INVALID';
  end if;

  insert into public.hotmart_webhook_events (
    provider_event_id, event_type, product_id, transaction_id, subscription_id,
    event_created_at, sanitized_payload
  ) values (
    p_event_id, p_event_type, p_product_id, p_transaction_id, p_subscription_id,
    p_event_created_at, coalesce(p_sanitized_payload, '{}'::jsonb)
  ) on conflict (provider_event_id) do nothing;

  if not found then
    return query select 'duplicate'::text, null::uuid;
    return;
  end if;

  select customer.user_id
    into v_user_id
  from public.billing_customers as customer
  where customer.provider = 'hotmart'
    and customer.normalized_email = lower(btrim(p_normalized_email));

  if v_user_id is null then
    update public.hotmart_webhook_events
      set processing_status = 'unmatched',
          processing_detail = 'billing_identity_not_found',
          processed_at = now()
    where provider_event_id = p_event_id;
    return query select 'unmatched'::text, null::uuid;
    return;
  end if;

  if p_provider_customer_id is not null and btrim(p_provider_customer_id) <> '' then
    update public.billing_customers
      set provider_customer_id = p_provider_customer_id
    where user_id = v_user_id
      and (provider_customer_id is null or provider_customer_id = p_provider_customer_id);

    if not found then
      update public.hotmart_webhook_events
        set processing_status = 'conflict',
            processing_detail = 'provider_customer_mismatch',
            processed_at = now()
      where provider_event_id = p_event_id;
      return query select 'conflict'::text, v_user_id;
      return;
    end if;
  end if;

  if p_subscription_id is not null then
    select subscription.user_id
      into v_existing_user_id
    from public.subscriptions as subscription
    where subscription.provider = 'hotmart'
      and subscription.provider_subscription_id = p_subscription_id;

    if v_existing_user_id is not null and v_existing_user_id <> v_user_id then
      update public.hotmart_webhook_events
        set processing_status = 'conflict',
            processing_detail = 'provider_subscription_already_linked',
            processed_at = now()
      where provider_event_id = p_event_id;
      return query select 'conflict'::text, v_user_id;
      return;
    end if;
  end if;

  select subscription.price_tier, subscription.provider_updated_at
    into v_existing_tier, v_existing_updated_at
  from public.subscriptions as subscription
  where subscription.user_id = v_user_id;

  if v_existing_updated_at is not null and v_existing_updated_at > p_event_created_at then
    update public.hotmart_webhook_events
      set processing_status = 'stale',
          processing_detail = 'older_than_current_subscription_state',
          processed_at = now()
    where provider_event_id = p_event_id;
    return query select 'stale'::text, v_user_id;
    return;
  end if;

  if p_subscription_status = 'active' and p_price_tier is null then
    update public.hotmart_webhook_events
      set processing_status = 'conflict',
          processing_detail = 'active_event_without_mapped_offer',
          processed_at = now()
    where provider_event_id = p_event_id;
    return query select 'conflict'::text, v_user_id;
    return;
  end if;

  insert into public.subscriptions (
    user_id, plan, status, price_tier, provider, provider_customer_id,
    provider_subscription_id, provider_event_id, provider_updated_at,
    current_period_start, current_period_end
  ) values (
    v_user_id, 'premium', p_subscription_status, coalesce(p_price_tier, v_existing_tier),
    'hotmart', p_provider_customer_id, p_subscription_id, p_event_id,
    p_event_created_at, p_current_period_start, p_current_period_end
  )
  on conflict (user_id) do update set
    plan = 'premium',
    status = excluded.status,
    price_tier = coalesce(excluded.price_tier, public.subscriptions.price_tier),
    provider = 'hotmart',
    provider_customer_id = coalesce(excluded.provider_customer_id, public.subscriptions.provider_customer_id),
    provider_subscription_id = coalesce(excluded.provider_subscription_id, public.subscriptions.provider_subscription_id),
    provider_event_id = excluded.provider_event_id,
    provider_updated_at = excluded.provider_updated_at,
    current_period_start = coalesce(excluded.current_period_start, public.subscriptions.current_period_start),
    current_period_end = coalesce(excluded.current_period_end, public.subscriptions.current_period_end);

  update public.hotmart_webhook_events
    set processing_status = 'processed',
        processed_at = now()
  where provider_event_id = p_event_id;

  return query select 'processed'::text, v_user_id;
end;
$$;

revoke all on function public.process_hotmart_webhook_event(
  text, text, text, timestamptz, text, text, text, text, text, text,
  timestamptz, timestamptz, jsonb
) from public, anon, authenticated;
grant execute on function public.process_hotmart_webhook_event(
  text, text, text, timestamptz, text, text, text, text, text, text,
  timestamptz, timestamptz, jsonb
) to service_role;
