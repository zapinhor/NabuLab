"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TeacherAnalyticsCharts({ distribution, evolution }: {
  distribution: { label: string; count: number }[];
  evolution: { date: string; average: number; count: number }[];
}) {
  return <div className="grid gap-5 lg:grid-cols-2">
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-black">Distribuição de notas</h2>
      <p className="mt-1 text-xs text-slate-500">Escala de 0 a 100%; última tentativa concluída por aluno e atividade.</p>
      <div className="mt-4 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={distribution}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="label" tick={{ fontSize: 11 }}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" name="Resultados" fill="#2563EB" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-black">Evolução ao longo do tempo</h2>
      <p className="mt-1 text-xs text-slate-500">Média diária das últimas tentativas concluídas no período.</p>
      <div className="mt-4 h-64">{evolution.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={evolution}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date" tick={{ fontSize: 11 }}/><YAxis domain={[0,100]}/><Tooltip/><Line type="monotone" dataKey="average" name="Média (%)" stroke="#0B2D6B" strokeWidth={3}/></LineChart></ResponsiveContainer> : <div className="flex h-full items-center justify-center text-sm text-slate-500">Ainda não há respostas suficientes para gerar este relatório.</div>}</div>
    </section>
  </div>;
}
