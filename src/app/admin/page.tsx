import { AdminShell, MetricCard } from "@/components/admin/admin-shell";
import { PeriodFilter } from "@/components/admin/period-filter";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { summarizeAges } from "@/lib/admin/age-bands";
import { analyticsCounts, birthDates, count, parsePeriod } from "@/lib/admin/metrics";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requirePlatformAdmin(); const period = parsePeriod((await searchParams).days);
  const [users, premium, founder, standard, events, births] = await Promise.all([count("profiles"), count("subscriptions", [["plan","premium"],["status","active"]]), count("subscriptions", [["price_tier","founder_477"],["status","active"]]), count("subscriptions", [["price_tier","standard_990"],["status","active"]]), analyticsCounts(period), birthDates().catch(() => null)]);
  const ages = births ? summarizeAges(births, users) : null;
  const maxBand = ages ? Math.max(1, ...ages.bands.map((item) => item.count)) : 1;
  return <AdminShell title="Visão geral" description="Indicadores operacionais do produto, sem expor segredos ou dados acadêmicos individuais."><PeriodFilter current={period} /><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><MetricCard label="Usuários cadastrados" value={users} /><MetricCard label="Usuários Free" value={Math.max(0,users-premium)} /><MetricCard label="Premium ativos" value={premium} /><MetricCard label="Founder ativos" value={founder} /><MetricCard label="Standard ativos" value={standard} /><MetricCard label="Simulados concluídos" value={events.get("free_exam_completed") ?? 0} note={`${period} dias`} /><MetricCard label="Compras" value={events.get("purchase_approved") ?? 0} /><MetricCard label="Cancelamentos" value={events.get("subscription_canceled") ?? 0} /></section>
    <section aria-labelledby="idade-publico" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-end justify-between gap-2"><h2 id="idade-publico" className="text-lg font-black">Idade do público</h2><p className="text-xs text-slate-500">Somente agregado. A data de nascimento é usada apenas para estatística (LGPD).</p></div>
      {ages ? <>
        <p className="mt-2 text-sm text-slate-600">{ages.informed} informaram · {ages.notInformed} sem data{ages.median !== null ? ` · mediana ${ages.median} anos` : ""}</p>
        <ul className="mt-4 space-y-2">{ages.bands.map((item) => <li key={item.band} className="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-3 text-sm"><span className="font-semibold">{item.band}</span><span className="h-3 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-[#3B82F6]" style={{ width: `${(item.count / maxBand) * 100}%` }} /></span><span className="text-right tabular-nums">{item.count}{ages.informed ? ` · ${Math.round((item.count / ages.informed) * 100)}%` : ""}</span></li>)}</ul>
      </> : <p className="mt-2 text-sm text-slate-600">Dados de idade indisponíveis no momento.</p>}
    </section></AdminShell>;
}
