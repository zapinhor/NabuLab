import Dexie, {
  type EntityTable,
} from "dexie";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

export const db = new Dexie(
  "FisioSimuladoDB"
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

db.version(1).stores({
  exams:
    "&id, submittedAt, percentage, difficulty, *subjects",

  answers:
    "&id, examId, questionId, subject, topic, subtopic, difficulty, [examId+questionId]",
});