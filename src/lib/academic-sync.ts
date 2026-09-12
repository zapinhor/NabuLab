import { createClient } from "@/lib/supabase/client";
import { db } from "@/lib/db";
import { getQuestionById } from "@/data/questions";
import {
  createQuestionSnapshot,
  questionFromSnapshot,
} from "@/lib/question-snapshot";
import {
  clearStudyGoalsCache,
  loadStudyGoals,
  normalizeStudyGoals,
  writeStudyGoalsCache,
} from "@/lib/study-goals";
import type {
  QuestionSnapshot,
  StoredAnswer,
  StoredExam,
} from "@/types/storage";
import type { StudyGoals } from "@/types/study-goals";

const ACTIVE_STUDENT_KEY = "nabulab:cloud:active-student:v1";
const LEGACY_OWNER_KEY = "nabulab:cloud:legacy-owner:v1";
const PAGE_SIZE = 500;

type AttemptRow = {
  user_id: string;
  id: string;
  created_at: string;
  started_at: string;
  submitted_at: string;
  duration_seconds: number;
  mode: "manual" | "review" | "recommended";
  total_questions: number;
  answered: number;
  unanswered: number;
  correct: number;
  incorrect: number;
  percentage: number;
  difficulty: StoredExam["difficulty"];
  question_type: StoredExam["questionType"];
  selected_subjects: StoredExam["selectedSubjects"];
  subjects: StoredExam["subjects"];
  question_ids: string[];
  alternative_orders: Record<string, string[]>;
};

type AnswerRow = {
  user_id: string;
  id: string;
  exam_id: string;
  question_id: string;
  selected_answer: string | null;
  is_correct: boolean;
  was_answered: boolean;
  marked_for_review: boolean;
  question_snapshot: QuestionSnapshot | null;
};

type PreferenceRow = {
  user_id: string;
  weekly_questions: number;
  weekly_exams: number;
  weekly_study_days: number;
  goals_updated_at: string;
  local_migration_completed_at: string | null;
};

export type AcademicSyncSummary = {
  userId: string;
  exams: number;
  answers: number;
  migratedLegacyData: boolean;
};

export function planLocalCacheSync({
  activeStudent,
  legacyOwner,
  userId,
}: {
  activeStudent: string | null;
  legacyOwner: string | null;
  userId: string;
}) {
  const changingStudent = Boolean(activeStudent && activeStudent !== userId);
  const claimsLegacyData = !legacyOwner;
  const mayUploadLocal =
    !changingStudent &&
    (activeStudent === userId || legacyOwner === userId || claimsLegacyData);

  return { changingStudent, claimsLegacyData, mayUploadLocal };
}

function attemptToRow(userId: string, exam: StoredExam): AttemptRow {
  return {
    user_id: userId,
    id: exam.id,
    created_at: exam.createdAt,
    started_at: exam.startedAt,
    submitted_at: exam.submittedAt,
    duration_seconds: exam.durationSeconds,
    mode: exam.mode ?? "manual",
    total_questions: exam.totalQuestions,
    answered: exam.answered,
    unanswered: exam.unanswered,
    correct: exam.correct,
    incorrect: exam.incorrect,
    percentage: exam.percentage,
    difficulty: exam.difficulty,
    question_type: exam.questionType,
    selected_subjects: exam.selectedSubjects,
    subjects: exam.subjects,
    question_ids: exam.questionIds,
    alternative_orders: exam.alternativeOrders ?? {},
  };
}

function rowToAttempt(row: AttemptRow): StoredExam {
  return {
    id: row.id,
    createdAt: row.created_at,
    startedAt: row.started_at,
    submittedAt: row.submitted_at,
    durationSeconds: row.duration_seconds,
    mode: row.mode,
    totalQuestions: row.total_questions,
    answered: row.answered,
    unanswered: row.unanswered,
    correct: row.correct,
    incorrect: row.incorrect,
    percentage: row.percentage,
    difficulty: row.difficulty,
    questionType: row.question_type,
    selectedSubjects: row.selected_subjects,
    subjects: row.subjects,
    questionIds: row.question_ids,
    alternativeOrders: row.alternative_orders,
  };
}

