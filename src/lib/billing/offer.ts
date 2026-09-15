export type OfferTier = "founder_477" | "standard_990";

export function selectCurrentOffer<T extends { tier: OfferTier; available: boolean }>(
  plans: Record<OfferTier, T>,
): T {
  return plans.founder_477.available ? plans.founder_477 : plans.standard_990;
}
