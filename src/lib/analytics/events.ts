export const ANALYTICS_EVENT_NAMES = [
  "landing_view",
  "signup_cta_clicked",
  "premium_cta_clicked",
  "signup_completed",
  "login_completed",
  "free_exam_started",
  "free_exam_completed",
  "premium_page_viewed",
  "checkout_started",
  "purchase_approved",
  "subscription_canceled",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export function isAnalyticsEventName(value: unknown): value is AnalyticsEventName {
  return typeof value === "string" && ANALYTICS_EVENT_NAMES.includes(value as AnalyticsEventName);
}

export function sanitizeAnalyticsProperties(value: unknown): Record<string, string | number | boolean> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 10)
      .filter(([key, item]) =>
        key.length <= 40 &&
        (typeof item === "string" || typeof item === "number" || typeof item === "boolean") &&
        (typeof item !== "string" || item.length <= 120),
      ),
  ) as Record<string, string | number | boolean>;
}
