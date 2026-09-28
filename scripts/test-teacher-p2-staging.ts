import assert from "node:assert/strict";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.STAGING_SUPABASE_URL;
const publishable = process.env.STAGING_SUPABASE_PUBLISHABLE_KEY;
const secret = process.env.STAGING_SUPABASE_SECRET_KEY;
if (!url || !publishable || !secret) throw new Error("Staging Supabase configuration is required.");

const admin = createClient(url, secret, { auth: { persistSession: false } });
const suffix = Date.now().toString(36);
const password = `P2-${suffix}!Aa9`;
const users = ["teacher", "student", "other"].map((role) => ({ role, email: `p2-${role}-${suffix}@nabulab.test` }));
const createdIds: string[] = [];
// The staging project schema is intentionally exercised dynamically before generated types exist.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TestClient = SupabaseClient<any, "public", any>;

async function userClient(email: string) {
  const client = createClient(url!, publishable!, { auth: { persistSession: false } });
  const login = await client.auth.signInWithPassword({ email, password });
  if (login.error) throw login.error;
  return client;
}
async function rpc<T>(client: TestClient, name: string, args: Record<string, unknown> = {}) {
  const result = await client.rpc(name, args);
  if (result.error) throw new Error(`${name}: ${result.error.message}`);
  return result.data as T;
}

