import type {
  Question,
} from "@/types/question";

export const matematicaExtraQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "mat-016",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Frações",
    subtopic: "Fração de uma quantidade",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quanto corresponde a 2/3 de 18?",

    alternatives: [
      {
        id: "A",
        text: "12",
      },
      {
        id: "B",
        text: "6",
      },
      {
        id: "C",
        text: "9",
      },
      {
        id: "D",
        text: "15",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Para calcular 2/3 de 18, dividimos 18 por 3 e multiplicamos por 2: 18 ÷ 3 = 6 e 6 × 2 = 12.",

    alternativeExplanations: {
      A: "Correto. 2/3 de 18 é 12.",
      B: "6 corresponde a apenas 1/3 de 18.",
      C: "9 corresponde à metade de 18.",
      D: "15 não representa 2/3 de 18.",
    },

    tags: [
      "fracao",
      "quantidade",
      "aritmetica",
    ],
  },

  {
    id: "mat-017",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Grandezas e medidas",
    subtopic: "Conversão de comprimento",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quantos metros existem em 1,5 quilômetro?",

    alternatives: [
      {
        id: "A",
        text: "150",
      },
      {
        id: "B",
        text: "1.500",
      },
      {
        id: "C",
        text: "15.000",
      },
      {
        id: "D",
        text: "150.000",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Um quilômetro possui 1.000 metros. Portanto, 1,5 × 1.000 = 1.500 metros.",

    alternativeExplanations: {
      A: "150 metros correspondem a 0,15 km.",
      B: "Correto. 1,5 km = 1.500 m.",
      C: "15.000 metros correspondem a 15 km.",
      D: "150.000 metros correspondem a 150 km.",
    },

    tags: [
      "medidas",
      "quilometro",
      "metro",
      "conversao",
    ],
  },

  {
    id: "mat-018",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Potenciação",
    subtopic: "Diferença de quadrados",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é o resultado de 7² - 5²?",

    alternatives: [
      {
        id: "A",
        text: "2",
      },
      {
        id: "B",
        text: "12",
      },
      {
        id: "C",
        text: "24",
      },
      {
        id: "D",
        text: "36",
      },
    ],

    correctAnswer: "C",

    explanation:
      "7² = 49 e 5² = 25. Portanto, 49 - 25 = 24.",

    alternativeExplanations: {
      A: "2 corresponde apenas à diferença entre 7 e 5.",
      B: "12 corresponde à soma de 7 e 5.",
      C: "Correto. 49 - 25 = 24.",
      D: "36 não corresponde à diferença entre os quadrados.",
    },

    tags: [
      "potenciacao",
      "quadrado",
      "aritmetica",
    ],
  },

  {
    id: "mat-019",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Área do quadrado",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Um quadrado possui lado de 9 cm. Qual é sua área?",

    alternatives: [
      {
        id: "A",
        text: "18 cm²",
      },
      {
        id: "B",
        text: "36 cm²",
      },
      {
        id: "C",
        text: "72 cm²",
      },
      {
        id: "D",
        text: "81 cm²",
      },
    ],

    correctAnswer: "D",

    explanation:
      "A área de um quadrado é lado × lado. Portanto, 9 × 9 = 81 cm².",

    alternativeExplanations: {
      A: "18 é duas vezes o lado, mas não representa a área.",
      B: "36 é o perímetro do quadrado.",
      C: "72 não corresponde à área nem ao perímetro.",
      D: "Correto. 9² = 81 cm².",
    },

    tags: [
      "geometria",
      "quadrado",
      "area",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "mat-020",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Matemática financeira",
    subtopic: "Juros simples",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Um capital de R$ 1.000,00 é aplicado a juros simples de 2% ao mês durante 3 meses. Qual é o valor dos juros acumulados?",

    alternatives: [
      {
        id: "A",
        text: "R$ 60,00",
      },
      {
        id: "B",
        text: "R$ 20,00",
      },
      {
        id: "C",
        text: "R$ 120,00",
      },
      {
        id: "D",
        text: "R$ 1.060,00",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Nos juros simples, J = C × i × t. Assim, J = 1.000 × 0,02 × 3 = R$ 60,00.",

    alternativeExplanations: {
      A: "Correto. Os juros acumulados são R$ 60,00.",
      B: "R$ 20,00 corresponde aos juros de apenas um mês.",
      C: "R$ 120,00 é o dobro do valor correto.",
      D: "R$ 1.060,00 é o montante final, e não apenas os juros.",
    },

    tags: [
      "matematica-financeira",
      "juros-simples",
      "porcentagem",
    ],
  },

  {
    id: "mat-021",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Razão e proporção",
    subtopic: "Escala",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em um mapa de escala 1:50.000, uma distância de 4 cm representa qual distância real?",

    alternatives: [
      {
        id: "A",
        text: "500 m",
      },
      {
        id: "B",
        text: "2 km",
      },
      {
        id: "C",
        text: "20 km",
      },
      {
        id: "D",
        text: "200 km",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Cada 1 cm no mapa corresponde a 50.000 cm reais, ou 500 m. Logo, 4 cm representam 4 × 500 m = 2.000 m = 2 km.",

    alternativeExplanations: {
      A: "500 m correspondem a apenas 1 cm no mapa.",
      B: "Correto. 4 cm representam 2 km.",
      C: "20 km seriam dez vezes a distância correta.",
      D: "200 km não corresponde à escala apresentada.",
    },

    tags: [
      "escala",
      "proporcao",
      "conversao",
    ],
  },

  {
    id: "mat-022",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Álgebra",
    subtopic: "Inequação",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é a solução da inequação 2x - 4 > 6?",

    alternatives: [
      {
        id: "A",
        text: "x > 1",
      },
      {
        id: "B",
        text: "x > 2",
      },
      {
        id: "C",
        text: "x > 5",
      },
      {
        id: "D",
        text: "x < 5",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Somando 4 aos dois lados, temos 2x > 10. Dividindo por 2, obtemos x > 5.",

    alternativeExplanations: {
      A: "x > 1 não satisfaz necessariamente a inequação.",
      B: "x > 2 ainda inclui valores que não satisfazem a condição.",
      C: "Correto. A solução é x > 5.",
      D: "O sentido da desigualdade não é esse.",
    },

    tags: [
      "algebra",
      "inequacao",
      "primeiro-grau",
    ],
  },

  {
    id: "mat-023",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Teorema de Pitágoras",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Um triângulo retângulo possui catetos de 9 cm e 12 cm. Qual é o comprimento da hipotenusa?",

    alternatives: [
      {
        id: "A",
        text: "13 cm",
      },
      {
        id: "B",
        text: "14 cm",
      },
      {
        id: "C",
        text: "18 cm",
      },
      {
        id: "D",
        text: "15 cm",
      },
    ],

    correctAnswer: "D",

    explanation:
      "Pelo teorema de Pitágoras: h² = 9² + 12² = 81 + 144 = 225. Logo, h = 15 cm.",

    alternativeExplanations: {
      A: "13 não satisfaz 9² + 12² = h².",
      B: "14² é igual a 196, e não 225.",
      C: "18 é maior que a hipotenusa calculada.",
      D: "Correto. √225 = 15.",
    },

    tags: [
      "geometria",
      "pitagoras",
      "triangulo-retangulo",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "mat-024",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Sequências",
    subtopic: "Progressão aritmética",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Em uma progressão aritmética, o primeiro termo é 5 e a razão é 3. Qual é o décimo termo?",

    alternatives: [
      {
        id: "A",
        text: "32",
      },
      {
        id: "B",
        text: "30",
      },
      {
        id: "C",
        text: "35",
      },
      {
        id: "D",
        text: "27",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Usando an = a1 + (n - 1)r: a10 = 5 + (10 - 1) × 3 = 5 + 27 = 32.",

    alternativeExplanations: {
      A: "Correto. O décimo termo é 32.",
      B: "30 não inclui corretamente o primeiro termo da progressão.",
      C: "35 não corresponde à fórmula do termo geral.",
      D: "27 representa apenas 9 vezes a razão.",
    },

    tags: [
      "progressao-aritmetica",
      "sequencias",
      "termo-geral",
    ],
  },

  {
    id: "mat-025",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Estatística",
    subtopic: "Média ponderada",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma atividade de nota 7 possui peso 2 e uma prova de nota 9 possui peso 3. Qual é a média ponderada dessas notas?",

    alternatives: [
      {
        id: "A",
        text: "8,0",
      },
      {
        id: "B",
        text: "8,2",
      },
      {
        id: "C",
        text: "8,5",
      },
      {
        id: "D",
        text: "8,8",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A média ponderada é (7 × 2 + 9 × 3) ÷ (2 + 3) = (14 + 27) ÷ 5 = 41 ÷ 5 = 8,2.",

    alternativeExplanations: {
      A: "8,0 seria a média aritmética simples de 7 e 9.",
      B: "Correto. Considerando os pesos, a média é 8,2.",
      C: "8,5 não corresponde ao cálculo ponderado.",
      D: "8,8 também não corresponde aos pesos informados.",
    },

    tags: [
      "estatistica",
      "media-ponderada",
      "pesos",
    ],
  },
];