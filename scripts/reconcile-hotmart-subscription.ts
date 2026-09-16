import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const [{ getHotmartFinanceReport }, { createAdminClient }, { hasActivePremium, subscriptionFromRow }] = await Promise.all([
    import("../src/lib/billing/hotmart-api"),
    import("../src/lib/supabase/admin"),
    import("../src/lib/entitlements"),
  ]);
  const now = new Date();
  const to = now.toISOString().slice(0, 10);
  const fromDate = new Date(now); fromDate.setUTCDate(fromDate.getUTCDate() - 89);
  const report = await getHotmartFinanceReport(fromDate.toISOString().slice(0, 10), to);
  const provider = report.subscriptions.find((item) => item.offerCode === "v4h77zvh");
  if (!provider || provider.status !== "CANCELLED_BY_CUSTOMER") throw new Error("FOUNDER_CANCELLATION_NOT_CONFIRMED");

  const admin = createAdminClient();
  const { data: local, error: localError } = await admin.from("subscriptions")
    .select("id,user_id,plan,status,price_tier,provider,provider_customer_id,provider_subscription_id,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
    .eq("provider", "hotmart").eq("provider_subscription_id", provider.subscriberCode).maybeSingle();
  if (localError) throw localError;
  if (!local || local.price_tier !== "founder_477" || !local.current_period_end) throw new Error("LOCAL_FOUNDER_NOT_RECONCILABLE");
  const { data: customer, error: customerError } = await admin.from("billing_customers")
    .select("normalized_email,provider_customer_id").eq("user_id", local.user_id).eq("provider", "hotmart").maybeSingle();
  if (customerError) throw customerError;
  if (!customer?.normalized_email) throw new Error("BILLING_IDENTITY_NOT_FOUND");

  const observedAt = new Date().toISOString();
  const eventId = `hotmart-api-reconcile:${provider.subscriberCode}:${provider.status}`;
  const { data, error } = await admin.rpc("process_hotmart_webhook_event", {
    p_event_id: eventId,
    p_event_type: "SUBSCRIPTION_CANCELLATION",
    p_product_id: "8516493",
    p_event_created_at: observedAt,
    p_transaction_id: null,
    p_subscription_id: provider.subscriberCode,
    p_provider_customer_id: customer.provider_customer_id,
    p_normalized_email: customer.normalized_email,
    p_price_tier: "founder_477",
    p_subscription_status: "canceled",
    p_current_period_start: null,
    p_current_period_end: null,
    p_sanitized_payload: { source: "hotmart_api_reconciliation", providerStatus: provider.status },
  });
  if (error) throw error;
  const { data: reconciled, error: reconciledError } = await admin.from("subscriptions")
    .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
    .eq("user_id", local.user_id).single();
  if (reconciledError) throw reconciledError;
  console.log(JSON.stringify({ result: Array.isArray(data) ? data[0]?.result : data?.result, billingStatus: reconciled.status, cancelAtPeriodEnd: reconciled.cancel_at_period_end, terminationReason: reconciled.termination_reason, currentPeriodEnd: reconciled.current_period_end, effectivePremiumNow: hasActivePremium(subscriptionFromRow(reconciled), now), mrrContribution: false }, null, 2));
}

main().catch((error) => { console.error(JSON.stringify({ message: error instanceof Error ? error.message : "Falha desconhecida" })); process.exitCode = 1; });
