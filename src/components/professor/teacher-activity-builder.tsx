import { createClassActivity } from "@/app/turmas/actions";
import { teacherButton, teacherField, WizardSteps } from "./teacher-ui";

type PublishedExam = { id: string; title: string };

export function TeacherActivityBuilder({
  classId,
  exams,
}: {
  classId: string;
  exams: PublishedExam[];
}) {
  return (
    <details
      id="nova-atividade"
      className="scroll-mt-6 rounded-2xl bg-blue-50 p-5 sm:p-6"
    >
      <summary className="cursor-pointer text-lg font-black text-blue-950">
        Nova atividade
      </summary>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-900">
        Atividade é a aplicação de um simulado para esta turma. Configure quando
        e como os alunos poderão responder.
      </p>
      {exams.length === 0 ? (
        <div className="mt-5 rounded-xl bg-white p-5">
          <p className="font-black">
            Você precisa publicar um simulado primeiro.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Volte à área Professor, monte o simulado e publique antes de criar a
            atividade.
          </p>
          <a href="/professor#simulados" className={`${teacherButton} mt-4`}>
            Ir para simulados
          </a>
        </div>
      ) : (
        <form action={createClassActivity} className="mt-6 grid gap-7">
          <input type="hidden" name="class_id" value={classId} />
          <WizardSteps
            current={1}
            labels={["Simulado", "Configuração", "Revisar"]}
          />
          <fieldset className="grid gap-4 rounded-2xl bg-white p-5">
            <legend className="px-2 text-base font-black">
              1. Escolha o simulado
            </legend>
            <label className="text-sm font-bold">
              Simulado publicado
              <select name="exam_id" required className={teacherField}>
                <option value="">Selecione</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold">
              Título da atividade
              <input
                name="title"
                required
                className={teacherField}
                placeholder="Ex.: Revisão para a prova de sexta"
              />
            </label>
          </fieldset>
          <fieldset className="grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-2">
            <legend className="px-2 text-base font-black">
              2. Configure a aplicação
            </legend>
            <label className="text-sm font-bold">
              Início{" "}
              <span className="font-normal text-slate-500">(opcional)</span>
              <input
                type="datetime-local"
                name="available_from"
                className={teacherField}
              />
            </label>
            <label className="text-sm font-bold">
              Prazo{" "}
              <span className="font-normal text-slate-500">(opcional)</span>
              <input
                type="datetime-local"
                name="due_at"
                className={teacherField}
              />
            </label>
            <label className="text-sm font-bold">
              Número de tentativas
              <select
                name="max_attempts"
                defaultValue="1"
                className={teacherField}
              >
                <option value="1">1 tentativa</option>
                <option value="2">2 tentativas</option>
                <option value="3">3 tentativas</option>
                <option value="unlimited">Ilimitadas</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Liberação do gabarito
              <select
                name="answer_policy"
                defaultValue="never"
                className={teacherField}
              >
                <option value="immediate">Imediatamente</option>
                <option value="after_due">Após o prazo</option>
                <option value="never">Nunca</option>
              </select>
              <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
                Imediatamente: após concluir. Após o prazo: no encerramento.
                Nunca: registra a nota sem liberar respostas.
              </span>
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Instruções{" "}
              <span className="font-normal text-slate-500">(opcional)</span>
              <textarea name="instructions" rows={3} className={teacherField} />
            </label>
            <div className="grid gap-3 text-sm font-semibold sm:col-span-2 sm:grid-cols-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="shuffle_questions" value="true" />{" "}
                Embaralhar questões
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="shuffle_alternatives"
                  value="true"
                />{" "}
                Embaralhar alternativas
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="show_score"
                  value="true"
                  defaultChecked
                />{" "}
                Mostrar nota após envio
              </label>
            </div>
          </fieldset>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-white p-5">
            <div>
              <h4 className="font-black">3. Revise antes de publicar</h4>
              <p className="mt-1 text-sm text-slate-600">
                Confira simulado, prazo, tentativas e política de resultado
                acima.
              </p>
            </div>
            <button className={teacherButton}>Publicar atividade</button>
          </div>
        </form>
      )}
    </details>
  );
}
