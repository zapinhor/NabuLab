import Link from "next/link";
import { createTeacherP6Review } from "@/app/turmas/actions";
import type { buildTeacherInsights } from "@/lib/teacher-insights";

type Insights = ReturnType<typeof buildTeacherInsights>;

const color = {
  difficulty: "border-amber-200 bg-amber-50 text-amber-950",
  strength: "border-emerald-200 bg-emerald-50 text-emerald-950",
  trend: "border-blue-200 bg-blue-50 text-blue-950",
  attention: "border-orange-200 bg-orange-50 text-orange-950",
  recurring: "border-orange-200 bg-orange-50 text-orange-950",
  question: "border-violet-200 bg-violet-50 text-violet-950",
  pending: "border-slate-200 bg-slate-50 text-slate-950",
} as const;

export function TeacherInsights({ classId, insights, base }: { classId: string; insights: Insights; base: string }) {
  const individual = base.includes("/alunos/");
  if (!insights.hasEnoughData) return <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6"><h2 className="font-black text-[#0B2D6B]">{individual ? "Resumo de aprendizagem" : "Insights"}</h2><p className="mt-2 text-sm text-slate-600">Ainda não há respostas suficientes para gerar insights. Eles aparecerão quando houver amostra suficiente dentro das atividades desta turma.</p></section>;
  return <section className="rounded-2xl border border-slate-200 bg-white p-5"><div><h2 className="font-black text-[#0B2D6B]">{individual ? "Resumo de aprendizagem" : "Resumo inteligente"}</h2><p className="mt-1 text-sm text-slate-600">Dados, insights e recomendações são separados. Cada item usa apenas resultados desta turma e do período filtrado.</p></div><div className="mt-4 grid gap-3 lg:grid-cols-2">{insights.priority.map((insight) => <article key={insight.id} className={`rounded-xl border p-4 ${color[insight.kind]}`}><div className="flex items-start justify-between gap-3"><h3 className="font-black">{insight.title}</h3><span className="shrink-0 text-xs font-bold uppercase tracking-wide">Evidência {insight.evidence}</span></div><p className="mt-2 text-sm leading-6">{insight.detail}</p>{insight.action?.href ? <Link href={`${base}/${insight.action.href}`} className="mt-3 inline-block text-sm font-bold text-blue-800 underline underline-offset-4">{insight.action.label}</Link> : null}{insight.action?.review ? <form action={createTeacherP6Review} className="mt-3"><input type="hidden" name="class_id" value={classId}/><input type="hidden" name="subject" value={insight.action.review.subject}/><input type="hidden" name="topic" value={insight.action.review.topic}/><input type="hidden" name="difficulty" value={insight.action.review.difficulty}/><input type="hidden" name="prefer_easier" value={String(insight.action.review.preferEasier)}/><button className="rounded-lg bg-[#0B2D6B] px-3 py-2 text-sm font-bold text-white">{insight.action.label}</button></form> : null}</article>)}</div>{!insights.priority.length ? <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Os dados atuais não indicam uma prioridade forte. Continue acompanhando as próximas atividades.</p> : null}<p className="mt-4 text-xs text-slate-500">Critérios: amostra mínima, comparação com a turma e recorrência. A criação de revisão gera somente um rascunho para você revisar.</p></section>;
}
