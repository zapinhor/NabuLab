"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getTrackingConsent, trackTikTokEvent } from "@/lib/analytics/tiktok";

export function GaRouteEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const registrationCheckInFlight = useRef(false);
  const routeKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const url = new URL(routeKey, location.origin);
    const event = url.searchParams.get("ga_event");
    if (event !== "sign_up") return;
    let attempts = 0;
    let gaSent = false;
    const timer = window.setInterval(() => {
      attempts += 1;
      const consent = getTrackingConsent();
      if (!gaSent && consent.analytics && typeof window.gtag === "function") {
        window.gtag("event", event);
        gaSent = true;
      }
      const analyticsDone = !consent.analytics || gaSent;
      if (analyticsDone || attempts >= 20) {
        url.searchParams.delete("ga_event");
        history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [routeKey]);

  useEffect(() => {
    async function consumeCompletedRegistration() {
      if (registrationCheckInFlight.current || !getTrackingConsent().marketing) return;
      registrationCheckInFlight.current = true;
      try {
        const response = await fetch("/api/analytics/registration-completion", {
          method: "POST",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;
        const result = await response.json() as { shouldTrack?: boolean };
        if (result.shouldTrack === true) trackTikTokEvent("CompleteRegistration");
      } finally {
        registrationCheckInFlight.current = false;
      }
    }

    void consumeCompletedRegistration();
    window.addEventListener("nabulab:consent-changed", consumeCompletedRegistration);
    return () => window.removeEventListener("nabulab:consent-changed", consumeCompletedRegistration);
  }, [routeKey]);
  return null;
}
