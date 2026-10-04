import "server-only";
import { createClient } from "@/lib/supabase/server";
import { buildTeacherReport, type TeacherActivity, type TeacherAnswer, type TeacherAnalyticsFilters, type TeacherAttempt, type TeacherMember } from "@/lib/teacher-analytics";

export async function getTeacherAnalytics(classId: string, filters: TeacherAnalyticsFilters, studentId?: string) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { state: "unauthenticated" as const };
  const { data: owned, error: ownershipError } = await supabase.rpc("get_owned_teacher_class", { p_class_id: classId });
  if (ownershipError) throw new Error("Não foi possível verificar a turma.");
  const room = owned?.[0];
  if (!room) return { state: "not_found" as const };

  const from = `${filters.from}T00:00:00-03:00`;
  const to = new Date(Date.parse(`${filters.to}T00:00:00-03:00`) + 86_400_000).toISOString();
  const activityId = filters.activityId || null;
  const [membersResult, activitiesResult, attemptsResult, answersResult] = await Promise.all([
    supabase.rpc("get_teacher_class_members", { p_class_id: classId }),
    supabase.from("teacher_class_activities").select("id,title,status,created_at,due_at")
      .eq("class_id", classId).in("status", ["published", "closed"]).order("created_at", { ascending: true }),
    supabase.rpc("get_teacher_class_p3_attempts", { p_class_id: classId, p_from: from, p_to: to, p_activity_id: activityId }),
    supabase.rpc("get_teacher_class_p3_answers", { p_class_id: classId, p_from: from, p_to: to, p_activity_id: activityId, p_student_id: studentId ?? null }),
  ]);
  if (membersResult.error || activitiesResult.error || attemptsResult.error || answersResult.error) {
    throw new Error("Não foi possível carregar o desempenho desta turma.");
  }
  const members = (membersResult.data ?? []) as TeacherMember[];
  if (studentId && !members.some((member) => member.user_id === studentId && member.status === "active")) {
    return { state: "not_found" as const };
  }
  const attempts = (attemptsResult.data ?? []) as TeacherAttempt[];
  const selectedMembers = studentId ? members.filter((member) => member.user_id === studentId) : members;
  const report = buildTeacherReport({ members: selectedMembers, activities: (activitiesResult.data ?? []) as TeacherActivity[],
    attempts: studentId ? attempts.filter((attempt) => attempt.student_id === studentId) : attempts,
    answers: (answersResult.data ?? []) as TeacherAnswer[], filters });
  return { state: "ready" as const, room, report, filters };
}
