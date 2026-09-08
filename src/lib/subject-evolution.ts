import { db } from "@/lib/db";

import {
  subjects,
} from "@/data/subjects";

import {
  normalizeExamMode,
} from "@/lib/exam-mode";

import type {
  ExamMode,
} from "@/types/exam";

import type {
  SubjectId,
} from "@/types/question";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

/*
 * =========================================================
 * TENDÊNCIA
 * =========================================================
 */

export type EvolutionTrend =
  | "subindo"
  | "estavel"
  | "caindo"
  | "poucos-dados";

export type TrendConfidence =
  | "baixa"
  | "media"
  | "alta";

/*
 * =========================================================
 * PONTO DO GRÁFICO
 * =========================================================
 */

export interface SubjectEvolutionPoint {
  examId: string;

  examNumber: number;

  submittedAt: string;

  dateLabel: string;

  percentage: number;

  correct: number;

  totalQuestions: number;

  mode: ExamMode;
}

/*
 * =========================================================
 * EVOLUÇÃO DE UMA MATÉRIA
 * =========================================================
 */

export interface SubjectEvolution {
  subject: SubjectId;

  subjectName: string;

  area: string;

  icon: string;

  /*
   * Quantas provas diferentes
   * tiveram questões dessa matéria.
   */
  totalExams: number;

  /*
   * Quantidade histórica de respostas.
   */
  totalQuestions: number;

  totalCorrect: number;

  totalIncorrect: number;

  /*
   * Precisão histórica usando todas
   * as respostas.
   */
  historicalAccuracy: number;

  /*
   * Média das porcentagens obtidas
   * nas provas em que a matéria apareceu.
   */
  averageScore: number;

  /*
   * Último desempenho registrado.
   */
  currentScore: number;

  /*
   * Média das últimas 3 aparições.
   */
  recentAverage: number;

  bestScore: number;

  worstScore: number;

  /*
   * Mudança entre a última nota e
   * a primeira nota disponível.
   */
  totalChange: number;

  /*
   * Inclinação aproximada em pontos
   * percentuais por prova.
   */
  slope: number;

  trend: EvolutionTrend;

  confidence: TrendConfidence;

  points: SubjectEvolutionPoint[];
}

/*
 * =========================================================
 * RESUMO
 * =========================================================
 */

export interface SubjectEvolutionSummary {
  totalSubjects: number;

  subjectsWithData: number;

  improvingSubjects: number;

  stableSubjects: number;

  decliningSubjects: number;

  totalSubjectAppearances: number;

  subjects: SubjectEvolution[];
}

/*
 * =========================================================
 * DATA
 * =========================================================
 */

function formatShortDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    }
  ).format(
    new Date(value)
  );
}

/*
 * =========================================================
 * REGRESSÃO LINEAR SIMPLES
 * =========================================================
 *
 * Calculamos a tendência usando:
 *
 * x = ordem das provas
 * y = percentual na matéria
 *
 * O resultado indica aproximadamente
 * quantos pontos percentuais a matéria
 * está variando por prova.
 */

function calculateSlope(
  percentages: number[]
) {
  if (
    percentages.length <
    2
  ) {
    return 0;
  }

  const count =
    percentages.length;

  const xValues =
    percentages.map(
      (
        _,
        index
      ) =>
        index
    );

  const averageX =
    xValues.reduce(
      (
        accumulator,
        value
      ) =>
        accumulator +
        value,
      0
    ) /
    count;

  const averageY =
    percentages.reduce(
      (
        accumulator,
        value
      ) =>
        accumulator +
        value,
      0
    ) /
    count;

  let numerator = 0;

  let denominator = 0;

  for (
    let index = 0;
    index < count;
    index++
  ) {
    const xDifference =
      xValues[index] -
      averageX;

    const yDifference =
      percentages[index] -
      averageY;

    numerator +=
      xDifference *
      yDifference;

    denominator +=
      xDifference *
      xDifference;
  }

  if (
    denominator ===
    0
  ) {
    return 0;
  }

  return Math.round(
    (
      numerator /
      denominator
    ) *
      10
  ) /
    10;
}

/*
 * =========================================================
 * CLASSIFICAR TENDÊNCIA
 * =========================================================
 */

function classifyTrend(
  points:
    SubjectEvolutionPoint[],
  slope: number
): EvolutionTrend {
  if (
    points.length <
    2
  ) {
    return "poucos-dados";
  }

  /*
   * Pequenas oscilações são tratadas
   * como estabilidade.
   */

  if (
    slope >= 3
  ) {
    return "subindo";
  }

  if (
    slope <= -3
  ) {
    return "caindo";
  }

  return "estavel";
}

/*
 * =========================================================
 * CONFIANÇA
 * =========================================================
 */

function getTrendConfidence(
  totalExams: number
): TrendConfidence {
  if (
    totalExams >= 6
  ) {
    return "alta";
  }

  if (
    totalExams >= 3
  ) {
    return "media";
  }

  return "baixa";
}

/*
 * =========================================================
 * AGRUPAR RESPOSTAS POR PROVA
 * =========================================================
 */

function groupAnswersByExam(
  answers: StoredAnswer[]
) {
  const map =
    new Map<
      string,
      StoredAnswer[]
    >();

  for (
    const answer of
    answers
  ) {
    const current =
      map.get(
        answer.examId
      ) ?? [];

    current.push(
      answer
    );

    map.set(
      answer.examId,
      current
    );
  }

  return map;
}

/*
 * =========================================================
 * CRIAR PONTOS DE UMA MATÉRIA
 * =========================================================
 */

