"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import { safeNextPath } from "@/lib/routing";
import { requiredCaptchaToken } from "@/lib/security/captcha";
import { validateEmail, validatePassword } from "@/lib/forms/signup-validation";
import { ATTRIBUTION_COOKIE, readAttribution } from "@/lib/analytics/acquisition";
import { recordAcquisitionMetric } from "@/lib/analytics/acquisition-server";
import {
  REGISTRATION_COMPLETION_COOKIE,
  REGISTRATION_COMPLETION_COOKIE_OPTIONS,
} from "@/lib/analytics/registration-completion";

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
  const next = safeNextPath(value(formData, "next"));
  const signupError = (message: string): never => {
    redirect(`/cadastro?next=${encodeURIComponent(next)}&mensagem=${encodeURIComponent(message)}`);
  };
  const emailError = validateEmail(email);
  if (emailError) signupError(`E-mail: ${emailError}`);
  const passwordError = validatePassword(password);
  if (passwordError) signupError(`Senha: ${passwordError}`);
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  let captchaToken: string | undefined;
  try { captchaToken = requiredCaptchaToken(formData.get("captcha_token")); }
  catch { signupError("Conclua a verificação de segurança e tente novamente."); }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?flow=signup&next=${encodeURIComponent(next)}`,
      captchaToken,
    },
  });
  if (error?.code === "weak_password") signupError("Senha: essa senha foi considerada insegura. Use uma senha mais longa e difícil de adivinhar.");
  if (error?.code === "email_address_invalid" || error?.code === "validation_failed") signupError("E-mail: o endereço informado não foi aceito. Confira se ele está completo e correto.");
  if (error?.code === "user_already_exists") signupError("Já existe uma conta com este e-mail. Entre ou recupere sua senha.");
  if (error?.code === "over_email_send_rate_limit" || error?.status === 429) signupError("Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.");
  if (error?.code === "signup_disabled") signupError("Novos cadastros estão temporariamente indisponíveis.");
  if (error) signupError("Não foi possível concluir o cadastro. Confira os dados e tente novamente.");
  if (!data.session) {
    redirect(`/login?next=${encodeURIComponent(next)}&mensagem=${encodeURIComponent("Confira seu e-mail para confirmar o cadastro.")}`);
  }
  await recordAuthenticatedAnalyticsEvent("signup_completed", data.user?.id ?? null, {
    sourceEventKey: data.user?.id ? `signup:${data.user.id}:completed` : null,
  });
  const cookieStore = await cookies();
  try { await recordAcquisitionMetric("signup_completed", readAttribution(cookieStore.get(ATTRIBUTION_COOKIE)?.value), ""); }
  catch (metricError) { console.error("[acquisition] Cadastro não agregado:", metricError instanceof Error ? metricError.message : "erro desconhecido"); }
  cookieStore.set(REGISTRATION_COMPLETION_COOKIE, "1", REGISTRATION_COMPLETION_COOKIE_OPTIONS);
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
