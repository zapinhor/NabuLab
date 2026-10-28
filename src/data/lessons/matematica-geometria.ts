import type { Lesson } from "@/types/lesson";

export const matematicaGeometriaLesson: Lesson = {
  subject: "matematica",
  topic: "Geometria",
  title: "Geometria plana: perímetro, área, Pitágoras e circunferência",
  intro:
    "Em geometria plana, a maior parte das questões pede perímetro, área, hipotenusa ou comprimento de circunferência. Saber qual fórmula usar e manter as unidades corretas resolve quase tudo.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Perímetro x área",
      paragraphs: [
        "Perímetro é o contorno: a soma de todos os lados. É medido em unidade de comprimento (cm, m).",
        "Área é a superfície ocupada pela figura. É medida em unidade ao quadrado (cm², m²).",
      ],
      table: {
        headers: ["Figura", "Perímetro", "Área"],
        rows: [
          ["Quadrado de lado ℓ", "4ℓ", "ℓ²"],
          ["Retângulo de lados b e h", "2b + 2h", "b × h"],
          ["Triângulo de base b e altura h", "Soma dos três lados", "(b × h) ÷ 2"],
          ["Círculo de raio r", "2πr (comprimento)", "πr²"],
        ],
      },
    },
    {
      heading: "Teorema de Pitágoras",
      paragraphs: [
        "No triângulo retângulo, o lado oposto ao ângulo reto é a hipotenusa (o maior lado). Os outros dois são os catetos.",
        "Pitágoras: hipotenusa² = cateto² + cateto², ou a² = b² + c².",
        "Ternos que aparecem muito em prova: 3, 4, 5 e seus múltiplos (6, 8, 10; 30, 40, 50) e 5, 12, 13.",
      ],
    },
    {
      heading: "Circunferência",
      paragraphs: [
        "O comprimento da circunferência é C = 2πr. O diâmetro é o dobro do raio (d = 2r), então também vale C = πd.",
        "Quando a questão disser π ≈ 3,14, use esse valor. Não confunda comprimento (2πr) com área do círculo (πr²).",
      ],
    },
    {
      heading: "Ângulos internos",
      paragraphs: [
        "A soma dos ângulos internos de qualquer triângulo é 180°. Em um polígono de n lados, a soma é (n − 2) × 180°.",
        "Quadriláteros, portanto, somam 360°.",
      ],
    },
  ],
  workedExamples: [
    {
      statement: "Um triângulo retângulo tem catetos de 5 cm e 12 cm. Qual é a hipotenusa?",
      steps: [
        "a² = 5² + 12² = 25 + 144 = 169.",
        "a = √169 = 13 cm.",
        "Confira: 5, 12, 13 é um terno pitagórico conhecido.",
      ],
      answer: "13 cm",
    },
    {
      statement: "Qual é o comprimento de uma circunferência de raio 3 cm? Use π ≈ 3,14.",
      steps: ["C = 2πr = 2 × 3,14 × 3.", "C = 18,84 cm."],
      answer: "18,84 cm",
    },
  ],
  commonMistakes: [
    "Esquecer de dividir por 2 na área do triângulo.",
    "Somar só dois lados do retângulo no perímetro.",
    "Usar a fórmula da área (πr²) quando a questão pede o comprimento (2πr).",
    "Aplicar Pitágoras em triângulo que não é retângulo.",
  ],
  summary: [
    "Perímetro soma lados; área mede superfície (unidade ao quadrado).",
    "Triângulo: área = base × altura ÷ 2.",
    "Pitágoras: a² = b² + c², só no triângulo retângulo.",
    "Circunferência: C = 2πr.",
    "Ângulos internos do triângulo somam 180°.",
  ],
};
