export type Difficulty =
  | "iniciante"
  | "medio"
  | "avancado";

export type QuestionType =
  | "multiple-choice"
  | "true-false";

/*
 * =========================================================
 * MATÉRIAS
 * =========================================================
 */

export type SubjectId =
  | "portugues"
  | "matematica"
  | "informatica"
  | "ingles";

/*
 * =========================================================
 * ALTERNATIVA
 * =========================================================
 */

export interface QuestionAlternative {
  id: string;
  text: string;
}

/*
 * =========================================================
 * QUESTÃO
 * =========================================================
 */

export interface Question {
  id: string;

  area: string;

  subject: SubjectId;

  subjectName: string;

  topic: string;

  subtopic: string;

  difficulty: Difficulty;

  type: QuestionType;

  statement: string;

  alternatives: QuestionAlternative[];

  correctAnswer: string;

  explanation: string;

  alternativeExplanations: Record<
    string,
    string
  >;

  tags: string[];
}