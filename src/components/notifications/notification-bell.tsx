"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AppNotification } from "@/lib/notifications";

export function NotificationBell() {
  const [summary,setSummary]=useState<{unread:number;items:AppNotification[]}|null>(null);
  useEffect(()=>{let active=true; void fetch("/api/notifications/summary").then(r=>r.ok?r.json():null).then(data=>{if(active&&data)setSummary(data)}).catch(()=>null); return()=>{active=false};},[]);
  if(!summary) return <span className="block h-11 w-11" aria-hidden/>;
  return <details className="relative z-40">
    <summary aria-label={`Notificações${summary.unread ? `, ${summary.unread} não lidas` : ""}`} className="relative flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-xl shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4C430]">
      <span aria-hidden>🔔</span>{summary.unread > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[11px] font-black text-white">{summary.unread > 99 ? "99+" : summary.unread}</span>}
    </summary>
    <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
      <div className="flex items-center justify-between gap-3 px-2 py-1"><strong>Notificações</strong><Link href="/notificacoes" className="text-sm font-bold text-blue-700">Ver todas</Link></div>
      <div className="mt-2 space-y-1">{summary.items.map((item)=><Link key={item.id} href="/notificacoes" className={`block rounded-xl p-3 text-sm ${item.read_at ? "bg-white" : "bg-blue-50"}`}><span className="font-black text-slate-900">{item.title}</span><span className="mt-1 block line-clamp-2 text-slate-600">{item.body}</span></Link>)}{summary.items.length===0&&<p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600"><strong className="block text-slate-900">Tudo em dia</strong>Quando houver novidades importantes, elas aparecerão aqui.</p>}</div>
    </div>
  </details>;
}
