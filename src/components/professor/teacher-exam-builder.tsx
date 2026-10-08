import {
  addQuestionToTeacherExam,
  createTeacherExam,
  duplicateTeacherExam,
  moveQuestionInTeacherExam,
  removeQuestionFromTeacherExam,
  setTeacherExamStatus,
} from "@/app/turmas/actions";
import {
  EmptyTeacherState,
  teacherButton,
  teacherCard,
  teacherField,
  teacherSecondaryButton,
  WizardSteps,
} from "./teacher-ui";
import type { TeacherQuestionView } from "./teacher-question-library";

type Exam = {
  id: string;
  title: string;
  description: string | null;
  is_shared: boolean;
  status: string;
  updated_at: string;
};
type ExamQuestion = {
  exam_id: string;
  position: number;
  teacher_question_id: string | null;
};

export function TeacherExamBuilder({
  exams,
  examItems,
  questions,
}: {
  exams: Exam[];
  examItems: ExamQuestion[];
  questions: TeacherQuestionView[];
}) {
  const activeQuestions = questions.filter((question) => !question.archived_at);
  return (
    <section id="simulados" className={`${teacherCard} scroll-mt-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Simulados</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Um simulado organiza questões reutilizáveis. Ele só chega aos alunos
            quando você o aplica como atividade em uma turma.
          </p>
        </div>
        <a href="#novo-simulado" className={teacherButton}>
          Criar simulado
        </a>
      </div>
      <div className="mt-6 space-y-4">
        {exams.map((exam) => {
          const items = examItems.filter((item) => item.exam_id === exam.id);
          const published = exam.status === "published";
          const current = published ? 4 : items.length > 0 ? 3 : 2;
          const selectedIds = new Set(
            items.map((item) => item.teacher_question_id),
          );
          return (
            <article
              key={exam.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black">{exam.title}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-black ${published ? "bg-blue-100 text-blue-900" : "bg-amber-100 text-amber-900"}`}
                    >
                      {published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {items.length} {items.length === 1 ? "questão" : "questões"}{" "}
                    · Atualizado em{" "}
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(exam.updated_at),
                    )}
                  </p>
                </div>
                <details className="relative">
                  <summary
                    className={`${teacherSecondaryButton} cursor-pointer list-none`}
                  >
                    Mais ações
                  </summary>
                  <div className="mt-2 grid min-w-44 gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:absolute sm:right-0 sm:z-10">
                    <form action={duplicateTeacherExam}>
                      <input type="hidden" name="exam_id" value={exam.id} />
                      <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-slate-100">
                        Duplicar
                      </button>
                    </form>
                    {published && (
                      <form action={setTeacherExamStatus}>
                        <input type="hidden" name="exam_id" value={exam.id} />
                        <input type="hidden" name="status" value="draft" />
                        <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-slate-100">
                          Editar nova versão
                        </button>
                      </form>
                    )}
                  </div>
                </details>
              </div>
              <div className="mt-5">
                <WizardSteps
                  current={current}
                  labels={["Informações", "Questões", "Organizar", "Revisar"]}
                />
              </div>
              {published ? (
                <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                  <h4 className="font-black text-blue-950">
                    Simulado publicado
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-blue-900">
                    Está pronto para uso, mas ainda não foi enviado a nenhum
                    aluno.
                  </p>
                  <a href="#turmas" className={`${teacherButton} mt-4`}>
                    Aplicar em uma turma
                  </a>
                </div>
              ) : (
                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.9fr]">
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-black">Questões selecionadas</h4>
                      <span className="text-sm font-bold text-blue-800">
                        {items.length} selecionadas
                      </span>
                    </div>
                    {items.length ? (
                      <ol className="mt-3 space-y-2">
                        {items.map((item, index) => {
                          const question = questions.find(
                            (candidate) =>
                              candidate.id === item.teacher_question_id,
                          );
                          return (
                            <li
                              key={item.position}
                              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                            >
                              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-sm font-black">
                                {index + 1}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                                {question?.statement ??
                                  "Questão preservada no simulado"}
                              </span>
                              <div className="flex shrink-0 items-center">
                                <form
                                  action={moveQuestionInTeacherExam}
                                  className="flex"
                                >
                                  <input
                                    type="hidden"
                                    name="exam_id"
                                    value={exam.id}
                                  />
                                  <input
                                    type="hidden"
                                    name="position"
                                    value={item.position}
                                  />
                                  <button
                                    name="direction"
                                    value="-1"
                                    disabled={index === 0}
                                    className="min-h-10 px-2 font-bold disabled:opacity-30"
                                    aria-label="Mover questão para cima"
                                  >
                                    Subir
                                  </button>
                                  <button
                                    name="direction"
                                    value="1"
                                    disabled={index === items.length - 1}
                                    className="min-h-10 px-2 font-bold disabled:opacity-30"
                                    aria-label="Mover questão para baixo"
                                  >
                                    Descer
                                  </button>
                                </form>
                                <form action={removeQuestionFromTeacherExam}>
                                  <input
                                    type="hidden"
                                    name="exam_id"
                                    value={exam.id}
                                  />
                                  <input
                                    type="hidden"
                                    name="position"
                                    value={item.position}
                                  />
                                  <button className="min-h-10 px-2 text-xs font-bold text-red-700">
                                    Remover
                                  </button>
                                </form>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                        Comece adicionando questões da sua biblioteca.
                      </p>
                    )}
                  </div>
                  <div className="min-w-0 rounded-2xl bg-slate-50 p-4">
                    <h4 className="font-black">Adicionar da biblioteca</h4>
                    <p className="mt-1 text-sm text-slate-600">
                      Escolha uma questão por vez. A seleção fica salva no
                      rascunho.
                    </p>
                    {activeQuestions.filter(
                      (question) => !selectedIds.has(question.id),
                    ).length ? (
                      <form
                        action={addQuestionToTeacherExam}
                        className="mt-4 grid gap-3"
                      >
                        <input type="hidden" name="exam_id" value={exam.id} />
                        <select
                          name="question_id"
                          required
                          className={teacherField}
                        >
                          <option value="">Selecione uma questão</option>
                          {activeQuestions
                            .filter((question) => !selectedIds.has(question.id))
                            .map((question) => (
                              <option key={question.id} value={question.id}>
                                {question.statement.slice(0, 100)}
                              </option>
                            ))}
                        </select>
                        <button className={teacherSecondaryButton}>
                          Adicionar questão
                        </button>
                      </form>
                    ) : (
                      <p className="mt-4 text-sm text-slate-500">
                        Todas as questões disponíveis já foram adicionadas.
                      </p>
                    )}
                    <a
                      href="#nova-questao"
                      className="mt-4 inline-block text-sm font-bold text-blue-700 hover:underline"
                    >
                      Criar nova questão
                    </a>
                  </div>
                </div>
              )}
              {!published && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <p className="font-black">Revisar e publicar</p>
                    <p className="text-sm text-slate-500">
                      Confira a ordem antes de disponibilizar o simulado.
                    </p>
                  </div>
                  <form action={setTeacherExamStatus}>
                    <input type="hidden" name="exam_id" value={exam.id} />
                    <input type="hidden" name="status" value="published" />
                    <button
                      disabled={items.length === 0}
                      className={teacherButton}
                    >
                      Publicar simulado
                    </button>
                  </form>
                </div>
              )}
            </article>
          );
        })}
        {exams.length === 0 && (
          <EmptyTeacherState
            title="Você ainda não criou nenhum simulado"
            description="Escolha questões da sua biblioteca e monte seu primeiro simulado."
            action="Criar primeiro simulado"
            href="#novo-simulado"
          />
        )}
      </div>
      <div
        id="novo-simulado"
        className="mt-6 scroll-mt-6 rounded-2xl bg-blue-50 p-5 sm:p-6"
      >
        <WizardSteps
          current={1}
          labels={["Informações", "Questões", "Organizar", "Revisar"]}
        />
        <h3 className="mt-6 text-lg font-black text-blue-950">
          Informações do novo simulado
        </h3>
        <p className="mt-1 text-sm text-blue-900">
          Primeiro salve o rascunho. Em seguida, você poderá escolher e
          organizar as questões.
        </p>
        <form action={createTeacherExam} className="mt-5 grid gap-4">
          <label className="text-sm font-bold text-slate-800">
            Nome do simulado
            <input
              name="title"
              required
              className={teacherField}
              placeholder="Ex.: Revisão de Cinemática"
            />
          </label>
          <label className="text-sm font-bold text-slate-800">
            Descrição{" "}
            <span className="font-normal text-slate-500">(opcional)</span>
            <textarea
              name="description"
              rows={3}
              className={teacherField}
              placeholder="Objetivo ou contexto do simulado"
            />
          </label>
          <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="is_shared"
              value="true"
              className="mt-1 size-4"
            />
            <span>Permitir que outros professores utilizem este simulado.</span>
          </label>
          <div>
            <button className={teacherButton}>Continuar para questões</button>
          </div>
        </form>
      </div>
    </section>
  );
}
