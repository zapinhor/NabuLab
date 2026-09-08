import type { Question } from "@/types/question";

export const homeostaseExtraQuestions: Question[] = [
  {
    id: "homeo-016",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle homeostático",
    subtopic: "Efetor",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Em um sistema de controle homeostático, qual é a função principal de um efetor?",
    alternatives: [
      {
        id: "A",
        text: "Executar uma resposta capaz de modificar a variável regulada.",
      },
      {
        id: "B",
        text: "Armazenar permanentemente todas as informações genéticas.",
      },
      {
        id: "C",
        text: "Impedir qualquer variação fisiológica.",
      },
      {
        id: "D",
        text: "Substituir o centro integrador.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O efetor recebe comandos regulatórios e produz uma resposta que pode contribuir para corrigir ou modificar a variável fisiológica.",
    alternativeExplanations: {
      A: "Correto. Músculos e glândulas são exemplos comuns de efetores.",
      B: "Incorreto. Essa é uma função associada ao material genético celular.",
      C: "Incorreto. Homeostase permite variações dentro de limites regulados.",
      D: "Incorreto. Efetor e centro integrador possuem funções diferentes.",
    },
    tags: [
      "efetor",
      "homeostase",
      "controle",
    ],
  },

  {
    id: "homeo-017",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle homeostático",
    subtopic: "Centro integrador",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "O centro integrador de um mecanismo homeostático geralmente:",
    alternatives: [
      {
        id: "A",
        text: "Processa informações recebidas e participa da determinação da resposta apropriada.",
      },
      {
        id: "B",
        text: "Funciona apenas como um músculo esquelético.",
      },
      {
        id: "C",
        text: "Produz todas as moléculas de ATP do organismo.",
      },
      {
        id: "D",
        text: "Impede a atuação de receptores sensoriais.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Centros integradores recebem informações sobre a variável controlada e coordenam respostas por vias neurais, endócrinas ou ambas.",
    alternativeExplanations: {
      A: "Correto. Integração é o processamento entre detecção e resposta.",
      B: "Incorreto. Um músculo pode funcionar como efetor.",
      C: "Incorreto. Produção energética não define um centro integrador.",
      D: "Incorreto. Receptores são essenciais para fornecer informações ao sistema.",
    },
    tags: [
      "centro-integrador",
      "controle",
      "fisiologia",
    ],
  },

  {
    id: "homeo-018",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Termorregulação",
    subtopic: "Vasodilatação cutânea",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Em um ambiente quente, a vasodilatação cutânea pode contribuir para:",
    alternatives: [
      {
        id: "A",
        text: "Aumentar a transferência de calor do interior do corpo para a superfície.",
      },
      {
        id: "B",
        text: "Diminuir obrigatoriamente todo o fluxo sanguíneo da pele.",
      },
      {
        id: "C",
        text: "Paralisar a produção de suor.",
      },
      {
        id: "D",
        text: "Aumentar diretamente o ponto de congelamento do sangue.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O aumento do fluxo cutâneo facilita a transferência de calor do núcleo corporal para a pele, onde ele pode ser dissipado.",
    alternativeExplanations: {
      A: "Correto. É um mecanismo termorregulatório importante.",
      B: "Incorreto. Vasodilatação geralmente aumenta o fluxo local.",
      C: "Incorreto. Sudorese e vasodilatação podem ocorrer conjuntamente.",
      D: "Incorreto. Isso não constitui um mecanismo fisiológico relevante de termorregulação.",
    },
    tags: [
      "termorregulacao",
      "vasodilatacao",
      "calor",
    ],
  },

  {
    id: "homeo-019",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Glicemia",
    subtopic: "Insulina",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Após uma refeição rica em carboidratos, qual hormônio normalmente contribui para reduzir a elevação da glicemia?",
    alternatives: [
      {
        id: "A",
        text: "Insulina.",
      },
      {
        id: "B",
        text: "Melatonina.",
      },
      {
        id: "C",
        text: "Eritropoietina.",
      },
      {
        id: "D",
        text: "Calcitonina como principal regulador da glicose.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A insulina favorece captação e armazenamento de nutrientes em diferentes tecidos e participa da redução da glicemia pós-prandial.",
    alternativeExplanations: {
      A: "Correto. É um dos principais hormônios envolvidos no controle pós-prandial da glicose.",
      B: "Incorreto. Melatonina está principalmente relacionada à regulação circadiana.",
      C: "Incorreto. Eritropoietina estimula principalmente a produção de eritrócitos.",
      D: "Incorreto. Calcitonina participa do metabolismo do cálcio e não é o principal hormônio regulador da glicemia.",
    },
    tags: [
      "glicemia",
      "insulina",
      "feedback",
    ],
  },

  {
    id: "homeo-020",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Pressão arterial",
    subtopic: "Barorreceptores",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Os barorreceptores arteriais participam principalmente da detecção de:",
    alternatives: [
      {
        id: "A",
        text: "Alterações no estiramento da parede arterial associadas à pressão.",
      },
      {
        id: "B",
        text: "Concentração de DNA dentro dos eritrócitos.",
      },
      {
        id: "C",
        text: "Quantidade de surfactante nos alvéolos.",
      },
      {
        id: "D",
        text: "Nível de glicogênio dos músculos esqueléticos.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Barorreceptores localizados principalmente no seio carotídeo e arco aórtico respondem ao estiramento associado às alterações da pressão arterial.",
    alternativeExplanations: {
      A: "Correto. Eles são importantes na regulação cardiovascular de curto prazo.",
      B: "Incorreto. Eritrócitos maduros humanos não possuem núcleo.",
      C: "Incorreto. Surfactante não é detectado por barorreceptores arteriais.",
      D: "Incorreto. Glicogênio muscular não é a variável diretamente monitorada por esses receptores.",
    },
    tags: [
      "barorreceptores",
      "pressao-arterial",
      "feedback",
    ],
  },

  {
    id: "homeo-021",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Equilíbrio hídrico",
    subtopic: "ADH",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "O aumento da secreção de hormônio antidiurético pode favorecer:",
    alternatives: [
      {
        id: "A",
        text: "Maior reabsorção de água nos rins.",
      },
      {
        id: "B",
        text: "Eliminação obrigatória de grandes volumes de água.",
      },
      {
        id: "C",
        text: "Destruição das membranas celulares.",
      },
      {
        id: "D",
        text: "Interrupção completa da filtração glomerular em indivíduos saudáveis.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O ADH aumenta a permeabilidade à água em regiões do ducto coletor renal por mecanismos envolvendo aquaporinas.",
    alternativeExplanations: {
      A: "Correto. Isso contribui para conservação de água.",
      B: "Incorreto. Seu efeito tende a reduzir a perda de água pela urina.",
      C: "Incorreto. Não é uma função fisiológica do ADH.",
      D: "Incorreto. ADH não tem como função normal interromper totalmente a filtração.",
    },
    tags: [
      "adh",
      "agua",
      "rim",
    ],
  },

  {
    id: "homeo-022",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Equilíbrio ácido-base",
    subtopic: "pH sanguíneo",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "A manutenção do pH corporal depende da atuação integrada de:",
    alternatives: [
      {
        id: "A",
        text: "Sistemas tampão, pulmões e rins.",
      },
      {
        id: "B",
        text: "Apenas do tecido ósseo.",
      },
      {
        id: "C",
        text: "Apenas da frequência cardíaca.",
      },
      {
        id: "D",
        text: "Exclusivamente da pele.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Tampões químicos atuam rapidamente, o sistema respiratório regula CO₂ e os rins participam do controle de H+ e bicarbonato.",
    alternativeExplanations: {
      A: "Correto. O equilíbrio ácido-base depende de vários sistemas.",
      B: "Incorreto. O osso pode participar de tamponamento em determinadas situações, mas não atua sozinho.",
      C: "Incorreto. Frequência cardíaca não é o único mecanismo de controle do pH.",
      D: "Incorreto. A pele não é responsável exclusiva pelo equilíbrio ácido-base.",
    },
    tags: [
      "acido-base",
      "ph",
      "homeostase",
    ],
  },

  {
    id: "homeo-023",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle fisiológico",
    subtopic: "Ganho de feedback",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Um sistema de feedback negativo eficiente tende a:",
    alternatives: [
      {
        id: "A",
        text: "Reduzir o erro entre a condição atual e a condição regulada.",
      },
      {
        id: "B",
        text: "Aumentar progressivamente qualquer perturbação inicial.",
      },
      {
        id: "C",
        text: "Eliminar necessariamente todos os ritmos biológicos.",
      },
      {
        id: "D",
        text: "Impedir qualquer mudança adaptativa.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A ação corretiva de feedback negativo tende a reduzir desvios e estabilizar a variável controlada.",
    alternativeExplanations: {
      A: "Correto. Esse princípio caracteriza o feedback negativo.",
      B: "Incorreto. Amplificação é característica de feedback positivo.",
      C: "Incorreto. Ritmos biológicos podem coexistir com mecanismos homeostáticos.",
      D: "Incorreto. Sistemas regulatórios continuam capazes de adaptação.",
    },
    tags: [
      "feedback-negativo",
      "ganho",
      "erro",
    ],
  },

  {
    id: "homeo-024",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Alostase",
    subtopic: "Carga alostática",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "O conceito de carga alostática está relacionado principalmente:",
    alternatives: [
      {
        id: "A",
        text: "Ao custo cumulativo da ativação repetida ou prolongada de mecanismos adaptativos.",
      },
      {
        id: "B",
        text: "Ao número exato de cromossomos de uma célula.",
      },
      {
        id: "C",
        text: "À pressão existente exclusivamente dentro dos alvéolos.",
      },
      {
        id: "D",
        text: "À quantidade fixa de ATP armazenada no organismo.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A carga alostática descreve o desgaste fisiológico associado à ativação repetida de sistemas de adaptação diante de demandas persistentes.",
    alternativeExplanations: {
      A: "Correto. Está relacionada ao custo acumulado das respostas adaptativas.",
      B: "Incorreto. Não é um conceito genético cromossômico.",
      C: "Incorreto. Não se limita ao sistema respiratório.",
      D: "Incorreto. O organismo não mantém uma reserva fixa de ATP definida dessa forma.",
    },
    tags: [
      "alostase",
      "carga-alostatica",
      "estresse",
    ],
  },

  {
    id: "homeo-025",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Ritmos biológicos",
    subtopic: "Ritmo circadiano",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Qual afirmação melhor descreve a relação entre ritmos circadianos e homeostase?",
    alternatives: [
      {
        id: "A",
        text: "Variáveis fisiológicas podem apresentar oscilações circadianas reguladas sem que isso represente perda de homeostase.",
      },
      {
        id: "B",
        text: "Qualquer oscilação ao longo de 24 horas significa necessariamente falha fisiológica.",
      },
      {
        id: "C",
        text: "Ritmos circadianos ocorrem somente durante doenças.",
      },
      {
        id: "D",
        text: "Homeostase exige que todos os hormônios permaneçam com concentrações idênticas durante todo o dia.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Homeostase é dinâmica. Diversas variáveis apresentam variações temporais organizadas, como temperatura corporal e secreções hormonais.",
    alternativeExplanations: {
      A: "Correto. Ritmos fisiológicos normais são compatíveis com regulação homeostática.",
      B: "Incorreto. Oscilações podem fazer parte da fisiologia normal.",
      C: "Incorreto. Ritmos circadianos são fenômenos fisiológicos normais.",
      D: "Incorreto. Hormônios podem apresentar variações circadianas importantes.",
    },
    tags: [
      "ritmo-circadiano",
      "homeostase",
      "cronobiologia",
    ],
  },
];