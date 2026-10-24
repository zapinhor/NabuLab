import { getConfiguredCheckout, getHotmartConfig, type BillingPriceTier } from "@/lib/billing/config";
import { prepareBillingIdentity } from "@/lib/billing/server";
import { createClient } from "@/lib/supabase/server";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { ATTRIBUTION_COOKIE, readAttribution } from "@/lib/analytics/acquisition";
import { recordAcquisitionMetric } from "@/lib/analytics/acquisition-server";
import { cookies } from "next/headers";
import { consumeApiRateLimit, rateLimitIdentity } from "@/lib/security/api-rate-limit";
import { getRequestId, logServerEvent } from "@/lib/observability";
import { isRequestBodyTooLarge, isTrustedMutationOrigin } from "@/lib/security/request";

function isTier(value: unknown): value is BillingPriceTier {
  return value === "founder_477" || value === "standard_990";
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  if (!isTrustedMutationOrigin(request)) return Response.json({ error: "Origem não permitida." }, { status: 403 });
  if (isRequestBodyTooLarge(request, 4096)) return Response.json({ error: "Payload muito grande." }, { status: 413 });
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return Response.json({ error: "Sessão necessária." }, { status: 401 });
  }
  const limit = await consumeApiRateLimit({
    bucketDigest: rateLimitIdentity(request, data.user.id), action: "student_checkout_prepare", limit: 10, windowSeconds: 300,
  });
  if (!limit.allowed) return Response.json({ error: "Muitas tentativas. Aguarde e tente novamente." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }
  const tier = (body as { tier?: unknown } | null)?.tier;
  if (!isTier(tier)) {
    return Response.json({ error: "Plano inválido." }, { status: 400 });
  }
  if (tier !== getHotmartConfig().currentOffer.tier) {
    return Response.json({ error: "Esta oferta não está disponível no momento." }, { status: 409 });
  }

  const checkoutUrl = getConfiguredCheckout(tier);
  if (!checkoutUrl) {
    return Response.json({ error: "Este plano ainda não está disponível." }, { status: 409 });
  }
  if (!data.user.email) {
    return Response.json({ error: "Sua conta não possui um e-mail válido." }, { status: 400 });
  }

  try {
    await prepareBillingIdentity(data.user.id, data.user.email);
    await recordAuthenticatedAnalyticsEvent("checkout_started", data.user.id, {
      path: "/premium",
      properties: { tier },
    });
    try {
      const campaignCookie = (await cookies()).get(ATTRIBUTION_COOKIE)?.value;
      await recordAcquisitionMetric("checkout_started", readAttribution(campaignCookie), "");
    } catch (metricError) {
      console.error("[acquisition] Checkout não agregado:", metricError instanceof Error ? metricError.message : "erro desconhecido");
    }
    return Response.json({
      checkoutUrl,
      notice: "Use no checkout o mesmo e-mail da sua conta NabuLab.",
    });
  } catch (error) {
    logServerEvent({ level: "error", subsystem: "billing", event: "student_checkout_prepare_failed", outcome: "failure", requestId, httpStatus: 500, metadata: { errorName: error instanceof Error ? error.name : "UnknownError" } });
    return Response.json({ error: "Não foi possível iniciar a contratação." }, { status: 500 });
  }
}
