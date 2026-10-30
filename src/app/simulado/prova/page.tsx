"use client";


import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";
import { ReportQuestionButton } from "@/components/support/report-question-button";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  loadExamProgress,
  loadExamSession,
  saveExamProgress,
  saveExamSubmission,
} from "@/lib/exam-session";

import {
  saveCompletedExam,
} from "@/lib/exam-history";
import { ExamGradeError, consumeQuestionQuota, gradeExamOnServer } from "@/lib/exam-generation-client";
import { saveGradedQuestions } from "@/lib/exam-session";
import { FreeLimitCard } from "@/components/student/free-limit-card";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/page-state";

import type {
  ExamProgress,
  ExamSession,
  ExamSubmission,
} from "@/types/exam";

import type {
  PublicQuestion as Question,
} from "@/types/question";

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
 * SCROLL
 * =========================================================
 */

function getPreferredScrollBehavior():
  ScrollBehavior {
  if (
    typeof window ===
    "undefined"
  ) {
    return "auto";
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
    ? "auto"
    : "smooth";
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function ExamPage() {
  const [confirmBlankOpen, setConfirmBlankOpen] = useState(false);
  const [limitDismissed, setLimitDismissed] = useState(false);
  const router =
    useRouter();

  const [
    session,
    setSession,
  ] =
    useState<ExamSession | null>(
      null
    );

  const [
    progress,
    setProgress,
  ] =
    useState<ExamProgress | null>(
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
    loadError,
    setLoadError,
  ] =
    useState<string | null>(
      null
    );

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(
      false
    );

  const [
    consumingQuestionId,
    setConsumingQuestionId,
  ] = useState<string | null>(null);

  const [
    quotaReached,
    setQuotaReached,
  ] = useState(false);

  const [
    interactionMessage,
    setInteractionMessage,
  ] =
    useState(
      ""
    );

  /*
   * =========================================================
   * REFERÊNCIAS DE FOCO
   * =========================================================
   */

  const questionHeadingRef =
    useRef<HTMLHeadingElement | null>(
      null
    );

  const submitErrorRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const previousQuestionIndexRef =
    useRef<number | null>(
      null
    );

  /*
   * =========================================================
   * CARREGAMENTO INICIAL
   * =========================================================
   */

  const loadExam =
    useCallback(
      () => {
        setLoading(
          true
        );

        setLoadError(
          null
        );

        setSubmitError(
          null
        );

        setInteractionMessage(
          ""
        );

        try {
          const storedSession =
            loadExamSession();

          if (
            !storedSession
          ) {
            setSession(
              null
            );

            setProgress(
              null
            );

            setQuestions(
              []
            );

            return;
          }

          // As questões (sem gabarito) chegam do servidor junto com a sessão.
          const storedQuestions =
            storedSession.questions ?? [];

          if (
            storedQuestions.length ===
              0 ||
            !storedSession.token
          ) {
            throw new Error(
              "Este simulado foi criado numa versão anterior do NabuLab. Gere um novo simulado para continuar."
            );
          }

          let storedProgress =
            loadExamProgress();

          if (
            !storedProgress ||
            storedProgress.sessionId !==
              storedSession.id
          ) {
            storedProgress = {
              sessionId:
                storedSession.id,

              startedAt:
                new Date().toISOString(),

              currentIndex:
                0,

              answers:
                {},

              reviewQuestionIds:
                [],
            };

            saveExamProgress(
              storedProgress
            );
          }

          /*
           * Garante que um índice inválido
           * armazenado anteriormente não
           * quebre a página.
           */

          const safeCurrentIndex =
            Math.min(
              Math.max(
                storedProgress.currentIndex,
                0
              ),
              storedQuestions.length -
                1
            );

          if (
            safeCurrentIndex !==
            storedProgress.currentIndex
          ) {
            storedProgress = {
              ...storedProgress,

              currentIndex:
                safeCurrentIndex,
            };

            saveExamProgress(
              storedProgress
            );
          }

          setSession(
            storedSession
          );

          setQuestions(
            storedQuestions
          );

          setProgress(
            storedProgress
          );

          setIsSubmitting(
            false
          );
        } catch (
          error
        ) {
          console.error(
            "Erro ao carregar simulado:",
            error
          );

          setSession(
            null
          );

          setProgress(
            null
          );

          setQuestions(
            []
          );

          setLoadError(
            error instanceof Error
              ? error.message
              : "Não foi possível carregar o simulado."
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
    loadExam();
  }, [
    loadExam,
  ]);

  /*
   * =========================================================
   * ATUALIZAR PROGRESSO
   * =========================================================
   */

  function updateProgress(
    updater:
      (
        current:
          ExamProgress
      ) => ExamProgress
  ) {
    setProgress(
      (current) => {
        if (
          !current
        ) {
          return current;
        }

        const next =
          updater(
            current
          );

        try {
          saveExamProgress(
            next
          );
        } catch (
          error
        ) {
          console.error(
            "Erro ao salvar progresso:",
            error
          );
        }

        return next;
      }
    );
  }

  /*
   * =========================================================
   * CONTADORES
   * =========================================================
   */

  const answeredCount =
    useMemo(() => {
      if (
        !progress
      ) {
        return 0;
      }

      const currentQuestionIds =
        new Set(
          questions.map(
            (
              question
            ) =>
              question.id
          )
        );

      return Object.keys(
        progress.answers
      ).filter(
        (
          questionId
        ) =>
          currentQuestionIds.has(
            questionId
          )
      ).length;
    }, [
      progress,
      questions,
    ]);

  const reviewCount =
    useMemo(() => {
      if (
        !progress
      ) {
        return 0;
      }

      const currentQuestionIds =
        new Set(
          questions.map(
            (
              question
            ) =>
              question.id
          )
        );

      return progress.reviewQuestionIds.filter(
        (
          questionId
        ) =>
          currentQuestionIds.has(
            questionId
          )
      ).length;
    }, [
      progress,
      questions,
    ]);

  /*
   * =========================================================
   * ÍNDICE SEGURO PARA EFEITOS
   * =========================================================
   */

  const currentIndexForEffects =
    progress &&
    questions.length >
      0
      ? Math.min(
          Math.max(
            progress.currentIndex,
            0
          ),
          questions.length -
            1
        )
      : null;

  /*
   * =========================================================
   * FOCO AO TROCAR DE QUESTÃO
   * =========================================================
   */

  useEffect(() => {
    if (
      currentIndexForEffects ===
      null
    ) {
      previousQuestionIndexRef.current =
        null;

      return;
    }

    if (
      previousQuestionIndexRef.current ===
      null
    ) {
      previousQuestionIndexRef.current =
        currentIndexForEffects;

      return;
    }

    if (
      previousQuestionIndexRef.current ===
      currentIndexForEffects
    ) {
      return;
    }

    previousQuestionIndexRef.current =
      currentIndexForEffects;

    const frame =
      window.requestAnimationFrame(
        () => {
          questionHeadingRef
            .current
            ?.focus({
              preventScroll:
                true,
            });
        }
      );

    return () => {
      window.cancelAnimationFrame(
        frame
      );
    };
  }, [
    currentIndexForEffects,
  ]);

  /*
   * =========================================================
   * FOCO EM ERRO DE SUBMISSÃO
   * =========================================================
   */

  useEffect(() => {
    if (
      !submitError
    ) {
      return;
    }

    const frame =
      window.requestAnimationFrame(
        () => {
          submitErrorRef
            .current
            ?.focus();
        }
      );

    return () => {
      window.cancelAnimationFrame(
        frame
      );
    };
  }, [
    submitError,
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
        title="Preparando seu simulado..."
        description="Recuperando as questões e seu progresso atual."
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
        title="Não foi possível abrir o simulado"
        description="A sessão atual não pôde ser carregada corretamente."
        details={
          process.env.NODE_ENV ===
          "development"
            ? loadError
            : undefined
        }
        onRetry={
          loadExam
        }
        actionLabel="Criar outro simulado"
        actionHref="/simulado/novo"
      />
    );
  }

  /*
   * =========================================================
   * SEM PROVA ATIVA
   * =========================================================
   */

  if (
    !session ||
    !progress ||
    questions.length ===
      0
  ) {
    return (
      <EmptyState
        fullScreen
        icon="novo-simulado"
        eyebrow="Simulado"
        title="Nenhum simulado ativo"
        description="Crie um novo simulado antes de acessar a tela da prova."
        actionLabel="Criar simulado"
        actionHref="/simulado/novo"
        secondaryLabel="Voltar ao painel"
        secondaryHref="/"
      />
    );
  }

  /*
   * =========================================================
   * QUESTÃO ATUAL
   * =========================================================
   */

  const currentIndex =
    Math.min(
      Math.max(
        progress.currentIndex,
        0
      ),
      questions.length -
        1
    );

  const currentQuestion =
    questions[
      currentIndex
    ];

  const selectedAnswer =
    progress.answers[
      currentQuestion.id
    ];

  const isMarkedForReview =
    progress.reviewQuestionIds.includes(
      currentQuestion.id
    );

  const unansweredCount =
    Math.max(
      0,
      questions.length -
        answeredCount
    );

  const percentage =
    questions.length >
    0
      ? Math.round(
          (
            answeredCount /
            questions.length
          ) *
            100
        )
      : 0;

  /*
   * =========================================================
   * RESPONDER
   * =========================================================
   */

  async function selectAnswer(
    alternativeId:
      string
  ) {
    if (
      isSubmitting ||
      consumingQuestionId !== null
    ) {
      return;
    }

    setSubmitError(
      null
    );

    if (selectedAnswer === undefined) {
      setConsumingQuestionId(
        currentQuestion.id
      );

      try {
        const quota =
          await consumeQuestionQuota(
            session!.id,
            currentQuestion.id
          );

        if (!quota.allowed) {
          setQuotaReached(
            true
          );
          setSubmitError(
            "Você usou suas 10 questões grátis de hoje. Volte amanhã, conheça o Premium para continuar ou envie o simulado atual para revisar o que já respondeu."
          );

          setInteractionMessage(
            "A franquia diária de 10 questões grátis foi concluída."
          );

          return;
        }
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Não foi possível registrar esta resposta."
        );

        setInteractionMessage(
          "A resposta não foi registrada."
        );

        return;
      } finally {
        setConsumingQuestionId(
          null
        );
      }
    }

    updateProgress(
      (current) => ({
        ...current,

        answers: {
          ...current.answers,

          [currentQuestion.id]:
            alternativeId,
        },
      })
    );

    const alternative =
      currentQuestion.alternatives.find(
        (
          item
        ) =>
          item.id ===
          alternativeId
      );

    setInteractionMessage(
      alternative
        ? `Resposta ${alternative.id} selecionada na questão ${currentIndex + 1}.`
        : `Resposta registrada na questão ${currentIndex + 1}.`
    );
  }

  /*
   * =========================================================
   * MARCAR PARA REVISÃO
   * =========================================================
   */

  function toggleReview() {
    if (
      isSubmitting
    ) {
      return;
    }

    setSubmitError(
      null
    );

    const nextMarked =
      !isMarkedForReview;

    updateProgress(
      (current) => {
        const alreadyMarked =
          current.reviewQuestionIds.includes(
            currentQuestion.id
          );

        return {
          ...current,

          reviewQuestionIds:
            alreadyMarked
              ? current.reviewQuestionIds.filter(
                  (
                    id
                  ) =>
                    id !==
                    currentQuestion.id
                )
              : [
                  ...current.reviewQuestionIds,

                  currentQuestion.id,
                ],
        };
      }
    );

    setInteractionMessage(
      nextMarked
        ? `Questão ${currentIndex + 1} marcada para revisão.`
        : `Questão ${currentIndex + 1} removida da revisão.`
    );
  }

  /*
   * =========================================================
   * NAVEGAR ENTRE QUESTÕES
   * =========================================================
   */

  function goToQuestion(
    index:
      number
  ) {
    if (
      isSubmitting
    ) {
      return;
    }

    if (
      index < 0 ||
      index >=
        questions.length
    ) {
      return;
    }

    if (
      index ===
      currentIndex
    ) {
      questionHeadingRef
        .current
        ?.focus();

      return;
    }

    setSubmitError(
      null
    );

    setInteractionMessage(
      ""
    );

    updateProgress(
      (current) => ({
        ...current,

        currentIndex:
          index,
      })
    );

    window.requestAnimationFrame(
      () => {
        window.scrollTo({
          top:
            0,

          behavior:
            getPreferredScrollBehavior(),
        });
      }
    );
  }

  /*
   * =========================================================
   * SUBMETER PROVA
   * =========================================================
   */

function handleSubmit() {
  void submitExam(false);
}

async function submitExam(confirmedBlank: boolean) {
  if (
    isSubmitting
  ) {
    return;
  }

  if (
    !session ||
    !progress
  ) {
    setSubmitError(
      "A sessão do simulado não está disponível. Recarregue a página e tente novamente."
    );

    return;
  }

  setSubmitError(
    null
  );

    // Questões em branco: confirma numa janela do próprio site (a confirmação
    // nativa do navegador trava a página e não combina com o app).
    if (
      unansweredCount >
        0 &&
      !confirmedBlank
    ) {
      setConfirmBlankOpen(
        true
      );

      return;
    }

    setIsSubmitting(
      true
    );

    setInteractionMessage(
      "Finalizando o simulado."
    );

    const submission:
      ExamSubmission = {
      sessionId:
        session.id,

      submittedAt:
        new Date().toISOString(),

      answers: {
        ...progress.answers,
      },

      reviewQuestionIds: [
        ...progress.reviewQuestionIds,
      ],
    };

    try {
      saveExamSubmission(
        submission
      );
    } catch (
      error
    ) {
      console.error(
        "Erro ao salvar submissão:",
        error
      );

      setSubmitError(
        "Não foi possível preparar o resultado da prova. Tente novamente."
      );

      setInteractionMessage(
        ""
      );

      setIsSubmitting(
        false
      );

      return;
    }

    try {
      // A correção é feita no servidor; só então o gabarito chega ao navegador.
      const graded =
        await gradeExamOnServer(
          session.token ?? "",
          submission.answers
        );
      saveGradedQuestions(
        session.id,
        graded.questions,
        graded.upsell
      );
      await saveCompletedExam({
        session,
        progress,
        submission,
        questions: graded.questions,
      });
    } catch (error) {
      console.error("Erro ao corrigir ou salvar a prova:", error);
      setSubmitError(error instanceof ExamGradeError ? error.message : "Não foi possível salvar o resultado. Tente novamente.");
      setInteractionMessage("");
      setIsSubmitting(false);
      return;
    }

    router.push(
      "/simulado/resultado"
    );
  }

  /*
   * =========================================================
   * ABANDONAR
   * =========================================================
   */

  function preventNavigationWhileSubmitting(
    event:
      React.MouseEvent<HTMLAnchorElement>
  ) {
    if (
      !isSubmitting
    ) {
      return;
    }

    event.preventDefault();
  }

  /*
   * =========================================================
   * INTERFACE
   * =========================================================
   */

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#F5F7FB] pb-6"
      aria-busy={
        isSubmitting
      }
    >
      {/* =====================================================
          ATUALIZAÇÕES PARA TECNOLOGIA ASSISTIVA
      ====================================================== */}

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {
          interactionMessage
        }
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-8">
          {/* =================================================
              MARCA
          ================================================== */}

          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/branding/icone-app.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 rounded-xl object-contain sm:h-10 sm:w-10"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
                NabuLab
              </p>

              <p className="hidden text-xs text-slate-500 sm:block">
                Simulado em andamento
              </p>
            </div>
          </div>

          {/* =================================================
              MOBILE
          ================================================== */}

          <div className="flex shrink-0 items-center gap-2 sm:hidden">
            <div className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-center">
              <p className="text-[9px] font-semibold text-[#3B82F6]">
                Questão
              </p>

              <p className="text-xs font-bold text-[#0B2D6B]">
                {
                  currentIndex +
                  1
                }
                /
                {
                  questions.length
                }
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-center">
              <p className="text-[9px] font-semibold text-emerald-500">
                Feitas
              </p>

              <p className="text-xs font-bold text-emerald-700">
                {
                  answeredCount
                }
              </p>
            </div>
          </div>

          {/* =================================================
              TABLET / DESKTOP
          ================================================== */}

          <div className="hidden items-center gap-5 sm:flex">
            <div className="text-right">
              <p className="text-xs text-slate-400">
                Questão
              </p>

              <p className="text-sm font-bold text-slate-800">
                {
                  currentIndex +
                  1
                }{" "}
                /{" "}
                {
                  questions.length
                }
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">
                Respondidas
              </p>

              <p className="text-sm font-bold text-emerald-600">
                {
                  answeredCount
                }{" "}
                /{" "}
                {
                  questions.length
                }
              </p>
            </div>

            <div className="hidden text-right md:block">
              <p className="text-xs text-slate-400">
                Revisão
              </p>

              <p className="text-sm font-bold text-amber-600">
                {
                  reviewCount
                }
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            BARRA DE PROGRESSO
        ==================================================== */}

        <div
          className="h-1.5 bg-slate-100"
          role="progressbar"
          aria-label="Questões respondidas"
          aria-valuemin={0}
          aria-valuemax={
            questions.length
          }
          aria-valuenow={
            answeredCount
          }
          aria-valuetext={`${answeredCount} de ${questions.length} questões respondidas, ${percentage}%`}
        >
          <div
            className="h-full bg-[#3B82F6] transition-all duration-300"
            style={{
              width:
                `${percentage}%`,
            }}
          />
        </div>
      </header>

      {/* =====================================================
          NAVEGAÇÃO RÁPIDA MOBILE / TABLET
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white xl:hidden">
        <div className="mx-auto max-w-[1500px] px-4 py-3 sm:px-5 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-bold text-slate-700">
              Navegação rápida
            </h2>

            <div className="flex items-center gap-3 text-[10px] font-semibold">
              <span className="text-emerald-600">
                {
                  answeredCount
                }{" "}
                respondidas
              </span>

              {reviewCount >
                0 && (
                <span className="text-amber-600">
                  <span aria-hidden="true" className="shrink-0">
                    <Icon name="bandeira-marcada" size={18} />
                  </span>{" "}
                  {
                    reviewCount
                  }
                </span>
              )}
            </div>
          </div>

          <nav
            className="-mx-1 mt-3 overflow-x-auto px-1 pb-1"
            aria-label="Questões do simulado"
          >
            <div className="flex min-w-max gap-2">
              {questions.map(
                (
                  question,
                  index
                ) => {
                  const answered =
                    Boolean(
                      progress.answers[
                        question.id
                      ]
                    );

                  const marked =
                    progress.reviewQuestionIds.includes(
                      question.id
                    );

                  const active =
                    index ===
                    currentIndex;

                  return (
                    <button
                      key={
                        question.id
                      }
                      type="button"
                      disabled={
                        isSubmitting
                      }
                      aria-label={`Questão ${
                        index +
                        1
                      }${
                        active
                          ? ", atual"
                          : ""
                      }${
                        answered
                          ? ", respondida"
                          : ", não respondida"
                      }${
                        marked
                          ? ", marcada para revisão"
                          : ""
                      }`}
                      aria-current={
                        active
                          ? "step"
                          : undefined
                      }
                      onClick={() =>
                        goToQuestion(
                          index
                        )
                      }
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        active
                          ? "border-[#0B2D6B] bg-[#0B2D6B] text-white"
                          : answered
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    >
                      {
                        index +
                        1
                      }

                      {marked && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[8px] text-white"
                        >
                          <Icon name="bandeira-marcada" size={18} />
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </nav>
        </div>
      </section>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-5 sm:py-7 md:px-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
        {/* ===================================================
            QUESTÃO
        ==================================================== */}

        <section
          className="min-w-0"
          aria-labelledby="current-question-heading"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
            {/* =================================================
                INFORMAÇÕES
            ================================================== */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#0B2D6B] sm:px-3 sm:text-xs">
                  Questão{" "}
                  {
                    currentIndex +
                    1
                  }{" "}
                  de{" "}
                  {
                    questions.length
                  }
                </span>

                <span className="max-w-full rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                  {
                    currentQuestion.subjectName
                  }
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                  {getDifficultyLabel(
                    currentQuestion.difficulty
                  )}
                </span>

                <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#3B82F6] sm:inline-flex sm:px-3 sm:text-xs">
                  {getQuestionTypeLabel(
                    currentQuestion.type
                  )}
                </span>
              </div>

              <button
                type="button"
                disabled={
                  isSubmitting
                }
                aria-pressed={
                  isMarkedForReview
                }
                aria-label={
                  isMarkedForReview
                    ? `Remover questão ${currentIndex + 1} da revisão`
                    : `Marcar questão ${currentIndex + 1} para revisão`
                }
                onClick={
                  toggleReview
                }
                className={`min-h-11 w-full shrink-0 rounded-xl border px-4 py-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
                  isMarkedForReview
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                <span aria-hidden="true">
                  {isMarkedForReview
                    ? <Icon name="bandeira-marcada" size={14} className="inline-block align-[-0.2em]" />
                    : <Icon name="bandeira" size={14} className="inline-block align-[-0.2em]" />}
                </span>{" "}
                {isMarkedForReview
                  ? "Marcada para revisão"
                  : "Marcar para revisão"}
              </button>
            </div>

            {/* =================================================
                TIPO MOBILE
            ================================================== */}

            <div className="mt-3 sm:hidden">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-[#3B82F6]">
                {getQuestionTypeLabel(
                  currentQuestion.type
                )}
              </span>
            </div>

            {/* =================================================
                ENUNCIADO
            ================================================== */}

            <div className="mt-5 sm:mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="break-words text-[10px] font-semibold uppercase leading-5 tracking-wider text-slate-400 sm:text-xs">
                  {
                    currentQuestion.topic
                  }{" "}
                  •{" "}
                  {
                    currentQuestion.subtopic
                  }
                </p>
                <ReportQuestionButton question={{ id: currentQuestion.id, subjectName: currentQuestion.subjectName, topic: currentQuestion.topic, subtopic: currentQuestion.subtopic }} />
              </div>

              <h1
                ref={
                  questionHeadingRef
                }
                id="current-question-heading"
                tabIndex={-1}
                className="mt-3 break-words text-lg font-bold leading-7 text-slate-900 outline-none sm:text-xl sm:leading-8 md:text-2xl md:leading-9"
              >
                {
                  currentQuestion.statement
                }
              </h1>

              <p className="sr-only">
                {selectedAnswer
                  ? "Esta questão já possui uma resposta selecionada."
                  : "Esta questão ainda não foi respondida."}
                {" "}
                {isMarkedForReview
                  ? "Está marcada para revisão."
                  : ""}
              </p>
            </div>

            {/* =================================================
                ALTERNATIVAS
            ================================================== */}

            <fieldset className="mt-6 sm:mt-8">
              <legend className="sr-only">
                Alternativas da questão{" "}
                {
                  currentIndex +
                  1
                }
                . Escolha uma resposta.
              </legend>

              <div className="space-y-3">
                {currentQuestion.alternatives.map(
                  (
                    alternative
                  ) => {
                    const selected =
                      selectedAnswer ===
                      alternative.id;

                    return (
                      <label
                        key={
                          alternative.id
                        }
                        className={`block ${
                          isSubmitting
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={
                            alternative.id
                          }
                          checked={
                            selected
                          }
                          disabled={
                            isSubmitting ||
                            consumingQuestionId !== null
                          }
                          onChange={() =>
                            void selectAnswer(
                              alternative.id
                            )
                          }
                          className="peer sr-only"
                        />

                        <span
                          className={`flex min-h-[64px] w-full items-start gap-3 rounded-xl border p-3 text-left transition peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#3B82F6] sm:min-h-[72px] sm:gap-4 sm:rounded-2xl sm:p-4 ${
                            selected
                              ? "border-[#3B82F6] bg-blue-50 ring-2 ring-blue-100"
                              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold sm:h-9 sm:w-9 sm:text-sm ${
                              selected
                                ? "border-[#0B2D6B] bg-[#0B2D6B] text-white"
                                : "border-slate-300 bg-white text-slate-500"
                            }`}
                            aria-hidden="true"
                          >
                            {
                              alternative.id
                            }
                          </span>

                          <span
                            className={`min-w-0 flex-1 break-words pt-1 text-sm leading-6 sm:pt-1.5 ${
                              selected
                                ? "font-semibold text-[#0B2D6B]"
                                : "text-slate-700"
                            }`}
                          >
                            {
                              alternative.text
                            }
                          </span>
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            </fieldset>

            {/* =================================================
                ERRO DE SUBMISSÃO
            ================================================== */}

            {submitError && (
              <div
                ref={
                  submitErrorRef
                }
                tabIndex={-1}
                role="alert"
                aria-atomic="true"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 outline-none"
              >
                <p className="text-xs font-bold text-red-700">
                  Atenção
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-red-600">
                  {
                    submitError
                  }
                </p>

                {quotaReached && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setLimitDismissed(false)} className="rounded-lg bg-[#0B2D6B] px-3 py-2 text-xs font-bold text-white">
                      Ver opções
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                NAVEGAÇÃO INFERIOR
            ================================================== */}

            <nav
              className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:mt-8 sm:flex sm:items-center sm:justify-between sm:pt-6"
              aria-label="Navegação entre questões"
            >
              <button
                type="button"
                disabled={
                  currentIndex ===
                    0 ||
                  isSubmitting
                }
                onClick={() =>
                  goToQuestion(
                    currentIndex -
                      1
                  )
                }
                className="min-h-12 rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-sm"
              >
                <Icon name="voltar" size={16} className="mr-1.5 inline-block shrink-0 align-[-0.2em]" />Anterior
              </button>

              {currentIndex <
              questions.length -
                1 ? (
                <button
                  type="button"
                  disabled={
                    isSubmitting
                  }
                  onClick={() =>
                    goToQuestion(
                      currentIndex +
                        1
                    )
                  }
                  className="min-h-12 rounded-xl bg-[#0B2D6B] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#174EA6] disabled:cursor-not-allowed disabled:bg-slate-300 sm:px-5 sm:text-sm"
                >
                  Próxima<Icon name="avancar" size={16} className="ml-1.5 inline-block shrink-0 align-[-0.2em]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={
                    handleSubmit
                  }
                  disabled={
                    isSubmitting
                  }
                  className="min-h-12 rounded-xl bg-emerald-600 px-3 py-3 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:px-5 sm:text-sm"
                >
                  {isSubmitting
                    ? "Finalizando..."
                    : "Submeter prova"}
                </button>
              )}
            </nav>

            {/* =================================================
                CONTADORES MOBILE
            ================================================== */}

            <div className="mt-5 grid grid-cols-3 gap-2 sm:hidden">
              <div className="rounded-xl bg-emerald-50 p-3 text-center">
                <p className="text-[9px] font-semibold text-emerald-500">
                  Respondidas
                </p>

                <p className="mt-1 font-bold text-emerald-700">
                  {
                    answeredCount
                  }
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <p className="text-[9px] font-semibold text-slate-400">
                  Em branco
                </p>

                <p className="mt-1 font-bold text-slate-700">
                  {
                    unansweredCount
                  }
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-center">
                <p className="text-[9px] font-semibold text-amber-500">
                  Revisão
                </p>

                <p className="mt-1 font-bold text-amber-700">
                  {
                    reviewCount
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            NAVEGAÇÃO LATERAL — DESKTOP
        ==================================================== */}

        <aside
          className="hidden xl:sticky xl:top-24 xl:block xl:self-start"
          aria-labelledby="desktop-exam-navigation-heading"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2
              id="desktop-exam-navigation-heading"
              className="font-bold text-slate-900"
            >
              Navegação da prova
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Você pode voltar para
              qualquer questão antes
              de submeter.
            </p>

            <nav
              className="mt-5 grid grid-cols-5 gap-2"
              aria-label="Questões do simulado"
            >
              {questions.map(
                (
                  question,
                  index
                ) => {
                  const answered =
                    Boolean(
                      progress.answers[
                        question.id
                      ]
                    );

                  const marked =
                    progress.reviewQuestionIds.includes(
                      question.id
                    );

                  const active =
                    index ===
                    currentIndex;

                  return (
                    <button
                      key={
                        question.id
                      }
                      type="button"
                      disabled={
                        isSubmitting
                      }
                      aria-label={`Questão ${
                        index +
                        1
                      }${
                        active
                          ? ", atual"
                          : ""
                      }${
                        answered
                          ? ", respondida"
                          : ", não respondida"
                      }${
                        marked
                          ? ", marcada para revisão"
                          : ""
                      }`}
                      aria-current={
                        active
                          ? "step"
                          : undefined
                      }
                      onClick={() =>
                        goToQuestion(
                          index
                        )
                      }
                      className={`relative flex aspect-square items-center justify-center rounded-lg border text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        active
                          ? "border-[#0B2D6B] bg-[#0B2D6B] text-white"
                          : answered
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-300"
                      }`}
                    >
                      {
                        index +
                        1
                      }

                      {marked && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[8px] text-white"
                        >
                          <Icon name="bandeira-marcada" size={18} />
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </nav>

            {/* =================================================
                LEGENDA
            ================================================== */}

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-[#0B2D6B]"
                  aria-hidden="true"
                />

                Atual
              </span>

              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />

                Respondida
              </span>

              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-slate-300"
                  aria-hidden="true"
                />

                Em branco
              </span>

              <span className="flex items-center gap-1.5">
                <span
                  className="text-amber-500"
                  aria-hidden="true"
                >
                  <Icon name="bandeira-marcada" size={18} />
                </span>

                Revisão
              </span>
            </div>

            {/* =================================================
                RESUMO
            ================================================== */}

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Respondidas
                </span>

                <strong className="text-emerald-600">
                  {
                    answeredCount
                  }
                </strong>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Não respondidas
                </span>

                <strong className="text-slate-700">
                  {
                    unansweredCount
                  }
                </strong>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Para revisão
                </span>

                <strong className="text-amber-600">
                  {
                    reviewCount
                  }
                </strong>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Progresso
                </span>

                <strong className="text-[#3B82F6]">
                  {
                    percentage
                  }
                  %
                </strong>
              </div>
            </div>

            {/* =================================================
                SUBMETER
            ================================================== */}

            <button
              type="button"
              onClick={
                handleSubmit
              }
              disabled={
                isSubmitting
              }
              className="mt-6 min-h-12 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting
                ? "Finalizando..."
                : unansweredCount >
                    0
                  ? `Submeter (${unansweredCount} em branco)`
                  : "Submeter prova"}
            </button>

            <Link
              href="/simulado/novo"
              aria-disabled={
                isSubmitting
              }
              tabIndex={
                isSubmitting
                  ? -1
                  : undefined
              }
              onClick={
                preventNavigationWhileSubmitting
              }
              className={`mt-3 block rounded-lg py-2 text-center text-xs font-semibold transition ${
                isSubmitting
                  ? "pointer-events-none text-slate-300"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              Abandonar e criar
              outra prova
            </Link>
          </div>
        </aside>
      </div>

      {/* =====================================================
          ATALHO SUBMETER — MOBILE / TABLET
      ====================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 sm:px-5 md:px-8 xl:hidden">
        <section
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          aria-labelledby="mobile-submit-heading"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="mobile-submit-heading"
                className="text-sm font-bold text-slate-900"
              >
                Finalizar simulado
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {unansweredCount >
                0
                  ? `${unansweredCount} ${
                      unansweredCount ===
                      1
                        ? "questão ainda está"
                        : "questões ainda estão"
                    } sem resposta.`
                  : "Todas as questões foram respondidas."}
              </p>
            </div>

            <button
              type="button"
              onClick={
                handleSubmit
              }
              disabled={
                isSubmitting
              }
              className="min-h-12 w-full shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              {isSubmitting
                ? "Finalizando..."
                : "Submeter prova"}
            </button>
          </div>

          <Link
            href="/simulado/novo"
            aria-disabled={
              isSubmitting
            }
            tabIndex={
              isSubmitting
                ? -1
                : undefined
            }
            onClick={
              preventNavigationWhileSubmitting
            }
            className={`mt-3 block rounded-lg py-2 text-center text-xs font-semibold transition ${
              isSubmitting
                ? "pointer-events-none text-slate-300"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            }`}
          >
            Abandonar e criar outra prova
          </Link>
        </section>
      </div>
      {quotaReached && !limitDismissed && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center" role="presentation" onClick={() => setLimitDismissed(true)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
            <FreeLimitCard
              placement="exam"
              answeredInExam={Object.keys(progress?.answers ?? {}).length}
              onSubmitExam={() => { setLimitDismissed(true); handleSubmit(); }}
              onClose={() => setLimitDismissed(true)}
            />
          </div>
        </div>
      )}
      {confirmBlankOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center" role="presentation" onClick={() => setConfirmBlankOpen(false)}>
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirmar-branco"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="confirmar-branco" className="text-lg font-black text-[#0B2D6B]">
              {unansweredCount} {unansweredCount === 1 ? "questão ficou" : "questões ficaram"} em branco
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Questões em branco contam como não respondidas. Quer voltar e responder ou entregar assim mesmo?</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button type="button" autoFocus onClick={() => { setConfirmBlankOpen(false); setInteractionMessage("Envio cancelado. Você pode continuar respondendo o simulado."); }} className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Continuar respondendo</button>
              <button type="button" onClick={() => { setConfirmBlankOpen(false); void submitExam(true); }} className="min-h-12 rounded-xl bg-[#0B2D6B] px-4 py-3 text-sm font-bold text-white hover:bg-[#174EA6]">Entregar assim mesmo</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
