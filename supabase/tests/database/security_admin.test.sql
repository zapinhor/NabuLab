begin;
select plan(12);

select ok((select relrowsecurity from pg_class where oid='public.auth_login_limits'::regclass), 'RLS login limits');
select ok(not has_table_privilege('anon','public.auth_login_limits','select'), 'anon cannot read login limits');
select ok(not has_table_privilege('authenticated','public.auth_login_limits','select'), 'students cannot read login limits');
select ok(has_table_privilege('service_role','public.auth_login_limits','select'), 'service role reads login limits');
select ok(not has_function_privilege('authenticated','public.record_login_failure(text,text,integer,integer,integer)','execute'), 'students cannot record failures');
select ok(has_function_privilege('service_role','public.record_login_failure(text,text,integer,integer,integer)','execute'), 'service role records failures');
select ok(exists(select 1 from information_schema.columns where table_schema='public' and table_name='platform_admins' and column_name='role'), 'admin role exists');
select ok(exists(select 1 from information_schema.columns where table_schema='public' and table_name='platform_admins' and column_name='mfa_required'), 'MFA flag exists');
select ok(not has_table_privilege('authenticated','public.platform_admins','insert'), 'student cannot promote self');
select ok(not has_table_privilege('anon','public.subscriptions','select'), 'anon cannot read subscriptions');
select ok(not has_table_privilege('authenticated','public.analytics_events','select'), 'student cannot read global analytics');
select ok(not has_table_privilege('authenticated','public.hotmart_webhook_events','select'), 'student cannot read webhook events');

select * from finish();
rollback;
