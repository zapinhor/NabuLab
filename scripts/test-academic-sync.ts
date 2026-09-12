import assert from "node:assert/strict";
import {
  planLocalCacheSync,
  prepareLegacyMigrationRows,
  rowToAnswer,
  type AnswerRow,
} from "@/lib/academic-sync";
import {
  academicSyncAuthRedirect,
  AcademicSyncAuthError,
  isAcademicSyncAuthError,
} from "@/lib/academic-sync-error";
import type { StoredAnswer, StoredExam } from "@/types/storage";

const userId = "00000000-0000-0000-0000-000000000001";
const exam: StoredExam = {
  id: "legacy-exam",
  createdAt: "2026-01-01T12:00:00.000Z",
  startedAt: "2026-01-01T12:00:00.000Z",
  submittedAt: "2026-01-01T12:10:00.000Z",
  durationSeconds: 600,
  mode: "manual",
  totalQuestions: 2,
  answered: 2,
  unanswered: 0,
  correct: 1,
  incorrect: 1,
  percentage: 50,
  difficulty: "misto",
  questionType: "misto",
  selectedSubjects: ["fisica"],
  subjects: ["fisica"],
  questionIds: ["fcel-006", "fisi-001"],
  alternativeOrders: {},
};

const orphanWithoutSnapshot: StoredAnswer = {
  id: "legacy-answer-orphan",
  examId: exam.id,
  questionId: "fcel-006",
  subject: "fisica",
  subjectName: "Física",
  area: "Ciências da Natureza",
  topic: "Eletricidade",
  subtopic: "Circuitos",
  difficulty: "medio",
  selectedAnswer: "A",
  correctAnswer: "B",
  isCorrect: false,
  wasAnswered: true,
  markedForReview: false,
};

const orphanWithSnapshot: StoredAnswer = {
  ...orphanWithoutSnapshot,
  id: "legacy-answer-snapshot",
  questionSnapshot: {
    area: "Ciências da Natureza",
    subject: "fisica",
    subjectName: "Física",
    topic: "Eletricidade",
    subtopic: "Circuitos",
    difficulty: "medio",
    type: "multiple-choice",
    statement: "Enunciado histórico preservado.",
    alternatives: [
      { id: "A", text: "Alternativa A" },
      { id: "B", text: "Alternativa B" },
    ],
    correctAnswer: "B",
    explanation: "Explicação histórica preservada.",
    alternativeExplanations: {
      A: "Distrator histórico.",
      B: "Resposta histórica correta.",
    },
  },
};

const migration = prepareLegacyMigrationRows(
  userId,
  [exam],
  [orphanWithoutSnapshot, orphanWithSnapshot],
);

assert.equal(migration.attempts.length, 1, "a tentativa antiga deve ser mantida");
assert.equal(migration.answers.length, 2, "respostas órfãs não devem ser descartadas no upload");
assert.equal(migration.answers[0].question_snapshot, null);
assert.deepEqual(
  migration.answers[1].question_snapshot,
  orphanWithSnapshot.questionSnapshot,
  "o snapshot local deve ter prioridade sobre o banco atual",
);
assert.deepEqual(
  prepareLegacyMigrationRows(userId, [exam], [orphanWithoutSnapshot, orphanWithSnapshot]),
  migration,
  "repetir a preparação deve manter IDs e payloads idempotentes",
);

assert.deepEqual(
  planLocalCacheSync({ activeStudent: userId, legacyOwner: userId, userId }),
  { changingStudent: false, claimsLegacyData: false, mayUploadLocal: true },
);
assert.equal(
  planLocalCacheSync({
    activeStudent: "00000000-0000-0000-0000-000000000002",
    legacyOwner: "00000000-0000-0000-0000-000000000002",
    userId,
  }).mayUploadLocal,
  false,
  "dados locais de outra conta não podem ser enviados",
);

const remoteOrphan = migration.answers[0] as AnswerRow;
const warnings: unknown[][] = [];
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => warnings.push(args);
try {
  assert.equal(rowToAnswer(remoteOrphan), null, "órfã sem snapshot deve degradar com segurança");
} finally {
  console.warn = originalWarn;
}
assert.match(String(warnings[0]?.[0]), /Historical question unavailable: fcel-006/);

const restored = rowToAnswer(migration.answers[1]);
assert.equal(restored?.questionSnapshot?.statement, "Enunciado histórico preservado.");
assert.equal(restored?.correctAnswer, "B");

assert.equal(isAcademicSyncAuthError(new AcademicSyncAuthError()), true);
assert.equal(isAcademicSyncAuthError(new Error("falha de rede")), false);
assert.equal(
  academicSyncAuthRedirect(new AcademicSyncAuthError(), "/historico"),
  "/login?next=%2Fhistorico",
);
assert.equal(academicSyncAuthRedirect(new Error("falha de rede"), "/"), null);

console.log("Academic sync: 13 assertions passed.");
