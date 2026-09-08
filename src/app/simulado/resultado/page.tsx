"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loadExamSession,
  loadExamSubmission,
} from "@/lib/exam-session";

import {
  getSessionQuestions,
} from "@/lib/quiz-engine";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import type {
  ExamSession,
  ExamSubmission,
} from "@/types/exam";

import type {
  Question,
} from "@/types/question";

/*
 * =========================================================
 * TIPOS
 * =========================================================
 */

interface SubjectResult {
  name: string;

  total: number;

  correct: number;
}

/*
 * =========================================================
 * LABELS
 * =========================================================
 */

function getDifficultyLabel(
  difficulty:
    Question["difficulty"]
) {
  switch (
    difficulty
  ) {
    case "iniciante":
      return "Iniciante";

    case "medio":
      return "Médio";

    case "avancado":
      return "Avançado";

    default:
      return difficulty;
  }
}

function getQuestionTypeLabel(
  type:
    Question["type"]
) {
  switch (
    type
  ) {
    case "multiple-choice":
      return "Múltipla escolha";

    case "true-false":
      return "Verdadeiro ou falso";

    default:
      return type;
  }
}

/*
 * =========================================================
 * MENSAGEM DA NOTA
 * =========================================================
 */

function getGradeMessage(
  percentage: number
) {
  if (
    percentage >= 90
  ) {
    return "Excelente desempenho";
  }

  if (
    percentage >= 75
  ) {
    return "Muito bom";
  }

  if (
    percentage >= 60
  ) {
    return "Bom progresso";
  }

  if (
    percentage >= 40
  ) {
    return "Vale reforçar alguns conteúdos";
  }

  return "Estes conteúdos merecem uma revisão mais cuidadosa";
}

/*
 * =========================================================
 * CARD DE RESULTADO
 * =========================================================
 */

