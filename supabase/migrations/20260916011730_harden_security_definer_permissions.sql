-- rls_auto_enable is invoked exclusively by the ensure_rls event trigger.
-- It is not an application RPC and must not be callable through PostgREST.
revoke all on function public.rls_auto_enable()
from public, anon, authenticated, service_role;

grant execute on function public.rls_auto_enable() to postgres;
