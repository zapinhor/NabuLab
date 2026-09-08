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

import type {
  DashboardEvolutionPoint,
} from "@/lib/dashboard-queries";

interface ScoreEvolutionChartProps {
  data:
    DashboardEvolutionPoint[];
}

/*
 * =========================================================
 * DATA
 * =========================================================
 */

function formatFullDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    }
  ).format(
    new Date(
      value
    )
  );
}

/*
 * =========================================================
 * TOOLTIP
 * =========================================================
 */

interface CustomTooltipProps {
  active?: boolean;

  payload?: Array<{
    payload:
      DashboardEvolutionPoint;
  }>;
}

function CustomTooltip({
  active,
  payload,
}: CustomTooltipProps) {
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

  const fullDate =
    formatFullDate(
      point.submittedAt
    );

  return (
    <div className="w-[180px] max-w-[calc(100vw-48px)] rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:min-w-[190px] sm:p-4">
      <p className="text-[10px] font-semibold text-slate-400 sm:text-xs">
        Simulado #
        {
          point.examNumber
        }
      </p>

      <p className="mt-1 text-xl font-bold text-blue-600 sm:text-2xl">
        {
          point.percentage
        }
        %
      </p>

      <p className="mt-2 text-[11px] font-semibold leading-5 text-slate-600 sm:text-xs">
        {
          point.correct
        }{" "}
        de{" "}
        {
          point.totalQuestions
        }{" "}
        acertos
      </p>

      <p className="mt-2 border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-400 sm:text-[11px]">
        {
          fullDate
        }
      </p>
    </div>
  );
}

/*
 * =========================================================
 * RESUMO ACESSÍVEL
 * =========================================================
 */

function getEvolutionSummary(
  data:
    DashboardEvolutionPoint[]
) {
  if (
    data.length ===
    0
  ) {
    return "Ainda não existem simulados suficientes para mostrar a evolução das notas.";
  }

  const first =
    data[0];

  const latest =
    data[
      data.length -
      1
    ];

  const best =
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

  if (
    data.length ===
    1
  ) {
    return `Há 1 simulado registrado, com nota de ${first.percentage}%. O melhor resultado até agora também é ${first.percentage}%.`;
  }

  const difference =
    latest.percentage -
    first.percentage;

  let evolutionText =
    "A nota mais recente é igual à nota inicial.";

  if (
    difference >
    0
  ) {
    evolutionText =
      `A nota mais recente está ${difference} pontos percentuais acima da primeira.`;
  }

  if (
    difference <
    0
  ) {
    evolutionText =
      `A nota mais recente está ${Math.abs(
        difference
      )} pontos percentuais abaixo da primeira.`;
  }

  return `O gráfico contém ${data.length} simulados. A primeira nota foi ${first.percentage}%, a mais recente foi ${latest.percentage}% e a melhor nota foi ${best.percentage}%, obtida no simulado ${best.examNumber}. ${evolutionText}`;
}

/*
 * =========================================================
 * GRÁFICO
 * =========================================================
 */

export default function ScoreEvolutionChart({
  data,
}: ScoreEvolutionChartProps) {
  const chartTitleId =
    useId();

  const chartDescriptionId =
    useId();

  const tableCaptionId =
    useId();

  const summary =
    getEvolutionSummary(
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
        className="flex h-[230px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center sm:h-[280px] md:h-[300px]"
        role="status"
      >
        <div>
          <div
            className="text-4xl"
            aria-hidden="true"
          >
            📈
          </div>

          <p className="mt-3 text-sm font-bold text-slate-700">
            Ainda não há dados
            suficientes
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Realize um simulado
            para começar seu gráfico.
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * COM DADOS
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
      {/*
       * =====================================================
       * DESCRIÇÃO PARA TECNOLOGIA ASSISTIVA
       * =====================================================
       */}

      <figcaption
        id={
          chartTitleId
        }
        className="sr-only"
      >
        Gráfico de evolução das notas dos simulados
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

      {/*
       * =====================================================
       * GRÁFICO VISUAL
       * =====================================================
       *
       * O SVG é visual.
       *
       * Os mesmos dados são fornecidos
       * semanticamente na tabela abaixo.
       */}

      <div
        className="h-[250px] w-full min-w-0 sm:h-[300px] lg:h-[320px]"
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
                10,

              right:
                8,

              left:
                -15,

              bottom:
                5,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={
                false
              }
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="examNumber"
              axisLine={
                false
              }
              tickLine={
                false
              }
              tick={{
                fontSize:
                  11,

                fill:
                  "#94a3b8",
              }}
              tickMargin={8}
              minTickGap={18}
              interval="preserveStartEnd"
              tickFormatter={(
                value
              ) =>
                `#${value}`
              }
            />

            <YAxis
              domain={[
                0,
                100,
              ]}
              ticks={[
                0,
                20,
                40,
                60,
                80,
                100,
              ]}
              axisLine={
                false
              }
              tickLine={
                false
              }
              width={42}
              tick={{
                fontSize:
                  11,

                fill:
                  "#94a3b8",
              }}
              tickFormatter={(
                value
              ) =>
                `${value}%`
              }
            />

            <Tooltip
              content={
                <CustomTooltip />
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

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#2563eb"
              strokeWidth={3}
              connectNulls
              dot={{
                r:
                  4,

                fill:
                  "#2563eb",

                stroke:
                  "#ffffff",

                strokeWidth:
                  2,
              }}
              activeDot={{
                r:
                  6,

                fill:
                  "#2563eb",

                stroke:
                  "#ffffff",

                strokeWidth:
                  3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*
       * =====================================================
       * TABELA ACESSÍVEL
       * =====================================================
       *
       * Invisível visualmente, mas contém
       * todos os dados apresentados no
       * gráfico.
       */}

      <table className="sr-only">
        <caption
          id={
            tableCaptionId
          }
        >
          Dados da evolução das notas
        </caption>

        <thead>
          <tr>
            <th scope="col">
              Simulado
            </th>

            <th scope="col">
              Data
            </th>

            <th scope="col">
              Nota
            </th>

            <th scope="col">
              Acertos
            </th>

            <th scope="col">
              Total de questões
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (
              point
            ) => (
              <tr
                key={`${point.examNumber}-${point.submittedAt}`}
              >
                <th scope="row">
                  {
                    point.examNumber
                  }
                </th>

                <td>
                  {formatFullDate(
                    point.submittedAt
                  )}
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
            )
          )}
        </tbody>
      </table>
    </figure>
  );
}