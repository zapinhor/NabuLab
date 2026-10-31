"use client";

import Link from "next/link";
import { useRef } from "react";

import { Icon } from "@/components/ui/icon";

export type MobileHeaderLink = { href: string; label: string; primary?: boolean };

/** Menu "hambúrguer" para cabeçalhos públicos: só aparece abaixo do breakpoint em que os links somem. */
export function MobileHeaderMenu({ links, hideFrom = "md" }: { links: MobileHeaderLink[]; hideFrom?: "md" | "lg" }) {
  const details = useRef<HTMLDetailsElement>(null);
  const close = () => details.current?.removeAttribute("open");
  return (
    <details ref={details} className={`group ${hideFrom === "lg" ? "lg:hidden" : "md:hidden"}`}>
      <summary aria-label="Abrir menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden"><Icon name="menu" size={20} /></span>
        <span className="hidden group-open:inline"><Icon name="fechar" size={20} /></span>
      </summary>
      <nav aria-label="Menu" className="absolute inset-x-4 top-full z-50 mt-2 grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className={link.primary ? "rounded-xl bg-[#0B2D6B] px-4 py-3 text-center text-sm font-bold text-white" : "rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
