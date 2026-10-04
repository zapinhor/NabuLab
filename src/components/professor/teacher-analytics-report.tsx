import Link from "next/link";
import { TeacherAnalyticsCharts } from "@/components/professor/teacher-analytics-charts";
import type { buildTeacherReport, ContentMetric, TeacherAnalyticsFilters } from "@/lib/teacher-analytics";

type Report = ReturnType<typeof buildTeacherReport>;
const number = (value: number) => value.toLocaleString("pt-BR");
const rate = (value: number | null) => value === null ? "—" : `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
const delta = (value: number | null) => value === null ? "—" : `${value > 0 ? "+" : ""}${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} p.p.`;
const cell = "border-b border-slate-100 px-3 py-3 align-top";

function Card({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-[#0B2D6B]">{value}</p>{detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}</article>;
}

function ContentTable({ title, rows }: { title: string; rows: ContentMetric[] }) {
  return <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-black">{title}</h2>
    {rows.length ? <table className="mt-3 w-full min-w-[460px] text-left text-sm"><thead><tr className="text-slate-500"><th className={cell}>Conteúdo</th><th className={cell}>Respostas</th><th className={cell}>Acertos</th><th className={cell}>Erros</th><th className={cell}>Taxa de acerto</th></tr></thead><tbody>{rows.map((row) => <tr key={row.label}><td className={cell}>{row.label}</td><td className={cell}>{number(row.responses)}</td><td className={cell}>{number(row.correct)}</td><td className={cell}>{number(row.errors)}</td><td className={cell}>{rate(row.accuracy)}</td></tr>)}</tbody></table>
      : <p className="mt-4 text-sm text-slate-500">Ainda não há respostas suficientes para gerar este relatório.</p>}
  </section>;
}

export function TeacherAnalyticsReport({ classId, report, filters, studentId }: { classId: string; report: Report; filters: TeacherAnalyticsFilters; studentId?: string }) {
  const base = studentId ? `/professor/turmas/${classId}/analytics/alunos/${studentId}` : `/professor/turmas/${classId}/analytics`;
  const query = new URLSearchParams({ from: filters.from, to: filters.to });
  for (const [name, value] of Object.entries({ activity: filters.activityId, subject: filters.subject, topic: filters.topic, difficulty: filters.difficulty })) if (value) query.set(name, value);
  const download = (kind: string) => `/professor/turmas/${classId}/analytics/export?${new URLSearchParams({ ...Object.fromEntries(query), kind, ...(studentId ? { student: studentId } : {}) })}`;
  const summary = report.summary;
  return <div className="space-y-6">
    <form action={base} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 xl:grid-cols-6" aria-label="Filtros de desempenho">
      <label className="text-sm font-semibold">De<input type="date" name="from" defaultValue={filters.from} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm font-semibold">Até<input type="date" name="to" defaultValue={filters.to} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm font-semibold">Atividade<select name="activity" defaultValue={filters.activityId} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"><option value="">Todas</option>{report.activityOptions.map((activity) => <option key={activity.id} value={activity.id}>{activity.title}</option>)}</select></label>
      <label className="text-sm font-semibold">Matéria<select name="subject" defaultValue={filters.subject} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"><option value="">Todas</option>{report.facets.subjects.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-sm font-semibold">Assunto<select name="topic" defaultValue={filters.topic} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"><option value="">Todos</option>{report.facets.topics.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-sm font-semibold">Dificuldade<select name="difficulty" defaultValue={filters.difficulty} className="mt-1 block w-full rounded-lg border border-slate-300 p-2"><option value="">Todas</option>{report.facets.difficulties.map((value) => <option key={value}>{value}</option>)}</select></label>
      <button className="rounded-lg bg-[#0B2D6B] px-5 py-2 font-bold text-white sm:col-span-2 xl:col-span-1">Aplicar filtros</button>
      <p className="self-center text-xs text-slate-500 sm:col-span-2 xl:col-span-5">Período e atividade filtram todos os indicadores. Matéria, assunto e dificuldade filtram as tabelas de respostas e questões.</p>
    </form>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo da turma">
      <Card label={studentId ? "Aluno" : "Alunos ativos"} value={number(summary.students)}/>
      <Card label="Atividades publicadas" value={number(summary.activities)} detail="Criadas ou realizadas no período selecionado"/>
      <Card label="Participação" value={rate(summary.participation)} detail="Alunos que iniciaram alguma atividade no período"/>
      <Card label="Conclusão" value={rate(summary.completion)} detail="Pares aluno–atividade com envio concluído"/>
      <Card label="Média" value={rate(summary.average)} detail="Última tentativa concluída por atividade"/>
      <Card label="Média da última atividade" value={rate(summary.lastAverage)}/>
      <Card label="Evolução recente" value={delta(summary.recentChange)} detail="Variação entre primeiro e último dia com resultados"/>
      <Card label="Alunos com pendências" value={number(summary.pendingStudents)}/>
    </section>
    {!report.history.length ? <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">Ainda não há respostas suficientes para gerar este relatório. As atividades publicadas e os alunos ativos continuam visíveis.</p> : null}
    <TeacherAnalyticsCharts distribution={report.distribution} evolution={report.evolution}/>
    {!studentId ? <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-black">Desempenho por aluno</h2><Link href={download("students")} className="text-sm font-bold text-blue-700">Baixar CSV de alunos</Link></div><table className="mt-3 w-full min-w-[820px] text-left text-sm"><thead><tr className="text-slate-500">{["Aluno", "Realizadas", "Pendentes", "Média", "Acerto", "Evolução", "Última atividade"].map((label) => <th key={label} className={cell}>{label}</th>)}</tr></thead><tbody>{report.students.map((student) => <tr key={student.id}><td className={cell}><Link href={`${base}/alunos/${student.id}?${query}`} className="font-bold text-blue-700 underline-offset-2 hover:underline">{student.name}</Link>{student.username ? <small className="block text-slate-500">@{student.username}</small> : null}</td><td className={cell}>{student.completed}</td><td className={cell}>{student.pending}</td><td className={cell}>{rate(student.average)}</td><td className={cell}>{rate(student.accuracy)}</td><td className={cell}>{delta(student.evolution)}</td><td className={cell}>{student.lastActivity ?? "—"}</td></tr>)}</tbody></table>{!report.students.length ? <p className="mt-4 text-sm text-slate-500">Nenhum aluno ativo nesta turma.</p> : null}</section> : <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-black">Histórico de atividades nesta turma</h2>{report.history.length ? <table className="mt-3 w-full min-w-[600px] text-left text-sm"><thead><tr className="text-slate-500">{["Atividade", "Nota", "Acertos", "Tentativa", "Conclusão"].map((label) => <th key={label} className={cell}>{label}</th>)}</tr></thead><tbody>{report.history.map((item) => <tr key={item.id}><td className={cell}>{item.activity}</td><td className={cell}>{rate(item.score)}</td><td className={cell}>{item.correct}/{item.total}</td><td className={cell}>{item.attemptNumber}</td><td className={cell}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(item.submittedAt))}</td></tr>)}</tbody></table> : <p className="mt-4 text-sm text-slate-500">Este aluno ainda não concluiu atividades no período.</p>}</section>}
    <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-black">Comparação entre atividades</h2><Link href={download("activities")} className="text-sm font-bold text-blue-700">Baixar CSV de atividades</Link></div><table className="mt-3 w-full min-w-[620px] text-left text-sm"><thead><tr className="text-slate-500">{["Atividade", "Média", "Participação", "Conclusão", "Taxa de acerto"].map((label) => <th key={label} className={cell}>{label}</th>)}</tr></thead><tbody>{report.activities.map((activity) => <tr key={activity.id}><td className={cell}>{activity.title}</td><td className={cell}>{rate(activity.average)}</td><td className={cell}>{rate(activity.participation)}</td><td className={cell}>{rate(activity.completion)}</td><td className={cell}>{rate(activity.accuracy)}</td></tr>)}</tbody></table>{!report.activities.length ? <p className="mt-4 text-sm text-slate-500">Nenhuma atividade publicada no período.</p> : null}</section>
    <div className="grid gap-5 xl:grid-cols-2"><ContentTable title="Por matéria" rows={report.bySubject}/><ContentTable title="Por assunto" rows={report.byTopic}/><ContentTable title="Por dificuldade" rows={report.byDifficulty}/><ContentTable title="Por atividade" rows={report.byActivity}/></div>
    <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-black">Questões mais erradas</h2><Link href={download("questions")} className="text-sm font-bold text-blue-700">Baixar CSV de questões</Link></div>{report.questions.length ? <table className="mt-3 w-full min-w-[680px] text-left text-sm"><thead><tr className="text-slate-500">{["Questão do snapshot", "Matéria / assunto", "Respostas", "Erros", "Taxa de erro"].map((label) => <th key={label} className={cell}>{label}</th>)}</tr></thead><tbody>{report.questions.slice(0, 30).map((question) => <tr key={question.key}><td className={`${cell} max-w-sm`}>{question.statement}</td><td className={cell}>{question.subject} · {question.topic}</td><td className={cell}>{question.responses}</td><td className={cell}>{question.errors}</td><td className={cell}>{rate(question.errorRate)}</td></tr>)}</tbody></table> : <p className="mt-4 text-sm text-slate-500">Ainda não há respostas suficientes para gerar este relatório.</p>}</section>
  </div>;
}
