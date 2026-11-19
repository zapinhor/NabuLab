import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { channelName, isMetaPaid, type AcquisitionEvent } from "@/lib/analytics/acquisition";
import type { Ga4AcquisitionReport } from "@/lib/analytics/ga4-data";

export type AcquisitionFilters = { startDate: string; endDate: string; source: string; medium: string; campaign: string; content: string };
export type MetricRow = { metric_date: string; source: string; medium: string; campaign: string; content: string; landing_path: string; event_type: AcquisitionEvent; event_count: number };
export type CampaignPerformance = { key: string; campaign: string; source: string; medium: string; channel: string; arrivals: number; sessions: number; signupStarts: number; signups: number; premium: number; checkouts: number };
export type CreativePerformance = { content: string; arrivals: number; sessions: number; signupStarts: number; signups: number; checkouts: number };

export function matchesCampaign(row: { source: string; medium: string; campaign: string; content: string }, filters: AcquisitionFilters): boolean {
  if (filters.source && row.source.toLowerCase() !== filters.source.toLowerCase()) return false;
  if (filters.medium && !(filters.source.toLowerCase() === "tiktok" && ["paid", "paid_social"].includes(filters.medium.toLowerCase())
    ? ["paid", "paid_social"].includes(row.medium.toLowerCase()) : row.medium.toLowerCase() === filters.medium.toLowerCase())) return false;
  return (!filters.campaign || row.campaign.toLowerCase() === filters.campaign.toLowerCase())
    && (!filters.content || row.content.toLowerCase() === filters.content.toLowerCase());
}

export async function getAcquisitionRows(filters: AcquisitionFilters): Promise<MetricRow[]> {
  const rows: MetricRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await createAdminClient().from("acquisition_daily_metrics")
      .select("metric_date,source,medium,campaign,content,landing_path,event_type,event_count")
      .gte("metric_date", filters.startDate).lte("metric_date", filters.endDate)
      .order("metric_date", { ascending: true }).range(from, from + 999);
    if (error) throw error;
    rows.push(...(data ?? []) as MetricRow[]);
    if (!data || data.length < 1000) break;
  }
  return rows.filter((row) => matchesCampaign(row, filters));
}

export type MetaAdsSummary = { arrivals: number; sessions: number; signupStarts: number; signups: number; premium: number; checkouts: number; campaigns: CampaignPerformance[]; creatives: CreativePerformance[] };

function emptyCampaign(key: string, row: { campaign: string; source: string; medium: string }): CampaignPerformance {
  return { key, campaign: row.campaign || "(sem campanha)", source: row.source, medium: row.medium, channel: channelName(row.source, row.medium), arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, premium: 0, checkouts: 0 };
}
const FIELD = { landing_request: "arrivals", signup_started: "signupStarts", signup_completed: "signups", premium_viewed: "premium", checkout_started: "checkouts" } as const;

/** Recorte só dos anúncios Meta, agrupado por campanha (utm_campaign) e criativo (utm_content). */
export function summarizeMetaAds(rows: MetricRow[], ga: Ga4AcquisitionReport | null): MetaAdsSummary {
  const total: MetaAdsSummary = { arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, premium: 0, checkouts: 0, campaigns: [], creatives: [] };
  const campaigns = new Map<string, CampaignPerformance>();
  const creatives = new Map<string, CreativePerformance>();
  const creative = (content: string) => creatives.get(content) ?? { content, arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, checkouts: 0 };
  for (const row of rows) {
    if (!isMetaPaid(row.source, row.medium)) continue;
    const field = FIELD[row.event_type];
    if (!field) continue;
    total[field] += row.event_count;
    const key = row.campaign || "(sem campanha)";
    const item = campaigns.get(key) ?? emptyCampaign(key, { ...row, source: "meta", medium: "paid" });
    item[field] += row.event_count; campaigns.set(key, item);
    if (row.content && field !== "premium") { const c = creative(row.content); c[field] += row.event_count; creatives.set(row.content, c); }
  }
  for (const row of ga?.attributedSessions ?? []) {
    if (!isMetaPaid(row.source, row.medium)) continue;
    total.sessions += row.sessions;
    const key = row.campaign && row.campaign !== "(not set)" ? row.campaign : "(sem campanha)";
    const item = campaigns.get(key) ?? emptyCampaign(key, { campaign: key, source: "meta", medium: "paid" });
    item.sessions += row.sessions; campaigns.set(key, item);
    if (row.content && row.content !== "(not set)") { const c = creative(row.content); c.sessions += row.sessions; creatives.set(row.content, c); }
  }
  const weight = (item: { arrivals: number; sessions: number; signups: number }) => item.signups * 1e6 + Math.max(item.arrivals, item.sessions);
  total.campaigns = [...campaigns.values()].sort((a, b) => weight(b) - weight(a));
  total.creatives = [...creatives.values()].sort((a, b) => weight(b) - weight(a));
  return total;
}

