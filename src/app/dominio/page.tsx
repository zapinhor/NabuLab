"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getMasterySummary,
  type MasteryItem,
  type MasteryLevel,
  type MasterySummary,
  type SubjectMastery,
} from "@/lib/mastery-queries";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

import type {
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * VISUAL DOS NÍVEIS
 * =========================================================
 */

function getMasteryInfo(
  level: MasteryLevel
) {
  switch (level) {
    case "dominado":
      return {
        label:
          "Dominado",

        symbol:
          "●",

        badge:
          "border-emerald-200 bg-emerald-50 text-emerald-700",

        bar:
          "bg-emerald-500",

        text:
          "text-emerald-600",
      };

    case "bom-dominio":
      return {
        label:
          "Bom domínio",

        symbol:
          "◕",

        badge:
          "border-blue-200 bg-blue-50 text-blue-700",

        bar:
          "bg-blue-500",

        text:
          "text-blue-600",
      };

    case "em-aprendizado":
      return {
        label:
          "Em aprendizado",

        symbol:
          "◑",

        badge:
          "border-violet-200 bg-violet-50 text-violet-700",

        bar:
          "bg-violet-500",

        text:
          "text-violet-600",
      };

    case "precisa-revisar":
      return {
        label:
          "Precisa revisar",

        symbol:
          "◑",

        badge:
          "border-red-200 bg-red-50 text-red-700",

        bar:
          "bg-red-500",

        text:
          "text-red-600",
      };

    case "poucos-dados":
      return {
        label:
          "Poucos dados",

        symbol:
          "◔",

        badge:
          "border-amber-200 bg-amber-50 text-amber-700",

        bar:
          "bg-amber-400",

        text:
          "text-amber-600",
      };

    default:
      return {
        label:
          "Não estudado",

        symbol:
          "○",

        badge:
          "border-slate-200 bg-slate-50 text-slate-500",

        bar:
          "bg-slate-300",

        text:
          "text-slate-400",
      };
  }
}

/*
 * =========================================================
 * CARD DE TÓPICO / SUBTÓPICO
 * =========================================================
 */

function MasteryContentCard({
  item,
}: {
  item: MasteryItem;
}) {
  const info =
    getMasteryInfo(
      item.level
    );

  const accuracy =
    Math.min(
      100,
      Math.max(
        0,
        item.accuracy
      )
    );

  const coverage =
    Math.min(
      100,
      Math.max(
        0,
        item.coveragePercentage
      )
    );

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`h-1 ${info.bar}`}
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

          <span
            className={`shrink-0 text-xl font-bold sm:text-2xl ${info.text}`}
            aria-hidden="true"
          >
            {
              info.symbol
            }
          </span>
        </div>

        {/* =================================================
            BADGES
        ================================================== */}

        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
          <span
            className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${info.badge}`}
          >
            {
              info.label
            }
          </span>

          {item.attempts >
            0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500 sm:text-[10px]">
              {
                item.accuracy
              }
              % de acertos
            </span>
          )}
        </div>

        {/* =================================================
            PRECISÃO
        ================================================== */}

        <div className="mt-4 sm:mt-5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Precisão
            </span>

            <strong className="shrink-0 text-slate-700">
              {
                item.accuracy
              }
              %
            </strong>
          </div>

          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label={`Precisão em ${
              item.subtopic ??
              item.topic
            }`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              accuracy
            }
          >
            <div
              className={`h-full rounded-full ${info.bar}`}
              style={{
                width:
                  `${accuracy}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            COBERTURA
        ================================================== */}

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Cobertura
              <span className="hidden sm:inline">
                {" "}
                do conteúdo
              </span>
            </span>

            <strong className="shrink-0 text-slate-700">
              {
                item.coveragePercentage
              }
              %
            </strong>
          </div>

          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label={`Cobertura em ${
              item.subtopic ??
              item.topic
            }`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              coverage
            }
          >
            <div
              className="h-full rounded-full bg-slate-400"
              style={{
                width:
                  `${coverage}%`,
              }}
            />
          </div>
        </div>

        {/* =================================================
            MÉTRICAS
        ================================================== */}

        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
          <div className="min-w-0 rounded-xl bg-slate-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-slate-400 sm:text-[10px]">
              Tentativas
            </p>

            <p className="mt-1 font-bold text-slate-800">
              {
                item.attempts
              }
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-blue-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-blue-400 sm:text-[10px]">
              Recentes
            </p>

            <p className="mt-1 font-bold text-blue-700">
              {
                item.recentAccuracy
              }
              %
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-emerald-50 p-2.5 text-center sm:p-3">
            <p className="text-[8px] text-emerald-500 sm:text-[10px]">
              Sequência
            </p>

            <p className="mt-1 font-bold text-emerald-700">
              {
                item.correctStreak
              }
            </p>
          </div>
        </div>

        <p className="mt-3 break-words text-[10px] leading-5 text-slate-400 sm:mt-4 sm:text-[11px]">
          {
            item.uniqueQuestionsSeen
          }{" "}
          de{" "}
          {
            item.totalQuestionsAvailable
          }{" "}
          questões diferentes vistas.
        </p>
      </div>
    </article>
  );
}

