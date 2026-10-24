import "server-only";

import { applyAlternativeOrder, toPublicQuestion } from "@/lib/alternative-order";

export { applyAlternativeOrder };

import {
  questionBank,
} from "@/data/questions";

import {
  generateExamQuestions,
  shuffleArray,
} from "@/lib/question-selector";

import type {
  ExamConfig,
  ExamMode,
  ExamQuestionType,
  ExamSession,
} from "@/types/exam";

import type {
  PublicQuestion,
  Question,
} from "@/types/question";

import {
  filterAccessibleQuestions,
  validateExamConfig,
  type StudentEntitlements,
} from "@/lib/entitlements";

const fullQuestionById = new Map(questionBank.map((question) => [question.id, question]));

/*
 * =========================================================
 * TIPO REAL DA PROVA
 * =========================================================
 *
 * Usado principalmente pelos simulados
 * recomendados e pelas revisões.
 *
 * Se todas as questões forem do mesmo tipo,
 * armazenamos esse tipo.
 *
 * Se houver múltipla escolha + V/F,
 * armazenamos "misto".
 */

function getQuestionTypeFromQuestions(
  questions: Question[]
): ExamQuestionType {
  const types =
    new Set(
      questions.map(
        (question) =>
          question.type
      )
    );

  if (
    types.size ===
    1
  ) {
    return (
      questions[0]
        ?.type ??
      "multiple-choice"
    );
  }

  return "misto";
}

/*
 * =========================================================
 * ORDEM DAS ALTERNATIVAS
 * =========================================================
 */

function createAlternativeOrder(
  question: Question,
  shuffleAlternatives: boolean
) {
  const alternativeIds =
    question.alternatives.map(
      (alternative) =>
        alternative.id
    );

  /*
   * =======================================================
   * VERDADEIRO / FALSO
   * =======================================================
   *
   * V/F permanece sempre:
   *
   * V — Verdadeiro
   * F — Falso
   *
   * Mesmo que o usuário tenha habilitado
   * "embaralhar alternativas".
   *
   * Isso evita situações estranhas como:
   *
   * Falso
   * Verdadeiro
   *
   * mudando de posição a cada prova.
   */

  if (
    question.type ===
    "true-false"
  ) {
    return [
      ...alternativeIds,
    ];
  }

  /*
   * =======================================================
   * MÚLTIPLA ESCOLHA
   * =======================================================
   */

  return shuffleAlternatives
    ? shuffleArray(
        alternativeIds
      )
    : [
        ...alternativeIds,
      ];
}

/*
 * =========================================================
 * CRIAR SESSÃO MANUAL
 * =========================================================
 */

export function createExamSession(
  config: ExamConfig,
  entitlements: StudentEntitlements,
): ExamSession | null {
  validateExamConfig(config, entitlements);
  // O sorteio usa o índice (sem gabarito); aqui no servidor buscamos a questão completa.
  const questions =
    generateExamQuestions(
      config,
      entitlements,
    )
      .map((meta) => fullQuestionById.get(meta.id))
      .filter((question): question is Question => question !== undefined);

  if (
    questions.length ===
    0
  ) {
    return null;
  }

  const alternativeOrders:
    Record<
      string,
      string[]
    > = {};

  for (
    const question of
    questions
  ) {
    alternativeOrders[
      question.id
    ] =
      createAlternativeOrder(
        question,
        config.shuffleAlternatives
      );
  }

  return {
    id:
      `exam-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,

    createdAt:
      new Date().toISOString(),

    mode:
      "manual",

    config: {
      ...config,

      subjects: [
        ...config.subjects,
      ],
    },

    questionIds:
      questions.map(
        (question) =>
          question.id
      ),

    alternativeOrders,
  };
}

/*
 * =========================================================
 * RECUPERAR QUESTÕES DA SESSÃO
 * =========================================================
 */

export function getSessionQuestions(
  session: ExamSession
): Question[] {
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

  return session.questionIds
    .map(
      (questionId) =>
        questionMap.get(
          questionId
        )
    )
    .filter(
      (
        question
      ): question is Question =>
        question !==
        undefined
    )
    .map(
      (question) =>
        applyAlternativeOrder(
          question,
          session
            .alternativeOrders?.[
            question.id
          ]
        )
    );
}

/*
 * =========================================================
 * CRIAR SESSÃO A PARTIR DE IDS
 * =========================================================
 *
 * Usado por:
 *
 * 🎯 Revisão
 * ✨ Recomendado
 *
 * Agora detectamos automaticamente se a
 * prova contém:
 *
 * multiple-choice
 * true-false
 * misto
 */

export function createExamSessionFromQuestionIds(
  questionIds: string[],
  shuffleAlternatives: boolean,
  mode: ExamMode,
  entitlements: StudentEntitlements,
): ExamSession | null {
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

  const selectedQuestions =
    filterAccessibleQuestions(questionIds
      .map(
        (questionId) =>
          questionMap.get(
            questionId
          )
      )
      .filter(
        (
          question
        ): question is Question =>
          question !==
          undefined
      ), entitlements).slice(0, entitlements.maxQuestionsPerExam);

  if (
    selectedQuestions.length ===
    0
  ) {
    return null;
  }

  /*
   * =======================================================
   * ALTERNATIVAS
   * =======================================================
   */

  const alternativeOrders:
    Record<
      string,
      string[]
    > = {};

  for (
    const question of
    selectedQuestions
  ) {
    alternativeOrders[
      question.id
    ] =
      createAlternativeOrder(
        question,
        shuffleAlternatives
      );
  }

  /*
   * =======================================================
   * MATÉRIAS
   * =======================================================
   */

  const selectedSubjects =
    Array.from(
      new Set(
        selectedQuestions.map(
          (question) =>
            question.subject
        )
      )
    );

  /*
   * =======================================================
   * TIPO REAL DA PROVA
   * =======================================================
   */

  const questionType =
    getQuestionTypeFromQuestions(
      selectedQuestions
    );

  return {
    id:
      `exam-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,

    createdAt:
      new Date().toISOString(),

    mode,

    config: {
      amount:
        selectedQuestions.length,

      subjects:
        selectedSubjects,

      difficulty:
        "misto",

      questionType,

      shuffleQuestions:
        false,

      shuffleAlternatives,
    },

    questionIds:
      selectedQuestions.map(
        (question) =>
          question.id
      ),

    alternativeOrders,
  };
}

/*
 * =========================================================
 * QUESTÕES PARA O NAVEGADOR (SEM GABARITO)
 * =========================================================
 */

export function getPublicSessionQuestions(
  session: ExamSession
): PublicQuestion[] {
  return getSessionQuestions(session).map(toPublicQuestion);
}
