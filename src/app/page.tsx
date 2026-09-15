import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TrackPageView } from "@/components/analytics/track-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getHotmartConfig } from "@/lib/billing/config";
import { hasActivePremium, subscriptionFromRow } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const free = ["17 matérias", "2 simulados por dia", "Até 15 questões", "Níveis iniciante e médio", "Múltipla escolha e V/F", "Correções e explicações", "3 históricos recentes", "Recomendado limitado", "Resumo de desempenho", "Cloud Sync"];
const premium = ["1.224 questões em 17 matérias", "Simulados ilimitados", "5, 10, 15, 20, 30 ou 50 questões", "Níveis iniciante, médio e avançado", "Histórico completo", "Treinar meus erros", "Recomendado completo", "Evolução, Análise e Domínio", "Metas de estudo", "Cloud Sync"];
const features = [
  ["Simulados do seu jeito", "Escolha matérias, dificuldade, tipo e quantidade de questões para praticar com intenção."],
  ["Correção que ensina", "Entenda a resposta correta e o raciocínio por trás das alternativas após cada tentativa."],
  ["Erros viram revisão", "Reencontre questões erradas e transforme pontos frágeis em um plano de estudo prático."],
  ["Evolução visível", "Acompanhe histórico, precisão, domínio por conteúdo, metas e recomendações de estudo."],
] as const;

