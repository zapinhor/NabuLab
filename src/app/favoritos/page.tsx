"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { FavoriteButton } from "@/components/student/favorite-button";
import { Icon } from "@/components/ui/icon";
import NabuLabBrand from "@/components/ui/nabulab-brand";
import { EmptyState, LoadingState } from "@/components/ui/page-state";
import { db } from "@/lib/db";
import { getStudentEntitlements } from "@/lib/entitlements";
import { generateExamFromQuestionIds } from "@/lib/exam-generation-client";
import { clearCurrentExam, createInitialExamProgress, saveExamProgress, saveExamSession } from "@/lib/exam-session";
import { useFavorites } from "@/lib/favorites";
import { questionFromSnapshot } from "@/lib/question-snapshot";
import { useStudentAccount } from "@/lib/use-student-account";
import type { Question } from "@/types/question";
import type { StoredAnswer } from "@/types/storage";

type FavoriteItem = { question: Question; attempts: number; correct: number; lastCorrect: boolean };

/** Tamanho máximo de um treino de favoritas. */
const TRAIN_LIMIT = 20;

export default function FavoritesPage() {
  const router = useRouter();
  const { ids, loaded } = useFavorites();
  const { account, loading: accountLoading } = useStudentAccount();
  const premium = getStudentEntitlements(account?.subscription ?? null).trainErrors;
  const [answers, setAnswers] = useState<StoredAnswer[] | null>(null);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    db.answers.toArray().then((rows) => { if (active) setAnswers(rows); }).catch(() => { if (active) setAnswers([]); });
    return () => { active = false; };
  }, []);

  // Cada favorita usa a cópia da questão salva na resposta mais recente.
  const items = useMemo<FavoriteItem[]>(() => {
    if (!answers) return [];
    const byQuestion = new Map<string, StoredAnswer[]>();
    for (const answer of answers) {
      if (!ids.has(answer.questionId)) continue;
      byQuestion.set(answer.questionId, [...(byQuestion.get(answer.questionId) ?? []), answer]);
    }
    return [...byQuestion.entries()].flatMap(([questionId, rows]) => {
      const ordered = [...rows].reverse();
      const question = ordered.map((row) => questionFromSnapshot(questionId, row.questionSnapshot)).find(Boolean);
      if (!question) return [];
      return [{ question, attempts: rows.length, correct: rows.filter((row) => row.isCorrect).length, lastCorrect: ordered[0]?.isCorrect ?? false }];
    });
  }, [answers, ids]);

  async function train() {
    if (!items.length || starting) return;
    setStarting(true);
    setError(null);
    try {
      const session = await generateExamFromQuestionIds(items.slice(0, TRAIN_LIMIT).map((item) => item.question.id), true, "review");
      clearCurrentExam();
      saveExamSession({ ...session, mode: "review" });
      saveExamProgress(createInitialExamProgress(session.id));
      router.push("/simulado/prova");
    } catch (trainError) {
      setError(trainError instanceof Error ? trainError.message : "Não foi possível começar o treino.");
      setStarting(false);
    }
  }

  const ready = loaded && answers !== null && !accountLoading;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <NabuLabBrand subtitle="Favoritas" />
          <Link href="/dashboard" className="shrink-0 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <Icon name="voltar" size={16} className="mr-1.5 inline-block align-[-0.2em]" />Painel
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="flex flex-col gap-4 rounded-[24px] bg-[#0B2D6B] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#F4C430]">Suas questões guardadas</p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">Favoritas</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">Toque na estrela de qualquer questão no resultado ou no histórico para guardá-la aqui e rever quando quiser.</p>
          </div>
          {ready && items.length > 0 && (
            <div className="shrink-0 sm:text-right">
              {premium ? (
                <button type="button" onClick={train} disabled={starting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F4C430] px-5 py-3 text-sm font-black text-[#0B2D6B] hover:bg-amber-300 disabled:opacity-80 sm:w-auto">
                  <Icon name={starting ? "carregando" : "novo-simulado"} size={18} className={starting ? "animate-spin" : undefined} />
                  {starting ? "Preparando…" : `Treinar ${Math.min(items.length, TRAIN_LIMIT)} favoritas`}
                </button>
              ) : (
                <TrackedLink event="premium_cta_clicked" properties={{ placement: "favorites_train" }} href="/premium" className="flex min-h-12 items-center justify-center rounded-xl bg-[#F4C430] px-5 py-3 text-sm font-black text-[#0B2D6B] hover:bg-amber-300">
                  Treinar favoritas no Premium
                </TrackedLink>
              )}
              {error && <p role="alert" className="mt-2 text-xs font-semibold text-amber-200">{error}</p>}
            </div>
          )}
        </section>

        <div className="mt-6">
          {!ready ? (
            <LoadingState title="Carregando suas favoritas" description="Buscando as questões que você guardou." />
          ) : items.length === 0 ? (
            <EmptyState
              title="Nenhuma favorita ainda"
              description="Depois de um simulado, toque na estrela das questões que quer rever. Elas aparecem aqui."
              actionLabel="Abrir meu histórico"
              actionHref="/historico"
            />
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {items.map(({ question, attempts, correct, lastCorrect }) => (
                <li key={question.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 text-xs font-bold text-[#3B82F6]">{question.subjectName} · {question.topic}</p>
                    <FavoriteButton questionId={question.id} compact />
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-900">{question.statement}</p>
                  <p className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className={`rounded-full px-2.5 py-1 ${lastCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                      {lastCorrect ? "Acertou na última vez" : "Errou na última vez"}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{correct} de {attempts} {attempts === 1 ? "tentativa" : "tentativas"}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
