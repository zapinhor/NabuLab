import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { getTeacherOffer } from "@/lib/billing/teacher-config";
import { prepareBillingIdentity } from "@/lib/billing/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return Response.json({ error: "Sessão necessária." }, { status: 401 });
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
