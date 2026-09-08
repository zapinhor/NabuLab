import type { Question } from "@/types/question";

export const sistemaNervosoExtraQuestions: Question[] = [
  {
    id: "sn-016",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Organização do sistema nervoso",
    subtopic: "Sistema nervoso periférico",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual estrutura pertence ao sistema nervoso periférico?",
    alternatives: [
      {
        id: "A",
        text: "Nervo espinal.",
      },
      {
        id: "B",
        text: "Córtex cerebral.",
      },
      {
        id: "C",
        text: "Cerebelo.",
      },
      {
        id: "D",
        text: "Medula espinal.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O sistema nervoso periférico inclui nervos, gânglios e terminações nervosas localizados fora do encéfalo e da medula espinal.",
    alternativeExplanations: {
      A: "Correto. Nervos espinais fazem parte do sistema nervoso periférico.",
      B: "Incorreto. O córtex cerebral pertence ao sistema nervoso central.",
      C: "Incorreto. O cerebelo é uma estrutura do encéfalo e, portanto, do SNC.",
      D: "Incorreto. A medula espinal integra o sistema nervoso central.",
    },
    tags: [
      "snp",
      "nervos",
      "organizacao",
    ],
  },

  {
    id: "sn-017",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Neurônios",
    subtopic: "Axônio",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual é uma função típica do axônio de um neurônio?",
    alternatives: [
      {
        id: "A",
        text: "Conduzir sinais elétricos do corpo celular em direção a outras células.",
      },
      {
        id: "B",
        text: "Produzir hemoglobina.",
      },
      {
        id: "C",
        text: "Realizar diretamente a filtração renal.",
      },
      {
        id: "D",
        text: "Secretar surfactante pulmonar.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O axônio é especializado na propagação de sinais elétricos em direção aos terminais axonais.",
    alternativeExplanations: {
      A: "Correto. A propagação do potencial de ação ocorre ao longo do axônio.",
      B: "Incorreto. Hemoglobina é produzida durante a diferenciação eritroide.",
      C: "Incorreto. Filtração renal ocorre nos néfrons.",
      D: "Incorreto. Surfactante é produzido principalmente por pneumócitos tipo II.",
    },
    tags: [
      "axonio",
      "neuronio",
      "conducao",
    ],
  },

  {
    id: "sn-018",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Arco reflexo",
    subtopic: "Reflexos",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Em um arco reflexo simples, qual sequência representa melhor o fluxo de informação?",
    alternatives: [
      {
        id: "A",
        text: "Receptor → via aferente → centro integrador → via eferente → efetor.",
      },
      {
        id: "B",
        text: "Efetor → receptor → músculo → encéfalo → pele.",
      },
      {
        id: "C",
        text: "Via eferente → receptor → aferente → efetor → integrador.",
      },
      {
        id: "D",
        text: "Músculo → osso → receptor → sangue → nervo.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O estímulo é detectado por um receptor, conduzido por uma via aferente ao sistema nervoso central, processado e enviado por uma via eferente ao efetor.",
    alternativeExplanations: {
      A: "Correto. Essa é a organização funcional clássica de um arco reflexo.",
      B: "Incorreto. A sequência não representa corretamente o fluxo neural.",
      C: "Incorreto. A via aferente deve levar a informação ao centro integrador antes da resposta eferente.",
      D: "Incorreto. Essa sequência não descreve um arco reflexo.",
    },
    tags: [
      "arco-reflexo",
      "aferente",
      "eferente",
    ],
  },

  {
    id: "sn-019",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sistema nervoso autônomo",
    subtopic: "Simpático",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Em uma resposta simpática típica associada a uma situação de alerta, é esperado:",
    alternatives: [
      {
        id: "A",
        text: "Aumento da frequência cardíaca.",
      },
      {
        id: "B",
        text: "Redução obrigatória da frequência cardíaca.",
      },
      {
        id: "C",
        text: "Paralisação permanente da ventilação.",
      },
      {
        id: "D",
        text: "Bloqueio completo da atividade cerebral.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A ativação simpática pode elevar a frequência cardíaca e a contratilidade, além de produzir outras respostas associadas à preparação do organismo para ação.",
    alternativeExplanations: {
      A: "Correto. É uma resposta cardiovascular característica da ativação simpática.",
      B: "Incorreto. Redução da frequência cardíaca está mais associada à influência parassimpática cardíaca.",
      C: "Incorreto. O sistema simpático não interrompe permanentemente a ventilação.",
      D: "Incorreto. Ativação simpática não significa bloqueio da função cerebral.",
    },
    tags: [
      "simpatico",
      "autonomo",
      "frequencia-cardiaca",
    ],
  },

  {
    id: "sn-020",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Limiar",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "O que ocorre quando a membrana de um neurônio atinge o limiar necessário para iniciar um potencial de ação típico?",
    alternatives: [
      {
        id: "A",
        text: "A abertura regenerativa de canais dependentes de voltagem pode desencadear o potencial de ação.",
      },
      {
        id: "B",
        text: "Todos os canais iônicos da membrana são destruídos.",
      },
      {
        id: "C",
        text: "O neurônio perde permanentemente seu potencial de membrana.",
      },
      {
        id: "D",
        text: "A célula deixa imediatamente de utilizar ATP.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Ao atingir o limiar, a ativação de canais de Na+ dependentes de voltagem pode gerar um ciclo regenerativo de despolarização.",
    alternativeExplanations: {
      A: "Correto. O limiar marca o ponto em que o processo regenerativo pode produzir um potencial de ação.",
      B: "Incorreto. Os canais sofrem mudanças conformacionais, não destruição.",
      C: "Incorreto. Após o potencial de ação, mecanismos celulares restauram as condições de repouso.",
      D: "Incorreto. ATP continua sendo necessário para diversas funções neuronais.",
    },
    tags: [
      "limiar",
      "potencial-de-acao",
      "canais-de-voltagem",
    ],
  },

  {
    id: "sn-021",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sinapse química",
    subtopic: "Cálcio",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual evento no terminal pré-sináptico é fundamental para desencadear a liberação de neurotransmissores em muitas sinapses químicas?",
    alternatives: [
      {
        id: "A",
        text: "Entrada de Ca²+ através de canais dependentes de voltagem.",
      },
      {
        id: "B",
        text: "Saída completa de todo o Na+ da célula.",
      },
      {
        id: "C",
        text: "Destruição das vesículas sinápticas.",
      },
      {
        id: "D",
        text: "Entrada de hemoglobina no neurônio.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A despolarização do terminal abre canais de Ca²+ dependentes de voltagem. O aumento de Ca²+ intracelular promove fusão de vesículas e liberação do neurotransmissor.",
    alternativeExplanations: {
      A: "Correto. O Ca²+ é um sinal essencial para a exocitose sináptica.",
      B: "Incorreto. A liberação não depende da remoção completa de Na+.",
      C: "Incorreto. As vesículas fundem-se com a membrana de maneira regulada.",
      D: "Incorreto. Hemoglobina não participa desse mecanismo.",
    },
    tags: [
      "calcio",
      "sinapse",
      "exocitose",
    ],
  },

  {
    id: "sn-022",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sistema nervoso autônomo",
    subtopic: "Parassimpático",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual neurotransmissor é liberado pelos neurônios pós-ganglionares parassimpáticos na maioria de seus órgãos-alvo?",
    alternatives: [
      {
        id: "A",
        text: "Acetilcolina.",
      },
      {
        id: "B",
        text: "Hemoglobina.",
      },
      {
        id: "C",
        text: "Insulina.",
      },
      {
        id: "D",
        text: "Cortisol.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Neurônios pós-ganglionares parassimpáticos liberam acetilcolina, que geralmente atua em receptores muscarínicos nos órgãos-alvo.",
    alternativeExplanations: {
      A: "Correto. Acetilcolina é o principal neurotransmissor pós-ganglionar parassimpático.",
      B: "Incorreto. Hemoglobina é uma proteína transportadora de gases.",
      C: "Incorreto. Insulina é um hormônio pancreático.",
      D: "Incorreto. Cortisol é um hormônio esteroide produzido pelo córtex adrenal.",
    },
    tags: [
      "parassimpatico",
      "acetilcolina",
      "autonomo",
    ],
  },

  
{
  id: "sn-023",
  area: "Fisiologia Humana",
  subject: "sistema-nervoso",
  subjectName: "Sistema Nervoso",
  topic: "Potencial de ação",
  subtopic: "Codificação da intensidade",
  difficulty: "avancado",
  type: "multiple-choice",
  statement:
    "Quando a intensidade de um estímulo aumenta acima do limiar em um neurônio, qual mecanismo pode representar melhor esse aumento de intensidade?",
  alternatives: [
    {
      id: "A",
      text: "Aumento da frequência de potenciais de ação.",
    },
    {
      id: "B",
      text: "Aumento proporcional e ilimitado da amplitude de cada potencial de ação.",
    },
    {
      id: "C",
      text: "Desaparecimento completo do período refratário.",
    },
    {
      id: "D",
      text: "Inversão permanente do sentido de propagação do impulso.",
    },
  ],
  correctAnswer: "A",
  explanation:
    "Como a amplitude de um potencial de ação individual é relativamente estereotipada após o limiar, estímulos mais intensos podem ser representados por aumento da frequência de disparos e pelo recrutamento de mais unidades sensoriais, dependendo do sistema.",
  alternativeExplanations: {
    A: "Correto. A frequência de disparos é uma importante forma de codificação da intensidade do estímulo.",
    B: "Incorreto. A amplitude de cada potencial de ação não aumenta proporcionalmente e de forma ilimitada com a intensidade do estímulo.",
    C: "Incorreto. Os períodos refratários continuam existindo e são importantes para a fisiologia neuronal.",
    D: "Incorreto. A intensidade do estímulo não provoca inversão permanente da propagação do potencial de ação.",
  },
  tags: [
    "potencial-de-acao",
    "frequencia-de-disparo",
    "codificacao",
  ],
},

  {
    id: "sn-024",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sinapses",
    subtopic: "Potencial pós-sináptico inibitório",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Um potencial pós-sináptico inibitório pode reduzir a probabilidade de disparo neuronal principalmente por:",
    alternatives: [
      {
        id: "A",
        text: "Modificar a condutância iônica de forma a afastar ou dificultar que a membrana atinja o limiar.",
      },
      {
        id: "B",
        text: "Destruir permanentemente o axônio.",
      },
      {
        id: "C",
        text: "Remover todo o ATP do neurônio.",
      },
      {
        id: "D",
        text: "Transformar o neurônio em uma célula muscular.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A abertura de canais associados a Cl− ou K+, por exemplo, pode hiperpolarizar a membrana ou produzir inibição por shunt, reduzindo a excitabilidade.",
    alternativeExplanations: {
      A: "Correto. A inibição modifica a relação entre o potencial da membrana e o limiar.",
      B: "Incorreto. Inibição sináptica normal é um processo funcional e reversível.",
      C: "Incorreto. Não exige eliminação do ATP celular.",
      D: "Incorreto. Sinapses não mudam o tipo celular dessa maneira.",
    },
    tags: [
      "ipsp",
      "inibicao",
      "sinapse",
    ],
  },

  {
  id: "sn-025",
  area: "Fisiologia Humana",
  subject: "sistema-nervoso",
  subjectName: "Sistema Nervoso",
  topic: "Mielina",
  subtopic: "Sistema nervoso periférico",
  difficulty: "avancado",
  type: "multiple-choice",
  statement:
    "Uma alteração afeta seletivamente as células responsáveis pela formação de mielina nos axônios do sistema nervoso periférico. Qual célula foi diretamente comprometida?",
  alternatives: [
    {
      id: "A",
      text: "Célula de Schwann.",
    },
    {
      id: "B",
      text: "Oligodendrócito.",
    },
    {
      id: "C",
      text: "Astrócito.",
    },
    {
      id: "D",
      text: "Micróglia.",
    },
  ],
  correctAnswer: "A",
  explanation:
    "As células de Schwann são responsáveis pela formação de mielina no sistema nervoso periférico. No sistema nervoso central, essa função é desempenhada pelos oligodendrócitos.",
  alternativeExplanations: {
    A: "Correto. Células de Schwann formam a mielina dos axônios periféricos.",
    B: "Incorreto. Oligodendrócitos produzem mielina no sistema nervoso central.",
    C: "Incorreto. Astrócitos possuem diversas funções de suporte e regulação no SNC, mas não são as principais células mielinizantes.",
    D: "Incorreto. A micróglia participa principalmente da defesa imune e vigilância do sistema nervoso central.",
  },
  tags: [
    "schwann",
    "mielina",
    "snp",
  ],
},
];