export function summarizeAcquisition(rows: MetricRow[], ga: Ga4AcquisitionReport | null) {
  const count = (event: AcquisitionEvent) => rows.filter((row) => row.event_type === event).reduce((sum, row) => sum + row.event_count, 0);
  const campaigns = new Map<string, CampaignPerformance>();
  const creatives = new Map<string, CreativePerformance>();
  for (const row of rows) {
    if (!row.source || !row.medium) continue;
    const medium = row.source === "tiktok" && ["paid", "paid_social"].includes(row.medium) ? "paid_social" : row.medium;
    const key = [row.campaign, row.source, medium].join("\u001f");
    const item = campaigns.get(key) ?? { key, campaign: row.campaign || "(sem campanha)", source: row.source, medium, channel: channelName(row.source, row.medium), arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, premium: 0, checkouts: 0 };
    const field = { landing_request: "arrivals", signup_started: "signupStarts", signup_completed: "signups", premium_viewed: "premium", checkout_started: "checkouts" }[row.event_type] as "arrivals" | "signupStarts" | "signups" | "premium" | "checkouts" | undefined;
    if (!field) continue;
    item[field] += row.event_count;
    campaigns.set(key, item);
    if (row.content) {
      const creative = creatives.get(row.content) ?? { content: row.content, arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, checkouts: 0 };
      if (field !== "premium") creative[field] += row.event_count;
      creatives.set(row.content, creative);
    }
  }
  for (const row of ga?.attributedSessions ?? []) {
    if (!row.source || !row.medium) continue;
    const medium = row.source.toLowerCase() === "tiktok" && ["paid", "paid_social"].includes(row.medium.toLowerCase()) ? "paid_social" : row.medium;
    const key = [row.campaign, row.source.toLowerCase(), medium.toLowerCase()].join("\u001f");
    const item = campaigns.get(key) ?? { key, campaign: row.campaign || "(sem campanha)", source: row.source, medium, channel: channelName(row.source, row.medium), arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, premium: 0, checkouts: 0 };
    item.sessions += row.sessions;
    campaigns.set(key, item);
    if (row.content && row.content !== "(not set)") {
      const creative = creatives.get(row.content) ?? { content: row.content, arrivals: 0, sessions: 0, signupStarts: 0, signups: 0, checkouts: 0 };
      creative.sessions += row.sessions;
      creatives.set(row.content, creative);
    }
  }
  return {
    arrivals: count("landing_request"), signupStarts: count("signup_started"), signups: count("signup_completed"), premium: count("premium_viewed"), checkouts: count("checkout_started"),
    metaSignups: rows.filter((row) => row.event_type === "signup_completed" && isMetaPaid(row.source, row.medium)).reduce((sum, row) => sum + row.event_count, 0),
    meta: summarizeMetaAds(rows, ga),
    tiktokSignups: rows.filter((row) => row.event_type === "signup_completed" && row.source.toLowerCase() === "tiktok" && ["paid", "paid_social"].includes(row.medium.toLowerCase())).reduce((sum, row) => sum + row.event_count, 0),
    campaigns: [...campaigns.values()].sort((a, b) => b.arrivals - a.arrivals),
    creatives: [...creatives.values()].sort((a, b) => b.arrivals - a.arrivals),
  };
}
