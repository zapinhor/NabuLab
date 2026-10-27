"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeNotificationPath } from "@/lib/notifications";

async function authenticated() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=%2Fnotificacoes");
  return { supabase, user: data.user };
}

export async function openNotification(formData: FormData) {
  const { supabase, user } = await authenticated();
  const id = String(formData.get("notification_id") ?? "");
  const path = safeNotificationPath(String(formData.get("action_path") ?? ""));
  await supabase.from("notifications").update({ read_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", id).eq("recipient_user_id", user.id);
  revalidatePath("/notificacoes");
  redirect(path);
}

export async function markNotificationRead(formData: FormData) {
  const { supabase, user } = await authenticated();
  const id = String(formData.get("notification_id") ?? "");
  await supabase.from("notifications").update({ read_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", id).eq("recipient_user_id", user.id);
  revalidatePath("/notificacoes");
}

export async function markAllNotificationsRead() {
  const { supabase } = await authenticated();
  await supabase.rpc("mark_all_notifications_read");
  revalidatePath("/notificacoes");
}

export async function saveNotificationPreferences(formData: FormData) {
  const { supabase, user } = await authenticated();
  const enabled = (name: string) => formData.get(name) === "on";
  const { error } = await supabase.from("notification_preferences").upsert({
    user_id: user.id,
    in_app_activities: enabled("in_app_activities"), in_app_deadlines: enabled("in_app_deadlines"), in_app_classes: enabled("in_app_classes"),
    email_activities: enabled("email_activities"), email_deadlines: enabled("email_deadlines"), email_classes: enabled("email_classes"),
    email_study_reminders: enabled("email_study_reminders"),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  revalidatePath("/notificacoes");
  redirect(`/notificacoes?mensagem=${encodeURIComponent(error ? "Não foi possível salvar as preferências." : "Preferências salvas.")}`);
}
