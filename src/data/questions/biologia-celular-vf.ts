import type { Question } from "@/types/question";

export const biologiaCelularTrueFalseQuestions: Question[] = [
  {
    id: "bcel-vf-001",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Núcleo",
    subtopic: "Material genético",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Nas células eucarióticas humanas, a maior parte do DNA encontra-se no núcleo.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A maior parte do genoma celular está organizada em cromossomos nucleares, embora as mitocôndrias também possuam DNA próprio.",
    alternativeExplanations: {
      V: "Correto. O núcleo contém a maior parte do material genético celular.",
      F: "Incorreto. Apesar do DNA mitocondrial, a maior parte do DNA está no núcleo.",
    },
    tags: [
      "nucleo",
      "dna",
      "cromossomos",
    ],
  },

  {
    id: "bcel-vf-002",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Mitocôndrias",
    subtopic: "Metabolismo energético",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "As mitocôndrias participam de etapas importantes da produção aeróbia de ATP.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Ciclo do ácido cítrico, cadeia transportadora de elétrons e fosforilação oxidativa estão intimamente relacionados às mitocôndrias.",
    alternativeExplanations: {
      V: "Correto. Mitocôndrias são centrais ao metabolismo aeróbio.",
      F: "Incorreto. Elas possuem papel importante na produção celular de ATP.",
    },
    tags: [
      "mitocondria",
      "atp",
      "metabolismo",
    ],
  },

  {
    id: "bcel-vf-003",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Ribossomos",
    subtopic: "Síntese proteica",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Ribossomos participam diretamente da tradução de RNA mensageiro em proteínas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O ribossomo lê os códons do RNA mensageiro e catalisa a formação de ligações peptídicas durante a síntese proteica.",
    alternativeExplanations: {
      V: "Correto. Tradução ocorre nos ribossomos.",
      F: "Incorreto. Ribossomos são estruturas fundamentais da síntese de proteínas.",
    },
    tags: [
      "ribossomo",
      "traducao",
      "proteina",
    ],
  },

  {
    id: "bcel-vf-004",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Lisossomos",
    subtopic: "Digestão intracelular",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Lisossomos possuem enzimas capazes de participar da degradação de macromoléculas e componentes celulares.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Lisossomos apresentam enzimas hidrolíticas que funcionam em ambiente ácido e participam da digestão intracelular.",
    alternativeExplanations: {
      V: "Correto. Degradação e reciclagem celular são funções lisossomais importantes.",
      F: "Incorreto. Lisossomos não atuam apenas como estruturas de armazenamento.",
    },
    tags: [
      "lisossomo",
      "digestao",
      "hidrolases",
    ],
  },

  {
    id: "bcel-vf-005",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Retículo endoplasmático",
    subtopic: "Retículo endoplasmático rugoso",
    difficulty: "medio",
    type: "true-false",
    statement:
      "O retículo endoplasmático rugoso está associado à síntese de muitas proteínas destinadas à secreção ou ao sistema de endomembranas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Ribossomos associados ao retículo rugoso sintetizam proteínas que podem ser inseridas em membranas, enviadas a organelas ou secretadas.",
    alternativeExplanations: {
      V: "Correto. O RER é central à via secretora.",
      F: "Incorreto. Muitas proteínas secretadas iniciam sua síntese em ribossomos associados ao RER.",
    },
    tags: [
      "reticulo-rugoso",
      "secrecao",
      "proteinas",
    ],
  },

  {
    id: "bcel-vf-006",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Complexo de Golgi",
    subtopic: "Processamento proteico",
    difficulty: "medio",
    type: "true-false",
    statement:
      "O complexo de Golgi participa da modificação, organização e direcionamento de proteínas e lipídios.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O Golgi recebe moléculas provenientes do retículo endoplasmático e participa de modificações pós-traducionais, triagem e empacotamento.",
    alternativeExplanations: {
      V: "Correto. Processamento e distribuição são funções importantes do Golgi.",
      F: "Incorreto. O Golgi tem papel central na rota de secreção e endomembranas.",
    },
    tags: [
      "golgi",
      "processamento",
      "vesiculas",
    ],
  },

  {
    id: "bcel-vf-007",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Citoesqueleto",
    subtopic: "Microtúbulos",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Microtúbulos participam tanto da organização celular quanto da formação do fuso mitótico.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Microtúbulos atuam em transporte intracelular, posicionamento de organelas, cílios, flagelos e segregação cromossômica.",
    alternativeExplanations: {
      V: "Correto. O fuso mitótico é constituído por microtúbulos.",
      F: "Incorreto. Microtúbulos possuem funções importantes na divisão celular.",
    },
    tags: [
      "microtubulos",
      "fuso-mitotico",
      "citoesqueleto",
    ],
  },

  {
    id: "bcel-vf-008",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Ciclo celular",
    subtopic: "Checkpoint",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Pontos de checagem do ciclo celular podem impedir temporariamente a progressão do ciclo quando existem problemas, como dano ao DNA.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Checkpoints ajudam a garantir que condições apropriadas sejam satisfeitas antes da progressão para etapas críticas do ciclo.",
    alternativeExplanations: {
      V: "Correto. Eles funcionam como mecanismos de controle da divisão.",
      F: "Incorreto. A progressão do ciclo não ocorre necessariamente de forma automática diante de dano celular.",
    },
    tags: [
      "ciclo-celular",
      "checkpoint",
      "dna",
    ],
  },

  {
    id: "bcel-vf-009",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Apoptose",
    subtopic: "Morte celular programada",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "A apoptose é um processo regulado de morte celular que pode ocorrer sem a ruptura inflamatória típica de uma necrose extensa.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Na apoptose, componentes celulares são organizadamente desmontados e removidos, frequentemente com menor liberação descontrolada de conteúdo intracelular.",
    alternativeExplanations: {
      V: "Correto. Apoptose e necrose apresentam mecanismos e consequências distintas.",
      F: "Incorreto. A apoptose não é simplesmente uma forma idêntica de necrose.",
    },
    tags: [
      "apoptose",
      "morte-celular",
      "caspases",
    ],
  },

  {
    id: "bcel-vf-010",
    area: "Bioquímica Fundamental",
    subject: "biologia-celular",
    subjectName: "Biologia Celular",
    topic: "Transporte vesicular",
    subtopic: "Endocitose e exocitose",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Endocitose e exocitose são processos que podem alterar o conteúdo e a composição da membrana plasmática por meio de vesículas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Na endocitose, regiões da membrana formam vesículas internas. Na exocitose, vesículas se fundem com a membrana e liberam seu conteúdo.",
    alternativeExplanations: {
      V: "Correto. Ambos fazem parte da dinâmica de membranas.",
      F: "Incorreto. Vesículas participam diretamente desses dois processos.",
    },
    tags: [
      "endocitose",
      "exocitose",
      "vesiculas",
    ],
  },
];