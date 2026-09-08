import { Question } from "@/types/question";

export const biologiaCelularQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "bcel-001",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Núcleo",
    subtopic: "Função nuclear",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é uma das principais funções do núcleo de uma célula humana?",

    alternatives: [
      {
        id: "A",
        text: "Armazenar a maior parte do material genético da célula",
      },
      {
        id: "B",
        text: "Realizar diretamente as trocas gasosas pulmonares",
      },
      {
        id: "C",
        text: "Produzir surfactante pulmonar",
      },
      {
        id: "D",
        text: "Transportar oxigênio pelo sangue",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O núcleo contém a maior parte do DNA das células humanas e participa do controle da expressão gênica e das atividades celulares.",

    alternativeExplanations: {
      A: "Correto. O núcleo armazena a maior parte do DNA celular.",
      B: "Trocas gasosas ocorrem principalmente na membrana alveolocapilar.",
      C: "O surfactante é produzido principalmente por pneumócitos tipo II.",
      D: "O transporte de oxigênio no sangue depende principalmente da hemoglobina.",
    },

    tags: ["nucleo", "dna", "material-genetico"],
  },

  {
    id: "bcel-002",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Ribossomos",
    subtopic: "Síntese proteica",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é a principal função dos ribossomos?",

    alternatives: [
      {
        id: "A",
        text: "Síntese de proteínas",
      },
      {
        id: "B",
        text: "Produção direta de glicose",
      },
      {
        id: "C",
        text: "Armazenamento de oxigênio",
      },
      {
        id: "D",
        text: "Digestão extracelular de alimentos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Os ribossomos realizam a tradução do RNA mensageiro, sintetizando cadeias polipeptídicas que darão origem às proteínas.",

    alternativeExplanations: {
      A: "Correto. Ribossomos são fundamentais para a síntese proteica.",
      B: "Produção de glicose não é a função dos ribossomos.",
      C: "Ribossomos não são estruturas de armazenamento de oxigênio.",
      D: "Eles atuam na síntese de proteínas dentro da célula.",
    },

    tags: ["ribossomos", "proteinas", "sintese-proteica"],
  },

  {
    id: "bcel-003",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Mitocôndrias",
    subtopic: "Produção de ATP",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual organela possui papel central na produção aeróbia de ATP?",

    alternatives: [
      {
        id: "A",
        text: "Mitocôndria",
      },
      {
        id: "B",
        text: "Lisossomo",
      },
      {
        id: "C",
        text: "Nucléolo",
      },
      {
        id: "D",
        text: "Complexo de Golgi",
      },
    ],

    correctAnswer: "A",

    explanation:
      "As mitocôndrias realizam etapas fundamentais do metabolismo aeróbio e da fosforilação oxidativa, responsáveis por grande parte da produção celular de ATP.",

    alternativeExplanations: {
      A: "Correto. A mitocôndria é essencial para a produção aeróbia de ATP.",
      B: "Lisossomos atuam principalmente em degradação intracelular.",
      C: "O nucléolo está relacionado à formação de componentes ribossomais.",
      D: "O Golgi modifica e direciona proteínas e lipídios.",
    },

    tags: ["mitocondria", "atp", "energia"],
  },

  {
    id: "bcel-004",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Lisossomos",
    subtopic: "Digestão intracelular",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Os lisossomos estão especialmente relacionados a qual função?",

    alternatives: [
      {
        id: "A",
        text: "Degradação e reciclagem de materiais intracelulares",
      },
      {
        id: "B",
        text: "Condução de impulsos nervosos",
      },
      {
        id: "C",
        text: "Ventilação pulmonar",
      },
      {
        id: "D",
        text: "Produção de hemoglobina exclusivamente",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Lisossomos contêm enzimas hidrolíticas envolvidas na degradação e reciclagem de diversos componentes celulares.",

    alternativeExplanations: {
      A: "Correto. Essa é uma função fundamental dos lisossomos.",
      B: "Impulsos nervosos dependem principalmente da membrana de células excitáveis.",
      C: "Ventilação é um processo do sistema respiratório.",
      D: "Essa não é a função exclusiva ou principal dos lisossomos.",
    },

    tags: ["lisossomos", "degradacao", "reciclagem"],
  },

  {
    id: "bcel-005",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Complexo de Golgi",
    subtopic: "Processamento celular",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual função está corretamente associada ao complexo de Golgi?",

    alternatives: [
      {
        id: "A",
        text: "Modificar, classificar e direcionar proteínas e lipídios",
      },
      {
        id: "B",
        text: "Armazenar permanentemente todo o DNA celular",
      },
      {
        id: "C",
        text: "Produzir potenciais de ação",
      },
      {
        id: "D",
        text: "Realizar a contração do diafragma",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O complexo de Golgi recebe moléculas provenientes do sistema endomembranar e participa de sua modificação, classificação e direcionamento.",

    alternativeExplanations: {
      A: "Correto. O Golgi funciona como importante centro de processamento e distribuição celular.",
      B: "O DNA encontra-se principalmente no núcleo.",
      C: "Potenciais de ação dependem de membranas excitáveis e canais iônicos.",
      D: "Contração muscular depende da interação entre proteínas contráteis.",
    },

    tags: ["golgi", "proteinas", "processamento"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "bcel-006",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Retículo endoplasmático",
    subtopic: "RER",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Por que o retículo endoplasmático rugoso recebe esse nome?",

    alternatives: [
      {
        id: "A",
        text: "Porque possui ribossomos associados à sua superfície citosólica",
      },
      {
        id: "B",
        text: "Porque sua membrana é formada por tecido ósseo",
      },
      {
        id: "C",
        text: "Porque armazena cristais de cálcio visíveis",
      },
      {
        id: "D",
        text: "Porque é formado exclusivamente por DNA",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A aparência rugosa do RER resulta da presença de numerosos ribossomos associados à face citosólica de suas membranas.",

    alternativeExplanations: {
      A: "Correto. Os ribossomos conferem o aspecto rugoso.",
      B: "O RER é uma estrutura membranosa celular.",
      C: "Essa não é a razão do nome.",
      D: "O retículo não é formado por DNA.",
    },

    tags: ["rer", "reticulo-endoplasmatico", "ribossomos"],
  },

  {
    id: "bcel-007",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Retículo endoplasmático",
    subtopic: "REL",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual função pode estar associada ao retículo endoplasmático liso?",

    alternatives: [
      {
        id: "A",
        text: "Síntese de lipídios e participação na regulação intracelular de Ca2+ em determinados tecidos",
      },
      {
        id: "B",
        text: "Tradução de proteínas exclusivamente por ribossomos aderidos",
      },
      {
        id: "C",
        text: "Armazenamento de todo o DNA celular",
      },
      {
        id: "D",
        text: "Produção direta de potenciais de ação",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O REL participa de funções como síntese lipídica, detoxificação e regulação de Ca2+, dependendo do tipo celular.",

    alternativeExplanations: {
      A: "Correto. Essas são funções importantes do REL.",
      B: "Essa característica é mais associada ao RER.",
      C: "O DNA encontra-se principalmente no núcleo.",
      D: "Potenciais de ação dependem da membrana plasmática de células excitáveis.",
    },

    tags: ["rel", "lipidios", "calcio"],
  },

  {
    id: "bcel-008",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Retículo sarcoplasmático",
    subtopic: "Cálcio muscular",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "No músculo esquelético, qual função do retículo sarcoplasmático é especialmente importante para a contração?",

    alternatives: [
      {
        id: "A",
        text: "Armazenar e liberar Ca2+",
      },
      {
        id: "B",
        text: "Produzir hemoglobina",
      },
      {
        id: "C",
        text: "Transportar oxigênio através dos pulmões",
      },
      {
        id: "D",
        text: "Gerar diretamente impulsos no neurônio motor",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O retículo sarcoplasmático armazena Ca2+ e o libera durante a ativação da fibra muscular, permitindo a interação das proteínas contráteis.",

    alternativeExplanations: {
      A: "Correto. O Ca2+ é essencial para o processo contrátil.",
      B: "Hemoglobina é encontrada principalmente nas hemácias.",
      C: "O retículo sarcoplasmático é uma estrutura intracelular muscular.",
      D: "O neurônio motor produz seus próprios potenciais de ação.",
    },

    tags: ["reticulo-sarcoplasmatico", "calcio", "musculo"],
  },

  {
    id: "bcel-009",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Citoesqueleto",
    subtopic: "Funções",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual das funções abaixo está relacionada ao citoesqueleto?",

    alternatives: [
      {
        id: "A",
        text: "Manutenção da forma celular, transporte intracelular e participação no movimento",
      },
      {
        id: "B",
        text: "Produção exclusiva do pH sanguíneo",
      },
      {
        id: "C",
        text: "Ventilação alveolar",
      },
      {
        id: "D",
        text: "Produção exclusiva de neurotransmissores",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O citoesqueleto participa da sustentação, organização, transporte intracelular, divisão e movimentos celulares.",

    alternativeExplanations: {
      A: "Correto. O citoesqueleto desempenha várias funções estruturais e dinâmicas.",
      B: "pH depende de vários sistemas fisiológicos.",
      C: "Ventilação alveolar é uma função respiratória.",
      D: "Neurotransmissores possuem diferentes vias de síntese.",
    },

    tags: ["citoesqueleto", "microtubulos", "microfilamentos"],
  },

  {
    id: "bcel-010",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "ATP",
    subtopic: "Energia celular",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Por que o ATP é frequentemente chamado de 'moeda energética' da célula?",

    alternatives: [
      {
        id: "A",
        text: "Porque sua hidrólise pode fornecer energia para diversos processos celulares",
      },
      {
        id: "B",
        text: "Porque constitui todo o material genético humano",
      },
      {
        id: "C",
        text: "Porque substitui permanentemente o oxigênio",
      },
      {
        id: "D",
        text: "Porque impede qualquer reação química",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A energia associada às reações envolvendo ATP pode ser acoplada a processos como transporte ativo, síntese molecular e contração muscular.",

    alternativeExplanations: {
      A: "Correto. ATP participa do acoplamento energético celular.",
      B: "O DNA constitui o material genético.",
      C: "ATP e oxigênio desempenham papéis diferentes.",
      D: "ATP facilita energeticamente numerosos processos celulares.",
    },

    tags: ["atp", "energia", "metabolismo"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "bcel-011",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Síntese proteica",
    subtopic: "Ribossomos livres e RER",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual afirmação diferencia corretamente, de forma geral, proteínas sintetizadas em ribossomos livres e ribossomos associados ao RER?",

    alternatives: [
      {
        id: "A",
        text: "Ribossomos livres frequentemente produzem proteínas destinadas ao citosol, enquanto ribossomos associados ao RER produzem muitas proteínas secretadas ou destinadas a membranas e ao sistema endomembranar",
      },
      {
        id: "B",
        text: "Ribossomos livres produzem apenas DNA",
      },
      {
        id: "C",
        text: "Ribossomos do RER não realizam síntese proteica",
      },
      {
        id: "D",
        text: "Os dois tipos produzem exclusivamente proteínas mitocondriais",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A localização da tradução está relacionada ao destino da proteína. Proteínas contendo sinais apropriados podem ser direcionadas ao RER durante sua síntese.",

    alternativeExplanations: {
      A: "Correto. Essa é uma importante distinção funcional.",
      B: "Ribossomos sintetizam proteínas, não DNA.",
      C: "O RER é justamente um importante local de síntese proteica.",
      D: "Os destinos das proteínas são muito variados.",
    },

    tags: ["ribossomos", "rer", "proteinas"],
  },

  {
    id: "bcel-012",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Mitocôndria",
    subtopic: "Metabolismo aeróbio",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual relação melhor explica a importância do sistema respiratório para o metabolismo celular aeróbio?",

    alternatives: [
      {
        id: "A",
        text: "O oxigênio obtido pelos pulmões participa do metabolismo oxidativo que permite produção eficiente de ATP nas mitocôndrias",
      },
      {
        id: "B",
        text: "O oxigênio é convertido diretamente em DNA dentro dos alvéolos",
      },
      {
        id: "C",
        text: "Os pulmões produzem todas as moléculas de ATP do organismo",
      },
      {
        id: "D",
        text: "A mitocôndria funciona apenas quando não existe oxigênio",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O oxigênio atua como aceptor final de elétrons na cadeia respiratória mitocondrial, permitindo a manutenção da fosforilação oxidativa.",

    alternativeExplanations: {
      A: "Correto. Essa relação conecta fisiologia respiratória e metabolismo celular.",
      B: "Oxigênio não é convertido diretamente em DNA.",
      C: "ATP é produzido nas células, não nos pulmões para todo o organismo.",
      D: "A fosforilação oxidativa depende do oxigênio.",
    },

    tags: ["mitocondria", "oxigenio", "fosforilacao-oxidativa"],
  },

  {
    id: "bcel-013",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Peroxissomos",
    subtopic: "Metabolismo oxidativo",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual função está corretamente relacionada aos peroxissomos?",

    alternatives: [
      {
        id: "A",
        text: "Participação em determinadas reações oxidativas e metabolismo de alguns lipídios",
      },
      {
        id: "B",
        text: "Armazenamento de todos os cromossomos",
      },
      {
        id: "C",
        text: "Produção exclusiva de potenciais de ação",
      },
      {
        id: "D",
        text: "Formação direta dos alvéolos pulmonares",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Peroxissomos participam de diversas reações oxidativas, incluindo metabolismo de determinados ácidos graxos e controle de espécies como o peróxido de hidrogênio.",

    alternativeExplanations: {
      A: "Correto. Essa é uma função característica dos peroxissomos.",
      B: "Cromossomos encontram-se principalmente no núcleo.",
      C: "Potenciais de ação são fenômenos de membranas excitáveis.",
      D: "Peroxissomos são organelas intracelulares.",
    },

    tags: ["peroxissomos", "lipidios", "oxidacao"],
  },

  {
    id: "bcel-014",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Homeostase celular",
    subtopic: "ATP e gradientes",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual sequência representa melhor uma possível consequência de falência energética celular grave?",

    alternatives: [
      {
        id: "A",
        text: "ATP reduzido → funcionamento de bombas iônicas comprometido → gradientes iônicos alterados → perda da homeostase celular",
      },
      {
        id: "B",
        text: "ATP reduzido → bomba Na+/K+ acelera indefinidamente → homeostase melhora",
      },
      {
        id: "C",
        text: "ATP reduzido → membrana torna-se independente de gradientes",
      },
      {
        id: "D",
        text: "ATP reduzido → aumento obrigatório da síntese de todas as proteínas",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Bombas como a Na+/K+-ATPase dependem de ATP. Quando a energia diminui de forma grave, gradientes iônicos e volume celular podem ser progressivamente comprometidos.",

    alternativeExplanations: {
      A: "Correto. Essa cadeia é fisiologicamente coerente.",
      B: "A Na+/K+-ATPase necessita de ATP.",
      C: "Gradientes continuam fundamentais para as células.",
      D: "Déficit energético tende a comprometer síntese e manutenção celular.",
    },

    tags: ["atp", "homeostase", "gradientes-ionicos"],
  },

  {
    id: "bcel-015",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Integração celular",
    subtopic: "DNA RNA proteína",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "De maneira simplificada, qual sequência representa o fluxo de informação genética utilizado na expressão de muitos genes?",

    alternatives: [
      {
        id: "A",
        text: "DNA → RNA → proteína",
      },
      {
        id: "B",
        text: "Proteína → DNA → oxigênio",
      },
      {
        id: "C",
        text: "ATP → DNA → glicose",
      },
      {
        id: "D",
        text: "RNA → alvéolo → proteína",
      },
    ],

    correctAnswer: "A",

    explanation:
      "De forma simplificada, segmentos de DNA são transcritos em RNA e o RNA mensageiro pode ser traduzido em proteínas.",

    alternativeExplanations: {
      A: "Correto. É a representação simplificada do fluxo da informação genética.",
      B: "Essa sequência não representa a expressão gênica habitual.",
      C: "ATP não constitui o molde inicial da expressão gênica.",
      D: "Alvéolos não participam do fluxo molecular da informação genética.",
    },

    tags: ["dna", "rna", "proteina", "expressao-genica"],
  },
];