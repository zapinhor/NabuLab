"use client";

import {
  useEffect,
} from "react";

import {
  ErrorState,
} from "@/components/ui/page-state";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      "Erro capturado pelo App Router:",
      error
    );
  }, [
    error,
  ]);

  return (
    <ErrorState
      fullScreen
      title="Não conseguimos abrir esta página"
      description="Ocorreu um problema inesperado. Você pode tentar carregar a página novamente sem perder seus dados locais."
      details={
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined
      }
      onRetry={reset}
      actionLabel="Voltar ao painel"
      actionHref="/"
    />
  );
}