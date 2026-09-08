import { Question } from "@/types/question";

export const fisiologiaCelularQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "fcel-001",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Membrana plasmática",
    subtopic: "Estrutura",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual estrutura constitui a base da membrana plasmática das células humanas?",

    alternatives: [
      {
        id: "A",
        text: "Bicamada de fosfolipídios associada a proteínas",
      },
      {
        id: "B",
        text: "Camada única formada exclusivamente por carboidratos",
      },
      {
        id: "C",
        text: "Parede rígida composta principalmente por celulose",
      },
      {
        id: "D",
        text: "Dupla camada formada exclusivamente por DNA",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A membrana plasmática é formada principalmente por uma bicamada de fosfolipídios, com proteínas, colesterol e carboidratos associados.",

    alternativeExplanations: {
      A: "Correto. A bicamada fosfolipídica constitui a estrutura básica da membrana.",
      B: "Carboidratos participam da membrana, mas não formam sua estrutura principal.",
      C: "Células animais não possuem parede celular de celulose.",
      D: "DNA não constitui a estrutura da membrana plasmática.",
    },

    tags: ["membrana", "fosfolipidios", "bicamada"],
  },

  {
    id: "fcel-002",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Membrana plasmática",
    subtopic: "Fosfolipídios",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Como são organizadas as regiões dos fosfolipídios na membrana plasmática?",

    alternatives: [
      {
        id: "A",
        text: "As cabeças hidrofóbicas ficam voltadas para a água",
      },
      {
        id: "B",
        text: "As cabeças hidrofílicas ficam voltadas para os meios aquosos e as caudas hidrofóbicas ficam voltadas para o interior da bicamada",
      },
      {
        id: "C",
        text: "As caudas hidrofóbicas ficam voltadas diretamente para o citoplasma e para o líquido extracelular",
      },
      {
        id: "D",
        text: "Não existe organização definida",
      },
    ],

    correctAnswer: "B",

    explanation:
      "As cabeças polares e hidrofílicas interagem com a água, enquanto as caudas apolares e hidrofóbicas permanecem voltadas umas para as outras no interior da bicamada.",

    alternativeExplanations: {
      A: "As cabeças são hidrofílicas, não hidrofóbicas.",
      B: "Correto. Essa organização é fundamental para a formação espontânea da bicamada.",
      C: "As caudas evitam contato direto com os meios aquosos.",
      D: "A orientação dos fosfolipídios é altamente organizada.",
    },

    tags: ["fosfolipidios", "hidrofilico", "hidrofobico"],
  },

  {
    id: "fcel-003",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte celular",
    subtopic: "Difusão simples",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Na difusão simples, uma substância apresenta movimento líquido predominantemente:",

    alternatives: [
      {
        id: "A",
        text: "Da menor para a maior concentração, com gasto obrigatório de ATP",
      },
      {
        id: "B",
        text: "Da maior para a menor concentração, sem gasto direto de ATP",
      },
      {
        id: "C",
        text: "Contra o gradiente, utilizando exclusivamente bombas",
      },
      {
        id: "D",
        text: "Independentemente de qualquer gradiente",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Na difusão simples, as partículas apresentam movimento líquido a favor do gradiente de concentração, sem consumo direto de ATP.",

    alternativeExplanations: {
      A: "Mover-se contra o gradiente exige outro tipo de mecanismo.",
      B: "Correto. A difusão simples é um processo passivo.",
      C: "Bombas estão associadas ao transporte ativo.",
      D: "O gradiente é justamente o responsável pelo fluxo líquido.",
    },

    tags: ["difusao", "transporte-passivo", "gradiente"],
  },

  {
    id: "fcel-004",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte celular",
    subtopic: "Osmose",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "O termo osmose refere-se principalmente ao movimento de:",

    alternatives: [
      {
        id: "A",
        text: "Proteínas através de ribossomos",
      },
      {
        id: "B",
        text: "Água através de uma membrana seletivamente permeável",
      },
      {
        id: "C",
        text: "ATP entre duas mitocôndrias",
      },
      {
        id: "D",
        text: "DNA através da membrana celular",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Osmose descreve o movimento de água através de uma membrana seletivamente permeável em resposta a diferenças osmóticas entre compartimentos.",

    alternativeExplanations: {
      A: "Ribossomos realizam síntese proteica.",
      B: "Correto. Osmose está relacionada ao movimento de água.",
      C: "Esse processo não define osmose.",
      D: "DNA não participa do conceito de osmose.",
    },

    tags: ["osmose", "agua", "membrana"],
  },

  {
    id: "fcel-005",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte celular",
    subtopic: "Transporte ativo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual característica diferencia principalmente o transporte ativo do transporte passivo?",

    alternatives: [
      {
        id: "A",
        text: "O transporte ativo pode movimentar substâncias contra seus gradientes eletroquímicos utilizando energia",
      },
      {
        id: "B",
        text: "O transporte ativo ocorre apenas com água",
      },
      {
        id: "C",
        text: "O transporte ativo nunca envolve proteínas de membrana",
      },
      {
        id: "D",
        text: "O transporte ativo ocorre apenas fora das células",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O transporte ativo utiliza energia direta ou indiretamente para movimentar substâncias contra seus gradientes eletroquímicos.",

    alternativeExplanations: {
      A: "Correto. Essa é uma característica central do transporte ativo.",
      B: "Água é transportada principalmente por osmose.",
      C: "Proteínas transportadoras são essenciais para o transporte ativo.",
      D: "O transporte ativo ocorre através das membranas celulares.",
    },

    tags: ["transporte-ativo", "energia", "gradiente"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "fcel-006",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte celular",
    subtopic: "Difusão facilitada",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual alternativa descreve corretamente a difusão facilitada?",

    alternatives: [
      {
        id: "A",
        text: "Utiliza proteínas de membrana e ocorre a favor do gradiente eletroquímico, sem gasto direto de ATP",
      },
      {
        id: "B",
        text: "Move obrigatoriamente solutos contra seus gradientes utilizando ATP",
      },
      {
        id: "C",
        text: "É exclusiva para moléculas de água",
      },
      {
        id: "D",
        text: "Não depende de proteínas de membrana",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Na difusão facilitada, canais ou transportadores permitem a passagem de substâncias a favor de seu gradiente sem utilizar ATP diretamente.",

    alternativeExplanations: {
      A: "Correto. É um transporte passivo mediado por proteínas.",
      B: "Essa descrição corresponde ao transporte ativo.",
      C: "Diversas substâncias podem utilizar difusão facilitada.",
      D: "Sua principal diferença em relação à difusão simples é justamente a participação de proteínas.",
    },

    tags: ["difusao-facilitada", "canais", "transportadores"],
  },

  {
    id: "fcel-007",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Gradientes iônicos",
    subtopic: "Bomba de sódio e potássio",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "A cada ciclo da Na+/K+-ATPase, qual movimentação ocorre tipicamente?",

    alternatives: [
      {
        id: "A",
        text: "3 Na+ entram e 2 K+ saem",
      },
      {
        id: "B",
        text: "2 Na+ saem e 3 K+ entram",
      },
      {
        id: "C",
        text: "3 Na+ saem e 2 K+ entram",
      },
      {
        id: "D",
        text: "3 Na+ e 3 K+ entram simultaneamente",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A Na+/K+-ATPase utiliza ATP para transportar três íons Na+ para fora da célula e dois íons K+ para dentro.",

    alternativeExplanations: {
      A: "O sentido está invertido.",
      B: "As quantidades estão invertidas.",
      C: "Correto. São 3 Na+ para fora e 2 K+ para dentro.",
      D: "A bomba transporta os íons em sentidos opostos.",
    },

    tags: ["sodio", "potassio", "atpase", "bomba-na-k"],
  },

  {
    id: "fcel-008",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Gradientes iônicos",
    subtopic: "Distribuição de íons",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em condições fisiológicas típicas, qual relação de distribuição iônica é encontrada em muitas células humanas?",

    alternatives: [
      {
        id: "A",
        text: "Na+ mais concentrado no interior e K+ mais concentrado no exterior",
      },
      {
        id: "B",
        text: "Na+ mais concentrado no exterior e K+ mais concentrado no interior",
      },
      {
        id: "C",
        text: "Na+ e K+ obrigatoriamente apresentam concentrações idênticas dentro e fora da célula",
      },
      {
        id: "D",
        text: "Não existem gradientes de Na+ e K+ em células vivas",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Em muitas células, especialmente neurônios e fibras musculares, o Na+ encontra-se em maior concentração no meio extracelular e o K+ em maior concentração intracelular.",

    alternativeExplanations: {
      A: "Essa distribuição está invertida.",
      B: "Correto. Esses gradientes são fundamentais para a excitabilidade celular.",
      C: "As concentrações são diferentes nos dois compartimentos.",
      D: "Gradientes iônicos são essenciais para diversas funções celulares.",
    },

    tags: ["sodio", "potassio", "gradiente-ionico"],
  },

  {
    id: "fcel-009",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Potencial de membrana",
    subtopic: "Potencial de repouso",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em um neurônio típico em repouso, como se encontra o interior da célula em relação ao meio extracelular?",

    alternatives: [
      {
        id: "A",
        text: "Eletricamente mais negativo",
      },
      {
        id: "B",
        text: "Sempre exatamente neutro",
      },
      {
        id: "C",
        text: "Permanentemente mais positivo",
      },
      {
        id: "D",
        text: "Sem qualquer diferença elétrica entre os dois lados da membrana",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O potencial de repouso de muitos neurônios é negativo no interior em relação ao exterior, devido à distribuição desigual de íons e à permeabilidade seletiva da membrana.",

    alternativeExplanations: {
      A: "Correto. O interior é eletricamente negativo em relação ao exterior.",
      B: "Existe diferença de potencial através da membrana.",
      C: "No repouso, o interior não permanece positivo.",
      D: "A diferença elétrica constitui justamente o potencial de membrana.",
    },

    tags: ["potencial-de-repouso", "membrana", "eletricidade"],
  },

  {
    id: "fcel-010",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Gradiente eletroquímico",
    subtopic: "Forças química e elétrica",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "O gradiente eletroquímico de um íon é determinado pela combinação de:",

    alternatives: [
      {
        id: "A",
        text: "Gradiente de concentração e força elétrica",
      },
      {
        id: "B",
        text: "Temperatura e síntese de DNA exclusivamente",
      },
      {
        id: "C",
        text: "Quantidade de ribossomos e mitocôndrias",
      },
      {
        id: "D",
        text: "Pressão arterial e frequência cardíaca",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Íons sofrem influência tanto da diferença de concentração quanto da atração ou repulsão elétrica produzida pelo potencial de membrana.",

    alternativeExplanations: {
      A: "Correto. Essas duas forças compõem o gradiente eletroquímico.",
      B: "Esses fatores não definem o gradiente eletroquímico.",
      C: "Organelas não definem diretamente esse gradiente.",
      D: "São variáveis sistêmicas, não os componentes do gradiente eletroquímico.",
    },

    tags: ["gradiente-eletroquimico", "concentracao", "carga-eletrica"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "fcel-011",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Potencial de membrana",
    subtopic: "Permeabilidade ao potássio",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Por que a permeabilidade da membrana ao K+ possui grande importância para o potencial de repouso de muitas células excitáveis?",

    alternatives: [
      {
        id: "A",
        text: "Porque em repouso existem canais de vazamento de K+ que permitem movimento desse íon segundo seu gradiente eletroquímico",
      },
      {
        id: "B",
        text: "Porque todo K+ celular permanece permanentemente preso ao DNA",
      },
      {
        id: "C",
        text: "Porque o K+ só atravessa a membrana durante a mitose",
      },
      {
        id: "D",
        text: "Porque a membrana é completamente impermeável a todos os demais íons",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A presença de canais de vazamento para K+ torna a membrana em repouso relativamente permeável a esse íon, contribuindo fortemente para o potencial de repouso.",

    alternativeExplanations: {
      A: "Correto. A saída de K+ através de canais de vazamento é fundamental.",
      B: "O K+ não permanece preso ao DNA.",
      C: "O movimento de K+ ocorre continuamente.",
      D: "A membrana apresenta permeabilidade variável a diferentes íons.",
    },

    tags: ["potassio", "potencial-de-repouso", "canais-de-vazamento"],
  },

  {
    id: "fcel-012",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Na+/K+-ATPase",
    subtopic: "Função fisiológica",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual afirmação descreve melhor a relação entre a Na+/K+-ATPase e o potencial de membrana?",

    alternatives: [
      {
        id: "A",
        text: "A bomba é a única responsável pelas rápidas fases de despolarização de um potencial de ação",
      },
      {
        id: "B",
        text: "A bomba ajuda a manter os gradientes de Na+ e K+ que tornam a excitabilidade celular possível",
      },
      {
        id: "C",
        text: "A bomba abre diretamente todos os canais de Na+ dependentes de voltagem",
      },
      {
        id: "D",
        text: "A bomba elimina completamente o K+ do interior celular",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A Na+/K+-ATPase mantém gradientes iônicos fundamentais. As rápidas alterações durante potenciais de ação ocorrem principalmente pela abertura e fechamento de canais iônicos.",

    alternativeExplanations: {
      A: "A despolarização rápida depende principalmente de canais iônicos, não do ciclo da bomba.",
      B: "Correto. A bomba mantém os gradientes necessários à excitabilidade.",
      C: "Canais dependentes de voltagem respondem principalmente a alterações do potencial elétrico.",
      D: "A bomba transporta K+ para dentro, não o elimina do interior.",
    },

    tags: ["na-k-atpase", "potencial-de-membrana", "gradientes"],
  },

  {
    id: "fcel-013",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte celular",
    subtopic: "Transporte ativo secundário",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "No transporte ativo secundário, a energia utilizada para transportar determinada substância contra seu gradiente deriva principalmente de:",

    alternatives: [
      {
        id: "A",
        text: "Um gradiente eletroquímico previamente estabelecido por outro mecanismo de transporte",
      },
      {
        id: "B",
        text: "Produção direta de DNA na membrana",
      },
      {
        id: "C",
        text: "Ausência completa de qualquer gradiente",
      },
      {
        id: "D",
        text: "Ruptura permanente da membrana plasmática",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O transporte ativo secundário não utiliza ATP diretamente no transportador em questão. Ele aproveita a energia armazenada em um gradiente iônico previamente criado, frequentemente pelo transporte ativo primário.",

    alternativeExplanations: {
      A: "Correto. O gradiente previamente estabelecido fornece a energia.",
      B: "DNA não funciona como fonte direta desse transporte.",
      C: "O gradiente é essencial para o mecanismo.",
      D: "A membrana precisa permanecer íntegra.",
    },

    tags: ["transporte-ativo-secundario", "gradiente", "energia"],
  },

  {
    id: "fcel-014",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Tonicidade",
    subtopic: "Solução hipertônica",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma célula é colocada em uma solução efetivamente hipertônica em relação ao seu citoplasma. Qual alteração tende a ocorrer?",

    alternatives: [
      {
        id: "A",
        text: "Entrada líquida de água e aumento do volume celular",
      },
      {
        id: "B",
        text: "Saída líquida de água e redução do volume celular",
      },
      {
        id: "C",
        text: "Nenhum movimento de água pode ocorrer",
      },
      {
        id: "D",
        text: "A célula necessariamente se divide",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Em um meio hipertônico, a água tende a deixar a célula por osmose, produzindo redução do seu volume.",

    alternativeExplanations: {
      A: "Entrada de água é esperada em meio hipotônico.",
      B: "Correto. A célula perde água e tende a encolher.",
      C: "Há movimento de água através da membrana.",
      D: "Tonicidade não desencadeia obrigatoriamente divisão celular.",
    },

    tags: ["hipertonico", "tonicidade", "osmose"],
  },

  {
    id: "fcel-015",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Homeostase celular",
    subtopic: "Déficit de ATP",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma célula sofre redução grave e prolongada na produção de ATP. Qual consequência é fisiologicamente plausível?",

    alternatives: [
      {
        id: "A",
        text: "Comprometimento do transporte ativo e dos gradientes iônicos através da membrana",
      },
      {
        id: "B",
        text: "Aumento indefinido da eficiência da Na+/K+-ATPase",
      },
      {
        id: "C",
        text: "Manutenção perfeita de todos os gradientes independentemente de energia",
      },
      {
        id: "D",
        text: "Transformação imediata da célula em neurônio",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A redução de ATP compromete bombas dependentes de energia, como a Na+/K+-ATPase, prejudicando gradientes iônicos, volume celular e diversas funções fisiológicas.",

    alternativeExplanations: {
      A: "Correto. Bombas dependentes de ATP começam a falhar.",
      B: "A bomba depende de ATP e tende a perder eficiência quando ele falta.",
      C: "Gradientes precisam de mecanismos energéticos para serem mantidos ao longo do tempo.",
      D: "Déficit energético não transforma um tipo celular em outro dessa forma.",
    },

    tags: ["atp", "homeostase-celular", "na-k-atpase", "gradientes"],
  },
];