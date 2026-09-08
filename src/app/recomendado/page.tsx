"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  createExamSessionFromQuestionIds,
} from "@/lib/quiz-engine";

import {
  clearCurrentExam,
  createInitialExamProgress,
  saveExamProgress,
  saveExamSession,
} from "@/lib/exam-session";

import {
  getRecommendedQuizSummary,
  selectRecommendedQuestions,
  type RecommendedQuestion,
  type RecommendedQuizSummary,
  type RecommendationCategory,
} from "@/lib/recommended-quiz";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

/*
 * =========================================================
 * CATEGORIA
 * =========================================================
 */

function getCategoryInfo(
  category:
    RecommendationCategory
) {
  switch (
    category
  ) {
    case "erro-recorrente":
      return {
        label:
          "Erro recorrente",

        icon:
          "🎯",

        className:
          "border-red-200 bg-red-50 text-red-700",
      };

    case "baixo-dominio":
      return {
        label:
          "Baixo domínio",

        icon:
          "🧠",

        className:
          "border-amber-200 bg-amber-50 text-amber-700",
      };

    case "pouco-explorado":
      return {
        label:
          "Pouco explorado",

        icon:
          "🧭",

        className:
          "border-blue-200 bg-blue-50 text-blue-700",
      };

    default:
      return {
        label:
          "Reforço",

        icon:
          "✅",

        className:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
  }
}

/*
 * =========================================================
 * TENDÊNCIA
 * =========================================================
 */

function getTrendLabel(
  trend:
    RecommendedQuestion["subjectTrend"]
) {
  switch (
    trend
  ) {
    case "subindo":
      return "↗ Melhorando";

    case "caindo":
      return "↘ Em queda";

    case "estavel":
      return "→ Estável";

    default:
      return "• Poucos dados";
  }
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function RecommendedQuizPage() {
  const router =
    useRouter();

  const [
    summary,
    setSummary,
  ] =
    useState<RecommendedQuizSummary | null>(
      null
    );

  const [
    amount,
    setAmount,
  ] =
    useState(
      10
    );

  const [
    shuffleAlternatives,
    setShuffleAlternatives,
  ] =
    useState(
      true
    );

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    isStarting,
    setIsStarting,
  ] =
    useState(
      false
    );

  /*
   * =========================================================
   * CARREGAR RECOMENDAÇÕES
   * =========================================================
   */

  const loadRecommendations =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setError(
          null
        );

        try {
          const data =
            await getRecommendedQuizSummary();

          setSummary(
            data
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao gerar recomendações:",
            loadError
          );

          setSummary(
            null
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível analisar seu histórico."
          );
        } finally {
          setLoading(
            false
          );
        }
      },
      []
    );

  useEffect(() => {
    void loadRecommendations();
  }, [
    loadRecommendations,
  ]);

  /*
   * =========================================================
   * QUESTÕES SELECIONADAS
   * =========================================================
   */

  const selected =
    useMemo(() => {
      if (
        !summary
      ) {
        return [];
      }

      return selectRecommendedQuestions(
        summary,
        amount
      );
    }, [
      summary,
      amount,
    ]);

  /*
   * =========================================================
   * COMPOSIÇÃO
   * =========================================================
   */

  const composition =
    useMemo(() => {
      return {
        recurring:
          selected.filter(
            (item) =>
              item.category ===
              "erro-recorrente"
          ).length,

        mastery:
          selected.filter(
            (item) =>
              item.category ===
              "baixo-dominio"
          ).length,

        underexplored:
          selected.filter(
            (item) =>
              item.category ===
              "pouco-explorado"
          ).length,

        reinforcement:
          selected.filter(
            (item) =>
              item.category ===
              "reforco"
          ).length,
      };
    }, [
      selected,
    ]);

  /*
   * =========================================================
   * INICIAR SIMULADO
   * =========================================================
   */

  function handleStart() {
    if (
      isStarting ||
      selected.length ===
        0
    ) {
      return;
    }

    setError(
      null
    );

    setIsStarting(
      true
    );

    try {
      const questionIds =
        selected.map(
          (item) =>
            item.question.id
        );

      const createdSession =
        createExamSessionFromQuestionIds(
          questionIds,
          shuffleAlternatives,
          "recommended"
        );

      if (
        !createdSession
      ) {
        throw new Error(
          "Não foi possível criar o simulado recomendado."
        );
      }

      const session = {
        ...createdSession,

        mode:
          "recommended" as const,
      };

      clearCurrentExam();

      saveExamSession(
        session
      );

      saveExamProgress(
        createInitialExamProgress(
          session.id
        )
      );

      router.push(
        "/simulado/prova"
      );
    } catch (
      startError
    ) {
      console.error(
        "Erro ao iniciar simulado recomendado:",
        startError
      );

      setError(
        startError instanceof Error
          ? startError.message
          : "Não foi possível iniciar o simulado recomendado."
      );

      setIsStarting(
        false
      );
    }
  }

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
        title="Analisando seu histórico..."
        description="Calculando erros, domínio, tendências e conteúdos pouco explorados."
      />
    );
  }

  /*
   * =========================================================
   * ERRO DE CARREGAMENTO
   * =========================================================
   */

  if (
    error &&
    !summary
  ) {
    return (
      <ErrorState
        fullScreen
        title="Não foi possível gerar recomendações"
        description="O histórico não pôde ser analisado neste momento."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadRecommendations();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * DADOS INCOMPLETOS
   * =========================================================
   */

  if (
    !summary
  ) {
    return (
      <ErrorState
        fullScreen
        title="Recomendação indisponível"
        description="O sistema não recebeu os dados necessários."
        onRetry={() => {
          void loadRecommendations();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * BANCO VAZIO
   * =========================================================
   */

  if (
    summary.totalQuestions ===
    0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="✨"
        eyebrow="Simulado recomendado"
        title="Nenhuma questão disponível"
        description="O banco atual não possui questões que possam ser utilizadas."
        actionLabel="Criar simulado manual"
        actionHref="/simulado/novo"
        secondaryLabel="Voltar ao painel"
        secondaryHref="/"
      />
    );
  }

  /*
   * =========================================================
   * INTERFACE
   * =========================================================
   */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <NabuLabBrand
            subtitle="Recomendação adaptativa"
          />

          <Link
            href="/"
            className="shrink-0 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:border-0 sm:px-0 sm:py-0 sm:text-sm sm:hover:bg-transparent sm:hover:text-slate-900"
          >
            <span className="sm:hidden">
              ← Painel
            </span>

            <span className="hidden sm:inline">
              ← Voltar ao painel
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-5 sm:py-8 md:px-8">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="rounded-[24px] bg-gradient-to-br from-[#0B2D6B] via-[#174EA6] to-[#3B82F6] p-5 text-white shadow-lg shadow-blue-100 sm:rounded-[28px] sm:p-7 md:p-10">
          <p className="text-xs font-bold text-[#F4C430] sm:text-sm">
            Seleção adaptativa
          </p>

          <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
            Simulado recomendado
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50 sm:mt-4">
            A seleção considera seus erros,
            desempenho recente, tendência de
            cada matéria, cobertura do
            conteúdo e frequência de
            repetição.
          </p>
        </section>

        {/* ===================================================
            RESUMO GERAL
        ==================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4 xl:grid-cols-4">
          <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
            <p className="text-[10px] font-bold leading-5 text-red-600 sm:text-sm">
              🎯 Erros recorrentes
            </p>

            <p className="mt-1 text-2xl font-bold text-red-700 sm:mt-2 sm:text-3xl">
              {
                summary.recurringErrors
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
            <p className="text-[10px] font-bold leading-5 text-amber-600 sm:text-sm">
              🧠 Baixo domínio
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-700 sm:mt-2 sm:text-3xl">
              {
                summary.lowMastery
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
            <p className="text-[10px] font-bold leading-5 text-blue-600 sm:text-sm">
              🧭 Pouco exploradas
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-700 sm:mt-2 sm:text-3xl">
              {
                summary.underexplored
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
            <p className="text-[10px] font-bold leading-5 text-emerald-600 sm:text-sm">
              ✅ Reforço
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-700 sm:mt-2 sm:text-3xl">
              {
                summary.reinforcement
              }
            </p>
          </div>
        </section>

        {/* ===================================================
            CONFIGURAÇÃO + CONTEÚDO
        ==================================================== */}

        <section className="mt-6 grid min-w-0 gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          {/* =================================================
              CONFIGURAÇÃO
          ================================================== */}

          <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 xl:sticky xl:top-6 xl:self-start">
            <p className="text-sm font-bold text-[#3B82F6]">
              Configuração
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Configurar prova
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              O conteúdo será escolhido
              automaticamente pelo algoritmo.
            </p>

            {/* ===============================================
                QUANTIDADE
            ================================================= */}

            <div className="mt-5 sm:mt-6">
              <p className="text-sm font-bold text-slate-800">
                Quantidade
              </p>

              <div
                className="mt-3 grid grid-cols-2 gap-2"
                role="group"
                aria-label="Quantidade de questões"
              >
                {[
                  5,
                  10,
                  15,
                  20,
                ].map(
                  (
                    value
                  ) => {
                    const active =
                      amount ===
                      value;

                    return (
                      <button
                        key={
                          value
                        }
                        type="button"
                        aria-pressed={
                          active
                        }
                        onClick={() => {
                          setAmount(
                            value
                          );

                          setError(
                            null
                          );
                        }}
                        className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                          active
                            ? "border-[#0B2D6B] bg-[#0B2D6B] text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {
                          value
                        }
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* ===============================================
                EMBARALHAR
            ================================================= */}

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 sm:mt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">
                    Embaralhar alternativas
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Aplicado às questões de
                    múltipla escolha.
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-400">
                    Verdadeiro ou falso mantém
                    a ordem V e F.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Alternar embaralhamento de alternativas"
                  aria-pressed={
                    shuffleAlternatives
                  }
                  onClick={() => {
                    setShuffleAlternatives(
                      (current) =>
                        !current
                    );

                    setError(
                      null
                    );
                  }}
                  className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition ${
                    shuffleAlternatives
                      ? "bg-[#0B2D6B]"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      shuffleAlternatives
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ===============================================
                QUANTIDADE REAL
            ================================================= */}

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-blue-600">
                  Questões selecionadas
                </span>

                <strong className="text-xl text-[#0B2D6B]">
                  {
                    selected.length
                  }
                </strong>
              </div>

              {selected.length <
                amount && (
                <p className="mt-2 text-[10px] leading-5 text-blue-700">
                  Você solicitou{" "}
                  <strong>
                    {
                      amount
                    }
                  </strong>
                  , mas o algoritmo encontrou{" "}
                  <strong>
                    {
                      selected.length
                    }
                  </strong>{" "}
                  questões adequadas para esta
                  composição.
                </p>
              )}
            </div>

            {/* ===============================================
                ERRO
            ================================================= */}

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <p className="text-xs font-bold text-red-700">
                  Não foi possível iniciar
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-red-600">
                  {
                    error
                  }
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setError(
                      null
                    )
                  }
                  className="mt-3 text-xs font-bold text-red-700 underline underline-offset-2"
                >
                  Fechar aviso
                </button>
              </div>
            )}

            {/* ===============================================
                INICIAR
            ================================================= */}

            <button
              type="button"
              onClick={
                handleStart
              }
              disabled={
                selected.length ===
                  0 ||
                isStarting
              }
              className="mt-5 min-h-12 w-full rounded-xl bg-[#0B2D6B] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#174EA6] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-100 sm:mt-6"
            >
              {isStarting
                ? "Preparando simulado..."
                : `✨ Iniciar com ${selected.length} ${
                    selected.length ===
                    1
                      ? "questão"
                      : "questões"
                  }`}
            </button>
          </aside>

          {/* =================================================
              QUESTÕES
          ================================================== */}

          <div className="min-w-0">
            {/* ===============================================
                COMPOSIÇÃO
            ================================================= */}

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-sm font-bold text-[#3B82F6]">
                Composição
              </p>

              <h2 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                O algoritmo selecionou{" "}
                {
                  selected.length
                }{" "}
                {selected.length ===
                1
                  ? "questão"
                  : "questões"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A composição muda conforme a
                quantidade escolhida e seu
                histórico de desempenho.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                <div className="min-w-0 rounded-xl bg-red-50 p-3 sm:p-4">
                  <p className="text-[9px] leading-4 text-red-500 sm:text-xs">
                    Erros
                  </p>

                  <p className="mt-1 text-xl font-bold text-red-700 sm:text-2xl">
                    {
                      composition.recurring
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-amber-50 p-3 sm:p-4">
                  <p className="text-[9px] leading-4 text-amber-500 sm:text-xs">
                    Baixo domínio
                  </p>

                  <p className="mt-1 text-xl font-bold text-amber-700 sm:text-2xl">
                    {
                      composition.mastery
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-blue-50 p-3 sm:p-4">
                  <p className="text-[9px] leading-4 text-blue-500 sm:text-xs">
                    Pouco exploradas
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-700 sm:text-2xl">
                    {
                      composition.underexplored
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-emerald-50 p-3 sm:p-4">
                  <p className="text-[9px] leading-4 text-emerald-500 sm:text-xs">
                    Reforço
                  </p>

                  <p className="mt-1 text-xl font-bold text-emerald-700 sm:text-2xl">
                    {
                      composition.reinforcement
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* ===============================================
                LISTA
            ================================================= */}

            <div className="mt-4 space-y-4 sm:mt-5">
              {selected.map(
                (
                  item,
                  index
                ) => {
                  const category =
                    getCategoryInfo(
                      item.category
                    );

                  return (
                    <article
                      key={
                        item.question.id
                      }
                      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
                        {/* =================================
                            CONTEÚDO
                        ================================== */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
                              #
                              {
                                index +
                                1
                              }
                            </span>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${category.className}`}
                            >
                              {
                                category.icon
                              }{" "}
                              {
                                category.label
                              }
                            </span>

                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-700 sm:text-[10px]">
                              {getTrendLabel(
                                item.subjectTrend
                              )}
                            </span>
                          </div>

                          <p className="mt-4 break-words text-[10px] font-bold leading-5 text-[#3B82F6] sm:text-xs">
                            {
                              item.question.subjectName
                            }{" "}
                            •{" "}
                            {
                              item.question.topic
                            }
                          </p>

                          <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-900 sm:text-[15px]">
                            {
                              item.question.statement
                            }
                          </p>

                          {/* ===============================
                              MOTIVOS
                          ================================ */}

                          {item.reasons.length >
                            0 && (
                            <div className="mt-4 rounded-xl bg-slate-50 p-3 sm:p-4">
                              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                                Por que foi recomendada?
                              </p>

                              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-600">
                                {item.reasons
                                  .slice(
                                    0,
                                    3
                                  )
                                  .map(
                                    (
                                      reason,
                                      reasonIndex
                                    ) => (
                                      <li
                                        key={
                                          reasonIndex
                                        }
                                        className="flex min-w-0 gap-2"
                                      >
                                        <span
                                          className="shrink-0 text-slate-400"
                                          aria-hidden="true"
                                        >
                                          •
                                        </span>

                                        <span className="min-w-0 break-words">
                                          {
                                            reason
                                          }
                                        </span>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* =================================
                            MÉTRICAS
                        ================================== */}

                        <div className="grid min-w-0 grid-cols-3 gap-2 lg:w-[220px] lg:shrink-0 lg:grid-cols-2">
                          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center sm:p-3">
                            <p className="text-[8px] text-slate-400 sm:text-[10px]">
                              Tentativas
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {
                                item.attempts
                              }
                            </p>
                          </div>

                          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center sm:p-3">
                            <p className="text-[8px] text-slate-400 sm:text-[10px]">
                              Aproveitamento
                            </p>

                            <p className="mt-1 break-words font-bold text-slate-900">
                              {item.attempts ===
                              0
                                ? "Nova"
                                : `${item.accuracy}%`}
                            </p>
                          </div>

                          <div className="min-w-0 rounded-xl bg-blue-50 p-2.5 text-center sm:p-3 lg:col-span-2">
                            <p className="text-[8px] text-blue-400 sm:text-[10px]">
                              Prioridade
                            </p>

                            <p className="mt-1 font-bold text-[#0B2D6B]">
                              {
                                item.score
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            EXPLICAÇÃO
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:mt-8 sm:p-6">
          <h3 className="font-bold text-blue-900">
            Como funciona?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Questões que continuam apresentando
            dificuldade recebem prioridade,
            enquanto repetições excessivas são
            penalizadas. O algoritmo também
            considera a trajetória recente das
            matérias.
          </p>
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:flex sm:flex-wrap sm:justify-between">
          <Link
            href="/"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            ← Voltar ao painel
          </Link>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/dominio"
              className="min-h-12 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-100"
            >
              🧭 Ver domínio
            </Link>

            <Link
              href="/simulado/novo"
              className="min-h-12 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Criar manualmente
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Recomendação gerada localmente a
          partir do seu histórico.
        </footer>
      </div>
    </main>
  );
}