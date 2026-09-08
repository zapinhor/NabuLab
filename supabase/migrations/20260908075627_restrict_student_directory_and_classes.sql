create function private.staff_can_view_profile(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members viewer
    join public.organization_members target using (organization_id)
    where viewer.user_id = (select auth.uid())
      and viewer.role in ('director', 'coordinator', 'teacher')
      and target.user_id = p_user_id
  );
$$;

create function private.is_active_class_member(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.class_members cm
    where cm.class_id = p_class_id
      and cm.user_id = (select auth.uid())
      and cm.status = 'active'
  );
$$;

revoke all on function private.staff_can_view_profile(uuid) from public, anon, authenticated;
revoke all on function private.is_active_class_member(uuid) from public, anon, authenticated;
grant execute on function private.staff_can_view_profile(uuid) to authenticated;
grant execute on function private.is_active_class_member(uuid) to authenticated;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
using (
  id = (select auth.uid())
  or (select private.is_super_admin())
  or (select private.staff_can_view_profile(id))
);

drop policy if exists organization_members_select on public.organization_members;
create policy organization_members_select on public.organization_members for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_super_admin())
  or (
    select private.has_org_role(
      organization_id,
      array['director', 'coordinator', 'teacher']::public.organization_role[]
    )
  )
);

drop policy if exists classes_select on public.classes;
create policy classes_select on public.classes for select to authenticated
using (
  (select private.is_super_admin())
  or (
    select private.has_org_role(
      organization_id,
      array['director', 'coordinator', 'teacher']::public.organization_role[]
    )
  )
  or (select private.is_active_class_member(id))
  or (select private.has_pending_class_invite(id))
);
