begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(9);

select ok(
  (select count(*) = 9 and bool_and(c.relrowsecurity)
   from pg_class c
   join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relname = any(array[
       'profiles', 'platform_admins', 'organizations', 'organization_members',
       'organization_invites', 'classes', 'class_members', 'class_invites', 'audit_events'
     ])),
  'RLS está habilitado em todas as tabelas comerciais'
);

select ok(
  not has_table_privilege('anon', 'public.profiles', 'select'),
  'anon não pode consultar perfis'
);

select ok(
  not has_table_privilege('authenticated', 'public.organization_members', 'insert'),
  'membros não podem ser inseridos diretamente pela Data API'
);

select ok(
  not has_schema_privilege('anon', 'private', 'usage'),
  'anon não acessa helpers privados'
);

select ok(
  has_function_privilege('authenticated', 'public.remove_student_from_class(uuid,uuid)', 'execute'),
  'usuários autenticados podem chamar remoção protegida por autorização interna'
);

select ok(
  exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and qual like '%staff_can_view_profile%'
  ),
  'diretório de perfis usa regra específica para equipe'
);

select ok(
  exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'classes'
      and qual like '%is_active_class_member%'
  ),
  'aluno só acessa turma mediante matrícula ativa'
);

select ok(
  (select bool_and(p.prosecdef and coalesce(array_to_string(p.proconfig, ','), '') like '%search_path=""%')
   from pg_proc p
   join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public'
     and p.proname = any(array[
       'create_organization', 'create_organization_invite', 'respond_organization_invite',
       'create_class_invite', 'respond_class_invite', 'revoke_organization_member',
       'remove_student_from_class', 'revoke_class_invite', 'set_class_archived'
     ])),
  'RPCs privilegiadas usam SECURITY DEFINER com search_path vazio'
);

select ok(
  not has_table_privilege('authenticated', 'public.class_invites', 'update'),
  'convites de turma não podem ser alterados diretamente'
);

select * from finish();
rollback;
