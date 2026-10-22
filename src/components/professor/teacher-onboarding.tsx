import Link from "next/link";
import { dismissTeacherOnboarding } from "@/app/turmas/actions";

export type TeacherOnboardingProgress = {
  hasClass: boolean;
  hasQuestion: boolean;
  hasExam: boolean;
  hasActivity: boolean;
  hasStudent: boolean;
  hasSubmission: boolean;
};

const steps = [
  ["hasClass", "Criar primeira turma", "/professor#criar-turma", "Organize alunos e atividades."],
  ["hasQuestion", "Adicionar ou criar questões", "/professor#nova-questao", "Prepare o conteúdo que será aplicado."],
  ["hasExam", "Criar primeiro simulado", "/professor#novo-simulado", "Reúna as questões em uma sequência."],
  ["hasActivity", "Publicar primeira atividade", "/professor#turmas", "Aplique o simulado em uma turma."],
  ["hasStudent", "Convidar alunos", "/professor#turmas", "Compartilhe código, link, convite ou QR Code."],
  ["hasSubmission", "Receber primeira resposta", "/professor#desempenho", "Abra os resultados e acompanhe a turma."],
] as const;

export function TeacherOnboarding({ progress, dismissed }: { progress: TeacherOnboardingProgress; dismissed: boolean }) {
  const completed = steps.filter(([key]) => progress[key]).length;
  if (dismissed || completed === steps.length) return null;
  return <section aria-labelledby="teacher-onboarding-title" className="mt-8 rounded-2xl border border-blue-200 bg-white p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 id="teacher-onboarding-title" className="text-2xl font-black text-[#0B2D6B]">Comece por aqui</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Seu progresso é atualizado automaticamente quando cada ação realmente acontece.</p></div><form action={dismissTeacherOnboarding}><button className="min-h-11 rounded-xl px-3 text-sm font-bold text-slate-600 hover:bg-slate-100">Ocultar checklist</button></form></div>
    <div className="mt-5 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#3B82F6]" style={{ width: `${(completed / steps.length) * 100}%` }} /></div><span className="text-sm font-black tabular-nums text-blue-800">{completed}/{steps.length}</span></div>
    <ol className="mt-5 grid gap-3 md:grid-cols-2">{steps.map(([key, label, href, description]) => { const done = progress[key]; return <li key={key} className={`rounded-xl p-4 ${done ? "bg-blue-50" : "border border-slate-200"}`}><div className="flex gap-3"><span aria-hidden="true" className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-black ${done ? "bg-[#0B2D6B] text-white" : "bg-slate-100 text-slate-500"}`}>{done ? "✓" : "·"}</span><div><h3 className="font-black">{label}</h3><p className="mt-1 text-sm text-slate-600">{description}</p>{!done && <Link href={href} className="mt-2 inline-block text-sm font-bold text-blue-700 underline underline-offset-4">Ir para esta etapa</Link>}</div></div></li>; })}</ol>
  </section>;
}

const presets = [
  ["Avaliação diagnóstica", "Mapeie os conhecimentos iniciais da turma."],
  ["Revisão para prova", "Retome os conteúdos centrais antes da avaliação."],
  ["Atividade semanal", "Crie uma rotina curta de acompanhamento."],
  ["Recuperação", "Prepare uma nova oportunidade de aprendizagem."],
  ["Lista de exercícios", "Organize prática adicional sem inventar questões."],
] as const;

export function TeacherCreationPresets() {
  return <section className="mt-8"><h2 className="text-2xl font-black">Começar com um objetivo</h2><p className="mt-2 text-sm text-slate-600">Escolha um atalho para preencher a intenção do simulado. Você continua selecionando e revisando todas as questões.</p><div className="mt-4 flex gap-3 overflow-x-auto pb-2">{presets.map(([title, description]) => <Link key={title} href={`/professor?preset=${encodeURIComponent(title)}#novo-simulado`} className="min-w-64 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:bg-blue-50"><strong>{title}</strong><span className="mt-1 block text-sm leading-5 text-slate-600">{description}</span></Link>)}</div></section>;
}
