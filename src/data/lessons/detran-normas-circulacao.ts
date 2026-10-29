import type { Lesson } from "@/types/lesson";

export const detranNormasCirculacaoLesson: Lesson = {
  subject: "legislacao-transito",
  topic: "Normas de circulação",
  title: "Normas de circulação: lado da via, preferência e velocidade",
  intro:
    "As normas gerais de circulação do Código de Trânsito Brasileiro (CTB) respondem a três perguntas que caem em toda prova teórica: por onde circular e ultrapassar, quem passa primeiro em um cruzamento e qual é o limite de velocidade quando não há placa.",
  readingMinutes: 7,
  sections: [
    {
      heading: "Lado da via e ultrapassagem",
      paragraphs: [
        "Como regra, a circulação é feita pela direita, e a faixa da esquerda fica para as ultrapassagens (art. 29, I). A ultrapassagem é feita pela esquerda, com sinalização e espaço suficiente (art. 29, IX).",
        "A exceção: quando o veículo da frente sinaliza que vai entrar à esquerda, a ultrapassagem é feita pela direita.",
      ],
      bullets: [
        "É proibido ultrapassar, em pista de mão dupla, nas curvas e aclives sem visibilidade suficiente, nas passagens de nível, pontes, viadutos e travessias de pedestres, salvo sinalização que permita (art. 32).",
        "Quem percebe que vai ser ultrapassado não deve acelerar e, se estiver na faixa da esquerda, deve passar para a da direita (art. 30).",
      ],
    },
    {
      heading: "Preferência em cruzamento sem sinalização",
      paragraphs: [
        "Quando não há placa nem semáforo, o art. 29, III, define a ordem de preferência.",
      ],
      table: {
        headers: ["Situação", "Quem tem preferência"],
        rows: [
          ["Um dos fluxos vem de rodovia", "Quem está circulando pela rodovia"],
          ["Rotatória", "Quem já está circulando na rotatória"],
          ["Demais casos", "Quem vem pela direita do condutor"],
        ],
      },
    },
    {
      heading: "Velocidade máxima quando não há placa",
      paragraphs: [
        "Havendo placa, vale a placa. Sem sinalização, valem os limites do art. 61 do CTB.",
      ],
      table: {
        headers: ["Tipo de via", "Limite"],
        rows: [
          ["Urbana de trânsito rápido", "80 km/h"],
          ["Urbana arterial", "60 km/h"],
          ["Urbana coletora", "40 km/h"],
          ["Urbana local", "30 km/h"],
          ["Rodovia de pista dupla", "110 km/h (automóveis, camionetas e motos); 90 km/h (demais)"],
          ["Rodovia de pista simples", "100 km/h (automóveis, camionetas e motos); 90 km/h (demais)"],
          ["Estrada (não pavimentada)", "60 km/h"],
        ],
      },
    },
    {
      heading: "Pedestres, ciclistas e passageiros",
      paragraphs: [
        "O CTB coloca a responsabilidade no maior: os veículos maiores respondem pela segurança dos menores, os motorizados pelos não motorizados e todos pela incolumidade dos pedestres (art. 29, § 2º).",
        "Na faixa de pedestres sem semáforo, o pedestre que atravessa tem prioridade (art. 70). Ao passar ou ultrapassar uma bicicleta, guarde ao menos 1,5 m de distância lateral (art. 201).",
        "O cinto é obrigatório para condutor e passageiros em todas as vias (art. 65). Crianças com menos de 10 anos que não tenham atingido 1,45 m de altura viajam no banco traseiro, em dispositivo de retenção adequado (art. 64).",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Você dirige um automóvel por uma estrada de terra, fora da cidade, e não há nenhuma placa de velocidade no trecho. Qual é o limite?",
      steps: [
        "Sem placa, vale a tabela do art. 61.",
        "Estrada de terra é estrada não pavimentada, e não rodovia.",
        "Para estradas, o limite é o mesmo para todos os veículos.",
      ],
      answer: "60 km/h.",
    },
    {
      statement:
        "Dois carros chegam juntos a um cruzamento de duas ruas da cidade, sem placa nem semáforo. O carro A tem o carro B à sua direita. Quem passa primeiro?",
      steps: [
        "Não é rodovia nem rotatória, então vale a regra dos demais casos.",
        "Nos demais casos, a preferência é de quem vem pela direita do condutor.",
        "Para o motorista de A, o carro B vem pela direita.",
      ],
      answer: "O carro B passa primeiro; o carro A espera.",
    },
  ],
  commonMistakes: [
    "Achar que em cruzamento sem sinalização tem preferência quem está na via mais larga ou quem chegou com mais velocidade.",
    "Confundir os limites urbanos: 40 km/h é da via coletora, e 30 km/h, da via local.",
    "Pensar que o cinto só é obrigatório em rodovia ou só para quem vai na frente.",
    "Ultrapassar pela direita sem que o veículo da frente tenha sinalizado entrada à esquerda.",
  ],
  summary: [
    "Circule pela direita; ultrapasse pela esquerda.",
    "Sem sinalização: rodovia, depois rotatória, depois quem vem pela direita.",
    "Urbanas sem placa: 80, 60, 40 e 30 km/h. Rodovias: 110/90 (pista dupla) e 100/90 (simples). Estradas: 60 km/h.",
    "O maior responde pela segurança do menor; pedestre na faixa tem prioridade.",
    "Cinto para todos, em todas as vias.",
  ],
};
