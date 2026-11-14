"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMetaPageView } from "@/lib/analytics/meta";
import { trackTikTokPageView } from "@/lib/analytics/tiktok";

export function TikTokRouteEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPage = useRef<string | null>(null);
  const pageKey = `${pathname}?${searchParams.toString()}`;

  const metaFirst = useRef(true);

  useEffect(() => {
    // O pixel da Meta já conta a primeira página ao iniciar; aqui só as navegações internas.
    if (metaFirst.current) metaFirst.current = false;
    else trackMetaPageView();
  }, [pageKey]);

  useEffect(() => {
    function sendPageView() {
      if (lastPage.current === pageKey) return;
      if (trackTikTokPageView()) lastPage.current = pageKey;
    }

    sendPageView();
    window.addEventListener("nabulab:tiktok-ready", sendPageView);
    return () => window.removeEventListener("nabulab:tiktok-ready", sendPageView);
  }, [pageKey]);

  return null;
}
