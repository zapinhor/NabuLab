import { Question } from "@/types/question";

export const homeostaseQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "homeo-001",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Conceitos fundamentais",
    subtopic: "Definição de homeostase",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual alternativa define melhor o conceito de homeostase?",

    alternatives: [
      {
        id: "A",
        text: "Manutenção absoluta e imutável de todas as condições do organismo",
      },
      {
        id: "B",
        text: "Manutenção dinâmica do meio interno dentro de faixas compatíveis com o funcionamento adequado do organismo",
      },
      {
        id: "C",
        text: "Capacidade do organismo de impedir qualquer alteração fisiológica",
      },
      {
        id: "D",
        text: "Produção constante de energia pelas células",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Homeostase corresponde à manutenção dinâmica das condições internas dentro de faixas adequadas. As variáveis fisiológicas podem oscilar, mas são continuamente reguladas.",

    alternativeExplanations: {
      A: "As condições internas não permanecem absolutamente fixas.",
      B: "Correto. A homeostase envolve equilíbrio dinâmico.",
      C: "Alterações fisiológicas acontecem constantemente e fazem parte da regulação.",
      D: "Produção de energia celular é importante, mas não define homeostase.",
    },

    tags: ["homeostase", "meio-interno", "equilibrio"],
  },

  {
    id: "homeo-002",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle homeostático",
    subtopic: "Receptor",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Em um sistema de controle homeostático, qual é a principal função do receptor?",

    alternatives: [
      {
        id: "A",
        text: "Executar diretamente a resposta final",
      },
      {
        id: "B",
        text: "Detectar alterações em determinada variável fisiológica",
      },
      {
        id: "C",
        text: "Produzir ATP para o organismo",
      },
      {
        id: "D",
        text: "Impedir qualquer mudança no meio interno",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O receptor ou sensor detecta alterações da variável controlada e envia informações para um centro integrador.",

    alternativeExplanations: {
      A: "A execução da resposta geralmente cabe ao efetor.",
      B: "Correto. O receptor identifica alterações.",
      C: "Produção de ATP é uma função metabólica celular.",
      D: "O organismo não impede todas as mudanças; ele responde a elas.",
    },

    tags: ["receptor", "sensor", "controle-homeostatico"],
  },

  {
    id: "homeo-003",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle homeostático",
    subtopic: "Efetor",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é a função de um efetor em um mecanismo homeostático?",

    alternatives: [
      {
        id: "A",
        text: "Detectar exclusivamente a alteração inicial",
      },
      {
        id: "B",
        text: "Executar uma resposta determinada pelo sistema de controle",
      },
      {
        id: "C",
        text: "Determinar o código genético da célula",
      },
      {
        id: "D",
        text: "Produzir exclusivamente hormônios",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O efetor recebe um comando e produz uma resposta capaz de modificar a variável fisiológica controlada.",

    alternativeExplanations: {
      A: "A detecção inicial é função do receptor.",
      B: "Correto. O efetor executa a resposta.",
      C: "O código genético está relacionado ao DNA.",
      D: "Efetores podem ser músculos, glândulas e outros tecidos.",
    },

    tags: ["efetor", "controle-homeostatico", "resposta"],
  },

  {
    id: "homeo-004",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Feedback",
    subtopic: "Feedback negativo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "No feedback negativo, a resposta produzida pelo organismo geralmente:",

    alternatives: [
      {
        id: "A",
        text: "Amplifica indefinidamente o estímulo inicial",
      },
      {
        id: "B",
        text: "Tende a reduzir ou contrariar a alteração inicial",
      },
      {
        id: "C",
        text: "Desliga permanentemente o sistema fisiológico",
      },
      {
        id: "D",
        text: "Impede o funcionamento dos receptores",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O feedback negativo produz respostas que reduzem o desvio da variável em relação à faixa desejada.",

    alternativeExplanations: {
      A: "Essa característica está mais associada ao feedback positivo.",
      B: "Correto. É o mecanismo predominante na manutenção da homeostase.",
      C: "O sistema não é permanentemente desligado.",
      D: "Receptores continuam participando do processo regulatório.",
    },

    tags: ["feedback-negativo", "regulacao", "homeostase"],
  },

  {
    id: "homeo-005",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Feedback",
    subtopic: "Feedback positivo",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual dos seguintes processos é um exemplo clássico de feedback positivo?",

    alternatives: [
      {
        id: "A",
        text: "Regulação da temperatura corporal",
      },
      {
        id: "B",
        text: "Controle habitual da glicemia",
      },
      {
        id: "C",
        text: "Amplificação das contrações uterinas durante determinadas fases do parto",
      },
      {
        id: "D",
        text: "Regulação cotidiana da pressão arterial",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Durante o parto, determinados sinais hormonais podem intensificar as contrações, que por sua vez estimulam ainda mais o processo até que o evento seja concluído.",

    alternativeExplanations: {
      A: "A termorregulação utiliza principalmente feedback negativo.",
      B: "A glicemia é predominantemente controlada por mecanismos de feedback negativo.",
      C: "Correto. É um exemplo clássico de amplificação progressiva.",
      D: "O controle da pressão arterial utiliza predominantemente feedback negativo.",
    },

    tags: ["feedback-positivo", "parto", "regulacao"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "homeo-006",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Termorregulação",
    subtopic: "Feedback negativo",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Durante exercício intenso, a temperatura corporal aumenta. O organismo aumenta a sudorese e a vasodilatação cutânea. Esse mecanismo representa:",

    alternatives: [
      {
        id: "A",
        text: "Feedback positivo",
      },
      {
        id: "B",
        text: "Feedback negativo",
      },
      {
        id: "C",
        text: "Ausência de homeostase",
      },
      {
        id: "D",
        text: "Transporte ativo primário",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A elevação da temperatura desencadeia respostas que aumentam a perda de calor e se opõem à alteração inicial.",

    alternativeExplanations: {
      A: "Feedback positivo aumentaria ainda mais a alteração inicial.",
      B: "Correto. A resposta atua contra o aumento da temperatura.",
      C: "Trata-se justamente de um mecanismo homeostático.",
      D: "Transporte ativo primário é um mecanismo de transporte de membrana.",
    },

    tags: ["temperatura", "termorregulacao", "feedback-negativo"],
  },

  {
    id: "homeo-007",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle homeostático",
    subtopic: "Centro integrador",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual descrição corresponde melhor à função de um centro integrador?",

    alternatives: [
      {
        id: "A",
        text: "Apenas detectar uma alteração no ambiente",
      },
      {
        id: "B",
        text: "Receber informações, processá-las e coordenar uma resposta",
      },
      {
        id: "C",
        text: "Executar necessariamente uma contração muscular",
      },
      {
        id: "D",
        text: "Transportar oxigênio no sangue",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O centro integrador recebe informações provenientes dos sensores, processa essas informações e determina respostas apropriadas.",

    alternativeExplanations: {
      A: "A detecção é principalmente função dos receptores.",
      B: "Correto. Essa é a função integradora.",
      C: "A contração muscular pode ser realizada por um efetor, mas não define integração.",
      D: "O transporte de oxigênio depende principalmente da hemoglobina e do sistema circulatório.",
    },

    tags: ["centro-integrador", "controle", "fisiologia"],
  },

  {
    id: "homeo-008",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Meio interno",
    subtopic: "Variáveis fisiológicas",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Qual das alternativas contém apenas variáveis cuja regulação é importante para a homeostase?",

    alternatives: [
      {
        id: "A",
        text: "pH, temperatura, osmolaridade e glicemia",
      },
      {
        id: "B",
        text: "Altura, cor dos olhos, número de digitais e formato das orelhas",
      },
      {
        id: "C",
        text: "Tipo sanguíneo, cor dos cabelos e sexo cromossômico",
      },
      {
        id: "D",
        text: "Comprimento dos ossos, impressão digital e formato nasal",
      },
    ],

    correctAnswer: "A",

    explanation:
      "pH, temperatura, osmolaridade e concentração de glicose precisam ser regulados continuamente para preservar o funcionamento celular.",

    alternativeExplanations: {
      A: "Correto. Todas são importantes variáveis fisiológicas.",
      B: "Essas características não constituem variáveis homeostáticas continuamente reguladas.",
      C: "Essas características não representam o conjunto clássico de variáveis homeostáticas.",
      D: "Essas características anatômicas não são ajustadas continuamente pela homeostase.",
    },

    tags: ["meio-interno", "ph", "glicemia", "osmolaridade"],
  },

  {
    id: "homeo-009",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Glicemia",
    subtopic: "Regulação hormonal",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Após uma refeição rica em carboidratos, a glicemia aumenta. Em uma pessoa saudável, qual resposta tende a contribuir para sua redução?",

    alternatives: [
      {
        id: "A",
        text: "Aumento da ação da insulina",
      },
      {
        id: "B",
        text: "Bloqueio absoluto da entrada de glicose nas células",
      },
      {
        id: "C",
        text: "Interrupção completa do metabolismo celular",
      },
      {
        id: "D",
        text: "Aumento obrigatório e ilimitado da glicemia",
      },
    ],

    correctAnswer: "A",

    explanation:
      "O aumento da glicemia estimula mecanismos que incluem a secreção de insulina, favorecendo utilização e armazenamento de glicose em diversos tecidos.",

    alternativeExplanations: {
      A: "Correto. A insulina participa do controle da glicemia após refeições.",
      B: "A ação da insulina tende a facilitar o armazenamento e utilização da glicose.",
      C: "O metabolismo celular continua ativo.",
      D: "Em condições normais existem mecanismos regulatórios que limitam essa elevação.",
    },

    tags: ["glicemia", "insulina", "feedback-negativo"],
  },

  {
    id: "homeo-010",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Set point",
    subtopic: "Faixa fisiológica",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Sobre o conceito de set point em fisiologia, qual afirmação é mais adequada?",

    alternatives: [
      {
        id: "A",
        text: "Toda variável fisiológica permanece em um único número absolutamente fixo",
      },
      {
        id: "B",
        text: "Variáveis podem apresentar faixas e oscilações fisiológicas ao longo do tempo",
      },
      {
        id: "C",
        text: "Qualquer pequena alteração significa necessariamente doença",
      },
      {
        id: "D",
        text: "Set points não sofrem influência de ritmos biológicos",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A homeostase é dinâmica. Muitas variáveis oscilam dentro de faixas fisiológicas e podem sofrer influência de ritmos circadianos, exercício, alimentação e outros fatores.",

    alternativeExplanations: {
      A: "As variáveis não precisam permanecer em um número absolutamente constante.",
      B: "Correto. O controle fisiológico permite variações dentro de determinadas faixas.",
      C: "Variações fisiológicas podem ser completamente normais.",
      D: "Diversas variáveis apresentam ritmos biológicos.",
    },

    tags: ["set-point", "faixa-fisiologica", "ritmo-circadiano"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "homeo-011",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Controle fisiológico",
    subtopic: "Sequência do feedback",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Qual sequência representa corretamente um sistema homeostático clássico?",

    alternatives: [
      {
        id: "A",
        text: "Efetor → receptor → resposta → centro integrador",
      },
      {
        id: "B",
        text: "Alteração → receptor → centro integrador → efetor → resposta",
      },
      {
        id: "C",
        text: "Centro integrador → alteração → receptor → ausência de resposta",
      },
      {
        id: "D",
        text: "Resposta → efetor → receptor → estímulo",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Uma alteração da variável é detectada por receptores. A informação é processada por um centro integrador, que envia comandos para efetores responsáveis pela resposta.",

    alternativeExplanations: {
      A: "A sequência dos componentes está incorreta.",
      B: "Correto. Essa é a sequência conceitual clássica.",
      C: "O centro integrador normalmente recebe informação após a detecção.",
      D: "A sequência está invertida.",
    },

    tags: ["feedback", "receptor", "integrador", "efetor"],
  },

  {
    id: "homeo-012",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Homeostase integrada",
    subtopic: "Exercício físico",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Durante exercício físico, frequência cardíaca, ventilação e produção de calor aumentam. Por que isso não representa necessariamente perda de homeostase?",

    alternatives: [
      {
        id: "A",
        text: "Porque homeostase significa ausência completa de mudanças fisiológicas",
      },
      {
        id: "B",
        text: "Porque respostas fisiológicas podem mudar para manter condições internas adequadas diante de uma nova demanda",
      },
      {
        id: "C",
        text: "Porque o exercício interrompe temporariamente todos os mecanismos homeostáticos",
      },
      {
        id: "D",
        text: "Porque apenas a temperatura corporal participa da homeostase",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A homeostase é dinâmica. Durante o exercício, diversos sistemas alteram sua atividade justamente para atender à maior demanda metabólica e preservar variáveis essenciais.",

    alternativeExplanations: {
      A: "Homeostase não significa ausência de alterações.",
      B: "Correto. As mudanças podem fazer parte da manutenção do equilíbrio interno.",
      C: "Os mecanismos regulatórios tornam-se intensamente ativos durante o exercício.",
      D: "Muitas variáveis são reguladas simultaneamente.",
    },

    tags: ["exercicio", "homeostase", "integracao"],
  },

  {
    id: "homeo-013",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Feedback positivo",
    subtopic: "Limitação do processo",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Por que mecanismos de feedback positivo geralmente necessitam de um evento que encerre o processo?",

    alternatives: [
      {
        id: "A",
        text: "Porque o feedback positivo tende a amplificar progressivamente a alteração inicial",
      },
      {
        id: "B",
        text: "Porque o feedback positivo sempre reduz a variável ao valor inicial",
      },
      {
        id: "C",
        text: "Porque nenhum efetor participa de feedback positivo",
      },
      {
        id: "D",
        text: "Porque feedback positivo impede completamente a comunicação celular",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Como o feedback positivo reforça o processo que o iniciou, algum evento finalizador geralmente é necessário para interromper a amplificação.",

    alternativeExplanations: {
      A: "Correto. Essa amplificação é a característica essencial do feedback positivo.",
      B: "Essa característica descreve melhor o feedback negativo.",
      C: "Efetores podem participar normalmente.",
      D: "Comunicação celular frequentemente participa desses mecanismos.",
    },

    tags: ["feedback-positivo", "amplificacao", "regulacao"],
  },

  {
    id: "homeo-014",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Integração fisiológica",
    subtopic: "Equilíbrio ácido-base",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Um aumento persistente da concentração de íons H+ no meio interno tende a produzir qual alteração direta no pH?",

    alternatives: [
      {
        id: "A",
        text: "Aumento do pH",
      },
      {
        id: "B",
        text: "Redução do pH",
      },
      {
        id: "C",
        text: "Nenhuma alteração no pH",
      },
      {
        id: "D",
        text: "O pH torna-se sempre igual a 7",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Como pH = -log[H+], o aumento da concentração de H+ provoca redução do pH.",

    alternativeExplanations: {
      A: "Maior concentração de H+ reduz, e não aumenta, o pH.",
      B: "Correto. Quanto maior [H+], menor o pH.",
      C: "A concentração de H+ está diretamente relacionada ao valor do pH.",
      D: "O pH não é automaticamente ajustado para exatamente 7.",
    },

    tags: ["ph", "hidrogenio", "acido-base"],
  },

  {
    id: "homeo-015",
    area: "Fisiologia Humana",
    subject: "homeostase",
    subjectName: "Homeostase",
    topic: "Integração fisiológica",
    subtopic: "Falha homeostática",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Se um receptor responsável por detectar uma variável fisiológica deixar de funcionar adequadamente, qual consequência é mais plausível?",

    alternatives: [
      {
        id: "A",
        text: "O sistema pode ter dificuldade para detectar desvios e iniciar respostas regulatórias adequadas",
      },
      {
        id: "B",
        text: "A variável será obrigatoriamente mantida de forma ainda mais precisa",
      },
      {
        id: "C",
        text: "Todos os outros sistemas fisiológicos deixam imediatamente de funcionar",
      },
      {
        id: "D",
        text: "O efetor passa automaticamente a funcionar como receptor perfeito",
      },
    ],

    correctAnswer: "A",

    explanation:
      "Sem detecção adequada da alteração, o centro integrador pode receber informações insuficientes ou incorretas, prejudicando a resposta homeostática.",

    alternativeExplanations: {
      A: "Correto. A detecção é uma etapa fundamental do controle.",
      B: "Uma falha sensorial tende a prejudicar, e não melhorar, o controle.",
      C: "Uma falha específica não implica colapso imediato de todos os sistemas.",
      D: "Efetores e receptores possuem funções diferentes.",
    },

    tags: ["receptor", "falha-homeostatica", "controle"],
  },
];