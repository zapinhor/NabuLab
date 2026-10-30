"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { GUARDIAN_CONSENT_AGE, ageOn, normalizeUsername, validateBirthDate, validateUsername } from "@/lib/forms/signup-validation";

export type ProfileIdentityState = { status: "idle" | "saved" | "error"; message?: string; field?: "username" | "birth_date" | "guardian" };

const RPC_ERRORS: Record<string, ProfileIdentityState> = {
  username_taken: { status: "error", field: "username", message: "Esse @username já está em uso. Escolha outro." },
  invalid_username: { status: "error", field: "username", message: "Esse @username não segue as regras. Use só letras minúsculas, números e _, começando com letra." },
  invalid_birth_date: { status: "error", field: "birth_date", message: "Confira a data de nascimento." },
  guardian_consent_required: { status: "error", field: "guardian", message: "Para quem tem menos de 12 anos, é preciso a autorização do pai, da mãe ou do responsável." },
};

/** Salva @username e data de nascimento (cadastro antigo, perfil e aviso do painel). */
export async function saveProfileIdentity(_previous: ProfileIdentityState, formData: FormData): Promise<ProfileIdentityState> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { status: "error", message: "Sua sessão expirou. Entre de novo." };

  const keepUsername = String(formData.get("keep_username") ?? "") === "1";
  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const birthDate = String(formData.get("birth_date") ?? "").trim();
  const guardian = String(formData.get("guardian_consent") ?? "") === "1";

  if (!keepUsername) {
    const usernameError = validateUsername(username);
    if (usernameError) return { status: "error", field: "username", message: usernameError };
  }
  if (birthDate) {
    const birthError = validateBirthDate(birthDate);
    if (birthError) return { status: "error", field: "birth_date", message: birthError };
    if (ageOn(birthDate) < GUARDIAN_CONSENT_AGE && !guardian) return RPC_ERRORS.guardian_consent_required;
  }

  const { error } = await supabase.rpc("update_profile_identity", {
    p_username: keepUsername ? "" : username,
    p_birth_date: birthDate || null,
    p_guardian_consent: guardian,
  });
  if (error) {
    const known = Object.keys(RPC_ERRORS).find((code) => error.message.includes(code));
    return known ? RPC_ERRORS[known] : { status: "error", message: "Não foi possível salvar agora. Tente de novo em instantes." };
  }
  revalidatePath("/perfil");
  return { status: "saved", message: "Dados salvos." };
}
