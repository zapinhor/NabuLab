import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const [{ getHotmartFinanceReport, probeHotmartAccess, validateHotmartConnection }, { createAdminClient }] = await Promise.all([
    import("../src/lib/billing/hotmart-api"),
    import("../src/lib/supabase/admin"),
  ]);
  const connected = await validateHotmartConnection();
  const access = await probeHotmartAccess();
  if (!access.sales.allowed || !access.subscriptions.allowed || !access.commissions.allowed) {
    const admin = createAdminClient();
    const [{ data: subscriptionData, count: subscriptions }, { count: billingCustomers }, { count: webhookEvents }] = await Promise.all([
      admin.from("subscriptions").select("status,price_tier,current_period_start,current_period_end", { count: "exact" }).eq("provider", "hotmart"),
      admin.from("billing_customers").select("*", { count: "exact", head: true }).eq("provider", "hotmart"),
      admin.from("hotmart_webhook_events").select("*", { count: "exact", head: true }).eq("product_id", "8516493"),
    ]);
    console.log(JSON.stringify({ auth: { connected, tokenObtained: connected, productCorrect: process.env.HOTMART_PRODUCT_ID === "8516493" }, access, local: { subscriptions: subscriptions ?? 0, subscriptionStates: subscriptionData ?? [], billingCustomers: billingCustomers ?? 0, webhookEvents: webhookEvents ?? 0 } }, null, 2));
    process.exitCode = 2;
    return;
  }
  const now = new Date();
  const to = now.toISOString().slice(0, 10);
  const from = (days: number) => { const date = new Date(now); date.setUTCDate(date.getUTCDate() - days + 1); return date.toISOString().slice(0, 10); };
  const reports = new Map<number, Awaited<ReturnType<typeof getHotmartFinanceReport>>>();
  for (const days of [7, 30, 90]) reports.set(days, await getHotmartFinanceReport(from(days), to));
  const report = reports.get(90)!;
  const founderSale = report.transactions.find((item) => item.offerCode === "v4h77zvh") ?? null;
  const founderSubscription = report.subscriptions.find((item) => item.offerCode === "v4h77zvh") ?? null;

  const admin = createAdminClient();
  const [{ data: eventRows, error: eventsError }, { data: subscriptionRows, error: subscriptionsError }] = await Promise.all([
    founderSale ? admin.from("hotmart_webhook_events").select("event_type,transaction_id,subscription_id,product_id,processing_status,event_created_at").or(`transaction_id.eq.${founderSale.transaction},subscription_id.eq.${founderSubscription?.subscriberCode ?? "missing"}`) : Promise.resolve({ data: [], error: null }),
    admin.from("subscriptions").select("user_id,status,price_tier,provider,provider_subscription_id,current_period_start,current_period_end").eq("provider", "hotmart"),
  ]);
  if (eventsError) throw eventsError;
  if (subscriptionsError) throw subscriptionsError;
  const matchingSubscription = founderSubscription ? (subscriptionRows ?? []).find((row) => row.provider_subscription_id === founderSubscription.subscriberCode) ?? null : null;
  const billingIdentity = matchingSubscription ? await admin.from("billing_customers").select("user_id", { count: "exact", head: true }).eq("user_id", matchingSubscription.user_id) : { count: 0, error: null };
  if (billingIdentity.error) throw billingIdentity.error;

  const safeResult = {
    auth: { connected, tokenObtained: connected, productCorrect: process.env.HOTMART_PRODUCT_ID === "8516493" },
    periods: Object.fromEntries([...reports].map(([days, value]) => [days, { transactions: value.transactions.length, founder: value.founderActive, standard: value.standardActive, canceled: value.canceledSubscriptions, refunds: value.refunds, chargebacks: value.chargebacks }])),
    founderSale: founderSale && { found: true, transaction: `${founderSale.transaction.slice(0, 4)}…${founderSale.transaction.slice(-4)}`, offer: founderSale.offerCode, status: founderSale.status, gross: founderSale.gross, producerCommission: founderSale.producerCommission, paymentType: founderSale.paymentType, date: founderSale.date },
    founderSubscription: founderSubscription && { identifier: `${founderSubscription.subscriberCode.slice(0, 4)}…`, status: founderSubscription.status, offer: founderSubscription.offerCode, accessionDate: founderSubscription.accessionDate, endDate: founderSubscription.endDate, nextChargeDate: founderSubscription.nextChargeDate, cancellationDate: founderSubscription.cancellationDate, price: founderSubscription.price },
    catalog: { founderOfferFound: report.founderOfferFound, standardOfferFound: report.standardOfferFound, plans: report.subscriptionPlansFound },
    reconciliation: { webhook: (eventRows ?? []).map((row) => ({ eventType: row.event_type, transaction: row.transaction_id ? `${row.transaction_id.slice(0, 4)}…${row.transaction_id.slice(-4)}` : null, subscription: row.subscription_id ? `${row.subscription_id.slice(0, 4)}…` : null, productId: row.product_id, processingStatus: row.processing_status, eventCreatedAt: row.event_created_at })), localSubscription: matchingSubscription ? { status: matchingSubscription.status, tier: matchingSubscription.price_tier, periodStart: matchingSubscription.current_period_start, periodEnd: matchingSubscription.current_period_end } : null, matchingWebhookEvents: eventRows?.length ?? 0, webhookProductCorrect: (eventRows ?? []).every((row) => row.product_id === "8516493"), matchingSubscription: Boolean(matchingSubscription), subscriptionStatusMatches: matchingSubscription ? (founderSubscription?.status.startsWith("CANCELLED") ? matchingSubscription.status === "canceled" : matchingSubscription.status.toUpperCase() === founderSubscription?.status) : null, subscriptionTierMatches: matchingSubscription?.price_tier === "founder_477", billingIdentityLinked: (billingIdentity.count ?? 0) > 0 },
  };
  console.log(JSON.stringify(safeResult, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ name: error instanceof Error ? error.name : "Error", code: error && typeof error === "object" && "code" in error ? error.code : null, status: error && typeof error === "object" && "status" in error ? error.status : null, resource: error && typeof error === "object" && "resource" in error ? error.resource : null, message: error instanceof Error ? error.message : "Falha desconhecida" }));
  process.exitCode = 1;
});
