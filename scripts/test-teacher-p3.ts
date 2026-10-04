import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildTeacherReport, parseTeacherFilters, type TeacherActivity, type TeacherAnswer, type TeacherAttempt, type TeacherMember } from "../src/lib/teacher-analytics";
import { teacherAnalyticsCsv } from "../src/lib/teacher-analytics-export";

const now = new Date("2026-10-04T15:00:00Z");
const filters = parseTeacherFilters({ from: "2026-10-01", to: "2026-10-04" }, now);
assert.deepEqual([filters.from, filters.to], ["2026-10-01", "2026-10-04"]);
assert.equal(parseTeacherFilters({ from: "2026-10-05", to: "2026-10-04" }, now).to, "2026-10-04");
const members: TeacherMember[] = [
  { user_id: "s1", status: "active", full_name: "=Aluno Teste", username: "aluno" },
  { user_id: "s2", status: "active", full_name: "Segundo Aluno", username: "segundo" },
  { user_id: "old", status: "rejected", full_name: "Fora", username: null },
];
const activities: TeacherActivity[] = [
  { id: "a1", title: "Física", status: "published", created_at: "2026-09-28T12:00:00Z", due_at: null },
  { id: "a2", title: "Biologia", status: "published", created_at: "2026-10-02T12:00:00Z", due_at: null },
  { id: "draft", title: "Rascunho", status: "draft", created_at: "2026-10-02T12:00:00Z", due_at: null },
];
const attempt = (id: string, activity_id: string, student_id: string, attempt_number: number, score: number | null, correct_count: number | null, status = "submitted"): TeacherAttempt => ({
  attempt_id: id, activity_id, student_id, attempt_number, status, started_at: "2026-10-03T10:00:00Z",
  submitted_at: status === "submitted" ? "2026-10-03T11:00:00Z" : null, score, correct_count, total_questions: 10,
});
const attempts = [attempt("r1", "a1", "s1", 1, 40, 4), attempt("r2", "a1", "s1", 2, 80, 8),
  attempt("r3", "a2", "s1", 1, 60, 6), attempt("r4", "a2", "s2", 1, null, null, "in_progress"),
  attempt("outside", "a1", "old", 1, 100, 10)];
const answers: TeacherAnswer[] = [
  { activity_id: "a1", question_position: 1, subject: "Física", topic: "Dinâmica", difficulty: "medio", statement: "Questão de força", response_count: 1, correct_count: 0, error_count: 1 },
  { activity_id: "a2", question_position: 1, subject: "Biologia", topic: "Genética", difficulty: "avancado", statement: "Questão de genes", response_count: 1, correct_count: 1, error_count: 0 },
];
const report = buildTeacherReport({ members, activities, attempts, answers, filters });
assert.equal(report.summary.students, 2);
assert.equal(report.summary.activities, 2, "atendimentos no período mantêm atividade anterior");
assert.equal(report.summary.participation, 100);
assert.equal(report.summary.completion, 50);
assert.equal(report.summary.average, 70);
assert.equal(report.summary.pendingStudents, 1);
assert.equal(report.students.find((row) => row.id === "s1")?.average, 70);
assert.equal(report.students.find((row) => row.id === "s2")?.completed, 0);
assert.equal(report.students.find((row) => row.id === "s1")?.accuracy, 70);
assert.equal(report.bySubject.find((row) => row.label === "Física")?.errors, 1);
assert.equal(report.byTopic.find((row) => row.label === "Genética")?.correct, 1);
assert.equal(report.byDifficulty.find((row) => row.label === "medio")?.accuracy, 0);
assert.equal(report.questions[0].errorRate, 100);
assert.equal(report.activities.find((row) => row.id === "a1")?.average, 80);
assert.equal(report.activities.find((row) => row.id === "a2")?.participation, 100);
assert.equal(report.distribution.reduce((sum, row) => sum + row.count, 0), 2);
const physics = buildTeacherReport({ members, activities, attempts, answers, filters: { ...filters, subject: "Física", activityId: "a1" } });
assert.equal(physics.questions.length, 1);
assert.equal(physics.bySubject.length, 1);
assert.equal(physics.activityOptions.length, 2);
const empty = buildTeacherReport({ members: [], activities: [], attempts: [], answers: [], filters });
assert.equal(empty.summary.average, null);
assert.equal(empty.summary.participation, null);
assert.equal(empty.questions.length, 0);
const csv = teacherAnalyticsCsv(report, "students");
assert.ok(csv.startsWith("\uFEFF"));
assert.ok(csv.includes("'=Aluno Teste"), "CSV não deve executar fórmula de nome");
assert.ok(!csv.toLowerCase().includes("email"));
const migration = readFileSync("supabase/migrations/20261004154619_teacher_p3_analytics.sql", "utf8");
assert.match(migration, /security definer set search_path = ''/gi);
assert.match(migration, /c\.owner_id = \(select auth\.uid\(\)\)/);
assert.match(migration, /m\.status = 'active'/);
assert.doesNotMatch(migration, /exam_attempts|daily_exam_usage|correct_answer/i);
console.log("P3: métricas, filtros, snapshots, CSV, isolamento SQL e regressão Student OK");
