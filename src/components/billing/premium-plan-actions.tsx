"use client";

import { useState } from "react";
import type { BillingPriceTier } from "@/lib/billing/config";

type Offer = {
  tier: BillingPriceTier;
  name: string;
  price: string;
  available: boolean;
};

export default function PremiumPlanActions({ offer, standardPrice }: { offer: Offer; standardPrice: string }) {
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
      <div className="mx-auto max-w-xl">
          <article className="flex min-h-80 flex-col rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-lg shadow-blue-950/5 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
                  NabuLab Premium
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">Acesso completo</h2>
              </div>
              {offer.tier === "founder_477" && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  PREÇO FUNDADOR
                </span>
              )}
            </div>
            {offer.tier === "founder_477" && <p className="mt-6 text-sm font-semibold text-slate-500">De <span className="line-through decoration-slate-500">{standardPrice}/mês</span></p>}
            <p className={offer.tier === "founder_477" ? "mt-1 text-4xl font-black text-slate-950" : "mt-6 text-4xl font-black text-slate-950"}>
              {offer.tier === "founder_477" && <span className="mr-2 text-base font-bold text-amber-800">por</span>}{offer.price}<span className="text-sm font-semibold text-slate-500">/mês</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Simulados ilimitados, até 50 questões, nível avançado e todos os recursos Premium.
            </p>
            {offer.tier === "founder_477" && <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><p className="font-bold">Condição especial de lançamento.</p><p>Você mantém {offer.price}/mês enquanto sua assinatura permanecer ativa.</p></div>}
            <button
              type="button"
              disabled={!offer.available || loadingTier !== null}
              onClick={() => void startCheckout(offer.tier)}
              className="mt-7 rounded-xl bg-[var(--nabu-blue-dark)] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loadingTier === offer.tier
                ? "Preparando checkout..."
                : offer.available
                  ? `Assinar por ${offer.price}/mês`
                  : "Disponível em breve"}
            </button>
          </article>
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
