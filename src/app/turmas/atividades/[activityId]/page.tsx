import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { submitClassActivity } from "@/app/turmas/actions";
import { createClient } from "@/lib/supabase/server";

type ActivityQuestion = {
  position: number;
  teacher_question_id: string | null;
  teacher_questions: {
    statement: string;
    alternatives: unknown;
    question_type: "multiple_choice" | "true_false";
  } | null;
};

type TeacherQuestion = NonNullable<ActivityQuestion["teacher_questions"]> & { id: string };

type Activity = {
  id: string;
  class_id: string;
  exam_id: string;
  title: string;
  instructions: string | null;
  due_at: string | null;
  teacher_classes: { public_name: string } | null;
  teacher_exams: { title: string } | null;
};

function alternatives(question: ActivityQuestion) {
  if (question.teacher_questions?.question_type === "true_false") return ["Verdadeiro", "Falso"];
  const value = question.teacher_questions?.alternatives;
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export default async function ClassActivityPage({ params, searchParams }: { params: Promise<{ activityId: string }>; searchParams: Promise<{ mensagem?: string }> }) {
  const { activityId } = await params;
  const { mensagem } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/login?next=${encodeURIComponent(`/turmas/atividades/${activityId}`)}`);

  const activityResult = await supabase
    .from("teacher_class_activities")
    .select("id,class_id,exam_id,title,instructions,due_at,teacher_classes(public_name),teacher_exams(title)")
    .eq("id", activityId)
    .eq("status", "published")
    .maybeSingle();
  if (!activityResult.data) notFound();
  const activity = activityResult.data as unknown as Activity;
  const [examQuestionsResult, attemptResult] = await Promise.all([
    supabase
      .from("teacher_exam_questions")
      .select("position,teacher_question_id")
      .eq("exam_id", activity.exam_id)
      .order("position"),
    supabase
      .from("teacher_activity_attempts")
      .select("status,score,correct_count,total_questions,submitted_at")
      .eq("activity_id", activityId)
      .eq("student_id", auth.user.id)
      .maybeSingle(),
  ]);
  const teacherQuestionIds = (examQuestionsResult.data ?? [])
    .map((item) => item.teacher_question_id)
    .filter((id): id is string => Boolean(id));
  const teacherQuestionsResult = teacherQuestionIds.length > 0
    ? await supabase
        .from("teacher_questions")
        .select("id,statement,alternatives,question_type")
        .in("id", teacherQuestionIds)
    : { data: [] };
  const teacherQuestions = new Map(
    ((teacherQuestionsResult.data ?? []) as TeacherQuestion[]).map((question) => [question.id, question]),
  );
  const questions = (examQuestionsResult.data ?? []).map((item) => ({
    ...item,
    teacher_questions: item.teacher_question_id ? teacherQuestions.get(item.teacher_question_id) ?? null : null,
  })) as ActivityQuestion[];
  const attempt = attemptResult.data;

  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8"><div className="mx-auto max-w-4xl"><header className="flex flex-wrap items-center justify-between gap-3"><Link href={`/turmas/${activity.class_id}`} className="font-bold text-blue-700">← Voltar à turma</Link><span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">Não consome limites Student</span></header><section className="mt-7 rounded-3xl bg-[#0B2D6B] p-7 text-white"><p className="text-sm font-bold text-blue-200">{activity.teacher_classes?.public_name ?? "Turma"}</p><h1 className="mt-2 text-3xl font-black">{activity.title}</h1><p className="mt-2 text-blue-100">{activity.teacher_exams?.title ?? "Atividade"}</p>{activity.instructions && <p className="mt-4 leading-7 text-blue-50">{activity.instructions}</p>}{activity.due_at && <p className="mt-4 text-sm text-blue-200">Prazo: {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date(activity.due_at))}</p>}</section>{mensagem && <p role="status" className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-950">{mensagem}</p>}{attempt?.status === "submitted" ? <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-7"><h2 className="text-2xl font-black text-emerald-950">Atividade concluída</h2><p className="mt-3 text-4xl font-black text-emerald-700">{attempt.score ?? 0}%</p><p className="mt-2 text-emerald-900">{attempt.correct_count ?? 0} de {attempt.total_questions ?? 0} respostas corretas.</p></section> : questions.length === 0 ? <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black">Atividade ainda sem questões</h2><p className="mt-2 text-sm text-slate-600">Avise o professor para concluir a configuração do simulado.</p></section> : <form action={submitClassActivity} className="mt-6 space-y-5"><input type="hidden" name="activity_id" value={activityId}/>{questions.map((question) => <fieldset key={question.position} className="rounded-2xl border border-slate-200 bg-white p-6"><legend className="px-2 font-black">Questão {question.position}</legend><p className="mb-4 leading-7 text-slate-800">{question.teacher_questions?.statement ?? "Questão indisponível"}</p><div className="space-y-2">{alternatives(question).map((option) => <label key={option} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-400"><input type="radio" name={`question_${question.position}`} value={option} required className="mt-1"/><span>{option}</span></label>)}</div></fieldset>)}<button className="w-full rounded-xl bg-[#0B2D6B] px-5 py-4 font-black text-white">Enviar atividade</button></form>}</div></main>;
}
