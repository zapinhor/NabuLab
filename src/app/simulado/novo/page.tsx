"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  subjects,
} from "@/data/subjects";

import {
  getTotalQuestions,
} from "@/data/questions";

import {
  countAvailableQuestions,
} from "@/lib/question-selector";

import {
  createExamSession,
} from "@/lib/quiz-engine";

import {
  clearExamSubmission,
  createInitialExamProgress,
  saveExamProgress,
  saveExamSession,
} from "@/lib/exam-session";

import type {
  ExamConfig,
  ExamDifficulty,
  ExamQuestionType,
} from "@/types/exam";

import type {
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * OPÇÕES
 * =========================================================
 */

const amountOptions = [
  5,
  10,
  15,
  20,
  30,
  50,
];

const difficulties: {
  id: ExamDifficulty;
  label: string;
  description: string;
}[] = [
  {
    id:
      "iniciante",

    label:
      "Iniciante",

    description:
      "Conceitos fundamentais e reconhecimento.",
  },

  {
    id:
      "medio",

    label:
      "Médio",

    description:
      "Relações fisiológicas e aplicação dos conceitos.",
  },

  {
    id:
      "avancado",

    label:
      "Avançado",

    description:
      "Integração, cálculos e raciocínio mais aprofundado.",
  },

  {
    id:
      "misto",

    label:
      "Misto",

    description:
      "Questões de todas as dificuldades.",
  },
];

const questionTypes: {
  id: ExamQuestionType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id:
      "multiple-choice",

    label:
      "Múltipla escolha",

    description:
      "Questões com quatro alternativas.",

    icon:
      "🔤",
  },

  {
    id:
      "true-false",

    label:
      "Verdadeiro ou falso",

    description:
      "Afirmações para julgar como verdadeiras ou falsas.",

    icon:
      "⚖️",
  },

  {
    id:
      "misto",

    label:
      "Misto",

    description:
      "Combina múltipla escolha e verdadeiro ou falso.",

    icon:
      "🔀",
  },
];

/*
 * =========================================================
 * LABELS
 * =========================================================
 */

function getDifficultyLabel(
  difficulty:
    ExamDifficulty
) {
  return (
    difficulties.find(
      (item) =>
        item.id ===
        difficulty
    )?.label ??
    difficulty
  );
}

