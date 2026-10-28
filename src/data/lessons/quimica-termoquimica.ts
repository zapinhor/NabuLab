import type { Lesson } from "@/types/lesson";

export const quimicaTermoquimicaLesson: Lesson = {
  subject: "quimica",
  topic: "Termoquímica",
  title: "Termoquímica: entalpia, calor e o sinal do ΔH",
  intro:
    "Termoquímica estuda o calor trocado nas reações. Quase todas as questões giram em torno de três ideias: o sinal do ΔH, a proporção entre energia e quantidade de matéria e o que acontece quando a reação é invertida.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Entalpia e variação de entalpia",
      paragraphs: [
        "Entalpia (H) é a energia contida em reagentes e produtos. Não se mede o valor absoluto, mas a variação: ΔH = H(produtos) − H(reagentes), a pressão constante.",
        "O ΔH é expresso, em geral, em kJ por mol de reagente consumido ou produto formado, conforme a equação.",
      ],
    },
    {
      heading: "Exotérmica x endotérmica",
      paragraphs: [
        "Na reação exotérmica, o sistema libera calor para a vizinhança: o recipiente esquenta. Os produtos ficam com menos entalpia que os reagentes, então ΔH < 0.",
        "Na reação endotérmica, o sistema absorve calor: o recipiente esfria. Os produtos têm mais entalpia, então ΔH > 0.",
      ],
      table: {
        headers: ["Processo", "Calor", "Entalpia", "Sinal do ΔH", "Exemplos"],
        rows: [
          ["Exotérmico", "Libera", "H produtos < H reagentes", "Negativo", "Combustão, neutralização, condensação"],
          ["Endotérmico", "Absorve", "H produtos > H reagentes", "Positivo", "Fusão do gelo, evaporação, fotossíntese"],
        ],
      },
    },
    {
      heading: "Proporção: energia por mol",
      paragraphs: [
        "O calor é proporcional à quantidade de matéria. Se 4 mol liberam 200 kJ, 1 mol libera 50 kJ. Como é liberação, ΔH = −50 kJ/mol.",
        "Para converter massa em mol, use a massa molar: n = m / M. Por exemplo, 11 g de CO₂ (M = 44 g/mol) correspondem a 0,25 mol.",
      ],
    },
    {
      heading: "Inversão e gráfico de entalpia",
      paragraphs: [
        "Ao inverter uma equação, o valor do ΔH se mantém e o sinal troca. Se A → B tem ΔH = −75 kJ/mol, então B → A tem ΔH = +75 kJ/mol.",
        "No gráfico de entalpia, a reação exotérmica termina mais baixo do que começou; a endotérmica termina mais alto. A diferença de altura entre o início e o fim é o ΔH.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "A combustão de 2,0 mol de H₂ libera 572 kJ. Qual é a entalpia molar de combustão e quanta energia 1,0 g de H₂ libera? (M = 2 g/mol)",
      steps: [
        "Por mol: 572 kJ ÷ 2,0 mol = 286 kJ/mol. Como é liberação, ΔH = −286 kJ/mol.",
        "Massa em mol: 1,0 g ÷ 2 g/mol = 0,50 mol.",
        "0,50 mol × 286 kJ/mol = 143 kJ liberados.",
      ],
      answer: "ΔH de combustão = −286 kJ/mol; 1,0 g de H₂ libera 143 kJ.",
    },
    {
      statement: "Uma reação tem ΔH = +50 kJ/mol. Ela libera ou absorve calor? E a reação inversa?",
      steps: [
        "ΔH positivo indica absorção de calor: reação endotérmica.",
        "Invertendo a equação, o sinal troca: ΔH = −50 kJ/mol.",
      ],
      answer: "A reação absorve 50 kJ/mol; a inversa libera 50 kJ/mol.",
    },
  ],
  commonMistakes: [
    "Trocar os sinais: ΔH negativo indica reação exotérmica (libera calor), e não endotérmica.",
    "Dizer que, na exotérmica, os produtos têm mais entalpia que os reagentes.",
    "Inverter a reação e manter o mesmo sinal do ΔH.",
    "Esquecer de converter massa em mol antes de usar o ΔH molar.",
  ],
  summary: [
    "ΔH = H produtos − H reagentes.",
    "Exotérmica: libera calor, ΔH < 0. Endotérmica: absorve calor, ΔH > 0.",
    "Calor é proporcional à quantidade de matéria (mol).",
    "Inverter a reação troca o sinal do ΔH.",
  ],
};
