"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/components/analytics/track-event";

export function SeoPageTracking({ level, subject, topic }: { level: "hub" | "subject" | "topic"; subject?: string; topic?: string }) {
  const sent = useRef(false);
  useEffect(() => { if (!sent.current) { sent.current = true; void trackEvent("seo_landing_viewed", { level, ...(subject ? { subject } : {}), ...(topic ? { topic } : {}) }); } }, [level, subject, topic]);
  return null;
}
