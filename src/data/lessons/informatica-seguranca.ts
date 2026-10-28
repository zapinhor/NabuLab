import type { Lesson } from "@/types/lesson";

export const informaticaSegurancaLesson: Lesson = {
  subject: "informatica",
  topic: "Segurança digital",
  title: "Segurança digital: golpes, malware, senhas e criptografia",
  intro:
    "As questões de segurança digital cobram como reconhecer ameaças (phishing, ransomware) e quais práticas e conceitos reduzem riscos (senhas fortes, autenticação multifator, hash, criptografia e menor privilégio).",
  readingMinutes: 8,
  sections: [
    {
      heading: "Ameaças mais cobradas",
      paragraphs: [
        "Phishing é a tentativa de enganar a pessoa para que entregue dados ou clique em algo, imitando uma empresa, um banco ou um conhecido. O sinal típico é a mensagem urgente pedindo senha, código ou pagamento.",
        "Malware é qualquer software malicioso. Os tipos aparecem muito em prova.",
      ],
      table: {
        headers: ["Tipo", "O que faz"],
        rows: [
          ["Ransomware", "Bloqueia ou criptografa os dados e exige pagamento para liberá-los"],
          ["Vírus", "Se anexa a arquivos e se espalha quando eles são executados"],
          ["Worm", "Se propaga sozinho pela rede, sem precisar de um arquivo hospedeiro"],
          ["Cavalo de Troia (trojan)", "Parece um programa legítimo, mas executa ações maliciosas"],
          ["Spyware", "Coleta informações do usuário sem consentimento"],
        ],
      },
    },
    {
      heading: "Senhas e autenticação multifator",
      paragraphs: [
        "Senha forte é longa e exclusiva para cada serviço. Repetir senhas faz um vazamento em um site comprometer os outros. Gerenciadores de senha ajudam a manter senhas diferentes.",
        "A autenticação multifator (MFA) combina fatores de categorias diferentes: algo que você sabe (senha), algo que você tem (celular, token) e algo que você é (biometria). Duas senhas não contam como dois fatores, pois são da mesma categoria.",
      ],
    },
    {
      heading: "Hash x criptografia",
      paragraphs: [
        "Função hash criptográfica gera uma saída de tamanho fixo a partir de qualquer entrada. É de mão única: não se recupera o original a partir do hash. Serve para verificar integridade e armazenar senhas.",
        "Criptografia é reversível: quem tem a chave certa decifra a mensagem. Na criptografia simétrica, a mesma chave cifra e decifra. Na assimétrica, há um par de chaves: a pública cifra (ou verifica assinatura) e a privada decifra (ou assina).",
      ],
    },
    {
      heading: "Boas práticas e limites",
      paragraphs: [
        "Antivírus reduz riscos, mas não garante proteção absoluta: ameaças novas e golpes de engenharia social podem passar.",
        "O princípio do menor privilégio recomenda dar a cada usuário ou processo só as permissões necessárias para sua função. Se uma conta for invadida, o estrago fica limitado.",
      ],
      bullets: [
        "Manter sistema e aplicativos atualizados.",
        "Fazer backup, de preferência com uma cópia fora do computador.",
        "Desconfiar de links e anexos inesperados, mesmo de contatos conhecidos.",
      ],
    },
  ],
  workedExamples: [
    {
      statement:
        "Você recebe um e-mail com a logo do seu banco dizendo que sua conta será bloqueada hoje, com um link para \"confirmar seus dados\". O que é isso e o que fazer?",
      steps: [
        "Urgência, imitação de empresa conhecida e pedido de dados são sinais típicos de phishing.",
        "Não clique no link. Acesse o banco pelo aplicativo oficial ou pelo endereço digitado por você.",
      ],
      answer: "É uma tentativa de phishing; a conduta segura é ignorar o link e verificar pelo canal oficial.",
    },
    {
      statement: "Um sistema guarda as senhas dos usuários como hash. Se o banco de dados vazar, o atacante lê as senhas diretamente?",
      steps: [
        "Hash é de mão única: não existe chave para \"decifrar\".",
        "O atacante teria de tentar adivinhar senhas e comparar os hashes, o que é muito mais difícil com senhas longas e boas práticas, como o uso de salt.",
      ],
      answer: "Não. O hash não é reversível como a criptografia.",
    },
  ],
  commonMistakes: [
    "Achar que hash é a mesma coisa que criptografia reversível.",
    "Considerar senha + pergunta secreta como autenticação multifator (os dois são \"algo que você sabe\").",
    "Acreditar que antivírus dá proteção absoluta.",
    "Confundir ransomware (sequestra dados) com spyware (espiona).",
  ],
  summary: [
    "Phishing imita alguém de confiança para roubar dados.",
    "Ransomware bloqueia dados e pede resgate.",
    "Senha longa e única por serviço; MFA combina categorias diferentes.",
    "Hash é de mão única; criptografia é reversível com a chave.",
    "Menor privilégio: só as permissões necessárias.",
  ],
};