async function main() {
try {
  for (const item of users) {
    const created = await admin.auth.admin.createUser({ email: item.email, password, email_confirm: true, user_metadata: { full_name: `P2 ${item.role}`, username: `p2_${item.role}_${suffix}` } });
    if (created.error) throw created.error;
    createdIds.push(created.data.user.id);
  }
  const teacher = await userClient(users[0].email);
  const student = await userClient(users[1].email);
  const other = await userClient(users[2].email);
  await rpc(teacher, "activate_teacher_account");
  const classId = await rpc<string>(teacher, "create_teacher_class", { p_name: "P2 E2E", p_public_name: "Turma P2 E2E", p_description: null, p_school_name: null, p_subject: "Física", p_visibility: "public_approval" });
  const questionId = await rpc<string>(teacher, "create_owned_teacher_question", { p_statement: "Qual é a unidade de força?", p_alternatives: ["newton", "joule", "watt"], p_correct_answer: "newton", p_explanation: "Força usa newton.", p_subject: "Física", p_topic: "Dinâmica", p_difficulty: "iniciante", p_question_type: "multiple_choice", p_visibility: "private" });
  const duplicateQuestion = await rpc<string>(teacher, "duplicate_teacher_question", { p_question_id: questionId });
  assert.notEqual(duplicateQuestion, questionId);
  await rpc(teacher, "set_teacher_question_archived", { p_question_id: questionId, p_archived: true });
  await rpc(teacher, "set_teacher_question_archived", { p_question_id: questionId, p_archived: false });
  const examId = await rpc<string>(teacher, "create_teacher_exam", { p_title: "Simulado P2 E2E", p_description: null, p_is_shared: false });
  await rpc(teacher, "add_teacher_exam_question", { p_exam_id: examId, p_question_id: questionId });
  await rpc(teacher, "set_teacher_exam_status", { p_exam_id: examId, p_status: "published" });
  const duplicateExam = await rpc<string>(teacher, "duplicate_teacher_exam", { p_exam_id: examId });
  const copied = await teacher.from("teacher_exams").select("status").eq("id", duplicateExam).single();
  assert.equal(copied.data?.status, "draft");
  await rpc(student, "request_teacher_class_join", { p_class_id: classId });
  await rpc(teacher, "decide_teacher_class_member", { p_class_id: classId, p_user_id: createdIds[1], p_approve: true });
  const activityId = await rpc<string>(teacher, "create_teacher_activity", { p_class_id: classId, p_exam_id: examId, p_title: "Atividade P2 E2E", p_instructions: "Teste", p_available_from: null, p_due_at: new Date(Date.now() + 86_400_000).toISOString(), p_max_attempts: 2, p_shuffle_questions: true, p_shuffle_alternatives: true, p_show_score: true, p_answer_policy: "immediate" });
  const snapshotBefore = await admin.from("teacher_activity_questions").select("question_snapshot").eq("activity_id", activityId).single();
  await rpc(teacher, "update_owned_teacher_question", { p_question_id: questionId, p_statement: "Alterada depois da publicação", p_alternatives: ["newton", "joule", "watt"], p_correct_answer: "newton", p_explanation: "Força usa newton.", p_subject: "Física", p_topic: "Dinâmica", p_difficulty: "iniciante", p_question_type: "multiple_choice", p_visibility: "private" });
  const snapshotAfter = await admin.from("teacher_activity_questions").select("question_snapshot").eq("activity_id", activityId).single();
  assert.deepEqual(snapshotAfter.data, snapshotBefore.data);
  const attempt1 = await rpc<string>(student, "start_teacher_activity_attempt", { p_activity_id: activityId });
  const order1 = await rpc(student, "get_teacher_attempt_questions", { p_attempt_id: attempt1 });
  const order2 = await rpc(student, "get_teacher_attempt_questions", { p_attempt_id: attempt1 });
  assert.deepEqual(order1, order2);
  assert.equal(JSON.stringify(order1).includes("correct_answer"), false);
  await rpc(student, "submit_teacher_activity_attempt", { p_attempt_id: attempt1, p_answers: { "1": "newton" } });
  const result = await rpc<Array<{ score: number; answers: unknown }>>(student, "get_teacher_attempt_result", { p_attempt_id: attempt1 });
  assert.equal(Number(result[0].score), 100);
  assert.ok(result[0].answers);
  const attempt2 = await rpc<string>(student, "start_teacher_activity_attempt", { p_activity_id: activityId });
  await rpc(student, "submit_teacher_activity_attempt", { p_attempt_id: attempt2, p_answers: { "1": "newton" } });
  const third = await student.rpc("start_teacher_activity_attempt", { p_activity_id: activityId });
  assert.match(third.error?.message ?? "", /activity_attempt_limit_reached/);
  const scheduled = await rpc<string>(teacher, "create_teacher_activity", { p_class_id: classId, p_exam_id: examId, p_title: "Agendada P2", p_instructions: null, p_available_from: new Date(Date.now() + 86_400_000).toISOString(), p_due_at: new Date(Date.now() + 172_800_000).toISOString(), p_max_attempts: 1, p_shuffle_questions: false, p_shuffle_alternatives: false, p_show_score: false, p_answer_policy: "never" });
  const early = await student.rpc("start_teacher_activity_attempt", { p_activity_id: scheduled });
  assert.match(early.error?.message ?? "", /activity_not_open/);
  await rpc(other, "activate_teacher_account");
  const cross = await other.rpc("duplicate_teacher_exam", { p_exam_id: examId });
  assert.match(cross.error?.message ?? "", /exam_owner_required/);
  const [usage, studentAttempts] = await Promise.all([
    admin.from("daily_exam_usage").select("*", { count: "exact", head: true }).eq("user_id", createdIds[1]),
    admin.from("exam_attempts").select("*", { count: "exact", head: true }).eq("user_id", createdIds[1]),
  ]);
  if (usage.error) throw usage.error;
  if (studentAttempts.error) throw studentAttempts.error;
  assert.equal(usage.count, 0);
  assert.equal(studentAttempts.count, 0);
  console.log(JSON.stringify({ connection: "ok", questionDuplicate: "ok", questionArchive: "ok", examDuplicate: "ok", snapshot: "ok", scheduling: "ok", attempts: "2/2 enforced", shuffleStable: "ok", answersProtected: "ok", crossTeacherIsolation: "ok", studentQuotaUsage: 0 }));
} finally {
  for (const id of createdIds.reverse()) await admin.auth.admin.deleteUser(id);
}
}

void main().catch((error: unknown) => {
  const value = error as { message?: string; code?: string; details?: string };
  console.error(JSON.stringify({ message: value?.message ?? String(error), code: value?.code, details: value?.details }));
  process.exitCode = 1;
});
