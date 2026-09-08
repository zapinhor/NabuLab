export type Difficulty = "iniciante" | "medio" | "avancado";

export type QuestionType = "multiple-choice" | "true-false";

export type SubjectId =
  | "sistema-respiratorio"
  | "homeostase"
  | "fisiologia-celular"
  | "sistema-nervoso"
  | "biologia-celular"
  | "bioquimica-agua";

export interface QuestionAlternative {
  id: string;
  text: string;
}

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

  alternativeExplanations: Record<string, string>;

  tags: string[];
}