import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";

const url = process.env.STAGING_SUPABASE_URL;
const secret = process.env.STAGING_SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("Staging Supabase configuration is required.");

const admin = createClient(url, secret, { auth: { persistSession: false } });
const suffix = Date.now().toString(36);
const email = `teacher-p4-${suffix}@nabulab.test`;
const eventPrefix = `p4-${suffix}`;
let userId: string | null = null;

type Plan = "essential" | "pro" | "advanced";
type Cycle = "monthly" | "yearly";

async function teacherEvent(options: {
  id: string;
  eventType: string;
  createdAt: string;
  plan: Plan;
  cycle: Cycle;
  status?: "active" | "past_due" | "canceled" | "expired";
  periodEnd?: string;
}) {
  const { data, error } = await admin.rpc("process_teacher_hotmart_webhook_event", {
    p_event_id: `${eventPrefix}-${options.id}`,
    p_event_type: options.eventType,
    p_product_id: "teacher-product-test",
    p_event_created_at: options.createdAt,
    p_transaction_id: `${eventPrefix}-transaction-${options.id}`,
    p_subscription_id: `${eventPrefix}-subscription`,
    p_provider_customer_id: `${eventPrefix}-customer`,
    p_normalized_email: email,
    p_plan: options.plan,
    p_cycle: options.cycle,
    p_subscription_status: options.status ?? "active",
    p_current_period_start: options.createdAt,
    p_current_period_end: options.periodEnd ?? "2027-10-01T10:00:00.000Z",
    p_sanitized_payload: { test: true, domain: "teacher" },
  });
  if (error) throw error;
  return (Array.isArray(data) ? data[0] : data) as { result: string; resolved_user_id: string | null };
}

async function account() {
  const { data, error } = await admin.from("teacher_accounts")
    .select("plan,billing_cycle,billing_status,current_period_end,cancel_at_period_end")
    .eq("user_id", userId!).single();
  if (error) throw error;
  return data;
}