function buildEvolutionPoints({
  subject,
  exams,
  answers,
}: {
  subject: SubjectId;

  exams: StoredExam[];

  answers: StoredAnswer[];
}) {
  const subjectAnswers =
    answers.filter(
      (answer) =>
        answer.subject ===
        subject
    );

  const answersByExam =
    groupAnswersByExam(
      subjectAnswers
    );

  const chronologicalExams =
    [...exams].sort(
      (a, b) =>
        new Date(
          a.submittedAt
        ).getTime() -
        new Date(
          b.submittedAt
        ).getTime()
    );

  const points:
    SubjectEvolutionPoint[] =
    [];

  for (
    const exam of
    chronologicalExams
  ) {
    const examAnswers =
      answersByExam.get(
        exam.id
      ) ?? [];

    if (
      examAnswers.length ===
      0
    ) {
      continue;
    }

    const correct =
      examAnswers.filter(
        (answer) =>
          answer.isCorrect
      ).length;

    const totalQuestions =
      examAnswers.length;

    const percentage =
      Math.round(
        (
          correct /
          totalQuestions
        ) *
          100
      );

    points.push({
      examId:
        exam.id,

      examNumber:
        points.length + 1,

      submittedAt:
        exam.submittedAt,

      dateLabel:
        formatShortDate(
          exam.submittedAt
        ),

      percentage,

      correct,

      totalQuestions,

      mode:
        normalizeExamMode(
          exam.mode
        ),
    });
  }

  return points;
}

/*
 * =========================================================
 * CONSTRUIR MATÉRIA
 * =========================================================
 */

function buildSubjectEvolution({
  subject,
  exams,
  answers,
}: {
  subject: {
    id: SubjectId;

    name: string;

    area: string;

    icon: string;
  };

  exams: StoredExam[];

  answers: StoredAnswer[];
}): SubjectEvolution {
  const subjectAnswers =
    answers.filter(
      (answer) =>
        answer.subject ===
        subject.id
    );

  const totalQuestions =
    subjectAnswers.length;

  const totalCorrect =
    subjectAnswers.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const totalIncorrect =
    totalQuestions -
    totalCorrect;

  const historicalAccuracy =
    totalQuestions === 0
      ? 0
      : Math.round(
          (
            totalCorrect /
            totalQuestions
          ) *
            100
        );

  const points =
    buildEvolutionPoints({
      subject:
        subject.id,

      exams,

      answers,
    });

  const percentages =
    points.map(
      (point) =>
        point.percentage
    );

  const totalExams =
    points.length;

  const averageScore =
    totalExams === 0
      ? 0
      : Math.round(
          percentages.reduce(
            (
              accumulator,
              percentage
            ) =>
              accumulator +
              percentage,
            0
          ) /
            totalExams
        );

  const currentScore =
    points[
      points.length - 1
    ]?.percentage ??
    0;

  const recentPoints =
    points.slice(
      -3
    );

  const recentAverage =
    recentPoints.length ===
    0
      ? 0
      : Math.round(
          recentPoints.reduce(
            (
              accumulator,
              point
            ) =>
              accumulator +
              point.percentage,
            0
          ) /
            recentPoints.length
        );

  const bestScore =
    percentages.length ===
    0
      ? 0
      : Math.max(
          ...percentages
        );

  const worstScore =
    percentages.length ===
    0
      ? 0
      : Math.min(
          ...percentages
        );

  const firstScore =
    points[0]
      ?.percentage ??
    0;

  const totalChange =
    totalExams < 2
      ? 0
      : currentScore -
        firstScore;

  /*
   * Para tendência recente usamos
   * no máximo as últimas 6 provas.
   *
   * Isso evita que um desempenho de
   * muito tempo atrás controle demais
   * a tendência atual.
   */

  const trendWindow =
    points.slice(
      -6
    );

  const slope =
    calculateSlope(
      trendWindow.map(
        (point) =>
          point.percentage
      )
    );

  const trend =
    classifyTrend(
      trendWindow,
      slope
    );

  const confidence =
    getTrendConfidence(
      totalExams
    );

  return {
    subject:
      subject.id,

    subjectName:
      subject.name,

    area:
      subject.area,

    icon:
      subject.icon,

    totalExams,

    totalQuestions,

    totalCorrect,

    totalIncorrect,

    historicalAccuracy,

    averageScore,

    currentScore,

    recentAverage,

    bestScore,

    worstScore,

    totalChange,

    slope,

    trend,

    confidence,

    points,
  };
}

/*
 * =========================================================
 * CONSULTA PRINCIPAL
 * =========================================================
 */

export async function getSubjectEvolutionSummary(): Promise<SubjectEvolutionSummary> {
  const [
    exams,
    answers,
  ] =
    await Promise.all([
      db.exams.toArray(),

      db.answers.toArray(),
    ]);

  const subjectEvolution =
    subjects.map(
      (subject) =>
        buildSubjectEvolution({
          subject: {
            id:
              subject.id as SubjectId,

            name:
              subject.name,

            area:
              subject.area,

            icon:
              subject.icon,
          },

          exams,

          answers,
        })
    );

  return {
    totalSubjects:
      subjectEvolution.length,

    subjectsWithData:
      subjectEvolution.filter(
        (subject) =>
          subject.totalExams >
          0
      ).length,

    improvingSubjects:
      subjectEvolution.filter(
        (subject) =>
          subject.trend ===
          "subindo"
      ).length,

    stableSubjects:
      subjectEvolution.filter(
        (subject) =>
          subject.trend ===
          "estavel"
      ).length,

    decliningSubjects:
      subjectEvolution.filter(
        (subject) =>
          subject.trend ===
          "caindo"
      ).length,

    totalSubjectAppearances:
      subjectEvolution.reduce(
        (
          accumulator,
          subject
        ) =>
          accumulator +
          subject.totalExams,
        0
      ),

    subjects:
      subjectEvolution,
  };
}