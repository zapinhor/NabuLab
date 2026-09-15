import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function PublicPageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 sm:px-6 sm:py-10"><div className="mx-auto max-w-3xl"><header className="flex items-center justify-between gap-4"><Link href="/"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={164} height={42} className="h-9 w-auto" /></Link><Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0B2D6B]">Voltar ao início</Link></header><article className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">{eyebrow}</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1><div className="mt-7 space-y-6 text-sm leading-7 text-slate-700">{children}</div></article><p className="mt-5 text-center text-xs text-slate-500">Conteúdo informativo sujeito a revisão jurídica antes de escala comercial relevante.</p></div></main>;
}
