import assert from "node:assert/strict";

import {
  applyStudentStreakOverride,
  type StudyDay,
} from "../src/lib/study-consistency";

function studyDay(dateKey: string): StudyDay {
  const [year, month, day] = dateKey.split("-").map(Number);

  return {
    dateKey,
    date: new Date(year, month - 1, day, 12),
    exams: 1,
    questions: 10,
    correct: 8,
    averageScore: 80,
  };
}

const today = new Date(2026, 9, 8, 12);

assert.deepEqual(
  applyStudentStreakOverride({
    calculatedCurrent: 2,
    calculatedLongest: 9,
    studyDays: [],
    override: { streakDays: 15, anchoredOn: "2026-10-08" },
    today,
  }),
  { currentStreak: 15, longestStreak: 15 },
  "o ajuste deve definir a sequência atual sem alterar provas",
);

assert.deepEqual(
  applyStudentStreakOverride({
    calculatedCurrent: 1,
    calculatedLongest: 9,
    studyDays: [studyDay("2026-10-09")],
    override: { streakDays: 15, anchoredOn: "2026-10-08" },
    today: new Date(2026, 9, 9, 12),
  }),
  { currentStreak: 16, longestStreak: 16 },
  "estudar no dia seguinte deve continuar a sequência ajustada",
);

assert.deepEqual(
  applyStudentStreakOverride({
    calculatedCurrent: 0,
    calculatedLongest: 9,
    studyDays: [],
    override: { streakDays: 15, anchoredOn: "2026-10-08" },
    today: new Date(2026, 9, 10, 12),
  }),
  { currentStreak: 0, longestStreak: 15 },
  "dois dias sem estudar devem encerrar a sequência normalmente",
);

assert.deepEqual(
  applyStudentStreakOverride({
    calculatedCurrent: 3,
    calculatedLongest: 12,
    studyDays: [studyDay("2026-10-10")],
    override: { streakDays: 15, anchoredOn: "2026-10-08" },
    today: new Date(2026, 9, 10, 12),
  }),
  { currentStreak: 3, longestStreak: 15 },
  "uma lacuna deve encerrar o ajuste e preservar a lógica real subsequente",
);

console.log("Streak override tests passed.");
