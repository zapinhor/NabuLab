import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { parseCampaign, shouldCountLanding } from "@/lib/analytics/acquisition";
import { recordAcquisitionMetric } from "@/lib/analytics/acquisition-server";

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);
  const campaign = parseCampaign(request.nextUrl.searchParams);
  if (campaign && response.status === 200 && shouldCountLanding({
    method: request.method,
    path: request.nextUrl.pathname,
    accept: request.headers.get("accept"),
    userAgent: request.headers.get("user-agent"),
    fetchMode: request.headers.get("sec-fetch-mode"),
    prefetch: request.headers.get("next-router-prefetch") ?? request.headers.get("purpose"),
  })) {
    try { await recordAcquisitionMetric("landing_request", campaign, request.nextUrl.pathname); }
    catch (error) { console.error("[acquisition] Chegada não registrada:", error instanceof Error ? error.message : "erro desconhecido"); }
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
