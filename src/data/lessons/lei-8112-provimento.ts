import type { Lesson } from "@/types/lesson";

export const lei8112ProvimentoLesson: Lesson = {
  subject: "lei-8112",
  topic: "Provimento",
  title: "Lei 8.112: requisitos, formas de provimento, posse e exercício",
  intro:
    "Provimento é o ato que preenche um cargo público. Na Lei 8.112/1990, as questões cobram os requisitos para entrar no serviço público, as sete formas de provimento e os prazos de posse e exercício.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Requisitos básicos (art. 5º)",
      paragraphs: [
        "Para a investidura em cargo público federal, a lei exige: nacionalidade brasileira, gozo dos direitos políticos, quitação com as obrigações militares e eleitorais, o nível de escolaridade exigido para o cargo, idade mínima de 18 anos e aptidão física e mental.",
        "As universidades e instituições de pesquisa federais podem prover seus cargos com professores, técnicos e cientistas estrangeiros, na forma da lei (art. 5º, § 3º).",
      ],
    },
    {
      heading: "As sete formas de provimento (art. 8º)",
      paragraphs: [
        "Transferência e ascensão foram retiradas da lei: permitiam ir para outra carreira sem concurso, o que contraria o art. 37, II, da Constituição.",
      ],
      table: {
        headers: ["Forma", "O que é"],
        rows: [
          ["Nomeação", "A forma originária: entrada no cargo, em regra após concurso"],
          ["Promoção", "Passagem para classe ou padrão superior dentro da mesma carreira"],
          ["Readaptação", "Ida para cargo compatível com limitação física ou mental verificada em inspeção médica"],
          ["Reversão", "Retorno à atividade de servidor aposentado"],
          ["Aproveitamento", "Retorno de servidor em disponibilidade a cargo compatível"],
          ["Reintegração", "Volta do servidor estável ao cargo após invalidação da demissão, com ressarcimento das vantagens"],
          ["Recondução", "Retorno do estável ao cargo anterior, por inabilitação em estágio probatório de outro cargo ou reintegração do antigo ocupante"],
        ],
      },
    },
    {
      heading: "Posse e exercício",
      paragraphs: [
        "A posse ocorre em até 30 dias da publicação do ato de provimento e pode ser feita por procuração específica. Sem posse no prazo, o ato de provimento fica sem efeito (art. 13).",
        "Depois da posse, o servidor tem 15 dias para entrar em exercício. Se não entrar, é exonerado (art. 15).",
        "Os prazos da lei são contados em dias corridos, excluindo o dia do começo e incluindo o do vencimento (art. 238).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Um cargo foi extinto e o servidor estável que o ocupava ficou em disponibilidade. Meses depois, surge vaga em cargo de atribuições e vencimentos compatíveis. Por qual forma ele volta?",
      steps: [
        "Ele não está aposentado (não é reversão) nem teve demissão anulada (não é reintegração).",
        "O retorno de quem está em disponibilidade a cargo compatível é o aproveitamento.",
      ],
      answer: "Aproveitamento.",
    },
    {
      statement:
        "O ato de nomeação foi publicado em 2 de março. Até que dia a pessoa pode tomar posse? Se ela tomar posse em 20 de março, até quando deve entrar em exercício?",
      steps: [
        "Posse: 30 dias a partir da publicação, excluindo o dia 2. Do dia 3 de março contam-se 30 dias: o último é 1º de abril.",
        "Exercício: 15 dias a partir da posse, excluindo o dia 20. Do dia 21 contam-se 15 dias: o último é 4 de abril.",
      ],
      answer: "Posse até 1º de abril; com posse em 20 de março, exercício até 4 de abril.",
    },
  ],
  commonMistakes: [
    "Trocar os prazos: 30 dias é para a posse, e 15 dias, para o exercício.",
    "Confundir as consequências: sem posse, o ato fica sem efeito; sem exercício, o servidor é exonerado.",
    "Citar transferência ou ascensão como formas de provimento atuais.",
    "Confundir reintegração (volta após demissão invalidada) com recondução (volta ao cargo anterior).",
  ],
  summary: [
    "Requisitos: nacionalidade, direitos políticos, quitação militar e eleitoral, escolaridade, 18 anos, aptidão.",
    "Sete formas: nomeação, promoção, readaptação, reversão, aproveitamento, reintegração e recondução.",
    "Posse em 30 dias da publicação; exercício em 15 dias da posse.",
    "Sem posse: ato sem efeito. Sem exercício: exoneração.",
  ],
};
