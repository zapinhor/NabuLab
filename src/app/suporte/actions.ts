"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendSupportNotification } from "@/lib/support/email";
import { validateSupportInput } from "@/lib/support/validation";

function supportRedirect(status: "enviado" | "erro" | "limite", protocol?: string): never {
  const query = new URLSearchParams({ status });
  if (protocol) query.set("protocolo", protocol);
  redirect(`/suporte?${query}`);
}

export async function createSupportTicket(formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.email) redirect("/login?next=%2Fsuporte");

  const input = validateSupportInput({
    category: String(formData.get("category") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    pageUrl: String(formData.get("page_url") ?? ""),
  });
  if (!input) supportRedirect("erro");

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("support_tickets")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", since);
  if (countError) supportRedirect("erro");
  if ((count ?? 0) >= 5) supportRedirect("limite");

  const { data: ticket, error: insertError } = await supabase
    .from("support_tickets")
    .insert({
      user_id: user.id,
      email: user.email,
      category: input.category,
      subject: input.subject,
      message: input.message,
      page_url: input.pageUrl,
    })
    .select("id,created_at")
    .single();
  if (insertError || !ticket) supportRedirect("erro");

  const notification = await sendSupportNotification({
    ticketId: ticket.id,
    userId: user.id,
    userEmail: user.email,
    category: input.category,
    subject: input.subject,
    message: input.message,
    pageUrl: input.pageUrl,
    createdAt: ticket.created_at,
  });

  await createAdminClient()
    .from("support_tickets")
    .update({
      notification_status: notification.sent ? "sent" : "failed",
      notification_sent_at: notification.sent ? new Date().toISOString() : null,
    })
    .eq("id", ticket.id);

  supportRedirect("enviado", ticket.id.slice(0, 8).toUpperCase());
}
