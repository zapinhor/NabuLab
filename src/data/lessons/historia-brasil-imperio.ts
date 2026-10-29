import type { Lesson } from "@/types/lesson";

export const historiaBrasilImperioLesson: Lesson = {
  subject: "historia",
  topic: "Brasil Império",
  title: "Brasil Império: do Primeiro Reinado à Proclamação da República",
  intro:
    "O Império vai da Independência (1822) à Proclamação da República (1889). As questões cobram três eixos: a Constituição de 1824 e o Poder Moderador, a disputa entre centralização e autonomia das províncias no período regencial e o longo caminho da abolição.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Os três períodos",
      paragraphs: [
        "Organizar a linha do tempo resolve boa parte das questões de ordem cronológica.",
      ],
      table: {
        headers: ["Período", "Datas", "Marcos"],
        rows: [
          ["Primeiro Reinado", "1822–1831", "Constituição outorgada de 1824; Confederação do Equador (1824); abdicação de D. Pedro I"],
          ["Período Regencial", "1831–1840", "Ato Adicional (1834); revoltas provinciais; Golpe da Maioridade"],
          ["Segundo Reinado", "1840–1889", "Café; parlamentarismo às avessas; Guerra do Paraguai; abolição; República"],
        ],
      },
    },
    {
      heading: "Constituição de 1824 e Poder Moderador",
      paragraphs: [
        "A primeira Constituição foi outorgada por D. Pedro I depois que ele dissolveu a Assembleia Constituinte. Ela criou quatro poderes: Executivo, Legislativo, Judiciário e Moderador.",
        "O Poder Moderador, exclusivo do imperador, permitia nomear senadores, dissolver a Câmara, nomear e demitir ministros e suspender magistrados. O voto era censitário (dependia de renda), o Senado era vitalício e o catolicismo era a religião oficial.",
        "O cargo de presidente do Conselho de Ministros surgiu em 1847. Só que quem escolhia esse chefe de gabinete era o imperador, que ainda podia dissolver a Câmara. Por isso o sistema ficou conhecido como parlamentarismo às avessas.",
      ],
    },
    {
      heading: "Regências: autonomia, revoltas e recentralização",
      paragraphs: [
        "Com a abdicação de D. Pedro I e um herdeiro de 5 anos, o país foi governado por regentes. O Ato Adicional de 1834 deu mais autonomia às províncias, com assembleias provinciais.",
        "Seguiram-se revoltas em várias regiões: Cabanagem (Pará), Sabinada (Bahia), Balaiada (Maranhão), Revolta dos Malês (Bahia) e Farroupilha (Rio Grande do Sul, a mais longa, de 1835 a 1845).",
        "A reação foi recentralizar: a Lei Interpretativa do Ato Adicional (1840) reduziu a autonomia provincial, e o Golpe da Maioridade declarou D. Pedro II maior de idade aos 14 anos, encerrando as regências.",
      ],
    },
    {
      heading: "O caminho da abolição",
      paragraphs: [
        "A abolição foi gradual, sob pressão inglesa, das revoltas de escravizados e do movimento abolicionista.",
      ],
      bullets: [
        "1850 — Lei Eusébio de Queirós: fim do tráfico negreiro. No mesmo ano, a Lei de Terras passou a permitir o acesso à terra só por compra.",
        "1871 — Lei do Ventre Livre: filhos de escravizadas nascidos a partir dela eram considerados livres.",
        "1885 — Lei dos Sexagenários: libertava escravizados com mais de 60 anos.",
        "1888 — Lei Áurea: extinção da escravidão, sem política de terra, trabalho ou reparação para os libertos.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Por que a Lei de Terras, de 1850, costuma ser relacionada pelos historiadores ao fim do tráfico negreiro, no mesmo ano?",
      steps: [
        "Com o fim do tráfico, os grandes proprietários previam a falta de mão de obra escravizada.",
        "Ao permitir o acesso à terra só por compra, a lei dificultava que libertos e imigrantes pobres se tornassem pequenos proprietários.",
        "Sem terra própria, essas pessoas continuavam disponíveis como trabalhadores para as grandes fazendas.",
      ],
      answer: "A lei restringiu o acesso à terra e ajudou a manter mão de obra disponível para as grandes propriedades.",
    },
    {
      statement:
        "Coloque em ordem cronológica: Lei do Ventre Livre, Lei Áurea, Lei Eusébio de Queirós, Lei dos Sexagenários.",
      steps: [
        "Eusébio de Queirós: 1850. Ventre Livre: 1871.",
        "Sexagenários: 1885. Áurea: 1888.",
      ],
      answer: "Eusébio de Queirós → Ventre Livre → Sexagenários → Áurea.",
    },
  ],
  commonMistakes: [
    "Achar que o Poder Moderador era apenas simbólico.",
    "Dizer que a Constituição de 1824 foi promulgada; ela foi outorgada.",
    "Confundir o Ato Adicional (1834, descentraliza) com a Lei Interpretativa (1840, recentraliza).",
    "Tratar a Lei Áurea como fim das desigualdades criadas pela escravidão.",
  ],
  summary: [
    "Primeiro Reinado (1822–1831), Regências (1831–1840), Segundo Reinado (1840–1889).",
    "Constituição de 1824: outorgada, quatro poderes, voto censitário.",
    "Poder Moderador: dissolver a Câmara, nomear senadores e ministros.",
    "Regências: Ato Adicional, revoltas e recentralização em 1840.",
    "Abolição: 1850, 1871, 1885 e 1888.",
  ],
};
