-- P5 hardening: make non-aggregated notifications immutable/idempotent and
-- cover recently closed activities in the hourly reminder reconciliation.

create or replace function private.upsert_notification(
  p_recipient uuid, p_type text, p_priority public.notification_priority,
  p_title text, p_body text, p_entity_type text, p_entity_id uuid,
  p_action_path text, p_dedupe_key text, p_category text,
  p_increment boolean default false, p_metadata jsonb default '{}'::jsonb
) returns uuid language plpgsql security definer set search_path = '' as $$
declare result uuid;
begin
  if p_recipient is null then return null; end if;
  if p_priority <> 'important' and not coalesce(private.notification_category_enabled(p_recipient, p_category), true) then return null; end if;

  if not p_increment then
    select n.id into result from public.notifications n
    where n.recipient_user_id=p_recipient and n.dedupe_key=p_dedupe_key;
    if result is not null then return result; end if;
  end if;

  insert into public.notifications(recipient_user_id,type,priority,title,body,entity_type,entity_id,action_path,dedupe_key,metadata)
  values(p_recipient,p_type,p_priority,p_title,p_body,p_entity_type,p_entity_id,p_action_path,p_dedupe_key,coalesce(p_metadata,'{}'::jsonb))
  on conflict(recipient_user_id,dedupe_key) do update set
    title=excluded.title, body=excluded.body, priority=excluded.priority,
    aggregation_count=case when p_increment then public.notifications.aggregation_count + 1 else public.notifications.aggregation_count end,
    metadata=excluded.metadata, event_at=case when p_increment then now() else public.notifications.event_at end,
    updated_at=case when p_increment then now() else public.notifications.updated_at end,
    read_at=case when p_increment then null else public.notifications.read_at end
  returning id into result;
  return result;
end;
$$;

create or replace function public.process_teacher_notification_reminders(p_now timestamptz default now())
returns integer language plpgsql security definer set search_path = '' as $$
declare activity record; member record; processed integer:=0; pending bigint; local_due_date date; local_now_date date;
begin
  if current_user not in ('postgres','service_role') then raise exception 'service_role_required'; end if;
  local_now_date := (p_now at time zone 'America/Sao_Paulo')::date;

  for activity in
    select a.id,a.class_id,a.title,a.due_at,c.owner_id,c.public_name
    from public.teacher_class_activities a join public.teacher_classes c on c.id=a.class_id
    where a.status='published' and a.due_at is not null and a.due_at > p_now and a.due_at <= p_now + interval '24 hours'
  loop
    local_due_date := (activity.due_at at time zone 'America/Sao_Paulo')::date;
    for member in select m.user_id from public.teacher_class_members m
      where m.class_id=activity.class_id and m.status='active'
      and not exists(select 1 from public.teacher_activity_attempts t where t.activity_id=activity.id and t.student_id=m.user_id and t.status='submitted')
    loop
      perform private.upsert_notification(member.user_id,
        case when local_due_date=local_now_date then 'activity_due_today' else 'activity_due_soon' end,
        'attention',case when local_due_date=local_now_date then 'Atividade vence hoje' else 'Atividade vence em breve' end,
        '"'||activity.title||'" tem prazo próximo.','activity',activity.id,'/turmas/atividades/'||activity.id,
        'deadline:'||activity.id||':'||member.user_id||':'||case when local_due_date=local_now_date then 'today' else '24h' end,
        'deadlines',false,jsonb_build_object('due_at',activity.due_at));
      processed:=processed+1;
    end loop;

    select count(*) into pending from public.teacher_class_members m where m.class_id=activity.class_id and m.status='active'
      and not exists(select 1 from public.teacher_activity_attempts t where t.activity_id=activity.id and t.student_id=m.user_id and t.status='submitted');
    if pending > 0 and activity.due_at <= p_now + interval '1 hour' then
      perform private.upsert_notification(activity.owner_id,'activity_closed','attention','Atividade perto do encerramento',
        pending||' aluno(s) ainda não entregaram "'||activity.title||'".','activity',activity.id,
        '/professor/turmas/'||activity.class_id,'activity-closing:'||activity.id,'deadlines',false,jsonb_build_object('pending',pending));
      processed:=processed+1;
    end if;
  end loop;

  for activity in
    select a.id,a.class_id,a.title,a.due_at,c.owner_id
    from public.teacher_class_activities a join public.teacher_classes c on c.id=a.class_id
    where a.status='published' and a.due_at is not null and a.due_at <= p_now and a.due_at > p_now - interval '48 hours'
  loop
    for member in select m.user_id from public.teacher_class_members m
      where m.class_id=activity.class_id and m.status='active'
      and not exists(select 1 from public.teacher_activity_attempts t where t.activity_id=activity.id and t.student_id=m.user_id and t.status='submitted')
    loop
      perform private.upsert_notification(member.user_id,'activity_closed','attention','Prazo da atividade encerrado',
        'O prazo de "'||activity.title||'" foi encerrado.','activity',activity.id,'/turmas/atividades/'||activity.id,
        'activity-closed:'||activity.id||':'||member.user_id,'deadlines',false,jsonb_build_object('due_at',activity.due_at));
      processed:=processed+1;
    end loop;
  end loop;
  return processed;
end;
$$;

revoke all on function private.upsert_notification(uuid,text,public.notification_priority,text,text,text,uuid,text,text,text,boolean,jsonb) from public,anon,authenticated;
revoke all on function public.process_teacher_notification_reminders(timestamptz) from public,anon,authenticated;
grant execute on function public.process_teacher_notification_reminders(timestamptz) to service_role;
