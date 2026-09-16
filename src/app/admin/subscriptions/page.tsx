import { AdminShell, MetricCard } from "@/components/admin/admin-shell";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { getHotmartFinanceReport, hotmartApiConfigured, logHotmartApiFailure } from "@/lib/billing/hotmart-api";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function SubscriptionsPage({ searchParams }: { searchParams: Promise<{ status?: string; tier?: string }> }) {
  await requirePlatformAdmin({ superAdmin: true, aal2: true, returnTo: "/admin/subscriptions" });
  const filters = await searchParams;
  let query = createAdminClient().from("subscriptions").select("user_id,plan,status,price_tier,provider,provider_subscription_id,current_period_start,current_period_end,cancel_at_period_end,termination_reason").order("current_period_end", { ascending: false }).limit(100);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.tier) query = query.eq("price_tier", filters.tier);
  const { data, error } = await query; if (error) throw error;
  let reconciliation = null;
  if (hotmartApiConfigured()) {
    const to = new Date().toISOString().slice(0, 10); const fromDate = new Date(); fromDate.setUTCDate(fromDate.getUTCDate() - 29);
    try { reconciliation = await getHotmartFinanceReport(fromDate.toISOString().slice(0, 10), to); }
    catch (error) { logHotmartApiFailure(error); }
  }
  return <AdminShell title="Assinaturas" description="Estado persistido pelo webhook com reconciliação somente leitura pela API Hotmart.">
    {reconciliation ? <section className="mb-5 grid gap-4 sm:grid-cols-4"><MetricCard label="Ativas na Hotmart" value={reconciliation.activeSubscriptions}/><MetricCard label="Founder" value={reconciliation.founderActive}/><MetricCard label="Standard" value={reconciliation.standardActive}/><MetricCard label="Canceladas" value={reconciliation.canceledSubscriptions}/></section> : <p className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">API Hotmart indisponível; a lista persistida continua disponível.</p>}
    {reconciliation && <div className="mb-5 overflow-x-auto rounded-2xl border bg-white"><h2 className="p-4 font-black text-slate-900">Reconciliação Hotmart</h2><table className="w-full text-left text-sm"><thead><tr className="border-y bg-slate-50">{["Assinatura", "Cobrança", "Acesso", "Plano", "Preço", "Renovação"].map((heading) => <th key={heading} className="p-3">{heading}</th>)}</tr></thead><tbody>{reconciliation.subscriptions.map((item) => { const local = (data ?? []).find((row) => row.provider_subscription_id === item.subscriberCode); const accessUntil = local?.current_period_end ?? null; const normallyCanceled = item.status === "CANCELLED_BY_CUSTOMER" || item.status === "CANCELLED_BY_SELLER" || item.status === "CANCELLED_BY_ADMIN"; return <tr key={item.subscriberCode} className="border-b"><td className="p-3 font-mono text-xs">{mask(item.subscriberCode)}</td><td className="p-3">{subscriptionStatus(item.status)}</td><td className="p-3">{normallyCanceled && accessUntil ? `Premium até ${date(accessUntil)}` : local?.status === "active" ? "Premium ativo" : "Free"}</td><td className="p-3">{item.tier === "founder_477" ? "Founder" : item.tier === "standard_990" ? "Standard" : "Não mapeado"}</td><td className="p-3">{item.price ? `${new Intl.NumberFormat("pt-BR", { style: "currency", currency: item.price.currency }).format(item.price.value)}/mês` : "Não informado"}</td><td className="p-3">{normallyCanceled ? "Não renova" : item.nextChargeDate ? date(item.nextChargeDate) : "Não informada"}</td></tr>; })}</tbody></table></div>}
    <div className="overflow-x-auto rounded-2xl border bg-white"><table className="w-full text-left text-sm"><thead><tr className="border-b bg-slate-50">{["Usuário", "Plano", "Status", "Provider", "Fim do período", "Cancela no fim"].map((heading) => <th key={heading} className="p-3">{heading}</th>)}</tr></thead><tbody>{(data ?? []).map((row) => <tr key={row.user_id} className="border-b"><td className="p-3 font-mono text-xs">{row.user_id.slice(0, 8)}…</td><td className="p-3">{row.price_tier === "founder_477" ? "Founder" : "Standard"}</td><td className="p-3">{row.status}</td><td className="p-3">{row.provider}</td><td className="p-3">{row.current_period_end ? new Date(row.current_period_end).toLocaleDateString("pt-BR") : "—"}</td><td className="p-3">{row.cancel_at_period_end ? "Sim" : "Não"}</td></tr>)}</tbody></table></div>
  </AdminShell>;
}

function mask(value: string) { return value.length > 8 ? `${value.slice(0, 4)}…${value.slice(-4)}` : `${value.slice(0, 3)}…`; }
function date(value: string | null) { return value ? new Date(value).toLocaleDateString("pt-BR") : "Não informado"; }
function subscriptionStatus(value: string) { if (value === "CANCELLED_BY_CUSTOMER") return "Cancelada pelo cliente"; if (value.startsWith("CANCELLED")) return "Cancelada"; if (value === "ACTIVE") return "Ativa"; return value; }
