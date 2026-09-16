import { getHotmartConfig } from "@/lib/billing/config";
import { validateHotmartWebhookRequest } from "@/lib/billing/hotmart-request";
import { createAdminClient } from "@/lib/supabase/admin";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { sendGa4Purchase } from "@/lib/analytics/ga4-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const config = getHotmartConfig();
  if (!config.hottok || !config.productId) {
    console.error("[hotmart-webhook] Configuração server-side incompleta.");
    return Response.json({ error: "Webhook indisponível." }, { status: 503 });
  }

  const validation = await validateHotmartWebhookRequest(request, {
    hottok: config.hottok,
    productId: config.productId,
    founderPlanId: config.plans.founder_477.providerPlanId,
    standardPlanId: config.plans.standard_990.providerPlanId,
  });
  if (validation instanceof Response) return validation;
  const { event, priceTier } = validation;

  try {
    const admin = createAdminClient();
    let normalizedEmail = event.buyerEmail;

    if (event.eventType === "SWITCH_PLAN" && !normalizedEmail) {
      const { data: subscription, error: subscriptionError } = await admin
        .from("subscriptions")
        .select("user_id")
        .eq("provider", "hotmart")
        .eq("provider_subscription_id", event.providerSubscriptionId ?? "")
        .maybeSingle();
      if (subscriptionError) throw subscriptionError;

      if (subscription?.user_id) {
        const { data: customer, error: customerError } = await admin
          .from("billing_customers")
          .select("normalized_email")
          .eq("provider", "hotmart")
          .eq("user_id", subscription.user_id)
          .maybeSingle();
        if (customerError) throw customerError;
        normalizedEmail = customer?.normalized_email ?? null;
      }

      if (!normalizedEmail) {
        console.warn(
          "[hotmart-webhook] SWITCH_PLAN sem vínculo de assinatura; evento aceito sem alteração.",
        );
        return Response.json(
          { received: true, ignored: "test_unmatched" },
          { status: 202 },
        );
      }
    }

    const { data, error } = await admin.rpc("process_hotmart_webhook_event", {
      p_event_id: event.eventId,
      p_event_type: event.eventType,
      p_product_id: event.productId,
      p_event_created_at: event.eventCreatedAt,
      p_transaction_id: event.transactionId,
      p_subscription_id: event.providerSubscriptionId,
      p_provider_customer_id: event.providerCustomerId,
      p_normalized_email: normalizedEmail,
      p_price_tier: priceTier,
      p_subscription_status: event.status,
      p_current_period_start: event.currentPeriodStart,
      p_current_period_end: event.currentPeriodEnd,
      p_sanitized_payload: event.sanitizedPayload,
    });
    if (error) throw error;

    const result = Array.isArray(data) ? data[0]?.result : data?.result;
    const resolvedUserId = Array.isArray(data) ? data[0]?.resolved_user_id : data?.resolved_user_id;
    if (result === "processed" && resolvedUserId) {
      if (event.eventType === "PURCHASE_APPROVED" || event.eventType === "PURCHASE_COMPLETE") {
        await recordAuthenticatedAnalyticsEvent("purchase_approved", resolvedUserId, {
          properties: { tier: priceTier ?? "unmapped" },
          sourceEventKey: `hotmart:purchase:${event.transactionId ?? event.providerSubscriptionId ?? event.eventId}`,
        });
        const transactionId = event.transactionId ?? event.providerSubscriptionId ?? event.eventId;
        try { await sendGa4Purchase({ transactionId, userId: resolvedUserId, tier: priceTier ?? "unmapped" }); }
        catch (gaError) { console.error("[ga4] Falha ao registrar purchase:", gaError instanceof Error ? gaError.message : "erro desconhecido"); }
      } else if (event.eventType === "SUBSCRIPTION_CANCELLATION") {
        await recordAuthenticatedAnalyticsEvent("subscription_canceled", resolvedUserId, {
          properties: { provider: "hotmart" },
          sourceEventKey: `hotmart:${event.eventId}:cancellation`,
        });
      }
    }
    return Response.json(
      { received: true, result: result ?? "processed" },
      { status: result === "conflict" || result === "unmatched" ? 202 : 200 },
    );
  } catch (error) {
    console.error(
      "[hotmart-webhook] Falha ao processar evento:",
      error instanceof Error ? error.message : "erro desconhecido",
    );
    return Response.json({ error: "Falha interna ao processar webhook." }, { status: 500 });
  }
}
