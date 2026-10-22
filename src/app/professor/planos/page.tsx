import type { Metadata } from "next";
import Link from "next/link";
import { TrackPageView } from "@/components/analytics/track-event";
import { TeacherCheckoutButton } from "@/components/professor/teacher-checkout-button";
import { getTeacherHotmartOffers } from "@/lib/billing/teacher-config";
import { createClient } from "@/lib/supabase/server";
import { formatTeacherPrice, TEACHER_PLANS, teacherOfferKey, type TeacherBillingCycle, type TeacherPlan } from "@/lib/teacher-plans";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";

export const metadata: Metadata = { title: "Planos para professores | NabuLab", description: "Compare os planos Free, Essencial, Pro e Avançado do NabuLab Professor." };

const features: Record<TeacherPlan, string[]> = {
  free: ["1 turma ativa", "40 alunos por turma", "2 simulados por semana", "Indicadores básicos"],
  essential: ["3 turmas ativas", "50 alunos por turma", "10 simulados por semana", "Analytics completo e CSV"],
  pro: ["10 turmas ativas", "70 alunos por turma", "Simulados ilimitados", "Todos os recursos atuais"],
  advanced: ["30 turmas ativas", "100 alunos por turma", "Simulados ilimitados", "Capacidade ampliada"],
};

export default async function TeacherPlansPage({ searchParams }: { searchParams: Promise<{ ciclo?: string }> }) {
  const cycle: TeacherBillingCycle = (await searchParams).ciclo === "anual" ? "yearly" : "monthly";
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data: account } = auth.user ? await supabase.from("teacher_accounts").select("plan,billing_cycle,billing_status,current_period_end,cancel_at_period_end").eq("user_id", auth.user.id).maybeSingle() : { data: null };
  const offers = getTeacherHotmartOffers();
  if (auth.user) await recordAuthenticatedAnalyticsEvent("teacher_plans_viewed", auth.user.id, { sourceEventKey: `teacher:${auth.user.id}:plans-viewed` });
  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8"><div className="mx-auto max-w-7xl">
    <TrackPageView event="teacher_plan_viewed" />
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-bold text-blue-700">NabuLab Professor</p><h1 className="mt-2 text-4xl font-black text-[#0B2D6B]">Planos para cada fase do seu trabalho</h1><p className="mt-3 max-w-2xl text-slate-600">Comece gratuitamente e aumente a capacidade quando suas turmas crescerem.</p></div><Link href="/professor" className="font-bold text-blue-700">Voltar ao Professor</Link></div>
    {account ? <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5"><p className="font-black text-blue-950">Plano atual: {TEACHER_PLANS[account.plan as TeacherPlan].name}</p><p className="mt-1 text-sm text-blue-900">Status: {account.billing_status}{account.billing_cycle ? ` · ciclo ${account.billing_cycle === "yearly" ? "anual" : "mensal"}` : ""}{account.current_period_end ? ` · vigente até ${new Intl.DateTimeFormat("pt-BR").format(new Date(account.current_period_end))}` : ""}</p></section> : null}
    <aside aria-label="E-mail necessário no checkout" className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
      <h2 className="text-lg font-black">Use o mesmo e-mail do NabuLab na Hotmart</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">Ao preencher o checkout, informe exatamente o mesmo e-mail usado nesta conta NabuLab{auth.user?.email ? <>: <strong className="break-all">{auth.user.email}</strong></> : ""}. Se você usar outro e-mail, sua assinatura pode não ser vinculada automaticamente ao seu perfil.</p>
    </aside>
    <div className="mx-auto mt-8 flex w-fit rounded-xl border border-slate-300 bg-white p-1"><Link href="?ciclo=mensal" className={`rounded-lg px-5 py-2 font-bold ${cycle === "monthly" ? "bg-[#0B2D6B] text-white" : "text-slate-600"}`}>Mensal</Link><Link href="?ciclo=anual" className={`rounded-lg px-5 py-2 font-bold ${cycle === "yearly" ? "bg-[#0B2D6B] text-white" : "text-slate-600"}`}>Anual · cerca de 2 meses grátis</Link></div>
    <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{(Object.keys(TEACHER_PLANS) as TeacherPlan[]).map((plan) => {
      const item = TEACHER_PLANS[plan]; const price = plan === "free" ? 0 : cycle === "yearly" ? item.yearlyPrice : item.monthlyPrice;
      const key = plan === "free" ? null : teacherOfferKey(plan, cycle); const available = key ? offers[key].available : true;
      const current = account?.plan === plan;
      return <article key={plan} className={`relative rounded-2xl border bg-white p-6 ${item.recommended ? "border-2 border-[#F5B800] shadow-lg" : "border-slate-200"}`}>{item.recommended ? <span className="absolute -top-3 left-5 rounded-full bg-[#F5B800] px-3 py-1 text-xs font-black text-blue-950">Mais escolhido</span> : null}<h2 className="text-2xl font-black text-[#0B2D6B]">{item.name}</h2><p className="mt-4 text-3xl font-black">{price === null ? "—" : formatTeacherPrice(price)}</p><p className="text-sm text-slate-500">{plan === "free" ? "para começar" : cycle === "yearly" ? "por ano" : "por mês"}</p><ul className="my-6 space-y-3 text-sm">{features[plan].map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>{plan === "free" ? <Link href={auth.user ? "/professor" : "/cadastro?next=/professor"} className="block rounded-xl border border-blue-900 px-4 py-3 text-center font-bold text-blue-900">{current ? "Plano atual" : "Começar grátis"}</Link> : auth.user ? <TeacherCheckoutButton offer={key!} disabled={current || !available} label={current ? "Plano atual" : available ? `Assinar ${item.name}` : "Aguardando configuração Hotmart"}/> : <Link href={`/login?next=${encodeURIComponent(`/professor/planos?ciclo=${cycle === "yearly" ? "anual" : "mensal"}`)}`} className="block rounded-xl bg-[#0B2D6B] px-4 py-3 text-center font-bold text-white">Entrar para assinar</Link>}</article>;
    })}</section>
    <section className="mt-8 rounded-2xl bg-[#0B2D6B] p-6 text-white"><h2 className="text-xl font-black">Seus alunos não pagam nada</h2><p className="mt-2 text-blue-100">Entrar na turma, responder atividades e visualizar resultados não consome a franquia pessoal do plano Student.</p></section>
  </div></main>;
}
