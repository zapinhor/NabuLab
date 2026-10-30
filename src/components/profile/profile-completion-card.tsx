"use client";

import { useCallback, useEffect, useState } from "react";

import { ProfileIdentityForm } from "@/components/profile/profile-identity-form";
import { Icon } from "@/components/ui/icon";
import { createClient } from "@/lib/supabase/client";

const DISMISS_KEY = "nabulab_profile_prompt_dismissed";

type Missing = { userId: string; username: string | null; birthDate: string | null };

/**
 * Pedido único para contas criadas antes do @username e da data de nascimento.
 * Aparece no painel até a pessoa salvar ou tocar em "Agora não" (lembrado neste aparelho).
 */
export function ProfileCompletionCard() {
  const [missing, setMissing] = useState<Missing | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      try {
        if (localStorage.getItem(`${DISMISS_KEY}:${auth.user.id}`)) return;
      } catch {
        /* navegação privada: mostra mesmo assim */
      }
      const [{ data: profile }, { data: details }] = await Promise.all([
        supabase.from("profiles").select("username").eq("id", auth.user.id).maybeSingle(),
        supabase.from("profile_private").select("birth_date").eq("user_id", auth.user.id).maybeSingle(),
      ]);
      const username = (profile?.username as string | null) ?? null;
      const birthDate = (details?.birth_date as string | null) ?? null;
      if (active && (!username || !birthDate)) setMissing({ userId: auth.user.id, username, birthDate });
    })().catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const dismiss = useCallback(() => {
    if (missing) {
      try {
        localStorage.setItem(`${DISMISS_KEY}:${missing.userId}`, "1");
      } catch {
        /* sem armazenamento: some só nesta visita */
      }
    }
    setMissing(null);
  }, [missing]);

  const saved = useCallback(() => {
    setDone(true);
    setTimeout(dismiss, 1500);
  }, [dismiss]);

  if (!missing) return null;
  return (
    <section aria-labelledby="completar-perfil" className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:mt-7 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="completar-perfil" className="flex items-center gap-2 text-lg font-black text-[#0B2D6B]">
            <Icon name="perfil" size={20} /> Complete seu perfil
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
            {done
              ? "Pronto, obrigado!"
              : !missing.username && !missing.birthDate
                ? "Escolha seu @username, para professores e colegas reconhecerem você, e informe sua data de nascimento, usada só para estatísticas de idade do público."
                : !missing.username
                  ? "Escolha seu @username, para professores e colegas reconhecerem você."
                  : "Informe sua data de nascimento. Ela é usada só para estatísticas de idade do público."}
          </p>
        </div>
        <button type="button" onClick={dismiss} className="rounded-lg px-2 py-1 text-sm font-bold text-slate-500 hover:bg-white">Agora não</button>
      </div>
      {!done && (
        <div className="mt-4">
          <ProfileIdentityForm currentUsername={missing.username} currentBirthDate={missing.birthDate} submitLabel="Salvar perfil" onSaved={saved} />
        </div>
      )}
    </section>
  );
}
