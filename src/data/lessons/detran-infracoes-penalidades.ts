import type { Lesson } from "@/types/lesson";

export const detranInfracoesPenalidadesLesson: Lesson = {
  subject: "legislacao-transito",
  topic: "Infrações e penalidades",
  title: "Infrações e penalidades: pontos, suspensão e medidas administrativas",
  intro:
    "Nesta parte do CTB, a prova cobra a natureza das infrações, quantos pontos cada uma soma, quando o direito de dirigir é suspenso e a diferença entre penalidade e medida administrativa.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Natureza, pontos e multa",
      paragraphs: [
        "Toda infração tem uma natureza, que define os pontos no prontuário (art. 259) e o valor da multa (art. 258). Algumas gravíssimas têm a multa multiplicada (por 2, 3, 5, 10 ou mais vezes), como dirigir sem habilitação.",
      ],
      table: {
        headers: ["Natureza", "Pontos", "Multa (art. 258)"],
        rows: [
          ["Leve", "3", "R$ 88,38"],
          ["Média", "4", "R$ 130,16"],
          ["Grave", "5", "R$ 195,23"],
          ["Gravíssima", "7", "R$ 293,47"],
        ],
      },
    },
    {
      heading: "Suspensão por pontos",
      paragraphs: [
        "Desde a Lei 14.071/2020, o limite de pontos em 12 meses depende de quantas infrações gravíssimas o condutor cometeu no período (art. 261).",
      ],
      table: {
        headers: ["Gravíssimas nos 12 meses", "Suspensão ao atingir"],
        rows: [
          ["Duas ou mais", "20 pontos"],
          ["Uma", "30 pontos"],
          ["Nenhuma", "40 pontos"],
        ],
      },
      bullets: [
        "Quem trabalha dirigindo (atividade remunerada ao volante) tem limite de 40 pontos mesmo que tenha cometido gravíssimas (art. 261, § 5º).",
        "Algumas infrações suspendem o direito de dirigir por si só, sem depender de pontos, como dirigir sob influência de álcool (art. 165).",
      ],
    },
    {
      heading: "Penalidades x medidas administrativas",
      paragraphs: [
        "Penalidade é a punição aplicada pela autoridade de trânsito: advertência por escrito, multa, suspensão do direito de dirigir, cassação da CNH ou da Permissão para Dirigir e frequência obrigatória em curso de reciclagem (art. 256).",
        "Medida administrativa é uma providência imediata para corrigir a situação e proteger o trânsito, como retenção do veículo, remoção do veículo e recolhimento da CNH (art. 269). Ela não substitui a penalidade.",
      ],
    },
    {
      heading: "Advertência por escrito",
      paragraphs: [
        "Na infração leve ou média punível com multa, a autoridade deve aplicar advertência por escrito no lugar da multa se o infrator não cometeu nenhuma outra infração nos últimos 12 meses (art. 267).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Um condutor que não trabalha como motorista cometeu, em 12 meses, 2 infrações graves e 5 médias, nenhuma gravíssima. O direito de dirigir dele é suspenso?",
      steps: [
        "Pontos: 2 graves × 5 = 10; 5 médias × 4 = 20. Total: 30 pontos.",
        "Sem gravíssima no período, o limite é 40 pontos.",
        "30 é menor que 40.",
      ],
      answer: "Não. Ele soma 30 pontos e o limite dele é 40.",
    },
    {
      statement:
        "Outro condutor, em 12 meses, cometeu 2 infrações gravíssimas e 1 grave. Ele atinge o limite de suspensão?",
      steps: [
        "Pontos: 2 gravíssimas × 7 = 14; 1 grave × 5 = 5. Total: 19 pontos.",
        "Com duas ou mais gravíssimas, o limite é 20 pontos.",
        "19 ainda é menor que 20: uma nova infração leve (3 pontos) já faria passar do limite.",
      ],
      answer: "Ainda não: ele tem 19 pontos, e o limite dele é 20.",
    },
  ],
  commonMistakes: [
    "Usar o limite antigo de 20 pontos para todos os condutores.",
    "Confundir penalidade (multa, suspensão) com medida administrativa (retenção, remoção, recolhimento).",
    "Trocar os pontos: média vale 4 e grave vale 5.",
    "Esquecer que a advertência por escrito só vale para infração leve ou média, sem outra infração em 12 meses.",
  ],
  summary: [
    "Leve 3, média 4, grave 5, gravíssima 7 pontos.",
    "Suspensão: 20 pontos (2+ gravíssimas), 30 (1 gravíssima) ou 40 (nenhuma) em 12 meses.",
    "Motorista profissional: 40 pontos em qualquer caso.",
    "Penalidade pune; medida administrativa corrige na hora.",
    "Leve ou média sem outra infração em 12 meses: advertência por escrito.",
  ],
};
