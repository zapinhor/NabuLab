import "server-only";

import type { AnalyticsEventName } from "@/lib/analytics/events";
import { createAdminClient } from "@/lib/supabase/admin";

type ServerEvent = {
  eventName: AnalyticsEventName;
  userId?: string | null;
  anonymousSessionId?: string | null;
  path?: string | null;
  properties?: Record<string, string | number | boolean>;
  sourceEventKey?: string | null;
};

export async function recordServerAnalyticsEvent(event: ServerEvent): Promise<void> {
  if (!event.userId && !event.anonymousSessionId) return;
  try {
    const { error } = await createAdminClient().from("analytics_events").upsert(
      {
        event_name: event.eventName,
        user_id: event.userId ?? null,
        anonymous_session_id: event.anonymousSessionId ?? null,
        path: event.path ?? null,
        properties: event.properties ?? {},
        source_event_key: event.sourceEventKey ?? null,
      },
      { onConflict: "source_event_key", ignoreDuplicates: true },
    );
    if (error) console.error("[analytics] Não foi possível registrar evento:", error.message);
  } catch (error) {
    console.error("[analytics] Backend de eventos indisponível:", error instanceof Error ? error.message : "erro desconhecido");
  }
}

export async function recordAuthenticatedAnalyticsEvent(
  eventName: AnalyticsEventName,
  userId: string | null,
  options: Omit<ServerEvent, "eventName" | "userId"> = {},
) {
  await recordServerAnalyticsEvent({ eventName, userId, ...options });
}
