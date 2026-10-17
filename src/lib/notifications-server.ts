import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { AppNotification } from "@/lib/notifications";

export async function getNotificationSummary(limit = 5) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { user: null, unread: 0, items: [] as AppNotification[] };
  const [countResult, itemsResult] = await Promise.all([
    supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null),
    supabase.from("notifications").select("id,type,priority,title,body,action_path,aggregation_count,read_at,created_at")
      .order("created_at", { ascending: false }).limit(limit),
  ]);
  return { user: auth.user, unread: countResult.count ?? 0, items: (itemsResult.data ?? []) as AppNotification[] };
}
