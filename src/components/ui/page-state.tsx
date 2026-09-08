"use client";

import Link from "next/link";

import type {
  ReactNode,
} from "react";

interface BaseStateProps {
  icon?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  fullScreen?: boolean;
  children?: ReactNode;
}

function StateContainer({
  icon,
  eyebrow,
  title,
  description,
  fullScreen = false,
  children,
}: BaseStateProps) {
  return (
    <div
      className={`flex items-center justify-center px-5 ${
        fullScreen
          ? "min-h-screen bg-[#f4f7fb]"
          : "min-h-[360px]"
      }`}
    >
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
        {icon && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
            {icon}
          </div>
        )}

        {eyebrow && (
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}

export function LoadingState({
  title = "Carregando...",
  description = "Estamos preparando as informações.",
  fullScreen = false,
}: {
  title?: string;
  description?: string;
  fullScreen?: boolean;
}) {
  return (
    <StateContainer
      icon="⏳"
      eyebrow="Aguarde"
      title={title}
      description={description}
      fullScreen={fullScreen}
    >
      <div className="mt-7 flex justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    </StateContainer>
  );
}

export function EmptyState({
  icon = "📭",
  eyebrow = "Nada por aqui ainda",
  title,
  description,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
  fullScreen = false,
}: {
  icon?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  fullScreen?: boolean;
}) {
  return (
    <StateContainer
      icon={icon}
      eyebrow={eyebrow}
      title={title}
      description={description}
      fullScreen={fullScreen}
    >
      {(actionLabel ||
        secondaryLabel) && (
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {actionLabel &&
            actionHref && (
              <Link
                href={actionHref}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {actionLabel}
              </Link>
            )}

          {secondaryLabel &&
            secondaryHref && (
              <Link
                href={secondaryHref}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                {secondaryLabel}
              </Link>
            )}
        </div>
      )}
    </StateContainer>
  );
}

export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar esta informação.",
  details,
  onRetry,
  actionLabel = "Voltar ao início",
  actionHref = "/",
  fullScreen = false,
}: {
  title?: string;
  description?: string;
  details?: string;
  onRetry?: () => void;
  actionLabel?: string;
  actionHref?: string;
  fullScreen?: boolean;
}) {
  return (
    <StateContainer
      icon="⚠️"
      eyebrow="Erro"
      title={title}
      description={description}
      fullScreen={fullScreen}
    >
      {details && (
        <div className="mt-5 overflow-x-auto rounded-xl border border-red-100 bg-red-50 p-4 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
            Detalhes
          </p>

          <p className="mt-2 break-words font-mono text-xs leading-5 text-red-700">
            {details}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        )}

        {actionHref &&
          actionLabel && (
            <Link
              href={actionHref}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              {actionLabel}
            </Link>
          )}
      </div>
    </StateContainer>
  );
}