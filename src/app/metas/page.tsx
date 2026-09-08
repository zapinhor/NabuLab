"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getStudyConsistency,
  type StudyConsistency,
} from "@/lib/study-consistency";

import {
  calculateStudyGoalsProgress,
  loadStudyGoals,
  resetStudyGoals,
  saveStudyGoals,
} from "@/lib/study-goals";

import {
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

import type {
  StudyGoals,
} from "@/types/study-goals";

/*
 * =========================================================
 * UTILITÁRIOS
 * =========================================================
 */

function clampNumber(
  value: number,
  min: number,
  max: number
) {
  if (
    !Number.isFinite(
      value
    )
  ) {
    return min;
  }

  return Math.min(
    max,
    Math.max(
      min,
      Math.round(
        value
      )
    )
  );
}

function normalizeGoals(
  goals: StudyGoals
): StudyGoals {
  return {
    weeklyQuestions:
      clampNumber(
        goals.weeklyQuestions,
        1,
        1000
      ),

    weeklyExams:
      clampNumber(
        goals.weeklyExams,
        1,
        100
      ),

    weeklyStudyDays:
      clampNumber(
        goals.weeklyStudyDays,
        1,
        7
      ),

    updatedAt:
      goals.updatedAt,
  };
}

/*
 * =========================================================
 * BARRA DE META
 * =========================================================
 */

function GoalProgressBar({
  current,
  target,
  percentage,
  label,
  description,
  icon,
}: {
  current: number;

  target: number;

  percentage: number;

  label: string;

  description: string;

  icon: string;
}) {
  const visualPercentage =
    Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    );

  const completed =
    current >= target;

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* ===================================================
          CABEÇALHO
      ==================================================== */}

      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg sm:h-11 sm:w-11 sm:text-xl">
            {
              icon
            }
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-sm font-bold text-slate-900 sm:text-base">
              {
                label
              }
            </h3>

            <p className="mt-1 break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
              {
                description
              }
            </p>
          </div>
        </div>

        {completed && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600 sm:px-2.5 sm:text-[10px]">
            <span className="sm:hidden">
              ✓
            </span>

            <span className="hidden sm:inline">
              ✓ Meta concluída
            </span>
          </span>
        )}
      </div>

      {/* ===================================================
          VALORES
      ==================================================== */}

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {
              current
            }
          </span>

          <span className="ml-1 text-xs font-semibold text-slate-400 sm:text-sm">
            /{" "}
            {
              target
            }
          </span>
        </div>

        <span
          className={`shrink-0 text-sm font-bold ${
            completed
              ? "text-emerald-600"
              : "text-[#3B82F6]"
          }`}
        >
          {
            percentage
          }
          %
        </span>
      </div>

      {/* ===================================================
          PROGRESSO
      ==================================================== */}

      <div
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100 sm:h-3"
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
            width:
              `${visualPercentage}%`,
          }}
        />
      </div>

      {percentage >
        100 && (
        <p className="mt-3 text-[11px] font-semibold leading-5 text-emerald-600 sm:text-xs">
          Você ultrapassou a meta em{" "}
          {
            percentage -
            100
          }
          %.
        </p>
      )}
    </article>
  );
}

/*
 * =========================================================
 * CAMPO DE META
 * =========================================================
 */

