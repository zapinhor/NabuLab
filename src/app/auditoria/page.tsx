import Link from "next/link";

import {
  auditQuestionBank,
  type AuditIssue,
} from "@/lib/question-bank-audit";

import NabuLabBrand from "@/components/ui/nabulab-brand";

/*
 * =========================================================
 * UTILITÁRIOS
 * =========================================================
 */

function getPercentage(
  value: number,
  total: number
) {
  if (
    total <=
    0
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      (
        value /
        total
      ) *
        100
    )
  );
}

/*
 * =========================================================
 * ISSUE
 * =========================================================
 */

function IssueCard({
  issue,
}: {
  issue: AuditIssue;
}) {
  const isError =
    issue.severity ===
    "error";

  return (
    <div
      className={`rounded-xl border p-4 ${
        isError
          ? "border-red-200 bg-red-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isError
                ? "ERRO"
                : "AVISO"}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {
                issue.code
              }
            </span>
          </div>

          <p className="mt-3 break-words text-sm font-bold text-slate-900">
            {
              issue.questionId
            }
          </p>

          <p className="mt-1 break-words text-xs leading-5 text-slate-600">
            {
              issue.message
            }
          </p>
        </div>
      </div>
    </div>
  );
}

/*
 * =========================================================
 * PÁGINA
 * =========================================================
 */

export default function AuditPage() {
  const audit =
    auditQuestionBank();

  const errors =
    audit.issues.filter(
      (issue) =>
        issue.severity ===
        "error"
    );

  const warnings =
    audit.issues.filter(
      (issue) =>
        issue.severity ===
        "warning"
    );

  const multipleChoicePercentage =
    getPercentage(
      audit.byType
        .multipleChoice,
      audit.totalQuestions
    );

  const trueFalsePercentage =
    getPercentage(
      audit.byType
        .trueFalse,
      audit.totalQuestions
    );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8">
          <NabuLabBrand
            subtitle="Auditoria do banco"
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

        <section
          className={`rounded-[24px] p-5 text-white shadow-lg sm:rounded-[28px] sm:p-7 md:p-10 ${
            audit.structureValid
              ? "bg-gradient-to-br from-[#0B2D6B] via-[#174EA6] to-[#3B82F6] shadow-blue-100"
              : "bg-gradient-to-br from-red-700 via-red-600 to-orange-600 shadow-red-100"
          }`}
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 max-w-3xl">
              <p
                className={`text-xs font-bold sm:text-sm ${
                  audit.structureValid
                    ? "text-[#F4C430]"
                    : "text-red-100"
                }`}
              >
                Qualidade do conteúdo
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                Auditoria do banco de questões
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:mt-4">
                O sistema verifica automaticamente
                estrutura, respostas, alternativas,
                identificadores, explicações,
                matérias e distribuição das
                questões.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:p-6 lg:min-w-[320px]">
              <p className="text-xs font-semibold text-white/70 sm:text-sm">
                Status estrutural
              </p>

              <p className="mt-2 break-words text-xl font-bold sm:text-2xl">
                {audit.structureValid
                  ? "✅ Banco válido"
                  : "❌ Problemas encontrados"}
              </p>

              <p className="mt-3 text-xs leading-5 text-white/70">
                {
                  audit.totalQuestions
                }{" "}
                {audit.totalQuestions ===
                1
                  ? "questão analisada"
                  : "questões analisadas"}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESUMO
        ==================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4 xl:grid-cols-4">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">
              Questões analisadas
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {
                audit.totalQuestions
              }
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5">
            <p className="text-xs text-emerald-600 sm:text-sm">
              Questões válidas
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-700 sm:text-3xl">
              {
                audit.validQuestions
              }
            </p>
          </div>

          <div
            className={`min-w-0 rounded-2xl border p-4 shadow-sm sm:p-5 ${
              audit.totalErrors >
              0
                ? "border-red-200 bg-red-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                audit.totalErrors >
                0
                  ? "text-red-600"
                  : "text-emerald-600"
              }`}
            >
              Erros
            </p>

            <p
              className={`mt-2 text-2xl font-bold sm:text-3xl ${
                audit.totalErrors >
                  0
                  ? "text-red-700"
                  : "text-emerald-700"
              }`}
            >
              {
                audit.totalErrors
              }
            </p>
          </div>

          <div
            className={`min-w-0 rounded-2xl border p-4 shadow-sm sm:p-5 ${
              audit.totalWarnings >
              0
                ? "border-amber-200 bg-amber-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                audit.totalWarnings >
                  0
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              Avisos
            </p>

            <p
              className={`mt-2 text-2xl font-bold sm:text-3xl ${
                audit.totalWarnings >
                  0
                  ? "text-amber-700"
                  : "text-emerald-700"
              }`}
            >
              {
                audit.totalWarnings
              }
            </p>
          </div>
        </section>

        {/* ===================================================
            CHECKS
        ==================================================== */}

        <section className="mt-7 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-sm font-bold text-[#3B82F6]">
              Integridade
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Estrutura do banco
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  IDs duplicados
                </span>

                <span
                  className={`shrink-0 font-bold ${
                    audit
                      .duplicateIds
                      .length ===
                    0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {audit
                    .duplicateIds
                    .length ===
                  0
                    ? "✓ 0"
                    : audit
                        .duplicateIds
                        .length}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Questões inválidas
                </span>

                <span
                  className={`shrink-0 font-bold ${
                    audit.invalidQuestions ===
                    0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {
                    audit.invalidQuestions
                  }
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Enunciados duplicados
                </span>

                <span
                  className={`shrink-0 font-bold ${
                    audit.duplicateStatements ===
                    0
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {
                    audit.duplicateStatements
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-sm font-bold text-[#3B82F6]">
              Cobertura
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Conteúdo cadastrado
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs text-blue-500">
                  Tópicos
                </p>

                <p className="mt-2 text-2xl font-bold text-[#0B2D6B]">
                  {
                    audit.totalTopics
                  }
                </p>
              </div>

              <div className="rounded-xl bg-[#F4C430]/10 p-4">
                <p className="text-xs text-amber-600">
                  Subtópicos
                </p>

                <p className="mt-2 text-2xl font-bold text-[#0B2D6B]">
                  {
                    audit.totalSubtopics
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            TIPO E DIFICULDADE
        ==================================================== */}

        <section className="mt-7 grid gap-4 lg:grid-cols-2">
          {/* TIPO */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-sm font-bold text-[#3B82F6]">
              Tipos de questão
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Distribuição por formato
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="font-semibold text-slate-600">
                    Múltipla escolha
                  </span>

                  <span className="font-bold text-[#3B82F6]">
                    {
                      audit.byType
                        .multipleChoice
                    }
                  </span>
                </div>

                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Proporção de questões de múltipla escolha"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    Math.round(
                      multipleChoicePercentage
                    )
                  }
                >
                  <div
                    className="h-full rounded-full bg-[#3B82F6]"
                    style={{
                      width:
                        `${multipleChoicePercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="font-semibold text-slate-600">
                    Verdadeiro/Falso
                  </span>

                  <span className="font-bold text-[#0B2D6B]">
                    {
                      audit.byType
                        .trueFalse
                    }
                  </span>
                </div>

                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Proporção de questões de verdadeiro ou falso"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    Math.round(
                      trueFalsePercentage
                    )
                  }
                >
                  <div
                    className="h-full rounded-full bg-[#0B2D6B]"
                    style={{
                      width:
                        `${trueFalsePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DIFICULDADE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <p className="text-sm font-bold text-[#3B82F6]">
                  Dificuldade
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Balanceamento
                </h2>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                  audit.difficultyBalanced
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {audit.difficultyBalanced
                  ? "✓ Equilibrado"
                  : "⚠ Revisar"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="min-w-0 rounded-xl bg-emerald-50 p-3 text-center sm:p-4">
                <p className="text-[10px] text-emerald-600 sm:text-xs">
                  Iniciante
                </p>

                <p className="mt-2 text-xl font-bold text-emerald-700 sm:text-2xl">
                  {
                    audit
                      .byDifficulty
                      .iniciante
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-blue-50 p-3 text-center sm:p-4">
                <p className="text-[10px] text-blue-600 sm:text-xs">
                  Médio
                </p>

                <p className="mt-2 text-xl font-bold text-blue-700 sm:text-2xl">
                  {
                    audit
                      .byDifficulty
                      .medio
                  }
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-amber-50 p-3 text-center sm:p-4">
                <p className="text-[10px] text-amber-600 sm:text-xs">
                  Avançado
                </p>

                <p className="mt-2 text-xl font-bold text-amber-700 sm:text-2xl">
                  {
                    audit
                      .byDifficulty
                      .avancado
                  }
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Diferença entre a categoria
              maior e menor:{" "}
              <strong>
                {
                  audit.difficultyBalanceSpread
                }
              </strong>{" "}
              questões.
            </p>
          </div>
        </section>

        {/* ===================================================
            MATÉRIAS
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-bold text-[#3B82F6]">
                Distribuição
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Banco por matéria
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                audit.subjectBalanced
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {audit.subjectBalanced
                ? "✓ Matérias equilibradas"
                : "⚠ Distribuição desigual"}
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-3 py-3">
                    Matéria
                  </th>

                  <th className="px-3 py-3 text-center">
                    Total
                  </th>

                  <th className="px-3 py-3 text-center">
                    MC
                  </th>

                  <th className="px-3 py-3 text-center">
                    V/F
                  </th>

                  <th className="px-3 py-3 text-center">
                    Inic.
                  </th>

                  <th className="px-3 py-3 text-center">
                    Médio
                  </th>

                  <th className="px-3 py-3 text-center">
                    Avanç.
                  </th>

                  <th className="px-3 py-3 text-center">
                    MC I/M/A
                  </th>

                  <th className="px-3 py-3 text-center">
                    V/F I/M/A
                  </th>

                  <th className="px-3 py-3 text-center">
                    Tópicos
                  </th>

                  <th className="px-3 py-3 text-center">
                    Subtópicos
                  </th>
                </tr>
              </thead>

              <tbody>
                {audit.subjects.map(
                  (subject) => (
                    <tr
                      key={
                        subject.subject
                      }
                      className="border-b border-slate-100 text-sm transition hover:bg-slate-50"
                    >
                      <td className="px-3 py-4">
                        <p className="font-bold text-slate-900">
                          {
                            subject.subjectName
                          }
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {
                            subject.area
                          }
                        </p>
                      </td>

                      <td className="px-3 py-4 text-center font-bold text-slate-900">
                        {
                          subject.total
                        }
                      </td>

                      <td className="px-3 py-4 text-center font-semibold text-[#3B82F6]">
                        {
                          subject.multipleChoice
                        }
                      </td>

                      <td className="px-3 py-4 text-center font-semibold text-[#0B2D6B]">
                        {
                          subject.trueFalse
                        }
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600">
                        {
                          subject.iniciante
                        }
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600">
                        {
                          subject.medio
                        }
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600">
                        {
                          subject.avancado
                        }
                      </td>

                      <td className="px-3 py-4 text-center font-mono text-xs text-slate-600">
                        {subject.combinations["multiple-choice"].iniciante}/
                        {subject.combinations["multiple-choice"].medio}/
                        {subject.combinations["multiple-choice"].avancado}
                      </td>

                      <td className="px-3 py-4 text-center font-mono text-xs text-slate-600">
                        {subject.combinations["true-false"].iniciante}/
                        {subject.combinations["true-false"].medio}/
                        {subject.combinations["true-false"].avancado}
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600">
                        {
                          subject.topics
                        }
                      </td>

                      <td className="px-3 py-4 text-center text-slate-600">
                        {
                          subject.subtopics
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================================
            PROBLEMAS
        ==================================================== */}

        <section className="mt-7">
          <p className="text-sm font-bold text-[#3B82F6]">
            Diagnóstico
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Problemas encontrados
          </h2>

          {audit.issues.length ===
          0 ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
              <div
                className="text-4xl sm:text-5xl"
                aria-hidden="true"
              >
                ✅
              </div>

              <h3 className="mt-4 text-lg font-bold text-emerald-800 sm:text-xl">
                Nenhum problema encontrado
              </h3>

              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-emerald-700">
                Todas as{" "}
                {
                  audit.totalQuestions
                }{" "}
                questões passaram pelas
                verificações automáticas.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-6">
              {errors.length >
                0 && (
                <div>
                  <h3 className="text-lg font-bold text-red-700">
                    ❌ Erros (
                    {
                      errors.length
                    }
                    )
                  </h3>

                  <div className="mt-3 space-y-3">
                    {errors.map(
                      (
                        issue,
                        index
                      ) => (
                        <IssueCard
                          key={`${issue.code}-${issue.questionId}-${index}`}
                          issue={
                            issue
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {warnings.length >
                0 && (
                <div>
                  <h3 className="text-lg font-bold text-amber-700">
                    ⚠️ Avisos (
                    {
                      warnings.length
                    }
                    )
                  </h3>

                  <div className="mt-3 space-y-3">
                    {warnings.map(
                      (
                        issue,
                        index
                      ) => (
                        <IssueCard
                          key={`${issue.code}-${issue.questionId}-${index}`}
                          issue={
                            issue
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            REGRAS
        ==================================================== */}

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <h3 className="font-bold text-blue-900">
            O que esta auditoria verifica?
          </h3>

          <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 md:grid-cols-2">
            <p>
              ✓ IDs únicos
            </p>

            <p>
              ✓ Campos obrigatórios
            </p>

            <p>
              ✓ Matérias cadastradas
            </p>

            <p>
              ✓ Dificuldades válidas
            </p>

            <p>
              ✓ Tipos válidos
            </p>

            <p>
              ✓ 4 alternativas em MC
            </p>

            <p>
              ✓ V/F com V e F
            </p>

            <p>
              ✓ Resposta correta existente
            </p>

            <p>
              ✓ Explicação para cada alternativa
            </p>

            <p>
              ✓ Alternativas duplicadas
            </p>

            <p>
              ✓ Enunciados duplicados
            </p>

            <p>
              ✓ Tags e metadados
            </p>

            <p>
              ✓ 1.224 questões e 72 por matéria
            </p>

            <p>
              ✓ 12 questões em cada combinação
            </p>

            <p>
              ✓ examTags, nível, habilidades e origem
            </p>
          </div>
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            ← Voltar ao painel
          </Link>

          <Link
            href="/simulado/novo"
            className="min-h-12 rounded-xl bg-[#0B2D6B] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#174EA6]"
          >
            Criar simulado
          </Link>
        </div>

        <footer className="py-8 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
          Auditoria executada sobre o banco
          local atual.
        </footer>
      </div>
    </main>
  );
}