function answerToRow(userId: string, answer: StoredAnswer): AnswerRow {
  const currentQuestion = getQuestionById(answer.questionId);

  return {
    user_id: userId,
    id: answer.id,
    exam_id: answer.examId,
    question_id: answer.questionId,
    selected_answer: answer.selectedAnswer,
    is_correct: answer.isCorrect,
    was_answered: answer.wasAnswered,
    marked_for_review: answer.markedForReview,
    question_snapshot:
      answer.questionSnapshot ??
      (currentQuestion ? createQuestionSnapshot(currentQuestion) : null),
  };
}

export function rowToAnswer(row: AnswerRow): StoredAnswer | null {
  const currentQuestion = getQuestionById(row.question_id);
  const snapshotQuestion = questionFromSnapshot(
    row.question_id,
    row.question_snapshot,
  );
  const question = currentQuestion ?? snapshotQuestion;

  if (!question) {
    console.warn(
      `[academic-sync] Questão histórica não encontrada: ${row.question_id}`,
    );
    return null;
  }

  return {
    id: row.id,
    examId: row.exam_id,
    questionId: row.question_id,
    subject: question.subject,
    subjectName: question.subjectName,
    area: question.area,
    topic: question.topic,
    subtopic: question.subtopic,
    difficulty: question.difficulty,
    selectedAnswer: row.selected_answer,
    correctAnswer: question.correctAnswer,
    isCorrect: row.is_correct,
    wasAnswered: row.was_answered,
    markedForReview: row.marked_for_review,
    questionSnapshot:
      snapshotQuestion
        ? createQuestionSnapshot(snapshotQuestion)
        : createQuestionSnapshot(question),
  };
}

function preferenceToGoals(row: PreferenceRow): StudyGoals {
  return normalizeStudyGoals({
    weeklyQuestions: row.weekly_questions,
    weeklyExams: row.weekly_exams,
    weeklyStudyDays: row.weekly_study_days,
    updatedAt: row.goals_updated_at,
  });
}

async function getAuthenticatedUserId() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error("A sessão do estudante não está disponível para sincronização.");
  }
  return { supabase, userId: data.user.id };
}

async function upsertInChunks(table: "exam_attempts" | "exam_answers", rows: object[]) {
  const { supabase } = await getAuthenticatedUserId();
  for (let index = 0; index < rows.length; index += PAGE_SIZE) {
    const { error } = await supabase
      .from(table)
      .upsert(rows.slice(index, index + PAGE_SIZE), { onConflict: "user_id,id" });
    if (error) throw error;
  }
}

