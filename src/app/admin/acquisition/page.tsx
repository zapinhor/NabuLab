import { AdminShell } from "@/components/admin/admin-shell";
import { AcquisitionReport } from "@/components/admin/acquisition-report";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { getGa4Acquisition } from "@/lib/analytics/ga4-data";

export default async function AcquisitionPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requirePlatformAdmin();
  const params = await searchParams;
  const days = params.days === "7" ? 7 : 30;
  let report: Awaited<ReturnType<typeof getGa4Acquisition>> | null = null;
  let unavailable = false;
  try { report = await getGa4Acquisition(days); } catch { unavailable = true; }

  return <AdminShell title="Aquisição" description="Tráfego, canais, campanhas, dispositivos e páginas de entrada.">
    <nav className="mb-5 flex gap-2" aria-label="Período do Google Analytics"><a href="?days=7" className={`rounded-lg px-4 py-2 text-sm font-bold ${days===7?"bg-[#0B2D6B] text-white":"border bg-white text-slate-700"}`}>7 dias</a><a href="?days=30" className={`rounded-lg px-4 py-2 text-sm font-bold ${days===30?"bg-[#0B2D6B] text-white":"border bg-white text-slate-700"}`}>30 dias</a></nav>
    {unavailable ? <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="text-xl font-black text-amber-950">Google Analytics indisponível</h2><p className="mt-2 text-sm text-amber-900">Não foi possível consultar a Data API agora. O restante do Admin continua funcionando normalmente.</p></section> : null}
    {!unavailable && report?.connected ? <AcquisitionReport report={report}/> : null}
    {!unavailable && report && !report.connected ? <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Google Analytics não conectado</h2><p className="mt-2 text-sm text-slate-600">Configure as credenciais server-side para carregar os relatórios.</p></section> : null}
  </AdminShell>;
}
