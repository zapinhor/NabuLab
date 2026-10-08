import {
  createTeacherQuestion,
  duplicateTeacherQuestion,
  setTeacherQuestionArchived,
  updateTeacherQuestion,
} from "@/app/turmas/actions";
import {
  EmptyTeacherState,
  teacherButton,
  teacherCard,
  teacherField,
  teacherSecondaryButton,
} from "./teacher-ui";

export type TeacherQuestionView = {
  id: string;
  statement: string;
  alternatives: unknown;
  correct_answer: unknown;
  explanation: string | null;
  subject: string | null;
  topic: string | null;
  difficulty: string | null;
  question_type: string;
  visibility: string;
  updated_at: string;
  archived_at: string | null;
};

function answerText(value: unknown) {
  return typeof value === "string" ? value : String(value ?? "");
}
function alternativesText(value: unknown) {
  return Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .join("\n")
    : "";
}
const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  medio: "Médio",
  avancado: "Avançado",
};

function QuestionForm({ question }: { question?: TeacherQuestionView }) {
  const editing = Boolean(question);
  return (
    <form
      action={editing ? updateTeacherQuestion : createTeacherQuestion}
      className="grid gap-5 md:grid-cols-2"
    >
      {question && (
        <input type="hidden" name="question_id" value={question.id} />
      )}
      <label className="text-sm font-bold text-slate-800 md:col-span-2">
        1. Enunciado
        <textarea
          name="statement"
          required
          minLength={5}
          defaultValue={question?.statement}
          rows={4}
          className={teacherField}
          placeholder="Escreva a pergunta de forma completa e objetiva."
        />
      </label>
      <label className="text-sm font-bold text-slate-800">
        Tipo
        <select
          name="question_type"
          defaultValue={question?.question_type ?? "multiple_choice"}
          className={teacherField}
        >
          <option value="multiple_choice">Múltipla escolha</option>
          <option value="true_false">Verdadeiro ou falso</option>
        </select>
      </label>
      <label className="text-sm font-bold text-slate-800">
        Visibilidade
        <select
          name="visibility"
          defaultValue={question?.visibility ?? "private"}
          className={teacherField}
        >
          <option value="private">Privada</option>
          <option value="shared">Compartilhada com professores</option>
        </select>
      </label>
      <label className="text-sm font-bold text-slate-800 md:col-span-2">
        2. Alternativas
        <textarea
          name="alternatives"
          defaultValue={
            question ? alternativesText(question.alternatives) : undefined
          }
          rows={5}
          className={teacherField}
          placeholder={
            "Uma alternativa por linha\nAlternativa A\nAlternativa B"
          }
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">
          Para V/F, este campo pode ficar vazio.
        </span>
      </label>
      <label className="text-sm font-bold text-slate-800 md:col-span-2">
        3. Resposta correta
        <input
          name="correct_answer"
          required
          defaultValue={
            question ? answerText(question.correct_answer) : undefined
          }
          className={teacherField}
          placeholder="Copie exatamente a alternativa correta ou use Verdadeiro/Falso"
        />
      </label>
      <label className="text-sm font-bold text-slate-800">
        4. Matéria
        <input
          name="subject"
          defaultValue={question?.subject ?? ""}
          className={teacherField}
          placeholder="Ex.: Matemática"
        />
      </label>
      <label className="text-sm font-bold text-slate-800">
        5. Assunto
        <input
          name="topic"
          defaultValue={question?.topic ?? ""}
          className={teacherField}
          placeholder="Ex.: Funções"
        />
      </label>
      <label className="text-sm font-bold text-slate-800">
        6. Dificuldade
        <select
          name="difficulty"
          defaultValue={question?.difficulty ?? "iniciante"}
          className={teacherField}
        >
          <option value="iniciante">Iniciante</option>
          <option value="medio">Médio</option>
          <option value="avancado">Avançado</option>
        </select>
      </label>
      <label className="text-sm font-bold text-slate-800 md:col-span-2">
        Explicação
        <textarea
          name="explanation"
          defaultValue={question?.explanation ?? ""}
          rows={3}
          className={teacherField}
          placeholder="Explique por que a resposta está correta."
        />
      </label>
      <div className="md:col-span-2">
        <button className={teacherButton}>
          {editing ? "Salvar alterações" : "Salvar questão"}
        </button>
      </div>
    </form>
  );
}

