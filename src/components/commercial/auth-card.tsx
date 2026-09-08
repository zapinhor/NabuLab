import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  message,
  children,
}: {
  title: string;
  description: string;
  message?: string;
  children: ReactNode;
}) {
  return (
    <main id="conteudo-principal" className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <Link href="/" className="mb-7 flex items-center gap-3">
          <Image src="/branding/icone-app.png" alt="" width={48} height={48} className="rounded-xl" />
          <span className="text-xl font-black text-[#0B2D6B]">NabuLab</span>
        </Link>
        <h1 className="text-2xl font-black text-slate-950">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        {message && (
          <p role="status" className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
            {message}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}

export const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
export const buttonClass =
  "w-full rounded-xl bg-[#0B2D6B] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-50";
