import assert from "node:assert/strict";

import {
  FREE_ENTITLEMENTS,
  PREMIUM_ENTITLEMENTS,
  STUDENT_QUOTA_TIME_ZONE,
  getStudentQuotaDate,
} from "../src/lib/entitlements";

assert.equal(STUDENT_QUOTA_TIME_ZONE, "America/Sao_Paulo");
assert.equal(FREE_ENTITLEMENTS.examsPerDay, 2);
assert.equal(PREMIUM_ENTITLEMENTS.examsPerDay, null);
assert.equal(FREE_ENTITLEMENTS.maxQuestionsPerExam, 15);
assert.deepEqual(FREE_ENTITLEMENTS.allowedAmounts, [5, 10, 15]);
assert.deepEqual(PREMIUM_ENTITLEMENTS.allowedAmounts, [5, 10, 15, 20, 30, 50]);

assert.equal(
  getStudentQuotaDate(new Date("2026-09-12T02:59:59.000Z")),
  "2026-09-11",
  "antes da meia-noite de São Paulo ainda pertence ao dia anterior",
);
assert.equal(
  getStudentQuotaDate(new Date("2026-09-12T03:00:00.000Z")),
  "2026-09-12",
  "a quota reinicia na meia-noite de São Paulo",
);

console.log("Quota diária: limites e virada de dia de São Paulo validados.");
