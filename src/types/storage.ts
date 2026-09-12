import type {
  Difficulty,
  Question,
  SubjectId,
} from "@/types/question";

import type {
  ExamDifficulty,
  ExamMode,
  ExamQuestionType,
} from "@/types/exam";

/*
 * =========================================================
 * PROVA SALVA
 * =========================================================
 */

export interface StoredExam {
  id: string;

  createdAt: string;

  startedAt: string;

  submittedAt: string;

  durationSeconds: number;

  /*
   * Opcional apenas para manter
   * compatibilidade com provas antigas.
   */
  mode?: ExamMode;

  totalQuestions: number;

  answered: number;

  unanswered: number;

  correct: number;

  incorrect: number;

  percentage: number;

  difficulty:
    ExamDifficulty;

  questionType:
    ExamQuestionType;

  selectedSubjects:
    SubjectId[];

  subjects:
    SubjectId[];

  questionIds: string[];

  alternativeOrders?:
    Record<string, string[]>;
}

/*
 * =========================================================
 * RESPOSTA SALVA
 * =========================================================
 */

export interface StoredAnswer {
  id: string;

  examId: string;

  questionId: string;

  subject: SubjectId;

  subjectName: string;

  area: string;

  topic: string;

  subtopic: string;

  difficulty: Difficulty;

  selectedAnswer:
    string | null;

  correctAnswer: string;

  isCorrect: boolean;

  wasAnswered: boolean;

  markedForReview: boolean;

  /*
   * Snapshot mínimo para que o histórico continue legível
   * mesmo quando a questão não existir mais no banco atual.
   */
  questionSnapshot?: QuestionSnapshot;
}

export type QuestionSnapshot = Pick<
  Question,
  | "area"
  | "subject"
  | "subjectName"
  | "topic"
  | "subtopic"
  | "difficulty"
  | "type"
  | "statement"
  | "alternatives"
  | "correctAnswer"
  | "explanation"
  | "alternativeExplanations"
>;
