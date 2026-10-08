import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { campaignQuery } from "../src/lib/analytics/acquisition";

const actions = readFileSync("src/app/auth/actions.ts", "utf8");
const signup = readFileSync("src/components/security/signup-form.tsx", "utf8");
const startPage = readFileSync("src/app/comece/page.tsx", "utf8");
const dashboard = readFileSync("src/app/dashboard/page.tsx", "utf8");
const consumeRoute = readFileSync("src/app/api/exams/questions/consume/route.ts", "utf8");
const registration = readFileSync("src/app/api/analytics/registration-completion/route.ts", "utf8");
const confirmRoute = readFileSync("src/app/auth/confirm/route.ts", "utf8");
const migration = readFileSync("supabase/migrations/20261007210543_student_lifetime_question_quota.sql", "utf8");

assert.match(actions, /auth\.signUp/);
assert.match(actions, /resetPasswordForEmail/, "recuperação por e-mail deve permanecer disponível");
assert.match(actions, /updateUser\(\{ password/, "redefinição de senha deve permanecer disponível");
assert.match(confirmRoute, /verifyOtp/, "callback de recuperação por token deve permanecer disponível");
assert.match(actions, /if \(!data\.session\)/, "fluxo legado de confirmação continua suportado");
assert.match(actions, /REGISTRATION_COMPLETION_COOKIE/);
assert.doesNotMatch(actions, /createAdminClient|SERVICE_ROLE/, "cadastro não pode auto-confirmar por service role");
assert.doesNotMatch(signup, /name="full_name"|name="username"/, "cadastro rápido deve pedir somente credenciais necessárias");
assert.match(signup, /name="email"/);
assert.match(signup, /name="password"/);
assert.match(signup, /TurnstileField/);
assert.match(startPage, /10 questões grátis/);
assert.match(startPage, /campaignQuery/);
assert.match(dashboard, /Bem-vindo ao NabuLab/);
assert.match(dashboard, /first_student_use/);
assert.match(consumeRoute, /first_question_answered/);
assert.match(consumeRoute, /free_question_limit_reached/);
assert.match(registration, /maxAge: 0/);
assert.match(migration, /primary key \(user_id, exam_id, question_id\)/);
assert.match(migration, /pg_advisory_xact_lock/);

assert.equal(
  campaignQuery(new URLSearchParams("utm_source=tiktok&utm_medium=paid&utm_campaign=vestibular&utm_content=video-1&email=person@example.com")),
  "utm_source=tiktok&utm_medium=paid&utm_campaign=vestibular&utm_content=video-1",
);
assert.equal(campaignQuery(new URLSearchParams("utm_source=tiktok&utm_medium=paid&utm_content=person@example.com")), "utm_source=tiktok&utm_medium=paid");

console.log("Onboarding: fast signup, immediate-session branch, Turnstile, durable conversion, UTM forwarding and 10-question funnel validated.");
