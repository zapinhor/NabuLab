import type { Question } from "@/types/question";

export const respiratorioExtraQuestions: Question[] = [
  {
    id: "resp-016",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Vias aéreas",
    subtopic: "Cavidade nasal",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual é uma das principais funções da cavidade nasal durante a passagem do ar inspirado?",
    alternatives: [
      {
        id: "A",
        text: "Aquecer, umidificar e auxiliar na filtração do ar.",
      },
      {
        id: "B",
        text: "Realizar diretamente as principais trocas gasosas com o sangue.",
      },
      {
        id: "C",
        text: "Produzir surfactante pulmonar.",
      },
      {
        id: "D",
        text: "Controlar diretamente a contração do diafragma.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A cavidade nasal participa do condicionamento do ar inspirado, promovendo aquecimento, umidificação e retenção de partículas por meio de pelos, muco e atividade mucociliar.",
    alternativeExplanations: {
      A: "Correto. O condicionamento do ar é uma função importante da cavidade nasal.",
      B: "Incorreto. As principais trocas gasosas ocorrem nos alvéolos.",
      C: "Incorreto. O surfactante é produzido principalmente pelos pneumócitos tipo II.",
      D: "Incorreto. A contração diafragmática é controlada por vias motoras, especialmente pelo nervo frênico.",
    },
    tags: [
      "cavidade-nasal",
      "vias-aereas",
      "filtracao",
    ],
  },

  {
    id: "resp-017",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Laringe",
    subtopic: "Epiglote",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Durante a deglutição, qual estrutura auxilia na proteção das vias aéreas?",
    alternatives: [
      {
        id: "A",
        text: "Epiglote.",
      },
      {
        id: "B",
        text: "Pleura parietal.",
      },
      {
        id: "C",
        text: "Alvéolo.",
      },
      {
        id: "D",
        text: "Diafragma.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A epiglote participa do mecanismo de proteção das vias aéreas durante a deglutição, juntamente com outros movimentos coordenados da laringe.",
    alternativeExplanations: {
      A: "Correto. A epiglote ajuda a direcionar o conteúdo deglutido para longe da entrada da laringe.",
      B: "Incorreto. A pleura reveste pulmões e cavidade torácica.",
      C: "Incorreto. Alvéolos estão relacionados às trocas gasosas.",
      D: "Incorreto. O diafragma é principalmente um músculo respiratório.",
    },
    tags: [
      "laringe",
      "epiglote",
      "degluticao",
    ],
  },

  {
    id: "resp-018",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Árvore brônquica",
    subtopic: "Brônquios principais",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Por qual motivo corpos estranhos aspirados apresentam maior tendência a alcançar o brônquio principal direito?",
    alternatives: [
      {
        id: "A",
        text: "Porque ele tende a ser mais vertical, mais curto e de maior calibre que o esquerdo.",
      },
      {
        id: "B",
        text: "Porque o pulmão direito possui apenas dois lobos.",
      },
      {
        id: "C",
        text: "Porque o brônquio direito não possui cartilagem.",
      },
      {
        id: "D",
        text: "Porque o brônquio esquerdo termina diretamente nos alvéolos.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O brônquio principal direito possui orientação mais vertical e anatomia que favorece a progressão de material aspirado em sua direção.",
    alternativeExplanations: {
      A: "Correto. Sua anatomia favorece a entrada de corpos estranhos.",
      B: "Incorreto. O pulmão direito normalmente possui três lobos.",
      C: "Incorreto. Brônquios possuem elementos cartilaginosos.",
      D: "Incorreto. Ambos se ramificam progressivamente antes de chegar às regiões alveolares.",
    },
    tags: [
      "bronquios",
      "aspiracao",
      "anatomia",
    ],
  },

  {
    id: "resp-019",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Pleuras",
    subtopic: "Pleura visceral",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual alternativa descreve corretamente a pleura visceral?",
    alternatives: [
      {
        id: "A",
        text: "Reveste diretamente a superfície pulmonar.",
      },
      {
        id: "B",
        text: "Reveste apenas a face interna das costelas.",
      },
      {
        id: "C",
        text: "Forma a parede posterior da traqueia.",
      },
      {
        id: "D",
        text: "Preenche o interior dos alvéolos.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A pleura visceral está aderida à superfície pulmonar, enquanto a pleura parietal reveste regiões da cavidade torácica.",
    alternativeExplanations: {
      A: "Correto. A pleura visceral acompanha intimamente o pulmão.",
      B: "Incorreto. Essa descrição se aproxima da pleura parietal costal.",
      C: "Incorreto. A parede traqueal não é formada pela pleura.",
      D: "Incorreto. A pleura não ocupa os espaços alveolares.",
    },
    tags: [
      "pleura-visceral",
      "pleura",
      "pulmao",
    ],
  },

  {
    id: "resp-020",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Mecânica respiratória",
    subtopic: "Pressões respiratórias",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Durante a inspiração espontânea tranquila, o que geralmente ocorre com a pressão alveolar em relação à pressão atmosférica?",
    alternatives: [
      {
        id: "A",
        text: "Torna-se discretamente menor, favorecendo a entrada de ar.",
      },
      {
        id: "B",
        text: "Torna-se muito maior, expulsando o ar.",
      },
      {
        id: "C",
        text: "Permanece sempre exatamente igual durante toda a inspiração.",
      },
      {
        id: "D",
        text: "Torna-se independente das alterações de volume pulmonar.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O aumento do volume torácico e pulmonar reduz temporariamente a pressão alveolar abaixo da atmosférica, produzindo fluxo de ar para dentro.",
    alternativeExplanations: {
      A: "Correto. O gradiente de pressão permite a entrada de ar.",
      B: "Incorreto. Pressão alveolar superior favoreceria fluxo para fora.",
      C: "Incorreto. Ela sofre pequenas alterações durante o ciclo respiratório.",
      D: "Incorreto. Pressão e volume estão funcionalmente relacionados.",
    },
    tags: [
      "pressao-alveolar",
      "inspiracao",
      "ventilacao",
    ],
  },

  {
    id: "resp-021",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Complacência",
    subtopic: "Pulmão",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Em fisiologia respiratória, complacência pulmonar representa principalmente:",
    alternatives: [
      {
        id: "A",
        text: "A facilidade com que o pulmão se distende diante de uma alteração de pressão.",
      },
      {
        id: "B",
        text: "A quantidade de oxigênio ligada diretamente à hemoglobina.",
      },
      {
        id: "C",
        text: "A resistência elétrica dos neurônios respiratórios.",
      },
      {
        id: "D",
        text: "A frequência de fechamento da epiglote.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A complacência relaciona alteração de volume à alteração de pressão e expressa a distensibilidade do sistema pulmonar.",
    alternativeExplanations: {
      A: "Correto. Maior complacência significa maior variação de volume para uma determinada mudança de pressão.",
      B: "Incorreto. Isso está relacionado ao transporte de oxigênio.",
      C: "Incorreto. Não é uma propriedade elétrica neuronal.",
      D: "Incorreto. Não está relacionada ao movimento da epiglote.",
    },
    tags: [
      "complacencia",
      "mecanica-respiratoria",
      "distensibilidade",
    ],
  },

  {
    id: "resp-022",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação alveolar",
    subtopic: "Espaço morto",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "O espaço morto anatômico corresponde principalmente:",
    alternatives: [
      {
        id: "A",
        text: "Ao volume de ar presente nas vias condutoras que não realiza diretamente trocas gasosas alveolares.",
      },
      {
        id: "B",
        text: "A todos os alvéolos normalmente perfundidos.",
      },
      {
        id: "C",
        text: "Ao sangue presente na circulação pulmonar.",
      },
      {
        id: "D",
        text: "À capacidade vital inteira.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "As vias aéreas condutoras movimentam o ar até a zona respiratória, mas não constituem a principal área de troca gasosa.",
    alternativeExplanations: {
      A: "Correto. Esse volume integra o espaço morto anatômico.",
      B: "Incorreto. Alvéolos normalmente ventilados e perfundidos participam da troca gasosa.",
      C: "Incorreto. Espaço morto é um conceito relacionado à ventilação.",
      D: "Incorreto. Capacidade vital corresponde a um conjunto de volumes pulmonares.",
    },
    tags: [
      "espaco-morto",
      "ventilacao-alveolar",
      "vias-condutoras",
    ],
  },

  {
    id: "resp-023",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Transporte de gases",
    subtopic: "Oxigênio",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "No sangue arterial normal, a maior parte do oxigênio é transportada:",
    alternatives: [
      {
        id: "A",
        text: "Ligada reversivelmente à hemoglobina.",
      },
      {
        id: "B",
        text: "Dissolvida livremente no plasma.",
      },
      {
        id: "C",
        text: "Na forma de bicarbonato.",
      },
      {
        id: "D",
        text: "Ligada principalmente à albumina.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Embora exista uma pequena fração de O₂ dissolvida no plasma, a maior parte do conteúdo sanguíneo de oxigênio está ligada à hemoglobina.",
    alternativeExplanations: {
      A: "Correto. A hemoglobina é o principal transportador de O₂ no sangue.",
      B: "Incorreto. A fração dissolvida é relativamente pequena.",
      C: "Incorreto. Bicarbonato está relacionado principalmente ao transporte de CO₂.",
      D: "Incorreto. Albumina não é o principal transportador respiratório de O₂.",
    },
    tags: [
      "oxigenio",
      "hemoglobina",
      "transporte-de-gases",
    ],
  },

  {
    id: "resp-024",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Controle da respiração",
    subtopic: "Quimiorreceptores",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual alteração constitui um importante estímulo para quimiorreceptores periféricos em condições de hipoxemia significativa?",
    alternatives: [
      {
        id: "A",
        text: "Redução da pressão parcial arterial de oxigênio.",
      },
      {
        id: "B",
        text: "Aumento do número de lobos pulmonares.",
      },
      {
        id: "C",
        text: "Redução do volume residual a zero.",
      },
      {
        id: "D",
        text: "Abertura da epiglote durante a inspiração.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Corpos carotídeos e aórticos respondem a alterações químicas do sangue, incluindo queda relevante da PaO₂.",
    alternativeExplanations: {
      A: "Correto. Hipoxemia arterial significativa estimula quimiorreceptores periféricos.",
      B: "Incorreto. Número de lobos é uma característica anatômica.",
      C: "Incorreto. O volume residual fisiologicamente não cai a zero.",
      D: "Incorreto. Isso não constitui o principal sinal químico para esses receptores.",
    },
    tags: [
      "quimiorreceptores",
      "hipoxemia",
      "controle-respiratorio",
    ],
  },

  {
    id: "resp-025",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Relação ventilação-perfusão",
    subtopic: "Shunt",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual situação se aproxima mais do conceito de shunt intrapulmonar?",
    alternatives: [
      {
        id: "A",
        text: "Perfusão de uma região alveolar sem ventilação adequada.",
      },
      {
        id: "B",
        text: "Ventilação de uma região sem qualquer perfusão.",
      },
      {
        id: "C",
        text: "Aumento simultâneo e proporcional de ventilação e perfusão.",
      },
      {
        id: "D",
        text: "Ar permanecendo exclusivamente na traqueia.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "No shunt, sangue perfunde unidades pulmonares pouco ou não ventiladas, reduzindo a eficiência da oxigenação.",
    alternativeExplanations: {
      A: "Correto. Perfusão sem ventilação adequada caracteriza uma relação V/Q próxima de zero.",
      B: "Incorreto. Ventilação sem perfusão se aproxima de espaço morto.",
      C: "Incorreto. Uma relação proporcional pode preservar a eficiência das trocas.",
      D: "Incorreto. Isso se relacionaria mais à zona condutora.",
    },
    tags: [
      "shunt",
      "ventilacao-perfusao",
      "vq",
    ],
  },
];