function getQuestionTypeLabel(
  type:
    ExamQuestionType
) {
  return (
    questionTypes.find(
      (item) =>
        item.id ===
        type
    )?.label ??
    type
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function NewExamPage() {
  const router =
    useRouter();

  const totalBankQuestions =
    getTotalQuestions();

  /*
   * =========================================================
   * CONFIGURAÇÃO
   * =========================================================
   */

  const [
    config,
    setConfig,
  ] =
    useState<ExamConfig>({
      amount:
        10,

      subjects:
        subjects.map(
          (subject) =>
            subject.id
        ),

      difficulty:
        "misto",

      questionType:
        "multiple-choice",

      shuffleQuestions:
        true,

      shuffleAlternatives:
        true,
    });

  const [
    generating,
    setGenerating,
  ] =
    useState(
      false
    );

  const [
    generationError,
    setGenerationError,
  ] =
    useState<string | null>(
      null
    );

  const generationErrorRef =
    useRef<HTMLDivElement | null>(
      null
    );

  /*
   * =========================================================
   * DISPONIBILIDADE
   * =========================================================
   */

  const availableQuestions =
    useMemo(() => {
      return countAvailableQuestions(
        config
      );
    }, [
      config,
    ]);

  const actualAmount =
    Math.min(
      config.amount,
      availableQuestions
    );

  /*
   * =========================================================
   * MATÉRIAS
   * =========================================================
   */

  function toggleSubject(
    subjectId:
      SubjectId
  ) {
    setGenerationError(
      null
    );

    setConfig(
      (current) => {
        const alreadySelected =
          current.subjects.includes(
            subjectId
          );

        if (
          alreadySelected
        ) {
          return {
            ...current,

            subjects:
              current.subjects.filter(
                (subject) =>
                  subject !==
                  subjectId
              ),
          };
        }

        return {
          ...current,

          subjects: [
            ...current.subjects,
            subjectId,
          ],
        };
      }
    );
  }

  function selectAllSubjects() {
    setGenerationError(
      null
    );

    setConfig(
      (current) => ({
        ...current,

        subjects:
          subjects.map(
            (subject) =>
              subject.id
          ),
      })
    );
  }

  function clearSubjects() {
    setGenerationError(
      null
    );

    setConfig(
      (current) => ({
        ...current,

        subjects:
          [],
      })
    );
  }

  const allSubjectsSelected =
    config.subjects.length ===
    subjects.length;

  /*
   * =========================================================
   * VALIDAÇÃO
   * =========================================================
   */

  const generationBlockedReason =
    useMemo(() => {
      if (
        config.subjects.length ===
        0
      ) {
        return "Selecione pelo menos uma matéria antes de gerar o simulado.";
      }

      if (
        availableQuestions ===
        0
      ) {
        return "Não existem questões que correspondam aos filtros escolhidos. Altere as matérias, a dificuldade ou o tipo de questão.";
      }

      if (
        actualAmount ===
        0
      ) {
        return "Não há questões disponíveis para gerar este simulado.";
      }

      return null;
    }, [
      config.subjects.length,
      availableQuestions,
      actualAmount,
    ]);

  const canGenerate =
    !generating &&
    generationBlockedReason ===
      null;

  /*
   * =========================================================
   * FOCO EM ERRO
   * =========================================================
   */

  useEffect(() => {
    if (
      !generationError
    ) {
      return;
    }

    generationErrorRef
      .current
      ?.focus();
  }, [
    generationError,
  ]);

  /*
   * =========================================================
   * GERAR SIMULADO
   * =========================================================
   */

  function handleGenerateExam(
    event?:
      FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault();

    if (
      generating
    ) {
      return;
    }

    if (
      generationBlockedReason
    ) {
      setGenerationError(
        generationBlockedReason
      );

      return;
    }

    setGenerating(
      true
    );

    setGenerationError(
      null
    );

    try {
      const session =
        createExamSession(
          config
        );

      if (
        !session
      ) {
        throw new Error(
          "Não foi possível criar a sessão do simulado."
        );
      }

      clearExamSubmission();

      saveExamSession(
        session
      );

      const initialProgress =
        createInitialExamProgress(
          session.id
        );

      saveExamProgress(
        initialProgress
      );

      router.push(
        "/simulado/prova"
      );
    } catch (
      error
    ) {
      console.error(
        "Erro ao gerar simulado:",
        error
      );

      setGenerationError(
        error instanceof Error
          ? error.message
          : "Não foi possível gerar o simulado."
      );

      setGenerating(
        false
      );
    }
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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <Link
            href="/"
            aria-label="Fisio Simulado — voltar ao painel"
            className="flex min-w-0 items-center gap-3"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white"
              aria-hidden="true"
            >
              F
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-slate-900">
                Fisio Simulado
              </p>

              <p className="hidden text-xs text-slate-500 sm:block">
                Criador de simulados
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
            TÍTULO
        ==================================================== */}

        <section aria-labelledby="new-exam-title">
          <p className="text-sm font-semibold text-blue-600">
            Novo simulado
          </p>

          <h1
            id="new-exam-title"
            className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            Configure sua prova
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Escolha as matérias,
            dificuldade, tipo e quantidade
            de questões para montar uma
            prova personalizada.
          </p>
        </section>

        {/* ===================================================
            FORMULÁRIO
        ==================================================== */}

        <form
          onSubmit={
            handleGenerateExam
          }
          noValidate
          className="mt-6 grid gap-6 sm:mt-8 xl:grid-cols-[minmax(0,1fr)_350px]"
        >
          {/* =================================================
              CONFIGURAÇÕES
          ================================================== */}

          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* ===============================================
                QUANTIDADE
            ================================================ */}

            <section
              aria-labelledby="amount-heading"
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Etapa 1
                </p>

                <h2
                  id="amount-heading"
                  className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
                >
                  Quantidade de questões
                </h2>

                <p
                  id="amount-description"
                  className="mt-2 text-sm leading-6 text-slate-500"
                >
                  Escolha quantas questões
                  deseja responder.
                </p>
              </div>

              {/* =============================================
                  QUANTIDADES RÁPIDAS
              ============================================== */}

              <div
                className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3"
                role="group"
                aria-labelledby="amount-heading"
                aria-describedby="amount-description"
              >
                {amountOptions.map(
                  (
                    amount
                  ) => {
                    const selected =
                      config.amount ===
                      amount;

                    return (
                      <button
                        key={
                          amount
                        }
                        type="button"
                        aria-pressed={
                          selected
                        }
                        aria-label={`${amount} questões`}
                        onClick={() => {
                          setGenerationError(
                            null
                          );

                          setConfig(
                            (
                              current
                            ) => ({
                              ...current,

                              amount,
                            })
                          );
                        }}
                        className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-bold transition sm:min-w-[70px] sm:px-4 ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {
                          amount
                        }
                      </button>
                    );
                  }
                )}
              </div>

              {/* =============================================
                  PERSONALIZADA
              ============================================== */}

              <div className="mt-6">
                <label
                  htmlFor="custom-question-amount"
                  className="text-sm font-semibold text-slate-700"
                >
                  Quantidade personalizada
                </label>

                <p
                  id="custom-question-amount-help"
                  className="mt-1 text-xs leading-5 text-slate-500"
                >
                  Digite um valor entre{" "}
                  <strong>
                    1
                  </strong>{" "}
                  e{" "}
                  <strong>
                    {
                      totalBankQuestions
                    }
                  </strong>
                  . O banco atual possui{" "}
                  <strong>
                    {
                      totalBankQuestions
                    }
                  </strong>{" "}
                  questões.
                </p>

                <input
                  id="custom-question-amount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={
                    totalBankQuestions
                  }
                  step={1}
                  value={
                    config.amount
                  }
                  aria-describedby="custom-question-amount-help"
                  onChange={(
                    event
                  ) => {
                    const value =
                      Number(
                        event.target.value
                      );

                    if (
                      Number.isNaN(
                        value
                      )
                    ) {
                      return;
                    }

                    setGenerationError(
                      null
                    );

                    setConfig(
                      (
                        current
                      ) => ({
                        ...current,

                        amount:
                          Math.min(
                            totalBankQuestions,
                            Math.max(
                              1,
                              Math.floor(
                                value
                              )
                            )
                          ),
                      })
                    );
                  }}
                  className="mt-3 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-blue-500 sm:max-w-[220px] sm:text-sm"
                />
              </div>
            </section>

            {/* ===============================================
                MATÉRIAS
            ================================================ */}

            <section
              aria-labelledby="subjects-heading"
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Etapa 2
                  </p>

                  <h2
                    id="subjects-heading"
                    className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
                  >
                    Matérias
                  </h2>

                  <p
                    id="subjects-description"
                    className="mt-2 text-sm leading-6 text-slate-500"
                  >
                    Selecione uma ou várias
                    matérias.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <button
                    type="button"
                    disabled={
                      allSubjectsSelected
                    }
                    onClick={
                      selectAllSubjects
                    }
                    className="min-h-11 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Selecionar todas
                  </button>

                  <button
                    type="button"
                    disabled={
                      config.subjects
                        .length === 0
                    }
                    onClick={
                      clearSubjects
                    }
                    className="min-h-11 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* =============================================
                  STATUS PARA TECNOLOGIA ASSISTIVA
              ============================================== */}

              <p
                id="subjects-selection-status"
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
              >
                {
                  config.subjects.length
                }{" "}
                de{" "}
                {
                  subjects.length
                }{" "}
                matérias selecionadas.
              </p>

              {/* =============================================
                  NENHUMA MATÉRIA
              ============================================== */}

              {config.subjects.length ===
                0 && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-red-700">
                    Selecione pelo menos
                    uma matéria.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    O simulado precisa de
                    uma ou mais matérias
                    para encontrar questões
                    no banco.
                  </p>
                </div>
              )}

              {/* =============================================
                  TODAS
              ============================================== */}

              {allSubjectsSelected && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3"
                >
                  <p className="text-sm font-medium text-blue-700">
                    ✓ Todas as{" "}
                    {
                      subjects.length
                    }{" "}
                    matérias estão
                    selecionadas.
                  </p>
                </div>
              )}

              {/* =============================================
                  CARDS
              ============================================== */}

              <div
                className="mt-5 grid gap-3 lg:grid-cols-2"
                role="group"
                aria-labelledby="subjects-heading"
                aria-describedby="subjects-description subjects-selection-status"
              >
                {subjects.map(
                  (
                    subject
                  ) => {
                    const selected =
                      config.subjects.includes(
                        subject.id
                      );

                    return (
                      <button
                        key={
                          subject.id
                        }
                        type="button"
                        aria-pressed={
                          selected
                        }
                        onClick={() =>
                          toggleSubject(
                            subject.id
                          )
                        }
                        className={`w-full rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm"
                            aria-hidden="true"
                          >
                            {
                              subject.icon
                            }
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`break-words text-sm font-bold ${
                                selected
                                  ? "text-blue-700"
                                  : "text-slate-800"
                              }`}
                            >
                              {
                                subject.name
                              }
                            </p>

                            <p className="mt-1 break-words text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                              {
                                subject.area
                              }
                            </p>

                            <p className="mt-2 text-xs leading-5 text-slate-500">
                              {
                                subject.description
                              }
                            </p>
                          </div>

                          <div
                            className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              selected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-300"
                            }`}
                            aria-hidden="true"
                          >
                            {selected && (
                              <span className="text-[10px]">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            {/* ===============================================
                DIFICULDADE
            ================================================ */}

            <section
              aria-labelledby="difficulty-heading"
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Etapa 3
              </p>

              <h2
                id="difficulty-heading"
                className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
              >
                Dificuldade
              </h2>

              <p
                id="difficulty-description"
                className="mt-2 text-sm leading-6 text-slate-500"
              >
                Escolha um nível específico
                ou misture todas as
                dificuldades.
              </p>

              <div
                className="mt-5 grid gap-3 sm:grid-cols-2"
                role="group"
                aria-labelledby="difficulty-heading"
                aria-describedby="difficulty-description"
              >
                {difficulties.map(
                  (
                    difficulty
                  ) => {
                    const selected =
                      config.difficulty ===
                      difficulty.id;

                    return (
                      <button
                        key={
                          difficulty.id
                        }
                        type="button"
                        aria-pressed={
                          selected
                        }
                        onClick={() => {
                          setGenerationError(
                            null
                          );

                          setConfig(
                            (
                              current
                            ) => ({
                              ...current,

                              difficulty:
                                difficulty.id,
                            })
                          );
                        }}
                        className={`min-h-[92px] rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-blue-200"
                        }`}
                      >
                        <p
                          className={`font-bold ${
                            selected
                              ? "text-blue-700"
                              : "text-slate-800"
                          }`}
                        >
                          {
                            difficulty.label
                          }
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {
                            difficulty.description
                          }
                        </p>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            {/* ===============================================
                TIPO
            ================================================ */}

            <section
              aria-labelledby="question-type-heading"
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Etapa 4
              </p>

              <h2
                id="question-type-heading"
                className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
              >
                Tipo de questão
              </h2>

              <p
                id="question-type-description"
                className="mt-2 text-sm leading-6 text-slate-500"
              >
                O banco possui questões de
                múltipla escolha e verdadeiro
                ou falso.
              </p>

              <div
                className="mt-5 grid gap-3 sm:grid-cols-3"
                role="group"
                aria-labelledby="question-type-heading"
                aria-describedby="question-type-description"
              >
                {questionTypes.map(
                  (
                    questionType
                  ) => {
                    const selected =
                      config.questionType ===
                      questionType.id;

                    return (
                      <button
                        key={
                          questionType.id
                        }
                        type="button"
                        aria-pressed={
                          selected
                        }
                        onClick={() => {
                          setGenerationError(
                            null
                          );

                          setConfig(
                            (
                              current
                            ) => ({
                              ...current,

                              questionType:
                                questionType.id,
                            })
                          );
                        }}
                        className={`min-h-[120px] rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="text-xl"
                          aria-hidden="true"
                        >
                          {
                            questionType.icon
                          }
                        </div>

                        <p
                          className={`mt-3 text-sm font-bold ${
                            selected
                              ? "text-blue-700"
                              : "text-slate-800"
                          }`}
                        >
                          {
                            questionType.label
                          }
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {
                            questionType.description
                          }
                        </p>
                      </button>
                    );
                  }
                )}
              </div>

              {config.questionType ===
                "misto" && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4"
                >
                  <p className="text-xs leading-5 text-indigo-700">
                    No modo misto, o sistema
                    tenta montar aproximadamente{" "}
                    <strong>
                      60% de múltipla escolha
                    </strong>{" "}
                    e{" "}
                    <strong>
                      40% de verdadeiro ou falso
                    </strong>
                    , ajustando a proporção caso
                    não existam questões
                    suficientes em algum grupo.
                  </p>
                </div>
              )}
            </section>

            {/* ===============================================
                OPÇÕES
            ================================================ */}

            <section
              aria-labelledby="options-heading"
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Etapa 5
              </p>

              <h2
                id="options-heading"
                className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
              >
                Opções
              </h2>

              <div
                className="mt-5 space-y-3 sm:space-y-4"
                role="group"
                aria-labelledby="options-heading"
              >
                {/* ===========================================
                    EMBARALHAR QUESTÕES
                ============================================ */}

                <label
                  htmlFor="shuffle-questions"
                  className="flex cursor-pointer flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="pr-0 sm:pr-5">
                    <p className="text-sm font-semibold text-slate-800">
                      Embaralhar questões
                    </p>

                    <p
                      id="shuffle-questions-description"
                      className="mt-1 text-xs leading-5 text-slate-500"
                    >
                      Muda a ordem das
                      perguntas a cada
                      simulado.
                    </p>
                  </div>

                  <input
                    id="shuffle-questions"
                    type="checkbox"
                    checked={
                      config.shuffleQuestions
                    }
                    aria-describedby="shuffle-questions-description"
                    onChange={(
                      event
                    ) => {
                      setGenerationError(
                        null
                      );

                      setConfig(
                        (
                          current
                        ) => ({
                          ...current,

                          shuffleQuestions:
                            event.target.checked,
                        })
                      );
                    }}
                    className="h-6 w-6 shrink-0 accent-blue-600"
                  />
                </label>

                {/* ===========================================
                    EMBARALHAR ALTERNATIVAS
                ============================================ */}

                <label
                  htmlFor="shuffle-alternatives"
                  className="flex cursor-pointer flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="pr-0 sm:pr-5">
                    <p className="text-sm font-semibold text-slate-800">
                      Embaralhar alternativas
                    </p>

                    <p
                      id="shuffle-alternatives-description"
                      className="mt-1 text-xs leading-5 text-slate-500"
                    >
                      Impede que você memorize
                      a posição da resposta
                      correta nas questões de
                      múltipla escolha.
                    </p>

                    <p
                      id="shuffle-alternatives-note"
                      className="mt-1 text-[10px] leading-4 text-slate-400"
                    >
                      Verdadeiro ou falso
                      permanece sempre na ordem
                      Verdadeiro / Falso.
                    </p>
                  </div>

                  <input
                    id="shuffle-alternatives"
                    type="checkbox"
                    checked={
                      config.shuffleAlternatives
                    }
                    aria-describedby="shuffle-alternatives-description shuffle-alternatives-note"
                    onChange={(
                      event
                    ) => {
                      setGenerationError(
                        null
                      );

                      setConfig(
                        (
                          current
                        ) => ({
                          ...current,

                          shuffleAlternatives:
                            event.target.checked,
                        })
                      );
                    }}
                    className="h-6 w-6 shrink-0 accent-blue-600"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* =================================================
              RESUMO
          ================================================== */}

          <aside
            className="min-w-0 xl:sticky xl:top-6 xl:self-start"
            aria-labelledby="exam-summary-heading"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-blue-600">
                Resumo da prova
              </p>

              <h2
                id="exam-summary-heading"
                className="mt-1 text-xl font-bold text-slate-900"
              >
                Seu simulado
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {/* ===========================================
                    SOLICITADAS
                ============================================ */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Questões solicitadas
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {
                      config.amount
                    }
                  </p>
                </div>

                {/* ===========================================
                    MATÉRIAS
                ============================================ */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Matérias
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {config.subjects.length ===
                    0
                      ? "Nenhuma selecionada"
                      : config.subjects.length ===
                          subjects.length
                        ? `Todas (${subjects.length})`
                        : `${config.subjects.length} selecionada${
                            config.subjects.length >
                            1
                              ? "s"
                              : ""
                          }`}
                  </p>
                </div>

                {/* ===========================================
                    DIFICULDADE
                ============================================ */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Dificuldade
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {getDifficultyLabel(
                      config.difficulty
                    )}
                  </p>
                </div>

                {/* ===========================================
                    TIPO
                ============================================ */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Tipo
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {getQuestionTypeLabel(
                      config.questionType
                    )}
                  </p>
                </div>
              </div>

              {/* =============================================
                  DISPONÍVEIS
              ============================================== */}

              <div
                id="exam-generation-status"
                className="mt-5 border-t border-slate-100 pt-5"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="text-xs font-medium leading-5 text-slate-400">
                  Questões disponíveis com
                  estes filtros
                </p>

                <p
                  className={`mt-1 text-3xl font-bold ${
                    availableQuestions >
                    0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {
                    availableQuestions
                  }
                </p>

                <p className="sr-only">
                  O simulado atualmente pode
                  utilizar{" "}
                  {
                    actualAmount
                  }{" "}
                  {actualAmount ===
                  1
                    ? "questão"
                    : "questões"}
                  .
                </p>
              </div>

              {/* =============================================
                  QUANTIDADE REDUZIDA
              ============================================== */}

              {config.amount >
                availableQuestions &&
                availableQuestions >
                  0 && (
                  <div
                    role="status"
                    className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3"
                  >
                    <p className="text-xs leading-5 text-amber-700">
                      Você pediu{" "}
                      <strong>
                        {
                          config.amount
                        }
                      </strong>{" "}
                      questões, mas existem
                      apenas{" "}
                      <strong>
                        {
                          availableQuestions
                        }
                      </strong>{" "}
                      com esses filtros. A
                      prova terá{" "}
                      <strong>
                        {
                          actualAmount
                        }
                      </strong>{" "}
                      questões.
                    </p>
                  </div>
                )}

              {/* =============================================
                  SEM MATÉRIAS
              ============================================== */}

              {config.subjects.length ===
                0 && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-xs leading-5 text-red-700">
                    Selecione pelo menos uma
                    matéria para gerar a
                    prova.
                  </p>
                </div>
              )}

              {/* =============================================
                  SEM QUESTÕES
              ============================================== */}

              {config.subjects.length >
                0 &&
                availableQuestions ===
                  0 && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-xs leading-5 text-red-700">
                      Não existem questões
                      que correspondam à
                      configuração escolhida.
                      Tente alterar dificuldade,
                      tipo ou matérias.
                    </p>
                  </div>
                )}

              {/* =============================================
                  ERRO
              ============================================== */}

              {generationError && (
                <div
                  ref={
                    generationErrorRef
                  }
                  tabIndex={-1}
                  role="alert"
                  aria-atomic="true"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 focus:outline-none"
                >
                  <p className="text-xs font-bold text-red-700">
                    Não foi possível gerar
                    o simulado
                  </p>

                  <p className="mt-1 break-words text-xs leading-5 text-red-600">
                    {
                      generationError
                    }
                  </p>
                </div>
              )}

              {/* =============================================
                  BOTÃO
              ============================================== */}

              <button
                type="submit"
                disabled={
                  generating
                }
                aria-disabled={
                  generating ||
                  !canGenerate
                }
                aria-describedby="exam-generation-status"
                className={`mt-6 min-h-14 w-full rounded-xl px-5 py-4 text-sm font-bold transition ${
                  canGenerate
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                    : "bg-slate-300 text-slate-700 shadow-none"
                } ${
                  generating
                    ? "cursor-not-allowed opacity-70"
                    : ""
                }`}
              >
                {generating
                  ? "Preparando simulado..."
                  : actualAmount >
                      0
                    ? `Gerar simulado com ${actualAmount} ${
                        actualAmount ===
                        1
                          ? "questão"
                          : "questões"
                      }`
                    : "Gerar simulado"}
              </button>

              {!canGenerate &&
                !generating && (
                <p className="mt-2 text-center text-[10px] leading-4 text-slate-500">
                  O botão permanece disponível
                  para informar o que falta
                  configurar.
                </p>
              )}
            </div>
          </aside>
        </form>

        {/* ===================================================
            RODAPÉ
        ==================================================== */}

        <footer className="mt-8 border-t border-slate-200 py-7 text-center text-xs text-slate-400">
          {
            totalBankQuestions
          }{" "}
          questões disponíveis no banco
          atual.
        </footer>
      </div>
    </main>
  );
}