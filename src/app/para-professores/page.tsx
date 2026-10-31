import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobileHeaderMenu } from "@/components/layout/mobile-header-menu";
import { TrackPageView } from "@/components/analytics/track-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { createPublicMetadata, SITE_URL } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";
import { formatTeacherPrice, TEACHER_PLANS } from "@/lib/teacher-plans";

export const metadata: Metadata = createPublicMetadata({
  title: "NabuLab para Professores — atividades, simulados e desempenho",
  description: "Crie turmas, simulados e atividades online, corrija automaticamente e acompanhe onde seus alunos precisam de ajuda. Comece grátis.",
  path: "/para-professores",
  absoluteTitle: true,
});

const flow = [
  ["Crie sua turma", "Organize alunos e conteúdos em um espaço próprio."],
  ["Monte uma atividade", "Crie questões ou reutilize sua biblioteca."],
  ["Convide seus alunos", "Compartilhe código, link, convite ou QR Code."],
  ["Acompanhe resultados", "Veja participação, notas e dificuldades."],
  ["Decida o que revisar", "Use as evidências para preparar o próximo passo."],
] as const;

const benefits = [
  ["Menos trabalho repetitivo", "Correção automática, questões reutilizáveis e simulados que podem virar novas atividades."],
  ["Saiba onde a turma está errando", "Compare resultados por aluno, matéria, assunto, dificuldade e atividade."],
  ["Organize tudo em um só lugar", "Turmas, conteúdo, atividades, entregas e resultados permanecem conectados."],
  ["Entrada simples para os alunos", "Código, link, convite e QR Code aproveitam a conta NabuLab que o aluno já possui."],
] as const;

const faq = [
  ["Preciso pagar para começar?", "Não. O Professor Free permite uma turma ativa, até 40 alunos, dois simulados por semana e analytics básico."],
  ["Meus alunos precisam pagar?", "Não. Eles podem participar das atividades da turma com uma conta gratuita."],
  ["As atividades consomem as 10 questões Free do aluno?", "Não. Atividades da turma ficam separadas da franquia diária Student."],
  ["Posso criar minhas próprias questões?", "Sim. Você pode criar questões, organizá-las em simulados e reutilizá-las."],
  ["A correção é automática?", "Sim. As respostas são corrigidas e a nota é calculada no servidor."],
  ["Posso acompanhar cada aluno?", "Sim. Os relatórios mostram somente resultados produzidos dentro das suas próprias turmas."],
  ["Posso cancelar quando quiser?", "Sim. O cancelamento dos planos pagos é gerenciado pela Hotmart."],
  ["O que acontece no downgrade?", "Seus dados permanecem preservados; limites e recursos passam a seguir o plano vigente."],
  ["Preciso instalar alguma coisa?", "Não. O NabuLab funciona no navegador em celular, tablet e computador."],
] as const;

function withCampaign(path: string, params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const value = params[key];
    if (typeof value === "string" && value.length <= 120) query.set(key, value);
  }
  const serialized = query.toString();
  return serialized ? `${path}${path.includes("?") ? "&" : "?"}${serialized}` : path;
}

