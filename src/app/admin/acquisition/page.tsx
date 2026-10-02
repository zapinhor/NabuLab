import { AdminShell } from "@/components/admin/admin-shell";
import { AcquisitionReport } from "@/components/admin/acquisition-report";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { getAcquisitionRows, summarizeAcquisition, type AcquisitionFilters } from "@/lib/analytics/acquisition-report";
import { getGa4Acquisition, type Ga4AcquisitionReport } from "@/lib/analytics/ga4-data";

type Search = { days?: string; from?: string; to?: string; source?: string; medium?: string; campaign?: string; content?: string };
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const safe = (value: string | undefined, max = 100) => typeof value === "string" ? value.trim().slice(0, max) : "";
const saoPauloDay = (date: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

export default async function AcquisitionPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requirePlatformAdmin({ aal2: true, returnTo: "/admin/acquisition" });
  const params = await searchParams;
  const days = params.days === "7" ? 7 : 30;
  const today = new Date();
  const beginning = new Date(today.getTime() - (days - 1) * 86_400_000);
  const proposedFrom = safe(params.from, 10);
  const proposedTo = safe(params.to, 10);
  const custom = datePattern.test(proposedFrom) && datePattern.test(proposedTo) && proposedFrom <= proposedTo
    && !Number.isNaN(Date.parse(proposedFrom)) && !Number.isNaN(Date.parse(proposedTo)) && proposedTo <= saoPauloDay(today);
  const filters: AcquisitionFilters = {
    startDate: custom ? proposedFrom : saoPauloDay(beginning),
    endDate: custom ? proposedTo : saoPauloDay(today),
    source: safe(params.source, 40), medium: safe(params.medium, 40), campaign: safe(params.campaign), content: safe(params.content),
  };
  const [gaResult, firstPartyResult] = await Promise.allSettled([
    getGa4Acquisition(days, filters), getAcquisitionRows(filters),
  ]);
  const report: Ga4AcquisitionReport | null = gaResult.status === "fulfilled" && gaResult.value.connected ? gaResult.value : null;
  const rows = firstPartyResult.status === "fulfilled" ? firstPartyResult.value : null;
  const summary = rows ? summarizeAcquisition(rows, report) : null;

  return <AdminShell title="Aquisição" description="Da chegada ao site até o checkout, com campanhas e criativos sem dados pessoais.">
    <form className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4" aria-label="Filtros de aquisição">
      <label className="text-sm">Período<select name="days" defaultValue={String(days)} className="mt-1 block rounded-lg border border-slate-300 p-2"><option value="7">7 dias</option><option value="30">30 dias</option></select></label>
      <label className="text-sm">De<input name="from" type="date" defaultValue={custom ? filters.startDate : ""} className="mt-1 block rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Até<input name="to" type="date" defaultValue={custom ? filters.endDate : ""} className="mt-1 block rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Source<input name="source" defaultValue={filters.source} placeholder="tiktok" className="mt-1 block w-32 rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Medium<input name="medium" defaultValue={filters.medium} placeholder="paid_social" className="mt-1 block w-32 rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Campaign<input name="campaign" defaultValue={filters.campaign} className="mt-1 block w-40 rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Content<input name="content" defaultValue={filters.content} className="mt-1 block w-40 rounded-lg border border-slate-300 p-2"/></label>
      <button type="submit" className="rounded-lg bg-[#0B2D6B] px-5 py-2 font-bold text-white">Aplicar</button>
    </form>
    {gaResult.status === "fulfilled" && !gaResult.value.connected ? <p className="mb-5 rounded-xl border border-slate-200 bg-white p-4 text-sm">Google Analytics não conectado. Configure as credenciais somente no servidor.</p> : null}
    <AcquisitionReport report={report} summary={summary} gaUnavailable={gaResult.status === "rejected"} firstPartyUnavailable={rows === null}/>
  </AdminShell>;
}
