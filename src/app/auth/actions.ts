"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { safeNextPath } from "@/lib/routing";
import { requiredCaptchaToken } from "@/lib/security/captcha";
import { isValidUsername } from "@/lib/forms/patterns";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function rawValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function authRedirect(path: string, message: string): never {
  redirect(`${path}?mensagem=${encodeURIComponent(message)}`);
}

export async function signUp(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  const password = rawValue(formData, "password");
  const fullName = value(formData, "full_name");
  const username = value(formData, "username").toLowerCase();
  const next = safeNextPath(value(formData, "next"));
  if (!isValidUsername(username)) {
    authRedirect("/cadastro", "Use um username de 3 a 32 caracteres, começando com letra ou número e usando apenas letras, números, ponto, hífen ou underline.");
  }
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  let captchaToken: string | undefined;
  try { captchaToken = requiredCaptchaToken(formData.get("captcha_token")); }
  catch { authRedirect("/cadastro", "Conclua a verificação de segurança e tente novamente."); }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
      data: { full_name: fullName, username },
      captchaToken,
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
  let captchaToken: string | undefined;
  try { captchaToken = requiredCaptchaToken(formData.get("captcha_token")); }
  catch { authRedirect("/recuperar-senha", "Conclua a verificação de segurança e tente novamente."); }
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=%2Fredefinir-senha`,
    captchaToken,
  });
  if (error?.code === "over_email_send_rate_limit" || error?.status === 429) {
    authRedirect("/recuperar-senha", "O limite temporário de e-mails foi atingido. Aguarde alguns minutos antes de tentar novamente.");
  }
  if (error) {
    authRedirect("/recuperar-senha", "Não foi possível enviar as instruções agora. Tente novamente mais tarde.");
  }
  redirect(`/login?mensagem=${encodeURIComponent("Se houver uma conta para esse e-mail, enviaremos as instruções de recuperação.")}`);
}

export async function updatePassword(formData: FormData) {
  const password = rawValue(formData, "password");
  const confirmation = rawValue(formData, "password_confirmation");
  if (password.length < 8 || password !== confirmation) authRedirect("/redefinir-senha", "Use uma senha de pelo menos 8 caracteres e confirme-a corretamente.");
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) authRedirect("/redefinir-senha", "Não foi possível redefinir a senha. Solicite um novo link.");
  redirect(`/dashboard`);
}
