"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/components/analytics/track-event";

export function LessonViewTracking({ subject, topic }: { subject: string; topic: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void trackEvent("lesson_viewed", { subject, topic });
  }, [subject, topic]);
  return null;
}
