drop policy if exists classes_select on public.classes;
create policy classes_select on public.classes for select to authenticated
using (
  (select private.is_super_admin())
  or (
    select private.has_org_role(
      organization_id,
      array['director', 'coordinator']::public.organization_role[]
    )
  )
  or (
    created_by = (select auth.uid())
    and (
      select private.has_org_role(
        organization_id,
        array['teacher']::public.organization_role[]
      )
    )
  )
  or (select private.is_active_class_member(id))
  or (select private.has_pending_class_invite(id))
);

create function public.remove_student_from_class(
  p_class_id uuid,
  p_student_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_organization_id uuid;
begin
  if v_actor_id is null or (
    not private.is_super_admin() and not private.can_manage_class(p_class_id)
  ) then
    raise exception 'Sem permissão para gerenciar a turma' using errcode = '42501';
  end if;

  select organization_id into v_organization_id
  from public.classes where id = p_class_id;

  delete from public.class_members
  where class_id = p_class_id and user_id = p_student_id;
  if not found then raise exception 'Aluno não está matriculado nesta turma'; end if;

  insert into public.audit_events (
    organization_id, actor_user_id, action, entity_type, entity_id, metadata
  ) values (
    v_organization_id, v_actor_id, 'class_member.removed', 'class', p_class_id,
    jsonb_build_object('student_id', p_student_id)
  );
end;
$$;

create function public.revoke_class_invite(p_invite_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_class_id uuid;
  v_organization_id uuid;
begin
  select ci.class_id, c.organization_id
  into v_class_id, v_organization_id
  from public.class_invites ci
  join public.classes c on c.id = ci.class_id
  where ci.id = p_invite_id;

  if v_actor_id is null or v_class_id is null or (
    not private.is_super_admin() and not private.can_manage_class(v_class_id)
  ) then
    raise exception 'Sem permissão para revogar este convite' using errcode = '42501';
  end if;

  update public.class_invites
  set status = 'revoked', revoked_at = now()
  where id = p_invite_id and status = 'pending';
  if not found then raise exception 'Convite pendente não encontrado'; end if;

  insert into public.audit_events (
    organization_id, actor_user_id, action, entity_type, entity_id
  ) values (
    v_organization_id, v_actor_id, 'class_invite.revoked', 'class_invite', p_invite_id
  );
end;
$$;

create function public.set_class_archived(p_class_id uuid, p_archived boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := auth.uid();
  v_organization_id uuid;
begin
  if v_actor_id is null or (
    not private.is_super_admin() and not private.can_manage_class(p_class_id)
  ) then
    raise exception 'Sem permissão para alterar a turma' using errcode = '42501';
  end if;

  update public.classes
  set is_archived = p_archived
  where id = p_class_id
  returning organization_id into v_organization_id;
  if not found then raise exception 'Turma não encontrada'; end if;

  insert into public.audit_events (
    organization_id, actor_user_id, action, entity_type, entity_id
  ) values (
    v_organization_id, v_actor_id,
    case when p_archived then 'class.archived' else 'class.restored' end,
    'class', p_class_id
  );
end;
$$;

revoke all on function public.remove_student_from_class(uuid, uuid) from public, anon;
revoke all on function public.revoke_class_invite(uuid) from public, anon;
revoke all on function public.set_class_archived(uuid, boolean) from public, anon;
grant execute on function public.remove_student_from_class(uuid, uuid) to authenticated;
grant execute on function public.revoke_class_invite(uuid) to authenticated;
grant execute on function public.set_class_archived(uuid, boolean) to authenticated;
