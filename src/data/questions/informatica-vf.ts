import type {
  Question,
} from "@/types/question";

export const informaticaTrueFalseQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "info-026",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Hardware",
    subtopic: "Memória RAM",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "A memória RAM é normalmente considerada uma memória volátil.",

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
      "A memória RAM utilizada normalmente em computadores perde seu conteúdo quando deixa de receber alimentação elétrica.",

    alternativeExplanations: {
      V: "Correto. A RAM convencional é uma forma de memória volátil.",
      F: "Incorreto. A volatilidade é uma característica típica da RAM principal.",
    },

    tags: [
      "ram",
      "hardware",
      "memoria-volatil",
    ],
  },

  {
    id: "info-027",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Internet",
    subtopic: "Navegadores",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "Um navegador Web e um mecanismo de busca são exatamente o mesmo tipo de software e possuem necessariamente a mesma função.",

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
      "O navegador é um software utilizado para acessar recursos da Web. Um mecanismo de busca é um serviço que ajuda a localizar páginas e informações indexadas.",

    alternativeExplanations: {
      V: "Incorreto. Embora possam ser utilizados em conjunto, são conceitos diferentes.",
      F: "Correto. Navegador e mecanismo de busca possuem funções distintas.",
    },

    tags: [
      "internet",
      "navegador",
      "buscador",
    ],
  },

  {
    id: "info-028",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Armazenamento",
    subtopic: "SSD",
    difficulty: "iniciante",
    type: "true-false",

    statement:
      "Um SSD pode ser utilizado para armazenar arquivos e também um sistema operacional.",

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
      "SSDs são dispositivos de armazenamento de uso geral e podem armazenar sistemas operacionais, programas e arquivos pessoais.",

    alternativeExplanations: {
      V: "Correto. Um SSD pode ser utilizado como unidade principal de armazenamento.",
      F: "Incorreto. Sistemas operacionais podem ser instalados normalmente em SSDs.",
    },

    tags: [
      "ssd",
      "armazenamento",
      "sistema-operacional",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "info-029",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Antivírus",
    difficulty: "medio",
    type: "true-false",

    statement:
      "A instalação de um antivírus garante proteção absoluta contra qualquer ameaça digital existente.",

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
      "Antivírus pode ser uma camada importante de proteção, mas nenhum produto oferece garantia absoluta contra todas as ameaças. Segurança depende de múltiplas medidas e boas práticas.",

    alternativeExplanations: {
      V: "Incorreto. Nenhuma ferramenta isolada elimina todos os riscos.",
      F: "Correto. Antivírus é apenas uma das camadas possíveis de proteção.",
    },

    tags: [
      "seguranca",
      "antivirus",
      "defesa-em-camadas",
    ],
  },

  {
    id: "info-030",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "Roteador",
    difficulty: "medio",
    type: "true-false",

    statement:
      "Um roteador pode encaminhar tráfego entre redes diferentes.",

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
      "Roteadores analisam informações de rede e encaminham pacotes entre redes de acordo com suas tabelas e regras de roteamento.",

    alternativeExplanations: {
      V: "Correto. O encaminhamento entre redes é uma função típica de roteadores.",
      F: "Incorreto. Essa é justamente uma das funções fundamentais de um roteador.",
    },

    tags: [
      "redes",
      "roteador",
      "roteamento",
    ],
  },

  {
    id: "info-031",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Backup",
    subtopic: "Sincronização",
    difficulty: "medio",
    type: "true-false",

    statement:
      "Sincronizar automaticamente uma pasta com um serviço em nuvem é sempre equivalente a manter um backup independente e imutável dessa pasta.",

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
      "Sincronização e backup não são necessariamente equivalentes. Alterações ou exclusões podem ser propagadas entre dispositivos, enquanto um backup adequado busca manter cópias recuperáveis de versões dos dados.",

    alternativeExplanations: {
      V: "Incorreto. Um serviço de sincronização pode propagar alterações indesejadas ou exclusões.",
      F: "Correto. Backup e sincronização atendem a objetivos relacionados, mas não idênticos.",
    },

    tags: [
      "backup",
      "sincronizacao",
      "nuvem",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "info-032",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "TCP",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "O TCP possui mecanismos para detectar perda de segmentos e solicitar ou realizar retransmissões conforme necessário.",

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
      "O TCP utiliza mecanismos como números de sequência, confirmações e retransmissões para oferecer entrega confiável do fluxo de dados.",

    alternativeExplanations: {
      V: "Correto. Retransmissões fazem parte dos mecanismos de confiabilidade do TCP.",
      F: "Incorreto. O TCP foi projetado para tratar perdas e outros problemas de transmissão.",
    },

    tags: [
      "tcp",
      "redes",
      "retransmissao",
    ],
  },

  {
    id: "info-033",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Hash",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "Uma função hash criptográfica é equivalente à criptografia reversível e sempre permite recuperar diretamente o conteúdo original.",

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
      "Funções hash criptográficas são projetadas como transformações unidirecionais. Elas não são equivalentes à criptografia reversível.",

    alternativeExplanations: {
      V: "Incorreto. Hash e criptografia reversível são conceitos diferentes.",
      F: "Correto. Um hash criptográfico não foi projetado para permitir recuperação direta da entrada.",
    },

    tags: [
      "hash",
      "criptografia",
      "seguranca",
    ],
  },

  {
    id: "info-034",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Virtualização",
    subtopic: "Isolamento",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "Diferentes máquinas virtuais podem executar sistemas operacionais distintos sobre o mesmo hardware físico, desde que a plataforma de virtualização ofereça suporte.",

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
      "A virtualização permite criar ambientes independentes que compartilham recursos físicos e podem executar sistemas operacionais diferentes, dentro das limitações da plataforma.",

    alternativeExplanations: {
      V: "Correto. Essa é uma das aplicações comuns da virtualização.",
      F: "Incorreto. Sistemas convidados diferentes podem coexistir em máquinas virtuais separadas.",
    },

    tags: [
      "virtualizacao",
      "maquina-virtual",
      "isolamento",
    ],
  },

  {
    id: "info-035",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Privilégio mínimo",
    difficulty: "avancado",
    type: "true-false",

    statement:
      "O princípio do menor privilégio recomenda conceder a cada usuário ou processo apenas as permissões necessárias para desempenhar sua função.",

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
      "O princípio do menor privilégio busca limitar permissões ao mínimo necessário, reduzindo o impacto potencial de erros, abusos ou comprometimentos.",

    alternativeExplanations: {
      V: "Correto. Esse é o objetivo central do princípio do menor privilégio.",
      F: "Incorreto. O princípio recomenda justamente evitar permissões desnecessárias.",
    },

    tags: [
      "seguranca",
      "menor-privilegio",
      "permissoes",
    ],
  },
];