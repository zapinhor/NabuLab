import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateSupportInput } from "../src/lib/support/validation";

const action = readFileSync("src/app/suporte/actions.ts", "utf8");
const email = readFileSync("src/lib/support/email.ts", "utf8");
const migration = readFileSync("supabase/migrations/20260917044930_add_support_tickets.sql", "utf8");

assert.ok(validateSupportInput({ category: "technical", subject: "Falha no simulado", message: "A tela travou ao avançar para a próxima questão.", pageUrl: "/simulado/prova" }));
assert.equal(validateSupportInput({ category: "invalid", subject: "Falha no simulado", message: "A tela travou ao avançar para a próxima questão.", pageUrl: "" }), null);
assert.equal(validateSupportInput({ category: "technical", subject: "Erro", message: "Curto", pageUrl: "" }), null);
assert.match(action, /supabase\.auth\.getUser\(\)/, "envio exige usuário autenticado");
assert.match(action, /\(count \?\? 0\) >= 5/, "envio possui limite por usuário");
assert.match(action, /notification_status: notification\.sent \? "sent" : "failed"/, "resultado do Resend é persistido");
assert.match(email, /process\.env\.RESEND_API_KEY/, "chave do Resend permanece server-only");
assert.doesNotMatch(email, /NEXT_PUBLIC_RESEND/, "chave do Resend não pode ser pública");
assert.match(email, /reply_to: ticket\.userEmail/, "respostas são direcionadas ao usuário sem falsificar remetente");
assert.match(email, /"idempotency-key": `support-\$\{ticket\.ticketId\}`/, "reenvio não duplica a notificação no Resend");
assert.match(migration, /alter table public\.support_tickets enable row level security/);
assert.match(migration, /using \(\(select auth\.uid\(\)\) = user_id\)/);
assert.match(migration, /with check \(\(select auth\.uid\(\)\) = user_id\)/);
assert.match(migration, /revoke all on table public\.support_tickets from public, anon, authenticated/);
console.log("Support: validation, authentication, rate limit, Resend isolation and RLS validated.");
