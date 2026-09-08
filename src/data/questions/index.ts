import {
  respiratorioQuestions,
} from "@/data/questions/respiratorio";

import {
  homeostaseQuestions,
} from "@/data/questions/homeostase";

import {
  fisiologiaCelularQuestions,
} from "@/data/questions/fisiologia-celular";

import {
  sistemaNervosoQuestions,
} from "@/data/questions/sistema-nervoso";

import {
  biologiaCelularQuestions,
} from "@/data/questions/biologia-celular";

import {
  bioquimicaAguaQuestions,
} from "@/data/questions/bioquimica-agua";

/*
 * =========================================================
 * MÚLTIPLA ESCOLHA — EXPANSÃO
 * =========================================================
 */

import {
  respiratorioExtraQuestions,
} from "@/data/questions/respiratorio-extra";

import {
  homeostaseExtraQuestions,
} from "@/data/questions/homeostase-extra";

import {
  fisiologiaCelularExtraQuestions,
} from "@/data/questions/fisiologia-celular-extra";

import {
  sistemaNervosoExtraQuestions,
} from "@/data/questions/sistema-nervoso-extra";

import {
  biologiaCelularExtraQuestions,
} from "@/data/questions/biologia-celular-extra";

import {
  bioquimicaAguaExtraQuestions,
} from "@/data/questions/bioquimica-agua-extra";

/*
 * =========================================================
 * VERDADEIRO / FALSO
 * =========================================================
 */

import {
  respiratorioTrueFalseQuestions,
} from "@/data/questions/respiratorio-vf";

import {
  homeostaseTrueFalseQuestions,
} from "@/data/questions/homeostase-vf";

import {
  fisiologiaCelularTrueFalseQuestions,
} from "@/data/questions/fisiologia-celular-vf";

import {
  sistemaNervosoTrueFalseQuestions,
} from "@/data/questions/sistema-nervoso-vf";

import {
  biologiaCelularTrueFalseQuestions,
} from "@/data/questions/biologia-celular-vf";

import {
  bioquimicaAguaTrueFalseQuestions,
} from "@/data/questions/bioquimica-agua-vf";

import type {
  Difficulty,
  Question,
  QuestionType,
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * BANCO COMPLETO
 * =========================================================
 */

export const questionBank: Question[] = [
  /*
   * =======================================================
   * MÚLTIPLA ESCOLHA — BANCO ORIGINAL
   * =======================================================
   */

  ...respiratorioQuestions,

  ...homeostaseQuestions,

  ...fisiologiaCelularQuestions,

  ...sistemaNervosoQuestions,

  ...biologiaCelularQuestions,

  ...bioquimicaAguaQuestions,

  /*
   * =======================================================
   * MÚLTIPLA ESCOLHA — EXPANSÃO FASE 17
   * =======================================================
   */

  ...respiratorioExtraQuestions,

  ...homeostaseExtraQuestions,

  ...fisiologiaCelularExtraQuestions,

  ...sistemaNervosoExtraQuestions,

  ...biologiaCelularExtraQuestions,

  ...bioquimicaAguaExtraQuestions,

  /*
   * =======================================================
   * VERDADEIRO / FALSO
   * =======================================================
   */

  ...respiratorioTrueFalseQuestions,

  ...homeostaseTrueFalseQuestions,

  ...fisiologiaCelularTrueFalseQuestions,

  ...sistemaNervosoTrueFalseQuestions,

  ...biologiaCelularTrueFalseQuestions,

  ...bioquimicaAguaTrueFalseQuestions,
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