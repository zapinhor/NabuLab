"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import type { GuestQuestion, GuestTrackId } from "@/lib/content/guest-quiz";

/** Chave do resultado no navegador; a tela de cadastro lê para dar continuidade. */
export const GUEST_RESULT_KEY = "nabulab_guest_quiz";

export type GuestQuizResult = {
  track: GuestTrackId;
  correct: number;
  total: number;
  answers: Array<{ id: string; subject: string; subjectName: string; topic: string; correct: boolean }>;
  finishedAt: string;
};

const difficultyLabel = { iniciante: "Iniciante", medio: "Médio", avancado: "Avançado" } as const;

export function GuestQuiz({
  track,
  trackLabel,
  questions,
  signupHref,
  retryHref,
  authenticated,
}: {
  track: GuestTrackId;
  trackLabel: string;
  questions: GuestQuestion[];
  signupHref: string;
  retryHref: string;
  authenticated: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void trackEvent("guest_quiz_started", { track });
  }, [track]);

  const question = questions[index];
  const chosen = question ? choices[question.id] : undefined;
  const answered = chosen !== undefined;
  const correctCount = questions.filter((item) => choices[item.id] === item.correctAnswer).length;

  function choose(alternativeId: string) {
    if (!question || answered) return;
    const correct = alternativeId === question.correctAnswer;
    setChoices((current) => ({ ...current, [question.id]: alternativeId }));
    void trackEvent("guest_question_answered", { track, position: index + 1, correct, subject: question.subject });
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      requestAnimationFrame(() => headingRef.current?.focus());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const result: GuestQuizResult = {
      track,
      correct: correctCount,
      total: questions.length,
      answers: questions.map((item) => ({
        id: item.id, subject: item.subject, subjectName: item.subjectName, topic: item.topic,
        correct: choices[item.id] === item.correctAnswer,
      })),
      finishedAt: new Date().toISOString(),
    };
    try { localStorage.setItem(GUEST_RESULT_KEY, JSON.stringify(result)); } catch { /* navegação privada */ }
    void trackEvent("guest_quiz_completed", { track, correct: correctCount, total: questions.length });
    setFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (finished) {
    const missed = questions.filter((item) => choices[item.id] !== item.correctAnswer);
    const headline = correctCount === questions.length
      ? "Mandou bem! Você acertou todas."
      : correctCount === 0
        ? "Agora você sabe por onde começar."
        : `Você acertou ${correctCount} de ${questions.length}.`;
    return (
      <section aria-labelledby="resultado" className="mx-auto max-w-2xl">
        <div className="rounded-[28px] bg-[#0B2D6B] p-6 text-white shadow-2xl shadow-blue-950/15 sm:p-8">
          <p className="text-sm font-bold text-blue-200">Resultado · {trackLabel}</p>
          <div className="mt-4 flex items-center gap-5">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white/10 ring-4 ring-[#F4C430]">
              <span className="text-2xl font-black">{correctCount}/{questions.length}</span>
            </div>
            <h1 id="resultado" className="text-2xl font-black leading-tight sm:text-3xl">{headline}</h1>
          </div>
          <ul className="mt-6 grid gap-2">
            {questions.map((item, position) => {
              const ok = choices[item.id] === item.correctAnswer;
              return (
                <li key={item.id} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                  <Icon name={ok ? "correta" : "incorreta"} size={18} className={ok ? "text-emerald-300" : "text-rose-300"} label={ok ? "Acertou" : "Errou"} />
                  <span className="min-w-0 flex-1"><b>Questão {position + 1}</b> · {item.subjectName} — {item.topic}</span>
                </li>
              );
            })}
          </ul>
          {missed.length > 0 && (
            <p className="mt-5 text-sm leading-6 text-blue-100">
              Para revisar: <b className="text-white">{[...new Set(missed.map((item) => item.topic))].join(", ")}</b>. No NabuLab seus erros ficam guardados para você treinar depois.
            </p>
          )}
        </div>

        <div className="mt-5 rounded-[24px] border border-blue-100 bg-white p-6 sm:p-7">
          {authenticated ? (
            <>
              <h2 className="text-xl font-black text-[#0B2D6B]">Continue de onde parou</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Monte um simulado com as matérias que quer treinar e acompanhe sua evolução no painel.</p>
              <Link href="/simulado/novo" className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F4C430] px-6 py-3.5 font-black text-[#0B2D6B] hover:bg-amber-300">
                <Icon name="novo-simulado" size={18} /> Fazer um simulado completo
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-black text-[#0B2D6B]">Gostou? Continue com 10 questões grátis por dia</h2>
              <ul className="mt-3 grid gap-1.5 text-sm text-slate-600">
                <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 text-emerald-600" />Simulados com as matérias que você escolher</li>
                <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 text-emerald-600" />Correção comentada de todas as questões</li>
                <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 text-emerald-600" />Histórico e evolução por matéria</li>
              </ul>
              <Link
                href={signupHref}
                onClick={() => void trackEvent("guest_signup_clicked", { track, correct: correctCount })}
                className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-[#F4C430] px-6 py-3.5 font-black text-[#0B2D6B] shadow-lg shadow-amber-950/10 hover:bg-amber-300"
              >
                Criar conta grátis
              </Link>
              <p className="mt-2 text-center text-xs font-semibold text-slate-500">Leva menos de 1 minuto. Sem cartão.</p>
            </>
          )}
          <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 text-sm font-bold sm:flex-row sm:justify-center sm:gap-6">
            <a href={retryHref} className="text-center text-[#3B82F6] hover:underline">Responder outras 3</a>
            <Link href="/experimente" className="text-center text-slate-500 hover:underline">Trocar de área</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!question) return null;
  const correctAlternative = question.alternatives.find((alternative) => alternative.id === question.correctAnswer);
  const gotItRight = chosen === question.correctAnswer;

  return (
    <section aria-labelledby="questao" className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3 text-sm font-bold">
        <span className="text-[#0B2D6B]">Questão {index + 1} de {questions.length}</span>
        <span className="text-slate-500">{trackLabel}</span>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {questions.map((item, position) => (
          <span key={item.id} className={`h-2 flex-1 rounded-full ${position < index || (position === index && answered) ? "bg-[#3B82F6]" : position === index ? "bg-blue-200" : "bg-slate-200"}`} />
        ))}
      </div>

      <article className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">
          {question.subjectName} · {difficultyLabel[question.difficulty]}{question.type === "true-false" ? " · Verdadeiro ou falso" : ""}
        </p>
        <h1 id="questao" ref={headingRef} tabIndex={-1} className="mt-3 whitespace-pre-line text-base font-semibold leading-7 text-slate-900 outline-none sm:text-lg">
          {question.statement}
        </h1>

        <div className="mt-5 grid gap-2.5" role="group" aria-label="Alternativas">
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
                className={`flex min-h-12 w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm leading-6 transition disabled:cursor-default ${state}`}
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

        {answered && (
          <div className={`mt-5 rounded-2xl p-4 sm:p-5 ${gotItRight ? "bg-emerald-50" : "bg-blue-50"}`} role="status">
            <p className={`flex items-center gap-2 font-black ${gotItRight ? "text-emerald-800" : "text-[#0B2D6B]"}`}>
              <Icon name={gotItRight ? "celebrar" : "reforco"} size={18} />
              {gotItRight ? "Resposta certa!" : `Resposta certa: ${correctAlternative ? `${correctAlternative.id.toUpperCase()}) ${correctAlternative.text}` : question.correctAnswer}`}
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{question.explanation}</p>
          </div>
        )}
      </article>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!answered}
          className="flex min-h-12 items-center gap-2 rounded-xl bg-[#0B2D6B] px-6 py-3 font-black text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {index < questions.length - 1 ? "Próxima questão" : "Ver meu resultado"}
          <Icon name="avancar" size={18} />
        </button>
      </div>
    </section>
  );
}
