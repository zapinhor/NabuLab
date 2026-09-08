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

export const questionBank: Question[] = [
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