import { createHash, timingSafeEqual } from "node:crypto";
import type { BillingPriceTier } from "@/lib/billing/config";

export const HOTMART_EVENT_STATUS = {
  PURCHASE_APPROVED: "active",
  PURCHASE_COMPLETE: "active",
  PURCHASE_DELAYED: "past_due",
  PURCHASE_CANCELED: "canceled",
  PURCHASE_REFUNDED: "canceled",
  PURCHASE_CHARGEBACK: "canceled",
  PURCHASE_EXPIRED: "expired",
  SUBSCRIPTION_CANCELLATION: "canceled",
  UPDATE_SUBSCRIPTION_CHARGE_DATE: "active",
  SWITCH_PLAN: "active",
} as const;

export type HotmartEventType = keyof typeof HOTMART_EVENT_STATUS;
export type HotmartSubscriptionStatus = (typeof HOTMART_EVENT_STATUS)[HotmartEventType];

type JsonRecord = Record<string, unknown>;

export type ParsedHotmartEvent = {
  eventId: string;
  eventType: HotmartEventType;
  productId: string;
  eventCreatedAt: string;
  buyerEmail: string | null;
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  transactionId: string | null;
  providerPlanIdentifiers: string[];
  status: HotmartSubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  sanitizedPayload: JsonRecord;
};

function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function path(root: JsonRecord, keys: string[]): unknown {
  let value: unknown = root;
  for (const key of keys) value = record(value)[key];
  return value;
}

function text(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function firstText(root: JsonRecord, paths: string[][]): string | null {
  for (const keys of paths) {
    const value = text(path(root, keys));
    if (value) return value;
  }
  return null;
}

function toIso(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    const milliseconds = value < 10_000_000_000 ? value * 1000 : value;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return toIso(numeric);
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  return null;
}

export function normalizeBillingEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function secureTokenMatches(received: string | null, expected: string): boolean {
  const receivedDigest = createHash("sha256").update(received ?? "").digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(receivedDigest, expectedDigest);
}

export function parseHotmartEvent(payload: unknown): ParsedHotmartEvent {
  const root = record(payload);
  const data = record(root.data);
  const eventId = text(root.id);
  const eventTypeValue = text(root.event);
  const eventCreatedAt = toIso(root.creation_date);

  if (!eventId || !eventTypeValue || !eventCreatedAt) {
    throw new Error("HOTMART_PAYLOAD_INVALID");
  }
  if (!(eventTypeValue in HOTMART_EVENT_STATUS)) {
    throw new Error("HOTMART_EVENT_UNSUPPORTED");
  }
  const eventType = eventTypeValue as HotmartEventType;
  const productId = firstText(data, [
    ["product", "id"],
    ["subscription", "product", "id"],
  ]);
  const buyerEmail = firstText(data, [
    ["buyer", "email"],
    ["subscriber", "email"],
    ["subscription", "subscriber", "email"],
  ]);
  if (!productId || (!buyerEmail && eventType !== "SWITCH_PLAN")) {
    throw new Error("HOTMART_PAYLOAD_INVALID");
  }

  const providerPlanIdentifiers = [
    firstText(data, [["purchase", "offer", "code"]]),
    firstText(data, [["offer", "code"]]),
    firstText(data, [["plan", "offer", "code"]]),
    firstText(data, [["plan", "id"]]),
    firstText(data, [["new_plan", "offer", "code"]]),
    firstText(data, [["new_plan", "id"]]),
    firstText(data, [["subscription", "plan", "id"]]),
  ].filter((value): value is string => Boolean(value));

  const transactionId = firstText(data, [
    ["purchase", "transaction"],
    ["transaction"],
  ]);
  const providerSubscriptionId = firstText(data, [
    ["subscription", "subscriber", "code"],
    ["subscription", "id"],
    ["subscription_id"],
    ["subscriber_code"],
    ["subscriber", "code"],
  ]);
  const providerCustomerId = firstText(data, [
    ["buyer", "ucode"],
    ["subscriber", "ucode"],
    ["subscriber", "code"],
  ]);
  const currentPeriodStart =
    toIso(path(data, ["purchase", "approved_date"])) ??
    toIso(path(data, ["subscription", "accession_date"]));
  const currentPeriodEnd =
    toIso(path(data, ["purchase", "date_next_charge"])) ??
    toIso(path(data, ["subscription", "date_next_charge"])) ??
    toIso(path(data, ["date_next_charge"]));

  return {
    eventId,
    eventType,
    productId,
    eventCreatedAt,
    buyerEmail: buyerEmail ? normalizeBillingEmail(buyerEmail) : null,
    providerCustomerId,
    providerSubscriptionId,
    transactionId,
    providerPlanIdentifiers,
    status: HOTMART_EVENT_STATUS[eventType],
    currentPeriodStart,
    currentPeriodEnd,
    sanitizedPayload: {
      version: text(root.version),
      productId,
      providerPlanIdentifiers,
      subscriptionStatus: firstText(data, [
        ["subscription", "status"],
        ["status"],
      ]),
    },
  };
}

export function resolveHotmartTier(
  identifiers: readonly string[],
  founderPlanId: string | null,
  standardPlanId: string | null,
): BillingPriceTier | null {
  if (founderPlanId && identifiers.includes(founderPlanId)) return "founder_477";
  if (standardPlanId && identifiers.includes(standardPlanId)) return "standard_990";
  return null;
}
