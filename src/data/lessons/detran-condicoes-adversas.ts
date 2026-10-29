import type { Lesson } from "@/types/lesson";

export const detranCondicoesAdversasLesson: Lesson = {
  subject: "direcao-defensiva",
  topic: "Condições adversas",
  title: "Direção defensiva: as seis condições adversas",
  intro:
    "Direção defensiva é dirigir prevendo o risco e agindo antes dele. A prova classifica os riscos em seis condições adversas e pergunta como agir em cada uma, principalmente na chuva, na neblina e diante do ofuscamento.",
  readingMinutes: 6,
  sections: [
    {
      heading: "As seis condições adversas",
      paragraphs: [
        "Condição adversa é qualquer fator que piora a segurança. Classificar corretamente é a primeira parte de muitas questões.",
      ],
      table: {
        headers: ["Condição", "Exemplos", "Como agir"],
        rows: [
          ["Luz", "Ofuscamento por farol, sol baixo de frente, transição dia/noite", "Reduzir a velocidade; diante do farol alto do outro, olhar para o bordo direito da pista"],
          ["Tempo", "Chuva, neblina, vento forte", "Reduzir a velocidade, aumentar a distância e usar farol baixo"],
          ["Via", "Buracos, curvas, pista escorregadia, obras", "Reduzir antes do trecho e evitar manobras bruscas"],
          ["Trânsito", "Congestionamento, horário de pico, eventos", "Manter distância e ter paciência; planejar o horário"],
          ["Veículo", "Pneus gastos, freios ruins, luzes queimadas", "Fazer manutenção preventiva e conferir antes de sair"],
          ["Condutor", "Sono, cansaço, álcool, medicamentos, emoções fortes", "Não dirigir nessas condições; parar e descansar"],
        ],
      },
    },
    {
      heading: "Chuva e aquaplanagem",
      paragraphs: [
        "Na chuva, os pneus têm menos aderência e a visibilidade cai. Reduza a velocidade, aumente a distância do veículo da frente e use o farol baixo.",
        "Aquaplanagem é quando uma lâmina de água fica entre o pneu e o asfalto. Segure firme o volante, tire o pé do acelerador e não freie bruscamente: espere o pneu voltar a tocar o chão.",
      ],
    },
    {
      heading: "Neblina e pisca-alerta",
      paragraphs: [
        "Na neblina, use farol baixo e, se houver, farol de neblina. O farol alto reflete nas gotículas e ofusca o próprio motorista.",
        "O pisca-alerta é para veículo imobilizado ou em situação de emergência (art. 40, V). Ligá-lo com o carro andando na chuva confunde quem vem atrás, que pode achar que você está parado.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "No fim da tarde, você dirige rumo ao oeste e o sol baixo bate de frente no para-brisa. Que condição adversa é essa e o que fazer?",
      steps: [
        "O problema é a claridade que atrapalha a visão: condição de luz.",
        "Reduza a velocidade, use o quebra-sol e mantenha o para-brisa limpo, que espalha menos o reflexo.",
      ],
      answer: "Condição adversa de luz; reduzir a velocidade e diminuir o ofuscamento.",
    },
    {
      statement:
        "Depois de uma noite quase sem dormir, uma pessoa decide pegar a estrada mesmo assim. Que condição adversa ela está criando?",
      steps: [
        "Sono e cansaço afetam reflexos, atenção e julgamento de quem dirige.",
        "O fator está na pessoa, não no carro, na via ou no clima.",
      ],
      answer: "Condição adversa do condutor. O certo é descansar antes de dirigir ou parar ao sentir sono.",
    },
  ],
  commonMistakes: [
    "Usar farol alto na neblina achando que ilumina mais.",
    "Frear forte na aquaplanagem.",
    "Ligar o pisca-alerta com o carro em movimento por causa da chuva.",
    "Classificar ofuscamento como condição de tempo; ele é de luz.",
  ],
  summary: [
    "Seis condições: luz, tempo, via, trânsito, veículo e condutor.",
    "Chuva: menos velocidade, mais distância, farol baixo.",
    "Aquaplanagem: volante firme, sem acelerar, sem frear bruscamente.",
    "Neblina: farol baixo ou de neblina, nunca alto.",
    "Pisca-alerta: só com o veículo imobilizado ou em emergência.",
  ],
};
