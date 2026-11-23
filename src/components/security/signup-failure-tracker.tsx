"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/components/analytics/track-event";

/** Agrupa a mensagem de erro que o servidor devolveu ao /cadastro em um motivo curto, sem dados pessoais. */
export function signupFailureReason(message: string) {
  const text = message.toLowerCase();
  if (text.includes("verificação de segurança")) return "captcha";
  if (text.includes("já existe uma conta")) return "email_exists";
  if (text.includes("@username")) return text.includes("em uso") ? "username_taken" : "username_invalid";
  if (text.startsWith("data de nascimento") || text.includes("menos de 12 anos")) return "birth_date";
  if (text.startsWith("e-mail")) return "email_invalid";
  if (text.startsWith("senha")) return "password";
  if (text.includes("muitas tentativas")) return "rate_limited";
  if (text.includes("indisponíveis")) return "signup_disabled";
  return "other";
}

export function SignupFailureTracker({ message }: { message?: string }) {
  const sent = useRef<string | null>(null);
  useEffect(() => {
    if (!message || sent.current === message) return;
    sent.current = message;
    void trackEvent("signup_failed", { reason: signupFailureReason(message) });
  }, [message]);
  return null;
}
