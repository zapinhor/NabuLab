"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  subjects,
} from "@/data/subjects";

import {
  getExamHistoryOverview,
  type ExamHistoryOverview,
  type ExamModeStats,
} from "@/lib/history-queries";

import {
  getExamModeInfo,
  normalizeExamMode,
} from "@/lib/exam-mode";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

import type {
  ExamMode,
} from "@/types/exam";

import type {
  StoredExam,
} from "@/types/storage";

import type {
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * FILTROS
 * =========================================================
 */

type HistoryFilter =
  | "all"
  | ExamMode;

const historyFilters: {
  id: HistoryFilter;
  label: string;
  shortLabel: string;
}[] = [
  {
    id:
      "all",

    label:
      "Todos",

    shortLabel:
      "Todos",
  },

  {
    id:
      "manual",

    label:
      "📝 Manual",

    shortLabel:
      "📝 Manual",
  },

  {
    id:
      "review",

    label:
      "🎯 Revisão",

    shortLabel:
      "🎯 Revisão",
  },

  {
    id:
      "recommended",

    label:
      "✨ Recomendado",

    shortLabel:
      "✨ Recom.",
  },
];

/*
 * =========================================================
 * DATA
 * =========================================================
 */

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    }
  ).format(
    new Date(
      value
    )
  );
}

/*
 * =========================================================
 * DURAÇÃO
 * =========================================================
 */

function formatDuration(
  seconds: number
) {
  if (
    seconds <
    60
  ) {
    return `${seconds}s`;
  }

  const minutes =
    Math.floor(
      seconds /
        60
    );

  const remainingSeconds =
    seconds %
    60;

  if (
    remainingSeconds ===
    0
  ) {
    return `${minutes} min`;
  }

  return `${minutes} min ${remainingSeconds}s`;
}

/*
 * =========================================================
 * DIFICULDADE
 * =========================================================
 */

