"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { safeNextPath } from "@/lib/routing";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function authRedirect(path: string, message: string): never {
  redirect(`${path}?mensagem=${encodeURIComponent(message)}`);
}

export async function signUp(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const fullName = value(formData, "full_name");
  const username = value(formData, "username").toLowerCase();
  const next = safeNextPath(value(formData, "next"));
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
      data: { full_name: fullName, username },
      captchaToken: value(formData, "captcha_token") || undefined,
    },
  });
  if (error) authRedirect("/cadastro", "Não foi possível concluir o cadastro. Verifique os dados e tente novamente.");
  if (!data.session) {
    redirect(`/login?next=${encodeURIComponent(next)}&mensagem=${encodeURIComponent("Confira seu e-mail para confirmar o cadastro.")}`);
  }
  await recordAuthenticatedAnalyticsEvent("signup_completed", data.user?.id ?? null);
  redirect(`${next}${next.includes("?") ? "&" : "?"}ga_event=sign_up`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=%2Fredefinir-senha`,
    captchaToken: value(formData, "captcha_token") || undefined,
  });
  redirect(`/login?mensagem=${encodeURIComponent("Se houver uma conta para esse e-mail, enviaremos as instruções de recuperação.")}`);
}

export async function updatePassword(formData: FormData) {
  const password = value(formData, "password");
  const confirmation = value(formData, "password_confirmation");
  if (password.length < 8 || password !== confirmation) authRedirect("/redefinir-senha", "Use uma senha de pelo menos 8 caracteres e confirme-a corretamente.");
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) authRedirect("/redefinir-senha", "Não foi possível redefinir a senha. Solicite um novo link.");
  redirect(`/dashboard`);
}
