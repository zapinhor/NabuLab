import { AdminShell, MetricCard } from "@/components/admin/admin-shell";
import { PeriodFilter } from "@/components/admin/period-filter";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { analyticsCounts, count, parsePeriod } from "@/lib/admin/metrics";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requirePlatformAdmin(); const period = parsePeriod((await searchParams).days);
  const [users, premium, founder, standard, events] = await Promise.all([count("profiles"), count("subscriptions", [["plan","premium"],["status","active"]]), count("subscriptions", [["price_tier","founder_477"],["status","active"]]), count("subscriptions", [["price_tier","standard_990"],["status","active"]]), analyticsCounts(period)]);
  return <AdminShell title="Visão geral" description="Indicadores operacionais do produto, sem expor segredos ou dados acadêmicos individuais."><PeriodFilter current={period} /><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><MetricCard label="Usuários cadastrados" value={users} /><MetricCard label="Usuários Free" value={Math.max(0,users-premium)} /><MetricCard label="Premium ativos" value={premium} /><MetricCard label="Founder ativos" value={founder} /><MetricCard label="Standard ativos" value={standard} /><MetricCard label="Simulados concluídos" value={events.get("free_exam_completed") ?? 0} note={`${period} dias`} /><MetricCard label="Compras" value={events.get("purchase_approved") ?? 0} /><MetricCard label="Cancelamentos" value={events.get("subscription_canceled") ?? 0} /></section></AdminShell>;
}
