import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { startClassActivity, submitClassActivity } from "@/app/turmas/actions";
import { createClient } from "@/lib/supabase/server";

type ActivityQuestion = { display_position: number; source_position: number; statement: string; alternatives: unknown; question_type: "multiple_choice" | "true_false" };
type Activity = { id: string; class_id: string; title: string; instructions: string | null; opens_at: string | null; due_at: string | null; teacher_classes: { public_name: string } | null; teacher_exams: { title: string } | null };
type ActivityState = { availability: "scheduled" | "closed" | "available" | "in_progress"; max_attempts: number | null; attempts_used: number; attempts_remaining: number | null; question_count: number; available_from: string | null; due_at: string | null };
type AttemptAnswer = { position: number; answer: string | null; is_correct: boolean; correct_answer: string; explanation: string | null };
type AttemptResult = { attempt_number: number; submitted_at: string; score: number | null; correct_count: number | null; total_questions: number; answers: AttemptAnswer[] | null };

function alternatives(question: ActivityQuestion) {
  if (question.question_type === "true_false") return ["Verdadeiro", "Falso"];
  return Array.isArray(question.alternatives) ? question.alternatives.filter((item): item is string => typeof item === "string") : [];
}
function formatDate(value: string | null) { return value ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date(value)) : null; }

export default async function ClassActivityPage({ params, searchParams }: { params: Promise<{ activityId: string }>; searchParams: Promise<{ mensagem?: string; attempt?: string }> }) {
  const { activityId } = await params;
  const { mensagem, attempt: attemptId } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/login?next=${encodeURIComponent(`/turmas/atividades/${activityId}`)}`);
  const [activityResult, stateResult] = await Promise.all([
    supabase.from("teacher_class_activities").select("id,class_id,title,instructions,opens_at,due_at,teacher_classes(public_name),teacher_exams(title)").eq("id", activityId).eq("status", "published").maybeSingle(),
    supabase.rpc("get_teacher_activity_state", { p_activity_id: activityId }),
  ]);
  if (!activityResult.data || !stateResult.data?.[0]) notFound();
  const activity = activityResult.data as unknown as Activity;
  const state = stateResult.data[0] as ActivityState;
  const [questionsResult, resultResult] = attemptId ? await Promise.all([
    supabase.rpc("get_teacher_attempt_questions", { p_attempt_id: attemptId }),
    supabase.rpc("get_teacher_attempt_result", { p_attempt_id: attemptId }),
  ]) : [{ data: [] }, { data: [] }];
  const questions = (questionsResult.data ?? []) as ActivityQuestion[];
  const result = (resultResult.data?.[0] ?? null) as AttemptResult | null;

  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8"><div className="mx-auto max-w-4xl"><header className="flex flex-wrap items-center justify-between gap-3"><Link href={`/turmas/${activity.class_id}`} className="font-bold text-blue-700">← Voltar à turma</Link><span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">Não consome limites Student</span></header>
    <section className="mt-7 rounded-3xl bg-[#0B2D6B] p-7 text-white"><p className="text-sm font-bold text-blue-200">{activity.teacher_classes?.public_name ?? "Turma"}</p><h1 className="mt-2 text-3xl font-black">{activity.title}</h1><p className="mt-2 text-blue-100">{activity.teacher_exams?.title ?? "Atividade"}</p>{activity.instructions&&<p className="mt-4 leading-7 text-blue-50">{activity.instructions}</p>}<div className="mt-4 flex flex-wrap gap-3 text-sm text-blue-200"><span>{state.question_count} questões</span><span>{state.max_attempts===null?"Tentativas ilimitadas":`${state.attempts_used} de ${state.max_attempts} tentativas usadas`}</span>{state.available_from&&<span>Abre: {formatDate(state.available_from)}</span>}{state.due_at&&<span>Prazo: {formatDate(state.due_at)}</span>}</div></section>
    {mensagem&&<p role="status" className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-950">{mensagem}</p>}
    {result ? <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-7"><h2 className="text-2xl font-black text-emerald-950">Tentativa {result.attempt_number} concluída</h2>{result.score===null?<p className="mt-3 text-emerald-900">O professor optou por não exibir a nota imediatamente.</p>:<><p className="mt-3 text-4xl font-black text-emerald-700">{result.score}%</p><p className="mt-2 text-emerald-900">{result.correct_count} de {result.total_questions} respostas corretas.</p></>}{result.answers===null?<p className="mt-3 text-sm text-emerald-900">O gabarito ainda não está disponível.</p>:<div className="mt-6 space-y-3"><h3 className="text-lg font-black text-emerald-950">Gabarito</h3>{result.answers.map((answer)=><article key={answer.position} className="rounded-xl border border-emerald-200 bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-black text-slate-900">Questão {answer.position}</p><span className={`rounded-full px-3 py-1 text-xs font-black ${answer.is_correct?"bg-emerald-100 text-emerald-800":"bg-red-100 text-red-800"}`}>{answer.is_correct?"Correta":"Incorreta"}</span></div><p className="mt-3 text-sm text-slate-700"><strong>Sua resposta:</strong> {answer.answer??"Não respondida"}</p><p className="mt-1 text-sm text-slate-700"><strong>Resposta correta:</strong> {answer.correct_answer}</p>{answer.explanation&&<p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{answer.explanation}</p>}</article>)}</div>}{(state.attempts_remaining===null||state.attempts_remaining>0)&&state.availability!=="closed"&&<form action={startClassActivity} className="mt-5"><input type="hidden" name="activity_id" value={activityId}/><button className="rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Iniciar nova tentativa</button></form>}</section>
    : state.availability==="scheduled" ? <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black">Esta atividade ainda não está disponível.</h2><p className="mt-2 text-sm text-slate-600">Abertura: {formatDate(state.available_from)}</p></section>
    : state.availability==="closed" ? <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6"><h2 className="font-black">O prazo desta atividade terminou.</h2><p className="mt-2 text-sm text-slate-600">Encerramento: {formatDate(state.due_at)}</p></section>
    : !attemptId ? <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Atividade disponível</h2><p className="mt-2 text-sm text-slate-600">{state.attempts_remaining===null?"Você pode realizar tentativas ilimitadas.":`${state.attempts_remaining} tentativa(s) restante(s).`}</p><form action={startClassActivity} className="mt-5"><input type="hidden" name="activity_id" value={activityId}/><button className="rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Iniciar tentativa</button></form></section>
    : questions.length===0 ? <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black">Tentativa indisponível</h2><p className="mt-2 text-sm text-slate-600">Atualize a página ou fale com o professor.</p></section>
    : <form action={submitClassActivity} className="mt-6 space-y-5"><input type="hidden" name="activity_id" value={activityId}/><input type="hidden" name="attempt_id" value={attemptId}/>{questions.map((question)=><fieldset key={question.source_position} className="rounded-2xl border border-slate-200 bg-white p-6"><legend className="px-2 font-black">Questão {question.display_position}</legend><p className="mb-4 leading-7 text-slate-800">{question.statement}</p><div className="space-y-2">{alternatives(question).map((option)=><label key={option} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-400"><input type="radio" name={`question_${question.source_position}`} value={option} required className="mt-1"/><span>{option}</span></label>)}</div></fieldset>)}<button className="w-full rounded-xl bg-[#0B2D6B] px-5 py-4 font-black text-white">Enviar tentativa</button></form>}
  </div></main>;
}
