"use client";

import { useState } from "react";
import { trackEvent } from "@/components/analytics/track-event";
import { parseTeacherOfferKey, type TeacherOfferKey } from "@/lib/teacher-plans";

export function TeacherCheckoutButton({ offer, label, disabled }: { offer: TeacherOfferKey; label: string; disabled?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  async function start() {
    const selected = parseTeacherOfferKey(offer);
    void trackEvent("teacher_upgrade_clicked", {
      plan: selected.plan,
      cycle: selected.cycle,
    });
    setState("loading");
    const response = await fetch("/api/billing/teacher/prepare", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ offer }) });
    const body = await response.json().catch(() => ({})) as { checkoutUrl?: string };
    if (!response.ok || !body.checkoutUrl) { setState("error"); return; }
    window.location.assign(body.checkoutUrl);
  }
  return <div><button type="button" disabled={disabled || state === "loading"} onClick={start}
    className="w-full rounded-xl bg-[#0B2D6B] px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
    {state === "loading" ? "Abrindo checkout..." : label}</button>
    {state === "error" ? <p className="mt-2 text-sm text-red-700">Oferta indisponível no momento.</p> : null}</div>;
}
