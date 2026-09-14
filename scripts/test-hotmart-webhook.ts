import assert from "node:assert/strict";
import {
  parseHotmartEvent,
  resolveHotmartTier,
  secureTokenMatches,
  type ParsedHotmartEvent,
} from "../src/lib/billing/hotmart";
import type { BillingPriceTier } from "../src/lib/billing/config";
import { validateHotmartWebhookRequest } from "../src/lib/billing/hotmart-request";
import { isPublicAppPath } from "../src/lib/supabase/proxy";

const PRODUCT_ID = "7654321";
const FOUNDER_OFFER = "founder-offer-test";
const STANDARD_OFFER = "standard-offer-test";

function fixture(
  event: string,
  options: {
    id?: string;
    createdAt?: number;
    email?: string;
    productId?: string;
    offer?: string;
    subscriptionId?: string;
  } = {},
) {
  return {
    id: options.id ?? `event-${event.toLowerCase()}`,
    creation_date: options.createdAt ?? 1_800_000_000_000,
    event,
    version: "2.0.0",
    data: {
      product: { id: Number(options.productId ?? PRODUCT_ID), name: "Produto de teste" },
      buyer: { email: options.email ?? "student-a@example.test", ucode: "buyer-test-a" },
      purchase: {
        transaction: `transaction-${event.toLowerCase()}`,
        offer: { code: options.offer ?? STANDARD_OFFER },
        approved_date: options.createdAt ?? 1_800_000_000_000,
      },
      subscription: {
        id: options.subscriptionId ?? "subscription-test-a",
        date_next_charge: 1_802_678_400_000,
      },
    },
  };
}

type StoredSubscription = {
  userId: string;
  status: ParsedHotmartEvent["status"];
  tier: BillingPriceTier;
  updatedAt: number;
};

class FakeAtomicWebhookStore {
  identities = new Map<string, string>();
  events = new Set<string>();
  subscriptions = new Map<string, StoredSubscription>();

  process(event: ParsedHotmartEvent, tier: BillingPriceTier | null) {
    if (this.events.has(event.eventId)) return "duplicate";
    this.events.add(event.eventId);
    const userId = event.buyerEmail
      ? this.identities.get(event.buyerEmail)
      : undefined;
    if (!userId) return "unmatched";
    const existing = this.subscriptions.get(userId);
    const eventTime = Date.parse(event.eventCreatedAt);
    if (existing && existing.updatedAt > eventTime) return "stale";
    if (event.status === "active" && !tier) return "conflict";
    this.subscriptions.set(userId, {
      userId,
      status: event.status,
      tier: tier ?? existing?.tier ?? "standard_990",
      updatedAt: eventTime,
    });
    return "processed";
  }
}

function tier(event: ParsedHotmartEvent) {
  return resolveHotmartTier(event.providerPlanIdentifiers, FOUNDER_OFFER, STANDARD_OFFER);
}

