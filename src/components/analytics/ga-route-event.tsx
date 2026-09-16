"use client";
import { useEffect } from "react";

export function GaRouteEvent() {
  useEffect(() => {
    const url = new URL(location.href);
    const event = url.searchParams.get("ga_event");
    if (event !== "sign_up") return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (typeof window.gtag === "function") {
        window.gtag("event", event);
        url.searchParams.delete("ga_event");
        history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
        window.clearInterval(timer);
      } else if (attempts >= 20) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
