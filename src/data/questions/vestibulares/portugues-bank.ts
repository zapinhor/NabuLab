import type { Question } from "@/types/question";

export const portuguesQuestions: Question[] = [
  {
    "id": "portugues-vest-v1-mc-i-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Interpretação textual",
    "subtopic": "Inferência",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Leia o trecho:\n\n\"Quando Marina chegou à biblioteca, encontrou as luzes apagadas e um aviso na porta: 'Retornaremos amanhã'. Ela guardou o caderno na mochila e seguiu para casa.\"\n\nO que se pode inferir do trecho?",
    "alternatives": [
      {
        "id": "A",
        "text": "Marina desistiu definitivamente de estudar."
      },
      {
        "id": "B",
        "text": "A biblioteca não estava atendendo naquele momento."
      },
      {
        "id": "C",
        "text": "Marina trabalha na biblioteca."
      },
      {
        "id": "D",
        "text": "O caderno de Marina pertencia à biblioteca."
      }
    ],
    "correctAnswer": "B",
    "explanation": "O texto não diz literalmente que a biblioteca estava fechada, mas as luzes apagadas, o aviso de retorno no dia seguinte e a decisão de Marina de ir embora permitem inferir que não havia atendimento naquele momento.",
    "alternativeExplanations": {
      "A": "O texto informa apenas que Marina voltou para casa; não permite concluir que ela abandonou os estudos.",
      "B": "Correta. A conclusão é construída a partir de várias pistas presentes no trecho.",
      "C": "Nada no texto indica que Marina seja funcionária da biblioteca.",
      "D": "O fato de ela guardar o caderno na mochila não indica que o objeto pertença à biblioteca."
    },
    "tags": [
      "interpretacao",
      "inferencia",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "interpretacao-textual",
      "inferencia",
      "leitura-de-pistas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-i-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Morfologia",
    "subtopic": "Classes de palavras",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Na frase \"O ônibus chegou muito cedo\", a palavra \"muito\" modifica \"cedo\". Nesse contexto, \"muito\" é classificado como:",
    "alternatives": [
      {
        "id": "A",
        "text": "substantivo"
      },
      {
        "id": "B",
        "text": "adjetivo"
      },
      {
        "id": "C",
        "text": "advérbio"
      },
      {
        "id": "D",
        "text": "pronome"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Em \"muito cedo\", \"muito\" intensifica o advérbio \"cedo\". Palavras invariáveis que modificam verbo, adjetivo ou outro advérbio são classificadas como advérbios.",
    "alternativeExplanations": {
      "A": "Substantivos nomeiam seres, objetos, ações, estados ou conceitos; não é a função exercida por 'muito' nesse trecho.",
      "B": "Adjetivos caracterizam substantivos; aqui, 'muito' não modifica um substantivo.",
      "C": "Correta. 'Muito' funciona como advérbio de intensidade, modificando 'cedo'.",
      "D": "Embora 'muito' possa funcionar como pronome em outros contextos, nesta frase ele modifica um advérbio."
    },
    "tags": [
      "morfologia",
      "adverbio",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "morfologia",
      "classes-de-palavras",
      "analise-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-i-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Sintaxe",
    "subtopic": "Orações subordinadas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em qual alternativa a oração destacada expressa causa?",
    "alternatives": [
      {
        "id": "A",
        "text": "Saímos cedo porque a estrada estava congestionada."
      },
      {
        "id": "B",
        "text": "Estudamos tanto que terminamos o conteúdo."
      },
      {
        "id": "C",
        "text": "Guardarei o ingresso para que você possa entrar."
      },
      {
        "id": "D",
        "text": "Voltarei quando a reunião terminar."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Em \"porque a estrada estava congestionada\", a oração apresenta o motivo de \"saímos cedo\"; portanto, estabelece relação de causa.",
    "alternativeExplanations": {
      "A": "Correta. O congestionamento é apresentado como causa da saída antecipada.",
      "B": "A oração introduz uma consequência do grau de estudo.",
      "C": "A oração expressa finalidade.",
      "D": "A oração estabelece relação temporal."
    },
    "tags": [
      "sintaxe",
      "oracao-subordinada",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "sintaxe",
      "oracoes-subordinadas",
      "relacoes-de-sentido"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Sintaxe",
    "subtopic": "Orações subordinadas",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"Como estava chovendo, cancelamos o passeio\", a oração \"Como estava chovendo\" expressa a causa do cancelamento.",
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
    "explanation": "Nesse uso, \"como\" introduz uma oração subordinada adverbial causal: a chuva é apresentada como motivo do cancelamento.",
    "alternativeExplanations": {
      "V": "Correto. A relação estabelecida entre as duas orações é de causa.",
      "F": "Incorreto. Nesse contexto, a oração introduzida por 'como' explica por que o passeio foi cancelado."
    },
    "tags": [
      "sintaxe",
      "oracao-subordinada",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "sintaxe",
      "oracoes-subordinadas",
      "relacao-causal"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Concordância",
    "subtopic": "Concordância verbal",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"Os alunos da turma chegou cedo\", a concordância verbal está de acordo com a norma-padrão.",
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
    "explanation": "O núcleo do sujeito \"Os alunos da turma\" é \"alunos\", que está no plural. Pela norma-padrão, o verbo deve concordar com esse núcleo: \"Os alunos da turma chegaram cedo\".",
    "alternativeExplanations": {
      "V": "Incorreto. O verbo no singular não concorda com o núcleo plural do sujeito.",
      "F": "Correto. A forma esperada pela norma-padrão é 'chegaram'."
    },
    "tags": [
      "concordancia",
      "verbo",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "concordancia",
      "concordancia-verbal",
      "revisao-de-frase"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Regência",
    "subtopic": "Regência verbal",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na norma-padrão tradicional, em \"Ela assistiu o filme ontem\", o verbo \"assistir\", empregado no sentido de \"ver\", dispensa preposição.",
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
    "explanation": "No sentido de ver ou presenciar, o verbo \"assistir\" rege tradicionalmente a preposição \"a\": \"Ela assistiu ao filme ontem\".",
    "alternativeExplanations": {
      "V": "Incorreto. Nesse emprego, a regência normativa prevê a preposição 'a'.",
      "F": "Correto. A construção recomendada pela norma-padrão tradicional é 'assistiu ao filme'."
    },
    "tags": [
      "regencia",
      "preposicao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "regencia",
      "regencia-verbal",
      "norma-padrao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-04",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Crase",
    "subtopic": "Fusão da preposição",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"Vou à escola pela manhã\", o acento grave indica a fusão da preposição \"a\", exigida por \"ir\", com o artigo feminino \"a\" que acompanha \"escola\".",
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
    "explanation": "Em \"ir a\" + \"a escola\", ocorre a fusão da preposição \"a\" com o artigo feminino \"a\". Essa crase é indicada graficamente pelo acento grave.",
    "alternativeExplanations": {
      "V": "Correto. O contexto admite tanto a preposição quanto o artigo feminino.",
      "F": "Incorreto. O acento grave representa justamente a ocorrência de crase nesse caso."
    },
    "tags": [
      "crase",
      "regencia",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "crase",
      "regencia",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-05",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Pontuação",
    "subtopic": "Inciso explicativo",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"Paulo, meu vizinho, viajou ontem\", as vírgulas isolam uma expressão explicativa sobre Paulo.",
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
    "explanation": "\"Meu vizinho\" funciona como aposto explicativo e aparece intercalado na oração; por isso, é isolado por vírgulas.",
    "alternativeExplanations": {
      "V": "Correto. A informação acrescentada explica quem é Paulo sem restringir sua identificação.",
      "F": "Incorreto. As vírgulas têm função sintática clara: isolar o aposto explicativo."
    },
    "tags": [
      "pontuacao",
      "virgula",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pontuacao",
      "virgula",
      "aposto-explicativo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-06",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Semântica",
    "subtopic": "Sentido contextual",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"A manga da camisa rasgou\" e em \"Comi uma manga no almoço\", a palavra \"manga\" apresenta o mesmo sentido.",
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
    "explanation": "A palavra \"manga\" assume sentidos diferentes conforme o contexto: em uma frase, é parte da camisa; na outra, é uma fruta.",
    "alternativeExplanations": {
      "V": "Incorreto. O contexto altera claramente o significado da palavra.",
      "F": "Correto. A primeira ocorrência se refere a vestuário; a segunda, a alimento."
    },
    "tags": [
      "semantica",
      "polissemia",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "semantica",
      "sentido-contextual",
      "polissemia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-07",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Figuras de linguagem",
    "subtopic": "Relações de sentido",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em \"Li Machado de Assis nas férias\", o nome do autor aparece no lugar de sua obra; por isso, o recurso é uma metáfora, e não uma metonímia.",
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
    "explanation": "A substituição do nome da obra pelo nome do autor baseia-se numa relação de proximidade entre autor e produção, característica da metonímia.",
    "alternativeExplanations": {
      "V": "Incorreto. Não há comparação implícita típica da metáfora; há relação autor–obra.",
      "F": "Correto. O exemplo é de metonímia."
    },
    "tags": [
      "figuras-de-linguagem",
      "metonimia",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "figuras-de-linguagem",
      "metonimia",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-08",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Variação linguística",
    "subtopic": "Adequação",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma mensagem enviada a um amigo pode empregar linguagem mais informal do que um requerimento dirigido a uma instituição, sem que isso signifique necessariamente erro linguístico.",
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
    "explanation": "A adequação linguística considera situação comunicativa, finalidade, interlocutor e gênero textual. Diferentes contextos podem exigir diferentes graus de formalidade.",
    "alternativeExplanations": {
      "V": "Correto. A escolha linguística precisa ser avaliada em relação ao contexto de uso.",
      "F": "Incorreto. Variação de registro não deve ser confundida automaticamente com erro."
    },
    "tags": [
      "variacao-linguistica",
      "adequacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "variacao-linguistica",
      "adequacao",
      "registro"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-i-09",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Funções da linguagem",
    "subtopic": "Foco no destinatário",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em um anúncio com a frase \"Experimente hoje e descubra um novo sabor!\", predomina uma orientação direta ao destinatário, característica da função conativa da linguagem.",
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
    "explanation": "Os verbos no imperativo dirigem-se ao leitor e procuram influenciar seu comportamento. Esse foco no destinatário caracteriza a função conativa ou apelativa.",
    "alternativeExplanations": {
      "V": "Correto. O anúncio busca provocar uma ação no receptor.",
      "F": "Incorreto. Os comandos 'experimente' e 'descubra' evidenciam o foco no destinatário."
    },
    "tags": [
      "funcoes-da-linguagem",
      "conativa",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes-da-linguagem",
      "funcao-conativa",
      "analise-de-genero"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-m-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Regência",
    "subtopic": "Regência verbal",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Assinale a alternativa que está de acordo com a regência verbal recomendada pela norma-padrão.",
    "alternatives": [
      {
        "id": "A",
        "text": "Os estudantes assistiram o documentário sobre o clima."
      },
      {
        "id": "B",
        "text": "A equipe obedeceu o regulamento da competição."
      },
      {
        "id": "C",
        "text": "Ela prefere mais trabalhar em casa do que no escritório."
      },
      {
        "id": "D",
        "text": "Os alunos aspiravam a uma vaga no programa de intercâmbio."
      }
    ],
    "correctAnswer": "D",
    "explanation": "No sentido de desejar, \"aspirar\" rege a preposição \"a\": \"aspirar a uma vaga\". Na norma-padrão tradicional, \"assistir\" no sentido de ver e \"obedecer\" regem \"a\"; \"preferir\" estabelece relação direta entre os termos, sem \"mais... do que\".",
    "alternativeExplanations": {
      "A": "Na norma-padrão tradicional, o esperado é 'assistiram ao documentário'.",
      "B": "O verbo 'obedecer' rege a preposição 'a': 'obedeceu ao regulamento'.",
      "C": "A construção normativa mais direta é 'prefere trabalhar em casa a trabalhar no escritório'.",
      "D": "Correta. 'Aspirar', no sentido de desejar, rege a preposição 'a'."
    },
    "tags": [
      "regencia",
      "preposicao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "regencia",
      "regencia-verbal",
      "norma-padrao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-m-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Crase",
    "subtopic": "Fusão da preposição",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Assinale a alternativa em que o uso do acento grave indicativo de crase está adequado à norma-padrão.",
    "alternatives": [
      {
        "id": "A",
        "text": "O relatório foi entregue à diretora da escola."
      },
      {
        "id": "B",
        "text": "O relatório foi entregue à João."
      },
      {
        "id": "C",
        "text": "Começaremos à trabalhar às oito horas."
      },
      {
        "id": "D",
        "text": "A equipe ficou frente à frente durante a discussão."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Em \"entregue à diretora\", o verbo exige a preposição \"a\" e o substantivo feminino admite o artigo \"a\", produzindo a crase. Não há crase antes de nome masculino ou verbo, e a expressão \"frente a frente\" não recebe artigo entre os termos.",
    "alternativeExplanations": {
      "A": "Correta. Há fusão da preposição 'a' com o artigo feminino 'a'.",
      "B": "Não se usa crase diante de nome masculino nesse contexto.",
      "C": "Verbos não são antecedidos por artigo feminino; portanto não ocorre crase antes de 'trabalhar'.",
      "D": "A expressão 'frente a frente' é usada sem artigo e, portanto, sem crase."
    },
    "tags": [
      "crase",
      "regencia",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "crase",
      "regencia",
      "analise-de-uso"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-m-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Pontuação",
    "subtopic": "Inciso explicativo",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Qual alternativa emprega as vírgulas de modo a isolar corretamente uma expressão intercalada?",
    "alternatives": [
      {
        "id": "A",
        "text": "O projeto porém foi aprovado pela comissão."
      },
      {
        "id": "B",
        "text": "O projeto, porém, foi aprovado pela comissão."
      },
      {
        "id": "C",
        "text": "O projeto porém, foi aprovado pela comissão."
      },
      {
        "id": "D",
        "text": "O projeto, porém foi aprovado pela comissão."
      }
    ],
    "correctAnswer": "B",
    "explanation": "O conectivo \"porém\", quando intercalado, deve ser isolado por vírgulas. A alternativa B marca adequadamente os dois limites da expressão.",
    "alternativeExplanations": {
      "A": "Faltam as vírgulas que delimitam a expressão intercalada.",
      "B": "Correta. As duas vírgulas isolam 'porém'.",
      "C": "Há apenas a vírgula de fechamento.",
      "D": "Há apenas a vírgula de abertura."
    },
    "tags": [
      "pontuacao",
      "virgula",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pontuacao",
      "virgula",
      "expressao-intercalada"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Pontuação",
    "subtopic": "Inciso explicativo",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"Os pesquisadores, segundo o relatório, repetiram o teste\", a retirada das duas vírgulas preservaria a mesma organização sintática e a mesma clareza do período.",
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
    "explanation": "\"Segundo o relatório\" é uma expressão intercalada que interrompe a sequência principal \"Os pesquisadores repetiram o teste\". As vírgulas sinalizam essa inserção.",
    "alternativeExplanations": {
      "V": "Incorreto. Sem a pontuação, a estrutura perde a marcação da expressão intercalada e a leitura se torna menos clara.",
      "F": "Correto. As vírgulas exercem função de delimitação sintática."
    },
    "tags": [
      "pontuacao",
      "virgula",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pontuacao",
      "virgula",
      "efeito-de-sentido"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Semântica",
    "subtopic": "Sentido contextual",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"Depois de meses de seca, a cidade finalmente respirou com a chegada da chuva\", o verbo \"respirou\" pode ser interpretado figurativamente como sinal de alívio.",
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
    "explanation": "No contexto, \"a cidade respirou\" não descreve um ato fisiológico da cidade; a construção sugere alívio ou recuperação após a seca.",
    "alternativeExplanations": {
      "V": "Correto. O contexto desloca o verbo de seu sentido literal para um sentido figurado.",
      "F": "Incorreto. A leitura figurada é sustentada pelo contexto."
    },
    "tags": [
      "semantica",
      "polissemia",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "semantica",
      "sentido-contextual",
      "linguagem-figurada"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Figuras de linguagem",
    "subtopic": "Relações de sentido",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em \"O estádio explodiu de alegria quando saiu o gol\", a expressão atribui literalmente uma explosão física ao estádio.",
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
    "explanation": "A frase usa linguagem figurada para intensificar a reação coletiva do público. Não há indicação de explosão material do edifício.",
    "alternativeExplanations": {
      "V": "Incorreto. A leitura literal não corresponde ao efeito expressivo do enunciado.",
      "F": "Correto. A construção produz efeito de intensidade por sentido figurado."
    },
    "tags": [
      "figuras-de-linguagem",
      "metonimia",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "figuras-de-linguagem",
      "sentido-figurado",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-04",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Variação linguística",
    "subtopic": "Adequação",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em uma entrevista de emprego formal, escolher \"A gente fez os projetos tudo\" produz o mesmo grau de adequação à norma-padrão que \"Nós realizamos todos os projetos\", independentemente das expectativas do contexto.",
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
    "explanation": "A avaliação da adequação depende do contexto. Uma entrevista formal pode exigir registro mais monitorado e próximo da norma-padrão; por isso, não se pode afirmar equivalência automática entre as duas formulações em qualquer situação.",
    "alternativeExplanations": {
      "V": "Incorreto. A adequação não pode ser separada do contexto comunicativo.",
      "F": "Correto. Diferentes variantes podem ter valores sociais e graus de formalidade diferentes conforme a situação."
    },
    "tags": [
      "variacao-linguistica",
      "adequacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "variacao-linguistica",
      "adequacao",
      "registro-formal"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-05",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Funções da linguagem",
    "subtopic": "Foco no destinatário",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em \"Não perca a oportunidade: inscreva-se agora!\", o uso do imperativo contribui para a predominância da função conativa.",
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
    "explanation": "A função conativa centra-se no destinatário e busca levá-lo a agir. Formas imperativas como \"não perca\" e \"inscreva-se\" reforçam esse objetivo.",
    "alternativeExplanations": {
      "V": "Correto. A escolha verbal cria um apelo direto ao receptor.",
      "F": "Incorreto. O caráter persuasivo e o imperativo são marcas típicas da função conativa."
    },
    "tags": [
      "funcoes-da-linguagem",
      "conativa",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes-da-linguagem",
      "funcao-conativa",
      "marcas-linguisticas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-06",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Textualidade",
    "subtopic": "Progressão temática",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Leia:\n\n\"Marina comprou um livro novo. A obra reúne contos de autores brasileiros. Ela pretende levá-la para a viagem.\"\n\nNo trecho, o pronome \"ela\" retoma \"Marina\" e o pronome \"la\", em \"levá-la\", retoma \"a obra\".",
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
    "explanation": "Os pronomes estabelecem coesão referencial: \"ela\" recupera a pessoa mencionada anteriormente e \"la\" substitui o referente feminino \"a obra\".",
    "alternativeExplanations": {
      "V": "Correto. As retomadas evitam repetição e mantêm a continuidade temática.",
      "F": "Incorreto. Os referentes são identificáveis pelas relações gramaticais e pelo sentido do trecho."
    },
    "tags": [
      "coesao",
      "referenciacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "textualidade",
      "coesao-referencial",
      "referenciacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-07",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Interpretação textual",
    "subtopic": "Inferência",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Leia:\n\n\"Rafael levou um guarda-chuva embora o céu estivesse completamente azul. Duas horas depois, voltou para casa com a roupa seca e o guarda-chuva ainda fechado.\"\n\nÉ possível inferir que necessariamente choveu durante o período em que Rafael esteve fora.",
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
    "explanation": "O texto informa apenas que Rafael levou o guarda-chuva e voltou com ele fechado e com a roupa seca. Isso não permite afirmar que tenha chovido.",
    "alternativeExplanations": {
      "V": "Incorreto. A inferência proposta vai além das evidências do texto.",
      "F": "Correto. As pistas não sustentam a conclusão de que houve chuva."
    },
    "tags": [
      "interpretacao",
      "inferencia",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "interpretacao-textual",
      "inferencia",
      "limites-da-inferencia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-08",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Morfologia",
    "subtopic": "Classes de palavras",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"Ela chegou bastante cedo\", a palavra \"bastante\" funciona como advérbio porque modifica \"cedo\"; já em \"Havia bastantes motivos\", ela varia em número e acompanha um substantivo.",
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
    "explanation": "A classe ou função de algumas palavras depende do contexto. Em \"bastante cedo\", a palavra é invariável e intensifica um advérbio; em \"bastantes motivos\", concorda com o substantivo.",
    "alternativeExplanations": {
      "V": "Correto. A análise morfológica precisa considerar o emprego concreto da palavra.",
      "F": "Incorreto. Os dois usos têm comportamentos morfológicos diferentes."
    },
    "tags": [
      "morfologia",
      "adverbio",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "morfologia",
      "classes-de-palavras",
      "analise-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-m-09",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Sintaxe",
    "subtopic": "Orações subordinadas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"Embora estivesse cansada, Júlia terminou o relatório\", a oração iniciada por \"embora\" expressa causa.",
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
    "explanation": "A conjunção \"embora\" introduz uma relação concessiva: o cansaço poderia dificultar a ação, mas não impediu que Júlia terminasse o relatório.",
    "alternativeExplanations": {
      "V": "Incorreto. A relação é de concessão, não de causa.",
      "F": "Correto. O período contrapõe uma circunstância desfavorável ao fato que efetivamente ocorreu."
    },
    "tags": [
      "sintaxe",
      "oracao-subordinada",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "sintaxe",
      "oracoes-subordinadas",
      "concessao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-a-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Figuras de linguagem",
    "subtopic": "Relações de sentido",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia o trecho autoral:\n\n\"Na estante, havia Drummond, Clarice e Guimarães Rosa. Escolhi Clarice para a viagem.\"\n\nO efeito de sentido de \"Escolhi Clarice\" decorre principalmente de:",
    "alternatives": [
      {
        "id": "A",
        "text": "personificação, pois um objeto recebe ação humana"
      },
      {
        "id": "B",
        "text": "metonímia, pois o nome da autora representa uma obra sua"
      },
      {
        "id": "C",
        "text": "eufemismo, pois a ideia de leitura é suavizada"
      },
      {
        "id": "D",
        "text": "antítese, pois autores opostos são colocados lado a lado"
      }
    ],
    "correctAnswer": "B",
    "explanation": "O contexto da estante e da escolha para a viagem permite entender \"Clarice\" como \"uma obra de Clarice Lispector\". Há uma relação de proximidade entre autora e obra, característica da metonímia.",
    "alternativeExplanations": {
      "A": "Não há atribuição de comportamento humano a um ser inanimado.",
      "B": "Correta. O nome da autora é empregado no lugar de sua obra.",
      "C": "Não há suavização de uma ideia desagradável.",
      "D": "A simples enumeração de autores não cria necessariamente oposição semântica."
    },
    "tags": [
      "figuras-de-linguagem",
      "metonimia",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "figuras-de-linguagem",
      "metonimia",
      "efeito-de-sentido"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-a-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Variação linguística",
    "subtopic": "Adequação",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um pesquisador registra duas falas sobre o mesmo acontecimento:\n\nI. Em uma conversa entre amigos: \"Mano, aquele ônibus demorou demais, cê é louco.\"\nII. Em um relatório de atendimento: \"O veículo apresentou atraso de aproximadamente quarenta minutos.\"\n\nA comparação permite concluir que:",
    "alternatives": [
      {
        "id": "A",
        "text": "a fala I é linguisticamente inválida por não seguir a norma-padrão"
      },
      {
        "id": "B",
        "text": "a fala II é sempre superior, independentemente da situação comunicativa"
      },
      {
        "id": "C",
        "text": "as escolhas linguísticas variam conforme interlocutores, gênero e finalidade"
      },
      {
        "id": "D",
        "text": "somente a fala I apresenta marcas de uma variedade da língua"
      }
    ],
    "correctAnswer": "C",
    "explanation": "As duas formulações pertencem ao português e refletem escolhas adequadas a situações distintas. A conversa informal admite marcas coloquiais; o relatório favorece maior monitoramento e precisão.",
    "alternativeExplanations": {
      "A": "Variação linguística não equivale automaticamente a erro; a fala deve ser avaliada no contexto.",
      "B": "Não existe variedade universalmente superior para todos os contextos.",
      "C": "Correta. O registro é condicionado pela situação comunicativa e pelo gênero textual.",
      "D": "Toda produção linguística manifesta escolhas de variedade e registro, inclusive a formal."
    },
    "tags": [
      "variacao-linguistica",
      "adequacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "variacao-linguistica",
      "adequacao",
      "analise-sociolinguistica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-a-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Funções da linguagem",
    "subtopic": "Foco no destinatário",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em uma campanha de doação de sangue, lê-se:\n\n\"Seu gesto pode mudar uma história. Procure o hemocentro mais próximo e doe.\"\n\nEmbora outras funções da linguagem possam estar presentes, predomina a função:",
    "alternatives": [
      {
        "id": "A",
        "text": "metalinguística, porque o texto explica o próprio código"
      },
      {
        "id": "B",
        "text": "fática, porque testa apenas o canal de comunicação"
      },
      {
        "id": "C",
        "text": "conativa, porque procura orientar a ação do destinatário"
      },
      {
        "id": "D",
        "text": "referencial, porque se limita a apresentar dados objetivos"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Os verbos \"procure\" e \"doe\" dirigem-se diretamente ao leitor com finalidade persuasiva. Isso faz predominar a função conativa, ainda que haja conteúdo informativo e expressivo no enunciado.",
    "alternativeExplanations": {
      "A": "O texto não explica palavras, signos ou o próprio sistema linguístico.",
      "B": "Não há simples estabelecimento ou verificação do canal.",
      "C": "Correta. O objetivo central é levar o destinatário a realizar uma ação.",
      "D": "O texto não se limita à transmissão neutra de informações; contém apelo explícito."
    },
    "tags": [
      "funcoes-da-linguagem",
      "conativa",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes-da-linguagem",
      "funcao-conativa",
      "predominancia-funcional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-a-04",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Textualidade",
    "subtopic": "Progressão temática",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia:\n\n\"Os moradores cobraram providências da prefeitura. O órgão informou que uma equipe seria enviada ao bairro. A medida, segundo a nota, começaria na segunda-feira.\"\n\nNo trecho, a expressão \"A medida\" apresenta um problema de coesão porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "não há qualquer expressão anterior que possa ser retomada"
      },
      {
        "id": "B",
        "text": "o referente é pouco preciso: pode remeter ao envio da equipe ou a outra providência mencionada implicitamente"
      },
      {
        "id": "C",
        "text": "substantivos não podem retomar informações anteriores"
      },
      {
        "id": "D",
        "text": "toda retomada coesiva deve ser feita exclusivamente por pronome"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A expressão \"A medida\" funciona como retomada, mas seu referente não fica completamente delimitado: pode designar o envio da equipe ou, de modo mais amplo, uma providência da prefeitura. A ambiguidade reduz a precisão referencial.",
    "alternativeExplanations": {
      "A": "Há conteúdos anteriores potencialmente retomáveis; o problema é haver mais de um referente plausível.",
      "B": "Correta. A retomada existe, mas não é suficientemente específica.",
      "C": "Substantivos e expressões nominais podem exercer função coesiva.",
      "D": "A coesão referencial pode ser construída por pronomes, sinônimos, hiperônimos e expressões nominais."
    },
    "tags": [
      "coesao",
      "referenciacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "textualidade",
      "coesao-referencial",
      "ambiguidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-mc-a-05",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Interpretação textual",
    "subtopic": "Inferência",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia o trecho:\n\n\"Depois de anunciar pela terceira vez que a obra terminaria 'no próximo mês', o síndico encerrou a reunião sob aplausos discretos. No elevador, um morador comentou: 'Dessa vez vai. Como das outras.'\"\n\nA fala final sugere que o morador:",
    "alternatives": [
      {
        "id": "A",
        "text": "confia plenamente no novo prazo anunciado"
      },
      {
        "id": "B",
        "text": "não se lembra dos prazos anteriores"
      },
      {
        "id": "C",
        "text": "demonstra ironia e desconfiança diante da repetição da promessa"
      },
      {
        "id": "D",
        "text": "acredita que a obra já foi concluída"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A frase \"Como das outras\" contrasta com a aparente confiança de \"Dessa vez vai\". Somada à informação de que o prazo foi prometido repetidamente, ela cria ironia e sugere descrença.",
    "alternativeExplanations": {
      "A": "A segunda frase enfraquece a leitura literal de confiança.",
      "B": "A referência às outras ocasiões mostra memória das promessas anteriores.",
      "C": "Correta. A inferência depende do contraste entre as duas frases e do contexto.",
      "D": "O texto diz que a obra ainda tem prazo anunciado para terminar."
    },
    "tags": [
      "interpretacao",
      "inferencia",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "interpretacao-textual",
      "inferencia",
      "ironia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-01",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Funções da linguagem",
    "subtopic": "Foco no destinatário",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em um texto publicitário, a presença de dados objetivos sobre um produto não impede que a função conativa seja predominante, caso esses dados sejam organizados com finalidade de persuadir o destinatário.",
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
    "explanation": "Um texto pode combinar várias funções da linguagem. Informações objetivas podem estar a serviço de um objetivo persuasivo, mantendo a função conativa como predominante.",
    "alternativeExplanations": {
      "V": "Correto. A predominância depende da finalidade global da mensagem, não da exclusividade de uma única função.",
      "F": "Incorreto. Funções da linguagem podem coexistir no mesmo texto."
    },
    "tags": [
      "funcoes-da-linguagem",
      "conativa",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes-da-linguagem",
      "funcao-conativa",
      "analise-discursiva"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-02",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Textualidade",
    "subtopic": "Progressão temática",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia:\n\n\"Luciana encontrou Patrícia quando ela saía do laboratório. A pesquisadora carregava uma caixa de amostras.\"\n\nNo primeiro período, o pronome \"ela\" possui referente inequivocamente determinado.",
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
    "explanation": "Sem contexto adicional, \"ela\" pode retomar tanto Luciana quanto Patrícia. A concordância de gênero não resolve a ambiguidade, porque os dois possíveis antecedentes são femininos.",
    "alternativeExplanations": {
      "V": "Incorreto. Há dois antecedentes gramaticalmente compatíveis.",
      "F": "Correto. O texto precisaria reformular a referência para eliminar a ambiguidade."
    },
    "tags": [
      "coesao",
      "referenciacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "textualidade",
      "coesao-referencial",
      "ambiguidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-03",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Interpretação textual",
    "subtopic": "Inferência",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia:\n\n\"O café permanecia cheio, mas ninguém ocupava a mesa junto à janela. Sobre ela, uma placa dizia apenas: 'Reservada'. João olhou o relógio e escolheu outra mesa.\"\n\nA partir do trecho, é possível concluir com certeza quem havia feito a reserva.",
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
    "explanation": "O texto permite inferir por que João não ocupou a mesa, mas não fornece qualquer pista que identifique a pessoa ou o grupo responsável pela reserva.",
    "alternativeExplanations": {
      "V": "Incorreto. A conclusão proposta ultrapassa as informações disponíveis.",
      "F": "Correto. Uma inferência válida precisa ser sustentada por pistas textuais suficientes."
    },
    "tags": [
      "interpretacao",
      "inferencia",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "interpretacao-textual",
      "inferencia",
      "limites-da-inferencia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-04",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Morfologia",
    "subtopic": "Classes de palavras",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em \"Os candidatos estavam meio nervosos antes da prova\", a palavra \"meio\" deve ser flexionada para \"meios\" para concordar com \"candidatos\".",
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
    "explanation": "Nesse contexto, \"meio\" tem valor adverbial de intensidade, equivalente a \"um pouco\", e permanece invariável: \"estavam meio nervosos\".",
    "alternativeExplanations": {
      "V": "Incorreto. Advérbios são invariáveis; a forma 'meio' não concorda com 'candidatos'.",
      "F": "Correto. A flexão ocorre em outros usos, como em 'meios copos', não neste emprego adverbial."
    },
    "tags": [
      "morfologia",
      "adverbio",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "morfologia",
      "classes-de-palavras",
      "invariabilidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-05",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Sintaxe",
    "subtopic": "Orações subordinadas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "No período \"Ele falou tão baixo que ninguém ouviu\", a estrutura \"tão... que\" estabelece uma relação de consequência entre as orações.",
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
    "explanation": "A intensidade indicada por \"tão baixo\" produz como consequência o fato de ninguém ter ouvido. Trata-se de relação consecutiva.",
    "alternativeExplanations": {
      "V": "Correto. A segunda oração apresenta o efeito decorrente da intensidade expressa na principal.",
      "F": "Incorreto. Nesse contexto, a relação é consecutiva, e não causal."
    },
    "tags": [
      "sintaxe",
      "oracao-subordinada",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "sintaxe",
      "oracoes-subordinadas",
      "relacao-consecutiva"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-06",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Concordância",
    "subtopic": "Concordância verbal",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Na frase \"Mais de um candidato faltaram à entrevista\", o plural do verbo é a única forma aceita pela norma-padrão por causa da ideia de quantidade superior a um.",
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
    "explanation": "Com a expressão \"mais de um\", a concordância normativa ocorre geralmente no singular: \"Mais de um candidato faltou\". Há contextos específicos que podem motivar plural, como reciprocidade, mas a afirmação de que o plural é a única forma aceita está errada.",
    "alternativeExplanations": {
      "V": "Incorreto. A regra geral prevê verbo no singular nesse tipo de construção.",
      "F": "Correto. A concordância não segue simplesmente a ideia matemática de quantidade."
    },
    "tags": [
      "concordancia",
      "verbo",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "concordancia",
      "concordancia-verbal",
      "casos-especiais"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-07",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Regência",
    "subtopic": "Regência verbal",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Na norma-padrão tradicional, a construção \"Prefiro cinema a teatro\" é adequada à regência do verbo \"preferir\" quando se comparam duas opções.",
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
    "explanation": "A construção normativa tradicional é \"preferir X a Y\", sem necessidade de \"mais\" ou \"do que\".",
    "alternativeExplanations": {
      "V": "Correto. O segundo termo da comparação é introduzido pela preposição 'a'.",
      "F": "Incorreto. A frase segue a regência tradicionalmente recomendada para \"preferir\"."
    },
    "tags": [
      "regencia",
      "preposicao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "regencia",
      "regencia-verbal",
      "norma-padrao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "portugues-vest-v1-vf-a-08",
    "area": "Linguagens",
    "subject": "portugues",
    "subjectName": "Português",
    "topic": "Crase",
    "subtopic": "Fusão da preposição",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em \"A pesquisadora referiu-se àquela hipótese durante a apresentação\", o acento grave resulta da combinação da preposição \"a\", exigida por \"referir-se\", com o \"a\" inicial do pronome demonstrativo \"aquela\".",
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
    "explanation": "O verbo pronominal \"referir-se\" rege a preposição \"a\". Diante do demonstrativo \"aquela\", essa preposição funde-se com seu \"a\" inicial: \"a + aquela = àquela\".",
    "alternativeExplanations": {
      "V": "Correto. A crase também pode ocorrer diante de 'aquele(s)', 'aquela(s)' e 'aquilo' quando a regência exige a preposição 'a'.",
      "F": "Incorreto. Nesse caso há efetivamente fusão da preposição com o demonstrativo."
    },
    "tags": [
      "crase",
      "regencia",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "crase",
      "regencia",
      "pronome-demonstrativo"
    ],
    "origin": "nabulab"
  }
];
