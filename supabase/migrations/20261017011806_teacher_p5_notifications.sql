-- P5: centralized in-app notifications, preferences and reminder processing.

create type public.notification_priority as enum ('information', 'attention', 'important');

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in (
    'class_invite','class_join_request','class_join_approved','class_member_joined',
    'activity_published','activity_due_soon','activity_due_today','activity_closed',
    'activity_result_available','activity_progress','teacher_limit_attention'
  )),
  priority public.notification_priority not null default 'information',
  title text not null check (char_length(btrim(title)) between 3 and 160),
  body text not null check (char_length(btrim(body)) between 3 and 500),
  entity_type text check (entity_type is null or entity_type in ('class','activity','invite','plan')),
  entity_id uuid,
  action_path text check (action_path is null or (action_path like '/%' and action_path not like '//%')),
  dedupe_key text not null check (char_length(dedupe_key) between 3 and 240),
  aggregation_count integer not null default 1 check (aggregation_count > 0),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  read_at timestamptz,
  event_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (recipient_user_id, dedupe_key)
);
create index notifications_recipient_unread_idx on public.notifications(recipient_user_id, created_at desc) where read_at is null;
create index notifications_recipient_history_idx on public.notifications(recipient_user_id, created_at desc);

create table public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  in_app_activities boolean not null default true,
  in_app_deadlines boolean not null default true,
  in_app_classes boolean not null default true,
  email_activities boolean not null default true,
  email_deadlines boolean not null default true,
  email_classes boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.notification_email_deliveries (
  id uuid primary key default gen_random_uuid(),
  dedupe_key text not null unique,
  recipient_user_id uuid references public.profiles(id) on delete cascade,
  category text not null check (category in ('activities','deadlines','classes')),
  status text not null check (status in ('sent','failed','skipped')),
  attempt_count integer not null default 1 check (attempt_count between 1 and 3),
  safe_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index notification_email_deliveries_recipient_idx on public.notification_email_deliveries(recipient_user_id, created_at desc);

alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.notification_email_deliveries enable row level security;

revoke all on public.notifications, public.notification_preferences, public.notification_email_deliveries from public, anon, authenticated;
grant select, update on public.notifications to authenticated;
grant select, insert, update on public.notification_preferences to authenticated;

create policy notifications_select_own on public.notifications for select to authenticated
using ((select auth.uid()) = recipient_user_id);
create policy notifications_update_own on public.notifications for update to authenticated
using ((select auth.uid()) = recipient_user_id)
with check ((select auth.uid()) = recipient_user_id);
create policy notification_preferences_select_own on public.notification_preferences for select to authenticated
using ((select auth.uid()) = user_id);
create policy notification_preferences_insert_own on public.notification_preferences for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy notification_preferences_update_own on public.notification_preferences for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create function private.notification_category_enabled(p_user_id uuid, p_category text)
returns boolean language sql stable security definer set search_path = '' as $$
  select case p_category
    when 'activities' then coalesce(n.in_app_activities, true)
    when 'deadlines' then coalesce(n.in_app_deadlines, true)
    when 'classes' then coalesce(n.in_app_classes, true)
    else true end
  from (select 1) seed
  left join public.notification_preferences n on n.user_id = p_user_id;
$$;

create function private.upsert_notification(
  p_recipient uuid, p_type text, p_priority public.notification_priority,
  p_title text, p_body text, p_entity_type text, p_entity_id uuid,
  p_action_path text, p_dedupe_key text, p_category text,
  p_increment boolean default false, p_metadata jsonb default '{}'::jsonb
) returns uuid language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  if p_recipient is null then return null; end if;
  if p_priority <> 'important' and not coalesce(private.notification_category_enabled(p_recipient, p_category), true) then return null; end if;
  insert into public.notifications(recipient_user_id,type,priority,title,body,entity_type,entity_id,action_path,dedupe_key,metadata)
  values(p_recipient,p_type,p_priority,p_title,p_body,p_entity_type,p_entity_id,p_action_path,p_dedupe_key,coalesce(p_metadata,'{}'::jsonb))
  on conflict(recipient_user_id,dedupe_key) do update set
    title=excluded.title, body=excluded.body, priority=excluded.priority,
    aggregation_count=case when p_increment then public.notifications.aggregation_count + 1 else public.notifications.aggregation_count end,
    metadata=excluded.metadata, event_at=now(), updated_at=now(), read_at=null
  returning id into result;
  return result;
end;
$$;

create function private.notify_teacher_invite() returns trigger language plpgsql security definer set search_path = '' as $$
declare class_name text;
begin
  if new.invitee_user_id is null then return new; end if;
  select c.public_name into class_name from public.teacher_classes c where c.id=new.class_id;
  perform private.upsert_notification(new.invitee_user_id,'class_invite','important','Convite para turma',
    'Você recebeu um convite para '||class_name||'.','invite',new.id,'/turmas','invite:'||new.id,'classes',false,
    jsonb_build_object('class_id',new.class_id));
  return new;
end; $$;

create function private.notify_teacher_membership() returns trigger language plpgsql security definer set search_path = '' as $$
declare owner_id uuid; class_name text; student_name text;
begin
  select c.owner_id,c.public_name into owner_id,class_name from public.teacher_classes c where c.id=new.class_id;
  select coalesce(nullif(p.full_name,''),nullif(p.username,''),'Um aluno') into student_name from public.profiles p where p.id=new.user_id;
  if tg_op='INSERT' and new.status='pending' then
    perform private.upsert_notification(owner_id,'class_join_request','important','Solicitação de entrada',
      student_name||' quer entrar em '||class_name||'.','class',new.class_id,
      '/professor/turmas/'||new.class_id||'#solicitacoes','join-request:'||new.class_id||':'||new.user_id,'classes');
  elsif new.status='active' and (tg_op='INSERT' or old.status is distinct from 'active') then
    perform private.upsert_notification(new.user_id,'class_join_approved','important','Entrada na turma confirmada',
      'Você agora participa de '||class_name||'.','class',new.class_id,'/turmas/'||new.class_id,
      'join-approved:'||new.class_id||':'||new.user_id,'classes');
    if new.source in ('code','link') then
      perform private.upsert_notification(owner_id,'class_member_joined','information','Novo aluno na turma',
        student_name||' entrou em '||class_name||'.','class',new.class_id,'/professor/turmas/'||new.class_id||'#alunos',
        'member-joined:'||new.class_id||':'||new.user_id,'classes');
    end if;
  end if;
  return new;
end; $$;

create function private.notify_activity_published() returns trigger language plpgsql security definer set search_path = '' as $$
declare member record; class_name text;
begin
  if new.status <> 'published' or (tg_op='UPDATE' and old.status='published') then return new; end if;
  select c.public_name into class_name from public.teacher_classes c where c.id=new.class_id;
  for member in select m.user_id from public.teacher_class_members m where m.class_id=new.class_id and m.status='active' loop
    perform private.upsert_notification(member.user_id,'activity_published','information','Nova atividade disponível',
      'Seu professor publicou "'||new.title||'" em '||class_name||'.','activity',new.id,
      '/turmas/atividades/'||new.id,'activity-published:'||new.id,'activities',false,
      jsonb_build_object('class_id',new.class_id,'due_at',new.due_at));
  end loop;
  return new;
end; $$;

create function private.notify_activity_submission() returns trigger language plpgsql security definer set search_path = '' as $$
declare activity record; owner_id uuid; completed bigint; member_count bigint;
begin
  if new.status <> 'submitted' or (old.status='submitted') then return new; end if;
  select a.id,a.class_id,a.title,a.show_score,c.owner_id into activity
  from public.teacher_class_activities a join public.teacher_classes c on c.id=a.class_id where a.id=new.activity_id;
  select count(*) into completed from public.teacher_activity_attempts t where t.activity_id=new.activity_id and t.status='submitted';
  select count(*) into member_count from public.teacher_class_members m where m.class_id=activity.class_id and m.status='active';
  perform private.upsert_notification(activity.owner_id,'activity_progress','information','Progresso da atividade',
    completed||' de '||member_count||' alunos concluíram "'||activity.title||'".','activity',new.activity_id,
    '/professor/turmas/'||activity.class_id||'/analytics','activity-progress:'||new.activity_id,'activities',true,
    jsonb_build_object('completed',completed,'total',member_count));
  if activity.show_score then
    perform private.upsert_notification(new.student_id,'activity_result_available','information','Resultado disponível',
      'Seu resultado em "'||activity.title||'" já está disponível.','activity',new.activity_id,
      '/turmas/atividades/'||new.activity_id,'activity-result:'||new.activity_id||':'||new.student_id,'activities');
  end if;
  return new;
end; $$;

create trigger teacher_invite_notification after insert on public.teacher_class_invites
for each row execute function private.notify_teacher_invite();
create trigger teacher_membership_notification after insert or update of status on public.teacher_class_members
for each row execute function private.notify_teacher_membership();
create trigger teacher_activity_published_notification after insert or update of status on public.teacher_class_activities
for each row execute function private.notify_activity_published();
create trigger teacher_activity_submission_notification after update of status on public.teacher_activity_attempts
for each row execute function private.notify_activity_submission();

create function public.mark_all_notifications_read() returns integer language plpgsql security invoker set search_path = '' as $$
declare changed integer;
begin
  update public.notifications set read_at=now(),updated_at=now() where recipient_user_id=(select auth.uid()) and read_at is null;
  get diagnostics changed = row_count;
  return changed;
end; $$;
revoke all on function public.mark_all_notifications_read() from public,anon,authenticated;
grant execute on function public.mark_all_notifications_read() to authenticated;

create function public.process_teacher_notification_reminders(p_now timestamptz default now())
returns integer language plpgsql security definer set search_path = '' as $$
declare activity record; member record; processed integer:=0; pending bigint;
begin
  if current_user not in ('postgres','service_role') then raise exception 'service_role_required'; end if;
  for activity in
    select a.id,a.class_id,a.title,a.due_at,c.owner_id,c.public_name
    from public.teacher_class_activities a join public.teacher_classes c on c.id=a.class_id
    where a.status='published' and a.due_at is not null and a.due_at > p_now and a.due_at <= p_now + interval '24 hours'
  loop
    for member in select m.user_id from public.teacher_class_members m
      where m.class_id=activity.class_id and m.status='active'
      and not exists(select 1 from public.teacher_activity_attempts t where t.activity_id=activity.id and t.student_id=m.user_id and t.status='submitted')
    loop
      perform private.upsert_notification(member.user_id,
        case when activity.due_at::date=p_now::date then 'activity_due_today' else 'activity_due_soon' end,
        'attention',case when activity.due_at::date=p_now::date then 'Atividade vence hoje' else 'Atividade vence em breve' end,
        '"'||activity.title||'" tem prazo próximo.','activity',activity.id,'/turmas/atividades/'||activity.id,
        'deadline:'||activity.id||':'||member.user_id||':'||case when activity.due_at::date=p_now::date then 'today' else '24h' end,
        'deadlines',false,jsonb_build_object('due_at',activity.due_at));
      processed:=processed+1;
    end loop;
    select count(*) into pending from public.teacher_class_members m where m.class_id=activity.class_id and m.status='active'
      and not exists(select 1 from public.teacher_activity_attempts t where t.activity_id=activity.id and t.student_id=m.user_id and t.status='submitted');
    if activity.due_at <= p_now + interval '1 hour' then
      perform private.upsert_notification(activity.owner_id,'activity_closed','attention','Atividade perto do encerramento',
        pending||' aluno(s) ainda não entregaram "'||activity.title||'".','activity',activity.id,
        '/professor/turmas/'||activity.class_id,'activity-closing:'||activity.id,'deadlines',false,jsonb_build_object('pending',pending));
      processed:=processed+1;
    end if;
  end loop;
  return processed;
end; $$;
revoke all on function public.process_teacher_notification_reminders(timestamptz) from public,anon,authenticated;
grant execute on function public.process_teacher_notification_reminders(timestamptz) to service_role;

revoke all on function private.notification_category_enabled(uuid,text),
  private.upsert_notification(uuid,text,public.notification_priority,text,text,text,uuid,text,text,text,boolean,jsonb),
  private.notify_teacher_invite(),private.notify_teacher_membership(),private.notify_activity_published(),private.notify_activity_submission()
from public,anon,authenticated;