/*
 * =========================================================
 * CARD DE MATÉRIA
 * =========================================================
 */

function SubjectCard({
  subject,
  selected,
  onSelect,
}: {
  subject:
    SubjectMastery;

  selected:
    boolean;

  onSelect:
    () => void;
}) {
  const info =
    getMasteryInfo(
      subject.level
    );

  const accuracy =
    Math.min(
      100,
      Math.max(
        0,
        subject.accuracy
      )
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

        <span
          className={`shrink-0 text-xl font-bold sm:text-2xl ${info.text}`}
          aria-hidden="true"
        >
          {
            info.symbol
          }
        </span>
      </div>

      {/* ===================================================
          NÍVEL + PRECISÃO
      ==================================================== */}

      <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
        <span
          className={`rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${info.badge}`}
        >
          {
            info.label
          }
        </span>

        {subject.attempts >
        0 ? (
          <strong className="shrink-0 text-base text-slate-900 sm:text-lg">
            {
              subject.accuracy
            }
            %
          </strong>
        ) : (
          <span className="shrink-0 text-[10px] text-slate-400 sm:text-xs">
            Sem tentativas
          </span>
        )}
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 sm:mt-4"
        role="progressbar"
        aria-label={`Precisão em ${subject.subjectName}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={
          accuracy
        }
      >
        <div
          className={`h-full rounded-full ${info.bar}`}
          style={{
            width:
              `${accuracy}%`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[10px] text-slate-500 sm:mt-4 sm:text-xs">
        <span>
          {
            subject.attempts
          }{" "}
          {subject.attempts ===
          1
            ? "tentativa"
            : "tentativas"}
        </span>

        <span className="shrink-0">
          Cobertura{" "}
          {
            subject.coveragePercentage
          }
          %
        </span>
      </div>
    </button>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function MasteryPage() {
  const [
    data,
    setData,
  ] =
    useState<MasterySummary | null>(
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
   * CARREGAR DOMÍNIO
   * =========================================================
   */

  const loadMastery =
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
            await getMasterySummary();

          setData(
            summary
          );

          const firstWithData =
            summary.subjects.find(
              (subject) =>
                subject.attempts >
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
            "Erro ao carregar domínio:",
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
              : "Não foi possível calcular o domínio dos conteúdos."
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
    void loadMastery();
  }, [
    loadMastery,
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
        title="Calculando domínio dos conteúdos..."
        description="Analisando precisão, cobertura, histórico recente e sequência de acertos."
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
        title="Não foi possível calcular seu domínio"
        description="O sistema encontrou um problema ao analisar seu histórico de respostas."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadMastery();
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
        title="Dados de domínio indisponíveis"
        description="A análise terminou sem retornar as informações necessárias."
        onRetry={() => {
          void loadMastery();
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
    data.totalQuestionsBank ===
      0 ||
    data.subjects.length ===
      0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="🧭"
        eyebrow="Mapa de aprendizagem"
        title="Nenhum conteúdo disponível"
        description="O banco de questões ainda não possui matérias suficientes para calcular seu mapa de domínio."
        actionLabel="Voltar ao painel"
        actionHref="/"
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
            subtitle="Domínio de conteúdo"
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
                Mapa de aprendizagem
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
                Domínio dos conteúdos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:mt-4">
                O nível de domínio considera
                precisão, quantidade de
                tentativas, desempenho recente,
                sequência de acertos e cobertura
                das questões disponíveis.
              </p>
            </div>

            {/* ===============================================
                MÉTRICAS
            ================================================= */}

            <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:min-w-[520px]">
              <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Questões vistas
                </p>

                <p className="mt-1 break-words text-lg font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.uniqueQuestionsSeen
                  }
                  /
                  {
                    data.totalQuestionsBank
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Cobertura
                </p>

                <p className="mt-1 text-lg font-bold sm:mt-2 sm:text-2xl">
                  {
                    data.overallCoverage
                  }
                  %
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Precisão
                </p>

                <p className="mt-1 text-lg font-bold sm:mt-2 sm:text-2xl">
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
            USUÁRIO AINDA NÃO ESTUDOU
        ==================================================== */}

        {data.uniqueQuestionsSeen ===
          0 && (
          <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:mt-6 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <div className="min-w-0">
                <p className="text-sm font-bold text-blue-700">
                  📘 Seu mapa ainda está começando
                </p>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Você ainda não respondeu
                  questões suficientes para
                  calcular seu domínio. Mesmo
                  assim, já pode explorar todas
                  as matérias, tópicos e
                  subtópicos disponíveis.
                </p>
              </div>

              <Link
                href="/simulado/novo"
                className="min-h-12 shrink-0 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
              >
                Fazer primeiro simulado
              </Link>
            </div>
          </section>
        )}

        {/* ===================================================
            LEGENDA
        ==================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-5">
          <p className="text-sm font-bold text-slate-900">
            Níveis de domínio
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:gap-3">
            {(
              [
                "nao-estudado",
                "poucos-dados",
                "precisa-revisar",
                "em-aprendizado",
                "bom-dominio",
                "dominado",
              ] as MasteryLevel[]
            ).map(
              (
                level
              ) => {
                const info =
                  getMasteryInfo(
                    level
                  );

                return (
                  <span
                    key={
                      level
                    }
                    className={`flex min-h-9 items-center justify-center rounded-xl border px-2.5 py-1.5 text-center text-[9px] font-bold sm:min-h-0 sm:justify-start sm:rounded-full sm:px-3 sm:text-xs ${info.badge}`}
                  >
                    <span
                      aria-hidden="true"
                    >
                      {
                        info.symbol
                      }
                    </span>

                    <span className="ml-1">
                      {
                        info.label
                      }
                    </span>
                  </span>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            MATÉRIAS
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-blue-600">
            Matérias
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Seu mapa de domínio
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Selecione uma matéria para
            analisar seus tópicos e
            subtópicos.
          </p>

          <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.subjects.map(
              (
                subject
              ) => (
                <SubjectCard
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
            DETALHE DA MATÉRIA
        ==================================================== */}

        {selectedSubject && (
          <section
            id="detalhe-materia"
            className="mt-8 scroll-mt-6 sm:mt-10"
          >
            {/* ===============================================
                RESUMO DA MATÉRIA
            ================================================= */}

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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

                    <div className="mt-2">
                      {(() => {
                        const info =
                          getMasteryInfo(
                            selectedSubject.level
                          );

                        return (
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${info.badge}`}
                          >
                            {
                              info.symbol
                            }{" "}
                            {
                              info.label
                            }
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-left sm:bg-transparent sm:p-0 sm:text-right">
                  <p className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                    Precisão histórica
                  </p>

                  <p className="mt-1 text-2xl font-bold text-blue-600 sm:text-3xl">
                    {
                      selectedSubject.accuracy
                    }
                    %
                  </p>
                </div>
              </div>

              {/* =============================================
                  MÉTRICAS
              ============================================== */}

              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 lg:grid-cols-4">
                <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Tentativas
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                    {
                      selectedSubject.attempts
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-emerald-50 p-3 sm:p-4">
                  <p className="text-[10px] text-emerald-500 sm:text-xs">
                    Acertos
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-700 sm:text-xl">
                    {
                      selectedSubject.correct
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-blue-50 p-3 sm:p-4">
                  <p className="text-[10px] text-blue-500 sm:text-xs">
                    Questões vistas
                  </p>

                  <p className="mt-1 break-words text-lg font-bold text-blue-700 sm:text-xl">
                    {
                      selectedSubject.uniqueQuestionsSeen
                    }
                    /
                    {
                      selectedSubject.totalQuestionsAvailable
                    }
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-violet-50 p-3 sm:p-4">
                  <p className="text-[10px] text-violet-500 sm:text-xs">
                    Cobertura
                  </p>

                  <p className="mt-1 text-lg font-bold text-violet-700 sm:text-xl">
                    {
                      selectedSubject.coveragePercentage
                    }
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* ===============================================
                TÓPICOS
            ================================================= */}

            <div className="mt-7 sm:mt-8">
              <p className="text-sm font-bold text-blue-600">
                Tópicos
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Domínio por tópico
              </h3>

              {selectedSubject.topics.length ===
              0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-8">
                  <p className="text-sm font-bold text-slate-700">
                    Nenhum tópico cadastrado
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Esta matéria ainda não
                    possui tópicos disponíveis
                    no banco.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {selectedSubject.topics.map(
                    (
                      topic
                    ) => (
                      <MasteryContentCard
                        key={
                          topic.key
                        }
                        item={
                          topic
                        }
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* ===============================================
                SUBTÓPICOS
            ================================================= */}

            <div className="mt-7 sm:mt-9">
              <p className="text-sm font-bold text-violet-600">
                Análise aprofundada
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Domínio por subtópico
              </h3>

              {selectedSubject.subtopics.length ===
              0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-8">
                  <p className="text-sm font-bold text-slate-700">
                    Nenhum subtópico cadastrado
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Esta matéria ainda não
                    possui subtópicos
                    disponíveis.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {selectedSubject.subtopics.map(
                    (
                      subtopic
                    ) => (
                      <MasteryContentCard
                        key={
                          subtopic.key
                        }
                        item={
                          subtopic
                        }
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            PRIORIDADE
        ==================================================== */}

        {data.needsAttention.length >
          0 && (
          <section className="mt-8 sm:mt-10">
            <p className="text-sm font-bold text-red-600">
              Prioridade
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Conteúdos que precisam de atenção
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Estes conteúdos apresentam
              desempenho que merece reforço
              nas próximas sessões.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.needsAttention.map(
                (
                  item
                ) => (
                  <MasteryContentCard
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
          </section>
        )}

        {/* ===================================================
            FORTES
        ==================================================== */}

        {data.strongestTopics.length >
          0 && (
          <section className="mt-8 sm:mt-10">
            <p className="text-sm font-bold text-emerald-600">
              Consolidação
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Seus conteúdos mais fortes
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Conteúdos nos quais seu
              histórico já demonstra maior
              consistência.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.strongestTopics.map(
                (
                  item
                ) => (
                  <MasteryContentCard
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
          </section>
        )}

        {/* ===================================================
            POUCO EXPLORADOS
        ==================================================== */}

        {data.underexploredTopics.length >
          0 && (
          <section className="mt-8 sm:mt-10">
            <p className="text-sm font-bold text-amber-600">
              Cobertura
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Conteúdos pouco explorados
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Estes conteúdos ainda possuem
              poucos dados ou nenhuma
              tentativa registrada.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.underexploredTopics.map(
                (
                  item
                ) => (
                  <MasteryContentCard
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
          </section>
        )}

        {/* ===================================================
            EXPLICAÇÃO
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:mt-9 sm:p-6">
          <h3 className="font-bold text-blue-900">
            Por que cobertura e precisão são diferentes?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Precisão mede quantas respostas
            você acertou. Cobertura mede
            quantas questões diferentes
            daquele conteúdo você já encontrou.
            Por exemplo, acertar cinco vezes a
            mesma questão pode gerar uma boa
            precisão, mas ainda não demonstra
            domínio completo de todas as partes
            do conteúdo.
          </p>
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:flex sm:flex-wrap sm:justify-between">
          <Link
            href="/analise"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            ← Análise de desempenho
          </Link>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/revisao"
              className="min-h-12 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-100"
            >
              🎯 Treinar meus erros
            </Link>

            <Link
              href="/recomendado"
              className="min-h-12 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
            >
              ✨ Recomendado
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
          Domínio calculado automaticamente
          a partir do histórico armazenado
          neste navegador.
        </footer>
      </div>
    </main>
  );
}