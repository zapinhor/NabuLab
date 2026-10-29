import assert from "node:assert/strict";

import { isDue, spacedReviewState } from "../src/lib/spaced-review";
import { computeStreak, dateKeyInTimeZone, weekStartKey } from "../src/lib/streak";
import { buildDailyGoal } from "../src/lib/daily-goal";

// --- Semana começa na segunda ---
assert.equal(weekStartKey("2026-10-27"), "2026-10-26"); // terça → segunda
assert.equal(weekStartKey("2026-11-01"), "2026-10-26"); // domingo → segunda anterior
assert.equal(weekStartKey("2026-10-26"), "2026-10-26");

// --- Fuso de Brasília ---
assert.equal(dateKeyInTimeZone(new Date("2026-10-28T02:30:00Z")), "2026-10-27");
assert.equal(dateKeyInTimeZone(new Date("2026-10-28T03:30:00Z")), "2026-10-28");

// --- Sequência simples ---
let s = computeStreak(["2026-10-25", "2026-10-26", "2026-10-27"], "2026-10-27");
assert.equal(s.current, 3);
assert.equal(s.studiedToday, true);
assert.equal(s.atRisk, false);

// Estudou até ontem: viva, mas em risco
s = computeStreak(["2026-10-25", "2026-10-26"], "2026-10-27");
assert.equal(s.current, 2);
assert.equal(s.atRisk, true);

// Um dia de folga no meio (sábado 24) é perdoado
s = computeStreak(["2026-10-22", "2026-10-23", "2026-10-25", "2026-10-26", "2026-10-27"], "2026-10-27");
assert.equal(s.current, 5);
assert.deepEqual(s.freezesInCurrent, ["2026-10-24"]);

// Duas folgas na mesma semana: a segunda quebra
s = computeStreak(["2026-10-26", "2026-10-28", "2026-10-30"], "2026-10-30");
assert.equal(s.current, 1); // 30 recomeça: 29 seria a 2ª folga da semana
assert.equal(s.longest, 2); // 26 e 28, com folga no 27
assert.equal(s.freezeAvailableThisWeek, true); // a sequência nova ainda não usou folga

// Folgas em semanas diferentes são permitidas
s = computeStreak(["2026-10-23", "2026-10-25", "2026-10-27"], "2026-10-27");
// 24 (semana de 19/10) e 26 (semana de 26/10)
assert.equal(s.current, 3);

// Dois dias seguidos sem estudo quebram
s = computeStreak(["2026-10-20", "2026-10-21", "2026-10-24"], "2026-10-24");
assert.equal(s.current, 1);
assert.equal(s.longest, 2);

// Último estudo anteontem: a folga de ontem mantém a sequência viva
s = computeStreak(["2026-10-24", "2026-10-25"], "2026-10-27");
assert.equal(s.current, 2);
assert.equal(s.atRisk, true);
assert.deepEqual(s.freezesInCurrent, ["2026-10-26"]);

// Último estudo há 3 dias: acabou
s = computeStreak(["2026-10-23", "2026-10-24"], "2026-10-27");
assert.equal(s.current, 0);
assert.equal(s.longest, 2);

// Datas futuras e repetidas são ignoradas
s = computeStreak(["2026-10-27", "2026-10-27", "2026-10-30"], "2026-10-27");
assert.equal(s.current, 1);

// --- Revisão espaçada ---
// Errou dia 20: volta dia 21
let r = spacedReviewState([{ dateKey: "2026-10-20", correct: false }]);
assert.deepEqual(r, { stage: 0, dueKey: "2026-10-21" });
assert.equal(isDue(r, "2026-10-20"), false);
assert.equal(isDue(r, "2026-10-21"), true);
assert.equal(isDue(r, "2026-10-25"), true);

// Acertou no dia 21: próximo em 3 dias
r = spacedReviewState([{ dateKey: "2026-10-20", correct: false }, { dateKey: "2026-10-21", correct: true }]);
assert.deepEqual(r, { stage: 1, dueKey: "2026-10-24" });

