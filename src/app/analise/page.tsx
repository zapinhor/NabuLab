"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPerformanceAnalysis,
  type ContentPerformance,
  type PerformanceAnalysis,
} from "@/lib/performance-analysis";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

/*
 * =========================================================
 * CORES / STATUS
 * =========================================================
 */

function getPerformanceInfo(
  percentage: number
) {
  if (
    percentage >= 85
  ) {
    return {
      label:
        "Ponto forte",

      badge:
        "bg-emerald-50 text-emerald-700 border-emerald-200",

      bar:
        "bg-emerald-500",

      text:
        "text-emerald-600",
    };
  }

  if (
    percentage >= 70
  ) {
    return {
      label:
        "Bom desempenho",

      badge:
        "bg-blue-50 text-blue-700 border-blue-200",

      bar:
        "bg-blue-500",

      text:
        "text-blue-600",
    };
  }

  if (
    percentage >= 50
  ) {
    return {
      label:
        "Atenção",

      badge:
        "bg-amber-50 text-amber-700 border-amber-200",

      bar:
        "bg-amber-500",

      text:
        "text-amber-600",
    };
  }

  return {
    label:
      "Prioridade de revisão",

    badge:
      "bg-red-50 text-red-700 border-red-200",

    bar:
      "bg-red-500",

    text:
      "text-red-600",
  };
}

/*
 * =========================================================
 * CONFIANÇA
 * =========================================================
 */

function getConfidenceText(
  confidence:
    ContentPerformance["confidence"]
) {
  switch (
    confidence
  ) {
    case "alta":
      return "Boa amostra";

    case "media":
      return "Amostra moderada";

    default:
      return "Poucos dados";
  }
}

/*
 * =========================================================
 * CARD DE CONTEÚDO
 * =========================================================
 */

