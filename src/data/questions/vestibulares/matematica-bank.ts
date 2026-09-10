import type { Question } from "@/types/question";

export const matematicaQuestions: Question[] = [
  {
    "id": "matematica-vest-v1-mc-i-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Razão e proporção",
    "subtopic": "Grandezas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma receita usa 450 g de arroz para servir 6 pessoas. Mantendo a mesma proporção, quantos gramas de arroz são necessários para servir 10 pessoas?",
    "alternatives": [
      {
        "id": "A",
        "text": "750 g"
      },
      {
        "id": "B",
        "text": "675 g"
      },
      {
        "id": "C",
        "text": "900 g"
      },
      {
        "id": "D",
        "text": "270 g"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A quantidade por pessoa é 450 ÷ 6 = 75 g. Para 10 pessoas, 75 × 10 = 750 g.",
    "alternativeExplanations": {
      "A": "Correta. Mantendo a proporção, cada pessoa corresponde a 75 g, então 10 pessoas exigem 750 g.",
      "B": "675 g corresponderiam a 9 porções de 75 g, não a 10.",
      "C": "900 g seria o dobro da receita original, suficiente para 12 pessoas.",
      "D": "270 g resulta de inverter a relação entre quantidade de arroz e número de pessoas."
    },
    "tags": [
      "proporcao",
      "grandezas",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "proporcao",
      "calculo",
      "aplicacao-direta"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-i-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Porcentagem",
    "subtopic": "Variações sucessivas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma mochila custa R$ 200,00 e está com 15% de desconto. Qual é o preço após o desconto?",
    "alternatives": [
      {
        "id": "A",
        "text": "R$ 30,00"
      },
      {
        "id": "B",
        "text": "R$ 170,00"
      },
      {
        "id": "C",
        "text": "R$ 185,00"
      },
      {
        "id": "D",
        "text": "R$ 230,00"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Quinze por cento de R$ 200,00 são R$ 30,00. Subtraindo o desconto: 200 − 30 = R$ 170,00.",
    "alternativeExplanations": {
      "A": "R$ 30,00 é apenas o valor do desconto, não o preço final.",
      "B": "Correta. O preço final é 200 × 0,85 = R$ 170,00.",
      "C": "Esse valor surge ao subtrair 15 reais, em vez de calcular 15% de 200.",
      "D": "Esse resultado acrescenta 15% ao preço em vez de aplicar o desconto."
    },
    "tags": [
      "porcentagem",
      "fator-multiplicativo",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "porcentagem",
      "calculo",
      "aplicacao-direta"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-i-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Álgebra",
    "subtopic": "Equações",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em uma papelaria, três cadernos de mesmo preço e uma caneta de R$ 5,00 custam juntos R$ 26,00. Qual é o preço de cada caderno?",
    "alternatives": [
      {
        "id": "A",
        "text": "R$ 5,00"
      },
      {
        "id": "B",
        "text": "R$ 6,00"
      },
      {
        "id": "C",
        "text": "R$ 7,00"
      },
      {
        "id": "D",
        "text": "R$ 10,00"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Se x é o preço de um caderno, então 3x + 5 = 26. Assim, 3x = 21 e x = 7.",
    "alternativeExplanations": {
      "A": "Com cadernos de R$ 5,00, o total seria 3 × 5 + 5 = R$ 20,00.",
      "B": "Com cadernos de R$ 6,00, o total seria R$ 23,00.",
      "C": "Correta. 3 × 7 + 5 = 26.",
      "D": "Esse valor não resulta do isolamento da incógnita: o total seria R$ 35,00."
    },
    "tags": [
      "algebra",
      "equacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "algebra",
      "equacao",
      "resolucao-de-problemas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Álgebra",
    "subtopic": "Equações",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Ao resolver a equação 4x − 7 = 13, obtém-se x = 5.",
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
    "explanation": "Somando 7 aos dois membros, 4x = 20; dividindo por 4, x = 5. A afirmação é verdadeira.",
    "alternativeExplanations": {
      "V": "Correto. Substituindo x = 5, temos 4 × 5 − 7 = 13.",
      "F": "Incorreto. A resolução da equação leva exatamente a x = 5."
    },
    "tags": [
      "algebra",
      "equacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "algebra",
      "equacao",
      "verificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Funções",
    "subtopic": "Função afim",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Para a função f(x) = 2x + 3, quando x passa de 1 para 4, o valor de f(x) aumenta 3 unidades.",
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
    "explanation": "Temos f(1) = 5 e f(4) = 11. Portanto, o aumento é 11 − 5 = 6 unidades, e não 3.",
    "alternativeExplanations": {
      "V": "Incorreto. A variação de x é 3, mas a taxa da função é 2; por isso a variação de f(x) é 2 × 3 = 6.",
      "F": "Correto. O valor da função aumenta 6 unidades no intervalo indicado."
    },
    "tags": [
      "funcoes",
      "funcao-afim",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes",
      "funcao-afim",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Progressões",
    "subtopic": "Progressão geométrica",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A sequência 3, 6, 12, 24 é uma progressão geométrica de razão 2.",
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
    "explanation": "Cada termo, a partir do segundo, é obtido multiplicando o anterior por 2: 6/3 = 12/6 = 24/12 = 2.",
    "alternativeExplanations": {
      "V": "Correto. O quociente entre termos consecutivos é constante e igual a 2.",
      "F": "Incorreto. A sequência satisfaz a definição de progressão geométrica com razão 2."
    },
    "tags": [
      "progressao-geometrica",
      "razao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "progressao-geometrica",
      "razao",
      "verificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-04",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Logaritmos",
    "subtopic": "Definição",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Como 2³ = 8, então log₂(16) = 8.",
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
    "explanation": "O logaritmo indica o expoente. Como 2⁴ = 16, temos log₂(16) = 4, não 8.",
    "alternativeExplanations": {
      "V": "Incorreto. O número 8 é resultado de 2³, mas não é o expoente que produz 16.",
      "F": "Correto. O valor correto do logaritmo é 4."
    },
    "tags": [
      "logaritmo",
      "exponencial",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "logaritmo",
      "exponencial",
      "verificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-05",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria plana",
    "subtopic": "Semelhança",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Um triângulo com lados 3 cm, 4 cm e 5 cm é semelhante a outro com lados 6 cm, 8 cm e 10 cm.",
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
    "explanation": "Os três lados do segundo triângulo são o dobro dos correspondentes no primeiro. A razão de semelhança é 2.",
    "alternativeExplanations": {
      "V": "Correto. As razões 6/3, 8/4 e 10/5 são todas iguais a 2.",
      "F": "Incorreto. A proporcionalidade entre os três pares de lados garante a semelhança."
    },
    "tags": [
      "geometria-plana",
      "triangulos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-plana",
      "triangulos",
      "proporcao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-06",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Trigonometria",
    "subtopic": "Triângulo retângulo",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em um triângulo retângulo de lados 6, 8 e 10, para o ângulo cujo cateto oposto mede 6, o seno é igual a 3/4.",
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
    "explanation": "O seno é cateto oposto dividido pela hipotenusa: 6/10 = 3/5. A razão 3/4 corresponde a 6/8, isto é, à tangente desse ângulo.",
    "alternativeExplanations": {
      "V": "Incorreto. 3/4 não é o seno nesse triângulo.",
      "F": "Correto. O seno vale 3/5."
    },
    "tags": [
      "trigonometria",
      "seno",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "trigonometria",
      "seno",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-07",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Probabilidade",
    "subtopic": "Eventos",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Um dado comum foi lançado e sabe-se que o resultado foi par. Nessas condições, a probabilidade de o número obtido ser maior que 3 é 2/3.",
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
    "explanation": "Sabendo que o resultado é par, o espaço amostral passa a ser {2, 4, 6}. Entre esses três resultados, 4 e 6 são maiores que 3, logo a probabilidade é 2/3.",
    "alternativeExplanations": {
      "V": "Correto. A informação de que o resultado é par reduz o espaço amostral para três possibilidades equiprováveis.",
      "F": "Incorreto. Entre os resultados pares, dois dos três satisfazem a condição de serem maiores que 3."
    },
    "tags": [
      "probabilidade",
      "condicional",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "probabilidade",
      "condicional",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-08",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Estatística",
    "subtopic": "Tendência central",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "No conjunto ordenado 2, 4, 4, 9, 10, a mediana é 5.",
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
    "explanation": "Há cinco valores; portanto, a mediana é o terceiro termo do conjunto ordenado, que é 4.",
    "alternativeExplanations": {
      "V": "Incorreto. O valor central da lista é 4, não 5.",
      "F": "Correto. A mediana do conjunto é 4."
    },
    "tags": [
      "estatistica",
      "mediana",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "estatistica",
      "mediana",
      "verificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-i-09",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Matemática financeira",
    "subtopic": "Juros",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Um capital de R$ 1.000,00 aplicado a juros compostos de 10% por período durante dois períodos resulta em R$ 1.210,00.",
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
    "explanation": "O montante é 1.000 × 1,10² = 1.000 × 1,21 = R$ 1.210,00.",
    "alternativeExplanations": {
      "V": "Correto. No segundo período, a taxa incide sobre R$ 1.100,00, produzindo R$ 1.210,00.",
      "F": "Incorreto. Em juros compostos, o crescimento é multiplicativo; o montante indicado está correto."
    },
    "tags": [
      "matematica-financeira",
      "juros-compostos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "enem",
      "fatec",
      "etec"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "matematica-financeira",
      "juros-compostos",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-m-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Progressões",
    "subtopic": "Progressão geométrica",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma cultura de microrganismos começa com 250 indivíduos e dobra de tamanho a cada 3 horas. Mantido esse padrão, quantos indivíduos haverá após 9 horas?",
    "alternatives": [
      {
        "id": "A",
        "text": "2.000"
      },
      {
        "id": "B",
        "text": "1.000"
      },
      {
        "id": "C",
        "text": "750"
      },
      {
        "id": "D",
        "text": "2.250"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Em 9 horas ocorrem três intervalos de 3 horas. Logo, a população é 250 × 2³ = 2.000.",
    "alternativeExplanations": {
      "A": "Correta. São três multiplicações sucessivas por 2.",
      "B": "Esse resultado considera apenas duas duplicações: 250 × 2².",
      "C": "Esse valor trata o crescimento como adição de 250 a cada intervalo, e não como multiplicação.",
      "D": "Esse resultado multiplica diretamente 250 por 9, ignorando o crescimento geométrico."
    },
    "tags": [
      "progressao-geometrica",
      "razao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "progressao-geometrica",
      "modelagem",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-m-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Logaritmos",
    "subtopic": "Definição",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Sem usar calculadora, determine o valor de log₃(81) + log₂(8).",
    "alternatives": [
      {
        "id": "A",
        "text": "5"
      },
      {
        "id": "B",
        "text": "7"
      },
      {
        "id": "C",
        "text": "8"
      },
      {
        "id": "D",
        "text": "12"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Como 3⁴ = 81, log₃(81) = 4. Como 2³ = 8, log₂(8) = 3. Portanto, a soma é 7.",
    "alternativeExplanations": {
      "A": "Esse resultado poderia surgir de identificar corretamente um dos expoentes e reduzir o outro indevidamente.",
      "B": "Correta. A soma dos expoentes 4 e 3 é 7.",
      "C": "Esse valor confunde o argumento 8 com o valor de log₂(8).",
      "D": "Esse resultado não corresponde à soma dos expoentes associados às duas potências."
    },
    "tags": [
      "logaritmo",
      "exponencial",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "logaritmo",
      "exponencial",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-m-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria plana",
    "subtopic": "Semelhança",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "No mesmo horário, uma pessoa de 1,8 m projeta uma sombra de 1,2 m. Um prédio próximo projeta uma sombra de 8 m. Admitindo raios solares paralelos, qual é a altura do prédio?",
    "alternatives": [
      {
        "id": "A",
        "text": "5,3 m"
      },
      {
        "id": "B",
        "text": "9,6 m"
      },
      {
        "id": "C",
        "text": "12 m"
      },
      {
        "id": "D",
        "text": "14,4 m"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Os triângulos formados são semelhantes. Assim, 1,8/1,2 = h/8. Como 1,8/1,2 = 1,5, temos h = 1,5 × 8 = 12 m.",
    "alternativeExplanations": {
      "A": "Esse resultado surge ao inverter a razão entre altura e sombra.",
      "B": "Esse valor multiplica 1,2 por 8, sem conservar a razão de semelhança.",
      "C": "Correta. A proporcionalidade entre altura e sombra fornece 12 m.",
      "D": "Esse resultado multiplica 1,8 diretamente por 8 e ignora a sombra de referência."
    },
    "tags": [
      "geometria-plana",
      "triangulos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-plana",
      "triangulos",
      "proporcao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria plana",
    "subtopic": "Semelhança",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Se dois triângulos semelhantes têm razão de semelhança 2,5 entre seus lados correspondentes, então a razão entre suas áreas é 6,25.",
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
    "explanation": "Áreas de figuras semelhantes variam com o quadrado da razão linear. Portanto, 2,5² = 6,25.",
    "alternativeExplanations": {
      "V": "Correto. Dobrar, triplicar ou multiplicar lados por qualquer fator k faz a área variar por k².",
      "F": "Incorreto. A razão entre áreas não é 2,5; ela é o quadrado desse fator."
    },
    "tags": [
      "geometria-plana",
      "triangulos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-plana",
      "semelhanca",
      "relacao-entre-conceitos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Trigonometria",
    "subtopic": "Triângulo retângulo",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em um triângulo retângulo de catetos 6 e 8 e hipotenusa 10, para o ângulo oposto ao cateto 6, sen(θ) = 3/4.",
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
    "explanation": "Para esse ângulo, sen(θ) = 6/10 = 3/5. A razão 6/8 = 3/4 corresponde a tan(θ).",
    "alternativeExplanations": {
      "V": "Incorreto. A afirmação troca a razão seno pela razão tangente.",
      "F": "Correto. O seno é 3/5, e não 3/4."
    },
    "tags": [
      "trigonometria",
      "seno",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "trigonometria",
      "seno",
      "relacao-entre-conceitos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Probabilidade",
    "subtopic": "Eventos",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Uma urna contém 4 bolas verdes e 3 amarelas. Retirando duas bolas sem reposição, a probabilidade de ambas serem verdes é 2/7.",
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
    "explanation": "A probabilidade é (4/7) × (3/6) = 12/42 = 2/7.",
    "alternativeExplanations": {
      "V": "Correto. Na segunda retirada restam 3 bolas verdes entre 6 bolas no total.",
      "F": "Incorreto. Sem reposição, a probabilidade da segunda retirada muda; fazendo esse ajuste, o resultado é 2/7."
    },
    "tags": [
      "probabilidade",
      "condicional",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "probabilidade",
      "eventos",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-04",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Estatística",
    "subtopic": "Tendência central",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Ao acrescentar o valor 20 ao conjunto 2, 4, 4, 5, 5, a nova mediana passa a ser aproximadamente 6,67.",
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
    "explanation": "O novo conjunto ordenado é 2, 4, 4, 5, 5, 20. Como há seis valores, a mediana é (4 + 5)/2 = 4,5. O valor 6,67 é a nova média.",
    "alternativeExplanations": {
      "V": "Incorreto. A afirmação confunde média aritmética com mediana.",
      "F": "Correto. A mediana passa a 4,5; o valor extremo afeta muito mais a média."
    },
    "tags": [
      "estatistica",
      "mediana",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "estatistica",
      "mediana",
      "analise-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-05",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Matemática financeira",
    "subtopic": "Juros",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Aplicando R$ 2.000,00 a juros compostos de 5% ao mês por dois meses, sem depósitos ou retiradas, o montante será R$ 2.205,00.",
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
    "explanation": "M = 2.000 × 1,05² = 2.000 × 1,1025 = R$ 2.205,00.",
    "alternativeExplanations": {
      "V": "Correto. No segundo mês, os 5% incidem sobre o montante já corrigido do primeiro mês.",
      "F": "Incorreto. Usar juros simples daria R$ 2.200,00; em juros compostos, o valor correto é R$ 2.205,00."
    },
    "tags": [
      "matematica-financeira",
      "juros-compostos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "matematica-financeira",
      "juros-compostos",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-06",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria analítica",
    "subtopic": "Reta",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A reta que passa pelos pontos (1, 2) e (5, 10) tem coeficiente angular 4.",
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
    "explanation": "O coeficiente angular é (10 − 2)/(5 − 1) = 8/4 = 2.",
    "alternativeExplanations": {
      "V": "Incorreto. Dividir apenas a variação de y por 2 ou usar uma diferença incompleta leva a um valor incorreto.",
      "F": "Correto. A inclinação da reta é 2."
    },
    "tags": [
      "geometria-analitica",
      "reta",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-analitica",
      "reta",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-07",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Razão e proporção",
    "subtopic": "Grandezas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Quatro máquinas idênticas produzem juntas 600 peças por dia. Mantendo a mesma produtividade por máquina, seis máquinas produzirão 900 peças por dia.",
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
    "explanation": "Cada máquina produz 600/4 = 150 peças por dia. Seis máquinas produzem 6 × 150 = 900.",
    "alternativeExplanations": {
      "V": "Correto. O número de peças é diretamente proporcional ao número de máquinas, nas condições informadas.",
      "F": "Incorreto. Com produtividade constante, aumentar de 4 para 6 máquinas multiplica a produção por 6/4."
    },
    "tags": [
      "proporcao",
      "grandezas",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "proporcao",
      "grandezas",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-08",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Porcentagem",
    "subtopic": "Variações sucessivas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Um preço que aumenta 20% e, em seguida, recebe desconto de 20% retorna exatamente ao valor inicial.",
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
    "explanation": "Se o preço inicial é P, após o aumento ele vale 1,2P. Aplicando desconto de 20%, fica 0,8 × 1,2P = 0,96P, isto é, 4% abaixo do valor inicial.",
    "alternativeExplanations": {
      "V": "Incorreto. Os dois percentuais incidem sobre bases diferentes.",
      "F": "Correto. A variação acumulada é −4%, e não zero."
    },
    "tags": [
      "porcentagem",
      "fator-multiplicativo",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "porcentagem",
      "variacoes-sucessivas",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-m-09",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Álgebra",
    "subtopic": "Equações",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A equação 2(x − 3) + 4 = 3x − 5 possui solução x = 3.",
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
    "explanation": "Expandindo: 2x − 6 + 4 = 3x − 5, então 2x − 2 = 3x − 5. Logo, x = 3.",
    "alternativeExplanations": {
      "V": "Correto. Substituindo x = 3, os dois membros valem −2.",
      "F": "Incorreto. A simplificação algébrica confirma x = 3."
    },
    "tags": [
      "algebra",
      "equacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "enem",
      "fuvest",
      "unesp"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "algebra",
      "equacao",
      "verificacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-a-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Probabilidade",
    "subtopic": "Eventos",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma fábrica possui duas linhas. A linha A produz 60% das peças e apresenta 2% de defeitos; a linha B produz 40% e apresenta 5% de defeitos. Uma peça foi escolhida ao acaso e constatada como defeituosa. Qual é a probabilidade de ela ter sido produzida pela linha B?",
    "alternatives": [
      {
        "id": "A",
        "text": "62,5%"
      },
      {
        "id": "B",
        "text": "37,5%"
      },
      {
        "id": "C",
        "text": "40%"
      },
      {
        "id": "D",
        "text": "71,4%"
      }
    ],
    "correctAnswer": "A",
    "explanation": "P(B e defeito) = 0,40 × 0,05 = 0,020. A probabilidade total de defeito é 0,60 × 0,02 + 0,40 × 0,05 = 0,032. Logo, P(B|defeito) = 0,020/0,032 = 0,625 = 62,5%.",
    "alternativeExplanations": {
      "A": "Correta. É necessário condicionar a origem ao fato de a peça já ser conhecida como defeituosa.",
      "B": "37,5% corresponde à parcela dos defeitos vindos da linha A, não da linha B.",
      "C": "40% é a participação da linha B na produção total, antes de usar a informação de que a peça é defeituosa.",
      "D": "Esse valor pode surgir de normalização incorreta das taxas de defeito sem ponderá-las pelas participações de produção."
    },
    "tags": [
      "probabilidade",
      "condicional",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "probabilidade",
      "probabilidade-condicional",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-a-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Estatística",
    "subtopic": "Tendência central",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Considere os dados 4, 5, 5, 6 e 10. Depois, acrescente o valor 30 ao conjunto. Em relação aos valores originais da média e da mediana, quais são as respectivas variações?",
    "alternatives": [
      {
        "id": "A",
        "text": "A média aumenta 4 e a mediana não se altera."
      },
      {
        "id": "B",
        "text": "A média aumenta 4 e a mediana aumenta 0,5."
      },
      {
        "id": "C",
        "text": "A média aumenta 5 e a mediana aumenta 1."
      },
      {
        "id": "D",
        "text": "A média não se altera e a mediana aumenta 4,5."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Originalmente, a média é (4+5+5+6+10)/5 = 6 e a mediana é 5. Com 30, a soma passa a 60 e a média a 10; a mediana do conjunto 4,5,5,6,10,30 é (5+6)/2 = 5,5. Portanto, as variações são +4 e +0,5.",
    "alternativeExplanations": {
      "A": "A média aumenta 4, mas a mediana também muda porque o conjunto passa a ter seis valores.",
      "B": "Correta. O valor extremo eleva bastante a média e apenas desloca a mediana de 5 para 5,5.",
      "C": "Essas variações não correspondem aos valores recalculados.",
      "D": "A média é sensível à inclusão de 30 e aumenta de 6 para 10."
    },
    "tags": [
      "estatistica",
      "mediana",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "estatistica",
      "analise-de-dados",
      "comparacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-a-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Matemática financeira",
    "subtopic": "Juros",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um investimento de R$ 10.000,00 rende 2% ao mês nos primeiros 6 meses e, a partir daí, 1% ao mês por mais 6 meses. Sem depósitos, retiradas ou impostos, qual é aproximadamente o montante ao final de 12 meses?",
    "alternatives": [
      {
        "id": "A",
        "text": "R$ 11.800,00"
      },
      {
        "id": "B",
        "text": "R$ 11.261,62"
      },
      {
        "id": "C",
        "text": "R$ 11.954,44"
      },
      {
        "id": "D",
        "text": "R$ 12.682,42"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Os dois períodos têm fatores diferentes: M = 10.000 × 1,02⁶ × 1,01⁶ ≈ R$ 11.954,44.",
    "alternativeExplanations": {
      "A": "Esse valor soma 18% ao capital como se todo o crescimento fosse simples.",
      "B": "Esse valor considera apenas os seis primeiros meses a 2%, ignorando o segundo período.",
      "C": "Correta. Cada etapa capitaliza o montante deixado pela etapa anterior.",
      "D": "Esse valor corresponde aproximadamente a aplicar 2% durante os 12 meses, desconsiderando a redução da taxa."
    },
    "tags": [
      "matematica-financeira",
      "juros-compostos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "matematica-financeira",
      "juros-compostos",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-a-04",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria analítica",
    "subtopic": "Reta",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "A reta r passa pelos pontos A(2, −1) e B(6, 7). A reta s é perpendicular a r e passa pelo ponto P(4, 1). Qual é uma equação de s?",
    "alternatives": [
      {
        "id": "A",
        "text": "y = 2x − 7"
      },
      {
        "id": "B",
        "text": "y = −2x + 9"
      },
      {
        "id": "C",
        "text": "y = 0,5x − 1"
      },
      {
        "id": "D",
        "text": "y = −0,5x + 3"
      }
    ],
    "correctAnswer": "D",
    "explanation": "A inclinação de r é (7−(−1))/(6−2) = 8/4 = 2. Uma reta perpendicular tem coeficiente −1/2. Usando P(4,1): y−1 = −(1/2)(x−4), portanto y = −0,5x + 3.",
    "alternativeExplanations": {
      "A": "Tem coeficiente angular 2, igual ao de r; por isso seria paralela a r.",
      "B": "Troca o sinal, mas usa −2 em vez do recíproco negativo −1/2.",
      "C": "Usa o recíproco 1/2, porém sem inverter o sinal; não é perpendicular a r.",
      "D": "Correta. O produto dos coeficientes angulares é 2 × (−1/2) = −1 e a reta passa por P."
    },
    "tags": [
      "geometria-analitica",
      "reta",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-analitica",
      "reta",
      "multiplas-etapas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-mc-a-05",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Razão e proporção",
    "subtopic": "Grandezas",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Doze trabalhadores, com produtividade constante e igual, concluiriam uma obra em 15 dias. Após 5 dias de trabalho com os 12, três trabalhadores deixam a equipe. Mantido o mesmo ritmo individual, quantos dias adicionais serão necessários para terminar a obra?",
    "alternatives": [
      {
        "id": "A",
        "text": "13 1/3 dias"
      },
      {
        "id": "B",
        "text": "10 dias"
      },
      {
        "id": "C",
        "text": "12 dias"
      },
      {
        "id": "D",
        "text": "15 dias"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A obra exige 12 × 15 = 180 trabalhador-dias. Nos primeiros 5 dias foram realizados 12 × 5 = 60, restando 120. Com 9 trabalhadores, o tempo restante é 120/9 = 13 1/3 dias.",
    "alternativeExplanations": {
      "A": "Correta. A conta considera o trabalho já executado e a redução da equipe apenas na parte restante.",
      "B": "Esse seria o tempo restante se os 12 trabalhadores continuassem na obra.",
      "C": "Esse resultado não conserva a quantidade total de trabalhador-dias necessária.",
      "D": "Esse valor ignora que um terço da obra já foi executado nos cinco primeiros dias."
    },
    "tags": [
      "proporcao",
      "grandezas",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "proporcao",
      "grandezas",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-01",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Matemática financeira",
    "subtopic": "Juros",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma taxa de 1% ao mês, capitalizada durante 12 meses, corresponde a uma taxa efetiva anual de aproximadamente 12,68%, portanto superior a 12%.",
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
    "explanation": "A taxa efetiva anual é (1,01¹² − 1) × 100% ≈ 12,68%. Somar 1% doze vezes daria 12%, mas isso desconsideraria a capitalização.",
    "alternativeExplanations": {
      "V": "Correto. Juros compostos fazem cada mês incidir sobre um montante já atualizado.",
      "F": "Incorreto. O fator anual é 1,01¹², que produz taxa efetiva ligeiramente maior que 12%."
    },
    "tags": [
      "matematica-financeira",
      "juros-compostos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "matematica-financeira",
      "juros-compostos",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-02",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Geometria analítica",
    "subtopic": "Reta",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "As retas 2x − y + 1 = 0 e 4x − 2y − 6 = 0 são paralelas e a distância entre elas é 2/√5.",
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
    "explanation": "Dividindo a segunda equação por 2, obtemos 2x − y − 3 = 0. As retas são paralelas, mas a distância é |1 − (−3)|/√(2²+(−1)²) = 4/√5.",
    "alternativeExplanations": {
      "V": "Incorreto. A parte sobre o paralelismo está correta, mas a distância foi calculada pela metade.",
      "F": "Correto. A distância entre as retas é 4/√5."
    },
    "tags": [
      "geometria-analitica",
      "reta",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "geometria-analitica",
      "reta",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-03",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Razão e proporção",
    "subtopic": "Grandezas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Oito bombas idênticas esvaziam um reservatório em 15 horas. Se todas mantêm vazão constante, 12 bombas iguais levarão 20 horas para esvaziar dois reservatórios do mesmo tamanho.",
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
    "explanation": "Um reservatório exige 8 × 15 = 120 bomba-horas. Dois exigem 240 bomba-horas; com 12 bombas, o tempo é 240/12 = 20 horas.",
    "alternativeExplanations": {
      "V": "Correto. A quantidade de trabalho dobra ao passar para dois reservatórios, enquanto a equipe de bombas aumenta de 8 para 12.",
      "F": "Incorreto. Considerar apenas a proporcionalidade inversa entre bombas e tempo ignoraria que agora há dois reservatórios."
    },
    "tags": [
      "proporcao",
      "grandezas",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "proporcao",
      "grandezas",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-04",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Porcentagem",
    "subtopic": "Variações sucessivas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Aumentar um valor em 30% e depois reduzir o resultado em 30% faz o valor retornar exatamente ao ponto de partida.",
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
    "explanation": "Os fatores sucessivos são 1,30 e 0,70. Seu produto é 0,91, então o valor final corresponde a 91% do inicial, uma redução líquida de 9%.",
    "alternativeExplanations": {
      "V": "Incorreto. Os percentuais iguais incidem sobre bases diferentes e não se anulam.",
      "F": "Correto. O resultado final é 0,91 vezes o valor inicial."
    },
    "tags": [
      "porcentagem",
      "fator-multiplicativo",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "porcentagem",
      "variacoes-sucessivas",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-05",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Álgebra",
    "subtopic": "Equações",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Na equação (m − 2)x = m² − 4, para m ≠ 2 existe uma única solução x = m + 2; para m = 2, qualquer número real satisfaz a equação.",
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
    "explanation": "Como m²−4 = (m−2)(m+2), para m≠2 podemos dividir por m−2 e obter x=m+2. Para m=2, a equação se reduz a 0·x=0, verdadeira para todo x real.",
    "alternativeExplanations": {
      "V": "Correto. O valor m = 2 precisa ser tratado separadamente porque anula o coeficiente de x.",
      "F": "Incorreto. A análise por casos confirma exatamente a afirmação."
    },
    "tags": [
      "algebra",
      "equacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "algebra",
      "equacao",
      "analise-de-parametros"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-06",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Funções",
    "subtopic": "Função afim",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se f(x) = 2x − 3 e g(x) = x², então g(f(x)) = f(g(x)) para todo número real x.",
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
    "explanation": "Temos g(f(x)) = (2x−3)² = 4x²−12x+9, enquanto f(g(x)) = 2x²−3. As expressões não são iguais para todo x.",
    "alternativeExplanations": {
      "V": "Incorreto. A composição de funções não é, em geral, comutativa; neste caso as duas composições são diferentes.",
      "F": "Correto. Basta calcular as duas composições para verificar a desigualdade."
    },
    "tags": [
      "funcoes",
      "funcao-afim",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "funcoes",
      "composicao-de-funcoes",
      "analise-algebrica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-07",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Progressões",
    "subtopic": "Progressão geométrica",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A progressão geométrica infinita 12, −6, 3, −1,5, ... possui soma igual a 8.",
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
    "explanation": "A razão é q = −1/2, cujo módulo é menor que 1. Assim, a soma infinita é S = 12/[1−(−1/2)] = 12/(3/2) = 8.",
    "alternativeExplanations": {
      "V": "Correto. A condição |q| < 1 garante convergência e a fórmula da soma fornece 8.",
      "F": "Incorreto. Apesar da alternância de sinais, a série converge porque |−1/2| < 1."
    },
    "tags": [
      "progressao-geometrica",
      "razao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "progressao-geometrica",
      "soma-infinita",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "matematica-vest-v1-vf-a-08",
    "area": "Matemática",
    "subject": "matematica",
    "subjectName": "Matemática",
    "topic": "Logaritmos",
    "subtopic": "Definição",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A equação log₂(x − 1) + log₂(x − 3) = 3 possui duas soluções reais: x = 5 e x = −1.",
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
    "explanation": "O domínio exige x > 3. Unindo os logaritmos: log₂[(x−1)(x−3)] = 3, então (x−1)(x−3)=8. A equação algébrica produz x=5 ou x=−1, mas x=−1 viola o domínio. Logo, somente x=5 é solução.",
    "alternativeExplanations": {
      "V": "Incorreto. Resolver a equação algébrica sem verificar o domínio inclui uma raiz inválida.",
      "F": "Correto. A restrição x > 3 elimina x = −1."
    },
    "tags": [
      "logaritmo",
      "exponencial",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "fuvest",
      "unesp",
      "enem"
    ],
    "educationLevel": "ensino-medio",
    "skills": [
      "logaritmo",
      "dominio",
      "multiplas-etapas"
    ],
    "origin": "nabulab"
  }
];
