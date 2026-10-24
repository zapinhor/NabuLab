"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Icon } from "@/components/ui/icon";
import { getQuotaAndOffer, type PremiumOffer } from "@/lib/exam-generation-client";
import { discountPercent, pricePerDay } from "@/lib/billing/price-display";

/**
 * Aviso de fim das questões grátis do dia, com o próximo passo:
 * - na prova: entregar o que já respondeu e ver a correção;
 * - nas outras telas: voltar amanhã ou continuar agora no Premium.
 * O preço vem do servidor (oferta vigente).
 */
export function FreeLimitCard({
  placement,
  limit = 10,
  answeredInExam,
  onSubmitExam,
  onClose,
}: {
  placement: "exam" | "new_exam" | "dashboard";
  limit?: number;
  /** Só na prova: quantas questões a pessoa já respondeu neste simulado. */
  answeredInExam?: number;
  onSubmitExam?: () => void;
  onClose?: () => void;
}) {
  const [offer, setOffer] = useState<PremiumOffer | null>(null);

  useEffect(() => {
    let active = true;
    getQuotaAndOffer()
      .then(({ offer: current }) => { if (active) setOffer(current); })
      .catch(() => { /* sem preço, o botão continua levando ao Premium */ });
    return () => { active = false; };
  }, []);

  return (
    <section aria-labelledby={`limite-${placement}`} className="overflow-hidden rounded-2xl border border-[#F4C430]/60 bg-[#FFF9E6] p-5 text-left sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-amber-700"><Icon name="trofeu" size={20} /></span>
        <div className="min-w-0 flex-1">
          <h2 id={`limite-${placement}`} className="text-lg font-black leading-snug text-[#0B2D6B]">Você usou suas {limit} questões grátis de hoje</h2>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            {placement === "exam" && answeredInExam
              ? `Boa! Entregue o simulado para ver a correção das ${answeredInExam} ${answeredInExam === 1 ? "questão que você respondeu" : "questões que você respondeu"}. `
              : "Amanhã você ganha mais " + limit + ". "}
            Para continuar agora, sem limite, conheça o Premium.
          </p>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Fechar aviso" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-white">
            <Icon name="fechar" size={18} />
          </button>
        )}
      </div>

      {offer && (discountPercent(offer.price, offer.regularPrice) !== null || pricePerDay(offer.price)) && (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-[#0B2D6B]">
          {discountPercent(offer.price, offer.regularPrice) !== null && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">{discountPercent(offer.price, offer.regularPrice)}% de desconto</span>
          )}
          {pricePerDay(offer.price) && <span>Premium por {pricePerDay(offer.price)}</span>}
        </p>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <TrackedLink
          event="premium_cta_clicked"
          properties={{ placement: `free_limit_${placement}` }}
          href="/premium"
          className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-center text-sm font-black text-white transition hover:bg-[#174EA6]"
        >
          Continuar sem limite
          {offer && (
            <span className="text-xs font-semibold text-blue-100">
              {offer.founder ? "Preço Fundador " : ""}{offer.price}/mês
              {offer.regularPrice ? <> (de <span className="line-through">{offer.regularPrice}</span>)</> : null}
            </span>
          )}
        </TrackedLink>
        {placement === "exam" && onSubmitExam ? (
          <button type="button" onClick={onSubmitExam} className="min-h-12 rounded-xl border border-amber-300 bg-white px-4 py-3 text-sm font-bold text-[#0B2D6B] transition hover:bg-amber-50">
            Entregar e ver a correção
          </button>
        ) : (
          <Link href="/historico" className="flex min-h-12 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 py-3 text-sm font-bold text-[#0B2D6B] transition hover:bg-amber-50">
            Rever meus simulados
          </Link>
        )}
      </div>
    </section>
  );
}
