import Link from "next/link";

import type {
  SubjectEvolutionSummary,
} from "@/lib/subject-evolution";

/*
 * =========================================================
 * RESUMO DE TENDÊNCIAS
 * =========================================================
 */

export default function SubjectTrendSummary({
  data,
}: {
  data: SubjectEvolutionSummary;
}) {
  /*
   * =======================================================
   * MATÉRIA QUE MAIS PRECISA DE ATENÇÃO
   * =======================================================
   *
   * Primeiro priorizamos matérias em queda.
   *
   * Se nenhuma estiver em queda, pegamos
   * a matéria com menor média recente.
   */

  const subjectsWithData =
    data.subjects.filter(
      (subject) =>
        subject.totalExams >
        0
    );

  const decliningSubjects =
    subjectsWithData
      .filter(
        (subject) =>
          subject.trend ===
          "caindo"
      )
      .sort(
        (a, b) =>
          a.slope -
          b.slope
      );

  const attentionSubject =
    decliningSubjects[0] ??
    [...subjectsWithData].sort(
      (a, b) =>
        a.recentAverage -
        b.recentAverage
    )[0] ??
    null;

  /*
   * =======================================================
   * RESUMO PARA TECNOLOGIA ASSISTIVA
   * =======================================================
   */

  const accessibleSummary =
    `Entre as matérias com dados suficientes, ${data.improvingSubjects} ${
      data.improvingSubjects ===
      1
        ? "está melhorando"
        : "estão melhorando"
    }, ${data.stableSubjects} ${
      data.stableSubjects ===
      1
        ? "está estável"
        : "estão estáveis"
    } e ${data.decliningSubjects} ${
      data.decliningSubjects ===
      1
        ? "está em queda"
        : "estão em queda"
    }.`;

  return (
    <section
      aria-labelledby="subject-trend-summary-heading"
      aria-describedby="subject-trend-summary-description"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <p className="text-sm font-bold text-blue-600">
            <span aria-hidden="true">
              📈
            </span>{" "}
            Evolução das matérias
          </p>

          <h2
            id="subject-trend-summary-heading"
            className="mt-1 break-words text-xl font-bold text-slate-900"
          >
            Como seu desempenho está mudando?
          </h2>

          <p
            id="subject-trend-summary-description"
            className="mt-2 text-xs leading-5 text-slate-500"
          >
            As tendências consideram principalmente
            suas aparições mais recentes em cada
            matéria.
          </p>

          <p className="sr-only">
            {
              accessibleSummary
            }
          </p>
        </div>

        <Link
          href="/evolucao"
          className="shrink-0 text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          Ver evolução completa →
        </Link>
      </div>

      {/* =====================================================
          CONTADORES
      ====================================================== */}

      <dl
        className="mt-6 grid gap-3 sm:grid-cols-3"
        aria-label="Resumo das tendências das matérias"
      >
        {/* ===================================================
            MELHORANDO
        ==================================================== */}

        <div className="min-w-0 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <dt className="text-xs font-bold text-emerald-600">
                <span aria-hidden="true">
                  ↗
                </span>{" "}
                Melhorando
              </dt>

              <dd className="mt-2 text-3xl font-bold text-emerald-700">
                {
                  data.improvingSubjects
                }

                <span className="sr-only">
                  {" "}
                  {data.improvingSubjects ===
                  1
                    ? "matéria"
                    : "matérias"}
                </span>
              </dd>
            </div>

            <div
              className="shrink-0 text-3xl"
              aria-hidden="true"
            >
              📈
            </div>
          </div>
        </div>

        {/* ===================================================
            ESTÁVEL
        ==================================================== */}

        <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <dt className="text-xs font-bold text-blue-600">
                <span aria-hidden="true">
                  →
                </span>{" "}
                Estáveis
              </dt>

              <dd className="mt-2 text-3xl font-bold text-blue-700">
                {
                  data.stableSubjects
                }

                <span className="sr-only">
                  {" "}
                  {data.stableSubjects ===
                  1
                    ? "matéria"
                    : "matérias"}
                </span>
              </dd>
            </div>

            <div
              className="shrink-0 text-3xl"
              aria-hidden="true"
            >
              ➡️
            </div>
          </div>
        </div>

        {/* ===================================================
            EM QUEDA
        ==================================================== */}

        <div className="min-w-0 rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <dt className="text-xs font-bold text-red-600">
                <span aria-hidden="true">
                  ↘
                </span>{" "}
                Em queda
              </dt>

              <dd className="mt-2 text-3xl font-bold text-red-700">
                {
                  data.decliningSubjects
                }

                <span className="sr-only">
                  {" "}
                  {data.decliningSubjects ===
                  1
                    ? "matéria"
                    : "matérias"}
                </span>
              </dd>
            </div>

            <div
              className="shrink-0 text-3xl"
              aria-hidden="true"
            >
              📉
            </div>
          </div>
        </div>
      </dl>

      {/* =====================================================
          MATÉRIA DE ATENÇÃO
      ====================================================== */}

      {attentionSubject ? (
        <article
          aria-labelledby="attention-subject-heading"
          className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm"
                aria-hidden="true"
              >
                {
                  attentionSubject.icon
                }
              </div>

              <div className="min-w-0">
                <p
                  className={`text-xs font-bold ${
                    attentionSubject.trend ===
                    "caindo"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {attentionSubject.trend ===
                  "caindo" ? (
                    <>
                      <span aria-hidden="true">
                        ⚠️
                      </span>{" "}
                      Maior atenção no momento
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">
                        🧠
                      </span>{" "}
                      Menor desempenho recente
                    </>
                  )}
                </p>

                <h3
                  id="attention-subject-heading"
                  className="mt-1 break-words font-bold text-slate-900"
                >
                  {
                    attentionSubject.subjectName
                  }
                </h3>

                <p className="mt-1 break-words text-xs text-slate-500">
                  {
                    attentionSubject.area
                  }
                </p>
              </div>
            </div>

            {/* =================================================
                MÉTRICAS
            ================================================== */}

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[440px]">
              <div className="min-w-0 rounded-xl bg-white p-3 text-center">
                <dt className="text-[10px] text-slate-400">
                  Média nas últimas 3 aparições
                </dt>

                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {
                    attentionSubject.recentAverage
                  }
                  %
                </dd>
              </div>

              <div className="min-w-0 rounded-xl bg-white p-3 text-center">
                <dt className="text-[10px] text-slate-400">
                  Precisão histórica
                </dt>

                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {
                    attentionSubject.historicalAccuracy
                  }
                  %
                </dd>
              </div>

              <div className="col-span-2 min-w-0 rounded-xl bg-white p-3 text-center sm:col-span-1">
                <dt className="text-[10px] text-slate-400">
                  Tendência
                </dt>

                <dd
                  className={`mt-1 text-lg font-bold ${
                    attentionSubject.slope <
                    0
                      ? "text-red-600"
                      : attentionSubject.slope >
                          0
                        ? "text-emerald-600"
                        : "text-slate-700"
                  }`}
                  aria-label={`Inclinação da tendência: ${
                    attentionSubject.slope >
                    0
                      ? "mais "
                      : attentionSubject.slope <
                          0
                        ? "menos "
                        : ""
                  }${Math.abs(
                    attentionSubject.slope
                  )} pontos percentuais`}
                >
                  {attentionSubject.slope >
                  0
                    ? "+"
                    : ""}
                  {
                    attentionSubject.slope
                  }{" "}
                  p.p.
                </dd>
              </div>
            </dl>
          </div>

          {/* =================================================
              EXPLICAÇÃO
          ================================================== */}

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">
              {attentionSubject.trend ===
              "caindo"
                ? "Esta matéria está apresentando queda nas provas recentes e já recebe prioridade extra no Simulado Recomendado."
                : "Nenhuma matéria apresenta queda significativa no momento. Esta é apenas a disciplina com menor média recente."}
            </p>

            <Link
              href="/recomendado"
              className="shrink-0 text-xs font-bold text-indigo-600"
            >
              <span aria-hidden="true">
                ✨
              </span>{" "}
              Treinar agora →
            </Link>
          </div>
        </article>
      ) : (
        <div
          className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"
          role="status"
        >
          <p className="text-sm font-bold text-slate-700">
            Ainda não há dados suficientes.
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Conclua alguns simulados para começar
            a acompanhar suas tendências.
          </p>
        </div>
      )}
    </section>
  );
}