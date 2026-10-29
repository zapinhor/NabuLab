"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/components/analytics/track-event";
import { markLessonRead } from "@/lib/lesson-links";
import { localDateKey } from "@/lib/streak";

export function LessonViewTracking({ subject, topic, href }: { subject: string; topic: string; href: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    markLessonRead(localDateKey(), href);
    void trackEvent("lesson_viewed", { subject, topic });
  }, [subject, topic, href]);
  return null;
}
