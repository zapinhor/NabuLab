"use client";

import { useState } from "react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Icon } from "@/components/ui/icon";

/*
 * Questão de exemplo da primeira tela da home. É uma questão própria da
 * home (não vem do banco), então o gabarito aqui não expõe nada do banco.
 */

const QUESTION = {
  subject: "Matemática",
  statement: "A passagem de ônibus subiu de R$ 5,00 para R$ 6,00. De quanto foi o aumento?",
  alternatives: [
    { id: "A", text: "1%" },
    { id: "B", text: "10%" },
    { id: "C", text: "16,7%" },
    { id: "D", text: "20%" },
  ],
  correct: "D",
  explanation: "O aumento foi de R$ 1,00 sobre os R$ 5,00 iniciais: 1 ÷ 5 = 0,20, ou seja, 20%.",
  trap: {
    C: "16,7% é o que dá se você dividir pelo preço novo (1 ÷ 6). O aumento se calcula sobre o valor inicial.",
  } as Record<string, string>,
};

export function HeroSampleQuestion({ authenticated }: { authenticated: boolean }) {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const right = picked === QUESTION.correct;

  return (
    <div aria-label="Questão de exemplo" className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-[#071A3D] p-3 shadow-2xl shadow-blue-950/20">
      <div className="rounded-[1.4rem] bg-[#F5F7FB] p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wider text-blue-700">Teste agora · {QUESTION.subject}</p>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500">Exemplo</span>
        </div>
        <p className="mt-4 text-lg font-black leading-7 text-slate-950">{QUESTION.statement}</p>

        <div className="mt-4 grid gap-2" role="group" aria-label="Alternativas">
          {QUESTION.alternatives.map((alternative) => {
            const isCorrect = alternative.id === QUESTION.correct;
            const isPicked = alternative.id === picked;
            const state = !answered
              ? "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50"
              : isCorrect
                ? "border-emerald-300 bg-emerald-50"
                : isPicked
                  ? "border-rose-300 bg-rose-50"
                  : "border-slate-200 bg-white opacity-60";
            return (
              <button
                key={alternative.id}
                type="button"
                disabled={answered}
                aria-pressed={isPicked}
                onClick={() => setPicked(alternative.id)}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-bold text-slate-800 transition ${state}`}
              >
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${answered && isCorrect ? "bg-emerald-600 text-white" : answered && isPicked ? "bg-rose-600 text-white" : "bg-blue-100 text-blue-800"}`}>
                  {answered && isCorrect ? <Icon name="check" size={14} strokeWidth={3} /> : alternative.id}
                </span>
                {alternative.text}
              </button>
            );
          })}
        </div>

        {!answered ? (
          <p className="mt-4 text-center text-xs font-semibold text-slate-500">Toque em uma alternativa para ver a correção.</p>
        ) : (
          <div aria-live="polite" className="mt-4 rounded-2xl bg-white p-4">
            <p className={`text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "Acertou!" : "Não foi dessa vez."}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{!right && picked && QUESTION.trap[picked] ? `${QUESTION.trap[picked]} ` : ""}{QUESTION.explanation}</p>
            <p className="mt-3 text-sm font-bold text-slate-800">É assim em todas as questões: você responde e entende o porquê.</p>
            <TrackedLink
              event="signup_cta_clicked"
              properties={{ placement: "hero_sample", answer: right ? "correct" : "incorrect" }}
              href={authenticated ? "/dashboard" : "/experimente"}
              className="mt-3 block rounded-xl bg-[#0B2D6B] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-900"
            >
              {authenticated ? "Continuar praticando" : "Fazer o teste com 3 questões"}
            </TrackedLink>
          </div>
        )}
      </div>
    </div>
  );
}
