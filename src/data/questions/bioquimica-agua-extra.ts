import type { Question } from "@/types/question";

export const bioquimicaAguaExtraQuestions: Question[] = [
  {
    id: "agua-016",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Estrutura da água",
    subtopic: "Geometria molecular",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Qual propriedade estrutural contribui para a polaridade da molécula de água?",
    alternatives: [
      {
        id: "A",
        text: "Sua geometria angular associada à diferença de eletronegatividade entre O e H.",
      },
      {
        id: "B",
        text: "A presença de átomos de carbono em sua estrutura.",
      },
      {
        id: "C",
        text: "A ausência completa de cargas parciais.",
      },
      {
        id: "D",
        text: "Sua geometria perfeitamente linear.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A geometria angular e a maior eletronegatividade do oxigênio produzem uma distribuição desigual de carga elétrica.",
    alternativeExplanations: {
      A: "Correto. Esses fatores produzem o dipolo da molécula.",
      B: "Incorreto. A água é formada por H₂O e não contém carbono.",
      C: "Incorreto. O oxigênio possui carga parcial negativa e os hidrogênios, parcial positiva.",
      D: "Incorreto. A molécula de água possui geometria angular.",
    },
    tags: [
      "polaridade",
      "geometria",
      "agua",
    ],
  },

  {
    id: "agua-017",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Propriedades da água",
    subtopic: "Coesão",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "A coesão entre moléculas de água está fortemente relacionada:",
    alternatives: [
      {
        id: "A",
        text: "À formação de ligações de hidrogênio entre as moléculas.",
      },
      {
        id: "B",
        text: "À formação de ligações peptídicas entre moléculas de água.",
      },
      {
        id: "C",
        text: "À presença de DNA dissolvido.",
      },
      {
        id: "D",
        text: "À ausência de qualquer interação intermolecular.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Ligações de hidrogênio permitem forte interação intermolecular entre moléculas de água, contribuindo para coesão e tensão superficial.",
    alternativeExplanations: {
      A: "Correto. Pontes de hidrogênio são essenciais para muitas propriedades físicas da água.",
      B: "Incorreto. Ligações peptídicas unem aminoácidos.",
      C: "Incorreto. DNA não é necessário para que a água apresente coesão.",
      D: "Incorreto. A água possui importantes interações intermoleculares.",
    },
    tags: [
      "coesao",
      "pontes-de-hidrogenio",
      "agua",
    ],
  },

  {
    id: "agua-018",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Soluções",
    subtopic: "Solvatação",
    difficulty: "iniciante",
    type: "multiple-choice",
    statement:
      "Quando NaCl é dissolvido em água, as moléculas de água tendem a:",
    alternatives: [
      {
        id: "A",
        text: "Organizar-se ao redor dos íons Na+ e Cl− formando camadas de hidratação.",
      },
      {
        id: "B",
        text: "Transformar todo o NaCl em proteínas.",
      },
      {
        id: "C",
        text: "Perder completamente sua polaridade.",
      },
      {
        id: "D",
        text: "Parar de formar interações intermoleculares.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Devido à polaridade, moléculas de água interagem com íons e formam camadas de solvatação ou hidratação.",
    alternativeExplanations: {
      A: "Correto. O oxigênio orienta-se preferencialmente para cátions e os hidrogênios para ânions.",
      B: "Incorreto. Dissolução não converte sal em proteína.",
      C: "Incorreto. A água permanece polar.",
      D: "Incorreto. Interações continuam ocorrendo.",
    },
    tags: [
      "solvatacao",
      "nacl",
      "ions",
    ],
  },

  {
    id: "agua-019",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "pH",
    subtopic: "Escala logarítmica",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Comparando uma solução de pH 6 com uma solução de pH 7, a solução de pH 6 apresenta aproximadamente:",
    alternatives: [
      {
        id: "A",
        text: "Dez vezes maior atividade de H+.",
      },
      {
        id: "B",
        text: "Duas vezes maior atividade de H+.",
      },
      {
        id: "C",
        text: "Cem vezes menor atividade de H+.",
      },
      {
        id: "D",
        text: "Exatamente a mesma atividade de H+.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O pH utiliza escala logarítmica de base 10. Uma diferença de uma unidade representa aproximadamente dez vezes de diferença na atividade de H+.",
    alternativeExplanations: {
      A: "Correto. pH menor corresponde a maior atividade de H+.",
      B: "Incorreto. A diferença não é simplesmente duas vezes.",
      C: "Incorreto. O pH 6 possui maior, não menor, atividade de H+.",
      D: "Incorreto. Os valores de pH distintos refletem atividades diferentes.",
    },
    tags: [
      "ph",
      "logaritmo",
      "hidrogenio",
    ],
  },

  {
    id: "agua-020",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Ácidos e bases",
    subtopic: "Ácido de Brønsted-Lowry",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Segundo o conceito de Brønsted-Lowry, um ácido é uma substância capaz de:",
    alternatives: [
      {
        id: "A",
        text: "Doar prótons.",
      },
      {
        id: "B",
        text: "Produzir obrigatoriamente oxigênio molecular.",
      },
      {
        id: "C",
        text: "Receber exclusivamente elétrons e nunca prótons.",
      },
      {
        id: "D",
        text: "Eliminar toda a água da solução.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Na definição de Brønsted-Lowry, ácidos são doadores de prótons e bases são receptoras de prótons.",
    alternativeExplanations: {
      A: "Correto. Essa é a definição central de ácido de Brønsted.",
      B: "Incorreto. Produção de O₂ não define um ácido.",
      C: "Incorreto. Isso mistura conceitos diferentes de ácido-base.",
      D: "Incorreto. A presença ou remoção de água não define o ácido dessa forma.",
    },
    tags: [
      "acido",
      "bronsted-lowry",
      "protons",
    ],
  },

  {
    id: "agua-021",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Sistemas tampão",
    subtopic: "Capacidade tamponante",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Um sistema tampão apresenta maior eficiência geralmente quando:",
    alternatives: [
      {
        id: "A",
        text: "O pH está próximo do pKa do par ácido-base.",
      },
      {
        id: "B",
        text: "Não existe nenhuma forma ácida na solução.",
      },
      {
        id: "C",
        text: "Não existe nenhuma forma básica conjugada.",
      },
      {
        id: "D",
        text: "A concentração de tampão é exatamente zero.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A capacidade de resistir a alterações de pH é particularmente eficiente nas proximidades do pKa, onde ácido e base conjugada estão presentes em quantidades relevantes.",
    alternativeExplanations: {
      A: "Correto. É a região mais eficiente da faixa tamponante.",
      B: "Incorreto. O sistema necessita das formas conjugadas para neutralizar ácido ou base adicionados.",
      C: "Incorreto. A ausência de base conjugada compromete o tamponamento.",
      D: "Incorreto. Sem componentes tampão não existe capacidade tamponante.",
    },
    tags: [
      "tampao",
      "pka",
      "capacidade-tamponante",
    ],
  },

  {
    id: "agua-022",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Osmose",
    subtopic: "Pressão osmótica",
    difficulty: "medio",
    type: "multiple-choice",
    statement:
      "Mantendo outras condições semelhantes, o aumento do número de partículas de soluto em uma solução tende a:",
    alternatives: [
      {
        id: "A",
        text: "Aumentar sua pressão osmótica.",
      },
      {
        id: "B",
        text: "Eliminar completamente a osmose.",
      },
      {
        id: "C",
        text: "Transformar todos os solutos em água.",
      },
      {
        id: "D",
        text: "Tornar o número de partículas irrelevante.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "A pressão osmótica é uma propriedade coligativa e depende da quantidade de partículas osmoticamente ativas presentes na solução.",
    alternativeExplanations: {
      A: "Correto. Mais partículas podem produzir maior pressão osmótica.",
      B: "Incorreto. O gradiente osmótico pode justamente aumentar.",
      C: "Incorreto. Solutos não são convertidos em água.",
      D: "Incorreto. Número de partículas é fundamental.",
    },
    tags: [
      "pressao-osmotica",
      "osmose",
      "particulas",
    ],
  },

  {
    id: "agua-023",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Equilíbrio ácido-base",
    subtopic: "Henderson-Hasselbalch",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Na equação de Henderson-Hasselbalch, quando a concentração da base conjugada é dez vezes maior que a do ácido fraco, aproximadamente:",
    alternatives: [
      {
        id: "A",
        text: "pH = pKa + 1.",
      },
      {
        id: "B",
        text: "pH = pKa − 10.",
      },
      {
        id: "C",
        text: "pH é sempre igual a zero.",
      },
      {
        id: "D",
        text: "pH não apresenta qualquer relação com o pKa.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Pela equação pH = pKa + log([A−]/[HA]), uma razão 10:1 resulta em log 10 = 1.",
    alternativeExplanations: {
      A: "Correto. Uma razão base/ácido de 10 corresponde a uma unidade acima do pKa.",
      B: "Incorreto. Não se subtraem dez unidades.",
      C: "Incorreto. O resultado depende do pKa.",
      D: "Incorreto. O pKa é componente central da equação.",
    },
    tags: [
      "henderson-hasselbalch",
      "pka",
      "ph",
    ],
  },

  {
    id: "agua-024",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Interações hidrofóbicas",
    subtopic: "Membranas",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "Por que moléculas anfipáticas, como fosfolipídios, podem formar espontaneamente bicamadas em meio aquoso?",
    alternatives: [
      {
        id: "A",
        text: "Porque regiões hidrofóbicas tendem a se afastar da água enquanto regiões polares permanecem em contato com ela.",
      },
      {
        id: "B",
        text: "Porque suas caudas hidrofóbicas formam ligações covalentes com todas as moléculas de água.",
      },
      {
        id: "C",
        text: "Porque a água deixa de ser polar na presença de lipídios.",
      },
      {
        id: "D",
        text: "Porque os fosfolipídios são completamente apolares.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O efeito hidrofóbico favorece o agrupamento das regiões apolares, enquanto as cabeças polares interagem com o meio aquoso.",
    alternativeExplanations: {
      A: "Correto. Esse princípio é fundamental para a organização espontânea de membranas.",
      B: "Incorreto. O fenômeno não depende de ligações covalentes generalizadas com a água.",
      C: "Incorreto. A água permanece polar.",
      D: "Incorreto. Fosfolipídios são anfipáticos, apresentando regiões polares e apolares.",
    },
    tags: [
      "anfipatico",
      "efeito-hidrofobico",
      "membrana",
    ],
  },

  {
    id: "agua-025",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Água e termodinâmica",
    subtopic: "Efeito hidrofóbico",
    difficulty: "avancado",
    type: "multiple-choice",
    statement:
      "O agrupamento de grupos hidrofóbicos em água pode ser termodinamicamente favorável porque:",
    alternatives: [
      {
        id: "A",
        text: "Pode reduzir a superfície apolar exposta à água e aumentar a liberdade de moléculas de água previamente organizadas ao redor dessas superfícies.",
      },
      {
        id: "B",
        text: "Cria novas moléculas de oxigênio dentro da solução.",
      },
      {
        id: "C",
        text: "Elimina completamente a entropia do sistema.",
      },
      {
        id: "D",
        text: "Transforma os grupos apolares em íons.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "O efeito hidrofóbico possui forte componente entrópico: o agrupamento de regiões apolares reduz a área de contato com a água e libera parte das moléculas de água anteriormente organizadas.",
    alternativeExplanations: {
      A: "Correto. Esse fenômeno contribui para organização de membranas e dobramento de proteínas.",
      B: "Incorreto. O efeito hidrofóbico não produz O₂.",
      C: "Incorreto. Sistemas não eliminam completamente sua entropia.",
      D: "Incorreto. Grupos apolares não precisam ser ionizados.",
    },
    tags: [
      "efeito-hidrofobico",
      "entropia",
      "termodinamica",
    ],
  },
];