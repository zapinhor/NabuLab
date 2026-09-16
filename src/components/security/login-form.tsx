"use client";

import { useState } from "react";
import { buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField } from "@/components/security/turnstile-field";

export function LoginForm({ next }: { next: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password"), next, captchaToken }) });
      const result = await response.json() as { error?: string; redirectTo?: string };
      if (!response.ok || !result.redirectTo) { setMessage(result.error ?? "Não foi possível entrar."); return; }
      window.gtag?.("event", "login");
      location.assign(result.redirectTo);
    } catch { setMessage("Não foi possível entrar agora. Tente novamente."); }
    finally { setPending(false); }
  }
  return <form onSubmit={submit} className="space-y-4">
    {message && <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">{message}</p>}
    <label className="block text-sm font-semibold text-slate-700">E-mail<input className={inputClass} type="email" name="email" autoComplete="email" required /></label>
    <label className="block text-sm font-semibold text-slate-700">Senha<input className={inputClass} type="password" name="password" autoComplete="current-password" minLength={8} required /></label>
    <TurnstileField onToken={setCaptchaToken} />
    <button className={buttonClass} type="submit" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
  </form>;
}
