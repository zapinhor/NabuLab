import type {
  Question,
} from "@/types/question";

export const portuguesQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "port-001",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Interpretação de texto",
    subtopic: "Informação explícita",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Leia: "Pedro levou um guarda-chuva porque o céu estava muito escuro e havia previsão de chuva." Por que Pedro levou um guarda-chuva?',

    alternatives: [
      {
        id: "A",
        text: "Porque estava fazendo muito calor",
      },
      {
        id: "B",
        text: "Porque havia possibilidade de chover",
      },
      {
        id: "C",
        text: "Porque queria se proteger do vento",
      },
      {
        id: "D",
        text: "Porque havia esquecido o casaco",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O próprio texto informa que o céu estava escuro e havia previsão de chuva. Portanto, Pedro levou o guarda-chuva por causa da possibilidade de chover.",

    alternativeExplanations: {
      A: "O texto não menciona calor como motivo para Pedro levar o guarda-chuva.",
      B: "Correto. A previsão de chuva é apresentada explicitamente como a razão.",
      C: "O texto não afirma que Pedro pretendia se proteger do vento.",
      D: "Nenhuma informação sobre um casaco aparece no trecho.",
    },

    tags: [
      "interpretacao",
      "informacao-explicita",
      "leitura",
    ],
  },

  {
    id: "port-002",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Classes de palavras",
    subtopic: "Substantivo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Na frase "A menina comprou um livro novo", qual palavra é um substantivo?',

    alternatives: [
      {
        id: "A",
        text: "comprou",
      },
      {
        id: "B",
        text: "novo",
      },
      {
        id: "C",
        text: "livro",
      },
      {
        id: "D",
        text: "um",
      },
    ],

    correctAnswer: "C",

    explanation:
      '"Livro" é um substantivo porque nomeia um objeto. Substantivos são palavras utilizadas para nomear seres, objetos, lugares, sentimentos, ideias e outros elementos.',

    alternativeExplanations: {
      A: '"Comprou" é uma forma do verbo comprar.',
      B: '"Novo" é um adjetivo que caracteriza o substantivo "livro".',
      C: 'Correto. "Livro" é o nome de um objeto e, portanto, é um substantivo.',
      D: '"Um" funciona como artigo indefinido nesse contexto.',
    },

    tags: [
      "classes-gramaticais",
      "substantivo",
      "morfologia",
    ],
  },

  {
    id: "port-003",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Ortografia",
    subtopic: "Mas e mais",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual alternativa completa corretamente a frase: “Eu queria sair, ___ começou a chover”?",

    alternatives: [
      {
        id: "A",
        text: "mas",
      },
      {
        id: "B",
        text: "mais",
      },
      {
        id: "C",
        text: "más",
      },
      {
        id: "D",
        text: "maís",
      },
    ],

    correctAnswer: "A",

    explanation:
      '"Mas" é uma conjunção adversativa e indica oposição entre as ideias de querer sair e começar a chover.',

    alternativeExplanations: {
      A: 'Correto. "Mas" introduz uma ideia de oposição.',
      B: '"Mais" geralmente indica quantidade ou intensidade.',
      C: '"Más" é o plural feminino do adjetivo "má".',
      D: '"Maís" não é uma forma válida na ortografia padrão.',
    },

    tags: [
      "ortografia",
      "mas",
      "mais",
      "conjuncao",
    ],
  },

  {
    id: "port-004",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Pontuação",
    subtopic: "Vocativo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual frase apresenta pontuação adequada para separar um vocativo?",

    alternatives: [
      {
        id: "A",
        text: "Maria venha aqui por favor.",
      },
      {
        id: "B",
        text: "Maria venha, aqui por favor.",
      },
      {
        id: "C",
        text: "Maria venha aqui, por favor.",
      },
      {
        id: "D",
        text: "Maria, venha aqui, por favor.",
      },
    ],

    correctAnswer: "D",

    explanation:
      'Em "Maria, venha aqui, por favor", o nome "Maria" é um vocativo e deve ser separado por vírgula do restante da oração.',

    alternativeExplanations: {
      A: "O vocativo não foi separado por vírgula.",
      B: 'A vírgula foi colocada depois de "venha", sem separar adequadamente o vocativo.',
      C: 'A expressão "por favor" pode ser isolada, mas o vocativo "Maria" também precisa ser separado.',
      D: 'Correto. "Maria" está corretamente isolado como vocativo.',
    },

    tags: [
      "pontuacao",
      "virgula",
      "vocativo",
    ],
  },

  {
    id: "port-005",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Acentuação gráfica",
    subtopic: "Oxítonas",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      'Por que a palavra "café" recebe acento gráfico?',

    alternatives: [
      {
        id: "A",
        text: "Porque toda palavra com duas sílabas é acentuada",
      },
      {
        id: "B",
        text: "Porque é uma oxítona terminada em E",
      },
      {
        id: "C",
        text: "Porque é uma paroxítona terminada em consoante",
      },
      {
        id: "D",
        text: "Porque todas as palavras terminadas em E recebem acento",
      },
    ],

    correctAnswer: "B",

    explanation:
      '"Café" é uma palavra oxítona, pois sua sílaba tônica é a última: fé. Oxítonas terminadas em A, E, O, seguidas ou não de S, são acentuadas.',

    alternativeExplanations: {
      A: "A quantidade de sílabas, isoladamente, não determina a presença de acento.",
      B: 'Correto. "Café" é oxítona terminada em E.',
      C: '"Café" não é paroxítona; a sílaba tônica está no final.',
      D: "Nem todas as palavras terminadas em E recebem acento gráfico.",
    },

    tags: [
      "acentuacao",
      "oxitona",
      "silaba-tonica",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "port-006",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Coesão textual",
    subtopic: "Referência pronominal",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Leia: "Carla encontrou Beatriz na biblioteca. Ela estava procurando um livro de história." Sem outras informações, qual problema pode ser identificado no uso do pronome "ela"?',

    alternatives: [
      {
        id: "A",
        text: "O pronome está obrigatoriamente no gênero errado",
      },
      {
        id: "B",
        text: "O pronome deveria estar sempre no plural",
      },
      {
        id: "C",
        text: "Há ambiguidade sobre quem estava procurando o livro",
      },
      {
        id: "D",
        text: "Pronomes não podem retomar nomes de pessoas",
      },
    ],

    correctAnswer: "C",

    explanation:
      'O pronome "ela" pode retomar tanto Carla quanto Beatriz. Sem contexto adicional, não é possível determinar com segurança qual das duas estava procurando o livro.',

    alternativeExplanations: {
      A: 'O gênero feminino é compatível com os dois possíveis referentes.',
      B: 'Não há motivo gramatical para o pronome estar necessariamente no plural.',
      C: 'Correto. Existem dois referentes femininos possíveis, produzindo ambiguidade.',
      D: 'Pronomes podem retomar nomes de pessoas normalmente.',
    },

    tags: [
      "coesao",
      "pronome",
      "ambiguidade",
      "referencia",
    ],
  },

  {
    id: "port-007",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância verbal",
    subtopic: "Verbo fazer",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual frase está de acordo com a norma-padrão quando o verbo fazer indica tempo decorrido?",

    alternatives: [
      {
        id: "A",
        text: "Faz dois anos que não nos encontramos.",
      },
      {
        id: "B",
        text: "Fazem dois anos que não nos encontramos.",
      },
      {
        id: "C",
        text: "Fizeram dois anos que não nos encontramos.",
      },
      {
        id: "D",
        text: "Faziam dois anos que não nos encontramos.",
      },
    ],

    correctAnswer: "A",

    explanation:
      'Quando o verbo "fazer" indica tempo decorrido, ele é impessoal e permanece na terceira pessoa do singular.',

    alternativeExplanations: {
      A: 'Correto. Nesse uso impessoal, a forma adequada é "faz".',
      B: 'O verbo não deve concordar com "dois anos" quando indica tempo decorrido.',
      C: 'Nesse contexto, o verbo continua impessoal e não deve ir para o plural.',
      D: 'A forma plural também não é adequada para esse uso impessoal.',
    },

    tags: [
      "concordancia-verbal",
      "verbo-fazer",
      "verbo-impessoal",
    ],
  },

  {
    id: "port-008",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Crase",
    subtopic: "Preposição e artigo",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em qual alternativa o uso do acento indicativo de crase está adequado?",

    alternatives: [
      {
        id: "A",
        text: "Entreguei o documento à Pedro.",
      },
      {
        id: "B",
        text: "Ela começou à estudar cedo.",
      },
      {
        id: "C",
        text: "Chegamos à pé ao trabalho.",
      },
      {
        id: "D",
        text: "A estudante retornou à escola depois do almoço.",
      },
    ],

    correctAnswer: "D",

    explanation:
      'Em "retornou à escola", o verbo "retornar" admite a preposição "a", e o substantivo feminino "escola" admite o artigo "a". A combinação de ambos produz "à".',

    alternativeExplanations: {
      A: "Em regra, não se emprega crase antes de nome masculino como Pedro nesse contexto.",
      B: "Não ocorre crase antes de verbo.",
      C: 'A expressão correta é "a pé", sem crase.',
      D: 'Correto. Há a fusão da preposição "a" com o artigo feminino "a".',
    },

    tags: [
      "crase",
      "preposicao",
      "artigo",
      "regencia",
    ],
  },

  {
    id: "port-009",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Semântica",
    subtopic: "Sentido conotativo",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Na frase "Depois de receber a notícia, ele ficou com o coração partido", a expressão "coração partido" foi empregada principalmente em sentido:',

    alternatives: [
      {
        id: "A",
        text: "Literal, indicando uma lesão física obrigatória",
      },
      {
        id: "B",
        text: "Conotativo, indicando sofrimento emocional",
      },
      {
        id: "C",
        text: "Técnico, descrevendo um diagnóstico médico",
      },
      {
        id: "D",
        text: "Matemático, indicando divisão em partes iguais",
      },
    ],

    correctAnswer: "B",

    explanation:
      'A expressão "coração partido" é usada figurativamente para representar tristeza, decepção ou sofrimento emocional.',

    alternativeExplanations: {
      A: "O contexto não indica uma lesão física real no coração.",
      B: "Correto. A expressão possui sentido figurado ou conotativo.",
      C: "A frase não utiliza terminologia técnica nem apresenta diagnóstico.",
      D: "Não existe relação com uma operação matemática.",
    },

    tags: [
      "semantica",
      "conotacao",
      "sentido-figurado",
    ],
  },

  {
    id: "port-010",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Sintaxe",
    subtopic: "Sujeito",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      'Na oração "Os alunos da turma organizaram a apresentação", qual é o núcleo do sujeito?',

    alternatives: [
      {
        id: "A",
        text: "turma",
      },
      {
        id: "B",
        text: "organizaram",
      },
      {
        id: "C",
        text: "alunos",
      },
      {
        id: "D",
        text: "apresentação",
      },
    ],

    correctAnswer: "C",

    explanation:
      'O sujeito é "Os alunos da turma". Seu núcleo é "alunos", pois essa é a palavra principal do grupo nominal que pratica a ação de organizar.',

    alternativeExplanations: {
      A: '"Turma" faz parte da expressão que caracteriza os alunos, mas não é o núcleo do sujeito.',
      B: '"Organizaram" é o verbo da oração.',
      C: 'Correto. "Alunos" é o núcleo do sujeito.',
      D: '"Apresentação" pertence ao complemento do verbo.',
    },

    tags: [
      "sintaxe",
      "sujeito",
      "nucleo-do-sujeito",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "port-011",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Regência verbal",
    subtopic: "Verbo assistir",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Considerando a norma-padrão e o sentido de "ver ou presenciar", qual frase emprega corretamente o verbo "assistir"?',

    alternatives: [
      {
        id: "A",
        text: "Assistimos o espetáculo ontem.",
      },
      {
        id: "B",
        text: "Assistimos no espetáculo ontem.",
      },
      {
        id: "C",
        text: "Assistimos pelo espetáculo ontem.",
      },
      {
        id: "D",
        text: "Assistimos ao espetáculo ontem.",
      },
    ],

    correctAnswer: "D",

    explanation:
      'Na norma-padrão, quando "assistir" significa ver ou presenciar, o verbo rege a preposição "a": assistir a algo. Por isso, a construção adequada é "assistimos ao espetáculo".',

    alternativeExplanations: {
      A: 'Na norma-padrão, o sentido de presenciar exige a preposição "a".',
      B: 'A preposição "em" não corresponde à regência exigida nesse sentido.',
      C: 'A preposição "por" não é a adequada para essa construção.',
      D: 'Correto. "Ao" resulta da combinação da preposição "a" com o artigo "o".',
    },

    tags: [
      "regencia-verbal",
      "assistir",
      "preposicao",
    ],
  },

  {
    id: "port-012",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Pontuação",
    subtopic: "Orações adjetivas",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Compare: I. "Os alunos que estudaram foram aprovados." II. "Os alunos, que estudaram, foram aprovados." Qual interpretação está correta?',

    alternatives: [
      {
        id: "A",
        text: "Na primeira, apenas o grupo que estudou é identificado como aprovado; na segunda, a oração entre vírgulas caracteriza todos os alunos mencionados.",
      },
      {
        id: "B",
        text: "As duas frases possuem necessariamente exatamente o mesmo sentido.",
      },
      {
        id: "C",
        text: "Na primeira frase, as vírgulas foram omitidas por erro obrigatório.",
      },
      {
        id: "D",
        text: "Na segunda frase, a oração entre vírgulas restringe o grupo de alunos.",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Sem vírgulas, a oração adjetiva tende a ser restritiva, delimitando quais alunos são mencionados. Entre vírgulas, ela assume valor explicativo, apresentando a característica como referente ao conjunto mencionado.",

    alternativeExplanations: {
      A: "Correto. A pontuação altera a relação semântica da oração adjetiva com seu antecedente.",
      B: "A presença ou ausência das vírgulas pode modificar o sentido.",
      C: "A ausência das vírgulas pode ser correta quando a oração é restritiva.",
      D: "Uma oração adjetiva entre vírgulas possui valor explicativo, não restritivo.",
    },

    tags: [
      "pontuacao",
      "oracao-adjetiva",
      "restritiva",
      "explicativa",
    ],
  },

  {
    id: "port-013",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância verbal",
    subtopic: "Verbo haver",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Qual alternativa está de acordo com a norma-padrão quando o verbo "haver" possui sentido de existir?',

    alternatives: [
      {
        id: "A",
        text: "Haviam muitos candidatos na sala.",
      },
      {
        id: "B",
        text: "Havia muitos candidatos na sala.",
      },
      {
        id: "C",
        text: "Houveram muitos candidatos na sala.",
      },
      {
        id: "D",
        text: "Haviam existido muitos candidatos na sala.",
      },
    ],

    correctAnswer: "B",

    explanation:
      'Quando o verbo "haver" é empregado com sentido de existir, ele é impessoal e permanece na terceira pessoa do singular.',

    alternativeExplanations: {
      A: 'No sentido de existir, "haver" não concorda com "muitos candidatos".',
      B: 'Correto. A forma impessoal adequada é "havia".',
      C: 'Nesse uso impessoal, o verbo não deve ser flexionado no plural.',
      D: 'O trecho modifica a construção e não corresponde à forma adequada para a frase apresentada.',
    },

    tags: [
      "concordancia-verbal",
      "verbo-haver",
      "verbo-impessoal",
    ],
  },

  {
    id: "port-014",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Colocação pronominal",
    subtopic: "Próclise",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual alternativa apresenta colocação pronominal adequada à norma-padrão diante de uma palavra de sentido negativo?",

    alternatives: [
      {
        id: "A",
        text: "Não disseram-me a verdade.",
      },
      {
        id: "B",
        text: "Não disseram a verdade-me.",
      },
      {
        id: "C",
        text: "Não me disseram a verdade.",
      },
      {
        id: "D",
        text: "Não disseram me a verdade.",
      },
    ],

    correctAnswer: "C",

    explanation:
      'Palavras de sentido negativo, como "não", atraem o pronome oblíquo átono para antes do verbo, favorecendo a próclise: "Não me disseram".',

    alternativeExplanations: {
      A: 'A palavra negativa "não" favorece a colocação do pronome antes do verbo.',
      B: "O pronome não pode ser colocado dessa maneira depois do complemento.",
      C: "Correto. A presença de \"não\" favorece a próclise.",
      D: "A colocação apresentada não segue a forma prevista na norma-padrão.",
    },

    tags: [
      "colocacao-pronominal",
      "proclise",
      "pronome-obliquo",
    ],
  },

  {
    id: "port-015",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Período composto",
    subtopic: "Oração concessiva",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      'Na frase "Embora estivesse cansado, o atleta terminou a prova", a oração iniciada por "embora" estabelece principalmente uma relação de:',

    alternatives: [
      {
        id: "A",
        text: "Concessão",
      },
      {
        id: "B",
        text: "Causa",
      },
      {
        id: "C",
        text: "Conclusão",
      },
      {
        id: "D",
        text: "Finalidade",
      },
    ],

    correctAnswer: "A",

    explanation:
      '"Embora estivesse cansado" apresenta uma circunstância que poderia dificultar a realização da ação principal, mas não a impede. Essa relação caracteriza concessão.',

    alternativeExplanations: {
      A: "Correto. A oração expressa uma circunstância contrária que não impede o fato principal.",
      B: "A oração não apresenta a causa de o atleta ter terminado a prova.",
      C: "Não há relação de conclusão entre as duas orações.",
      D: "A oração não indica o objetivo ou a finalidade da ação.",
    },

    tags: [
      "periodo-composto",
      "oracao-adverbial",
      "concessao",
      "conjuncao",
    ],
  },
];