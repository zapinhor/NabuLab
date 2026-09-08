import type { Question } from "@/types/question";

export const fisiologiaCelularTrueFalseQuestions: Question[] = [
  {
    id: "fcel-vf-001",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Membrana plasmática",
    subtopic: "Bicamada lipídica",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A membrana plasmática é constituída principalmente por uma bicamada de lipídios associada a proteínas.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Fosfolipídios formam a estrutura básica da membrana, enquanto proteínas desempenham funções como transporte, sinalização, adesão e atividade enzimática.",
    alternativeExplanations: {
      V: "Correto. Essa organização é fundamental para a função da membrana.",
      F: "Incorreto. Lipídios e proteínas são componentes centrais da membrana celular.",
    },
    tags: [
      "membrana-plasmatica",
      "fosfolipidios",
      "proteinas",
    ],
  },

  {
    id: "fcel-vf-002",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte de membrana",
    subtopic: "Difusão simples",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A difusão simples pode ocorrer a favor de um gradiente de concentração sem consumo direto de ATP pela proteína transportadora.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Na difusão passiva, o movimento líquido ocorre espontaneamente a favor do gradiente eletroquímico e não depende de hidrólise direta de ATP.",
    alternativeExplanations: {
      V: "Correto. Trata-se de transporte passivo.",
      F: "Incorreto. O consumo direto de ATP caracteriza mecanismos ativos, não difusão simples.",
    },
    tags: [
      "difusao",
      "transporte-passivo",
      "membrana",
    ],
  },

  {
    id: "fcel-vf-003",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Osmose",
    subtopic: "Movimento da água",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Osmose envolve o movimento de água através de uma membrana semipermeável em resposta a diferenças de concentração efetiva de solutos.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A água tende a se deslocar de acordo com diferenças de potencial osmótico através de membranas permeáveis à água.",
    alternativeExplanations: {
      V: "Correto. A osmose é essencial para o equilíbrio hídrico celular.",
      F: "Incorreto. Diferenças de solutos podem produzir deslocamento osmótico de água.",
    },
    tags: [
      "osmose",
      "agua",
      "membrana",
    ],
  },

  {
    id: "fcel-vf-004",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "ATP",
    subtopic: "Energia celular",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "O ATP participa da transferência de energia utilizada em diversos processos celulares.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A hidrólise e formação de ATP estão acopladas a numerosos processos metabólicos, mecânicos e de transporte.",
    alternativeExplanations: {
      V: "Correto. ATP é um intermediário energético central.",
      F: "Incorreto. Muitas atividades celulares dependem direta ou indiretamente de ATP.",
    },
    tags: [
      "atp",
      "energia",
      "metabolismo",
    ],
  },

  {
    id: "fcel-vf-005",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte ativo",
    subtopic: "Na+/K+-ATPase",
    difficulty: "medio",
    type: "true-false",
    statement:
      "A bomba de sódio e potássio utiliza ATP para transportar Na+ e K+ contra seus gradientes eletroquímicos.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A Na+/K+-ATPase realiza transporte ativo primário, normalmente expulsando três Na+ e introduzindo dois K+ por ciclo de ATPase.",
    alternativeExplanations: {
      V: "Correto. A energia deriva diretamente da hidrólise de ATP.",
      F: "Incorreto. O transporte promovido pela bomba é ativo e pode ocorrer contra gradientes.",
    },
    tags: [
      "sodio-potassio",
      "atpase",
      "transporte-ativo",
    ],
  },

  {
    id: "fcel-vf-006",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Potencial de membrana",
    subtopic: "Gradientes iônicos",
    difficulty: "medio",
    type: "true-false",
    statement:
      "O potencial de membrana depende apenas das concentrações absolutas de íons e não da permeabilidade da membrana a esses íons.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "O potencial de membrana resulta tanto dos gradientes eletroquímicos quanto das permeabilidades relativas da membrana aos diferentes íons.",
    alternativeExplanations: {
      V: "Incorreto. Permeabilidade seletiva é essencial para determinar o potencial.",
      F: "Correto. Concentração e permeabilidade atuam em conjunto.",
    },
    tags: [
      "potencial-de-membrana",
      "permeabilidade",
      "ions",
    ],
  },

  {
    id: "fcel-vf-007",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Sinalização celular",
    subtopic: "Receptores",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Uma mesma molécula sinalizadora pode produzir efeitos diferentes em tipos celulares distintos dependendo dos receptores e vias intracelulares presentes.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A resposta depende do receptor expresso, das proteínas de sinalização e dos alvos intracelulares presentes em cada célula.",
    alternativeExplanations: {
      V: "Correto. A identidade celular influencia fortemente a resposta ao sinal.",
      F: "Incorreto. Uma molécula não produz necessariamente o mesmo efeito em todas as células.",
    },
    tags: [
      "sinalizacao",
      "receptores",
      "transducao",
    ],
  },

  {
    id: "fcel-vf-008",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Potencial de equilíbrio",
    subtopic: "Equação de Nernst",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "O potencial de equilíbrio de um íon está relacionado ao gradiente de concentração desse íon através da membrana e à sua carga elétrica.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A equação de Nernst relaciona as concentrações do íon nos dois lados da membrana, sua valência e a temperatura ao potencial de equilíbrio.",
    alternativeExplanations: {
      V: "Correto. Esses fatores determinam a força elétrica necessária para equilibrar o gradiente químico.",
      F: "Incorreto. O potencial de equilíbrio depende diretamente do gradiente e da valência do íon.",
    },
    tags: [
      "nernst",
      "potencial-de-equilibrio",
      "gradiente-ionico",
    ],
  },

  {
    id: "fcel-vf-009",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Transporte secundário",
    subtopic: "Cotransporte",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "No transporte ativo secundário, a energia pode ser fornecida indiretamente pelo gradiente eletroquímico de outro soluto.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Transportadores secundariamente ativos utilizam a energia armazenada em um gradiente iônico, frequentemente estabelecido por transporte ativo primário.",
    alternativeExplanations: {
      V: "Correto. O ATP não precisa ser hidrolisado diretamente pelo cotransportador.",
      F: "Incorreto. A energia pode vir de um gradiente previamente criado.",
    },
    tags: [
      "transporte-secundario",
      "cotransporte",
      "gradiente",
    ],
  },

  {
    id: "fcel-vf-010",
    area: "Fisiologia Humana",
    subject: "fisiologia-celular",
    subjectName: "Fisiologia Celular",
    topic: "Osmolaridade e tonicidade",
    subtopic: "Volume celular",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Tonicidade e osmolaridade são conceitos absolutamente idênticos, independentemente da permeabilidade da membrana aos solutos.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "Osmolaridade contabiliza partículas osmoticamente ativas na solução, enquanto tonicidade depende principalmente dos solutos efetivamente não penetrantes e do efeito sobre o volume celular.",
    alternativeExplanations: {
      V: "Incorreto. A permeabilidade aos solutos diferencia os conceitos.",
      F: "Correto. Solutos permeantes podem contribuir para osmolaridade sem exercer o mesmo efeito sustentado sobre tonicidade.",
    },
    tags: [
      "tonicidade",
      "osmolaridade",
      "volume-celular",
    ],
  },
];