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
  Question,
  QuestionAlternative,
} from "@/types/question";

/*
 * =========================================================
 * IDENTIFICADORES VISUAIS
 * =========================================================
 */

const MULTIPLE_CHOICE_LABELS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];

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
  config: ExamConfig
): ExamSession | null {
  const questions =
    generateExamQuestions(
      config
    );

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
 * APLICAR ORDEM VISUAL
 * =========================================================
 */

export function applyAlternativeOrder(
  question: Question,
  desiredOrder?: string[]
): Question {
  /*
   * =======================================================
   * VERDADEIRO / FALSO
   * =======================================================
   *
   * Para V/F nós NÃO transformamos
   * os identificadores em A e B.
   *
   * O banco usará:
   *
   * V
   * F
   *
   * Isso significa que:
   *
   * correctAnswer: "V"
   *
   * continua sendo "V" no simulado,
   * histórico e resultado.
   */

  if (
    question.type ===
    "true-false"
  ) {
    const alternativeMap =
      new Map<
        string,
        QuestionAlternative
      >(
        question.alternatives.map(
          (alternative) => [
            alternative.id,
            alternative,
          ]
        )
      );

    const requestedOrder =
      desiredOrder &&
      desiredOrder.length >
        0
        ? desiredOrder
        : question.alternatives.map(
            (alternative) =>
              alternative.id
          );

    const orderedAlternatives =
      requestedOrder
        .map(
          (id) =>
            alternativeMap.get(
              id
            )
        )
        .filter(
          (
            alternative
          ): alternative is QuestionAlternative =>
            alternative !==
            undefined
        );

    const safeAlternatives =
      orderedAlternatives.length ===
      question.alternatives.length
        ? orderedAlternatives
        : question.alternatives;

    return {
      ...question,

      alternatives:
        safeAlternatives.map(
          (alternative) => ({
            ...alternative,
          })
        ),

      alternativeExplanations: {
        ...question.alternativeExplanations,
      },
    };
  }

  /*
   * =======================================================
   * MÚLTIPLA ESCOLHA
   * =======================================================
   */

  const originalAlternatives =
    question.alternatives;

  const originalOrder =
    originalAlternatives.map(
      (alternative) =>
        alternative.id
    );

  const requestedOrder =
    desiredOrder &&
    desiredOrder.length >
      0
      ? desiredOrder
      : originalOrder;

  const alternativeMap =
    new Map<
      string,
      QuestionAlternative
    >(
      originalAlternatives.map(
        (alternative) => [
          alternative.id,
          alternative,
        ]
      )
    );

  const orderedAlternatives =
    requestedOrder
      .map(
        (originalId) =>
          alternativeMap.get(
            originalId
          )
      )
      .filter(
        (
          alternative
        ): alternative is QuestionAlternative =>
          alternative !==
          undefined
      );

  const safeAlternatives =
    orderedAlternatives.length ===
    originalAlternatives.length
      ? orderedAlternatives
      : originalAlternatives;

  /*
   * Mapeamento:
   *
   * alternativa original
   *         ↓
   * posição visual
   *
   * Exemplo:
   *
   * original C
   * aparece primeiro
   *
   * C → A
   */

  const originalToDisplay =
    new Map<
      string,
      string
    >();

  const displayedAlternatives:
    QuestionAlternative[] =
    safeAlternatives.map(
      (
        alternative,
        index
      ) => {
        const displayId =
          MULTIPLE_CHOICE_LABELS[
            index
          ] ??
          String(
            index + 1
          );

        originalToDisplay.set(
          alternative.id,
          displayId
        );

        return {
          id:
            displayId,

          text:
            alternative.text,
        };
      }
    );

  /*
   * =======================================================
   * RESPOSTA CORRETA
   * =======================================================
   */

  const displayedCorrectAnswer =
    originalToDisplay.get(
      question.correctAnswer
    ) ??
    question.correctAnswer;

  /*
   * =======================================================
   * EXPLICAÇÕES
   * =======================================================
   */

  const displayedAlternativeExplanations:
    Record<
      string,
      string
    > = {};

  for (
    const [
      originalId,
      explanation,
    ] of Object.entries(
      question.alternativeExplanations
    )
  ) {
    const displayId =
      originalToDisplay.get(
        originalId
      );

    if (
      !displayId
    ) {
      continue;
    }

    displayedAlternativeExplanations[
      displayId
    ] =
      explanation;
  }

  return {
    ...question,

    alternatives:
      displayedAlternatives,

    correctAnswer:
      displayedCorrectAnswer,

    alternativeExplanations:
      displayedAlternativeExplanations,
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
  mode: ExamMode
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
    questionIds
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
      );

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