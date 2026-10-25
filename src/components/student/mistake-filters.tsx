"use client";

import { Icon } from "@/components/ui/icon";
import type { ReviewPriority, ReviewQuestionStat } from "@/lib/review-queries";
import type { SubjectId } from "@/types/question";

export type MistakeStatus = "todas" | "errando" | "superadas";

export type MistakeFilterState = {
  subject: SubjectId | "todas";
  priority: ReviewPriority | "todas";
  status: MistakeStatus;
  search: string;
};

export const EMPTY_MISTAKE_FILTERS: MistakeFilterState = { subject: "todas", priority: "todas", status: "todas", search: "" };

function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Aplica os filtros mantendo a ordem de prioridade original. */
export function applyMistakeFilters(questions: ReviewQuestionStat[], filters: MistakeFilterState) {
  const term = normalize(filters.search.trim());
  return questions.filter((item) => {
    if (filters.subject !== "todas" && item.subject !== filters.subject) return false;
    if (filters.priority !== "todas" && item.priority !== filters.priority) return false;
    if (filters.status === "errando" && item.lastAttemptCorrect) return false;
    if (filters.status === "superadas" && !item.lastAttemptCorrect) return false;
    if (term && !normalize(`${item.question.statement} ${item.topic} ${item.subtopic} ${item.subjectName}`).includes(term)) return false;
    return true;
  });
}

export function hasActiveMistakeFilters(filters: MistakeFilterState) {
  return filters.subject !== "todas" || filters.priority !== "todas" || filters.status !== "todas" || filters.search.trim() !== "";
}

const chip = (active: boolean) =>
  `shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition ${active ? "border-[#0B2D6B] bg-[#0B2D6B] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#3B82F6] hover:text-[#0B2D6B]"}`;

/**
 * Filtros do "Meus erros": matéria, prioridade, situação (ainda errando ou
 * já acertou depois) e busca no enunciado. No celular, as fileiras deslizam.
 */
export function MistakeFilters({
  questions,
  filters,
  onChange,
  resultCount,
}: {
  questions: ReviewQuestionStat[];
  filters: MistakeFilterState;
  onChange: (next: MistakeFilterState) => void;
  resultCount: number;
}) {
  const subjects = [...questions.reduce((map, item) => {
    const current = map.get(item.subject);
    map.set(item.subject, { name: item.subjectName, count: (current?.count ?? 0) + 1 });
    return map;
  }, new Map<SubjectId, { name: string; count: number }>())].sort((a, b) => b[1].count - a[1].count);
  const stillWrong = questions.filter((item) => !item.lastAttemptCorrect).length;
  const set = (patch: Partial<MistakeFilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="mt-5 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4" aria-label="Filtrar erros">
      <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-blue-100">
        <Icon name="busca-vazia" size={16} className="text-slate-400" />
        <span className="sr-only">Buscar nos seus erros</span>
        <input
          type="search"
          value={filters.search}
          onChange={(event) => set({ search: event.target.value })}
          placeholder="Buscar por palavra, assunto ou matéria"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </label>

      <div>
        <p className="mb-1.5 text-[11px] font-black uppercase tracking-[.12em] text-slate-400">Matéria</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Matéria">
          <button type="button" className={chip(filters.subject === "todas")} aria-pressed={filters.subject === "todas"} onClick={() => set({ subject: "todas" })}>Todas ({questions.length})</button>
          {subjects.map(([id, info]) => (
            <button key={id} type="button" className={chip(filters.subject === id)} aria-pressed={filters.subject === id} onClick={() => set({ subject: id })}>
              {info.name} ({info.count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-[.12em] text-slate-400">Prioridade</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Prioridade">
            {([["todas", "Todas"], ["alta", "Alta"], ["media", "Média"], ["baixa", "Baixa"]] as const).map(([value, label]) => (
              <button key={value} type="button" className={chip(filters.priority === value)} aria-pressed={filters.priority === value} onClick={() => set({ priority: value })}>{label}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-[.12em] text-slate-400">Situação</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Situação">
            {([["todas", "Todas"], ["errando", `Ainda errando (${stillWrong})`], ["superadas", `Já acertei depois (${questions.length - stillWrong})`]] as const).map(([value, label]) => (
              <button key={value} type="button" className={chip(filters.status === value)} aria-pressed={filters.status === value} onClick={() => set({ status: value })}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-600" aria-live="polite">{resultCount} {resultCount === 1 ? "erro encontrado" : "erros encontrados"}</span>
        {hasActiveMistakeFilters(filters) && (
          <button type="button" onClick={() => onChange(EMPTY_MISTAKE_FILTERS)} className="font-bold text-[#3B82F6] hover:underline">Limpar filtros</button>
        )}
      </div>
    </div>
  );
}
