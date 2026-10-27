import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { DailyQuestion } from "@/components/student/daily-question";
import { dailyFocusFor, getDailyQuestion, type DailyQuestionFocus } from "@/lib/content/daily-question";
import { createPublicMetadata } from "@/lib/seo";
import { isStudyFocus } from "@/lib/study-focus";
import { dateKeyInTimeZone } from "@/lib/streak";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPublicMetadata({
  title: "Questão do dia: vestibular e concursos",
  description: "Uma questão nova por dia, com correção comentada na hora. Responda grátis, sem cadastro, e volte amanhã para a próxima.",
  path: "/questao-do-dia",
});

export default async function DailyQuestionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const authenticated = Boolean(data.user);
  const accountFocus = data.user?.user_metadata?.study_focus;

  const dateKey = dateKeyInTimeZone(new Date());
  const requested = params.foco === "concursos" || params.foco === "vestibular" ? (params.foco as DailyQuestionFocus) : null;
  const focus = requested ?? dailyFocusFor(isStudyFocus(accountFocus) ? accountFocus : null, dateKey);
  const question = getDailyQuestion(focus, dateKey);
  const other: DailyQuestionFocus = focus === "concursos" ? "vestibular" : "concursos";
  const dateLabel = new Date(`${dateKey}T12:00:00-03:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Sao_Paulo" });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB] text-slate-950">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="NabuLab — página inicial"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={166} height={43} className="h-8 w-auto sm:h-9" priority /></Link>
          {authenticated
            ? <Link href="/dashboard" className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B2D6B]">Ir ao painel</Link>
            : <Link href={`/login?next=${encodeURIComponent("/dashboard")}`} className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B2D6B]">Já tenho conta</Link>}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Questão do dia</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-black tracking-tight text-[#0B2D6B] first-letter:uppercase sm:text-4xl">{dateLabel}</h1>
          <nav aria-label="Escolher a área" className="flex rounded-xl border border-slate-200 bg-white p-1 text-sm font-bold">
            {(["vestibular", "concursos"] as const).map((item) => (
              <Link
                key={item}
                href={`/questao-do-dia?foco=${item}`}
                aria-current={item === focus ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 ${item === focus ? "bg-[#0B2D6B] text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {item === "vestibular" ? "Vestibular" : "Concursos"}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Uma questão nova por dia, igual para todo mundo. Responda, veja a explicação e volte amanhã.</p>

        {question ? (
          <DailyQuestion key={`${dateKey}-${focus}`} question={question} dateKey={dateKey} focus={focus} authenticated={authenticated} />
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
            A questão de hoje não está disponível. <Link href={`/questao-do-dia?foco=${other}`} className="font-bold text-[#3B82F6]">Ver a de {other}</Link>.
          </p>
        )}
      </div>
    </main>
  );
}
