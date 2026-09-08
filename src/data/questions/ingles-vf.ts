import type {
  Question,
} from "@/types/question";

export const inglesTrueFalseQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "ing-026",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "Cores",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      'A palavra inglesa "green" significa "verde".',

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
      '"Green" é a palavra inglesa correspondente à cor verde.',

    alternativeExplanations: {
      V: 'Correto. "Green" significa "verde".',
      F: 'Incorreto. A tradução de "green" é "verde".',
    },

    tags: [
      "vocabulario",
      "cores",
      "green",
    ],
  },

  {
    id: "ing-027",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Verbo to be",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      'A frase "They is students" está gramaticalmente correta no inglês padrão.',

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
      'Com o pronome "they", utiliza-se "are". A forma adequada é "They are students".',

    alternativeExplanations: {
      V: 'Incorreto. "They" não combina com "is" nessa estrutura.',
      F: 'Correto. A frase adequada é "They are students".',
    },

    tags: [
      "to-be",
      "they-are",
      "gramatica",
    ],
  },

  {
    id: "ing-028",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Simple Present",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      'No Simple Present, a frase "He works every day" está corretamente formada.',

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
      'Com "he" no Simple Present afirmativo, o verbo normalmente recebe -s ou outra terminação adequada. Assim, "He works every day" está correta.',

    alternativeExplanations: {
      V: 'Correto. "Works" é a forma adequada com "he".',
      F: "Incorreto. A frase segue a estrutura padrão do Simple Present.",
    },

    tags: [
      "simple-present",
      "third-person",
      "gramatica",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "ing-029",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "False friends",
    difficulty: "medio",
    type: "true-false",

    statement:
      'A palavra inglesa "actually" significa normalmente "atualmente".',

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
      '"Actually" normalmente significa "na verdade", "de fato" ou "realmente". Para "atualmente", palavras como "currently" são mais adequadas em muitos contextos.',

    alternativeExplanations: {
      V: 'Incorreto. "Actually" é um falso cognato em relação a "atualmente".',
      F: 'Correto. "Actually" geralmente significa "na verdade" ou "de fato".',
    },

    tags: [
      "false-friends",
      "actually",
      "vocabulario",
    ],
  },

  {
    id: "ing-030",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Modal can",
    difficulty: "medio",
    type: "true-false",

    statement:
      'Na frase "She can swim", o verbo principal permanece na forma base após "can".',

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
      'Após o modal "can", utiliza-se normalmente a forma base do verbo sem "to": "can swim".',

    alternativeExplanations: {
      V: 'Correto. "Swim" permanece na forma base.',
      F: 'Incorreto. Formas como "can swims" não correspondem à estrutura padrão.',
    },

    tags: [
      "modal-verbs",
      "can",
      "base-form",
    ],
  },

  {
    id: "ing-031",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Comparatives",
    difficulty: "medio",
    type: "true-false",

    statement:
      'A frase "My car is more faster than yours" é a forma comparativa recomendada no inglês padrão.',

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
      'O comparativo de "fast" é "faster". Não se combina normalmente "more" com "-er" nesse caso. A forma adequada é "My car is faster than yours".',

    alternativeExplanations: {
      V: 'Incorreto. "More faster" representa uma dupla marcação comparativa inadequada.',
      F: 'Correto. O recomendado é "faster than".',
    },

    tags: [
      "comparatives",
      "faster",
      "gramatica",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "ing-032",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Present Perfect",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Na frase "I have lived here for five years", o Present Perfect pode indicar uma situação iniciada no passado e que continua até o presente.',

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
      "O Present Perfect é frequentemente utilizado com 'for' para indicar a duração de uma situação iniciada no passado que permanece relevante ou continua no presente.",

    alternativeExplanations: {
      V: "Correto. Essa é uma utilização comum do Present Perfect.",
      F: "Incorreto. A estrutura pode expressar justamente essa continuidade.",
    },

    tags: [
      "present-perfect",
      "for",
      "duration",
    ],
  },

  {
    id: "ing-033",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Passive Voice",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'A frase "The documents were signed yesterday" está na voz passiva.',

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
      'A estrutura "were signed" combina uma forma do verbo "to be" com o particípio passado "signed", formando a voz passiva.',

    alternativeExplanations: {
      V: "Correto. A frase apresenta uma construção passiva.",
      F: "Incorreto. 'Were signed' é uma estrutura típica da voz passiva no passado.",
    },

    tags: [
      "passive-voice",
      "past-participle",
      "gramatica",
    ],
  },

  {
    id: "ing-034",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Conditionals",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Na estrutura padrão do First Conditional, é comum utilizar "will" diretamente na oração iniciada por "if", como em "If it will rain, we will stay home".',

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
      'Na estrutura mais comum do First Conditional, a oração com "if" utiliza Simple Present: "If it rains, we will stay home".',

    alternativeExplanations: {
      V: "Incorreto. A estrutura padrão normalmente não utiliza 'will' dessa maneira na oração condicional.",
      F: 'Correto. O padrão mais comum é "If + Simple Present, will + verbo".',
    },

    tags: [
      "conditionals",
      "first-conditional",
      "if-clause",
    ],
  },

  {
    id: "ing-035",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Interpretação",
    subtopic: "Conectores",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Em "The task was difficult; however, the team completed it on time", a palavra "however" estabelece uma relação de contraste entre as ideias.',

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
      '"However" é um conector utilizado para introduzir contraste ou oposição em relação à ideia anterior.',

    alternativeExplanations: {
      V: "Correto. Há contraste entre a dificuldade da tarefa e sua conclusão dentro do prazo.",
      F: 'Incorreto. "However" expressa justamente uma relação contrastiva.',
    },

    tags: [
      "connectors",
      "however",
      "reading",
    ],
  },
];