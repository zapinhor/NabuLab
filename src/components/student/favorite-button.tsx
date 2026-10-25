"use client";

import { useState } from "react";

import { toggleFavorite, useFavorites } from "@/lib/favorites";

/** Estrela para guardar a questão nas favoritas. */
export function FavoriteButton({ questionId, compact = false }: { questionId: string; compact?: boolean }) {
  const { ids } = useFavorites();
  const [error, setError] = useState<string | null>(null);
  const active = ids.has(questionId);

  async function onClick() {
    setError(null);
    try {
      await toggleFavorite(questionId);
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : "Não foi possível salvar.");
    }
  }

  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={active ? "Remover das favoritas" : "Guardar nas favoritas"}
        title={active ? "Remover das favoritas" : "Guardar nas favoritas"}
        className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition ${
          active ? "border-amber-300 bg-amber-50 text-amber-800" : "border-slate-200 bg-white text-slate-500 hover:border-amber-300 hover:text-amber-700"
        }`}
      >
        <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" className="shrink-0" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
          <path d="m12 3.5 2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 16.95 6.75 19.7l1-5.85L3.5 9.7l5.9-.9L12 3.5Z" />
        </svg>
        {!compact && (active ? "Favorita" : "Favoritar")}
      </button>
      {error && <span role="alert" className="mt-1 max-w-56 text-right text-[11px] font-semibold text-rose-700">{error}</span>}
    </span>
  );
}
