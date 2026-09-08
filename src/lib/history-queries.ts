import { db } from "@/lib/db";

import {
  normalizeExamMode,
} from "@/lib/exam-mode";

import type {
  ExamMode,
} from "@/types/exam";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

/*
 * =========================================================
 * ESTATÍSTICAS DE UMA MODALIDADE
 * =========================================================
 */

export interface ExamModeStats {
  mode: ExamMode;

  totalExams: number;

  totalQuestions: number;

  totalCorrect: number;

  averageScore: number;

  bestScore: number;

  accuracy: number;
}

/*
 * =========================================================
 * COMPARAÇÃO ENTRE MODALIDADES
 * =========================================================
 */

export interface ExamModeComparison {
  reviewVsManual:
    number | null;

  recommendedVsManual:
    number | null;

  recommendedVsReview:
    number | null;
}

/*
 * =========================================================
 * RESUMO DO HISTÓRICO
 * =========================================================
 */

export interface ExamHistoryOverview {
  exams: StoredExam[];

  totalExams: number;

  totalQuestions: number;

  totalCorrect: number;

  averageScore: number;

  overallAccuracy: number;

  bestScore: number;

  manual:
    ExamModeStats;

  review:
    ExamModeStats;

  recommended:
    ExamModeStats;

  comparison:
    ExamModeComparison;
}

/*
 * =========================================================
 * ESTATÍSTICAS DE MODALIDADE
 * =========================================================
 */

function buildModeStats(
  exams: StoredExam[],
  mode: ExamMode
): ExamModeStats {
  const selected =
    exams.filter(
      (exam) =>
        normalizeExamMode(
          exam.mode
        ) === mode
    );

  const totalExams =
    selected.length;

  const totalQuestions =
    selected.reduce(
      (
        accumulator,
        exam
      ) =>
        accumulator +
        exam.totalQuestions,
      0
    );

  const totalCorrect =
    selected.reduce(
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
          selected.reduce(
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
          ...selected.map(
            (exam) =>
              exam.percentage
          )
        );

  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round(
          (
            totalCorrect /
            totalQuestions
          ) *
            100
        );

  return {
    mode,

    totalExams,

    totalQuestions,

    totalCorrect,

    averageScore,

    bestScore,

    accuracy,
  };
}

/*
 * =========================================================
 * DIFERENÇA ENTRE MÉDIAS
 * =========================================================
 */

function compareScores(
  first:
    ExamModeStats,
  second:
    ExamModeStats
): number | null {
  if (
    first.totalExams === 0 ||
    second.totalExams === 0
  ) {
    return null;
  }

  return (
    first.averageScore -
    second.averageScore
  );
}

/*
 * =========================================================
 * HISTÓRICO SIMPLES
 * =========================================================
 */

export async function getExamHistory(): Promise<
  StoredExam[]
> {
  const exams =
    await db.exams.toArray();

  return exams.sort(
    (a, b) =>
      new Date(
        b.submittedAt
      ).getTime() -
      new Date(
        a.submittedAt
      ).getTime()
  );
}

/*
 * =========================================================
 * RESUMO COMPLETO
 * =========================================================
 */

export async function getExamHistoryOverview(): Promise<ExamHistoryOverview> {
  const exams =
    await getExamHistory();

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

  const overallAccuracy =
    totalQuestions === 0
      ? 0
      : Math.round(
          (
            totalCorrect /
            totalQuestions
          ) *
            100
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

  /*
   * =======================================================
   * MODALIDADES
   * =======================================================
   */

  const manual =
    buildModeStats(
      exams,
      "manual"
    );

  const review =
    buildModeStats(
      exams,
      "review"
    );

  const recommended =
    buildModeStats(
      exams,
      "recommended"
    );

  /*
   * =======================================================
   * COMPARAÇÕES
   * =======================================================
   */

  const comparison:
    ExamModeComparison = {
    reviewVsManual:
      compareScores(
        review,
        manual
      ),

    recommendedVsManual:
      compareScores(
        recommended,
        manual
      ),

    recommendedVsReview:
      compareScores(
        recommended,
        review
      ),
  };

  return {
    exams,

    totalExams,

    totalQuestions,

    totalCorrect,

    averageScore,

    overallAccuracy,

    bestScore,

    manual,

    review,

    recommended,

    comparison,
  };
}

/*
 * =========================================================
 * PROVA PELO ID
 * =========================================================
 */

export async function getExamById(
  examId: string
): Promise<
  StoredExam | undefined
> {
  return db.exams.get(
    examId
  );
}

/*
 * =========================================================
 * RESPOSTAS DA PROVA
 * =========================================================
 */

export async function getExamAnswers(
  examId: string
): Promise<
  StoredAnswer[]
> {
  return db.answers
    .where(
      "examId"
    )
    .equals(
      examId
    )
    .toArray();
}

/*
 * =========================================================
 * CONTADORES
 * =========================================================
 */

export async function getTotalExams() {
  return db.exams.count();
}

export async function getTotalStoredAnswers() {
  return db.answers.count();
}