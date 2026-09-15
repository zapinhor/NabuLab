"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEventName } from "@/lib/analytics/events";

export async function trackEvent(
  event: AnalyticsEventName,
  properties?: Record<string, string | number | boolean>,
) {
  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, path: `${location.pathname}${location.search}`, properties }),
      keepalive: true,
    });
  } catch {
    // Analytics never blocks the product experience.
  }
}

export function TrackPageView({ event }: { event: AnalyticsEventName }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void trackEvent(event);
  }, [event]);
  return null;
}
