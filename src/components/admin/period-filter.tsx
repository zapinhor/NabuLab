import Link from "next/link";
import type { AdminRange } from "@/lib/admin/metrics";

export function PeriodFilter({ range }: { range: AdminRange }) {
  return <div className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
    <nav aria-label="Períodos rápidos" className="flex gap-2">{[7, 30, 90].map((days) => <Link key={days} href={`?days=${days}`} aria-current={range.preset === days ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm font-bold ${range.preset === days ? "bg-[#0B2D6B] text-white" : "border border-slate-200 bg-white"}`}>{days} dias</Link>)}</nav>
    <form className="flex flex-wrap items-end gap-3" aria-label="Período personalizado">
      <label className="text-sm">De<input name="from" type="date" required defaultValue={range.from} className="mt-1 block rounded-lg border border-slate-300 p-2"/></label>
      <label className="text-sm">Até<input name="to" type="date" required defaultValue={range.to} className="mt-1 block rounded-lg border border-slate-300 p-2"/></label>
      <button type="submit" className={`rounded-lg px-4 py-2 text-sm font-bold ${range.preset === "custom" ? "bg-[#0B2D6B] text-white" : "border border-[#0B2D6B] text-[#0B2D6B]"}`}>Aplicar período</button>
    </form>
    <p className="w-full text-xs text-slate-500">Exibindo: <strong>{range.label}</strong> (horário de Brasília).</p>
  </div>;
}