// Acerto no mesmo dia do erro não avança
r = spacedReviewState([{ dateKey: "2026-10-20", correct: false }, { dateKey: "2026-10-20", correct: true }]);
assert.deepEqual(r, { stage: 0, dueKey: "2026-10-21" });

// Ciclo completo: 1, 3, 7, 14 → concluída
r = spacedReviewState([
  { dateKey: "2026-10-01", correct: false },
  { dateKey: "2026-10-02", correct: true },
  { dateKey: "2026-10-05", correct: true },
  { dateKey: "2026-10-12", correct: true },
  { dateKey: "2026-10-26", correct: true },
]);
assert.deepEqual(r, { stage: 4, dueKey: null });

// Novo erro no meio volta para 1 dia
r = spacedReviewState([
  { dateKey: "2026-10-01", correct: false },
  { dateKey: "2026-10-02", correct: true },
  { dateKey: "2026-10-05", correct: false },
]);
assert.deepEqual(r, { stage: 0, dueKey: "2026-10-06" });

// Nunca errou: fora da fila
r = spacedReviewState([{ dateKey: "2026-10-01", correct: true }]);
assert.equal(r.dueKey, null);

// --- Meta do dia ---
let goal = buildDailyGoal({ dailyQuestionDone: false, reviewsDue: 2, questionsToday: 0 });
assert.equal(goal.completed, 0);
assert.equal(goal.done, false);
goal = buildDailyGoal({ dailyQuestionDone: true, reviewsDue: 0, questionsToday: 7 });
assert.equal(goal.done, true);
assert.equal(goal.steps.find((step) => step.id === "practice")?.detail, "5 de 5");
assert.equal(goal.total, 3, "Sem aula sugerida, a meta tem 3 passos.");
assert.equal(goal.minutes, 5);
const lessonGoal = { href: "/estudar/portugues/pontuacao", topic: "Pontuação", readingMinutes: 7 } as const;
goal = buildDailyGoal({ dailyQuestionDone: true, reviewsDue: 0, questionsToday: 7, lesson: lessonGoal });
assert.equal(goal.total, 4);
assert.equal(goal.done, false, "Com aula sugerida e não lida, a meta não fecha.");
assert.equal(goal.minutes, 10);
goal = buildDailyGoal({ dailyQuestionDone: true, reviewsDue: 0, questionsToday: 7, lesson: lessonGoal, lessonReadToday: true });
assert.equal(goal.done, true);

async function testReminders() {
process.env.CRON_SECRET = "test-secret-for-unsubscribe";
const reminders = await import("../src/lib/study-reminders");
assert.equal(reminders.hourInSaoPaulo(new Date("2026-10-27T22:10:00Z")), 19);
assert.equal(reminders.hourInSaoPaulo(new Date("2026-10-27T21:59:00Z")), 18);
const userId = "6c1b8f2e-1d2a-4c55-9a51-0d6c1f7e8a90";
const token = reminders.unsubscribeToken(userId)!;
assert.ok(reminders.isValidUnsubscribeToken(userId, token));
assert.equal(reminders.isValidUnsubscribeToken(userId, token.slice(0, -1) + (token.endsWith("A") ? "B" : "A")), false);
assert.equal(reminders.isValidUnsubscribeToken("6c1b8f2e-1d2a-4c55-9a51-0d6c1f7e8a91", token), false);
assert.match(reminders.buildStudyReminderMessage({ current: 4, atRisk: true }).subject, /4 dias/);
assert.match(reminders.buildStudyReminderMessage({ current: 0, atRisk: false }).subject, /5 minutos/);
const outside = await reminders.processStudyReminders(new Date("2026-10-27T15:00:00Z"));
assert.equal(outside.studyReminderWindow, false);
}

void testReminders().then(() => console.log("Retenção: sequência com folga semanal e revisão espaçada, meta do dia e lembrete validados."));
