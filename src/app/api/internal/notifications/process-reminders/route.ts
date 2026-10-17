import { isValidCronAuthorization, processNotificationReminders } from "@/lib/notifications-reminders";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (!isValidCronAuthorization(request.headers.get("authorization"))) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await processNotificationReminders();
    console.info("[notification-reminders] processed", result);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    console.error("[notification-reminders] failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: "Reminder processing failed",
    });
    return Response.json({ ok: false, error: "processing_failed" }, { status: 500 });
  }
}