async function fetchAttempts(userId: string) {
  const { supabase } = await getAuthenticatedUserId();
  const rows: AttemptRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("exam_attempts")
      .select("user_id,id,created_at,started_at,submitted_at,duration_seconds,mode,total_questions,answered,unanswered,correct,incorrect,percentage,difficulty,question_type,selected_subjects,subjects,question_ids,alternative_orders")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const page = (data ?? []) as AttemptRow[];
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

async function fetchAnswers(userId: string) {
  const { supabase } = await getAuthenticatedUserId();
  const rows: AnswerRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("exam_answers")
      .select("user_id,id,exam_id,question_id,selected_answer,is_correct,was_answered,marked_for_review,question_snapshot")
      .eq("user_id", userId)
      .order("exam_id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const page = (data ?? []) as AnswerRow[];
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

async function syncGoals(
  userId: string,
  mayUploadLocal: boolean,
  hasLocalGoals: boolean,
  migratedLegacyData: boolean,
) {
  const { supabase } = await getAuthenticatedUserId();
  const localGoals = loadStudyGoals();
  const { data, error } = await supabase
    .from("student_preferences")
    .select("user_id,weekly_questions,weekly_exams,weekly_study_days,goals_updated_at,local_migration_completed_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;

  const remote = data as PreferenceRow | null;
  const localIsNewer =
    mayUploadLocal &&
    hasLocalGoals &&
    (!remote || new Date(localGoals.updatedAt).getTime() > new Date(remote.goals_updated_at).getTime());

  if (localIsNewer || !remote) {
    const { error: upsertError } = await supabase.from("student_preferences").upsert({
      user_id: userId,
      weekly_questions: localGoals.weeklyQuestions,
      weekly_exams: localGoals.weeklyExams,
      weekly_study_days: localGoals.weeklyStudyDays,
      goals_updated_at: localGoals.updatedAt,
      local_migration_completed_at:
        remote?.local_migration_completed_at ??
        (migratedLegacyData ? new Date().toISOString() : null),
    });
    if (upsertError) throw upsertError;
    return;
  }

  writeStudyGoalsCache(preferenceToGoals(remote));
}

export async function pushStudyGoalsToCloud(goals: StudyGoals) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase.from("student_preferences").upsert({
    user_id: userId,
    weekly_questions: goals.weeklyQuestions,
    weekly_exams: goals.weeklyExams,
    weekly_study_days: goals.weeklyStudyDays,
    goals_updated_at: goals.updatedAt,
  });
  if (error) throw error;
}

export async function pushCompletedExamToCloud(exam: StoredExam, answers: StoredAnswer[]) {
  const { userId } = await getAuthenticatedUserId();
  await upsertInChunks("exam_attempts", [attemptToRow(userId, exam)]);
  await upsertInChunks("exam_answers", answers.map((answer) => answerToRow(userId, answer)));
}

export async function syncAcademicData(): Promise<AcademicSyncSummary> {
  const { userId } = await getAuthenticatedUserId();
  const activeStudent = localStorage.getItem(ACTIVE_STUDENT_KEY);
  const legacyOwner = localStorage.getItem(LEGACY_OWNER_KEY);
  const { changingStudent, claimsLegacyData, mayUploadLocal } =
    planLocalCacheSync({ activeStudent, legacyOwner, userId });

  if (changingStudent) {
    await db.transaction("rw", db.exams, db.answers, async () => {
      await db.exams.clear();
      await db.answers.clear();
    });
    clearStudyGoalsCache();
  }

  const hasLocalGoals = localStorage.getItem("nabulab:study-goals:v1") !== null;
  const [localExams, localAnswers] = await Promise.all([
    db.exams.toArray(),
    db.answers.toArray(),
  ]);
  const migratedLegacyData =
    claimsLegacyData &&
    (localExams.length > 0 || localAnswers.length > 0 || hasLocalGoals);

  if (claimsLegacyData) localStorage.setItem(LEGACY_OWNER_KEY, userId);
  localStorage.setItem(ACTIVE_STUDENT_KEY, userId);

  if (mayUploadLocal) {
    await upsertInChunks(
      "exam_attempts",
      localExams.map((exam) => attemptToRow(userId, exam)),
    );
    await upsertInChunks(
      "exam_answers",
      localAnswers.map((answer) => answerToRow(userId, answer)),
    );
  }

  await syncGoals(userId, mayUploadLocal, hasLocalGoals, migratedLegacyData);
  const [remoteAttempts, remoteAnswers] = await Promise.all([
    fetchAttempts(userId),
    fetchAnswers(userId),
  ]);
  const hydratedAnswers = remoteAnswers.flatMap((row) => {
    const answer = rowToAnswer(row);
    return answer ? [answer] : [];
  });

  await db.transaction("rw", db.exams, db.answers, async () => {
    await db.exams.clear();
    await db.answers.clear();
    await db.exams.bulkPut(remoteAttempts.map(rowToAttempt));
    await db.answers.bulkPut(hydratedAnswers);
  });

  return {
    userId,
    exams: remoteAttempts.length,
    answers: hydratedAnswers.length,
    migratedLegacyData,
  };
}
