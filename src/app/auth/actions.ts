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

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: value(formData, "email").toLowerCase(),
    password: value(formData, "password"),
  });
  if (error) authRedirect("/login", error.message);

  if (!data.session || !data.user) {
    authRedirect("/login", "Não foi possível estabelecer uma sessão segura.");
  }

  const { data: verifiedUser, error: verificationError } =
    await supabase.auth.getUser();
  if (verificationError || verifiedUser.user?.id !== data.user.id) {
    authRedirect("/login", "Não foi possível validar a sessão criada.");
  }

  await recordAuthenticatedAnalyticsEvent("login_completed", data.user.id);
  redirect(safeNextPath(value(formData, "next")));
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
    },
  });
  if (error) authRedirect("/cadastro", error.message);
  if (!data.session) {
    redirect(`/login?next=${encodeURIComponent(next)}&mensagem=${encodeURIComponent("Confira seu e-mail para confirmar o cadastro.")}`);
  }
  await recordAuthenticatedAnalyticsEvent("signup_completed", data.user?.id ?? null);
  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
