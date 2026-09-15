"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import { trackEvent } from "@/components/analytics/track-event";

export function TrackedLink({ event, properties, ...props }: ComponentProps<typeof Link> & {
  event: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
}) {
  return <Link {...props} onClick={() => void trackEvent(event, properties)} />;
}
