import "server-only";

import { timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNabuNotificationEmail } from "@/lib/notifications-email";
import { processStudyReminders } from "@/lib/study-reminders";

const REMINDER_TYPES = ["activity_due_soon", "activity_due_today", "activity_closed"] as const;

export function isValidCronAuthorization(authorization: string | null, secret = process.env.CRON_SECRET?.trim()) {
  if (!secret || !authorization?.startsWith("Bearer ")) return false;
  const supplied = authorization.slice(7);
  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export async function processNotificationReminders(now = new Date()) {
  const admin = createAdminClient();
  const startedAt = now.toISOString();
  const before = await admin.from("notifications").select("id", { count: "exact", head: true });
  if (before.error) throw before.error;

  const processed = await admin.rpc("process_teacher_notification_reminders", { p_now: startedAt });
  if (processed.error) throw processed.error;

  const after = await admin.from("notifications").select("id", { count: "exact", head: true });
  if (after.error) throw after.error;

  const reminders = await admin.from("notifications")
    .select("recipient_user_id,type,title,body,action_path,dedupe_key,event_at")
    .in("type", [...REMINDER_TYPES])
    .gte("event_at", startedAt)
    .order("event_at", { ascending: true })
    .limit(500);
  if (reminders.error) throw reminders.error;

  const deliveries = await Promise.allSettled((reminders.data ?? []).map((notification) =>
    sendNabuNotificationEmail({
      dedupeKey: `notification:${notification.dedupe_key}`,
      category: "deadlines",
      recipientUserId: notification.recipient_user_id,
      subject: notification.title,
      heading: notification.title,
      body: notification.body,
      actionLabel: "Ver no NabuLab",
      actionPath: notification.action_path ?? "/notificacoes",
    })
  ));

  const emailSent = deliveries.filter((item) => item.status === "fulfilled" && item.value.sent).length;
  const emailFailed = deliveries.filter((item) => item.status === "rejected" || (item.status === "fulfilled" && !item.value.sent && item.value.reason !== "duplicate" && item.value.reason !== "preference_disabled")).length;
  const emailSkipped = deliveries.length - emailSent - emailFailed;

  // Lembrete diário de estudo (só age às 19h de Brasília); falha aqui não derruba os avisos de prazo.
  const study = await processStudyReminders(now).catch(() => ({ studyReminderWindow: true, studyEligible: 0, studySent: 0, studySkipped: 0, studyFailed: -1 }));

  return {
    ...study,
    eligible: processed.data ?? 0,
    notificationsCreated: Math.max(0, (after.count ?? 0) - (before.count ?? 0)),
    emailSent,
    emailFailed,
    emailSkipped,
  };
}
