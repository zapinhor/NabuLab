import type { Lesson } from "@/types/lesson";

export const fisicaOndasLesson: Lesson = {
  subject: "fisica",
  topic: "Ondas",
  title: "Ondas: frequência, comprimento de onda e velocidade",
  intro:
    "Quase todas as questões de ondulatória usam uma única equação, v = λ · f, e uma regra: quando a onda muda de meio, a frequência não muda. Entendendo essas duas ideias, você resolve a maioria dos exercícios.",
  readingMinutes: 6,
  sections: [
    {
      heading: "Grandezas da onda",
      paragraphs: [
        "Onda é uma perturbação que se propaga transportando energia, sem transportar matéria.",
      ],
      table: {
        headers: ["Grandeza", "Símbolo", "Unidade", "O que é"],
        rows: [
          ["Frequência", "f", "Hz (oscilações por segundo)", "Quantas oscilações a fonte faz por segundo"],
          ["Período", "T", "s", "Tempo de uma oscilação completa; T = 1/f"],
          ["Comprimento de onda", "λ", "m", "Distância entre duas cristas consecutivas"],
          ["Velocidade", "v", "m/s", "Rapidez com que a onda se propaga no meio"],
        ],
      },
    },
    {
      heading: "Calculando a frequência",
      paragraphs: [
        "Frequência = número de oscilações ÷ tempo. Se a fonte faz 10 oscilações em 2 s, f = 5 Hz.",
        "A frequência é imposta pela fonte. Quem decide quantas vezes por segundo a corda sobe e desce é a mão ou o motor que a agita.",
      ],
    },
    {
      heading: "Equação fundamental: v = λ · f",
      paragraphs: [
        "Em um meio, a velocidade da onda é o produto do comprimento de onda pela frequência. Isolando: λ = v / f.",
        "Exemplo: f = 50 Hz e v = 200 m/s → λ = 200 / 50 = 4 m.",
      ],
    },
    {
      heading: "Mudança de meio (refração)",
      paragraphs: [
        "Ao passar de um meio para outro, a frequência se mantém, porque depende da fonte. O que muda é a velocidade e, junto com ela, o comprimento de onda.",
        "Se a velocidade cai à metade e a frequência é a mesma, o comprimento de onda também cai à metade.",
        "Em cordas, a velocidade depende da tensão e da densidade linear: v = √(T/μ). Com densidade quatro vezes maior e mesma tensão, a velocidade cai à metade.",
      ],
    },
  ],
  workedExamples: [
    {
      statement: "Uma onda de 25 Hz se propaga a 100 m/s. Qual é o comprimento de onda?",
      steps: ["λ = v / f.", "λ = 100 / 25 = 4 m."],
      answer: "4 m",
    },
    {
      statement:
        "Uma fonte produz ondas de 8 Hz em uma corda onde v = 12 m/s. A onda passa para um trecho em que a velocidade cai à metade. Qual é o novo comprimento de onda?",
      steps: [
        "A frequência não muda na troca de meio: continua 8 Hz.",
        "Nova velocidade: 12 ÷ 2 = 6 m/s.",
        "λ = v / f = 6 / 8 = 0,75 m.",
      ],
      answer: "0,75 m",
    },
  ],
  commonMistakes: [
    "Achar que a frequência muda quando a onda troca de meio.",
    "Confundir período (segundos) com frequência (hertz).",
    "Dividir na ordem errada: λ = v / f, e não f / v.",
    "Pensar que a onda transporta matéria; ela transporta energia.",
  ],
  summary: [
    "f = oscilações ÷ tempo; T = 1/f.",
    "v = λ · f.",
    "Na mudança de meio, f fica igual; v e λ mudam juntos.",
    "Em cordas, v = √(T/μ).",
  ],
};
