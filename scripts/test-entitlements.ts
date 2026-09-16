import assert from "node:assert/strict";

import { questionBank } from "../src/data/questions";
import {
  FREE_ENTITLEMENTS,
  PREMIUM_ENTITLEMENTS,
  PREMIUM_FEATURE_ROUTES,
  contributesToMrr,
  filterAccessibleQuestions,
  getStudentEntitlements,
  hasActivePremium,
  isPremiumFeatureRoute,
  type StudentSubscription,
} from "../src/lib/entitlements";
import { createExamSession } from "../src/lib/quiz-engine";
import type { ExamConfig } from "../src/types/exam";

function subscription(
  status: StudentSubscription["status"],
  priceTier: StudentSubscription["priceTier"],
  overrides: Partial<StudentSubscription> = {},
): StudentSubscription {
  return {
    id: "subscription-test",
    userId: "student-test",
    plan: "premium",
    status,
    priceTier,
    provider: "manual",
    currentPeriodStart: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    canceledAt: null,
    terminationReason: null,
    ...overrides,
  };
}

assert.equal(getStudentEntitlements(null), FREE_ENTITLEMENTS, "sem assinatura deve ser Free");
assert.equal(
  getStudentEntitlements({
    id: "free-test",
    userId: "student-test",
    plan: "free",
    status: "active",
    priceTier: null,
    provider: null,
    currentPeriodStart: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    canceledAt: null,
    terminationReason: null,
  }),
  FREE_ENTITLEMENTS,
  "uma linha explicitamente Free deve manter os limites Free",
);
const entitlementNow = new Date("2026-09-20T12:00:00Z");
const approvedFounder = subscription("active", "founder_477", {
  provider: "hotmart",
  currentPeriodEnd: "2026-10-14T03:00:00Z",
});
assert.equal(hasActivePremium(approvedFounder, entitlementNow), true, "PURCHASE_APPROVED libera Premium");
assert.equal(contributesToMrr(approvedFounder), true, "assinatura ativa contribui para MRR");
const normallyCanceledFounder = subscription("canceled", "founder_477", {
  provider: "hotmart",
  cancelAtPeriodEnd: true,
  canceledAt: "2026-09-15T12:00:00Z",
  terminationReason: "subscription_cancellation",
  currentPeriodEnd: "2026-10-14T03:00:00Z",
});
assert.equal(contributesToMrr(normallyCanceledFounder), false, "cancelamento normal sai do MRR");
assert.equal(hasActivePremium(normallyCanceledFounder, entitlementNow), true, "cancelamento normal preserva Premium no período pago");
assert.equal(hasActivePremium(normallyCanceledFounder, new Date("2026-10-14T03:00:01Z")), false, "Premium expira após o período pago");
assert.equal(hasActivePremium(approvedFounder, new Date("2026-10-14T03:00:01Z")), false, "estado active stale não prolonga Premium Hotmart além do período pago");
assert.equal(getStudentEntitlements(subscription("active", "founder_477")), PREMIUM_ENTITLEMENTS);
assert.equal(getStudentEntitlements(subscription("active", "standard_990")), PREMIUM_ENTITLEMENTS);
assert.equal(getStudentEntitlements(subscription("canceled", "standard_990")), FREE_ENTITLEMENTS);
assert.equal(
  hasActivePremium(
    subscription("canceled", "founder_477", {
      cancelAtPeriodEnd: true,
      terminationReason: "subscription_cancellation",
      currentPeriodEnd: "2026-10-14T03:00:00Z",
    }),
    entitlementNow,
  ),
  true,
  "cancelamento mantém Premium durante o período oficialmente pago",
);
for (const currentPeriodEnd of ["2026-09-20T12:00:00Z", "2026-09-19T12:00:00Z"]) {
  assert.equal(
    hasActivePremium(
      subscription("canceled", "standard_990", {
        cancelAtPeriodEnd: true,
        terminationReason: "subscription_cancellation",
        currentPeriodEnd,
      }),
      entitlementNow,
    ),
    false,
    "período encerrado não mantém Premium",
  );
}
assert.equal(
  hasActivePremium(
    subscription("canceled", "founder_477", {
      cancelAtPeriodEnd: true,
      terminationReason: "subscription_cancellation",
    }),
    entitlementNow,
  ),
  false,
  "cancelamento sem data confiável usa o comportamento seguro Free",
);
for (const terminationReason of ["refund", "chargeback"] as const) {
  assert.equal(
    hasActivePremium(
      subscription("canceled", "founder_477", {
        cancelAtPeriodEnd: false,
        terminationReason,
        currentPeriodEnd: "2026-10-14T03:00:00Z",
      }),
      entitlementNow,
    ),
    false,
    `${terminationReason} encerra o acesso imediatamente`,
  );
}
assert.equal(getStudentEntitlements(subscription("expired", "founder_477")), FREE_ENTITLEMENTS);
assert.equal(getStudentEntitlements(subscription("past_due", "standard_990")), FREE_ENTITLEMENTS);
assert.equal(FREE_ENTITLEMENTS.historyLimit, 3);
assert.equal(FREE_ENTITLEMENTS.recommendedLimit, 5);
assert.equal(FREE_ENTITLEMENTS.cloudSync, true);
assert.equal(FREE_ENTITLEMENTS.examsPerDay, 2);
assert.equal(PREMIUM_ENTITLEMENTS.historyLimit, null);
assert.equal(PREMIUM_ENTITLEMENTS.maxQuestionsPerExam, 50);
assert.deepEqual(
  PREMIUM_FEATURE_ROUTES.filter(isPremiumFeatureRoute),
  PREMIUM_FEATURE_ROUTES,
  "a mesma metadata identifica os badges Premium para Free, Founder e Standard",
);
assert.equal(PREMIUM_ENTITLEMENTS.examsPerDay, null);

