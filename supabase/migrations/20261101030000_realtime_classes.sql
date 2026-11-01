-- Atualização em tempo real nas turmas: pedidos de entrada, aprovações, convites,
-- atividades publicadas e entregas. O Realtime respeita o RLS de cada tabela,
-- então cada pessoa só recebe eventos das linhas que já pode ler.
alter publication supabase_realtime add table
  public.teacher_class_members,
  public.teacher_class_invites,
  public.teacher_class_activities,
  public.teacher_activity_attempts;
