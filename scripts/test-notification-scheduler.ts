import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isValidCronAuthorization } from "../src/lib/notifications-reminders";

assert.equal(isValidCronAuthorization(null, "a-secure-test-secret"), false);
assert.equal(isValidCronAuthorization("Bearer wrong", "a-secure-test-secret"), false);
assert.equal(isValidCronAuthorization("Bearer a-secure-test-secret", "a-secure-test-secret"), true);
assert.equal(isValidCronAuthorization("Basic a-secure-test-secret", "a-secure-test-secret"), false);
assert.equal(isValidCronAuthorization("Bearer anything", ""), false);

const route = readFileSync("src/app/api/internal/notifications/process-reminders/route.ts", "utf8");
const proxy = readFileSync("src/proxy.ts", "utf8");
const config = JSON.parse(readFileSync("vercel.json", "utf8")) as { crons?: unknown };
const workflow = readFileSync(".github/workflows/process-notification-reminders.yml", "utf8");
const email = readFileSync("src/lib/notifications-email.ts", "utf8");
const migration = readFileSync("supabase/migrations/20261017014338_teacher_p5_complete_reminder_processing.sql", "utf8");

assert.match(route, /isValidCronAuthorization/);
assert.match(route, /processNotificationReminders/);
assert.doesNotMatch(route, /auth\.getUser|getSession/);
assert.match(proxy, /api\/internal\/notifications\/process-reminders/);
assert.equal(config.crons, undefined);
assert.match(workflow, /cron:\s*["']0 \* \* \* \*["']/);
assert.match(workflow, /workflow_dispatch:/);
assert.match(workflow, /secrets\.NABULAB_CRON_URL/);
assert.match(workflow, /secrets\.CRON_SECRET/);
assert.match(workflow, /Authorization: Bearer \$\{CRON_SECRET\}/);
assert.match(workflow, /--fail-with-body/);
assert.match(workflow, /--connect-timeout 10/);
assert.match(workflow, /--max-time 60/);
assert.match(workflow, /--retry 1/);
assert.match(workflow, /cancel-in-progress: false/);
assert.match(workflow, /jq -c/);
assert.doesNotMatch(workflow, /nabulab\.org|SUPABASE_SERVICE_ROLE_KEY|service_role/i);
assert.match(email, /safe_error:\s*"processing"/);
assert.match(email, /23505/);
assert.match(migration, /activity-closed:/);
assert.match(migration, /America\/Sao_Paulo/);
assert.match(migration, /if not p_increment then/);

console.log("P5 scheduler: GitHub Actions hourly/manual trigger, protected endpoint, safe logs and deduplication validated.");
