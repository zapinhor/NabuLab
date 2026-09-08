import { Question } from "@/types/question";

export const respiratorioQuestions: Question[] = [
  // =========================================================
  // INICIANTE
  // =========================================================

  {
    id: "resp-001",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Vias respiratórias",
    subtopic: "Zona de condução",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual estrutura representa o final da zona de condução do sistema respiratório?",

    alternatives: [
      {
        id: "A",
        text: "Alvéolos",
      },
      {
        id: "B",
        text: "Bronquíolos terminais",
      },
      {
        id: "C",
        text: "Bronquíolos respiratórios",
      },
      {
        id: "D",
        text: "Ductos alveolares",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Os bronquíolos terminais representam a porção final da zona de condução. A zona respiratória começa nos bronquíolos respiratórios.",

    alternativeExplanations: {
      A: "Os alvéolos pertencem à zona respiratória e realizam trocas gasosas.",
      B: "Correto. Os bronquíolos terminais marcam o final da zona de condução.",
      C: "Os bronquíolos respiratórios já fazem parte da zona respiratória.",
      D: "Os ductos alveolares pertencem à zona respiratória.",
    },

    tags: ["vias-aereas", "zona-de-conducao", "bronquiolos"],
  },

  {
    id: "resp-002",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Pulmões",
    subtopic: "Lobos pulmonares",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Quantos lobos possui normalmente o pulmão direito humano?",

    alternatives: [
      {
        id: "A",
        text: "1",
      },
      {
        id: "B",
        text: "2",
      },
      {
        id: "C",
        text: "3",
      },
      {
        id: "D",
        text: "4",
      },
    ],

    correctAnswer: "C",

    explanation:
      "O pulmão direito possui três lobos: superior, médio e inferior. O pulmão esquerdo possui dois lobos: superior e inferior.",

    alternativeExplanations: {
      A: "O pulmão direito não possui apenas um lobo.",
      B: "Dois lobos correspondem normalmente ao pulmão esquerdo.",
      C: "Correto. O pulmão direito possui lobos superior, médio e inferior.",
      D: "O pulmão direito não apresenta quatro lobos.",
    },

    tags: ["pulmoes", "lobos", "anatomia"],
  },

  {
    id: "resp-003",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Alvéolos",
    subtopic: "Surfactante",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Qual é uma das principais funções do surfactante pulmonar?",

    alternatives: [
      {
        id: "A",
        text: "Aumentar a tensão superficial dos alvéolos",
      },
      {
        id: "B",
        text: "Reduzir a tensão superficial dos alvéolos",
      },
      {
        id: "C",
        text: "Produzir dióxido de carbono",
      },
      {
        id: "D",
        text: "Contrair diretamente o diafragma",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O surfactante diminui a tensão superficial na interface ar-líquido dos alvéolos, aumentando sua estabilidade e reduzindo o trabalho necessário para expandi-los.",

    alternativeExplanations: {
      A: "O surfactante faz justamente o contrário: reduz a tensão superficial.",
      B: "Correto. Essa é uma das principais funções fisiológicas do surfactante.",
      C: "O CO₂ é produzido principalmente pelo metabolismo celular.",
      D: "A contração do diafragma depende de ativação neuromuscular, não do surfactante.",
    },

    tags: ["alveolos", "surfactante", "tensao-superficial"],
  },

  {
    id: "resp-004",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Mecânica respiratória",
    subtopic: "Diafragma",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Durante uma inspiração tranquila, o que acontece com o diafragma?",

    alternatives: [
      {
        id: "A",
        text: "Relaxa e sobe",
      },
      {
        id: "B",
        text: "Contrai e desce",
      },
      {
        id: "C",
        text: "Permanece completamente imóvel",
      },
      {
        id: "D",
        text: "Contrai e sobe",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Durante a inspiração tranquila, o diafragma contrai e desce, aumentando o volume da cavidade torácica.",

    alternativeExplanations: {
      A: "Relaxamento e elevação do diafragma estão associados principalmente à expiração tranquila.",
      B: "Correto. A contração faz o diafragma descer.",
      C: "O diafragma é o principal músculo da inspiração tranquila.",
      D: "Ao contrair, o diafragma desce, e não sobe.",
    },

    tags: ["diafragma", "inspiracao", "mecanica-respiratoria"],
  },

  {
    id: "resp-005",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Trocas gasosas",
    subtopic: "Oxigênio",
    difficulty: "iniciante",
    type: "multiple-choice",

    statement:
      "Durante as trocas gasosas pulmonares normais, qual é o principal sentido de difusão do oxigênio?",

    alternatives: [
      {
        id: "A",
        text: "Do sangue para o alvéolo",
      },
      {
        id: "B",
        text: "Do alvéolo para o sangue",
      },
      {
        id: "C",
        text: "Do sangue para a traqueia",
      },
      {
        id: "D",
        text: "Dos brônquios diretamente para as hemácias",
      },
    ],

    correctAnswer: "B",

    explanation:
      "O oxigênio difunde-se dos alvéolos, onde sua pressão parcial é relativamente maior, para o sangue venoso pulmonar que apresenta menor pressão parcial de O₂.",

    alternativeExplanations: {
      A: "Esse não é o sentido predominante da difusão de O₂ no pulmão normal.",
      B: "Correto. O oxigênio passa do ar alveolar para o sangue.",
      C: "A traqueia pertence à zona de condução.",
      D: "As trocas relevantes ocorrem na região alveolocapilar, não diretamente nos brônquios.",
    },

    tags: ["oxigenio", "difusao", "trocas-gasosas"],
  },

  // =========================================================
  // MÉDIO
  // =========================================================

  {
    id: "resp-006",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação",
    subtopic: "Ventilação minuto",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Uma pessoa apresenta volume corrente de 500 mL e frequência respiratória de 12 incursões por minuto. Qual é sua ventilação minuto?",

    alternatives: [
      {
        id: "A",
        text: "500 mL/min",
      },
      {
        id: "B",
        text: "1.200 mL/min",
      },
      {
        id: "C",
        text: "6.000 mL/min",
      },
      {
        id: "D",
        text: "12.000 mL/min",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A ventilação minuto é calculada por VE = volume corrente × frequência respiratória. Assim: 500 mL × 12 = 6.000 mL/min, ou aproximadamente 6 L/min.",

    alternativeExplanations: {
      A: "Esse valor corresponde apenas ao volume corrente.",
      B: "O cálculo não corresponde à multiplicação correta.",
      C: "Correto. 500 × 12 = 6.000 mL/min.",
      D: "Esse resultado é duas vezes maior que o valor correto.",
    },

    tags: ["ventilacao-minuto", "volume-corrente", "frequencia-respiratoria"],
  },

  {
    id: "resp-007",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação",
    subtopic: "Espaço morto",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Por que uma respiração muito rápida e superficial pode produzir ventilação alveolar inadequada?",

    alternatives: [
      {
        id: "A",
        text: "Porque todo o ar inspirado permanece nos alvéolos",
      },
      {
        id: "B",
        text: "Porque uma proporção maior do volume corrente pode permanecer no espaço morto",
      },
      {
        id: "C",
        text: "Porque a frequência respiratória deixa de influenciar a ventilação",
      },
      {
        id: "D",
        text: "Porque os alvéolos deixam obrigatoriamente de receber sangue",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Quando o volume corrente é muito pequeno, uma parcela proporcionalmente maior de cada inspiração pode permanecer na zona de condução, reduzindo a quantidade de ar fresco que efetivamente chega aos alvéolos.",

    alternativeExplanations: {
      A: "A zona de condução contém espaço morto anatômico.",
      B: "Correto. Isso pode reduzir significativamente a ventilação alveolar.",
      C: "A frequência respiratória continua influenciando a ventilação.",
      D: "Respiração superficial não significa obrigatoriamente ausência de perfusão alveolar.",
    },

    tags: ["espaco-morto", "ventilacao-alveolar", "volume-corrente"],
  },

  {
    id: "resp-008",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Mecânica respiratória",
    subtopic: "Complacência pulmonar",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Um pulmão com baixa complacência apresenta qual característica?",

    alternatives: [
      {
        id: "A",
        text: "Expande-se facilmente com pequena alteração de pressão",
      },
      {
        id: "B",
        text: "Necessita de maior variação de pressão para produzir determinada expansão",
      },
      {
        id: "C",
        text: "Apresenta obrigatoriamente maior volume residual",
      },
      {
        id: "D",
        text: "Não possui recolhimento elástico",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Complacência representa a relação entre alteração de volume e alteração de pressão. Quando ela é baixa, o pulmão apresenta maior dificuldade para expandir.",

    alternativeExplanations: {
      A: "Essa descrição corresponde a maior complacência.",
      B: "Correto. Baixa complacência significa maior dificuldade de expansão.",
      C: "O volume residual não define diretamente a complacência.",
      D: "Baixa complacência não significa ausência de recolhimento elástico.",
    },

    tags: ["complacencia", "pressao", "volume", "mecanica-respiratoria"],
  },

  {
    id: "resp-009",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Trocas gasosas",
    subtopic: "Lei de Fick",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "De acordo com os princípios da difusão gasosa, qual alteração tende a REDUZIR a difusão de oxigênio pela membrana alveolocapilar?",

    alternatives: [
      {
        id: "A",
        text: "Aumento da área disponível para troca",
      },
      {
        id: "B",
        text: "Aumento do gradiente de pressão parcial",
      },
      {
        id: "C",
        text: "Aumento da espessura da membrana",
      },
      {
        id: "D",
        text: "Redução da distância de difusão",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A difusão diminui quando aumenta a espessura da barreira que o gás precisa atravessar. Esse princípio ajuda a compreender alterações observadas, por exemplo, em doenças intersticiais pulmonares.",

    alternativeExplanations: {
      A: "Maior área tende a favorecer a difusão.",
      B: "Maior gradiente de pressão tende a favorecer a difusão.",
      C: "Correto. Maior espessura dificulta a passagem do gás.",
      D: "Menor distância tende a facilitar a difusão.",
    },

    tags: ["lei-de-fick", "difusao", "membrana-alveolocapilar"],
  },

  {
    id: "resp-010",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Equilíbrio ácido-base",
    subtopic: "CO2 e pH",
    difficulty: "medio",
    type: "multiple-choice",

    statement:
      "Mantidas as demais condições, um aumento importante de CO₂ no sangue tende inicialmente a produzir qual alteração?",

    alternatives: [
      {
        id: "A",
        text: "Aumento do pH",
      },
      {
        id: "B",
        text: "Redução de H+",
      },
      {
        id: "C",
        text: "Redução do pH",
      },
      {
        id: "D",
        text: "Eliminação completa do bicarbonato",
      },
    ],

    correctAnswer: "C",

    explanation:
      "O aumento de CO₂ desloca o equilíbrio CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻, favorecendo aumento de H⁺ e, consequentemente, redução do pH.",

    alternativeExplanations: {
      A: "Mais CO₂ tende inicialmente a acidificar o meio.",
      B: "A tendência é aumento, não redução, da concentração de H⁺.",
      C: "Correto. Maior H⁺ significa menor pH.",
      D: "O bicarbonato não é completamente eliminado nesse processo.",
    },

    tags: ["co2", "ph", "acido-base", "bicarbonato"],
  },

  // =========================================================
  // AVANÇADO
  // =========================================================

  {
    id: "resp-011",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação e perfusão",
    subtopic: "Relação V/Q",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma região pulmonar está sendo normalmente ventilada, mas apresenta ausência praticamente completa de perfusão sanguínea. Qual conceito fisiológico melhor descreve essa situação?",

    alternatives: [
      {
        id: "A",
        text: "Shunt verdadeiro",
      },
      {
        id: "B",
        text: "Espaço morto alveolar",
      },
      {
        id: "C",
        text: "Hipoventilação global obrigatória",
      },
      {
        id: "D",
        text: "Redução da complacência por definição",
      },
    ],

    correctAnswer: "B",

    explanation:
      "Quando há ventilação de uma região alveolar sem perfusão adequada, essa ventilação não participa efetivamente das trocas gasosas e passa a contribuir para o espaço morto alveolar.",

    alternativeExplanations: {
      A: "Shunt refere-se ao extremo oposto: perfusão sem ventilação adequada.",
      B: "Correto. Há ar chegando, mas pouco ou nenhum sangue disponível para troca.",
      C: "O problema descrito é regional e perfusional, não necessariamente hipoventilação global.",
      D: "A complacência não é definida pela relação ventilação/perfusão.",
    },

    tags: ["vq", "espaco-morto", "perfusao", "ventilacao"],
  },

  {
    id: "resp-012",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação e perfusão",
    subtopic: "Shunt",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma unidade alveolar recebe fluxo sanguíneo, porém praticamente nenhum ar novo chega até ela. Do ponto de vista da relação V/Q, esse quadro tende para:",

    alternatives: [
      {
        id: "A",
        text: "V/Q muito elevado",
      },
      {
        id: "B",
        text: "V/Q próximo de infinito",
      },
      {
        id: "C",
        text: "V/Q próximo de zero",
      },
      {
        id: "D",
        text: "V/Q obrigatoriamente igual a 1",
      },
    ],

    correctAnswer: "C",

    explanation:
      "Quando ventilação tende a zero enquanto a perfusão permanece presente, a relação V/Q também tende a zero. Essa condição aproxima-se fisiologicamente de um shunt.",

    alternativeExplanations: {
      A: "V/Q elevado ocorre quando ventilação é relativamente maior que perfusão.",
      B: "A relação tende ao infinito quando a perfusão tende a zero.",
      C: "Correto. Ventilação próxima de zero com perfusão presente gera V/Q próximo de zero.",
      D: "Uma relação igual a 1 não corresponde ao cenário descrito.",
    },

    tags: ["vq", "shunt", "ventilacao", "perfusao"],
  },

  {
    id: "resp-013",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Mecânica respiratória",
    subtopic: "Resistência das vias aéreas",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Considerando de maneira simplificada a relação expressa pela lei de Poiseuille, se o raio de uma via aérea diminuir pela metade e as demais variáveis forem mantidas, a resistência ao fluxo tenderá a aumentar aproximadamente quantas vezes?",

    alternatives: [
      {
        id: "A",
        text: "2 vezes",
      },
      {
        id: "B",
        text: "4 vezes",
      },
      {
        id: "C",
        text: "8 vezes",
      },
      {
        id: "D",
        text: "16 vezes",
      },
    ],

    correctAnswer: "D",

    explanation:
      "Na relação simplificada de Poiseuille, a resistência é inversamente proporcional à quarta potência do raio: R ∝ 1/r⁴. Se o raio cai para metade, a resistência aumenta por um fator de 2⁴ = 16.",

    alternativeExplanations: {
      A: "A relação não é linear com o raio.",
      B: "Isso corresponderia a uma dependência quadrática, não à quarta potência.",
      C: "Ainda é menor que o aumento previsto pela quarta potência.",
      D: "Correto. 2 elevado à quarta potência é igual a 16.",
    },

    tags: ["poiseuille", "resistencia", "raio", "bronquios"],
  },

  {
    id: "resp-014",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Ventilação alveolar",
    subtopic: "Cálculo",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Uma pessoa apresenta volume corrente de 500 mL, espaço morto de 150 mL e frequência respiratória de 12 incursões por minuto. Qual é aproximadamente sua ventilação alveolar por minuto?",

    alternatives: [
      {
        id: "A",
        text: "1,8 L/min",
      },
      {
        id: "B",
        text: "3,5 L/min",
      },
      {
        id: "C",
        text: "4,2 L/min",
      },
      {
        id: "D",
        text: "6,0 L/min",
      },
    ],

    correctAnswer: "C",

    explanation:
      "A ventilação alveolar é calculada por VA = (VT - VD) × f. Assim: (500 - 150) × 12 = 350 × 12 = 4.200 mL/min, ou 4,2 L/min.",

    alternativeExplanations: {
      A: "Esse valor não corresponde ao cálculo da ventilação alveolar.",
      B: "350 mL corresponde ao volume alveolar por respiração, não por minuto.",
      C: "Correto. A ventilação alveolar é aproximadamente 4,2 L/min.",
      D: "6 L/min corresponde à ventilação minuto total nesse exemplo, sem descontar o espaço morto.",
    },

    tags: ["ventilacao-alveolar", "espaco-morto", "calculo"],
  },

  {
    id: "resp-015",
    area: "Anatomia Funcional",
    subject: "sistema-respiratorio",
    subjectName: "Sistema Respiratório",
    topic: "Equilíbrio ácido-base",
    subtopic: "Hipoventilação",
    difficulty: "avancado",
    type: "multiple-choice",

    statement:
      "Um paciente apresenta redução importante da ventilação alveolar e passa a reter CO₂. Sem considerar ainda compensação renal significativa, qual alteração ácido-base é mais esperada?",

    alternatives: [
      {
        id: "A",
        text: "Alcalose respiratória",
      },
      {
        id: "B",
        text: "Acidose respiratória",
      },
      {
        id: "C",
        text: "Alcalose metabólica",
      },
      {
        id: "D",
        text: "Acidose metabólica obrigatória",
      },
    ],

    correctAnswer: "B",

    explanation:
      "A hipoventilação alveolar reduz a eliminação de CO₂. O aumento de PaCO₂ favorece formação de H⁺ e queda do pH, caracterizando inicialmente acidose respiratória.",

    alternativeExplanations: {
      A: "Alcalose respiratória está tipicamente associada à redução excessiva de CO₂ por hiperventilação.",
      B: "Correto. Retenção de CO₂ é a base fisiológica da acidose respiratória.",
      C: "O distúrbio primário descrito é respiratório.",
      D: "Não há informação que determine acidose metabólica como distúrbio primário.",
    },

    tags: ["hipoventilacao", "co2", "acidose-respiratoria", "ph"],
  },
];