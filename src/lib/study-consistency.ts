import { db } from "@/lib/db";

import type {
  StoredExam,
} from "@/types/storage";

/*
 * =========================================================
 * RESULTADO
 * =========================================================
 */

export interface StudyDay {
  dateKey: string;

  date: Date;

  exams: number;

  questions: number;

  correct: number;

  averageScore: number;
}

export interface StudyConsistency {
  currentStreak: number;

  longestStreak: number;

  totalStudyDays: number;

  studiedToday: boolean;

  examsToday: number;

  questionsToday: number;

  examsThisWeek: number;

  questionsThisWeek: number;

  correctThisWeek: number;

  accuracyThisWeek: number;

  activeDaysThisWeek: number;

  lastStudyDate:
    string | null;

  studyDays:
    StudyDay[];
}

/*
 * =========================================================
 * DATA LOCAL
 * =========================================================
 *
 * O histórico usa datas ISO.
 *
 * Aqui transformamos a data para o dia
 * LOCAL do navegador.
 *
 * Exemplo:
 *
 * 2026-09-05
 */

function getLocalDateKey(
  value: string | Date
) {
  const date =
    value instanceof Date
      ? value
      : new Date(value);

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;
}

/*
 * =========================================================
 * INÍCIO DO DIA
 * =========================================================
 */

