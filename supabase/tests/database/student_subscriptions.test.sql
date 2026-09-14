begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
grant usage on schema extensions to authenticated;
select plan(8);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.subscriptions'::regclass),
  'RLS está habilitado em subscriptions'
);
select ok(
  has_table_privilege('authenticated', 'public.subscriptions', 'select')
  and not has_table_privilege('authenticated', 'public.subscriptions', 'insert')
  and not has_table_privilege('authenticated', 'public.subscriptions', 'update')
  and not has_table_privilege('authenticated', 'public.subscriptions', 'delete'),
  'estudante pode apenas consultar subscriptions'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('00000000-0000-0000-0000-000000000000', '31000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
   'c1-a@nabulab.test', crypt('test-password-a', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"C1 A","username":"c1-a"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '32000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated',
   'c1-b@nabulab.test', crypt('test-password-b', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"C1 B","username":"c1-b"}', now(), now());

insert into public.subscriptions (user_id, plan, status, price_tier, provider)
values
  ('31000000-0000-0000-0000-000000000001', 'premium', 'active', 'founder_477', 'manual'),
  ('32000000-0000-0000-0000-000000000002', 'free', 'active', null, null);

set local role authenticated;
select set_config('request.jwt.claim.sub', '31000000-0000-0000-0000-000000000001', true);

select is((select count(*)::integer from public.subscriptions), 1, 'Conta A lê apenas a própria assinatura');
select is((select plan from public.subscriptions), 'premium', 'Conta A vê seu plano Premium');

select throws_ok(
  $$insert into public.subscriptions (user_id, plan, status) values ('31000000-0000-0000-0000-000000000001', 'free', 'active')$$,
  'permission denied for table subscriptions',
  'usuário comum não cria assinatura'
);
select throws_ok(
  $$update public.subscriptions set plan = 'premium', status = 'active' where user_id = '31000000-0000-0000-0000-000000000001'$$,
  'permission denied for table subscriptions',
  'usuário comum não se promove'
);
select throws_ok(
  $$delete from public.subscriptions where user_id = '31000000-0000-0000-0000-000000000001'$$,
  'permission denied for table subscriptions',
  'usuário comum não remove assinatura'
);

select set_config('request.jwt.claim.sub', '32000000-0000-0000-0000-000000000002', true);
select is((select count(*)::integer from public.subscriptions where plan = 'premium'), 0, 'Conta B não lê o Premium da Conta A');

reset role;
select * from finish();
rollback;