export default async function TeachersLanding({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data: teacher } = auth.user
    ? await supabase.from("teacher_accounts").select("user_id").eq("user_id", auth.user.id).maybeSingle()
    : { data: null };
  const destination = teacher ? "/professor" : auth.user ? "/professor?origem=para-professores" : "/cadastro?next=%2Fprofessor";
  const primaryHref = withCampaign(destination, params);
  const structuredData = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "NabuLab para Professores", applicationCategory: "EducationalApplication", operatingSystem: "Web", url: `${SITE_URL}/para-professores`, offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" } };

  return <main className="overflow-x-clip bg-[#F5F7FB] text-slate-950">
    <TrackPageView event="teacher_landing_viewed" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur"><nav aria-label="Navegação para professores" className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"><Link href="/" aria-label="NabuLab — início"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={172} height={44} className="h-9 w-auto" priority /></Link><div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex"><a href="#como-funciona">Como funciona</a><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#faq">Dúvidas</a></div><div className="flex items-center gap-2"><MobileHeaderMenu hideFrom="lg" links={[...(auth.user ? [] : [{ href: "/login?next=/professor", label: "Entrar", primary: true }]), { href: "#como-funciona", label: "Como funciona" }, { href: "#recursos", label: "Recursos" }, { href: "#planos", label: "Planos" }, { href: "#faq", label: "Dúvidas" }]} /><TrackedLink event="teacher_cta_started" properties={{ placement: "header" }} href={primaryHref} className="rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900">{teacher ? "Ir para o painel" : "Começar grátis"}</TrackedLink></div></nav></header>

    <section className="border-b border-blue-100 bg-white"><div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24"><div><h1 className="max-w-3xl text-4xl font-black tracking-[-.04em] text-[#0B2D6B] sm:text-5xl lg:text-6xl">Crie atividades, acompanhe sua turma e descubra o que revisar.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Monte simulados, convide seus alunos e acompanhe resultados sem planilhas soltas ou correção manual. Comece com o Professor Free.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><TrackedLink event="teacher_cta_started" properties={{ placement: "hero" }} href={primaryHref} className="rounded-xl bg-[#0B2D6B] px-6 py-3.5 text-center font-bold text-white shadow-lg shadow-blue-950/15 hover:bg-blue-900">{teacher ? "Ir para o painel" : "Começar grátis como professor"}</TrackedLink><a href="#como-funciona" className="rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-center font-bold text-[#0B2D6B] hover:bg-blue-50">Ver como funciona</a></div><p className="mt-4 text-sm text-slate-500">A mesma conta pode ser Student e Professor. Seus alunos não precisam de plano pago.</p></div><div aria-label="Demonstração dos resultados de uma turma" className="rounded-[2rem] bg-[#071A3D] p-3 shadow-2xl shadow-blue-950/20"><div className="rounded-[1.35rem] bg-[#F5F7FB] p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="font-black text-[#0B2D6B]">Turma demonstrativa</p><p className="text-sm text-slate-500">Resultados de uma atividade</p></div><Image src="/branding/icone-app.png" alt="" width={42} height={42} className="rounded-xl" /></div><div className="mt-6 grid grid-cols-3 gap-2"><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">82%</b><p className="text-xs text-slate-500">participação</p></div><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">6,8</b><p className="text-xs text-slate-500">média</p></div><div className="rounded-xl bg-white p-3"><b className="text-xl text-[#0B2D6B]">6</b><p className="text-xs text-slate-500">pendências</p></div></div><div className="mt-3 rounded-xl bg-white p-4"><p className="font-black">O que precisa de atenção</p><p className="mt-2 text-sm leading-6 text-slate-600"><strong>Cinemática</strong> apresenta a menor taxa de acerto da turma.</p><span className="mt-3 inline-block text-sm font-bold text-blue-700">Criar revisão deste conteúdo</span></div><p className="mt-3 text-xs text-slate-500">Dados ilustrativos para demonstrar o relatório.</p></div></div></div></section>

    <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Da primeira turma à decisão do que revisar.</h2><ol className="mt-10 grid gap-6 lg:grid-cols-5">{flow.map(([title, description], index) => <li key={title} className="relative border-t-2 border-blue-200 pt-5"><span className="text-sm font-black text-blue-700">{index + 1}</span><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></li>)}</ol></section>
    <section id="recursos" className="bg-[#0B2D6B] text-white"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Mais tempo para ensinar. Mais clareza para intervir.</h2><div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">{benefits.map(([title, description]) => <article key={title}><h3 className="text-xl font-black">{title}</h3><p className="mt-3 max-w-xl leading-7 text-blue-100">{description}</p></article>)}</div></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8"><div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Não veja apenas notas. Entenda o que revisar.</h2><p className="mt-5 leading-7 text-slate-600">A Inteligência Pedagógica usa resultados das atividades para apontar dificuldades, pontos fortes, pendências e questões fora do padrão. As análises são determinísticas e aparecem somente quando existe amostra suficiente.</p></div><div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><div className="rounded-xl bg-amber-50 p-4"><strong>Cinemática precisa de atenção</strong><p className="mt-1 text-sm text-slate-600">Menor taxa de acerto entre os conteúdos avaliados.</p></div><div className="rounded-xl bg-blue-50 p-4"><strong>6 alunos possuem atividades pendentes</strong><p className="mt-1 text-sm text-slate-600">Abra a turma para acompanhar e orientar.</p></div><div className="rounded-xl bg-slate-50 p-4"><strong>Revisão preparada como rascunho</strong><p className="mt-1 text-sm text-slate-600">O professor sempre revisa antes de publicar.</p></div></div></section>
    <section id="planos" className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Comece grátis. Amplie quando precisar.</h2><p className="mt-4 text-slate-600">Os limites e preços são os mesmos da página oficial de planos.</p></div><Link href="/professor/planos" className="font-bold text-blue-700 underline underline-offset-4">Comparar todos os recursos</Link></div><div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{Object.values(TEACHER_PLANS).map((plan) => <article key={plan.plan} className={`rounded-2xl p-5 ${plan.recommended ? "bg-[#0B2D6B] text-white" : "border border-slate-200"}`}><div className="flex items-center justify-between gap-2"><h3 className="text-xl font-black">{plan.name}</h3>{plan.recommended && <span className="rounded-full bg-[#F4C430] px-2.5 py-1 text-xs font-black text-[#0B2D6B]">Mais escolhido</span>}</div><p className="mt-4 text-2xl font-black">{formatTeacherPrice(plan.monthlyPrice)}<span className={`text-sm font-semibold ${plan.recommended ? "text-blue-100" : "text-slate-500"}`}>/mês</span></p>{plan.yearlyPrice && <p className={`mt-1 text-sm ${plan.recommended ? "text-blue-100" : "text-slate-500"}`}>ou {formatTeacherPrice(plan.yearlyPrice)}/ano</p>}<ul className={`mt-5 space-y-2 text-sm ${plan.recommended ? "text-blue-50" : "text-slate-600"}`}><li>{plan.maxActiveClasses} {plan.maxActiveClasses === 1 ? "turma ativa" : "turmas ativas"}</li><li>Até {plan.maxStudentsPerClass} alunos por turma</li><li>{plan.weeklyExamLimit ? `${plan.weeklyExamLimit} simulados por semana` : "Simulados sem limite semanal"}</li></ul></article>)}</div></div></section>
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6"><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Dúvidas frequentes</h2><div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">{faq.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold marker:hidden">{question}<span aria-hidden="true" className="float-right text-blue-700 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl pr-6 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></section>
    <section className="px-4 pb-16 sm:px-6"><div className="mx-auto max-w-6xl rounded-3xl bg-[#0B2D6B] px-6 py-12 text-center text-white sm:px-10"><h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Sua primeira turma pode estar pronta hoje.</h2><p className="mx-auto mt-4 max-w-2xl text-blue-100">Crie a conta, ative o módulo Professor e siga uma checklist baseada no seu progresso real.</p><TrackedLink event="teacher_cta_started" properties={{ placement: "final_cta" }} href={primaryHref} className="mt-7 inline-block rounded-xl bg-[#F4C430] px-6 py-3.5 font-black text-[#0B2D6B]">{teacher ? "Ir para o painel" : "Começar grátis como professor"}</TrackedLink></div></section>
    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><Image src="/branding/logo-horizontal-mono.png" alt="NabuLab" width={145} height={38} className="h-8 w-auto opacity-75" /><nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/">Para estudantes</Link><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a><Link href="/privacidade">Privacidade</Link><Link href="/suporte">Suporte</Link></nav><p>© {new Date().getFullYear()} NabuLab</p></div></footer>
  </main>;
}
