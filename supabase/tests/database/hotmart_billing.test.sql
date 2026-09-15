begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
select plan(21);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.billing_customers'::regclass),
  'RLS está habilitado em billing_customers'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.hotmart_webhook_events'::regclass),
  'RLS está habilitado em hotmart_webhook_events'
);
select ok(
  not has_table_privilege('authenticated', 'public.billing_customers', 'select')
  and not has_table_privilege('authenticated', 'public.billing_customers', 'insert')
  and not has_table_privilege('authenticated', 'public.billing_customers', 'update'),
  'billing identity não é acessível diretamente pelo estudante'
);
select ok(
  not has_table_privilege('authenticated', 'public.hotmart_webhook_events', 'select'),
  'eventos Hotmart não são legíveis pelo estudante'
);
select ok(
  not has_function_privilege('authenticated', 'public.process_hotmart_webhook_event(text,text,text,timestamptz,text,text,text,text,text,text,timestamptz,timestamptz,jsonb)', 'execute')
  and has_function_privilege('service_role', 'public.process_hotmart_webhook_event(text,text,text,timestamptz,text,text,text,text,text,text,timestamptz,timestamptz,jsonb)', 'execute'),
  'somente service_role executa o processador atômico'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values (
  '00000000-0000-0000-0000-000000000000',
  '35000000-0000-0000-0000-000000000005',
  'authenticated', 'authenticated', 'billing-a@example.test',
  crypt('billing-test', gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Billing Test","username":"billing-test"}', now(), now()
);

insert into public.billing_customers (user_id, normalized_email, provider)
values ('35000000-0000-0000-0000-000000000005', 'billing-a@example.test', 'hotmart');

select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-1', 'PURCHASE_APPROVED', '7654321', '2030-01-01T00:00:00Z',
    'transaction-1', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'active', '2030-01-01T00:00:00Z', '2030-02-01T00:00:00Z',
    '{"productId":"7654321"}'::jsonb
  )),
  'processed',
  'compra aprovada é processada'
);
select is(
  (select status from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'active',
  'assinatura fica ativa'
);
select is(
  (select price_tier from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'founder_477',
  'oferta Founder é preservada'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-1', 'PURCHASE_APPROVED', '7654321', '2030-01-01T00:00:00Z',
    'transaction-1', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'active', null, null, '{}'::jsonb
  )),
  'duplicate',
  'replay do mesmo evento é idempotente'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-2', 'SUBSCRIPTION_CANCELLATION', '7654321', '2030-03-01T00:00:00Z',
    'transaction-2', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'canceled', null, null, '{}'::jsonb
  )),
  'processed',
  'cancelamento novo é processado'
);
select ok(
  (select cancel_at_period_end from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'cancelamento agenda o fim do acesso'
);
select is(
  (select termination_reason from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'subscription_cancellation',
  'motivo do cancelamento é preservado'
);
select is(
  (select current_period_end::text from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  '2030-02-01 00:00:00+00',
  'cancelamento preserva o fim do período pago'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-3', 'PURCHASE_APPROVED', '7654321', '2030-02-01T00:00:00Z',
    'transaction-3', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'active', null, null, '{}'::jsonb
  )),
  'stale',
  'evento antigo não reativa assinatura cancelada'
);
select is(
  (select status from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'canceled',
  'estado mais novo permanece cancelado'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-4', 'PURCHASE_APPROVED', '7654321', '2030-04-01T00:00:00Z',
    'transaction-4', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'active', '2030-04-01T00:00:00Z', '2030-05-01T00:00:00Z', '{}'::jsonb
  )),
  'processed',
  'renovação posterior reativa assinatura'
);
select ok(
  (select status = 'active' and not cancel_at_period_end and canceled_at is null and termination_reason is null
   from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'renovação limpa os marcadores de cancelamento'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-old-cancel', 'SUBSCRIPTION_CANCELLATION', '7654321', '2030-03-15T00:00:00Z',
    'transaction-old-cancel', 'subscription-1', 'customer-1', 'billing-a@example.test',
    'founder_477', 'canceled', null, null, '{}'::jsonb
  )),
  'stale',
  'cancelamento antigo não vence renovação mais nova'
);
select is(
  (select status from public.subscriptions where user_id = '35000000-0000-0000-0000-000000000005'),
  'active',
  'Premium permanece ativo após cancelamento antigo'
);
select is(
  (select result from public.process_hotmart_webhook_event(
    'hotmart-event-unmatched', 'PURCHASE_APPROVED', '7654321', '2030-04-01T00:00:00Z',
    'transaction-u', 'subscription-u', 'customer-u', 'nobody@example.test',
    'standard_990', 'active', null, null, '{}'::jsonb
  )),
  'unmatched',
  'comprador sem billing identity não recebe Premium'
);
select is(
  (select processing_status from public.hotmart_webhook_events where provider_event_id = 'hotmart-event-unmatched'),
  'unmatched',
  'evento sem vínculo permanece identificável para tratamento'
);

select * from finish();
rollback;
