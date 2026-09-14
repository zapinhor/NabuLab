begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;
grant usage on schema extensions to authenticated;
select plan(12);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.daily_exam_usage'::regclass),
  'RLS está habilitado na quota diária'
);
select ok(
  has_table_privilege('authenticated', 'public.daily_exam_usage', 'select')
  and not has_table_privilege('authenticated', 'public.daily_exam_usage', 'insert')
  and not has_table_privilege('authenticated', 'public.daily_exam_usage', 'update')
  and not has_table_privilege('authenticated', 'public.daily_exam_usage', 'delete'),
  'estudante consulta, mas não altera o contador diretamente'
);
select ok(
  has_function_privilege('authenticated', 'public.consume_student_exam_quota()', 'execute')
  and not has_function_privilege('anon', 'public.consume_student_exam_quota()', 'execute'),
  'somente authenticated executa a RPC de consumo'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('00000000-0000-0000-0000-000000000000', '33000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated',
   'quota-free@nabulab.test', crypt('quota-free', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Quota Free","username":"quota-free"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '34000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated',
   'quota-premium@nabulab.test', crypt('quota-premium', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Quota Premium","username":"quota-premium"}', now(), now());

insert into public.subscriptions (user_id, plan, status, price_tier, provider)
values ('34000000-0000-0000-0000-000000000004', 'premium', 'active', 'standard_990', 'manual');

set local role authenticated;
select set_config('request.jwt.claim.sub', '33000000-0000-0000-0000-000000000003', true);

select is((select allowed from public.consume_student_exam_quota()), true, 'primeira geração Free permitida');
select is((select used_count from public.consume_student_exam_quota()), 2, 'segunda geração Free consome o segundo slot');
select is((select allowed from public.consume_student_exam_quota()), false, 'terceira geração Free bloqueada');
select is(
  (select used_count from public.daily_exam_usage where user_id = '33000000-0000-0000-0000-000000000003'),
  2,
  'contador Free nunca ultrapassa dois'
);

select set_config('request.jwt.claim.sub', '34000000-0000-0000-0000-000000000004', true);
select is((select allowed from public.consume_student_exam_quota()), true, 'Premium permitido');
select is((select daily_limit from public.consume_student_exam_quota()), null, 'Premium não recebe limite diário');
select is(
  (select count(*)::integer from public.daily_exam_usage where user_id = '34000000-0000-0000-0000-000000000004'),
  0,
  'Premium não cria contador diário'
);

select throws_ok(
  $$insert into public.daily_exam_usage (user_id, usage_date, used_count)
    values ('34000000-0000-0000-0000-000000000004', current_date, 1)$$,
  'permission denied for table daily_exam_usage',
  'estudante não injeta quota diretamente'
);

select set_config('request.jwt.claim.sub', '33000000-0000-0000-0000-000000000003', true);
select is(
  (select count(*)::integer from public.daily_exam_usage where user_id = '34000000-0000-0000-0000-000000000004'),
  0,
  'Conta Free não lê quota de outra conta'
);

reset role;
select * from finish();
rollback;
