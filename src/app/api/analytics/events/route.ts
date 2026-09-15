import { randomUUID } from "node:crypto";

import { isAnalyticsEventName, sanitizeAnalyticsProperties } from "@/lib/analytics/events";
import { recordServerAnalyticsEvent } from "@/lib/analytics/server";
import { createClient } from "@/lib/supabase/server";
import { hasActivePremium, subscriptionFromRow } from "@/lib/entitlements";

const COOKIE_NAME = "nabulab_anonymous_session";
const PUBLIC_EVENTS = new Set(["landing_view", "signup_cta_clicked", "premium_cta_clicked", "premium_page_viewed"]);

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Payload inválido." }, { status: 400 });
  }

  const body = payload as { event?: unknown; path?: unknown; properties?: unknown };
  if (!isAnalyticsEventName(body?.event)) {
    return Response.json({ error: "Evento inválido." }, { status: 400 });
  }
  const path = typeof body.path === "string" && /^\/[\w\-/?=&.%]*$/.test(body.path)
    ? body.path.slice(0, 240)
    : null;
  if (!path) return Response.json({ error: "Caminho inválido." }, { status: 400 });

  const cookieHeader = request.headers.get("cookie") ?? "";
  const existing = cookieHeader.match(/(?:^|;\s*)nabulab_anonymous_session=([0-9a-f-]{36})(?:;|$)/i)?.[1];
  const anonymousSessionId = existing ?? randomUUID();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!PUBLIC_EVENTS.has(body.event) && !data.user) {
    return Response.json({ error: "Sessão necessária." }, { status: 401 });
  }
  if (body.event === "free_exam_completed" && data.user) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end,cancel_at_period_end,canceled_at,termination_reason")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (hasActivePremium(subscriptionFromRow(subscription))) {
      return Response.json({ accepted: true, ignored: "premium" }, { status: 202 });
    }
  }

  const properties = sanitizeAnalyticsProperties(body.properties);
  const examId = body.event === "free_exam_completed" && typeof properties.exam_id === "string"
    ? properties.exam_id
    : null;
  await recordServerAnalyticsEvent({
    eventName: body.event,
    userId: data.user?.id ?? null,
    anonymousSessionId,
    path,
    properties,
    sourceEventKey: data.user && examId ? `exam:${data.user.id}:${examId}:completed` : null,
  });

  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return Response.json(
    { accepted: true },
    {
      status: 202,
      headers: existing
        ? undefined
        : { "Set-Cookie": `${COOKIE_NAME}=${anonymousSessionId}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly${secure}` },
    },
  );
}
