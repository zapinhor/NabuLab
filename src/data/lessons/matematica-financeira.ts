import type { Lesson } from "@/types/lesson";

export const matematicaFinanceiraLesson: Lesson = {
  subject: "matematica",
  topic: "Matemática financeira",
  title: "Matemática financeira: porcentagem, juros simples e compostos",
  intro:
    "Quase toda questão de matemática financeira no ENEM e nos vestibulares usa uma única ideia: multiplicar por um fator. Com ele você resolve aumentos, descontos, juros simples e juros compostos.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Porcentagem como fator",
      paragraphs: [
        "Aumentar 15% é multiplicar por 1,15. Dar desconto de 15% é multiplicar por 0,85. Aumentos e descontos seguidos multiplicam os fatores, não somam as porcentagens.",
      ],
      bullets: [
        "Aumento de 20% seguido de outro de 20%: 1,2 × 1,2 = 1,44, ou seja, 44% no total (e não 40%).",
        "Desconto de 30%: o preço vira 70% do original (fator 0,7).",
      ],
    },
    {
      heading: "Juros simples",
      paragraphs: [
        "Nos juros simples, o juro de cada período é calculado sempre sobre o capital inicial. J = C × i × t e M = C + J = C × (1 + i × t).",
        "Exemplo: R$ 800,00 a 1,5% ao mês por 4 meses → J = 800 × 0,015 × 4 = R$ 48,00.",
      ],
    },
    {
      heading: "Juros compostos",
      paragraphs: [
        "Nos juros compostos, o juro de cada período entra no capital e passa a render também (juro sobre juro). M = C × (1 + i)ᵗ.",
        "A taxa e o tempo precisam estar na mesma unidade: taxa ao mês com tempo em meses.",
      ],
      table: {
        headers: ["Característica", "Juros simples", "Juros compostos"],
        rows: [
          ["Base do juro", "Sempre o capital inicial", "O montante do período anterior"],
          ["Crescimento", "Linear (reta)", "Exponencial (curva)"],
          ["Fórmula do montante", "M = C(1 + i·t)", "M = C(1 + i)ᵗ"],
        ],
      },
    },
    {
      heading: "Taxas equivalentes",
      paragraphs: [
        "Nos juros compostos, 1% ao mês não é o mesmo que 12% ao ano. A taxa anual equivalente é (1 + i)¹² − 1, um pouco maior que 12%, porque os juros de cada mês também rendem.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Uma passagem de R$ 300,00 fica 10% mais cara e, na semana seguinte, entra em promoção com 10% de desconto. Qual é o preço final?",
      steps: [
        "Aumento de 10%: fator 1,1. Desconto de 10%: fator 0,9.",
        "Fator total: 1,1 × 0,9 = 0,99.",
        "300 × 0,99 = 297.",
      ],
      answer: "R$ 297,00. O preço não volta a R$ 300,00, porque o desconto incide sobre o valor já aumentado.",
    },
    {
      statement: "Quanto rende R$ 500,00 aplicados a juros compostos de 3% ao mês por 2 meses?",
      steps: [
        "M = 500 × 1,03².",
        "1,03² = 1,0609.",
        "M = 500 × 1,0609 = 530,45. Juros = 530,45 − 500 = 30,45.",
      ],
      answer: "Montante de R$ 530,45, ou seja, R$ 30,45 de juros.",
    },
  ],
  commonMistakes: [
    "Somar porcentagens seguidas em vez de multiplicar os fatores.",
    "Achar que um aumento e um desconto da mesma porcentagem se anulam.",
    "Usar taxa ao ano com tempo em meses sem converter.",
    "Usar a fórmula de juros simples quando o enunciado fala em juros compostos.",
  ],
  summary: [
    "Aumento de p%: × (1 + p/100). Desconto de p%: × (1 − p/100).",
    "Porcentagens seguidas: multiplique os fatores.",
    "Juros simples: J = C·i·t.",
    "Juros compostos: M = C(1 + i)ᵗ.",
    "Taxa e tempo sempre na mesma unidade.",
  ],
};
