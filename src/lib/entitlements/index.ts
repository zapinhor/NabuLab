import type { ExamConfig, ExamDifficulty } from "@/types/exam";
import type { Question } from "@/types/question";

export type StudentPlan = "free" | "premium";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "expired";
export type PriceTier = "founder_477" | "standard_990" | null;
export type SubscriptionProvider = "manual" | "hotmart" | null;

export interface StudentSubscription {
  id: string;
  userId: string;
  plan: StudentPlan;
  status: SubscriptionStatus;
  priceTier: PriceTier;
  provider: SubscriptionProvider;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
}

export interface StudentEntitlements {
  plan: StudentPlan;
  fullQuestionBank: boolean;
  unlimitedExams: boolean;
  advancedDifficulty: boolean;
  trainErrors: boolean;
  fullRecommended: boolean;
  fullHistory: boolean;
  evolutionAnalytics: boolean;
  domainAnalytics: boolean;
  goals: boolean;
  cloudSync: boolean;
  maxQuestionsPerExam: number;
  examsPerDay: number | null;
  historyLimit: number | null;
  recommendedLimit: number | null;
  allowedAmounts: readonly number[];
}

export interface DailyExamQuotaStatus {
  used: number;
  limit: number | null;
  remaining: number | null;
  quotaDate: string;
  unlimited: boolean;
}

export function getStudentQuotaDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STUDENT_QUOTA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export const STUDENT_QUOTA_TIME_ZONE = "America/Sao_Paulo";
export const PREMIUM_FEATURE_ROUTES = [
  "/revisao",
  "/evolucao",
  "/analise",
  "/dominio",
  "/metas",
] as const;

const FREE_AMOUNTS = [5, 10, 15] as const;
const PREMIUM_AMOUNTS = [5, 10, 15, 20, 30, 50] as const;

export const FREE_ENTITLEMENTS: StudentEntitlements = Object.freeze({
  plan: "free",
  fullQuestionBank: false,
  unlimitedExams: false,
  advancedDifficulty: false,
  trainErrors: false,
  fullRecommended: false,
  fullHistory: false,
  evolutionAnalytics: false,
  domainAnalytics: false,
  goals: false,
  cloudSync: true,
  maxQuestionsPerExam: 15,
  examsPerDay: 2,
  historyLimit: 3,
  recommendedLimit: 5,
  allowedAmounts: FREE_AMOUNTS,
});

export const PREMIUM_ENTITLEMENTS: StudentEntitlements = Object.freeze({
  plan: "premium",
  fullQuestionBank: true,
  unlimitedExams: true,
  advancedDifficulty: true,
  trainErrors: true,
  fullRecommended: true,
  fullHistory: true,
  evolutionAnalytics: true,
  domainAnalytics: true,
  goals: true,
  cloudSync: true,
  maxQuestionsPerExam: 50,
  examsPerDay: null,
  historyLimit: null,
  recommendedLimit: null,
  allowedAmounts: PREMIUM_AMOUNTS,
});

export function isPremiumFeatureRoute(pathname: string): boolean {
  return PREMIUM_FEATURE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function hasActivePremium(subscription: StudentSubscription | null): boolean {
  return subscription?.plan === "premium" && subscription.status === "active";
}

export function getStudentEntitlements(
  subscription: StudentSubscription | null,
): StudentEntitlements {
  return hasActivePremium(subscription) ? PREMIUM_ENTITLEMENTS : FREE_ENTITLEMENTS;
}

export function canAccessDifficulty(
  difficulty: ExamDifficulty,
  entitlements: StudentEntitlements,
): boolean {
  return entitlements.advancedDifficulty || difficulty === "iniciante" || difficulty === "medio";
}

export function filterAccessibleQuestions(
  questions: readonly Question[],
  entitlements: StudentEntitlements,
): Question[] {
  if (entitlements.fullQuestionBank) return [...questions];
  return questions.filter((question) => question.difficulty !== "avancado");
}

export function validateExamConfig(
  config: ExamConfig,
  entitlements: StudentEntitlements,
): void {
  if (!Number.isInteger(config.amount) || config.amount < 1) {
    throw new Error("A quantidade de questões é inválida.");
  }
  if (config.amount > entitlements.maxQuestionsPerExam) {
    throw new Error(`Seu plano permite até ${entitlements.maxQuestionsPerExam} questões por simulado.`);
  }
  if (!entitlements.allowedAmounts.includes(config.amount)) {
    throw new Error("Essa quantidade de questões não está disponível no seu plano.");
  }
  if (!canAccessDifficulty(config.difficulty, entitlements)) {
    throw new Error("Questões avançadas estão disponíveis no plano Premium.");
  }
}

export function subscriptionFromRow(row: Record<string, unknown> | null): StudentSubscription | null {
  if (!row) return null;
  return {
    id: String(row.id),
    userId: String(row.user_id),
    plan: row.plan === "premium" ? "premium" : "free",
    status: ["active", "canceled", "past_due", "expired"].includes(String(row.status))
      ? (row.status as SubscriptionStatus)
      : "expired",
    priceTier:
      row.price_tier === "founder_477" || row.price_tier === "standard_990"
        ? row.price_tier
        : null,
    provider: row.provider === "manual" || row.provider === "hotmart" ? row.provider : null,
    currentPeriodStart: typeof row.current_period_start === "string" ? row.current_period_start : null,
    currentPeriodEnd: typeof row.current_period_end === "string" ? row.current_period_end : null,
  };
}
