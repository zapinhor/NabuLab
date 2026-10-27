import { isValidUnsubscribeToken } from "@/lib/study-reminders";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/*
 * Desliga o lembrete diário de estudo a partir do link do e-mail.
 * GET só mostra um botão de confirmação (robôs que abrem links não desligam
 * nada); o POST desliga, tanto pelo botão quanto pelo "cancelar inscrição"
 * automático dos provedores de e-mail (List-Unsubscribe-Post).
 */

async function disable(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("u") ?? "";
  const token = url.searchParams.get("t") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(userId) || !isValidUnsubscribeToken(userId, token)) return false;
  const admin = createAdminClient();
  const { error } = await admin
    .from("notification_preferences")
    .upsert({ user_id: userId, email_study_reminders: false, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  return !error;
}

function page(ok: boolean) {
  const title = ok ? "Lembrete desligado" : "Link inválido ou expirado";
  const body = ok
    ? "Você não vai mais receber o lembrete diário de estudo. Se mudar de ideia, ative de novo no painel ou em Notificações."
    : "Não foi possível desligar o lembrete por este link. Você pode desligar em Notificações, dentro do NabuLab.";
  return new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | NabuLab</title></head><body style="margin:0;font-family:Arial,sans-serif;background:#F5F7FB;color:#0f172a"><main style="max-width:520px;margin:48px auto;padding:28px;background:#fff;border-radius:18px;border-top:6px solid #0B2D6B"><h1 style="color:#0B2D6B;font-size:24px">${title}</h1><p style="line-height:1.6;color:#334155">${body}</p><a href="/notificacoes" style="display:inline-block;margin-top:8px;background:#0B2D6B;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">Abrir Notificações</a></main></body></html>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("u") ?? "";
  const token = url.searchParams.get("t") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(userId) || !isValidUnsubscribeToken(userId, token)) return page(false);
  const action = `/api/notifications/lembrete?u=${encodeURIComponent(userId)}&t=${encodeURIComponent(token)}`;
  return new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Desligar lembrete | NabuLab</title></head><body style="margin:0;font-family:Arial,sans-serif;background:#F5F7FB;color:#0f172a"><main style="max-width:520px;margin:48px auto;padding:28px;background:#fff;border-radius:18px;border-top:6px solid #0B2D6B"><h1 style="color:#0B2D6B;font-size:24px">Desligar o lembrete diário?</h1><p style="line-height:1.6;color:#334155">Você deixa de receber o e-mail das 19h nos dias em que ainda não estudou.</p><form method="post" action="${action}"><input type="hidden" name="confirm" value="1"><button style="margin-top:8px;background:#0B2D6B;color:#fff;border:0;font-weight:700;font-size:16px;padding:12px 18px;border-radius:10px;cursor:pointer">Desligar lembrete</button></form></main></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const ok = await disable(request);
  if (form?.get("confirm") === "1") return page(ok);
  return new Response(null, { status: ok ? 200 : 400 });
}