function PerformanceCard({
  item,
}: {
  item:
    ContentPerformance;
}) {
  const performance =
    getPerformanceInfo(
      item.percentage
    );

  const visualPercentage =
    Math.min(
      100,
      Math.max(
        0,
        item.percentage
      )
    );

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`h-1 ${performance.bar}`}
      />

      <div className="p-4 sm:p-5">
        {/* =================================================
            CABEÇALHO
        ================================================== */}

        <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <p className="break-words text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
              {
                item.subjectName
              }
            </p>

            <h3 className="mt-1 break-words text-sm font-bold leading-6 text-slate-900 sm:text-base">
              {
                item.subtopic ??
                item.topic
              }
            </h3>

            {item.subtopic && (
              <p className="mt-1 break-words text-[10px] leading-5 text-slate-400 sm:text-xs">
                {
                  item.topic
                }
              </p>
            )}
          </div>

          <p
            className={`shrink-0 text-xl font-bold sm:text-2xl ${performance.text}`}
          >
            {
              item.percentage
            }
            %
          </p>
        </div>

        {/* =================================================
            BARRA
        ================================================== */}

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`Desempenho em ${
            item.subtopic ??
            item.topic
          }`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={
            visualPercentage
          }
        >
          <div
            className={`h-full rounded-full ${performance.bar}`}
            style={{
              width:
                `${visualPercentage}%`,
            }}
          />
        </div>

        {/* =================================================
            STATUS
        ================================================== */}

        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
          <span
            className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${performance.badge}`}
          >
            {
              performance.label
            }
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500 sm:text-[10px]">
            {getConfidenceText(
              item.confidence
            )}
          </span>
        </div>

        {/* =================================================
            MÉTRICAS
        ================================================== */}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-slate-400 sm:text-[10px]">
              Questões
            </p>

            <strong className="mt-1 block text-slate-800">
              {
                item.total
              }
            </strong>
          </div>

          <div className="min-w-0 rounded-xl bg-emerald-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-emerald-500 sm:text-[10px]">
              Acertos
            </p>

            <strong className="mt-1 block text-emerald-700">
              {
                item.correct
              }
            </strong>
          </div>

          <div className="min-w-0 rounded-xl bg-red-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-red-400 sm:text-[10px]">
              Erros
            </p>

            <strong className="mt-1 block text-red-600">
              {
                item.incorrect
              }
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}

/*
 * =========================================================
 * ESTADO VAZIO DE SEÇÃO
 * =========================================================
 */

function SectionEmpty({
  icon,
  title,
  description,
}: {
  icon:
    string;

  title:
    string;

  description:
    string;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-8">
      <div
        className="text-3xl"
        aria-hidden="true"
      >
        {
          icon
        }
      </div>

      <p className="mt-3 text-sm font-bold text-slate-800">
        {
          title
        }
      </p>

      <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-slate-500">
        {
          description
        }
      </p>
    </div>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function AnalysisPage() {
  const [
    analysis,
    setAnalysis,
  ] =
    useState<PerformanceAnalysis | null>(
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

  /*
   * =========================================================
   * CARREGAR
   * =========================================================
   */

  const loadAnalysis =
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
            await getPerformanceAnalysis();

          setAnalysis(
            data
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar análise:",
            loadError
          );

          setAnalysis(
            null
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível analisar seu desempenho."
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
    void loadAnalysis();
  }, [
    loadAnalysis,
  ]);

  /*
   * =========================================================
   * MATÉRIAS COM DADOS
   * =========================================================
   */

  const subjectRanking =
    useMemo(() => {
      if (
        !analysis
      ) {
        return [];
      }

      return [
        ...analysis.subjects,
      ]
        .filter(
          (subject) =>
            subject.total >
            0
        )
        .sort(
          (
            a,
            b
          ) =>
            b.percentage -
            a.percentage
        );
    }, [
      analysis,
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
        title="Analisando seu desempenho..."
        description="Comparando matérias, tópicos, subtópicos, acertos e erros do seu histórico."
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
        title="Não foi possível analisar seu desempenho"
        description="O sistema encontrou um problema ao acessar ou processar seu histórico."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadAnalysis();
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
    !analysis
  ) {
    return (
      <ErrorState
        fullScreen
        title="Dados de análise indisponíveis"
        description="A consulta terminou sem retornar as informações necessárias."
        onRetry={() => {
          void loadAnalysis();
        }}
        actionLabel="Voltar ao painel"
        actionHref="/"
      />
    );
  }

  /*
   * =========================================================
   * SEM HISTÓRICO
   * =========================================================
   */

  if (
    analysis.totalAnswers ===
    0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="📊"
        eyebrow="Análise de desempenho"
        title="Ainda não há dados para analisar"
        description="Finalize alguns simulados para começarmos a identificar seus pontos fortes, dificuldades e conteúdos que precisam de revisão."
        actionLabel="Criar primeiro simulado"
        actionHref="/simulado/novo"
        secondaryLabel="Voltar ao painel"
        secondaryHref="/"
      />
    );
  }

  /*
   * =========================================================
   * MAIS FORTE / MAIS FRACA
   * =========================================================
   */

  const strongestSubject =
    subjectRanking[0];

  const weakestSubject =
    subjectRanking[
      subjectRanking.length -
      1
    ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <NabuLabBrand
            subtitle="Análise de desempenho"
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
            Análise personalizada
          </p>

          <h1 className="mt-2 max-w-4xl break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Entenda onde você está indo bem
            e onde precisa revisar.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50 sm:mt-4">
            Os dados abaixo são calculados
            automaticamente a partir de todas
            as questões realizadas no seu
            histórico.
          </p>

          {/* ===============================================
              RESUMO
          ================================================= */}

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
            <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
              <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                Questões
                <span className="hidden sm:inline">
                  {" "}
                  analisadas
                </span>
              </p>

              <p className="mt-1 break-words text-xl font-bold sm:mt-2 sm:text-2xl">
                {
                  analysis.totalAnswers
                }
              </p>
            </div>

            <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
              <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                Acertos
              </p>

              <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                {
                  analysis.totalCorrect
                }
              </p>
            </div>

            <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
              <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                Precisão
                <span className="hidden sm:inline">
                  {" "}
                  geral
                </span>
              </p>

              <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                {
                  analysis.overallPercentage
                }
                %
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            DESTAQUES
        ==================================================== */}

        {strongestSubject &&
          weakestSubject && (
          <section className="mt-5 grid gap-3 sm:mt-7 sm:gap-4 md:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase leading-4 tracking-wider text-emerald-600 sm:text-xs">
                Matéria com melhor desempenho
              </p>

              <h2 className="mt-2 break-words text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                {
                  strongestSubject.subjectName
                }
              </h2>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-emerald-600">
                  {
                    strongestSubject.percentage
                  }
                  %
                </p>

                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  🏆
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {
                  strongestSubject.correct
                }{" "}
                de{" "}
                {
                  strongestSubject.total
                }{" "}
                questões corretas.
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase leading-4 tracking-wider text-red-600 sm:text-xs">
                Maior prioridade de revisão
              </p>

              <h2 className="mt-2 break-words text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                {
                  weakestSubject.subjectName
                }
              </h2>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-red-600">
                  {
                    weakestSubject.percentage
                  }
                  %
                </p>

                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  🎯
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {
                  weakestSubject.correct
                }{" "}
                de{" "}
                {
                  weakestSubject.total
                }{" "}
                questões corretas.
              </p>
            </div>
          </section>
        )}

        {/* ===================================================
            MATÉRIAS
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-blue-600">
            Visão geral
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Desempenho por matéria
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Apenas matérias que já apareceram
            em seus simulados entram neste
            ranking.
          </p>

          {subjectRanking.length ===
          0 ? (
            <SectionEmpty
              icon="📚"
              title="Nenhuma matéria possui dados"
              description="Conclua simulados com questões de diferentes matérias para construir este comparativo."
            />
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {subjectRanking.map(
                (
                  subject,
                  index
                ) => {
                  const info =
                    getPerformanceInfo(
                      subject.percentage
                    );

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
                        subject.subject
                      }
                      className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div
                        className={`h-1 ${info.bar}`}
                      />

                      <div className="p-4 sm:p-5">
                        <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="break-words text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
                              {
                                subject.area
                              }
                            </p>

                            <h3 className="mt-1 break-words text-sm font-bold leading-6 text-slate-900 sm:text-base">
                              {
                                subject.subjectName
                              }
                            </h3>

                            <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
                              #{index + 1} no ranking
                            </span>
                          </div>

                          <strong
                            className={`shrink-0 text-xl ${info.text}`}
                          >
                            {
                              subject.percentage
                            }
                            %
                          </strong>
                        </div>

                        <div
                          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                          role="progressbar"
                          aria-label={`Desempenho em ${subject.subjectName}`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={
                            visualPercentage
                          }
                        >
                          <div
                            className={`h-full rounded-full ${info.bar}`}
                            style={{
                              width:
                                `${visualPercentage}%`,
                            }}
                          />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center">
                            <p className="text-[8px] text-slate-400 sm:text-[10px]">
                              Questões
                            </p>

                            <strong className="mt-1 block text-slate-700">
                              {
                                subject.total
                              }
                            </strong>
                          </div>

                          <div className="min-w-0 rounded-xl bg-emerald-50 p-2.5 text-center">
                            <p className="text-[8px] text-emerald-500 sm:text-[10px]">
                              Acertos
                            </p>

                            <strong className="mt-1 block text-emerald-700">
                              {
                                subject.correct
                              }
                            </strong>
                          </div>

                          <div className="min-w-0 rounded-xl bg-red-50 p-2.5 text-center">
                            <p className="text-[8px] text-red-400 sm:text-[10px]">
                              Erros
                            </p>

                            <strong className="mt-1 block text-red-600">
                              {
                                subject.incorrect
                              }
                            </strong>
                          </div>
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
            PRECISA REVISAR
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <p className="text-sm font-bold text-red-600">
            Prioridade
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Conteúdos para revisar
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Os tópicos com menor índice de
            acertos aparecem primeiro.
          </p>

          {analysis.weakestTopics.length ===
          0 ? (
            <SectionEmpty
              icon="🎯"
              title="Nenhum tópico priorizado"
              description="Ainda não existem dados suficientes para definir quais tópicos precisam de maior revisão."
            />
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analysis.weakestTopics.map(
                (
                  item
                ) => (
                  <PerformanceCard
                    key={
                      item.key
                    }
                    item={
                      item
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            PONTOS FORTES
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <p className="text-sm font-bold text-emerald-600">
            Pontos fortes
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Conteúdos com melhor desempenho
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Conteúdos em que seus resultados
            já demonstram maior consistência.
          </p>

          {analysis.strongestTopics.length ===
          0 ? (
            <SectionEmpty
              icon="🌱"
              title="Seus pontos fortes ainda estão se formando"
              description="Conforme você responder mais questões, os tópicos com melhor desempenho aparecerão aqui."
            />
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analysis.strongestTopics.map(
                (
                  item
                ) => (
                  <PerformanceCard
                    key={
                      item.key
                    }
                    item={
                      item
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            SUBTÓPICOS FRACOS
        ==================================================== */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-10 sm:p-6 md:p-7">
          <div>
            <p className="text-sm font-bold text-blue-600">
              Análise aprofundada
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Subtópicos que merecem atenção
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Aqui a análise fica mais
              específica do que apenas
              matéria ou tópico.
            </p>
          </div>

          {analysis.weakestSubtopics.length ===
          0 ? (
            <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center sm:mt-6 sm:p-8">
              <div
                className="text-3xl"
                aria-hidden="true"
              >
                🔬
              </div>

              <p className="mt-3 text-sm font-bold text-slate-800">
                Ainda não há subtópicos suficientes
              </p>

              <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-slate-500">
                Responda questões de mais
                conteúdos para permitir uma
                análise detalhada por subtópico.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:mt-6 md:grid-cols-2">
              {analysis.weakestSubtopics.map(
                (
                  item
                ) => (
                  <PerformanceCard
                    key={
                      item.key
                    }
                    item={
                      item
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            AVISO DE AMOSTRA
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <h3 className="font-bold text-blue-900">
            Como interpretar os dados?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Um desempenho de 0% após apenas
            uma questão ainda não significa que
            você não domina aquele conteúdo.
            Por isso, cada card também informa
            se existem poucos dados, uma amostra
            moderada ou uma boa amostra. Quanto
            mais simulados você fizer, mais
            confiável será a análise.
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
              href="/revisao"
              className="min-h-12 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-center text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
              🎯 Treinar erros
            </Link>

            <Link
              href="/simulado/novo"
              className="min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
            >
              Fazer novo simulado
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Análise baseada no histórico
          permanente armazenado neste
          navegador.
        </footer>
      </div>
    </main>
  );
}