async function main() {
assert.equal(isPublicAppPath("/api/webhooks/hotmart"), true);
assert.equal(isPublicAppPath("/api/billing/prepare"), false);
assert.equal(secureTokenMatches("fixture-secret", "fixture-secret"), true);
assert.equal(secureTokenMatches("wrong-secret", "fixture-secret"), false);
assert.equal(secureTokenMatches(null, "fixture-secret"), false);

const invalidTokenResponse = await validateHotmartWebhookRequest(
  new Request("https://example.test/api/webhooks/hotmart", {
    method: "POST",
    headers: { "x-hotmart-hottok": "wrong-secret" },
    body: JSON.stringify(fixture("PURCHASE_APPROVED")),
  }),
  {
    hottok: "fixture-secret",
    productId: PRODUCT_ID,
    founderPlanId: FOUNDER_OFFER,
    standardPlanId: STANDARD_OFFER,
  },
);
assert.ok(invalidTokenResponse instanceof Response);
assert.equal(invalidTokenResponse.status, 401);

const wrongProduct = parseHotmartEvent(fixture("PURCHASE_APPROVED", { productId: "1111111" }));
assert.notEqual(wrongProduct.productId, PRODUCT_ID);
const wrongProductResponse = await validateHotmartWebhookRequest(
  new Request("https://example.test/api/webhooks/hotmart", {
    method: "POST",
    headers: { "x-hotmart-hottok": "fixture-secret" },
    body: JSON.stringify(fixture("PURCHASE_APPROVED", { productId: "1111111" })),
  }),
  {
    hottok: "fixture-secret",
    productId: PRODUCT_ID,
    founderPlanId: FOUNDER_OFFER,
    standardPlanId: STANDARD_OFFER,
  },
);
assert.ok(wrongProductResponse instanceof Response);
assert.equal(wrongProductResponse.status, 202);

const officialSwitchPlanTestPayload = {
  id: "switch-plan-test-event",
  creation_date: 1_800_000_000_000,
  event: "SWITCH_PLAN",
  version: "2.0.0",
  data: {
    subscriber_code: "test-subscriber-code",
    old_plan: { name: "Old test plan", id: "old-test-plan" },
    new_plan: { name: "New test plan", id: STANDARD_OFFER },
    product: { id: 1111111, name: "Produto test postback2" },
  },
};
const officialSwitchPlanTestResponse = await validateHotmartWebhookRequest(
  new Request("https://example.test/api/webhooks/hotmart", {
    method: "POST",
    headers: { "x-hotmart-hottok": "fixture-secret" },
    body: JSON.stringify(officialSwitchPlanTestPayload),
  }),
  {
    hottok: "fixture-secret",
    productId: PRODUCT_ID,
    founderPlanId: FOUNDER_OFFER,
    standardPlanId: STANDARD_OFFER,
  },
);
assert.ok(officialSwitchPlanTestResponse instanceof Response);
assert.equal(officialSwitchPlanTestResponse.status, 202);

const realSwitchPlan = parseHotmartEvent({
  ...officialSwitchPlanTestPayload,
  id: "switch-plan-real-event",
  data: {
    ...officialSwitchPlanTestPayload.data,
    product: { id: Number(PRODUCT_ID), name: "Subscription product" },
  },
});
assert.equal(realSwitchPlan.buyerEmail, null);
assert.equal(realSwitchPlan.providerSubscriptionId, "test-subscriber-code");
assert.equal(tier(realSwitchPlan), "standard_990");

const founderApproved = parseHotmartEvent(
  fixture("PURCHASE_APPROVED", { id: "founder-approved", offer: FOUNDER_OFFER }),
);
const standardApproved = parseHotmartEvent(
  fixture("PURCHASE_APPROVED", { id: "standard-approved", offer: STANDARD_OFFER }),
);
assert.equal(tier(founderApproved), "founder_477");
assert.equal(tier(standardApproved), "standard_990");

const store = new FakeAtomicWebhookStore();
store.identities.set("student-a@example.test", "user-a");
assert.equal(store.process(founderApproved, tier(founderApproved)), "processed");
assert.deepEqual(store.subscriptions.get("user-a")?.status, "active");
assert.deepEqual(store.subscriptions.get("user-a")?.tier, "founder_477");
assert.equal(store.process(founderApproved, tier(founderApproved)), "duplicate");

const renewal = parseHotmartEvent(
  fixture("PURCHASE_APPROVED", {
    id: "renewal-approved",
    createdAt: 1_800_100_000_000,
    offer: FOUNDER_OFFER,
  }),
);
assert.equal(store.process(renewal, tier(renewal)), "processed");

for (const [eventName, expectedStatus] of [
  ["PURCHASE_DELAYED", "past_due"],
  ["SUBSCRIPTION_CANCELLATION", "canceled"],
  ["PURCHASE_REFUNDED", "canceled"],
  ["PURCHASE_CHARGEBACK", "canceled"],
  ["PURCHASE_EXPIRED", "expired"],
] as const) {
  const parsed = parseHotmartEvent(
    fixture(eventName, {
      id: `state-${eventName}`,
      createdAt: 1_800_200_000_000 + store.events.size,
      offer: FOUNDER_OFFER,
    }),
  );
  assert.equal(store.process(parsed, tier(parsed)), "processed");
  assert.equal(store.subscriptions.get("user-a")?.status, expectedStatus);
}

const newerCancellation = parseHotmartEvent(
  fixture("SUBSCRIPTION_CANCELLATION", {
    id: "new-cancellation",
    createdAt: 1_800_500_000_000,
    offer: STANDARD_OFFER,
  }),
);
assert.equal(store.process(newerCancellation, tier(newerCancellation)), "processed");
const oldApproval = parseHotmartEvent(
  fixture("PURCHASE_APPROVED", {
    id: "old-approval",
    createdAt: 1_800_400_000_000,
    offer: STANDARD_OFFER,
  }),
);
assert.equal(store.process(oldApproval, tier(oldApproval)), "stale");
assert.equal(store.subscriptions.get("user-a")?.status, "canceled");

const unmatched = parseHotmartEvent(
  fixture("PURCHASE_APPROVED", {
    id: "unmatched-buyer",
    email: "unmatched@example.test",
  }),
);
assert.equal(store.process(unmatched, tier(unmatched)), "unmatched");
assert.equal(store.subscriptions.size, 1);

console.log("Hotmart C2: autenticação, produto, planos, estados, idempotência, ordem e vínculo validados.");
}

void main();