function Check({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-3 text-sm leading-6 text-slate-700"><span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-800">✓</span><span>{children}</span></li>;
}

export default async function LandingPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const authenticated = Boolean(data.user);
  const { data: subscriptionRow } = data.user
    ? await supabase
        .from("subscriptions")
        .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
        .eq("user_id", data.user.id)
        .maybeSingle()
    : { data: null };
  const premiumActive = hasActivePremium(subscriptionFromRow(subscriptionRow));
  const config = getHotmartConfig();
  const founderAvailable = config.plans.founder_477.available;
  const featuredPlan = config.currentOffer;
  const primaryHref = authenticated ? "/dashboard" : "/cadastro?next=/dashboard";
  const premiumHref = authenticated ? "/premium" : "/cadastro?next=/premium";

  return (
    <main className="overflow-x-clip bg-[#F5F7FB] text-slate-950">
      <TrackPageView event="landing_view" />
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <nav aria-label="Navegação principal" className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="NabuLab — início"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={172} height={44} className="h-9 w-auto" priority /></Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#como-funciona">Como funciona</a><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#faq">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            {!authenticated && <Link href="/login?next=/dashboard" className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#0B2D6B] sm:block">Entrar</Link>}
            <TrackedLink event="signup_cta_clicked" properties={{ placement: "header" }} href={primaryHref} className="rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-900">{authenticated ? "Ir para o NabuLab" : "Começar grátis"}</TrackedLink>
          </div>
        </nav>
      </header>

      <section className="relative border-b border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-black uppercase tracking-[.16em] text-blue-800">17 matérias · 1.224 questões</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-[-.045em] text-[#0B2D6B] sm:text-5xl lg:text-6xl">Prepare-se praticando, não apenas relendo.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Simulados, correção comentada e acompanhamento do seu desempenho em um só lugar.</p>
            <p className="mt-4 border-l-4 border-[#F4C430] pl-4 font-bold text-slate-800">Cada tentativa é um passo. Cada correção, uma evolução.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink event="signup_cta_clicked" properties={{ placement: "hero" }} href={primaryHref} className="rounded-xl bg-[#0B2D6B] px-6 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-900">{authenticated ? "Ir para o NabuLab" : "Começar grátis"}</TrackedLink>
              <TrackedLink event="premium_cta_clicked" properties={{ placement: "hero" }} href={premiumHref} className="rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-center font-bold text-[#0B2D6B] transition hover:border-blue-400 hover:bg-blue-50">Conhecer o Premium</TrackedLink>
            </div>
            <p className="mt-4 text-sm text-slate-500">Crie sua conta sem custo. Não é necessário instalar nada.</p>
          </div>
          <div aria-label="Demonstração do painel NabuLab" className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-[#071A3D] p-3 shadow-2xl shadow-blue-950/20">
            <div className="rounded-[1.4rem] bg-[#F5F7FB] p-4 sm:p-6">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Seu progresso</p><p className="mt-1 text-lg font-black text-slate-950">Prática com direção</p></div><Image src="/branding/icone-app.png" alt="" width={42} height={42} className="rounded-xl" /></div>
              <div className="mt-5 grid grid-cols-3 gap-2"><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">17</b><p className="text-xs text-slate-500">matérias</p></div><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">1.224</b><p className="text-xs text-slate-500">questões</p></div><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">Cloud</b><p className="text-xs text-slate-500">sincronizado</p></div></div>
              <div className="mt-3 rounded-2xl bg-white p-4"><div className="flex justify-between text-sm font-bold"><span>Revisão recomendada</span><span className="text-blue-700">Próximo passo</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-[#3B82F6]" /></div><div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-slate-100 p-3 text-sm"><b>Treinar erros</b><p className="mt-1 text-xs text-slate-500">Reforce pontos que precisam de atenção.</p></div><div className="rounded-xl border border-slate-100 p-3 text-sm"><b>Ver domínio</b><p className="mt-1 text-xs text-slate-500">Acompanhe cada tópico estudado.</p></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Como funciona</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Um ciclo de estudo que transforma tentativa em evolução.</h2><div className="mt-9 grid gap-4 md:grid-cols-3">{[["01", "Monte seu simulado", "Escolha o conteúdo e pratique no seu ritmo."], ["02", "Entenda a correção", "Confira explicações e reconheça seus erros."], ["03", "Ajuste o próximo passo", "Use histórico, recomendações e desempenho para continuar."]].map(([n,t,d]) => <article key={n} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-black text-blue-700">{n}</span><h3 className="mt-4 text-xl font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></article>)}</div></section>

      <section id="recursos" className="bg-[#0B2D6B] text-white"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-200">Recursos</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Prática, correção e acompanhamento conectados.</h2><div className="mt-9 grid gap-px overflow-hidden rounded-3xl bg-blue-800 sm:grid-cols-2">{features.map(([title,description]) => <article key={title} className="bg-[#0B2D6B] p-6 sm:p-8"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-blue-100">{description}</p></article>)}</div></div></section>

      <section id="planos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="text-center"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Free ou Premium</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Comece grátis. Avance quando fizer sentido.</h2><p className="mx-auto mt-4 max-w-2xl text-slate-600">Founder e Standard oferecem os mesmos recursos Premium. A diferença é apenas a condição comercial.</p></div><div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><p className="text-sm font-black uppercase tracking-wider text-slate-500">NabuLab Free</p><h3 className="mt-3 text-3xl font-black">R$ 0</h3><ul className="mt-7 space-y-2.5">{free.map(item => <Check key={item}>{item}</Check>)}</ul><TrackedLink event="signup_cta_clicked" properties={{ placement: "pricing_free" }} href={primaryHref} className="mt-8 block rounded-xl border border-[#0B2D6B] px-5 py-3 text-center font-bold text-[#0B2D6B]">Começar grátis</TrackedLink></article>
        <article className="relative rounded-3xl border-2 border-[#3B82F6] bg-white p-6 shadow-xl shadow-blue-950/10 sm:p-8"><span className="absolute right-5 top-5 rounded-full bg-[#F4C430] px-3 py-1 text-xs font-black text-[#0B2D6B]">Acesso completo</span><p className="text-sm font-black uppercase tracking-wider text-blue-700">NabuLab Premium</p>{founderAvailable && <p className="mt-5 text-xs font-black uppercase tracking-[.16em] text-amber-800">Preço Fundador</p>}<div className={founderAvailable ? "mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1" : "mt-3"}><h3 className="text-3xl font-black">{featuredPlan.displayPrice}<span className="text-sm font-semibold text-slate-500">/mês</span></h3>{founderAvailable && <p className="text-sm font-semibold text-slate-400 line-through decoration-slate-500">{config.plans.standard_990.displayPrice}/mês</p>}</div>{founderAvailable && <div className="mt-3 space-y-1 text-sm leading-6 text-amber-900"><p className="font-bold">Condição especial para os primeiros usuários.</p><p>O valor permanece enquanto a assinatura permanecer ativa.</p></div>}<ul className="mt-7 space-y-2.5">{premium.map(item => <Check key={item}>{item}</Check>)}</ul>{premiumActive ? <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-center text-sm font-bold text-emerald-800">Seu Premium já está ativo.</div> : <TrackedLink event="premium_cta_clicked" properties={{ placement: "pricing_premium" }} href={premiumHref} className="mt-8 block rounded-xl bg-[#0B2D6B] px-5 py-3 text-center font-bold text-white">Assinar por {featuredPlan.displayPrice}/mês</TrackedLink>}</article>
      </div><p className="mt-5 text-center text-sm text-slate-500">Plano Standard: {config.plans.standard_990.displayPrice}/mês. Pagamento e gestão da assinatura pela Hotmart.</p></section>

      <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Por que praticar</p><h2 className="mt-3 text-3xl font-black tracking-tight">Estudar também é decidir o que fazer depois de cada resposta.</h2></div><div className="space-y-4 text-base leading-7 text-slate-600"><p>O NabuLab reúne tentativa, correção e histórico para você não depender apenas da releitura passiva.</p><p>Com dados do que já foi feito, fica mais fácil identificar conteúdos frágeis, retomar erros e escolher a próxima prática.</p></div></div></section>

      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">FAQ</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Perguntas frequentes</h2><div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">{[
        ["O NabuLab é gratuito?", "Sim. O plano Free oferece 17 matérias, dois simulados por dia com até 15 questões e recursos essenciais de correção, histórico e desempenho."],
        ["O que muda no Premium?", "O Premium libera simulados ilimitados, nível avançado, até 50 questões, histórico completo, revisão de erros, recomendado completo, evolução, análise, domínio e metas."],
        ["Posso cancelar quando quiser?", "Sim. O cancelamento é gerenciado pela Hotmart e interrompe a renovação automática."],
        ["O que acontece quando cancelo?", "Seu Premium permanece disponível até o fim do período já pago. Depois disso, sua conta volta ao Free e seus dados acadêmicos continuam preservados."],
        ["Como o pagamento é feito?", "O pagamento e a gestão da assinatura são realizados pela Hotmart. Antes do checkout, você cria sua identidade NabuLab para vincular o Premium automaticamente."],
        ["Preciso instalar alguma coisa?", "Não. O NabuLab funciona no navegador em celular, tablet e computador."],
        ["Meu progresso fica salvo?", "Sim. O Cloud Sync vincula histórico, respostas, desempenho e metas à sua conta."],
        ["Quais matérias estão disponíveis?", "São 17 matérias das áreas de Linguagens, Matemática, Ciências da Natureza, Ciências Humanas e Tecnologia."],
      ].map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold text-slate-900 marker:hidden">{q}<span aria-hidden="true" className="float-right text-blue-700 group-open:rotate-45">+</span></summary><p className="mt-3 pr-6 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></section>

      <section className="px-4 pb-16 sm:px-6"><div className="mx-auto max-w-6xl rounded-3xl bg-[#0B2D6B] px-6 py-12 text-center text-white sm:px-10"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-200">Seu próximo passo</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Cada tentativa é um passo. Cada correção, uma evolução.</h2><TrackedLink event="signup_cta_clicked" properties={{ placement: "final_cta" }} href={primaryHref} className="mt-7 inline-block rounded-xl bg-[#F4C430] px-6 py-3.5 font-black text-[#0B2D6B]">{authenticated ? "Ir para o NabuLab" : "Começar grátis"}</TrackedLink></div></section>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><Image src="/branding/logo-horizontal-mono.png" alt="NabuLab" width={145} height={38} className="h-8 w-auto opacity-75" /><nav aria-label="Links institucionais" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/termos">Termos</Link><Link href="/privacidade">Privacidade</Link><Link href="/suporte">Suporte</Link></nav><p>© {new Date().getFullYear()} NabuLab</p></div></footer>
    </main>
  );
}