export function TeacherQuestionLibrary({
  questions,
  filters,
  subjects,
}: {
  questions: TeacherQuestionView[];
  filters: Record<string, string | undefined>;
  subjects: string[];
}) {
  return (
    <section id="questoes" className={`${teacherCard} scroll-mt-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Biblioteca de questões
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Questões são conteúdos reutilizáveis. Uma mesma questão pode entrar
            em diferentes simulados.
          </p>
        </div>
        <a href="#nova-questao" className={teacherButton}>
          Nova questão
        </a>
      </div>
      <form className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-6">
        <label className="text-xs font-bold text-slate-600 sm:col-span-2">
          Busca
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Enunciado, matéria ou assunto"
            className={teacherField}
          />
        </label>
        <label className="text-xs font-bold text-slate-600">
          Matéria
          <select
            name="subject"
            defaultValue={filters.subject ?? ""}
            className={teacherField}
          >
            <option value="">Todas</option>
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600">
          Dificuldade
          <select
            name="difficulty"
            defaultValue={filters.difficulty ?? ""}
            className={teacherField}
          >
            <option value="">Todas</option>
            <option value="iniciante">Iniciante</option>
            <option value="medio">Médio</option>
            <option value="avancado">Avançado</option>
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600">
          Tipo
          <select
            name="type"
            defaultValue={filters.type ?? ""}
            className={teacherField}
          >
            <option value="">Todos</option>
            <option value="multiple_choice">Múltipla escolha</option>
            <option value="true_false">V/F</option>
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600">
          Status
          <select
            name="status"
            defaultValue={filters.status ?? "active"}
            className={teacherField}
          >
            <option value="active">Ativas</option>
            <option value="archived">Arquivadas</option>
          </select>
        </label>
        <button
          className={`${teacherSecondaryButton} sm:col-span-2 lg:col-span-6 lg:justify-self-end`}
        >
          Aplicar filtros
        </button>
      </form>
      <div className="mt-5 space-y-3">
        {questions.map((question) => (
          <article
            key={question.id}
            className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="line-clamp-2 font-bold text-slate-950">
                  {question.statement}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  <span>{question.subject || "Sem matéria"}</span>
                  <span aria-hidden="true">·</span>
                  <span>{question.topic || "Sem assunto"}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {difficultyLabel[question.difficulty ?? ""] ?? "Sem nível"}
                  </span>
                </div>
              </div>
              <details className="relative shrink-0">
                <summary
                  className={`${teacherSecondaryButton} cursor-pointer list-none`}
                >
                  Mais ações
                </summary>
                <div className="mt-2 grid min-w-48 gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:absolute sm:right-0 sm:z-10">
                  {!question.archived_at && (
                    <a
                      href={`#editar-${question.id}`}
                      className="rounded-lg px-3 py-2 text-sm font-bold hover:bg-slate-100"
                    >
                      Editar
                    </a>
                  )}
                  <form action={duplicateTeacherQuestion}>
                    <input
                      type="hidden"
                      name="question_id"
                      value={question.id}
                    />
                    <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-slate-100">
                      Duplicar
                    </button>
                  </form>
                  <form action={setTeacherQuestionArchived}>
                    <input
                      type="hidden"
                      name="question_id"
                      value={question.id}
                    />
                    <input
                      type="hidden"
                      name="archived"
                      value={question.archived_at ? "false" : "true"}
                    />
                    <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-slate-100">
                      {question.archived_at ? "Restaurar" : "Arquivar"}
                    </button>
                  </form>
                </div>
              </details>
            </div>
            {!question.archived_at && (
              <details
                id={`editar-${question.id}`}
                className="mt-4 border-t border-slate-100 pt-4"
              >
                <summary className="cursor-pointer text-sm font-bold text-blue-700">
                  Editar questão
                </summary>
                <div className="mt-5">
                  <QuestionForm question={question} />
                </div>
              </details>
            )}
          </article>
        ))}
        {questions.length === 0 && (
          <EmptyTeacherState
            title="Sua biblioteca ainda está vazia"
            description="Crie questões para reutilizar em diferentes simulados."
            action="Criar primeira questão"
            href="#nova-questao"
          />
        )}
      </div>
      <details
        id="nova-questao"
        className="mt-6 scroll-mt-6 rounded-2xl bg-blue-50 p-5 sm:p-6"
        open={questions.length === 0}
      >
        <summary className="cursor-pointer text-lg font-black text-blue-950">
          Criar nova questão
        </summary>
        <p className="mt-2 text-sm text-blue-900">
          Preencha na ordem abaixo. A questão ficará disponível na sua
          biblioteca após salvar.
        </p>
        <div className="mt-6">
          <QuestionForm />
        </div>
      </details>
    </section>
  );
}
