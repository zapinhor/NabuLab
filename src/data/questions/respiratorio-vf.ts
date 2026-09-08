import type { Question } from "@/types/question";

export const respiratorioTrueFalseQuestions: Question[] = [
  {
    id: "resp-vf-001",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Vias aéreas",
    subtopic: "Traqueia",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A traqueia faz parte das vias aéreas inferiores.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "A traqueia integra as vias aéreas inferiores e conduz o ar da laringe em direção aos brônquios principais.",
    alternativeExplanations: {
      V: "Correto. A traqueia pertence às vias aéreas inferiores.",
      F: "Incorreto. A traqueia não pertence às vias aéreas superiores.",
    },
    tags: [
      "traqueia",
      "vias-aereas",
      "anatomia",
    ],
  },

  {
    id: "resp-vf-002",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Pulmões",
    subtopic: "Lobos pulmonares",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "O pulmão direito normalmente possui três lobos, enquanto o pulmão esquerdo possui dois.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "O pulmão direito apresenta lobos superior, médio e inferior. O esquerdo possui lobos superior e inferior, deixando espaço para o coração.",
    alternativeExplanations: {
      V: "Correto. Essa é a organização anatômica pulmonar habitual.",
      F: "Incorreto. Os pulmões não possuem o mesmo número de lobos.",
    },
    tags: [
      "pulmao",
      "lobos",
      "anatomia",
    ],
  },

  {
    id: "resp-vf-003",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Mecânica respiratória",
    subtopic: "Diafragma",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Durante uma inspiração tranquila, a contração do diafragma aumenta o volume da cavidade torácica.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "Ao se contrair, o diafragma desce e aumenta o volume torácico, contribuindo para a redução da pressão intrapulmonar e entrada de ar.",
    alternativeExplanations: {
      V: "Correto. A contração diafragmática favorece a inspiração.",
      F: "Incorreto. O diafragma não reduz o volume torácico durante a inspiração.",
    },
    tags: [
      "diafragma",
      "inspiracao",
      "mecanica-respiratoria",
    ],
  },

  {
    id: "resp-vf-004",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Trocas gasosas",
    subtopic: "Alvéolos",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Os alvéolos pulmonares são importantes locais de troca de oxigênio e dióxido de carbono entre o ar e o sangue.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "A membrana alvéolo-capilar é fina e favorece a difusão de O₂ e CO₂ entre o espaço alveolar e os capilares pulmonares.",
    alternativeExplanations: {
      V: "Correto. Os alvéolos constituem a principal região de hematose.",
      F: "Incorreto. A função alveolar está diretamente ligada às trocas gasosas.",
    },
    tags: [
      "alveolos",
      "hematose",
      "trocas-gasosas",
    ],
  },

  {
    id: "resp-vf-005",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Pleuras",
    subtopic: "Pressão intrapleural",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Em condições fisiológicas de repouso, a pressão intrapleural costuma ser inferior à pressão atmosférica.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "A pressão intrapleural normalmente é negativa em relação à atmosférica, contribuindo para manter os pulmões expandidos contra a parede torácica.",
    alternativeExplanations: {
      V: "Correto. A pressão intrapleural fisiológica é subatmosférica.",
      F: "Incorreto. Uma pressão pleural persistentemente igual ou superior à atmosférica pode comprometer a expansão pulmonar.",
    },
    tags: [
      "pleura",
      "pressao-intrapleural",
      "pulmao",
    ],
  },

  {
    id: "resp-vf-006",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Surfactante",
    subtopic: "Tensão superficial",
    difficulty: "medio",
    type: "true-false",
    statement:
      "O surfactante pulmonar aumenta a tensão superficial dos alvéolos e favorece seu colapso.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "F",
    explanation:
      "O surfactante reduz a tensão superficial alveolar. Dessa forma, aumenta a estabilidade dos alvéolos e diminui a tendência ao colapso.",
    alternativeExplanations: {
      V: "Incorreto. O efeito do surfactante é justamente reduzir, e não aumentar, a tensão superficial.",
      F: "Correto. A redução da tensão superficial ajuda a manter os alvéolos abertos.",
    },
    tags: [
      "surfactante",
      "alveolos",
      "tensao-superficial",
    ],
  },

  {
    id: "resp-vf-007",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação",
    subtopic: "Expiração tranquila",
    difficulty: "medio",
    type: "true-false",
    statement:
      "A expiração tranquila em repouso depende principalmente do relaxamento dos músculos inspiratórios e do recolhimento elástico pulmonar.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "Na respiração tranquila, a expiração é predominantemente passiva, resultando do relaxamento inspiratório e das propriedades elásticas dos pulmões e da caixa torácica.",
    alternativeExplanations: {
      V: "Correto. A expiração de repouso geralmente não exige forte contração muscular expiratória.",
      F: "Incorreto. Músculos expiratórios tornam-se particularmente importantes na expiração forçada.",
    },
    tags: [
      "expiracao",
      "ventilacao",
      "elasticidade",
    ],
  },

  {
    id: "resp-vf-008",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Relação ventilação-perfusão",
    subtopic: "Troca gasosa",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Uma região pulmonar ventilada, mas sem fluxo sanguíneo adequado, apresenta comportamento semelhante ao de espaço morto.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "Se há ventilação alveolar sem perfusão suficiente, o gás inspirado chega ao alvéolo, mas participa pouco ou nada das trocas com o sangue, caracterizando aumento do espaço morto fisiológico.",
    alternativeExplanations: {
      V: "Correto. Ventilação sem perfusão adequada representa ventilação desperdiçada.",
      F: "Incorreto. Perfusão é necessária para que o gás alveolar seja efetivamente trocado com o sangue.",
    },
    tags: [
      "ventilacao-perfusao",
      "espaco-morto",
      "fisiologia-respiratoria",
    ],
  },

  {
    id: "resp-vf-009",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Volumes pulmonares",
    subtopic: "Volume residual",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "O volume residual pode ser medido diretamente por uma espirometria simples convencional.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "F",
    explanation:
      "A espirometria simples mede volumes de ar que entram ou saem dos pulmões. Como o volume residual permanece após uma expiração máxima, ele não é medido diretamente por esse método.",
    alternativeExplanations: {
      V: "Incorreto. O volume residual permanece nos pulmões e não é expirado para o espirômetro.",
      F: "Correto. Sua determinação exige métodos adicionais, como diluição de gases ou pletismografia.",
    },
    tags: [
      "volume-residual",
      "espirometria",
      "volumes-pulmonares",
    ],
  },

  {
    id: "resp-vf-010",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Difusão pulmonar",
    subtopic: "Membrana respiratória",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "O aumento da espessura da membrana alvéolo-capilar pode dificultar a difusão dos gases respiratórios.",
    alternatives: [
      {
        id: "V",
        text: "Verdadeiro",
      },
      {
        id: "F",
        text: "Falso",
      },
    ],
    correctAnswer: "V",
    explanation:
      "Pela relação descrita pela lei de Fick, maior espessura da barreira de difusão tende a diminuir a taxa de transferência gasosa.",
    alternativeExplanations: {
      V: "Correto. Uma barreira mais espessa aumenta a distância de difusão.",
      F: "Incorreto. Alterações que aumentam a espessura da membrana podem prejudicar a troca gasosa.",
    },
    tags: [
      "difusao",
      "membrana-alveolocapilar",
      "lei-de-fick",
    ],
  },
];