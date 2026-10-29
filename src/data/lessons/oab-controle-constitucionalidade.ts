import type { Lesson } from "@/types/lesson";

export const oabControleConstitucionalidadeLesson: Lesson = {
  subject: "oab-constitucional",
  topic: "Controle de constitucionalidade",
  title: "Controle de constitucionalidade: difuso, concentrado e as ações no STF",
  intro:
    "Controle de constitucionalidade é a verificação de que leis e atos normativos estão de acordo com a Constituição. A prova cobra quem pode controlar, por qual ação, quem pode propor e quais são os efeitos da decisão.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Difuso x concentrado",
      paragraphs: [
        "No Brasil, os dois modelos convivem.",
      ],
      table: {
        headers: ["Característica", "Difuso (incidental)", "Concentrado (abstrato)"],
        rows: [
          ["Quem julga", "Qualquer juiz ou tribunal", "STF (em face da Constituição Federal)"],
          ["Como surge", "Dentro de um caso concreto, como questão prejudicial", "Em ação própria, sobre a lei em tese"],
          ["Efeitos, em regra", "Só entre as partes (inter partes)", "Contra todos (erga omnes) e vinculantes"],
        ],
      },
      bullets: [
        "Nos tribunais, só a maioria absoluta dos membros ou do órgão especial declara uma lei inconstitucional (cláusula de reserva de plenário, art. 97; Súmula Vinculante 10).",
        "Quando o STF declara uma lei inconstitucional de forma definitiva em um caso concreto, o Senado pode, por resolução, suspender a execução dessa lei (art. 52, X).",
      ],
    },
    {
      heading: "As ações do controle concentrado",
      paragraphs: [
        "Cada ação tem um objeto próprio. Errar o objeto é o erro mais comum nas questões.",
      ],
      table: {
        headers: ["Ação", "Objeto"],
        rows: [
          ["ADI", "Lei ou ato normativo federal ou estadual contrário à Constituição"],
          ["ADC", "Lei ou ato normativo federal, para confirmar que é constitucional"],
          ["ADO", "Omissão: falta da medida para tornar efetiva norma constitucional"],
          ["ADPF", "Descumprimento de preceito fundamental; é subsidiária e alcança lei municipal e normas anteriores a 1988"],
        ],
      },
    },
    {
      heading: "Quem pode propor (art. 103)",
      paragraphs: [
        "Podem propor ADI e ADC: Presidente da República; Mesas do Senado, da Câmara dos Deputados, de Assembleia Legislativa e da Câmara Legislativa do DF; Governador de Estado ou do DF; Procurador-Geral da República; Conselho Federal da OAB; partido político com representação no Congresso; confederação sindical ou entidade de classe de âmbito nacional.",
        "Alguns legitimados precisam demonstrar pertinência temática, isto é, relação entre a lei atacada e seus interesses: Mesa de Assembleia ou da Câmara Legislativa, Governador e confederação sindical ou entidade de classe. Os demais podem propor sobre qualquer tema.",
      ],
    },
    {
      heading: "Efeitos e súmula vinculante",
      paragraphs: [
        "A decisão de mérito em ADI e ADC tem eficácia contra todos e efeito vinculante para o Judiciário e a administração pública (art. 102, § 2º). Em regra, retroage (ex tunc), mas o STF pode modular os efeitos por dois terços dos ministros (Lei 9.868/1999, art. 27).",
        "Súmula vinculante exige decisão de dois terços do STF, após reiteradas decisões sobre matéria constitucional (art. 103-A).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Uma lei estadual de 1985 é incompatível com a Constituição de 1988. Qual ação do controle concentrado pode levar o tema ao STF?",
      steps: [
        "Norma anterior à Constituição não é julgada como inconstitucional, e sim como recepcionada ou não recepcionada.",
        "Por isso, ela não pode ser objeto de ADI.",
        "A ADPF alcança direito anterior a 1988 e não há outro meio eficaz no controle concentrado.",
      ],
      answer: "ADPF.",
    },
    {
      statement:
        "O Governador do Estado A quer propor ADI contra uma lei do Estado B que, segundo ele, prejudica a economia do Estado A. Ele precisa demonstrar algo além da inconstitucionalidade?",
      steps: [
        "Governador está entre os legitimados do art. 103.",
        "Ele é um legitimado que precisa demonstrar pertinência temática.",
        "Logo, deve mostrar a relação entre a lei do Estado B e os interesses do Estado A.",
      ],
      answer: "Sim: precisa demonstrar a pertinência temática.",
    },
  ],
  commonMistakes: [
    "Achar que cabe ADI no STF contra lei municipal.",
    "Esquecer que a ADPF é subsidiária: não cabe se houver outro meio eficaz.",
    "Dizer que o controle difuso, por si só, produz efeitos contra todos.",
    "Confundir quóruns: modulação e súmula vinculante exigem dois terços; reserva de plenário exige maioria absoluta.",
  ],
  summary: [
    "Difuso: qualquer juiz, caso concreto, efeito entre as partes.",
    "Concentrado: STF, lei em tese, efeito contra todos e vinculante.",
    "ADI: lei federal ou estadual. ADC: lei federal. ADPF: subsidiária, inclui municipal e pré-1988.",
    "Legitimados no art. 103; alguns precisam de pertinência temática.",
    "Modulação e súmula vinculante: dois terços do STF.",
  ],
};
