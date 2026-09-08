import type { Question } from "@/types/question";

export const homeostaseTrueFalseQuestions: Question[] = [
  {
    id: "homeo-vf-001",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Conceitos fundamentais",
    subtopic: "Meio interno",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Homeostase significa que todas as variáveis fisiológicas permanecem absolutamente constantes ao longo do tempo.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "A homeostase envolve manutenção das variáveis dentro de faixas compatíveis com o funcionamento adequado, e não ausência completa de variação.",
    alternativeExplanations: {
      V: "Incorreto. Variáveis fisiológicas normalmente oscilam ao redor de valores ou faixas reguladas.",
      F: "Correto. Homeostase é um equilíbrio dinâmico.",
    },
    tags: [
      "homeostase",
      "equilibrio-dinamico",
      "meio-interno",
    ],
  },

  {
    id: "homeo-vf-002",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Sistemas de controle",
    subtopic: "Feedback negativo",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "No feedback negativo, a resposta do sistema tende a reduzir a alteração que desencadeou o mecanismo regulatório.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O feedback negativo se opõe ao desvio inicial e é fundamental para estabilizar muitas variáveis fisiológicas.",
    alternativeExplanations: {
      V: "Correto. A resposta tende a minimizar a perturbação inicial.",
      F: "Incorreto. A amplificação da alteração é característica de feedback positivo.",
    },
    tags: [
      "feedback-negativo",
      "regulacao",
      "homeostase",
    ],
  },

  {
    id: "homeo-vf-003",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Sistemas de controle",
    subtopic: "Receptor",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Em um sistema homeostático, um receptor pode detectar alterações em uma variável fisiológica.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Receptores ou sensores detectam mudanças e fornecem informações que podem ser processadas por um centro integrador.",
    alternativeExplanations: {
      V: "Correto. A detecção do estímulo é uma função básica do sensor fisiológico.",
      F: "Incorreto. Sem detecção da variável, o sistema regulatório teria dificuldade de responder adequadamente.",
    },
    tags: [
      "receptor",
      "sensor",
      "controle-homeostatico",
    ],
  },

  {
    id: "homeo-vf-004",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Termorregulação",
    subtopic: "Temperatura corporal",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A sudorese pode contribuir para a perda de calor corporal por evaporação.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A evaporação do suor retira energia térmica da superfície corporal e participa da termorregulação.",
    alternativeExplanations: {
      V: "Correto. A evaporação é um mecanismo importante de perda de calor.",
      F: "Incorreto. A sudorese pode ser fundamental para dissipação térmica.",
    },
    tags: [
      "termorregulacao",
      "sudorese",
      "temperatura",
    ],
  },

  {
    id: "homeo-vf-005",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Sistemas de controle",
    subtopic: "Feedback positivo",
    difficulty: "medio",
    type: "true-false",
    statement:
      "O feedback positivo sempre representa um processo patológico e nunca possui função fisiológica normal.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "Existem mecanismos fisiológicos normais de feedback positivo, como amplificação das contrações uterinas durante o trabalho de parto e determinadas etapas da coagulação.",
    alternativeExplanations: {
      V: "Incorreto. Feedback positivo também ocorre em processos fisiológicos normais.",
      F: "Correto. Ele amplifica a resposta e pode ser útil quando há um ponto final definido.",
    },
    tags: [
      "feedback-positivo",
      "parto",
      "coagulacao",
    ],
  },

  {
    id: "homeo-vf-006",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle fisiológico",
    subtopic: "Set point",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Um valor de referência fisiológico pode ser modificado em determinadas condições, como ocorre na febre.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Durante a febre, mediadores inflamatórios podem elevar temporariamente o ponto de referência termorregulatório hipotalâmico.",
    alternativeExplanations: {
      V: "Correto. O set point não precisa ser absolutamente fixo em todas as circunstâncias.",
      F: "Incorreto. Alguns valores regulados podem sofrer ajustes fisiológicos ou patológicos.",
    },
    tags: [
      "set-point",
      "febre",
      "termorregulacao",
    ],
  },

  {
    id: "homeo-vf-007",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle antecipatório",
    subtopic: "Feedforward",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Mecanismos de feedforward podem iniciar respostas antes que uma variável regulada se desvie de forma importante.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O controle antecipatório permite respostas preditivas, reduzindo o tamanho da perturbação antes que ela se manifeste plenamente.",
    alternativeExplanations: {
      V: "Correto. Feedforward pode antecipar uma necessidade fisiológica.",
      F: "Incorreto. Nem todo controle fisiológico depende de esperar um grande erro ocorrer.",
    },
    tags: [
      "feedforward",
      "controle-antecipatorio",
      "regulacao",
    ],
  },

  {
    id: "homeo-vf-008",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Compartimentos corporais",
    subtopic: "Líquido extracelular",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Mudanças importantes na composição do líquido extracelular podem alterar o funcionamento celular, mesmo que ocorram fora das células.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "As células dependem do ambiente extracelular para manter gradientes iônicos, osmolaridade, disponibilidade de nutrientes e diversas condições necessárias à função celular.",
    alternativeExplanations: {
      V: "Correto. Alterações do meio extracelular podem modificar diretamente a fisiologia celular.",
      F: "Incorreto. O meio interno exerce grande influência sobre as células.",
    },
    tags: [
      "liquido-extracelular",
      "meio-interno",
      "celula",
    ],
  },

  {
    id: "homeo-vf-009",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Integração fisiológica",
    subtopic: "Controle neural e endócrino",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "A manutenção da homeostase depende exclusivamente do sistema nervoso, sem participação significativa do sistema endócrino.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "Sistemas nervoso e endócrino participam de forma integrada da regulação fisiológica, juntamente com mecanismos locais e outros sistemas corporais.",
    alternativeExplanations: {
      V: "Incorreto. O sistema endócrino possui papel central na regulação de inúmeras variáveis.",
      F: "Correto. A homeostase depende de múltiplos sistemas integrados.",
    },
    tags: [
      "sistema-endocrino",
      "sistema-nervoso",
      "integracao",
    ],
  },

  {
    id: "homeo-vf-010",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Alostase",
    subtopic: "Adaptação",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "A adaptação fisiológica pode envolver alterações coordenadas em diferentes sistemas para preservar a estabilidade do organismo diante de novas demandas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O organismo pode modificar respostas cardiovasculares, endócrinas, metabólicas e neurais diante de demandas como exercício, estresse ou mudanças ambientais.",
    alternativeExplanations: {
      V: "Correto. A estabilidade fisiológica pode exigir ajustes dinâmicos.",
      F: "Incorreto. Adaptação não significa ausência de mudança, mas mudança regulada.",
    },
    tags: [
      "alostase",
      "adaptacao",
      "homeostase",
    ],
  },
];