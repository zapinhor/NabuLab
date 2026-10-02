import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AcquisitionEvent, Campaign } from "@/lib/analytics/acquisition";

export async function recordAcquisitionMetric(event: AcquisitionEvent, campaign: Campaign | null, landingPath: string) {
  const { error } = await createAdminClient().rpc("increment_acquisition_daily_metric", {
    p_source: campaign?.source ?? "",
    p_medium: campaign?.medium ?? "",
    p_campaign: campaign?.campaign ?? "",
    p_content: campaign?.content ?? "",
    p_landing_path: landingPath,
    p_event_type: event,
  });
  if (error) throw error;
}
