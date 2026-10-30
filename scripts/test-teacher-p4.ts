import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { getTeacherHotmartOffers, resolveTeacherHotmartOffer } from "../src/lib/billing/teacher-config";
import { TEACHER_PLANS, isTeacherOfferKey, parseTeacherOfferKey } from "../src/lib/teacher-plans";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const migration = readFileSync("supabase/migrations/20261011203832_teacher_p4_plans_and_billing.sql", "utf8");
const prepare = readFileSync("src/app/api/billing/teacher/prepare/route.ts", "utf8");
const webhook = readFileSync("src/app/api/webhooks/hotmart/route.ts", "utf8");
const analytics = readFileSync("src/lib/teacher-analytics-server.ts", "utf8");
const report = readFileSync("src/components/professor/teacher-analytics-report.tsx", "utf8");

assert.deepEqual(
  Object.fromEntries(Object.entries(TEACHER_PLANS).map(([key, value]) => [key, [value.maxActiveClasses, value.maxStudentsPerClass, value.weeklyExamLimit]])),
  { free: [1, 40, 2], essential: [3, 50, 10], pro: [10, 70, null], advanced: [30, 100, null] },
);
assert.equal(TEACHER_PLANS.pro.recommended, true);
const expectedOffers = ["teacher_essential_monthly", "teacher_essential_yearly", "teacher_pro_monthly", "teacher_pro_yearly", "teacher_advanced_monthly", "teacher_advanced_yearly"] as const;
for (const value of expectedOffers) {
  assert.equal(isTeacherOfferKey(value), true);
  assert.ok(["essential", "pro", "advanced"].includes(parseTeacherOfferKey(value as never).plan));
}
const configuredOffers = getTeacherHotmartOffers();
// As ofertas Hotmart de professor só existem nas variáveis da Vercel; fora dela, a checagem é pulada.
const hotmartConfigured = expectedOffers.some((key) => configuredOffers[key].available);
if (!hotmartConfigured) console.warn("P4: ofertas Hotmart de professor não configuradas neste ambiente; checagem de ofertas pulada.");
for (const key of hotmartConfigured ? expectedOffers : []) {
  const offer = configuredOffers[key];
  const plan = TEACHER_PLANS[offer.plan];
  assert.equal(offer.available, true, `${key} deve possuir configuração Hotmart válida`);
  assert.equal(offer.expectedPrice, offer.cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice);
  assert.equal(offer.currency, "BRL");
  assert.ok(offer.checkoutUrl?.startsWith("https://"));
  assert.equal(resolveTeacherHotmartOffer(offer.productId!, [offer.offerCode!])?.key, key);
  assert.equal(resolveTeacherHotmartOffer(offer.productId!, ["different-offer"]), null);
}
if (hotmartConfigured) assert.equal(new Set(Object.values(configuredOffers).map((offer) => `${offer.productId}:${offer.offerCode}`)).size, 6);
assert.equal(isTeacherOfferKey("standard_990"), false, "oferta Student não pode virar Professor");
assert.match(migration, /teacher_classes_plan_limit[\s\S]*teacher_members_plan_limit[\s\S]*teacher_exams_plan_limit/);
assert.match(migration, /for update[\s\S]*teacher_active_class_limit_reached/);
assert.match(migration, /process_teacher_hotmart_webhook_event[\s\S]*provider_updated_at/);
assert.match(migration, /PURCHASE_REFUNDED[\s\S]*PURCHASE_CHARGEBACK[\s\S]*effective_plan := 'free'/);
assert.match(migration, /reconcile_teacher_class_limit/);
assert.doesNotMatch(migration, /delete from public\.teacher_(classes|class_members|questions|exams|class_activities)/i);
assert.doesNotMatch(migration, /daily_exam_usage|student_question_usage/);
assert.match(prepare, /getTeacherOffer[\s\S]*prepareBillingIdentity/);
assert.doesNotMatch(prepare, /body\?\.(price|amount|productId|offerCode|checkoutUrl)/);
assert.match(prepare, /expectedPrice[\s\S]*currency/);
assert.match(webhook, /teacherOffer[\s\S]*process_teacher_hotmart_webhook_event/);
assert.match(readFileSync("src/app/professor/planos/page.tsx", "utf8"), /teacher_plan_viewed/);
assert.match(readFileSync("src/components/professor/teacher-checkout-button.tsx", "utf8"), /teacher_upgrade_clicked/);
assert.match(readFileSync("src/app/turmas/actions.ts", "utf8"), /teacher_limit_reached/);
assert.match(analytics, /features\.content_analytics/);
assert.match(report, /Disponível no Essencial[\s\S]*Desbloquear/);

console.log("Teacher P4 plan, enforcement, billing isolation and feature gates validated.");
