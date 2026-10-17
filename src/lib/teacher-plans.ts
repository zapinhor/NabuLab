export type TeacherPlan = "free" | "essential" | "pro" | "advanced";
export type TeacherBillingCycle = "monthly" | "yearly";
export type TeacherFeature =
  | "full_analytics" | "activity_comparison" | "content_analytics"
  | "student_evolution" | "csv_export";

export type TeacherEntitlements = {
  plan: TeacherPlan;
  maxActiveClasses: number;
  maxStudentsPerClass: number;
  weeklyExamLimit: number | null;
  features: Record<TeacherFeature, boolean>;
};

const paidFeatures: Record<TeacherFeature, boolean> = {
  full_analytics: true, activity_comparison: true, content_analytics: true,
  student_evolution: true, csv_export: true,
};

export const TEACHER_PLANS: Record<TeacherPlan, TeacherEntitlements & {
  name: string; monthlyPrice: number; yearlyPrice: number | null; recommended?: boolean;
}> = {
  free: { plan: "free", name: "Free", monthlyPrice: 0, yearlyPrice: null,
    maxActiveClasses: 1, maxStudentsPerClass: 40, weeklyExamLimit: 2,
    features: { full_analytics: false, activity_comparison: false, content_analytics: false, student_evolution: false, csv_export: false } },
  essential: { plan: "essential", name: "Essencial", monthlyPrice: 19.9, yearlyPrice: 199,
    maxActiveClasses: 3, maxStudentsPerClass: 50, weeklyExamLimit: 10, features: paidFeatures },
  pro: { plan: "pro", name: "Pro", monthlyPrice: 39.9, yearlyPrice: 399, recommended: true,
    maxActiveClasses: 10, maxStudentsPerClass: 70, weeklyExamLimit: null, features: paidFeatures },
  advanced: { plan: "advanced", name: "Avançado", monthlyPrice: 69.9, yearlyPrice: 699,
    maxActiveClasses: 30, maxStudentsPerClass: 100, weeklyExamLimit: null, features: paidFeatures },
};

export function teacherOfferKey(plan: Exclude<TeacherPlan, "free">, cycle: TeacherBillingCycle) {
  return `teacher_${plan}_${cycle}` as const;
}

export type TeacherOfferKey = ReturnType<typeof teacherOfferKey>;

export function isTeacherOfferKey(value: unknown): value is TeacherOfferKey {
  return typeof value === "string" && /^teacher_(essential|pro|advanced)_(monthly|yearly)$/.test(value);
}

export function parseTeacherOfferKey(key: TeacherOfferKey) {
  const [, plan, cycle] = key.split("_");
  return { plan: plan as Exclude<TeacherPlan, "free">, cycle: cycle as TeacherBillingCycle };
}

export function formatTeacherPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
