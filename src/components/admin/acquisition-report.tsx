"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Ga4AcquisitionReport, Ga4SeriesRow } from "@/lib/analytics/ga4-data";

function Ranking({ title, rows }: { title: string; rows: Ga4SeriesRow[] }) {
  const data = rows.slice(0, 10);
  return <article className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-black text-slate-900">{title}</h2><div className="mt-4 h-64">{data.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ left: 16 }}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" allowDecimals={false}/><YAxis dataKey="label" type="category" width={110} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="sessions" name="Sessões" fill="#2563EB" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer> : <Empty/>}</div></article>;
}

function Empty() { return <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">Ainda não há dados neste período.</div>; }

export function AcquisitionReport({ report }: { report: Ga4AcquisitionReport }) {
  const metrics = [["Usuários",report.totals.activeUsers],["Sessões",report.totals.sessions],["Novos usuários",report.totals.newUsers],["Visualizações",report.totals.screenPageViews]] as const;
  return <div className="space-y-5"><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label,value])=><article key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-[#0B2D6B]">{value.toLocaleString("pt-BR")}</p><p className="mt-2 text-xs text-slate-500">Últimos {report.days} dias</p></article>)}</section><article className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-black text-slate-900">Tráfego por dia</h2><div className="mt-4 h-72">{report.daily.length?<ResponsiveContainer width="100%" height="100%"><LineChart data={report.daily}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="label" tick={{fontSize:11}}/><YAxis allowDecimals={false}/><Tooltip/><Line type="monotone" dataKey="sessions" name="Sessões" stroke="#2563EB" strokeWidth={3}/><Line type="monotone" dataKey="activeUsers" name="Usuários" stroke="#F59E0B" strokeWidth={2}/></LineChart></ResponsiveContainer>:<Empty/>}</div></article><section className="grid gap-5 lg:grid-cols-2"><Ranking title="Origem / medium" rows={report.sources}/><Ranking title="Campanhas" rows={report.campaigns}/><Ranking title="Dispositivos" rows={report.devices}/><Ranking title="Landing pages" rows={report.landingPages}/></section></div>;
}
