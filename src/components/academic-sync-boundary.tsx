"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { syncAcademicData } from "@/lib/academic-sync";

const PUBLIC_PATHS = ["/login", "/entrar", "/cadastro", "/auth"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function AcademicSyncBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isPublicPath(pathname)) return children;

  return <ProtectedAcademicSync>{children}</ProtectedAcademicSync>;
}

function ProtectedAcademicSync({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    void syncAcademicData()
      .then(() => {
        if (active) {
          setState("ready");
        }
      })
      .catch((error) => {
        console.error("Não foi possível sincronizar os dados acadêmicos:", error);
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, [retry]);

  if (state === "ready") return children;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <section className="max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-blue-950/5">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
          NabuLab Cloud
        </p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">
          {state === "loading" ? "Sincronizando seus estudos" : "Sincronização interrompida"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {state === "loading"
            ? "Estamos carregando seu histórico, respostas, desempenho e metas desta conta."
            : "Seus dados locais foram preservados. Verifique a conexão e tente novamente."}
        </p>
        {state === "error" && (
          <button
            type="button"
            className="mt-5 rounded-xl bg-[#0B2D6B] px-5 py-3 text-sm font-bold text-white"
            onClick={() => {
              setState("loading");
              setRetry((value) => value + 1);
            }}
          >
            Tentar novamente
          </button>
        )}
      </section>
    </main>
  );
}
