import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { sendNabuNotificationEmail } from "@/lib/notifications-email";
import { computeStreak, dateKeyInTimeZone } from "@/lib/streak";
import { createAdminClient } from "@/lib/supabase/admin";

/*
 * Lembrete diário de estudo (opt-in).
 *
 * Roda dentro do agendador de hora em hora, mas só age às 19h de Brasília.
 * Vai apenas para quem ligou o lembrete e ainda não estudou no dia; no máximo
 * um e-mail por pessoa por dia (dedupe pela chave study:<usuário>:<data>).
 */

export const STUDY_REMINDER_HOUR = 19;
const TIME_ZONE = "America/Sao_Paulo";
const SITE = "https://nabulab.org";

export function hourInSaoPaulo(now: Date) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "2-digit", hourCycle: "h23" }).format(now));
}

function signingKey() {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return null;
  return `study-reminder-unsubscribe:${secret}`;
}

export function unsubscribeToken(userId: string) {
  const key = signingKey();
  return key ? createHmac("sha256", key).update(userId).digest("base64url") : null;
}

export function isValidUnsubscribeToken(userId: string, token: string) {
  const expected = unsubscribeToken(userId);
  if (!expected || !token) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unsubscribeUrl(userId: string) {
  const token = unsubscribeToken(userId);
  return token ? `${SITE}/api/notifications/lembrete?u=${encodeURIComponent(userId)}&t=${encodeURIComponent(token)}` : null;
}

export function buildStudyReminderMessage(streak: { current: number; atRisk: boolean }) {
  if (streak.current > 0 && streak.atRisk) {
    const days = streak.current === 1 ? "1 dia" : `${streak.current} dias`;
    return {
      subject: `Sua sequência de ${days} continua hoje`,
      heading: `Mantenha seus ${days} de estudo`,
      body: "A meta do dia leva uns 5 minutos: a questão do dia, os erros que voltam hoje e algumas questões novas.",
    };
  }
  return {
    subject: "Seu estudo de hoje leva 5 minutos",
    heading: "Que tal 5 minutos de estudo hoje?",
    body: "Responda a questão do dia e revise os erros que voltam hoje. Cada dia conta para a sua sequência.",
  };
}

export async function processStudyReminders(now = new Date(), options: { force?: boolean } = {}) {
  if (!options.force && hourInSaoPaulo(now) !== STUDY_REMINDER_HOUR) {
    return { studyReminderWindow: false, studyEligible: 0, studySent: 0, studySkipped: 0, studyFailed: 0 };
  }

  const admin = createAdminClient();
  const todayKey = dateKeyInTimeZone(now, TIME_ZONE);
  const { data: optedIn, error } = await admin
    .from("notification_preferences")
    .select("user_id")
    .eq("email_study_reminders", true)
    .limit(1000);
  if (error) throw error;

  const userIds = (optedIn ?? []).map((row) => row.user_id as string);
  if (!userIds.length) {
    return { studyReminderWindow: true, studyEligible: 0, studySent: 0, studySkipped: 0, studyFailed: 0 };
  }

  // Datas de estudo dos últimos 60 dias, no horário de Brasília.
  const since = new Date(now.getTime() - 60 * 86_400_000).toISOString();
  const { data: attempts, error: attemptsError } = await admin
    .from("exam_attempts")
    .select("user_id,submitted_at")
    .in("user_id", userIds)
    .gte("submitted_at", since)
    .limit(20000);
  if (attemptsError) throw attemptsError;

  const daysByUser = new Map<string, Set<string>>();
  for (const row of attempts ?? []) {
    if (!row.submitted_at) continue;
    const set = daysByUser.get(row.user_id as string) ?? new Set<string>();
    set.add(dateKeyInTimeZone(row.submitted_at as string, TIME_ZONE));
    daysByUser.set(row.user_id as string, set);
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  let eligible = 0;
  for (const userId of userIds) {
    const streak = computeStreak(daysByUser.get(userId) ?? [], todayKey);
    if (streak.studiedToday) {
      skipped += 1;
      continue;
    }
    eligible += 1;
    const message = buildStudyReminderMessage(streak);
    try {
      const result = await sendNabuNotificationEmail({
        dedupeKey: `study:${userId}:${todayKey}`,
        category: "study",
        recipientUserId: userId,
        subject: message.subject,
        heading: message.heading,
        body: message.body,
        actionLabel: "Fazer a meta do dia",
        actionPath: "/dashboard?utm_source=email&utm_medium=lembrete&utm_campaign=study_reminder",
        unsubscribeUrl: unsubscribeUrl(userId),
      });
      if (result.sent) sent += 1;
      else if (result.reason === "duplicate" || result.reason === "preference_disabled") skipped += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }

  return { studyReminderWindow: true, studyEligible: eligible, studySent: sent, studySkipped: skipped, studyFailed: failed };
}
