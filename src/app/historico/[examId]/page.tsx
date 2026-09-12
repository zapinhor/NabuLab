"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  questionBank,
} from "@/data/questions";

import {
  getExamAnswers,
  getExamById,
} from "@/lib/history-queries";

import {
  applyAlternativeOrder,
} from "@/lib/quiz-engine";

import {
  questionFromSnapshot,
} from "@/lib/question-snapshot";

import {
  getExamModeInfo,
} from "@/lib/exam-mode";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import NabuLabBrand from "@/components/ui/nabulab-brand";

import type {
  Question,
} from "@/types/question";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(value)
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
    seconds < 60
  ) {
    return `${seconds}s`;
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  const remaining =
    seconds % 60;

  if (
    remaining === 0
  ) {
    return `${minutes} min`;
  }

  return `${minutes} min ${remaining}s`;
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
 * TIPO DE QUESTÃO
 * =========================================================
 */

function getQuestionTypeLabel(
  type:
    StoredExam["questionType"]
) {
  switch (
    type
  ) {
    case "multiple-choice":
      return "Múltipla escolha";

    case "true-false":
      return "Verdadeiro ou falso";

    case "misto":
      return "Misto";

    default:
      return type;
  }
}

function getSingleQuestionTypeLabel(
  question:
    Question
) {
  return question.type ===
    "true-false"
    ? "Verdadeiro ou falso"
    : "Múltipla escolha";
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function ExamHistoryDetailPage() {
  const params =
    useParams();

  const rawExamId =
    params.examId;

  const examId =
    Array.isArray(
      rawExamId
    )
      ? rawExamId[0]
      : rawExamId;

  const [
    exam,
    setExam,
  ] =
    useState<StoredExam | null>(
      null
    );

  const [
    storedAnswers,
    setStoredAnswers,
  ] =
    useState<StoredAnswer[]>(
      []
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
   * CARREGAR PROVA
   * =========================================================
   */

  const loadExam =
    useCallback(
      async () => {
        setLoading(
          true
        );

        setError(
          null
        );

        if (
          !examId
        ) {
          setExam(
            null
          );

          setStoredAnswers(
            []
          );

          setLoading(
            false
          );

          return;
        }

        try {
          const [
            examData,
            answersData,
          ] =
            await Promise.all([
              getExamById(
                examId
              ),

              getExamAnswers(
                examId
              ),
            ]);

          setExam(
            examData ??
            null
          );

          setStoredAnswers(
            answersData
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar prova:",
            loadError
          );

          setExam(
            null
          );

          setStoredAnswers(
            []
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar este simulado."
          );
        } finally {
          setLoading(
            false
          );
        }
      },
      [
        examId,
      ]
    );

  useEffect(() => {
    void loadExam();
  }, [
    loadExam,
  ]);

  /*
   * =========================================================
   * RECONSTRUIR QUESTÕES
   * =========================================================
   */

  const questions =
    useMemo(() => {
      if (
        !exam
      ) {
        return [];
      }

      const questionMap =
        new Map<
          string,
          Question
        >(
          questionBank.map(
            (
              question
            ) => [
              question.id,
              question,
            ]
          )
        );

      const storedAnswerMap =
        new Map(
          storedAnswers.map(
            (answer) => [
              answer.questionId,
              answer,
            ]
          )
        );

      return exam.questionIds
        .map(
          (
            questionId
          ) => {
            const currentQuestion =
              questionMap.get(
                questionId
              );

            if (currentQuestion) {
              return currentQuestion;
            }

            return questionFromSnapshot(
              questionId,
              storedAnswerMap.get(
                questionId
              )?.questionSnapshot
            ) ?? undefined;
          }
        )
        .filter(
          (
            question
          ): question is Question =>
            question !==
            undefined
        )
        .map(
          (
            question
          ) =>
            applyAlternativeOrder(
              question,
              exam
                .alternativeOrders?.[
                question.id
              ]
            )
        );
    }, [
      exam,
      storedAnswers,
    ]);

  /*
   * =========================================================
   * MAPA DAS RESPOSTAS
   * =========================================================
   */

  const answerMap =
    useMemo(() => {
      return new Map(
        storedAnswers.map(
          (
            answer
          ) => [
            answer.questionId,
            answer,
          ]
        )
      );
    }, [
      storedAnswers,
    ]);

  /*
   * =========================================================
   * DESEMPENHO POR MATÉRIA
   * =========================================================
   */

  const subjectStats =
    useMemo(() => {
      const map =
        new Map<
          string,
          {
            name: string;
            total: number;
            correct: number;
          }
        >();

      for (
        const question of
        questions
      ) {
        const current =
          map.get(
            question.subject
          ) ?? {
            name:
              question.subjectName,

            total:
              0,

            correct:
              0,
          };

        current.total++;

        const answer =
          answerMap.get(
            question.id
          );

        if (
          answer?.isCorrect
        ) {
          current.correct++;
        }

        map.set(
          question.subject,
          current
        );
      }

      return Array.from(
        map.entries()
      ).map(
        ([
          id,
          value,
        ]) => ({
          id,

          ...value,

          percentage:
            value.total ===
            0
              ? 0
              : Math.round(
                  (
                    value.correct /
                    value.total
                  ) *
                    100
                ),
        })
      );
    }, [
      questions,
      answerMap,
    ]);

  /*
   * =========================================================
   * QUESTÕES NÃO ENCONTRADAS
   * =========================================================
   */

  const missingQuestions =
    exam
      ? Math.max(
          0,
          exam.questionIds.length -
            questions.length
        )
      : 0;

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
        title="Carregando resultado..."
        description="Recuperando a prova, suas respostas e o gabarito comentado."
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
        title="Não foi possível carregar este simulado"
        description="O sistema encontrou um problema ao acessar os dados armazenados no histórico local."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={() => {
          void loadExam();
        }}
        actionLabel="Voltar ao histórico"
        actionHref="/historico"
      />
    );
  }

  /*
   * =========================================================
   * NÃO ENCONTRADO
   * =========================================================
   */

  if (
    !exam
  ) {
    return (
      <EmptyState
        fullScreen
        icon="🧾"
        eyebrow="Histórico"
        title="Simulado não encontrado"
        description="Não foi possível localizar esta prova no histórico armazenado neste navegador."
        actionLabel="Voltar ao histórico"
        actionHref="/historico"
        secondaryLabel="Ir para o painel"
        secondaryHref="/"
      />
    );
  }

  /*
   * =========================================================
   * INFORMAÇÕES DA MODALIDADE
   * =========================================================
   */

  const modeInfo =
    getExamModeInfo(
      exam.mode
    );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <NabuLabBrand
            subtitle="Resultado do histórico"
          />

          <Link
            href="/historico"
            className="shrink-0 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:border-0 sm:px-0 sm:py-0 sm:text-sm sm:hover:bg-transparent sm:hover:text-slate-900"
          >
            <span className="sm:hidden">
              ← Histórico
            </span>

            <span className="hidden sm:inline">
              ← Voltar ao histórico
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-5 sm:py-8 md:px-8">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B2D6B] via-[#174EA6] to-[#3B82F6] p-5 text-white shadow-lg shadow-blue-100 sm:rounded-[28px] sm:p-7 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 max-w-3xl">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:py-1.5 sm:text-xs ${modeInfo.badgeClass}`}
              >
                {
                  modeInfo.icon
                }{" "}
                {
                  modeInfo.label
                }
              </span>

              <h1 className="mt-4 break-words text-2xl font-bold sm:text-3xl md:text-4xl">
                Resultado do simulado
              </h1>

              <p className="mt-2 text-xs leading-5 text-blue-100 sm:mt-3 sm:text-sm">
                {formatDate(
                  exam.submittedAt
                )}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-50 sm:px-3 sm:text-xs">
                  {getDifficultyLabel(
                    exam.difficulty
                  )}
                </span>

                <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-50 sm:px-3 sm:text-xs">
                  {getQuestionTypeLabel(
                    exam.questionType
                  )}
                </span>

                <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-50 sm:px-3 sm:text-xs">
                  <span aria-hidden="true">
                    ⏱️
                  </span>{" "}
                  {formatDuration(
                    exam.durationSeconds
                  )}
                </span>
              </div>
            </div>

            {/* ===============================================
                NOTA
            ================================================= */}

            <div className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-[#F4C430]/20 bg-[#F4C430]/15 p-4 backdrop-blur sm:rounded-3xl sm:p-6 lg:min-w-[260px] lg:grid-cols-1 lg:p-7 lg:text-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#FFF3B0] sm:text-xs">
                  Nota final
                </p>

                <p className="mt-1 text-4xl font-bold sm:text-5xl lg:mt-2 lg:text-6xl">
                  {
                    exam.percentage
                  }
                  %
                </p>
              </div>

              <div className="border-l border-white/10 pl-4 lg:border-l-0 lg:pl-0">
                <p className="text-xs leading-5 text-blue-50 sm:text-sm">
                  <strong className="text-white">
                    {
                      exam.correct
                    }
                  </strong>{" "}
                  de{" "}
                  <strong className="text-white">
                    {
                      exam.totalQuestions
                    }
                  </strong>{" "}
                  acertos
                </p>

                <p className="mt-1 text-[10px] text-blue-100 sm:text-xs">
                  {
                    exam.unanswered
                  }{" "}
                  {exam.unanswered ===
                  1
                    ? "questão em branco"
                    : "questões em branco"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ESTATÍSTICAS
        ==================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4 xl:grid-cols-4">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[10px] text-slate-500 sm:text-sm">
              Questões
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">
              {
                exam.totalQuestions
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5">
            <p className="text-[10px] text-emerald-600 sm:text-sm">
              Acertos
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-700 sm:mt-2 sm:text-3xl">
              {
                exam.correct
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-5">
            <p className="text-[10px] text-red-500 sm:text-sm">
              Erros
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600 sm:mt-2 sm:text-3xl">
              {
                exam.incorrect
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
            <p className="text-[10px] text-amber-600 sm:text-sm">
              Em branco
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-700 sm:mt-2 sm:text-3xl">
              {
                exam.unanswered
              }
            </p>
          </div>
        </section>

        {/* ===================================================
            MODALIDADE
        ==================================================== */}

        <section
          className={`mt-5 rounded-2xl border p-4 sm:mt-7 sm:p-6 ${modeInfo.cardClass}`}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div
                className="shrink-0 text-2xl sm:text-3xl"
                aria-hidden="true"
              >
                {
                  modeInfo.icon
                }
              </div>

              <div className="min-w-0">
                <p
                  className={`text-xs font-bold sm:text-sm ${modeInfo.textClass}`}
                >
                  Modalidade
                </p>

                <h2 className="mt-1 break-words text-lg font-bold text-slate-900 sm:text-xl">
                  {
                    modeInfo.label
                  }
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-sm">
                  {modeInfo.mode ===
                  "review"
                    ? "Esta prova foi criada a partir das questões do seu histórico de erros."
                    : modeInfo.mode ===
                        "recommended"
                      ? "Esta prova foi montada automaticamente considerando erros recorrentes, domínio e cobertura dos conteúdos."
                      : "Esta prova foi configurada manualmente na tela de criação de simulados."}
                </p>
              </div>
            </div>

            {modeInfo.mode ===
              "review" && (
              <Link
                href="/revisao"
                className="min-h-12 shrink-0 rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-violet-700"
              >
                Nova revisão
              </Link>
            )}

            {modeInfo.mode ===
              "recommended" && (
              <Link
                href="/recomendado"
                className="min-h-12 shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                Novo recomendado
              </Link>
            )}

            {modeInfo.mode ===
              "manual" && (
              <Link
                href="/simulado/novo"
                className="min-h-12 shrink-0 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
              >
                Novo simulado
              </Link>
            )}
          </div>
        </section>

        {/* ===================================================
            AVISO DE QUESTÕES AUSENTES
        ==================================================== */}

        {missingQuestions >
          0 && (
          <section
            role="status"
            className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5"
          >
            <p className="text-sm font-bold text-amber-800">
              ⚠️ Parte do conteúdo original não está mais disponível
            </p>

            <p className="mt-2 text-xs leading-6 text-amber-700 sm:text-sm">
              {missingQuestions ===
              1
                ? "1 questão desta prova não foi encontrada"
                : `${missingQuestions} questões desta prova não foram encontradas`}{" "}
              no banco atual. As estatísticas
              originais da prova continuam
              preservadas no histórico.
            </p>
          </section>
        )}

        {/* ===================================================
            POR MATÉRIA
        ==================================================== */}

        <section className="mt-7 sm:mt-9">
          <p className="text-sm font-bold text-[#3B82F6]">
            Desempenho
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Resultado por matéria
          </h2>

          <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {subjectStats.map(
              (
                subject
              ) => (
                <article
                  key={
                    subject.id
                  }
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                    <h3 className="min-w-0 break-words text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {
                        subject.name
                      }
                    </h3>

                    <span className="shrink-0 text-lg font-bold text-[#3B82F6] sm:text-xl">
                      {
                        subject.percentage
                      }
                      %
                    </span>
                  </div>

                  <div
                    className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label={`Resultado em ${subject.name}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={
                      subject.percentage
                    }
                  >
                    <div
                      className="h-full rounded-full bg-[#3B82F6]"
                      style={{
                        width:
                          `${Math.min(
                            100,
                            Math.max(
                              0,
                              subject.percentage
                            )
                          )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    <strong className="text-slate-700">
                      {
                        subject.correct
                      }
                    </strong>{" "}
                    de{" "}
                    <strong className="text-slate-700">
                      {
                        subject.total
                      }
                    </strong>{" "}
                    questões corretas
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* ===================================================
            GABARITO COMENTADO
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <p className="text-sm font-bold text-violet-600">
            Correção
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Gabarito comentado
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Revise cada questão e entenda
            por que cada alternativa está
            correta ou incorreta.
          </p>

          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {questions.map(
              (
                question,
                index
              ) => {
                const answer =
                  answerMap.get(
                    question.id
                  );

                const selectedAnswer =
                  answer
                    ?.selectedAnswer ??
                  null;

                const isCorrect =
                  answer
                    ?.isCorrect ??
                  false;

                const wasAnswered =
                  answer
                    ?.wasAnswered ??
                  false;

                const markedForReview =
                  answer
                    ?.markedForReview ??
                  false;

                const statusBar =
                  isCorrect
                    ? "bg-emerald-500"
                    : !wasAnswered
                      ? "bg-amber-400"
                      : "bg-red-500";

                return (
                  <article
                    key={
                      question.id
                    }
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* =====================================
                        BARRA DE STATUS
                    ====================================== */}

                    <div
                      className={`h-1 ${statusBar}`}
                    />

                    {/* =====================================
                        TOPO
                    ====================================== */}

                    <div className="border-b border-slate-100 p-4 sm:p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600 sm:text-[10px]">
                          Questão{" "}
                          {
                            index +
                            1
                          }
                        </span>

                        <span className="max-w-full break-words rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600 sm:text-[10px]">
                          {
                            question.subjectName
                          }
                        </span>

                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-bold text-violet-600 sm:text-[10px]">
                          {getSingleQuestionTypeLabel(
                            question
                          )}
                        </span>

                        {markedForReview && (
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold text-indigo-600 sm:text-[10px]">
                            🔖 Marcada para revisão
                          </span>
                        )}

                        {isCorrect ? (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600 sm:text-[10px]">
                            ✓ Correta
                          </span>
                        ) : !wasAnswered ? (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-600 sm:text-[10px]">
                            Em branco
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600 sm:text-[10px]">
                            ✕ Incorreta
                          </span>
                        )}
                      </div>

                      <p className="mt-4 break-words text-[10px] font-semibold leading-5 text-slate-400 sm:text-xs">
                        {
                          question.topic
                        }{" "}
                        •{" "}
                        {
                          question.subtopic
                        }
                      </p>

                      <h3 className="mt-2 break-words text-sm font-bold leading-7 text-slate-900 sm:text-base md:text-lg">
                        {
                          question.statement
                        }
                      </h3>
                    </div>

                    {/* =====================================
                        ALTERNATIVAS
                    ====================================== */}

                    <div className="space-y-3 p-4 sm:p-5 md:p-6">
                      {question.alternatives.map(
                        (
                          alternative
                        ) => {
                          const isAnswer =
                            selectedAnswer ===
                            alternative.id;

                          const isCorrectAlternative =
                            question.correctAnswer ===
                            alternative.id;

                          let alternativeClass =
                            "border-slate-200 bg-white";

                          if (
                            isCorrectAlternative
                          ) {
                            alternativeClass =
                              "border-emerald-300 bg-emerald-50";
                          } else if (
                            isAnswer
                          ) {
                            alternativeClass =
                              "border-red-300 bg-red-50";
                          }

                          return (
                            <div
                              key={
                                alternative.id
                              }
                              className={`min-w-0 rounded-xl border p-3 sm:p-4 ${alternativeClass}`}
                            >
                              <div className="flex min-w-0 items-start gap-3">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold sm:text-xs ${
                                    isCorrectAlternative
                                      ? "bg-emerald-600 text-white"
                                      : isAnswer
                                        ? "bg-red-500 text-white"
                                        : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {
                                    alternative.id
                                  }
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="break-words text-sm leading-6 text-slate-700">
                                    {
                                      alternative.text
                                    }
                                  </p>

                                  {(isAnswer ||
                                    isCorrectAlternative) && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {isAnswer && (
                                        <span
                                          className={`rounded-full px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${
                                            isCorrectAlternative
                                              ? "bg-emerald-100 text-emerald-700"
                                              : "bg-red-100 text-red-700"
                                          }`}
                                        >
                                          Sua resposta
                                        </span>
                                      )}

                                      {isCorrectAlternative && (
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold text-emerald-700 sm:text-[10px]">
                                          Resposta correta
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {question
                                    .alternativeExplanations[
                                    alternative.id
                                  ] && (
                                    <p className="mt-3 break-words text-xs leading-6 text-slate-500">
                                      {
                                        question
                                          .alternativeExplanations[
                                          alternative.id
                                        ]
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {/* =====================================
                        EXPLICAÇÃO
                    ====================================== */}

                    <div className="border-t border-blue-100 bg-blue-50 p-4 sm:p-5 md:p-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#3B82F6] sm:text-xs">
                        Explicação
                      </p>

                      <p className="mt-2 break-words text-sm leading-7 text-slate-700">
                        {
                          question.explanation
                        }
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:mt-9 sm:flex sm:flex-wrap sm:justify-between">
          <Link
            href="/historico"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            ← Histórico
          </Link>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/analise"
              className="min-h-12 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              📊 Analisar desempenho
            </Link>

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
              ✨ Próximo recomendado
            </Link>
          </div>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Resultado armazenado
          permanentemente no histórico
          local.
        </footer>
      </div>
    </main>
  );
}
