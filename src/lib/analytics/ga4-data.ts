import "server-only";
import { createSign } from "node:crypto";

const METRICS = ["activeUsers", "sessions", "newUsers", "screenPageViews"] as const;
const API_URL = "https://analyticsdata.googleapis.com/v1beta";

export type Ga4Totals = { activeUsers: number; sessions: number; newUsers: number; screenPageViews: number };
export type Ga4SeriesRow = Ga4Totals & { label: string };
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

async function runReport(propertyId: string, token: string, days: number, dimensions: string[], includeTotals = false) {
  const response = await fetch(`${API_URL}/properties/${encodeURIComponent(propertyId)}:runReport`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: METRICS.map((name) => ({ name })),
      metricAggregations: includeTotals ? ["TOTAL"] : undefined,
      orderBys: dimensions.includes("date") ? [{ dimension: { dimensionName: "date" } }] : [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 100,
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

export async function getGa4Acquisition(days: number): Promise<Ga4AcquisitionReport | { connected: false; reason: "not_configured" }> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!propertyId || !email || !privateKey) return { connected: false, reason: "not_configured" };

  try {
    const token = await accessToken(email, privateKey);
    const [totals, daily, sources, campaigns, devices, landingPages] = await Promise.all([
      runReport(propertyId, token, days, [], true),
      runReport(propertyId, token, days, ["date"]),
      runReport(propertyId, token, days, ["sessionSource", "sessionMedium"]),
      runReport(propertyId, token, days, ["sessionCampaignName"]),
      runReport(propertyId, token, days, ["deviceCategory"]),
      runReport(propertyId, token, days, ["landingPage"]),
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
      rowCount: [daily, sources, campaigns, devices, landingPages].reduce((sum, result) => sum + (result.rows?.length ?? 0), 0),
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
