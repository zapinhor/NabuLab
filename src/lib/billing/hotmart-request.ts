import type { BillingPriceTier } from "@/lib/billing/config";
import {
  parseHotmartEvent,
  resolveHotmartTier,
  secureTokenMatches,
  type ParsedHotmartEvent,
} from "@/lib/billing/hotmart";

const MAX_WEBHOOK_BYTES = 256_000;

export type ValidatedHotmartRequest = {
  event: ParsedHotmartEvent;
  priceTier: BillingPriceTier | null;
};

export async function validateHotmartWebhookRequest(
  request: Request,
  config: {
    hottok: string;
    productId: string;
    founderPlanId: string | null;
    standardPlanId: string | null;
  },
): Promise<ValidatedHotmartRequest | Response> {
  if (!secureTokenMatches(request.headers.get("x-hotmart-hottok"), config.hottok)) {
    return Response.json({ error: "Webhook não autorizado." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_WEBHOOK_BYTES) {
    return Response.json({ error: "Payload excede o limite permitido." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_WEBHOOK_BYTES) {
      return Response.json({ error: "Payload excede o limite permitido." }, { status: 413 });
    }
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Payload inválido." }, { status: 400 });
  }

  let event: ParsedHotmartEvent;
  try {
    event = parseHotmartEvent(payload);
  } catch (error) {
    if (error instanceof Error && error.message === "HOTMART_EVENT_UNSUPPORTED") {
      return Response.json({ received: true, ignored: "unsupported_event" }, { status: 202 });
    }
    return Response.json({ error: "Payload Hotmart inválido." }, { status: 400 });
  }

  if (event.productId !== config.productId) {
    return Response.json({ received: true, ignored: "unexpected_product" }, { status: 202 });
  }

  if (
    event.eventType === "SWITCH_PLAN" &&
    !event.buyerEmail &&
    !event.providerSubscriptionId
  ) {
    return Response.json(
      { received: true, ignored: "test_unmatched" },
      { status: 202 },
    );
  }

  return {
    event,
    priceTier: resolveHotmartTier(
      event.providerPlanIdentifiers,
      config.founderPlanId,
      config.standardPlanId,
    ),
  };
}
