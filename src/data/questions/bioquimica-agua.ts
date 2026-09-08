import { Question } from "@/types/question";

export const bioquimicaAguaQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "agua-001",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Estrutura da água",
    subtopic: "Polaridade",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Por que a molécula de água é considerada polar?",

    alternatives: [
      {
        id: "A",
        text: "Porque apresenta distribuição desigual de cargas parciais devido à maior eletronegatividade do oxigênio",
      },
      {
        id: "B",
        text: "Porque possui carga elétrica total de +10",
      },
      {
        id: "C",
        text: "Porque é formada exclusivamente por íons",
      },
      {
        id: "D",
        text: "Porque seus elétrons são igualmente distribuídos entre todos os átomos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O oxigênio atrai os elétrons compartilhados com maior intensidade que o hidrogênio, gerando regiões parcialmente negativas e parcialmente positivas.",

    alternativeExplanations: {
      A: "Correto. Essa distribuição desigual torna a molécula polar.",
      B: "A molécula de água é eletricamente neutra como um todo.",
      C: "Ela é uma molécula covalente polar.",
      D: "A distribuição eletrônica é justamente desigual.",
    },

    tags: ["agua", "polaridade", "eletronegatividade"],
  },

  {
    id: "agua-002",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Interações moleculares",
    subtopic: "Ligações de hidrogênio",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "As ligações de hidrogênio entre moléculas de água contribuem para:",

    alternatives: [
      {
        id: "A",
        text: "Diversas propriedades físicas da água, como coesão e comportamento térmico",
      },
      {
        id: "B",
        text: "Destruir instantaneamente todas as proteínas",
      },
      {
        id: "C",
        text: "Eliminar a polaridade da molécula",
      },
      {
        id: "D",
        text: "Impedir completamente a dissolução de íons",
      },
    ],

    correctAnswer: "A",

    explanation:
      "As ligações de hidrogênio entre moléculas de água contribuem para sua coesão, elevado calor específico e várias outras propriedades importantes.",

    alternativeExplanations: {
      A: "Correto. Muitas propriedades da água dependem dessas interações.",
      B: "Água é essencial para o funcionamento de proteínas.",
      C: "As ligações de hidrogênio resultam da polaridade.",
      D: "A água é excelente solvente para muitos compostos iônicos.",
    },

    tags: ["ligacao-de-hidrogenio", "agua", "coesao"],
  },

  {
    id: "agua-003",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Solubilidade",
    subtopic: "Hidrofílico",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Uma substância hidrofílica apresenta, em geral:",

    alternatives: [
      {
        id: "A",
        text: "Afinidade favorável pela interação com água",
      },
      {
        id: "B",
        text: "Repulsão absoluta por qualquer molécula polar",
      },
      {
        id: "C",
        text: "Obrigatoriamente ausência de cargas ou grupos polares",
      },
      {
        id: "D",
        text: "Incapacidade total de existir em soluções aquosas",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Substâncias hidrofílicas possuem grupos polares ou carregados capazes de estabelecer interações favoráveis com a água.",

    alternativeExplanations: {
      A: "Correto. Hidrofílico significa afinidade pela água.",
      B: "Isso contradiz o conceito.",
      C: "Grupos polares frequentemente aumentam a hidrofilicidade.",
      D: "Muitas substâncias hidrofílicas dissolvem-se bem em água.",
    },

    tags: ["hidrofilico", "solubilidade", "agua"],
  },

  {
    id: "agua-004",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "pH",
    subtopic: "Definição",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual expressão representa corretamente a definição de pH?",

    alternatives: [
      {
        id: "A",
        text: "pH = -log[H+]",
      },
      {
        id: "B",
        text: "pH = H+ × ATP",
      },
      {
        id: "C",
        text: "pH = Na+ + K+",
      },
      {
        id: "D",
        text: "pH = pressão arterial ÷ frequência cardíaca",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O pH corresponde ao logaritmo negativo da atividade/concentração efetiva de íons hidrogênio, sendo geralmente apresentado de forma simplificada como pH = -log[H+].",

    alternativeExplanations: {
      A: "Correto.",
      B: "ATP não faz parte da definição matemática de pH.",
      C: "Sódio e potássio não definem diretamente o pH.",
      D: "pH não é calculado a partir dessas variáveis cardiovasculares.",
    },

    tags: ["ph", "hidrogenio", "logaritmo"],
  },

  {
    id: "agua-005",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Ácido-base",
    subtopic: "Concentração de H+",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quando a concentração de H+ aumenta, mantidas as demais condições, o pH tende a:",

    alternatives: [
      {
        id: "A",
        text: "Diminuir",
      },
      {
        id: "B",
        text: "Aumentar",
      },
      {
        id: "C",
        text: "Permanecer sempre exatamente em 7",
      },
      {
        id: "D",
        text: "Tornar-se independente da concentração de H+",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Como o pH é definido pelo logaritmo negativo de H+, maior concentração de H+ corresponde a menor pH.",

    alternativeExplanations: {
      A: "Correto. H+ aumentado significa maior acidez e menor pH.",
      B: "O comportamento é o oposto.",
      C: "O pH pode variar.",
      D: "H+ é a variável central da definição de pH.",
    },

    tags: ["ph", "acidez", "hidrogenio"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "agua-006",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "pH",
    subtopic: "Escala logarítmica",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Comparando duas soluções com pH 7 e pH 6, a solução de pH 6 possui aproximadamente:",

    alternatives: [
      {
        id: "A",
        text: "10 vezes maior concentração de H+",
      },
      {
        id: "B",
        text: "2 vezes maior concentração de H+",
      },
      {
        id: "C",
        text: "100 vezes menor concentração de H+",
      },
      {
        id: "D",
        text: "A mesma concentração de H+",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Como a escala de pH é logarítmica em base 10, uma diferença de uma unidade corresponde aproximadamente a uma diferença de dez vezes na concentração de H+.",

    alternativeExplanations: {
      A: "Correto. pH 6 possui cerca de dez vezes mais H+ que pH 7.",
      B: "A escala não é linear.",
      C: "O sentido e a magnitude estão incorretos.",
      D: "Uma unidade de diferença representa mudança de dez vezes.",
    },

    tags: ["ph", "logaritmo", "concentracao"],
  },

  {
    id: "agua-007",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Tampões",
    subtopic: "Função",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é a principal função de um sistema tampão?",

    alternatives: [
      {
        id: "A",
        text: "Reduzir variações excessivas do pH diante da adição de ácidos ou bases",
      },
      {
        id: "B",
        text: "Fixar permanentemente o pH em exatamente 7",
      },
      {
        id: "C",
        text: "Eliminar completamente todos os íons H+",
      },
      {
        id: "D",
        text: "Impedir qualquer reação química no organismo",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Tampões absorvem ou liberam H+ de maneira reversível, reduzindo alterações bruscas do pH.",

    alternativeExplanations: {
      A: "Correto. Tampões diminuem a magnitude das mudanças de pH.",
      B: "O pH sanguíneo normal, por exemplo, não é exatamente 7.",
      C: "H+ não é totalmente eliminado.",
      D: "Reações químicas continuam ocorrendo normalmente.",
    },

    tags: ["tampao", "ph", "acido-base"],
  },

  {
    id: "agua-008",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Equilíbrio ácido-base",
    subtopic: "Sistema bicarbonato",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual reação representa de forma simplificada o sistema bicarbonato relacionado ao equilíbrio ácido-base?",

    alternatives: [
      {
        id: "A",
        text: "CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3-",
      },
      {
        id: "B",
        text: "O2 + Na+ ⇌ ATP",
      },
      {
        id: "C",
        text: "K+ + DNA ⇌ proteína",
      },
      {
        id: "D",
        text: "Ca2+ + glicose ⇌ oxigênio",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O sistema CO2/bicarbonato é fundamental para o controle fisiológico do equilíbrio ácido-base.",

    alternativeExplanations: {
      A: "Correto. Essa reação conecta CO2, H+, bicarbonato e pH.",
      B: "Essa não representa um sistema tampão fisiológico.",
      C: "Essa reação não descreve o sistema bicarbonato.",
      D: "Essa reação não representa o equilíbrio ácido-base.",
    },

    tags: ["bicarbonato", "co2", "ph", "tampao"],
  },

  {
    id: "agua-009",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Tonicidade",
    subtopic: "Meio hipertônico",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "O que tende a acontecer com uma célula colocada em meio efetivamente hipertônico?",

    alternatives: [
      {
        id: "A",
        text: "Ela perde água e tende a diminuir de volume",
      },
      {
        id: "B",
        text: "Ela ganha grande quantidade de água e necessariamente rompe",
      },
      {
        id: "C",
        text: "Nenhuma água pode atravessar a membrana",
      },
      {
        id: "D",
        text: "A célula imediatamente duplica seu DNA",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Em meio hipertônico, a água tende a sair da célula, provocando redução do volume celular.",

    alternativeExplanations: {
      A: "Correto. O fluxo líquido de água ocorre para fora.",
      B: "Entrada de água é característica de meio hipotônico.",
      C: "A água atravessa a membrana por osmose.",
      D: "Tonicidade não desencadeia automaticamente replicação do DNA.",
    },

    tags: ["hipertonico", "tonicidade", "osmose"],
  },

  {
    id: "agua-010",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Tonicidade",
    subtopic: "Meio hipotônico",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Uma célula colocada em meio efetivamente hipotônico tende a:",

    alternatives: [
      {
        id: "A",
        text: "Ganhar água e aumentar de volume",
      },
      {
        id: "B",
        text: "Perder água e diminuir de volume",
      },
      {
        id: "C",
        text: "Tornar-se impermeável à água imediatamente",
      },
      {
        id: "D",
        text: "Eliminar todo o seu citoplasma",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Em meio hipotônico, a água tende a entrar na célula por osmose, podendo aumentar seu volume.",

    alternativeExplanations: {
      A: "Correto. A entrada de água aumenta o volume celular.",
      B: "Isso ocorre em meio hipertônico.",
      C: "A membrana não se torna automaticamente impermeável.",
      D: "Essa não é uma consequência fisiológica normal da hipotonicidade.",
    },

    tags: ["hipotonico", "osmose", "tonicidade"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "agua-011",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Osmolaridade",
    subtopic: "Partículas osmoticamente ativas",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Por que a dissociação de um soluto pode aumentar sua contribuição para a osmolaridade da solução?",

    alternatives: [
      {
        id: "A",
        text: "Porque uma unidade do soluto pode originar mais de uma partícula em solução",
      },
      {
        id: "B",
        text: "Porque a dissociação elimina todas as partículas",
      },
      {
        id: "C",
        text: "Porque osmolaridade depende apenas da massa molecular",
      },
      {
        id: "D",
        text: "Porque íons não exercem efeitos osmóticos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A osmolaridade depende do número de partículas osmoticamente ativas. Um composto que se dissocia pode produzir múltiplas partículas por unidade dissolvida.",

    alternativeExplanations: {
      A: "Correto. O número de partículas é fundamental.",
      B: "A dissociação aumenta, e não elimina, partículas.",
      C: "O número de partículas é o fator principal.",
      D: "Íons podem contribuir fortemente para a osmolaridade.",
    },

    tags: ["osmolaridade", "solutos", "dissociacao"],
  },

  {
    id: "agua-012",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Osmolaridade e tonicidade",
    subtopic: "Diferença conceitual",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual afirmação diferencia corretamente osmolaridade e tonicidade?",

    alternatives: [
      {
        id: "A",
        text: "Osmolaridade considera a concentração total de partículas, enquanto tonicidade descreve o efeito de solutos efetivos sobre o volume celular",
      },
      {
        id: "B",
        text: "Os dois termos possuem exatamente o mesmo significado em qualquer situação",
      },
      {
        id: "C",
        text: "Tonicidade mede exclusivamente a quantidade de proteínas no núcleo",
      },
      {
        id: "D",
        text: "Osmolaridade mede exclusivamente o pH",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Osmolaridade descreve a concentração de partículas osmoticamente ativas. Tonicidade está relacionada ao efeito da solução sobre o volume celular, considerando principalmente solutos efetivamente não penetrantes.",

    alternativeExplanations: {
      A: "Correto. Essa é uma distinção fundamental.",
      B: "Eles podem estar relacionados, mas não são sinônimos perfeitos.",
      C: "Tonicidade não mede proteínas nucleares.",
      D: "Osmolaridade e pH são grandezas diferentes.",
    },

    tags: ["osmolaridade", "tonicidade", "osmose"],
  },

  {
    id: "agua-013",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Equilíbrio ácido-base",
    subtopic: "Hipoventilação",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Um paciente apresenta hipoventilação alveolar importante. Considerando inicialmente o sistema CO2/bicarbonato, qual sequência é mais esperada?",

    alternatives: [
      {
        id: "A",
        text: "CO2 aumenta → H+ tende a aumentar → pH tende a diminuir",
      },
      {
        id: "B",
        text: "CO2 aumenta → H+ diminui obrigatoriamente → pH aumenta",
      },
      {
        id: "C",
        text: "CO2 diminui → H+ aumenta → pH diminui",
      },
      {
        id: "D",
        text: "CO2 não possui relação com equilíbrio ácido-base",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A retenção de CO2 favorece a formação de ácido carbônico e H+, diminuindo o pH e podendo produzir acidose respiratória.",

    alternativeExplanations: {
      A: "Correto. Essa é a relação fisiológica esperada.",
      B: "O aumento de CO2 tende a aumentar H+, não diminuí-lo.",
      C: "Hipoventilação tende a aumentar CO2.",
      D: "CO2 possui papel central no equilíbrio ácido-base.",
    },

    tags: ["hipoventilacao", "co2", "ph", "acidose"],
  },

  {
    id: "agua-014",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Equilíbrio ácido-base",
    subtopic: "Hiperventilação",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma pessoa hiperventila de forma intensa e elimina CO2 em excesso. Qual alteração tende a ocorrer inicialmente?",

    alternatives: [
      {
        id: "A",
        text: "Redução de CO2 e tendência de aumento do pH",
      },
      {
        id: "B",
        text: "Aumento de CO2 e redução do pH",
      },
      {
        id: "C",
        text: "Aumento obrigatório de H+ e acidose respiratória",
      },
      {
        id: "D",
        text: "Nenhuma alteração relacionada ao pH",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A eliminação excessiva de CO2 reduz a PaCO2 e a disponibilidade de H+, levando inicialmente a aumento do pH, característico da alcalose respiratória.",

    alternativeExplanations: {
      A: "Correto. Hiperventilação pode produzir alcalose respiratória.",
      B: "Hiperventilação diminui, e não aumenta, CO2.",
      C: "A tendência inicial é redução de H+.",
      D: "CO2 e pH estão diretamente conectados pelo sistema bicarbonato.",
    },

    tags: ["hiperventilacao", "co2", "alcalose-respiratoria"],
  },

  {
    id: "agua-015",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Integração fisiológica",
    subtopic: "Pulmões e rins",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual alternativa descreve melhor a participação dos pulmões e rins no controle ácido-base?",

    alternatives: [
      {
        id: "A",
        text: "Os pulmões regulam rapidamente a eliminação de CO2, enquanto os rins participam da regulação de H+ e bicarbonato em uma escala geralmente mais lenta",
      },
      {
        id: "B",
        text: "Somente os pulmões participam do equilíbrio ácido-base",
      },
      {
        id: "C",
        text: "Somente os rins participam do equilíbrio ácido-base",
      },
      {
        id: "D",
        text: "Pulmões e rins não influenciam o pH corporal",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Os pulmões podem alterar rapidamente a PaCO2 através da ventilação. Os rins regulam a excreção de H+ e o manejo de bicarbonato em processos geralmente mais lentos.",

    alternativeExplanations: {
      A: "Correto. Os dois sistemas trabalham de forma integrada.",
      B: "Os rins são fundamentais para o controle ácido-base.",
      C: "Os pulmões também são fundamentais devido ao controle de CO2.",
      D: "Ambos exercem importante influência sobre o pH.",
    },

    tags: ["pulmoes", "rins", "ph", "bicarbonato"],
  },
];