"use client";

import { useActionState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { reportQuestion, type QuestionReportState } from "@/app/suporte/actions";
import { Icon } from "@/components/ui/icon";
import { QUESTION_PROBLEMS } from "@/lib/support/validation";

const field = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100";

export type ReportableQuestion = { id: string; subjectName?: string | null; topic?: string | null; subtopic?: string | null };

/**
 * "Encontrou algum problema na questão? Nos avise": abre um mini formulário que
 * vira um chamado de suporte, com matéria, tópico e subtópico já preenchidos.
 */
export function ReportQuestionButton({ question, className = "" }: { question: ReportableQuestion; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [state, action, pending] = useActionState<QuestionReportState, FormData>(reportQuestion, { status: "idle" });
  const formKey = `${question.id}-${state.status === "sent" ? state.message : ""}`;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === element) element.close();
    };
    element.addEventListener("click", onClick);
    return () => element.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 ${className}`}>
        <Icon name="bandeira" size={14} /> Reportar problema
      </button>
      <dialog ref={dialog} aria-labelledby={`report-${question.id}`} className="w-[min(32rem,calc(100vw-2rem))] rounded-2xl p-0 shadow-2xl backdrop:bg-slate-950/40">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={`report-${question.id}`} className="text-lg font-black text-[#0B2D6B]">Encontrou algum problema na questão?</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Nos avise. A equipe do NabuLab confere e corrige.</p>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Fechar">
              <Icon name="fechar" size={18} />
            </button>
          </div>

          {state.status === "sent" ? (
            <div className="mt-5">
              <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-900">{state.message}</p>
              <button type="button" onClick={() => dialog.current?.close()} className="mt-4 min-h-11 rounded-xl bg-[#0B2D6B] px-5 py-2 text-sm font-black text-white">Fechar</button>
            </div>
          ) : (
            <form key={formKey} action={action} className="mt-5 grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="question_id" value={question.id} />
              <input type="hidden" name="page_url" value={pathname ?? ""} />
              <label className="text-sm font-bold text-slate-800 sm:col-span-2">
                Qual é o problema?
                <select name="problem" required defaultValue="" className={field}>
                  <option value="" disabled>Escolha uma opção</option>
                  {Object.entries(QUESTION_PROBLEMS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="text-sm font-bold text-slate-800 sm:col-span-2">
                Matéria
                <input name="subject" defaultValue={question.subjectName ?? ""} maxLength={120} className={field} />
              </label>
              <label className="text-sm font-bold text-slate-800">
                Tópico
                <input name="topic" defaultValue={question.topic ?? ""} maxLength={120} className={field} />
              </label>
              <label className="text-sm font-bold text-slate-800">
                Subtópico
                <input name="subtopic" defaultValue={question.subtopic ?? ""} maxLength={120} className={field} />
              </label>
              <label className="text-sm font-bold text-slate-800 sm:col-span-2">
                O que você encontrou?
                <textarea name="details" required minLength={10} maxLength={2000} rows={4} className={field} placeholder="Ex.: a alternativa C também está correta porque…" />
              </label>
              <p className="text-xs leading-5 text-slate-500 sm:col-span-2">Código da questão: {question.id}. O aviso chega na caixa de suporte do NabuLab.</p>
              {state.status === "error" && <p role="alert" className="text-sm font-bold text-red-700 sm:col-span-2">{state.message}</p>}
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <button type="submit" disabled={pending} className="min-h-11 rounded-xl bg-[#0B2D6B] px-5 py-2 text-sm font-black text-white disabled:opacity-60">{pending ? "Enviando…" : "Enviar aviso"}</button>
                <button type="button" onClick={() => dialog.current?.close()} className="min-h-11 rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-700">Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
