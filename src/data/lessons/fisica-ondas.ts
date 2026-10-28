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
        "Frequência = número de oscilações ÷ tempo. Se a fonte faz 12 oscilações em 3 s, f = 4 Hz.",
        "A frequência é imposta pela fonte. Quem decide quantas vezes por segundo a corda sobe e desce é a mão ou o motor que a agita.",
      ],
    },
    {
      heading: "Equação fundamental: v = λ · f",
      paragraphs: [
        "Em um meio, a velocidade da onda é o produto do comprimento de onda pela frequência. Isolando: λ = v / f.",
        "Exemplo: f = 40 Hz e v = 320 m/s → λ = 320 / 40 = 8 m.",
      ],
    },
    {
      heading: "Mudança de meio (refração)",
      paragraphs: [
        "Ao passar de um meio para outro, a frequência se mantém, porque depende da fonte. O que muda é a velocidade e, junto com ela, o comprimento de onda.",
        "Se a velocidade cai à metade e a frequência é a mesma, o comprimento de onda também cai à metade.",
        "Em cordas, a velocidade depende da força de tração (F) e da densidade linear (μ): v = √(F/μ). Com densidade quatro vezes maior e mesma tração, a velocidade cai à metade.",
      ],
    },
  ],
  workedExamples: [
    {
      statement: "Uma onda de 30 Hz se propaga a 150 m/s. Qual é o comprimento de onda?",
      steps: ["λ = v / f.", "λ = 150 / 30 = 5 m."],
      answer: "5 m",
    },
    {
      statement:
        "Uma fonte produz ondas de 10 Hz em uma corda onde v = 16 m/s. A onda passa para um trecho em que a velocidade cai à metade. Qual é o novo comprimento de onda?",
      steps: [
        "A frequência não muda na troca de meio: continua 10 Hz.",
        "Nova velocidade: 16 ÷ 2 = 8 m/s.",
        "λ = v / f = 8 / 10 = 0,8 m.",
      ],
      answer: "0,8 m",
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
    "Em cordas, v = √(F/μ).",
  ],
};
