import assert from "node:assert/strict";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.STAGING_SUPABASE_URL;
const publishable = process.env.STAGING_SUPABASE_PUBLISHABLE_KEY;
if (!url || !publishable) throw new Error("Staging Supabase URL and publishable key are required.");

const suffix = Date.now().toString(36);
const password = `Onboarding-${suffix}!Aa9`;
const emails = {
  teacher: `onboarding-teacher-${suffix}@nabulab.org`,
  student: `onboarding-student-${suffix}@nabulab.org`,
};
type Client = SupabaseClient;

async function signup(email: string) {
  const client = createClient(url!, publishable!, { auth: { persistSession: false } });
  const result = await client.auth.signUp({ email, password });
  if (result.error) throw result.error;
  assert.ok(result.data.user, "signup must create a user");
  assert.ok(result.data.session, "signup must return a session without email confirmation");
  return { client, userId: result.data.user.id };
}

async function rpc<T>(client: Client, name: string, args: Record<string, unknown> = {}) {
  const result = await client.rpc(name, args);
  if (result.error) throw new Error(`${name}: ${result.error.message}`);
  return result.data as T;
}

async function main() {
  const teacher = await signup(emails.teacher);
  const student = await signup(emails.student);

  const consumptions = await Promise.all(
    Array.from({ length: 11 }, (_, index) => rpc<Array<{ allowed: boolean; counted: boolean; used_count: number; remaining: number }>>(
      student.client,
      "consume_student_question_quota",
      { p_exam_id: "onboarding-concurrent", p_question_id: `question-${index + 1}` },
    )),
  );
  const rows = consumptions.map((result) => result[0]);
  assert.equal(rows.filter((row) => row.allowed).length, 10);
  assert.equal(rows.filter((row) => !row.allowed).length, 1);
  assert.equal(Math.max(...rows.map((row) => row.used_count)), 10);

  const duplicate = (await rpc<Array<{ allowed: boolean; counted: boolean; used_count: number }>>(
    student.client,
    "consume_student_question_quota",
    { p_exam_id: "onboarding-concurrent", p_question_id: "question-1" },
  ))[0];
  assert.equal(duplicate.allowed, true);
  assert.equal(duplicate.counted, false);
  assert.equal(duplicate.used_count, 10);

  await rpc(teacher.client, "activate_teacher_account");
  const classId = await rpc<string>(teacher.client, "create_teacher_class", {
    p_name: "Onboarding staging",
    p_public_name: "Onboarding staging",
    p_description: null,
    p_school_name: null,
    p_subject: "Física",
    p_visibility: "public_approval",
  });
  const questionId = await rpc<string>(teacher.client, "create_owned_teacher_question", {
    p_statement: "Qual é a unidade de força?",
    p_alternatives: ["newton", "joule", "watt"],
    p_correct_answer: "newton",
    p_explanation: "Força é medida em newtons.",
    p_subject: "Física",
    p_topic: "Dinâmica",
    p_difficulty: "iniciante",
    p_question_type: "multiple_choice",
    p_visibility: "private",
  });
  const examId = await rpc<string>(teacher.client, "create_teacher_exam", { p_title: "Onboarding staging", p_description: null, p_is_shared: false });
  await rpc(teacher.client, "add_teacher_exam_question", { p_exam_id: examId, p_question_id: questionId });
  await rpc(teacher.client, "set_teacher_exam_status", { p_exam_id: examId, p_status: "published" });
  await rpc(student.client, "request_teacher_class_join", { p_class_id: classId });
  await rpc(teacher.client, "decide_teacher_class_member", { p_class_id: classId, p_user_id: student.userId, p_approve: true });
  const activityId = await rpc<string>(teacher.client, "create_teacher_activity", {
    p_class_id: classId,
    p_exam_id: examId,
    p_title: "Atividade sem franquia",
    p_instructions: null,
    p_available_from: null,
    p_due_at: null,
    p_max_attempts: 1,
    p_shuffle_questions: false,
    p_shuffle_alternatives: false,
    p_show_score: true,
    p_answer_policy: "immediate",
  });
  const attemptId = await rpc<string>(student.client, "start_teacher_activity_attempt", { p_activity_id: activityId });
  await rpc(student.client, "submit_teacher_activity_attempt", { p_attempt_id: attemptId, p_answers: { "1": "newton" } });
  const usage = await student.client.from("student_question_usage").select("used_count").single();
  if (usage.error) throw usage.error;
  assert.equal(usage.data.used_count, 10, "teacher activity must not consume Student quota");

  console.log(JSON.stringify({
    signupSession: "immediate",
    studentUserId: student.userId,
    teacherUserId: teacher.userId,
    concurrentAllowed: 10,
    eleventhBlocked: true,
    duplicateCounted: false,
    teacherActivityUsage: usage.data.used_count,
  }));
}

void main().catch((error: unknown) => {
  console.error(JSON.stringify({ message: error instanceof Error ? error.message : String(error) }));
  process.exitCode = 1;
});
