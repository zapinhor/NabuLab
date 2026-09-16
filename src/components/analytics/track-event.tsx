"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEventName } from "@/lib/analytics/events";

export async function trackEvent(
  event: AnalyticsEventName,
  properties?: Record<string, string | number | boolean>,
) {
  const campaign = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
      .map((key) => [key, new URLSearchParams(location.search).get(key)])
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
  const enriched = { ...campaign, ...properties };
  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, path: `${location.pathname}${location.search}`, properties: enriched }),
      keepalive: true,
    });
  } catch {
    // Analytics never blocks the product experience.
  }
  const gaEvent: Partial<Record<AnalyticsEventName, string>> = {
    signup_completed: "sign_up", login_completed: "login", checkout_started: "begin_checkout",
    purchase_approved: "purchase", premium_page_viewed: "view_premium",
    free_exam_started: "exam_started", free_exam_completed: "exam_completed",
  };
  const mapped = gaEvent[event];
  if (mapped && typeof window.gtag === "function") window.gtag("event", mapped, enriched);
}

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

export function TrackPageView({ event }: { event: AnalyticsEventName }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void trackEvent(event);
  }, [event]);
  return null;
}
