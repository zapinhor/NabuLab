import Link from "next/link";
import { redirect } from "next/navigation";
import {
  activateTeacherAccount,
  createTeacherClass,
} from "@/app/turmas/actions";
import { TeacherExamBuilder } from "@/components/professor/teacher-exam-builder";
import {
  TeacherQuestionLibrary,
  type TeacherQuestionView,
} from "@/components/professor/teacher-question-library";
import {
  EmptyTeacherState,
  teacherButton,
  teacherCard,
  teacherField,
  teacherSecondaryButton,
  TeacherNavigation,
} from "@/components/professor/teacher-ui";
import { createClient } from "@/lib/supabase/server";

type ExamQuestion = {
  exam_id: string;
  position: number;
  teacher_question_id: string | null;
};
type TeacherClass = {
  id: string;
  public_name: string;
  subject: string | null;
  status: string;
  student_limit: number;
};
type TeacherExam = {
  id: string;
  title: string;
  description: string | null;
  is_shared: boolean;
  status: string;
  updated_at: string;
};

export default async function TeacherPage({
  searchParams,
}: {
  searchParams: Promise<{
    mensagem?: string;
    q?: string;
    subject?: string;
    difficulty?: string;
    type?: string;
    visibility?: string;
    status?: string;
  }>;
}) {
  const filters = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?next=%2Fprofessor");
  const [
    account,
    classesResult,
    examsResult,
    questionsResult,
    examQuestionsResult,
  ] = await Promise.all([
    supabase
      .from("teacher_accounts")
      .select("user_id,plan,activated_at")
      .eq("user_id", auth.user.id)
      .maybeSingle(),
    supabase
      .from("teacher_classes")
      .select("id,public_name,subject,status,student_limit")
      .eq("owner_id", auth.user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("teacher_exams")
      .select("id,title,description,is_shared,status,updated_at")
      .eq("owner_id", auth.user.id)
      .order("created_at", { ascending: false }),
    supabase.rpc("get_owned_teacher_questions"),
    supabase
      .from("teacher_exam_questions")
      .select("exam_id,position,teacher_question_id")
      .order("position"),
  ]);

  if (!account.data)
    return (
      <main className="grid min-h-screen place-items-center bg-[#F5F7FB] px-4">
        <section className="max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-[#0B2D6B]">
            Use sua conta também como professor
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Seu painel Student continuará igual. A ativação adiciona turmas,
            atividades e acompanhamento dos seus alunos.
          </p>
          <form action={activateTeacherAccount} className="mt-7">
            <button className={teacherButton}>Ativar Professor Free</button>
          </form>
          <Link
            href="/dashboard"
            className="mt-5 inline-block text-sm font-bold text-blue-700"
          >
            Voltar ao painel
          </Link>
        </section>
      </main>
    );

  const classes = (classesResult.data ?? []) as TeacherClass[];
  const exams = (examsResult.data ?? []) as TeacherExam[];
  const examItems = (examQuestionsResult.data ?? []) as ExamQuestion[];
  const allQuestions = (questionsResult.data ?? []) as TeacherQuestionView[];
  const ownedQuestions = allQuestions.filter((question) => {
    const query = (filters.q ?? "").toLocaleLowerCase("pt-BR");
    return (
      (!query ||
        `${question.statement} ${question.subject ?? ""} ${question.topic ?? ""}`
          .toLocaleLowerCase("pt-BR")
          .includes(query)) &&
      (!filters.subject || question.subject === filters.subject) &&
      (!filters.difficulty || question.difficulty === filters.difficulty) &&
      (!filters.type || question.question_type === filters.type) &&
      (filters.status === "archived"
        ? Boolean(question.archived_at)
        : !question.archived_at)
    );
  });
  const subjects = [
    ...new Set(
      allQuestions.map((question) => question.subject).filter(Boolean),
    ),
  ] as string[];
  const activeClasses = classes.filter((item) => item.status === "active");
  const draftExams = exams.filter((exam) => exam.status !== "published");

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#0B2D6B]">
              Área do Professor
            </h1>
            <p className="mt-2 text-slate-600">
              Organize seu conteúdo, aplique atividades e acompanhe suas turmas.
            </p>
          </div>
          <Link href="/dashboard" className={teacherSecondaryButton}>
            Painel Student
          </Link>
        </header>
        {filters.mensagem && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-950"
          >
            {filters.mensagem}
          </p>
        )}
        <TeacherNavigation />
        <section id="visao" className="mt-8 scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">
                O que precisa da sua atenção?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Continue de onde parou ou comece uma nova tarefa.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#turmas" className={teacherSecondaryButton}>
                Criar turma
              </a>
              <a href="#novo-simulado" className={teacherSecondaryButton}>
                Criar simulado
              </a>
              <a href="#nova-questao" className={teacherButton}>
                Criar questão
              </a>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl bg-[#0B2D6B] p-5 text-white">
              <p className="text-sm text-blue-100">Turmas ativas</p>
              <p className="mt-2 text-3xl font-black tabular-nums">
                {activeClasses.length}
              </p>
            </article>
            <article className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">Alunos</p>
              <p className="mt-2 text-3xl font-black tabular-nums">—</p>
              <p className="mt-1 text-xs text-slate-500">
                Veja o total dentro de cada turma
              </p>
            </article>
            <article className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">Atividades em andamento</p>
              <p className="mt-2 text-3xl font-black tabular-nums">—</p>
              <p className="mt-1 text-xs text-slate-500">Acompanhe por turma</p>
            </article>
            <article className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">Rascunhos para continuar</p>
              <p className="mt-2 text-3xl font-black tabular-nums">
                {draftExams.length}
              </p>
            </article>
          </div>
          {draftExams.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-black text-amber-950">
                Você tem {draftExams.length}{" "}
                {draftExams.length === 1
                  ? "simulado em rascunho"
                  : "simulados em rascunho"}
                .
              </p>
              <a
                href="#simulados"
                className="mt-2 inline-block text-sm font-bold text-amber-900 underline underline-offset-4"
              >
                Continuar montagem
              </a>
            </div>
          )}
        </section>
        <section id="turmas" className={`${teacherCard} mt-8 scroll-mt-6`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Turmas</h2>
              <p className="mt-2 text-sm text-slate-600">
                Turma reúne alunos, atividades e resultados.
              </p>
            </div>
            <a href="#criar-turma" className={teacherButton}>
              Criar turma
            </a>
          </div>
          {classes.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {classes.map((item) => (
                <Link
                  key={item.id}
                  href={`/professor/turmas/${item.id}`}
                  className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="font-black">{item.public_name}</span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {item.subject ?? "Sem matéria definida"}
                  </span>
                  <span className="mt-3 inline-block text-sm font-bold text-blue-700">
                    Abrir turma
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyTeacherState
                title="Crie sua primeira turma"
                description="Organize alunos, envie atividades e acompanhe o desempenho em um só lugar."
                action="Criar turma"
                href="#criar-turma"
              />
            </div>
          )}
          <details
            id="criar-turma"
            className="mt-6 scroll-mt-6 rounded-2xl bg-slate-50 p-5"
          >
            <summary className="cursor-pointer text-lg font-black">
              Criar turma
            </summary>
            <form
              action={createTeacherClass}
              className="mt-5 grid gap-4 md:grid-cols-2"
            >
              <label className="text-sm font-bold">
                Nome interno
                <input name="name" required className={teacherField} />
              </label>
              <label className="text-sm font-bold">
                Nome público
                <input
                  name="public_name"
                  required
                  className={teacherField}
                  placeholder="Matemática — 9º A"
                />
              </label>
              <label className="text-sm font-bold md:col-span-2">
                Descrição
                <textarea
                  name="description"
                  rows={3}
                  className={teacherField}
                />
              </label>
              <label className="text-sm font-bold">
                Escola ou identificação
                <input name="school_name" className={teacherField} />
              </label>
              <label className="text-sm font-bold">
                Matéria
                <input name="subject" className={teacherField} />
              </label>
              <label className="text-sm font-bold md:col-span-2">
                Visibilidade
                <select name="visibility" className={teacherField}>
                  <option value="private">Privada</option>
                  <option value="unlisted">Não listada</option>
                  <option value="public_approval">Pública com aprovação</option>
                </select>
              </label>
              <div className="md:col-span-2">
                <button className={teacherButton}>Criar turma</button>
              </div>
            </form>
          </details>
        </section>
        <div className="mt-8" aria-label="Biblioteca de questões">
          <TeacherQuestionLibrary
            questions={ownedQuestions}
            filters={filters}
            subjects={subjects}
          />
        </div>
        <div className="mt-8" aria-label="Construtor de simulados">
          <TeacherExamBuilder
            exams={exams}
            examItems={examItems}
            questions={allQuestions}
          />
        </div>
        <section id="desempenho" className={`${teacherCard} mt-8 scroll-mt-6`}>
          <h2 className="text-2xl font-black">Desempenho</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Os relatórios pertencem a cada turma. Abra uma turma para ver média,
            participação, conclusão e evolução dos alunos.
          </p>
          {activeClasses.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {activeClasses.map((item) => (
                <Link
                  key={item.id}
                  href={`/professor/turmas/${item.id}/analytics`}
                  className="rounded-2xl border border-slate-200 p-4 font-bold text-blue-700 hover:border-blue-300 hover:bg-blue-50"
                >
                  Ver desempenho de {item.public_name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              Crie uma turma para acompanhar resultados.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
