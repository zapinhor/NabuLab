import assert from "node:assert/strict";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildTeacherInsights, type P6Evidence } from "../src/lib/teacher-insights";
import { buildTeacherReport, type TeacherActivity, type TeacherAttempt, type TeacherMember } from "../src/lib/teacher-analytics";

const url = process.env.STAGING_SUPABASE_URL;
const secret = process.env.STAGING_SUPABASE_SECRET_KEY;
const publishableKey = process.env.STAGING_SUPABASE_PUBLISHABLE_KEY ?? process.env.STAGING_SUPABASE_ANON_KEY;
if (!url || !secret || !publishableKey || !url.includes("xxtgtujaecoxkesyprrx")) {
  throw new Error("The P6 staging test requires only the xxtgtujaecoxkesyprrx project credentials.");
}

const admin = createClient(url, secret, { auth: { persistSession: false } });
const suffix = Date.now().toString(36);
const prefix = `p6-${suffix}`;
const password = `P6-${suffix}!Aa9`;
const users: string[] = [];
const keepFixture = process.env.P6_KEEP_FIXTURE === "true";

type Actor = { id: string; email: string; client?: SupabaseClient };

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function withAuthRateLimitRetry<T>(operation: () => Promise<T & { error: { code?: string } | null }>) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const result = await operation();
    if (!result.error || result.error.code !== "over_request_rate_limit") return result;
    await wait(1_000 * (attempt + 1));
  }
  return operation();
}

async function actor(role: string, signIn = true): Promise<Actor> {
  const email = `${prefix}-${role}@nabulab.test`;
  const created = await withAuthRateLimitRetry(() => admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: `P6 ${role}`, username: `${prefix}_${role}`.replaceAll("-", "_") },
  }));
  if (created.error) throw created.error;
  users.push(created.data.user.id);
  if (!signIn) return { id: created.data.user.id, email };
  const client = createClient(url!, publishableKey!, { auth: { persistSession: false } });
  const signed = await withAuthRateLimitRetry(() => client.auth.signInWithPassword({ email, password }));
  if (signed.error) throw signed.error;
  return { id: created.data.user.id, email, client };
}

async function createActors(count: number) {
  const result: Actor[] = [];
  for (let index = 0; index < count; index += 1) {
    result.push(await actor(`student-${index + 1}`, false));
    await wait(250);
  }
  return result;
}

async function cleanupFixtures() {
  const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 1_000 });
  if (listed.error) throw listed.error;
  const fixtureUsers = listed.data.users.filter((user) => user.email?.startsWith("p6-") && user.email.endsWith("@nabulab.test"));
  const ids = fixtureUsers.map((user) => user.id);
  if (!ids.length) return;
  await admin.from("teacher_classes").delete().in("owner_id", ids).throwOnError();
  await admin.from("teacher_exams").delete().in("owner_id", ids).throwOnError();
  await admin.from("teacher_questions").delete().in("owner_id", ids).throwOnError();
  for (const user of fixtureUsers) {
    const deleted = await withAuthRateLimitRetry(() => admin.auth.admin.deleteUser(user.id));
    if (deleted.error) throw deleted.error;
    await wait(200);
  }
}

function expectDenied(error: { code?: string; message?: string } | null, context: string) {
  assert.ok(error, `${context}: access should be denied`);
  assert.match(`${error?.code ?? ""} ${error?.message ?? ""}`, /42501|not available|required|permission/i, context);
}

