import "server-only";
import {
  isTeacherOfferKey,
  parseTeacherOfferKey,
  TEACHER_PLANS,
  type TeacherOfferKey,
} from "@/lib/teacher-plans";

const keys = [
  "teacher_essential_monthly", "teacher_essential_yearly", "teacher_pro_monthly",
  "teacher_pro_yearly", "teacher_advanced_monthly", "teacher_advanced_yearly",
] as const satisfies readonly TeacherOfferKey[];

const envPrefix: Record<TeacherOfferKey, string> = {
  teacher_essential_monthly: "HOTMART_TEACHER_ESSENTIAL_MONTHLY",
  teacher_essential_yearly: "HOTMART_TEACHER_ESSENTIAL_YEARLY",
  teacher_pro_monthly: "HOTMART_TEACHER_PRO_MONTHLY",
  teacher_pro_yearly: "HOTMART_TEACHER_PRO_YEARLY",
  teacher_advanced_monthly: "HOTMART_TEACHER_ADVANCED_MONTHLY",
  teacher_advanced_yearly: "HOTMART_TEACHER_ADVANCED_YEARLY",
};

const optional = (name: string) => process.env[name]?.trim() || null;

function isValidProductId(value: string | null) {
  return Boolean(value && /^\d{7,}$/.test(value));
}

function isValidOfferCode(value: string | null) {
  return Boolean(value && /^[A-Za-z0-9_-]+$/.test(value));
}

function isValidCheckoutUrl(value: string | null, offerCode: string | null) {
  if (!value || !offerCode) return false;
  try {
    const url = new URL(value);
    const hotmartHost = url.hostname === "hotmart.com" || url.hostname.endsWith(".hotmart.com");
    const linkedOffer = url.searchParams.get("off");
    return url.protocol === "https:" && hotmartHost && (!linkedOffer || linkedOffer === offerCode);
  } catch {
    return false;
  }
}

export function getTeacherHotmartOffers() {
  return Object.fromEntries(keys.map((key) => {
    const prefix = envPrefix[key];
    const parsed = parseTeacherOfferKey(key);
    const productId = optional(`${prefix}_PRODUCT_ID`);
    const offerCode = optional(`${prefix}_OFFER_CODE`);
    const checkoutUrl = optional(`${prefix}_CHECKOUT_URL`);
    const expectedPrice = parsed.cycle === "monthly"
      ? TEACHER_PLANS[parsed.plan].monthlyPrice
      : TEACHER_PLANS[parsed.plan].yearlyPrice;
    const available = isValidProductId(productId)
      && isValidOfferCode(offerCode)
      && isValidCheckoutUrl(checkoutUrl, offerCode);
    return [key, { key, ...parsed, productId, offerCode, checkoutUrl,
      expectedPrice, currency: "BRL" as const, available }];
  })) as Record<TeacherOfferKey, {
    key: TeacherOfferKey; plan: "essential" | "pro" | "advanced";
    cycle: "monthly" | "yearly"; productId: string | null; offerCode: string | null;
    checkoutUrl: string | null; expectedPrice: number; currency: "BRL"; available: boolean;
  }>;
}

export function getTeacherOffer(value: unknown) {
  if (!isTeacherOfferKey(value)) return null;
  return getTeacherHotmartOffers()[value];
}

export function resolveTeacherHotmartOffer(productId: string, identifiers: readonly string[]) {
  return Object.values(getTeacherHotmartOffers()).find((offer) =>
    offer.available && offer.productId === productId && Boolean(offer.offerCode && identifiers.includes(offer.offerCode)),
  ) ?? null;
}
