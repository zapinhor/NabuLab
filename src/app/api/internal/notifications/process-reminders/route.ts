import { isValidCronAuthorization, processNotificationReminders } from "@/lib/notifications-reminders";
import { getRequestId, logServerEvent } from "@/lib/observability";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  if (!isValidCronAuthorization(request.headers.get("authorization"))) {
    logServerEvent({ level: "warn", subsystem: "scheduler", event: "notification_reminders_unauthorized", outcome: "failure", requestId, httpStatus: 401 });
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const started = await admin.from("system_job_runs").insert({
    job_name: "notification_reminders", request_id: requestId, status: "running", safe_summary: {},
  }).select("id").single();
  if (started.error) {
    logServerEvent({ level: "error", subsystem: "scheduler", event: "health_record_start_failed", outcome: "failure", requestId, metadata: { errorCode: started.error.code } });
  }

  try {
    const result = await processNotificationReminders();
    if (started.data?.id) {
      const { error } = await admin.from("system_job_runs").update({ status: "success", finished_at: new Date().toISOString(), safe_summary: result }).eq("id", started.data.id);
      if (error) logServerEvent({ level: "error", subsystem: "scheduler", event: "health_record_finish_failed", outcome: "failure", requestId, metadata: { errorCode: error.code } });
    }
    logServerEvent({ level: "info", subsystem: "scheduler", event: "notification_reminders_processed", outcome: "success", requestId, httpStatus: 200, metadata: result });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    if (started.data?.id) {
      await admin.from("system_job_runs").update({ status: "failed", finished_at: new Date().toISOString(), safe_summary: { reason: "processing_failed" } }).eq("id", started.data.id);
    }
    logServerEvent({ level: "error", subsystem: "scheduler", event: "notification_reminders_failed", outcome: "failure", requestId, httpStatus: 500, metadata: { errorName: error instanceof Error ? error.name : "UnknownError" } });
    return Response.json({ ok: false, error: "processing_failed" }, { status: 500 });
  }
}
