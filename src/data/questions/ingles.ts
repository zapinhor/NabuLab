import type {
  Question,
} from "@/types/question";

export const inglesQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "ing-001",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "Saudações",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual expressão em inglês é normalmente usada para dizer "Bom dia"?',

    alternatives: [
      {
        id: "A",
        text: "Good night",
      },
      {
        id: "B",
        text: "Good morning",
      },
      {
        id: "C",
        text: "Goodbye",
      },
      {
        id: "D",
        text: "See you",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Good morning" é a expressão normalmente utilizada para cumprimentar alguém durante a manhã.',

    alternativeExplanations: {
      A: '"Good night" é utilizado principalmente ao se despedir à noite ou antes de dormir.',
      B: 'Correto. "Good morning" significa "Bom dia".',
      C: '"Goodbye" significa "Adeus" ou "Tchau".',
      D: '"See you" significa algo como "Até mais".',
    },

    tags: [
      "vocabulario",
      "saudacoes",
      "good-morning",
    ],
  },

  {
    id: "ing-002",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Verbo to be",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente a frase "She ___ a teacher"?',

    alternatives: [
      {
        id: "A",
        text: "am",
      },
      {
        id: "B",
        text: "are",
      },
      {
        id: "C",
        text: "is",
      },
      {
        id: "D",
        text: "be",
      },
    ],

    correctAnswer: "C",

    explanation:
      'Com o pronome "she", a forma correta do verbo "to be" no presente é "is".',

    alternativeExplanations: {
      A: '"Am" é utilizado com "I".',
      B: '"Are" é utilizado com "you", "we" e "they".',
      C: 'Correto. "She is a teacher."',
      D: '"Be" é a forma base do verbo, não a forma adequada nessa frase.',
    },

    tags: [
      "gramatica",
      "to-be",
      "simple-present",
    ],
  },

  {
    id: "ing-003",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "Dias da semana",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual palavra em inglês corresponde a "segunda-feira"?',

    alternatives: [
      {
        id: "A",
        text: "Monday",
      },
      {
        id: "B",
        text: "Tuesday",
      },
      {
        id: "C",
        text: "Sunday",
      },
      {
        id: "D",
        text: "Friday",
      },
    ],

    correctAnswer: "A",

    explanation:
      '"Monday" corresponde a "segunda-feira" em português.',

    alternativeExplanations: {
      A: 'Correto. "Monday" significa "segunda-feira".',
      B: '"Tuesday" significa "terça-feira".',
      C: '"Sunday" significa "domingo".',
      D: '"Friday" significa "sexta-feira".',
    },

    tags: [
      "vocabulario",
      "dias-da-semana",
      "monday",
    ],
  },

  {
    id: "ing-004",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Simple Present",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente a frase "They ___ soccer every Saturday"?',

    alternatives: [
      {
        id: "A",
        text: "plays",
      },
      {
        id: "B",
        text: "playing",
      },
      {
        id: "C",
        text: "played",
      },
      {
        id: "D",
        text: "play",
      },
    ],

    correctAnswer: "D",

    explanation:
      'No Simple Present, com o sujeito "they", utiliza-se a forma base do verbo: "They play soccer every Saturday."',

    alternativeExplanations: {
      A: '"Plays" é utilizado normalmente com "he", "she" ou "it".',
      B: '"Playing" exigiria uma estrutura verbal diferente.',
      C: '"Played" indica passado.',
      D: 'Correto. Com "they", usamos "play".',
    },

    tags: [
      "simple-present",
      "verbos",
      "gramatica",
    ],
  },

  {
    id: "ing-005",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Interpretação",
    subtopic: "Informação explícita",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Leia: "Anna has a blue bicycle. She rides it to school every morning." De que cor é a bicicleta de Anna?',

    alternatives: [
      {
        id: "A",
        text: "Red",
      },
      {
        id: "B",
        text: "Blue",
      },
      {
        id: "C",
        text: "Green",
      },
      {
        id: "D",
        text: "Black",
      },
    ],

    correctAnswer: "B",

    explanation:
      'O texto afirma explicitamente: "Anna has a blue bicycle". Portanto, a bicicleta é azul.',

    alternativeExplanations: {
      A: 'O texto não diz que a bicicleta é "red".',
      B: 'Correto. "Blue" significa "azul".',
      C: 'O texto não menciona a cor "green".',
      D: 'O texto não menciona a cor "black".',
    },

    tags: [
      "reading",
      "interpretacao",
      "informacao-explicita",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "ing-006",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Simple Past",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente a frase "Yesterday, I ___ to the supermarket"?',

    alternatives: [
      {
        id: "A",
        text: "go",
      },
      {
        id: "B",
        text: "gone",
      },
      {
        id: "C",
        text: "went",
      },
      {
        id: "D",
        text: "going",
      },
    ],

    correctAnswer: "C",

    explanation:
      '"Went" é a forma do Simple Past do verbo irregular "go". A palavra "yesterday" reforça a ideia de uma ação passada.',

    alternativeExplanations: {
      A: '"Go" é a forma base do verbo.',
      B: '"Gone" é o particípio passado e normalmente aparece com um verbo auxiliar.',
      C: 'Correto. "I went to the supermarket."',
      D: '"Going" é a forma terminada em -ing.',
    },

    tags: [
      "simple-past",
      "verbos-irregulares",
      "go-went",
    ],
  },

  {
    id: "ing-007",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "False friends",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Em inglês, o adjetivo "actual" significa principalmente:',

    alternatives: [
      {
        id: "A",
        text: "Atual",
      },
      {
        id: "B",
        text: "Real ou verdadeiro",
      },
      {
        id: "C",
        text: "Antigo",
      },
      {
        id: "D",
        text: "Possível",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Actual" é um falso cognato em relação ao português "atual". Em inglês, normalmente significa "real", "verdadeiro" ou "de fato".',

    alternativeExplanations: {
      A: 'Para "atual", palavras como "current" podem ser adequadas dependendo do contexto.',
      B: 'Correto. "Actual" geralmente significa "real" ou "verdadeiro".',
      C: '"Actual" não significa "antigo".',
      D: '"Possible" é a palavra correspondente a "possível".',
    },

    tags: [
      "vocabulario",
      "false-friends",
      "actual",
    ],
  },

  {
    id: "ing-008",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Present Continuous",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Qual frase está corretamente estruturada no Present Continuous?',

    alternatives: [
      {
        id: "A",
        text: "She is studying now.",
      },
      {
        id: "B",
        text: "She studying now.",
      },
      {
        id: "C",
        text: "She are studying now.",
      },
      {
        id: "D",
        text: "She study now.",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O Present Continuous é formado por uma forma do verbo to be seguida do verbo principal com -ing. Com 'she', usamos 'is': 'She is studying now.'",

    alternativeExplanations: {
      A: "Correto. A estrutura é sujeito + is + verbo com -ing.",
      B: "Falta o verbo auxiliar 'is'.",
      C: "Com 'she', deve-se usar 'is', e não 'are'.",
      D: "A frase não está estruturada no Present Continuous.",
    },

    tags: [
      "present-continuous",
      "verbos",
      "gramatica",
    ],
  },

  {
    id: "ing-009",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Interpretação",
    subtopic: "Inferência",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Leia: "Tom looked out the window, saw dark clouds, and took his umbrella before leaving home." O que é possível inferir?',

    alternatives: [
      {
        id: "A",
        text: "Tom believed it might rain.",
      },
      {
        id: "B",
        text: "Tom wanted to go swimming.",
      },
      {
        id: "C",
        text: "Tom had lost his umbrella.",
      },
      {
        id: "D",
        text: "The weather was extremely hot.",
      },
    ],

    correctAnswer: "A",

    explanation:
      "As nuvens escuras e a decisão de levar um guarda-chuva permitem inferir que Tom acreditava que poderia chover.",

    alternativeExplanations: {
      A: "Correto. A conclusão é apoiada pelas pistas do texto.",
      B: "Nada no trecho sugere que Tom pretendia nadar.",
      C: "Tom levou o guarda-chuva, portanto não há indício de que o tivesse perdido.",
      D: "O texto não menciona calor intenso.",
    },

    tags: [
      "reading",
      "inferencia",
      "interpretacao",
    ],
  },

  {
    id: "ing-010",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Comparatives",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente: "This book is ___ than that one"?',

    alternatives: [
      {
        id: "A",
        text: "interesting",
      },
      {
        id: "B",
        text: "interestinger",
      },
      {
        id: "C",
        text: "more interesting",
      },
      {
        id: "D",
        text: "most interesting",
      },
    ],

    correctAnswer: "C",

    explanation:
      'Para muitos adjetivos longos, como "interesting", o comparativo é formado com "more": "more interesting than".',

    alternativeExplanations: {
      A: "A forma simples do adjetivo não estabelece a comparação pedida.",
      B: '"Interestinger" não é a forma comparativa padrão.',
      C: 'Correto. "More interesting than" é a construção adequada.',
      D: '"Most interesting" é uma forma superlativa, não comparativa.',
    },

    tags: [
      "comparatives",
      "adjetivos",
      "gramatica",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "ing-011",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Present Perfect",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente: "She ___ in this company since 2022"?',

    alternatives: [
      {
        id: "A",
        text: "has worked",
      },
      {
        id: "B",
        text: "worked",
      },
      {
        id: "C",
        text: "works yesterday",
      },
      {
        id: "D",
        text: "have worked",
      },
    ],

    correctAnswer: "A",

    explanation:
      'O Present Perfect pode ser utilizado para uma situação iniciada no passado e ainda relacionada ao presente. Com "she", utiliza-se "has worked".',

    alternativeExplanations: {
      A: 'Correto. "She has worked ... since 2022."',
      B: "O Simple Past pode indicar uma ação concluída, mas não expressa adequadamente a continuidade sugerida por 'since 2022' nesse contexto.",
      C: "A construção é gramaticalmente inadequada.",
      D: 'Com "she", o auxiliar correto é "has", e não "have".',
    },

    tags: [
      "present-perfect",
      "since",
      "gramatica",
    ],
  },

  {
    id: "ing-012",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "First Conditional",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente uma estrutura comum de First Conditional: "If it rains tomorrow, we ___ at home"?',

    alternatives: [
      {
        id: "A",
        text: "stayed",
      },
      {
        id: "B",
        text: "will stay",
      },
      {
        id: "C",
        text: "would stay",
      },
      {
        id: "D",
        text: "stay yesterday",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O First Conditional costuma combinar Simple Present na oração com 'if' e 'will + verbo' na oração principal para falar de uma condição futura possível.",

    alternativeExplanations: {
      A: '"Stayed" é uma forma de passado.',
      B: 'Correto. "If it rains tomorrow, we will stay at home."',
      C: '"Would stay" é típico de outras construções condicionais.',
      D: "A expressão mistura tempos de forma inadequada.",
    },

    tags: [
      "conditionals",
      "first-conditional",
      "will",
    ],
  },

  {
    id: "ing-013",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Passive Voice",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual é a forma passiva adequada de "The company launched the product in 2025"?',

    alternatives: [
      {
        id: "A",
        text: "The product launched the company in 2025.",
      },
      {
        id: "B",
        text: "The product was launched by the company in 2025.",
      },
      {
        id: "C",
        text: "The company was product launched in 2025.",
      },
      {
        id: "D",
        text: "The product is launch by the company in 2025.",
      },
    ],

    correctAnswer: "B",

    explanation:
      'No passado simples da voz passiva, utilizamos "was/were + past participle". Portanto: "The product was launched by the company in 2025."',

    alternativeExplanations: {
      A: "Essa frase altera quem realiza a ação e não está na voz passiva adequada.",
      B: "Correto. A estrutura utiliza 'was launched'.",
      C: "A ordem dos elementos está incorreta.",
      D: "A forma verbal 'is launch' é inadequada.",
    },

    tags: [
      "passive-voice",
      "simple-past",
      "gramatica",
    ],
  },

  {
    id: "ing-014",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Relative clauses",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual pronome relativo completa adequadamente a frase: "The woman ___ works here is my sister"?',

    alternatives: [
      {
        id: "A",
        text: "where",
      },
      {
        id: "B",
        text: "which",
      },
      {
        id: "C",
        text: "who",
      },
      {
        id: "D",
        text: "when",
      },
    ],

    correctAnswer: "C",

    explanation:
      '"Who" é normalmente utilizado como pronome relativo para pessoas quando exerce função relacionada ao sujeito da oração relativa.',

    alternativeExplanations: {
      A: '"Where" está relacionado normalmente a lugares.',
      B: '"Which" é usado principalmente para coisas ou animais, dependendo do contexto.',
      C: 'Correto. "The woman who works here..."',
      D: '"When" está relacionado normalmente a tempo.',
    },

    tags: [
      "relative-clauses",
      "who",
      "gramatica",
    ],
  },

  {
    id: "ing-015",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Interpretação",
    subtopic: "Ideia principal",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Leia: "Remote work can reduce commuting time and offer employees greater flexibility. However, it may also create communication challenges when teams lack appropriate tools and routines." Qual é a ideia principal do trecho?',

    alternatives: [
      {
        id: "A",
        text: "Remote work has only disadvantages.",
      },
      {
        id: "B",
        text: "Remote work eliminates the need for communication.",
      },
      {
        id: "C",
        text: "Commuting is always preferable to remote work.",
      },
      {
        id: "D",
        text: "Remote work can offer benefits but may also create challenges.",
      },
    ],

    correctAnswer: "D",

    explanation:
      "O texto apresenta vantagens do trabalho remoto, como flexibilidade e redução do deslocamento, mas também menciona possíveis desafios de comunicação.",

    alternativeExplanations: {
      A: "O texto apresenta benefícios, não apenas desvantagens.",
      B: "O texto afirma justamente que comunicação pode se tornar um desafio.",
      C: "O trecho não afirma que o deslocamento seja preferível.",
      D: "Correto. O texto equilibra benefícios e possíveis dificuldades.",
    },

    tags: [
      "reading",
      "main-idea",
      "interpretacao",
    ],
  },
];