async function main() {
  try {
    const created = await admin.auth.admin.createUser({
      email,
      password: `P4-${suffix}!Aa9`,
      email_confirm: true,
      user_metadata: { full_name: "Professor P4 Staging", username: `teacher_p4_${suffix}` },
    });
    if (created.error) throw created.error;
    userId = created.data.user.id;
    const identity = await admin.from("billing_customers").insert({ user_id: userId, normalized_email: email, provider: "hotmart" });
    if (identity.error) throw identity.error;
    const teacher = await admin.from("teacher_accounts").insert({ user_id: userId });
    if (teacher.error) throw teacher.error;
    const student = await admin.from("subscriptions").insert({
      user_id: userId, plan: "premium", status: "active", price_tier: "founder_477", provider: "manual",
      current_period_start: new Date().toISOString(), current_period_end: "2027-10-01T10:00:00.000Z",
    });
    if (student.error) throw student.error;

    const offers: Array<[Plan, Cycle]> = [
      ["essential", "monthly"], ["essential", "yearly"], ["pro", "monthly"],
      ["pro", "yearly"], ["advanced", "monthly"], ["advanced", "yearly"],
    ];
    for (let index = 0; index < offers.length; index += 1) {
      const [plan, cycle] = offers[index];
      const result = await teacherEvent({
        id: `approval-${plan}-${cycle}`,
        eventType: "PURCHASE_APPROVED",
        createdAt: `2026-10-01T${String(10 + index).padStart(2, "0")}:00:00.000Z`,
        plan,
        cycle,
      });
      assert.equal(result.result, "processed");
      assert.deepEqual({ plan: (await account()).plan, cycle: (await account()).billing_cycle }, { plan, cycle });
    }

    const renewal = await teacherEvent({ id: "renewal", eventType: "PURCHASE_COMPLETE", createdAt: "2026-10-02T10:00:00.000Z", plan: "pro", cycle: "monthly", periodEnd: "2026-12-02T10:00:00.000Z" });
    assert.equal(renewal.result, "processed");
    assert.equal((await account()).current_period_end, "2026-12-02T10:00:00+00:00");
    assert.equal((await teacherEvent({ id: "renewal", eventType: "PURCHASE_COMPLETE", createdAt: "2026-10-02T10:00:00.000Z", plan: "pro", cycle: "monthly" })).result, "duplicate");
    assert.equal((await teacherEvent({ id: "stale", eventType: "PURCHASE_APPROVED", createdAt: "2026-10-02T09:00:00.000Z", plan: "advanced", cycle: "yearly" })).result, "stale");
    assert.equal((await account()).plan, "pro");

    await teacherEvent({ id: "cancellation", eventType: "SUBSCRIPTION_CANCELLATION", createdAt: "2026-10-03T10:00:00.000Z", plan: "pro", cycle: "monthly", status: "canceled", periodEnd: "2026-12-02T10:00:00.000Z" });
    assert.deepEqual({ plan: (await account()).plan, cancel: (await account()).cancel_at_period_end }, { plan: "pro", cancel: true });
    const studentAfterTeacher = await admin.from("subscriptions").select("plan").eq("user_id", userId).single();
    assert.equal(studentAfterTeacher.data?.plan, "premium");

    await admin.from("teacher_accounts").update({ plan: "pro", billing_cycle: "monthly", billing_status: "active", cancel_at_period_end: false }).eq("user_id", userId);
    const classes = Array.from({ length: 8 }, (_, index) => ({ owner_id: userId!, name: `P4 ${index + 1}`, public_name: `P4 Staging ${index + 1}`, status: "active" }));
    const insertedClasses = await admin.from("teacher_classes").insert(classes);
    if (insertedClasses.error) throw insertedClasses.error;
    await teacherEvent({ id: "expiration", eventType: "PURCHASE_EXPIRED", createdAt: "2026-10-04T10:00:00.000Z", plan: "pro", cycle: "monthly", status: "expired" });
    assert.equal((await account()).plan, "free");
    const classCounts = await admin.from("teacher_classes").select("status").eq("owner_id", userId);
    assert.equal(classCounts.data?.length, 8);
    assert.equal(classCounts.data?.filter((item) => item.status === "active").length, 1);

    await teacherEvent({ id: "before-refund", eventType: "PURCHASE_APPROVED", createdAt: "2026-10-05T10:00:00.000Z", plan: "essential", cycle: "yearly" });
    await teacherEvent({ id: "refund", eventType: "PURCHASE_REFUNDED", createdAt: "2026-10-05T11:00:00.000Z", plan: "essential", cycle: "yearly", status: "canceled" });
    assert.equal((await account()).plan, "free");
    await teacherEvent({ id: "before-chargeback", eventType: "PURCHASE_APPROVED", createdAt: "2026-10-06T10:00:00.000Z", plan: "advanced", cycle: "monthly" });
    await teacherEvent({ id: "chargeback", eventType: "PURCHASE_CHARGEBACK", createdAt: "2026-10-06T11:00:00.000Z", plan: "advanced", cycle: "monthly", status: "canceled" });
    assert.equal((await account()).plan, "free");

    console.log(JSON.stringify({ staging: "ok", offers: "6/6", renewal: "ok", cancellation: "period-end", expiration: "free", refund: "free", chargeback: "free", idempotency: "ok", staleProtection: "ok", studentIsolation: "ok", downgradeClasses: "1/8 active" }));
  } finally {
    await admin.from("hotmart_webhook_events").delete().like("provider_event_id", `${eventPrefix}-%`);
    if (userId) await admin.auth.admin.deleteUser(userId);
  }
}

void main().catch((error: unknown) => {
  const value = error as { message?: string; code?: string };
  console.error(JSON.stringify({ message: value.message ?? String(error), code: value.code }));
  process.exitCode = 1;
});
