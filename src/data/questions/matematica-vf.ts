import type {
  Question,
} from "@/types/question";

export const matematicaTrueFalseQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "mat-026",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Números inteiros",
    subtopic: "Paridade",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "O número zero é considerado um número par.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "V",

    explanation:
      "Um número inteiro é par quando pode ser escrito como 2 × k, com k inteiro. Como 0 = 2 × 0, zero é par.",

    alternativeExplanations: {
      V: "Correto. Zero é divisível por 2 sem resto.",
      F: "Incorreto. Zero atende à definição matemática de número par.",
    },

    tags: [
      "numeros-inteiros",
      "paridade",
      "numero-par",
    ],
  },

  {
    id: "mat-027",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Frações",
    subtopic: "Comparação",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "A fração 1/3 é maior que a fração 1/2.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "F",

    explanation:
      "Quando o numerador é o mesmo e positivo, a fração com menor denominador é maior. Portanto, 1/2 é maior que 1/3.",

    alternativeExplanations: {
      V: "Incorreto. 1/3 é aproximadamente 0,333 e 1/2 é 0,5.",
      F: "Correto. 1/3 < 1/2.",
    },

    tags: [
      "fracao",
      "comparacao",
      "numeros-racionais",
    ],
  },

  {
    id: "mat-028",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Aritmética",
    subtopic: "Números ímpares",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "A soma de dois números inteiros ímpares é sempre um número par.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "V",

    explanation:
      "Dois números ímpares podem ser escritos como 2a + 1 e 2b + 1. A soma é 2a + 2b + 2 = 2(a + b + 1), que é par.",

    alternativeExplanations: {
      V: "Correto. A soma de dois inteiros ímpares é sempre par.",
      F: "Incorreto. Essa propriedade é válida para quaisquer dois inteiros ímpares.",
    },

    tags: [
      "aritmetica",
      "numeros-impares",
      "paridade",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "mat-029",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Porcentagem",
    subtopic: "Variações sucessivas",
    difficulty: "medio",
    type: "true-false",

    statement:
      "Um aumento de 10% seguido de uma redução de 10% sempre devolve uma quantidade ao seu valor original.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "F",

    explanation:
      "As porcentagens são aplicadas sobre bases diferentes. Por exemplo, 100 aumenta 10% para 110 e depois cai 10% para 99.",

    alternativeExplanations: {
      V: "Incorreto. O segundo percentual é calculado sobre o valor já alterado.",
      F: "Correto. Aumento e redução percentuais iguais não se anulam necessariamente.",
    },

    tags: [
      "porcentagem",
      "aumento",
      "desconto",
    ],
  },

  {
    id: "mat-030",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Geometria",
    subtopic: "Ângulos internos",
    difficulty: "medio",
    type: "true-false",

    statement:
      "Na geometria euclidiana, a soma dos ângulos internos de qualquer triângulo é 180°.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "V",

    explanation:
      "Na geometria plana euclidiana, os três ângulos internos de um triângulo somam 180°.",

    alternativeExplanations: {
      V: "Correto. Essa é uma propriedade fundamental dos triângulos na geometria euclidiana.",
      F: "Incorreto. Em geometria plana euclidiana, a soma é 180°.",
    },

    tags: [
      "geometria",
      "triangulo",
      "angulos",
    ],
  },

  {
    id: "mat-031",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Álgebra",
    subtopic: "Equação quadrática simples",
    difficulty: "medio",
    type: "true-false",

    statement:
      "Se x² = 16, então a única solução real possível é x = 4.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "F",

    explanation:
      "Tanto 4² quanto (-4)² são iguais a 16. Portanto, existem duas soluções reais: x = 4 e x = -4.",

    alternativeExplanations: {
      V: "Incorreto. A solução negativa também satisfaz a equação.",
      F: "Correto. As soluções são x = 4 e x = -4.",
    },

    tags: [
      "algebra",
      "equacao",
      "potenciacao",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "mat-032",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Probabilidade",
    subtopic: "Eventos independentes",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "Se dois eventos A e B são independentes, então P(A ∩ B) = P(A) × P(B).",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "V",

    explanation:
      "Uma das formas de caracterizar eventos independentes é justamente pela igualdade P(A ∩ B) = P(A)P(B).",

    alternativeExplanations: {
      V: "Correto. Essa relação é válida para eventos independentes.",
      F: "Incorreto. A multiplicação das probabilidades é uma propriedade da independência.",
    },

    tags: [
      "probabilidade",
      "eventos-independentes",
      "intersecao",
    ],
  },

  {
    id: "mat-033",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Estatística",
    subtopic: "Correlação",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "A existência de correlação estatística entre duas variáveis é suficiente, por si só, para provar que uma causa a outra.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "F",

    explanation:
      "Correlação indica associação estatística, mas não demonstra necessariamente uma relação de causa e efeito. Outros fatores podem explicar a associação observada.",

    alternativeExplanations: {
      V: "Incorreto. Correlação, isoladamente, não prova causalidade.",
      F: "Correto. Para estabelecer causalidade são necessárias evidências adicionais.",
    },

    tags: [
      "estatistica",
      "correlacao",
      "causalidade",
    ],
  },

  {
    id: "mat-034",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Logaritmos",
    subtopic: "Logaritmo decimal",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "O logaritmo de 1000 na base 10 é igual a 3.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "V",

    explanation:
      "Como 10³ = 1000, temos log₁₀(1000) = 3.",

    alternativeExplanations: {
      V: "Correto. O expoente necessário para transformar 10 em 1000 é 3.",
      F: "Incorreto. 10 elevado à terceira potência é exatamente 1000.",
    },

    tags: [
      "logaritmo",
      "base-10",
      "potenciacao",
    ],
  },

  {
    id: "mat-035",
    area: "Matemática",
    subject: "matematica",
    subjectName: "Matemática",
    topic: "Álgebra",
    subtopic: "Radiciação",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "Para todo número real x, é correto afirmar que √(x²) = x.",

    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],

    correctAnswer: "F",

    explanation:
      "A raiz quadrada principal é não negativa. Portanto, para todo x real, √(x²) = |x|. Se x for negativo, o resultado não será igual a x.",

    alternativeExplanations: {
      V: "Incorreto. Para valores negativos de x, a igualdade √(x²) = x não é válida.",
      F: "Correto. A identidade geral é √(x²) = |x|.",
    },

    tags: [
      "algebra",
      "radiciacao",
      "valor-absoluto",
    ],
  },
];