import { db } from "@/lib/db";

import {
  questionBank,
} from "@/data/questions";

import type {
  Question,
  SubjectId,
} from "@/types/question";

export type ReviewPriority =
  | "alta"
  | "media"
  | "baixa";

export interface ReviewQuestionStat {
  questionId: string;

  question: Question;

  subject: SubjectId;

  subjectName: string;

  topic: string;

  subtopic: string;

  attempts: number;

  correct: number;

  errors: number;

  errorRate: number;

  lastAttemptCorrect: boolean;

  priority: ReviewPriority;

  priorityScore: number;
}

export interface ReviewSummary {
  totalQuestionsWithErrors: number;

  totalHistoricalErrors: number;

  highPriority: number;

  mediumPriority: number;

  lowPriority: number;

  questions: ReviewQuestionStat[];
}

/*
 * =========================================================
 * CALCULAR PRIORIDADE
 * =========================================================
 */

function getPriority({
  errors,
  errorRate,
  lastAttemptCorrect,
}: {
  attempts: number;
  errors: number;
  errorRate: number;
  lastAttemptCorrect: boolean;
}): ReviewPriority {
  /*
   * ALTA PRIORIDADE
   *
   * Última tentativa errada
   * +
   * erro repetido ou taxa alta.
   */

  if (
    !lastAttemptCorrect &&
    (
      errors >= 2 ||
      errorRate >= 60
    )
  ) {
    return "alta";
  }

  /*
   * MÉDIA PRIORIDADE
   */

  if (
    errors >= 2 ||
    errorRate >= 50
  ) {
    return "media";
  }

  /*
   * BAIXA PRIORIDADE
   *
   * Já houve erro, mas o histórico
   * está melhor.
   */

  return "baixa";
}

/*
 * =========================================================
 * SCORE INTERNO
 * =========================================================
 *
 * Este número não é mostrado.
 *
 * Ele serve apenas para colocar
 * as questões mais importantes
 * primeiro.
 */

function calculatePriorityScore({
  attempts,
  errors,
  errorRate,
  lastAttemptCorrect,
}: {
  attempts: number;
  errors: number;
  errorRate: number;
  lastAttemptCorrect: boolean;
}) {
  let score =
    errors * 25;

  /*
   * Taxa de erro também pesa.
   */

  score +=
    errorRate * 0.5;

  /*
   * Se a tentativa mais recente
   * ainda foi incorreta, adicionamos
   * peso.
   */

  if (!lastAttemptCorrect) {
    score += 20;
  }

  /*
   * Pequeno peso para questões
   * que já apareceram várias vezes.
   */

  score +=
    Math.min(
      attempts,
      10
    );

  return Math.round(
    score
  );
}

/*
 * =========================================================
 * CONSULTAR REVISÃO
 * =========================================================
 */

export async function getReviewSummary(): Promise<ReviewSummary> {
  const [
    answers,
    exams,
  ] = await Promise.all([
    db.answers.toArray(),
    db.exams.toArray(),
  ]);

  /*
   * =======================================================
   * DATAS DAS PROVAS
   * =======================================================
   *
   * Precisamos saber qual resposta
   * foi a mais recente.
   */

  const examDateMap =
    new Map<
      string,
      number
    >();

  for (const exam of exams) {
    examDateMap.set(
      exam.id,
      new Date(
        exam.submittedAt
      ).getTime()
    );
  }

  /*
   * =======================================================
   * AGRUPAR RESPOSTAS POR QUESTÃO
   * =======================================================
   */

  const answerGroups =
    new Map<
      string,
      typeof answers
    >();

  for (const answer of answers) {
    const current =
      answerGroups.get(
        answer.questionId
      ) ?? [];

    current.push(
      answer
    );

    answerGroups.set(
      answer.questionId,
      current
    );
  }

  /*
   * =======================================================
   * MAPA DO BANCO DE QUESTÕES
   * =======================================================
   */

  const questionMap =
    new Map<
      string,
      Question
    >(
      questionBank.map(
        (question) => [
          question.id,
          question,
        ]
      )
    );

  const reviewQuestions:
    ReviewQuestionStat[] =
    [];

  /*
   * =======================================================
   * ANALISAR CADA QUESTÃO
   * =======================================================
   */

  for (const [
    questionId,
    attempts,
  ] of answerGroups.entries()) {
    const question =
      questionMap.get(
        questionId
      );

    /*
     * Caso uma questão tenha sido
     * removida futuramente do banco.
     */

    if (!question) {
      continue;
    }

    /*
     * Questão incorreta ou em branco
     * conta como falha para revisão.
     */

    const errors =
      attempts.filter(
        (answer) =>
          !answer.isCorrect
      ).length;

    /*
     * Nunca houve erro:
     * não precisa entrar aqui.
     */

    if (errors === 0) {
      continue;
    }

    const correct =
      attempts.length -
      errors;

    const errorRate =
      Math.round(
        (errors /
          attempts.length) *
          100
      );

    /*
     * =====================================================
     * DESCOBRIR ÚLTIMA TENTATIVA
     * =====================================================
     */

    const sortedAttempts =
      [...attempts].sort(
        (a, b) => {
          const dateA =
            examDateMap.get(
              a.examId
            ) ?? 0;

          const dateB =
            examDateMap.get(
              b.examId
            ) ?? 0;

          return (
            dateA -
            dateB
          );
        }
      );

    const lastAttempt =
      sortedAttempts[
        sortedAttempts.length -
          1
      ];

    const lastAttemptCorrect =
      lastAttempt?.isCorrect ??
      false;

    /*
     * =====================================================
     * PRIORIDADE
     * =====================================================
     */

    const priority =
      getPriority({
        attempts:
          attempts.length,

        errors,

        errorRate,

        lastAttemptCorrect,
      });

    const priorityScore =
      calculatePriorityScore({
        attempts:
          attempts.length,

        errors,

        errorRate,

        lastAttemptCorrect,
      });

    reviewQuestions.push({
      questionId,

      question,

      subject:
        question.subject,

      subjectName:
        question.subjectName,

      topic:
        question.topic,

      subtopic:
        question.subtopic,

      attempts:
        attempts.length,

      correct,

      errors,

      errorRate,

      lastAttemptCorrect,

      priority,

      priorityScore,
    });
  }

  /*
   * =======================================================
   * ORDENAR
   * =======================================================
   *
   * Quanto mais alta a prioridade,
   * mais cedo aparece.
   */

  reviewQuestions.sort(
    (a, b) => {
      if (
        b.priorityScore !==
        a.priorityScore
      ) {
        return (
          b.priorityScore -
          a.priorityScore
        );
      }

      if (
        b.errors !==
        a.errors
      ) {
        return (
          b.errors -
          a.errors
        );
      }

      return (
        b.errorRate -
        a.errorRate
      );
    }
  );

  /*
   * =======================================================
   * TOTAL DE ERROS HISTÓRICOS
   * =======================================================
   */

  const totalHistoricalErrors =
    reviewQuestions.reduce(
      (
        accumulator,
        item
      ) =>
        accumulator +
        item.errors,
      0
    );

  return {
    totalQuestionsWithErrors:
      reviewQuestions.length,

    totalHistoricalErrors,

    highPriority:
      reviewQuestions.filter(
        (item) =>
          item.priority ===
          "alta"
      ).length,

    mediumPriority:
      reviewQuestions.filter(
        (item) =>
          item.priority ===
          "media"
      ).length,

    lowPriority:
      reviewQuestions.filter(
        (item) =>
          item.priority ===
          "baixa"
      ).length,

    questions:
      reviewQuestions,
  };
}