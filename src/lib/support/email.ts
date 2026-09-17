import "server-only";

import { SUPPORT_CATEGORIES, type SupportCategory } from "@/lib/support/validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type SupportEmail = {
  ticketId: string;
  userId: string;
  userEmail: string;
  category: SupportCategory;
  subject: string;
  message: string;
  pageUrl: string | null;
  createdAt: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendSupportNotification(ticket: SupportEmail) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { sent: false, reason: "not_configured" as const };

  const to = process.env.SUPPORT_EMAIL_TO?.trim() || "suporte@nabulab.org";
  const from = process.env.SUPPORT_EMAIL_FROM?.trim() || "NabuLab <suporte@nabulab.org>";
  const protocol = ticket.ticketId.slice(0, 8).toUpperCase();
  const category = SUPPORT_CATEGORIES[ticket.category];
  const page = ticket.pageUrl || "Não informada";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "idempotency-key": `support-${ticket.ticketId}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: ticket.userEmail,
        subject: `[NabuLab #${protocol}] ${category}: ${ticket.subject}`,
        text: [
          `Protocolo: ${protocol}`,
          `Categoria: ${category}`,
          `Usuário: ${ticket.userId}`,
          `E-mail: ${ticket.userEmail}`,
          `Página: ${page}`,
          `Data: ${ticket.createdAt}`,
          "",
          ticket.message,
        ].join("\n"),
        html: `<h2>Novo chamado NabuLab #${protocol}</h2>
          <p><strong>Categoria:</strong> ${escapeHtml(category)}</p>
          <p><strong>Usuário:</strong> ${escapeHtml(ticket.userId)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(ticket.userEmail)}</p>
          <p><strong>Página:</strong> ${escapeHtml(page)}</p>
          <p><strong>Data:</strong> ${escapeHtml(ticket.createdAt)}</p>
          <hr><p>${escapeHtml(ticket.message).replaceAll("\n", "<br>")}</p>`,
      }),
      signal: controller.signal,
    });

    return response.ok
      ? { sent: true as const }
      : { sent: false as const, reason: `resend_${response.status}` };
  } catch (error) {
    return {
      sent: false as const,
      reason: error instanceof Error && error.name === "AbortError" ? "timeout" : "network",
    };
  } finally {
    clearTimeout(timeout);
  }
}