const freeBank = filterAccessibleQuestions(questionBank, FREE_ENTITLEMENTS);
assert.equal(questionBank.length, 1224, "o banco integral deve permanecer com 1.224 questões");
assert.equal(freeBank.length, 816, "Free deve acessar o subconjunto iniciante e médio");
assert.equal(new Set(freeBank.map((question) => question.subject)).size, 17);
assert.ok(freeBank.every((question) => question.difficulty !== "avancado"));

const baseConfig: ExamConfig = {
  amount: 10,
  subjects: ["fisica"],
  difficulty: "medio",
  questionType: "misto",
  shuffleQuestions: false,
  shuffleAlternatives: false,
};
const freeSession = createExamSession(baseConfig, FREE_ENTITLEMENTS);
assert.ok(freeSession);
assert.equal(freeSession.questionIds.length, 10);
assert.ok(
  freeSession.questionIds.every(
    (id) => questionBank.find((question) => question.id === id)?.difficulty !== "avancado",
  ),
);
assert.equal(createExamSession({ ...baseConfig, amount: 5 }, FREE_ENTITLEMENTS)?.questionIds.length, 5);
assert.equal(createExamSession({ ...baseConfig, amount: 15 }, FREE_ENTITLEMENTS)?.questionIds.length, 15);
assert.equal(createExamSession({ ...baseConfig, amount: 15 }, FREE_ENTITLEMENTS)?.questionIds.length, 15);

for (const amount of [20, 30, 50]) {
  assert.throws(
    () => createExamSession({ ...baseConfig, amount }, FREE_ENTITLEMENTS),
    /até 15 questões/,
    `alterar o estado do cliente para ${amount} deve ser rejeitado no domínio`,
  );
}
assert.throws(
  () => createExamSession({ ...baseConfig, difficulty: "avancado" }, FREE_ENTITLEMENTS),
  /Premium/,
  "alterar o estado do cliente para avançado deve ser rejeitado no domínio",
);
assert.throws(
  () => createExamSession({ ...baseConfig, difficulty: "misto" }, FREE_ENTITLEMENTS),
  /Premium/,
  "dificuldade mista deve permanecer Premium",
);
assert.doesNotThrow(() =>
  createExamSession({ ...baseConfig, amount: 50, difficulty: "avancado" }, PREMIUM_ENTITLEMENTS),
);

console.log("Entitlements C1: Free, Premium, downgrade e bypass validados.");
