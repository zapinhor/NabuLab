import type {
  Question,
} from "@/types/question";

export const inglesExtraQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "ing-016",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "Família",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual palavra em inglês significa "irmão"?',

    alternatives: [
      {
        id: "A",
        text: "Brother",
      },
      {
        id: "B",
        text: "Sister",
      },
      {
        id: "C",
        text: "Father",
      },
      {
        id: "D",
        text: "Mother",
      },
    ],

    correctAnswer: "A",

    explanation:
      '"Brother" corresponde a "irmão" em português.',

    alternativeExplanations: {
      A: 'Correto. "Brother" significa "irmão".',
      B: '"Sister" significa "irmã".',
      C: '"Father" significa "pai".',
      D: '"Mother" significa "mãe".',
    },

    tags: [
      "vocabulario",
      "familia",
      "brother",
    ],
  },

  {
    id: "ing-017",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Artigos",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual artigo completa corretamente: "I saw ___ elephant at the zoo"?',

    alternatives: [
      {
        id: "A",
        text: "a",
      },
      {
        id: "B",
        text: "an",
      },
      {
        id: "C",
        text: "some",
      },
      {
        id: "D",
        text: "many",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Elephant" começa com som vocálico. Por isso, utiliza-se normalmente o artigo indefinido "an".',

    alternativeExplanations: {
      A: 'Antes de som vocálico, utiliza-se "an", não "a".',
      B: 'Correto. "An elephant" é a construção adequada.',
      C: '"Some" não é adequado para o substantivo singular contável nessa estrutura.',
      D: '"Many" é utilizado com substantivos contáveis no plural.',
    },

    tags: [
      "articles",
      "a-an",
      "gramatica",
    ],
  },

  {
    id: "ing-018",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "Antônimos",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual palavra é um antônimo adequado de "expensive"?',

    alternatives: [
      {
        id: "A",
        text: "Large",
      },
      {
        id: "B",
        text: "Fast",
      },
      {
        id: "C",
        text: "Cheap",
      },
      {
        id: "D",
        text: "Heavy",
      },
    ],

    correctAnswer: "C",

    explanation:
      '"Expensive" significa "caro", enquanto "cheap" significa "barato".',

    alternativeExplanations: {
      A: '"Large" significa "grande".',
      B: '"Fast" significa "rápido".',
      C: 'Correto. "Cheap" é o oposto de "expensive" nesse contexto.',
      D: '"Heavy" significa "pesado".',
    },

    tags: [
      "vocabulario",
      "antonimos",
      "expensive",
      "cheap",
    ],
  },

  {
    id: "ing-019",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "There is e there are",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente a frase "___ two books on the table"?',

    alternatives: [
      {
        id: "A",
        text: "There is",
      },
      {
        id: "B",
        text: "It is",
      },
      {
        id: "C",
        text: "There are",
      },
      {
        id: "D",
        text: "There am",
      },
    ],

    correctAnswer: "C",

    explanation:
      'Como "two books" está no plural, utiliza-se "There are".',

    alternativeExplanations: {
      A: '"There is" é normalmente utilizado com substantivos no singular ou incontáveis.',
      B: '"It is" não expressa a ideia de existência dessa forma.',
      C: 'Correto. "There are two books on the table."',
      D: '"There am" não é uma estrutura gramatical correta.',
    },

    tags: [
      "there-is",
      "there-are",
      "gramatica",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "ing-020",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Modal verbs",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Na frase "You should study more", qual ideia o modal "should" expressa principalmente?',

    alternatives: [
      {
        id: "A",
        text: "Conselho ou recomendação",
      },
      {
        id: "B",
        text: "Ação concluída no passado",
      },
      {
        id: "C",
        text: "Plural obrigatório",
      },
      {
        id: "D",
        text: "Localização física",
      },
    ],

    correctAnswer: "A",

    explanation:
      '"Should" é frequentemente utilizado para expressar conselho, recomendação ou expectativa.',

    alternativeExplanations: {
      A: 'Correto. "You should study more" significa algo como "Você deveria estudar mais".',
      B: '"Should" não indica, sozinho, uma ação concluída no passado.',
      C: "O modal não possui essa função.",
      D: "Não há relação com localização.",
    },

    tags: [
      "modal-verbs",
      "should",
      "conselho",
    ],
  },

  {
    id: "ing-021",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Vocabulário",
    subtopic: "False friends",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Em inglês, a palavra "pretend" significa principalmente:',

    alternatives: [
      {
        id: "A",
        text: "Pretender ou ter intenção",
      },
      {
        id: "B",
        text: "Fingir",
      },
      {
        id: "C",
        text: "Perguntar",
      },
      {
        id: "D",
        text: "Prometer",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Pretend" é um falso cognato. Em inglês, significa "fingir". Para expressar intenção, palavras como "intend" podem ser utilizadas.',

    alternativeExplanations: {
      A: '"Pretend" não significa normalmente "ter intenção".',
      B: 'Correto. "Pretend" significa "fingir".',
      C: '"Ask" é uma palavra comum para "perguntar".',
      D: '"Promise" significa "prometer".',
    },

    tags: [
      "false-friends",
      "pretend",
      "vocabulario",
    ],
  },

  {
    id: "ing-022",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Countable and uncountable nouns",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa adequadamente a frase "How ___ water do you drink every day?"?',

    alternatives: [
      {
        id: "A",
        text: "many",
      },
      {
        id: "B",
        text: "much",
      },
      {
        id: "C",
        text: "few",
      },
      {
        id: "D",
        text: "several",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Water" é normalmente um substantivo incontável. Em perguntas sobre quantidade, usa-se "how much".',

    alternativeExplanations: {
      A: '"How many" é utilizado com substantivos contáveis no plural.',
      B: 'Correto. "How much water..."',
      C: '"Few" é utilizado com substantivos contáveis.',
      D: '"Several" também é utilizado com substantivos contáveis no plural.',
    },

    tags: [
      "countable",
      "uncountable",
      "much-many",
    ],
  },

  {
    id: "ing-023",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Interpretação",
    subtopic: "Referência pronominal",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Leia: "Sarah bought a new laptop because her old one was too slow. She uses it for work every day." A que o pronome "it" se refere mais provavelmente?',

    alternatives: [
      {
        id: "A",
        text: "The new laptop",
      },
      {
        id: "B",
        text: "Sarah's work",
      },
      {
        id: "C",
        text: "The day",
      },
      {
        id: "D",
        text: "The store",
      },
    ],

    correctAnswer: "A",

    explanation:
      'No contexto, "it" retoma o "new laptop", que Sarah utiliza para trabalhar.',

    alternativeExplanations: {
      A: "Correto. O laptop é o referente compatível com o pronome.",
      B: "O pronome não se refere ao trabalho em si.",
      C: "Não existe relação de referência com 'day'.",
      D: "Nenhuma loja é mencionada no trecho.",
    },

    tags: [
      "reading",
      "pronoun-reference",
      "interpretacao",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "ing-024",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Second Conditional",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual alternativa completa corretamente uma construção típica de Second Conditional: "If I had more time, I ___ another language"?',

    alternatives: [
      {
        id: "A",
        text: "would learn",
      },
      {
        id: "B",
        text: "will learn",
      },
      {
        id: "C",
        text: "learned yesterday",
      },
      {
        id: "D",
        text: "am learn",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O Second Conditional normalmente utiliza Simple Past na oração com 'if' e 'would + verbo' na oração principal.",

    alternativeExplanations: {
      A: 'Correto. "If I had more time, I would learn another language."',
      B: '"Will" é mais característico do First Conditional.',
      C: "A expressão não corresponde à estrutura condicional apresentada.",
      D: "Essa construção é gramaticalmente inadequada.",
    },

    tags: [
      "second-conditional",
      "would",
      "conditionals",
    ],
  },

  {
    id: "ing-025",
    area: "Linguagens",
    subject: "ingles",
    subjectName: "Inglês",
    topic: "Gramática",
    subtopic: "Reported Speech",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Considere a fala direta: John said, "I am tired." Qual alternativa apresenta uma forma comum de reported speech quando o relato ocorre posteriormente?',

    alternatives: [
      {
        id: "A",
        text: "John said that I am tired.",
      },
      {
        id: "B",
        text: "John said that he was tired.",
      },
      {
        id: "C",
        text: "John said that he tired.",
      },
      {
        id: "D",
        text: "John says that was he tired.",
      },
    ],

    correctAnswer: "B",

    explanation:
      'No discurso indireto com verbo introdutório no passado, é comum ocorrer a mudança de "I" para "he" e de "am" para "was": "John said that he was tired."',

    alternativeExplanations: {
      A: "O pronome 'I' não representa corretamente John no relato.",
      B: "Correto. A frase apresenta uma transformação comum para reported speech.",
      C: "Falta o verbo 'to be'.",
      D: "A ordem e os tempos verbais estão inadequados.",
    },

    tags: [
      "reported-speech",
      "indirect-speech",
      "gramatica",
    ],
  },
];