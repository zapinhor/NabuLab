import "server-only";
import { createClient } from "@/lib/supabase/server";
import { TEACHER_PLANS, type TeacherEntitlements, type TeacherPlan } from "@/lib/teacher-plans";

export type TeacherAccountAccess = TeacherEntitlements & {
  billingCycle: "monthly" | "yearly" | null;
  billingStatus: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export async function getCurrentTeacherAccess(): Promise<TeacherAccountAccess> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("authentication_required");
  const { data, error } = await supabase.rpc("get_teacher_entitlements");
  if (error) throw error;
  const row = data?.[0];
  const plan = (row?.plan ?? "free") as TeacherPlan;
  const fallback = TEACHER_PLANS[plan];
  return {
    plan,
    maxActiveClasses: row?.active_classes ?? fallback.maxActiveClasses,
    maxStudentsPerClass: row?.students_per_class ?? fallback.maxStudentsPerClass,
    weeklyExamLimit: row?.exams_per_week ?? fallback.weeklyExamLimit,
    features: { ...fallback.features, ...(row?.features ?? {}) },
    billingCycle: row?.billing_cycle ?? null,
    billingStatus: row?.billing_status ?? "free",
    currentPeriodEnd: row?.current_period_end ?? null,
    cancelAtPeriodEnd: Boolean(row?.cancel_at_period_end),
  };
}
