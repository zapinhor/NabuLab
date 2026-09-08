import type {
  Difficulty,
  QuestionType,
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * MODALIDADES
 * =========================================================
 */

export type ExamMode =
  | "manual"
  | "review"
  | "recommended";

/*
 * =========================================================
 * CONFIGURAÇÃO
 * =========================================================
 */

export type ExamDifficulty =
  | Difficulty
  | "misto";

export type ExamQuestionType =
  | QuestionType
  | "misto";

export interface ExamConfig {
  amount: number;

  subjects: SubjectId[];

  difficulty:
    ExamDifficulty;

  questionType:
    ExamQuestionType;

  shuffleQuestions: boolean;

  shuffleAlternatives: boolean;
}

/*
 * =========================================================
 * SESSÃO
 * =========================================================
 */

export interface ExamSession {
  id: string;

  createdAt: string;

  /*
   * Origem da prova.
   */
  mode: ExamMode;

  config: ExamConfig;

  questionIds: string[];

  alternativeOrders:
    Record<string, string[]>;
}

/*
 * =========================================================
 * PROGRESSO
 * =========================================================
 */

export interface ExamProgress {
  sessionId: string;

  startedAt: string;

  currentIndex: number;

  answers:
    Record<string, string>;

  reviewQuestionIds:
    string[];
}

/*
 * =========================================================
 * SUBMISSÃO
 * =========================================================
 */

export interface ExamSubmission {
  sessionId: string;

  submittedAt: string;

  answers:
    Record<string, string>;

  reviewQuestionIds:
    string[];
}