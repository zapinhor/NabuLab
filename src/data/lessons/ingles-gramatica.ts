import type { Lesson } from "@/types/lesson";

export const inglesGramaticaLesson: Lesson = {
  subject: "ingles",
  topic: "Gramática",
  title: "Gramática de inglês: os tempos e estruturas mais cobrados",
  intro:
    "As questões de gramática costumam testar poucas estruturas, sempre as mesmas: verbo to be, Simple Present e Past, Present Perfect, comparativos, condicionais e voz passiva. Esta aula reúne as regras de cada uma com exemplos curtos.",
  readingMinutes: 9,
  sections: [
    {
      heading: "Verbo to be e Simple Present",
      paragraphs: [
        "O verbo to be muda conforme o sujeito: I am, you/we/they are, he/she/it is. Por isso \"They is students\" está errado; o certo é \"They are students\".",
        "No Simple Present, usado para rotinas e fatos, o verbo fica na forma base, mas ganha -s ou -es na terceira pessoa do singular (he, she, it).",
      ],
      bullets: [
        "\"They play soccer every Saturday.\"",
        "\"He works every day.\" (works, com -s)",
        "\"She watches TV.\" (verbos em -ch, -sh, -s, -x, -o ganham -es)",
      ],
    },
    {
      heading: "Passado, presente contínuo e Present Perfect",
      paragraphs: [
        "O Simple Past descreve ações terminadas, muitas vezes com marcador de tempo (yesterday, last week). Verbos regulares ganham -ed; os irregulares têm forma própria (go → went).",
        "O Present Continuous (am/is/are + verbo com -ing) descreve o que está acontecendo agora: \"She is studying now.\"",
        "O Present Perfect (have/has + particípio) liga passado e presente. Com since (desde) e for (há/por), indica algo que começou no passado e continua: \"She has worked here since 2022\", \"I have lived here for five years\".",
      ],
    },
    {
      heading: "Comparativos, artigos e quantidade",
      paragraphs: [
        "Adjetivos curtos ganham -er (fast → faster). Adjetivos longos usam more (more interesting). Nunca use os dois juntos: \"more faster\" está errado.",
        "O artigo a vem antes de som de consoante (a book); an, antes de som de vogal (an elephant, an hour).",
        "Para quantidade, much acompanha substantivos incontáveis (much water) e many, contáveis (many books). There is é usado com singular; there are, com plural.",
      ],
    },
    {
      heading: "Modais, condicionais, voz passiva e discurso indireto",
      paragraphs: [
        "Depois de um modal (can, should, must, will, would), o verbo principal fica na forma base, sem to: \"She can swim\". Should indica conselho; can, capacidade ou permissão.",
        "Na voz passiva, usa-se to be no tempo da frase original + particípio: \"The company launched the product\" vira \"The product was launched by the company\".",
        "No discurso indireto (reported speech), o tempo verbal costuma recuar um passo: \"I am tired\" vira \"He said that he was tired\".",
      ],
      table: {
        headers: ["Condicional", "Estrutura", "Exemplo"],
        rows: [
          ["First Conditional (possível)", "If + Simple Present, will + verbo", "If it rains tomorrow, we will stay at home."],
          ["Second Conditional (hipotética)", "If + Simple Past, would + verbo", "If I had more time, I would learn another language."],
        ],
      },
    },
  ],
  workedExamples: [
    {
      statement: "Complete: \"She ___ in this company since 2022.\" (works / worked / has worked / is working)",
      steps: [
        "O marcador since indica algo que começou em 2022 e continua até hoje.",
        "Ação iniciada no passado que se estende ao presente pede Present Perfect: has + particípio.",
        "Com sujeito she, usa-se has.",
      ],
      answer: "has worked",
    },
    {
      statement: "Corrija a frase: \"If it will rain, we will stay home.\"",
      steps: [
        "É uma situação possível no futuro: First Conditional.",
        "Na oração com if, usa-se o Simple Present, não will.",
        "O will fica só na oração principal.",
      ],
      answer: "If it rains, we will stay home.",
    },
  ],
  commonMistakes: [
    "Esquecer o -s da terceira pessoa no Simple Present (\"he work\").",
    "Usar more com adjetivo curto já no comparativo (\"more faster\").",
    "Colocar will na oração com if no First Conditional.",
    "Usar to depois de modal (\"she can to swim\").",
  ],
  summary: [
    "To be: I am, he/she/it is, you/we/they are.",
    "Present Perfect + since/for: começou no passado e continua.",
    "Adjetivo curto + -er; adjetivo longo + more.",
    "First Conditional: if + presente, will + verbo. Second: if + passado, would + verbo.",
    "Voz passiva: to be + particípio.",
  ],
};
