import "server-only";

import { createClient } from "@/lib/supabase/server";
import {
  getStudentEntitlements,
  subscriptionFromRow,
  type StudentEntitlements,
  type StudentSubscription,
  type StudentQuestionQuotaStatus,
} from "@/lib/entitlements";

export async function getCurrentStudentAccess(): Promise<{
  userId: string;
  subscription: StudentSubscription | null;
  entitlements: StudentEntitlements;
}> {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) throw new Error("AUTH_REQUIRED");

  const { data, error } = await supabase
    .from("subscriptions")
    .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) throw error;
  const subscription = subscriptionFromRow(data);
  return {
    userId: userData.user.id,
    subscription,
    entitlements: getStudentEntitlements(subscription),
  };
}

export async function getStudentQuestionQuotaStatus(): Promise<StudentQuestionQuotaStatus> {
  const { userId, entitlements } = await getCurrentStudentAccess();

  if (entitlements.lifetimeQuestionLimit === null) {
    return { used: 0, limit: null, remaining: null, unlimited: true };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("student_question_usage")
    .select("used_count")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;

  const used = typeof data?.used_count === "number" ? data.used_count : 0;
  return {
    used,
    limit: entitlements.lifetimeQuestionLimit,
    remaining: Math.max(0, entitlements.lifetimeQuestionLimit - used),
    unlimited: false,
  };
}

export async function consumeStudentQuestionQuota(
  examId: string,
  questionId: string,
): Promise<StudentQuestionQuotaStatus & { allowed: boolean; counted: boolean }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("consume_student_question_quota", {
    p_exam_id: examId,
    p_question_id: questionId,
  });
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== "boolean") {
    throw new Error("A cota de questões retornou uma resposta inválida.");
  }

  const limit = typeof row.total_limit === "number" ? row.total_limit : null;
  const used = typeof row.used_count === "number" ? row.used_count : 0;
  return {
    allowed: row.allowed,
    counted: row.counted === true,
    used,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - used),
    unlimited: limit === null,
  };
}
