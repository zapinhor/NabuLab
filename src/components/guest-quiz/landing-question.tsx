"use client";

import { useRef, useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { PROGRESS_KEY, difficultyLabel, type Progress } from "@/components/guest-quiz/guest-quiz";
import { Icon } from "@/components/ui/icon";
import type { GuestQuestion, GuestTrackId } from "@/lib/content/guest-quiz";
import { encodeGuestLock } from "@/lib/content/guest-lock";

/**
 * Primeira questão do teste grátis já na landing do anúncio: a pessoa responde
 * sem clicar em nada antes. A resposta fica salva como a questão 1 de 3, e o
 * botão segue para /experimente com a mesma semente, já na questão 2.
 */
export function LandingQuestion({
  question,
  track,
  seed,
  total,
  placement,
}: {
  question: GuestQuestion;
  track: GuestTrackId;
  seed: number;
  total: number;
  placement: string;
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const answered = chosen !== null;
  const gotItRight = chosen === question.correctAnswer;
  const correctAlternative = question.alternatives.find((alternative) => alternative.id === question.correctAnswer);
  const continueHref = `/experimente/iniciar?area=${track}&seed=${seed}`;

  function choose(alternativeId: string) {
    if (answered) return;
    setChosen(alternativeId);
    const progress: Progress = { lockKey: encodeGuestLock(track, seed), index: 1, choices: { [question.id]: alternativeId }, finished: false };
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch { /* navegação privada */ }
    void trackEvent("guest_quiz_started", { track, placement });
    void trackEvent("guest_question_answered", { track, position: 1, correct: alternativeId === question.correctAnswer, subject: question.subject, placement });
    requestAnimationFrame(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }

  return (
    <section aria-labelledby="questao-landing" className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-xs font-black">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-[#0B2D6B]">Teste agora · sem cadastro</span>
        <span className="text-slate-500">Questão 1 de {total}</span>
      </div>
      <p className="mt-4 text-xs font-black uppercase tracking-[.14em] text-blue-700">
        {question.subjectName} · {difficultyLabel[question.difficulty]}{question.type === "true-false" ? " · Verdadeiro ou falso" : ""}
      </p>
      <h2 id="questao-landing" className="mt-2 whitespace-pre-line text-base font-semibold leading-7 text-slate-900">{question.statement}</h2>

      <div className="mt-4 grid gap-2" role="group" aria-label="Alternativas">
        {question.alternatives.map((alternative) => {
          const isChosen = chosen === alternative.id;
          const isCorrect = alternative.id === question.correctAnswer;
          const state = !answered
            ? "border-slate-200 bg-white hover:border-[#3B82F6] hover:bg-blue-50"
            : isCorrect
              ? "border-emerald-500 bg-emerald-50"
              : isChosen
                ? "border-rose-400 bg-rose-50"
                : "border-slate-200 bg-white opacity-60";
          return (
            <button
              key={alternative.id}
              type="button"
              onClick={() => choose(alternative.id)}
              disabled={answered}
              aria-pressed={isChosen}
              className={`flex min-h-12 w-full items-start gap-3 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm leading-6 transition disabled:cursor-default ${state}`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-black ${answered && isCorrect ? "bg-emerald-500 text-white" : answered && isChosen ? "bg-rose-500 text-white" : "bg-blue-50 text-[#0B2D6B]"}`}>
                {question.type === "true-false" ? (alternative.id.toLowerCase().startsWith("v") ? "V" : "F") : alternative.id.toUpperCase()}
              </span>
              <span className="flex-1 pt-0.5 text-slate-800">{alternative.text}</span>
              {answered && isCorrect && <Icon name="correta" size={20} className="mt-0.5 text-emerald-600" label="Resposta correta" />}
              {answered && isChosen && !isCorrect && <Icon name="incorreta" size={20} className="mt-0.5 text-rose-500" label="Sua resposta" />}
            </button>
          );
        })}
      </div>

      {!answered && <p className="mt-3 text-center text-xs font-semibold text-slate-500">Toque em uma alternativa para ver a correção.</p>}

      {answered && (
        <div ref={feedbackRef}>
          <div className={`mt-4 rounded-2xl p-4 ${gotItRight ? "bg-emerald-50" : "bg-blue-50"}`} role="status">
            <p className={`flex items-center gap-2 font-black ${gotItRight ? "text-emerald-800" : "text-[#0B2D6B]"}`}>
              <Icon name={gotItRight ? "celebrar" : "reforco"} size={18} />
              {gotItRight ? "Resposta certa!" : `Resposta certa: ${correctAlternative ? `${correctAlternative.id.toUpperCase()}) ${correctAlternative.text}` : question.correctAnswer}`}
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{question.explanation}</p>
          </div>
          <a
            href={continueHref}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B2D6B] px-6 py-3 font-black text-white shadow-lg shadow-blue-950/15 hover:bg-blue-900"
          >
            Próxima questão (2 de {total}) <Icon name="avancar" size={18} />
          </a>
        </div>
      )}
    </section>
  );
}
