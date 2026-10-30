"use client";

import { useActionState, useEffect, useState } from "react";

import { saveProfileIdentity, type ProfileIdentityState } from "@/app/perfil/actions";
import { createClient } from "@/lib/supabase/client";
import { GUARDIAN_CONSENT_AGE, USERNAME_RULES, ageOn, normalizeUsername, validateBirthDate, validateUsername } from "@/lib/forms/signup-validation";

const field = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100";

/**
 * @username e data de nascimento. Usado no Perfil e no aviso único do painel.
 * Um @username antigo fora da regra continua valendo enquanto a pessoa não trocar.
 */
export function ProfileIdentityForm({
  currentUsername,
  currentBirthDate,
  submitLabel = "Salvar",
  onSaved,
}: {
  currentUsername: string | null;
  currentBirthDate: string | null;
  submitLabel?: string;
  onSaved?: () => void;
}) {
  const [state, action, pending] = useActionState<ProfileIdentityState, FormData>(saveProfileIdentity, { status: "idle" });
  const [username, setUsername] = useState(currentUsername ?? "");
  const [birthDate, setBirthDate] = useState(currentBirthDate ?? "");
  const [guardian, setGuardian] = useState(false);
  const [availability, setAvailability] = useState<{ value: string; free: boolean | null }>({ value: "", free: null });

  const normalized = normalizeUsername(username);
  const unchanged = Boolean(currentUsername) && normalized === (currentUsername ?? "").toLowerCase();
  const usernameError = unchanged || !username ? null : validateUsername(username);
  const birthError = birthDate ? validateBirthDate(birthDate) : null;
  const needsGuardian = Boolean(birthDate) && !birthError && ageOn(birthDate) < GUARDIAN_CONSENT_AGE;

  useEffect(() => {
    if (unchanged || !normalized || validateUsername(normalized)) return;
    let active = true;
    const timer = setTimeout(async () => {
      const { data } = await createClient().rpc("username_available", { p_username: normalized });
      if (active) setAvailability({ value: normalized, free: Boolean(data) });
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [normalized, unchanged]);

  useEffect(() => {
    if (state.status === "saved") onSaved?.();
  }, [state, onSaved]);

  const taken = !unchanged && availability.value === normalized && availability.free === false;

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      {unchanged && <input type="hidden" name="keep_username" value="1" />}
      <div className="sm:col-span-2">
        <label htmlFor="profile-username" className="text-sm font-bold text-slate-800">@username</label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 mt-1.5 flex items-center pl-4 font-bold text-slate-400" aria-hidden="true">@</span>
          <input id="profile-username" name="username" value={username} onChange={(event) => setUsername(event.target.value.replace(/^@+/, "").toLowerCase())} maxLength={25} autoCapitalize="none" autoCorrect="off" spellCheck={false} className={`${field} pl-9`} aria-describedby="profile-username-help" aria-invalid={Boolean(usernameError) || taken} />
        </div>
        <p id="profile-username-help" className={`mt-1.5 text-xs leading-5 ${usernameError || taken ? "font-semibold text-red-700" : "text-slate-500"}`} aria-live="polite">
          {taken ? `@${normalized} já está em uso. Escolha outro.` : usernameError ?? (!unchanged && availability.value === normalized && availability.free ? `@${normalized} está livre.` : USERNAME_RULES)}
        </p>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="profile-birth-date" className="text-sm font-bold text-slate-800">Data de nascimento</label>
        <input id="profile-birth-date" name="birth_date" type="date" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} value={birthDate} onChange={(event) => setBirthDate(event.target.value)} className={field} aria-describedby="profile-birth-help" aria-invalid={Boolean(birthError)} />
        <p id="profile-birth-help" className={`mt-1.5 text-xs leading-5 ${birthError ? "font-semibold text-red-700" : "text-slate-500"}`}>
          {birthError ?? "Usada só para estatísticas de idade do nosso público. Não aparece para professores nem colegas."}
        </p>
      </div>
      {needsGuardian && (
        <label className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950 sm:col-span-2">
          <input type="checkbox" name="guardian_consent" value="1" checked={guardian} onChange={(event) => setGuardian(event.target.checked)} className="mt-1 h-4 w-4" />
          <span>Tenho menos de 12 anos e meu pai, minha mãe ou o responsável por mim autorizou o uso desta conta.</span>
        </label>
      )}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" disabled={pending || Boolean(usernameError) || taken || Boolean(birthError) || (needsGuardian && !guardian) || (!username && !birthDate)} className="min-h-11 rounded-xl bg-[#0B2D6B] px-5 py-2.5 text-sm font-black text-white disabled:opacity-60">
          {pending ? "Salvando…" : submitLabel}
        </button>
        <p role="status" className={`text-sm font-bold ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}>{state.message}</p>
      </div>
    </form>
  );
}
