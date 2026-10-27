/*
 * Meta do dia: um roteiro curto que dá para fazer em uns 5 minutos.
 *
 * 1. Questão do dia (não usa a cota do Free)
 * 2. Revisões que venceram hoje (revisão espaçada)
 * 3. Algumas questões novas
 *
 * O que é só deste aparelho (a resposta da questão do dia e se a meta já foi
 * comemorada) fica no localStorage; o resto vem do histórico de estudo.
 */

const DAILY_QUESTION_KEY = "nabulab_daily_question";
const GOAL_DONE_KEY = "nabulab_daily_goal_done";

/** Questões no dia para cumprir a meta (cabe na cota grátis de 10). */
export const DAILY_GOAL_QUESTIONS = 5;

export type DailyQuestionResult = { dateKey: string; questionId: string; choice: string; correct: boolean };

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* navegação privada */
  }
}

export function readDailyQuestionResult(dateKey: string): DailyQuestionResult | null {
  const result = read<DailyQuestionResult>(DAILY_QUESTION_KEY);
  return result && result.dateKey === dateKey ? result : null;
}

export function saveDailyQuestionResult(result: DailyQuestionResult) {
  write(DAILY_QUESTION_KEY, result);
}

/** Marca a meta como comemorada hoje; devolve true só na primeira vez do dia. */
export function markDailyGoalCelebrated(dateKey: string) {
  if (read<string>(GOAL_DONE_KEY) === dateKey) return false;
  write(GOAL_DONE_KEY, dateKey);
  return true;
}

export type DailyGoalStep = { id: "question" | "review" | "practice"; label: string; detail: string; done: boolean; href: string };

export function buildDailyGoal({
  dailyQuestionDone,
  reviewsDue,
  questionsToday,
}: {
  dailyQuestionDone: boolean;
  reviewsDue: number;
  questionsToday: number;
}) {
  const steps: DailyGoalStep[] = [
    {
      id: "question",
      label: "Questão do dia",
      detail: dailyQuestionDone ? "Feita" : "1 questão, não usa sua cota",
      done: dailyQuestionDone,
      href: "/questao-do-dia",
    },
    {
      id: "review",
      label: "Revisões de hoje",
      detail: reviewsDue === 0 ? "Nada vencendo hoje" : `${reviewsDue} ${reviewsDue === 1 ? "erro volta" : "erros voltam"} hoje`,
      done: reviewsDue === 0,
      href: "#revisar-hoje",
    },
    {
      id: "practice",
      label: `${DAILY_GOAL_QUESTIONS} questões no dia`,
      detail: `${Math.min(questionsToday, DAILY_GOAL_QUESTIONS)} de ${DAILY_GOAL_QUESTIONS}`,
      done: questionsToday >= DAILY_GOAL_QUESTIONS,
      href: "/simulado/novo",
    },
  ];
  const completed = steps.filter((step) => step.done).length;
  return { steps, completed, total: steps.length, done: completed === steps.length };
}
