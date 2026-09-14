import "server-only";

import { createClient } from "@/lib/supabase/server";
import {
  getStudentEntitlements,
  subscriptionFromRow,
  type StudentEntitlements,
  type StudentSubscription,
  type DailyExamQuotaStatus,
  getStudentQuotaDate,
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
    .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end")
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

export async function getDailyExamQuotaStatus(): Promise<DailyExamQuotaStatus> {
  const { userId, entitlements } = await getCurrentStudentAccess();
  const quotaDate = getStudentQuotaDate();

  if (entitlements.examsPerDay === null) {
    return { used: 0, limit: null, remaining: null, quotaDate, unlimited: true };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("daily_exam_usage")
    .select("used_count")
    .eq("user_id", userId)
    .eq("usage_date", quotaDate)
    .maybeSingle();
  if (error) throw error;

  const used = typeof data?.used_count === "number" ? data.used_count : 0;
  return {
    used,
    limit: entitlements.examsPerDay,
    remaining: Math.max(0, entitlements.examsPerDay - used),
    quotaDate,
    unlimited: false,
  };
}

export async function consumeDailyExamQuota(): Promise<DailyExamQuotaStatus & { allowed: boolean }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("consume_student_exam_quota");
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== "boolean") {
    throw new Error("A quota diária retornou uma resposta inválida.");
  }

  const limit = typeof row.daily_limit === "number" ? row.daily_limit : null;
  const used = typeof row.used_count === "number" ? row.used_count : 0;
  return {
    allowed: row.allowed,
    used,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - used),
    quotaDate: typeof row.quota_date === "string" ? row.quota_date : getStudentQuotaDate(),
    unlimited: limit === null,
  };
}
