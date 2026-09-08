import type { Question } from "@/types/question";

export const sistemaNervosoTrueFalseQuestions: Question[] = [
  {
    id: "sn-vf-001",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Organização do sistema nervoso",
    subtopic: "Sistema nervoso central",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "O encéfalo e a medula espinal fazem parte do sistema nervoso central.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O sistema nervoso central é formado pelo encéfalo e pela medula espinal.",
    alternativeExplanations: {
      V: "Correto. Ambas as estruturas pertencem ao SNC.",
      F: "Incorreto. Nervos e gânglios periféricos constituem o SNP, enquanto encéfalo e medula formam o SNC.",
    },
    tags: [
      "snc",
      "encefalo",
      "medula",
    ],
  },

  {
    id: "sn-vf-002",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Neurônios",
    subtopic: "Dendritos",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Dendritos frequentemente recebem sinais provenientes de outras células nervosas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Dendritos são extensões neuronais especializadas principalmente na recepção de sinais sinápticos, embora a organização neuronal possa variar.",
    alternativeExplanations: {
      V: "Correto. A recepção de informação é uma função comum dos dendritos.",
      F: "Incorreto. Dendritos possuem importante papel na entrada de sinais no neurônio.",
    },
    tags: [
      "dendritos",
      "neuronios",
      "sinapse",
    ],
  },

  {
    id: "sn-vf-003",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sistema nervoso periférico",
    subtopic: "Vias aferentes",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Fibras aferentes conduzem informações sensoriais em direção ao sistema nervoso central.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Aferente refere-se ao fluxo de informação da periferia em direção ao sistema nervoso central.",
    alternativeExplanations: {
      V: "Correto. Informação sensorial segue predominantemente por vias aferentes.",
      F: "Incorreto. Vias eferentes conduzem comandos do SNC em direção aos efetores.",
    },
    tags: [
      "aferente",
      "sensorial",
      "snp",
    ],
  },

  {
    id: "sn-vf-004",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sistema nervoso autônomo",
    subtopic: "Controle visceral",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "O sistema nervoso autônomo participa do controle de funções viscerais, como frequência cardíaca e motilidade gastrointestinal.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O sistema nervoso autônomo regula diversas funções involuntárias de músculos liso e cardíaco e de glândulas.",
    alternativeExplanations: {
      V: "Correto. Essas são funções típicas do controle autonômico.",
      F: "Incorreto. O sistema autônomo possui papel central na regulação visceral.",
    },
    tags: [
      "autonomo",
      "visceral",
      "frequencia-cardiaca",
    ],
  },

  {
    id: "sn-vf-005",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Despolarização",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Em muitos neurônios, a fase ascendente do potencial de ação envolve aumento rápido da permeabilidade ao Na+ por canais dependentes de voltagem.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A abertura de canais de Na+ dependentes de voltagem promove influxo de sódio e rápida despolarização da membrana.",
    alternativeExplanations: {
      V: "Correto. O influxo de Na+ é fundamental na fase ascendente do potencial de ação neuronal clássico.",
      F: "Incorreto. Em neurônios típicos, o Na+ possui papel central na despolarização rápida.",
    },
    tags: [
      "potencial-de-acao",
      "sodio",
      "despolarizacao",
    ],
  },

  {
    id: "sn-vf-006",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Sinapses",
    subtopic: "Sinapse química",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Em uma sinapse química típica, neurotransmissores são liberados pelo terminal pré-sináptico e interagem com receptores na célula pós-sináptica.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A entrada de Ca²+ no terminal pré-sináptico pode desencadear exocitose de vesículas, liberando neurotransmissores na fenda sináptica.",
    alternativeExplanations: {
      V: "Correto. Esse é o mecanismo básico de muitas sinapses químicas.",
      F: "Incorreto. A comunicação química depende justamente da liberação e ligação do neurotransmissor.",
    },
    tags: [
      "sinapse",
      "neurotransmissor",
      "pre-sinaptico",
    ],
  },

  {
    id: "sn-vf-007",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Mielina",
    subtopic: "Condução saltatória",
    difficulty: "medio",
    type: "true-false",
    statement:
      "A mielinização pode aumentar a velocidade de propagação do potencial de ação ao favorecer condução saltatória entre os nodos de Ranvier.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A mielina aumenta a resistência da membrana e reduz sua capacitância em segmentos internodais, permitindo propagação mais rápida entre os nodos.",
    alternativeExplanations: {
      V: "Correto. A condução saltatória aumenta a eficiência da transmissão.",
      F: "Incorreto. A mielina geralmente acelera, em vez de retardar, a condução.",
    },
    tags: [
      "mielina",
      "nodos-de-ranvier",
      "conducao-saltatoria",
    ],
  },

  {
    id: "sn-vf-008",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Potencial de ação",
    subtopic: "Período refratário",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Durante o período refratário absoluto de um neurônio, um segundo potencial de ação completo não pode ser iniciado, independentemente da intensidade do estímulo.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Durante o período refratário absoluto, grande parte dos canais de Na+ dependentes de voltagem encontra-se inativada e indisponível para nova ativação.",
    alternativeExplanations: {
      V: "Correto. A inativação dos canais impede novo disparo completo nesse intervalo.",
      F: "Incorreto. Aumentar o estímulo não supera o período refratário absoluto.",
    },
    tags: [
      "refratario",
      "potencial-de-acao",
      "canais-de-sodio",
    ],
  },

  {
    id: "sn-vf-009",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Integração sináptica",
    subtopic: "Somação",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Potenciais pós-sinápticos podem sofrer somação temporal e espacial antes de influenciar o disparo de um potencial de ação.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Sinais provenientes da mesma sinapse em rápida sucessão ou de diferentes sinapses simultaneamente podem se somar e alterar o potencial da membrana.",
    alternativeExplanations: {
      V: "Correto. A integração de múltiplos potenciais é fundamental ao processamento neuronal.",
      F: "Incorreto. A atividade neuronal depende fortemente de somação sináptica.",
    },
    tags: [
      "somacao",
      "pps",
      "integracao-neural",
    ],
  },

  {
    id: "sn-vf-010",
    area: "Fisiologia Humana",
    subject: "sistema-nervoso",
    subjectName: "Sistema Nervoso",
    topic: "Neurotransmissão",
    subtopic: "Potenciais pós-sinápticos",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Um neurotransmissor é sempre excitatório ou sempre inibitório, independentemente do receptor ao qual se liga.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "O efeito de um neurotransmissor depende do subtipo de receptor, da condutância iônica ou via intracelular ativada e das propriedades da célula-alvo.",
    alternativeExplanations: {
      V: "Incorreto. O mesmo neurotransmissor pode produzir efeitos diferentes conforme o receptor.",
      F: "Correto. A resposta é determinada pelo sistema receptor-efetor da célula pós-sináptica.",
    },
    tags: [
      "neurotransmissor",
      "receptor",
      "excitacao",
      "inibicao",
    ],
  },
];