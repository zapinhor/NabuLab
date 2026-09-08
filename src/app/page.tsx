"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from "react";

import { getTotalQuestions } from "@/data/questions";
import { subjects } from "@/data/subjects";

import {
  getDashboardData,
  type DashboardData,
  type DashboardSubjectStats,
} from "@/lib/dashboard-queries";

import {
  getReviewSummary,
  type ReviewSummary,
} from "@/lib/review-queries";

import {
  getStudyConsistency,
  type StudyConsistency,
} from "@/lib/study-consistency";

import {
  calculateStudyGoalsProgress,
  loadStudyGoals,
} from "@/lib/study-goals";

import { getExamModeInfo } from "@/lib/exam-mode";

import {
  getSubjectEvolutionSummary,
  type SubjectEvolutionSummary,
} from "@/lib/subject-evolution";

import ScoreEvolutionChart from "@/components/dashboard/score-evolution-chart";
import SubjectTrendSummary from "@/components/dashboard/subject-trend-summary";

import {
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import type { StudyGoals } from "@/types/study-goals";
import type { StoredExam } from "@/types/storage";
import type { SubjectId } from "@/types/question";

/*
 * =========================================================
 * FORMATAÇÃO
 * =========================================================
 */

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getDifficultyLabel(
  difficulty: StoredExam["difficulty"]
) {
  switch (difficulty) {
    case "iniciante":
      return "Iniciante";

    case "medio":
      return "Intermediário";

    case "avancado":
      return "Avançado";

    case "misto":
      return "Misto";

    default:
      return difficulty;
  }
}

function getSubjectName(id: SubjectId) {
  return (
    subjects.find(
      (subject) =>
        subject.id === id
    )?.name ?? id
  );
}

function getSubjectDescription(
  subject: DashboardSubjectStats
) {
  if (
    subject.totalQuestions ===
    0
  ) {
    return "Nenhuma questão realizada ainda.";
  }

  if (
    subject.percentage >=
    90
  ) {
    return "Excelente domínio deste conteúdo.";
  }

  if (
    subject.percentage >=
    75
  ) {
    return "Seu desempenho está muito bom.";
  }

  if (
    subject.percentage >=
    60
  ) {
    return "Boa base, com espaço para evolução.";
  }

  if (
    subject.percentage >=
    40
  ) {
    return "Alguns conteúdos merecem reforço.";
  }

  return "Priorize esta matéria nas próximas revisões.";
}

/*
 * =========================================================
 * BARRA DE META
 * =========================================================
 */

function GoalBar({
  label,
  icon,
  current,
  target,
  percentage,
}: {
  label: string;
  icon: string;
  current: number;
  target: number;
  percentage: number;
}) {
  const completed =
    current >= target;

  const visualPercentage =
    Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    );

  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
          <span
            className="shrink-0"
            aria-hidden="true"
          >
            {icon}
          </span>

          <span className="truncate">
            {label}
          </span>
        </span>

        <span
          className={`shrink-0 text-xs font-bold ${
            completed
              ? "text-emerald-600"
              : "text-blue-600"
          }`}
        >
          {current} / {target}
        </span>
      </div>

      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={`Progresso da meta ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={
          visualPercentage
        }
        aria-valuetext={`${current} de ${target}, ${percentage}%`}
      >
        <div
          className={`h-full rounded-full transition-all ${
            completed
              ? "bg-emerald-500"
              : "bg-[#3B82F6]"
          }`}
          style={{
            width: `${visualPercentage}%`,
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px]">
        <span className="text-slate-400">
          {percentage}%
        </span>

        {completed && (
          <span className="font-bold text-emerald-600">
            ✓ Concluída
          </span>
        )}
      </div>
    </div>
  );
}

/*
 * =========================================================
 * ITEM DO MENU MOBILE
 * =========================================================
 */

function MobileNavLink({
  href,
  icon,
  label,
  badge,
  onNavigate,
  linkRef,
}: {
  href: string;
  icon: string;
  label: string;
  badge?: number | string;
  onNavigate: () => void;
  linkRef?: Ref<HTMLAnchorElement>;
}) {
  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onNavigate}
      className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className="shrink-0"
          aria-hidden="true"
        >
          {icon}
        </span>

        <span className="truncate">
          {label}
        </span>
      </span>

      {badge !== undefined && (
        <span
          className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white"
          aria-label={`${badge}`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function HomePage() {
  const totalBankQuestions =
    getTotalQuestions();

  const [
    dashboard,
    setDashboard,
  ] =
    useState<DashboardData | null>(
      null
    );

  const [
    review,
    setReview,
  ] =
    useState<ReviewSummary | null>(
      null
    );

  const [
    consistency,
    setConsistency,
  ] =
    useState<StudyConsistency | null>(
      null
    );

  const [
    goals,
    setGoals,
  ] =
    useState<StudyGoals | null>(
      null
    );

  const [
    evolution,
    setEvolution,
  ] =
    useState<SubjectEvolutionSummary | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] =
    useState(false);

  /*
   * =========================================================
   * REFERÊNCIAS DE ACESSIBILIDADE
   * =========================================================
   */

  const mobileMenuButtonRef =
    useRef<HTMLButtonElement | null>(
      null
    );

  const mobileMenuFirstLinkRef =
    useRef<HTMLAnchorElement | null>(
      null
    );

  /*
   * =========================================================
   * CARREGAR HOME
   * =========================================================
   */

  const loadHome =
    useCallback(
      async () => {
        setLoading(true);
        setError(null);

        try {
          const [
            dashboardData,
            reviewData,
            consistencyData,
            goalsData,
            evolutionData,
          ] =
            await Promise.all([
              getDashboardData(),

              getReviewSummary(),

              getStudyConsistency(),

              Promise.resolve(
                loadStudyGoals()
              ),

              getSubjectEvolutionSummary(),
            ]);

          setDashboard(
            dashboardData
          );

          setReview(
            reviewData
          );

          setConsistency(
            consistencyData
          );

          setGoals(
            goalsData
          );

          setEvolution(
            evolutionData
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar painel:",
            loadError
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar o painel."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  useEffect(() => {
    void loadHome();
  }, [
    loadHome,
  ]);

  /*
   * =========================================================
   * CONTROLE DO MENU MOBILE POR TECLADO
   * =========================================================
   */

  useEffect(() => {
    if (
      !mobileMenuOpen
    ) {
      return;
    }

    const focusTimer =
      window.setTimeout(
        () => {
          mobileMenuFirstLinkRef
            .current
            ?.focus();
        },
        0
      );

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      event.preventDefault();

      setMobileMenuOpen(
        false
      );

      window.setTimeout(
        () => {
          mobileMenuButtonRef
            .current
            ?.focus();
        },
        0
      );
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.clearTimeout(
        focusTimer
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    mobileMenuOpen,
  ]);

  /*
   * =========================================================
   * FECHAR MENU AO ENTRAR NO LAYOUT DESKTOP
   * =========================================================
   */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(min-width: 1024px)"
      );

    function handleBreakpointChange(
      event:
        MediaQueryListEvent
    ) {
      if (
        event.matches
      ) {
        setMobileMenuOpen(
          false
        );
      }
    }

    if (
      mediaQuery.matches
    ) {
      setMobileMenuOpen(
        false
      );
    }

    mediaQuery.addEventListener(
      "change",
      handleBreakpointChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleBreakpointChange
      );
    };
  }, []);

  /*
   * =========================================================
   * FOCO EM SEÇÕES INTERNAS
   * =========================================================
   */

  const focusSection =
    useCallback(
      (
        sectionId:
          string
      ) => {
        window.setTimeout(
          () => {
            const element =
              document.getElementById(
                sectionId
              );

            if (
              element instanceof
              HTMLElement
            ) {
              element.focus({
                preventScroll:
                  true,
              });
            }
          },
          0
        );
      },
      []
    );

  const navigateToMobileSection =
    useCallback(
      (
        sectionId:
          string
      ) => {
        setMobileMenuOpen(
          false
        );

        focusSection(
          sectionId
        );
      },
      [
        focusSection,
      ]
    );

  const closeMobileMenu =
    useCallback(
      () => {
        setMobileMenuOpen(
          false
        );
      },
      []
    );

  /*
   * =========================================================
   * METAS
   * =========================================================
   */

  const goalsProgress =
    useMemo(() => {
      if (
        !consistency ||
        !goals
      ) {
        return null;
      }

      return calculateStudyGoalsProgress(
        consistency,
        goals
      );
    }, [
      consistency,
      goals,
    ]);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (
    loading
  ) {
    return (
      <LoadingState
        fullScreen
        title="Carregando seu painel..."
        description="Analisando histórico, metas, desempenho e evolução."
      />
    );
  }

  /*
   * =========================================================
   * ERRO
   * =========================================================
   */

  if (
    error
  ) {
    return (
      <ErrorState
        fullScreen
        title="Não foi possível carregar o painel"
        description="Seus dados locais continuam armazenados. Tente carregar novamente."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadHome();
        }}
        actionLabel="Criar simulado"
        actionHref="/simulado/novo"
      />
    );
  }

  /*
   * =========================================================
   * DADOS INCOMPLETOS
   * =========================================================
   */

  if (
    !dashboard ||
    !review ||
    !consistency ||
    !goals ||
    !goalsProgress ||
    !evolution
  ) {
    return (
      <ErrorState
        fullScreen
        title="Dados incompletos"
        description="O painel terminou de carregar, mas algumas informações necessárias não foram encontradas."
        onRetry={() => {
          void loadHome();
        }}
        actionLabel="Criar simulado"
        actionHref="/simulado/novo"
      />
    );
  }

  const hasReviewQuestions =
    review.totalQuestionsWithErrors >
    0;

  /*
   * =========================================================
   * INTERFACE
   * =========================================================
   */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          SIDEBAR DESKTOP
      ====================================================== */}

      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#071A3D] text-white lg:flex"
        aria-label="Painel lateral"
      >
        {/* ===================================================
            MARCA NABULAB
        ==================================================== */}

        <div className="border-b border-white/10 px-5 py-5">
          <Link
            href="/"
            aria-label="NabuLab — painel inicial"
            className="flex items-center gap-3 rounded-xl"
          >
            <Image
              src="/branding/icone-app.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0 rounded-xl object-contain"
            />

            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-white">
                NabuLab
              </p>

              <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
                Plataforma educacional
              </p>
            </div>
          </Link>
        </div>

        <nav
          className="flex-1 space-y-1 overflow-y-auto px-4 py-6"
          aria-label="Navegação principal"
        >
          <a
            href="#inicio"
            onClick={() =>
              focusSection(
                "inicio"
              )
            }
            className="flex items-center gap-3 rounded-xl border border-[#3B82F6]/30 bg-[#0B2D6B] px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <span aria-hidden="true">
              🏠
            </span>

            Início
          </a>

          <a
            href="#materias"
            onClick={() =>
              focusSection(
                "materias"
              )
            }
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              📚
            </span>

            Matérias
          </a>

          <a
            href="#desempenho"
            onClick={() =>
              focusSection(
                "desempenho"
              )
            }
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              📊
            </span>

            Desempenho
          </a>

          <Link
            href="/evolucao"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              📈
            </span>

            Evolução
          </Link>

          <Link
            href="/analise"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              🧠
            </span>

            Análise
          </Link>

          <Link
            href="/dominio"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              🧭
            </span>

            Domínio
          </Link>

          <Link
            href="/metas"
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true">
                🔥
              </span>

              Metas
            </span>

            {goalsProgress.completedGoals >
              0 && (
              <span
                className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white"
                aria-label={`${goalsProgress.completedGoals} de ${goalsProgress.totalGoals} metas concluídas`}
              >
                {
                  goalsProgress.completedGoals
                }
                /
                {
                  goalsProgress.totalGoals
                }
              </span>
            )}
          </Link>

          <Link
            href="/recomendado"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              ✨
            </span>

            Recomendado
          </Link>

          <Link
            href="/revisao"
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true">
                🎯
              </span>

              Treinar erros
            </span>

            {review.highPriority >
              0 && (
              <span
                className="flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
                aria-label={`${review.highPriority} questões de alta prioridade`}
              >
                {
                  review.highPriority
                }
              </span>
            )}
          </Link>

          <Link
            href="/historico"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              🕘
            </span>

            Histórico
          </Link>

          <Link
            href="/auditoria"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              ✅
            </span>

            Auditoria
          </Link>

          <Link
            href="/simulado/novo"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">
              ✏️
            </span>

            Novo simulado
          </Link>
          <Link
            href="/comercial"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span aria-hidden="true">🏫</span>
            Gestão institucional
          </Link>
        </nav>

        <div className="border-t border-white/10 px-5 py-5">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">
                  Sequência atual
                </p>

                <p className="mt-1 text-xl font-bold">
                  <span aria-hidden="true">
                    🔥
                  </span>{" "}
                  {
                    consistency.currentStreak
                  }{" "}
                  {consistency.currentStreak ===
                  1
                    ? "dia"
                    : "dias"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">
                  Banco
                </p>

                <p className="font-bold">
                  {
                    totalBankQuestions
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          ÁREA PRINCIPAL
      ====================================================== */}

      <div className="lg:pl-64">
        {/* ===================================================
            HEADER MOBILE / TABLET
        ==================================================== */}

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8">
            <Link
              href="/"
              aria-label="NabuLab — painel inicial"
              className="flex min-w-0 items-center gap-3"
            >
              <Image
                src="/branding/icone-app.png"
                alt=""
                width={42}
                height={42}
                priority
                className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-11 sm:w-11"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
                  NabuLab
                </p>

                <p className="hidden text-xs text-slate-500 sm:block">
                  Plataforma educacional
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/simulado/novo"
                className="hidden min-h-10 items-center rounded-xl bg-[#0B2D6B] px-3 text-xs font-bold text-white transition hover:bg-[#174EA6] sm:flex"
              >
                + Simulado
              </Link>

              <Link
                href="/metas"
                className="flex min-h-10 items-center rounded-xl border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-orange-700"
                aria-label={`Sequência atual: ${consistency.currentStreak} ${
                  consistency.currentStreak ===
                  1
                    ? "dia"
                    : "dias"
                }. Abrir metas.`}
              >
                <span aria-hidden="true">
                  🔥
                </span>{" "}
                {
                  consistency.currentStreak
                }
              </Link>

              <button
                ref={
                  mobileMenuButtonRef
                }
                type="button"
                aria-label={
                  mobileMenuOpen
                    ? "Fechar navegação principal"
                    : "Abrir navegação principal"
                }
                aria-expanded={
                  mobileMenuOpen
                }
                aria-controls="mobile-navigation-panel"
                onClick={() =>
                  setMobileMenuOpen(
                    (current) =>
                      !current
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <span aria-hidden="true">
                  {mobileMenuOpen
                    ? "✕"
                    : "☰"}
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              MENU MOBILE
          ================================================== */}

          {mobileMenuOpen && (
            <div
              id="mobile-navigation-panel"
              className="max-h-[calc(100vh-65px)] overflow-y-auto border-t border-slate-100 bg-[#F5F7FB] px-4 py-4 shadow-lg sm:px-5 md:px-8"
            >
              <nav
                aria-label="Navegação principal"
                className="mx-auto grid max-w-3xl gap-2 sm:grid-cols-2"
              >
                <MobileNavLink
                  linkRef={
                    mobileMenuFirstLinkRef
                  }
                  href="#inicio"
                  icon="🏠"
                  label="Início"
                  onNavigate={() =>
                    navigateToMobileSection(
                      "inicio"
                    )
                  }
                />

                <MobileNavLink
                  href="#materias"
                  icon="📚"
                  label="Matérias"
                  onNavigate={() =>
                    navigateToMobileSection(
                      "materias"
                    )
                  }
                />

                <MobileNavLink
                  href="#desempenho"
                  icon="📊"
                  label="Desempenho"
                  onNavigate={() =>
                    navigateToMobileSection(
                      "desempenho"
                    )
                  }
                />

                <MobileNavLink
                  href="/evolucao"
                  icon="📈"
                  label="Evolução"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/analise"
                  icon="🧠"
                  label="Análise"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/dominio"
                  icon="🧭"
                  label="Domínio"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/metas"
                  icon="🔥"
                  label="Metas"
                  badge={
                    goalsProgress.completedGoals >
                    0
                      ? `${goalsProgress.completedGoals}/${goalsProgress.totalGoals}`
                      : undefined
                  }
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/recomendado"
                  icon="✨"
                  label="Recomendado"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/revisao"
                  icon="🎯"
                  label="Treinar erros"
                  badge={
                    review.highPriority >
                    0
                      ? review.highPriority
                      : undefined
                  }
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/historico"
                  icon="🕘"
                  label="Histórico"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/auditoria"
                  icon="✅"
                  label="Auditoria"
                  onNavigate={
                    closeMobileMenu
                  }
                />

                <MobileNavLink
                  href="/simulado/novo"
                  icon="✏️"
                  label="Novo simulado"
                  onNavigate={
                    closeMobileMenu
                  }
                />
                <MobileNavLink
                  href="/comercial"
                  icon="🏫"
                  label="Gestão institucional"
                  onNavigate={closeMobileMenu}
                />
              </nav>

              <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-2">
                <div className="rounded-xl bg-orange-50 p-3 text-center">
                  <p className="text-[10px] text-orange-500">
                    Sequência
                  </p>

                  <p className="mt-1 text-sm font-bold text-orange-700">
                    <span aria-hidden="true">
                      🔥
                    </span>{" "}
                    {
                      consistency.currentStreak
                    }{" "}
                    {consistency.currentStreak ===
                    1
                      ? "dia"
                      : "dias"}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-center">
                  <p className="text-[10px] text-blue-500">
                    Banco
                  </p>

                  <p className="mt-1 text-sm font-bold text-blue-700">
                    {
                      totalBankQuestions
                    }{" "}
                    questões
                  </p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ===================================================
            MAIN
        ==================================================== */}

        <main
          id="inicio"
          tabIndex={-1}
          className="mx-auto max-w-[1500px] scroll-mt-24 px-4 py-5 focus:outline-none sm:px-5 sm:py-7 md:px-8 md:py-9"
        >
          {/* =================================================
              HERO
          ================================================== */}

          <section className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B2D6B] via-[#174EA6] to-[#3B82F6] p-5 text-white shadow-lg shadow-blue-200/60 sm:rounded-[28px] sm:p-7 md:p-10">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0 max-w-3xl">
                <p className="text-xs font-bold text-[#F4C430] sm:text-sm">
                    NabuLab • Seu espaço de evolução
                </p>

                <h1 className="mt-2 break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  Cada tentativa é um passo. Cada correção, uma evolução.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50">
                  Pratique, acompanhe sua evolução e transforme cada erro em uma nova oportunidade de aprender.
                </p>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                  <Link
                    href="/simulado/novo"
                    className="min-h-12 rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0B2D6B] transition hover:bg-[#F5F7FB]"
                  >
                    Criar novo simulado
                  </Link>

                  <Link
                    href="/recomendado"
                    className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-[#F4C430]/60 hover:bg-white/15"
                  >
                    <span aria-hidden="true">
                      ✨
                    </span>{" "}
                    Simulado recomendado
                  </Link>

                  {hasReviewQuestions && (
                    <Link
                      href="/revisao"
                      className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-[#F4C430]/60 hover:bg-white/15"
                    >
                      <span aria-hidden="true">
                        🎯
                      </span>{" "}
                      Treinar meus erros
                    </Link>
                  )}
                </div>
              </div>

              {/* =============================================
                  MÉTRICAS DO HERO
              ============================================== */}

              <div className="grid min-w-0 grid-cols-2 gap-3 xl:min-w-[500px]">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-[10px] text-blue-100 sm:text-xs">
                    Provas
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {
                      dashboard.totalExams
                    }
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-[10px] text-blue-100 sm:text-xs">
                    Média
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {
                      dashboard.averageScore
                    }
                    %
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-[10px] text-blue-100 sm:text-xs">
                    Precisão
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {
                      dashboard.overallAccuracy
                    }
                    %
                  </p>
                </div>

                <div className="rounded-2xl border border-[#F4C430]/20 bg-[#F4C430]/15 p-4">
                  <p className="text-[10px] text-[#FFF3B0] sm:text-xs">
                    Sequência
                  </p>

                  <p className="mt-2 text-lg font-bold sm:text-2xl">
                    <span aria-hidden="true">
                      🔥
                    </span>{" "}
                    {
                      consistency.currentStreak
                    }{" "}
                    {consistency.currentStreak ===
                    1
                      ? "dia"
                      : "dias"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              MÉTRICAS
          ================================================== */}

          <section
            id="desempenho"
            tabIndex={-1}
            aria-labelledby="desempenho-heading"
            className="mt-5 scroll-mt-24 focus:outline-none sm:mt-7"
          >
            <h2
              id="desempenho-heading"
              className="sr-only"
            >
              Resumo de desempenho
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Provas realizadas
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {
                    dashboard.totalExams
                  }
                </p>

                <p className="mt-2 text-[10px] text-slate-400 sm:mt-3 sm:text-xs">
                  Simulados concluídos
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Média geral
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-600 sm:text-3xl">
                  {
                    dashboard.averageScore
                  }
                  %
                </p>

                <p className="mt-2 text-[10px] text-slate-400 sm:mt-3 sm:text-xs">
                  Média das notas
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Melhor nota
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-600 sm:text-3xl">
                  {
                    dashboard.bestScore
                  }
                  %
                </p>

                <p className="mt-2 text-[10px] text-slate-400 sm:mt-3 sm:text-xs">
                  Seu maior desempenho
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Questões realizadas
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {
                    dashboard.totalQuestions
                  }
                </p>

                <p className="mt-2 text-[10px] leading-4 text-slate-400 sm:mt-3 sm:text-xs">
                  {
                    dashboard.totalCorrect
                  }{" "}
                  respostas corretas
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              CONSISTÊNCIA + METAS
          ================================================== */}

          <section className="mt-5 grid gap-4 sm:mt-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div className="min-w-0 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm sm:p-6">
              <p className="text-sm font-bold text-orange-600">
                <span aria-hidden="true">
                  🔥
                </span>{" "}
                Consistência
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/70 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    Sequência atual
                  </p>

                  <p className="mt-2 text-2xl font-bold text-orange-600 sm:text-3xl">
                    {
                      consistency.currentStreak
                    }
                  </p>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    {consistency.currentStreak ===
                    1
                      ? "dia seguido"
                      : "dias seguidos"}
                  </p>
                </div>

                <div className="rounded-xl bg-white/70 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    Recorde
                  </p>

                  <p className="mt-2 text-2xl font-bold text-amber-600 sm:text-3xl">
                    {
                      consistency.longestStreak
                    }
                  </p>

                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    maior sequência
                  </p>
                </div>

                <div className="rounded-xl bg-white/70 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    Dias estudados
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                    {
                      consistency.totalStudyDays
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-white/70 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    Hoje
                  </p>

                  <p
                    className={`mt-2 break-words text-xs font-bold sm:text-sm ${
                      consistency.studiedToday
                        ? "text-emerald-600"
                        : "text-slate-500"
                    }`}
                  >
                    {consistency.studiedToday
                      ? "✓ Estudo registrado"
                      : "Ainda não estudou"}
                  </p>

                  {consistency.studiedToday && (
                    <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                      {
                        consistency.questionsToday
                      }{" "}
                      questões
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-emerald-600">
                    Metas semanais
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                    {
                      goalsProgress.completedGoals
                    }{" "}
                    de{" "}
                    {
                      goalsProgress.totalGoals
                    }{" "}
                    metas concluídas
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Segunda-feira a domingo
                  </p>
                </div>

                <Link
                  href="/metas"
                  className="shrink-0 text-sm font-bold text-blue-600"
                >
                  Configurar metas →
                </Link>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <GoalBar
                  label="Questões"
                  icon="❓"
                  current={
                    goalsProgress.questions.current
                  }
                  target={
                    goalsProgress.questions.target
                  }
                  percentage={
                    goalsProgress.questions.percentage
                  }
                />

                <GoalBar
                  label="Simulados"
                  icon="📝"
                  current={
                    goalsProgress.exams.current
                  }
                  target={
                    goalsProgress.exams.target
                  }
                  percentage={
                    goalsProgress.exams.percentage
                  }
                />

                <GoalBar
                  label="Dias"
                  icon="📅"
                  current={
                    goalsProgress.studyDays.current
                  }
                  target={
                    goalsProgress.studyDays.target
                  }
                  percentage={
                    goalsProgress.studyDays.percentage
                  }
                />
              </div>

              <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                <span>
                  Esta semana:{" "}
                  <strong className="text-slate-700">
                    {
                      consistency.examsThisWeek
                    }{" "}
                    provas
                  </strong>
                </span>

                <span>
                  <strong className="text-slate-700">
                    {
                      consistency.questionsThisWeek
                    }{" "}
                    questões
                  </strong>
                </span>

                <span>
                  Precisão:{" "}
                  <strong className="text-blue-600">
                    {
                      consistency.accuracyThisWeek
                    }
                    %
                  </strong>
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              TENDÊNCIA
          ================================================== */}

          <section className="mt-5 min-w-0 sm:mt-7">
            <SubjectTrendSummary
              data={
                evolution
              }
            />
          </section>

          {/* =================================================
              AÇÕES ADAPTATIVAS
          ================================================== */}

          <section className="mt-5 grid gap-4 sm:mt-7 md:grid-cols-2">
            <Link
              href="/recomendado"
              className="min-w-0 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <p className="text-sm font-bold text-indigo-600">
                <span aria-hidden="true">
                  ✨
                </span>{" "}
                Estudo adaptativo
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Simulado recomendado
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Mistura automaticamente erros
                recorrentes, baixo domínio,
                conteúdos pouco explorados,
                evolução recente e reforço.
              </p>

              <p className="mt-4 text-sm font-bold text-indigo-600">
                Criar recomendação →
              </p>
            </Link>

            <Link
              href="/dominio"
              className="min-w-0 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <p className="text-sm font-bold text-blue-600">
                <span aria-hidden="true">
                  🧭
                </span>{" "}
                Mapa de aprendizagem
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                Domínio de conteúdo
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Veja precisão, cobertura,
                sequência de acertos e nível
                de domínio em cada tópico.
              </p>

              <p className="mt-4 text-sm font-bold text-blue-600">
                Abrir mapa de domínio →
              </p>
            </Link>
          </section>

          {/* =================================================
              REVISÃO
          ================================================== */}

          {hasReviewQuestions && (
            <section className="mt-5 sm:mt-7">
              <div className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_250px]">
                  <div className="min-w-0 p-5 sm:p-6 md:p-7">
                    <p className="text-sm font-bold text-violet-600">
                      <span aria-hidden="true">
                        🎯
                      </span>{" "}
                      Revisão recomendada
                    </p>

                    <h2 className="mt-1 break-words text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                      Você tem{" "}
                      {
                        review.totalQuestionsWithErrors
                      }{" "}
                      questões no histórico
                      de erros.
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      A prioridade considera
                      quantidade de erros,
                      taxa de erro e sua
                      tentativa mais recente.
                    </p>

                    <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3">
                      <div className="rounded-xl bg-red-50 p-4">
                        <p className="text-xs text-red-500">
                          Alta prioridade
                        </p>

                        <p className="mt-1 text-2xl font-bold text-red-600">
                          {
                            review.highPriority
                          }
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50 p-4">
                        <p className="text-xs text-amber-600">
                          Prioridade média
                        </p>

                        <p className="mt-1 text-2xl font-bold text-amber-700">
                          {
                            review.mediumPriority
                          }
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-xs text-blue-500">
                          Baixa prioridade
                        </p>

                        <p className="mt-1 text-2xl font-bold text-blue-600">
                          {
                            review.lowPriority
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center border-t border-violet-100 bg-violet-50 p-5 sm:p-6 lg:border-l lg:border-t-0">
                    <p className="text-xs font-bold uppercase text-violet-500">
                      Erros registrados
                    </p>

                    <p className="mt-2 text-4xl font-bold text-violet-700">
                      {
                        review.totalHistoricalErrors
                      }
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Erros acumulados nas
                      questões disponíveis
                      para revisão.
                    </p>

                    <Link
                      href="/revisao"
                      className="mt-5 min-h-12 rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-violet-700"
                    >
                      Treinar meus erros →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              MATÉRIAS
          ================================================== */}

          <section
            id="materias"
            tabIndex={-1}
            aria-labelledby="materias-heading"
            className="mt-7 scroll-mt-24 focus:outline-none sm:mt-9"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  Conteúdos
                </p>

                <h2
                  id="materias-heading"
                  className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  Desempenho por matéria
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Seu histórico é analisado
                  separadamente para cada
                  conteúdo.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link
                  href="/analise"
                  className="text-sm font-bold text-blue-600"
                >
                  Análise completa →
                </Link>

                <Link
                  href="/dominio"
                  className="text-sm font-bold text-violet-600"
                >
                  Ver domínio →
                </Link>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dashboard.subjectStats.map(
                (
                  subject
                ) => {
                  const visualPercentage =
                    Math.min(
                      100,
                      Math.max(
                        0,
                        subject.percentage
                      )
                    );

                  return (
                    <article
                      key={
                        subject.id
                      }
                      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="shrink-0 text-2xl"
                            aria-hidden="true"
                          >
                            {
                              subject.icon
                            }
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-400">
                              {
                                subject.area
                              }
                            </p>

                            <h3 className="break-words font-bold text-slate-900">
                              {
                                subject.name
                              }
                            </h3>
                          </div>
                        </div>

                        {subject.totalQuestions >
                        0 ? (
                          <span className="shrink-0 text-xl font-bold text-blue-600">
                            {
                              subject.percentage
                            }
                            %
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-400">
                            Sem dados
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-xs leading-5 text-slate-500">
                        {getSubjectDescription(
                          subject
                        )}
                      </p>

                      <div
                        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                        role="progressbar"
                        aria-label={`Desempenho em ${subject.name}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={
                          visualPercentage
                        }
                        aria-valuetext={`${subject.percentage}%`}
                      >
                        <div
                          className="h-full rounded-full bg-[#3B82F6]"
                          style={{
                            width: `${visualPercentage}%`,
                          }}
                        />
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </section>

          {/* =================================================
              GRÁFICO
          ================================================== */}

          <section className="mt-7 sm:mt-9">
            <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600">
                    Evolução
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                    Evolução das notas
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Acompanhe sua pontuação
                    geral em cada simulado.
                  </p>
                </div>

                <Link
                  href="/evolucao"
                  className="shrink-0 text-sm font-bold text-blue-600"
                >
                  Evolução por matéria →
                </Link>
              </div>

              <div className="mt-6 min-w-0 overflow-hidden sm:mt-7">
                <ScoreEvolutionChart
                  data={
                    dashboard.evolution
                  }
                />
              </div>
            </div>
          </section>

          {/* =================================================
              HISTÓRICO RECENTE
          ================================================== */}

          <section className="mt-7 sm:mt-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  Atividade recente
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  Últimos simulados
                </h2>
              </div>

              <Link
                href="/historico"
                className="text-sm font-bold text-blue-600"
              >
                Ver todos →
              </Link>
            </div>

            {dashboard.recentExams.length ===
            0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-8">
                <div
                  className="text-4xl"
                  aria-hidden="true"
                >
                  📝
                </div>

                <p className="mt-3 font-bold text-slate-800">
                  Nenhum simulado ainda
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Faça sua primeira prova
                  para começar a preencher
                  o histórico.
                </p>

                <Link
                  href="/simulado/novo"
                  className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                >
                  Criar simulado
                </Link>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 xl:grid-cols-3">
                {dashboard.recentExams.map(
                  (
                    exam
                  ) => {
                    const modeInfo =
                      getExamModeInfo(
                        exam.mode
                      );

                    return (
                      <article
                        key={
                          exam.id
                        }
                        className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${modeInfo.badgeClass}`}
                              >
                                <span aria-hidden="true">
                                  {
                                    modeInfo.icon
                                  }
                                </span>{" "}
                                {
                                  modeInfo.shortLabel
                                }
                              </span>

                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                                {getDifficultyLabel(
                                  exam.difficulty
                                )}
                              </span>
                            </div>

                            <p className="mt-3 break-words text-[10px] text-slate-400 sm:text-xs">
                              {formatDate(
                                exam.submittedAt
                              )}
                            </p>
                          </div>

                          <p className="shrink-0 text-2xl font-bold text-slate-900 sm:text-3xl">
                            {
                              exam.percentage
                            }
                            %
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {exam.subjects.map(
                            (
                              subject
                            ) => (
                              <span
                                key={
                                  subject
                                }
                                className="max-w-full break-words rounded-lg bg-blue-50 px-2.5 py-1.5 text-[11px] font-semibold text-blue-700 sm:text-xs"
                              >
                                {getSubjectName(
                                  subject
                                )}
                              </span>
                            )
                          )}
                        </div>

                        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-slate-500">
                            {
                              exam.correct
                            }{" "}
                            de{" "}
                            {
                              exam.totalQuestions
                            }{" "}
                            acertos
                          </span>

                          <Link
                            href={`/historico/${exam.id}`}
                            className="font-bold text-blue-600"
                          >
                            Detalhes →
                          </Link>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
          </section>

          {/* =================================================
              FOOTER
          ================================================== */}

          <footer className="mt-8 border-t border-slate-200 py-7 text-center text-[10px] leading-5 text-slate-400 sm:mt-10 sm:text-xs">
            NabuLab •{" "}
            {
              totalBankQuestions
            }{" "}
            questões disponíveis • Dados
            armazenados localmente
          </footer>
        </main>
      </div>
    </div>
  );
}
