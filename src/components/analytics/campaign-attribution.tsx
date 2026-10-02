"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getTrackingConsent } from "@/lib/analytics/tiktok";
import { isPublicLanding, parseCampaign } from "@/lib/analytics/acquisition";

export function CampaignAttribution() {
  const pathname = usePathname();
  const params = useSearchParams();
  const search = params.toString();

  useEffect(() => {
    if (!isPublicLanding(pathname) || !parseCampaign(new URLSearchParams(search))) return;
    let sent = false;
    function persist() {
      if (sent) return;
      const consent = getTrackingConsent();
      if (!consent.analytics && !consent.marketing) return;
      sent = true;
      void fetch("/api/analytics/attribution", {
        method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" },
        body: JSON.stringify({ search }),
      }).catch(() => { sent = false; });
    }
    persist();
    window.addEventListener("nabulab:consent-changed", persist);
    return () => window.removeEventListener("nabulab:consent-changed", persist);
  }, [pathname, search]);

  useEffect(() => {
    function clearOnRevocation() {
      const consent = getTrackingConsent();
      if (consent.analytics || consent.marketing) return;
      void fetch("/api/analytics/attribution", { method: "DELETE", credentials: "same-origin" });
    }
    window.addEventListener("nabulab:consent-changed", clearOnRevocation);
    return () => window.removeEventListener("nabulab:consent-changed", clearOnRevocation);
  }, []);
  return null;
}
