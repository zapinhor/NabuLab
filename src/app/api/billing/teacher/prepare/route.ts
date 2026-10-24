import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { getTeacherOffer } from "@/lib/billing/teacher-config";
import { prepareBillingIdentity } from "@/lib/billing/server";
import { createClient } from "@/lib/supabase/server";
import { consumeApiRateLimit, rateLimitIdentity } from "@/lib/security/api-rate-limit";
import { isRequestBodyTooLarge, isTrustedMutationOrigin } from "@/lib/security/request";

export async function POST(request: Request) {
  if (!isTrustedMutationOrigin(request)) return Response.json({ error: "Origem não permitida." }, { status: 403 });
  if (isRequestBodyTooLarge(request, 4096)) return Response.json({ error: "Payload muito grande." }, { status: 413 });
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return Response.json({ error: "Sessão necessária." }, { status: 401 });
  const limit = await consumeApiRateLimit({
    bucketDigest: rateLimitIdentity(request, data.user.id), action: "teacher_checkout_prepare", limit: 10, windowSeconds: 300,
  });
  if (!limit.allowed) return Response.json({ error: "Muitas tentativas. Aguarde e tente novamente." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
  const body = await request.json().catch(() => null) as { offer?: unknown } | null;
  const offer = getTeacherOffer(body?.offer);
  if (!offer) return Response.json({ error: "Plano Professor inválido." }, { status: 400 });
  if (!offer.available || !offer.checkoutUrl) return Response.json({ error: "Esta oferta ainda não está disponível." }, { status: 409 });
  if (!data.user.email) return Response.json({ error: "Sua conta não possui e-mail válido." }, { status: 400 });
  await prepareBillingIdentity(data.user.id, data.user.email);
  await recordAuthenticatedAnalyticsEvent("teacher_checkout_started", data.user.id, {
    path: "/professor/planos",
    properties: {
      plan: offer.plan,
      cycle: offer.cycle,
      value: offer.expectedPrice,
      currency: offer.currency,
    },
  });
  return Response.json({ checkoutUrl: offer.checkoutUrl });
}
