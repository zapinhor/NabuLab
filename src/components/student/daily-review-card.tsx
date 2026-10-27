"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import { generateExamFromQuestionIds } from "@/lib/exam-generation-client";
import { clearCurrentExam, createInitialExamProgress, saveExamProgress, saveExamSession } from "@/lib/exam-session";
import type { ReviewSummary } from "@/lib/review-queries";

/** Quantas questões o treino do dia tem (no Free, é o máximo liberado). */
const DAILY_REVIEW_SIZE = 5;

function formatDueKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

const priorityLabel = { alta: "Prioridade alta", media: "Prioridade média", baixa: "Prioridade baixa" } as const;

/**
 * "O que revisar hoje": os erros mais importantes do aluno, com um treino
 * curto em um toque. No Free conta na cota de questões do dia; no Premium
 * leva também ao treino de erros completo.
 */
export function DailyReviewCard({
  review,
  premium,
  remainingToday,
}: {
  review: ReviewSummary;
  premium: boolean;
  /** Questões grátis que ainda restam hoje (null = sem limite). */
  remainingToday: number | null;
}) {
  const router = useRouter();
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No Free, o banco só libera níveis iniciante e médio.
  const allowed = review.questions.filter((item) => premium || item.question.difficulty !== "avancado");
  // Revisão espaçada: primeiro o que venceu hoje; sem vencidas, dá para adiantar.
  const due = allowed.filter((item) => item.dueToday);
  const ahead = due.length === 0;
  const candidates = ahead ? allowed.filter((item) => item.dueKey !== null) : due;
  const picks = candidates.slice(0, DAILY_REVIEW_SIZE);
  const amount = Math.min(picks.length, remainingToday ?? DAILY_REVIEW_SIZE);
  const blockedToday = !premium && remainingToday === 0;
  if (!candidates.length) return null;

  async function start() {
    if (starting || amount < 1) return;
    setStarting(true);
    setError(null);
    void trackEvent("daily_review_started", { plan: premium ? "premium" : "free", questions: amount, due: due.length, ahead });
    try {
      const session = await generateExamFromQuestionIds(picks.slice(0, amount).map((item) => item.questionId), true, "review");
      clearCurrentExam();
      saveExamSession({ ...session, mode: "review" });
      saveExamProgress(createInitialExamProgress(session.id));
      router.push("/simulado/prova");
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Não foi possível começar o treino agora.");
      setStarting(false);
    }
  }

  return (
    <section aria-labelledby="revisar-hoje" className="mt-5 overflow-hidden rounded-2xl border border-[#F4C430]/60 bg-white shadow-sm sm:mt-7">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-bold text-[#8A6A00]">
            <Icon name="treinar-erros" size={16} /> O que revisar hoje
          </p>
          <h2 id="revisar-hoje" className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
            {ahead
              ? "Nenhuma revisão vence hoje"
              : `${due.length} ${due.length === 1 ? "revisão vence hoje" : "revisões vencem hoje"}`}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {ahead
              ? `Seus erros voltam em 1, 3, 7 e 14 dias.${review.nextDueKey ? ` A próxima vence em ${formatDueKey(review.nextDueKey)}.` : ""} Se quiser, adiante agora.`
              : "Cada erro volta depois de 1, 3, 7 e 14 dias. Acertando, ele espaça; errando, volta para amanhã."}
          </p>
          <ul className="mt-3 grid gap-2">
            {picks.slice(0, 3).map((item) => (
              <li key={item.questionId} className="flex min-w-0 items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.priority === "alta" ? "bg-rose-500" : item.priority === "media" ? "bg-amber-500" : "bg-slate-400"}`} aria-label={priorityLabel[item.priority]} />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-[#3B82F6]">{item.subjectName} · {item.topic}</span>
                  <span className="block truncate text-slate-700">{item.question.statement}</span>
                </span>
              </li>
            ))}
          </ul>
          {picks.length > 3 && <p className="mt-2 text-xs text-slate-500">e mais {picks.length - 3}.</p>}
        </div>

        <div className="rounded-2xl bg-[#FFF9E6] p-4 text-center">
          {blockedToday ? (
            <>
              <p className="text-sm font-bold text-[#0B2D6B]">Suas questões grátis de hoje acabaram.</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Volte amanhã para treinar, ou treine sem limite no Premium.</p>
              <Link href="/premium" className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#0B2D6B] px-4 py-3 text-sm font-black text-white hover:bg-[#174EA6]">Conhecer o Premium</Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={start}
                disabled={starting}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B2D6B] px-4 py-3 text-sm font-black text-white transition hover:bg-[#174EA6] disabled:cursor-wait disabled:opacity-80"
              >
                <Icon name={starting ? "carregando" : "treinar-erros"} size={18} className={starting ? "animate-spin" : undefined} />
                {starting ? "Preparando…" : ahead ? `Adiantar ${amount} ${amount === 1 ? "revisão" : "revisões"}` : `Revisar ${amount} ${amount === 1 ? "erro" : "erros"}`}
              </button>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                {premium
                  ? "Leva uns 5 minutos."
                  : `Conta na sua cota de hoje (${remainingToday ?? 0} restantes).`}
              </p>
              {premium ? (
                <Link href="/revisao" className="mt-2 inline-block text-xs font-bold text-[#3B82F6] hover:underline">Ver todos os {review.totalQuestionsWithErrors} erros</Link>
              ) : review.totalQuestionsWithErrors > amount ? (
                <Link href="/premium" className="mt-2 inline-block text-xs font-bold text-[#3B82F6] hover:underline">
                  Você tem {review.totalQuestionsWithErrors} erros. Treine todos no Premium
                </Link>
              ) : null}
            </>
          )}
          {error && <p role="alert" className="mt-2 text-xs font-semibold text-rose-700">{error}</p>}
        </div>
      </div>
    </section>
  );
}
