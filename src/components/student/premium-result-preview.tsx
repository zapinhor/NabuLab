"use client";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Icon, type IconName } from "@/components/ui/icon";
import type { PremiumUpsell } from "@/lib/exam-generation-client";
import { discountPercent, pricePerDay } from "@/lib/billing/price-display";

const BENEFITS: Array<{ icon: IconName; text: string }> = [
  { icon: "treinar-erros", text: "Treinar só os seus erros" },
  { icon: "questoes", text: "Simulados sem limite, até 50 questões" },
  { icon: "baixo-dominio", text: "Questões de nível avançado" },
  { icon: "evolucao", text: "Evolução e domínio por matéria" },
];

/**
 * Prévia do Premium no resultado, para quem está no plano gratuito.
 * Usa o resultado da própria prova para mostrar o próximo passo.
 */
export function PremiumResultPreview({ upsell, mistakes }: { upsell: PremiumUpsell; mistakes: number }) {
  const discount = discountPercent(upsell.price, upsell.regularPrice);
  const perDay = pricePerDay(upsell.price);
  const headline = mistakes > 0
    ? `Você errou ou deixou em branco ${mistakes} ${mistakes === 1 ? "questão" : "questões"}. No Premium, elas viram um treino só seu.`
    : "Você foi muito bem. No Premium, você vai além com simulados maiores e questões avançadas.";

  return (
    <section aria-labelledby="premium-preview" className="mt-5 overflow-hidden rounded-2xl border border-[#F4C430]/60 bg-[#FFF9E6] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[.14em] text-amber-800">
            {upsell.firstExam ? "Seu primeiro simulado está feito" : "Próximo passo"}
          </p>
          <h2 id="premium-preview" className="mt-1 text-lg font-black leading-snug text-[#0B2D6B] sm:text-xl">{headline}</h2>
          <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-slate-700 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-2">
                <Icon name={benefit.icon} size={16} className="text-[#3B82F6]" />
                {benefit.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="shrink-0 text-center lg:min-w-56">
          {upsell.founder && <p className="text-[11px] font-black uppercase tracking-[.14em] text-amber-800">Preço Fundador</p>}
          <p className="mt-1">
            <span className="text-3xl font-black text-[#0B2D6B]">{upsell.price}</span>
            <span className="text-sm font-semibold text-slate-500">/mês</span>
          </p>
          {upsell.regularPrice && (
            <p className="flex items-center justify-center gap-2 text-xs font-semibold">
              <span className="text-slate-400 line-through">{upsell.regularPrice}/mês</span>
              {discount !== null && <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-black text-emerald-800">{discount}% off</span>}
            </p>
          )}
          {perDay && <p className="mt-1 text-xs font-bold text-blue-700">Isso é {perDay}.</p>}
          <TrackedLink
            event="premium_cta_clicked"
            properties={{ placement: upsell.firstExam ? "result_first_exam" : "result", mistakes }}
            href="/premium"
            className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#0B2D6B] px-5 py-3 text-sm font-black text-white transition hover:bg-[#174EA6]"
          >
            Conhecer o Premium
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
