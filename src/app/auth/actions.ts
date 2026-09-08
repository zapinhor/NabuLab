"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function authRedirect(path: string, message: string): never {
  redirect(`${path}?mensagem=${encodeURIComponent(message)}`);
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: value(formData, "email").toLowerCase(),
    password: value(formData, "password"),
  });
  if (error) authRedirect("/entrar", error.message);
  redirect("/comercial");
}

export async function signUp(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const fullName = value(formData, "full_name");
  const username = value(formData, "username").toLowerCase();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
      data: { full_name: fullName, username },
    },
  });
  if (error) authRedirect("/cadastro", error.message);
  if (!data.session) {
    authRedirect("/entrar", "Confira seu e-mail para confirmar o cadastro.");
  }
  redirect("/comercial");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/entrar");
}
