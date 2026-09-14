import { getConfiguredCheckout, type BillingPriceTier } from "@/lib/billing/config";
import { prepareBillingIdentity } from "@/lib/billing/server";
import { createClient } from "@/lib/supabase/server";

function isTier(value: unknown): value is BillingPriceTier {
  return value === "founder_477" || value === "standard_990";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return Response.json({ error: "Sessão necessária." }, { status: 401 });
  }

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

  const checkoutUrl = getConfiguredCheckout(tier);
  if (!checkoutUrl) {
    return Response.json({ error: "Este plano ainda não está disponível." }, { status: 409 });
  }
  if (!data.user.email) {
    return Response.json({ error: "Sua conta não possui um e-mail válido." }, { status: 400 });
  }

  try {
    await prepareBillingIdentity(data.user.id, data.user.email);
    return Response.json({
      checkoutUrl,
      notice: "Use no checkout o mesmo e-mail da sua conta NabuLab.",
    });
  } catch (error) {
    console.error(
      "[billing-prepare] Não foi possível preparar a identidade de cobrança:",
      error instanceof Error ? error.message : "erro desconhecido",
    );
    return Response.json({ error: "Não foi possível iniciar a contratação." }, { status: 500 });
  }
}
