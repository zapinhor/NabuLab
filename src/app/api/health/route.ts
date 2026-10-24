import { getRequestId, logServerEvent } from "@/lib/observability";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    const { error } = await createAdminClient().from("profiles").select("id", { head: true, count: "exact" }).limit(1);
    if (error) throw error;
    return Response.json(
      { status: "ok", checks: { application: "ok", database: "ok" }, requestId },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    logServerEvent({
      level: "error", subsystem: "health", event: "database_check_failed", outcome: "failure",
      requestId, httpStatus: 503, metadata: { errorName: error instanceof Error ? error.name : "UnknownError" },
    });
    return Response.json(
      { status: "degraded", checks: { application: "ok", database: "unavailable" }, requestId },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
