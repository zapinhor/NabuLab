import type { Question } from "@/types/question";

export const fisiologiaCelularExtraQuestions: Question[] = [
  {
    id: "fcel-016",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Membrana plasmática",
    subtopic: "Colesterol",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual componente da membrana de células animais participa da modulação de sua fluidez?",
    alternatives: [
      {
        id: "A",
        text: "Colesterol.",
      },
      {
        id: "B",
        text: "DNA nuclear.",
      },
      {
        id: "C",
        text: "Glicogênio muscular.",
      },
      {
        id: "D",
        text: "Hemoglobina extracelular.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O colesterol interage com fosfolipídios e influencia propriedades físicas da membrana, incluindo sua fluidez.",
    alternativeExplanations: {
      A: "Correto. Colesterol é um componente importante de membranas animais.",
      B: "Incorreto. DNA nuclear não integra estruturalmente a bicamada plasmática.",
      C: "Incorreto. Glicogênio é uma forma de armazenamento de glicose.",
      D: "Incorreto. Hemoglobina não é um componente estrutural da membrana plasmática.",
    },
    tags: [
      "colesterol",
      "membrana",
      "fluidez",
    ],
  },

  {
    id: "fcel-017",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte de membrana",
    subtopic: "Difusão facilitada",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "A difusão facilitada diferencia-se da difusão simples porque:",
    alternatives: [
      {
        id: "A",
        text: "Depende da participação de proteínas de membrana, embora continue sendo transporte passivo.",
      },
      {
        id: "B",
        text: "Sempre transporta substâncias contra seu gradiente.",
      },
      {
        id: "C",
        text: "Exige obrigatoriamente hidrólise direta de ATP.",
      },
      {
        id: "D",
        text: "Só ocorre em células nervosas.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Canais e transportadores podem permitir movimento passivo a favor do gradiente eletroquímico sem consumo direto de ATP.",
    alternativeExplanations: {
      A: "Correto. A participação proteica caracteriza a difusão facilitada.",
      B: "Incorreto. Movimento contra gradiente é característica de transporte ativo.",
      C: "Incorreto. Difusão facilitada é passiva.",
      D: "Incorreto. Ocorre em muitos tipos celulares.",
    },
    tags: [
      "difusao-facilitada",
      "transporte-passivo",
      "membrana",
    ],
  },

  {
    id: "fcel-018",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Osmose",
    subtopic: "Solução hipotônica",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Uma célula animal colocada em uma solução efetivamente hipotônica tende inicialmente a:",
    alternatives: [
      {
        id: "A",
        text: "Ganhar água e aumentar de volume.",
      },
      {
        id: "B",
        text: "Perder água e diminuir de volume.",
      },
      {
        id: "C",
        text: "Perder todos os seus íons instantaneamente.",
      },
      {
        id: "D",
        text: "Interromper toda movimentação de água.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Em uma solução hipotônica, a concentração efetiva de solutos não penetrantes é menor no meio externo, favorecendo entrada de água.",
    alternativeExplanations: {
      A: "Correto. A água tende a entrar na célula.",
      B: "Incorreto. Esse comportamento é esperado em solução hipertônica.",
      C: "Incorreto. Osmose não implica perda instantânea de todos os íons.",
      D: "Incorreto. Água continua se movimentando através da membrana.",
    },
    tags: [
      "hipotonica",
      "osmose",
      "volume-celular",
    ],
  },

  {
    id: "fcel-019",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte ativo",
    subtopic: "Na+/K+-ATPase",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Em cada ciclo típico da Na+/K+-ATPase, qual movimento ocorre?",
    alternatives: [
      {
        id: "A",
        text: "Três Na+ são transportados para fora e dois K+ para dentro da célula.",
      },
      {
        id: "B",
        text: "Dois Na+ saem e três K+ saem.",
      },
      {
        id: "C",
        text: "Três Na+ entram e três K+ saem sem ATP.",
      },
      {
        id: "D",
        text: "Somente água é transportada.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A Na+/K+-ATPase utiliza ATP e normalmente transporta três íons Na+ para fora e dois íons K+ para dentro.",
    alternativeExplanations: {
      A: "Correto. Essa estequiometria também confere caráter eletrogênico à bomba.",
      B: "Incorreto. A direção e proporção estão erradas.",
      C: "Incorreto. O transporte depende de ATP.",
      D: "Incorreto. A bomba transporta Na+ e K+.",
    },
    tags: [
      "na-k-atpase",
      "transporte-ativo",
      "ions",
    ],
  },

  {
    id: "fcel-020",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Potencial de membrana",
    subtopic: "Potássio",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Em muitas células excitáveis em repouso, a elevada permeabilidade relativa ao K+ contribui para:",
    alternatives: [
      {
        id: "A",
        text: "Manter o interior da célula eletricamente negativo em relação ao exterior.",
      },
      {
        id: "B",
        text: "Tornar obrigatoriamente o interior celular +100 mV.",
      },
      {
        id: "C",
        text: "Eliminar todos os gradientes iônicos.",
      },
      {
        id: "D",
        text: "Impedir completamente a passagem de potássio.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O movimento de K+ através de canais de vazamento é um importante determinante do potencial de repouso.",
    alternativeExplanations: {
      A: "Correto. O gradiente de K+ e sua permeabilidade contribuem para a negatividade intracelular.",
      B: "Incorreto. O potencial de repouso costuma ser negativo.",
      C: "Incorreto. Gradientes são preservados por mecanismos de transporte e permeabilidade seletiva.",
      D: "Incorreto. A permeabilidade ao K+ é justamente importante em repouso.",
    },
    tags: [
      "potassio",
      "potencial-de-repouso",
      "membrana",
    ],
  },

  {
    id: "fcel-021",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Sinalização celular",
    subtopic: "Segundo mensageiro",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Qual das substâncias abaixo pode funcionar como segundo mensageiro intracelular?",
    alternatives: [
      {
        id: "A",
        text: "AMP cíclico.",
      },
      {
        id: "B",
        text: "Colágeno extracelular como única opção.",
      },
      {
        id: "C",
        text: "DNA cromossômico como mensageiro universal de membrana.",
      },
      {
        id: "D",
        text: "Hemoglobina plasmática.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "AMPc é um segundo mensageiro clássico produzido em resposta à ativação de determinadas vias receptoras.",
    alternativeExplanations: {
      A: "Correto. AMPc transmite sinais dentro da célula.",
      B: "Incorreto. Colágeno é uma proteína estrutural da matriz extracelular.",
      C: "Incorreto. DNA não exerce essa função de segundo mensageiro.",
      D: "Incorreto. Hemoglobina não funciona como segundo mensageiro clássico.",
    },
    tags: [
      "ampc",
      "segundo-mensageiro",
      "sinalizacao",
    ],
  },

  {
    id: "fcel-022",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Receptores",
    subtopic: "Receptores intracelulares",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Moléculas lipossolúveis, como diversos hormônios esteroides, podem exercer seus efeitos por meio de:",
    alternatives: [
      {
        id: "A",
        text: "Receptores intracelulares capazes de influenciar expressão gênica.",
      },
      {
        id: "B",
        text: "Apenas receptores localizados na parede de alvéolos.",
      },
      {
        id: "C",
        text: "Destruição obrigatória da membrana plasmática.",
      },
      {
        id: "D",
        text: "Bloqueio completo da síntese de RNA em todas as células.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Muitos esteroides atravessam a membrana plasmática e se ligam a receptores citosólicos ou nucleares que regulam transcrição.",
    alternativeExplanations: {
      A: "Correto. É um mecanismo clássico de ação de hormônios esteroides.",
      B: "Incorreto. Esses receptores não são restritos ao pulmão.",
      C: "Incorreto. A membrana não precisa ser destruída.",
      D: "Incorreto. A ação é regulatória e específica, não uma interrupção universal.",
    },
    tags: [
      "receptor-intracelular",
      "esteroides",
      "expressao-genica",
    ],
  },

  {
    id: "fcel-023",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte de membrana",
    subtopic: "Equação de Goldman",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "A equação de Goldman-Hodgkin-Katz é particularmente útil porque considera:",
    alternatives: [
      {
        id: "A",
        text: "Gradientes e permeabilidades relativas de múltiplos íons para estimar o potencial de membrana.",
      },
      {
        id: "B",
        text: "Apenas a quantidade de proteínas no núcleo.",
      },
      {
        id: "C",
        text: "Somente a concentração de glicose extracelular.",
      },
      {
        id: "D",
        text: "Exclusivamente a pressão atmosférica.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Diferentemente da equação de Nernst para um único íon, a equação de Goldman incorpora a contribuição relativa de vários íons permeantes.",
    alternativeExplanations: {
      A: "Correto. Permeabilidades relativas são fundamentais na equação.",
      B: "Incorreto. Proteínas nucleares não são o foco da equação.",
      C: "Incorreto. Ela é voltada principalmente para gradientes iônicos.",
      D: "Incorreto. Pressão atmosférica não determina esse cálculo.",
    },
    tags: [
      "goldman",
      "potencial-de-membrana",
      "permeabilidade",
    ],
  },

  {
    id: "fcel-024",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte secundário",
    subtopic: "Simporte",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Em um simporte, duas substâncias são transportadas:",
    alternatives: [
      {
        id: "A",
        text: "Na mesma direção através da membrana.",
      },
      {
        id: "B",
        text: "Obrigatoriamente para lados opostos.",
      },
      {
        id: "C",
        text: "Sem qualquer proteína de transporte.",
      },
      {
        id: "D",
        text: "Somente para fora da célula.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Simporte é um tipo de cotransporte em que os solutos atravessam a membrana no mesmo sentido.",
    alternativeExplanations: {
      A: "Correto. Essa é a definição de simporte.",
      B: "Incorreto. Transporte em sentidos opostos caracteriza antiporte.",
      C: "Incorreto. Cotransporte envolve proteínas transportadoras.",
      D: "Incorreto. O sentido depende do sistema específico.",
    },
    tags: [
      "simporte",
      "cotransporte",
      "transporte-secundario",
    ],
  },

  {
    id: "fcel-025",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Osmolaridade",
    subtopic: "Tonicidade",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual fator é especialmente importante para determinar a tonicidade de uma solução em relação a uma célula?",
    alternatives: [
      {
        id: "A",
        text: "A concentração de solutos efetivamente não penetrantes através da membrana.",
      },
      {
        id: "B",
        text: "A cor visual da solução.",
      },
      {
        id: "C",
        text: "O número de mitocôndrias do observador.",
      },
      {
        id: "D",
        text: "A massa corporal do indivíduo isoladamente.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A tonicidade depende do efeito dos solutos sobre o movimento sustentado de água e, portanto, da capacidade desses solutos de atravessar a membrana.",
    alternativeExplanations: {
      A: "Correto. Solutos não penetrantes determinam fortemente alterações sustentadas de volume celular.",
      B: "Incorreto. Cor não determina tonicidade.",
      C: "Incorreto. Mitocôndrias não definem diretamente a tonicidade externa.",
      D: "Incorreto. Massa corporal isolada não determina essa propriedade da solução.",
    },
    tags: [
      "tonicidade",
      "osmolaridade",
      "solutos-nao-penetrantes",
    ],
  },
];