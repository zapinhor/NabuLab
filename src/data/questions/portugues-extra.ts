import type {
  Question,
} from "@/types/question";

export const portuguesExtraQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "port-016",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Classes de palavras",
    subtopic: "Adjetivo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Na frase "O cachorro pequeno correu pelo jardim", qual palavra funciona como adjetivo?',

    alternatives: [
      {
        id: "A",
        text: "cachorro",
      },
      {
        id: "B",
        text: "correu",
      },
      {
        id: "C",
        text: "jardim",
      },
      {
        id: "D",
        text: "pequeno",
      },
    ],

    correctAnswer: "D",

    explanation:
      '"Pequeno" é um adjetivo porque atribui uma característica ao substantivo "cachorro".',

    alternativeExplanations: {
      A: '"Cachorro" é um substantivo.',
      B: '"Correu" é uma forma verbal.',
      C: '"Jardim" é um substantivo.',
      D: 'Correto. "Pequeno" caracteriza o substantivo "cachorro".',
    },

    tags: [
      "classes-gramaticais",
      "adjetivo",
      "morfologia",
    ],
  },

  {
    id: "port-017",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Ortografia",
    subtopic: "Há e a",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual alternativa completa corretamente a frase: “Moro nesta cidade ___ cinco anos”?",

    alternatives: [
      {
        id: "A",
        text: "a",
      },
      {
        id: "B",
        text: "à",
      },
      {
        id: "C",
        text: "há",
      },
      {
        id: "D",
        text: "ah",
      },
    ],

    correctAnswer: "C",

    explanation:
      'Quando indica tempo decorrido, emprega-se o verbo "haver": "Moro nesta cidade há cinco anos".',

    alternativeExplanations: {
      A: '"A" pode indicar tempo futuro ou distância, mas não tempo já decorrido nesse contexto.',
      B: "Não ocorre crase nessa construção.",
      C: 'Correto. "Há" indica tempo decorrido.',
      D: '"Ah" é uma interjeição e não possui a função exigida na frase.',
    },

    tags: [
      "ortografia",
      "verbo-haver",
      "tempo-decorrido",
    ],
  },

  {
    id: "port-018",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Interpretação de texto",
    subtopic: "Inferência",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Leia: "Ao sair de casa, Lucas percebeu que as ruas estavam molhadas e várias pessoas carregavam guarda-chuvas fechados." O que é possível inferir com maior segurança?',

    alternatives: [
      {
        id: "A",
        text: "Provavelmente havia chovido recentemente",
      },
      {
        id: "B",
        text: "Lucas havia lavado todas as ruas",
      },
      {
        id: "C",
        text: "Estava nevando naquele momento",
      },
      {
        id: "D",
        text: "Nenhuma pessoa havia saído de casa",
      },
    ],

    correctAnswer: "A",

    explanation:
      "As ruas molhadas e os guarda-chuvas fechados constituem pistas que permitem inferir que provavelmente havia chovido pouco antes.",

    alternativeExplanations: {
      A: "Correto. Essa conclusão é compatível com as pistas apresentadas pelo texto.",
      B: "Não existe qualquer informação indicando que Lucas tenha lavado as ruas.",
      C: "O texto não apresenta indícios de neve.",
      D: "A própria presença de pessoas na rua contradiz essa afirmação.",
    },

    tags: [
      "interpretacao",
      "inferencia",
      "leitura",
    ],
  },

  {
    id: "port-019",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Verbos",
    subtopic: "Tempo verbal",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Na frase "Amanhã viajaremos para o interior", o verbo "viajaremos" indica uma ação situada principalmente em qual tempo?',

    alternatives: [
      {
        id: "A",
        text: "Passado",
      },
      {
        id: "B",
        text: "Futuro",
      },
      {
        id: "C",
        text: "Presente",
      },
      {
        id: "D",
        text: "Infinitivo",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Viajaremos" está flexionado no futuro do presente do indicativo e indica uma ação posterior ao momento da fala.',

    alternativeExplanations: {
      A: "A forma verbal não indica uma ação anterior ao momento da fala.",
      B: 'Correto. "Viajaremos" expressa uma ação futura.',
      C: "A ação não ocorre no presente.",
      D: 'O infinitivo seria "viajar".',
    },

    tags: [
      "verbos",
      "tempo-verbal",
      "futuro",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "port-020",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Pontuação",
    subtopic: "Vírgula e oração adverbial",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual alternativa apresenta pontuação adequada para uma oração adverbial deslocada para o início do período?",

    alternatives: [
      {
        id: "A",
        text: "Quando a aula terminou os alunos saíram rapidamente.",
      },
      {
        id: "B",
        text: "Quando, a aula terminou os alunos saíram rapidamente.",
      },
      {
        id: "C",
        text: "Quando a aula terminou, os alunos saíram rapidamente.",
      },
      {
        id: "D",
        text: "Quando a aula, terminou os alunos saíram rapidamente.",
      },
    ],

    correctAnswer: "C",

    explanation:
      'A oração adverbial temporal "Quando a aula terminou" está deslocada para o início do período e é adequadamente separada da oração principal por vírgula.',

    alternativeExplanations: {
      A: "A separação por vírgula é recomendada nesse caso de oração adverbial deslocada.",
      B: 'Não se deve separar "quando" do restante da oração dessa maneira.',
      C: "Correto. A vírgula delimita a oração adverbial anteposta.",
      D: 'Não há motivo para separar o sujeito "a aula" do verbo "terminou".',
    },

    tags: [
      "pontuacao",
      "virgula",
      "oracao-adverbial",
    ],
  },

  {
    id: "port-021",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância nominal",
    subtopic: "Adjetivo",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual alternativa apresenta concordância nominal adequada à norma-padrão?",

    alternatives: [
      {
        id: "A",
        text: "As meninas estavam meio cansadas depois da viagem.",
      },
      {
        id: "B",
        text: "As meninas estavam meias cansadas depois da viagem.",
      },
      {
        id: "C",
        text: "As menina estavam meio cansada depois da viagem.",
      },
      {
        id: "D",
        text: "As meninas estava meios cansadas depois da viagem.",
      },
    ],

    correctAnswer: "A",

    explanation:
      'Na expressão "meio cansadas", "meio" funciona como advérbio com sentido de "um pouco" e, por isso, permanece invariável. O adjetivo "cansadas" concorda com "meninas".',

    alternativeExplanations: {
      A: "Correto. O advérbio \"meio\" é invariável e \"cansadas\" concorda com o substantivo feminino plural.",
      B: 'Quando significa "um pouco", "meio" não varia.',
      C: 'Há problemas de concordância em "menina" e "cansada".',
      D: "Além da flexão inadequada de \"meio\", o verbo também não concorda com o sujeito plural.",
    },

    tags: [
      "concordancia-nominal",
      "adverbio",
      "meio",
    ],
  },

  {
    id: "port-022",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Semântica",
    subtopic: "Polissemia",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Observe: I. "A manga da camisa rasgou." II. "A manga estava muito doce." O uso da palavra "manga" demonstra principalmente qual fenômeno linguístico?',

    alternatives: [
      {
        id: "A",
        text: "Concordância verbal",
      },
      {
        id: "B",
        text: "Acentuação diferencial",
      },
      {
        id: "C",
        text: "Pleonasmo",
      },
      {
        id: "D",
        text: "Polissemia",
      },
    ],

    correctAnswer: "D",

    explanation:
      'A mesma forma lexical "manga" assume sentidos diferentes conforme o contexto: parte de uma peça de roupa ou uma fruta. Esse fenômeno pode ser tratado como polissemia no estudo do sentido contextual das palavras.',

    alternativeExplanations: {
      A: "Não há relação principal com concordância verbal.",
      B: "As duas ocorrências possuem a mesma grafia e não envolvem acento diferencial.",
      C: "Não existe repetição redundante de uma ideia.",
      D: "Correto. O contexto permite atribuir sentidos diferentes à mesma palavra.",
    },

    tags: [
      "semantica",
      "polissemia",
      "contexto",
    ],
  },

    {
    id: "port-023",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Coerência textual",
    subtopic: "Contradição",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual trecho apresenta um problema evidente de coerência interna?",

    alternatives: [
      {
        id: "A",
        text: "Estava frio, por isso ele vestiu um casaco.",
      },
      {
        id: "B",
        text: "O ônibus atrasou, então ela chegou depois do horário previsto.",
      },
      {
        id: "C",
        text: "João afirmou que nunca havia viajado de avião, mas contou que fez ontem sua primeira viagem aérea.",
      },
      {
        id: "D",
        text: "Maria declarou que nunca aprendeu a ler, mas disse ter terminado três romances completos naquela semana.",
      },
    ],

    correctAnswer: "D",

    explanation:
      'O trecho apresenta uma contradição direta: a afirmação de que Maria nunca aprendeu a ler entra em conflito com a declaração de que terminou três romances completos naquela semana.',

    alternativeExplanations: {
      A: "A relação entre o frio e o uso do casaco é coerente.",
      B: "O atraso do ônibus pode explicar a chegada posterior.",
      C: 'Não há contradição: dizer que nunca havia viajado de avião é compatível com ter feito a primeira viagem "ontem".',
      D: "Correto. As duas informações são incompatíveis no sentido apresentado.",
    },

    tags: [
      "coerencia",
      "contradicao",
      "sentido",
    ],
  },

    {
    id: "port-024",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Regência nominal",
    subtopic: "Preposição",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Considerando a norma-padrão, qual alternativa apresenta regência adequada?",

    alternatives: [
      {
        id: "A",
        text: "Ele é favorável à mudança proposta.",
      },
      {
        id: "B",
        text: "Ele é favorável com a mudança proposta.",
      },
      {
        id: "C",
        text: "Ele é favorável pela mudança proposta.",
      },
      {
        id: "D",
        text: "Ele é favorável da mudança proposta.",
      },
    ],

    correctAnswer: "A",

    explanation:
      'O adjetivo "favorável" rege a preposição "a". Como "mudança" admite artigo feminino "a", ocorre a fusão "a + a", formando "à".',

    alternativeExplanations: {
      A: 'Correto. A construção adequada é "favorável à mudança".',
      B: 'A preposição "com" não corresponde à regência padrão de "favorável".',
      C: 'A preposição "por" não é a exigida nessa construção.',
      D: 'A preposição "de" não corresponde à regência padrão nesse caso.',
    },

    tags: [
      "regencia-nominal",
      "crase",
      "preposicao",
    ],
  },

  {
    id: "port-025",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Sintaxe",
    subtopic: "Oração subordinada substantiva",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Na frase "É necessário que todos participem da reunião", a oração "que todos participem da reunião" exerce qual função em relação à oração principal?',

    alternatives: [
      {
        id: "A",
        text: "Adjunto adverbial de tempo",
      },
      {
        id: "B",
        text: "Oração subordinada substantiva subjetiva",
      },
      {
        id: "C",
        text: "Oração subordinada adjetiva restritiva",
      },
      {
        id: "D",
        text: "Oração coordenada conclusiva",
      },
    ],

    correctAnswer: "B",

    explanation:
      'Em "É necessário que todos participem da reunião", a oração introduzida por "que" funciona como sujeito da expressão "é necessário". Por isso, é classificada como oração subordinada substantiva subjetiva.',

    alternativeExplanations: {
      A: "A oração não indica uma circunstância temporal.",
      B: "Correto. A oração desempenha a função sintática de sujeito.",
      C: "Ela não caracteriza um substantivo antecedente.",
      D: "Há relação de subordinação, e não de coordenação conclusiva.",
    },

    tags: [
      "sintaxe",
      "oracao-subordinada",
      "substantiva-subjetiva",
    ],
  },
];