import { subjects, type SubjectInfo } from "@/data/subjects";
import type { SubjectId } from "@/types/question";

/*
 * Foco de estudo escolhido no cadastro (ou depois, na criação de simulado).
 * Só orienta o que aparece primeiro e o que vem pré-selecionado: qualquer
 * conta pode montar simulados misturando vestibular e concursos.
 */

export const STUDY_FOCUSES = ["vestibular", "concursos", "ambos"] as const;
export type StudyFocus = (typeof STUDY_FOCUSES)[number];

export function isStudyFocus(value: unknown): value is StudyFocus {
  return typeof value === "string" && STUDY_FOCUSES.includes(value as StudyFocus);
}

export const STUDY_FOCUS_LABELS: Record<StudyFocus, string> = {
  vestibular: "Vestibular",
  concursos: "Concursos",
  ambos: "Os dois",
};

export function isConcursoSubject(subject: Pick<SubjectInfo, "area">) {
  return subject.area.startsWith("Concursos");
}

export const vestibularSubjects = subjects.filter((subject) => !isConcursoSubject(subject));
export const concursoSubjects = subjects.filter(isConcursoSubject);

/** Concursos agrupados pela área ("Concursos Bancários" → "Bancários"), na ordem do catálogo. */
export function concursoGroups() {
  const groups = new Map<string, SubjectInfo[]>();
  for (const subject of concursoSubjects) {
    const name = subject.area.replace(/^Concursos\s+/, "");
    groups.set(name, [...(groups.get(name) ?? []), subject]);
  }
  return [...groups.entries()].map(([name, items]) => ({ name, subjects: items }));
}

/** Matérias que já vêm marcadas no simulado conforme o foco. Sem foco, vale o padrão antigo (vestibular). */
export function defaultSubjectsForFocus(focus: StudyFocus | null): SubjectId[] {
  if (focus === "concursos") return concursoSubjects.map((subject) => subject.id);
  if (focus === "ambos") return subjects.map((subject) => subject.id);
  return vestibularSubjects.map((subject) => subject.id);
}
