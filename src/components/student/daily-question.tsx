"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import type { GuestQuestion } from "@/lib/content/guest-quiz";
import { readDailyQuestionResult, saveDailyQuestionResult } from "@/lib/daily-goal";

const difficultyLabel = { iniciante: "Iniciante", medio: "Médio", avancado: "Avançado" } as const;

export function DailyQuestion({
  question,
  dateKey,
  focus,
  authenticated,
}: {
  question: GuestQuestion;
  dateKey: string;
  focus: "vestibular" | "concursos";
  authenticated: boolean;
}) {
  // Resposta já dada hoje (neste aparelho) volta mostrada.
  const saved = useSyncExternalStore(
    () => () => {},
    () => {
      const result = readDailyQuestionResult(dateKey);
      return result?.questionId === question.id ? result.choice : null;
    },
    () => null,
  );
  const [picked, setPicked] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const chosen = picked ?? saved;
  const answered = chosen !== null;
  const gotItRight = chosen === question.correctAnswer;
  const correctAlternative = question.alternatives.find((alternative) => alternative.id === question.correctAnswer);

  function choose(id: string) {
    if (answered) return;
    setPicked(id);
    const correct = id === question.correctAnswer;
    saveDailyQuestionResult({ dateKey, questionId: question.id, choice: id, correct });
    void trackEvent("daily_question_answered", { correct, focus, authenticated, subject: question.subject });
  }

  async function share() {
    const url = `${window.location.origin}/questao-do-dia?foco=${focus}`;
    const text = "Consegue acertar a questão do dia do NabuLab?";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Questão do dia", text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
      }
      void trackEvent("daily_question_shared", { focus });
    } catch {
      /* compartilhamento cancelado */
    }
  }

  return (
    <section aria-label="Questão do dia" className="mt-6">
      <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">
          {question.subjectName} · {question.topic} · {difficultyLabel[question.difficulty]}{question.type === "true-false" ? " · Verdadeiro ou falso" : ""}
        </p>
        <h2 className="mt-3 whitespace-pre-line text-base font-semibold leading-7 text-slate-900 sm:text-lg">{question.statement}</h2>

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
            {question.topicHref && (
              <Link href={question.topicHref} className="mt-3 inline-block text-sm font-bold text-[#3B82F6] hover:underline">Mais questões de {question.topic}</Link>
            )}
          </div>
        )}
      </article>

      {answered && (
        <div className="mt-5 rounded-[24px] border border-blue-100 bg-white p-6">
          {authenticated ? (
            <>
              <h3 className="text-lg font-black text-[#0B2D6B]">Questão do dia feita</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Ela conta na sua meta do dia e não usa a cota de questões grátis.</p>
              <Link href="/dashboard" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B2D6B] px-6 py-3 font-black text-white hover:bg-blue-900">
                Continuar a meta do dia <Icon name="avancar" size={18} />
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-lg font-black text-[#0B2D6B]">Quer uma rotina de 5 minutos por dia?</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Com a conta grátis, seus erros voltam para revisão no dia certo e você acompanha sua sequência de estudos.</p>
              <Link
                href={`/cadastro?next=${encodeURIComponent("/dashboard")}`}
                onClick={() => void trackEvent("signup_cta_clicked", { placement: "daily_question", focus })}
                className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-[#F4C430] px-6 py-3 font-black text-[#0B2D6B] hover:bg-amber-300"
              >
                Criar conta grátis
              </Link>
            </>
          )}
          <button type="button" onClick={share} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#0B2D6B] hover:bg-slate-50">
            <Icon name="turmas" size={16} /> {copied ? "Link copiado" : "Desafiar um amigo"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Nova questão amanhã.</p>
        </div>
      )}
    </section>
  );
}
