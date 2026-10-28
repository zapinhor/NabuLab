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
        "O verbo to be muda conforme o sujeito: I am, you/we/they are, he/she/it is. Por isso \"We is friends\" está errado; o certo é \"We are friends\".",
        "No Simple Present, usado para rotinas e fatos, o verbo fica na forma base, mas ganha -s ou -es na terceira pessoa do singular (he, she, it).",
      ],
      bullets: [
        "\"We visit our grandparents every Sunday.\"",
        "\"My father cooks every night.\" (cooks, com -s)",
        "\"She watches TV.\" (verbos em -ch, -sh, -s, -x, -o ganham -es)",
      ],
    },
    {
      heading: "Passado, presente contínuo e Present Perfect",
      paragraphs: [
        "O Simple Past descreve ações terminadas, muitas vezes com marcador de tempo (yesterday, last week). Verbos regulares ganham -ed; os irregulares têm forma própria (go → went).",
        "O Present Continuous (am/is/are + verbo com -ing) descreve o que está acontecendo agora: \"They are watching a movie now.\"",
        "O Present Perfect (have/has + particípio) liga passado e presente. Com since (desde) e for (há/por), indica algo que começou no passado e continua: \"He has played the guitar since 2019\", \"We have known each other for ten years\".",
      ],
    },
    {
      heading: "Comparativos, artigos e quantidade",
      paragraphs: [
        "Adjetivos curtos ganham -er (fast → faster). Adjetivos longos usam more (more expensive). Nunca use os dois juntos: \"more taller\" está errado.",
        "O artigo a vem antes de som de consoante (a book); an, antes de som de vogal (an umbrella, an hour).",
        "Para quantidade, much acompanha substantivos incontáveis (much sugar) e many, contáveis (many apples). There is é usado com singular; there are, com plural.",
      ],
    },
    {
      heading: "Modais, condicionais, voz passiva e discurso indireto",
      paragraphs: [
        "Depois de um modal (can, should, must, will, would), o verbo principal fica na forma base, sem to: \"He can drive\". Should indica conselho; can, capacidade ou permissão.",
        "Na voz passiva, usa-se to be no tempo da frase original + particípio: \"The students painted the wall\" vira \"The wall was painted by the students\".",
        "No discurso indireto (reported speech), o tempo verbal costuma recuar um passo: \"I am hungry\" vira \"She said that she was hungry\".",
      ],
      table: {
        headers: ["Condicional", "Estrutura", "Exemplo"],
        rows: [
          ["First Conditional (possível)", "If + Simple Present, will + verbo", "If you study, you will pass the test."],
          ["Second Conditional (hipotética)", "If + Simple Past, would + verbo", "If I had a car, I would drive to work."],
        ],
      },
    },
  ],
  workedExamples: [
    {
      statement: "Complete: \"They ___ in this city since 2015.\" (live / lived / have lived / are living)",
      steps: [
        "O marcador since indica algo que começou em 2015 e continua até hoje.",
        "Ação iniciada no passado que se estende ao presente pede Present Perfect: have/has + particípio.",
        "Com sujeito they, usa-se have.",
      ],
      answer: "have lived",
    },
    {
      statement: "Corrija a frase: \"If she will call me, I will answer.\"",
      steps: [
        "É uma situação possível no futuro: First Conditional.",
        "Na oração com if, usa-se o Simple Present, não will.",
        "O will fica só na oração principal.",
      ],
      answer: "If she calls me, I will answer.",
    },
  ],
  commonMistakes: [
    "Esquecer o -s da terceira pessoa no Simple Present (\"he work\").",
    "Juntar more com a terminação -er no comparativo (\"more taller\").",
    "Colocar will na oração com if no First Conditional.",
    "Usar to depois de modal (\"he can to drive\").",
  ],
  summary: [
    "To be: I am, he/she/it is, you/we/they are.",
    "Present Perfect + since/for: começou no passado e continua.",
    "Adjetivo curto + -er; adjetivo longo + more.",
    "First Conditional: if + presente, will + verbo. Second: if + passado, would + verbo.",
    "Voz passiva: to be + particípio.",
  ],
};
