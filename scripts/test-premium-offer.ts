import assert from "node:assert/strict";
import { selectCurrentOffer, type OfferTier } from "../src/lib/billing/offer";
import { hasActivePremium, type StudentSubscription } from "../src/lib/entitlements";

type TestOffer = { tier: OfferTier; available: boolean; price: string };
function offers(founderAvailable: boolean): Record<OfferTier, TestOffer> {
  return {
    founder_477: { tier: "founder_477", available: founderAvailable, price: "founder-price" },
    standard_990: { tier: "standard_990", available: true, price: "standard-price" },
  };
}
function activeSubscription(priceTier: OfferTier): StudentSubscription {
  return { id: "test", userId: "user", plan: "premium", status: "active", priceTier, provider: "hotmart", currentPeriodStart: null, currentPeriodEnd: null, cancelAtPeriodEnd: false, canceledAt: null, terminationReason: null };
}

assert.equal(selectCurrentOffer(offers(true)).tier, "founder_477", "Founder ativo + Free vende somente Founder");
assert.equal(selectCurrentOffer(offers(false)).tier, "standard_990", "Founder inativo + Free vende somente Standard");
assert.equal(hasActivePremium(activeSubscription("founder_477")), true, "Premium Founder não recebe oferta");
assert.equal(hasActivePremium(activeSubscription("standard_990")), true, "Premium Standard não recebe oferta");
console.log("Premium offer: 4 commercial states passed.");
