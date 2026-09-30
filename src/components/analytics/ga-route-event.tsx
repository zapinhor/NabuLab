"use client";
import { useEffect } from "react";
import { getTrackingConsent, trackTikTokEvent } from "@/lib/analytics/tiktok";

export function GaRouteEvent() {
  useEffect(() => {
    const url = new URL(location.href);
    const event = url.searchParams.get("ga_event");
    if (event !== "sign_up") return;
    let attempts = 0;
    let gaSent = false;
    let tiktokSent = false;
    const timer = window.setInterval(() => {
      attempts += 1;
      const consent = getTrackingConsent();
      if (!gaSent && consent.analytics && typeof window.gtag === "function") {
        window.gtag("event", event);
        gaSent = true;
      }
      if (!tiktokSent && consent.marketing) {
        tiktokSent = trackTikTokEvent("CompleteRegistration");
      }
      const analyticsDone = !consent.analytics || gaSent;
      const marketingDone = !consent.marketing || tiktokSent;
      if ((analyticsDone && marketingDone) || attempts >= 20) {
        url.searchParams.delete("ga_event");
        history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
