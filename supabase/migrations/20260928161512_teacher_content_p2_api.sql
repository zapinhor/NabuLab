create function public.create_owned_teacher_question(
  p_statement text,p_alternatives jsonb,p_correct_answer jsonb,p_explanation text,
  p_subject text,p_topic text,p_difficulty text,p_question_type text,
  p_visibility public.teacher_question_visibility default 'private'
) returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid:=(select auth.uid()); result uuid;
begin
  if uid is null or not exists(select 1 from public.teacher_accounts where user_id=uid) then raise exception 'teacher_account_required'; end if;
  if p_question_type not in ('multiple_choice','true_false') then raise exception 'invalid_question_type'; end if;
  if p_difficulty is not null and p_difficulty not in ('iniciante','medio','avancado') then raise exception 'invalid_difficulty'; end if;
  if char_length(btrim(p_statement))<5 then raise exception 'invalid_question_statement'; end if;
  if p_question_type='multiple_choice' and (jsonb_typeof(p_alternatives)<>'array' or jsonb_array_length(p_alternatives)<2 or not p_alternatives @> jsonb_build_array(p_correct_answer)) then raise exception 'invalid_question_alternatives'; end if;
  insert into public.teacher_questions(owner_id,visibility,statement,alternatives,correct_answer,explanation,subject,topic,difficulty,question_type)
  values(uid,p_visibility,btrim(p_statement),case when p_question_type='multiple_choice' then p_alternatives else null end,p_correct_answer,nullif(btrim(p_explanation),''),nullif(btrim(p_subject),''),nullif(btrim(p_topic),''),p_difficulty,p_question_type)
  returning id into result;
  return result;
end;
$$;

create function public.update_owned_teacher_question(
  p_question_id uuid,p_statement text,p_alternatives jsonb,p_correct_answer jsonb,p_explanation text,
  p_subject text,p_topic text,p_difficulty text,p_question_type text,p_visibility public.teacher_question_visibility
) returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_question_type not in ('multiple_choice','true_false') then raise exception 'invalid_question_type'; end if;
  if p_difficulty is not null and p_difficulty not in ('iniciante','medio','avancado') then raise exception 'invalid_difficulty'; end if;
  if p_question_type='multiple_choice' and (jsonb_typeof(p_alternatives)<>'array' or jsonb_array_length(p_alternatives)<2 or not p_alternatives @> jsonb_build_array(p_correct_answer)) then raise exception 'invalid_question_alternatives'; end if;
  update public.teacher_questions set visibility=p_visibility,statement=btrim(p_statement),alternatives=case when p_question_type='multiple_choice' then p_alternatives else null end,correct_answer=p_correct_answer,explanation=nullif(btrim(p_explanation),''),subject=nullif(btrim(p_subject),''),topic=nullif(btrim(p_topic),''),difficulty=p_difficulty,question_type=p_question_type,updated_at=now()
  where id=p_question_id and owner_id=(select auth.uid()) and archived_at is null;
  if not found then raise exception 'question_owner_required'; end if;
end;
$$;

create function public.add_teacher_exam_question(p_exam_id uuid,p_question_id uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare next_position integer;
begin
  if not exists(select 1 from public.teacher_exams where id=p_exam_id and owner_id=(select auth.uid()) and status='draft') then raise exception 'draft_exam_owner_required'; end if;
  if not exists(select 1 from public.teacher_questions where id=p_question_id and archived_at is null and (owner_id=(select auth.uid()) or visibility='shared')) then raise exception 'question_not_available'; end if;
  select coalesce(max(position),0)+1 into next_position from public.teacher_exam_questions where exam_id=p_exam_id;
  insert into public.teacher_exam_questions(exam_id,position,teacher_question_id) values(p_exam_id,next_position,p_question_id);
  return next_position;
end;
$$;

revoke all on function public.create_owned_teacher_question(text,jsonb,jsonb,text,text,text,text,text,public.teacher_question_visibility),
  public.update_owned_teacher_question(uuid,text,jsonb,jsonb,text,text,text,text,text,public.teacher_question_visibility),
  public.add_teacher_exam_question(uuid,uuid) from public,anon,authenticated;
grant execute on function public.create_owned_teacher_question(text,jsonb,jsonb,text,text,text,text,text,public.teacher_question_visibility),
  public.update_owned_teacher_question(uuid,text,jsonb,jsonb,text,text,text,text,text,public.teacher_question_visibility),
  public.add_teacher_exam_question(uuid,uuid) to authenticated;
