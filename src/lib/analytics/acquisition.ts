export type Campaign = { source: string; medium: string; campaign: string; content: string };
export type AcquisitionEvent = "landing_request" | "signup_started" | "signup_completed" | "premium_viewed" | "checkout_started";
export const ATTRIBUTION_COOKIE = "nabulab_campaign_attribution";
export const ATTRIBUTION_MAX_AGE = 24 * 60 * 60;

const VALUE_PATTERN = /^[\p{L}\p{N} _|.\-/]+$/u;

function clean(value: string | null, limit: number): string | null {
  if (!value) return "";
  const normalized = value.trim().slice(0, limit);
  return normalized.length && VALUE_PATTERN.test(normalized) ? normalized : null;
}

export function parseCampaign(params: URLSearchParams): Campaign | null {
  const source = clean(params.get("utm_source"), 40);
  const medium = clean(params.get("utm_medium"), 40);
  const campaign = clean(params.get("utm_campaign"), 100);
  const content = clean(params.get("utm_content"), 100);
  if (!source || !medium || campaign === null || content === null) return null;
  return { source: source.toLowerCase(), medium: medium.toLowerCase(), campaign, content };
}

export function campaignQuery(params: URLSearchParams): string {
  const output = new URLSearchParams();
  const limits = { utm_source: 40, utm_medium: 40, utm_campaign: 100, utm_content: 100 } as const;
  for (const [key, limit] of Object.entries(limits)) {
    const normalized = clean(params.get(key), limit);
    if (normalized) output.set(key, normalized);
  }
  return output.toString();
}

export function readAttribution(value: string | undefined): Campaign | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as { source?: unknown; medium?: unknown; campaign?: unknown; content?: unknown; timestamp?: unknown };
    if (typeof parsed.timestamp !== "number" || parsed.timestamp > Date.now() || Date.now() - parsed.timestamp > ATTRIBUTION_MAX_AGE * 1000) return null;
    if (Object.values(parsed).some((item) => typeof item !== "string" && typeof item !== "number")) return null;
    const params = new URLSearchParams({ utm_source: String(parsed.source ?? ""), utm_medium: String(parsed.medium ?? ""), utm_campaign: String(parsed.campaign ?? ""), utm_content: String(parsed.content ?? "") });
    return parseCampaign(params);
  } catch { return null; }
}

export function channelName(source: string, medium: string): string {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();
  if (s === "tiktok" && ["paid", "paid_social"].includes(m)) return "TikTok Ads";
  if (s === "google" && m === "organic") return "Google Orgânico";
  if (s === "(direct)" && m === "(none)") return "Acesso direto";
  if (["(not set)", "(data not available)", ""].includes(s)) return "Não identificado";
  if (m === "referral") return "Referência";
  return `${source} / ${medium}`;
}

export function isPublicLanding(path: string): boolean {
  return ["/", "/comece", "/cadastro", "/premium", "/turmas", "/suporte"].includes(path);
}

export function shouldCountLanding(input: { method: string; path: string; accept: string | null; userAgent: string | null; fetchMode: string | null; prefetch: string | null }): boolean {
  return input.method === "GET"
    && isPublicLanding(input.path)
    && Boolean(input.accept?.includes("text/html"))
    && (!input.fetchMode || input.fetchMode === "navigate")
    && !input.prefetch
    && !/(bot|crawler|spider|slurp|headless|lighthouse|preview|facebookexternalhit)/i.test(input.userAgent ?? "");
}
