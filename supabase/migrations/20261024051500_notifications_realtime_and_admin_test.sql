-- Notificações em tempo real e tipo de teste enviado pelo SQL Editor.
-- 1) Libera o tipo "admin_test" (notificações manuais de teste/aviso do administrador).
-- 2) Publica public.notifications no Supabase Realtime para o sino atualizar sem recarregar.
--    As políticas RLS existentes (notifications_select_own) continuam valendo:
--    cada usuário só recebe eventos das próprias notificações.

alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications add constraint notifications_type_check check (type = any (array[
  'class_invite', 'class_join_request', 'class_join_approved', 'class_member_joined',
  'activity_published', 'activity_due_soon', 'activity_due_today', 'activity_closed',
  'activity_result_available', 'activity_progress', 'teacher_limit_attention',
  'admin_test'
]));

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications'
  ) then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;
