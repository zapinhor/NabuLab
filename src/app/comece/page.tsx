import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { TrackPageView } from "@/components/analytics/track-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { campaignQuery } from "@/lib/analytics/acquisition";
import { createPublicMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = createPublicMetadata({
  title: "Comece grátis e descubra o que revisar",
  description: "Faça 10 questões grátis, revise seus erros e acompanhe sua evolução no NabuLab. Sem cartão de crédito.",
  path: "/comece",
});

const benefits = [
  ["Pratique", "Monte simulados com as matérias que quer estudar."],
  ["Revise", "Entenda seus erros com correções comentadas."],
  ["Evolua", "Acompanhe seu desempenho a cada tentativa."],
] as const;

function BenefitIcon({ index }: { index: number }) {
  const paths = [
    <path key="practice" d="M7 3.5h10a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Zm2 4h6M9 11h6M9 14.5h3" />,
    <path key="review" d="m4.5 13 3.2 3.2L19.5 4.5M5 6.5h7M5 10h5" />,
    <path key="evolve" d="M4 18V9m6 9V5m6 13v-7m4 7H2" />,
  ];
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 stroke-current stroke-2" fill="none" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>;
}

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = await searchParams;
  const params = new URLSearchParams();
  for (const [key, item] of Object.entries(values)) {
    if (typeof item === "string") params.set(key, item);
  }
  const campaign = campaignQuery(params);
  const dashboardPath = campaign ? `/dashboard?${campaign}` : "/dashboard";
  const signupHref = campaign
    ? `/cadastro?next=${encodeURIComponent(dashboardPath)}&${campaign}`
    : "/cadastro?next=%2Fdashboard";
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const primaryHref = data.user ? dashboardPath : signupHref;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB] text-slate-950">
      <TrackPageView event="landing_view" />
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" aria-label="NabuLab — página inicial"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={166} height={43} className="h-9 w-auto" priority /></Link>
          <Link href={data.user ? "/dashboard" : `/login?next=${encodeURIComponent(dashboardPath)}`} className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B2D6B]">{data.user ? "Ir ao painel" : "Já tenho conta"}</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.035em] text-[#0B2D6B] sm:text-5xl lg:text-6xl">Teste seus conhecimentos. Descubra seus erros. Evolua.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Faça questões e simulados, revise seus erros e acompanhe sua evolução no NabuLab.</p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <TrackedLink event="signup_cta_clicked" properties={{ placement: "campaign_hero" }} href={primaryHref} className="min-h-12 rounded-xl bg-[#F4C430] px-6 py-3.5 text-center font-black text-[#0B2D6B] shadow-lg shadow-amber-950/10 transition hover:bg-amber-300">{data.user ? "Continuar estudando" : "Começar grátis"}</TrackedLink>
            <p className="text-center text-sm font-semibold text-slate-500 sm:text-left">10 questões grátis. Sem cartão.</p>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#0B2D6B] p-4 shadow-2xl shadow-blue-950/15 sm:p-6" aria-label="Prévia do painel NabuLab">
          <div className="rounded-2xl bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold text-blue-700">Seu primeiro passo</p><h2 className="mt-1 text-xl font-black text-slate-950">Simulado personalizado</h2></div><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">10 grátis</span></div>
            <div className="mt-5 grid grid-cols-3 gap-2"><div className="rounded-xl bg-blue-50 p-3"><b className="text-lg text-[#0B2D6B]">17</b><p className="text-[11px] text-slate-500">matérias</p></div><div className="rounded-xl bg-amber-50 p-3"><b className="text-lg text-amber-800">5–10</b><p className="text-[11px] text-slate-500">questões</p></div><div className="rounded-xl bg-emerald-50 p-3"><b className="text-lg text-emerald-700">100%</b><p className="text-[11px] text-slate-500">comentado</p></div></div>
            <div className="mt-4 rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between text-sm font-bold"><span>Seu progresso</span><span className="text-blue-700">3 de 10</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[30%] rounded-full bg-[#3B82F6]" /></div><p className="mt-3 text-xs leading-5 text-slate-500">Cada resposta ajuda a mostrar o que revisar depois.</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3">
          {benefits.map(([title, description], index) => <article key={title} className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#0B2D6B]"><BenefitIcon index={index} /></span><div><h2 className="font-black text-slate-950">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div></article>)}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-[#0B2D6B] px-6 py-9 text-center text-white sm:px-10 sm:py-11">
          <h2 className="text-3xl font-black tracking-[-0.025em]">10 questões grátis para começar</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-blue-100">Crie sua conta em poucos segundos e comece a praticar. Não pedimos cartão de crédito.</p>
          <TrackedLink event="signup_cta_clicked" properties={{ placement: "campaign_final" }} href={primaryHref} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F4C430] px-6 py-3.5 font-black text-[#0B2D6B] hover:bg-amber-300">{data.user ? "Ir para o NabuLab" : "Criar conta grátis"}</TrackedLink>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500"><span>© {new Date().getFullYear()} NabuLab</span><span className="mx-2">·</span><Link href="/privacidade" className="underline underline-offset-4">Privacidade</Link><span className="mx-2">·</span><Link href="/termos" className="underline underline-offset-4">Termos</Link></footer>
    </main>
  );
}
