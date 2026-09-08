create function public.revoke_organization_member(
  p_organization_id uuid,
  p_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_target_role public.organization_role;
begin
  if v_actor_id is null then
    raise exception 'Autenticação necessária' using errcode = '42501';
  end if;

  select role into v_target_role
  from public.organization_members
  where organization_id = p_organization_id and user_id = p_user_id
  for update;

  if v_target_role is null then
    raise exception 'Membro não encontrado';
  end if;

  if private.is_super_admin() then
    null;
  elsif private.has_org_role(
    p_organization_id,
    array['director']::public.organization_role[]
  ) then
    if p_user_id = v_actor_id or v_target_role not in ('coordinator', 'teacher') then
      raise exception 'Diretor só pode remover Coordenadores e Professores' using errcode = '42501';
    end if;
  else
    raise exception 'Sem permissão para revogar este acesso' using errcode = '42501';
  end if;

  delete from public.class_members cm
  using public.classes c
  where cm.class_id = c.id
    and c.organization_id = p_organization_id
    and cm.user_id = p_user_id;

  delete from public.organization_members
  where organization_id = p_organization_id and user_id = p_user_id;

  insert into public.audit_events (
    organization_id,
    actor_user_id,
    action,
    entity_type,
    entity_id,
    metadata
  ) values (
    p_organization_id,
    v_actor_id,
    'organization_member.revoked',
    'profile',
    p_user_id,
    jsonb_build_object('previous_role', v_target_role)
  );
end;
$$;

revoke all on function public.revoke_organization_member(uuid, uuid)
from public, anon;
grant execute on function public.revoke_organization_member(uuid, uuid)
to authenticated;
