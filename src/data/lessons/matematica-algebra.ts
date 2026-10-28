import type { Lesson } from "@/types/lesson";

export const matematicaAlgebraLesson: Lesson = {
  subject: "matematica",
  topic: "Álgebra",
  title: "Álgebra: equações, inequações e sistemas",
  intro:
    "Resolver uma equação é descobrir o valor que torna a igualdade verdadeira. Com as mesmas operações dos dois lados, dá para resolver equações do 1º grau, inequações, sistemas simples e equações como x² = 25.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Equação do 1º grau",
      paragraphs: [
        "A ideia é isolar x. O que se faz de um lado da igualdade deve ser feito do outro: somar, subtrair, multiplicar ou dividir pelo mesmo número.",
        "Quando houver parênteses, aplique a distributiva antes: 3(x + 2) = 3x + 6.",
      ],
      bullets: [
        "5x − 3 = 22 → 5x = 25 → x = 5.",
        "Problema: quatro canetas iguais e um caderno de R$ 12,00 custam R$ 32,00 → 4x + 12 = 32 → x = 5.",
      ],
    },
    {
      heading: "Inequação",
      paragraphs: [
        "Resolve-se como a equação, mas o resultado é um intervalo. Exemplo: 3x + 1 > 10 → 3x > 9 → x > 3.",
        "Atenção: ao multiplicar ou dividir os dois lados por número negativo, o sinal da desigualdade inverte. −2x > 6 → x < −3.",
      ],
    },
    {
      heading: "Sistema linear com duas equações",
      paragraphs: [
        "Pelo método da adição, somam-se as equações para eliminar uma incógnita. Pelo método da substituição, isola-se uma incógnita e substitui-se na outra equação.",
        "Exemplo: x + y = 12 e x − y = 4. Somando: 2x = 16 → x = 8. Substituindo: y = 4.",
      ],
    },
    {
      heading: "x² e raiz quadrada",
      paragraphs: [
        "A equação x² = 25 tem duas soluções reais: x = 5 e x = −5, porque os dois números elevados ao quadrado dão 25.",
        "Já o símbolo √ indica a raiz não negativa. Por isso √(x²) = |x| (o módulo de x), e não simplesmente x. Exemplo: √((−3)²) = √9 = 3.",
      ],
    },
    {
      heading: "Equação com parâmetro",
      paragraphs: [
        "Em (k − 3)x = k² − 9, é preciso analisar o coeficiente. Se k ≠ 3, divide-se por (k − 3): x = (k² − 9)/(k − 3) = k + 3.",
        "Se k = 3, a equação vira 0x = 0, verdadeira para qualquer x: há infinitas soluções.",
      ],
    },
  ],
  workedExamples: [
    {
      statement: "Resolva 3(x − 2) + 5 = 2x + 4.",
      steps: [
        "Distributiva: 3x − 6 + 5 = 2x + 4 → 3x − 1 = 2x + 4.",
        "Passe os termos com x para um lado: 3x − 2x = 4 + 1 → x = 5.",
        "Confira: 3(5 − 2) + 5 = 14 e 2·5 + 4 = 14.",
      ],
      answer: "x = 5",
    },
    {
      statement: "Resolva −3x + 6 ≤ 0.",
      steps: [
        "−3x ≤ −6.",
        "Dividindo por −3, o sinal inverte: x ≥ 2.",
      ],
      answer: "x ≥ 2",
    },
  ],
  commonMistakes: [
    "Não inverter o sinal da inequação ao dividir por número negativo.",
    "Dizer que x² = 25 tem só a solução x = 5.",
    "Escrever √(x²) = x para qualquer x real.",
    "Errar o sinal ao trocar um termo de lado da igualdade.",
  ],
  summary: [
    "Faça a mesma operação dos dois lados para isolar x.",
    "Inequação: dividir por negativo inverte o sinal.",
    "Sistema: some ou substitua para eliminar uma incógnita.",
    "x² = k (k > 0) tem duas soluções: ±√k.",
    "√(x²) = |x|.",
  ],
};
