alter table public.subscriptions
  add column cancel_at_period_end boolean not null default false,
  add column canceled_at timestamptz,
  add column termination_reason text;

alter table public.subscriptions
  add constraint subscriptions_termination_reason_check check (
    termination_reason is null
    or termination_reason in ('subscription_cancellation', 'refund', 'chargeback')
  );

create or replace function public.apply_hotmart_subscription_event_semantics()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_event_type text;
begin
  if new.provider <> 'hotmart' or new.provider_event_id is null then
    return new;
  end if;

  select event.event_type into v_event_type
  from public.hotmart_webhook_events as event
  where event.provider_event_id = new.provider_event_id;

  if v_event_type in ('PURCHASE_APPROVED', 'PURCHASE_COMPLETE', 'SWITCH_PLAN') then
    new.cancel_at_period_end := false;
    new.canceled_at := null;
    new.termination_reason := null;
  elsif v_event_type = 'SUBSCRIPTION_CANCELLATION' then
    new.cancel_at_period_end := true;
    new.canceled_at := new.provider_updated_at;
    new.termination_reason := 'subscription_cancellation';
  elsif v_event_type = 'PURCHASE_REFUNDED' then
    new.cancel_at_period_end := false;
    new.canceled_at := new.provider_updated_at;
    new.termination_reason := 'refund';
  elsif v_event_type = 'PURCHASE_CHARGEBACK' then
    new.cancel_at_period_end := false;
    new.canceled_at := new.provider_updated_at;
    new.termination_reason := 'chargeback';
  end if;

  return new;
end;
$$;

revoke all on function public.apply_hotmart_subscription_event_semantics() from public, anon, authenticated;

create trigger apply_hotmart_subscription_event_semantics
before insert or update of provider_event_id, status on public.subscriptions
for each row execute function public.apply_hotmart_subscription_event_semantics();

-- The existing Founder purchase was audited against Hotmart's official renewal date.
update public.subscriptions
set current_period_end = '2026-10-14T00:00:00-03:00'::timestamptz
where provider = 'hotmart'
  and provider_event_id = '6ec679a8-c3b7-4e1c-ab05-c75fcb667b55'
  and price_tier = 'founder_477'
  and current_period_end is null;
