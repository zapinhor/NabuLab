import type { Lesson } from "@/types/lesson";

export const portuguesPontuacaoLesson: Lesson = {
  subject: "portugues",
  topic: "Pontuação",
  title: "Pontuação: quando usar e quando evitar a vírgula",
  intro:
    "A vírgula organiza o período e muda o sentido da frase. Nas provas, ela aparece em quatro situações principais: vocativo, termos intercalados, orações adverbiais deslocadas e orações adjetivas explicativas.",
  readingMinutes: 7,
  sections: [
    {
      heading: "A regra de ouro: não separe sujeito e verbo",
      paragraphs: [
        "Antes de pensar em onde colocar vírgula, lembre onde ela não pode ficar. Na ordem direta (sujeito, verbo, complementos), não se separa o sujeito do verbo nem o verbo dos seus complementos.",
        "Errado: \"Os alunos da turma da manhã, chegaram cedo.\" Certo: \"Os alunos da turma da manhã chegaram cedo.\" O sujeito longo não autoriza a vírgula.",
      ],
    },
    {
      heading: "Vocativo e termos intercalados",
      paragraphs: [
        "Vocativo é o termo usado para chamar ou se dirigir a alguém. Ele sempre vem separado por vírgula, em qualquer posição da frase.",
        "Termos intercalados (aposto explicativo, conjunções deslocadas, expressões como \"de acordo com o boletim\") ficam entre duas vírgulas. Se você tirar uma das vírgulas, a frase fica errada; se tirar as duas, muda a organização do período.",
      ],
      bullets: [
        "Vocativo: \"Pedro, feche a janela, por favor.\"",
        "Aposto explicativo: \"Ana, minha prima, mudou de cidade.\"",
        "Conjunção deslocada: \"A reunião, contudo, foi adiada.\"",
        "Expressão intercalada: \"Os médicos, de acordo com o boletim, mantiveram o tratamento.\"",
      ],
    },
    {
      heading: "Oração adverbial deslocada",
      paragraphs: [
        "A oração adverbial (de tempo, condição, causa etc.) costuma vir depois da principal. Quando ela vem antes, no início do período, usa-se vírgula para separá-la.",
        "Ordem direta: \"Os torcedores comemoraram quando o jogo acabou.\" Ordem inversa: \"Quando o jogo acabou, os torcedores comemoraram.\"",
      ],
    },
    {
      heading: "Oração adjetiva: restritiva x explicativa",
      paragraphs: [
        "Esta é a diferença mais cobrada. A oração adjetiva começa, em geral, pelo pronome relativo \"que\" e se refere a um substantivo. A vírgula decide o sentido.",
        "Sem vírgula, a oração é restritiva: ela separa uma parte do grupo. Com vírgulas, ela é explicativa: acrescenta uma informação sobre o grupo inteiro.",
      ],
      table: {
        headers: ["Frase", "Tipo", "Sentido"],
        rows: [
          ["Os candidatos que treinaram passaram na prova.", "Restritiva", "Só os candidatos que treinaram passaram; outros, não."],
          ["Os candidatos, que treinaram, passaram na prova.", "Explicativa", "Todos os candidatos passaram, e todos treinaram."],
        ],
      },
    },
  ],
  workedExamples: [
    {
      statement:
        "Qual frase está pontuada corretamente? (A) \"Quando chegou em casa o rapaz, dormiu.\" (B) \"Quando chegou em casa, o rapaz dormiu.\" (C) \"Quando, chegou em casa o rapaz dormiu.\"",
      steps: [
        "Identifique a oração adverbial: \"Quando chegou em casa\" indica tempo.",
        "Ela está no início do período, deslocada, então deve ser separada por vírgula.",
        "Em A, a vírgula separa o sujeito (\"o rapaz\") do verbo (\"dormiu\"), o que é proibido. Em C, a vírgula corta a própria oração adverbial.",
      ],
      answer: "B. A vírgula fica entre a oração adverbial deslocada e a oração principal.",
    },
    {
      statement:
        "Compare: \"Os funcionários que fizeram o curso receberam bônus\" e \"Os funcionários, que fizeram o curso, receberam bônus\". O que muda?",
      steps: [
        "Na primeira frase, sem vírgulas, a oração \"que fizeram o curso\" é restritiva: separa um grupo.",
        "Na segunda, com vírgulas, ela é explicativa: comenta algo sobre todos os funcionários.",
      ],
      answer:
        "Na primeira, só quem fez o curso recebeu bônus. Na segunda, todos os funcionários receberam bônus, e todos fizeram o curso.",
    },
  ],
  commonMistakes: [
    "Colocar vírgula entre sujeito longo e verbo.",
    "Usar só uma vírgula em termo intercalado, abrindo e não fechando.",
    "Achar que vírgula em oração adjetiva é opcional: ela muda o sentido.",
    "Esquecer a vírgula do vocativo quando ele aparece no fim da frase (\"Venha cá, Joana.\").",
  ],
  summary: [
    "Não separe sujeito e verbo, nem verbo e complemento.",
    "Vocativo sempre vem entre vírgulas ou separado por vírgula.",
    "Termo intercalado precisa de duas vírgulas.",
    "Oração adverbial no início do período pede vírgula.",
    "Sem vírgula, a adjetiva restringe; com vírgulas, explica.",
  ],
};
