import { getTotalQuestions } from "@/data/question-index";
import { subjects } from "@/data/subjects";
import { concursoGroups, concursoSubjects, vestibularSubjects } from "@/lib/study-focus";

/*
 * Números e listas do banco usados em textos públicos (home, metadados, perfil).
 * Calculados a partir dos dados para não ficarem desatualizados a cada lote novo.
 */

const formatList = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;

export const BANK_QUESTIONS = getTotalQuestions();
export const BANK_QUESTIONS_LABEL = BANK_QUESTIONS.toLocaleString("pt-BR");
export const BANK_SUBJECTS = subjects.length;
export const VESTIBULAR_SUBJECTS = vestibularSubjects.length;
export const CONCURSO_SUBJECTS = concursoSubjects.length;
export const VESTIBULAR_AREAS_LABEL = formatList([...new Set(vestibularSubjects.map((subject) => subject.area))]);
export const CONCURSO_GROUPS_LABEL = formatList(concursoGroups().map((group) => group.name));
