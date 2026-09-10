import type { Question } from "@/types/question";

export const inglesQuestions: Question[] = [
  {
    "id": "ingles-vest-v1-mc-i-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Main idea",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Leia o aviso:\n\n    \"Library notice: The study room will close at 6 p.m. this Friday for maintenance. The main reading area will remain open until 9 p.m.\"\n\n    Qual é a ideia principal do aviso?",
    "alternatives": [
      {
        "id": "A",
        "text": "Toda a biblioteca fechará às 6 p.m. na sexta-feira."
      },
      {
        "id": "B",
        "text": "A sala de estudos fechará mais cedo, mas outra área da biblioteca continuará aberta."
      },
      {
        "id": "C",
        "text": "A biblioteca ficará fechada durante toda a sexta-feira."
      },
      {
        "id": "D",
        "text": "A manutenção acontecerá na área principal de leitura."
      }
    ],
    "correctAnswer": "B",
    "explanation": "O aviso informa uma mudança específica no horário da sala de estudos e esclarece que a área principal de leitura continuará funcionando até as 9 p.m.",
    "alternativeExplanations": {
      "A": "Incorreta. O fechamento às 6 p.m. se aplica somente à study room.",
      "B": "Correta. Resume as duas informações centrais sem acrescentar dados que não estão no texto.",
      "C": "Incorreta. O texto afirma que parte da biblioteca continuará aberta.",
      "D": "Incorreta. A manutenção é associada à study room, não à main reading area."
    },
    "tags": [
      "reading",
      "main-idea",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "main-idea",
      "localizacao-de-informacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-i-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Inference",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Leia:\n\n    \"Daniel left home carrying an umbrella. When he arrived at school, his shoes were wet and he placed the umbrella near the door to dry.\"\n\n    O que é mais razoável inferir?",
    "alternatives": [
      {
        "id": "A",
        "text": "Daniel comprou um guarda-chuva na escola."
      },
      {
        "id": "B",
        "text": "A escola estava fechada."
      },
      {
        "id": "C",
        "text": "Provavelmente choveu durante o trajeto de Daniel."
      },
      {
        "id": "D",
        "text": "Daniel esqueceu os sapatos em casa."
      }
    ],
    "correctAnswer": "C",
    "explanation": "O texto não afirma diretamente que choveu, mas os sapatos molhados e o guarda-chuva colocado para secar funcionam como pistas convergentes.",
    "alternativeExplanations": {
      "A": "O texto informa que Daniel já saiu de casa carregando o guarda-chuva.",
      "B": "Nada indica que a escola estivesse fechada.",
      "C": "Correta. A inferência é sustentada por mais de uma pista contextual.",
      "D": "Ele chegou à escola com os sapatos molhados, portanto estava usando-os."
    },
    "tags": [
      "reading",
      "inference",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "inference",
      "leitura-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-i-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Vocabulary",
    "subtopic": "False cognates",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Leia:\n\n    \"Actually, the meeting starts at 3 p.m., not at 2 p.m.\"\n\n    Nesse contexto, \"actually\" significa:",
    "alternatives": [
      {
        "id": "A",
        "text": "na verdade"
      },
      {
        "id": "B",
        "text": "atualmente"
      },
      {
        "id": "C",
        "text": "eventualmente"
      },
      {
        "id": "D",
        "text": "rapidamente"
      }
    ],
    "correctAnswer": "A",
    "explanation": "\"Actually\" é um falso cognato comum para falantes de português. Nesse enunciado, introduz uma correção e equivale a \"na verdade\".",
    "alternativeExplanations": {
      "A": "Correta. A palavra corrige a informação anterior sobre o horário.",
      "B": "\"Atualmente\" costuma corresponder a \"currently\" ou \"nowadays\", dependendo do contexto.",
      "C": "\"Eventually\" significa algo como \"por fim\" ou \"em algum momento\", não é o valor de \"actually\".",
      "D": "O enunciado não expressa velocidade."
    },
    "tags": [
      "vocabulary",
      "false-cognate",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "vocabulary",
      "false-cognates",
      "sentido-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Vocabulary",
    "subtopic": "False cognates",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"I actually enjoyed the movie\", a palavra \"actually\" pode ser traduzida por \"atualmente\" sem alterar o sentido.",
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
    "explanation": "\"Actually\" normalmente significa \"na verdade\", \"de fato\" ou equivalente. \"Atualmente\" corresponde mais frequentemente a \"currently\" ou \"nowadays\".",
    "alternativeExplanations": {
      "V": "Incorreto. Trata-se de um falso cognato entre inglês e português.",
      "F": "Correto. Traduzir como \"atualmente\" produziria outro sentido."
    },
    "tags": [
      "vocabulary",
      "false-cognate",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "vocabulary",
      "false-cognates",
      "traducao-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Verb tenses",
    "subtopic": "Present perfect",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"She has lived here for five years\", o present perfect relaciona uma situação iniciada no passado ao presente.",
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
    "explanation": "A construção indica que ela começou a morar ali há cinco anos e, sem indicação contrária, continua morando no local.",
    "alternativeExplanations": {
      "V": "Correto. O período iniciado no passado se estende até o presente.",
      "F": "Incorreto. O uso de \"has lived\" com \"for five years\" estabelece justamente essa continuidade."
    },
    "tags": [
      "verb-tenses",
      "present-perfect",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "verb-tenses",
      "present-perfect",
      "interpretacao-temporal"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Modal verbs",
    "subtopic": "Possibility",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em \"It might rain later\", o verbo modal \"might\" expressa possibilidade, não certeza.",
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
    "explanation": "\"Might\" apresenta o evento como possível. O enunciado não garante que choverá.",
    "alternativeExplanations": {
      "V": "Correto. O modal reduz o grau de certeza da afirmação.",
      "F": "Incorreto. \"Might\" marca possibilidade, não certeza."
    },
    "tags": [
      "modal-verbs",
      "might",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "modal-verbs",
      "might",
      "modalidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-04",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Pronouns",
    "subtopic": "Reference",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Leia: \"Laura called Beatriz after she finished work.\" Sem contexto adicional, o pronome \"she\" pode gerar ambiguidade sobre quem terminou o trabalho.",
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
    "explanation": "Tanto Laura quanto Beatriz são antecedentes gramaticalmente possíveis para \"she\". O contexto fornecido não resolve com certeza qual delas terminou o trabalho.",
    "alternativeExplanations": {
      "V": "Correto. Há mais de um referente feminino possível.",
      "F": "Incorreto. A frase, isoladamente, não determina de maneira inequívoca o referente de \"she\"."
    },
    "tags": [
      "pronouns",
      "reference",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pronouns",
      "reference",
      "ambiguidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-05",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Prepositions",
    "subtopic": "Time",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"I have studied English since 2022\", \"since\" introduz o ponto inicial da situação.",
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
    "explanation": "\"Since 2022\" indica desde quando a atividade vem ocorrendo, conectando um ponto inicial no passado ao período posterior.",
    "alternativeExplanations": {
      "V": "Correto. \"Since\" introduz um marco inicial.",
      "F": "Incorreto. Para duração, seria comum usar \"for\", como em \"for three years\"."
    },
    "tags": [
      "prepositions",
      "since",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "prepositions",
      "since",
      "tempo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-06",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Conjunctions",
    "subtopic": "Contrast",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"Although it was raining, they continued the game\", \"although\" introduz uma ideia de causa.",
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
    "explanation": "\"Although\" expressa concessão/contraste: apesar de estar chovendo, o jogo continuou. A chuva não é apresentada como causa da continuidade.",
    "alternativeExplanations": {
      "V": "Incorreto. O conector estabelece concessão.",
      "F": "Correto. A relação é equivalente a \"embora estivesse chovendo\"."
    },
    "tags": [
      "conjunctions",
      "although",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "conjunctions",
      "although",
      "relacao-de-sentido"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-07",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Conditionals",
    "subtopic": "Hypothesis",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A frase \"If I had more time, I would learn Japanese\" apresenta uma situação hipotética no presente.",
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
    "explanation": "A estrutura if + past simple, seguida de would + verbo, é um uso típico do second conditional para hipóteses pouco prováveis ou contrárias à situação atual.",
    "alternativeExplanations": {
      "V": "Correto. O falante imagina uma condição diferente da realidade presente.",
      "F": "Incorreto. A construção não descreve simplesmente um fato passado concluído."
    },
    "tags": [
      "conditionals",
      "second-conditional",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "conditionals",
      "second-conditional",
      "hypothesis"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-08",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Passive voice",
    "subtopic": "Focus",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na frase \"The bridge was built in 1998\", a voz passiva coloca em foco o elemento que recebeu a ação, e o agente pode nem ser mencionado.",
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
    "explanation": "Em \"The bridge was built\", o sujeito gramatical é o elemento construído. Quem realizou a construção não aparece e pode ser irrelevante para a mensagem.",
    "alternativeExplanations": {
      "V": "Correto. Esse é um uso comum da voz passiva.",
      "F": "Incorreto. A ausência do agente é perfeitamente possível na passive voice."
    },
    "tags": [
      "passive-voice",
      "grammar",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "passive-voice",
      "focus",
      "analise-gramatical"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-i-09",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reported speech",
    "subtopic": "Indirect report",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se Ana diz \"I am tired\" e outra pessoa relata \"Ana said that she was tired\", a segunda frase apresenta a fala de Ana em discurso indireto.",
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
    "explanation": "A fala original foi recontada sem aspas, com mudança de pronome e, nesse contexto, backshift de \"am\" para \"was\".",
    "alternativeExplanations": {
      "V": "Correto. Trata-se de reported speech.",
      "F": "Incorreto. A segunda frase não reproduz literalmente a fala; ela a relata de forma indireta."
    },
    "tags": [
      "reported-speech",
      "grammar",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reported-speech",
      "indirect-report",
      "transformacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-m-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Modal verbs",
    "subtopic": "Possibility",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Leia o comunicado:\n\n    \"Due to strong winds, tomorrow's outdoor concert might be moved to the sports hall. A final decision will be announced at noon.\"\n\n    O uso de \"might\" indica que:",
    "alternatives": [
      {
        "id": "A",
        "text": "a mudança já foi confirmada"
      },
      {
        "id": "B",
        "text": "o concerto foi cancelado"
      },
      {
        "id": "C",
        "text": "o local atual é obrigatoriamente o ginásio"
      },
      {
        "id": "D",
        "text": "a mudança é uma possibilidade ainda não confirmada"
      }
    ],
    "correctAnswer": "D",
    "explanation": "\"Might be moved\" apresenta a mudança como possível, e a frase seguinte reforça essa leitura ao informar que a decisão final ainda será anunciada.",
    "alternativeExplanations": {
      "A": "Se já estivesse confirmada, não faria sentido anunciar uma decisão final depois.",
      "B": "O texto fala em possível mudança de local, não cancelamento.",
      "C": "O ginásio é uma alternativa possível, não um local já confirmado.",
      "D": "Correta. O modal e o contexto indicam incerteza."
    },
    "tags": [
      "modal-verbs",
      "might",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "modal-verbs",
      "might",
      "leitura-contextual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-m-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Pronouns",
    "subtopic": "Reference",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Leia:\n\n    \"Emma handed Julia the report after she revised the final paragraph.\"\n\n    Sem outras informações, qual é o principal problema de referência na frase?",
    "alternatives": [
      {
        "id": "A",
        "text": "O pronome \"she\" não pode se referir a uma pessoa."
      },
      {
        "id": "B",
        "text": "Não está claro se Emma ou Julia revisou o parágrafo final."
      },
      {
        "id": "C",
        "text": "O pronome \"she\" só pode retomar Julia."
      },
      {
        "id": "D",
        "text": "O pronome \"she\" retoma obrigatoriamente \"the report\"."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Como Emma e Julia são possíveis antecedentes femininos, a frase não identifica com segurança quem realizou a revisão.",
    "alternativeExplanations": {
      "A": "\"She\" é um pronome pessoal usado para pessoas.",
      "B": "Correta. Há duas candidatas gramaticalmente plausíveis ao referente.",
      "C": "Nada na estrutura obriga essa leitura.",
      "D": "\"The report\" não é um referente humano compatível com \"she\"."
    },
    "tags": [
      "pronouns",
      "reference",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pronouns",
      "reference",
      "ambiguity"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-m-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Prepositions",
    "subtopic": "Time",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Complete a frase de modo adequado:\n\n    \"Marina has worked at the museum ___ 2019 and has lived nearby ___ six years.\"",
    "alternatives": [
      {
        "id": "A",
        "text": "for / since"
      },
      {
        "id": "B",
        "text": "since / since"
      },
      {
        "id": "C",
        "text": "since / for"
      },
      {
        "id": "D",
        "text": "for / for"
      }
    ],
    "correctAnswer": "C",
    "explanation": "\"Since\" introduz um ponto inicial específico (2019), enquanto \"for\" introduz duração (six years).",
    "alternativeExplanations": {
      "A": "A relação entre as duas preposições foi invertida.",
      "B": "\"Six years\" é duração, não ponto inicial.",
      "C": "Correta. \"Since 2019\" e \"for six years\" são as combinações esperadas.",
      "D": "\"2019\" funciona como marco inicial e pede \"since\"."
    },
    "tags": [
      "prepositions",
      "since",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "prepositions",
      "since-for",
      "tempo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Prepositions",
    "subtopic": "Time",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"They have known each other since high school\", substituir \"since high school\" por \"for high school\" preservaria a relação temporal e a correção gramatical.",
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
    "explanation": "\"Since\" introduz o ponto de início; \"for\" introduz uma duração. \"High school\" funciona aqui como marco temporal, não como quantidade de tempo.",
    "alternativeExplanations": {
      "V": "Incorreto. As duas preposições exercem funções temporais diferentes.",
      "F": "Correto. A substituição proposta não preserva a construção."
    },
    "tags": [
      "prepositions",
      "since",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "prepositions",
      "since-for",
      "uso-em-contexto"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Conjunctions",
    "subtopic": "Contrast",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em \"Although sales increased, the company reduced its staff\", a segunda oração contrasta com uma expectativa que poderia surgir da primeira.",
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
    "explanation": "O aumento das vendas poderia levar à expectativa de manutenção ou ampliação da equipe. \"Although\" introduz uma concessão e destaca a quebra dessa expectativa.",
    "alternativeExplanations": {
      "V": "Correto. O conector organiza uma relação concessiva.",
      "F": "Incorreto. \"Although\" marca contraste/concessão, não simples adição."
    },
    "tags": [
      "conjunctions",
      "although",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "conjunctions",
      "although",
      "cohesion"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Conditionals",
    "subtopic": "Hypothesis",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "\"If I were you, I would accept the offer\" é normalmente usado para expressar uma hipótese ou conselho, e não para relatar uma decisão passada já concluída.",
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
    "explanation": "A estrutura é um uso convencional do second conditional, frequentemente empregado para aconselhar alguém por meio de uma situação hipotética.",
    "alternativeExplanations": {
      "V": "Correto. O falante imagina estar na posição do interlocutor.",
      "F": "Incorreto. A frase não funciona como simples relato de um fato passado."
    },
    "tags": [
      "conditionals",
      "second-conditional",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "conditionals",
      "second-conditional",
      "pragmatics"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-04",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Passive voice",
    "subtopic": "Focus",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Transformar \"The committee approved the proposal\" em \"The proposal was approved by the committee\" muda necessariamente o fato relatado.",
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
    "explanation": "As duas frases podem descrever o mesmo evento. A principal mudança está na organização informacional: a voz ativa destaca o agente; a passiva coloca o objeto afetado em posição de sujeito.",
    "alternativeExplanations": {
      "V": "Incorreto. A perspectiva sintática muda, mas o evento básico pode permanecer o mesmo.",
      "F": "Correto. Voz ativa e passiva podem apresentar o mesmo acontecimento com focos diferentes."
    },
    "tags": [
      "passive-voice",
      "grammar",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "passive-voice",
      "focus",
      "information-structure"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-05",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reported speech",
    "subtopic": "Indirect report",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Se Lucas disse ontem \"I will call you tomorrow\", uma forma possível de relatar hoje essa fala é \"Lucas said that he would call me the next day\", dependendo de quem faz o relato.",
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
    "explanation": "No discurso indireto, pronomes, referências temporais e, em muitos contextos, tempos verbais podem ser ajustados: \"will\" pode passar a \"would\" e \"tomorrow\" a \"the next day\".",
    "alternativeExplanations": {
      "V": "Correto. Os ajustes dependem do momento e da perspectiva do novo enunciador.",
      "F": "Incorreto. A transformação apresentada é compatível com reported speech."
    },
    "tags": [
      "reported-speech",
      "grammar",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reported-speech",
      "indirect-report",
      "deictic-shift"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-06",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Contextual interpretation",
    "subtopic": "Tone",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Leia: \"Sure, another two-hour meeting. Exactly what everyone needed.\" O tom é necessariamente de entusiasmo sincero porque aparece a palavra \"sure\".",
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
    "explanation": "O contexto permite leitura irônica: a duração excessiva da reunião e a frase \"Exactly what everyone needed\" podem expressar insatisfação, apesar da forma aparentemente positiva.",
    "alternativeExplanations": {
      "V": "Incorreto. O tom depende do conjunto das pistas, não de uma palavra isolada.",
      "F": "Correto. A leitura irônica é mais coerente com a formulação completa."
    },
    "tags": [
      "reading",
      "tone",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "contextual-interpretation",
      "tone",
      "irony"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-07",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Main idea",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Leia: \"The city planted 3,000 trees, created shaded bus stops and replaced asphalt with permeable surfaces in several neighborhoods. The project aims to reduce heat and improve rainwater drainage.\"\n\n    A ideia principal é a adoção de medidas urbanas para enfrentar calor e problemas de drenagem.",
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
    "explanation": "As ações específicas — árvores, sombra e superfícies permeáveis — são exemplos que sustentam o objetivo geral apresentado na última frase.",
    "alternativeExplanations": {
      "V": "Correto. A formulação sintetiza as informações do trecho.",
      "F": "Incorreto. Focar apenas em uma das ações perderia a relação que organiza o texto."
    },
    "tags": [
      "reading",
      "main-idea",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "main-idea",
      "synthesis"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-08",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Inference",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Leia: \"The café lights were off, the chairs were stacked on the tables, and a sign said 'See you tomorrow'.\"\n\n    É razoável inferir que o café não estava atendendo naquele momento.",
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
    "explanation": "Várias pistas convergem para a mesma conclusão: luzes apagadas, cadeiras recolhidas e aviso de retorno no dia seguinte.",
    "alternativeExplanations": {
      "V": "Correto. A inferência é fortemente apoiada por evidências contextuais.",
      "F": "Incorreto. Embora a palavra \"closed\" não apareça, o sentido pode ser inferido."
    },
    "tags": [
      "reading",
      "inference",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "inference",
      "evidence"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-m-09",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Vocabulary",
    "subtopic": "False cognates",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na frase \"The lecture will eventually start after the technical problem is fixed\", \"eventually\" significa \"eventualmente\" no sentido de \"talvez\".",
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
    "explanation": "\"Eventually\" normalmente significa \"por fim\", \"finalmente\" ou \"em algum momento depois\", e não \"talvez\".",
    "alternativeExplanations": {
      "V": "Incorreto. É um falso cognato frequente para falantes de português.",
      "F": "Correto. A frase afirma que a palestra começará depois, não que talvez comece."
    },
    "tags": [
      "vocabulary",
      "false-cognate",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "vocabulary",
      "false-cognates",
      "contextual-meaning"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-a-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Conditionals",
    "subtopic": "Hypothesis",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia:\n\n    \"If cities invested more in reliable night buses, fewer workers would need to choose between expensive rides and long walks home.\"\n\n    A estrutura condicional sugere que o autor:",
    "alternatives": [
      {
        "id": "A",
        "text": "apresenta uma consequência hipotética ligada a uma mudança ainda não realizada ou insuficiente"
      },
      {
        "id": "B",
        "text": "descreve uma regra científica sempre verdadeira"
      },
      {
        "id": "C",
        "text": "afirma que todas as cidades já fizeram esse investimento"
      },
      {
        "id": "D",
        "text": "relata exclusivamente um fato passado concluído"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A estrutura if + past (\"invested\") com would + verbo (\"would need\") apresenta uma situação hipotética no presente/futuro e sua consequência possível.",
    "alternativeExplanations": {
      "A": "Correta. A forma gramatical sustenta um argumento sobre uma condição imaginada.",
      "B": "Regras gerais costumam ser expressas por outras estruturas, como zero conditional.",
      "C": "A hipótese não afirma que a condição já tenha sido cumprida.",
      "D": "A frase projeta uma situação hipotética, não narra um evento encerrado."
    },
    "tags": [
      "conditionals",
      "second-conditional",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "conditionals",
      "second-conditional",
      "argumentative-reading"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-a-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Passive voice",
    "subtopic": "Focus",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Compare:\n\n    I. \"Researchers discovered the error during the final review.\"\n    II. \"The error was discovered during the final review.\"\n\n    Por que um autor pode preferir II em determinado contexto?",
    "alternatives": [
      {
        "id": "A",
        "text": "Para afirmar que ninguém descobriu o erro."
      },
      {
        "id": "B",
        "text": "Para transformar o evento em hipótese."
      },
      {
        "id": "C",
        "text": "Para colocar o erro e o momento da descoberta em foco, deixando o agente em segundo plano."
      },
      {
        "id": "D",
        "text": "Para indicar obrigatoriamente que a frase é mais informal."
      }
    ],
    "correctAnswer": "C",
    "explanation": "A voz passiva permite organizar a informação em torno do elemento afetado pela ação. O agente pode ser omitido quando já é conhecido, irrelevante ou menos importante para o objetivo do texto.",
    "alternativeExplanations": {
      "A": "A passiva não elimina a existência lógica de um agente; apenas pode não mencioná-lo.",
      "B": "Voz passiva não equivale a modo hipotético.",
      "C": "Correta. A mudança é de foco informacional.",
      "D": "A passiva não é, por definição, mais informal."
    },
    "tags": [
      "passive-voice",
      "grammar",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "passive-voice",
      "focus",
      "discourse-analysis"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-a-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reported speech",
    "subtopic": "Indirect report",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Ontem, Nina disse a Paulo: \"I can't meet you here tomorrow because I have to work.\"\n\n    Hoje, Paulo relata a fala a outra pessoa. Qual alternativa reproduz adequadamente o sentido, considerando a mudança de perspectiva temporal e espacial?",
    "alternatives": [
      {
        "id": "A",
        "text": "Nina said that I can't meet you here tomorrow because I have to work."
      },
      {
        "id": "B",
        "text": "Nina said that she couldn't meet me there the next day because she had to work."
      },
      {
        "id": "C",
        "text": "Nina said that she can't meet Paulo yesterday because she works."
      },
      {
        "id": "D",
        "text": "Nina said that I couldn't meet her there yesterday because I had worked."
      }
    ],
    "correctAnswer": "B",
    "explanation": "No discurso indireto, \"I\" passa a \"she\", \"you\" pode passar a \"me\" do ponto de vista de Paulo, \"here\" a \"there\" e \"tomorrow\" a \"the next day\". Também são possíveis os ajustes de \"can't\" para \"couldn't\" e \"have to\" para \"had to\".",
    "alternativeExplanations": {
      "A": "Mantém pronomes e dêiticos da fala original como se a perspectiva não tivesse mudado.",
      "B": "Correta. Os ajustes preservam quem fala, com quem fala e quando/onde a fala é relatada.",
      "C": "Mistura referências temporais e pessoais de modo incompatível com o relato.",
      "D": "Inverte os participantes e desloca o tempo para \"yesterday\", mudando o sentido."
    },
    "tags": [
      "reported-speech",
      "grammar",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reported-speech",
      "indirect-report",
      "perspective-shift"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-a-04",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Contextual interpretation",
    "subtopic": "Tone",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia o comentário sobre uma nova regra escolar:\n\n    \"Wonderful. Another form to fill out before students can borrow a book — because what libraries really needed was more paperwork.\"\n\n    O tom predominante é:",
    "alternatives": [
      {
        "id": "A",
        "text": "entusiasmo literal com a burocracia"
      },
      {
        "id": "B",
        "text": "neutralidade jornalística"
      },
      {
        "id": "C",
        "text": "medo de frequentar bibliotecas"
      },
      {
        "id": "D",
        "text": "ironia crítica em relação ao aumento da burocracia"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Palavras aparentemente positivas, como \"Wonderful\", entram em choque com \"another form\" e \"more paperwork\". A discrepância sinaliza ironia e crítica.",
    "alternativeExplanations": {
      "A": "A leitura literal não explica o contraste entre elogio aparente e reclamação implícita.",
      "B": "O enunciado contém avaliação e ironia, não neutralidade.",
      "C": "A crítica é dirigida à burocracia, não à biblioteca como lugar ameaçador.",
      "D": "Correta. O sentido depende de reconhecer o uso irônico do elogio."
    },
    "tags": [
      "reading",
      "tone",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "contextual-interpretation",
      "tone",
      "irony"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-mc-a-05",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Main idea",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Leia o texto autoral:\n\n    \"Remote work was once promoted mainly as a way to avoid commuting. Its broader effects, however, are more complicated. Some workers gain flexibility, while others report isolation or difficulty separating work from rest. Companies may reduce office costs, yet employees can absorb expenses for equipment and electricity. The debate, therefore, is less about whether remote work is simply 'good' or 'bad' and more about how its benefits and costs are distributed.\"\n\n    Qual alternativa expressa melhor a ideia central?",
    "alternatives": [
      {
        "id": "A",
        "text": "Remote work is always cheaper for employees."
      },
      {
        "id": "B",
        "text": "Commuting is the only relevant issue in remote work."
      },
      {
        "id": "C",
        "text": "Remote work produces different benefits and costs, so its effects should be evaluated beyond a simple positive-or-negative judgment."
      },
      {
        "id": "D",
        "text": "Companies should eliminate remote work because workers feel isolated."
      }
    ],
    "correctAnswer": "C",
    "explanation": "O texto apresenta vantagens e custos para diferentes grupos e termina rejeitando uma avaliação binária. A ideia central é a distribuição desigual dos efeitos do trabalho remoto.",
    "alternativeExplanations": {
      "A": "O texto afirma que trabalhadores podem assumir novos custos.",
      "B": "O primeiro período menciona deslocamento apenas para ampliar a discussão em seguida.",
      "C": "Correta. Resume o contraste desenvolvido em todo o texto.",
      "D": "O texto não defende a eliminação do trabalho remoto."
    },
    "tags": [
      "reading",
      "main-idea",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "main-idea",
      "argumentative-synthesis"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-01",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reported speech",
    "subtopic": "Indirect report",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Ao transformar \"Maya said, 'I finished the report yesterday'\" em discurso indireto no dia seguinte, \"Maya said that she had finished the report the day before\" é uma possibilidade adequada de relato.",
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
    "explanation": "A mudança para \"she\", o uso de past perfect em contexto de backshift e a troca de \"yesterday\" por \"the day before\" são compatíveis com reported speech.",
    "alternativeExplanations": {
      "V": "Correto. A formulação ajusta pessoa, tempo verbal e referência temporal ao novo ponto de vista.",
      "F": "Incorreto. A transformação apresentada preserva adequadamente o conteúdo essencial da fala."
    },
    "tags": [
      "reported-speech",
      "grammar",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reported-speech",
      "indirect-report",
      "deictic-shift"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-02",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Contextual interpretation",
    "subtopic": "Tone",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia: \"The company proudly announced that the new update fixes the bug — only six months after users first reported it.\"\n\n    O advérbio \"proudly\" obriga uma leitura de admiração sincera pelo desempenho da empresa.",
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
    "explanation": "O trecho final, \"only six months after...\", pode funcionar ironicamente e questionar o orgulho anunciado. O tom é construído pelo conjunto da frase, não por uma palavra isolada.",
    "alternativeExplanations": {
      "V": "Incorreto. O contraste temporal abre espaço para uma leitura crítica/irônica.",
      "F": "Correto. A interpretação do tom exige integrar escolhas lexicais e contexto."
    },
    "tags": [
      "reading",
      "tone",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "contextual-interpretation",
      "tone",
      "irony"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-03",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Main idea",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia: \"The article discusses rising ocean temperatures, coral bleaching, changes in fish populations and the economic effects on coastal communities.\"\n\n    Dizer que a ideia principal é apenas \"fish populations are changing\" reduz indevidamente o alcance do texto.",
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
    "explanation": "Mudanças nas populações de peixes são apenas um dos tópicos. A enumeração articula impactos ambientais e sociais ligados ao aquecimento dos oceanos.",
    "alternativeExplanations": {
      "V": "Correto. Uma ideia principal precisa abranger a organização global, não um detalhe isolado.",
      "F": "Incorreto. A formulação proposta cobre apenas uma parcela do conteúdo."
    },
    "tags": [
      "reading",
      "main-idea",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "main-idea",
      "scope"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-04",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Reading comprehension",
    "subtopic": "Inference",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia: \"When Priya entered the office, everyone stopped talking and one colleague quickly closed a document titled 'Surprise Party Budget'.\"\n\n    É razoável inferir que os colegas podem estar preparando uma festa surpresa, mas não que Priya tenha certeza disso.",
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
    "explanation": "O título do documento e a mudança de comportamento funcionam como pistas, mas uma inferência continua sendo diferente de conhecimento explícito da personagem.",
    "alternativeExplanations": {
      "V": "Correto. O texto sustenta uma hipótese forte, não a certeza de que Priya compreendeu a situação.",
      "F": "Incorreto. A distinção entre evidência do leitor e conhecimento da personagem é importante."
    },
    "tags": [
      "reading",
      "inference",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "reading-comprehension",
      "inference",
      "limits-of-inference"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-05",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Vocabulary",
    "subtopic": "False cognates",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em \"The parents attended the school meeting\", a palavra \"parents\" significa \"parentes\" em geral.",
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
    "explanation": "\"Parents\" significa pais — normalmente pai e/ou mãe. O termo geral para parentes é \"relatives\".",
    "alternativeExplanations": {
      "V": "Incorreto. É um falso cognato relevante para falantes de português.",
      "F": "Correto. A semelhança gráfica não corresponde ao mesmo significado."
    },
    "tags": [
      "vocabulary",
      "false-cognate",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "vocabulary",
      "false-cognates",
      "lexical-precision"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-06",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Verb tenses",
    "subtopic": "Present perfect",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Na frase \"I have lost my keys, so I can't open the door\", o present perfect contribui para destacar uma ação passada com consequência relevante no presente.",
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
    "explanation": "A perda aconteceu antes do momento da fala, mas seu resultado atual — não conseguir abrir a porta — continua relevante.",
    "alternativeExplanations": {
      "V": "Correto. O vínculo entre evento passado e consequência presente favorece o present perfect.",
      "F": "Incorreto. A frase não apresenta apenas um passado encerrado sem relação com o presente."
    },
    "tags": [
      "verb-tenses",
      "present-perfect",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "verb-tenses",
      "present-perfect",
      "present-relevance"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-07",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Modal verbs",
    "subtopic": "Possibility",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em \"The medicine may reduce the symptoms, but it might not work for everyone\", os modais expressam graus de possibilidade e evitam apresentar os resultados como garantidos.",
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
    "explanation": "Tanto \"may\" quanto \"might\" introduzem modalidade de possibilidade; o enunciado é cauteloso quanto à eficácia.",
    "alternativeExplanations": {
      "V": "Correto. Os modais ajudam a calibrar o grau de certeza.",
      "F": "Incorreto. A frase não faz promessa absoluta de resultado."
    },
    "tags": [
      "modal-verbs",
      "might",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "modal-verbs",
      "possibility",
      "hedging"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ingles-vest-v1-vf-a-08",
    "area": "Linguagens",
    "subject": "ingles",
    "subjectName": "Inglês",
    "topic": "Pronouns",
    "subtopic": "Reference",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Leia: \"Alex told Jordan that he had been selected for the internship.\" Sem contexto adicional, o pronome \"he\" possui necessariamente um único referente possível.",
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
    "explanation": "Sem informação adicional sobre os referentes de Alex e Jordan, a frase pode ser ambígua: \"he\" pode retomar mais de uma pessoa compatível com o pronome.",
    "alternativeExplanations": {
      "V": "Incorreto. Referência pronominal depende do contexto e pode ser ambígua.",
      "F": "Correto. A interpretação não deve atribuir automaticamente um referente que o texto não determina."
    },
    "tags": [
      "pronouns",
      "reference",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "fatec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "pronouns",
      "reference",
      "ambiguity"
    ],
    "origin": "nabulab"
  }
];
