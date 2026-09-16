import type { BillingPriceTier } from "@/lib/billing/config";

export function tierForOffer(
  offerCode: string | null,
  founderCode = process.env.HOTMART_FOUNDER_PLAN_ID?.trim() ?? "v4h77zvh",
  standardCode = process.env.HOTMART_STANDARD_PLAN_ID?.trim() ?? "7mqlgaln",
): BillingPriceTier | null {
  if (offerCode === founderCode) return "founder_477";
  if (offerCode === standardCode) return "standard_990";
  return null;
}

export function hotmartSalesEpochRange(from: string, to: string, now = Date.now()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) throw new Error("HOTMART_INVALID_DATE_RANGE");
  for (const value of [from, to]) {
    const [year, month, day] = value.split("-").map(Number);
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth) throw new Error("HOTMART_INVALID_DATE_RANGE");
  }
  const start = new Date(`${from}T00:00:00.000-03:00`).getTime();
  const selectedEnd = new Date(`${to}T23:59:59.999-03:00`).getTime();
  const end = Math.min(selectedEnd, now);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end) throw new Error("HOTMART_INVALID_DATE_RANGE");
  return { start, end };
}
