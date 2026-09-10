import { subjects } from "../src/data/subjects";
import {
  generateExamQuestions,
  getAvailableQuestions,
} from "../src/lib/question-selector";

import type {
  ExamDifficulty,
  ExamQuestionType,
} from "../src/types/exam";

const difficulties: ExamDifficulty[] = [
  "iniciante",
  "medio",
  "avancado",
  "misto",
];
const questionTypes: ExamQuestionType[] = [
  "multiple-choice",
  "true-false",
  "misto",
];

let checkedConfigurations = 0;

for (const subject of subjects) {
  for (const difficulty of difficulties) {
    for (const questionType of questionTypes) {
      const config = {
        amount: 10,
        subjects: [subject.id],
        difficulty,
        questionType,
        shuffleQuestions: false,
        shuffleAlternatives: false,
      };
      const available = getAvailableQuestions(config);
      const selected = generateExamQuestions(config);

      if (available.length === 0) {
        throw new Error(
          `Nenhuma questão disponível para ${subject.name}, ${difficulty}, ${questionType}.`
        );
      }

      if (selected.length !== Math.min(config.amount, available.length)) {
        throw new Error(
          `Seleção inconsistente para ${subject.name}, ${difficulty}, ${questionType}.`
        );
      }

      if (questionType !== "misto" && selected.some((question) => question.type !== questionType)) {
        throw new Error(
          `Tipo incorreto selecionado para ${subject.name}, ${difficulty}, ${questionType}.`
        );
      }

      if (difficulty !== "misto" && selected.some((question) => question.difficulty !== difficulty)) {
        throw new Error(
          `Dificuldade incorreta selecionada para ${subject.name}, ${difficulty}, ${questionType}.`
        );
      }

      checkedConfigurations += 1;
    }
  }
}

console.log(
  `Fluxos do banco validados: ${checkedConfigurations} combinações de matéria, dificuldade e tipo.`
);
