"use client";

import { useState } from "react";

export function AccessCopyButtons({ code, url }: { code?: string; url?: string }) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  async function copy(value: string, kind: "code" | "link") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  if (!code && !url) return null;
  return <div className="mt-3 flex flex-wrap gap-2">{code && <button type="button" onClick={() => void copy(code, "code")} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold">{copied === "code" ? "Código copiado" : "Copiar código"}</button>}{url && <button type="button" onClick={() => void copy(url, "link")} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold">{copied === "link" ? "Link copiado" : "Copiar link"}</button>}</div>;
}
