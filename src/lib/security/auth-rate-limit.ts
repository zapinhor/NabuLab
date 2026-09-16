import "server-only";

import { createHmac } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export const LOGIN_RATE_LIMIT = {
  maxAttempts: positiveInt("AUTH_LOGIN_MAX_ATTEMPTS", 5),
  windowMinutes: positiveInt("AUTH_LOGIN_WINDOW_MINUTES", 15),
  cooldownMinutes: positiveInt("AUTH_LOGIN_COOLDOWN_MINUTES", 15),
} as const;

function positiveInt(name: string, fallback: number) {
  const parsed = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function secret() {
  const configured = process.env.AUTH_RATE_LIMIT_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") throw new Error("AUTH_RATE_LIMIT_SECRET não configurado.");
  return "nabulab-development-rate-limit-key";
}

function digest(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function trustedRequestOrigin(headers: Headers) {
  const forwarded = headers.get("x-vercel-forwarded-for") ?? headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0]?.trim() || "unknown").slice(0, 128);
}

export function loginBucket(email: string, origin: string) {
  return { accountDigest: digest(email.trim().toLowerCase()), originDigest: digest(origin) };
}

export async function getLoginLimit(bucket: ReturnType<typeof loginBucket>) {
  const { data, error } = await createAdminClient().rpc("login_limit_status", {
    p_account_digest: bucket.accountDigest, p_origin_digest: bucket.originDigest,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { blocked: Boolean(row?.blocked), retryAfterSeconds: Number(row?.retry_after_seconds ?? 0) };
}

export async function recordLoginFailure(bucket: ReturnType<typeof loginBucket>) {
  const { data, error } = await createAdminClient().rpc("record_login_failure", {
    p_account_digest: bucket.accountDigest, p_origin_digest: bucket.originDigest,
    p_max_attempts: LOGIN_RATE_LIMIT.maxAttempts,
    p_window_minutes: LOGIN_RATE_LIMIT.windowMinutes,
    p_cooldown_minutes: LOGIN_RATE_LIMIT.cooldownMinutes,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { blocked: Boolean(row?.blocked), retryAfterSeconds: Number(row?.retry_after_seconds ?? 0) };
}

export async function clearLoginFailures(bucket: ReturnType<typeof loginBucket>) {
  const { error } = await createAdminClient().rpc("clear_login_failures", {
    p_account_digest: bucket.accountDigest, p_origin_digest: bucket.originDigest,
  });
  if (error) throw error;
}
