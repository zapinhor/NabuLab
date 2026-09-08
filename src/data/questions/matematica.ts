import type {
  Question,
} from "@/types/question";

export const matematicaQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "mat-001",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Aritmética",
    subtopic: "Subtração",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é o resultado de 48 - 19?",

    alternatives: [
      {
        id: "A",
        text: "27",
      },
      {
        id: "B",
        text: "29",
      },
      {
        id: "C",
        text: "31",
      },
      {
        id: "D",
        text: "33",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Subtraindo 19 de 48, obtemos 29.",

    alternativeExplanations: {
      A: "48 - 19 não resulta em 27.",
      B: "Correto. 48 - 19 = 29.",
      C: "31 seria obtido por outro cálculo.",
      D: "33 não corresponde à diferença entre 48 e 19.",
    },

    tags: [
      "aritmetica",
      "subtracao",
      "operacoes-basicas",
    ],
  },

  {
    id: "mat-002",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Frações",
    subtopic: "Porcentagem e fração",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual fração representa 50% de uma quantidade?",

    alternatives: [
      {
        id: "A",
        text: "1/4",
      },
      {
        id: "B",
        text: "1/3",
      },
      {
        id: "C",
        text: "1/2",
      },
      {
        id: "D",
        text: "3/4",
      },
    ],

    correctAnswer: "C",

    explanation:
      "50% significa 50 de cada 100. A fração 50/100 pode ser simplificada para 1/2.",

    alternativeExplanations: {
      A: "1/4 corresponde a 25%.",
      B: "1/3 corresponde aproximadamente a 33,3%.",
      C: "Correto. 50% = 50/100 = 1/2.",
      D: "3/4 corresponde a 75%.",
    },

    tags: [
      "fracao",
      "porcentagem",
      "equivalencia",
    ],
  },

  {
    id: "mat-003",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Porcentagem",
    subtopic: "Cálculo percentual",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quanto é 25% de 80?",

    alternatives: [
      {
        id: "A",
        text: "20",
      },
      {
        id: "B",
        text: "25",
      },
      {
        id: "C",
        text: "30",
      },
      {
        id: "D",
        text: "40",
      },
    ],

    correctAnswer: "A",

    explanation:
      "25% corresponde a 1/4. Dividindo 80 por 4, obtemos 20.",

    alternativeExplanations: {
      A: "Correto. 0,25 × 80 = 20.",
      B: "25 representa a porcentagem, não o resultado da aplicação sobre 80.",
      C: "30 corresponde a 37,5% de 80.",
      D: "40 corresponde a 50% de 80.",
    },

    tags: [
      "porcentagem",
      "calculo-percentual",
      "aritmetica",
    ],
  },

  {
    id: "mat-004",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Perímetro",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Um retângulo possui 8 cm de comprimento e 5 cm de largura. Qual é seu perímetro?",

    alternatives: [
      {
        id: "A",
        text: "13 cm",
      },
      {
        id: "B",
        text: "21 cm",
      },
      {
        id: "C",
        text: "40 cm",
      },
      {
        id: "D",
        text: "26 cm",
      },
    ],

    correctAnswer: "D",

    explanation:
      "O perímetro de um retângulo é a soma de seus quatro lados: 8 + 5 + 8 + 5 = 26 cm.",

    alternativeExplanations: {
      A: "13 é apenas a soma do comprimento com a largura.",
      B: "21 não corresponde à soma dos quatro lados.",
      C: "40 é a área do retângulo, pois 8 × 5 = 40.",
      D: "Correto. 2 × (8 + 5) = 26 cm.",
    },

    tags: [
      "geometria",
      "retangulo",
      "perimetro",
    ],
  },

  {
    id: "mat-005",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Aritmética",
    subtopic: "Ordem das operações",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é o resultado da expressão 6 + 2 × 5?",

    alternatives: [
      {
        id: "A",
        text: "40",
      },
      {
        id: "B",
        text: "16",
      },
      {
        id: "C",
        text: "30",
      },
      {
        id: "D",
        text: "18",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A multiplicação deve ser realizada antes da adição. Assim, 2 × 5 = 10 e 6 + 10 = 16.",

    alternativeExplanations: {
      A: "Esse resultado seria obtido ao calcular incorretamente a adição antes da multiplicação.",
      B: "Correto. 6 + (2 × 5) = 16.",
      C: "30 não corresponde à ordem correta das operações.",
      D: "18 não é o resultado da expressão.",
    },

    tags: [
      "aritmetica",
      "ordem-das-operacoes",
      "multiplicacao",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "mat-006",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Razão e proporção",
    subtopic: "Regra de três",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Três cadernos custam R$ 18,00. Mantendo o mesmo preço unitário, quanto custam cinco cadernos?",

    alternatives: [
      {
        id: "A",
        text: "R$ 24,00",
      },
      {
        id: "B",
        text: "R$ 27,00",
      },
      {
        id: "C",
        text: "R$ 30,00",
      },
      {
        id: "D",
        text: "R$ 36,00",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Se três cadernos custam R$ 18,00, cada um custa R$ 6,00. Cinco cadernos custam 5 × 6 = R$ 30,00.",

    alternativeExplanations: {
      A: "R$ 24,00 corresponderiam a quatro cadernos.",
      B: "Esse valor não mantém o preço unitário de R$ 6,00.",
      C: "Correto. 5 × R$ 6,00 = R$ 30,00.",
      D: "R$ 36,00 corresponderiam a seis cadernos.",
    },

    tags: [
      "proporcao",
      "regra-de-tres",
      "preco-unitario",
    ],
  },

  {
    id: "mat-007",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Álgebra",
    subtopic: "Equação do primeiro grau",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é o valor de x na equação 3x + 5 = 20?",

    alternatives: [
      {
        id: "A",
        text: "3",
      },
      {
        id: "B",
        text: "4",
      },
      {
        id: "C",
        text: "6",
      },
      {
        id: "D",
        text: "5",
      },
    ],

    correctAnswer: "D",

    explanation:
      "Subtraindo 5 dos dois lados: 3x = 15. Dividindo ambos os lados por 3, obtemos x = 5.",

    alternativeExplanations: {
      A: "Se x = 3, então 3 × 3 + 5 = 14.",
      B: "Se x = 4, o lado esquerdo seria 17.",
      C: "Se x = 6, o lado esquerdo seria 23.",
      D: "Correto. 3 × 5 + 5 = 20.",
    },

    tags: [
      "algebra",
      "equacao",
      "primeiro-grau",
    ],
  },

  {
    id: "mat-008",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Área do triângulo",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Um triângulo possui base de 10 cm e altura de 6 cm. Qual é sua área?",

    alternatives: [
      {
        id: "A",
        text: "30 cm²",
      },
      {
        id: "B",
        text: "60 cm²",
      },
      {
        id: "C",
        text: "16 cm²",
      },
      {
        id: "D",
        text: "120 cm²",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A área de um triângulo é calculada por base × altura ÷ 2. Assim, 10 × 6 ÷ 2 = 30 cm².",

    alternativeExplanations: {
      A: "Correto. (10 × 6) / 2 = 30 cm².",
      B: "60 cm² seria o produto base × altura sem dividir por 2.",
      C: "16 corresponde apenas à soma da base e da altura.",
      D: "120 não corresponde à fórmula da área do triângulo.",
    },

    tags: [
      "geometria",
      "triangulo",
      "area",
    ],
  },

  {
    id: "mat-009",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Estatística",
    subtopic: "Média aritmética",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é a média aritmética dos valores 6, 8, 10 e 12?",

    alternatives: [
      {
        id: "A",
        text: "8",
      },
      {
        id: "B",
        text: "9",
      },
      {
        id: "C",
        text: "10",
      },
      {
        id: "D",
        text: "11",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Somamos os valores: 6 + 8 + 10 + 12 = 36. Dividindo por quatro valores, 36 ÷ 4 = 9.",

    alternativeExplanations: {
      A: "8 é um dos valores do conjunto, mas não sua média.",
      B: "Correto. A média é 9.",
      C: "10 não corresponde à soma dividida pela quantidade de elementos.",
      D: "11 também não corresponde à média do conjunto.",
    },

    tags: [
      "estatistica",
      "media",
      "media-aritmetica",
    ],
  },

  {
    id: "mat-010",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Probabilidade",
    subtopic: "Evento simples",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Um dado comum de seis faces é lançado uma vez. Qual é a probabilidade de obter um número maior que 4?",

    alternatives: [
      {
        id: "A",
        text: "1/6",
      },
      {
        id: "B",
        text: "1/2",
      },
      {
        id: "C",
        text: "1/3",
      },
      {
        id: "D",
        text: "2/3",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Os resultados maiores que 4 são 5 e 6. Existem dois casos favoráveis entre seis resultados possíveis: 2/6 = 1/3.",

    alternativeExplanations: {
      A: "Há dois resultados favoráveis, e não apenas um.",
      B: "Metade dos resultados corresponderia a três faces.",
      C: "Correto. 2/6 simplifica para 1/3.",
      D: "2/3 representaria quatro resultados favoráveis em seis.",
    },

    tags: [
      "probabilidade",
      "dado",
      "evento-simples",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "mat-011",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Porcentagem",
    subtopic: "Variações sucessivas",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Um produto de R$ 200,00 sofre aumento de 20% e, posteriormente, desconto de 20% sobre o novo preço. Qual será o valor final?",

    alternatives: [
      {
        id: "A",
        text: "R$ 160,00",
      },
      {
        id: "B",
        text: "R$ 180,00",
      },
      {
        id: "C",
        text: "R$ 200,00",
      },
      {
        id: "D",
        text: "R$ 192,00",
      },
    ],

    correctAnswer: "D",

    explanation:
      "Após o aumento: 200 × 1,20 = 240. Aplicando o desconto de 20%: 240 × 0,80 = 192.",

    alternativeExplanations: {
      A: "Esse valor corresponderia a um desconto direto de 20% sobre R$ 200,00.",
      B: "R$ 180,00 não resulta das duas variações sucessivas.",
      C: "Aumento e desconto de mesma porcentagem não se anulam porque são aplicados sobre bases diferentes.",
      D: "Correto. O valor final é R$ 192,00.",
    },

    tags: [
      "porcentagem",
      "aumento",
      "desconto",
      "variacoes-sucessivas",
    ],
  },

  {
    id: "mat-012",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Álgebra",
    subtopic: "Sistema linear",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Considere o sistema x + y = 10 e x - y = 2. Qual é o valor de x?",

    alternatives: [
      {
        id: "A",
        text: "6",
      },
      {
        id: "B",
        text: "4",
      },
      {
        id: "C",
        text: "5",
      },
      {
        id: "D",
        text: "8",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Somando as duas equações, temos 2x = 12. Portanto, x = 6.",

    alternativeExplanations: {
      A: "Correto. Somando as equações, encontramos x = 6.",
      B: "4 é o valor de y, não de x.",
      C: "Se x fosse 5, o sistema não seria satisfeito.",
      D: "x = 8 também não satisfaz as duas equações simultaneamente.",
    },

    tags: [
      "algebra",
      "sistema-linear",
      "equacoes",
    ],
  },

  {
    id: "mat-013",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Funções",
    subtopic: "Valor da função",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Se f(x) = 2x² - 3, qual é o valor de f(3)?",

    alternatives: [
      {
        id: "A",
        text: "9",
      },
      {
        id: "B",
        text: "15",
      },
      {
        id: "C",
        text: "21",
      },
      {
        id: "D",
        text: "33",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Substituindo x por 3: f(3) = 2 × 3² - 3 = 2 × 9 - 3 = 18 - 3 = 15.",

    alternativeExplanations: {
      A: "9 corresponde apenas a 3².",
      B: "Correto. f(3) = 15.",
      C: "21 seria resultado de um cálculo incorreto da expressão.",
      D: "33 não corresponde à substituição de x por 3.",
    },

    tags: [
      "funcoes",
      "funcao-quadratica",
      "substituicao",
    ],
  },

  {
    id: "mat-014",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Circunferência",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Considerando π ≈ 3,14, qual é aproximadamente o comprimento de uma circunferência de raio 5 cm?",

    alternatives: [
      {
        id: "A",
        text: "15,7 cm",
      },
      {
        id: "B",
        text: "25 cm",
      },
      {
        id: "C",
        text: "31,4 cm",
      },
      {
        id: "D",
        text: "78,5 cm",
      },
    ],

    correctAnswer: "C",

    explanation:
      "O comprimento é C = 2πr. Portanto, C = 2 × 3,14 × 5 = 31,4 cm.",

    alternativeExplanations: {
      A: "15,7 corresponde a π × 5, faltando o fator 2.",
      B: "25 corresponde ao quadrado do raio.",
      C: "Correto. 2 × 3,14 × 5 = 31,4 cm.",
      D: "78,5 cm² corresponde à área aproximada do círculo, não ao comprimento.",
    },

    tags: [
      "geometria",
      "circunferencia",
      "pi",
    ],
  },

  {
    id: "mat-015",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Estatística",
    subtopic: "Mediana",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual é a mediana do conjunto ordenado 2, 4, 4, 7, 9, 11?",

    alternatives: [
      {
        id: "A",
        text: "4",
      },
      {
        id: "B",
        text: "5",
      },
      {
        id: "C",
        text: "7",
      },
      {
        id: "D",
        text: "5,5",
      },
    ],

    correctAnswer: "D",

    explanation:
      "Como existem seis valores, a mediana é a média dos dois valores centrais: (4 + 7) ÷ 2 = 5,5.",

    alternativeExplanations: {
      A: "4 é um dos valores centrais, mas é necessário considerar também o 7.",
      B: "A média dos valores centrais não é 5.",
      C: "7 é apenas o segundo valor central.",
      D: "Correto. A mediana é 5,5.",
    },

    tags: [
      "estatistica",
      "mediana",
      "medidas-de-tendencia-central",
    ],
  },
];