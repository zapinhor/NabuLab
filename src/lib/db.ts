import Dexie, {
  type EntityTable,
} from "dexie";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

/*
 * =========================================================
 * BANCO LOCAL — NABULAB
 * =========================================================
 *
 * O NabuLab utiliza um banco IndexedDB próprio para não
 * compartilhar histórico com o projeto NabuLab.
 *
 * Importante:
 * alterar o nome do banco NÃO apaga o banco antigo.
 *
 * NabuLab:
 * NabuLabDB
 *
 * NabuLab:
 * NabuLabDB
 * =========================================================
 */

export const db =
  new Dexie(
    "NabuLabDB"
  ) as Dexie & {
    exams: EntityTable<
      StoredExam,
      "id"
    >;

    answers: EntityTable<
      StoredAnswer,
      "id"
    >;
  };

/*
 * =========================================================
 * ESTRUTURA DO BANCO
 * =========================================================
 */

db.version(1).stores({
  exams:
    "&id, submittedAt, percentage, difficulty, *subjects",

  answers:
    "&id, examId, questionId, subject, topic, subtopic, difficulty, [examId+questionId]",
});