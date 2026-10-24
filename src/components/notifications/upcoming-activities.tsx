"use client";


import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { useEffect, useState } from "react";

type Upcoming={id:string;title:string;className:string;dueAt:string|null;status:"pending"|"in_progress"};
export function UpcomingActivities(){const [items,setItems]=useState<Upcoming[]|null>(null); useEffect(()=>{let active=true; void fetch("/api/notifications/upcoming-activities").then(r=>r.ok?r.json():null).then(d=>{if(active&&d)setItems(d.items)}).catch(()=>setItems([])); return()=>{active=false};},[]); if(items===null)return null; return <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black text-blue-700">Turmas</p><h2 className="mt-1 text-xl font-black">Próximas atividades</h2></div><Link href="/turmas" className="text-sm font-black text-blue-700">Ver turmas<Icon name="avancar" size={16} className="ml-1.5 inline-block shrink-0 align-[-0.2em]" /></Link></div><div className="mt-4 grid gap-3 md:grid-cols-2">{items.map(item=><Link key={item.id} href={`/turmas/atividades/${item.id}`} className="rounded-2xl border border-slate-200 p-4 hover:border-blue-300"><strong>{item.title}</strong><span className="mt-1 block text-sm text-slate-600">{item.className}</span><span className="mt-2 block text-xs font-bold text-blue-700">{item.dueAt?`Prazo ${new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date(item.dueAt))}`:"Sem prazo"}</span></Link>)}{items.length===0&&<p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Tudo em dia. Nenhuma atividade pendente no momento.</p>}</div></section>}
