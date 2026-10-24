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

/*
 * =========================================================
 * VERSÕES SEGURAS PARA O NAVEGADOR
 * =========================================================
 *
 * O banco completo (com gabarito e explicações) fica só no
 * servidor. O navegador recebe:
 *
 * - QuestionMeta: classificação da questão, para contagens,
 *   filtros, domínio e recomendações (sem enunciado).
 * - PublicQuestion: o que aparece durante a prova
 *   (enunciado e alternativas, sem a resposta).
 *
 * A correção completa só chega depois da entrega.
 */

export type QuestionMeta = Pick<
  Question,
  "id" | "area" | "subject" | "subjectName" | "topic" | "subtopic" | "difficulty" | "type"
>;

export type PublicQuestion = QuestionMeta & Pick<Question, "statement" | "alternatives">;
