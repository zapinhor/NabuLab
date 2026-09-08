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
  getReviewSummary,
  type ReviewPriority,
  type ReviewSummary,
} from "@/lib/review-queries";

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
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

/*
 * =========================================================
 * QUANTIDADE
 * =========================================================
 */

type AmountOption =
  | number
  | "all";

const amountOptions:
  AmountOption[] = [
    5,
    10,
    15,
    "all",
  ];

/*
 * =========================================================
 * PRIORIDADE
 * =========================================================
 */

function getPriorityInfo(
  priority:
    ReviewPriority
) {
  switch (
    priority
  ) {
    case "alta":
      return {
        label:
          "Alta prioridade",

        badge:
          "border-red-200 bg-red-50 text-red-700",

        bar:
          "bg-red-500",
      };

    case "media":
      return {
        label:
          "Prioridade média",

        badge:
          "border-amber-200 bg-amber-50 text-amber-700",

        bar:
          "bg-amber-500",
      };

    default:
      return {
        label:
          "Baixa prioridade",

        badge:
          "border-blue-200 bg-blue-50 text-blue-700",

        bar:
          "bg-blue-500",
      };
  }
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function ReviewPage() {
  const router =
    useRouter();

  const [
    summary,
    setSummary,
  ] =
    useState<ReviewSummary | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    loadError,
    setLoadError,
  ] =
    useState<string | null>(
      null
    );

  const [
    generationError,
    setGenerationError,
  ] =
    useState<string | null>(
      null
    );

  const [
    amount,
    setAmount,
  ] =
    useState<AmountOption>(
      5
    );

  const [
    shuffleAlternatives,
    setShuffleAlternatives,
  ] =
    useState(
      true
    );

  const [
    generating,
    setGenerating,
  ] =
    useState(
      false
    );

  /*
   * =========================================================
   * CARREGAR REVISÃO
   * =========================================================
   */

  const loadReview =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setLoadError(
          null
        );

        setGenerationError(
          null
        );

        try {
          const data =
            await getReviewSummary();

          setSummary(
            data
          );
        } catch (
          error
        ) {
          console.error(
            "Erro ao carregar revisão:",
            error
          );

          setSummary(
            null
          );

          setLoadError(
            error instanceof Error
              ? error.message
              : "Não foi possível analisar seu histórico de erros."
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
    void loadReview();
  }, [
    loadReview,
  ]);

  /*
   * =========================================================
   * QUANTIDADE REAL
   * =========================================================
   */

  const actualAmount =
    useMemo(() => {
      if (
        !summary
      ) {
        return 0;
      }

      if (
        amount ===
        "all"
      ) {
        return summary.questions.length;
      }

      return Math.min(
        amount,
        summary.questions.length
      );
    }, [
      amount,
      summary,
    ]);

  /*
   * =========================================================
   * PREVIEW
   * =========================================================
   */

  const selectedPreview =
    useMemo(() => {
      if (
        !summary
      ) {
        return [];
      }

      return summary.questions.slice(
        0,
        actualAmount
      );
    }, [
      summary,
      actualAmount,
    ]);

  /*
   * =========================================================
   * INICIAR REVISÃO
   * =========================================================
   */

  function handleStartReview() {
    if (
      !summary ||
      generating ||
      actualAmount ===
        0
    ) {
      return;
    }

    setGenerating(
      true
    );

    setGenerationError(
      null
    );

    try {
      const selectedQuestions =
        summary.questions.slice(
          0,
          actualAmount
        );

      const questionIds =
        selectedQuestions.map(
          (item) =>
            item.questionId
        );

      const createdSession =
        createExamSessionFromQuestionIds(
          questionIds,
          shuffleAlternatives,
          "review"
        );

      if (
        !createdSession
      ) {
        throw new Error(
          "Não foi possível criar a sessão de revisão."
        );
      }

      /*
       * GARANTIA EXTRA:
       *
       * mesmo que o quiz-engine mude
       * futuramente, esta sessão continua
       * explicitamente registrada como
       * revisão.
       */

      const session = {
        ...createdSession,

        mode:
          "review" as const,
      };

      clearCurrentExam();

      saveExamSession(
        session
      );

      const progress =
        createInitialExamProgress(
          session.id
        );

      saveExamProgress(
        progress
      );

      router.push(
        "/simulado/prova"
      );
    } catch (
      error
    ) {
      console.error(
        "Erro ao iniciar revisão:",
        error
      );

      setGenerationError(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar a revisão."
      );

      setGenerating(
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
        title="Analisando seus erros..."
        description="Estamos verificando suas tentativas anteriores e calculando quais questões merecem prioridade."
      />
    );
  }

  /*
   * =========================================================
   * ERRO AO CARREGAR
   * =========================================================
   */

  if (
    loadError
  ) {
    return (
      <ErrorState
        fullScreen
        title="Não foi possível preparar sua revisão"
        description="O sistema encontrou um problema ao analisar seu histórico de respostas."
        details={
          process.env.NODE_ENV ===
          "development"
            ? loadError
            : undefined
        }
        onRetry={() => {
          void loadReview();
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
        title="Dados de revisão indisponíveis"
        description="A análise terminou, mas os dados necessários para montar sua revisão não foram encontrados."
        onRetry={() => {
          void loadReview();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * NENHUM ERRO
   * =========================================================
   */

  if (
    summary.questions.length ===
    0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="🎉"
        eyebrow="Revisão inteligente"
        title="Nenhum erro para revisar"
        description="Seu histórico não possui questões incorretas disponíveis para uma nova revisão. Continue fazendo simulados para manter seu aprendizado ativo."
        actionLabel="Fazer novo simulado"
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
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7fb]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              F
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-slate-900">
                Fisio Simulado
              </p>

              <p className="hidden text-xs text-slate-500 sm:block">
                Revisão inteligente
              </p>
            </div>
          </Link>

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

        <section className="rounded-[24px] bg-gradient-to-r from-violet-600 via-blue-600 to-blue-700 p-5 text-white shadow-lg shadow-blue-100 sm:rounded-[28px] sm:p-7 md:p-10">
          <div className="min-w-0">
            <p className="text-xs font-bold text-blue-100 sm:text-sm">
              Revisão personalizada
            </p>

            <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
              Treinar meus erros
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-4">
              O sistema analisa seu histórico
              e prioriza as questões que mais
              precisam de uma nova tentativa.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Questões com erro
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    summary.totalQuestionsWithErrors
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Erros históricos
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    summary.totalHistoricalErrors
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Prioridade alta
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    summary.highPriority
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONFIGURAÇÃO + RESUMO
        ==================================================== */}

        <section className="mt-5 grid gap-4 sm:mt-7 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              CONFIGURAÇÃO
          ================================================== */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-sm font-bold text-blue-600">
              Configuração
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Quantas questões deseja revisar?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              As questões com maior
              prioridade aparecem primeiro.
            </p>

            {/* ===============================================
                QUANTIDADE
            ================================================ */}

            <div
              className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4"
              role="group"
              aria-label="Quantidade de questões para revisão"
            >
              {amountOptions.map(
                (
                  option
                ) => {
                  const disabled =
                    option !==
                      "all" &&
                    option >
                      summary.questions.length;

                  const selected =
                    amount ===
                    option;

                  return (
                    <button
                      key={
                        option
                      }
                      type="button"
                      disabled={
                        disabled
                      }
                      aria-pressed={
                        selected
                      }
                      onClick={() => {
                        setAmount(
                          option
                        );

                        setGenerationError(
                          null
                        );
                      }}
                      className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-bold transition sm:px-4 sm:py-4 ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {option ===
                      "all"
                        ? `Todas (${summary.questions.length})`
                        : option}
                    </button>
                  );
                }
              )}
            </div>

            {/* ===============================================
                EMBARALHAR
            ================================================ */}

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 sm:mt-7 sm:p-5">
              <div className="flex items-start justify-between gap-4 sm:items-center sm:gap-5">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900">
                    Embaralhar alternativas
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Nas questões de múltipla
                    escolha, o conteúdo muda
                    de posição enquanto as
                    letras exibidas continuam
                    A, B, C e D.
                  </p>

                  <p className="mt-2 text-[10px] font-semibold text-slate-400">
                    Verdadeiro ou falso mantém
                    sempre V e F.
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

                    setGenerationError(
                      null
                    );
                  }}
                  className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition sm:mt-0 ${
                    shuffleAlternatives
                      ? "bg-blue-600"
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
                ERRO DE GERAÇÃO
            ================================================ */}

            {generationError && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Não foi possível iniciar
                </p>

                <p className="mt-2 break-words text-sm leading-6 text-red-700">
                  {
                    generationError
                  }
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setGenerationError(
                      null
                    )
                  }
                  className="mt-3 text-xs font-bold text-red-700 underline underline-offset-2"
                >
                  Fechar aviso
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              RESUMO DO TREINO
          ================================================== */}

          <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 xl:sticky xl:top-6 xl:self-start">
            <div className="flex items-start justify-between gap-4 xl:block">
              <div>
                <p className="font-bold text-slate-900">
                  Seu treino
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Resumo da revisão que será criada.
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-blue-50 px-4 py-2 text-center xl:hidden">
                <p className="text-[9px] font-semibold text-blue-500">
                  Questões
                </p>

                <p className="text-xl font-bold text-blue-700">
                  {
                    actualAmount
                  }
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 xl:block xl:space-y-4">
              <div className="rounded-xl bg-slate-50 p-3 xl:flex xl:items-center xl:justify-between xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Questões
                </span>

                <strong className="mt-1 block text-lg text-slate-900 xl:mt-0 xl:text-base">
                  {
                    actualAmount
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 xl:flex xl:items-center xl:justify-between xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Disponíveis
                </span>

                <strong className="mt-1 block text-lg text-slate-900 xl:mt-0 xl:text-base">
                  {
                    summary.questions.length
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-red-50 p-3 xl:border-t xl:border-slate-100 xl:bg-transparent xl:pt-4">
                <div className="xl:flex xl:items-center xl:justify-between">
                  <span className="text-xs text-slate-500 sm:text-sm">
                    Prioridade alta
                  </span>

                  <strong className="mt-1 block text-lg text-red-600 xl:mt-0 xl:text-base">
                    {
                      summary.highPriority
                    }
                  </strong>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 xl:flex xl:items-center xl:justify-between xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Prioridade média
                </span>

                <strong className="mt-1 block text-lg text-amber-600 xl:mt-0 xl:text-base">
                  {
                    summary.mediumPriority
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 xl:flex xl:items-center xl:justify-between xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Baixa prioridade
                </span>

                <strong className="mt-1 block text-lg text-blue-600 xl:mt-0 xl:text-base">
                  {
                    summary.lowPriority
                  }
                </strong>
              </div>
            </div>

            <button
              type="button"
              disabled={
                generating ||
                actualAmount ===
                  0
              }
              onClick={
                handleStartReview
              }
              className="mt-5 min-h-12 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:mt-6 sm:px-5 sm:py-4"
            >
              {generating
                ? "Preparando treino..."
                : `Iniciar revisão com ${actualAmount} ${
                    actualAmount ===
                    1
                      ? "questão"
                      : "questões"
                  }`}
            </button>
          </aside>
        </section>

        {/* ===================================================
            PREVIEW
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-violet-600">
            Próxima revisão
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Questões selecionadas
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Esta é a ordem de prioridade
                calculada a partir do seu
                histórico.
              </p>
            </div>

            <p className="shrink-0 text-xs font-semibold text-slate-400">
              {
                selectedPreview.length
              }{" "}
              {selectedPreview.length ===
              1
                ? "questão"
                : "questões"}
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {selectedPreview.map(
              (
                item,
                index
              ) => {
                const info =
                  getPriorityInfo(
                    item.priority
                  );

                return (
                  <article
                    key={
                      item.questionId
                    }
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* Barra de prioridade */}

                    <div
                      className={`h-1 ${info.bar}`}
                    />

                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          Questão{" "}
                          {
                            index +
                            1
                          }
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${info.badge}`}
                        >
                          {
                            info.label
                          }
                        </span>
                      </div>

                      <p className="mt-4 break-words text-xs font-semibold text-blue-600">
                        {
                          item.subjectName
                        }
                      </p>

                      <h3 className="mt-1 break-words font-bold text-slate-900">
                        {
                          item.topic
                        }
                      </h3>

                      <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                        {
                          item.subtopic
                        }
                      </p>

                      {/* =====================================
                          MÉTRICAS
                      ====================================== */}

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center sm:p-3">
                          <p className="text-[9px] text-slate-400 sm:text-[10px]">
                            Tentativas
                          </p>

                          <strong className="mt-1 block text-slate-800">
                            {
                              item.attempts
                            }
                          </strong>
                        </div>

                        <div className="min-w-0 rounded-xl bg-red-50 p-2.5 text-center sm:p-3">
                          <p className="text-[9px] text-red-400 sm:text-[10px]">
                            Erros
                          </p>

                          <strong className="mt-1 block text-red-600">
                            {
                              item.errors
                            }
                          </strong>
                        </div>

                        <div className="min-w-0 rounded-xl bg-amber-50 p-2.5 text-center sm:p-3">
                          <p className="text-[9px] text-amber-500 sm:text-[10px]">
                            Taxa
                          </p>

                          <strong className="mt-1 block text-amber-700">
                            {
                              item.errorRate
                            }
                            %
                          </strong>
                        </div>
                      </div>

                      {/* =====================================
                          ÚLTIMA TENTATIVA
                      ====================================== */}

                      <div className="mt-4 border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            Última tentativa
                          </span>

                          {item.lastAttemptCorrect ? (
                            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                              ✓ Acertou
                            </span>
                          ) : (
                            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
                              ✕ Errou
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            EXPLICAÇÃO
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-violet-100 bg-violet-50 p-5 sm:mt-9 sm:p-6">
          <h3 className="font-bold text-violet-900">
            Como a prioridade é calculada?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Uma questão pode continuar
            disponível para revisão mesmo
            depois de ser acertada. O sistema
            considera quantas vezes você
            tentou a questão, quantos erros
            acumulou, sua taxa histórica de
            erro e o resultado da tentativa
            mais recente.
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
              href="/historico"
              className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Ver histórico
            </Link>

            <Link
              href="/simulado/novo"
              className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Novo simulado
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Revisão baseada no seu
          histórico permanente.
        </footer>
      </div>
    </main>
  );
}