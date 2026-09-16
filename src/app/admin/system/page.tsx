import { AdminShell } from "@/components/admin/admin-shell";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { getHotmartConfig } from "@/lib/billing/config";

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
    </AdminShell>
  );
}
