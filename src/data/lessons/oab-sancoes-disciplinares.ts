import type { Lesson } from "@/types/lesson";

export const oabSancoesDisciplinaresLesson: Lesson = {
  subject: "oab-etica",
  topic: "Sanções disciplinares",
  title: "Sanções disciplinares do advogado: censura, suspensão, exclusão e multa",
  intro:
    "Ética é a matéria com mais questões na 1ª fase da OAB, e as sanções disciplinares do Estatuto da Advocacia (Lei 8.906/1994, arts. 35 a 43) aparecem com frequência. O que mais cai: as quatro espécies, quando cada uma é aplicada, os prazos e os quóruns.",
  readingMinutes: 7,
  sections: [
    {
      heading: "As quatro sanções",
      paragraphs: [
        "O art. 35 do Estatuto prevê censura, suspensão, exclusão e multa. A infração disciplinar está tipificada no art. 34, e cada grupo de incisos leva a uma sanção.",
      ],
      table: {
        headers: ["Sanção", "Quando se aplica", "Detalhes"],
        rows: [
          ["Censura (art. 36)", "Infrações do art. 34, I a XVI e XXIX; violação ao Código de Ética; violação do Estatuto sem sanção mais grave prevista", "Com atenuante, pode virar advertência, em ofício reservado e sem registro"],
          ["Suspensão (art. 37)", "Infrações do art. 34, XVII a XXV, e reincidência em infração disciplinar", "Interdição em todo o país por 30 dias a 12 meses"],
          ["Exclusão (art. 38)", "Três suspensões; infrações do art. 34, XXVI a XXVIII", "Exige manifestação favorável de dois terços do Conselho Seccional"],
          ["Multa (art. 39)", "Junto com censura ou suspensão, havendo agravantes", "De 1 a 10 anuidades"],
        ],
      },
    },
    {
      heading: "Casos especiais de suspensão",
      paragraphs: [
        "Em regra, a suspensão dura de 30 dias a 12 meses. Há duas exceções importantes no art. 37.",
      ],
      bullets: [
        "Se o advogado não prestar contas ao cliente ou não pagar dívida com ele (art. 34, XXI e XXIII), a suspensão dura até que ele satisfaça integralmente a dívida, com correção monetária (art. 37, § 2º).",
        "Na inépcia profissional (art. 34, XXIV), a suspensão dura até que ele preste novas provas de habilitação (art. 37, § 3º).",
      ],
    },
    {
      heading: "Atenuantes, reabilitação e prescrição",
      paragraphs: [
        "São atenuantes (art. 40): falta cometida na defesa de prerrogativa profissional, ausência de punição disciplinar anterior, exercício assíduo e proficiente de mandato ou cargo na OAB e prestação de relevantes serviços à advocacia ou à causa pública.",
        "Depois de um ano do cumprimento da sanção, o advogado pode pedir reabilitação, com provas de bom comportamento (art. 41).",
        "A OAB tem 5 anos para punir, a partir do momento em que toma conhecimento oficial do fato. O processo parado por mais de 3 anos, à espera de despacho ou julgamento, também prescreve (art. 43).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Um advogado é condenado a censura, e o Tribunal de Ética reconhece circunstâncias agravantes. Além da censura, é possível aplicar multa? Em que valor?",
      steps: [
        "A multa não é aplicada sozinha: ela acompanha censura ou suspensão.",
        "O requisito para somar a multa é a presença de agravantes, que existe no caso.",
        "O art. 39 fixa o valor entre 1 e 10 anuidades.",
      ],
      answer: "Sim. A multa pode ser cumulada com a censura, de 1 a 10 anuidades.",
    },
    {
      statement:
        "Uma advogada recebeu valores do cliente em um acordo e não prestou contas. Punida com suspensão, por quanto tempo ela fica suspensa?",
      steps: [
        "Deixar de prestar contas é a infração do art. 34, XXI, punida com suspensão.",
        "Para essa infração, o art. 37, § 2º, afasta o prazo comum de 30 dias a 12 meses.",
      ],
      answer: "Até satisfazer integralmente a dívida, com correção monetária.",
    },
  ],
  commonMistakes: [
    "Incluir a advertência como uma quinta sanção; ela é a conversão da censura quando há atenuante.",
    "Achar que a multa pode ser aplicada sozinha.",
    "Esquecer o quórum de dois terços do Conselho Seccional para a exclusão.",
    "Aplicar o prazo comum de suspensão aos casos de dívida com o cliente e de inépcia.",
  ],
  summary: [
    "Sanções: censura, suspensão, exclusão e multa (art. 35).",
    "Censura pode virar advertência reservada, se houver atenuante.",
    "Suspensão: 30 dias a 12 meses, salvo dívida com cliente e inépcia.",
    "Exclusão: três suspensões ou art. 34, XXVI a XXVIII, com dois terços do Conselho.",
    "Multa: 1 a 10 anuidades, sempre junto de censura ou suspensão.",
  ],
};
