import { getTrackingConsent } from "@/lib/analytics/tiktok";

/**
 * Meta Pixel (Facebook/Instagram Ads). Só carrega com consentimento de marketing
 * e com NEXT_PUBLIC_META_PIXEL_ID configurado; sem isso, todas as chamadas viram no-op.
 */
type MetaEventName = "CompleteRegistration" | "ViewContent" | "InitiateCheckout" | "Lead";
type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (command: "track" | "trackCustom" | "init", event: string, params?: Params) => void;
  }
}

const pending: Array<{ event: MetaEventName; params?: Params }> = [];
let waiting = false;

export function trackMetaEvent(event: MetaEventName, params?: Params): boolean {
  if (typeof window === "undefined" || !getTrackingConsent().marketing || !process.env.NEXT_PUBLIC_META_PIXEL_ID) return false;
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params);
    return true;
  }
  pending.push({ event, params });
  if (!waiting) {
    waiting = true;
    window.addEventListener("nabulab:meta-ready", () => {
      waiting = false;
      if (!getTrackingConsent().marketing || typeof window.fbq !== "function") { pending.length = 0; return; }
      for (const item of pending.splice(0)) window.fbq("track", item.event, item.params);
    }, { once: true });
  }
  return true;
}

/** PageView das navegações internas (a primeira página já é contada pelo próprio pixel ao iniciar). */
export function trackMetaPageView(): boolean {
  if (typeof window === "undefined" || !getTrackingConsent().marketing || typeof window.fbq !== "function") return false;
  window.fbq("track", "PageView");
  return true;
}
