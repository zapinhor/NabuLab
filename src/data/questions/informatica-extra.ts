import type {
  Question,
} from "@/types/question";

export const informaticaExtraQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "info-016",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Hardware",
    subtopic: "Dispositivos de entrada",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual dos dispositivos abaixo é utilizado principalmente para entrada de dados em um computador?",

    alternatives: [
      {
        id: "A",
        text: "Monitor",
      },
      {
        id: "B",
        text: "Teclado",
      },
      {
        id: "C",
        text: "Projetor",
      },
      {
        id: "D",
        text: "Caixa de som",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O teclado permite que o usuário envie informações e comandos ao computador, sendo classificado principalmente como dispositivo de entrada.",

    alternativeExplanations: {
      A: "O monitor é principalmente um dispositivo de saída.",
      B: "Correto. O teclado é utilizado para entrada de dados e comandos.",
      C: "O projetor é utilizado principalmente para saída visual.",
      D: "A caixa de som é um dispositivo de saída de áudio.",
    },

    tags: [
      "hardware",
      "entrada",
      "teclado",
    ],
  },

  {
    id: "info-017",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Arquivos",
    subtopic: "Extensões",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual extensão é comumente associada a documentos no formato Portable Document Format?",

    alternatives: [
      {
        id: "A",
        text: ".mp3",
      },
      {
        id: "B",
        text: ".jpg",
      },
      {
        id: "C",
        text: ".pdf",
      },
      {
        id: "D",
        text: ".exe",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A extensão .pdf é utilizada para arquivos no formato Portable Document Format.",

    alternativeExplanations: {
      A: ".mp3 é associado principalmente a áudio comprimido.",
      B: ".jpg é associado principalmente a imagens.",
      C: "Correto. Documentos PDF normalmente utilizam a extensão .pdf.",
      D: ".exe é uma extensão comum de arquivos executáveis no Windows.",
    },

    tags: [
      "arquivos",
      "pdf",
      "extensoes",
    ],
  },

  {
    id: "info-018",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Armazenamento",
    subtopic: "SSD",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual afirmação descreve corretamente um SSD moderno típico?",

    alternatives: [
      {
        id: "A",
        text: "Utiliza memória não volátil para armazenar dados",
      },
      {
        id: "B",
        text: "Perde obrigatoriamente todos os dados quando o computador é desligado",
      },
      {
        id: "C",
        text: "É utilizado exclusivamente como memória RAM",
      },
      {
        id: "D",
        text: "Não pode armazenar sistemas operacionais",
      },
    ],

    correctAnswer: "A",

    explanation:
      "SSDs utilizam memória não volátil, permitindo manter os dados armazenados mesmo quando a alimentação elétrica é interrompida.",

    alternativeExplanations: {
      A: "Correto. SSDs mantêm os dados sem necessidade de energia contínua.",
      B: "Essa característica está associada à memória volátil, como RAM.",
      C: "SSD e RAM possuem funções diferentes.",
      D: "SSDs podem armazenar sistemas operacionais normalmente.",
    },

    tags: [
      "ssd",
      "armazenamento",
      "memoria-nao-volatil",
    ],
  },

  {
    id: "info-019",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Internet",
    subtopic: "URL",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Na Web, para que uma URL é utilizada?",

    alternatives: [
      {
        id: "A",
        text: "Para indicar a localização ou identificação de um recurso acessível por determinado esquema",
      },
      {
        id: "B",
        text: "Para medir fisicamente a velocidade do processador",
      },
      {
        id: "C",
        text: "Para aumentar automaticamente a memória RAM",
      },
      {
        id: "D",
        text: "Para substituir permanentemente o sistema operacional",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Uma URL identifica a localização ou forma de acesso a um recurso, utilizando componentes como esquema, domínio e caminho.",

    alternativeExplanations: {
      A: "Correto. URLs são utilizadas para identificar recursos e como acessá-los.",
      B: "URLs não medem desempenho de processadores.",
      C: "URLs não modificam a quantidade de memória RAM.",
      D: "URLs não substituem sistemas operacionais.",
    },

    tags: [
      "internet",
      "url",
      "web",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "info-020",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Planilhas eletrônicas",
    subtopic: "Referência absoluta",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em uma planilha, qual referência representa normalmente uma referência absoluta à célula A1?",

    alternatives: [
      {
        id: "A",
        text: "A1",
      },
      {
        id: "B",
        text: "$A$1",
      },
      {
        id: "C",
        text: "A$",
      },
      {
        id: "D",
        text: "$1A",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Na notação comum de planilhas, $A$1 fixa tanto a coluna A quanto a linha 1 ao copiar uma fórmula.",

    alternativeExplanations: {
      A: "A1 é uma referência relativa comum.",
      B: "Correto. Os dois sinais de cifrão tornam coluna e linha absolutas.",
      C: "Essa não é uma referência válida completa.",
      D: "Essa ordem não corresponde à sintaxe normal de uma referência de célula.",
    },

    tags: [
      "planilhas",
      "referencia-absoluta",
      "formula",
    ],
  },

  {
    id: "info-021",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Ransomware",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual descrição caracteriza melhor um ransomware?",

    alternatives: [
      {
        id: "A",
        text: "Um software destinado apenas a organizar documentos",
      },
      {
        id: "B",
        text: "Um tipo de malware que pode impedir o acesso a dados e exigir pagamento para restaurá-lo",
      },
      {
        id: "C",
        text: "Um protocolo utilizado exclusivamente para impressão",
      },
      {
        id: "D",
        text: "Um dispositivo físico de armazenamento",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Ransomware é uma categoria de malware que pode criptografar arquivos ou bloquear sistemas e exigir pagamento da vítima para suposta recuperação do acesso.",

    alternativeExplanations: {
      A: "Ransomware não é um software legítimo de organização de documentos.",
      B: "Correto. O bloqueio ou criptografia de dados com exigência de resgate é característico desse tipo de ameaça.",
      C: "Ransomware não é um protocolo de impressão.",
      D: "Trata-se de software malicioso, e não de um dispositivo físico.",
    },

    tags: [
      "seguranca",
      "ransomware",
      "malware",
    ],
  },

  {
    id: "info-022",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Autenticação multifator",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é a principal ideia da autenticação multifator?",

    alternatives: [
      {
        id: "A",
        text: "Utilizar mais de um fator de categorias diferentes para confirmar a identidade",
      },
      {
        id: "B",
        text: "Utilizar a mesma senha duas vezes consecutivas",
      },
      {
        id: "C",
        text: "Remover todas as etapas de autenticação",
      },
      {
        id: "D",
        text: "Permitir acesso sem qualquer comprovação de identidade",
      },
    ],

    correctAnswer: "A",

    explanation:
      "A autenticação multifator combina fatores de categorias distintas, como algo que o usuário sabe, possui ou é, reduzindo a dependência de uma única credencial.",

    alternativeExplanations: {
      A: "Correto. A combinação de fatores distintos é o princípio da autenticação multifator.",
      B: "Repetir a mesma senha não cria fatores diferentes.",
      C: "O objetivo é reforçar, e não remover, a autenticação.",
      D: "Acesso sem verificação é o oposto do conceito.",
    },

    tags: [
      "seguranca",
      "mfa",
      "autenticacao",
    ],
  },

  {
    id: "info-023",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "Endereços privados IPv4",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual endereço pertence a uma faixa reservada para uso privado em IPv4?",

    alternatives: [
      {
        id: "A",
        text: "8.8.8.8",
      },
      {
        id: "B",
        text: "1.1.1.1",
      },
      {
        id: "C",
        text: "192.168.1.10",
      },
      {
        id: "D",
        text: "203.0.113.10",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A faixa 192.168.0.0/16 é uma das faixas reservadas para redes IPv4 privadas.",

    alternativeExplanations: {
      A: "8.8.8.8 é um endereço publicamente roteável utilizado por um serviço DNS.",
      B: "1.1.1.1 também é um endereço público.",
      C: "Correto. 192.168.1.10 pertence à faixa privada 192.168.0.0/16.",
      D: "203.0.113.0/24 é reservado para documentação e exemplos, não é uma das faixas privadas RFC 1918.",
    },

    tags: [
      "ipv4",
      "rede-privada",
      "enderecamento",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "info-024",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Criptografia assimétrica",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual conceito está associado à criptografia assimétrica?",

    alternatives: [
      {
        id: "A",
        text: "Uso de um par de chaves matematicamente relacionado, normalmente uma pública e uma privada",
      },
      {
        id: "B",
        text: "Obrigatoriedade de utilizar a mesma senha como única chave em todas as situações",
      },
      {
        id: "C",
        text: "Ausência completa de qualquer chave criptográfica",
      },
      {
        id: "D",
        text: "Armazenamento de todos os dados exclusivamente em texto simples",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Sistemas de criptografia assimétrica utilizam um par de chaves relacionadas matematicamente, permitindo diferentes operações com a chave pública e a chave privada.",

    alternativeExplanations: {
      A: "Correto. O par de chaves é uma característica essencial da criptografia assimétrica.",
      B: "Essa descrição não representa criptografia assimétrica.",
      C: "Criptografia assimétrica depende de chaves.",
      D: "Texto simples sem proteção não representa criptografia.",
    },

    tags: [
      "criptografia",
      "chave-publica",
      "chave-privada",
    ],
  },

  {
    id: "info-025",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança de aplicações",
    subtopic: "Consultas parametrizadas",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual prática é amplamente recomendada para reduzir o risco de injeção de SQL ao utilizar dados fornecidos por usuários em consultas a bancos relacionais?",

    alternatives: [
      {
        id: "A",
        text: "Concatenar diretamente todo texto informado pelo usuário à consulta",
      },
      {
        id: "B",
        text: "Utilizar consultas parametrizadas ou mecanismos equivalentes oferecidos pela biblioteca de acesso ao banco",
      },
      {
        id: "C",
        text: "Remover toda autenticação da aplicação",
      },
      {
        id: "D",
        text: "Armazenar todas as senhas em texto simples",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Consultas parametrizadas separam a estrutura da consulta dos valores fornecidos externamente, reduzindo o risco de esses valores serem interpretados como parte da instrução SQL.",

    alternativeExplanations: {
      A: "A concatenação direta de entrada não confiável aumenta riscos de injeção.",
      B: "Correto. Parametrização é uma medida fundamental de proteção contra injeção de SQL.",
      C: "Remover autenticação reduz a segurança e não corrige o problema.",
      D: "Armazenar senhas em texto simples cria outro problema grave de segurança.",
    },

    tags: [
      "sql",
      "seguranca",
      "consultas-parametrizadas",
    ],
  },
];