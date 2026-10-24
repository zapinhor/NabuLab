import type {
  PublicQuestion,
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
 * VERSÃO SEM GABARITO
 * =========================================================
 *
 * O que o navegador recebe durante a prova: enunciado e
 * alternativas já na ordem exibida, sem resposta nem explicações.
 */

export function toPublicQuestion(
  question: Question
): PublicQuestion {
  return {
    id: question.id,
    area: question.area,
    subject: question.subject,
    subjectName: question.subjectName,
    topic: question.topic,
    subtopic: question.subtopic,
    difficulty: question.difficulty,
    type: question.type,
    statement: question.statement,
    alternatives: question.alternatives.map(
      (alternative) => ({ ...alternative })
    ),
  };
}
