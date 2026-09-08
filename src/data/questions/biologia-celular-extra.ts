import type { Question } from "@/types/question";

export const biologiaCelularExtraQuestions: Question[] = [
  {
    id: "bcel-016",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Membrana plasmática",
    subtopic: "Mosaico fluido",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "O modelo do mosaico fluido descreve a membrana plasmática como:",
    alternatives: [
      {
        id: "A",
        text: "Uma bicamada lipídica dinâmica associada a diferentes proteínas.",
      },
      {
        id: "B",
        text: "Uma parede rígida formada exclusivamente por DNA.",
      },
      {
        id: "C",
        text: "Uma estrutura composta somente por proteínas.",
      },
      {
        id: "D",
        text: "Uma camada imóvel formada apenas por carboidratos.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A membrana possui uma bicamada lipídica com proteínas inseridas ou associadas e apresenta considerável dinamismo estrutural.",
    alternativeExplanations: {
      A: "Correto. Lipídios e proteínas constituem o mosaico fluido.",
      B: "Incorreto. DNA não forma a estrutura básica da membrana.",
      C: "Incorreto. Lipídios são componentes essenciais.",
      D: "Incorreto. Carboidratos existem na membrana, mas não formam sozinhos sua estrutura.",
    },
    tags: [
      "mosaico-fluido",
      "membrana",
      "fosfolipidios",
    ],
  },

  {
    id: "bcel-017",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Núcleo",
    subtopic: "Nucléolo",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual função está fortemente associada ao nucléolo?",
    alternatives: [
      {
        id: "A",
        text: "Produção e processamento de RNA ribossômico e montagem inicial de subunidades ribossômicas.",
      },
      {
        id: "B",
        text: "Produção direta de surfactante pulmonar.",
      },
      {
        id: "C",
        text: "Armazenamento de glicose no plasma.",
      },
      {
        id: "D",
        text: "Filtração do sangue.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O nucléolo é uma região nuclear especializada na produção de rRNA e montagem inicial das subunidades dos ribossomos.",
    alternativeExplanations: {
      A: "Correto. Essa é uma importante função nucleolar.",
      B: "Incorreto. Surfactante é produzido por células pulmonares especializadas.",
      C: "Incorreto. Glicose não é armazenada pelo nucléolo.",
      D: "Incorreto. Filtração sanguínea não é função nuclear.",
    },
    tags: [
      "nucleolo",
      "rrna",
      "ribossomo",
    ],
  },

  {
    id: "bcel-018",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Mitocôndria",
    subtopic: "Membrana interna",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Em qual região mitocondrial estão localizados componentes importantes da cadeia transportadora de elétrons?",
    alternatives: [
      {
        id: "A",
        text: "Membrana mitocondrial interna.",
      },
      {
        id: "B",
        text: "Nucleoplasma.",
      },
      {
        id: "C",
        text: "Interior dos lisossomos.",
      },
      {
        id: "D",
        text: "Membrana nuclear externa exclusivamente.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A membrana interna da mitocôndria contém complexos da cadeia respiratória e ATP sintase.",
    alternativeExplanations: {
      A: "Correto. A fosforilação oxidativa está intimamente associada à membrana interna.",
      B: "Incorreto. Nucleoplasma pertence ao núcleo.",
      C: "Incorreto. Lisossomos possuem funções de degradação intracelular.",
      D: "Incorreto. A cadeia respiratória não está localizada na membrana nuclear.",
    },
    tags: [
      "mitocondria",
      "cadeia-respiratoria",
      "atp",
    ],
  },

  {
    id: "bcel-019",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Retículo endoplasmático",
    subtopic: "Retículo liso",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual função está especialmente associada ao retículo endoplasmático liso?",
    alternatives: [
      {
        id: "A",
        text: "Síntese de diversos lipídios e participação em processos de detoxificação.",
      },
      {
        id: "B",
        text: "Tradução de todas as proteínas nucleares exclusivamente.",
      },
      {
        id: "C",
        text: "Formação dos cromossomos durante a mitose.",
      },
      {
        id: "D",
        text: "Produção direta de DNA mitocondrial.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O retículo endoplasmático liso participa da síntese de lipídios, metabolismo de substâncias e, em células especializadas, armazenamento de Ca²+.",
    alternativeExplanations: {
      A: "Correto. São funções clássicas do REL.",
      B: "Incorreto. O REL não possui ribossomos aderidos como característica principal.",
      C: "Incorreto. Cromossomos resultam da organização da cromatina nuclear.",
      D: "Incorreto. DNA mitocondrial é replicado na própria mitocôndria.",
    },
    tags: [
      "reticulo-liso",
      "lipidios",
      "detoxificacao",
    ],
  },

  {
    id: "bcel-020",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Peroxissomos",
    subtopic: "Oxidação",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual característica está relacionada aos peroxissomos?",
    alternatives: [
      {
        id: "A",
        text: "Participação em reações oxidativas e metabolismo do peróxido de hidrogênio.",
      },
      {
        id: "B",
        text: "Armazenamento exclusivo do DNA nuclear.",
      },
      {
        id: "C",
        text: "Produção de potenciais de ação neuronais.",
      },
      {
        id: "D",
        text: "Síntese exclusiva de RNA ribossômico.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Peroxissomos contêm enzimas oxidativas e catalase, participando do metabolismo de determinados lipídios e do H₂O₂.",
    alternativeExplanations: {
      A: "Correto. Catalase ajuda a metabolizar peróxido de hidrogênio.",
      B: "Incorreto. DNA nuclear encontra-se no núcleo.",
      C: "Incorreto. Potenciais de ação são fenômenos de células excitáveis.",
      D: "Incorreto. rRNA está fortemente relacionado ao nucléolo.",
    },
    tags: [
      "peroxissomo",
      "catalase",
      "peroxido",
    ],
  },

  {
    id: "bcel-021",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Citoesqueleto",
    subtopic: "Microfilamentos",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Os microfilamentos celulares são formados principalmente por:",
    alternatives: [
      {
        id: "A",
        text: "Actina.",
      },
      {
        id: "B",
        text: "DNA.",
      },
      {
        id: "C",
        text: "Colesterol.",
      },
      {
        id: "D",
        text: "Hemoglobina.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Microfilamentos são polímeros de actina e participam de processos como movimento celular, contração e citocinese.",
    alternativeExplanations: {
      A: "Correto. Actina é o principal componente dos microfilamentos.",
      B: "Incorreto. DNA é um ácido nucleico.",
      C: "Incorreto. Colesterol é um lipídio importante de membranas animais.",
      D: "Incorreto. Hemoglobina é uma proteína transportadora de gases.",
    },
    tags: [
      "actina",
      "microfilamentos",
      "citoesqueleto",
    ],
  },

  {
    id: "bcel-022",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Junções celulares",
    subtopic: "Junções comunicantes",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "As junções comunicantes, ou gap junctions, permitem principalmente:",
    alternatives: [
      {
        id: "A",
        text: "Passagem direta de pequenos íons e moléculas entre células adjacentes.",
      },
      {
        id: "B",
        text: "Duplicação do DNA entre duas células.",
      },
      {
        id: "C",
        text: "Fusão permanente dos núcleos celulares.",
      },
      {
        id: "D",
        text: "Produção extracelular de ATP.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Gap junctions formam canais intercelulares constituídos por conexons, possibilitando comunicação elétrica e metabólica entre células próximas.",
    alternativeExplanations: {
      A: "Correto. Pequenas moléculas e íons podem atravessar esses canais.",
      B: "Incorreto. Replicação de DNA ocorre dentro das células.",
      C: "Incorreto. Junções comunicantes não fundem os núcleos.",
      D: "Incorreto. Sua principal função é comunicação intercelular.",
    },
    tags: [
      "gap-junction",
      "juncoes",
      "comunicacao-celular",
    ],
  },

  {
    id: "bcel-023",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Ciclo celular",
    subtopic: "Fase S",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual evento caracteriza principalmente a fase S do ciclo celular?",
    alternatives: [
      {
        id: "A",
        text: "Replicação do DNA.",
      },
      {
        id: "B",
        text: "Separação final das células-filhas.",
      },
      {
        id: "C",
        text: "Destruição de todas as organelas.",
      },
      {
        id: "D",
        text: "Interrupção permanente da síntese de proteínas.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Durante a fase S da intérfase ocorre a replicação do DNA, preparando o material genético para a divisão celular.",
    alternativeExplanations: {
      A: "Correto. S refere-se à síntese de DNA.",
      B: "Incorreto. Separação citoplasmática ocorre durante a citocinese.",
      C: "Incorreto. As organelas não são destruídas de maneira geral nessa fase.",
      D: "Incorreto. A síntese proteica continua durante grande parte do ciclo.",
    },
    tags: [
      "fase-s",
      "dna",
      "ciclo-celular",
    ],
  },

  {
    id: "bcel-024",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Apoptose",
    subtopic: "Caspases",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual grupo de enzimas possui papel central em muitas vias de apoptose?",
    alternatives: [
      {
        id: "A",
        text: "Caspases.",
      },
      {
        id: "B",
        text: "Hemoglobinas.",
      },
      {
        id: "C",
        text: "Aquaporinas exclusivamente.",
      },
      {
        id: "D",
        text: "Colágenos.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Caspases são proteases que, quando ativadas em cascata, promovem a clivagem controlada de proteínas celulares durante a apoptose.",
    alternativeExplanations: {
      A: "Correto. Caspases são executoras importantes da morte celular programada.",
      B: "Incorreto. Hemoglobina transporta gases.",
      C: "Incorreto. Aquaporinas são canais de água.",
      D: "Incorreto. Colágeno é uma proteína estrutural da matriz extracelular.",
    },
    tags: [
      "caspases",
      "apoptose",
      "morte-celular",
    ],
  },

  {
    id: "bcel-025",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Tráfego vesicular",
    subtopic: "Endereçamento proteico",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Como uma célula consegue direcionar diferentes proteínas para compartimentos intracelulares específicos?",
    alternatives: [
      {
        id: "A",
        text: "Por meio de sequências-sinal e mecanismos específicos de reconhecimento e transporte.",
      },
      {
        id: "B",
        text: "Todas as proteínas são distribuídas aleatoriamente.",
      },
      {
        id: "C",
        text: "Somente pelo tamanho da célula.",
      },
      {
        id: "D",
        text: "Pela pressão atmosférica externa.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Proteínas podem possuir sinais moleculares reconhecidos por sistemas celulares que determinam destinos como núcleo, mitocôndria, retículo endoplasmático e outras regiões.",
    alternativeExplanations: {
      A: "Correto. Sinais de endereçamento permitem organização intracelular.",
      B: "Incorreto. O tráfego proteico é altamente regulado.",
      C: "Incorreto. O tamanho celular não define sozinho o destino proteico.",
      D: "Incorreto. Pressão atmosférica não direciona proteínas celulares.",
    },
    tags: [
      "enderecamento",
      "proteinas",
      "trafego-vesicular",
    ],
  },
];