-- rls_auto_enable, when provisioned by the project, is invoked exclusively by
-- the ensure_rls event trigger. A brand-new database may not have that optional
-- function, so harden it conditionally to keep the migration history portable.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke all on function public.rls_auto_enable() from public, anon, authenticated, service_role';
    execute 'grant execute on function public.rls_auto_enable() to postgres';
  end if;
end
$$;
