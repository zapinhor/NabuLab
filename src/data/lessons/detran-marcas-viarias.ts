import type { Lesson } from "@/types/lesson";

export const detranMarcasViariasLesson: Lesson = {
  subject: "sinalizacao-transito",
  topic: "Marcas viárias",
  title: "Marcas viárias: cores, linhas contínuas e tracejadas",
  intro:
    "Marcas viárias são as linhas, setas e inscrições pintadas no pavimento. Para acertar as questões, basta ler duas coisas: a cor (que diz se os fluxos são do mesmo sentido ou de sentidos opostos) e o traço (que diz se pode cruzar a linha).",
  readingMinutes: 6,
  sections: [
    {
      heading: "A cor diz o sentido dos fluxos",
      paragraphs: [
        "Linha amarela separa fluxos de sentidos opostos: é a linha do meio de uma pista de mão dupla. Linha branca separa fluxos do mesmo sentido, como as faixas de uma avenida de mão única, e também marca o bordo da pista.",
      ],
      table: {
        headers: ["Cor", "Uso principal"],
        rows: [
          ["Amarela", "Separa fluxos de sentidos opostos; também marca proibição de estacionar ou parar junto ao meio-fio"],
          ["Branca", "Separa fluxos do mesmo sentido; marca bordos, faixas de pedestres, linhas de retenção, setas e inscrições"],
          ["Vermelha", "Demarca ciclovias e ciclofaixas"],
          ["Azul", "Indica vagas de estacionamento reservadas, como as de pessoas com deficiência"],
        ],
      },
    },
    {
      heading: "O traço diz se pode cruzar",
      paragraphs: [
        "Linha contínua proíbe ultrapassar e mudar de faixa sobre ela. Linha tracejada permite, desde que haja segurança e sinalização com a seta.",
        "Na linha dupla mista (uma contínua e outra tracejada lado a lado), cada condutor obedece à linha que está do seu lado. Na linha dupla contínua, ninguém ultrapassa.",
      ],
    },
    {
      heading: "Marcas transversais e de canalização",
      paragraphs: [
        "Linha de retenção é a faixa branca contínua atravessada na pista: mostra onde o veículo para diante de um semáforo, de uma placa PARE ou de uma faixa de pedestres.",
        "Faixa de pedestres (zebrada) marca o local de travessia. Zebrado de canalização, com listras diagonais, aparece em bifurcações e ilhas pintadas: é área onde não se circula nem se para.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Em uma avenida de mão única com três faixas, as faixas são separadas por linhas brancas contínuas no trecho que antecede um viaduto. Você pode mudar de faixa ali?",
      steps: [
        "Branca: os fluxos são do mesmo sentido, o que está de acordo com a avenida de mão única.",
        "Contínua: proíbe transpor a linha.",
      ],
      answer: "Não. Nesse trecho, cada carro deve seguir na faixa em que está.",
    },
    {
      statement:
        "Em uma estrada de mão dupla, em reta, com boa visibilidade, a linha central é amarela e tracejada. O que ela informa?",
      steps: [
        "Amarela: do outro lado da linha vem trânsito em sentido oposto.",
        "Tracejada: a ultrapassagem é permitida.",
        "Mesmo permitida, ela só pode ser feita com espaço livre e sem veículo vindo no sentido contrário.",
      ],
      answer: "Fluxos opostos, com ultrapassagem permitida se houver segurança.",
    },
  ],
  commonMistakes: [
    "Achar que a cor branca separa sentidos opostos.",
    "Ultrapassar sobre linha contínua porque a reta parece livre.",
    "Na linha dupla mista, seguir a linha do lado do outro condutor.",
    "Usar o zebrado de canalização para parar ou fazer conversão.",
  ],
  summary: [
    "Amarela: sentidos opostos. Branca: mesmo sentido.",
    "Contínua: não cruze. Tracejada: pode cruzar com segurança.",
    "Linha dupla mista: obedeça a linha do seu lado.",
    "Linha de retenção: ponto de parada. Zebrado: área sem circulação.",
  ],
};
