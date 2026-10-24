"use client";

import { useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";
import { GUEST_RESULT_KEY, type GuestQuizResult } from "@/components/guest-quiz/guest-quiz";

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Devolve o resultado salvo (texto cru, para o snapshot ser estável) ou null se expirou. */
function readResult(): string | null {
  try {
    const raw = localStorage.getItem(GUEST_RESULT_KEY);
    if (!raw) return null;
    const finishedAt = new Date((JSON.parse(raw) as GuestQuizResult).finishedAt).getTime();
    return Date.now() - finishedAt <= MAX_AGE_MS ? raw : null;
  } catch {
    return null;
  }
}

/** Na tela de cadastro, lembra o resultado do teste sem conta (até 24 h depois). */
export function GuestResultNote() {
  const raw = useSyncExternalStore(() => () => {}, readResult, () => null);
  if (!raw) return null;
  let result: GuestQuizResult;
  try { result = JSON.parse(raw) as GuestQuizResult; } catch { return null; }
  if (!result?.total) return null;

  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-[#0B2D6B]">
      <Icon name="trofeu" size={18} className="mt-0.5 text-[#3B82F6]" />
      <p>
        No teste você acertou <b>{result.correct} de {result.total}</b>. Crie sua conta para continuar com 10 questões grátis por dia e guardar seus erros para revisar.
      </p>
    </div>
  );
}
