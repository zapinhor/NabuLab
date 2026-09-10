import {
  portuguesQuestions,
} from "@/data/questions/portugues";

import {
  portuguesExtraQuestions,
} from "@/data/questions/portugues-extra";

import {
  portuguesTrueFalseQuestions,
} from "@/data/questions/portugues-vf";

import {
  matematicaQuestions,
} from "@/data/questions/matematica";

import {
  matematicaExtraQuestions,
} from "@/data/questions/matematica-extra";

import {
  matematicaTrueFalseQuestions,
} from "@/data/questions/matematica-vf";

import {
  informaticaQuestions,
} from "@/data/questions/informatica";

import {
  informaticaExtraQuestions,
} from "@/data/questions/informatica-extra";

import {
  informaticaTrueFalseQuestions,
} from "@/data/questions/informatica-vf";

import {
  inglesQuestions,
} from "@/data/questions/ingles";

import {
  inglesExtraQuestions,
} from "@/data/questions/ingles-extra";

import {
  inglesTrueFalseQuestions,
} from "@/data/questions/ingles-vf";

import {
  vestibularQuestions,
} from "@/data/questions/vestibulares";

import type {
  Difficulty,
  Question,
  QuestionType,
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * BANCO COMPLETO — NABULAB
 * =========================================================
 */

const legacyQuestions: Question[] = [
  /*
   * =======================================================
   * PORTUGUÊS
   * =======================================================
   */

  ...portuguesQuestions,
  ...portuguesExtraQuestions,
  ...portuguesTrueFalseQuestions,

  /*
   * =======================================================
   * MATEMÁTICA
   * =======================================================
   */

  ...matematicaQuestions,
  ...matematicaExtraQuestions,
  ...matematicaTrueFalseQuestions,

  /*
   * =======================================================
   * INFORMÁTICA
   * =======================================================
   */

  ...informaticaQuestions,
  ...informaticaExtraQuestions,
  ...informaticaTrueFalseQuestions,

  /*
   * =======================================================
   * INGLÊS
   * =======================================================
   */

  ...inglesQuestions,
  ...inglesExtraQuestions,
  ...inglesTrueFalseQuestions,
];

/*
 * As 140 questões originais são preservadas e recebem metadados
 * compatíveis com o Banco Vestibulares v1 durante a montagem.
 */

const normalizedLegacyQuestions: Question[] =
  legacyQuestions.map((question) => ({
    ...question,
    examTags:
      question.subject === "informatica"
        ? ["fatec", "etec"]
        : question.subject === "ingles"
          ? ["enem", "fuvest", "fatec"]
          : question.difficulty === "avancado"
            ? ["fuvest", "unesp", "enem"]
            : ["enem", "fuvest", "fatec"],
    educationLevel:
      question.subject === "informatica"
        ? "fundamental-e-medio"
        : "ensino-medio",
    skills:
      question.difficulty === "iniciante"
        ? ["reconhecimento-conceitual", "aplicacao-direta"]
        : question.difficulty === "medio"
          ? ["interpretacao", "resolucao-de-problemas"]
          : ["analise", "integracao-de-conceitos"],
    origin: "nabulab",
  }));

export const questionBank: Question[] = [
  ...normalizedLegacyQuestions,
  ...vestibularQuestions,
];

/*
 * =========================================================
 * TOTAL
 * =========================================================
 */

export function getTotalQuestions() {
  return questionBank.length;
}

/*
 * =========================================================
 * BUSCAR POR ID
 * =========================================================
 */

export function getQuestionById(
  questionId: string
) {
  return questionBank.find(
    (question) =>
      question.id ===
      questionId
  );
}

/*
 * =========================================================
 * POR MATÉRIA
 * =========================================================
 */

export function getQuestionsBySubject(
  subject: SubjectId
) {
  return questionBank.filter(
    (question) =>
      question.subject ===
      subject
  );
}

/*
 * =========================================================
 * POR DIFICULDADE
 * =========================================================
 */

export function getQuestionsByDifficulty(
  difficulty: Difficulty
) {
  return questionBank.filter(
    (question) =>
      question.difficulty ===
      difficulty
  );
}

/*
 * =========================================================
 * POR TIPO
 * =========================================================
 */

export function getQuestionsByType(
  type: QuestionType
) {
  return questionBank.filter(
    (question) =>
      question.type ===
      type
  );
}

/*
 * =========================================================
 * CONTAGEM POR MATÉRIA
 * =========================================================
 */

export function getQuestionCountBySubject(
  subject: SubjectId
) {
  return questionBank.filter(
    (question) =>
      question.subject ===
      subject
  ).length;
}

/*
 * =========================================================
 * CONTAGEM POR TIPO
 * =========================================================
 */

export function getQuestionCountByType(
  type: QuestionType
) {
  return questionBank.filter(
    (question) =>
      question.type ===
      type
  ).length;
}
