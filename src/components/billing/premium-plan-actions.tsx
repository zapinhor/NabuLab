"use client";

import { useState } from "react";
import type { BillingPriceTier } from "@/lib/billing/config";

type Plan = {
  tier: BillingPriceTier;
  name: string;
  price: string;
  available: boolean;
};

export default function PremiumPlanActions({ plans }: { plans: Plan[] }) {
  const [loadingTier, setLoadingTier] = useState<BillingPriceTier | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(tier: BillingPriceTier) {
    setLoadingTier(tier);
    setError(null);
    try {
      const response = await fetch("/api/billing/prepare", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error ?? "Não foi possível abrir o checkout.");
      }
      window.location.assign(result.checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Não foi possível abrir o checkout.",
      );
      setLoadingTier(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.tier}
            className="flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
                  NabuLab Premium
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{plan.name}</h2>
              </div>
              {plan.tier === "founder_477" && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  Fundador
                </span>
              )}
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-950">
              {plan.price}
              <span className="text-sm font-semibold text-slate-500">/mês</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Simulados ilimitados, até 50 questões, nível avançado e todos os recursos de análise.
            </p>
            <button
              type="button"
              disabled={!plan.available || loadingTier !== null}
              onClick={() => void startCheckout(plan.tier)}
              className="mt-auto rounded-xl bg-[var(--nabu-blue-dark)] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loadingTier === plan.tier
                ? "Preparando checkout..."
                : plan.available
                  ? `Escolher ${plan.name}`
                  : "Disponível em breve"}
            </button>
          </article>
        ))}
      </div>
      <p className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
        No checkout da Hotmart, use o mesmo e-mail cadastrado na sua conta NabuLab. Ele será usado
        para vincular sua assinatura com segurança.
      </p>
      {error && (
        <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