function GoalInput({
  id,
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  id: string;

  label: string;

  description: string;

  value: number;

  min: number;

  max: number;

  onChange:
    (
      value: number
    ) => void;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={
          id
        }
        className="block text-sm font-bold text-slate-800"
      >
        {
          label
        }
      </label>

      <p
        id={`${id}-description`}
        className="mt-1 min-h-10 break-words text-xs leading-5 text-slate-500 md:min-h-[60px]"
      >
        {
          description
        }
      </p>

      <input
        id={
          id
        }
        type="number"
        inputMode="numeric"
        min={
          min
        }
        max={
          max
        }
        step={1}
        value={
          value
        }
        aria-describedby={`${id}-description ${id}-limits`}
        onChange={(
          event
        ) =>
          onChange(
            Number(
              event
                .target
                .value
            )
          )
        }
        className="mt-3 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-900 outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 sm:text-sm"
      />

      <p
        id={`${id}-limits`}
        className="mt-2 text-[10px] text-slate-400"
      >
        Permitido:{" "}
        {
          min
        }{" "}
        a{" "}
        {
          max
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

export default function GoalsPage() {
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
    draft,
    setDraft,
  ] =
    useState<StudyGoals | null>(
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
    actionError,
    setActionError,
  ] =
    useState<string | null>(
      null
    );

  const [
    savedMessage,
    setSavedMessage,
  ] =
    useState(
      false
    );

  /*
   * =========================================================
   * CARREGAR
   * =========================================================
   */

  const loadGoalsPage =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setLoadError(
          null
        );

        setActionError(
          null
        );

        try {
          const [
            consistencyData,
            goalsData,
          ] =
            await Promise.all([
              getStudyConsistency(),

              Promise.resolve(
                loadStudyGoals()
              ),
            ]);

          setConsistency(
            consistencyData
          );

          setGoals(
            goalsData
          );

          setDraft(
            goalsData
          );
        } catch (
          error
        ) {
          console.error(
            "Erro ao carregar metas:",
            error
          );

          setConsistency(
            null
          );

          setGoals(
            null
          );

          setDraft(
            null
          );

          setLoadError(
            error instanceof Error
              ? error.message
              : "Não foi possível carregar suas metas."
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
    void loadGoalsPage();
  }, [
    loadGoalsPage,
  ]);

  /*
   * =========================================================
   * PROGRESSO
   * =========================================================
   */

  const progress =
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
   * ALTERAÇÕES PENDENTES
   * =========================================================
   */

  const hasChanges =
    useMemo(() => {
      if (
        !goals ||
        !draft
      ) {
        return false;
      }

      const normalizedDraft =
        normalizeGoals(
          draft
        );

      return (
        normalizedDraft.weeklyQuestions !==
          goals.weeklyQuestions ||
        normalizedDraft.weeklyExams !==
          goals.weeklyExams ||
        normalizedDraft.weeklyStudyDays !==
          goals.weeklyStudyDays
      );
    }, [
      goals,
      draft,
    ]);

  /*
   * =========================================================
   * SALVAR
   * =========================================================
   */

  function handleSave() {
    if (
      !draft
    ) {
      return;
    }

    setActionError(
      null
    );

    setSavedMessage(
      false
    );

    try {
      const normalized =
        normalizeGoals(
          draft
        );

      const saved =
        saveStudyGoals(
          normalized
        );

      setGoals(
        saved
      );

      setDraft(
        saved
      );

      setSavedMessage(
        true
      );

      window.setTimeout(
        () => {
          setSavedMessage(
            false
          );
        },
        2500
      );
    } catch (
      error
    ) {
      console.error(
        "Erro ao salvar metas:",
        error
      );

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar suas metas."
      );
    }
  }

  /*
   * =========================================================
   * RESTAURAR
   * =========================================================
   */

  function handleReset() {
    const confirmed =
      window.confirm(
        "Deseja restaurar as metas padrão?"
      );

    if (
      !confirmed
    ) {
      return;
    }

    setActionError(
      null
    );

    setSavedMessage(
      false
    );

    try {
      const defaults =
        resetStudyGoals();

      setGoals(
        defaults
      );

      setDraft(
        defaults
      );

      setSavedMessage(
        true
      );

      window.setTimeout(
        () => {
          setSavedMessage(
            false
          );
        },
        2500
      );
    } catch (
      error
    ) {
      console.error(
        "Erro ao restaurar metas:",
        error
      );

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível restaurar as metas padrão."
      );
    }
  }

  /*
   * =========================================================
   * DESCARTAR ALTERAÇÕES
   * =========================================================
   */

  function handleDiscardChanges() {
    if (
      !goals
    ) {
      return;
    }

    setDraft(
      goals
    );

    setActionError(
      null
    );

    setSavedMessage(
      false
    );
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
        title="Carregando suas metas..."
        description="Calculando seu progresso da semana e recuperando suas preferências."
      />
    );
  }

  /*
   * =========================================================
   * ERRO
   * =========================================================
   */

  if (
    loadError
  ) {
    return (
      <ErrorState
        fullScreen
        title="Não foi possível carregar suas metas"
        description="O sistema encontrou um problema ao acessar seu progresso ou suas configurações locais."
        details={
          process.env.NODE_ENV ===
          "development"
            ? loadError
            : undefined
        }
        onRetry={() => {
          void loadGoalsPage();
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
    !consistency ||
    !goals ||
    !draft ||
    !progress
  ) {
    return (
      <ErrorState
        fullScreen
        title="Dados de metas incompletos"
        description="A página terminou de carregar, mas algumas informações necessárias não foram encontradas."
        onRetry={() => {
          void loadGoalsPage();
        }}
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
            subtitle="Metas de estudo"
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
                Consistência de estudos
              </p>

              <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                Metas semanais
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:mt-4">
                Defina objetivos realistas para
                quantidade de questões,
                simulados e dias de estudo.
                O progresso é recalculado
                automaticamente usando seu
                histórico.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:min-w-[520px]">
              <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Metas
                  <span className="hidden sm:inline">
                    {" "}
                    concluídas
                  </span>
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    progress.completedGoals
                  }
                  /
                  {
                    progress.totalGoals
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-white/10 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-blue-100 sm:text-xs">
                  Dias
                  <span className="hidden sm:inline">
                    {" "}
                    esta semana
                  </span>
                </p>

                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    consistency.activeDaysThisWeek
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-[#F4C430]/20 bg-[#F4C430]/15 p-3 backdrop-blur sm:rounded-2xl sm:p-4">
                <p className="text-[9px] leading-4 text-[#FFF3B0] sm:text-xs">
                  Questões
                  <span className="hidden sm:inline">
                    {" "}
                    esta semana
                  </span>
                </p>

                <p className="mt-1 break-words text-xl font-bold sm:mt-2 sm:text-2xl">
                  {
                    consistency.questionsThisWeek
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SEM ATIVIDADE NA SEMANA
        ==================================================== */}

        {consistency.examsThisWeek ===
          0 && (
          <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:mt-6 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-bold text-blue-800">
                  📅 Sua semana ainda está começando
                </p>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                  Nenhum simulado foi concluído
                  nesta semana. Sua primeira
                  atividade já começará a
                  preencher as metas abaixo.
                </p>
              </div>

              <Link
                href="/simulado/novo"
                className="min-h-12 shrink-0 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
              >
                Começar a estudar
              </Link>
            </div>
          </section>
        )}

        {/* ===================================================
            PROGRESSO
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-[#3B82F6]">
            Semana atual
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Seu progresso
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            A semana é considerada de
            segunda-feira a domingo.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <GoalProgressBar
              icon="❓"
              label="Questões"
              description="Quantidade total de questões respondidas nesta semana."
              current={
                progress
                  .questions
                  .current
              }
              target={
                progress
                  .questions
                  .target
              }
              percentage={
                progress
                  .questions
                  .percentage
              }
            />

            <GoalProgressBar
              icon="📝"
              label="Simulados"
              description="Quantidade de provas concluídas nesta semana."
              current={
                progress
                  .exams
                  .current
              }
              target={
                progress
                  .exams
                  .target
              }
              percentage={
                progress
                  .exams
                  .percentage
              }
            />

            <GoalProgressBar
              icon="📅"
              label="Dias de estudo"
              description="Dias diferentes em que pelo menos um simulado foi concluído."
              current={
                progress
                  .studyDays
                  .current
              }
              target={
                progress
                  .studyDays
                  .target
              }
              percentage={
                progress
                  .studyDays
                  .percentage
              }
            />
          </div>
        </section>

        {/* ===================================================
            CONFIGURAÇÃO
        ==================================================== */}

        <section className="mt-7 grid min-w-0 gap-5 sm:mt-9 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              FORMULÁRIO
          ================================================== */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
            <p className="text-sm font-bold text-[#3B82F6]">
              Configuração
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Defina suas metas
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Você pode ajustar os objetivos
              conforme sua rotina. As metas
              ficam salvas neste navegador.
            </p>

            <div className="mt-6 grid gap-6 sm:mt-7 md:grid-cols-3 md:gap-5 xl:gap-7">
              <GoalInput
                id="weekly-questions"
                label="Questões por semana"
                description="Número de questões que deseja responder ao longo da semana."
                value={
                  draft.weeklyQuestions
                }
                min={1}
                max={1000}
                onChange={(
                  value
                ) => {
                  setDraft({
                    ...draft,

                    weeklyQuestions:
                      value,
                  });

                  setSavedMessage(
                    false
                  );

                  setActionError(
                    null
                  );
                }}
              />

              <GoalInput
                id="weekly-exams"
                label="Simulados por semana"
                description="Quantidade de provas que pretende concluir durante a semana."
                value={
                  draft.weeklyExams
                }
                min={1}
                max={100}
                onChange={(
                  value
                ) => {
                  setDraft({
                    ...draft,

                    weeklyExams:
                      value,
                  });

                  setSavedMessage(
                    false
                  );

                  setActionError(
                    null
                  );
                }}
              />

              <GoalInput
                id="weekly-study-days"
                label="Dias de estudo"
                description="Em quantos dias diferentes da semana deseja estudar."
                value={
                  draft.weeklyStudyDays
                }
                min={1}
                max={7}
                onChange={(
                  value
                ) => {
                  setDraft({
                    ...draft,

                    weeklyStudyDays:
                      value,
                  });

                  setSavedMessage(
                    false
                  );

                  setActionError(
                    null
                  );
                }}
              />
            </div>

            {/* =================================================
                ERRO DE AÇÃO
            ================================================== */}

            {actionError && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 sm:text-xs">
                  Não foi possível concluir a ação
                </p>

                <p className="mt-2 break-words text-sm leading-6 text-red-700">
                  {
                    actionError
                  }
                </p>
              </div>
            )}

            {/* =================================================
                BOTÕES
            ================================================== */}

            <div className="mt-7 border-t border-slate-100 pt-5 sm:mt-8 sm:pt-6">
              <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={
                    handleSave
                  }
                  disabled={
                    !hasChanges
                  }
                  className="min-h-12 rounded-xl bg-[#0B2D6B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174EA6] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Salvar metas
                </button>

                {hasChanges && (
                  <button
                    type="button"
                    onClick={
                      handleDiscardChanges
                    }
                    className="min-h-12 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Descartar alterações
                  </button>
                )}

                <button
                  type="button"
                  onClick={
                    handleReset
                  }
                  className="min-h-12 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Restaurar padrão
                </button>
              </div>

              <div
                className="mt-4 min-h-5"
                aria-live="polite"
              >
                {savedMessage ? (
                  <div
                    role="status"
                    className="text-sm font-bold text-emerald-600"
                  >
                    ✓ Metas salvas
                  </div>
                ) : !hasChanges ? (
                  <div className="text-xs text-slate-400">
                    Nenhuma alteração pendente
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-amber-600">
                    Existem alterações que ainda não foram salvas.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              RESUMO DA SEMANA
          ================================================== */}

          <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 xl:sticky xl:top-6 xl:self-start">
            <p className="font-bold text-slate-900">
              Resumo da semana
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Atividade registrada de segunda
              a domingo.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-1 xl:gap-0 xl:space-y-4">
              <div className="rounded-xl bg-slate-50 p-3 xl:flex xl:items-center xl:justify-between xl:gap-4 xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Simulados
                </span>

                <strong className="mt-1 block text-xl text-slate-900 xl:mt-0 xl:text-base">
                  {
                    consistency.examsThisWeek
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 xl:flex xl:items-center xl:justify-between xl:gap-4 xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Questões
                </span>

                <strong className="mt-1 block break-words text-xl text-slate-900 xl:mt-0 xl:text-base">
                  {
                    consistency.questionsThisWeek
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 xl:flex xl:items-center xl:justify-between xl:gap-4 xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Acertos
                </span>

                <strong className="mt-1 block text-xl text-emerald-600 xl:mt-0 xl:text-base">
                  {
                    consistency.correctThisWeek
                  }
                </strong>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 xl:flex xl:items-center xl:justify-between xl:gap-4 xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Precisão
                </span>

                <strong className="mt-1 block text-xl text-[#3B82F6] xl:mt-0 xl:text-base">
                  {
                    consistency.accuracyThisWeek
                  }
                  %
                </strong>
              </div>

              <div className="col-span-2 rounded-xl bg-violet-50 p-3 xl:col-span-1 xl:flex xl:items-center xl:justify-between xl:gap-4 xl:bg-transparent xl:p-0">
                <span className="text-xs text-slate-500 sm:text-sm">
                  Dias ativos
                </span>

                <strong className="mt-1 block text-xl text-violet-600 xl:mt-0 xl:text-base">
                  {
                    consistency.activeDaysThisWeek
                  }
                </strong>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 sm:mt-6">
              <p className="text-xs text-slate-500">
                Metas concluídas
              </p>

              <div className="mt-1 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-slate-900">
                  {
                    progress.completedGoals
                  }
                  /
                  {
                    progress.totalGoals
                  }
                </p>

                {progress.completedGoals ===
                  progress.totalGoals && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    ✓ Semana completa
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/recomendado"
              className="mt-5 block min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
            >
              ✨ Fazer simulado recomendado
            </Link>
          </aside>
        </section>

        {/* ===================================================
            COMO FUNCIONA
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:mt-8 sm:p-6">
          <h3 className="font-bold text-blue-900">
            Como o progresso é calculado?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            O sistema utiliza as provas
            concluídas entre segunda-feira
            e domingo. Fazer vários simulados
            no mesmo dia aumenta suas metas de
            questões e provas, mas continua
            contando como apenas um dia de
            estudo.
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
              href="/recomendado"
              className="min-h-12 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100"
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
          Metas armazenadas localmente
          neste navegador.
        </footer>
      </div>
    </main>
  );
}