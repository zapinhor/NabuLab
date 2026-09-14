import Link from "next/link";
import { redirect } from "next/navigation";
import PremiumPlanActions from "@/components/billing/premium-plan-actions";
import NabuLabBrand from "@/components/ui/nabulab-brand";
import { getHotmartConfig } from "@/lib/billing/config";
import { createClient } from "@/lib/supabase/server";

export default async function PremiumPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=%2Fpremium");

  const config = getHotmartConfig();
  const plans = [
    ...(config.plans.founder_477.available
      ? [{ tier: "founder_477" as const, name: "Founder", price: "R$ 4,77", available: true }]
      : []),
    {
      tier: "standard_990" as const,
      name: "Standard",
      price: "R$ 9,90",
      available: config.plans.standard_990.available,
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--nabu-background)] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4">
          <NabuLabBrand subtitle="Premium" />
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
            Founder e Standard têm os mesmos recursos. A diferença é somente a condição comercial.
          </p>
        </section>

        <PremiumPlanActions plans={plans} />
      </div>
    </main>
  );
}
