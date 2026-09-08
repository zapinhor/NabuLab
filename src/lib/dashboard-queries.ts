import { db } from "@/lib/db";
import { subjects } from "@/data/subjects";

import type {
  StoredExam,
} from "@/types/storage";

import type {
  SubjectId,
} from "@/types/question";

export interface DashboardSubjectStats {
  id: SubjectId;

  name: string;

  area: string;

  icon: string;

  totalQuestions: number;

  correct: number;

  incorrect: number;

  percentage: number;
}

export interface DashboardEvolutionPoint {
  examId: string;

  examNumber: number;

  percentage: number;

  correct: number;

  totalQuestions: number;

  submittedAt: string;

  dateLabel: string;
}

export interface DashboardData {
  totalExams: number;

  averageScore: number;

  bestScore: number;

  totalQuestions: number;

  totalCorrect: number;

  overallAccuracy: number;

  subjectStats: DashboardSubjectStats[];

  recentExams: StoredExam[];

  evolution: DashboardEvolutionPoint[];
}

/*
 * =========================================================
 * DATA CURTA PARA O GRÁFICO
 * =========================================================
 */

function formatShortDate(
  value: string
) {
  const date =
    new Date(value);

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    }
  ).format(date);
}

/*
 * =========================================================
 * DASHBOARD
 * =========================================================
 */

export async function getDashboardData(): Promise<DashboardData> {
  const [
    exams,
    answers,
  ] = await Promise.all([
    db.exams.toArray(),
    db.answers.toArray(),
  ]);

  /*
   * =======================================================
   * ESTATÍSTICAS GERAIS
   * =======================================================
   */

  const totalExams =
    exams.length;

  const totalQuestions =
    exams.reduce(
      (
        accumulator,
        exam
      ) =>
        accumulator +
        exam.totalQuestions,
      0
    );

  const totalCorrect =
    exams.reduce(
      (
        accumulator,
        exam
      ) =>
        accumulator +
        exam.correct,
      0
    );

  const averageScore =
    totalExams === 0
      ? 0
      : Math.round(
          exams.reduce(
            (
              accumulator,
              exam
            ) =>
              accumulator +
              exam.percentage,
            0
          ) /
            totalExams
        );

  const bestScore =
    totalExams === 0
      ? 0
      : Math.max(
          ...exams.map(
            (exam) =>
              exam.percentage
          )
        );

  const overallAccuracy =
    totalQuestions === 0
      ? 0
      : Math.round(
          (totalCorrect /
            totalQuestions) *
            100
        );

  /*
   * =======================================================
   * ESTATÍSTICAS POR MATÉRIA
   * =======================================================
   */

  const subjectStats =
    subjects.map(
      (
        subject
      ): DashboardSubjectStats => {
        const subjectAnswers =
          answers.filter(
            (answer) =>
              answer.subject ===
              subject.id
          );

        const total =
          subjectAnswers.length;

        const correct =
          subjectAnswers.filter(
            (answer) =>
              answer.isCorrect
          ).length;

        const incorrect =
          total - correct;

        const percentage =
          total === 0
            ? 0
            : Math.round(
                (correct /
                  total) *
                  100
              );

        return {
          id:
            subject.id,

          name:
            subject.name,

          area:
            subject.area,

          icon:
            subject.icon,

          totalQuestions:
            total,

          correct,

          incorrect,

          percentage,
        };
      }
    );

  /*
   * =======================================================
   * ORDENAR PROVAS
   * =======================================================
   */

  const examsNewestFirst =
    [...exams].sort(
      (
        a,
        b
      ) =>
        new Date(
          b.submittedAt
        ).getTime() -
        new Date(
          a.submittedAt
        ).getTime()
    );

  const examsOldestFirst =
    [...exams].sort(
      (
        a,
        b
      ) =>
        new Date(
          a.submittedAt
        ).getTime() -
        new Date(
          b.submittedAt
        ).getTime()
    );

  /*
   * =======================================================
   * ÚLTIMAS PROVAS
   * =======================================================
   */

  const recentExams =
    examsNewestFirst.slice(
      0,
      3
    );

  /*
   * =======================================================
   * EVOLUÇÃO
   * =======================================================
   */

  const evolution:
    DashboardEvolutionPoint[] =
    examsOldestFirst.map(
      (
        exam,
        index
      ) => ({
        examId:
          exam.id,

        examNumber:
          index + 1,

        percentage:
          exam.percentage,

        correct:
          exam.correct,

        totalQuestions:
          exam.totalQuestions,

        submittedAt:
          exam.submittedAt,

        dateLabel:
          formatShortDate(
            exam.submittedAt
          ),
      })
    );

  return {
    totalExams,

    averageScore,

    bestScore,

    totalQuestions,

    totalCorrect,

    overallAccuracy,

    subjectStats,

    recentExams,

    evolution,
  };
}