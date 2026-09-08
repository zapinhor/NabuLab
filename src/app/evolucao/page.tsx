"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getSubjectEvolutionSummary,
  type EvolutionTrend,
  type SubjectEvolution,
  type SubjectEvolutionSummary,
} from "@/lib/subject-evolution";

import SubjectEvolutionChart from "@/components/evolution/subject-evolution-chart";

import {
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

import type {
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * TENDÊNCIA
 * =========================================================
 */

function getTrendInfo(
  trend:
    EvolutionTrend
) {
  switch (
    trend
  ) {
    case "subindo":
      return {
        label:
          "Melhorando",

        icon:
          "↗",

        badge:
          "border-emerald-200 bg-emerald-50 text-emerald-700",

        text:
          "text-emerald-600",

        background:
          "bg-emerald-50",
      };

    case "caindo":
      return {
        label:
          "Em queda",

        icon:
          "↘",

        badge:
          "border-red-200 bg-red-50 text-red-700",

        text:
          "text-red-600",

        background:
          "bg-red-50",
      };

    case "estavel":
      return {
        label:
          "Estável",

        icon:
          "→",

        badge:
          "border-blue-200 bg-blue-50 text-blue-700",

        text:
          "text-blue-600",

        background:
          "bg-blue-50",
      };

    default:
      return {
        label:
          "Poucos dados",

        icon:
          "•",

        badge:
          "border-slate-200 bg-slate-50 text-slate-500",

        text:
          "text-slate-500",

        background:
          "bg-slate-50",
      };
  }
}

/*
 * =========================================================
 * CONFIANÇA
 * =========================================================
 */

function getConfidenceLabel(
  confidence:
    SubjectEvolution["confidence"]
) {
  switch (
    confidence
  ) {
    case "alta":
      return "Alta confiança";

    case "media":
      return "Confiança moderada";

    default:
      return "Baixa confiança";
  }
}

/*
 * =========================================================
 * CARD DE MATÉRIA
 * =========================================================
 */

function SubjectEvolutionCard({
  subject,
  selected,
  onSelect,
}: {
  subject:
    SubjectEvolution;

  selected:
    boolean;

  onSelect:
    () => void;
}) {
  const trendInfo =
    getTrendInfo(
      subject.trend
    );

  return (
    <button
      type="button"
      onClick={
        onSelect
      }
      aria-pressed={
        selected
      }
      className={`min-w-0 w-full rounded-2xl border bg-white p-4 text-left shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 sm:p-5 ${
        selected
          ? "border-[#3B82F6] ring-2 ring-blue-100"
          : "border-slate-200 hover:border-blue-200 hover:shadow-md"
      }`}
    >
      {/* ===================================================
          CABEÇALHO
      ==================================================== */}

      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl sm:h-12 sm:w-12 sm:text-2xl">
            {
              subject.icon
            }
          </div>

          <div className="min-w-0">
            <p className="break-words text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
              {
                subject.area
              }
            </p>

            <h3 className="mt-0.5 break-words text-sm font-bold leading-5 text-slate-900 sm:text-base">
              {
                subject.subjectName
              }
            </h3>
          </div>
        </div>

        {subject.totalExams >
        0 ? (
          <span className="shrink-0 text-lg font-bold text-[#3B82F6] sm:text-xl">
            {
              subject.currentScore
            }
            %
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-400 sm:text-xs">
            Sem dados
          </span>
        )}
      </div>

      {/* ===================================================
          TENDÊNCIA
      ==================================================== */}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 sm:mt-5 sm:gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${trendInfo.badge}`}
        >
          {
            trendInfo.icon
          }{" "}
          {
            trendInfo.label
          }
        </span>

        <span className="text-[10px] text-slate-400 sm:text-xs">
          {
            subject.totalExams
          }{" "}
          {subject.totalExams ===
          1
            ? "prova"
            : "provas"}
        </span>
      </div>

      {/* ===================================================
          MÉTRICAS
      ==================================================== */}

      {subject.totalExams >
        0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 sm:p-3">
            <p className="text-[9px] text-slate-400 sm:text-[10px]">
              Média histórica
            </p>

            <p className="mt-1 font-bold text-slate-800">
              {
                subject.averageScore
              }
              %
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 sm:p-3">
            <p className="text-[9px] text-slate-400 sm:text-[10px]">
              Últimas 3
            </p>

            <p className="mt-1 font-bold text-slate-800">
              {
                subject.recentAverage
              }
              %
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function SubjectEvolutionPage() {
  const [
    data,
    setData,
  ] =
    useState<SubjectEvolutionSummary | null>(
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
    selectedSubjectId,
    setSelectedSubjectId,
  ] =
    useState<SubjectId | null>(
      null
    );

  /*
   * =========================================================
   * CARREGAR EVOLUÇÃO
   * =========================================================
   */

  const loadEvolution =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setError(
          null
        );

        try {
          const summary =
            await getSubjectEvolutionSummary();

          setData(
            summary
          );

          const firstWithData =
            summary.subjects.find(
              (subject) =>
                subject.totalExams >
                0
            );

          setSelectedSubjectId(
            firstWithData
              ?.subject ??
              summary.subjects[0]
                ?.subject ??
              null
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar evolução:",
            loadError
          );

          setData(
            null
          );

          setSelectedSubjectId(
            null
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar a evolução."
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
    void loadEvolution();
  }, [
    loadEvolution,
  ]);

  /*
   * =========================================================
   * MATÉRIA SELECIONADA
   * =========================================================
   */

  const selectedSubject =
    useMemo(() => {
      if (
        !data ||
        !selectedSubjectId
      ) {
        return null;
      }

      return (
        data.subjects.find(
          (subject) =>
            subject.subject ===
            selectedSubjectId
        ) ??
        null
      );
    }, [
      data,
      selectedSubjectId,
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
        title="Calculando sua evolução..."
        description="Comparando seu desempenho ao longo dos simulados."
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
        title="Não foi possível calcular sua evolução"
        description="O histórico local não pôde ser analisado."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadEvolution();
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
        title="Dados de evolução indisponíveis"
        description="A consulta terminou sem retornar os dados esperados."
        onRetry={() => {
          void loadEvolution();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * TENDÊNCIA SELECIONADA
   * =========================================================
   */

  const selectedTrendInfo =
    selectedSubject
      ? getTrendInfo(
          selectedSubject.trend
        )
      : null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <NabuLabBrand
            subtitle="Evolução por matéria"
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
                Tendências de aprendizado
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
                Evolução por matéria
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:mt-4">
                Veja como seu desempenho está
                mudando em cada disciplina.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:min-w-[520px]">
              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Melhorando
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.improvingSubjects
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Estáveis
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.stableSubjects
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-[#F4C430]/20 bg-[#F4C430]/15 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-[#FFF3B0] sm:text-xs">
                  Em queda
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.decliningSubjects
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            MATÉRIAS
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-[#3B82F6]">
            Disciplinas
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Selecione uma matéria
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            O percentual em destaque representa
            seu desempenho na aparição mais
            recente daquela matéria.
          </p>

          <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.subjects.map(
              (
                subject
              ) => (
                <SubjectEvolutionCard
                  key={
                    subject.subject
                  }
                  subject={
                    subject
                  }
                  selected={
                    selectedSubjectId ===
                    subject.subject
                  }
                  onSelect={() =>
                    setSelectedSubjectId(
                      subject.subject
                    )
                  }
                />
              )
            )}
          </div>
        </section>

        {/* ===================================================
            DETALHES DA MATÉRIA
        ==================================================== */}

        {selectedSubject && (
          <section className="mt-8 sm:mt-10">
            {/* ===============================================
                RESUMO
            ================================================= */}

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                    {
                      selectedSubject.icon
                    }
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-[10px] font-semibold text-slate-400 sm:text-xs">
                      {
                        selectedSubject.area
                      }
                    </p>

                    <h2 className="mt-1 break-words text-xl font-bold leading-7 text-slate-900 sm:text-2xl">
                      {
                        selectedSubject.subjectName
                      }
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTrendInfo && (
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${selectedTrendInfo.badge}`}
                        >
                          {
                            selectedTrendInfo.icon
                          }{" "}
                          {
                            selectedTrendInfo.label
                          }
                        </span>
                      )}

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
                        {getConfidenceLabel(
                          selectedSubject.confidence
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-left lg:bg-transparent lg:p-0 lg:text-right">
                  <p className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                    Último desempenho
                  </p>

                  <p className="mt-1 text-3xl font-bold text-[#3B82F6] sm:text-4xl">
                    {
                      selectedSubject.currentScore
                    }
                    %
                  </p>
                </div>
              </div>

              {/* =============================================
                  MÉTRICAS
              ============================================== */}

              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-3 xl:grid-cols-5">
                <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Média
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                    {
                      selectedSubject.averageScore
                    }
                    %
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-blue-50 p-3 sm:p-4">
                  <p className="text-[10px] text-blue-500 sm:text-xs">
                    Últimas 3
                  </p>

                  <p className="mt-1 text-lg font-bold text-blue-700 sm:text-xl">
                    {
                      selectedSubject.recentAverage
                    }
                    %
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-emerald-50 p-3 sm:p-4">
                  <p className="text-[10px] text-emerald-500 sm:text-xs">
                    Melhor
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-700 sm:text-xl">
                    {
                      selectedSubject.bestScore
                    }
                    %
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-red-50 p-3 sm:p-4">
                  <p className="text-[10px] text-red-400 sm:text-xs">
                    Pior
                  </p>

                  <p className="mt-1 text-lg font-bold text-red-600 sm:text-xl">
                    {
                      selectedSubject.worstScore
                    }
                    %
                  </p>
                </div>

                <div className="col-span-2 min-w-0 rounded-xl bg-violet-50 p-3 sm:col-span-1 sm:p-4">
                  <p className="text-[10px] text-violet-500 sm:text-xs">
                    Variação total
                  </p>

                  <p
                    className={`mt-1 break-words text-lg font-bold sm:text-xl ${
                      selectedSubject.totalChange >
                      0
                        ? "text-emerald-600"
                        : selectedSubject.totalChange <
                            0
                          ? "text-red-600"
                          : "text-slate-700"
                    }`}
                  >
                    {selectedSubject.totalChange >
                    0
                      ? "+"
                      : ""}
                    {
                      selectedSubject.totalChange
                    }{" "}
                    p.p.
                  </p>
                </div>
              </div>
            </div>

            {/* ===============================================
                GRÁFICO
            ================================================= */}

            <div className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-5 md:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#3B82F6]">
                    Histórico
                  </p>

                  <h3 className="mt-1 break-words text-lg font-bold text-slate-900 sm:text-xl">
                    Desempenho ao longo das provas
                  </h3>

                  <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
                    Cada ponto representa uma
                    prova que continha pelo
                    menos uma questão desta
                    matéria.
                  </p>
                </div>

                {selectedSubject.totalExams >
                  1 &&
                  selectedTrendInfo && (
                  <div
                    className={`shrink-0 rounded-xl px-3 py-3 sm:px-4 ${selectedTrendInfo.background}`}
                  >
                    <p className="text-[9px] font-semibold text-slate-400 sm:text-[10px]">
                      Tendência aproximada
                    </p>

                    <p
                      className={`mt-1 text-sm font-bold sm:text-base ${selectedTrendInfo.text}`}
                    >
                      {selectedSubject.slope >
                      0
                        ? "+"
                        : ""}
                      {
                        selectedSubject.slope
                      }{" "}
                      p.p. / prova
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 min-w-0 overflow-hidden sm:mt-7">
                <SubjectEvolutionChart
                  data={
                    selectedSubject.points
                  }
                />
              </div>

              {selectedSubject.points.length <
                2 && (
                <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                  Com apenas uma aparição ainda
                  não é possível identificar uma
                  tendência de evolução. Continue
                  realizando simulados desta
                  matéria.
                </p>
              )}
            </div>

            {/* ===============================================
                ÚLTIMAS APARIÇÕES
            ================================================= */}

            {selectedSubject.points.length >
              0 && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Últimas aparições
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Até cinco provas mais recentes.
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                    {
                      selectedSubject.totalExams
                    }{" "}
                    {selectedSubject.totalExams ===
                    1
                      ? "prova registrada"
                      : "provas registradas"}
                  </span>
                </div>

                <div className="mt-4 space-y-3 sm:mt-5">
                  {[...selectedSubject.points]
                    .reverse()
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        point
                      ) => (
                        <Link
                          key={
                            point.examId
                          }
                          href={`/historico/${point.examId}`}
                          className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50/40 sm:p-4"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="break-words text-[10px] font-bold leading-5 text-slate-500 sm:text-xs">
                              Prova #
                              {
                                point.examNumber
                              }{" "}
                              •{" "}
                              {
                                point.dateLabel
                              }
                            </p>

                            <p className="mt-1 break-words text-[10px] leading-5 text-slate-400 sm:text-xs">
                              {
                                point.correct
                              }{" "}
                              de{" "}
                              {
                                point.totalQuestions
                              }{" "}
                              questões corretas
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-lg font-bold text-[#3B82F6] sm:text-xl">
                              {
                                point.percentage
                              }
                              %
                            </p>

                            <p className="mt-0.5 text-[9px] font-semibold text-blue-500 opacity-0 transition group-hover:opacity-100 sm:text-[10px]">
                              Detalhes →
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ===================================================
            EXPLICAÇÃO
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:mt-9 sm:p-6">
          <h3 className="font-bold text-blue-900">
            Como a tendência é calculada?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            O sistema observa até as seis
            aparições mais recentes daquela
            matéria e calcula a direção geral
            das notas. Com poucas provas, a
            tendência recebe menor confiança.
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
              href="/recomendado"
              className="min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
            >
              ✨ Simulado recomendado
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Tendências calculadas a partir
          do histórico local de simulados.
        </footer>
      </div>
    </main>
  );
}