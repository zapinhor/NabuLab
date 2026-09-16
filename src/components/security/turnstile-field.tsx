"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global { interface Window { onNabuTurnstile?: (token: string) => void } }

export function TurnstileField({ onToken, inputName }: { onToken?: (token: string) => void; inputName?: string }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    window.onNabuTurnstile = (token) => {
      onToken?.(token);
      if (inputName) {
        const input = document.querySelector<HTMLInputElement>(`input[name="${inputName}"]`);
        if (input) input.value = token;
      }
    };
    return () => { delete window.onNabuTurnstile; };
  }, [inputName, onToken]);
  if (!siteKey) return null;
  return <><input type="hidden" name={inputName} /><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile" data-sitekey={siteKey} data-callback="onNabuTurnstile" /></>;
}
