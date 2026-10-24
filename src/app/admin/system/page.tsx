import { AdminShell } from "@/components/admin/admin-shell";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { getHotmartConfig } from "@/lib/billing/config";
import { createAdminClient } from "@/lib/supabase/admin";

function configured(value: string | undefined) {
  return Boolean(value?.trim());
}

export default async function SystemPage() {
  const { role } = await requirePlatformAdmin({ superAdmin: true, aal2: true });
  const hotmart = getHotmartConfig();
  const checks: Array<[string, boolean]> = [
    ["Supabase server", configured(process.env.SUPABASE_SECRET_KEY) || configured(process.env.SUPABASE_SERVICE_ROLE_KEY)],
    ["Hotmart webhook", Boolean(hotmart.hottok && hotmart.productId)],
    ["Turnstile", configured(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)],
    ["GA4 Data API", configured(process.env.GA4_PROPERTY_ID) && configured(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) && configured(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)],
    ["GA4 Measurement Protocol", configured(process.env.GA4_API_SECRET)],
  ];
  const admin = createAdminClient();
  const [job, failedEmails, webhook] = await Promise.all([
    admin.from("system_job_runs").select("started_at,finished_at,status,safe_summary").eq("job_name", "notification_reminders").order("started_at", { ascending: false }).limit(1).maybeSingle(),
    admin.from("notification_email_deliveries").select("id", { count: "exact", head: true }).eq("status", "failed"),
    admin.from("hotmart_webhook_events").select("received_at,processing_status").order("received_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  return (
    <AdminShell title="Sistema" description={`Acesso sensível · ${role}. Valores secretos nunca são exibidos.`}>
      <section className="grid gap-3 sm:grid-cols-2">
        {checks.map(([label, ok]) => (
          <article key={label} className="rounded-xl border bg-white p-4">
            <b>{label}</b>
            <p className={ok ? "text-emerald-700" : "text-amber-700"}>{ok ? "Configurado" : "Não conectado"}</p>
          </article>
        ))}
      </section>
      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border bg-white p-4">
          <b>Scheduler P5</b>
          <p>{job.data ? `${job.data.status} · ${new Date(job.data.started_at).toLocaleString("pt-BR")}` : "Sem execução registrada"}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <b>E-mails com falha</b>
          <p>{failedEmails.error ? "Indisponível" : failedEmails.count ?? 0}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <b>Último webhook Hotmart</b>
          <p>{webhook.data ? `${webhook.data.processing_status} · ${new Date(webhook.data.received_at).toLocaleString("pt-BR")}` : "Sem evento registrado"}</p>
        </article>
      </section>
    </AdminShell>
  );
}
