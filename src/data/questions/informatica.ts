import type {
  Question,
} from "@/types/question";

export const informaticaQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "info-001",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Hardware",
    subtopic: "Processador",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual componente é responsável por executar grande parte das instruções e cálculos de um computador?",

    alternatives: [
      {
        id: "A",
        text: "Processador",
      },
      {
        id: "B",
        text: "Monitor",
      },
      {
        id: "C",
        text: "Teclado",
      },
      {
        id: "D",
        text: "Gabinete",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O processador, ou CPU, executa instruções dos programas e realiza operações lógicas e aritméticas essenciais ao funcionamento do computador.",

    alternativeExplanations: {
      A: "Correto. A CPU executa instruções e realiza diversos cálculos.",
      B: "O monitor é um dispositivo de saída utilizado para exibir informações.",
      C: "O teclado é principalmente um dispositivo de entrada.",
      D: "O gabinete abriga componentes, mas não executa as instruções do sistema.",
    },

    tags: [
      "hardware",
      "cpu",
      "processador",
    ],
  },

  {
    id: "info-002",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Hardware",
    subtopic: "Memória RAM",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual característica descreve corretamente a memória RAM utilizada normalmente em computadores?",

    alternatives: [
      {
        id: "A",
        text: "Armazena dados permanentemente mesmo sem energia",
      },
      {
        id: "B",
        text: "É utilizada como memória temporária durante a execução de programas",
      },
      {
        id: "C",
        text: "Serve exclusivamente para armazenar arquivos de vídeo",
      },
      {
        id: "D",
        text: "Substitui completamente o processador",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A memória RAM mantém temporariamente dados e instruções utilizados pelos programas em execução. Em condições normais, seu conteúdo é perdido quando a alimentação elétrica é interrompida.",

    alternativeExplanations: {
      A: "Essa característica está associada a formas de armazenamento não volátil, como SSDs e discos rígidos.",
      B: "Correto. A RAM fornece armazenamento temporário de rápido acesso.",
      C: "A RAM pode armazenar temporariamente vários tipos de dados, não apenas vídeos.",
      D: "Memória RAM e processador possuem funções diferentes.",
    },

    tags: [
      "hardware",
      "memoria-ram",
      "memoria-volatil",
    ],
  },

  {
    id: "info-003",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Sistemas operacionais",
    subtopic: "Funções do sistema operacional",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é uma função típica de um sistema operacional?",

    alternatives: [
      {
        id: "A",
        text: "Fabricar fisicamente os componentes do computador",
      },
      {
        id: "B",
        text: "Gerenciar recursos de hardware e permitir a execução de programas",
      },
      {
        id: "C",
        text: "Substituir obrigatoriamente todos os aplicativos instalados",
      },
      {
        id: "D",
        text: "Converter qualquer computador em um servidor de internet automaticamente",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O sistema operacional gerencia recursos como memória, armazenamento, dispositivos e processos, além de oferecer uma plataforma para a execução de aplicativos.",

    alternativeExplanations: {
      A: "A fabricação física dos componentes não é função do sistema operacional.",
      B: "Correto. O gerenciamento dos recursos do computador é uma de suas funções centrais.",
      C: "O sistema operacional permite executar aplicativos, mas não os substitui obrigatoriamente.",
      D: "Instalar um sistema operacional não transforma automaticamente a máquina em um servidor.",
    },

    tags: [
      "sistema-operacional",
      "software",
      "recursos",
    ],
  },

  {
    id: "info-004",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Internet",
    subtopic: "Navegadores",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual dos itens abaixo é utilizado principalmente para acessar e visualizar páginas da Web?",

    alternatives: [
      {
        id: "A",
        text: "Navegador",
      },
      {
        id: "B",
        text: "Planilha eletrônica",
      },
      {
        id: "C",
        text: "Editor de imagens",
      },
      {
        id: "D",
        text: "Compactador de arquivos",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Um navegador Web interpreta e apresenta conteúdos de sites e aplicações acessados por meio da Web.",

    alternativeExplanations: {
      A: "Correto. Navegadores são utilizados para acessar páginas e aplicações Web.",
      B: "Planilhas eletrônicas são voltadas principalmente para dados tabulares e cálculos.",
      C: "Editores de imagens são utilizados para criação ou edição de conteúdo visual.",
      D: "Compactadores são utilizados para empacotar e, em alguns casos, reduzir o tamanho de arquivos.",
    },

    tags: [
      "internet",
      "web",
      "navegador",
    ],
  },

  {
    id: "info-005",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Senhas",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual prática tende a aumentar a segurança de uma senha?",

    alternatives: [
      {
        id: "A",
        text: "Utilizar a mesma senha em todos os serviços",
      },
      {
        id: "B",
        text: "Utilizar apenas o próprio nome",
      },
      {
        id: "C",
        text: "Criar uma senha longa e exclusiva para cada serviço",
      },
      {
        id: "D",
        text: "Compartilhar a senha com outras pessoas para evitar esquecê-la",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Senhas longas e exclusivas reduzem o impacto do comprometimento de uma conta e dificultam ataques baseados em tentativa ou reutilização de credenciais.",

    alternativeExplanations: {
      A: "Reutilizar senhas aumenta o risco de comprometimento de várias contas.",
      B: "Informações simples e previsíveis tendem a produzir senhas fracas.",
      C: "Correto. Comprimento e exclusividade são práticas importantes de segurança.",
      D: "Compartilhar credenciais aumenta o risco de acesso indevido.",
    },

    tags: [
      "seguranca",
      "senhas",
      "credenciais",
    ],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "info-006",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "Endereço IP",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em uma rede baseada no protocolo IP, qual é a principal finalidade de um endereço IP?",

    alternatives: [
      {
        id: "A",
        text: "Identificar logicamente uma interface na rede para permitir comunicação",
      },
      {
        id: "B",
        text: "Definir fisicamente o tamanho do monitor",
      },
      {
        id: "C",
        text: "Substituir qualquer tipo de senha",
      },
      {
        id: "D",
        text: "Determinar a capacidade do processador",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Um endereço IP identifica logicamente uma interface em uma rede IP e é utilizado no encaminhamento de dados entre dispositivos.",

    alternativeExplanations: {
      A: "Correto. Endereços IP participam da identificação e comunicação em redes IP.",
      B: "Resolução e tamanho de monitor não são definidos por endereço IP.",
      C: "Endereços IP não substituem mecanismos de autenticação.",
      D: "A capacidade do processador não é definida pelo endereço de rede.",
    },

    tags: [
      "redes",
      "ip",
      "enderecamento",
    ],
  },

  {
    id: "info-007",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Phishing",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual situação é mais característica de uma tentativa de phishing?",

    alternatives: [
      {
        id: "A",
        text: "Um sistema realiza automaticamente uma atualização legítima previamente configurada",
      },
      {
        id: "B",
        text: "Uma mensagem imita uma empresa conhecida e solicita que o usuário informe sua senha em um link suspeito",
      },
      {
        id: "C",
        text: "Um usuário salva um arquivo em seu próprio computador",
      },
      {
        id: "D",
        text: "Um computador é desligado normalmente pelo sistema operacional",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Phishing utiliza mensagens ou páginas fraudulentas para induzir a vítima a fornecer informações sensíveis, instalar conteúdo malicioso ou realizar ações indevidas.",

    alternativeExplanations: {
      A: "Uma atualização legítima não caracteriza phishing por si só.",
      B: "Correto. A imitação de uma organização para obter credenciais é um exemplo clássico de phishing.",
      C: "Salvar um arquivo localmente não caracteriza phishing.",
      D: "O desligamento normal de um computador não possui relação direta com phishing.",
    },

    tags: [
      "seguranca",
      "phishing",
      "engenharia-social",
    ],
  },

  {
    id: "info-008",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Planilhas eletrônicas",
    subtopic: "Fórmulas",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Em uma planilha eletrônica, qual é a finalidade principal de uma fórmula como =A1+B1?",

    alternatives: [
      {
        id: "A",
        text: "Apagar automaticamente as células A1 e B1",
      },
      {
        id: "B",
        text: "Somar os valores presentes nas células A1 e B1",
      },
      {
        id: "C",
        text: "Renomear a planilha",
      },
      {
        id: "D",
        text: "Bloquear permanentemente as duas células",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A fórmula referencia as células A1 e B1 e calcula a soma de seus valores.",

    alternativeExplanations: {
      A: "A fórmula não apaga o conteúdo das células referenciadas.",
      B: "Correto. O operador + realiza a soma dos valores.",
      C: "Renomear uma planilha não é feito por meio dessa fórmula.",
      D: "A fórmula não aplica bloqueio às células.",
    },

    tags: [
      "planilhas",
      "formula",
      "referencia-de-celula",
    ],
  },

  {
    id: "info-009",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Computação em nuvem",
    subtopic: "Armazenamento em nuvem",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual descrição representa melhor um serviço de armazenamento em nuvem?",

    alternatives: [
      {
        id: "A",
        text: "Um recurso que permite armazenar dados em infraestrutura remota acessível por rede",
      },
      {
        id: "B",
        text: "Um componente físico obrigatório localizado dentro do processador",
      },
      {
        id: "C",
        text: "Um tipo de teclado utilizado exclusivamente em servidores",
      },
      {
        id: "D",
        text: "Um formato de imagem sem qualquer relação com redes",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Serviços de armazenamento em nuvem permitem manter arquivos em infraestrutura remota disponibilizada por um provedor e acessá-los por meio de uma rede, conforme as permissões configuradas.",

    alternativeExplanations: {
      A: "Correto. Essa é uma característica típica do armazenamento em nuvem.",
      B: "Armazenamento em nuvem não é um componente físico interno da CPU.",
      C: "Não se trata de um tipo de teclado.",
      D: "O conceito não corresponde a um formato de imagem.",
    },

    tags: [
      "nuvem",
      "armazenamento",
      "cloud",
    ],
  },

  {
    id: "info-010",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Internet",
    subtopic: "HTTPS",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual é uma das principais vantagens do uso de HTTPS em comparação com HTTP sem proteção criptográfica?",

    alternatives: [
      {
        id: "A",
        text: "HTTPS garante que todo conteúdo disponível no site seja verdadeiro",
      },
      {
        id: "B",
        text: "HTTPS impede qualquer tipo de ataque contra o usuário",
      },
      {
        id: "C",
        text: "HTTPS utiliza proteção criptográfica para a comunicação entre cliente e servidor",
      },
      {
        id: "D",
        text: "HTTPS elimina a necessidade de autenticação em qualquer sistema",
      },
    ],

    correctAnswer: "C",

    explanation:
      "HTTPS utiliza TLS para proteger a comunicação, oferecendo propriedades como confidencialidade e integridade dos dados em trânsito e autenticação do servidor por certificado, dentro do modelo utilizado.",

    alternativeExplanations: {
      A: "HTTPS protege a conexão, mas não garante que todas as informações publicadas sejam verdadeiras.",
      B: "Nenhum protocolo de transporte impede todos os tipos de ataque.",
      C: "Correto. HTTPS protege os dados transmitidos por meio de TLS.",
      D: "HTTPS não substitui mecanismos de autenticação de usuários.",
    },

    tags: [
      "https",
      "tls",
      "seguranca",
      "internet",
    ],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "info-011",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "DNS",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual é uma função fundamental do DNS na Internet?",

    alternatives: [
      {
        id: "A",
        text: "Transformar automaticamente qualquer arquivo em página Web",
      },
      {
        id: "B",
        text: "Resolver nomes de domínio em informações como endereços IP",
      },
      {
        id: "C",
        text: "Substituir fisicamente roteadores de rede",
      },
      {
        id: "D",
        text: "Criptografar obrigatoriamente todos os arquivos de um computador",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O DNS é um sistema distribuído de nomes utilizado, entre outras funções, para associar nomes de domínio a registros que podem conter endereços IP.",

    alternativeExplanations: {
      A: "DNS não converte arquivos em páginas Web.",
      B: "Correto. A resolução de nomes é uma das funções centrais do DNS.",
      C: "DNS não substitui equipamentos de roteamento.",
      D: "DNS não é um sistema de criptografia de arquivos.",
    },

    tags: [
      "dns",
      "redes",
      "dominio",
    ],
  },

  {
    id: "info-012",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Redes",
    subtopic: "TCP e UDP",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual característica diferencia normalmente o TCP do UDP?",

    alternatives: [
      {
        id: "A",
        text: "O TCP oferece mecanismos de entrega confiável e ordenada, enquanto o UDP não garante essas propriedades por si só",
      },
      {
        id: "B",
        text: "O UDP sempre entrega todos os pacotes em ordem",
      },
      {
        id: "C",
        text: "O TCP funciona apenas dentro de uma única máquina",
      },
      {
        id: "D",
        text: "TCP e UDP são exatamente o mesmo protocolo com nomes diferentes",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O TCP fornece uma comunicação orientada à conexão com mecanismos de confirmação, retransmissão e ordenação. O UDP é mais simples e não oferece essas garantias no próprio protocolo.",

    alternativeExplanations: {
      A: "Correto. Essa é uma diferença importante entre os dois protocolos de transporte.",
      B: "O UDP não garante entrega nem ordenação por si só.",
      C: "TCP é utilizado em comunicação entre dispositivos por redes IP.",
      D: "São protocolos distintos da camada de transporte.",
    },

    tags: [
      "tcp",
      "udp",
      "protocolos",
      "redes",
    ],
  },

  {
    id: "info-013",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Segurança digital",
    subtopic: "Funções hash",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual afirmação descreve melhor uma função hash criptográfica adequada?",

    alternatives: [
      {
        id: "A",
        text: "Produz uma saída de tamanho definido a partir de dados de entrada e é projetada para dificultar a recuperação da entrada original",
      },
      {
        id: "B",
        text: "É utilizada exclusivamente para aumentar o tamanho de arquivos",
      },
      {
        id: "C",
        text: "Sempre permite reconstruir diretamente o conteúdo original a partir do hash",
      },
      {
        id: "D",
        text: "Só pode ser utilizada em arquivos de imagem",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Funções hash criptográficas produzem um resumo de tamanho definido e são projetadas para propriedades como resistência à preimagem e a colisões, dependendo do algoritmo.",

    alternativeExplanations: {
      A: "Correto. Essa descrição corresponde ao comportamento esperado de funções hash criptográficas modernas.",
      B: "A finalidade do hash não é aumentar arquivos.",
      C: "Uma função hash criptográfica não é projetada para ser diretamente reversível.",
      D: "Hashes podem ser aplicados a diferentes tipos de dados.",
    },

    tags: [
      "hash",
      "criptografia",
      "integridade",
    ],
  },

  {
    id: "info-014",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Backup",
    subtopic: "Estratégia 3-2-1",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Na estratégia de backup conhecida como 3-2-1, qual ideia é normalmente recomendada?",

    alternatives: [
      {
        id: "A",
        text: "Manter apenas uma única cópia de todos os dados",
      },
      {
        id: "B",
        text: "Manter três cópias dos dados, em dois tipos de mídia, com uma cópia em local separado",
      },
      {
        id: "C",
        text: "Excluir o arquivo original assim que o backup for criado",
      },
      {
        id: "D",
        text: "Manter todas as cópias obrigatoriamente no mesmo disco físico",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A regra 3-2-1 é uma referência comum para manter três cópias dos dados, utilizando dois tipos de armazenamento ou mídia, com uma cópia mantida separadamente do ambiente principal.",

    alternativeExplanations: {
      A: "Uma única cópia não oferece redundância adequada.",
      B: "Correto. Essa é a ideia central da regra 3-2-1.",
      C: "O backup deve complementar a proteção dos dados, não exigir a exclusão do original.",
      D: "Manter todas as cópias no mesmo disco reduz a proteção contra falhas desse dispositivo.",
    },

    tags: [
      "backup",
      "regra-3-2-1",
      "redundancia",
    ],
  },

  {
    id: "info-015",
    area: "Tecnologia",
    subject: "informatica",
    subjectName: "Informática",
    topic: "Virtualização",
    subtopic: "Máquinas virtuais",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual descrição representa melhor uma máquina virtual?",

    alternatives: [
      {
        id: "A",
        text: "Um equipamento físico que só pode executar um único programa",
      },
      {
        id: "B",
        text: "Um ambiente computacional virtualizado capaz de executar um sistema operacional de forma isolada em relação a outros ambientes",
      },
      {
        id: "C",
        text: "Um arquivo de texto que não pode executar software",
      },
      {
        id: "D",
        text: "Um dispositivo utilizado exclusivamente para imprimir documentos",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Uma máquina virtual fornece um ambiente computacional virtualizado que pode executar um sistema operacional e aplicações, utilizando recursos disponibilizados pelo sistema de virtualização.",

    alternativeExplanations: {
      A: "Uma máquina virtual não é definida como um equipamento físico de uso único.",
      B: "Correto. A virtualização permite criar ambientes computacionais isolados logicamente.",
      C: "Uma máquina virtual pode executar sistemas operacionais e programas.",
      D: "A definição não possui relação com dispositivos de impressão.",
    },

    tags: [
      "virtualizacao",
      "maquina-virtual",
      "sistema-operacional",
    ],
  },
];