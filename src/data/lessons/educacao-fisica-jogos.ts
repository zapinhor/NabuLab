import type { Lesson } from "@/types/lesson";

export const educacaoFisicaJogosLesson: Lesson = {
  subject: "educacao-fisica",
  topic: "Jogos",
  title: "Jogos: cooperação, competição e o papel das regras",
  intro:
    "Nas questões de Educação Física sobre jogos, o ENEM e os vestibulares não cobram regras oficiais. Eles pedem que você entenda como as regras de um jogo organizam a participação, a cooperação e a exclusão, e o que muda quando elas são modificadas.",
  readingMinutes: 6,
  sections: [
    {
      heading: "Jogo x esporte",
      paragraphs: [
        "O jogo tem regras combinadas entre os participantes, que podem ser adaptadas ao lugar, ao número de pessoas e ao grupo. O esporte tem regras oficiais, padronizadas por federações e confederações, e é organizado em competições.",
        "Uma mesma prática pode aparecer das duas formas: o futebol da rua, com gol de chinelo e time de quem chegar, é jogo; uma partida oficial, com árbitro e regras da federação, é esporte.",
      ],
    },
    {
      heading: "Jogos cooperativos e competitivos",
      paragraphs: [
        "No jogo competitivo, o objetivo é vencer o adversário. No cooperativo, o grupo enfrenta um desafio comum (tempo, percurso, tarefa) e o sucesso depende da participação e da ajuda de todos.",
        "Cooperar não significa ausência de desafio: o desafio pode ser difícil, mas não exige derrotar ninguém.",
      ],
    },
    {
      heading: "Regras não são neutras",
      paragraphs: [
        "As regras definem quem recebe a bola, quem decide, quem fica de fora e o que vale ponto. Por isso elas também produzem efeitos sociais, como incluir ou excluir colegas.",
        "Quando o professor modifica uma regra, ele pode redistribuir a participação, diminuir a centralização nos mais habilidosos e tornar a cooperação necessária. Comparar versões diferentes de um jogo ajuda a turma a analisar criticamente essas relações.",
      ],
      bullets: [
        "Jogos populares e tradicionais, como amarelinha, pião e pega-pega, variam conforme a região e são transmitidos entre gerações.",
        "Jogos de matriz indígena e africana fazem parte da cultura corporal brasileira e aparecem nas questões sobre diversidade cultural.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Na queimada, quem é atingido sai do jogo. O professor muda a regra: quem é atingido passa a jogar no outro time. Qual é o efeito principal dessa mudança?",
      steps: [
        "Na regra original, os atingidos ficam parados assistindo, e os menos habilidosos costumam sair primeiro.",
        "Com a nova regra, ninguém fica de fora: todos continuam participando até o fim.",
      ],
      answer: "Evita a exclusão e mantém todos participando, tirando a eliminação do centro do jogo.",
    },
    {
      statement:
        "Um grupo joga vôlei na praia com quatro pessoas de cada lado, sem rede oficial e combinando na hora quantos pontos vale a partida. Isso é jogo ou esporte?",
      steps: [
        "As regras foram combinadas pelo próprio grupo e adaptadas ao espaço e ao número de pessoas.",
        "Não há regras oficiais de federação nem competição organizada.",
      ],
      answer: "Jogo: as regras são flexíveis e combinadas pelos participantes.",
    },
  ],
  commonMistakes: [
    "Achar que jogo cooperativo é jogo sem desafio.",
    "Tratar as regras como algo só técnico, sem efeito sobre inclusão e participação.",
    "Confundir jogo (regras combinadas) com esporte (regras oficiais).",
    "Escolher a alternativa que valoriza só a vitória quando o enunciado fala em participação de todos.",
  ],
  summary: [
    "Jogo: regras combinadas e flexíveis. Esporte: regras oficiais e padronizadas.",
    "Cooperativo: desafio comum, sucesso de todos. Competitivo: vencer o adversário.",
    "Regras distribuem oportunidades e podem incluir ou excluir.",
    "Mudar regras pode tornar a cooperação necessária e ampliar a participação.",
  ],
};