function ResultCard({
  title,
  value,
  detail,
  icon,
  tone = "default",
}: {
  title: string;

  value: number;

  detail: string;

  icon: string;

  tone?:
    | "default"
    | "success"
    | "danger"
    | "warning";
}) {
  const styles = {
    default: {
      box:
        "border-slate-200 bg-white",

      icon:
        "bg-slate-100",

      value:
        "text-slate-900",
    },

    success: {
      box:
        "border-emerald-200 bg-emerald-50/40",

      icon:
        "bg-emerald-100",

      value:
        "text-emerald-700",
    },

    danger: {
      box:
        "border-red-200 bg-red-50/40",

      icon:
        "bg-red-100",

      value:
        "text-red-700",
    },

    warning: {
      box:
        "border-amber-200 bg-amber-50/40",

      icon:
        "bg-amber-100",

      value:
        "text-amber-700",
    },
  };

  const style =
    styles[tone];

  return (
    <article
      className={`min-w-0 rounded-2xl border p-4 shadow-sm sm:p-5 ${style.box}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500 sm:text-sm">
            {
              title
            }
          </p>

          <p
            className={`mt-2 text-2xl font-bold sm:text-3xl ${style.value}`}
          >
            {
              value
            }
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base sm:h-10 sm:w-10 ${style.icon}`}
        >
          {
            icon
          }
        </div>
      </div>

      <p className="mt-2 break-words text-[10px] leading-4 text-slate-400 sm:text-xs">
        {
          detail
        }
      </p>
    </article>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function ExamResultPage() {
  const [
    session,
    setSession,
  ] =
    useState<ExamSession | null>(
      null
    );

  const [
    submission,
    setSubmission,
  ] =
    useState<ExamSubmission | null>(
      null
    );

  const [
    questions,
    setQuestions,
  ] =
    useState<Question[]>(
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
   * CARREGAR RESULTADO
   * =========================================================
   */

  const loadResult =
    useCallback(
      () => {
        setLoading(
          true
        );

        setError(
          null
        );

        try {
          const storedSession =
            loadExamSession();

          const storedSubmission =
            loadExamSubmission();

          /*
           * Ausência de resultado não é
           * necessariamente um erro.
           */

          if (
            !storedSession ||
            !storedSubmission ||
            storedSession.id !==
              storedSubmission.sessionId
          ) {
            setSession(
              null
            );

            setSubmission(
              null
            );

            setQuestions(
              []
            );

            return;
          }

          const storedQuestions =
            getSessionQuestions(
              storedSession
            );

          if (
            storedQuestions.length ===
            0
          ) {
            throw new Error(
              "A prova submetida não possui questões válidas."
            );
          }

          setSession(
            storedSession
          );

          setSubmission(
            storedSubmission
          );

          setQuestions(
            storedQuestions
          );
        } catch (
          loadError
        ) {
          console.error(
            "Erro ao carregar resultado:",
            loadError
          );

          setSession(
            null
          );

          setSubmission(
            null
          );

          setQuestions(
            []
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar o resultado."
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
    loadResult();
  }, [
    loadResult,
  ]);

  /*
   * =========================================================
   * CALCULAR RESULTADO
   * =========================================================
   */

  const result =
    useMemo(() => {
      if (
        !submission ||
        questions.length ===
          0
      ) {
        return null;
      }

      let correct =
        0;

      let incorrect =
        0;

      let answered =
        0;

      const bySubject =
        new Map<
          string,
          SubjectResult
        >();

      for (
        const question
        of questions
      ) {
        const selected =
          submission.answers[
            question.id
          ];

        const wasAnswered =
          Boolean(
            selected
          );

        if (
          wasAnswered
        ) {
          answered++;
        }

        const isCorrect =
          selected ===
          question.correctAnswer;

        if (
          isCorrect
        ) {
          correct++;
        } else if (
          wasAnswered
        ) {
          /*
           * Questões em branco agora
           * NÃO entram como erro.
           */

          incorrect++;
        }

        const existing =
          bySubject.get(
            question.subject
          );

        if (
          existing
        ) {
          existing.total++;

          if (
            isCorrect
          ) {
            existing.correct++;
          }
        } else {
          bySubject.set(
            question.subject,
            {
              name:
                question.subjectName,

              total:
                1,

              correct:
                isCorrect
                  ? 1
                  : 0,
            }
          );
        }
      }

      const total =
        questions.length;

      const unanswered =
        Math.max(
          0,
          total -
            answered
        );

      const percentage =
        total ===
        0
          ? 0
          : Math.round(
              (
                correct /
                total
              ) *
                100
            );

      return {
        total,

        correct,

        incorrect,

        answered,

        unanswered,

        percentage,

        subjects:
          Array.from(
            bySubject.values()
          ),
      };
    }, [
      questions,
      submission,
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
        title="Corrigindo sua prova..."
        description="Calculando sua nota e preparando o gabarito comentado."
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
        title="Não foi possível carregar o resultado"
        description="O sistema encontrou um problema ao reconstruir sua prova submetida."
        details={
          process.env.NODE_ENV ===
          "development"
            ? error
            : undefined
        }
        onRetry={
          loadResult
        }
        actionLabel="Criar outro simulado"
        actionHref="/simulado/novo"
      />
    );
  }

  /*
   * =========================================================
   * RESULTADO INEXISTENTE
   * =========================================================
   */

  if (
    !session ||
    !submission ||
    !result
  ) {
    return (
      <EmptyState
        fullScreen
        icon="📊"
        eyebrow="Resultado"
        title="Resultado não encontrado"
        description="Nenhuma prova submetida foi encontrada nesta sessão."
        actionLabel="Criar simulado"
        actionHref="/simulado/novo"
        secondaryLabel="Voltar ao painel"
        secondaryHref="/"
      />
    );
  }

  const gradeMessage =
    getGradeMessage(
      result.percentage
    );

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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
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
                Resultado da prova
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="shrink-0 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:px-4 sm:text-sm"
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

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:py-10">
        {/* ===================================================
            RESULTADO PRINCIPAL
        ==================================================== */}

        <section className="overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-5 text-white shadow-xl sm:rounded-[28px] sm:p-7 md:p-10">
          <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-blue-200 sm:text-sm">
                Simulado finalizado
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                {
                  gradeMessage
                }
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                Confira sua nota,
                desempenho por matéria e
                a explicação detalhada de
                cada questão.
              </p>
            </div>

            {/* NOTA */}

            <div className="w-full rounded-2xl bg-white/10 px-5 py-6 text-center backdrop-blur sm:rounded-3xl sm:px-8 lg:min-w-[230px] lg:px-10 lg:py-7">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200 sm:text-xs">
                Nota
              </p>

              <p className="mt-2 text-5xl font-bold sm:text-6xl">
                {
                  result.percentage
                }
                %
              </p>

              <p className="mt-2 text-xs text-blue-100 sm:text-sm">
                {
                  result.correct
                }{" "}
                de{" "}
                {
                  result.total
                }{" "}
                acertos
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            CARDS
        ==================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4">
          <ResultCard
            icon="✓"
            title="Acertos"
            value={
              result.correct
            }
            detail={`${result.percentage}% da prova`}
            tone="success"
          />

          <ResultCard
            icon="✕"
            title="Erros"
            value={
              result.incorrect
            }
            detail="Respostas incorretas"
            tone="danger"
          />

          <ResultCard
            icon="✎"
            title="Respondidas"
            value={
              result.answered
            }
            detail={`${result.total} questões no total`}
          />

          <ResultCard
            icon="—"
            title="Em branco"
            value={
              result.unanswered
            }
            detail="Sem resposta selecionada"
            tone={
              result.unanswered >
              0
                ? "warning"
                : "default"
            }
          />
        </section>

        {/* ===================================================
            AÇÕES RÁPIDAS
        ==================================================== */}

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link
            href="/simulado/novo"
            className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Novo simulado
          </Link>

          <Link
            href="/revisao"
            className="min-h-12 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-100"
          >
            🎯 Treinar erros
          </Link>

          <Link
            href="/historico"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Ver histórico
          </Link>
        </section>

        {/* ===================================================
            DESEMPENHO POR MATÉRIA
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Desempenho por matéria
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Veja como você se saiu em
            cada área presente nesta
            prova.
          </p>

          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.subjects.map(
              (
                subject
              ) => {
                const percentage =
                  Math.round(
                    (
                      subject.correct /
                      subject.total
                    ) *
                      100
                  );

                return (
                  <article
                    key={
                      subject.name
                    }
                    className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 break-words text-sm font-bold text-slate-800 sm:text-base">
                        {
                          subject.name
                        }
                      </p>

                      <span className="shrink-0 text-lg font-bold text-blue-600">
                        {
                          percentage
                        }
                        %
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      {
                        subject.correct
                      }{" "}
                      de{" "}
                      {
                        subject.total
                      }{" "}
                      {subject.total ===
                      1
                        ? "questão correta"
                        : "questões corretas"}
                    </p>

                    <div
                      className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-label={`Desempenho em ${subject.name}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={
                        percentage
                      }
                    >
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              percentage
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            GABARITO
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Correção detalhada
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Gabarito comentado
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Analise sua resposta,
              consulte o gabarito e revise
              a explicação de cada
              conteúdo.
            </p>
          </div>

          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {questions.map(
              (
                question,
                index
              ) => {
                const userAnswer =
                  submission.answers[
                    question.id
                  ];

                const correct =
                  userAnswer ===
                  question.correctAnswer;

                const wasAnswered =
                  Boolean(
                    userAnswer
                  );

                const markedForReview =
                  submission.reviewQuestionIds.includes(
                    question.id
                  );

                return (
                  <article
                    key={
                      question.id
                    }
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* BARRA DE STATUS */}

                    <div
                      className={`h-1 ${
                        correct
                          ? "bg-emerald-500"
                          : wasAnswered
                            ? "bg-red-500"
                            : "bg-amber-400"
                      }`}
                    />

                    <div className="p-4 sm:p-6 md:p-7">
                      {/* =====================================
                          BADGES
                      ====================================== */}

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-xs ${
                            correct
                              ? "bg-emerald-50 text-emerald-700"
                              : wasAnswered
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {correct
                            ? "✓ Correta"
                            : wasAnswered
                              ? "✕ Incorreta"
                              : "— Em branco"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                          Questão{" "}
                          {
                            index +
                            1
                          }
                        </span>

                        <span className="max-w-full rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                          {
                            question.subjectName
                          }
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                          {getDifficultyLabel(
                            question.difficulty
                          )}
                        </span>

                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600 sm:px-3 sm:text-xs">
                          {getQuestionTypeLabel(
                            question.type
                          )}
                        </span>

                        {markedForReview && (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700 sm:px-3 sm:text-xs">
                            ⚑ Revisão
                          </span>
                        )}
                      </div>

                      {/* =====================================
                          ENUNCIADO
                      ====================================== */}

                      <p className="mt-5 break-words text-[10px] font-semibold uppercase leading-5 tracking-wider text-slate-400 sm:text-xs">
                        {
                          question.topic
                        }{" "}
                        •{" "}
                        {
                          question.subtopic
                        }
                      </p>

                      <h3 className="mt-2 break-words text-base font-bold leading-7 text-slate-900 sm:text-lg">
                        {
                          question.statement
                        }
                      </h3>

                      {/* =====================================
                          ALTERNATIVAS
                      ====================================== */}

                      <div className="mt-5 space-y-3">
                        {question.alternatives.map(
                          (
                            alternative
                          ) => {
                            const isCorrect =
                              alternative.id ===
                              question.correctAnswer;

                            const isUser =
                              alternative.id ===
                              userAnswer;

                            let style =
                              "border-slate-200 bg-white";

                            if (
                              isCorrect
                            ) {
                              style =
                                "border-emerald-300 bg-emerald-50";
                            } else if (
                              isUser
                            ) {
                              style =
                                "border-red-300 bg-red-50";
                            }

                            return (
                              <div
                                key={
                                  alternative.id
                                }
                                className={`min-w-0 rounded-xl border p-3 sm:p-4 ${style}`}
                              >
                                <div className="flex min-w-0 items-start gap-3">
                                  <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                                      isCorrect
                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                        : isUser
                                          ? "border-red-500 bg-red-500 text-white"
                                          : "border-slate-300 bg-white text-slate-600"
                                    }`}
                                  >
                                    {
                                      alternative.id
                                    }
                                  </span>

                                  <div className="min-w-0 flex-1">
                                    <p className="break-words text-sm leading-6 text-slate-700">
                                      {
                                        alternative.text
                                      }
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {isCorrect && (
                                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                                          ✓ Resposta correta
                                        </span>
                                      )}

                                      {isUser &&
                                        !isCorrect && (
                                          <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
                                            Sua resposta
                                          </span>
                                        )}

                                      {isUser &&
                                        isCorrect && (
                                          <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
                                            Sua resposta
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      {/* =====================================
                          EM BRANCO
                      ====================================== */}

                      {!userAnswer && (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                          <p className="text-sm font-semibold text-amber-700">
                            Você deixou esta
                            questão em branco.
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-600">
                            A resposta correta
                            está destacada em
                            verde acima.
                          </p>
                        </div>
                      )}

                      {/* =====================================
                          EXPLICAÇÃO
                      ====================================== */}

                      <div className="mt-6 rounded-2xl bg-slate-50 p-4 sm:p-5">
                        <p className="text-sm font-bold text-slate-800">
                          Explicação
                        </p>

                        <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                          {
                            question.explanation
                          }
                        </p>

                        {/* ===================================
                            EXPLICAÇÃO DO ERRO
                        ==================================== */}

                        {userAnswer &&
                          !correct && (
                            <div className="mt-4 border-t border-slate-200 pt-4">
                              <p className="text-[10px] font-bold uppercase leading-5 tracking-wider text-slate-400 sm:text-xs">
                                Por que sua
                                alternativa estava
                                incorreta?
                              </p>

                              <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                                {
                                  question
                                    .alternativeExplanations[
                                    userAnswer
                                  ] ??
                                  "Não há uma explicação adicional cadastrada para esta alternativa."
                                }
                              </p>
                            </div>
                          )}

                        {/* ===================================
                            EXPLICAÇÃO DA CORRETA
                        ==================================== */}

                        {!correct && (
                          <div className="mt-4 border-t border-slate-200 pt-4">
                            <p className="text-[10px] font-bold uppercase leading-5 tracking-wider text-emerald-600 sm:text-xs">
                              Por que a resposta
                              correta está certa?
                            </p>

                            <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                              {
                                question
                                  .alternativeExplanations[
                                  question
                                    .correctAnswer
                                ] ??
                                question.explanation
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            AÇÕES FINAIS
        ==================================================== */}

        <section className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:flex sm:flex-wrap sm:justify-center">
          <Link
            href="/simulado/novo"
            className="min-h-12 rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Fazer outro simulado
          </Link>

          <Link
            href="/recomendado"
            className="min-h-12 rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-3 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
          >
            ✨ Simulado recomendado
          </Link>

          <Link
            href="/historico"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Histórico
          </Link>

          <Link
            href="/"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Voltar ao painel
          </Link>
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          Resultado calculado a partir
          da prova submetida nesta sessão.
        </footer>
      </div>
    </main>
  );
}