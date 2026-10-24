import "server-only";

import { createHmac } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

function rateLimitSecret() {
  const secret = process.env.API_RATE_LIMIT_SECRET?.trim() || process.env.AUTH_RATE_LIMIT_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "nabulab-development-rate-limit";
  throw new Error("API rate limit secret is not configured");
}

export function rateLimitIdentity(request: Request, identity?: string | null) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const raw = identity?.trim() || forwarded || "unknown";
  return createHmac("sha256", rateLimitSecret()).update(raw).digest("hex");
}

export async function consumeApiRateLimit(input: {
  bucketDigest: string;
  action: string;
  limit: number;
  windowSeconds: number;
}) {
  const { data, error } = await createAdminClient().rpc("consume_api_rate_limit", {
    p_bucket_digest: input.bucketDigest,
    p_action: input.action,
    p_limit: input.limit,
    p_window_seconds: input.windowSeconds,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return {
    allowed: Boolean(row?.allowed),
    currentHits: Number(row?.current_hits ?? 0),
    retryAfterSeconds: Math.max(1, Number(row?.retry_after_seconds ?? input.windowSeconds)),
  };
}