function startOfDay(
  date: Date
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

/*
 * =========================================================
 * SOMAR / SUBTRAIR DIAS
 * =========================================================
 */

function addDays(
  date: Date,
  amount: number
) {
  const result =
    new Date(date);

  result.setDate(
    result.getDate() +
      amount
  );

  return result;
}

/*
 * =========================================================
 * DIFERENÇA ENTRE DIAS
 * =========================================================
 */

function differenceInDays(
  first: Date,
  second: Date
) {
  const firstDay =
    startOfDay(first)
      .getTime();

  const secondDay =
    startOfDay(second)
      .getTime();

  return Math.round(
    (
      firstDay -
      secondDay
    ) /
      86_400_000
  );
}

/*
 * =========================================================
 * INÍCIO DA SEMANA
 * =========================================================
 *
 * Consideramos:
 *
 * segunda-feira → domingo
 */

function getStartOfWeek(
  date: Date
) {
  const current =
    startOfDay(date);

  const day =
    current.getDay();

  /*
   * JS:
   *
   * domingo = 0
   * segunda = 1
   * ...
   */

  const distanceToMonday =
    day === 0
      ? 6
      : day - 1;

  return addDays(
    current,
    -distanceToMonday
  );
}

/*
 * =========================================================
 * AGRUPAR PROVAS POR DIA
 * =========================================================
 */

function buildStudyDays(
  exams: StoredExam[]
): StudyDay[] {
  const groups =
    new Map<
      string,
      StoredExam[]
    >();

  for (const exam of exams) {
    const key =
      getLocalDateKey(
        exam.submittedAt
      );

    const current =
      groups.get(key) ??
      [];

    current.push(
      exam
    );

    groups.set(
      key,
      current
    );
  }

  const days =
    Array.from(
      groups.entries()
    ).map(
      ([
        dateKey,
        dayExams,
      ]) => {
        const questions =
          dayExams.reduce(
            (
              accumulator,
              exam
            ) =>
              accumulator +
              exam.totalQuestions,
            0
          );

        const correct =
          dayExams.reduce(
            (
              accumulator,
              exam
            ) =>
              accumulator +
              exam.correct,
            0
          );

        const averageScore =
          dayExams.length ===
          0
            ? 0
            : Math.round(
                dayExams.reduce(
                  (
                    accumulator,
                    exam
                  ) =>
                    accumulator +
                    exam.percentage,
                  0
                ) /
                  dayExams.length
              );

        /*
         * 12:00 evita problemas
         * próximos a mudanças de horário.
         */

        const [
          year,
          month,
          day,
        ] =
          dateKey
            .split("-")
            .map(Number);

        return {
          dateKey,

          date:
            new Date(
              year,
              month - 1,
              day,
              12
            ),

          exams:
            dayExams.length,

          questions,

          correct,

          averageScore,
        };
      }
    );

  /*
   * Mais antigo → mais recente
   */

  return days.sort(
    (a, b) =>
      a.date.getTime() -
      b.date.getTime()
  );
}

/*
 * =========================================================
 * MAIOR STREAK
 * =========================================================
 */

function calculateLongestStreak(
  studyDays: StudyDay[]
) {
  if (
    studyDays.length ===
    0
  ) {
    return 0;
  }

  let longest = 1;

  let current = 1;

  for (
    let index = 1;
    index <
    studyDays.length;
    index++
  ) {
    const previous =
      studyDays[
        index - 1
      ];

    const currentDay =
      studyDays[
        index
      ];

    const difference =
      differenceInDays(
        currentDay.date,
        previous.date
      );

    if (
      difference === 1
    ) {
      current++;

      longest =
        Math.max(
          longest,
          current
        );
    } else {
      current = 1;
    }
  }

  return longest;
}

/*
 * =========================================================
 * STREAK ATUAL
 * =========================================================
 *
 * Regra:
 *
 * Se estudou hoje:
 * contamos até hoje.
 *
 * Se ainda não estudou hoje, mas estudou
 * ontem:
 * a sequência ainda está viva.
 *
 * Se o último estudo foi antes de ontem:
 * streak = 0.
 */

function calculateCurrentStreak(
  studyDays: StudyDay[],
  today: Date
) {
  if (
    studyDays.length ===
    0
  ) {
    return 0;
  }

  const lastDay =
    studyDays[
      studyDays.length - 1
    ];

  const distanceFromToday =
    differenceInDays(
      today,
      lastDay.date
    );

  /*
   * Mais de um dia sem estudar
   * encerra a sequência.
   */

  if (
    distanceFromToday >
    1
  ) {
    return 0;
  }

  let streak = 1;

  for (
    let index =
      studyDays.length - 1;
    index > 0;
    index--
  ) {
    const current =
      studyDays[
        index
      ];

    const previous =
      studyDays[
        index - 1
      ];

    const difference =
      differenceInDays(
        current.date,
        previous.date
      );

    if (
      difference !== 1
    ) {
      break;
    }

    streak++;
  }

  return streak;
}

/*
 * =========================================================
 * CONSULTA PRINCIPAL
 * =========================================================
 */

export async function getStudyConsistency(): Promise<StudyConsistency> {
  const exams =
    await db.exams.toArray();

  const studyDays =
    buildStudyDays(
      exams
    );

  const now =
    new Date();

  const today =
    startOfDay(
      now
    );

  const todayKey =
    getLocalDateKey(
      today
    );

  const todayData =
    studyDays.find(
      (day) =>
        day.dateKey ===
        todayKey
    );

  /*
   * =======================================================
   * SEMANA ATUAL
   * =======================================================
   */

  const startOfWeek =
    getStartOfWeek(
      today
    );

  const endOfWeek =
    addDays(
      startOfWeek,
      7
    );

  const weekDays =
    studyDays.filter(
      (day) =>
        day.date >=
          startOfWeek &&
        day.date <
          endOfWeek
    );

  const examsThisWeek =
    weekDays.reduce(
      (
        accumulator,
        day
      ) =>
        accumulator +
        day.exams,
      0
    );

  const questionsThisWeek =
    weekDays.reduce(
      (
        accumulator,
        day
      ) =>
        accumulator +
        day.questions,
      0
    );

  const correctThisWeek =
    weekDays.reduce(
      (
        accumulator,
        day
      ) =>
        accumulator +
        day.correct,
      0
    );

  const accuracyThisWeek =
    questionsThisWeek ===
    0
      ? 0
      : Math.round(
          (
            correctThisWeek /
            questionsThisWeek
          ) *
            100
        );

  /*
   * =======================================================
   * ÚLTIMO DIA
   * =======================================================
   */

  const lastStudyDay =
    studyDays[
      studyDays.length - 1
    ];

  return {
    currentStreak:
      calculateCurrentStreak(
        studyDays,
        today
      ),

    longestStreak:
      calculateLongestStreak(
        studyDays
      ),

    totalStudyDays:
      studyDays.length,

    studiedToday:
      Boolean(
        todayData
      ),

    examsToday:
      todayData?.exams ??
      0,

    questionsToday:
      todayData
        ?.questions ??
      0,

    examsThisWeek,

    questionsThisWeek,

    correctThisWeek,

    accuracyThisWeek,

    activeDaysThisWeek:
      weekDays.length,

    lastStudyDate:
      lastStudyDay
        ?.dateKey ??
      null,

    studyDays,
  };
}