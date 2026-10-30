"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendSupportNotification } from "@/lib/support/email";
import { QUESTION_PROBLEMS, validateQuestionReport, validateSupportInput } from "@/lib/support/validation";

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

export type QuestionReportState = { status: "idle" | "sent" | "error"; message?: string };

/** "Encontrou algum problema na questão?": vira um chamado de suporte e chega no mesmo e-mail. */
export async function reportQuestion(_previous: QuestionReportState, formData: FormData): Promise<QuestionReportState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { status: "error", message: "Entre na sua conta para enviar o aviso." };

  const values = Object.fromEntries(["question_id", "problem", "subject", "topic", "subtopic", "details", "page_url"].map((key) => [key, String(formData.get(key) ?? "")]));
  const input = validateQuestionReport(values);
  if (typeof input === "string") return { status: "error", message: input };

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase.from("support_tickets").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", since);
  if ((count ?? 0) >= 10) return { status: "error", message: "Você enviou muitos avisos na última hora. Tente de novo mais tarde." };

  const problem = QUESTION_PROBLEMS[input.problem];
  const subject = `Questão ${input.questionId}: ${problem}`.slice(0, 120);
  const message = [
    `Questão: ${input.questionId}`,
    `Matéria: ${input.subject || "não informada"}`,
    `Tópico: ${input.topic || "não informado"}`,
    `Subtópico: ${input.subtopic || "não informado"}`,
    `Problema: ${problem}`,
    "",
    input.details,
  ].join("\n");

  const { data: ticket, error } = await supabase
    .from("support_tickets")
    .insert({ user_id: user.id, email: user.email, category: "question", subject, message, page_url: input.pageUrl })
    .select("id,created_at")
    .single();
  if (error || !ticket) return { status: "error", message: "Não foi possível enviar agora. Tente de novo em instantes." };

  const notification = await sendSupportNotification({
    ticketId: ticket.id,
    userId: user.id,
    userEmail: user.email,
    category: "question",
    subject,
    message,
    pageUrl: input.pageUrl,
    createdAt: ticket.created_at,
  });
  await createAdminClient()
    .from("support_tickets")
    .update({ notification_status: notification.sent ? "sent" : "failed", notification_sent_at: notification.sent ? new Date().toISOString() : null })
    .eq("id", ticket.id);

  return { status: "sent", message: `Recebemos seu aviso (protocolo ${ticket.id.slice(0, 8).toUpperCase()}). Obrigado por ajudar a melhorar o NabuLab.` };
}
