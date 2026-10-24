-- Teste sem conta (/experimente): novos eventos de funil para visitantes.
-- Também inclui os eventos de SEO que o app já enviava, mas que a constraint
-- anterior recusava (seo_landing_viewed, seo_cta_clicked, seo_practice_started).
alter table public.analytics_events drop constraint analytics_events_event_name_check;
alter table public.analytics_events add constraint analytics_events_event_name_check check (event_name in (
  'landing_view','signup_cta_clicked','premium_cta_clicked','signup_started','signup_completed','login_completed',
  'first_student_use','first_question_answered','free_question_limit_reached','free_exam_started','free_exam_completed',
  'premium_page_viewed','checkout_started','purchase_approved','subscription_canceled',
  'teacher_plan_viewed','teacher_limit_reached','teacher_upgrade_clicked','teacher_checkout_started','teacher_plan_activated',
  'teacher_landing_viewed','teacher_cta_started','teacher_profile_activated','teacher_onboarding_viewed',
  'teacher_first_class_created','teacher_first_question_created','teacher_first_exam_created',
  'teacher_first_activity_published','teacher_first_student_joined','teacher_first_submission_received',
  'teacher_first_analytics_viewed','teacher_first_insight_viewed','teacher_plans_viewed','teacher_upgrade_completed',
  'seo_landing_viewed','seo_cta_clicked','seo_practice_started',
  'guest_quiz_started','guest_question_answered','guest_quiz_completed','guest_signup_clicked'
));
