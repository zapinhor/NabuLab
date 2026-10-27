import "server-only";

import { getPublicQuestionPool, type GuestQuestion } from "@/lib/content/guest-quiz";
import { AVAILABLE_CATEGORIES, focusCategory, subjectCategory, type StudyFocus, type SubjectCategory } from "@/lib/study-focus";
import { subjects } from "@/data/subjects";
import { daysBetweenKeys } from "@/lib/streak";

/*
 * Questão do dia: a mesma para todo mundo no mesmo foco e no mesmo dia
 * (horário de Brasília). Vem só das questões que já são públicas nas páginas
 * de assunto, então nada novo do banco fica exposto. Não usa a cota do Free.
 */

export type DailyQuestionFocus = SubjectCategory;

const categoryOf = new Map<string, SubjectCategory>(subjects.map((subject) => [subject.id, subjectCategory(subject)]));

export function isDailyQuestionFocus(value: unknown): value is DailyQuestionFocus {
  return typeof value === "string" && (AVAILABLE_CATEGORIES as readonly string[]).includes(value);
}
const EPOCH = "2026-01-01";

function poolFor(focus: DailyQuestionFocus) {
  return getPublicQuestionPool()
    .filter((question) => categoryOf.get(question.subject) === focus)
    .filter((question) => question.difficulty !== "avancado")
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Passo co-primo com o tamanho do pool: percorre todas antes de repetir, sem ficar na mesma matéria. */
function stepFor(size: number) {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  let step = Math.max(1, Math.floor(size * 0.618));
  while (gcd(step, size) !== 1) step += 1;
  return step;
}

export function getDailyQuestion(focus: DailyQuestionFocus, dateKey: string): GuestQuestion | null {
  const pool = poolFor(focus);
  if (!pool.length) return null;
  const day = Math.max(0, daysBetweenKeys(dateKey, EPOCH));
  const index = (day * stepFor(pool.length)) % pool.length;
  return pool[index];
}

/** Foco único usa a própria categoria; "Vários" alterna entre as categorias, um dia cada. */
export function dailyFocusFor(studyFocus: StudyFocus | null | undefined, dateKey: string): DailyQuestionFocus {
  const category = focusCategory(studyFocus);
  if (category && AVAILABLE_CATEGORIES.includes(category)) return category;
  if (studyFocus === "ambos") return AVAILABLE_CATEGORIES[daysBetweenKeys(dateKey, EPOCH) % AVAILABLE_CATEGORIES.length];
  return "vestibular";
}
