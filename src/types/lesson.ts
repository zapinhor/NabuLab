import type { SubjectId } from "@/types/question";

/*
 * Aulas da área de estudos. Cada aula corresponde a um assunto (topic) que já
 * existe no banco de questões, para que o aluno estude e pratique o mesmo
 * conteúdo em seguida.
 */

export interface LessonTable {
  headers: string[];
  rows: string[][];
}

export interface LessonSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: LessonTable;
}

export interface LessonWorkedExample {
  statement: string;
  steps: string[];
  answer: string;
}

export interface Lesson {
  subject: SubjectId;
  /** Nome exato do assunto no banco de questões. */
  topic: string;
  title: string;
  intro: string;
  readingMinutes: number;
  sections: LessonSection[];
  workedExamples: LessonWorkedExample[];
  commonMistakes: string[];
  summary: string[];
}
