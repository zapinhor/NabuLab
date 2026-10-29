/*
 * Meta do dia: um roteiro curto que dá para fazer em uns 5 minutos.
 *
 * 1. Questão do dia (não usa a cota do Free)
 * 2. Revisões que venceram hoje (revisão espaçada)
 * 3. Algumas questões novas
 * 4. Uma aula curta, só quando algum assunto errado tem aula no NabuLab
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

export type DailyGoalStep = { id: "question" | "review" | "practice" | "lesson"; label: string; detail: string; done: boolean; href: string };

export type DailyGoalLesson = { href: string; topic: string; readingMinutes: number };

export function buildDailyGoal({
  dailyQuestionDone,
  reviewsDue,
  questionsToday,
  lesson = null,
  lessonReadToday = false,
}: {
  dailyQuestionDone: boolean;
  reviewsDue: number;
  questionsToday: number;
  /** Aula de um assunto que a pessoa errou; sem ela, a meta fica com 3 passos. */
  lesson?: DailyGoalLesson | null;
  lessonReadToday?: boolean;
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
  if (lesson) {
    steps.push({
      id: "lesson",
      label: `Aula: ${lesson.topic}`,
      detail: lessonReadToday ? "Lida hoje" : `${lesson.readingMinutes} min, um assunto que você errou`,
      done: lessonReadToday,
      href: lesson.href,
    });
  }
  const completed = steps.filter((step) => step.done).length;
  return { steps, completed, total: steps.length, done: completed === steps.length, minutes: lesson ? 10 : 5 };
}