async function main() {
  let classId: string | null = null;
  let emptyClassId: string | null = null;
  try {
    await cleanupFixtures();
    if (process.env.P6_CLEANUP_ONLY === "true") {
      console.log(JSON.stringify({ cleanup: "ok" }));
      return;
    }
    const [professorA, professorB] = await Promise.all([actor("professor-a"), actor("professor-b")]);
    const students = await createActors(20);
    students[0].client = createClient(url!, publishableKey!, { auth: { persistSession: false } });
    const studentSignIn = await withAuthRateLimitRetry(() => students[0].client!.auth.signInWithPassword({ email: students[0].email, password }));
    if (studentSignIn.error) throw studentSignIn.error;
    await admin.from("teacher_accounts").insert([
      { user_id: professorA.id, plan: "advanced", billing_status: "active" },
      { user_id: professorB.id, plan: "free", billing_status: "free" },
    ]).throwOnError();

    const room = await admin.from("teacher_classes").insert({
      owner_id: professorA.id, name: `${prefix} Principal`, public_name: "P6 Sintética", subject: "Matemática e Física", visibility: "private",
    }).select("id").single();
    if (room.error) throw room.error;
    classId = room.data.id;
    const empty = await admin.from("teacher_classes").insert({
      owner_id: professorA.id, name: `${prefix} Vazia`, public_name: "P6 Vazia", subject: "Matemática", visibility: "private",
    }).select("id").single();
    if (empty.error) throw empty.error;
    emptyClassId = empty.data.id;
    await admin.from("teacher_class_members").insert(students.map((student) => ({
      class_id: classId, user_id: student.id, status: "active", source: "code", joined_at: new Date().toISOString(),
    }))).throwOnError();

    const questions = [
      ["Álgebra", "Matemática", "medio", "A"],
      ["Geometria", "Matemática", "medio", "B"],
      ["Cinemática", "Física", "avancado", "C"],
      ["Cinemática", "Física", "avancado", "D"],
    ] as const;
    const inserted = await admin.from("teacher_questions").insert(questions.map(([topic, subject, difficulty, answer], index) => ({
      owner_id: professorA.id, visibility: "private", statement: `${prefix} ${topic} ${index + 1}`,
      alternatives: ["A", "B", "C", "D"], correct_answer: answer, explanation: "Fixture P6", subject, topic, difficulty, question_type: "multiple_choice",
    }))).select("id,topic");
    if (inserted.error) throw inserted.error;
    const reviewPool = await admin.from("teacher_questions").insert(Array.from({ length: 10 }, (_, index) => ({
      owner_id: professorA.id, visibility: index === 9 ? "shared" : "private", statement: `${prefix} pool Cinemática ${index + 1}`,
      alternatives: ["A", "B", "C", "D"], correct_answer: "A", explanation: "Fixture P6", subject: "Física", topic: "Cinemática", difficulty: "avancado", question_type: "multiple_choice",
    }))).select("id");
    if (reviewPool.error) throw reviewPool.error;

    const exam = await admin.from("teacher_exams").insert({ owner_id: professorA.id, title: `${prefix} Avaliação`, status: "draft" }).select("id").single();
    if (exam.error) throw exam.error;
    await admin.from("teacher_exam_questions").insert(inserted.data.map((question, index) => ({ exam_id: exam.data.id, position: index + 1, teacher_question_id: question.id }))).throwOnError();
    await admin.from("teacher_exams").update({ status: "published", published_at: "2026-10-01T10:00:00Z" }).eq("id", exam.data.id).throwOnError();

    const activities: Array<{ id: string; title: string; created_at: string; status: string; due_at: string | null }> = [];
    for (let index = 0; index < 30; index += 1) {
      const createdAt = `2026-10-${String(index + 1).padStart(2, "0")}T12:00:00Z`;
      const activity = await admin.from("teacher_class_activities").insert({
        class_id: classId, exam_id: exam.data.id, assigned_by: professorA.id, title: `${prefix} Atividade ${index + 1}`,
        status: "published", created_at: createdAt, opens_at: createdAt, due_at: `2026-11-${String(index + 1).padStart(2, "0")}T12:00:00Z`, show_score: true,
      }).select("id,title,status,created_at,due_at").single();
      if (activity.error) throw activity.error;
      activities.push(activity.data);
    }

    const attemptRows: Array<Record<string, unknown>> = [];
    const answerRows: Array<Record<string, unknown>> = [];
    for (let activityIndex = 0; activityIndex < activities.length; activityIndex += 1) {
      const participantCount = activityIndex >= 20 ? 12 : 20;
      for (let studentIndex = 0; studentIndex < participantCount; studentIndex += 1) {
        const attemptId = crypto.randomUUID();
        const early = activityIndex < 27;
        const algebra = studentIndex % 10 !== 0;
        const geometry = studentIndex % 10 < (early ? 7 : 5);
        const cinematic = studentIndex % 10 < (early ? 7 : 3);
        const anomaly = false;
        const correctness = [algebra, geometry, cinematic, anomaly];
        const correctCount = correctness.filter(Boolean).length;
        attemptRows.push({
          id: attemptId, activity_id: activities[activityIndex].id, student_id: students[studentIndex].id,
          status: "submitted", attempt_number: 1, started_at: activities[activityIndex].created_at,
          submitted_at: activities[activityIndex].created_at, correct_count: correctCount, total_questions: 4, score: correctCount * 25,
        });
        correctness.forEach((isCorrect, questionIndex) => answerRows.push({
          attempt_id: attemptId, question_position: questionIndex + 1,
          answer: isCorrect ? questions[questionIndex][3] : "X", is_correct: isCorrect, answered_at: activities[activityIndex].created_at,
        }));
      }
    }
    await admin.from("teacher_activity_attempts").insert(attemptRows).throwOnError();
    for (let offset = 0; offset < answerRows.length; offset += 500) {
      await admin.from("teacher_activity_answers").insert(answerRows.slice(offset, offset + 500)).throwOnError();
    }

    const from = "2026-10-01T00:00:00Z";
    const to = "2026-11-01T00:00:00Z";
    const started = performance.now();
    const evidenceResult = await professorA.client!.rpc("get_teacher_class_p6_evidence", {
      p_class_id: classId, p_from: from, p_to: to, p_activity_id: null, p_subject: null, p_topic: null, p_difficulty: null, p_student_id: null,
    });
    const elapsedMs = Math.round(performance.now() - started);
    if (evidenceResult.error) throw evidenceResult.error;
    const evidence = evidenceResult.data as P6Evidence;
    assert.equal(evidence.content.find((row) => row.topic === "Álgebra")?.responses, 520);
    assert.ok((evidence.content.find((row) => row.topic === "Álgebra")?.correct ?? 0) > 450, "Álgebra is the strong area");
    assert.ok((evidence.content.find((row) => row.topic === "Cinemática")?.correct ?? 999) < 400, "Cinemática is the weak area");

    const members: TeacherMember[] = students.map((student, index) => ({ user_id: student.id, status: "active", full_name: `Student ${index + 1}`, username: `${prefix}_student_${index + 1}` }));
    const attempts: TeacherAttempt[] = attemptRows.map((row) => ({
      attempt_id: String(row.id), activity_id: String(row.activity_id), student_id: String(row.student_id), attempt_number: 1, status: "submitted",
      started_at: String(row.started_at), submitted_at: String(row.submitted_at), score: Number(row.score), correct_count: Number(row.correct_count), total_questions: 4,
    }));
    const report = buildTeacherReport({
      members, activities: activities as TeacherActivity[], attempts, answers: [],
      filters: { from: "2026-10-01", to: "2026-10-31", activityId: "", subject: "", topic: "", difficulty: "" },
    });
    const insights = buildTeacherInsights(report, evidence);
    assert.ok(insights.all.some((item) => item.kind === "difficulty" && item.title.includes("Cinemática")));
    assert.ok(insights.all.some((item) => item.kind === "strength" && item.title.includes("Álgebra")));
    assert.ok(insights.all.some((item) => item.kind === "trend" && item.title.includes("caiu")));
    assert.ok(insights.all.some((item) => item.kind === "pending"));
    assert.ok(insights.all.some((item) => item.kind === "recurring"));
    assert.ok(insights.all.some((item) => item.kind === "question"));
    assert.ok(insights.priority.length <= 5);
    assert.equal(new Set(insights.priority.map((item) => item.kind)).size, insights.priority.length, "priority should represent distinct pedagogical signals");

    const weak = await professorA.client!.rpc("get_teacher_class_p6_evidence", {
      p_class_id: emptyClassId, p_from: from, p_to: to, p_activity_id: null, p_subject: null, p_topic: null, p_difficulty: null, p_student_id: null,
    });
    if (weak.error) throw weak.error;
    assert.deepEqual(weak.data, { content: [], questions: [], student_topics: [] });

    const beforeActivities = await admin.from("teacher_class_activities").select("id", { count: "exact", head: true }).eq("class_id", classId);
    const review = await professorA.client!.rpc("create_teacher_p6_review", {
      p_class_id: classId, p_subject: "Física", p_topic: "Cinemática", p_difficulty: "avancado", p_question_count: 8, p_prefer_easier: false,
    });
    if (review.error) throw review.error;
    const draft = await admin.from("teacher_exams").select("status,owner_id").eq("id", review.data).single();
    assert.deepEqual(draft.data, { status: "draft", owner_id: professorA.id });
    const reviewQuestions = await admin.from("teacher_exam_questions").select("teacher_question_id").eq("exam_id", review.data);
    assert.equal(reviewQuestions.data?.length, 8);
    assert.ok(reviewQuestions.data?.every((row) => reviewPool.data.some((candidate) => candidate.id === row.teacher_question_id)));
    const afterActivities = await admin.from("teacher_class_activities").select("id", { count: "exact", head: true }).eq("class_id", classId);
    assert.equal(afterActivities.count, beforeActivities.count, "review must not publish or create an activity");

    const professorBCross = await professorB.client!.rpc("get_teacher_class_p6_evidence", { p_class_id: classId, p_from: from, p_to: to });
    expectDenied(professorBCross.error, "Professor B isolation");
    const studentCross = await students[0].client!.rpc("get_teacher_class_p6_evidence", { p_class_id: classId, p_from: from, p_to: to });
    expectDenied(studentCross.error, "Student isolation");
    const studentReview = await students[0].client!.rpc("create_teacher_p6_review", { p_class_id: classId, p_subject: "Física", p_topic: "Cinemática" });
    expectDenied(studentReview.error, "Student review isolation");

    const classB = await admin.from("teacher_classes").insert({ owner_id: professorB.id, name: `${prefix} Free`, public_name: "P6 Free", visibility: "private" }).select("id").single();
    if (classB.error) throw classB.error;
    const freeGate = await professorB.client!.rpc("get_teacher_class_p6_evidence", { p_class_id: classB.data.id, p_from: from, p_to: to });
    expectDenied(freeGate.error, "Free backend gate");
    for (const plan of ["essential", "pro", "advanced"] as const) {
      await admin.from("teacher_accounts").update({ plan, billing_status: "active" }).eq("user_id", professorA.id).throwOnError();
      const paid = await professorA.client!.rpc("get_teacher_class_p6_evidence", { p_class_id: classId, p_from: from, p_to: to });
      if (paid.error) throw paid.error;
    }

    const directSnapshots = await students[0].client!.from("teacher_activity_questions").select("question_snapshot").eq("activity_id", activities[0].id);
    assert.ok(directSnapshots.error, "raw snapshots including correct answers are not readable by students");
    const personalQuota = await admin.from("daily_exam_usage").select("user_id", { count: "exact", head: true }).in("user_id", students.map((student) => student.id));
    assert.equal(personalQuota.count, 0, "teacher activities do not consume Student quota");
    const personalHistory = await admin.from("exam_attempts").select("user_id", { count: "exact", head: true }).in("user_id", students.map((student) => student.id));
    assert.equal(personalHistory.count, 0, "teacher analytics does not write Student history");

    console.log(JSON.stringify({
      staging: "ok", fixture: { students: 20, activities: 30, attempts: attemptRows.length, answers: answerRows.length },
      insights: insights.all.map((item) => ({ kind: item.kind, title: item.title, priority: item.priority })),
      review: { status: "draft", questions: reviewQuestions.data?.length, activityCreated: false },
      gates: { free: "blocked", essential: "allowed", pro: "allowed", advanced: "allowed" },
      security: { professorB: "blocked", student: "blocked", rawSnapshots: "blocked" },
      performance: { rpcMs: elapsedMs, rawAnswersSentToClient: false }, emptyState: "no evidence", studentQuota: "untouched",
      visualFixture: keepFixture ? { professorEmail: professorA.email, classId, emptyClassId } : undefined,
    }));
  } finally {
    if (!keepFixture) await cleanupFixtures();
    if (!keepFixture) {
      const remaining = await admin.from("teacher_classes").select("id", { count: "exact", head: true }).like("name", `${prefix}%`);
      assert.equal(remaining.count, 0, "P6 staging fixture cleanup");
    }
  }
}

void main().catch((error: unknown) => {
  const value = error as { message?: string; code?: string };
  console.error(JSON.stringify({ message: value.message ?? String(error), code: value.code }));
  process.exitCode = 1;
});
