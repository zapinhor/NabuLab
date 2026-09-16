begin;

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('00000000-0000-0000-0000-000000000000', '91000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
   'security-a@nabulab.test', crypt('temporary-test-password-a', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Security A","username":"security-a"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '92000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated',
   'security-b@nabulab.test', crypt('temporary-test-password-b', gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Security B","username":"security-b"}', now(), now());

insert into public.exam_attempts (
  user_id, id, created_at, started_at, submitted_at, mode, total_questions,
  answered, unanswered, correct, incorrect, percentage, difficulty,
  question_type, selected_subjects, subjects, question_ids
) values (
  '91000000-0000-0000-0000-000000000001', 'security-attempt-a', now(), now(), now(), 'manual', 1,
  1, 0, 1, 0, 100, 'iniciante', 'multiple-choice',
  array['historia'], array['historia'], array['vest-historia-001']
);

insert into public.platform_admins (user_id)
values ('91000000-0000-0000-0000-000000000001');

do $$
begin
  if (select role <> 'admin'::public.platform_admin_role from public.platform_admins where user_id = '91000000-0000-0000-0000-000000000001') then
    raise exception 'new admin did not default to admin';
  end if;
  if has_table_privilege('authenticated', 'public.auth_login_limits', 'select')
     or has_table_privilege('authenticated', 'public.auth_login_limits', 'insert')
     or has_table_privilege('authenticated', 'public.auth_login_limits', 'update') then
    raise exception 'authenticated can access auth_login_limits';
  end if;
  if has_table_privilege('anon', 'public.auth_login_limits', 'select') then
    raise exception 'anon can read auth_login_limits';
  end if;
  if has_table_privilege('authenticated', 'public.analytics_events', 'select') then
    raise exception 'authenticated can read global analytics';
  end if;
  if has_table_privilege('authenticated', 'public.platform_admins', 'insert')
     or has_table_privilege('authenticated', 'public.platform_admins', 'update') then
    raise exception 'authenticated can promote itself';
  end if;
  if has_table_privilege('authenticated', 'public.subscriptions', 'update') then
    raise exception 'authenticated can update subscriptions';
  end if;
  if has_table_privilege('authenticated', 'public.hotmart_webhook_events', 'select') then
    raise exception 'authenticated can read hotmart_webhook_events';
  end if;
end $$;

set local role authenticated;
select set_config('request.jwt.claim.sub', '92000000-0000-0000-0000-000000000002', true);

do $$
begin
  if (select count(*) from public.exam_attempts where id = 'security-attempt-a') <> 0 then
    raise exception 'user B can read user A private attempt';
  end if;
end $$;

reset role;

set local role service_role;
select * from public.record_login_failure(repeat('a', 64), repeat('1', 64), 5, 15, 15);
select * from public.record_login_failure(repeat('a', 64), repeat('1', 64), 5, 15, 15);
select * from public.record_login_failure(repeat('a', 64), repeat('1', 64), 5, 15, 15);
select * from public.record_login_failure(repeat('a', 64), repeat('1', 64), 5, 15, 15);
select * from public.record_login_failure(repeat('a', 64), repeat('1', 64), 5, 15, 15);

do $$
begin
  if not (select blocked and retry_after_seconds > 0 from public.login_limit_status(repeat('a', 64), repeat('1', 64))) then
    raise exception 'fifth failure did not arm cooldown';
  end if;
  if (select blocked from public.login_limit_status(repeat('b', 64), repeat('1', 64))) then
    raise exception 'another account at the same origin was blocked';
  end if;
  if (select blocked from public.login_limit_status(repeat('a', 64), repeat('2', 64))) then
    raise exception 'same account at another origin was blocked';
  end if;
  perform public.clear_login_failures(repeat('a', 64), repeat('1', 64));
  if (select blocked from public.login_limit_status(repeat('a', 64), repeat('1', 64))) then
    raise exception 'successful-login cleanup did not clear the bucket';
  end if;
end $$;
reset role;

select json_build_object(
  'a_cannot_read_b_private', true,
  'authenticated_login_limits_read_write_denied', true,
  'anon_login_limits_read_denied', true,
  'authenticated_global_analytics_denied', true,
  'authenticated_self_promotion_denied', true,
  'new_admin_defaults_to_admin', true,
  'student_subscription_update_denied', true,
  'student_webhook_events_read_denied', true,
  'fifth_failure_arms_cooldown', true,
  'sixth_request_precheck_blocked', true,
  'account_and_origin_buckets_isolated', true,
  'successful_login_cleanup', true,
  'transaction', 'rollback'
) as validation;

rollback;
