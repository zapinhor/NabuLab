-- The existing columns already separate provider billing state from effective access:
-- status/cancel_at_period_end describe billing, while current_period_end bounds entitlement.
-- Extend the event semantics only for Hotmart's documented charge-date update event.

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

  if v_event_type in (
    'PURCHASE_APPROVED',
    'PURCHASE_COMPLETE',
    'SWITCH_PLAN',
    'UPDATE_SUBSCRIPTION_CHARGE_DATE'
  ) then
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

revoke all on function public.apply_hotmart_subscription_event_semantics()
from public, anon, authenticated;
