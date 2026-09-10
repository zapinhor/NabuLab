import type { Question } from "@/types/question";

export const cienciasQuestions: Question[] = [
  {
    "id": "ciencias-vest-v1-mc-i-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Dois blocos têm o mesmo volume de 100 cm³. O bloco X tem massa de 200 g e o bloco Y, massa de 500 g. Qual deles é mais denso?",
    "alternatives": [
      {
        "id": "A",
        "text": "O bloco Y"
      },
      {
        "id": "B",
        "text": "O bloco X"
      },
      {
        "id": "C",
        "text": "Os dois têm a mesma densidade"
      },
      {
        "id": "D",
        "text": "Não é possível comparar sem conhecer a temperatura"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Densidade é a razão entre massa e volume. Como os volumes são iguais, o bloco de maior massa é o mais denso: Y tem 500 g em 100 cm³, enquanto X tem 200 g em 100 cm³.",
    "alternativeExplanations": {
      "A": "Correta. Para volumes iguais, maior massa significa maior densidade.",
      "B": "X tem menor massa para o mesmo volume, portanto menor densidade.",
      "C": "As massas são diferentes, então as densidades também são diferentes.",
      "D": "A temperatura pode influenciar a densidade em alguns casos, mas os dados fornecidos já permitem comparar os blocos."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "densidade",
      "comparacao",
      "aplicacao-direta"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma lâmpada transforma energia elétrica principalmente em luz e calor. O que acontece com a energia durante esse processo?",
    "alternatives": [
      {
        "id": "A",
        "text": "Ela desaparece ao produzir luz"
      },
      {
        "id": "B",
        "text": "Ela é transformada em outras formas"
      },
      {
        "id": "C",
        "text": "Ela é criada dentro da lâmpada"
      },
      {
        "id": "D",
        "text": "Ela fica armazenada indefinidamente no fio"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A energia elétrica não é criada nem destruída no funcionamento comum da lâmpada; ela é convertida principalmente em energia luminosa e térmica.",
    "alternativeExplanations": {
      "A": "A energia não desaparece; parte dela é convertida em luz e parte em calor.",
      "B": "Correta. O aparelho transforma energia elétrica em outras formas.",
      "C": "A lâmpada não cria energia; ela recebe energia elétrica da fonte.",
      "D": "A energia não fica acumulada indefinidamente no fio durante o funcionamento."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "conservacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "No circuito pulmonar, para onde o sangue vai depois de sair do lado direito do coração?",
    "alternatives": [
      {
        "id": "A",
        "text": "Para o fígado e depois aos rins"
      },
      {
        "id": "B",
        "text": "Diretamente para o cérebro"
      },
      {
        "id": "C",
        "text": "Para os pulmões"
      },
      {
        "id": "D",
        "text": "Para todo o corpo ao mesmo tempo"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Na circulação pulmonar, o sangue sai do lado direito do coração em direção aos pulmões, onde participa das trocas gasosas, e depois retorna ao lado esquerdo do coração.",
    "alternativeExplanations": {
      "A": "Fígado e rins também fazem parte da circulação sistêmica, não do circuito pulmonar.",
      "B": "O cérebro recebe sangue pela circulação sistêmica.",
      "C": "Correta. Os pulmões são o destino do sangue nesse circuito.",
      "D": "A distribuição para os demais órgãos ocorre na circulação sistêmica."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "fluxo-sanguineo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Folhas caídas no solo são decompostas ao longo do tempo. Qual grupo de seres vivos participa diretamente desse processo e ajuda a devolver nutrientes ao ambiente?",
    "alternatives": [
      {
        "id": "A",
        "text": "Somente predadores"
      },
      {
        "id": "B",
        "text": "Somente animais herbívoros"
      },
      {
        "id": "C",
        "text": "Apenas plantas adultas"
      },
      {
        "id": "D",
        "text": "Fungos e bactérias decompositoras"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Fungos e muitas bactérias decompõem matéria orgânica morta, liberando substâncias que podem voltar a ser utilizadas por outros organismos.",
    "alternativeExplanations": {
      "A": "Predadores obtêm alimento de outros animais e não cumprem o papel ecológico descrito.",
      "B": "Herbívoros consomem organismos vivos ou partes deles, mas não são os principais responsáveis pela decomposição.",
      "C": "Plantas absorvem nutrientes, porém não realizam sozinhas a decomposição das folhas.",
      "D": "Correta. Decompositores atuam diretamente sobre a matéria orgânica morta."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "ciclagem-de-nutrientes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Ao observar uma película de cebola ao microscópio, um estudante identifica várias estruturas delimitadas, cada uma com conteúdo próprio. Essas unidades básicas dos seres vivos são chamadas de:",
    "alternatives": [
      {
        "id": "A",
        "text": "células"
      },
      {
        "id": "B",
        "text": "órgãos"
      },
      {
        "id": "C",
        "text": "tecidos"
      },
      {
        "id": "D",
        "text": "moléculas"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A célula é a unidade estrutural e funcional básica dos seres vivos. Tecidos e órgãos são formados pela organização de muitas células.",
    "alternativeExplanations": {
      "A": "Correta. As unidades observadas são células.",
      "B": "Órgãos são estruturas formadas por diferentes tecidos.",
      "C": "Tecidos são conjuntos organizados de células, portanto correspondem a um nível acima.",
      "D": "Moléculas compõem as células, mas não são a unidade estrutural básica de um organismo."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "organizacao-biologica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Regiões próximas aos limites de placas tectônicas apresentam maior frequência de terremotos porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "as placas ficam completamente imóveis nesses locais"
      },
      {
        "id": "B",
        "text": "o movimento relativo entre placas acumula e libera tensões nas rochas"
      },
      {
        "id": "C",
        "text": "a luz solar aquece mais intensamente esses limites"
      },
      {
        "id": "D",
        "text": "os oceanos impedem o movimento da crosta"
      }
    ],
    "correctAnswer": "B",
    "explanation": "As placas tectônicas se movem lentamente. Em seus limites, tensões podem se acumular nas rochas e ser liberadas de forma brusca, produzindo terremotos.",
    "alternativeExplanations": {
      "A": "Os limites são justamente regiões de movimento relativo entre placas.",
      "B": "Correta. A liberação de tensão acumulada está ligada a muitos terremotos.",
      "C": "A energia solar não é a causa principal da tectônica de placas.",
      "D": "Oceanos não interrompem o movimento das placas; há limites tectônicos também no fundo oceânico."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "causa-e-efeito"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Quando é verão no Hemisfério Sul, é comum ser inverno no Hemisfério Norte. Qual fator explica principalmente essa diferença?",
    "alternatives": [
      {
        "id": "A",
        "text": "A Terra fica muito mais perto do Sol no verão do Sul"
      },
      {
        "id": "B",
        "text": "A Lua bloqueia parte da luz no Hemisfério Norte"
      },
      {
        "id": "C",
        "text": "A inclinação do eixo terrestre faz os hemisférios receberem luz solar de maneira diferente ao longo do ano"
      },
      {
        "id": "D",
        "text": "A rotação da Terra muda de velocidade entre os hemisférios"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A inclinação do eixo terrestre, combinada ao movimento de translação, altera o ângulo de incidência solar e a duração dos dias em cada hemisfério ao longo do ano.",
    "alternativeExplanations": {
      "A": "A distância ao Sol não explica a oposição das estações entre os hemisférios.",
      "B": "A Lua não causa as estações do ano.",
      "C": "Correta. A inclinação do eixo é o fator decisivo para as estações.",
      "D": "A rotação não muda de velocidade de modo a produzir as estações."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Ao empurrar uma caixa sobre o chão, a pessoa precisa fazer mais força em uma superfície áspera do que em uma superfície lisa. A diferença ocorre principalmente por causa:",
    "alternatives": [
      {
        "id": "A",
        "text": "da luz refletida pelo piso"
      },
      {
        "id": "B",
        "text": "da força magnética"
      },
      {
        "id": "C",
        "text": "da pressão atmosférica"
      },
      {
        "id": "D",
        "text": "da força de atrito"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Superfícies mais ásperas tendem a oferecer maior resistência ao deslizamento, aumentando a força de atrito que se opõe ao movimento.",
    "alternativeExplanations": {
      "A": "A quantidade de luz refletida não determina a resistência mecânica ao deslizamento.",
      "B": "Não há informação sobre ímãs ou materiais magnéticos.",
      "C": "A pressão atmosférica não explica a diferença principal entre os dois pisos.",
      "D": "Correta. O atrito entre as superfícies dificulta o deslizamento."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma colher metálica fria é colocada dentro de uma sopa quente. Depois de algum tempo, colher e sopa tendem a ficar com temperaturas mais próximas porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "há transferência de calor até se aproximarem do equilíbrio térmico"
      },
      {
        "id": "B",
        "text": "a colher cria calor do nada"
      },
      {
        "id": "C",
        "text": "a sopa perde toda a sua energia"
      },
      {
        "id": "D",
        "text": "o metal impede qualquer troca de energia"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Enquanto há diferença de temperatura, ocorre transferência de energia térmica do corpo mais quente para o mais frio. A troca líquida diminui quando as temperaturas se aproximam do equilíbrio.",
    "alternativeExplanations": {
      "A": "Correta. A diferença de temperatura provoca fluxo de calor.",
      "B": "A colher não cria energia; ela recebe calor da sopa.",
      "C": "A sopa não perde toda a energia térmica, apenas parte dela.",
      "D": "Metais são bons condutores e facilitam a transferência de calor."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "transferencia-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma pilha, fios e uma lâmpada estão conectados. A lâmpada não acende porque um dos fios está desconectado. Para que haja corrente elétrica no circuito, é necessário:",
    "alternatives": [
      {
        "id": "A",
        "text": "retirar a pilha do circuito"
      },
      {
        "id": "B",
        "text": "fechar o caminho condutor entre os terminais da pilha"
      },
      {
        "id": "C",
        "text": "cortar todos os fios"
      },
      {
        "id": "D",
        "text": "deixar apenas um terminal da lâmpada ligado"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A corrente precisa de um caminho condutor contínuo. Quando há uma interrupção, o circuito fica aberto e a corrente não percorre o trajeto completo.",
    "alternativeExplanations": {
      "A": "Sem a fonte, o circuito deixa de ter a diferença de potencial fornecida pela pilha.",
      "B": "Correta. Reconectar o fio fecha o circuito e permite a circulação de corrente.",
      "C": "Cortar fios criaria ainda mais interrupções.",
      "D": "A lâmpada precisa estar conectada de forma a integrar um caminho fechado."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "diagnostico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma mistura contém areia e água. Qual procedimento simples permite separar a areia da água?",
    "alternatives": [
      {
        "id": "A",
        "text": "Imantação"
      },
      {
        "id": "B",
        "text": "Fusão"
      },
      {
        "id": "C",
        "text": "Filtração"
      },
      {
        "id": "D",
        "text": "Evaporação do sólido"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A areia é um sólido insolúvel em água. Um filtro deixa o líquido passar e retém a maior parte das partículas sólidas.",
    "alternativeExplanations": {
      "A": "Imantação exige material atraído por ímã, o que não caracteriza a areia comum.",
      "B": "Fusão muda o estado físico de uma substância e não é o método indicado.",
      "C": "Correta. A filtração é adequada para separar um sólido insolúvel de um líquido.",
      "D": "A areia não precisa ser evaporada; o componente líquido é que poderia evaporar."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "filtracao",
      "separacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-i-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Qual é um dos principais objetivos da vacinação?",
    "alternatives": [
      {
        "id": "A",
        "text": "Impedir o corpo de produzir anticorpos"
      },
      {
        "id": "B",
        "text": "Substituir permanentemente os glóbulos brancos"
      },
      {
        "id": "C",
        "text": "Eliminar qualquer microrganismo do ambiente"
      },
      {
        "id": "D",
        "text": "Estimular o sistema imune a reconhecer determinados agentes antes de um contato futuro"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Vacinas apresentam antígenos ou instruções relacionadas a eles de forma segura, estimulando resposta imune e memória que podem tornar a reação futura mais rápida e eficaz.",
    "alternativeExplanations": {
      "A": "Ao contrário, muitas vacinas estimulam respostas que incluem a produção de anticorpos.",
      "B": "Vacinas não substituem permanentemente as células do sistema imune.",
      "C": "A vacinação não elimina todos os microrganismos do ambiente.",
      "D": "Correta. A memória imunológica é uma das bases da proteção vacinal."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "imunidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na circulação pulmonar, o sangue vai do coração aos pulmões e retorna ao coração.",
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
    "explanation": "Esse circuito permite que o sangue participe das trocas gasosas nos pulmões antes de seguir novamente para o restante do corpo pela circulação sistêmica.",
    "alternativeExplanations": {
      "V": "Correto. O percurso coração–pulmões–coração caracteriza a circulação pulmonar.",
      "F": "Incorreto. A afirmação descreve corretamente o circuito pulmonar."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "compreensao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Decompositores retiram nutrientes do ambiente sem devolver substâncias ao solo ou à água.",
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
    "explanation": "Ao degradar matéria orgânica, decompositores liberam substâncias simples que podem retornar ao ambiente e ser reutilizadas por produtores.",
    "alternativeExplanations": {
      "V": "Incorreto. A decomposição participa da ciclagem de nutrientes.",
      "F": "Correto. A afirmação ignora o retorno de nutrientes ao ambiente."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "ciclagem-de-nutrientes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Todos os seres vivos conhecidos são formados por uma ou mais células.",
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
    "explanation": "A teoria celular estabelece a célula como unidade básica dos organismos vivos. Há seres unicelulares e pluricelulares.",
    "alternativeExplanations": {
      "V": "Correto. Organismos podem ter uma única célula ou muitas células.",
      "F": "Incorreto. A organização celular é uma característica fundamental dos seres vivos."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "teoria-celular"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Terremotos e vulcões ocorrem exclusivamente no interior das placas tectônicas, longe de seus limites.",
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
    "explanation": "Muitos terremotos e vulcões se concentram justamente em limites de placas, onde há convergência, afastamento ou deslizamento relativo.",
    "alternativeExplanations": {
      "V": "Incorreto. Os limites tectônicos são regiões especialmente ativas.",
      "F": "Correto. A palavra 'exclusivamente' torna a afirmação incompatível com a distribuição observada desses fenômenos."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "distribuicao-de-fenomenos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "As estações do ano estão relacionadas principalmente à inclinação do eixo da Terra e ao movimento de translação.",
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
    "explanation": "Esses fatores modificam a distribuição de luz solar recebida pelos hemisférios ao longo do ano.",
    "alternativeExplanations": {
      "V": "Correto. A combinação de inclinação axial e translação explica a alternância sazonal.",
      "F": "Incorreto. A afirmação apresenta os fatores centrais para as estações."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "causa-e-efeito"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A força de atrito sempre favorece o deslizamento entre duas superfícies.",
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
    "explanation": "O atrito tende a se opor ao deslizamento relativo ou à tendência de deslizamento entre superfícies. Em várias situações ele também é essencial para caminhar ou frear.",
    "alternativeExplanations": {
      "V": "Incorreto. O atrito não atua, em geral, para aumentar o deslizamento.",
      "F": "Correto. A afirmação inverte o papel típico da força de atrito."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "interpretacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Quando dois corpos em contato atingem a mesma temperatura, deixa de haver transferência líquida de calor entre eles.",
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
    "explanation": "No equilíbrio térmico, trocas microscópicas podem continuar, mas não existe fluxo líquido de energia térmica de um corpo para o outro.",
    "alternativeExplanations": {
      "V": "Correto. Temperaturas iguais caracterizam o equilíbrio térmico entre os corpos em contato.",
      "F": "Incorreto. A igualdade de temperatura elimina a transferência líquida de calor."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "compreensao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma lâmpada ligada a uma pilha pode permanecer acesa mesmo que o circuito esteja interrompido em um dos fios.",
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
    "explanation": "Uma interrupção no caminho condutor abre o circuito e impede a corrente elétrica contínua necessária ao funcionamento da lâmpada.",
    "alternativeExplanations": {
      "V": "Incorreto. Um circuito aberto não sustenta a corrente no trajeto.",
      "F": "Correto. Para a lâmpada permanecer acesa, o circuito precisa estar fechado."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "diagnostico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A filtração pode separar areia de água porque as partículas sólidas ficam retidas em uma barreira porosa enquanto o líquido atravessa o filtro.",
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
    "explanation": "Esse é o princípio básico da filtração de uma mistura heterogênea sólido-líquido.",
    "alternativeExplanations": {
      "V": "Correto. O método explora a diferença entre o tamanho das partículas e os poros do filtro.",
      "F": "Incorreto. A descrição corresponde ao funcionamento da filtração."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "filtracao",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Vacinas são usadas apenas para tratar uma doença depois que seus sintomas já apareceram.",
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
    "explanation": "A principal função das vacinas é preventiva: preparar o sistema imune antes de uma futura exposição ao agente ou a componentes relacionados a ele.",
    "alternativeExplanations": {
      "V": "Incorreto. Vacinação é principalmente uma estratégia de prevenção.",
      "F": "Correto. A afirmação confunde prevenção por vacinação com tratamento de uma doença já instalada."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "prevencao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se dois objetos têm o mesmo volume, o que possui maior massa também possui maior densidade.",
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
    "explanation": "Como densidade = massa/volume, mantendo o volume igual, a densidade aumenta com a massa.",
    "alternativeExplanations": {
      "V": "Correto. A comparação pode ser feita diretamente quando os volumes são iguais.",
      "F": "Incorreto. Para volumes iguais, a maior massa corresponde à maior densidade."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "materia",
      "densidade",
      "comparacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-i-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em um aparelho elétrico, toda a energia recebida precisa se transformar em uma única forma de energia.",
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
    "explanation": "Um aparelho pode converter a energia recebida em várias formas ao mesmo tempo. Uma lâmpada, por exemplo, produz luz e também calor.",
    "alternativeExplanations": {
      "V": "Incorreto. Transformações de energia podem gerar várias formas simultaneamente.",
      "F": "Correto. A afirmação impõe uma condição que não existe na conservação de energia."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "conservacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma célula animal e uma célula vegetal possuem membrana plasmática, citoplasma e material genético. Qual estrutura é característica das células vegetais e está diretamente relacionada à fotossíntese?",
    "alternatives": [
      {
        "id": "A",
        "text": "Cloroplasto"
      },
      {
        "id": "B",
        "text": "Mitocôndria"
      },
      {
        "id": "C",
        "text": "Ribossomo"
      },
      {
        "id": "D",
        "text": "Membrana plasmática"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Cloroplastos contêm pigmentos como a clorofila e participam da fotossíntese. Mitocôndrias, ribossomos e membrana plasmática também estão presentes em células animais.",
    "alternativeExplanations": {
      "A": "Correta. O cloroplasto é a organela associada à fotossíntese em células vegetais.",
      "B": "Mitocôndrias realizam respiração celular e existem tanto em células animais quanto vegetais.",
      "C": "Ribossomos participam da síntese de proteínas em diversos tipos celulares.",
      "D": "A membrana plasmática envolve tanto células animais quanto vegetais."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "comparacao-celular"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma cadeia de montanhas apresenta terremotos frequentes e está localizada na região de encontro entre duas placas continentais. Qual processo tectônico é mais compatível com esse cenário?",
    "alternatives": [
      {
        "id": "A",
        "text": "Afastamento de placas sem deformação"
      },
      {
        "id": "B",
        "text": "Convergência e compressão da crosta"
      },
      {
        "id": "C",
        "text": "Ausência de movimento entre placas"
      },
      {
        "id": "D",
        "text": "Somente erosão provocada pela chuva"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Quando placas continentais convergem, a compressão pode dobrar e elevar rochas, formando cadeias montanhosas, além de gerar sismos.",
    "alternativeExplanations": {
      "A": "O afastamento de placas está associado a outros tipos de limites e não explica bem uma cadeia montanhosa continental por compressão.",
      "B": "Correta. A convergência continental pode produzir montanhas e terremotos.",
      "C": "A ocorrência frequente de terremotos indica atividade tectônica, não ausência de movimento.",
      "D": "A erosão modifica o relevo, mas não explica a formação tectônica de grandes cadeias de montanhas."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "interpretacao-geologica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em dezembro, o Hemisfério Sul recebe, em média, luz solar mais diretamente e apresenta dias mais longos que o Hemisfério Norte. Qual conclusão é mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "O Sol se aproxima apenas do Hemisfério Sul"
      },
      {
        "id": "B",
        "text": "A Terra para de girar durante o verão"
      },
      {
        "id": "C",
        "text": "O Hemisfério Sul está inclinado mais favoravelmente em direção ao Sol nessa época"
      },
      {
        "id": "D",
        "text": "A Lua aumenta a duração dos dias no Sul"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A inclinação do eixo terrestre faz com que, em dezembro, o Hemisfério Sul fique mais voltado para o Sol, recebendo maior insolação média e tendo dias mais longos.",
    "alternativeExplanations": {
      "A": "A distância Terra-Sol é praticamente a mesma para os dois hemisférios em um dado instante.",
      "B": "A rotação da Terra continua ocorrendo normalmente.",
      "C": "Correta. A geometria entre eixo terrestre e posição orbital explica a diferença sazonal.",
      "D": "A Lua não é responsável pela duração sazonal dos dias."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "interpretacao-de-fenomenos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Um bloco é puxado horizontalmente sobre duas superfícies com a mesma força aplicada. Na superfície P ele acelera mais do que na superfície Q. Considerando o mesmo bloco, qual explicação é mais provável?",
    "alternatives": [
      {
        "id": "A",
        "text": "O atrito em P é maior"
      },
      {
        "id": "B",
        "text": "A gravidade deixa de agir em P"
      },
      {
        "id": "C",
        "text": "A massa do bloco aumenta em Q"
      },
      {
        "id": "D",
        "text": "O atrito em Q é maior"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Com a mesma força aplicada e o mesmo bloco, maior resistência por atrito reduz a força resultante e, portanto, a aceleração. Como a aceleração é menor em Q, é provável que o atrito seja maior em Q.",
    "alternativeExplanations": {
      "A": "Se o atrito fosse maior em P, esperaríamos menor aceleração nessa superfície.",
      "B": "A gravidade continua atuando em ambas as situações.",
      "C": "O enunciado informa que é o mesmo bloco, portanto sua massa não muda por trocar de superfície.",
      "D": "Correta. Maior atrito em Q reduz a força resultante."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "analise-de-forcas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Misturam-se 200 g de água a 80 °C com 200 g de água a 20 °C, em um recipiente ideal que não troca calor com o ambiente. Desprezando perdas, qual temperatura final é esperada?",
    "alternatives": [
      {
        "id": "A",
        "text": "50 °C"
      },
      {
        "id": "B",
        "text": "40 °C"
      },
      {
        "id": "C",
        "text": "20 °C"
      },
      {
        "id": "D",
        "text": "80 °C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Como as massas e a substância são iguais, a energia perdida pela porção quente é igual à recebida pela fria. A temperatura de equilíbrio fica no ponto médio: (80 + 20)/2 = 50 °C.",
    "alternativeExplanations": {
      "A": "Correta. Para massas iguais de água, a temperatura final ideal é a média das temperaturas iniciais.",
      "B": "Não equilibra as trocas de energia entre massas iguais da mesma substância.",
      "C": "Isso significaria que toda a água quente esfriou sem aquecer a água fria.",
      "D": "Isso exigiria que a água fria atingisse 80 °C sem resfriar a quente."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "balanco-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Duas lâmpadas idênticas estão ligadas em série a uma pilha. Se uma delas for retirada e o circuito ficar aberto no ponto onde ela estava, o que acontece com a outra lâmpada?",
    "alternatives": [
      {
        "id": "A",
        "text": "Fica mais brilhante"
      },
      {
        "id": "B",
        "text": "Apaga"
      },
      {
        "id": "C",
        "text": "Continua acesa do mesmo modo"
      },
      {
        "id": "D",
        "text": "Passa a funcionar sem corrente"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Em um circuito em série, a corrente percorre um único caminho. Ao retirar uma lâmpada sem fechar o circuito, o caminho é interrompido e a corrente deixa de circular por ambas.",
    "alternativeExplanations": {
      "A": "A interrupção do caminho impede a corrente; não há aumento de brilho.",
      "B": "Correta. A retirada abre o circuito e a outra lâmpada também apaga.",
      "C": "Sem caminho fechado, não há corrente sustentada no circuito.",
      "D": "Uma lâmpada elétrica precisa de corrente para funcionar."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "serie"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma mistura contém limalha de ferro, areia e sal de cozinha. Qual sequência permite separar os três componentes usando procedimentos simples?",
    "alternatives": [
      {
        "id": "A",
        "text": "Filtração, imantação e fusão"
      },
      {
        "id": "B",
        "text": "Evaporação, imantação e decantação"
      },
      {
        "id": "C",
        "text": "Imantação, dissolução do sal em água, filtração e evaporação"
      },
      {
        "id": "D",
        "text": "Somente filtração"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Primeiro, um ímã remove a limalha de ferro. Depois, água dissolve o sal, mas não a areia. A filtração separa a areia da solução e a evaporação da água recupera o sal.",
    "alternativeExplanations": {
      "A": "Filtração inicial não separa adequadamente três sólidos secos, e fusão não é necessária.",
      "B": "Evaporação antes de dissolver o sal não resolve a mistura de sólidos.",
      "C": "Correta. Cada etapa explora uma propriedade diferente dos componentes.",
      "D": "Uma única filtração não separa ferro, areia e sal secos."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "separacao",
      "planejamento-de-procedimento"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em uma comunidade com baixa cobertura vacinal, aumenta o número de pessoas suscetíveis a uma doença contagiosa. Qual consequência coletiva pode ocorrer?",
    "alternatives": [
      {
        "id": "A",
        "text": "Fim da necessidade de vigilância epidemiológica"
      },
      {
        "id": "B",
        "text": "Desaparecimento automático do agente infeccioso"
      },
      {
        "id": "C",
        "text": "Imunidade imediata em quem nunca foi vacinado"
      },
      {
        "id": "D",
        "text": "Maior facilidade de transmissão e ocorrência de surtos"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Quando há mais pessoas suscetíveis, o agente encontra mais oportunidades de transmissão. Isso pode favorecer surtos e reduzir a proteção indireta da comunidade.",
    "alternativeExplanations": {
      "A": "Vigilância continua importante para detectar e controlar a transmissão.",
      "B": "O agente não desaparece automaticamente com baixa vacinação.",
      "C": "Pessoas não vacinadas não adquirem imunidade apenas porque outras pessoas também não foram vacinadas.",
      "D": "Correta. Baixa cobertura pode aumentar a circulação do agente e a ocorrência de casos."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "saude-coletiva"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma pedra tem massa de 270 g e volume de 100 cm³. Ao ser colocada em um líquido de densidade 1,0 g/cm³, qual comportamento é mais provável, desconsiderando bolhas de ar?",
    "alternatives": [
      {
        "id": "A",
        "text": "Afundar"
      },
      {
        "id": "B",
        "text": "Ficar suspensa no meio do líquido"
      },
      {
        "id": "C",
        "text": "Flutuar completamente na superfície"
      },
      {
        "id": "D",
        "text": "Evaporar"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A densidade da pedra é 270/100 = 2,7 g/cm³, maior que a do líquido. Um objeto mais denso que o fluido tende a afundar.",
    "alternativeExplanations": {
      "A": "Correta. A pedra é significativamente mais densa que o líquido.",
      "B": "Suspensão exige densidades aproximadamente iguais.",
      "C": "Flutuação seria esperada se a densidade média do objeto fosse menor que a do líquido.",
      "D": "A densidade relativa não provoca evaporação do sólido."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "materia",
      "densidade",
      "aplicacao-quantitativa"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma montanha-russa inicia a descida de um ponto alto. Desprezando perdas por atrito, qual transformação de energia predomina durante a descida?",
    "alternatives": [
      {
        "id": "A",
        "text": "Energia cinética em energia potencial gravitacional"
      },
      {
        "id": "B",
        "text": "Energia potencial gravitacional em energia cinética"
      },
      {
        "id": "C",
        "text": "Energia térmica em energia nuclear"
      },
      {
        "id": "D",
        "text": "Energia luminosa em energia química"
      }
    ],
    "correctAnswer": "B",
    "explanation": "À medida que a altura diminui, a energia potencial gravitacional diminui e a velocidade aumenta, elevando a energia cinética. Sem perdas, a energia mecânica total se conserva.",
    "alternativeExplanations": {
      "A": "Essa transformação seria característica de uma subida, não da descida.",
      "B": "Correta. A diminuição de altura acompanha o aumento de velocidade.",
      "C": "Não há processo nuclear envolvido.",
      "D": "Essas formas de energia não são as relevantes para o movimento descrito."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "energia-mecanica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Durante exercício intenso, os músculos consomem mais oxigênio. Qual resposta do sistema circulatório ajuda a atender essa demanda?",
    "alternatives": [
      {
        "id": "A",
        "text": "Redução obrigatória da frequência cardíaca"
      },
      {
        "id": "B",
        "text": "Interrupção do fluxo sanguíneo aos músculos"
      },
      {
        "id": "C",
        "text": "Aumento do débito cardíaco e do fluxo para tecidos ativos"
      },
      {
        "id": "D",
        "text": "Fechamento permanente dos vasos pulmonares"
      }
    ],
    "correctAnswer": "C",
    "explanation": "O aumento da frequência cardíaca e do volume de sangue bombeado por minuto pode elevar o fornecimento de oxigênio e nutrientes aos músculos ativos.",
    "alternativeExplanations": {
      "A": "Durante esforço, a frequência cardíaca geralmente aumenta para atender à demanda.",
      "B": "Reduzir o fluxo aos músculos dificultaria o fornecimento de oxigênio.",
      "C": "Correta. Maior débito cardíaco ajuda a transportar mais oxigênio.",
      "D": "Fechar vasos pulmonares comprometeria as trocas gasosas."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "fisiologia-do-exercicio"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-m-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em um terrário fechado, folhas secas se acumulam e quase não há fungos nem bactérias decompositoras. Com o tempo, qual efeito é mais provável?",
    "alternatives": [
      {
        "id": "A",
        "text": "A matéria orgânica morta será reciclada mais rapidamente"
      },
      {
        "id": "B",
        "text": "O solo produzirá nutrientes do nada"
      },
      {
        "id": "C",
        "text": "A fotossíntese substituirá completamente a decomposição"
      },
      {
        "id": "D",
        "text": "A decomposição diminuirá e nutrientes ficarão menos disponíveis para reutilização"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Decompositores são importantes para transformar matéria orgânica morta e devolver nutrientes ao ambiente. Com poucos deles, esse processo tende a ficar mais lento.",
    "alternativeExplanations": {
      "A": "A ausência de decompositores reduz, não acelera, a decomposição.",
      "B": "Nutrientes não são criados do nada; eles circulam entre os componentes do sistema.",
      "C": "Fotossíntese e decomposição desempenham papéis diferentes no ecossistema.",
      "D": "Correta. Menor decomposição pode atrasar a ciclagem de nutrientes."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "ciclagem-de-materia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "As estações do ano seriam igualmente marcadas nos dois hemisférios mesmo se o eixo de rotação da Terra não fosse inclinado em relação ao plano de sua órbita.",
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
    "explanation": "Sem inclinação axial significativa, a variação sazonal da incidência solar e da duração dos dias seria muito menor. A inclinação do eixo é essencial para o padrão atual das estações.",
    "alternativeExplanations": {
      "V": "Incorreto. A inclinação axial é um fator central para a intensidade das estações.",
      "F": "Correto. A afirmação desconsidera a principal causa geométrica da sazonalidade."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "raciocinio-causal"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Ao caminhar sem escorregar, o atrito entre o pé e o chão pode atuar para frente sobre a pessoa e contribuir para seu movimento.",
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
    "explanation": "Ao empurrar o chão para trás, o pé tende a deslizar para trás. O atrito estático do chão sobre o pé pode atuar para frente, permitindo a aceleração do corpo.",
    "alternativeExplanations": {
      "V": "Correto. Atrito não significa necessariamente uma força para trás em relação ao movimento do corpo.",
      "F": "Incorreto. Nesse caso, o atrito estático pode ser justamente a força horizontal que impulsiona a pessoa."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "interpretacao-de-forcas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Dois corpos de materiais diferentes podem estar em equilíbrio térmico mesmo que possuam massas diferentes.",
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
    "explanation": "Equilíbrio térmico depende de terem a mesma temperatura e não exige igualdade de massa ou de material.",
    "alternativeExplanations": {
      "V": "Correto. Corpos distintos podem atingir a mesma temperatura.",
      "F": "Incorreto. Massa e composição não precisam ser iguais para que não haja fluxo líquido de calor entre eles."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "diferenciacao-de-conceitos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em duas lâmpadas idênticas ligadas em paralelo a uma fonte ideal, a retirada de uma delas necessariamente interrompe o caminho elétrico da outra.",
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
    "explanation": "Em paralelo, cada ramo possui seu próprio caminho entre os terminais da fonte. Retirar uma lâmpada de um ramo não precisa abrir o outro ramo.",
    "alternativeExplanations": {
      "V": "Incorreto. A independência dos ramos é uma característica importante de ligações em paralelo.",
      "F": "Correto. A outra lâmpada pode continuar conectada a um caminho fechado."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "paralelo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Para separar uma solução de sal em água por filtração comum, basta usar um filtro de papel, pois o sal dissolvido ficará retido.",
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
    "explanation": "O sal dissolvido está disperso em escala molecular/iónica e atravessa um filtro de papel junto com a água. Para recuperar o sal, pode-se usar evaporação ou cristalização.",
    "alternativeExplanations": {
      "V": "Incorreto. Filtração comum não separa um soluto dissolvido de seu solvente.",
      "F": "Correto. O método proposto é inadequado para uma solução verdadeira."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "separacao",
      "escolha-de-metodo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Uma pessoa vacinada nunca poderá ser infectada pelo agente contra o qual recebeu a vacina.",
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
    "explanation": "Vacinas reduzem o risco de doença e, em muitos casos, de infecção, mas nenhuma proteção deve ser tratada como absoluta para todas as pessoas e circunstâncias.",
    "alternativeExplanations": {
      "V": "Incorreto. A palavra 'nunca' torna a afirmação cientificamente inadequada.",
      "F": "Correto. Vacinação reduz riscos, mas não implica proteção absoluta em todos os casos."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "avaliacao-de-afirmacoes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Dois objetos com a mesma massa podem ter densidades diferentes se seus volumes forem diferentes.",
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
    "explanation": "Como densidade = massa/volume, mantendo a massa constante, um volume diferente produz uma densidade diferente.",
    "alternativeExplanations": {
      "V": "Correto. Um objeto mais compacto pode ter maior densidade mesmo com a mesma massa total.",
      "F": "Incorreto. A igualdade de massa não garante igualdade de densidade."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "materia",
      "densidade",
      "raciocinio-proporcional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em um freio de bicicleta, parte da energia cinética do movimento pode ser transformada em energia térmica por atrito.",
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
    "explanation": "O atrito entre componentes do freio e a roda dissipa energia mecânica em forma de calor, reduzindo a velocidade.",
    "alternativeExplanations": {
      "V": "Correto. A energia não desaparece; parte dela é convertida em energia interna/térmica.",
      "F": "Incorreto. O aquecimento dos freios é uma evidência dessa transformação."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "conservacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Na circulação sistêmica, o sangue que sai do lado esquerdo do coração é distribuído aos tecidos do corpo antes de retornar ao lado direito.",
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
    "explanation": "O ventrículo esquerdo impulsiona sangue para a circulação sistêmica; após passar pelos tecidos, o sangue retorna pelas veias ao lado direito do coração.",
    "alternativeExplanations": {
      "V": "Correto. Esse é o trajeto geral do circuito sistêmico.",
      "F": "Incorreto. A afirmação distingue corretamente a circulação sistêmica da pulmonar."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "fluxo-sanguineo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A decomposição da matéria orgânica só é importante para remover restos do ambiente e não participa da disponibilidade de nutrientes aos produtores.",
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
    "explanation": "Além de degradar restos, decompositores liberam nutrientes minerais que podem retornar ao solo e à água e ser utilizados por produtores.",
    "alternativeExplanations": {
      "V": "Incorreto. A decomposição integra a ciclagem de matéria nos ecossistemas.",
      "F": "Correto. A afirmação reduz indevidamente a função ecológica dos decompositores."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "ciclagem-de-nutrientes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Células musculares e células nervosas de um mesmo indivíduo podem apresentar formas e funções diferentes mesmo contendo, em geral, o mesmo conjunto básico de DNA.",
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
    "explanation": "A diferenciação celular envolve diferentes padrões de expressão gênica. Assim, células do mesmo organismo podem especializar-se em funções distintas sem possuir genomas totalmente diferentes.",
    "alternativeExplanations": {
      "V": "Correto. Especialização celular depende de quais genes são ativados e de características estruturais específicas.",
      "F": "Incorreto. Ter o mesmo material genético básico não impede a existência de tipos celulares muito diferentes."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "diferenciacao-celular"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-m-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "O movimento das placas tectônicas é rápido o suficiente para deslocar continentes vários quilômetros por ano.",
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
    "explanation": "As placas se movem tipicamente a taxas da ordem de centímetros por ano, não quilômetros por ano.",
    "alternativeExplanations": {
      "V": "Incorreto. O movimento é lento em escala humana, embora produza grandes deslocamentos ao longo de milhões de anos.",
      "F": "Correto. A afirmação superestima enormemente a velocidade das placas."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "escala-temporal"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Três recipientes isolados contêm água: A tem 100 g a 80 °C; B tem 200 g a 20 °C. Toda a água de A é misturada à de B, sem perdas de calor. Qual temperatura de equilíbrio é esperada?",
    "alternatives": [
      {
        "id": "A",
        "text": "40 °C"
      },
      {
        "id": "B",
        "text": "50 °C"
      },
      {
        "id": "C",
        "text": "60 °C"
      },
      {
        "id": "D",
        "text": "70 °C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Como é a mesma substância e não há perdas, a temperatura final é uma média ponderada pelas massas: Tf = (100×80 + 200×20)/(300) = 40 °C.",
    "alternativeExplanations": {
      "A": "Correta. A maior massa de água fria puxa a temperatura de equilíbrio para mais perto de 20 °C.",
      "B": "50 °C seria a média simples das temperaturas, válida apenas para massas iguais da mesma substância.",
      "C": "Esse valor ficaria excessivamente próximo da porção quente, apesar de ela ter metade da massa da porção fria.",
      "D": "Não satisfaz o balanço de energia entre as duas porções."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "balanco-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Duas lâmpadas idênticas estão ligadas em paralelo a uma fonte ideal. Uma terceira lâmpada idêntica é acrescentada em um novo ramo paralelo. Qual mudança é esperada, supondo que a tensão da fonte se mantenha constante?",
    "alternatives": [
      {
        "id": "A",
        "text": "As lâmpadas anteriores apagam"
      },
      {
        "id": "B",
        "text": "A corrente total fornecida pela fonte aumenta, enquanto cada lâmpada continua submetida à mesma tensão"
      },
      {
        "id": "C",
        "text": "A corrente total diminui porque há mais caminhos"
      },
      {
        "id": "D",
        "text": "A tensão em cada lâmpada passa obrigatoriamente a um terço"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Em paralelo, cada ramo recebe a tensão da fonte. Acrescentar um ramo reduz a resistência equivalente do conjunto e aumenta a corrente total demandada da fonte ideal.",
    "alternativeExplanations": {
      "A": "Os ramos antigos continuam formando caminhos fechados e não precisam apagar.",
      "B": "Correta. A tensão dos ramos se mantém e a fonte passa a alimentar mais corrente total.",
      "C": "Mais ramos em paralelo reduzem a resistência equivalente, aumentando a corrente total para tensão fixa.",
      "D": "Divisão de tensão entre componentes é característica de outras configurações, não de ramos paralelos diretamente ligados à fonte."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "paralelo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma mistura contém água, sal dissolvido e areia. O objetivo é obter separadamente a areia e o sal sólido. Qual sequência é mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "Evaporar toda a mistura e depois filtrar"
      },
      {
        "id": "B",
        "text": "Usar apenas um ímã"
      },
      {
        "id": "C",
        "text": "Filtrar primeiro e depois evaporar a água do filtrado"
      },
      {
        "id": "D",
        "text": "Decantar e descartar o líquido"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A filtração retém a areia e deixa passar a solução de sal. Depois, a evaporação ou cristalização da água permite recuperar o sal sólido.",
    "alternativeExplanations": {
      "A": "Após evaporar a água, sal e areia continuariam misturados como sólidos, e a filtração comum não os separaria.",
      "B": "Nem areia nem sal de cozinha são separados da água por magnetismo.",
      "C": "Correta. A sequência explora primeiro a insolubilidade da areia e depois a volatilidade da água.",
      "D": "Descartar a fase líquida faria perder o sal dissolvido."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "separacao",
      "planejamento-experimental"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em uma escola, 95% dos alunos vacinados contra determinada doença desenvolveram resposta imune detectável, enquanto uma pequena parcela não respondeu adequadamente. Qual conclusão é cientificamente mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "A vacina falhou, porque não protegeu 100% dos alunos"
      },
      {
        "id": "B",
        "text": "Vacinação e memória imunológica não têm relação"
      },
      {
        "id": "C",
        "text": "Os alunos sem resposta imune não possuem sistema imunológico"
      },
      {
        "id": "D",
        "text": "A resposta à vacinação pode variar entre indivíduos, e alta eficácia não significa proteção absoluta"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Vacinas podem apresentar alta eficácia sem produzir exatamente a mesma resposta em todos os indivíduos. Idade, condições de saúde e variações biológicas podem influenciar a resposta.",
    "alternativeExplanations": {
      "A": "Eficácia elevada não exige resposta idêntica em 100% das pessoas.",
      "B": "A memória imunológica é uma das bases de muitas estratégias vacinais.",
      "C": "Ausência de resposta detectável a uma vacina não significa ausência completa de sistema imune.",
      "D": "Correta. A conclusão reconhece a variabilidade biológica sem negar o efeito coletivo da vacinação."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "interpretacao-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um objeto de massa 240 g é totalmente mergulhado em uma proveta, fazendo o nível da água subir de 150 mL para 230 mL. Qual é a densidade média do objeto?",
    "alternatives": [
      {
        "id": "A",
        "text": "3,0 g/cm³"
      },
      {
        "id": "B",
        "text": "1,9 g/cm³"
      },
      {
        "id": "C",
        "text": "0,75 g/cm³"
      },
      {
        "id": "D",
        "text": "80 g/cm³"
      }
    ],
    "correctAnswer": "A",
    "explanation": "O volume deslocado é 230 − 150 = 80 mL = 80 cm³. A densidade é 240/80 = 3,0 g/cm³.",
    "alternativeExplanations": {
      "A": "Correta. O deslocamento de água fornece o volume do objeto.",
      "B": "Resulta de usar 150 mL ou outra base incorreta no cálculo.",
      "C": "Inverte ou combina incorretamente massa e volume.",
      "D": "80 cm³ é o volume do objeto, não sua densidade."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "materia",
      "densidade",
      "medicao-indireta"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um carrinho parte do repouso do alto de uma rampa e chega ao final com menos energia cinética do que a diminuição de sua energia potencial gravitacional sugeriria. Qual explicação é mais consistente com a conservação da energia?",
    "alternatives": [
      {
        "id": "A",
        "text": "Parte da energia foi destruída durante a descida"
      },
      {
        "id": "B",
        "text": "Parte da energia mecânica foi transformada em calor e som por forças dissipativas"
      },
      {
        "id": "C",
        "text": "A gravidade deixou de atuar antes do fim da rampa"
      },
      {
        "id": "D",
        "text": "A massa do carrinho desapareceu parcialmente"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A energia total se conserva, mas a energia mecânica pode ser convertida em outras formas, como energia térmica por atrito e energia sonora.",
    "alternativeExplanations": {
      "A": "A conservação da energia não permite interpretar a diferença como destruição de energia.",
      "B": "Correta. Atrito e outras forças dissipativas transformam parte da energia mecânica.",
      "C": "A gravidade continua atuando ao longo da descida.",
      "D": "Não há indicação de perda de massa; a diferença energética é explicada por transformações."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "analise-de-sistema"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um paciente apresenta obstrução importante na artéria pulmonar. Considerando o trajeto da circulação, qual consequência direta é mais provável?",
    "alternatives": [
      {
        "id": "A",
        "text": "Maior facilidade para o sangue chegar aos pulmões"
      },
      {
        "id": "B",
        "text": "Interrupção exclusiva do sangue que vai do lado esquerdo do coração ao corpo"
      },
      {
        "id": "C",
        "text": "Dificuldade de levar sangue do lado direito do coração aos pulmões para realizar trocas gasosas"
      },
      {
        "id": "D",
        "text": "Aumento imediato da quantidade de oxigênio no sangue por redução do fluxo pulmonar"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A artéria pulmonar conduz sangue do lado direito do coração para os pulmões. Uma obstrução importante pode reduzir esse fluxo e comprometer a passagem do sangue pelo circuito de trocas gasosas.",
    "alternativeExplanations": {
      "A": "Uma obstrução aumenta a resistência ao fluxo, não a facilidade.",
      "B": "A circulação sistêmica sai principalmente do lado esquerdo; a obstrução descrita está no circuito pulmonar.",
      "C": "Correta. A posição da artéria pulmonar no circuito permite prever essa consequência.",
      "D": "Reduzir o fluxo pulmonar não aumenta automaticamente a oxigenação do sangue."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "relacao-estrutura-funcao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Dois recipientes recebem a mesma massa de folhas secas. No recipiente X há solo úmido e aerado; no Y, o solo foi esterilizado e mantido muito seco. Após algumas semanas, em qual condição se espera maior decomposição e por quê?",
    "alternatives": [
      {
        "id": "A",
        "text": "Nos dois, obrigatoriamente na mesma velocidade"
      },
      {
        "id": "B",
        "text": "Em Y, porque a esterilização aumenta a quantidade de microrganismos"
      },
      {
        "id": "C",
        "text": "Em Y, porque a falta de água acelera todas as reações biológicas"
      },
      {
        "id": "D",
        "text": "Em X, porque umidade e presença de decompositores favorecem sua atividade"
      }
    ],
    "correctAnswer": "D",
    "explanation": "A decomposição biológica depende da atividade de organismos como fungos e bactérias, que em geral precisam de condições adequadas de umidade e ambiente. Esterilização e secura reduzem essa atividade.",
    "alternativeExplanations": {
      "A": "As condições ambientais são muito diferentes, portanto não há motivo para esperar a mesma taxa.",
      "B": "Esterilização reduz a população de microrganismos em vez de aumentá-la.",
      "C": "Falta de água tende a limitar processos metabólicos de decompositores.",
      "D": "Correta. X oferece condições mais favoráveis à atividade decompositora."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "controle-de-variaveis"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Células da pele e neurônios de uma mesma pessoa possuem funções e formas muito diferentes. Qual explicação melhor relaciona esse fato à organização celular?",
    "alternatives": [
      {
        "id": "A",
        "text": "Células especializadas podem expressar conjuntos diferentes de genes do mesmo genoma"
      },
      {
        "id": "B",
        "text": "Cada tipo celular possui necessariamente um DNA completamente diferente"
      },
      {
        "id": "C",
        "text": "Neurônios não são células"
      },
      {
        "id": "D",
        "text": "Somente células da pele possuem membrana plasmática"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Em organismos multicelulares, diferentes tipos celulares geralmente compartilham o mesmo genoma, mas ativam e silenciam genes de maneiras diferentes, produzindo proteínas e estruturas compatíveis com funções distintas.",
    "alternativeExplanations": {
      "A": "Correta. Diferentes padrões de expressão gênica ajudam a explicar a diferenciação.",
      "B": "A especialização não exige genomas completamente diferentes entre os tipos celulares do mesmo indivíduo.",
      "C": "Neurônios são células especializadas do sistema nervoso.",
      "D": "Neurônios também possuem membrana plasmática."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "diferenciacao-celular"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em uma região oceânica, uma placa mais densa mergulha sob outra em um limite convergente. Qual conjunto de fenômenos é mais compatível com esse processo?",
    "alternatives": [
      {
        "id": "A",
        "text": "Ausência completa de sismos e vulcões"
      },
      {
        "id": "B",
        "text": "Formação de fossa oceânica, terremotos e atividade vulcânica"
      },
      {
        "id": "C",
        "text": "Somente formação de dunas por ação do vento"
      },
      {
        "id": "D",
        "text": "Desaparecimento instantâneo da crosta sem liberação de energia"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Em zonas de subducção, uma placa mergulha sob outra, formando fossas oceânicas e favorecendo intensa atividade sísmica e vulcanismo associado.",
    "alternativeExplanations": {
      "A": "Subducção está associada a forte atividade geológica.",
      "B": "Correta. Esse conjunto é típico de muitas zonas de subducção.",
      "C": "Dunas são feições superficiais controladas principalmente por transporte de sedimentos pelo vento.",
      "D": "A placa não desaparece instantaneamente; o processo ocorre ao longo de grandes escalas de tempo e envolve deformação e liberação de energia."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "subduccao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Duas cidades estão aproximadamente na mesma latitude, uma no Hemisfério Norte e outra no Hemisfério Sul. Em junho, a cidade do Norte tem dias mais longos. Qual previsão é mais coerente para dezembro?",
    "alternatives": [
      {
        "id": "A",
        "text": "A cidade do Norte continuará necessariamente com dias mais longos"
      },
      {
        "id": "B",
        "text": "As duas terão sempre exatamente 12 horas de luz"
      },
      {
        "id": "C",
        "text": "A tendência se inverte: a cidade do Sul passa a ter dias mais longos"
      },
      {
        "id": "D",
        "text": "A duração do dia deixa de depender da inclinação do eixo terrestre"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A inclinação axial faz os hemisférios alternarem qual deles está mais voltado para o Sol ao longo da órbita. Em dezembro, o Hemisfério Sul está em sua estação de maior insolação.",
    "alternativeExplanations": {
      "A": "A vantagem sazonal de iluminação alterna entre os hemisférios.",
      "B": "Dias de 12 horas aproximadamente ocorrem nos equinócios, não durante todo o ano.",
      "C": "Correta. Em dezembro, o padrão sazonal se inverte em relação a junho.",
      "D": "A inclinação axial continua sendo a causa central dessas diferenças."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "previsao-cientifica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-mc-a-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um estudante quer comparar o atrito entre um mesmo bloco e três superfícies. Para que o teste seja mais confiável, qual procedimento é melhor?",
    "alternatives": [
      {
        "id": "A",
        "text": "Usar blocos de massas diferentes em cada superfície"
      },
      {
        "id": "B",
        "text": "Alterar simultaneamente a inclinação e o material da superfície"
      },
      {
        "id": "C",
        "text": "Medir apenas uma superfície e generalizar o resultado"
      },
      {
        "id": "D",
        "text": "Manter o bloco e o modo de aplicação da força iguais, variando apenas a superfície"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Um experimento comparativo deve controlar as demais variáveis relevantes e alterar principalmente a variável cujo efeito se deseja investigar, neste caso a superfície.",
    "alternativeExplanations": {
      "A": "Mudar a massa junto com a superfície introduz outra variável que pode afetar o resultado.",
      "B": "Alterar duas condições ao mesmo tempo dificulta identificar qual delas causou a diferença.",
      "C": "Sem comparação entre superfícies, não é possível testar adequadamente a hipótese.",
      "D": "Correta. O controle de variáveis torna a comparação entre superfícies mais informativa."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "planejamento-experimental"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-01",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Misturas",
    "subtopic": "Separação",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma solução de sal em água atravessa um filtro de papel comum e, por isso, o líquido coletado deixa de conter sal dissolvido.",
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
    "explanation": "O filtro retém partículas sólidas suficientemente grandes, mas íons e moléculas dissolvidos passam pelos poros com a água. Para separar sal dissolvido, são necessários outros processos, como evaporação, cristalização ou técnicas de membrana apropriadas.",
    "alternativeExplanations": {
      "V": "Incorreto. A filtração comum não remove um soluto verdadeiramente dissolvido.",
      "F": "Correto. O filtrado continua contendo o sal dissolvido."
    },
    "tags": [
      "misturas",
      "filtracao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "misturas",
      "separacao",
      "limitacoes-de-metodo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-02",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Saúde",
    "subtopic": "Vacinação",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A ocorrência de alguns casos da doença entre pessoas vacinadas não prova, por si só, que a vacina não possui efeito protetor.",
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
    "explanation": "Proteção vacinal é avaliada pela redução de risco na população, não pela ausência absoluta de casos. Mesmo uma vacina eficaz pode não impedir todos os casos entre pessoas vacinadas.",
    "alternativeExplanations": {
      "V": "Correto. Casos individuais podem ocorrer mesmo quando a vacinação reduz de forma relevante a probabilidade de adoecimento.",
      "F": "Incorreto. Para concluir que não há efeito protetor, seria necessário avaliar comparativamente o risco entre grupos e outras evidências, não apenas observar alguns casos."
    },
    "tags": [
      "saude",
      "vacinacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "saude",
      "vacinacao",
      "interpretacao-de-evidencias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-03",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Matéria",
    "subtopic": "Propriedades",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Um corpo de densidade 0,8 g/cm³ pode flutuar parcialmente em água de densidade aproximada de 1,0 g/cm³, desde que as demais condições permitam o equilíbrio.",
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
    "explanation": "Um objeto menos denso que o líquido pode deslocar uma quantidade de fluido cujo peso equilibre seu peso antes de ficar totalmente submerso, permanecendo parcialmente fora da água.",
    "alternativeExplanations": {
      "V": "Correto. A densidade média menor que a da água é compatível com flutuação.",
      "F": "Incorreto. Não é necessário que as densidades sejam iguais para um objeto flutuar parcialmente."
    },
    "tags": [
      "materia",
      "densidade",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "materia",
      "densidade",
      "flutuacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-04",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Energia",
    "subtopic": "Transformações",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se um processo apresenta atrito, a energia mecânica perdida deixa de existir e, por isso, a energia total do sistema não se conserva.",
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
    "explanation": "Atrito pode transformar energia mecânica em energia interna, calor e som. A energia total continua sendo contabilizada quando o sistema e suas formas de energia são considerados adequadamente.",
    "alternativeExplanations": {
      "V": "Incorreto. A redução de energia mecânica não significa destruição de energia.",
      "F": "Correto. É necessário distinguir conservação da energia total de conservação da energia mecânica."
    },
    "tags": [
      "energia",
      "conservacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "energia",
      "transformacoes",
      "conservacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-05",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Corpo humano",
    "subtopic": "Circulação",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Durante exercício, aumentar o débito cardíaco pode elevar a quantidade de oxigênio transportada aos músculos por unidade de tempo, desde que a oxigenação do sangue e outros fatores sejam adequados.",
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
    "explanation": "Débito cardíaco é o volume de sangue bombeado por minuto. Maior fluxo pode aumentar a entrega de oxigênio aos tecidos ativos, especialmente quando combinado com adequada oxigenação e redistribuição do fluxo.",
    "alternativeExplanations": {
      "V": "Correto. A circulação responde à maior demanda metabólica dos músculos.",
      "F": "Incorreto. A relação entre fluxo sanguíneo e oferta de oxigênio é fisiologicamente importante durante o esforço."
    },
    "tags": [
      "corpo-humano",
      "circulacao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "corpo-humano",
      "circulacao",
      "fisiologia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-06",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Ecologia",
    "subtopic": "Decomposição",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em um ecossistema fechado, a ausência prolongada de decompositores não afetaria a ciclagem de nutrientes, pois produtores conseguem criar novos elementos químicos a partir da luz solar.",
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
    "explanation": "Produtores transformam energia luminosa e incorporam substâncias disponíveis, mas não criam elementos químicos do nada. Sem decomposição, nutrientes presentes em matéria orgânica morta ficam menos disponíveis para recirculação.",
    "alternativeExplanations": {
      "V": "Incorreto. A matéria precisa ser reciclada; luz fornece energia, não novos elementos químicos.",
      "F": "Correto. A decomposição é crucial para devolver nutrientes ao ambiente."
    },
    "tags": [
      "ecologia",
      "decompositores",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "ecologia",
      "decomposicao",
      "ciclagem-de-materia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-07",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Seres vivos",
    "subtopic": "Célula",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma célula vegetal colocada em solução muito concentrada de solutos pode perder água por osmose, alterando seu volume mesmo sem ruptura imediata da parede celular.",
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
    "explanation": "A água tende a deslocar-se através da membrana em resposta à diferença de concentração de solutos. Em meio hipertônico, a célula vegetal pode perder água e sofrer plasmólise, enquanto a parede celular mantém sua estrutura externa.",
    "alternativeExplanations": {
      "V": "Correto. A membrana e a parede celular têm funções diferentes no comportamento osmótico.",
      "F": "Incorreto. A presença da parede não impede a movimentação de água pela membrana plasmática."
    },
    "tags": [
      "seres-vivos",
      "celula",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "seres-vivos",
      "celula",
      "osmose"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-08",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Terra",
    "subtopic": "Placas tectônicas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "O fato de continentes atualmente separados apresentarem fósseis semelhantes é incompatível com a tectônica de placas, pois organismos terrestres não poderiam atravessar oceanos.",
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
    "explanation": "Semelhanças fossilíferas entre continentes hoje separados são uma das linhas de evidência de que essas massas continentais já estiveram unidas ou mais próximas no passado.",
    "alternativeExplanations": {
      "V": "Incorreto. A distribuição de fósseis pode ser explicada pela história do movimento continental.",
      "F": "Correto. A afirmação interpreta ao contrário uma evidência clássica de mobilidade dos continentes."
    },
    "tags": [
      "terra",
      "placas-tectonicas",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "terra",
      "placas-tectonicas",
      "evidencias-cientificas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-09",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Astronomia",
    "subtopic": "Estações",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A ocorrência do verão no Hemisfério Sul em dezembro é explicada principalmente pelo fato de a Terra estar mais próxima do Sol nesse mês.",
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
    "explanation": "A principal causa das estações é a inclinação do eixo terrestre. A distância Terra-Sol varia ao longo da órbita, mas não explica estações opostas nos dois hemisférios.",
    "alternativeExplanations": {
      "V": "Incorreto. Se a distância fosse a causa principal, os dois hemisférios tenderiam a ter a mesma estação ao mesmo tempo.",
      "F": "Correto. A geometria da incidência solar causada pela inclinação axial explica a oposição sazonal."
    },
    "tags": [
      "astronomia",
      "estacoes",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "astronomia",
      "estacoes",
      "avaliacao-de-modelos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-10",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Força e movimento",
    "subtopic": "Atrito",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se um objeto desliza para a direita sobre uma superfície horizontal, a força de atrito cinético exercida pela superfície sobre o objeto aponta para a esquerda, desde que não haja outro movimento relativo local relevante.",
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
    "explanation": "O atrito cinético atua em sentido oposto ao deslizamento relativo entre as superfícies. Se o objeto desliza para a direita em relação ao chão, o atrito sobre ele atua para a esquerda.",
    "alternativeExplanations": {
      "V": "Correto. A direção do atrito é determinada pelo movimento relativo na interface.",
      "F": "Incorreto. O atrito cinético não aponta, nesse caso, no mesmo sentido do deslizamento."
    },
    "tags": [
      "forca",
      "atrito",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "forca-e-movimento",
      "atrito",
      "vetores"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-11",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Calor",
    "subtopic": "Temperatura",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Ao misturar dois corpos isolados termicamente, o corpo inicialmente mais quente sempre cede exatamente a mesma quantidade de energia que o corpo inicialmente mais frio recebe, desde que não ocorram mudanças de fase ou outras formas relevantes de armazenamento de energia.",
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
    "explanation": "Em um sistema termicamente isolado e sob as condições indicadas, a conservação de energia exige que o calor perdido por um corpo tenha o mesmo módulo do calor ganho pelo outro.",
    "alternativeExplanations": {
      "V": "Correto. Essa igualdade fundamenta os cálculos de equilíbrio térmico em sistemas ideais isolados.",
      "F": "Incorreto. A diferença de massas ou materiais altera a variação de temperatura, mas não a igualdade entre energia cedida e recebida no sistema isolado."
    },
    "tags": [
      "calor",
      "equilibrio-termico",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "calor",
      "equilibrio-termico",
      "conservacao-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "ciencias-vest-v1-vf-a-12",
    "area": "Ciências da Natureza",
    "subject": "ciencias",
    "subjectName": "Ciências",
    "topic": "Eletricidade",
    "subtopic": "Circuitos",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em um circuito ideal com dois resistores idênticos em paralelo, retirar um dos ramos e manter a fonte de tensão constante aumenta a corrente total fornecida pela fonte.",
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
    "explanation": "Dois resistores idênticos em paralelo oferecem resistência equivalente menor que um único resistor. Ao retirar um ramo, a resistência equivalente aumenta e a corrente total da fonte diminui.",
    "alternativeExplanations": {
      "V": "Incorreto. Menos ramos paralelos significam maior resistência equivalente e menor corrente total para a mesma tensão.",
      "F": "Correto. A afirmação inverte o efeito de remover um ramo paralelo."
    },
    "tags": [
      "eletricidade",
      "circuito",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "ensino-fundamental",
    "skills": [
      "eletricidade",
      "circuitos",
      "resistencia-equivalente"
    ],
    "origin": "nabulab"
  }
];
