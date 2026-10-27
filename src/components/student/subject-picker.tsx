"use client";

import { Icon } from "@/components/ui/icon";
import type { SubjectInfo } from "@/data/subjects";
import {
  AVAILABLE_CATEGORIES,
  AVAILABLE_STUDY_FOCUSES,
  CATEGORY_LABELS,
  STUDY_FOCUS_LABELS,
  concursoGroups,
  focusCategory,
  subjectsInCategory,
  type StudyFocus,
  type SubjectCategory,
} from "@/lib/study-focus";
import type { SubjectId } from "@/types/question";

/*
 * Seleção de matérias do simulado em blocos bem separados por categoria:
 * Vestibular, Concursos, OAB e CNH (DETRAN). A pessoa pode marcar matérias de
 * várias categorias e misturar. O foco só decide a ordem e o que vem marcado.
 */

type Props = {
  selected: SubjectId[];
  focus: StudyFocus | null;
  onToggle: (id: SubjectId) => void;
  onSetMany: (ids: SubjectId[], selected: boolean) => void;
  onChangeFocus: (focus: StudyFocus) => void;
};

function SubjectCard({ subject, selected, onToggle, tag }: { subject: SubjectInfo; selected: boolean; onToggle: () => void; tag: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? "border-[#3B82F6] bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#3B82F6] shadow-sm" aria-hidden="true">
          <Icon name={subject.icon} size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`break-words text-sm font-bold ${selected ? "text-[#0B2D6B]" : "text-slate-800"}`}>{subject.name}</p>
          <p className="mt-1 break-words text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">{tag}</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">{subject.description}</p>
        </div>
        <div
          className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#0B2D6B] bg-[#0B2D6B] text-white" : "border-slate-300"}`}
          aria-hidden="true"
        >
          {selected && <Icon name="check" size={14} />}
        </div>
      </div>
    </button>
  );
}

const TONES: Record<SubjectCategory, { section: string; badge: string; icon: "materias" | "gestao-institucional" | "auditoria" | "atencao"; group: string }> = {
  vestibular: { section: "border-blue-100 bg-blue-50/40", badge: "bg-blue-100 text-[#0B2D6B]", icon: "materias", group: "text-[#0B2D6B]" },
  concursos: { section: "border-amber-200 bg-amber-50/40", badge: "bg-amber-100 text-amber-900", icon: "gestao-institucional", group: "text-amber-900" },
  oab: { section: "border-rose-200 bg-rose-50/40", badge: "bg-rose-100 text-rose-900", icon: "auditoria", group: "text-rose-900" },
  detran: { section: "border-emerald-200 bg-emerald-50/40", badge: "bg-emerald-100 text-emerald-900", icon: "atencao", group: "text-emerald-900" },
};

const DESCRIPTIONS: Record<SubjectCategory, string> = {
  vestibular: "ENEM, Fuvest, Unesp, Fatec, Etec e outros.",
  concursos: "Questões no estilo das bancas, separadas por concurso.",
  oab: "1ª fase do Exame de Ordem, no estilo da FGV.",
  detran: "Prova teórica para a CNH: leis, placas, direção defensiva e socorros.",
};

function BlockHeader({ title, description, count, total, onAll, onNone, tone }: {
  title: string; description: string; count: number; total: number; onAll: () => void; onNone: () => void; tone: SubjectCategory;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${TONES[tone].badge}`}>
          <Icon name={TONES[tone].icon} size={18} />
        </span>
        <div>
          <h3 className="text-base font-black text-slate-950">{title} <span className="text-sm font-bold text-slate-400">· {count} de {total}</span></h3>
          <p className="text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onAll} disabled={count === total} className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Marcar todas</button>
        <button type="button" onClick={onNone} disabled={count === 0} className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Desmarcar</button>
      </div>
    </div>
  );
}

export function SubjectPicker({ selected, focus, onToggle, onSetMany, onChangeFocus }: Props) {
  const isSelected = (id: SubjectId) => selected.includes(id);
  const counts = AVAILABLE_CATEGORIES.map((category) => subjectsInCategory(category).filter((subject) => isSelected(subject.id)).length);
  const mixing = counts.filter((count) => count > 0).length > 1;

  const block = (category: SubjectCategory) => {
    const list = subjectsInCategory(category);
    const ids = list.map((subject) => subject.id);
    const count = ids.filter(isSelected).length;
    const label = CATEGORY_LABELS[category];
    return (
      <section key={category} aria-label={`Matérias: ${label}`} className={`rounded-2xl border p-3 sm:p-4 ${TONES[category].section}`}>
        <BlockHeader
          title={label}
          description={DESCRIPTIONS[category]}
          count={count}
          total={ids.length}
          onAll={() => onSetMany(ids, true)}
          onNone={() => onSetMany(ids, false)}
          tone={category}
        />
        {category === "concursos" ? (
          <div className="mt-4 space-y-4">
            {concursoGroups().map((group) => {
              const groupIds = group.subjects.map((subject) => subject.id);
              const all = groupIds.every(isSelected);
              return (
                <div key={group.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className={`text-xs font-black uppercase tracking-[.14em] ${TONES.concursos.group}`}>{group.name}</p>
                    <button type="button" onClick={() => onSetMany(groupIds, !all)} className="rounded-lg px-2 py-1 text-xs font-bold text-[#3B82F6] hover:bg-white">
                      {all ? "Desmarcar grupo" : "Marcar grupo"}
                    </button>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    {group.subjects.map((subject) => (
                      <SubjectCard key={subject.id} subject={subject} selected={isSelected(subject.id)} onToggle={() => onToggle(subject.id)} tag={`Concurso · ${group.name}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {list.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} selected={isSelected(subject.id)} onToggle={() => onToggle(subject.id)} tag={category === "vestibular" ? subject.area : label} />
            ))}
          </div>
        )}
      </section>
    );
  };

  // O foco escolhido vem primeiro; as demais categorias seguem na ordem padrão.
  const first = focusCategory(focus);
  const order = first && AVAILABLE_CATEGORIES.includes(first) ? [first, ...AVAILABLE_CATEGORIES.filter((item) => item !== first)] : [...AVAILABLE_CATEGORIES];

  return (
    <div className="mt-5 space-y-4">
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-slate-600">Seu foco de estudo</p>
        <div className="flex flex-wrap gap-1 rounded-lg bg-white p-1" role="radiogroup" aria-label="Foco de estudo">
          {AVAILABLE_STUDY_FOCUSES.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={focus === option}
              onClick={() => onChangeFocus(option)}
              className={`min-h-9 rounded-md px-3 text-xs font-bold transition ${focus === option ? "bg-[#0B2D6B] text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {STUDY_FOCUS_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      {mixing && (
        <p role="status" className="flex items-start gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs leading-5 text-slate-600">
          <Icon name="misto" size={14} className="mt-0.5 shrink-0 text-[#3B82F6]" />
          Simulado misto: você marcou matérias de mais de uma área. As questões delas vão aparecer juntas.
        </p>
      )}

      {order.map((category) => block(category))}
    </div>
  );
}
