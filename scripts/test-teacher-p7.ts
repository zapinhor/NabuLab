import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");
const landing = read("src/app/para-professores/page.tsx");
const dashboard = read("src/app/professor/page.tsx");
const checklist = read("src/components/professor/teacher-onboarding.tsx");
const actions = read("src/app/turmas/actions.ts");
const events = read("src/lib/analytics/events.ts");
const analyticsRoute = read("src/app/api/analytics/events/route.ts");
const migration = read("supabase/migrations/20261022203000_teacher_p7_onboarding_and_funnel.sql");
const signup = read("src/app/cadastro/page.tsx");
const profileStep = read("src/components/security/signup-profile-step.tsx");
const acquisition = read("src/lib/analytics/acquisition.ts");
const sitemap = read("src/app/sitemap.ts");

assert.match(landing, /createPublicMetadata[\s\S]*path: "\/para-professores"/);
assert.match(landing, /SoftwareApplication/);
assert.match(sitemap, /\/para-professores/);
assert.match(landing, /Começar grátis como professor/);
assert.match(landing, /Dados ilustrativos/);
assert.doesNotMatch(landing, /depoimento|estrelas|professores atendidos/i);
assert.match(signup, /teacherIntent = next\.startsWith\("\/professor"\)/);
assert.match(signup, /SignupProfileStep/);
assert.match(profileStep, /intent=\{profile === "professor" \? "teacher" : "student"\}/);
assert.match(acquisition, /\/para-professores/);

for (const step of ["hasClass", "hasQuestion", "hasExam", "hasActivity", "hasStudent", "hasSubmission"]) {
  assert.match(checklist, new RegExp(step));
  assert.match(dashboard, new RegExp(step));
}
assert.match(checklist, /dismissTeacherOnboarding/);
assert.match(migration, /onboarding_dismissed_at timestamptz/);
assert.match(migration, /security definer[\s\S]*set search_path = ''/);
assert.match(migration, /revoke all on function public\.set_teacher_onboarding_dismissed\(boolean\) from public, anon/);
assert.doesNotMatch(migration, /grant execute[\s\S]*\banon\b/);

const expectedEvents = [
  "teacher_landing_viewed", "teacher_cta_started", "teacher_profile_activated",
  "teacher_onboarding_viewed", "teacher_first_class_created", "teacher_first_question_created",
  "teacher_first_exam_created", "teacher_first_activity_published", "teacher_first_student_joined",
  "teacher_first_submission_received", "teacher_first_analytics_viewed", "teacher_first_insight_viewed",
  "teacher_plans_viewed", "teacher_checkout_started", "teacher_upgrade_completed",
];
for (const event of expectedEvents) {
  assert.match(events, new RegExp(`"${event}"`));
  assert.match(migration, new RegExp(`'${event}'`));
}
assert.match(analyticsRoute, /teacher_landing_viewed/);
assert.match(analyticsRoute, /teacher_cta_started/);
assert.match(actions, /sourceEventKey: `teacher:\$\{user\.id\}:first-class`/);
assert.match(actions, /sourceEventKey: `teacher:\$\{user\.id\}:first-activity`/);
assert.match(actions, /teacher_first_submission_received/);
assert.match(checklist, /Avaliação diagnóstica/);
assert.match(checklist, /Revisão para prova/);
assert.match(checklist, /Recuperação/);
assert.match(landing, /Atividades da turma ficam separadas da franquia diária Student/);

console.log("P7: landing, teacher intent, derived onboarding, presets, funnel events, privacy and security contracts validated.");
