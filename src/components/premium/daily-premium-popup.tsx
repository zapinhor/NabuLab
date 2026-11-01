"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Icon } from "@/components/ui/icon";
import { discountPercent, pricePerDay } from "@/lib/billing/price-display";
import { hasActivePremium } from "@/lib/entitlements";
import { getQuotaAndOffer, type PremiumOffer } from "@/lib/exam-generation-client";
import { useStudentAccount } from "@/lib/use-student-account";

/** Telas do estudante onde o convite pode aparecer. A prova fica de fora para não interromper. */
const STUDENT_PATHS = ["/dashboard", "/estudar", "/simulado/novo", "/metas", "/evolucao", "/analise", "/dominio", "/recomendado", "/revisao", "/historico", "/favoritos", "/aluno", "/aulas"];

export function isDailyPopupPath(pathname: string) {
  return STUDENT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function saoPauloDay(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

const BENEFITS = [
  "Questões sem limite diário (no grátis são 10 por dia)",
  "Banco completo, incluindo o nível avançado",
  "Simulados de até 50 questões",
  "Treinar erros, histórico completo, evolução e domínio por matéria",
];

/** Enquanto a pessoa usa o site: a cada 12 min, ou ao voltar à aba depois de 5 min do último convite. */
export const POPUP_INTERVAL_MS = 12 * 60_000;
export const POPUP_TAB_RETURN_GAP_MS = 5 * 60_000;

let lastShownInMemory = 0;

function lastShownAt(userId: string) {
  try {
    return Math.max(lastShownInMemory, Number(window.localStorage.getItem(`nabulab_premium_popup_at:${userId}`) ?? 0) || 0);
  } catch {
    return lastShownInMemory;
  }
}

function markShown(userId: string) {
  lastShownInMemory = Date.now();
  try {
    window.localStorage.setItem(`nabulab_premium_popup_at:${userId}`, String(lastShownInMemory));
  } catch {
    // Sem armazenamento: vale só para esta sessão.
  }
}

/** Primeira vez no dia (São Paulo) ou intervalo mínimo desde o último convite. */
export function shouldShowPopup(last: number, now: number, minGap: number) {
  if (!last) return true;
  if (saoPauloDay(new Date(last)) !== saoPauloDay(new Date(now))) return true;
  return now - last >= minGap;
}

/** Convite ao Premium para quem está no plano grátis: ao abrir o site no dia, a cada 12 min de uso e ao voltar à aba. Só some ao fechar ou ir assinar. */
export function DailyPremiumPopup() {
  const pathname = usePathname() ?? "";
  if (!isDailyPopupPath(pathname)) return null;
  return <DailyPremiumPopupInner />;
}

function DailyPremiumPopupInner() {
  const { account, loading } = useStudentAccount();
  const dialog = useRef<HTMLDialogElement>(null);
  const [offer, setOffer] = useState<PremiumOffer | null>(null);
  const [open, setOpen] = useState(false);

  const openRef = useRef(false);

  useEffect(() => {
    if (loading || !account || hasActivePremium(account.subscription)) return;
    const userId = account.id;
    let offerLoaded = false;
    const show = (minGap: number) => {
      if (openRef.current || document.visibilityState !== "visible") return;
      if (!shouldShowPopup(lastShownAt(userId), Date.now(), minGap)) return;
      openRef.current = true;
      markShown(userId);
      if (offerLoaded) { setOpen(true); return; }
      // Abre depois de buscar a oferta, para o preço já aparecer junto; sem preço, abre mesmo assim.
      getQuotaAndOffer()
        .then(({ offer: current }) => { offerLoaded = true; setOffer(current); })
        .catch(() => { /* sem preço, o botão leva ao Premium */ })
        .finally(() => setOpen(true));
    };
    const initial = window.setTimeout(() => show(POPUP_INTERVAL_MS), 0);
    const timer = window.setInterval(() => show(POPUP_INTERVAL_MS), 60_000);
    const onVisible = () => show(POPUP_TAB_RETURN_GAP_MS);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [account, loading]);

  useEffect(() => {
    if (open && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [open]);

  if (!open) return null;
  const discount = offer ? discountPercent(offer.price, offer.regularPrice) : null;
  const perDay = offer ? pricePerDay(offer.price) : null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="premium-popup-title"
      onClose={() => { openRef.current = false; setOpen(false); }}
      className="m-auto w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-3xl p-0 shadow-2xl backdrop:bg-slate-950/60"
    >
      <div className="bg-[#0B2D6B] px-6 pb-5 pt-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F4C430] text-[#0B2D6B]"><Icon name="trofeu" size={22} /></span>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar e continuar no plano grátis" className="grid h-10 w-10 place-items-center rounded-xl text-blue-100 hover:bg-white/10">
            <Icon name="fechar" size={20} />
          </button>
        </div>
        <h2 id="premium-popup-title" className="mt-4 text-2xl font-black leading-tight">Assine o Premium e desbloqueie tudo</h2>
        <p className="mt-2 text-sm leading-6 text-blue-100">Estude sem limite e veja exatamente onde melhorar.</p>
      </div>
      <div className="px-6 py-5">
        <ul className="space-y-2.5">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex gap-2.5 text-sm leading-6 text-slate-700">
              <span className="mt-0.5 shrink-0 text-emerald-600"><Icon name="check" size={18} /></span>
              {benefit}
            </li>
          ))}
        </ul>
        {offer && (discount !== null || perDay) && (
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm font-bold text-[#0B2D6B]">
            {discount !== null && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">{discount}% de desconto</span>}
            {perDay && <span>Premium por {perDay}</span>}
          </p>
        )}
        <TrackedLink
          event="premium_cta_clicked"
          properties={{ placement: "daily_popup" }}
          href="/premium"
          className="mt-5 flex min-h-12 flex-col items-center justify-center rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-center text-sm font-black text-white transition hover:bg-[#174EA6]"
        >
          Quero o Premium
          {offer && (
            <span className="text-xs font-semibold text-blue-100">
              {offer.founder ? "Preço Fundador " : ""}{offer.price}/mês
              {offer.regularPrice ? <> (de <span className="line-through">{offer.regularPrice}</span>)</> : null}
            </span>
          )}
        </TrackedLink>
        <button type="button" onClick={() => dialog.current?.close()} className="mt-2 min-h-11 w-full rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
          Agora não, continuar no grátis
        </button>
      </div>
    </dialog>
  );
}
