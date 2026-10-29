"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import { buildDailyGoal, markDailyGoalCelebrated, readDailyQuestionResult } from "@/lib/daily-goal";
import { readLessonReadToday, suggestLesson } from "@/lib/lesson-links";
import { addDaysToKey, localDateKey } from "@/lib/streak";
import { createClient } from "@/lib/supabase/client";

/**
 * Meta do dia: questão do dia + revisões vencidas + algumas questões novas.
 * Mostra também a situação da sequência e oferece o lembrete diário por e-mail.
 */
export function DailyGoalCard({
  reviewsDue,
  questionsToday,
  currentStreak,
  streakAtRisk,
  freezesInCurrent,
  freezeAvailableThisWeek,
  reviewTopics = [],
}: {
  reviewsDue: number;
  questionsToday: number;
  currentStreak: number;
  streakAtRisk: boolean;
  freezesInCurrent: string[];
  freezeAvailableThisWeek: boolean;
  /** Assuntos errados, do mais prioritário para o menos. */
  reviewTopics?: { subject: string; topic: string }[];
}) {
  const todayKey = localDateKey();
  const dailyQuestionDone = useSyncExternalStore(
    () => () => {},
    () => readDailyQuestionResult(todayKey) !== null,
    () => false,
  );
  const lessonReadHref = useSyncExternalStore(
    () => () => {},
    () => readLessonReadToday(todayKey),
    () => null,
  );
  const suggestion = suggestLesson(reviewTopics);
  const lesson = suggestion?.fromErrors ? { href: suggestion.link.href, topic: suggestion.link.topic, readingMinutes: suggestion.link.readingMinutes } : null;
  const goal = buildDailyGoal({ dailyQuestionDone, reviewsDue, questionsToday, lesson, lessonReadToday: lessonReadHref !== null });
  const usedFreezeYesterday = freezesInCurrent.includes(addDaysToKey(todayKey, -1));

  useEffect(() => {
    if (goal.done && markDailyGoalCelebrated(todayKey)) {
      void trackEvent("daily_goal_completed", { streak: currentStreak });
    }
  }, [goal.done, todayKey, currentStreak]);

  const streakMessage = !streakAtRisk && currentStreak > 0
    ? "Sequência garantida hoje."
    : usedFreezeYesterday
      ? "Ontem foi sua folga da semana. Estude hoje para continuar."
      : streakAtRisk
        ? `Estude hoje para manter ${currentStreak === 1 ? "seu 1 dia" : `seus ${currentStreak} dias`}.`
        : "Comece hoje uma nova sequência.";

  return (
    <section aria-labelledby="meta-do-dia" className="mt-5 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm sm:mt-7">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="meta-do-dia" className="flex items-center gap-2 text-lg font-black text-[#0B2D6B] sm:text-xl">
              <Icon name="metas" size={20} className="text-[#3B82F6]" /> Meta do dia
            </h2>
            <span className="text-sm font-bold text-slate-500">{goal.done ? "Concluída!" : `${goal.completed} de ${goal.total} · uns ${goal.minutes} minutos`}</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuemin={0} aria-valuemax={goal.total} aria-valuenow={goal.completed} aria-label="Progresso da meta do dia">
            <div className={`h-full rounded-full transition-all ${goal.done ? "bg-emerald-500" : "bg-[#3B82F6]"}`} style={{ width: `${(goal.completed / goal.total) * 100}%` }} />
          </div>
          <ol className="mt-4 grid gap-2">
            {goal.steps.map((step) => (
              <li key={step.id}>
                <Link
                  href={step.href}
                  onClick={step.id === "lesson" ? () => void trackEvent("lesson_review_clicked", { placement: "daily_goal", topic: step.label }) : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2.5 transition ${step.done ? "border-emerald-100 bg-emerald-50/60" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${step.done ? "bg-emerald-500 text-white" : "border-2 border-slate-300 text-transparent"}`} aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-bold ${step.done ? "text-emerald-900" : "text-slate-900"}`}>{step.label}</span>
                    <span className="block text-xs text-slate-500">{step.detail}</span>
                  </span>
                  <span className="sr-only">{step.done ? "Feito" : "A fazer"}</span>
                  {!step.done && <Icon name="avancar" size={18} className="shrink-0 text-slate-400" />}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#0B2D6B] p-5 text-white">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-blue-200"><Icon name="sequencia" size={16} /> Sequência</p>
            <p className="mt-1 text-3xl font-black">{currentStreak} {currentStreak === 1 ? "dia" : "dias"}</p>
            <p className="mt-2 text-sm leading-6 text-blue-100">{streakMessage}</p>
            <p className="mt-2 text-xs leading-5 text-blue-200">
              {freezeAvailableThisWeek
                ? "Você tem 1 dia de folga nesta semana: se faltar um dia, a sequência não zera."
                : "A folga desta semana já foi usada."}
            </p>
          </div>
          <StudyReminderToggle />
        </div>
      </div>
    </section>
  );
}

function StudyReminderToggle() {
  const [state, setState] = useState<"loading" | "off" | "on" | "saving" | "error">("loading");

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data } = await supabase.from("notification_preferences").select("email_study_reminders").eq("user_id", auth.user.id).maybeSingle();
      if (active) setState(data?.email_study_reminders ? "on" : "off");
    })().catch(() => active && setState("off"));
    return () => {
      active = false;
    };
  }, []);

  async function enable() {
    setState("saving");
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return setState("error");
    const { error } = await supabase
      .from("notification_preferences")
      .upsert({ user_id: auth.user.id, email_study_reminders: true, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    if (error) return setState("error");
    setState("on");
    void trackEvent("study_reminder_enabled", { placement: "daily_goal" });
  }

  if (state === "loading") return null;
  if (state === "on") {
    return (
      <p className="rounded-xl bg-white/10 px-3 py-2.5 text-xs leading-5 text-blue-100">
        <Icon name="notificacoes" size={14} className="mr-1 inline-block align-[-0.2em]" />
        Lembrete às 19h ativado. <Link href="/notificacoes" className="font-bold text-white underline-offset-2 hover:underline">Ajustar</Link>
      </p>
    );
  }
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <p className="text-xs leading-5 text-blue-100">Quer um e-mail às 19h nos dias em que ainda não estudou?</p>
      <button
        type="button"
        onClick={enable}
        disabled={state === "saving"}
        className="mt-2 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#F4C430] px-3 py-2 text-sm font-black text-[#0B2D6B] hover:bg-amber-300 disabled:opacity-70"
      >
        <Icon name="notificacoes" size={16} /> {state === "saving" ? "Ativando…" : "Ativar lembrete"}
      </button>
      {state === "error" && <p role="alert" className="mt-1 text-xs text-amber-200">Não foi possível ativar agora.</p>}
    </div>
  );
}
