import Link from "next/link";
import { redirect } from "next/navigation";
import PremiumPlanActions from "@/components/billing/premium-plan-actions";
import NabuLabBrand from "@/components/ui/nabulab-brand";
import { getHotmartConfig } from "@/lib/billing/config";
import { createClient } from "@/lib/supabase/server";
import { TrackPageView } from "@/components/analytics/track-event";
import { hasActivePremium, subscriptionFromRow } from "@/lib/entitlements";

export default async function PremiumPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=%2Fpremium");
  const { data: subscriptionRow } = await supabase
    .from("subscriptions")
    .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
    .eq("user_id", data.user.id)
    .maybeSingle();
  const subscription = subscriptionFromRow(subscriptionRow);
  const premiumActive = hasActivePremium(subscription);

  const config = getHotmartConfig();
  const offer = {
    tier: config.currentOffer.tier,
    name: config.currentOffer.name,
    price: config.currentOffer.displayPrice,
    available: config.currentOffer.available,
  };

  return (
    <main className="min-h-screen bg-[var(--nabu-background)] px-4 py-6 sm:px-6 sm:py-10">
      <TrackPageView event="premium_page_viewed" />
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4">
          <NabuLabBrand subtitle="Premium" href="/dashboard" />
          <Link
            href="/perfil"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Voltar ao perfil
          </Link>
        </header>

        <section className="py-10 text-center sm:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            NabuLab Premium
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Todo o NabuLab para acelerar seus estudos.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Desbloqueie todos os recursos do NabuLab e estude sem limites.
          </p>
        </section>

        {premiumActive ? (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-center">
            <p className="text-sm font-black uppercase tracking-wider text-emerald-800">Premium ativo</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Sua conta já tem acesso completo.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Plano: <strong>{subscription?.priceTier === "founder_477" ? "Founder" : "Standard"}</strong></p>
            <div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/perfil" className="inline-block rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Ver perfil</Link>{subscription?.provider === "hotmart" && <a href="https://consumer.hotmart.com/" target="_blank" rel="noreferrer" className="inline-block rounded-xl border border-emerald-300 bg-white px-5 py-3 font-bold text-emerald-900">Gerenciar assinatura</a>}</div>
          </section>
        ) : <PremiumPlanActions offer={offer} standardPrice={config.plans.standard_990.displayPrice} />}
      </div>
    </main>
  );
}
