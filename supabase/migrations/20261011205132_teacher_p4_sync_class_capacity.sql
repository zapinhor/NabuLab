-- Keep the displayed class capacity aligned with the effective plan while
-- preserving every member and every class during downgrades.
create or replace function private.sync_teacher_plan_capacity()
returns trigger language plpgsql security definer set search_path='' as $$
declare maximum integer;
begin
  select students_per_class into maximum from public.teacher_plan_limits where plan=new.plan;
  update public.teacher_classes set student_limit=maximum,updated_at=now() where owner_id=new.user_id;
  perform private.reconcile_teacher_class_limit(new.user_id);
  return new;
end; $$;
revoke all on function private.sync_teacher_plan_capacity() from public,anon,authenticated;
create trigger teacher_accounts_sync_capacity after update of plan on public.teacher_accounts
for each row when(old.plan is distinct from new.plan) execute function private.sync_teacher_plan_capacity();
