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
