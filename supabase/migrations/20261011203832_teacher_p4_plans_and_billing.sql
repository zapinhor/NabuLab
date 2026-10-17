-- P4: Professor plans, server-side entitlements and independent Hotmart state.

alter type public.teacher_plan rename value 'basic' to 'essential';
alter type public.teacher_plan rename value 'intermediate' to 'pro';

alter table public.teacher_accounts
  add column billing_cycle text check (billing_cycle is null or billing_cycle in ('monthly','yearly')),
  add column billing_status text not null default 'free' check (billing_status in ('free','active','past_due','canceled','expired')),
  add column provider text check (provider is null or provider = 'hotmart'),
  add column provider_customer_id text,
  add column provider_subscription_id text,
  add column provider_event_id text,
  add column provider_updated_at timestamptz,
  add column current_period_start timestamptz,
  add column current_period_end timestamptz,
  add column cancel_at_period_end boolean not null default false;

create unique index teacher_accounts_provider_subscription_idx
  on public.teacher_accounts(provider, provider_subscription_id)
  where provider_subscription_id is not null;

update public.teacher_plan_limits set
  active_classes = 1, students_per_class = 40, exams_per_week = 2,
  features = '{"full_analytics":false,"activity_comparison":false,"content_analytics":false,"student_evolution":false,"csv_export":false,"basic_grades":true,"activities":true,"unlimited_questions":true}'::jsonb
where plan = 'free';
update public.teacher_plan_limits set
  active_classes = 3, students_per_class = 50, exams_per_week = 10,
  features = '{"full_analytics":true,"activity_comparison":true,"content_analytics":true,"student_evolution":true,"csv_export":true,"basic_grades":true,"activities":true,"unlimited_questions":true}'::jsonb
where plan = 'essential';
update public.teacher_plan_limits set
  active_classes = 10, students_per_class = 70, exams_per_week = null,
  features = '{"full_analytics":true,"activity_comparison":true,"content_analytics":true,"student_evolution":true,"csv_export":true,"basic_grades":true,"activities":true,"unlimited_questions":true}'::jsonb
where plan = 'pro';
update public.teacher_plan_limits set
  active_classes = 30, students_per_class = 100, exams_per_week = null,
  features = '{"full_analytics":true,"activity_comparison":true,"content_analytics":true,"student_evolution":true,"csv_export":true,"basic_grades":true,"activities":true,"unlimited_questions":true}'::jsonb
where plan = 'advanced';

create or replace function private.teacher_feature_enabled(p_user_id uuid, p_feature text)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((l.features ->> p_feature)::boolean, false)
  from public.teacher_accounts a
  join public.teacher_plan_limits l on l.plan = a.plan
  where a.user_id = p_user_id;
$$;
revoke all on function private.teacher_feature_enabled(uuid,text) from public,anon,authenticated;

create or replace function public.get_teacher_entitlements()
returns table(
  plan public.teacher_plan, billing_cycle text, billing_status text,
  current_period_end timestamptz, cancel_at_period_end boolean,
  active_classes integer, students_per_class integer, exams_per_week integer, features jsonb
)
language sql stable security definer set search_path = '' as $$
  select a.plan,a.billing_cycle,a.billing_status,a.current_period_end,a.cancel_at_period_end,
    l.active_classes,l.students_per_class,l.exams_per_week,l.features
  from public.teacher_accounts a join public.teacher_plan_limits l on l.plan=a.plan
  where a.user_id=(select auth.uid());
$$;
revoke all on function public.get_teacher_entitlements() from public,anon,authenticated;
grant execute on function public.get_teacher_entitlements() to authenticated;

create or replace function private.enforce_teacher_class_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
declare limits public.teacher_plan_limits; owner uuid;
begin
  if new.status <> 'active' or (tg_op='UPDATE' and old.status='active') then return new; end if;
  owner := new.owner_id;
  perform 1 from public.teacher_accounts where user_id=owner for update;
  select l.* into limits from public.teacher_accounts a join public.teacher_plan_limits l on l.plan=a.plan where a.user_id=owner;
  if limits.active_classes is not null and
    (select count(*) from public.teacher_classes c where c.owner_id=owner and c.status='active' and (tg_op='INSERT' or c.id<>new.id)) >= limits.active_classes
  then raise exception 'teacher_active_class_limit_reached'; end if;
  new.student_limit := limits.students_per_class;
  return new;
end; $$;
revoke all on function private.enforce_teacher_class_limit() from public,anon,authenticated;
create trigger teacher_classes_plan_limit before insert or update of status on public.teacher_classes
for each row execute function private.enforce_teacher_class_limit();

