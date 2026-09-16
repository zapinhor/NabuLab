import { AdminShell, MetricCard } from "@/components/admin/admin-shell";
import { FinanceReport } from "@/components/admin/finance-report";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { count } from "@/lib/admin/metrics";
import { getHotmartFinanceReport, hotmartApiConfigured, logHotmartApiFailure } from "@/lib/billing/hotmart-api";
import { createAdminClient } from "@/lib/supabase/admin";

type Search = { period?: string; from?: string; to?: string };
function dates(search: Search) {
  const period = search.period === "7" || search.period === "90" ? Number(search.period) : 30;
  const today = new Date();
  const to = /^\d{4}-\d{2}-\d{2}$/.test(search.to ?? "") ? search.to! : today.toISOString().slice(0, 10);
  const start = new Date(`${to}T12:00:00Z`); start.setUTCDate(start.getUTCDate() - period + 1);
  const automaticFrom = start.toISOString().slice(0, 10);
  const from = search.period === "custom" && /^\d{4}-\d{2}-\d{2}$/.test(search.from ?? "") ? search.from! : automaticFrom;
  return from <= to ? { from, to } : { from: to, to };
}

export default async function FinancePage({ searchParams }: { searchParams: Promise<Search> }) {
  await requirePlatformAdmin({ superAdmin: true, aal2: true, returnTo: "/admin/finance" });
  const search = await searchParams; const { from, to } = dates(search);
  const productId = process.env.HOTMART_PRODUCT_ID?.trim();
  const transactionQuery = createAdminClient().from("hotmart_webhook_events").select("transaction_id").not("transaction_id", "is", null).limit(1000);
  if (productId) transactionQuery.eq("product_id", productId);
  const [events, refunds, chargebacks, transactionResult] = await Promise.all([
    count("hotmart_webhook_events"),
    count("hotmart_webhook_events", [["event_type", "PURCHASE_REFUNDED"]]),
    count("hotmart_webhook_events", [["event_type", "PURCHASE_CHARGEBACK"]]),
    transactionQuery,
  ]);
  if (transactionResult.error) throw transactionResult.error;
  const knownTransactions = [...new Set((transactionResult.data ?? []).map((row) => row.transaction_id).filter((value): value is string => Boolean(value)))];
  let report = null; let apiUnavailable = !hotmartApiConfigured();
  if (!apiUnavailable) {
    try { report = await getHotmartFinanceReport(from, to, knownTransactions); }
    catch (error) {
      apiUnavailable = true;
      logHotmartApiFailure(error);
    }
  }
  return <AdminShell title="Financeiro" description="Webhook para eventos em tempo real; API oficial Hotmart para reconciliação. Valores não são estimados.">
    <PeriodFilter from={from} to={to}/>
    {report ? <FinanceReport report={report}/> : <div className="space-y-4"><section className="grid gap-4 sm:grid-cols-3"><MetricCard label="Eventos Hotmart" value={events}/><MetricCard label="Reembolsos" value={refunds}/><MetricCard label="Chargebacks" value={chargebacks}/></section>{apiUnavailable && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">API Hotmart indisponível; exibindo fatos persistidos do webhook sem interromper o Admin.</p>}</div>}
  </AdminShell>;
}

function PeriodFilter({ from, to }: { from: string; to: string }) {
  return <form className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border bg-white p-4"><label className="text-sm">Período<select name="period" defaultValue="30" className="ml-2 rounded-lg border p-2"><option value="7">7 dias</option><option value="30">30 dias</option><option value="90">90 dias</option><option value="custom">Personalizado</option></select></label><label className="text-sm">De <input name="from" type="date" defaultValue={from} className="ml-2 rounded-lg border p-2"/></label><label className="text-sm">Até <input name="to" type="date" defaultValue={to} className="ml-2 rounded-lg border p-2"/></label><button className="rounded-lg bg-[#0B2D6B] px-4 py-2 text-sm font-bold text-white">Aplicar</button></form>;
}
