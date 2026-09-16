import Link from "next/link";
import type { ReactNode } from "react";

const links = [["/admin", "Visão geral"], ["/admin/product", "Produto"], ["/admin/acquisition", "Aquisição"], ["/admin/conversion", "Conversão"], ["/admin/finance", "Financeiro"], ["/admin/subscriptions", "Assinaturas"], ["/admin/system", "Sistema"]] as const;

export function AdminShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 sm:px-6"><div className="mx-auto max-w-7xl">
    <header className="rounded-2xl bg-[#0B2D6B] p-6 text-white"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-blue-200">Admin Control Center</p><h1 className="mt-2 text-3xl font-black">{title}</h1><p className="mt-2 max-w-3xl text-sm text-blue-100">{description}</p></div><Link href="/dashboard" className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">Voltar ao NabuLab</Link></div>
    <nav className="mt-5 flex flex-wrap gap-2">{links.map(([href,label]) => <Link key={href} href={href} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-bold hover:bg-white/10">{label}</Link>)}</nav></header>
    <div className="mt-6">{children}</div>
  </div></main>;
}

export function MetricCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-[#0B2D6B]">{value}</p>{note && <p className="mt-2 text-xs text-slate-500">{note}</p>}</article>;
}