create or replace function private.enforce_teacher_member_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
declare limits public.teacher_plan_limits; owner uuid; member_count bigint;
begin
  if new.status <> 'active' or (tg_op='UPDATE' and old.status='active') then return new; end if;
  select c.owner_id into owner from public.teacher_classes c where c.id=new.class_id for update;
  perform 1 from public.teacher_accounts where user_id=owner for update;
  select l.* into limits from public.teacher_accounts a join public.teacher_plan_limits l on l.plan=a.plan where a.user_id=owner;
  select count(*) into member_count from public.teacher_class_members m where m.class_id=new.class_id and m.status='active' and (tg_op='INSERT' or m.user_id<>new.user_id);
  if limits.students_per_class is not null and member_count >= limits.students_per_class then
    raise exception 'teacher_class_student_limit_reached';
  end if;
  return new;
end; $$;
revoke all on function private.enforce_teacher_member_limit() from public,anon,authenticated;
create trigger teacher_members_plan_limit before insert or update of status on public.teacher_class_members
for each row execute function private.enforce_teacher_member_limit();

create or replace function private.enforce_teacher_exam_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
declare limits public.teacher_plan_limits;
begin
  perform 1 from public.teacher_accounts where user_id=new.owner_id for update;
  select l.* into limits from public.teacher_accounts a join public.teacher_plan_limits l on l.plan=a.plan where a.user_id=new.owner_id;
  if limits.exams_per_week is not null and
    (select count(*) from public.teacher_exams e where e.owner_id=new.owner_id and e.created_at>=date_trunc('week',now())) >= limits.exams_per_week
  then raise exception 'teacher_weekly_exam_limit_reached'; end if;
  return new;
end; $$;
revoke all on function private.enforce_teacher_exam_limit() from public,anon,authenticated;
create trigger teacher_exams_plan_limit before insert on public.teacher_exams
for each row execute function private.enforce_teacher_exam_limit();

