import { subjects, type SubjectInfo } from "@/data/subjects";
import type { SubjectId } from "@/types/question";

/*
 * Categorias de estudo e foco escolhido no cadastro (ou depois, na criação
 * de simulado). O foco só orienta o que aparece primeiro e o que vem
 * pré-selecionado: qualquer conta pode montar simulados misturando categorias.
 */

export const SUBJECT_CATEGORIES = ["vestibular", "concursos", "oab", "detran"] as const;
export type SubjectCategory = (typeof SUBJECT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<SubjectCategory, string> = {
  vestibular: "Vestibular",
  concursos: "Concursos",
  oab: "OAB",
  detran: "CNH (DETRAN)",
};

/** Complemento do título das páginas públicas: "Questões de X para …". */
export const CATEGORY_AUDIENCE: Record<SubjectCategory, string> = {
  vestibular: "vestibulares",
  concursos: "concursos",
  oab: "o Exame da OAB",
  detran: "a prova teórica do DETRAN",
};

export function subjectCategory(subject: Pick<SubjectInfo, "area">): SubjectCategory {
  if (subject.area.startsWith("Concursos")) return "concursos";
  if (subject.area === "OAB") return "oab";
  if (subject.area === "DETRAN") return "detran";
  return "vestibular";
}

export function subjectsInCategory(category: SubjectCategory) {
  return subjects.filter((subject) => subjectCategory(subject) === category);
}

/** Categorias que já têm matérias no banco, na ordem padrão. */
export const AVAILABLE_CATEGORIES = SUBJECT_CATEGORIES.filter((category) => subjectsInCategory(category).length > 0);

export function isConcursoSubject(subject: Pick<SubjectInfo, "area">) {
  return subjectCategory(subject) === "concursos";
}

export const vestibularSubjects = subjectsInCategory("vestibular");
export const concursoSubjects = subjectsInCategory("concursos");
export const oabSubjects = subjectsInCategory("oab");
export const detranSubjects = subjectsInCategory("detran");

/** Concursos agrupados pela área ("Concursos Bancários" → "Bancários"), na ordem do catálogo. */
export function concursoGroups() {
  const groups = new Map<string, SubjectInfo[]>();
  for (const subject of concursoSubjects) {
    const name = subject.area.replace(/^Concursos\s+/, "");
    groups.set(name, [...(groups.get(name) ?? []), subject]);
  }
  return [...groups.entries()].map(([name, items]) => ({ name, subjects: items }));
}

export const STUDY_FOCUSES = ["vestibular", "concursos", "oab", "detran", "ambos"] as const;
export type StudyFocus = (typeof STUDY_FOCUSES)[number];

export function isStudyFocus(value: unknown): value is StudyFocus {
  return typeof value === "string" && STUDY_FOCUSES.includes(value as StudyFocus);
}

export const STUDY_FOCUS_LABELS: Record<StudyFocus, string> = {
  vestibular: "Vestibular",
  concursos: "Concursos",
  oab: "OAB",
  detran: "CNH",
  ambos: "Vários",
};

/** Focos que fazem sentido hoje (só categorias com matérias, mais "Vários"). */
export const AVAILABLE_STUDY_FOCUSES: StudyFocus[] = [...AVAILABLE_CATEGORIES, "ambos"];

/** Categoria principal de um foco (null para "Vários"). */
export function focusCategory(focus: StudyFocus | null | undefined): SubjectCategory | null {
  return focus && focus !== "ambos" ? focus : null;
}

/** Matérias que já vêm marcadas no simulado conforme o foco. Sem foco, vale o padrão antigo (vestibular). */
export function defaultSubjectsForFocus(focus: StudyFocus | null): SubjectId[] {
  if (focus === "ambos") return subjects.map((subject) => subject.id);
  const category = focusCategory(focus) ?? "vestibular";
  const list = subjectsInCategory(category);
  return (list.length ? list : vestibularSubjects).map((subject) => subject.id);
}
