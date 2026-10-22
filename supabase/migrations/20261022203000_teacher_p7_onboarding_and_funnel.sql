-- P7: persist only dismissal preference; all progress remains derived from real teacher data.
alter table public.teacher_accounts
  add column if not exists onboarding_dismissed_at timestamptz;

create or replace function public.set_teacher_onboarding_dismissed(p_dismissed boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.teacher_accounts
  set onboarding_dismissed_at = case when p_dismissed then now() else null end
  where user_id = (select auth.uid());

  if not found then
    raise exception 'teacher_account_not_found' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.set_teacher_onboarding_dismissed(boolean) from public, anon;
grant execute on function public.set_teacher_onboarding_dismissed(boolean) to authenticated;

alter table public.analytics_events drop constraint analytics_events_event_name_check;
alter table public.analytics_events add constraint analytics_events_event_name_check check (event_name in (
  'landing_view','signup_cta_clicked','premium_cta_clicked','signup_started','signup_completed','login_completed',
  'first_student_use','first_question_answered','free_question_limit_reached','free_exam_started','free_exam_completed',
  'premium_page_viewed','checkout_started','purchase_approved','subscription_canceled',
  'teacher_plan_viewed','teacher_limit_reached','teacher_upgrade_clicked','teacher_checkout_started','teacher_plan_activated',
  'teacher_landing_viewed','teacher_cta_started','teacher_profile_activated','teacher_onboarding_viewed',
  'teacher_first_class_created','teacher_first_question_created','teacher_first_exam_created',
  'teacher_first_activity_published','teacher_first_student_joined','teacher_first_submission_received',
  'teacher_first_analytics_viewed','teacher_first_insight_viewed','teacher_plans_viewed','teacher_upgrade_completed'
));

comment on column public.teacher_accounts.onboarding_dismissed_at is
  'User preference only. P7 milestone completion is derived from real teacher records.';