create or replace function private.reconcile_teacher_class_limit(p_user_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare maximum integer;
begin
  select l.active_classes into maximum from public.teacher_accounts a join public.teacher_plan_limits l on l.plan=a.plan where a.user_id=p_user_id;
  if maximum is null then return; end if;
  update public.teacher_classes set status='inactive',updated_at=now()
  where id in (
    select id from public.teacher_classes where owner_id=p_user_id and status='active'
    order by created_at asc offset maximum
  );
end; $$;
revoke all on function private.reconcile_teacher_class_limit(uuid) from public,anon,authenticated;

create or replace function public.process_teacher_hotmart_webhook_event(
  p_event_id text,p_event_type text,p_product_id text,p_event_created_at timestamptz,
  p_transaction_id text,p_subscription_id text,p_provider_customer_id text,p_normalized_email text,
  p_plan text,p_cycle text,p_subscription_status text,p_current_period_start timestamptz,
  p_current_period_end timestamptz,p_sanitized_payload jsonb
)
returns table(result text,resolved_user_id uuid)
language plpgsql security definer set search_path = '' as $$
declare uid uuid; account public.teacher_accounts; effective_plan public.teacher_plan;
begin
  if p_event_id is null or btrim(p_event_id)='' then raise exception 'HOTMART_EVENT_ID_REQUIRED'; end if;
  if p_plan not in ('essential','pro','advanced') or p_cycle not in ('monthly','yearly') then raise exception 'HOTMART_TEACHER_OFFER_INVALID'; end if;
  if p_subscription_status not in ('active','past_due','canceled','expired') then raise exception 'HOTMART_STATUS_INVALID'; end if;
  insert into public.hotmart_webhook_events(provider_event_id,event_type,product_id,transaction_id,subscription_id,event_created_at,sanitized_payload)
  values(p_event_id,p_event_type,p_product_id,p_transaction_id,p_subscription_id,p_event_created_at,coalesce(p_sanitized_payload,'{}'::jsonb))
  on conflict(provider_event_id) do nothing;
  if not found then return query select 'duplicate'::text,null::uuid; return; end if;
  select b.user_id into uid from public.billing_customers b where b.provider='hotmart' and b.normalized_email=lower(btrim(p_normalized_email));
  if uid is null then
    update public.hotmart_webhook_events set processing_status='unmatched',processing_detail='billing_identity_not_found',processed_at=now() where provider_event_id=p_event_id;
    return query select 'unmatched'::text,null::uuid; return;
  end if;
  insert into public.teacher_accounts(user_id) values(uid) on conflict(user_id) do nothing;
  select * into account from public.teacher_accounts where user_id=uid for update;
  if account.provider_updated_at is not null and account.provider_updated_at>p_event_created_at then
    update public.hotmart_webhook_events set processing_status='stale',processing_detail='older_than_current_teacher_subscription',processed_at=now() where provider_event_id=p_event_id;
    return query select 'stale'::text,uid; return;
  end if;
  if account.provider_subscription_id is not null and p_subscription_id is not null and account.provider_subscription_id<>p_subscription_id then
    update public.hotmart_webhook_events set processing_status='conflict',processing_detail='teacher_subscription_mismatch',processed_at=now() where provider_event_id=p_event_id;
    return query select 'conflict'::text,uid; return;
  end if;
  effective_plan := p_plan::public.teacher_plan;
  if p_event_type in ('PURCHASE_REFUNDED','PURCHASE_CHARGEBACK','PURCHASE_CANCELED','PURCHASE_EXPIRED') then effective_plan := 'free'; end if;
  update public.teacher_accounts set plan=effective_plan,billing_cycle=case when effective_plan='free' then null else p_cycle end,
    billing_status=p_subscription_status,provider='hotmart',provider_customer_id=coalesce(p_provider_customer_id,provider_customer_id),
    provider_subscription_id=coalesce(p_subscription_id,provider_subscription_id),provider_event_id=p_event_id,provider_updated_at=p_event_created_at,
    current_period_start=coalesce(p_current_period_start,current_period_start),current_period_end=coalesce(p_current_period_end,current_period_end),
    cancel_at_period_end=(p_event_type='SUBSCRIPTION_CANCELLATION'),updated_at=now()
  where user_id=uid;
  perform private.reconcile_teacher_class_limit(uid);
  update public.hotmart_webhook_events set processing_status='processed',processed_at=now() where provider_event_id=p_event_id;
  return query select 'processed'::text,uid;
end; $$;
revoke all on function public.process_teacher_hotmart_webhook_event(text,text,text,timestamptz,text,text,text,text,text,text,text,timestamptz,timestamptz,jsonb) from public,anon,authenticated;
grant execute on function public.process_teacher_hotmart_webhook_event(text,text,text,timestamptz,text,text,text,text,text,text,text,timestamptz,timestamptz,jsonb) to service_role;

comment on column public.teacher_accounts.plan is 'Effective Professor entitlement. Independent from the Student subscription.';

alter table public.analytics_events drop constraint analytics_events_event_name_check;
alter table public.analytics_events add constraint analytics_events_event_name_check check (event_name in (
  'landing_view','signup_cta_clicked','premium_cta_clicked','signup_started','signup_completed','login_completed',
  'first_student_use','first_question_answered','free_question_limit_reached','free_exam_started','free_exam_completed',
  'premium_page_viewed','checkout_started','purchase_approved','subscription_canceled',
  'teacher_plan_viewed','teacher_limit_reached','teacher_upgrade_clicked','teacher_checkout_started','teacher_plan_activated'
));

create or replace function public.get_teacher_class_p3_answers(
  p_class_id uuid,p_from timestamptz,p_to timestamptz,p_activity_id uuid default null,p_student_id uuid default null
) returns table(activity_id uuid,question_position integer,subject text,topic text,difficulty text,statement text,response_count bigint,correct_count bigint,error_count bigint)
language plpgsql stable security definer set search_path='' as $$
begin
  if p_from is null or p_to is null or p_to<=p_from or p_to-p_from>interval '367 days' then raise exception 'invalid_analytics_period'; end if;
  if not exists(select 1 from public.teacher_classes c where c.id=p_class_id and c.owner_id=(select auth.uid())) then raise exception 'teacher_class_not_available' using errcode='42501'; end if;
  if not private.teacher_feature_enabled((select auth.uid()),'content_analytics') then raise exception 'teacher_feature_required:content_analytics' using errcode='42501'; end if;
  return query with latest as (
    select distinct on(at.activity_id,at.student_id) at.id,at.activity_id
    from public.teacher_class_activities a join public.teacher_activity_attempts at on at.activity_id=a.id
    join public.teacher_class_members m on m.class_id=a.class_id and m.user_id=at.student_id and m.status='active'
    where a.class_id=p_class_id and a.status in('published','closed') and (p_activity_id is null or a.id=p_activity_id)
      and (p_student_id is null or at.student_id=p_student_id) and at.status='submitted' and at.submitted_at>=p_from and at.submitted_at<p_to
    order by at.activity_id,at.student_id,at.attempt_number desc,at.submitted_at desc,at.id desc
  ) select l.activity_id,aq.position,
    coalesce(nullif(btrim(aq.question_snapshot->>'subjectName'),''),nullif(btrim(aq.question_snapshot->>'subject'),''),'Não informado'),
    coalesce(nullif(btrim(aq.question_snapshot->>'topic'),''),'Não informado'),coalesce(nullif(btrim(aq.question_snapshot->>'difficulty'),''),'Não informado'),
    left(coalesce(aq.question_snapshot->>'statement','Questão sem enunciado'),300),count(*)::bigint,
    count(*) filter(where aa.is_correct is true)::bigint,count(*) filter(where aa.is_correct is not true)::bigint
  from latest l join public.teacher_activity_answers aa on aa.attempt_id=l.id
  join public.teacher_activity_questions aq on aq.activity_id=l.activity_id and aq.position=aa.question_position
  group by l.activity_id,aq.position,aq.question_snapshot order by l.activity_id,aq.position;
end; $$;
revoke all on function public.get_teacher_class_p3_answers(uuid,timestamptz,timestamptz,uuid,uuid) from public,anon,authenticated;
grant execute on function public.get_teacher_class_p3_answers(uuid,timestamptz,timestamptz,uuid,uuid) to authenticated;
