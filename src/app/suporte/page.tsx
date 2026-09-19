import type { Metadata } from "next";
import Link from "next/link";
import { createSupportTicket } from "@/app/suporte/actions";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { buttonClass, inputClass } from "@/components/commercial/auth-card";
import { createClient } from "@/lib/supabase/server";
import { SUPPORT_CATEGORIES } from "@/lib/support/validation";
import { createPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = createPublicMetadata({
  title: "Suporte",
  description:
    "Encontre ajuda sobre conta, simulados e assinatura ou envie um relato para o suporte do NabuLab.",
  path: "/suporte",
});

const statusMessages = {
  enviado: "Recebemos seu relato. Nossa equipe responderá pelo e-mail da sua conta.",
  limite: "Você enviou vários relatos recentemente. Aguarde uma hora antes de tentar novamente.",
  erro: "Não foi possível registrar o relato. Revise os campos e tente novamente.",
} as const;

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; protocolo?: string }>;
}) {
  const { status, protocolo } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const statusMessage = status && status in statusMessages
    ? statusMessages[status as keyof typeof statusMessages]
    : null;

  return (
    <PublicPageShell eyebrow="Ajuda" title="Suporte NabuLab">
      <section>
        <h2 className="text-lg font-black">Como podemos ajudar?</h2>
        <p>
          Descreva o que aconteceu e informe a página utilizada. Nunca envie sua senha,
          códigos de autenticação, tokens ou dados completos de pagamento.
        </p>
      </section>

      {statusMessage && (
        <section
          role="status"
          className={`rounded-2xl border px-4 py-3 ${status === "enviado" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}
        >
          <p className="font-bold">{statusMessage}</p>
          {status === "enviado" && protocolo && (
            <p className="mt-1 text-xs">Protocolo: {protocolo}</p>
          )}
        </section>
      )}

      {user?.email ? (
        <section>
          <h2 className="text-lg font-black">Relatar um problema</h2>
          <p className="mb-4">Responderemos para <strong>{user.email}</strong>.</p>
          <form action={createSupportTicket} className="space-y-4">
            <label className="block font-semibold text-slate-800">
              Categoria
              <select className={inputClass} name="category" defaultValue="technical" required>
                {Object.entries(SUPPORT_CATEGORIES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="block font-semibold text-slate-800">
              Assunto
              <input className={inputClass} name="subject" minLength={5} maxLength={120} required />
            </label>
            <label className="block font-semibold text-slate-800">
              Página em que ocorreu <span className="font-normal text-slate-500">(opcional)</span>
              <input className={inputClass} name="page_url" maxLength={500} placeholder="Ex.: /simulado/prova" />
            </label>
            <label className="block font-semibold text-slate-800">
              O que aconteceu?
              <textarea className={`${inputClass} min-h-36 resize-y`} name="message" minLength={20} maxLength={4000} required />
            </label>
            <button className={buttonClass} type="submit">Enviar relato</button>
          </form>
        </section>
      ) : (
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-lg font-black text-slate-950">Entre para enviar um relato</h2>
          <p>O formulário usa sua conta para acompanhar o chamado e proteger o suporte contra spam.</p>
          <Link
            className="mt-4 inline-block rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white"
            href="/login?next=%2Fsuporte"
          >
            Entrar no NabuLab
          </Link>
        </section>
      )}

      <section>
        <h2 className="text-lg font-black">Assinatura e pagamento</h2>
        <p>Compras, renovação e cancelamento continuam sendo gerenciados pela Hotmart.</p>
        <a className="mt-3 inline-block font-bold text-blue-700" href="https://consumer.hotmart.com/" target="_blank" rel="noreferrer">
          Abrir Hotmart
        </a>
      </section>
    </PublicPageShell>
  );
}
