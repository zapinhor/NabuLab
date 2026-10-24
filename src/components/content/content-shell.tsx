import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function ContentShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[#F5F7FB] text-slate-950">
    <header className="border-b border-slate-200 bg-white"><nav aria-label="Navegação principal" className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <Link href="/" aria-label="NabuLab — início"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={172} height={44} className="h-9 w-auto" priority /></Link>
      <div className="flex items-center gap-4 text-sm font-bold"><Link href="/questoes" className="text-[#0B2D6B]">Questões</Link><Link href="/para-professores" className="hidden text-slate-600 sm:block">Para professores</Link><Link href="/cadastro?next=/simulado/novo" className="rounded-xl bg-[#0B2D6B] px-4 py-2.5 text-white">Começar grátis</Link></div>
    </nav></header>{children}
    <footer className="mt-16 border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap gap-5 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8"><Link href="/">Início</Link><Link href="/questoes">Questões</Link><Link href="/premium">Premium</Link><Link href="/para-professores">Para professores</Link><Link href="/suporte">Suporte</Link></div></footer>
  </main>;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav aria-label="Breadcrumb" className="text-sm text-slate-600"><ol className="flex flex-wrap items-center gap-2">{items.map((item, index) => <li key={item.label} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{item.href ? <Link href={item.href} className="hover:text-blue-800 hover:underline">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

export function JsonLd({ value }: { value: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}
