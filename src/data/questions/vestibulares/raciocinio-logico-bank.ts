import type { Question } from "@/types/question";

export const raciocinioLogicoQuestions: Question[] = [
  {
    "id": "raciocinio-logico-vest-v1-mc-i-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Observe a sequência 4, 7, 10, 13, ... Mantendo a regularidade, qual é o próximo termo?",
    "alternatives": [
      {
        "id": "A",
        "text": "14"
      },
      {
        "id": "B",
        "text": "15"
      },
      {
        "id": "C",
        "text": "16"
      },
      {
        "id": "D",
        "text": "17"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A sequência aumenta 3 unidades a cada passo. Assim, 13 + 3 = 16.",
    "alternativeExplanations": {
      "A": "Somar apenas 1 não mantém a diferença constante de 3.",
      "B": "Esse valor corresponderia a acrescentar 2, não 3.",
      "C": "Correta. As diferenças sucessivas são todas iguais a 3.",
      "D": "Esse resultado acrescenta 4 ao último termo."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "identificacao-de-padroes",
      "aplicacao-direta"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Qual das frases abaixo é uma proposição lógica, isto é, uma afirmação que pode ser classificada como verdadeira ou falsa?",
    "alternatives": [
      {
        "id": "A",
        "text": "Feche a janela."
      },
      {
        "id": "B",
        "text": "Que horas são?"
      },
      {
        "id": "C",
        "text": "O número 12 é par."
      },
      {
        "id": "D",
        "text": "x + 2 = 7."
      }
    ],
    "correctAnswer": "C",
    "explanation": "\"O número 12 é par\" é uma frase declarativa com valor lógico definido. Ordens, perguntas e sentenças abertas com variável não determinada não têm, nesse contexto, valor lógico definido.",
    "alternativeExplanations": {
      "A": "É uma ordem, não uma afirmação avaliável como verdadeira ou falsa.",
      "B": "É uma pergunta, portanto não possui valor lógico.",
      "C": "Correta. Trata-se de uma afirmação verdadeira.",
      "D": "Sem especificar x, a sentença é aberta e seu valor depende da variável."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "classificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Considere p: \"Ana estuda\" e q: \"Ana trabalha\". Se p é verdadeira e q é falsa, qual é o valor lógico de \"p e q\"?",
    "alternatives": [
      {
        "id": "A",
        "text": "Verdadeiro"
      },
      {
        "id": "B",
        "text": "Falso"
      },
      {
        "id": "C",
        "text": "Depende da ordem das frases"
      },
      {
        "id": "D",
        "text": "Não é possível determinar"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Uma conjunção p e q só é verdadeira quando ambas as proposições são verdadeiras. Como q é falsa, a conjunção é falsa.",
    "alternativeExplanations": {
      "A": "Seria verdadeira apenas se p e q fossem verdadeiras.",
      "B": "Correta. Uma das parcelas da conjunção é falsa.",
      "C": "A conjunção é comutativa; a ordem não altera seu valor lógico.",
      "D": "Os valores de p e q foram informados, então o resultado pode ser determinado."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "avaliacao-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma regra diz que o aluno recebe certificado se participou da oficina ou entregou o projeto, usando \"ou\" no sentido inclusivo. Em qual situação o certificado NÃO é concedido?",
    "alternatives": [
      {
        "id": "A",
        "text": "O aluno participou da oficina e também entregou o projeto."
      },
      {
        "id": "B",
        "text": "O aluno participou da oficina e não entregou o projeto."
      },
      {
        "id": "C",
        "text": "O aluno não participou da oficina e entregou o projeto."
      },
      {
        "id": "D",
        "text": "O aluno não participou da oficina e não entregou o projeto."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Na disjunção inclusiva, a expressão só é falsa quando as duas condições são falsas. Portanto, o certificado não é concedido apenas a quem não participou nem entregou.",
    "alternativeExplanations": {
      "A": "No \"ou\" inclusivo, as duas condições verdadeiras também satisfazem a regra.",
      "B": "Participar da oficina já torna a condição suficiente para o certificado.",
      "C": "Entregar o projeto já torna a condição suficiente para o certificado.",
      "D": "Correta. Com as duas condições falsas, a disjunção é falsa."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Qual é a negação correta de \"Todos os estudantes entregaram a atividade\"?",
    "alternatives": [
      {
        "id": "A",
        "text": "Nenhum estudante entregou a atividade."
      },
      {
        "id": "B",
        "text": "Pelo menos um estudante não entregou a atividade."
      },
      {
        "id": "C",
        "text": "Todos os estudantes deixaram de entregar a atividade."
      },
      {
        "id": "D",
        "text": "Pelo menos um estudante entregou a atividade."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Negar uma afirmação universal exige encontrar ao menos uma exceção: \"existe pelo menos um estudante que não entregou\".",
    "alternativeExplanations": {
      "A": "É uma afirmação mais forte que a negação; a frase original pode ser falsa mesmo que alguns tenham entregado.",
      "B": "Correta. Uma única exceção basta para negar \"todos\".",
      "C": "Também é mais forte do que necessário.",
      "D": "Essa frase pode ser verdadeira ao mesmo tempo que a original; portanto não é sua negação."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "equivalencia-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "A frase \"Se o cartão é válido, então a catraca libera a entrada\" é logicamente equivalente a qual afirmação?",
    "alternatives": [
      {
        "id": "A",
        "text": "Se a catraca não libera a entrada, então o cartão não é válido."
      },
      {
        "id": "B",
        "text": "Se a catraca libera a entrada, então o cartão é válido."
      },
      {
        "id": "C",
        "text": "Se o cartão não é válido, então a catraca não libera a entrada."
      },
      {
        "id": "D",
        "text": "O cartão é válido se, e somente se, a catraca libera a entrada."
      }
    ],
    "correctAnswer": "A",
    "explanation": "A contrapositiva de p → q é ¬q → ¬p. Ela é logicamente equivalente à implicação original.",
    "alternativeExplanations": {
      "A": "Correta. É exatamente a contrapositiva da implicação.",
      "B": "É a recíproca; não é equivalente em geral.",
      "C": "É a inversa; também não é equivalente em geral.",
      "D": "Transforma uma condição suficiente em condição necessária e suficiente."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "contrapositiva",
      "raciocinio-logico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma regra diz: \"Se a senha estiver correta, o sistema libera o acesso\". Considerando apenas essa regra, a senha correta é uma condição:",
    "alternatives": [
      {
        "id": "A",
        "text": "necessária para o acesso"
      },
      {
        "id": "B",
        "text": "suficiente para o acesso"
      },
      {
        "id": "C",
        "text": "impossível para o acesso"
      },
      {
        "id": "D",
        "text": "equivalente à negação do acesso"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A implicação afirma que senha correta garante acesso; portanto, a senha correta é condição suficiente para a liberação.",
    "alternativeExplanations": {
      "A": "A regra não diz que todo acesso só ocorre com senha correta; isso exigiria a recíproca.",
      "B": "Correta. A ocorrência da condição garante a consequência.",
      "C": "Contraria diretamente a regra dada.",
      "D": "Não há relação de equivalência com a negação do acesso."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicao-suficiente",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em uma turma, 20 alunos gostam de Matemática, 15 gostam de Física e 7 gostam das duas disciplinas. Quantos gostam de pelo menos uma das duas?",
    "alternatives": [
      {
        "id": "A",
        "text": "28"
      },
      {
        "id": "B",
        "text": "35"
      },
      {
        "id": "C",
        "text": "42"
      },
      {
        "id": "D",
        "text": "12"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Pelo princípio da inclusão-exclusão, 20 + 15 − 7 = 28. Os 7 que gostam das duas não podem ser contados duas vezes.",
    "alternativeExplanations": {
      "A": "Correta. Soma-se cada grupo e subtrai-se a interseção uma vez.",
      "B": "Conta os 7 alunos da interseção duas vezes.",
      "C": "Soma a interseção em vez de descontá-la.",
      "D": "Corresponde a uma diferença entre os grupos, não à união."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conjuntos",
      "diagrama-de-venn",
      "contagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Três caixas, A, B e C, guardam respectivamente um livro, uma caneca e um fone, um objeto por caixa. Sabe-se que o livro não está em A e a caneca está em B. Onde está o livro?",
    "alternatives": [
      {
        "id": "A",
        "text": "A"
      },
      {
        "id": "B",
        "text": "B"
      },
      {
        "id": "C",
        "text": "C"
      },
      {
        "id": "D",
        "text": "Não é possível determinar"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Como B contém a caneca, o livro não pode estar em B. A pista também exclui A. Logo, o livro só pode estar em C.",
    "alternativeExplanations": {
      "A": "A primeira pista exclui essa caixa.",
      "B": "B já contém a caneca.",
      "C": "Correta. É a única caixa restante compatível com as pistas.",
      "D": "As duas pistas são suficientes para determinar a posição do livro."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "eliminacao",
      "deducao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Começando com o número 7, uma operação permitida consiste apenas em somar ou subtrair 2. Qual dos números abaixo é impossível obter após qualquer quantidade de operações?",
    "alternatives": [
      {
        "id": "A",
        "text": "1"
      },
      {
        "id": "B",
        "text": "5"
      },
      {
        "id": "C",
        "text": "11"
      },
      {
        "id": "D",
        "text": "12"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Somar ou subtrair 2 preserva a paridade. Como 7 é ímpar, todos os números alcançáveis são ímpares. O número 12 é par.",
    "alternativeExplanations": {
      "A": "É alcançável: 7 − 2 − 2 − 2 = 1.",
      "B": "É alcançável com uma subtração de 2.",
      "C": "É alcançável com duas adições de 2.",
      "D": "Correta. A paridade permanece ímpar em todas as operações."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "paridade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma tabela registra 18 alunos no turno da manhã e 12 à tarde. Entre os da manhã, 10 usam ônibus; entre os da tarde, 5 usam ônibus. Quantos alunos não usam ônibus?",
    "alternatives": [
      {
        "id": "A",
        "text": "7"
      },
      {
        "id": "B",
        "text": "25"
      },
      {
        "id": "C",
        "text": "17"
      },
      {
        "id": "D",
        "text": "15"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Há 18 − 10 = 8 alunos sem ônibus pela manhã e 12 − 5 = 7 à tarde. Total: 8 + 7 = 15.",
    "alternativeExplanations": {
      "A": "Conta apenas os alunos da tarde que não usam ônibus.",
      "B": "Esse valor não corresponde ao complemento dos usuários de ônibus.",
      "C": "Esse resultado combina incorretamente os totais das linhas.",
      "D": "Correta. Soma 8 da manhã e 7 da tarde."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabela",
      "contagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-i-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Considere o argumento: \"Se chove, a rua molha. Está chovendo. Portanto, a rua molha.\" Qual descrição é correta?",
    "alternatives": [
      {
        "id": "A",
        "text": "O argumento é válido."
      },
      {
        "id": "B",
        "text": "A conclusão contradiz a primeira premissa."
      },
      {
        "id": "C",
        "text": "O argumento afirma o consequente."
      },
      {
        "id": "D",
        "text": "A conclusão não depende das premissas."
      }
    ],
    "correctAnswer": "A",
    "explanation": "O argumento tem a forma p → q; p; logo q, conhecida como modus ponens. Se as premissas forem verdadeiras, a conclusão não pode ser falsa.",
    "alternativeExplanations": {
      "A": "Correta. A conclusão decorre diretamente das duas premissas.",
      "B": "A conclusão é justamente a consequência prevista pela primeira premissa.",
      "C": "Afirmar o consequente seria partir de q para concluir p.",
      "D": "A conclusão é sustentada pelas premissas."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "modus-ponens"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se p é verdadeira e q é falsa, então a proposição \"p e q\" é falsa.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Uma conjunção só é verdadeira quando os dois componentes são verdadeiros. Com q falsa, a conjunção é falsa.",
    "alternativeExplanations": {
      "V": "Correto. Basta uma das proposições ser falsa para a conjunção ser falsa.",
      "F": "Incorreto. A tabela-verdade da conjunção confirma o valor falso."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "tabela-verdade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na disjunção inclusiva, se p e q são ambas verdadeiras, então \"p ou q\" também é verdadeira.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "No \"ou\" inclusivo, basta pelo menos uma proposição ser verdadeira. Quando ambas são verdadeiras, a disjunção permanece verdadeira.",
    "alternativeExplanations": {
      "V": "Correto. A disjunção inclusiva só é falsa quando p e q são ambas falsas.",
      "F": "Incorreto. Duas proposições verdadeiras satisfazem o \"ou\" inclusivo."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "tabela-verdade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A negação de \"Nenhum candidato faltou\" é \"Nenhum candidato compareceu\".",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "\"Nenhum candidato faltou\" equivale a dizer que todos compareceram. Sua negação é \"Pelo menos um candidato faltou\", não \"ninguém compareceu\".",
    "alternativeExplanations": {
      "V": "Incorreto. A frase proposta é muito mais forte e não representa a negação lógica.",
      "F": "Correto. Basta existir ao menos uma falta para negar a afirmação original."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "equivalencia-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A contrapositiva de \"Se estudo, então aprendo\" é \"Se não aprendo, então não estudo\".",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A contrapositiva de p → q é ¬q → ¬p. Portanto, a frase apresentada é equivalente à implicação original.",
    "alternativeExplanations": {
      "V": "Correto. O consequente é negado e passa a antecedente; o antecedente é negado e passa a consequente.",
      "F": "Incorreto. Essa é exatamente a contrapositiva da afirmação dada."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "contrapositiva",
      "analise-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Da regra \"Se um número é múltiplo de 4, então ele é par\" conclui-se que ser múltiplo de 4 é condição necessária para ser par.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Ser múltiplo de 4 é suficiente para ser par, mas não necessário: 6, por exemplo, é par e não é múltiplo de 4.",
    "alternativeExplanations": {
      "V": "Incorreto. A regra garante suficiência, não necessidade.",
      "F": "Correto. Existem números pares que não são múltiplos de 4."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicao-necessaria",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se 14 pessoas gostam de café, 9 gostam de chá e 5 gostam de ambos, então 23 pessoas gostam de pelo menos uma dessas bebidas.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A união é 14 + 9 − 5 = 18. Somar 14 + 9 conta as 5 pessoas da interseção duas vezes.",
    "alternativeExplanations": {
      "V": "Incorreto. O total de 23 não desconta a sobreposição.",
      "F": "Correto. O número correto de pessoas na união é 18."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conjuntos",
      "diagrama-de-venn",
      "contagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em uma fila de três pessoas, Bia está à frente de Caio e Caio está à frente de Davi. Logo, Bia está à frente de Davi.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A relação de ordem é transitiva: se Bia vem antes de Caio e Caio antes de Davi, então Bia vem antes de Davi.",
    "alternativeExplanations": {
      "V": "Correto. As duas pistas determinam a ordem Bia, Caio, Davi.",
      "F": "Incorreto. A conclusão é uma consequência necessária das duas pistas."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "ordenacao",
      "deducao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se começamos com um número par e, repetidamente, somamos 2, podemos obter um número ímpar.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Somar 2 preserva a paridade. Um número par permanece par após qualquer quantidade dessas operações.",
    "alternativeExplanations": {
      "V": "Incorreto. A operação não altera a paridade.",
      "F": "Correto. A paridade é um invariante nesse processo."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "paridade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma tabela mostra 8 alunos no grupo A e 11 no grupo B. Se os grupos não se sobrepõem, então há 20 alunos no total.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Como os grupos são distintos e sem sobreposição, o total é 8 + 11 = 19, não 20.",
    "alternativeExplanations": {
      "V": "Incorreto. A soma dos dois grupos é 19.",
      "F": "Correto. Sem sobreposição, não há qualquer elemento a descontar ou acrescentar."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabelas",
      "contagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Do argumento \"Se Pedro corre, então se cansa. Pedro não se cansou. Logo, Pedro não correu\" a conclusão decorre validamente das premissas.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A primeira premissa garante que toda corrida de Pedro, nesse cenário, produziria cansaço. Como foi informado que ele não se cansou, a hipótese de que correu é incompatível com as premissas; portanto, conclui-se que não correu.",
    "alternativeExplanations": {
      "V": "Correto. A conclusão usa a contrapositiva da regra dada.",
      "F": "Incorreto. Se Pedro tivesse corrido, a primeira premissa obrigaria o cansaço, contrariando a segunda informação."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "modus-tollens"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na sequência 1, 2, 4, 8, 16, mantendo a regra de duplicar o termo anterior, o próximo termo é 30.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A regra de duplicação fornece 16 × 2 = 32. Portanto, 30 não mantém a regularidade indicada.",
    "alternativeExplanations": {
      "V": "Incorreto. O próximo termo deve ser 32.",
      "F": "Correto. A afirmação rompe a regra multiplicativa da sequência."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "regularidade",
      "identificacao-de-padroes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-i-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A frase declarativa \"O número 12 é par\" é uma proposição lógica.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A frase possui valor lógico definido — neste caso, verdadeiro — e por isso é uma proposição.",
    "alternativeExplanations": {
      "V": "Correto. É uma sentença declarativa que pode ser classificada como verdadeira ou falsa.",
      "F": "Incorreto. A afirmação tem valor lógico definido e satisfaz o critério de proposição."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "classificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Qual é a negação correta da afirmação \"Todos os alunos que fizeram a prova entregaram o cartão-resposta\"?",
    "alternatives": [
      {
        "id": "A",
        "text": "Nenhum aluno que fez a prova entregou o cartão-resposta."
      },
      {
        "id": "B",
        "text": "Existe pelo menos um aluno que fez a prova e não entregou o cartão-resposta."
      },
      {
        "id": "C",
        "text": "Existe pelo menos um aluno que não fez a prova e entregou o cartão-resposta."
      },
      {
        "id": "D",
        "text": "Todos os alunos que não fizeram a prova deixaram de entregar o cartão-resposta."
      }
    ],
    "correctAnswer": "B",
    "explanation": "A frase original pode ser escrita como: para todo aluno, se fez a prova, então entregou o cartão. Sua negação afirma a existência de pelo menos um aluno que fez a prova e não entregou o cartão.",
    "alternativeExplanations": {
      "A": "É mais forte do que a negação: a original já seria falsa se apenas um aluno não entregasse.",
      "B": "Correta. Uma única exceção entre os que fizeram a prova basta para negar a afirmação universal.",
      "C": "Fala de alunos que não fizeram a prova e não contradiz a afirmação original.",
      "D": "Também trata de um grupo que a frase original não restringe."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "formalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "A afirmação \"Se o relatório foi aprovado, então o projeto pode seguir\" é falsa em qual situação?",
    "alternatives": [
      {
        "id": "A",
        "text": "O relatório foi aprovado e o projeto pode seguir."
      },
      {
        "id": "B",
        "text": "O relatório não foi aprovado e o projeto não pode seguir."
      },
      {
        "id": "C",
        "text": "O relatório não foi aprovado e o projeto pode seguir."
      },
      {
        "id": "D",
        "text": "O relatório foi aprovado e o projeto não pode seguir."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Uma implicação p → q é falsa somente quando o antecedente p é verdadeiro e o consequente q é falso.",
    "alternativeExplanations": {
      "A": "Verdadeiro implica verdadeiro torna a condicional verdadeira.",
      "B": "Com antecedente falso, a implicação é verdadeira na lógica proposicional.",
      "C": "Também tem antecedente falso, portanto não falsifica a implicação.",
      "D": "Correta. É o único caso em que p ocorre e q não ocorre."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "condicional",
      "tabela-verdade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma escola estabelece: \"Para participar da olimpíada, é necessário estar matriculado e é suficiente ter sido classificado na seletiva\". Qual interpretação é correta?",
    "alternatives": [
      {
        "id": "A",
        "text": "Todo matriculado participa da olimpíada."
      },
      {
        "id": "B",
        "text": "Quem não foi classificado necessariamente não está matriculado."
      },
      {
        "id": "C",
        "text": "Quem participa necessariamente está matriculado; quem foi classificado na seletiva participa."
      },
      {
        "id": "D",
        "text": "Estar matriculado e ser classificado são condições equivalentes."
      }
    ],
    "correctAnswer": "C",
    "explanation": "\"Necessário estar matriculado\" significa participação → matrícula. \"Suficiente ter sido classificado\" significa classificação → participação.",
    "alternativeExplanations": {
      "A": "Matrícula é necessária, mas não foi declarada suficiente.",
      "B": "A ausência de classificação não permite concluir nada sobre a matrícula.",
      "C": "Correta. Traduz corretamente as duas relações condicionais.",
      "D": "As condições desempenham papéis lógicos diferentes e não foram declaradas equivalentes."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicao-necessaria",
      "condicao-suficiente"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em um grupo de 50 pessoas, 28 assistem à série A, 25 à série B e 12 assistem às duas. Quantas não assistem a nenhuma das duas séries?",
    "alternatives": [
      {
        "id": "A",
        "text": "21"
      },
      {
        "id": "B",
        "text": "12"
      },
      {
        "id": "C",
        "text": "9"
      },
      {
        "id": "D",
        "text": "41"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Assistindo a pelo menos uma: 28 + 25 − 12 = 41. Portanto, 50 − 41 = 9 não assistem a nenhuma.",
    "alternativeExplanations": {
      "A": "Esse valor não decorre da inclusão-exclusão correta.",
      "B": "12 é o tamanho da interseção, não do complemento.",
      "C": "Correta. Primeiro calcula-se a união e depois seu complemento no grupo total.",
      "D": "41 é o número que assiste a pelo menos uma série."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "diagramas",
      "conjuntos",
      "inclusao-exclusao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Quatro pessoas — Ana, Bruno, Carla e Diego — sentam-se em uma fila de quatro lugares. Bruno deve ficar imediatamente à esquerda de Carla, e Diego não pode ocupar uma ponta. Qual das ordens abaixo é possível?",
    "alternatives": [
      {
        "id": "A",
        "text": "Diego, Bruno, Carla, Ana"
      },
      {
        "id": "B",
        "text": "Ana, Diego, Carla, Bruno"
      },
      {
        "id": "C",
        "text": "Bruno, Carla, Diego, Ana"
      },
      {
        "id": "D",
        "text": "Ana, Bruno, Diego, Carla"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Na primeira ordem, Bruno está imediatamente à esquerda de Carla e Diego ocupa o terceiro lugar, que não é ponta. As demais violam pelo menos uma restrição.",
    "alternativeExplanations": {
      "A": "Diego ocupa a primeira posição, que é uma ponta.",
      "B": "Bruno não está imediatamente à esquerda de Carla.",
      "C": "Correta. Satisfaz simultaneamente as duas condições.",
      "D": "Bruno e Carla não estão adjacentes."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "restricoes",
      "eliminacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Um tabuleiro começa com 7 peças pretas e 5 brancas. Em cada jogada, retiram-se duas peças da mesma cor e coloca-se uma peça preta. Qual propriedade permanece útil para analisar o processo?",
    "alternatives": [
      {
        "id": "A",
        "text": "A paridade do número de peças brancas permanece ímpar."
      },
      {
        "id": "B",
        "text": "O número total de peças permanece sempre 12."
      },
      {
        "id": "C",
        "text": "A quantidade de peças pretas nunca se altera."
      },
      {
        "id": "D",
        "text": "O número de peças brancas aumenta a cada jogada."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ao retirar duas brancas, a quantidade de brancas diminui em 2; ao retirar duas pretas, ela não muda. Portanto, a paridade das brancas permanece a mesma: inicialmente ímpar.",
    "alternativeExplanations": {
      "A": "Correta. A paridade das peças brancas é um invariante.",
      "B": "Cada jogada reduz o total de peças em 1.",
      "C": "A quantidade de pretas pode aumentar ou diminuir.",
      "D": "A quantidade de brancas nunca aumenta."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "paridade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma pesquisa cruzou turno e meio de transporte. De 40 alunos da manhã, 18 vão de ônibus e 12 de carro; os demais vão a pé. De 30 alunos da tarde, 9 vão de ônibus e 15 de carro; os demais vão a pé. Quantos alunos vão a pé ao todo?",
    "alternatives": [
      {
        "id": "A",
        "text": "10"
      },
      {
        "id": "B",
        "text": "16"
      },
      {
        "id": "C",
        "text": "21"
      },
      {
        "id": "D",
        "text": "26"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Pela manhã, 40 − 18 − 12 = 10 vão a pé. À tarde, 30 − 9 − 15 = 6. No total, 16.",
    "alternativeExplanations": {
      "A": "Conta apenas os alunos da manhã que vão a pé.",
      "B": "Correta. Soma 10 da manhã e 6 da tarde.",
      "C": "Esse resultado combina incorretamente categorias de transporte.",
      "D": "Esse valor não é o complemento correto dos demais meios."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabela",
      "analise-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Considere: \"Se a biblioteca está aberta, então há um funcionário no balcão. Não há funcionário no balcão.\" Qual conclusão é logicamente válida?",
    "alternatives": [
      {
        "id": "A",
        "text": "A biblioteca está aberta."
      },
      {
        "id": "B",
        "text": "A biblioteca não está aberta."
      },
      {
        "id": "C",
        "text": "Há um funcionário em outra sala."
      },
      {
        "id": "D",
        "text": "A biblioteca nunca abre."
      }
    ],
    "correctAnswer": "B",
    "explanation": "A estrutura é p → q e ¬q; logo ¬p, um modus tollens válido.",
    "alternativeExplanations": {
      "A": "Contradiz a conclusão obtida pela contrapositiva.",
      "B": "Correta. A ausência do consequente permite negar o antecedente.",
      "C": "Pode ser possível no mundo real, mas não decorre das premissas.",
      "D": "As premissas tratam apenas da situação considerada, não de todos os momentos."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "modus-tollens"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "A sequência é definida por a₁ = 2 e aₙ₊₁ = 2aₙ + 1. Qual é o quarto termo?",
    "alternatives": [
      {
        "id": "A",
        "text": "11"
      },
      {
        "id": "B",
        "text": "15"
      },
      {
        "id": "C",
        "text": "17"
      },
      {
        "id": "D",
        "text": "23"
      }
    ],
    "correctAnswer": "D",
    "explanation": "a₂ = 5, a₃ = 11 e a₄ = 23.",
    "alternativeExplanations": {
      "A": "11 é o terceiro termo, não o quarto.",
      "B": "Esse resultado não aplica corretamente a recorrência.",
      "C": "Esse valor não segue a regra 2aₙ + 1.",
      "D": "Correta. Três aplicações sucessivas da regra levam a 23."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "recorrencia",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Considere p verdadeira, q falsa e r verdadeira. Qual é o valor lógico de (p e q) ou r?",
    "alternatives": [
      {
        "id": "A",
        "text": "Verdadeiro"
      },
      {
        "id": "B",
        "text": "Falso"
      },
      {
        "id": "C",
        "text": "Indeterminado"
      },
      {
        "id": "D",
        "text": "Depende do valor de p"
      }
    ],
    "correctAnswer": "A",
    "explanation": "p e q é falsa. Então falsa ou r, com r verdadeira, resulta em verdadeira.",
    "alternativeExplanations": {
      "A": "Correta. A disjunção final contém r verdadeira.",
      "B": "Embora p e q seja falsa, r torna a disjunção verdadeira.",
      "C": "Todos os valores necessários foram informados.",
      "D": "O valor de p já foi dado."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "avaliacao-de-expressao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma porta abre se o cartão é válido e a senha está correta. O cartão de Léo é válido, mas a senha digitada está incorreta. O que se conclui pela regra?",
    "alternatives": [
      {
        "id": "A",
        "text": "A porta abre, porque uma condição é verdadeira."
      },
      {
        "id": "B",
        "text": "Nada pode ser concluído."
      },
      {
        "id": "C",
        "text": "A porta abre somente se o cartão for inválido."
      },
      {
        "id": "D",
        "text": "A porta não abre, porque a conjunção exige as duas condições."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A condição de abertura é uma conjunção. Com cartão válido e senha incorreta, uma das parcelas é falsa, então a condição completa não é satisfeita.",
    "alternativeExplanations": {
      "A": "Essa interpretação trataria a conjunção como uma disjunção.",
      "B": "Os valores das duas condições foram informados.",
      "C": "Não há regra relacionando cartão inválido à abertura.",
      "D": "Correta. As duas condições precisam ocorrer simultaneamente."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-m-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma vaga exige experiência em Python ou Java, usando \"ou\" inclusivo. Carla tem experiência nas duas linguagens; Diego não tem experiência em nenhuma. Quem satisfaz a condição?",
    "alternatives": [
      {
        "id": "A",
        "text": "Somente Carla"
      },
      {
        "id": "B",
        "text": "Somente Diego"
      },
      {
        "id": "C",
        "text": "Carla e Diego"
      },
      {
        "id": "D",
        "text": "Nenhum dos dois"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Com \"ou\" inclusivo, ter experiência em pelo menos uma linguagem é suficiente. Carla satisfaz a condição por ter ambas; Diego não satisfaz nenhuma.",
    "alternativeExplanations": {
      "A": "Correta. Duas condições verdadeiras também tornam o \"ou\" inclusivo verdadeiro.",
      "B": "Diego apresenta as duas condições falsas.",
      "C": "Diego não atende ao requisito.",
      "D": "Carla atende ao requisito em ambas as linguagens."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Da afirmação \"Se um arquivo foi criptografado corretamente, então não pode ser lido sem a chave\" e do fato de que um arquivo pôde ser lido sem a chave, conclui-se validamente que ele não foi criptografado corretamente.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A estrutura é modus tollens: p → q e ¬q implicam ¬p.",
    "alternativeExplanations": {
      "V": "Correto. A leitura sem chave nega a consequência prevista para a criptografia correta.",
      "F": "Incorreto. A conclusão decorre da contrapositiva da regra."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicional",
      "modus-tollens"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em uma turma de 60 alunos, 35 estudam Inglês, 30 estudam Espanhol e 15 estudam ambos. Logo, 12 alunos não estudam nenhum dos dois idiomas.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A união tem 35 + 30 − 15 = 50 alunos; portanto, 10 não estudam nenhum dos dois.",
    "alternativeExplanations": {
      "V": "Incorreto. O complemento da união contém 10 alunos.",
      "F": "Correto. O total 12 não resulta da inclusão-exclusão."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "diagramas",
      "conjuntos",
      "inclusao-exclusao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Três tarefas X, Y e Z serão executadas uma por vez. Se X deve ocorrer antes de Y e Z deve ocorrer depois de Y, então a única ordem possível é X, Y, Z.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "As relações X < Y e Y < Z impõem a cadeia X < Y < Z.",
    "alternativeExplanations": {
      "V": "Correto. As duas restrições determinam completamente a ordem.",
      "F": "Incorreto. Qualquer outra permutação viola ao menos uma restrição."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "ordenacao",
      "deducao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Se uma operação transforma qualquer número inteiro n em n + 4, então a classe de resto de n na divisão por 2 permanece invariável após qualquer número de operações.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Adicionar 4 não altera a paridade, pois 4 é múltiplo de 2.",
    "alternativeExplanations": {
      "V": "Correto. n e n+4 têm o mesmo resto módulo 2.",
      "F": "Incorreto. A diferença entre estados consecutivos é par."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "aritmetica-modular"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Uma tabela registra 24 vendas no setor A, sendo 15 à vista, e 36 no setor B, sendo 18 à vista. Portanto, exatamente 25 vendas foram a prazo.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Há 9 vendas a prazo no setor A e 18 no B, totalizando 27.",
    "alternativeExplanations": {
      "V": "Incorreto. A soma correta é 27.",
      "F": "Correto. O total afirmado subestima em duas unidades as vendas a prazo."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabelas",
      "analise-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "O argumento \"Se a taxa sobe, o financiamento fica mais caro. O financiamento ficou mais caro. Logo, a taxa subiu\" é logicamente válido apenas com as premissas apresentadas.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A forma p → q; q; logo p é a falácia da afirmação do consequente.",
    "alternativeExplanations": {
      "V": "Incorreto. O consequente verdadeiro não garante o antecedente.",
      "F": "Correto. O financiamento pode ter encarecido por outra causa."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "falacias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na sequência 2, 6, 12, 20, 30, as diferenças entre termos consecutivos são 4, 6, 8 e 10; por isso, mantendo o padrão, o próximo termo é 42.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "As diferenças crescem de 2 em 2; a próxima é 12, então 30 + 12 = 42.",
    "alternativeExplanations": {
      "V": "Correto. O padrão das diferenças determina o próximo termo.",
      "F": "Incorreto. A regularidade apresentada conduz a 42."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "regularidade",
      "analise-de-padroes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na lógica proposicional, uma condicional com antecedente falso e consequente verdadeiro assume valor lógico falso.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Uma implicação só é falsa no caso verdadeiro → falso. Falso → verdadeiro é verdadeiro.",
    "alternativeExplanations": {
      "V": "Incorreto. O caso F→V torna a condicional verdadeira.",
      "F": "Correto. A frase troca a única combinação que torna a implicação falsa."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "tabela-verdade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A expressão ¬(p e q) é logicamente equivalente a (¬p ou ¬q).",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "É uma aplicação direta da lei de De Morgan.",
    "alternativeExplanations": {
      "V": "Correto. ¬(p∧q) ≡ ¬p∨¬q.",
      "F": "Incorreto. A equivalência apresentada é válida."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "leis-de-de-morgan"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Se p é verdadeira e q é falsa, então (p ou q) e (¬q) é falsa.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "p ou q é verdadeira e ¬q também é verdadeira; portanto, a conjunção final é verdadeira.",
    "alternativeExplanations": {
      "V": "Incorreto. A expressão composta tem valor verdadeiro.",
      "F": "Correto. Avaliar os conectivos mostra que a afirmação está errada."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "avaliacao-de-expressao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A negação de \"Existe pelo menos um servidor que falhou\" é \"Existe pelo menos um servidor que não falhou\".",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A negação correta é \"Nenhum servidor falhou\" ou \"Todos os servidores não falharam\".",
    "alternativeExplanations": {
      "V": "Incorreto. As duas frases podem ser verdadeiras ao mesmo tempo.",
      "F": "Correto. Negar uma existência exige afirmar a ausência de qualquer caso."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "formalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-m-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "As proposições \"Se p, então q\" e \"Se não q, então não p\" têm sempre o mesmo valor lógico.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A segunda é a contrapositiva da primeira; são logicamente equivalentes.",
    "alternativeExplanations": {
      "V": "Correto. Coincidem em todas as linhas da tabela-verdade.",
      "F": "Incorreto. A contrapositiva preserva o valor lógico da implicação."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "condicional",
      "contrapositiva"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Quatro apresentações — A, B, C e D — ocorrerão em quatro horários consecutivos. Sabe-se que A ocorre antes de C; B não pode ser a primeira nem a última; e D ocorre imediatamente depois de A. Qual ordem satisfaz todas as restrições?",
    "alternatives": [
      {
        "id": "A",
        "text": "A, D, B, C"
      },
      {
        "id": "B",
        "text": "B, A, D, C"
      },
      {
        "id": "C",
        "text": "A, B, D, C"
      },
      {
        "id": "D",
        "text": "C, A, D, B"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A ordem A, D, B, C satisfaz as três condições simultaneamente.",
    "alternativeExplanations": {
      "A": "Correta. A vem antes de C, D está imediatamente após A e B está em posição interna.",
      "B": "B ocupa a primeira posição.",
      "C": "D não está imediatamente após A.",
      "D": "C aparece antes de A e B ocupa a última posição."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "restricoes",
      "deducao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um tabuleiro 8×8, colorido como um tabuleiro de xadrez, tem dois cantos opostos removidos. Deseja-se cobrir todas as casas restantes com dominós 1×2, cada um ocupando duas casas adjacentes. Qual conclusão é correta?",
    "alternatives": [
      {
        "id": "A",
        "text": "É sempre possível, pois restam 62 casas, um número par."
      },
      {
        "id": "B",
        "text": "É impossível apenas se os cantos removidos forem pretos."
      },
      {
        "id": "C",
        "text": "É impossível, pois os dois cantos opostos têm a mesma cor e cada dominó cobre uma casa de cada cor."
      },
      {
        "id": "D",
        "text": "É possível usando exatamente 31 dominós, independentemente das cores removidas."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Cantos opostos têm a mesma cor. Após removê-los, sobram 30 casas de uma cor e 32 da outra, enquanto cada dominó cobre uma de cada cor.",
    "alternativeExplanations": {
      "A": "Paridade do total não basta; o desequilíbrio entre as cores impede a cobertura.",
      "B": "A impossibilidade vale para qualquer par de cantos opostos.",
      "C": "Correta. A coloração fornece o invariante decisivo.",
      "D": "Ter 62 casas não garante um ladrilhamento válido."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "coloracao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma empresa classificou 120 atendimentos por turno e resultado. Pela manhã, 40 foram resolvidos e 20 não; à tarde, 45 foram resolvidos e 15 não. Escolhendo ao acaso um atendimento que não foi resolvido, qual é a probabilidade de ele ter ocorrido pela manhã?",
    "alternatives": [
      {
        "id": "A",
        "text": "1/6"
      },
      {
        "id": "B",
        "text": "1/2"
      },
      {
        "id": "C",
        "text": "2/3"
      },
      {
        "id": "D",
        "text": "4/7"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Entre os 35 atendimentos não resolvidos, 20 ocorreram pela manhã; logo, a probabilidade é 20/35 = 4/7.",
    "alternativeExplanations": {
      "A": "Usa 20 sobre o total de 120 e ignora o condicionamento.",
      "B": "Supõe divisão igual, apesar dos dados 20 e 15.",
      "C": "Esse valor está relacionado a outra razão da tabela.",
      "D": "Correta. O espaço amostral contém apenas os 35 não resolvidos."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabela",
      "probabilidade-condicional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Considere as premissas: (1) Se o sensor falha, então o alarme dispara. (2) Se o alarme dispara, então a equipe é avisada. (3) A equipe não foi avisada. Qual conclusão decorre necessariamente?",
    "alternatives": [
      {
        "id": "A",
        "text": "O sensor falhou, mas o alarme não disparou."
      },
      {
        "id": "B",
        "text": "Nada pode ser concluído sobre o alarme."
      },
      {
        "id": "C",
        "text": "O sensor não falhou, mas o alarme pode ter disparado."
      },
      {
        "id": "D",
        "text": "O alarme não disparou e o sensor não falhou."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Da segunda premissa e da ausência de aviso, conclui-se que o alarme não disparou. Da primeira e da ausência de alarme, conclui-se que o sensor não falhou.",
    "alternativeExplanations": {
      "A": "Contradiz as conclusões obtidas por modus tollens.",
      "B": "A premissa 2 determina que o alarme não disparou.",
      "C": "Se o alarme tivesse disparado, a equipe teria sido avisada.",
      "D": "Correta. São duas aplicações sucessivas de modus tollens."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "encadeamento-logico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "A sequência 1, 2, 6, 15, 31, ... é construída somando ao termo anterior os quadrados 1², 2², 3², 4², ... respectivamente. Qual é o sexto termo?",
    "alternatives": [
      {
        "id": "A",
        "text": "47"
      },
      {
        "id": "B",
        "text": "50"
      },
      {
        "id": "C",
        "text": "56"
      },
      {
        "id": "D",
        "text": "61"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A próxima diferença é 5² = 25; portanto, 31 + 25 = 56.",
    "alternativeExplanations": {
      "A": "Repete a diferença 16.",
      "B": "Soma 19, que não é o próximo quadrado.",
      "C": "Correta. A quinta diferença é 25.",
      "D": "Soma 30 ao último termo."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "regularidade",
      "diferencas-sucessivas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Para quantas atribuições de valores lógicos a p, q e r a proposição (p → q) e (q → r) e p é verdadeira?",
    "alternatives": [
      {
        "id": "A",
        "text": "1"
      },
      {
        "id": "B",
        "text": "2"
      },
      {
        "id": "C",
        "text": "3"
      },
      {
        "id": "D",
        "text": "4"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A conjunção exige p verdadeira; então p→q força q verdadeira, e q→r força r verdadeira. Só V,V,V satisfaz tudo.",
    "alternativeExplanations": {
      "A": "Correta. Há um único trio possível.",
      "B": "Tornar q ou r falso quebra uma das implicações.",
      "C": "As restrições não deixam três casos.",
      "D": "Esse número ignora as implicações encadeadas."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "satisfatibilidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Considere a expressão (p ou q) e (¬p ou r). Sabendo que q é falsa e que a expressão inteira é verdadeira, quais valores de p e r são necessários?",
    "alternatives": [
      {
        "id": "A",
        "text": "p = V e r = V"
      },
      {
        "id": "B",
        "text": "p = V e r = F"
      },
      {
        "id": "C",
        "text": "p = F e r = V"
      },
      {
        "id": "D",
        "text": "p = F e r = F"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Com q falsa, a primeira disjunção força p verdadeira. Então ¬p é falsa e a segunda disjunção força r verdadeira.",
    "alternativeExplanations": {
      "A": "Correta. As duas partes determinam p e r.",
      "B": "Com r falsa, a segunda disjunção falha.",
      "C": "Com p falsa, a primeira disjunção falha.",
      "D": "A primeira disjunção já seria falsa."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "satisfatibilidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma regra de acesso usa a condição (A ou B) e não(A e B), em que A e B representam duas credenciais. Em quais situações o acesso é liberado?",
    "alternatives": [
      {
        "id": "A",
        "text": "Somente quando A e B são ambas verdadeiras."
      },
      {
        "id": "B",
        "text": "Somente quando A e B são ambas falsas."
      },
      {
        "id": "C",
        "text": "Quando pelo menos uma é verdadeira, inclusive as duas."
      },
      {
        "id": "D",
        "text": "Quando exatamente uma entre A e B é verdadeira."
      }
    ],
    "correctAnswer": "D",
    "explanation": "A primeira parte exige ao menos uma credencial e a segunda proíbe as duas simultaneamente; portanto, exatamente uma deve ser verdadeira.",
    "alternativeExplanations": {
      "A": "Com as duas verdadeiras, a negação da conjunção é falsa.",
      "B": "Com ambas falsas, A ou B é falsa.",
      "C": "Essa seria apenas a disjunção inclusiva.",
      "D": "Correta. A expressão representa a disjunção exclusiva."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "equivalencia-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Qual é a negação lógica de \"Para todo servidor existe pelo menos um backup que pode restaurá-lo\"?",
    "alternatives": [
      {
        "id": "A",
        "text": "Para todo servidor, nenhum backup pode restaurá-lo."
      },
      {
        "id": "B",
        "text": "Existe pelo menos um servidor para o qual nenhum backup pode restaurá-lo."
      },
      {
        "id": "C",
        "text": "Existe pelo menos um backup que não restaura nenhum servidor."
      },
      {
        "id": "D",
        "text": "Nenhum servidor possui mais de um backup."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Negar ∀ servidor ∃ backup troca os quantificadores e nega a relação: existe um servidor para o qual nenhum backup funciona.",
    "alternativeExplanations": {
      "A": "Afirma falha para todos os servidores, mais forte que a negação.",
      "B": "Correta. Uma única exceção basta para negar a frase universal.",
      "C": "Um backup inútil não impede que existam outros adequados.",
      "D": "A quantidade de backups não é o ponto lógico da frase."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "formalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "A proposição (p → q) e (p → ¬q) é logicamente equivalente a:",
    "alternatives": [
      {
        "id": "A",
        "text": "p"
      },
      {
        "id": "B",
        "text": "q"
      },
      {
        "id": "C",
        "text": "¬p"
      },
      {
        "id": "D",
        "text": "p ou q"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Se p fosse verdadeira, as duas implicações exigiriam q e ¬q ao mesmo tempo. Com p falsa, ambas são verdadeiras. Logo, a expressão equivale a ¬p.",
    "alternativeExplanations": {
      "A": "Com p verdadeira, a expressão é impossível.",
      "B": "q não determina sozinho o resultado.",
      "C": "Correta. A expressão é verdadeira exatamente quando p é falsa.",
      "D": "Pode ser verdadeira em casos em que a expressão original é falsa."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "condicional",
      "simplificacao-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Considere as propriedades de um número inteiro n: P = \"n é múltiplo de 12\" e Q = \"n é múltiplo de 4\". Qual relação é correta?",
    "alternatives": [
      {
        "id": "A",
        "text": "P é necessária, mas não suficiente para Q."
      },
      {
        "id": "B",
        "text": "P é suficiente, mas não necessária para Q."
      },
      {
        "id": "C",
        "text": "P e Q são equivalentes."
      },
      {
        "id": "D",
        "text": "P não é nem necessária nem suficiente para Q."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Todo múltiplo de 12 é múltiplo de 4, então P é suficiente. Mas 8 é múltiplo de 4 e não de 12, logo P não é necessária.",
    "alternativeExplanations": {
      "A": "Inverte os papéis lógicos.",
      "B": "Correta. P→Q, mas Q não implica P.",
      "C": "A recíproca falha, por exemplo em n=8.",
      "D": "P é suficiente para Q."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicao",
      "necessaria-suficiente"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-mc-a-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em um grupo de 100 estudantes, 55 cursam Inglês, 45 Espanhol e 35 Francês. Sabe-se que 20 cursam Inglês e Espanhol, 18 Inglês e Francês, 15 Espanhol e Francês e 8 cursam os três. Quantos não cursam nenhum dos três?",
    "alternatives": [
      {
        "id": "A",
        "text": "2"
      },
      {
        "id": "B",
        "text": "10"
      },
      {
        "id": "C",
        "text": "18"
      },
      {
        "id": "D",
        "text": "26"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A união tem 55+45+35−20−18−15+8 = 90 estudantes. Logo, 10 ficam fora dos três conjuntos.",
    "alternativeExplanations": {
      "A": "Compensa incorretamente a interseção tripla.",
      "B": "Correta. O complemento da união é 10.",
      "C": "É o tamanho de uma interseção dupla.",
      "D": "Não decorre da inclusão-exclusão."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "diagramas",
      "conjuntos",
      "inclusao-exclusao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-01",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Organização de informações",
    "subtopic": "Tabelas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma tabela mostra que, no turno da manhã, 30 de 50 atendimentos foram resolvidos e, à tarde, 42 de 70 foram resolvidos. Como as duas taxas são de 60%, pode-se concluir que, escolhendo um atendimento resolvido ao acaso, a chance de ele ter ocorrido à tarde é 50%.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Entre os 72 atendimentos resolvidos, 42 são da tarde; a probabilidade é 42/72 = 7/12 ≈ 58,3%.",
    "alternativeExplanations": {
      "V": "Incorreto. Taxas iguais não implicam quantidades absolutas iguais.",
      "F": "Correto. O condicionamento deve usar os 72 atendimentos resolvidos."
    },
    "tags": [
      "organizacao",
      "tabela",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "organizacao-de-informacoes",
      "tabelas",
      "probabilidade-condicional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-02",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Argumentação",
    "subtopic": "Validade",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Das premissas \"p ou q\", \"se p então r\", \"se q então r\" conclui-se validamente r.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Se p ocorrer, a segunda premissa fornece r; se q ocorrer, a terceira fornece r. Como p ou q garante ao menos um dos casos, r é necessário.",
    "alternativeExplanations": {
      "V": "Correto. É uma prova por casos.",
      "F": "Incorreto. Não há atribuição com todas as premissas verdadeiras e r falsa."
    },
    "tags": [
      "argumentacao",
      "validade",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "argumentacao",
      "validade",
      "prova-por-casos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-03",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Sequências",
    "subtopic": "Regularidade",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se a sequência é definida por a₁ = 1 e aₙ₊₁ = 2aₙ + 1, então aₙ = 2ⁿ para todo n ≥ 1.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A fórmula já falha em n=1, pois daria 2. A expressão compatível é aₙ = 2ⁿ − 1.",
    "alternativeExplanations": {
      "V": "Incorreto. A fórmula 2ⁿ não reproduz a condição inicial.",
      "F": "Correto. A forma fechada correta é 2ⁿ − 1."
    },
    "tags": [
      "sequencias",
      "padroes",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sequencias",
      "regularidade",
      "raciocinio-indutivo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-04",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Proposições",
    "subtopic": "Valor lógico",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A proposição (p → q) ou (q → p) é falsa para alguma atribuição de valores lógicos a p e q.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Se p e q têm o mesmo valor, ambas as implicações são verdadeiras; se diferem, uma das duas direções é verdadeira. A disjunção é sempre verdadeira.",
    "alternativeExplanations": {
      "V": "Incorreto. Não existe linha da tabela-verdade em que as duas implicações sejam simultaneamente falsas.",
      "F": "Correto. A expressão é uma tautologia."
    },
    "tags": [
      "proposicoes",
      "valor-logico",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "proposicoes",
      "valor-logico",
      "tautologia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-05",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Conjunção",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A negação de (p e (q ou r)) é logicamente equivalente a (¬p) ou ((¬q) e (¬r)).",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Aplicando De Morgan duas vezes: ¬[p∧(q∨r)] = ¬p∨¬(q∨r) = ¬p∨(¬q∧¬r).",
    "alternativeExplanations": {
      "V": "Correto. A transformação preserva equivalência lógica.",
      "F": "Incorreto. A equivalência segue diretamente das leis de De Morgan."
    },
    "tags": [
      "conectivos",
      "conjuncao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "conjuncao",
      "leis-de-de-morgan"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-06",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Conectivos",
    "subtopic": "Disjunção",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A expressão (p ou q) e ¬(p e q) é verdadeira exatamente quando p e q têm valores lógicos diferentes.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "A primeira parte exige ao menos uma verdadeira e a segunda impede que ambas sejam verdadeiras. Restam os casos V/F e F/V.",
    "alternativeExplanations": {
      "V": "Correto. A expressão representa a disjunção exclusiva.",
      "F": "Incorreto. Nos casos V/V e F/F, a expressão é falsa."
    },
    "tags": [
      "conectivos",
      "disjuncao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "conectivos",
      "disjuncao",
      "equivalencia-logica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-07",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Negação",
    "subtopic": "Quantificadores",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A negação de \"Existe um aluno que resolveu todos os problemas\" é \"Todo aluno deixou de resolver pelo menos um problema\".",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Negar ∃ aluno ∀ problema R produz ∀ aluno ∃ problema ¬R.",
    "alternativeExplanations": {
      "V": "Correto. A negação troca os quantificadores e nega a relação.",
      "F": "Incorreto. A equivalência formal confirma a afirmação."
    },
    "tags": [
      "negacao",
      "quantificadores",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "negacao",
      "quantificadores",
      "formalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-08",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Equivalência",
    "subtopic": "Condicional",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A proposição \"Se p, então q\" é logicamente equivalente a \"Se q, então p\".",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A segunda é a recíproca. Com p falsa e q verdadeira, p→q é verdadeira e q→p é falsa.",
    "alternativeExplanations": {
      "V": "Incorreto. Uma implicação não equivale, em geral, à sua recíproca.",
      "F": "Correto. A equivalência válida é com a contrapositiva."
    },
    "tags": [
      "equivalencia",
      "contrapositiva",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "equivalencia",
      "condicional",
      "contraexemplo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-09",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Implicação",
    "subtopic": "Condição",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se P é condição suficiente para Q e Q é condição suficiente para R, então P é condição suficiente para R.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "P→Q e Q→R implicam P→R pela transitividade.",
    "alternativeExplanations": {
      "V": "Correto. O encadeamento garante R sempre que P ocorre.",
      "F": "Incorreto. A suficiência se transmite ao longo das implicações."
    },
    "tags": [
      "implicacao",
      "condicao-suficiente",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "implicacao",
      "condicao",
      "encadeamento-logico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-10",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Diagramas",
    "subtopic": "Conjuntos",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em um universo de 80 elementos, |A|=42, |B|=35 e |A∩B|=17. Se 20 elementos não pertencem nem a A nem a B, os dados são inconsistentes.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "|A∪B| = 42+35−17 = 60. Como o universo tem 80 elementos, exatamente 20 ficam fora da união.",
    "alternativeExplanations": {
      "V": "Incorreto. Os dados são consistentes.",
      "F": "Correto. O complemento da união possui exatamente 20 elementos."
    },
    "tags": [
      "diagramas",
      "conjuntos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "diagramas",
      "conjuntos",
      "inclusao-exclusao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-11",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Problemas lógicos",
    "subtopic": "Exclusão",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Cinco pessoas A, B, C, D e E serão ordenadas em fila. Se A deve vir antes de B, C imediatamente depois de B e E antes de A, então D não pode ocupar a primeira posição.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "F",
    "explanation": "A ordem D, E, A, B, C satisfaz todas as restrições e coloca D em primeiro. Logo, a proibição não decorre das pistas.",
    "alternativeExplanations": {
      "V": "Incorreto. Existe um contraexemplo válido com D em primeiro.",
      "F": "Correto. Uma única ordem válida com D na primeira posição refuta a afirmação."
    },
    "tags": [
      "problemas-logicos",
      "eliminacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "problemas-logicos",
      "exclusao",
      "contraexemplo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "raciocinio-logico-vest-v1-vf-a-12",
    "area": "Matemática",
    "subject": "raciocinio-logico",
    "subjectName": "Raciocínio Lógico",
    "topic": "Raciocínio quantitativo",
    "subtopic": "Invariantes",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Começando com o número 0, são permitidas apenas as operações somar 6 ou subtrair 4. Após qualquer quantidade de operações, é impossível obter um número ímpar.",
    "alternatives": [
      {
        "id": "V",
        "text": "Verdadeiro"
      },
      {
        "id": "F",
        "text": "Falso"
      }
    ],
    "correctAnswer": "V",
    "explanation": "Ambas as operações alteram o valor por uma quantidade par. Partindo de 0, a paridade permanece par.",
    "alternativeExplanations": {
      "V": "Correto. A paridade é um invariante do processo.",
      "F": "Incorreto. Nenhuma combinação de incrementos pares produz um número ímpar."
    },
    "tags": [
      "raciocinio-quantitativo",
      "invariante",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "raciocinio-quantitativo",
      "invariantes",
      "paridade"
    ],
    "origin": "nabulab"
  }
];
