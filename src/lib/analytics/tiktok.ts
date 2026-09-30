export const TIKTOK_PIXEL_ID = "DAUKKVRC77U77GG16V40";
export const TIKTOK_CONSENT_STORAGE_KEY = "nabulab_cookie_consent_v1";

type TrackingConsent = { analytics: boolean; marketing: boolean };
type TikTokEventName = "CompleteRegistration" | "ViewContent" | "InitiateCheckout";
type PendingEvent = { event: TikTokEventName; properties?: Record<string, string | number | boolean> };

const pendingEvents: PendingEvent[] = [];
let readyListenerInstalled = false;

declare global {
  interface Window {
    ttq?: {
      page: () => void;
      track: (event: TikTokEventName, properties?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function getTrackingConsent(): TrackingConsent {
  if (typeof window === "undefined") return { analytics: false, marketing: false };
  try {
    const value = JSON.parse(localStorage.getItem(TIKTOK_CONSENT_STORAGE_KEY) ?? "null") as Partial<TrackingConsent> | null;
    return { analytics: value?.analytics === true, marketing: value?.marketing === true };
  } catch {
    return { analytics: false, marketing: false };
  }
}

export function trackTikTokPageView(): boolean {
  if (!getTrackingConsent().marketing || typeof window.ttq?.page !== "function") return false;
  window.ttq.page();
  return true;
}

export function trackTikTokEvent(event: TikTokEventName, properties?: Record<string, string | number | boolean>): boolean {
  if (!getTrackingConsent().marketing) return false;
  if (typeof window.ttq?.track === "function") {
    window.ttq.track(event, properties);
    return true;
  }
  pendingEvents.push({ event, properties });
  if (!readyListenerInstalled) {
    readyListenerInstalled = true;
    window.addEventListener("nabulab:tiktok-ready", () => {
      readyListenerInstalled = false;
      if (!getTrackingConsent().marketing || typeof window.ttq?.track !== "function") {
        pendingEvents.length = 0;
        return;
      }
      for (const item of pendingEvents.splice(0)) window.ttq.track(item.event, item.properties);
    }, { once: true });
  }
  return true;
}
