import { Question } from "@/types/question";

export const sistemaNervosoQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "sn-001",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Organização do sistema nervoso",
    subtopic: "Sistema Nervoso Central",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quais estruturas formam o Sistema Nervoso Central (SNC)?",

    alternatives: [
      {
        id: "A",
        text: "Encéfalo e medula espinal",
      },
      {
        id: "B",
        text: "Nervos cranianos e nervos espinais exclusivamente",
      },
      {
        id: "C",
        text: "Músculos e tendões",
      },
      {
        id: "D",
        text: "Encéfalo e músculos esqueléticos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O Sistema Nervoso Central é formado pelo encéfalo e pela medula espinal. Estruturas nervosas localizadas fora do SNC pertencem, em geral, ao Sistema Nervoso Periférico.",

    alternativeExplanations: {
      A: "Correto. Encéfalo e medula espinal formam o SNC.",
      B: "Nervos cranianos e espinais fazem parte predominantemente do Sistema Nervoso Periférico.",
      C: "Músculos e tendões pertencem ao sistema musculoesquelético.",
      D: "Músculos esqueléticos são efetores, não componentes do SNC.",
    },

    tags: ["snc", "encefalo", "medula-espinal"],
  },

  {
    id: "sn-002",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Organização do sistema nervoso",
    subtopic: "Sistema Nervoso Periférico",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "De forma geral, qual é a principal característica do Sistema Nervoso Periférico (SNP)?",

    alternatives: [
      {
        id: "A",
        text: "É formado apenas pelo cérebro",
      },
      {
        id: "B",
        text: "Compreende estruturas nervosas localizadas fora do encéfalo e da medula espinal",
      },
      {
        id: "C",
        text: "É formado exclusivamente pelo cerebelo",
      },
      {
        id: "D",
        text: "É responsável apenas pela digestão",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O Sistema Nervoso Periférico inclui nervos, gânglios e outras estruturas nervosas fora do encéfalo e da medula espinal.",

    alternativeExplanations: {
      A: "O cérebro pertence ao Sistema Nervoso Central.",
      B: "Correto. O SNP conecta o SNC a diferentes regiões do organismo.",
      C: "O cerebelo faz parte do encéfalo e, portanto, do SNC.",
      D: "O SNP participa de funções motoras, sensoriais e autonômicas, entre outras.",
    },

    tags: ["snp", "nervos", "ganglios"],
  },

  {
    id: "sn-003",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Vias nervosas",
    subtopic: "Aferente",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Uma via aferente conduz informação predominantemente em qual sentido?",

    alternatives: [
      {
        id: "A",
        text: "Do Sistema Nervoso Central para os músculos",
      },
      {
        id: "B",
        text: "Da periferia em direção ao Sistema Nervoso Central",
      },
      {
        id: "C",
        text: "Dos músculos diretamente para os pulmões",
      },
      {
        id: "D",
        text: "Do encéfalo exclusivamente para as glândulas",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Vias aferentes conduzem informações sensoriais da periferia em direção ao Sistema Nervoso Central.",

    alternativeExplanations: {
      A: "Esse sentido corresponde às vias eferentes motoras.",
      B: "Correto. Aferente conduz informação em direção ao SNC.",
      C: "Essa não é a organização funcional das vias nervosas.",
      D: "Comandos do SNC para efetores são predominantemente eferentes.",
    },

    tags: ["aferente", "sensorial", "sistema-nervoso"],
  },

  {
    id: "sn-004",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Neurônio",
    subtopic: "Estrutura",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual estrutura do neurônio conduz potenciais de ação para regiões distantes do corpo celular?",

    alternatives: [
      {
        id: "A",
        text: "Axônio",
      },
      {
        id: "B",
        text: "Nucléolo",
      },
      {
        id: "C",
        text: "Dendrito exclusivamente",
      },
      {
        id: "D",
        text: "Lisossomo",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O axônio é especializado na condução de potenciais de ação do corpo celular em direção aos terminais axonais.",

    alternativeExplanations: {
      A: "Correto. O axônio conduz o sinal elétrico a longas distâncias.",
      B: "O nucléolo está relacionado à produção de componentes ribossomais.",
      C: "Dendritos recebem grande parte das entradas sinápticas, embora também possam apresentar atividade elétrica local.",
      D: "Lisossomos participam da degradação intracelular.",
    },

    tags: ["neuronio", "axonio", "potencial-de-acao"],
  },

  {
    id: "sn-005",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Neurônio",
    subtopic: "Dendritos",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é uma das principais funções dos dendritos?",

    alternatives: [
      {
        id: "A",
        text: "Receber grande parte dos sinais provenientes de outros neurônios",
      },
      {
        id: "B",
        text: "Produzir surfactante pulmonar",
      },
      {
        id: "C",
        text: "Transportar oxigênio no sangue",
      },
      {
        id: "D",
        text: "Formar tecido ósseo",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Os dendritos são extensões do neurônio especializadas em receber grande parte das entradas sinápticas provenientes de outras células.",

    alternativeExplanations: {
      A: "Correto. Dendritos são importantes estruturas receptoras do neurônio.",
      B: "Surfactante é produzido principalmente por pneumócitos tipo II.",
      C: "O transporte de oxigênio depende principalmente da hemoglobina.",
      D: "A formação de tecido ósseo envolve células como osteoblastos.",
    },

    tags: ["dendritos", "neuronio", "sinapse"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "sn-006",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Despolarização",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Durante a fase rápida de despolarização de um potencial de ação típico em um neurônio, qual evento predomina?",

    alternatives: [
      {
        id: "A",
        text: "Entrada de Na+ através de canais dependentes de voltagem",
      },
      {
        id: "B",
        text: "Saída maciça de glicose",
      },
      {
        id: "C",
        text: "Entrada de proteínas através da bicamada lipídica",
      },
      {
        id: "D",
        text: "Fechamento permanente de todos os canais iônicos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A despolarização rápida de muitos neurônios ocorre principalmente pela abertura de canais de Na+ dependentes de voltagem e entrada de Na+ na célula.",

    alternativeExplanations: {
      A: "Correto. A entrada de Na+ torna o interior da célula menos negativo e temporariamente positivo.",
      B: "Glicose não é responsável pela fase elétrica rápida do potencial de ação.",
      C: "Proteínas não atravessam dessa maneira para gerar a despolarização.",
      D: "A despolarização depende justamente da abertura coordenada de canais.",
    },

    tags: ["potencial-de-acao", "despolarizacao", "sodio"],
  },

  {
    id: "sn-007",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Repolarização",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual evento contribui de forma importante para a repolarização de um neurônio após a despolarização?",

    alternatives: [
      {
        id: "A",
        text: "Saída de K+ através de canais dependentes de voltagem",
      },
      {
        id: "B",
        text: "Entrada contínua e ilimitada de Na+",
      },
      {
        id: "C",
        text: "Destruição imediata da membrana plasmática",
      },
      {
        id: "D",
        text: "Bloqueio completo do movimento de todos os íons",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A abertura de canais de K+ dependentes de voltagem permite saída de K+, contribuindo para que o potencial de membrana retorne a valores negativos.",

    alternativeExplanations: {
      A: "Correto. A saída de K+ é fundamental na repolarização.",
      B: "A entrada contínua de Na+ prolongaria a despolarização.",
      C: "A membrana permanece íntegra durante o potencial de ação normal.",
      D: "Movimentos iônicos são justamente a base do fenômeno.",
    },

    tags: ["potencial-de-acao", "repolarizacao", "potassio"],
  },

  {
    id: "sn-008",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Glia",
    subtopic: "Mielina",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Quais células produzem mielina no Sistema Nervoso Central e no Sistema Nervoso Periférico, respectivamente?",

    alternatives: [
      {
        id: "A",
        text: "Astrócitos e micróglia",
      },
      {
        id: "B",
        text: "Oligodendrócitos e células de Schwann",
      },
      {
        id: "C",
        text: "Células de Schwann e oligodendrócitos",
      },
      {
        id: "D",
        text: "Neurônios motores e astrócitos",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Oligodendrócitos produzem mielina no SNC, enquanto células de Schwann desempenham essa função no SNP.",

    alternativeExplanations: {
      A: "Astrócitos e micróglia possuem outras funções importantes, mas não são as principais células mielinizantes.",
      B: "Correto. Oligodendrócito no SNC e Schwann no SNP.",
      C: "A ordem está invertida.",
      D: "Neurônios motores não são as células mielinizantes.",
    },

    tags: ["mielina", "oligodendrocitos", "schwann", "glia"],
  },

  {
    id: "sn-009",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sinapses",
    subtopic: "Sinapse química",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Na sinapse química, qual evento ocorre logo após a chegada do potencial de ação ao terminal pré-sináptico?",

    alternatives: [
      {
        id: "A",
        text: "Abertura de canais de Ca2+ dependentes de voltagem",
      },
      {
        id: "B",
        text: "Destruição imediata do neurotransmissor antes de sua liberação",
      },
      {
        id: "C",
        text: "Entrada maciça de DNA na fenda sináptica",
      },
      {
        id: "D",
        text: "Fechamento irreversível de todas as vesículas sinápticas",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A chegada do potencial de ação despolariza o terminal pré-sináptico, abrindo canais de Ca2+ dependentes de voltagem. A entrada de Ca2+ desencadeia a fusão das vesículas e a liberação do neurotransmissor.",

    alternativeExplanations: {
      A: "Correto. O Ca2+ é essencial para a liberação do neurotransmissor.",
      B: "O neurotransmissor precisa ser liberado antes de ser removido ou degradado.",
      C: "DNA não é liberado na fenda sináptica nesse processo.",
      D: "As vesículas participam dinamicamente da liberação de neurotransmissores.",
    },

    tags: ["sinapse", "calcio", "neurotransmissor"],
  },

  {
    id: "sn-010",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sistema Nervoso Autônomo",
    subtopic: "Simpático e parassimpático",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual alternativa representa corretamente uma diferença geral entre os sistemas simpático e parassimpático?",

    alternatives: [
      {
        id: "A",
        text: "O simpático costuma favorecer mobilização de recursos, enquanto o parassimpático participa fortemente de conservação de energia e funções digestivas",
      },
      {
        id: "B",
        text: "O simpático controla apenas músculos esqueléticos e o parassimpático controla apenas ossos",
      },
      {
        id: "C",
        text: "Os dois sistemas permanecem completamente inativos em repouso",
      },
      {
        id: "D",
        text: "O sistema parassimpático não influencia nenhum órgão interno",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Embora a fisiologia autonômica seja mais complexa que a ideia de luta ou fuga versus repouso, o simpático geralmente favorece mobilização de recursos e o parassimpático participa intensamente de conservação energética e atividades digestivas.",

    alternativeExplanations: {
      A: "Correto. É uma boa descrição funcional geral.",
      B: "O músculo esquelético é controlado principalmente pelo sistema somático.",
      C: "Existe atividade autonômica basal mesmo em repouso.",
      D: "O parassimpático regula diversos órgãos internos.",
    },

    tags: ["autonomo", "simpatico", "parassimpatico"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "sn-011",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Tudo ou nada",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "O princípio do 'tudo ou nada' aplicado ao potencial de ação significa que:",

    alternatives: [
      {
        id: "A",
        text: "Após o limiar ser atingido, o potencial de ação ocorre com amplitude característica daquela membrana, em vez de aumentar proporcionalmente à força do estímulo",
      },
      {
        id: "B",
        text: "Quanto maior o estímulo, maior obrigatoriamente será a amplitude de cada potencial de ação",
      },
      {
        id: "C",
        text: "Neurônios não conseguem codificar intensidade de estímulos",
      },
      {
        id: "D",
        text: "Todo estímulo, por menor que seja, produz obrigatoriamente um potencial de ação",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Depois que o limiar é alcançado, o potencial de ação é regenerativo e ocorre com amplitude característica. A intensidade de estímulos pode ser codificada por frequência de disparos e recrutamento de neurônios, entre outros mecanismos.",

    alternativeExplanations: {
      A: "Correto. Essa é a essência do princípio do tudo ou nada.",
      B: "A amplitude de cada potencial de ação não cresce proporcionalmente ao estímulo.",
      C: "A intensidade pode ser codificada por frequência e recrutamento.",
      D: "Estímulos abaixo do limiar podem não produzir potencial de ação.",
    },

    tags: ["tudo-ou-nada", "limiar", "potencial-de-acao"],
  },

  {
    id: "sn-012",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Condução nervosa",
    subtopic: "Condução saltatória",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Por que a mielinização aumenta a velocidade de condução de potenciais de ação em muitos axônios?",

    alternatives: [
      {
        id: "A",
        text: "Porque favorece a propagação saltatória entre regiões excitáveis associadas aos nódulos de Ranvier",
      },
      {
        id: "B",
        text: "Porque elimina completamente a necessidade de canais iônicos",
      },
      {
        id: "C",
        text: "Porque transforma o axônio em músculo",
      },
      {
        id: "D",
        text: "Porque aumenta diretamente a produção de neurotransmissores no corpo celular",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A mielina aumenta a resistência elétrica da membrana e reduz a perda de corrente ao longo do axônio, permitindo que a despolarização alcance rapidamente os nódulos de Ranvier, onde o potencial de ação é regenerado.",

    alternativeExplanations: {
      A: "Correto. Esse mecanismo é chamado de condução saltatória.",
      B: "Canais iônicos continuam fundamentais, especialmente nos nódulos.",
      C: "Mielinização não altera a identidade celular dessa forma.",
      D: "O principal efeito da mielina é sobre a condução elétrica do axônio.",
    },

    tags: ["mielina", "nodulos-de-ranvier", "conducao-saltatoria"],
  },

  {
    id: "sn-013",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Junção neuromuscular",
    subtopic: "Acetilcolina",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Na junção neuromuscular do músculo esquelético, qual sequência está mais correta?",

    alternatives: [
      {
        id: "A",
        text: "Potencial de ação no neurônio motor → entrada de Ca2+ no terminal → liberação de acetilcolina → ativação de receptores nicotínicos na fibra muscular",
      },
      {
        id: "B",
        text: "Liberação de acetilcolina → destruição do neurônio → entrada de DNA no músculo",
      },
      {
        id: "C",
        text: "Potencial de ação muscular → produção do neurônio motor → saída de Ca2+ para o sangue",
      },
      {
        id: "D",
        text: "Entrada de Na+ no neurônio → interrupção completa da comunicação → contração muscular",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A chegada do potencial de ação ao terminal motor abre canais de Ca2+. A entrada de Ca2+ promove liberação de acetilcolina, que se liga a receptores nicotínicos na placa motora e inicia a despolarização da fibra muscular.",

    alternativeExplanations: {
      A: "Correto. Essa é a sequência essencial da transmissão neuromuscular.",
      B: "A transmissão não envolve destruição do neurônio nem entrada de DNA.",
      C: "O neurônio motor já existe e inicia a transmissão antes do potencial muscular.",
      D: "A comunicação não é interrompida para produzir contração.",
    },

    tags: ["juncao-neuromuscular", "acetilcolina", "calcio"],
  },

  {
    id: "sn-014",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Reflexos",
    subtopic: "Reflexo de estiramento",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "No reflexo de estiramento, qual receptor sensorial tem papel central na detecção da alteração do comprimento muscular?",

    alternatives: [
      {
        id: "A",
        text: "Fuso muscular",
      },
      {
        id: "B",
        text: "Pneumócito tipo II",
      },
      {
        id: "C",
        text: "Barorreceptor carotídeo exclusivamente",
      },
      {
        id: "D",
        text: "Osteoclasto",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Os fusos musculares são receptores proprioceptivos especializados em detectar alterações no comprimento muscular e na velocidade de alongamento.",

    alternativeExplanations: {
      A: "Correto. O fuso muscular é fundamental no reflexo de estiramento.",
      B: "Pneumócitos tipo II produzem surfactante pulmonar.",
      C: "Barorreceptores participam principalmente da regulação cardiovascular.",
      D: "Osteoclastos participam da remodelação óssea.",
    },

    tags: ["fuso-muscular", "reflexo", "propriocepcao"],
  },

  {
    id: "sn-015",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Propriocepção",
    subtopic: "Fuso muscular e órgão tendinoso de Golgi",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual associação entre receptor e variável detectada está mais correta?",

    alternatives: [
      {
        id: "A",
        text: "Fuso muscular — comprimento e velocidade de alongamento; órgão tendinoso de Golgi — tensão",
      },
      {
        id: "B",
        text: "Fuso muscular — concentração de glicose; órgão tendinoso de Golgi — temperatura",
      },
      {
        id: "C",
        text: "Fuso muscular — pH sanguíneo; órgão tendinoso de Golgi — oxigenação pulmonar",
      },
      {
        id: "D",
        text: "Fuso muscular — pressão arterial; órgão tendinoso de Golgi — frequência cardíaca",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O fuso muscular informa principalmente sobre comprimento muscular e velocidade de alongamento. O órgão tendinoso de Golgi é sensível principalmente à tensão desenvolvida na unidade musculotendínea.",

    alternativeExplanations: {
      A: "Correto. Essa distinção é fundamental em neurofisiologia e Fisioterapia.",
      B: "Essas variáveis não correspondem às funções desses proprioceptores.",
      C: "Eles não são receptores primários de equilíbrio ácido-base ou oxigenação.",
      D: "Pressão arterial é detectada por outros tipos de receptores.",
    },

    tags: [
      "propriocepcao",
      "fuso-muscular",
      "orgao-tendinoso-de-golgi",
    ],
  },
];