import type { Lesson } from "@/types/lesson";

export const constitucionalDireitosGarantiasLesson: Lesson = {
  subject: "direito-constitucional",
  topic: "Direitos e garantias fundamentais",
  title: "Direitos e garantias fundamentais: art. 5º e remédios constitucionais",
  intro:
    "O art. 5º da Constituição é o trecho mais cobrado de Direito Constitucional em concursos. As questões se concentram nos remédios constitucionais, na inviolabilidade do domicílio, nos crimes inafiançáveis e imprescritíveis e nos parágrafos finais do artigo.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Remédios constitucionais",
      paragraphs: [
        "Remédios são as ações que protegem direitos quando eles são violados ou ameaçados. A dica é identificar o direito em jogo.",
      ],
      table: {
        headers: ["Remédio", "Protege", "Quem propõe"],
        rows: [
          ["Habeas corpus", "Liberdade de locomoção (ir, vir e ficar)", "Qualquer pessoa, em favor de si ou de outro"],
          ["Habeas data", "Acesso e retificação de dados pessoais em bancos públicos ou de caráter público", "O próprio titular dos dados"],
          ["Mandado de segurança", "Direito líquido e certo não amparado por HC ou HD (caráter residual)", "O titular do direito"],
          ["Mandado de injunção", "Direitos inviáveis por falta de norma regulamentadora", "O titular do direito"],
          ["Ação popular", "Patrimônio público, moralidade administrativa, meio ambiente e patrimônio histórico e cultural", "Qualquer cidadão"],
        ],
      },
      bullets: [
        "Habeas corpus e habeas data são gratuitos (art. 5º, LXXVII).",
        "Na ação popular, o autor fica isento de custas e honorários, salvo má-fé comprovada.",
      ],
    },
    {
      heading: "Domicílio, crimes e penas",
      paragraphs: [
        "A casa é asilo inviolável (art. 5º, XI). Sem consentimento do morador, só se entra em flagrante delito, desastre ou para prestar socorro, a qualquer hora; ou por ordem judicial, apenas durante o dia.",
        "Só dois crimes são, ao mesmo tempo, inafiançáveis e imprescritíveis: o racismo e a atuação de grupos armados, civis ou militares, que atentem contra a ordem constitucional e o Estado Democrático. Tortura, tráfico de drogas, terrorismo e crimes hediondos são inafiançáveis e insuscetíveis de graça ou anistia, mas não são imprescritíveis.",
        "São proibidas as penas de morte (salvo em guerra declarada), de caráter perpétuo, de trabalhos forçados, de banimento e cruéis (art. 5º, XLVII).",
      ],
    },
    {
      heading: "Os parágrafos do art. 5º",
      paragraphs: [
        "§ 1º: as normas de direitos fundamentais têm aplicação imediata. § 2º: a lista não é fechada; outros direitos podem decorrer dos princípios da Constituição e dos tratados. § 3º: um tratado de direitos humanos que passe pelo rito de emenda (dois turnos na Câmara e no Senado, com três quintos dos votos) tem força de emenda constitucional. § 4º: o Brasil se submete ao Tribunal Penal Internacional.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Um candidato teve a inscrição em concurso recusada por um ato claramente ilegal da comissão, e tem todos os documentos que provam o direito. A liberdade de locomoção e os dados pessoais dele não estão em jogo. Qual remédio usar?",
      steps: [
        "Não é liberdade de locomoção: não é habeas corpus.",
        "Não é acesso a dados pessoais: não é habeas data.",
        "Há direito líquido e certo, provado por documentos, contra ato de autoridade.",
      ],
      answer: "Mandado de segurança.",
    },
    {
      statement: "O crime de tortura é imprescritível pela Constituição?",
      steps: [
        "A Constituição só torna imprescritíveis o racismo e a atuação de grupos armados contra a ordem constitucional.",
        "A tortura está no grupo dos inafiançáveis e insuscetíveis de graça ou anistia (art. 5º, XLIII).",
      ],
      answer: "Não. A tortura é inafiançável e insuscetível de graça ou anistia, mas não é imprescritível.",
    },
  ],
  commonMistakes: [
    "Incluir tortura, tráfico, terrorismo ou hediondos entre os crimes imprescritíveis.",
    "Achar que a ordem judicial autoriza entrar na casa à noite.",
    "Usar mandado de segurança quando o caso é de liberdade de locomoção ou de dados pessoais.",
    "Dizer que qualquer pessoa pode propor ação popular; a legitimidade é do cidadão.",
  ],
  summary: [
    "HC: locomoção. HD: dados pessoais. MS: direito líquido e certo residual. MI: falta de norma. Ação popular: patrimônio e moralidade.",
    "HC e HD são gratuitos.",
    "Casa: flagrante, desastre ou socorro a qualquer hora; ordem judicial só de dia.",
    "Imprescritíveis: só racismo e grupos armados contra a ordem constitucional.",
    "Tratado de direitos humanos com rito de emenda (3/5, dois turnos) equivale a emenda.",
  ],
};
