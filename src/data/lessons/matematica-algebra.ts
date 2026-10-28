import type { Lesson } from "@/types/lesson";

export const matematicaAlgebraLesson: Lesson = {
  subject: "matematica",
  topic: "Álgebra",
  title: "Álgebra: equações, inequações e sistemas",
  intro:
    "Resolver uma equação é descobrir o valor que torna a igualdade verdadeira. Com as mesmas operações dos dois lados, dá para resolver equações do 1º grau, inequações, sistemas simples e equações como x² = 16.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Equação do 1º grau",
      paragraphs: [
        "A ideia é isolar x. O que se faz de um lado da igualdade deve ser feito do outro: somar, subtrair, multiplicar ou dividir pelo mesmo número.",
        "Quando houver parênteses, aplique a distributiva antes: 2(x − 3) = 2x − 6.",
      ],
      bullets: [
        "3x + 5 = 20 → 3x = 15 → x = 5.",
        "Problema: três cadernos iguais e uma caneta de R$ 5,00 custam R$ 26,00 → 3x + 5 = 26 → x = 7.",
      ],
    },
    {
      heading: "Inequação",
      paragraphs: [
        "Resolve-se como a equação, mas o resultado é um intervalo. Exemplo: 2x − 4 > 6 → 2x > 10 → x > 5.",
        "Atenção: ao multiplicar ou dividir os dois lados por número negativo, o sinal da desigualdade inverte. −2x > 6 → x < −3.",
      ],
    },
    {
      heading: "Sistema linear com duas equações",
      paragraphs: [
        "Pelo método da adição, somam-se as equações para eliminar uma incógnita. Pelo método da substituição, isola-se uma incógnita e substitui-se na outra equação.",
        "Exemplo: x + y = 10 e x − y = 2. Somando: 2x = 12 → x = 6. Substituindo: y = 4.",
      ],
    },
    {
      heading: "x² e raiz quadrada",
      paragraphs: [
        "A equação x² = 16 tem duas soluções reais: x = 4 e x = −4, porque os dois números elevados ao quadrado dão 16.",
        "Já o símbolo √ indica a raiz não negativa. Por isso √(x²) = |x| (o módulo de x), e não simplesmente x. Exemplo: √((−3)²) = √9 = 3.",
      ],
    },
    {
      heading: "Equação com parâmetro",
      paragraphs: [
        "Em (m − 2)x = m² − 4, é preciso analisar o coeficiente. Se m ≠ 2, divide-se por (m − 2): x = (m² − 4)/(m − 2) = m + 2.",
        "Se m = 2, a equação vira 0x = 0, verdadeira para qualquer x: há infinitas soluções.",
      ],
    },
  ],
  workedExamples: [
    {
      statement: "Resolva 2(x − 3) + 4 = 3x − 5.",
      steps: [
        "Distributiva: 2x − 6 + 4 = 3x − 5 → 2x − 2 = 3x − 5.",
        "Passe os termos com x para um lado: −2 + 5 = 3x − 2x → 3 = x.",
        "Confira: 2(3 − 3) + 4 = 4 e 3·3 − 5 = 4.",
      ],
      answer: "x = 3",
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
    "Dizer que x² = 16 tem só a solução x = 4.",
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
