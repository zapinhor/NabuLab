"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Consent = { analytics: boolean; marketing: boolean };
const STORAGE_KEY = "nabulab_cookie_consent_v1";

export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      try {
        setConsent(saved ? (JSON.parse(saved) as Consent) : null);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setConsent(null);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: Consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    setConsent(value);
  }

  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.replace(/[^A-Za-z0-9_-]/g, "");
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/[^0-9]/g, "");
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.replace(/[^A-Za-z0-9]/g, "");

  return (
    <>
      {consent === null && (
        <aside aria-label="Preferências de cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:flex sm:items-center sm:gap-4">
          <p className="text-sm leading-6 text-slate-600">
            Usamos cookies necessários para o NabuLab funcionar. Analytics e marketing são opcionais.
          </p>
          <div className="mt-3 flex shrink-0 flex-wrap gap-2 sm:mt-0">
            <button onClick={() => choose({ analytics: false, marketing: false })} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">Só necessários</button>
            <button onClick={() => choose({ analytics: true, marketing: false })} className="rounded-xl border border-blue-200 px-3 py-2 text-sm font-bold text-blue-800">Permitir analytics</button>
            <button onClick={() => choose({ analytics: true, marketing: true })} className="rounded-xl bg-[#0B2D6B] px-3 py-2 text-sm font-bold text-white">Aceitar todos</button>
          </div>
        </aside>
      )}
      {consent?.analytics && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="nabulab-ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
        </>
      )}
      {consent?.marketing && meta && <Script id="nabulab-meta" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`}</Script>}
      {consent?.marketing && tiktok && <Script id="nabulab-tiktok" strategy="afterInteractive">{`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n=d.createElement('script');n.async=!0;n.src='https://analytics.tiktok.com/i18n/pixel/events.js?sdkid='+e;var a=d.getElementsByTagName('script')[0];a.parentNode.insertBefore(n,a)};ttq.load('${tiktok}');ttq.page()}(window,document,'ttq');`}</Script>}
    </>
  );
}
