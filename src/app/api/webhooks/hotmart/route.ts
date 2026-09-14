import { getHotmartConfig } from "@/lib/billing/config";
import { validateHotmartWebhookRequest } from "@/lib/billing/hotmart-request";
import { createAdminClient } from "@/lib/supabase/admin";

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
    const { data, error } = await admin.rpc("process_hotmart_webhook_event", {
      p_event_id: event.eventId,
      p_event_type: event.eventType,
      p_product_id: event.productId,
      p_event_created_at: event.eventCreatedAt,
      p_transaction_id: event.transactionId,
      p_subscription_id: event.providerSubscriptionId,
      p_provider_customer_id: event.providerCustomerId,
      p_normalized_email: event.buyerEmail,
      p_price_tier: priceTier,
      p_subscription_status: event.status,
      p_current_period_start: event.currentPeriodStart,
      p_current_period_end: event.currentPeriodEnd,
      p_sanitized_payload: event.sanitizedPayload,
    });
    if (error) throw error;

    const result = Array.isArray(data) ? data[0]?.result : data?.result;
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
