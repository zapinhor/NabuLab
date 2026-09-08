import type {
  Question,
} from "@/types/question";

export const portuguesTrueFalseQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "port-026",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Acentuação gráfica",
    subtopic: "Proparoxítonas",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "Todas as palavras proparoxítonas são acentuadas graficamente.",

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
      "Na norma-padrão do português, todas as palavras proparoxítonas recebem acento gráfico. São proparoxítonas aquelas cuja sílaba tônica é a antepenúltima.",

    alternativeExplanations: {
      V: "Correto. Todas as proparoxítonas são acentuadas graficamente.",
      F: "Incorreto. A regra estabelece que todas as proparoxítonas recebem acento.",
    },

    tags: [
      "acentuacao",
      "proparoxitona",
      "silaba-tonica",
    ],
  },

  {
    id: "port-027",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Ortografia",
    subtopic: "Por que e porque",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      'Na pergunta direta "Porque você chegou atrasado?", o uso de "porque" está de acordo com a norma-padrão.',

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
      'Em perguntas diretas, normalmente emprega-se "por que", separado: "Por que você chegou atrasado?". "Porque", junto, é usado principalmente em respostas e explicações.',

    alternativeExplanations: {
      V: 'Incorreto. Em uma pergunta direta como essa, a forma adequada é "por que".',
      F: 'Correto. A frase deveria ser escrita como "Por que você chegou atrasado?".',
    },

    tags: [
      "ortografia",
      "por-que",
      "porque",
    ],
  },

  {
    id: "port-028",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância nominal",
    subtopic: "Adjetivo",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      'Na frase "Os livros novos chegaram ontem", o adjetivo "novos" concorda em gênero e número com o substantivo "livros".',

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
      '"Livros" é um substantivo masculino plural. O adjetivo "novos" também aparece no masculino plural, estabelecendo concordância nominal adequada.',

    alternativeExplanations: {
      V: 'Correto. "Novos" concorda com "livros" em gênero masculino e número plural.',
      F: "Incorreto. A concordância entre o substantivo e o adjetivo está adequada.",
    },

    tags: [
      "concordancia-nominal",
      "adjetivo",
      "substantivo",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "port-029",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância verbal",
    subtopic: "Verbo haver",
    difficulty: "medio",
    type: "true-false",

    statement:
      'A frase "Houveram muitos problemas durante a reunião" está de acordo com a norma-padrão.',

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
      'Quando o verbo "haver" possui sentido de existir ou ocorrer, ele é impessoal e permanece na terceira pessoa do singular. A construção adequada é "Houve muitos problemas durante a reunião".',

    alternativeExplanations: {
      V: 'Incorreto. O verbo "haver", com sentido de existir, não deve ser flexionado no plural.',
      F: 'Correto. A forma adequada é "Houve muitos problemas durante a reunião".',
    },

    tags: [
      "concordancia-verbal",
      "verbo-haver",
      "verbo-impessoal",
    ],
  },

  {
    id: "port-030",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Crase",
    subtopic: "Preposição e artigo",
    difficulty: "medio",
    type: "true-false",

    statement:
      'Na frase "Entreguei o relatório à diretora", o uso da crase está adequado.',

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
      'O verbo "entregar" admite a construção "entregar algo a alguém". Como "diretora" admite o artigo feminino "a", ocorre a fusão da preposição "a" com o artigo "a": "à diretora".',

    alternativeExplanations: {
      V: "Correto. Há encontro da preposição exigida pela construção com o artigo feminino.",
      F: "Incorreto. Nesse contexto, o uso do acento indicativo de crase está adequado.",
    },

    tags: [
      "crase",
      "preposicao",
      "artigo",
      "regencia",
    ],
  },

  {
    id: "port-031",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Pronomes",
    subtopic: "Pronome relativo cujo",
    difficulty: "medio",
    type: "true-false",

    statement:
      'Na norma-padrão, o pronome relativo "cujo" estabelece normalmente uma relação de posse e não deve ser seguido de artigo.',

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
      'O pronome relativo "cujo" estabelece uma relação de posse entre dois termos. Além disso, não se utiliza artigo imediatamente depois de "cujo", "cuja", "cujos" ou "cujas".',

    alternativeExplanations: {
      V: 'Correto. "Cujo" expressa posse e não admite artigo imediatamente após sua forma.',
      F: 'Incorreto. Na norma-padrão, não se emprega construção como "cujo o" ou "cuja a".',
    },

    tags: [
      "pronome-relativo",
      "cujo",
      "posse",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "port-032",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Sintaxe",
    subtopic: "Índice de indeterminação do sujeito",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Na frase "Precisa-se de profissionais experientes", o verbo deveria obrigatoriamente ser flexionado no plural para concordar com "profissionais".',

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
      'Na construção "precisa-se de profissionais", o verbo "precisar" é transitivo indireto e o "se" funciona como índice de indeterminação do sujeito. Nesse caso, o verbo permanece na terceira pessoa do singular.',

    alternativeExplanations: {
      V: 'Incorreto. "Profissionais" não funciona como sujeito com o qual o verbo deva concordar nesse caso.',
      F: 'Correto. A forma "precisa-se de profissionais" está adequada à norma-padrão.',
    },

    tags: [
      "sintaxe",
      "indice-de-indeterminacao",
      "concordancia-verbal",
    ],
  },

  {
    id: "port-033",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Pontuação",
    subtopic: "Oração adjetiva explicativa",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Na frase "Os candidatos, que entregaram os documentos, foram chamados", as vírgulas atribuem à oração "que entregaram os documentos" valor explicativo.',

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
      "Orações subordinadas adjetivas explicativas aparecem isoladas por vírgulas e acrescentam uma informação sobre o antecedente sem restringir diretamente o grupo mencionado.",

    alternativeExplanations: {
      V: "Correto. As vírgulas indicam valor explicativo para a oração adjetiva.",
      F: "Incorreto. Sem as vírgulas, a oração tenderia a assumir valor restritivo.",
    },

    tags: [
      "pontuacao",
      "oracao-adjetiva",
      "explicativa",
    ],
  },

  {
    id: "port-034",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Regência verbal",
    subtopic: "Verbo preferir",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Segundo a norma-padrão, a frase "Prefiro mais estudar do que sair" apresenta a construção recomendada para o verbo "preferir".',

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
      'Na norma-padrão, recomenda-se a estrutura "preferir uma coisa a outra", evitando reforços comparativos como "mais... do que". Uma construção adequada seria "Prefiro estudar a sair".',

    alternativeExplanations: {
      V: 'Incorreto. A construção padrão não recomenda "preferir mais... do que".',
      F: 'Correto. A regência tradicional recomenda "preferir X a Y".',
    },

    tags: [
      "regencia-verbal",
      "preferir",
      "norma-padrao",
    ],
  },

  {
    id: "port-035",
    area: "Linguagens",
    subject: "portugues",
    subjectName: "Português",
    topic: "Concordância nominal",
    subtopic: "Expressões impessoais",
    difficulty: "avancado",
    type: "true-false",

    statement:
      'Na frase "É necessário a autorização dos responsáveis", a concordância nominal está plenamente adequada à norma-padrão.',

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
      'Como o substantivo "autorização" aparece determinado pelo artigo "a", o adjetivo deve concordar com ele. A forma adequada é "É necessária a autorização dos responsáveis".',

    alternativeExplanations: {
      V: 'Incorreto. Com o artigo "a", o adjetivo deve assumir a forma feminina "necessária".',
      F: 'Correto. A construção adequada é "É necessária a autorização dos responsáveis".',
    },

    tags: [
      "concordancia-nominal",
      "necessario",
      "artigo",
    ],
  },
];