import type { Lesson } from "@/types/lesson";

export const informaticaRedesLesson: Lesson = {
  subject: "informatica",
  topic: "Redes",
  title: "Redes de computadores: IP, máscara, DNS, TCP e UDP",
  intro:
    "As questões de redes cobram o papel de cada peça: o endereço IP identifica, a máscara define a rede, o roteador liga redes, o DNS traduz nomes e o TCP e o UDP transportam os dados de formas diferentes.",
  readingMinutes: 8,
  sections: [
    {
      heading: "Endereço IP",
      paragraphs: [
        "O endereço IP identifica logicamente uma interface de rede, para que os dados saibam de onde vêm e para onde vão. No IPv4, ele tem 32 bits, escritos em quatro números de 0 a 255 (ex.: 172.20.4.7).",
        "Dois dispositivos não podem usar o mesmo IP na mesma rede ao mesmo tempo: isso gera conflito de endereço.",
      ],
      bullets: [
        "Faixas privadas IPv4: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16.",
        "Endereços privados são usados em redes internas e não são roteados diretamente na internet.",
      ],
    },
    {
      heading: "Máscara de sub-rede",
      paragraphs: [
        "A máscara indica quais bits do IP formam a parte da rede. Com 255.255.255.0 (/24), os três primeiros números identificam a rede, e o último, o host.",
        "Exemplo: 10.1.5.40 com máscara /24 está na rede 10.1.5.0. O endereço 10.1.5.200 está na mesma rede; 10.1.6.200, não.",
        "Para calcular o tamanho de uma sub-rede, use 2 elevado ao número de bits de host. Em uma /27, sobram 5 bits: 2⁵ = 32 endereços, dos quais 30 podem ser usados por hosts (um é o endereço de rede e outro o de broadcast).",
      ],
    },
    {
      heading: "Roteador e DNS",
      paragraphs: [
        "O roteador encaminha pacotes entre redes diferentes, por exemplo entre a rede da sua casa e a internet.",
        "O DNS (Domain Name System) resolve nomes de domínio, como nabulab.org, em informações como o endereço IP do servidor. Sem ele, seria preciso decorar números.",
      ],
    },
    {
      heading: "TCP x UDP",
      paragraphs: [
        "Os dois são protocolos da camada de transporte, mas funcionam de jeitos diferentes.",
      ],
      table: {
        headers: ["Característica", "TCP", "UDP"],
        rows: [
          ["Conexão", "Orientado à conexão", "Sem conexão"],
          ["Confiabilidade", "Confirma entrega, ordena e retransmite segmentos perdidos", "Não garante entrega nem ordem"],
          ["Velocidade", "Mais sobrecarga", "Mais leve e rápido"],
          ["Usos típicos", "Páginas web, e-mail, transferência de arquivos", "Streaming, jogos online, chamadas de voz, consultas DNS"],
        ],
      },
    },
  ],
  workedExamples: [
    {
      statement:
        "Um computador usa IP 172.16.3.9 com máscara 255.255.255.0. Qual destes está na mesma rede local: 172.16.30.9, 172.16.3.150 ou 172.61.3.9?",
      steps: [
        "Com máscara 255.255.255.0, os três primeiros números definem a rede: 172.16.3.",
        "Só 172.16.3.150 começa com 172.16.3.",
      ],
      answer: "172.16.3.150",
    },
    {
      statement: "Quantos hosts utilizáveis há na sub-rede 10.0.0.0/28?",
      steps: [
        "IPv4 tem 32 bits. Com /28, sobram 32 − 28 = 4 bits para hosts.",
        "2⁴ = 16 endereços no total.",
        "Tire o endereço de rede e o de broadcast: 16 − 2 = 14.",
      ],
      answer: "14 hosts utilizáveis.",
    },
  ],
  commonMistakes: [
    "Confundir DNS (traduz nomes) com DHCP (distribui endereços IP automaticamente).",
    "Dizer que o UDP garante a entrega dos dados.",
    "Esquecer de subtrair rede e broadcast ao contar hosts de uma sub-rede.",
    "Achar que dois dispositivos podem dividir o mesmo IP na mesma rede local.",
  ],
  summary: [
    "IP identifica a interface; a máscara separa rede e host.",
    "Faixas privadas: 10.x, 172.16–31.x e 192.168.x.",
    "Roteador liga redes; DNS traduz nomes em IPs.",
    "TCP é confiável e ordenado; UDP é rápido e sem garantia.",
    "Hosts em sub-rede: 2^(bits de host) − 2.",
  ],
};
