"use client";

import { useRef, useState } from "react";
import { buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField, type TurnstileFieldHandle, type TurnstileState } from "@/components/security/turnstile-field";

export function LoginForm({ next }: { next: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaState, setCaptchaState] = useState<TurnstileState>("idle");
  const captchaRef = useRef<TurnstileFieldHandle>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captchaToken) { setMessage("Conclua a verificação de segurança antes de entrar."); return; }
    setPending(true); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password"), next, captchaToken }) });
      const result = await response.json() as { error?: string; redirectTo?: string };
      if (!response.ok || !result.redirectTo) { setMessage(result.error ?? "Não foi possível entrar."); captchaRef.current?.reset(); return; }
      window.gtag?.("event", "login");
      location.assign(result.redirectTo);
    } catch { setMessage("Não foi possível entrar agora. Tente novamente."); captchaRef.current?.reset(); }
    finally { setPending(false); }
  }
  return <form onSubmit={submit} className="space-y-4">
    {message && <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">{message}</p>}
    <label className="block text-sm font-semibold text-slate-700">E-mail<input className={inputClass} type="email" name="email" autoComplete="email" required /></label>
    <label className="block text-sm font-semibold text-slate-700">Senha<input className={inputClass} type="password" name="password" autoComplete="current-password" minLength={8} required /></label>
    <TurnstileField ref={captchaRef} onToken={setCaptchaToken} onStateChange={setCaptchaState} />
    <button className={buttonClass} type="submit" disabled={pending || captchaState !== "verified"}>{pending ? "Entrando…" : "Entrar"}</button>
  </form>;
}
