import Link from "next/link";

import {
  auditQuestionBank,
  type AuditIssue,
} from "@/lib/question-bank-audit";

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
        <div>
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

          <p className="mt-3 text-sm font-bold text-slate-900">
            {
              issue.questionId
            }
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
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

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              F
            </div>

            <div>
              <p className="font-bold text-slate-900">
                Fisio Simulado
              </p>

              <p className="text-xs text-slate-500">
                Auditoria do banco
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="text-sm font-bold text-blue-600"
          >
            ← Painel
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section
          className={`rounded-[28px] p-7 text-white shadow-lg md:p-10 ${
            audit.structureValid
              ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700"
              : "bg-gradient-to-r from-red-600 via-rose-600 to-orange-600"
          }`}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-white/80">
                Fase 17.4
              </p>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Auditoria do banco de
                questões
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
                O sistema verifica
                automaticamente estrutura,
                respostas, alternativas,
                identificadores, explicações,
                matérias e distribuição das
                questões.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 lg:min-w-[320px]">
              <p className="text-sm text-white/80">
                Status estrutural
              </p>

              <p className="mt-2 text-2xl font-bold">
                {audit.structureValid
                  ? "✅ Banco válido"
                  : "❌ Problemas encontrados"}
              </p>

              <p className="mt-3 text-xs text-white/70">
                {
                  audit.totalQuestions
                }{" "}
                questões analisadas
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESUMO
        ==================================================== */}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Questões analisadas
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {
                audit.totalQuestions
              }
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-sm text-emerald-600">
              Questões válidas
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {
                audit.validQuestions
              }
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              audit.totalErrors >
              0
                ? "border-red-200 bg-red-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <p
              className={`text-sm ${
                audit.totalErrors >
                0
                  ? "text-red-600"
                  : "text-emerald-600"
              }`}
            >
              Erros
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${
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
            className={`rounded-2xl border p-5 shadow-sm ${
              audit.totalWarnings >
              0
                ? "border-amber-200 bg-amber-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <p
              className={`text-sm ${
                audit.totalWarnings >
                  0
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              Avisos
            </p>

            <p
              className={`mt-2 text-3xl font-bold ${
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-blue-600">
              Integridade
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Estrutura do banco
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  IDs duplicados
                </span>

                <span
                  className={`font-bold ${
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

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Questões inválidas
                </span>

                <span
                  className={`font-bold ${
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

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Enunciados duplicados
                </span>

                <span
                  className={`font-bold ${
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

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-violet-600">
              Cobertura
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Conteúdo cadastrado
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-violet-50 p-4">
                <p className="text-xs text-violet-500">
                  Tópicos
                </p>

                <p className="mt-2 text-2xl font-bold text-violet-700">
                  {
                    audit.totalTopics
                  }
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs text-blue-500">
                  Subtópicos
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-700">
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

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-blue-600">
              Tipos de questão
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Distribuição por formato
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600">
                    Múltipla escolha
                  </span>

                  <span className="font-bold text-blue-600">
                    {
                      audit.byType
                        .multipleChoice
                    }
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${
                        (
                          audit
                            .byType
                            .multipleChoice /
                          audit.totalQuestions
                        ) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600">
                    Verdadeiro/Falso
                  </span>

                  <span className="font-bold text-violet-600">
                    {
                      audit.byType
                        .trueFalse
                    }
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{
                      width: `${
                        (
                          audit
                            .byType
                            .trueFalse /
                          audit.totalQuestions
                        ) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DIFICULDADE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-emerald-600">
                  Dificuldade
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Balanceamento
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
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

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <p className="text-xs text-emerald-600">
                  Iniciante
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-700">
                  {
                    audit
                      .byDifficulty
                      .iniciante
                  }
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <p className="text-xs text-blue-600">
                  Médio
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-700">
                  {
                    audit
                      .byDifficulty
                      .medio
                  }
                </p>
              </div>

              <div className="rounded-xl bg-violet-50 p-4 text-center">
                <p className="text-xs text-violet-600">
                  Avançado
                </p>

                <p className="mt-2 text-2xl font-bold text-violet-700">
                  {
                    audit
                      .byDifficulty
                      .avancado
                  }
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
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

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-bold text-blue-600">
                Distribuição
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Banco por matéria
              </h2>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
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
            <table className="w-full min-w-[900px] border-collapse text-left">
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
                      className="border-b border-slate-100 text-sm"
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

                      <td className="px-3 py-4 text-center text-blue-600">
                        {
                          subject.multipleChoice
                        }
                      </td>

                      <td className="px-3 py-4 text-center text-violet-600">
                        {
                          subject.trueFalse
                        }
                      </td>

                      <td className="px-3 py-4 text-center">
                        {
                          subject.iniciante
                        }
                      </td>

                      <td className="px-3 py-4 text-center">
                        {
                          subject.medio
                        }
                      </td>

                      <td className="px-3 py-4 text-center">
                        {
                          subject.avancado
                        }
                      </td>

                      <td className="px-3 py-4 text-center">
                        {
                          subject.topics
                        }
                      </td>

                      <td className="px-3 py-4 text-center">
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
          <p className="text-sm font-bold text-blue-600">
            Diagnóstico
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Problemas encontrados
          </h2>

          {audit.issues.length ===
          0 ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <div className="text-5xl">
                ✅
              </div>

              <h3 className="mt-4 text-xl font-bold text-emerald-800">
                Nenhum problema encontrado
              </h3>

              <p className="mt-2 text-sm text-emerald-700">
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

        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-6">
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
          </div>
        </section>

        {/* ===================================================
            AÇÕES
        ==================================================== */}

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600"
          >
            ← Voltar ao painel
          </Link>

          <Link
            href="/simulado/novo"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white"
          >
            Criar simulado
          </Link>
        </div>

        <footer className="py-8 text-center text-xs text-slate-400">
          Auditoria executada sobre o banco
          local atual.
        </footer>
      </div>
    </main>
  );
}