function getDifficultyLabel(
  difficulty:
    StoredExam["difficulty"]
) {
  switch (
    difficulty
  ) {
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

/*
 * =========================================================
 * MATÉRIA
 * =========================================================
 */

function getSubjectName(
  id: SubjectId
) {
  return (
    subjects.find(
      (subject) =>
        subject.id ===
        id
    )?.name ??
    id
  );
}

/*
 * =========================================================
 * CARD DE MODALIDADE
 * =========================================================
 */

function ModeStatsCard({
  stats,
}: {
  stats:
    ExamModeStats;
}) {
  const info =
    getExamModeInfo(
      stats.mode
    );

  return (
    <article
      className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${info.cardClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className="text-2xl"
            aria-hidden="true"
          >
            {
              info.icon
            }
          </div>

          <p
            className={`mt-2 break-words text-xs font-bold sm:mt-3 sm:text-sm ${info.textClass}`}
          >
            {
              info.label
            }
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {
              stats.averageScore
            }
            %
          </p>

          <p className="text-[10px] text-slate-500 sm:text-xs">
            média
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
        <div className="min-w-0 rounded-xl bg-white/70 p-2.5 text-center sm:p-3">
          <p className="text-[9px] text-slate-400 sm:text-[10px]">
            Provas
          </p>

          <p className="mt-1 font-bold text-slate-800">
            {
              stats.totalExams
            }
          </p>
        </div>

        <div className="min-w-0 rounded-xl bg-white/70 p-2.5 text-center sm:p-3">
          <p className="text-[9px] text-slate-400 sm:text-[10px]">
            Precisão
          </p>

          <p className="mt-1 font-bold text-slate-800">
            {
              stats.accuracy
            }
            %
          </p>
        </div>

        <div className="min-w-0 rounded-xl bg-white/70 p-2.5 text-center sm:p-3">
          <p className="text-[9px] text-slate-400 sm:text-[10px]">
            Melhor
          </p>

          <p className="mt-1 font-bold text-slate-800">
            {
              stats.bestScore
            }
            %
          </p>
        </div>
      </div>

      {stats.totalExams ===
        0 && (
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Nenhum simulado desta
          modalidade foi concluído.
        </p>
      )}
    </article>
  );
}

/*
 * =========================================================
 * DIFERENÇA EM PONTOS PERCENTUAIS
 * =========================================================
 */

function DifferenceValue({
  value,
}: {
  value:
    number | null;
}) {
  if (
    value ===
    null
  ) {
    return (
      <span className="text-sm font-bold text-slate-400">
        Sem dados
      </span>
    );
  }

  if (
    value >
    0
  ) {
    return (
      <span className="text-lg font-bold text-emerald-600">
        +{value} p.p.
      </span>
    );
  }

  if (
    value <
    0
  ) {
    return (
      <span className="text-lg font-bold text-red-600">
        {value} p.p.
      </span>
    );
  }

  return (
    <span className="text-lg font-bold text-slate-600">
      0 p.p.
    </span>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function HistoryPage() {
  const [
    data,
    setData,
  ] =
    useState<ExamHistoryOverview | null>(
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
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    filter,
    setFilter,
  ] =
    useState<HistoryFilter>(
      "all"
    );

  /*
   * =========================================================
   * CARREGAR HISTÓRICO
   * =========================================================
   */

  const loadHistory =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setError(
          null
        );

        try {
          const history =
            await getExamHistoryOverview();

          setData(
            history
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar histórico:",
            loadError
          );

          setData(
            null
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar o histórico."
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
    void loadHistory();
  }, [
    loadHistory,
  ]);

  /*
   * =========================================================
   * FILTRAR
   * =========================================================
   */

  const filteredExams =
    useMemo(() => {
      if (
        !data
      ) {
        return [];
      }

      if (
        filter ===
        "all"
      ) {
        return data.exams;
      }

      return data.exams.filter(
        (exam) =>
          normalizeExamMode(
            exam.mode
          ) ===
          filter
      );
    }, [
      data,
      filter,
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
        title="Carregando histórico..."
        description="Organizando seus simulados, resultados e modalidades de estudo."
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
        title="Não foi possível carregar seu histórico"
        description="Ocorreu um problema ao acessar os simulados armazenados localmente."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadHistory();
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
    !data
  ) {
    return (
      <ErrorState
        fullScreen
        title="Histórico indisponível"
        description="A consulta terminou sem retornar os dados esperados."
        onRetry={() => {
          void loadHistory();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * HISTÓRICO VAZIO
   * =========================================================
   */

  if (
    data.totalExams ===
    0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="🕘"
        eyebrow="Histórico"
        title="Nenhum simulado realizado ainda"
        description="Quando você concluir seu primeiro simulado, os resultados, médias e comparações aparecerão aqui."
        actionLabel="Criar primeiro simulado"
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
            subtitle="Histórico inteligente"
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 max-w-3xl">
              <p className="text-xs font-bold text-[#F4C430] sm:text-sm">
                Seu histórico de estudos
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
                Histórico inteligente
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:mt-4">
                Compare seu desempenho
                entre simulados manuais,
                revisões de erros e provas
                recomendadas pelo sistema.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:min-w-[520px]">
              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] text-blue-100 sm:text-xs">
                  Provas
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.totalExams
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] text-blue-100 sm:text-xs">
                  Média
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.averageScore
                  }
                  %
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-[#F4C430]/20 bg-[#F4C430]/15 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] text-[#FFF3B0] sm:text-xs">
                  Precisão
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.overallAccuracy
                  }
                  %
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESUMO GERAL
        ==================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">
              Simulados realizados
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {
                data.totalExams
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">
              Questões respondidas
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {
                data.totalQuestions
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">
              Média geral
            </p>

            <p className="mt-2 text-2xl font-bold text-[#3B82F6] sm:text-3xl">
              {
                data.averageScore
              }
              %
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">
              Melhor resultado
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-600 sm:text-3xl">
              {
                data.bestScore
              }
              %
            </p>
          </div>
        </section>

        {/* ===================================================
            POR MODALIDADE
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-[#3B82F6]">
            Modalidades
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Desempenho por tipo de simulado
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            As provas antigas sem modalidade
            registrada são consideradas
            simulados manuais.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3 sm:gap-4">
            <ModeStatsCard
              stats={
                data.manual
              }
            />

            <ModeStatsCard
              stats={
                data.review
              }
            />

            <ModeStatsCard
              stats={
                data.recommended
              }
            />
          </div>
        </section>

        {/* ===================================================
            COMPARAÇÃO
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-9 sm:p-6 md:p-7">
          <p className="text-sm font-bold text-violet-600">
            Comparativo
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Como cada método está performando?
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            As diferenças abaixo usam a
            média das notas de cada
            modalidade. Valores positivos
            indicam uma média maior.
          </p>

          <div className="mt-5 grid gap-3 sm:mt-6 md:grid-cols-3 sm:gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold text-slate-400">
                Revisão vs Manual
              </p>

              <div className="mt-2">
                <DifferenceValue
                  value={
                    data.comparison
                      .reviewVsManual
                  }
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Compara sua média em
                revisões de erros com
                simulados manuais.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold text-slate-400">
                Recomendado vs Manual
              </p>

              <div className="mt-2">
                <DifferenceValue
                  value={
                    data.comparison
                      .recommendedVsManual
                  }
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Compara as recomendações
                adaptativas com suas provas
                configuradas manualmente.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold text-slate-400">
                Recomendado vs Revisão
              </p>

              <div className="mt-2">
                <DifferenceValue
                  value={
                    data.comparison
                      .recommendedVsReview
                  }
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Compara o estudo adaptativo
                completo com o treino
                focado somente em erros.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs leading-6 text-slate-600">
              Esses números devem ser
              interpretados com cuidado quando
              existem poucas provas em uma
              modalidade. Conforme seu histórico
              crescer, a comparação ficará mais
              representativa.
            </p>
          </div>
        </section>

        {/* ===================================================
            HISTÓRICO
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#3B82F6]">
                Provas realizadas
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Todos os simulados
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {
                  filteredExams.length
                }{" "}
                {filteredExams.length ===
                1
                  ? "prova encontrada"
                  : "provas encontradas"}
              </p>
            </div>

            {/* ===============================================
                FILTROS
            ================================================= */}

            <div
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              role="group"
              aria-label="Filtrar histórico por modalidade"
            >
              {historyFilters.map(
                (
                  item
                ) => {
                  const selected =
                    filter ===
                    item.id;

                  return (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      aria-pressed={
                        selected
                      }
                      onClick={() =>
                        setFilter(
                          item.id
                        )
                      }
                      className={`min-h-11 rounded-xl border px-3 py-2.5 text-xs font-bold transition sm:px-4 ${
                        selected
                          ? "border-[#0B2D6B] bg-[#0B2D6B] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <span className="sm:hidden">
                        {
                          item.shortLabel
                        }
                      </span>

                      <span className="hidden sm:inline">
                        {
                          item.label
                        }
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* ===============================================
              SEM RESULTADOS NO FILTRO
          ================================================= */}

          {filteredExams.length ===
          0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-10">
              <div
                className="text-4xl"
                aria-hidden="true"
              >
                🔎
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Nenhuma prova nesta modalidade
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Você possui histórico,
                mas ainda não realizou
                simulados neste modo.
              </p>

              <div className="mt-5 grid gap-3 sm:flex sm:justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setFilter(
                      "all"
                    )
                  }
                  className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Mostrar todos
                </button>

                <Link
                  href="/simulado/novo"
                  className="min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
                >
                  Novo simulado
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {filteredExams.map(
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
                      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-5 md:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* ===================================
                            INFORMAÇÕES
                        ==================================== */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-[11px] ${modeInfo.badgeClass}`}
                            >
                              {
                                modeInfo.icon
                              }{" "}
                              {
                                modeInfo.label
                              }
                            </span>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:px-3 sm:text-[11px]">
                              {getDifficultyLabel(
                                exam.difficulty
                              )}
                            </span>
                          </div>

                          <p className="mt-3 break-words text-[10px] text-slate-400 sm:mt-4 sm:text-xs">
                            {formatDate(
                              exam.submittedAt
                            )}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {exam.subjects.map(
                              (
                                subject
                              ) => (
                                <span
                                  key={
                                    subject
                                  }
                                  className="max-w-full break-words rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700 sm:text-xs"
                                >
                                  {getSubjectName(
                                    subject
                                  )}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* ===================================
                            ESTATÍSTICAS
                        ==================================== */}

                        <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:shrink-0">
                          <div className="rounded-xl bg-slate-50 px-3 py-3 text-center sm:px-4">
                            <p className="text-[9px] text-slate-400 sm:text-[10px]">
                              Nota
                            </p>

                            <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                              {
                                exam.percentage
                              }
                              %
                            </p>
                          </div>

                          <div className="rounded-xl bg-emerald-50 px-3 py-3 text-center sm:px-4">
                            <p className="text-[9px] text-emerald-500 sm:text-[10px]">
                              Acertos
                            </p>

                            <p className="mt-1 text-lg font-bold text-emerald-700 sm:text-xl">
                              {
                                exam.correct
                              }
                              /
                              {
                                exam.totalQuestions
                              }
                            </p>
                          </div>

                          <div className="rounded-xl bg-slate-50 px-3 py-3 text-center sm:px-4">
                            <p className="text-[9px] text-slate-400 sm:text-[10px]">
                              Tempo
                            </p>

                            <p className="mt-1 break-words text-xs font-bold text-slate-700 sm:text-sm">
                              {formatDuration(
                                exam.durationSeconds
                              )}
                            </p>
                          </div>

                          <Link
                            href={`/historico/${exam.id}`}
                            className="flex min-h-[58px] items-center justify-center rounded-xl bg-[#0B2D6B] px-3 py-3 text-center text-xs font-bold text-white transition hover:bg-[#174EA6] sm:px-4"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:mt-9 sm:flex sm:flex-wrap sm:justify-between">
          <Link
            href="/"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            ← Voltar ao painel
          </Link>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/recomendado"
              className="min-h-12 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
            >
              ✨ Recomendado
            </Link>

            <Link
              href="/revisao"
              className="min-h-12 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-100"
            >
              🎯 Treinar erros
            </Link>

            <Link
              href="/simulado/novo"
              className="min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
            >
              Novo simulado
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Histórico armazenado localmente
          no seu navegador.
        </footer>
      </div>
    </main>
  );
}