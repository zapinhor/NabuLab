"use client";

import {
  useId,
} from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getExamModeInfo,
} from "@/lib/exam-mode";

import type {
  SubjectEvolutionPoint,
} from "@/lib/subject-evolution";

/*
 * =========================================================
 * TOOLTIP
 * =========================================================
 */

interface TooltipPayloadItem {
  payload:
    SubjectEvolutionPoint;
}

function EvolutionTooltip({
  active,
  payload,
}: {
  active?: boolean;

  payload?:
    TooltipPayloadItem[];
}) {
  if (
    !active ||
    !payload ||
    payload.length ===
      0
  ) {
    return null;
  }

  const point =
    payload[0].payload;

  const modeInfo =
    getExamModeInfo(
      point.mode
    );

  return (
    <div className="w-[170px] max-w-[calc(100vw-48px)] rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:w-auto sm:min-w-[190px] sm:p-4">
      <p className="break-words text-[10px] font-bold leading-5 text-slate-400 sm:text-xs">
        Prova{" "}
        {
          point.examNumber
        }{" "}
        •{" "}
        {
          point.dateLabel
        }
      </p>

      <p className="mt-1 text-xl font-bold text-blue-600 sm:mt-2 sm:text-2xl">
        {
          point.percentage
        }
        %
      </p>

      <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-xs">
        {
          point.correct
        }{" "}
        de{" "}
        {
          point.totalQuestions
        }{" "}
        acertos
      </p>

      <div className="mt-2 border-t border-slate-100 pt-2 sm:mt-3 sm:pt-3">
        <span
          className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-bold sm:px-2.5 sm:text-[10px] ${modeInfo.badgeClass}`}
        >
          <span aria-hidden="true">
            {
              modeInfo.icon
            }
          </span>{" "}
          {
            modeInfo.shortLabel
          }
        </span>
      </div>
    </div>
  );
}

/*
 * =========================================================
 * RESUMO ACESSÍVEL
 * =========================================================
 */

function getAccessibilitySummary(
  data:
    SubjectEvolutionPoint[]
) {
  if (
    data.length ===
    0
  ) {
    return "Ainda não existem dados de evolução para esta matéria.";
  }

  const firstPoint =
    data[0];

  const lastPoint =
    data[
      data.length -
      1
    ];

  const bestPoint =
    data.reduce(
      (
        currentBest,
        point
      ) =>
        point.percentage >
        currentBest.percentage
          ? point
          : currentBest,
      data[0]
    );

  const worstPoint =
    data.reduce(
      (
        currentWorst,
        point
      ) =>
        point.percentage <
        currentWorst.percentage
          ? point
          : currentWorst,
      data[0]
    );

  if (
    data.length ===
    1
  ) {
    return `Há uma prova registrada para esta matéria, com desempenho de ${firstPoint.percentage}%, equivalente a ${firstPoint.correct} acertos em ${firstPoint.totalQuestions} questões.`;
  }

  const difference =
    lastPoint.percentage -
    firstPoint.percentage;

  let differenceText =
    "O desempenho mais recente é igual ao primeiro registro.";

  if (
    difference >
    0
  ) {
    differenceText =
      `O desempenho mais recente está ${difference} pontos percentuais acima do primeiro registro.`;
  }

  if (
    difference <
    0
  ) {
    differenceText =
      `O desempenho mais recente está ${Math.abs(
        difference
      )} pontos percentuais abaixo do primeiro registro.`;
  }

  return `Há ${data.length} provas registradas para esta matéria. O primeiro desempenho foi de ${firstPoint.percentage}% e o mais recente foi de ${lastPoint.percentage}%. O melhor resultado foi ${bestPoint.percentage}% na prova ${bestPoint.examNumber}, e o menor foi ${worstPoint.percentage}% na prova ${worstPoint.examNumber}. ${differenceText}`;
}

/*
 * =========================================================
 * GRÁFICO
 * =========================================================
 */

export default function SubjectEvolutionChart({
  data,
}: {
  data:
    SubjectEvolutionPoint[];
}) {
  const chartTitleId =
    useId();

  const chartDescriptionId =
    useId();

  const summary =
    getAccessibilitySummary(
      data
    );

  /*
   * =========================================================
   * SEM DADOS
   * =========================================================
   */

  if (
    data.length ===
    0
  ) {
    return (
      <div
        className="flex h-[230px] w-full min-w-0 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 sm:h-[280px] md:h-[320px]"
        role="status"
      >
        <div className="max-w-sm text-center">
          <div
            className="text-3xl sm:text-4xl"
            aria-hidden="true"
          >
            📊
          </div>

          <p className="mt-3 text-sm font-bold text-slate-700">
            Ainda não há dados
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Faça um simulado com esta
            matéria para iniciar o gráfico.
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * INTERFACE
   * =========================================================
   */

  return (
    <figure
      className="min-w-0"
      aria-labelledby={
        chartTitleId
      }
      aria-describedby={
        chartDescriptionId
      }
    >
      {/* =====================================================
          DESCRIÇÃO PARA LEITORES DE TELA
      ====================================================== */}

      <figcaption
        id={
          chartTitleId
        }
        className="sr-only"
      >
        Gráfico de evolução do desempenho da matéria
      </figcaption>

      <p
        id={
          chartDescriptionId
        }
        className="sr-only"
      >
        {
          summary
        }
      </p>

      {/* =====================================================
          GRÁFICO VISUAL
      ====================================================== */}

      <div
        className="h-[250px] w-full min-w-0 sm:h-[300px] lg:h-[340px]"
        aria-hidden="true"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          debounce={50}
        >
          <LineChart
            data={
              data
            }
            margin={{
              top:
                15,

              right:
                8,

              left:
                -12,

              bottom:
                2,
            }}
          >
            {/* =============================================
                GRADE
            ============================================== */}

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={
                false
              }
              stroke="#e2e8f0"
            />

            {/* =============================================
                EIXO X
            ============================================== */}

            <XAxis
              dataKey="examNumber"
              tickFormatter={(
                value
              ) =>
                `#${value}`
              }
              tick={{
                fontSize:
                  10,

                fill:
                  "#94a3b8",
              }}
              tickLine={
                false
              }
              axisLine={{
                stroke:
                  "#e2e8f0",
              }}
              tickMargin={
                8
              }
              minTickGap={
                18
              }
              interval="preserveStartEnd"
            />

            {/* =============================================
                EIXO Y
            ============================================== */}

            <YAxis
              domain={[
                0,
                100,
              ]}
              ticks={[
                0,
                25,
                50,
                75,
                100,
              ]}
              tickFormatter={(
                value
              ) =>
                `${value}%`
              }
              tick={{
                fontSize:
                  10,

                fill:
                  "#94a3b8",
              }}
              tickLine={
                false
              }
              axisLine={
                false
              }
              tickMargin={
                4
              }
              width={
                42
              }
            />

            {/* =============================================
                TOOLTIP
            ============================================== */}

            <Tooltip
              content={
                <EvolutionTooltip />
              }
              cursor={{
                stroke:
                  "#cbd5e1",

                strokeWidth:
                  1,

                strokeDasharray:
                  "4 4",
              }}
              wrapperStyle={{
                outline:
                  "none",
              }}
            />

            {/* =============================================
                LINHA
            ============================================== */}

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#2563eb"
              strokeWidth={
                3
              }
              dot={{
                r:
                  4,

                strokeWidth:
                  2,

                fill:
                  "#ffffff",

                stroke:
                  "#2563eb",
              }}
              activeDot={{
                r:
                  6,

                strokeWidth:
                  2,

                fill:
                  "#ffffff",

                stroke:
                  "#2563eb",
              }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* =====================================================
          TABELA ACESSÍVEL
      ====================================================== */}

      <table className="sr-only">
        <caption>
          Dados detalhados da evolução
          desta matéria
        </caption>

        <thead>
          <tr>
            <th scope="col">
              Prova
            </th>

            <th scope="col">
              Data
            </th>

            <th scope="col">
              Modalidade
            </th>

            <th scope="col">
              Desempenho
            </th>

            <th scope="col">
              Acertos
            </th>

            <th scope="col">
              Questões da matéria
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (
              point,
              index
            ) => {
              const modeInfo =
                getExamModeInfo(
                  point.mode
                );

              return (
                <tr
                  key={`${point.examNumber}-${point.dateLabel}-${index}`}
                >
                  <th scope="row">
                    {
                      point.examNumber
                    }
                  </th>

                  <td>
                    {
                      point.dateLabel
                    }
                  </td>

                  <td>
                    {
                      modeInfo.label
                    }
                  </td>

                  <td>
                    {
                      point.percentage
                    }
                    %
                  </td>

                  <td>
                    {
                      point.correct
                    }
                  </td>

                  <td>
                    {
                      point.totalQuestions
                    }
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </figure>
  );
}