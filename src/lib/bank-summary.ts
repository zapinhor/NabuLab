import { getTotalQuestions } from "@/data/question-index";
import { subjects } from "@/data/subjects";
import { AVAILABLE_CATEGORIES, CATEGORY_LABELS, concursoGroups, concursoSubjects, subjectsInCategory, vestibularSubjects, type SubjectCategory } from "@/lib/study-focus";

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

/** Para quem é o NabuLab, no plural: "vestibulares, concursos e a prova do DETRAN". */
const AUDIENCE_PLURAL: Record<SubjectCategory, string> = {
  vestibular: "vestibulares",
  concursos: "concursos",
  oab: "o Exame da OAB",
  detran: "a prova do DETRAN",
};
export const AUDIENCE_LABEL = formatList(AVAILABLE_CATEGORIES.map((category) => AUDIENCE_PLURAL[category]));

/** Versão curta para títulos e selos: "Vestibulares, concursos e CNH". */
const AUDIENCE_SHORT: Record<SubjectCategory, string> = { vestibular: "vestibulares", concursos: "concursos", oab: "OAB", detran: "CNH" };
const short = formatList(AVAILABLE_CATEGORIES.map((category) => AUDIENCE_SHORT[category]));
export const AUDIENCE_SHORT_LABEL = short.charAt(0).toUpperCase() + short.slice(1);

/** "17 de vestibular (…), 10 de concursos (…), 5 da CNH (DETRAN)". */
export const CATEGORY_BREAKDOWN_LABEL = formatList(
  AVAILABLE_CATEGORIES.map((category) => {
    const count = subjectsInCategory(category).length;
    if (category === "vestibular") return `${count} de vestibular (${VESTIBULAR_AREAS_LABEL})`;
    if (category === "concursos") return `${count} de concursos (${CONCURSO_GROUPS_LABEL})`;
    return `${count} da ${CATEGORY_LABELS[category]}`;
  }),
);
