"use client";

import Script from "next/script";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export type TurnstileState = "idle" | "verifying" | "verified" | "expired" | "error";
export type TurnstileFieldHandle = { reset: () => void };

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => boolean;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  theme: "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  inputName?: string;
  onToken?: (token: string) => void;
  onStateChange?: (state: TurnstileState) => void;
};

export const TurnstileField = forwardRef<TurnstileFieldHandle, Props>(function TurnstileField(
  { inputName, onToken, onStateChange },
  ref,
) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef("");
  const [token, setToken] = useState("");
  const [state, setState] = useState<TurnstileState>(siteKey ? "idle" : "error");

  const update = useCallback((nextState: TurnstileState, nextToken = "") => {
    tokenRef.current = nextToken;
    setToken(nextToken);
    setState(nextState);
    onToken?.(nextToken);
    onStateChange?.(nextState);
  }, [onStateChange, onToken]);

  const reset = useCallback(() => {
    update("idle");
    if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
  }, [update]);

  useImperativeHandle(ref, () => ({ reset }), [reset]);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: (nextToken) => update("verified", nextToken),
      "error-callback": () => { update("error"); return true; },
      "expired-callback": () => update("expired"),
      "timeout-callback": () => update("expired"),
    });
  }, [siteKey, update]);

  useEffect(() => {
    renderWidget();
    const form = containerRef.current?.closest("form");
    if (!form) return;
    const protectSubmit = (event: SubmitEvent) => {
      if (tokenRef.current) { update("verifying", tokenRef.current); return; }
      event.preventDefault();
      setState((current) => current === "expired" ? "expired" : "error");
    };
    form.addEventListener("submit", protectSubmit);
    return () => form.removeEventListener("submit", protectSubmit);
  }, [renderWidget, update]);

  useEffect(() => () => {
    if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
    widgetIdRef.current = null;
  }, []);

  const failed = state === "error" || state === "expired";
  return (
    <div className="space-y-2">
      {inputName ? <input type="hidden" name={inputName} value={token} readOnly /> : null}
      <Script id="cloudflare-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderWidget} onError={() => update("error")} />
      <div ref={containerRef} />
      <p className="text-xs text-slate-500" aria-live="polite">
        {state === "idle" ? "Conclua a verificação de segurança." : null}
        {state === "verifying" ? "Verificando segurança…" : null}
        {state === "verified" ? "Verificação de segurança concluída." : null}
        {failed ? "Não foi possível concluir a verificação de segurança. Tente novamente." : null}
      </p>
      {failed ? <button type="button" onClick={reset} className="text-sm font-bold text-blue-700 underline underline-offset-2">Tentar novamente</button> : null}
    </div>
  );
});
