import "server-only";
import { createSign } from "node:crypto";

const METRICS = ["activeUsers", "sessions", "newUsers", "screenPageViews"] as const;
const API_URL = "https://analyticsdata.googleapis.com/v1beta";

export type Ga4Totals = { activeUsers: number; sessions: number; newUsers: number; screenPageViews: number };
export type Ga4SeriesRow = Ga4Totals & { label: string };
export type Ga4AttributionRow = Ga4Totals & { source: string; medium: string; campaign: string; content: string };
export type Ga4Filters = { startDate: string; endDate: string; source?: string; medium?: string; campaign?: string; content?: string };
export type Ga4AcquisitionReport = {
  connected: true;
  propertyId: string;
  days: number;
  totals: Ga4Totals;
  daily: Ga4SeriesRow[];
  sources: Ga4SeriesRow[];
  campaigns: Ga4SeriesRow[];
  devices: Ga4SeriesRow[];
  landingPages: Ga4SeriesRow[];
  pagePaths: Ga4SeriesRow[];
  attributedSessions: Ga4AttributionRow[];
  rowCount: number;
};

type ApiRow = { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] };
type ApiResponse = { rows?: ApiRow[]; totals?: { metricValues?: { value?: string }[] }[] };

export class Ga4DataError extends Error {
  constructor(public readonly code: string, public readonly status?: number) {
    super("Google Analytics indisponível");
    this.name = "Ga4DataError";
  }
}

function base64url(value: string) { return Buffer.from(value).toString("base64url"); }
function numberAt(values: { value?: string }[] | undefined, index: number) { return Number(values?.[index]?.value ?? 0) || 0; }

async function accessToken(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iss: email, scope: "https://www.googleapis.com/auth/analytics.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const unsigned = `${header}.${claims}`;
  const normalizedPrivateKey = privateKey.replace(/\\n/g, "\n");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(normalizedPrivateKey, "base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    cache: "no-store",
  });
  if (!response.ok) throw new Ga4DataError("GA4_OAUTH", response.status);
  return (await response.json() as { access_token: string }).access_token;
}

async function runReport(propertyId: string, token: string, filters: Ga4Filters, dimensions: string[], includeTotals = false) {
  const exact = (dimensionName: string, value: string) => ({ filter: { fieldName: dimensionName, stringFilter: { matchType: "EXACT", value, caseSensitive: false } } });
  const conditions = [
    filters.source ? exact("sessionSource", filters.source) : null,
    filters.medium ? ["paid", "paid_social"].includes(filters.medium.toLowerCase()) && filters.source?.toLowerCase() === "tiktok"
      ? { orGroup: { expressions: [exact("sessionMedium", "paid"), exact("sessionMedium", "paid_social")] } }
      : exact("sessionMedium", filters.medium) : null,
    filters.campaign ? exact("sessionCampaignName", filters.campaign) : null,
    filters.content ? exact("sessionManualAdContent", filters.content) : null,
  ].filter((item) => item !== null);
  const response = await fetch(`${API_URL}/properties/${encodeURIComponent(propertyId)}:runReport`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: filters.startDate, endDate: filters.endDate }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: METRICS.map((name) => ({ name })),
      dimensionFilter: conditions.length ? { andGroup: { expressions: conditions } } : undefined,
      metricAggregations: includeTotals ? ["TOTAL"] : undefined,
      orderBys: dimensions.includes("date") ? [{ dimension: { dimensionName: "date" } }] : [{ metric: { metricName: dimensions.includes("pagePath") ? "screenPageViews" : "sessions" }, desc: true }],
      limit: 10000,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Ga4DataError("GA4_DATA_API", response.status);
  return await response.json() as ApiResponse;
}

function totalsFrom(data: ApiResponse): Ga4Totals {
  const values = data.totals?.[0]?.metricValues ?? data.rows?.[0]?.metricValues;
  return { activeUsers: numberAt(values, 0), sessions: numberAt(values, 1), newUsers: numberAt(values, 2), screenPageViews: numberAt(values, 3) };
}

function rowsFrom(data: ApiResponse, label: (values: string[]) => string): Ga4SeriesRow[] {
  return (data.rows ?? []).map((row) => {
    const dimensions = (row.dimensionValues ?? []).map((value) => value.value || "(não definido)");
    return { label: label(dimensions), ...totalsFrom({ rows: [row] }) };
  });
}

export async function getGa4Acquisition(days: number, filters?: Ga4Filters): Promise<Ga4AcquisitionReport | { connected: false; reason: "not_configured" }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!propertyId || !email || !privateKey) return { connected: false, reason: "not_configured" };

  try {
    const token = await accessToken(email, privateKey);
    const today = new Date();
    const start = new Date(today.getTime() - (days - 1) * 86_400_000);
    const range = filters ?? { startDate: start.toISOString().slice(0, 10), endDate: today.toISOString().slice(0, 10) };
    const [totals, daily, sources, campaigns, devices, landingPages, pagePaths, attributed] = await Promise.all([
      runReport(propertyId, token, range, [], true),
      runReport(propertyId, token, range, ["date"]),
      runReport(propertyId, token, range, ["sessionSource", "sessionMedium"]),
      runReport(propertyId, token, range, ["sessionCampaignName"]),
      runReport(propertyId, token, range, ["deviceCategory"]),
      runReport(propertyId, token, range, ["landingPage"]),
      runReport(propertyId, token, range, ["pagePath"]),
      runReport(propertyId, token, range, ["sessionSource", "sessionMedium", "sessionCampaignName", "sessionManualAdContent"]),
    ]);
    const report: Ga4AcquisitionReport = {
      connected: true,
      propertyId,
      days,
      totals: totalsFrom(totals),
      daily: rowsFrom(daily, ([date]) => date),
      sources: rowsFrom(sources, ([source, medium]) => `${source} / ${medium}`),
      campaigns: rowsFrom(campaigns, ([campaign]) => campaign),
      devices: rowsFrom(devices, ([device]) => device),
      landingPages: rowsFrom(landingPages, ([landingPage]) => landingPage),
      pagePaths: rowsFrom(pagePaths, ([path]) => path),
      attributedSessions: (attributed.rows ?? []).map((row) => ({
        source: row.dimensionValues?.[0]?.value ?? "", medium: row.dimensionValues?.[1]?.value ?? "",
        campaign: row.dimensionValues?.[2]?.value ?? "", content: row.dimensionValues?.[3]?.value ?? "",
        ...totalsFrom({ rows: [row] }),
      })),
      rowCount: [daily, sources, campaigns, devices, landingPages, pagePaths, attributed].reduce((sum, result) => sum + (result.rows?.length ?? 0), 0),
    };
    if (process.env.NODE_ENV === "development") console.info("[ga4-data]", { connected: true, propertyId, status: 200, rowCount: report.rowCount });
    return report;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[ga4-data]", { connected: false, propertyId, status: error instanceof Ga4DataError ? error.status ?? null : null, code: error instanceof Ga4DataError ? error.code : "UNKNOWN", rowCount: 0 });
    }
    throw error;
  }
}
