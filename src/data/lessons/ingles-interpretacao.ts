import type { Lesson } from "@/types/lesson";

export const inglesInterpretacaoLesson: Lesson = {
  subject: "ingles",
  topic: "Interpretação",
  title: "Interpretação de texto em inglês: estratégias para acertar sem traduzir tudo",
  intro:
    "Nas provas de inglês, a maioria das questões é de leitura. Você não precisa traduzir o texto inteiro: precisa saber o que a pergunta pede (uma informação dita, uma conclusão, a ideia principal ou a quem um pronome se refere) e usar pistas como conectores e cognatos.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Primeiro a pergunta, depois o texto",
      paragraphs: [
        "Leia as perguntas antes do texto. Assim você sabe o que procurar.",
        "Skimming é passar os olhos para entender o assunto geral (título, primeira frase de cada parágrafo, palavras repetidas). Scanning é procurar uma informação específica, como um número, um nome ou uma data.",
      ],
    },
    {
      heading: "Os quatro tipos de pergunta",
      paragraphs: [
        "Cada tipo pede um cuidado diferente.",
      ],
      table: {
        headers: ["Tipo", "O que pede", "Cuidado"],
        rows: [
          ["Informação explícita", "Algo que o texto diz com todas as letras", "Localize a frase e confira; não use seu conhecimento de fora"],
          ["Inferência", "Uma conclusão que as pistas do texto permitem tirar", "A conclusão precisa se apoiar no texto, sem exagero"],
          ["Ideia principal", "O assunto central do trecho", "Desconfie da alternativa que traz só um detalhe ou só metade da ideia"],
          ["Referência", "A quem um pronome (it, they, she, this) se refere", "Volte no texto e teste a substituição"],
        ],
      },
    },
    {
      heading: "Conectores mudam o sentido",
      paragraphs: [
        "Muitas questões dependem de entender a relação entre duas ideias. Os conectores mostram essa relação.",
      ],
      table: {
        headers: ["Relação", "Conectores"],
        rows: [
          ["Contraste", "but, however, although, though, yet, nevertheless"],
          ["Causa", "because, since, as, due to"],
          ["Consequência", "so, therefore, thus, as a result"],
          ["Adição", "and, also, moreover, in addition, furthermore"],
          ["Exemplo", "for example, for instance, such as"],
        ],
      },
    },
    {
      heading: "Cognatos e falsos cognatos",
      paragraphs: [
        "Cognatos são palavras parecidas com o português e de mesmo sentido (important, information, university). Eles ajudam muito na leitura.",
        "Falsos cognatos parecem português, mas significam outra coisa. Os mais cobrados: actually (na verdade), pretend (fingir), push (empurrar), library (biblioteca), college (faculdade), eventually (no fim, por fim) e realize (perceber).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Leia: \"Maria missed the bus, so she arrived late to the meeting.\" Por que Maria chegou atrasada?",
      steps: [
        "A pergunta pede uma informação que está no texto.",
        "O conector so introduz uma consequência: chegar atrasada é consequência de perder o ônibus.",
      ],
      answer: "Porque perdeu o ônibus.",
    },
    {
      statement:
        "Leia: \"Lucas met his grandparents at the station. They had traveled for six hours.\" A que se refere o pronome \"they\"?",
      steps: [
        "They é plural, então não pode se referir a Lucas.",
        "Teste a substituição: \"His grandparents had traveled for six hours\" faz sentido.",
      ],
      answer: "Aos avós de Lucas (his grandparents).",
    },
  ],
  commonMistakes: [
    "Escolher a alternativa que é verdadeira no mundo real, mas não está no texto.",
    "Tirar conclusões que o texto não sustenta (inferência exagerada).",
    "Traduzir actually como \"atualmente\" e pretend como \"pretender\".",
    "Ignorar o however e ler a segunda ideia como continuação da primeira.",
  ],
  summary: [
    "Leia as perguntas antes do texto.",
    "Skimming: visão geral. Scanning: informação específica.",
    "Explícita, inferência, ideia principal e referência pedem cuidados diferentes.",
    "Conectores mostram contraste, causa, consequência, adição e exemplo.",
    "Use cognatos e cuidado com falsos cognatos.",
  ],
};
