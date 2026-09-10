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
  | "literatura"
  | "ingles"
  | "espanhol"
  | "arte"
  | "educacao-fisica"
  | "matematica"
  | "raciocinio-logico"
  | "fisica"
  | "quimica"
  | "biologia"
  | "ciencias"
  | "historia"
  | "geografia"
  | "filosofia"
  | "sociologia"
  | "informatica"
;

export type ExamTag =
  | "enem"
  | "fuvest"
  | "unesp"
  | "fatec"
  | "etec";

export type EducationLevel =
  | "ensino-fundamental"
  | "ensino-medio"
  | "fundamental-e-medio";

export type QuestionOrigin =
  | "nabulab";

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

  examTags?: ExamTag[];

  educationLevel?: EducationLevel;

  skills?: string[];

  origin?: QuestionOrigin;
}
