import type { Question } from "@/types/question";

export const bioquimicaAguaTrueFalseQuestions: Question[] = [
  {
    id: "agua-vf-001",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Estrutura da água",
    subtopic: "Polaridade",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A molécula de água é polar devido à distribuição desigual de cargas entre seus átomos.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O oxigênio é mais eletronegativo que o hidrogênio e, associado à geometria molecular, produz um dipolo elétrico.",
    alternativeExplanations: {
      V: "Correto. A água possui distribuição assimétrica de carga.",
      F: "Incorreto. A água não é uma molécula eletricamente apolar.",
    },
    tags: [
      "agua",
      "polaridade",
      "eletronegatividade",
    ],
  },

  {
    id: "agua-vf-002",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Interações intermoleculares",
    subtopic: "Pontes de hidrogênio",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "Moléculas de água podem estabelecer ligações de hidrogênio entre si.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "As regiões parcialmente positivas dos hidrogênios podem interagir com regiões parcialmente negativas de oxigênios de moléculas vizinhas.",
    alternativeExplanations: {
      V: "Correto. Ligações de hidrogênio explicam várias propriedades da água.",
      F: "Incorreto. Essas interações são abundantes em água líquida.",
    },
    tags: [
      "pontes-de-hidrogenio",
      "agua",
      "interacoes",
    ],
  },

  {
    id: "agua-vf-003",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Solubilidade",
    subtopic: "Solventes",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A água tende a dissolver muitas substâncias iônicas e polares.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A polaridade da água permite estabilizar cargas e interagir com grupos polares, facilitando a solvatação.",
    alternativeExplanations: {
      V: "Correto. Essa propriedade é fundamental ao meio biológico.",
      F: "Incorreto. A água é um solvente eficiente para muitos compostos polares e iônicos.",
    },
    tags: [
      "solubilidade",
      "solvente",
      "polaridade",
    ],
  },

  {
    id: "agua-vf-004",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "pH",
    subtopic: "Íons H+",
    difficulty: "iniciante",
    type: "true-false",
    statement:
      "A escala de pH está relacionada à concentração ou, de forma mais rigorosa, à atividade de íons hidrogênio em solução.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "O pH expressa de forma logarítmica a atividade dos íons H+, sendo frequentemente aproximado a partir da concentração em soluções diluídas.",
    alternativeExplanations: {
      V: "Correto. H+ está diretamente relacionado ao conceito de pH.",
      F: "Incorreto. pH não representa simplesmente quantidade total de água ou de soluto.",
    },
    tags: [
      "ph",
      "hidrogenio",
      "acidez",
    ],
  },

  {
    id: "agua-vf-005",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "pH",
    subtopic: "Escala logarítmica",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Uma diferença de uma unidade de pH corresponde, aproximadamente, a uma diferença de dez vezes na atividade de H+.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Como o pH é uma escala logarítmica de base 10, uma variação de uma unidade representa uma mudança de aproximadamente uma ordem de grandeza.",
    alternativeExplanations: {
      V: "Correto. A escala de pH não é linear.",
      F: "Incorreto. Uma mudança de uma unidade não representa apenas uma diferença absoluta de uma unidade de H+.",
    },
    tags: [
      "ph",
      "logaritmo",
      "acidez",
    ],
  },

  {
    id: "agua-vf-006",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Sistemas tampão",
    subtopic: "Regulação de pH",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Um sistema tampão pode reduzir alterações bruscas de pH após a adição de pequenas quantidades de ácido ou base.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Pares ácido-base conjugados podem consumir parcialmente H+ ou OH− adicionados, diminuindo a variação de pH.",
    alternativeExplanations: {
      V: "Correto. Essa é a principal função química de um tampão.",
      F: "Incorreto. Tampões existem justamente para limitar variações de pH dentro de determinada capacidade.",
    },
    tags: [
      "tampao",
      "ph",
      "acido-base",
    ],
  },

  {
    id: "agua-vf-007",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Interações hidrofóbicas",
    subtopic: "Moléculas apolares",
    difficulty: "medio",
    type: "true-false",
    statement:
      "Substâncias apolares geralmente apresentam interação favorável com a água tão intensa quanto substâncias fortemente polares.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "F",
    explanation:
      "Substâncias apolares apresentam baixa compatibilidade com a rede de interações da água e tendem a se agrupar, fenômeno relacionado ao efeito hidrofóbico.",
    alternativeExplanations: {
      V: "Incorreto. Compostos apolares geralmente apresentam menor solubilidade em água.",
      F: "Correto. A polaridade influencia fortemente a interação com a água.",
    },
    tags: [
      "hidrofobico",
      "apolar",
      "solubilidade",
    ],
  },

  {
    id: "agua-vf-008",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Ácidos e bases",
    subtopic: "pKa",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "Quando o pH de uma solução é igual ao pKa de um ácido fraco, as formas protonada e desprotonada estão presentes em proporções aproximadamente iguais.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Pela equação de Henderson-Hasselbalch, quando pH = pKa, a razão entre base conjugada e ácido é 1.",
    alternativeExplanations: {
      V: "Correto. Nessa condição, [A−] e [HA] são aproximadamente iguais.",
      F: "Incorreto. A igualdade pH = pKa corresponde precisamente à razão próxima de 1:1.",
    },
    tags: [
      "pka",
      "henderson-hasselbalch",
      "acido-fraco",
    ],
  },

  {
    id: "agua-vf-009",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Osmolaridade",
    subtopic: "Partículas em solução",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "A contribuição osmótica de um soluto depende do número de partículas efetivamente presentes em solução, e não apenas da massa do composto adicionada.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "Propriedades osmóticas são coligativas e dependem do número de partículas dissolvidas. Dissociação de solutos pode aumentar esse número.",
    alternativeExplanations: {
      V: "Correto. Número de partículas é fundamental para pressão osmótica.",
      F: "Incorreto. A mesma massa de substâncias diferentes pode produzir quantidades distintas de partículas.",
    },
    tags: [
      "osmolaridade",
      "osmose",
      "particulas",
    ],
  },

  {
    id: "agua-vf-010",
    area: "Bioquímica Fundamental",
    subject: "bioquimica-agua",
    subjectName: "Bioquímica da Água",
    topic: "Termodinâmica da água",
    subtopic: "Calor específico",
    difficulty: "avancado",
    type: "true-false",
    statement:
      "A elevada capacidade térmica da água contribui para reduzir mudanças abruptas de temperatura em sistemas biológicos.",
    alternatives: [
      { id: "V", text: "Verdadeiro" },
      { id: "F", text: "Falso" },
    ],
    correctAnswer: "V",
    explanation:
      "A água absorve ou libera quantidade relativamente grande de energia térmica para produzir determinada alteração de temperatura, contribuindo para estabilidade térmica.",
    alternativeExplanations: {
      V: "Correto. Essa propriedade é biologicamente importante.",
      F: "Incorreto. A água ajuda a amortecer alterações térmicas.",
    },
    tags: [
      "calor-especifico",
      "temperatura",
      "agua",
    ],
  },
];