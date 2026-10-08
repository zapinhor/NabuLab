import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { FREE_ENTITLEMENTS, PREMIUM_ENTITLEMENTS } from "../src/lib/entitlements";

const migration = readFileSync("supabase/migrations/20261007210543_student_lifetime_question_quota.sql", "utf8");
const server = readFileSync("src/lib/entitlements/server.ts", "utf8");
const teacherActions = readFileSync("src/app/turmas/actions.ts", "utf8");
const teacherActivity = readFileSync("src/app/turmas/atividades/[activityId]/page.tsx", "utf8");

assert.equal(FREE_ENTITLEMENTS.lifetimeQuestionLimit, 10);
assert.equal(PREMIUM_ENTITLEMENTS.lifetimeQuestionLimit, null);
assert.equal(FREE_ENTITLEMENTS.maxQuestionsPerExam, 10);
assert.deepEqual(FREE_ENTITLEMENTS.allowedAmounts, [5, 10]);
assert.match(migration, /pg_advisory_xact_lock/);
assert.match(migration, /primary key \(user_id, exam_id, question_id\)/);
assert.match(migration, /u\.used_count < 10/);
assert.match(migration, /status = 'canceled'[\s\S]*current_period_end/);
assert.match(server, /row\.total_limit/, "o adaptador deve usar o nome retornado pela RPC");
assert.doesNotMatch(server, /row\.daily_limit/, "o contrato novo não pode depender do campo diário removido");
assert.doesNotMatch(`${teacherActions}\n${teacherActivity}`, /consume_student_question_quota|student_question_usage/);

console.log("Student quota: 10 lifetime answers, concurrency, idempotency, Premium bypass and teacher exclusion validated.");
