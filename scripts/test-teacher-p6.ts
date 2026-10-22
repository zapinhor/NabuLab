import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildTeacherReport, type TeacherActivity, type TeacherAttempt, type TeacherMember } from "../src/lib/teacher-analytics";
import { buildTeacherInsights, type P6Evidence } from "../src/lib/teacher-insights";

const filters = { from: "2026-10-01", to: "2026-10-30", activityId: "", subject: "", topic: "", difficulty: "" };
const members: TeacherMember[] = [
  { user_id: "s1", status: "active", full_name: "Ana", username: "ana" },
  { user_id: "s2", status: "active", full_name: "Bruno", username: "bruno" },
  { user_id: "s3", status: "active", full_name: "Carla", username: "carla" },
];
const activities: TeacherActivity[] = Array.from({ length: 7 }, (_, index) => ({ id: `a${index + 1}`, title: `Atividade ${index + 1}`, status: "published", created_at: `2026-10-${String(index + 1).padStart(2, "0")}T12:00:00Z`, due_at: null }));
const attempts: TeacherAttempt[] = activities.flatMap((activity, index) => members.filter((member) => member.user_id !== "s3" || index < 6).map((member, memberIndex) => ({
  attempt_id: `${activity.id}:${member.user_id}`, activity_id: activity.id, student_id: member.user_id, attempt_number: 1, status: "submitted", started_at: activity.created_at, submitted_at: activity.created_at,
  score: memberIndex === 0 ? [90, 88, 85, 62, 58, 55, 54][index] : 75, correct_count: 7, total_questions: 10,
})));
const report = buildTeacherReport({ members, activities, attempts, answers: [], filters });
const evidence: P6Evidence = {
  content: [
    { subject: "Matemática", topic: "Álgebra", difficulty: "medio", responses: 30, correct: 26, errors: 4, students: 3 },
    { subject: "Física", topic: "Cinemática", difficulty: "medio", responses: 30, correct: 11, errors: 19, students: 3 },
  ],
  questions: [{ activity_id: "a6", position: 2, subject: "Física", topic: "Cinemática", difficulty: "medio", statement: "Questão excepcional", responses: 10, correct: 0, errors: 10, students: 3 }],
  student_topics: [{ student_id: "s1", subject: "Física", topic: "Cinemática", activities: 3, responses: 9, correct: 3, errors: 6 }],
};
const insights = buildTeacherInsights(report, evidence);
assert.ok(insights.all.some((item) => item.kind === "difficulty" && item.title.includes("Cinemática")), "detecta dificuldade da turma");
assert.ok(insights.all.some((item) => item.kind === "strength" && item.title.includes("Álgebra")), "detecta ponto forte");
assert.ok(insights.all.some((item) => item.id === "trend:class" && item.title.includes("caiu")), "detecta tendência negativa com janelas equivalentes");
assert.ok(insights.all.some((item) => item.kind === "recurring" && item.title.includes("Ana")), "detecta dificuldade recorrente");
assert.ok(insights.all.some((item) => item.kind === "question"), "sinaliza questão anômala sem afirmar erro");
assert.ok(insights.all.some((item) => item.kind === "pending"), "detecta alunos com pendência");
assert.ok(insights.priority.length <= 5, "prioriza no máximo cinco insights");
assert.equal(new Set(insights.priority.map((item) => item.kind)).size, insights.priority.length, "prioridade não repete categoria quando há diversidade");
const weak = buildTeacherInsights(report, { content: [{ subject: "Física", topic: "Óptica", difficulty: "medio", responses: 2, correct: 0, errors: 2, students: 1 }], questions: [], student_topics: [] });
assert.ok(!weak.all.some((item) => item.kind === "difficulty"), "não transforma amostra fraca em dificuldade");
const individual = buildTeacherInsights({ ...report, students: report.students.filter((student) => student.id === "s1"), history: report.history.filter((item) => item.studentId === "s1") }, evidence, "s1");
assert.ok(!individual.all.some((item) => item.kind === "pending"), "visão individual não cria ranking ou alerta de outros alunos");
const migration = readFileSync("supabase/migrations/20261021221045_teacher_p6_deterministic_insights.sql", "utf8");
assert.match(migration, /security definer set search_path = ''/gi, "RPCs P6 usam search_path seguro");
assert.match(migration, /c\.owner_id = \(select auth\.uid\(\)\)/, "RPC de evidência exige proprietário da turma");
assert.match(migration, /teacher_feature_enabled/, "P6 respeita entitlement P4");
assert.match(migration, /'draft'\s*\)\s*returning id into result/, "revisão nasce em rascunho");
assert.doesNotMatch(migration, /exam_attempts|daily_exam_usage|correct_answer/i, "P6 não lê dados pessoais Student ou gabarito no cliente");
console.log("P6: insights determinísticos, evidência mínima, prioridade, revisão em rascunho, isolamento e gates OK");
