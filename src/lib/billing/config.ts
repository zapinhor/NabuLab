import "server-only";
import { selectCurrentOffer } from "@/lib/billing/offer";

export type BillingPriceTier = "founder_477" | "standard_990";

export type BillingPlanConfig = {
  tier: BillingPriceTier;
  name: "Founder" | "Standard";
  displayPrice: string;
  providerPlanId: string | null;
  checkoutUrl: string | null;
  available: boolean;
};

function optional(name: string): string | null {
  const value = process.env[name]?.trim();
  return value || null;
}

export function getHotmartConfig() {
  const founderPlanId = optional("HOTMART_FOUNDER_PLAN_ID");
  const founderCheckoutUrl = optional("HOTMART_FOUNDER_CHECKOUT_URL");
  const standardPlanId = optional("HOTMART_STANDARD_PLAN_ID");
  const standardCheckoutUrl = optional("HOTMART_STANDARD_CHECKOUT_URL");

  const plans: Record<BillingPriceTier, BillingPlanConfig> = {
    founder_477: {
      tier: "founder_477",
      name: "Founder",
      displayPrice: "R$ 4,77",
      providerPlanId: founderPlanId,
      checkoutUrl: founderCheckoutUrl,
      available:
        process.env.HOTMART_FOUNDER_AVAILABLE === "true" &&
        Boolean(founderPlanId && founderCheckoutUrl),
    },
    standard_990: {
      tier: "standard_990",
      name: "Standard",
      displayPrice: "R$ 9,90",
      providerPlanId: standardPlanId,
      checkoutUrl: standardCheckoutUrl,
      available: Boolean(standardPlanId && standardCheckoutUrl),
    },
  };

  const currentOffer = selectCurrentOffer(plans);

  return {
    hottok: optional("HOTMART_HOTTOK"),
    productId: optional("HOTMART_PRODUCT_ID"),
    plans,
    currentOffer,
  };
}

export function getConfiguredCheckout(tier: BillingPriceTier): string | null {
  const plan = getHotmartConfig().plans[tier];
  return plan.available ? plan.checkoutUrl : null;
}
