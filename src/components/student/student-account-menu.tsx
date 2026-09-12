"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { signOut } from "@/app/auth/actions";
import StudentAvatar from "@/components/student/student-avatar";
import type { StudentAccount } from "@/types/student-account";

function accountLabels(account: StudentAccount) {
  const username = account.username?.trim() || null;
  const emailName = account.email.split("@")[0] || "Estudante";
  const name = account.fullName?.trim() || username || emailName;

  return {
    name,
    secondary: username ? `@${username}` : account.email,
  };
}

export default function StudentAccountMenu({
  account,
  loading = false,
  variant = "dark",
  onNavigate,
}: {
  account: StudentAccount | null;
  loading?: boolean;
  variant?: "dark" | "light";
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const dark = variant === "dark";

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (loading) {
    return (
      <div
        aria-label="Carregando dados da conta"
        className={`h-[66px] animate-pulse rounded-xl ${
          dark ? "bg-white/5" : "border border-slate-200 bg-white"
        }`}
      />
    );
  }

  if (!account) {
    return (
      <div
        className={`rounded-xl p-3 ${
          dark ? "bg-white/5" : "border border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-lg">
            👤
          </span>
          <div className="min-w-0">
            <p
              className={`text-sm font-bold ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              Sua conta
            </p>
            <p
              className={`mt-0.5 text-xs leading-4 ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Entre para sincronizar seu progresso
            </p>
          </div>
        </div>
        <Link
          href="/login?next=%2F"
          onClick={onNavigate}
          className={`mt-3 flex min-h-9 items-center justify-center rounded-lg px-3 text-xs font-bold transition ${
            dark
              ? "bg-white text-[#0B2D6B] hover:bg-blue-50"
              : "bg-[#0B2D6B] text-white hover:bg-[#174EA6]"
          }`}
        >
          Entrar
        </Link>
      </div>
    );
  }

  const labels = accountLabels(account);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
          dark
            ? "bg-white/5 hover:bg-white/10"
            : "border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50"
        }`}
      >
        <StudentAvatar name={labels.name} avatarUrl={account.avatarUrl} />
        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-sm font-bold ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {labels.name}
          </span>
          <span
            className={`mt-0.5 block truncate text-xs ${
              dark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {labels.secondary}
          </span>
        </span>
        <span aria-hidden="true" className={dark ? "text-slate-400" : "text-slate-500"}>
          ⋮
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Opções da conta"
          className={`absolute z-50 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${
            dark
              ? "bottom-[calc(100%+8px)] left-0"
              : "left-0 top-[calc(100%+8px)]"
          }`}
        >
          <Link
            href="/perfil"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#0B2D6B]"
          >
            <span aria-hidden="true">👤</span>
            Ver perfil
          </Link>
          <form
            action={signOut}
            onSubmit={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            <button
              type="submit"
              role="menuitem"
              className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <span aria-hidden="true">↪</span>
              Sair
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
