create or replace function public.create_teacher_class_invite(p_class_id uuid,p_identifier text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  normalized text := lower(btrim(p_identifier));
  username_value text;
  target uuid;
  mail text;
  result uuid;
begin
  if not private.is_teacher_class_owner(p_class_id) then raise exception 'class_owner_required'; end if;
  if left(normalized,1)='@' then
    username_value := substr(normalized,2);
    if username_value='' then raise exception 'user_not_found'; end if;
    select id into target from public.profiles where lower(username)=username_value limit 1;
  elsif position('@' in normalized)>1 then
    mail := normalized;
    select id into target from public.profiles where lower(email)=mail limit 1;
  else
    username_value := normalized;
    select id into target from public.profiles where lower(username)=username_value limit 1;
  end if;
  if target is null and mail is null then raise exception 'user_not_found'; end if;
  insert into public.teacher_class_invites(class_id,invitee_user_id,email,created_by)
  values(p_class_id,target,mail,uid)
  returning id into result;
  return result;
end;
$$;

revoke all on function public.create_teacher_class_invite(uuid,text) from public, anon, authenticated;
grant execute on function public.create_teacher_class_invite(uuid,text) to authenticated;
