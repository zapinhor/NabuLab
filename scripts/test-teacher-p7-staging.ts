import assert from "node:assert/strict";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.STAGING_SUPABASE_URL;
const publishable = process.env.STAGING_SUPABASE_PUBLISHABLE_KEY;
const serviceRole = process.env.STAGING_SUPABASE_SERVICE_ROLE_KEY;
if (!url || !publishable || !serviceRole) throw new Error("Staging Supabase URL, publishable key and service role are required.");

const suffix = Date.now().toString(36);
const password = `P7-${suffix}!Aa9safe`;
const emails = [`p7-teacher-${suffix}@nabulab.org`, `p7-student-${suffix}@nabulab.org`, `p7-other-${suffix}@nabulab.org`];
type Client = SupabaseClient;
const admin = createClient(url, serviceRole, { auth: { persistSession: false } });

async function createUser(email: string) {
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.error || !created.data.user) throw created.error ?? new Error("user creation failed");
  const client = createClient(url!, publishable!, { auth: { persistSession: false } });
  const login = await client.auth.signInWithPassword({ email, password });
  if (login.error) throw login.error;
  return { id: created.data.user.id, client };
}

async function rpc<T>(client: Client, name: string, args: Record<string, unknown> = {}) {
  const result = await client.rpc(name, args);
  if (result.error) throw new Error(`${name}: ${result.error.message}`);
  return result.data as T;
}

async function cleanup(ids: string[]) {
  if (!ids.length) return;
  await admin.from("analytics_events").delete().in("user_id", ids);
  await admin.from("teacher_classes").delete().in("owner_id", ids);
  await admin.from("teacher_exams").update({ status: "draft" }).in("owner_id", ids);
  const exams = await admin.from("teacher_exams").select("id").in("owner_id", ids);
  if (exams.data?.length) await admin.from("teacher_exam_questions").delete().in("exam_id", exams.data.map((row) => row.id));
  await admin.from("teacher_exams").delete().in("owner_id", ids);
  await admin.from("teacher_questions").delete().in("owner_id", ids);
  await admin.from("teacher_accounts").delete().in("user_id", ids);
  for (const id of ids) await admin.auth.admin.deleteUser(id);
}

async function main() {
  const ids: string[] = [];
  try {
    const teacher = await createUser(emails[0]); ids.push(teacher.id);
    const student = await createUser(emails[1]); ids.push(student.id);
    const other = await createUser(emails[2]); ids.push(other.id);
    await rpc(teacher.client, "activate_teacher_account");
    await rpc(other.client, "activate_teacher_account");
    const classId = await rpc<string>(teacher.client, "create_teacher_class", { p_name: "P7 descartável", p_public_name: "P7 descartável", p_description: null, p_school_name: null, p_subject: "Física", p_visibility: "public_approval" });
    const questionId = await rpc<string>(teacher.client, "create_owned_teacher_question", { p_statement: "Qual unidade representa força?", p_alternatives: ["newton", "joule", "watt"], p_correct_answer: "newton", p_explanation: "Força é medida em newtons.", p_subject: "Física", p_topic: "Dinâmica", p_difficulty: "iniciante", p_question_type: "multiple_choice", p_visibility: "private" });
    const examId = await rpc<string>(teacher.client, "create_teacher_exam", { p_title: "Diagnóstico P7", p_description: "Descartável", p_is_shared: false });
    await rpc(teacher.client, "add_teacher_exam_question", { p_exam_id: examId, p_question_id: questionId });
    await rpc(teacher.client, "set_teacher_exam_status", { p_exam_id: examId, p_status: "published" });
    await rpc(student.client, "request_teacher_class_join", { p_class_id: classId });
    await rpc(teacher.client, "decide_teacher_class_member", { p_class_id: classId, p_user_id: student.id, p_approve: true });
    const activityId = await rpc<string>(teacher.client, "create_teacher_activity", { p_class_id: classId, p_exam_id: examId, p_title: "Primeira atividade P7", p_instructions: null, p_available_from: null, p_due_at: null, p_max_attempts: 1, p_shuffle_questions: false, p_shuffle_alternatives: false, p_show_score: true, p_answer_policy: "immediate" });
    const attemptId = await rpc<string>(student.client, "start_teacher_activity_attempt", { p_activity_id: activityId });
    await rpc(student.client, "submit_teacher_activity_attempt", { p_attempt_id: attemptId, p_answers: { "1": "newton" } });
    await rpc(teacher.client, "set_teacher_onboarding_dismissed", { p_dismissed: true });

    const account = await teacher.client.from("teacher_accounts").select("onboarding_dismissed_at").single();
    assert.ok(account.data?.onboarding_dismissed_at);
    const counts = await Promise.all([
      admin.from("teacher_classes").select("id", { count: "exact", head: true }).eq("owner_id", teacher.id),
      admin.from("teacher_questions").select("id", { count: "exact", head: true }).eq("owner_id", teacher.id),
      admin.from("teacher_exams").select("id", { count: "exact", head: true }).eq("owner_id", teacher.id),
      admin.from("teacher_class_members").select("user_id", { count: "exact", head: true }).eq("class_id", classId).eq("status", "active"),
      admin.from("teacher_activity_attempts").select("id", { count: "exact", head: true }).eq("activity_id", activityId).eq("status", "submitted"),
    ]);
    counts.forEach((result) => assert.equal(result.count, 1));
    const isolated = await other.client.rpc("get_owned_teacher_class", { p_class_id: classId });
    assert.equal(isolated.data?.length ?? 0, 0, "Professor B must not access Professor A class");
    const studentDenied = await student.client.rpc("set_teacher_onboarding_dismissed", { p_dismissed: true });
    assert.ok(studentDenied.error, "Student without teacher account must not mutate onboarding");
    const quota = await admin.from("student_question_usage").select("used_count").eq("user_id", student.id).maybeSingle();
    assert.ok(!quota.data || quota.data.used_count === 0, "Teacher activity must not consume Student quota");
    console.log(JSON.stringify({ funnel: "class-question-exam-activity-student-submission", onboardingDismissed: true, isolation: true, studentQuotaUntouched: true }));
  } finally {
    await cleanup(ids);
  }
}

void main().catch((error: unknown) => { console.error(JSON.stringify({ message: error instanceof Error ? error.message : String(error) })); process.exitCode = 1; });
