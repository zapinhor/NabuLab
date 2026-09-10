import type { Question } from "@/types/question";

export const geografiaQuestions: Question[] = [
  {
    "id": "geografia-vest-v1-mc-i-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em um mapa de escala 1:500.000, a distância entre duas cidades mede 2 cm.\n    Qual é a distância real aproximada entre elas?",
    "alternatives": [
      {
        "id": "A",
        "text": "10 km"
      },
      {
        "id": "B",
        "text": "1 km"
      },
      {
        "id": "C",
        "text": "25 km"
      },
      {
        "id": "D",
        "text": "100 km"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Na escala 1:500.000, 1 cm no mapa representa 500.000 cm no terreno, isto é, 5 km. Portanto, 2 cm representam 10 km.",
    "alternativeExplanations": {
      "A": "Correta. Na escala 1:500.000, 1 cm no mapa representa 500.000 cm no terreno, isto é, 5 km. Portanto, 2 cm representam 10 km.",
      "B": "Esse valor corresponderia a uma escala muito maior; ele não resulta da conversão de 500.000 cm para 5 km.",
      "C": "Esse resultado superestima a distância representada por 2 cm.",
      "D": "Esse valor decorre de uma conversão incorreta entre centímetros e quilômetros."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "conversao-de-distancias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em uma região de grande amplitude térmica diária, blocos de rocha apresentam fissuras\n    que se ampliam após sucessivos ciclos de aquecimento e resfriamento. O material ainda\n    permanece próximo da rocha de origem.\n\n    O processo descrito corresponde principalmente a:",
    "alternatives": [
      {
        "id": "A",
        "text": "erosão fluvial"
      },
      {
        "id": "B",
        "text": "intemperismo físico"
      },
      {
        "id": "C",
        "text": "sedimentação"
      },
      {
        "id": "D",
        "text": "tectonismo"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A variação de temperatura provoca expansão e contração da rocha, favorecendo sua fragmentação sem exigir transporte do material.",
    "alternativeExplanations": {
      "A": "Erosão envolve remoção e transporte de material por um agente, o que não é o foco da situação.",
      "B": "Correta. A variação de temperatura provoca expansão e contração da rocha, favorecendo sua fragmentação sem exigir transporte do material.",
      "C": "Sedimentação é a deposição de materiais transportados.",
      "D": "Tectonismo decorre de forças internas da crosta e não de ciclos térmicos superficiais."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "processos-externos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em uma mesma noite, sensores registraram 27 °C em uma área central densamente edificada\n    e 23 °C em um parque arborizado próximo. As duas áreas estavam sob as mesmas condições\n    regionais de tempo.\n\n    Qual fenômeno ajuda a explicar essa diferença?",
    "alternatives": [
      {
        "id": "A",
        "text": "inversão térmica"
      },
      {
        "id": "B",
        "text": "chuva orográfica"
      },
      {
        "id": "C",
        "text": "ilha de calor urbana"
      },
      {
        "id": "D",
        "text": "continentalidade"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Superfícies impermeáveis, menor cobertura vegetal, materiais que armazenam calor e fontes antrópicas de energia podem elevar a temperatura de áreas urbanizadas em relação ao entorno.",
    "alternativeExplanations": {
      "A": "A inversão térmica diz respeito à disposição vertical das camadas de ar e não explica, por si só, esse contraste espacial entre centro e parque.",
      "B": "Esse tipo de chuva está associado à elevação do ar sobre barreiras de relevo.",
      "C": "Correta. Superfícies impermeáveis, menor cobertura vegetal, materiais que armazenam calor e fontes antrópicas de energia podem elevar a temperatura de áreas urbanizadas em relação ao entorno.",
      "D": "Continentalidade atua em escalas regionais e não explica a diferença entre dois pontos próximos da mesma cidade."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "analise-urbana"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma paisagem apresenta estação seca marcada, árvores de troncos tortuosos, raízes profundas,\n    gramíneas e espécies com adaptações a condições periódicas de fogo.\n\n    No Brasil, essa descrição corresponde principalmente ao:",
    "alternatives": [
      {
        "id": "A",
        "text": "Pampa"
      },
      {
        "id": "B",
        "text": "Pantanal"
      },
      {
        "id": "C",
        "text": "Manguezal"
      },
      {
        "id": "D",
        "text": "Cerrado"
      }
    ],
    "correctAnswer": "D",
    "explanation": "O Cerrado reúne formações savânicas, elevada biodiversidade, sazonalidade climática e espécies com adaptações a solos, seca e regimes naturais de fogo.",
    "alternativeExplanations": {
      "A": "O Pampa é dominado por campos subtropicais do Sul e possui outra dinâmica climática e vegetal.",
      "B": "O Pantanal é marcado sobretudo pela planície inundável e por pulsos sazonais de cheia.",
      "C": "Manguezais ocupam ambientes costeiros sujeitos à influência de marés e salinidade.",
      "D": "Correta. O Cerrado reúne formações savânicas, elevada biodiversidade, sazonalidade climática e espécies com adaptações a solos, seca e regimes naturais de fogo."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "biomas-brasileiros"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Um rio recebe água de vários afluentes. As áreas de terreno que drenam para esse rio\n    e seus tributários formam uma unidade que pode atravessar limites municipais e estaduais.\n\n    Essa unidade é chamada de:",
    "alternatives": [
      {
        "id": "A",
        "text": "bacia hidrográfica"
      },
      {
        "id": "B",
        "text": "aquífero"
      },
      {
        "id": "C",
        "text": "estuário"
      },
      {
        "id": "D",
        "text": "delta"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A bacia hidrográfica é o conjunto de terras drenadas por um rio principal e seus afluentes, delimitado por divisores de águas.",
    "alternativeExplanations": {
      "A": "Correta. A bacia hidrográfica é o conjunto de terras drenadas por um rio principal e seus afluentes, delimitado por divisores de águas.",
      "B": "Aquífero é uma formação geológica capaz de armazenar e transmitir água subterrânea.",
      "C": "Estuário é a região de transição entre a foz de um rio e o mar.",
      "D": "Delta é uma forma de deposição de sedimentos na foz de certos rios."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacia-hidrografica",
      "organizacao-do-espaco"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em um país, as taxas de mortalidade caíram rapidamente após melhorias sanitárias,\n    enquanto as taxas de natalidade permaneceram altas por algumas décadas.\n\n    Qual consequência demográfica é mais provável nessa etapa?",
    "alternatives": [
      {
        "id": "A",
        "text": "redução imediata da população total"
      },
      {
        "id": "B",
        "text": "aceleração temporária do crescimento populacional"
      },
      {
        "id": "C",
        "text": "envelhecimento instantâneo de toda a população"
      },
      {
        "id": "D",
        "text": "fim dos fluxos migratórios"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Quando a mortalidade cai antes da natalidade, aumenta a diferença entre nascimentos e mortes, o que tende a acelerar o crescimento natural por um período.",
    "alternativeExplanations": {
      "A": "A queda da mortalidade tende a produzir o efeito oposto enquanto a natalidade permanece elevada.",
      "B": "Correta. Quando a mortalidade cai antes da natalidade, aumenta a diferença entre nascimentos e mortes, o que tende a acelerar o crescimento natural por um período.",
      "C": "O envelhecimento é um processo gradual e depende, entre outros fatores, da posterior redução da fecundidade.",
      "D": "Migração não desaparece automaticamente por causa da mudança nas taxas vitais."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "interpretacao-de-taxas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "O crescimento urbano de dois municípios vizinhos fez com que suas áreas construídas\n    se encontrassem, formando uma mancha urbana praticamente contínua, embora continuem\n    existindo duas administrações municipais.\n\n    Esse processo é denominado:",
    "alternatives": [
      {
        "id": "A",
        "text": "verticalização"
      },
      {
        "id": "B",
        "text": "segregação socioespacial"
      },
      {
        "id": "C",
        "text": "conurbação"
      },
      {
        "id": "D",
        "text": "êxodo rural"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Conurbação ocorre quando áreas urbanizadas de municípios distintos crescem até formar continuidade física.",
    "alternativeExplanations": {
      "A": "Verticalização é o aumento da ocupação por edifícios de vários pavimentos.",
      "B": "Segregação trata da distribuição desigual de grupos e recursos no espaço urbano.",
      "C": "Correta. Conurbação ocorre quando áreas urbanizadas de municípios distintos crescem até formar continuidade física.",
      "D": "Êxodo rural é a migração do campo para a cidade."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "conurbacao",
      "rede-urbana"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma fábrica que funcionava em uma grande metrópole transfere parte da produção para\n    uma cidade do interior, atraída por terreno mais barato, acesso rodoviário e incentivos locais.\n\n    O caso exemplifica:",
    "alternatives": [
      {
        "id": "A",
        "text": "desindustrialização completa"
      },
      {
        "id": "B",
        "text": "conurbação"
      },
      {
        "id": "C",
        "text": "primarização automática da economia"
      },
      {
        "id": "D",
        "text": "desconcentração industrial"
      }
    ],
    "correctAnswer": "D",
    "explanation": "A transferência de unidades produtivas de áreas industriais tradicionais para novos territórios caracteriza uma redistribuição espacial da atividade industrial.",
    "alternativeExplanations": {
      "A": "A produção não desapareceu; ela foi deslocada para outra localização.",
      "B": "Conurbação diz respeito à continuidade física entre manchas urbanas.",
      "C": "O deslocamento de uma fábrica não significa, por si só, substituição geral da indústria por atividades primárias.",
      "D": "Correta. A transferência de unidades produtivas de áreas industriais tradicionais para novos territórios caracteriza uma redistribuição espacial da atividade industrial."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "desconcentracao-industrial",
      "localizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma cadeia produtiva envolve fabricantes de fertilizantes e máquinas, propriedades rurais,\n    frigoríficos, transportadoras, bancos e empresas exportadoras.\n\n    Esse conjunto mostra que o agronegócio:",
    "alternatives": [
      {
        "id": "A",
        "text": "articula atividades anteriores, internas e posteriores à produção agropecuária"
      },
      {
        "id": "B",
        "text": "é formado somente pelo trabalho realizado dentro das fazendas"
      },
      {
        "id": "C",
        "text": "exclui o processamento industrial de alimentos"
      },
      {
        "id": "D",
        "text": "não depende de transporte nem de financiamento"
      }
    ],
    "correctAnswer": "A",
    "explanation": "O agronegócio não se limita ao cultivo ou à criação: integra insumos, produção, processamento, financiamento, logística e comercialização.",
    "alternativeExplanations": {
      "A": "Correta. O agronegócio não se limita ao cultivo ou à criação: integra insumos, produção, processamento, financiamento, logística e comercialização.",
      "B": "A cadeia descrita inclui atividades industriais, financeiras e logísticas fora das propriedades.",
      "C": "Frigoríficos e agroindústrias fazem parte das cadeias ligadas ao setor.",
      "D": "A situação menciona explicitamente transportadoras e bancos."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "agronegocio",
      "cadeias-produtivas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Petróleo, gás natural, biomassa, hidreletricidade, energia solar e carvão participam,\n    em proporções diferentes, do abastecimento energético de um país.\n\n    O conjunto dessas fontes compõe sua:",
    "alternatives": [
      {
        "id": "A",
        "text": "rede urbana"
      },
      {
        "id": "B",
        "text": "matriz energética"
      },
      {
        "id": "C",
        "text": "estrutura fundiária"
      },
      {
        "id": "D",
        "text": "pirâmide etária"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A matriz energética reúne as fontes usadas para atender às necessidades de energia de uma sociedade, incluindo transportes, calor, eletricidade e outros usos.",
    "alternativeExplanations": {
      "A": "Rede urbana descreve relações e fluxos entre cidades.",
      "B": "Correta. A matriz energética reúne as fontes usadas para atender às necessidades de energia de uma sociedade, incluindo transportes, calor, eletricidade e outros usos.",
      "C": "Estrutura fundiária trata da distribuição e organização das propriedades rurais.",
      "D": "Pirâmide etária representa a estrutura populacional por idade e sexo."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "matriz-energetica",
      "fontes-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em determinada ordem internacional, diferentes países e blocos possuem capacidade\n    relevante de influenciar comércio, tecnologia, finanças e decisões diplomáticas,\n    sem que um único centro concentre todo o poder.\n\n    A situação aproxima-se da ideia de:",
    "alternatives": [
      {
        "id": "A",
        "text": "isolacionismo"
      },
      {
        "id": "B",
        "text": "autarquia"
      },
      {
        "id": "C",
        "text": "multipolaridade"
      },
      {
        "id": "D",
        "text": "bipolaridade"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Multipolaridade descreve uma ordem em que vários centros de poder exercem influência relevante, ainda que não tenham exatamente o mesmo peso.",
    "alternativeExplanations": {
      "A": "Isolacionismo é uma orientação de menor envolvimento externo, não a existência de vários polos.",
      "B": "Autarquia econômica busca reduzir dependências externas e não descreve a distribuição global de poder.",
      "C": "Correta. Multipolaridade descreve uma ordem em que vários centros de poder exercem influência relevante, ainda que não tenham exatamente o mesmo peso.",
      "D": "Bipolaridade pressupõe predominância de dois grandes polos, e não de vários."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "multipolaridade",
      "poder"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-i-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Um governo substitui usinas a carvão por fontes de menor emissão e amplia o reflorestamento\n    para retirar parte do dióxido de carbono da atmosfera.\n\n    Essas ações são exemplos principalmente de:",
    "alternatives": [
      {
        "id": "A",
        "text": "adaptação costeira"
      },
      {
        "id": "B",
        "text": "previsão do tempo"
      },
      {
        "id": "C",
        "text": "zoneamento urbano"
      },
      {
        "id": "D",
        "text": "mitigação da mudança climática"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Mitigação busca reduzir as emissões de gases de efeito estufa ou ampliar sua remoção da atmosfera, atuando sobre as causas do aquecimento global.",
    "alternativeExplanations": {
      "A": "Adaptação procura reduzir vulnerabilidades aos impactos climáticos já presentes ou esperados.",
      "B": "Previsão do tempo trata de condições atmosféricas em curto prazo.",
      "C": "Zoneamento é um instrumento de ordenamento territorial e não define, por si só, redução de emissões.",
      "D": "Correta. Mitigação busca reduzir as emissões de gases de efeito estufa ou ampliar sua remoção da atmosfera, atuando sobre as causas do aquecimento global."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "mitigacao-climatica",
      "mudanca-climatica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A ampliação de áreas arborizadas e sombreadas pode contribuir para reduzir a intensidade das ilhas de calor em partes de uma cidade.",
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
    "explanation": "Vegetação fornece sombra e evapotranspiração e tende a reduzir o aquecimento de superfícies quando comparada a áreas muito impermeabilizadas.",
    "alternativeExplanations": {
      "V": "Correto. A cobertura vegetal é uma das estratégias usadas para amenizar o aquecimento urbano.",
      "F": "Incorreto. Áreas verdes podem alterar o balanço de energia e contribuir para temperaturas locais menores."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "solucoes-urbanas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Como várias espécies do Cerrado apresentam adaptações ao fogo, qualquer incêndio nesse bioma é natural e não causa impactos ecológicos.",
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
    "explanation": "O Cerrado possui história ecológica ligada ao fogo, mas frequência, intensidade, época e origem das queimadas importam; incêndios muito frequentes ou intensos podem causar graves impactos.",
    "alternativeExplanations": {
      "V": "Incorreto. A adaptação de algumas espécies não torna todos os incêndios inofensivos.",
      "F": "Correto. É necessário diferenciar regimes naturais ou manejados de queimadas destrutivas e recorrentes."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "fogo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Os limites de uma bacia hidrográfica são definidos pelo relevo e pelos divisores de águas, podendo atravessar fronteiras políticas.",
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
    "explanation": "A drenagem segue a topografia; por isso, seus limites naturais não precisam coincidir com municípios, estados ou países.",
    "alternativeExplanations": {
      "V": "Correto. Bacias são unidades físico-geográficas.",
      "F": "Incorreto. Fronteiras administrativas e divisores de águas obedecem a critérios diferentes."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacia-hidrografica",
      "divisores-de-agua"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Na transição demográfica, a queda da fecundidade e a maior sobrevivência podem, ao longo do tempo, aumentar a participação relativa de idosos na população.",
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
    "explanation": "Menos nascimentos estreitam as novas coortes e maior longevidade aumenta a permanência nas idades avançadas, favorecendo o envelhecimento populacional.",
    "alternativeExplanations": {
      "V": "Correto. O envelhecimento é uma consequência comum das etapas mais avançadas da transição.",
      "F": "Incorreto. A mudança da estrutura etária está relacionada às transformações nas taxas de natalidade e mortalidade."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "envelhecimento"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Quando duas cidades formam uma conurbação, elas deixam obrigatoriamente de ser municípios distintos e passam a ter uma única prefeitura.",
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
    "explanation": "Conurbação descreve continuidade física da mancha urbana e pode ocorrer entre municípios que mantêm administrações próprias.",
    "alternativeExplanations": {
      "V": "Incorreto. Continuidade urbana não elimina automaticamente limites político-administrativos.",
      "F": "Correto. É possível haver uma única mancha urbana sobre vários municípios."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "conurbacao",
      "limites-administrativos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A instalação de fábricas em cidades do interior que antes se concentravam em grandes metrópoles pode fazer parte de um processo de desconcentração industrial.",
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
    "explanation": "O deslocamento relativo da produção para novos territórios é uma das formas de desconcentração espacial da indústria.",
    "alternativeExplanations": {
      "V": "Correto. A atividade permanece industrial, mas sua distribuição territorial muda.",
      "F": "Incorreto. O conceito trata justamente da redistribuição geográfica das plantas produtivas."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "desconcentracao",
      "territorio"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Agronegócio é sinônimo apenas de cultivo e criação dentro das propriedades rurais, sem incluir processamento, crédito ou logística.",
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
    "explanation": "O conceito de agronegócio envolve uma cadeia ampla de atividades antes, durante e depois da produção agropecuária.",
    "alternativeExplanations": {
      "V": "Incorreto. Insumos, agroindústria, financiamento, transporte e comércio também podem integrar a cadeia.",
      "F": "Correto. A afirmação reduz indevidamente o alcance do conceito."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "agronegocio",
      "cadeia-produtiva"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Matriz elétrica e matriz energética são expressões sempre equivalentes, pois ambas consideram exatamente as mesmas fontes e os mesmos usos de energia.",
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
    "explanation": "A matriz elétrica considera especificamente as fontes usadas para gerar eletricidade; a matriz energética abrange um conjunto mais amplo de usos, como transportes e calor.",
    "alternativeExplanations": {
      "V": "Incorreto. A matriz elétrica é apenas uma parte do sistema energético total.",
      "F": "Correto. Um país pode ter eletricidade muito renovável e ainda usar muitos combustíveis fósseis no transporte."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "matriz-energetica",
      "matriz-eletrica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma ordem multipolar exige que todos os polos de poder possuam exatamente a mesma capacidade econômica, militar e tecnológica.",
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
    "explanation": "Multipolaridade indica a existência de vários centros relevantes, mas as capacidades entre eles podem ser bastante assimétricas.",
    "alternativeExplanations": {
      "V": "Incorreto. Multipolaridade não significa igualdade de poder.",
      "F": "Correto. Polos podem ter pesos diferentes conforme o tema e o momento."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "multipolaridade",
      "assimetrias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Construir barreiras contra a elevação do nível do mar é, por si só, uma ação de mitigação porque reduz diretamente as emissões de gases de efeito estufa.",
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
    "explanation": "Barreiras costeiras buscam reduzir danos associados a impactos climáticos e são medidas de adaptação; não reduzem diretamente emissões.",
    "alternativeExplanations": {
      "V": "Incorreto. A finalidade principal é enfrentar um impacto, não atuar sobre sua causa atmosférica.",
      "F": "Correto. Mitigação e adaptação são estratégias diferentes, embora possam ser combinadas."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "mitigacao-e-adaptacao",
      "mudanca-climatica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Entre mapas de uma mesma área, um mapa na escala 1:100.000 tende a permitir mais detalhe do que outro na escala 1:1.000.000.",
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
    "explanation": "1:100.000 é uma escala maior que 1:1.000.000: cada unidade no mapa representa uma distância real menor, permitindo representar mais detalhes.",
    "alternativeExplanations": {
      "V": "Correto. Escalas maiores costumam cobrir áreas menores com maior detalhamento.",
      "F": "Incorreto. O denominador menor corresponde, nesse caso, à escala cartográfica maior."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "nivel-de-detalhe"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-i-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Intemperismo altera ou fragmenta rochas no próprio local, enquanto erosão envolve remoção e transporte de material por agentes como água, vento ou gelo.",
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
    "explanation": "Os dois processos podem atuar em sequência, mas são distintos: o intemperismo modifica a rocha in situ; a erosão remove e transporta o material.",
    "alternativeExplanations": {
      "V": "Correto. A diferença entre alteração local e transporte é central para distinguir os processos.",
      "F": "Incorreto. Intemperismo e erosão não são sinônimos e podem ocorrer em etapas diferentes."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "erosao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em uma bacia hidrográfica, a retirada de vegetação em extensas áreas a montante aumentou\n    a erosão do solo. Alguns anos depois, trechos do rio a jusante apresentaram maior acúmulo\n    de sedimentos e redução de profundidade.\n\n    Qual relação explica melhor o caso?",
    "alternatives": [
      {
        "id": "A",
        "text": "processos ocorridos a montante podem alterar a dinâmica fluvial a jusante dentro da mesma bacia"
      },
      {
        "id": "B",
        "text": "os divisores de águas impedem qualquer transporte interno de sedimentos"
      },
      {
        "id": "C",
        "text": "o assoreamento depende apenas da maré oceânica"
      },
      {
        "id": "D",
        "text": "ações em áreas altas não influenciam rios localizados abaixo"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A bacia funciona como uma unidade conectada: água e sedimentos transportados a partir de áreas a montante podem afetar canais, reservatórios e usos da água a jusante.",
    "alternativeExplanations": {
      "A": "Correta. A bacia funciona como uma unidade conectada: água e sedimentos transportados a partir de áreas a montante podem afetar canais, reservatórios e usos da água a jusante.",
      "B": "Divisores separam bacias, mas não bloqueiam o fluxo ao longo dos canais dentro da mesma bacia.",
      "C": "O caso descrito relaciona erosão continental e transporte fluvial de sedimentos.",
      "D": "Fluxos de água e sedimentos conectam as diferentes partes da bacia."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacias",
      "causa-e-consequencia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "A pirâmide etária de um país passou, em algumas décadas, de uma base muito larga para\n    uma base relativamente estreita, enquanto aumentou a participação das faixas de idade mais elevadas.\n\n    A mudança é mais compatível com:",
    "alternatives": [
      {
        "id": "A",
        "text": "explosão permanente da natalidade"
      },
      {
        "id": "B",
        "text": "queda da fecundidade combinada ao aumento da sobrevivência e ao envelhecimento populacional"
      },
      {
        "id": "C",
        "text": "eliminação da expectativa de vida"
      },
      {
        "id": "D",
        "text": "fim de qualquer migração internacional"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A redução do número médio de nascimentos estreita a base, enquanto maior expectativa de vida e sobrevivência aumentam a participação relativa das idades mais altas.",
    "alternativeExplanations": {
      "A": "Uma natalidade persistentemente alta manteria a base proporcionalmente larga.",
      "B": "Correta. A redução do número médio de nascimentos estreita a base, enquanto maior expectativa de vida e sobrevivência aumentam a participação relativa das idades mais altas.",
      "C": "A maior participação de idosos é incompatível com queda generalizada da sobrevivência.",
      "D": "A forma da pirâmide não permite concluir, por si só, que a migração tenha desaparecido."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "piramide-etaria"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Moradores de pequenas cidades de uma região recorrem a um centro regional para hospitais\n    de alta complexidade, universidades e serviços especializados, embora façam compras\n    cotidianas em suas próprias cidades.\n\n    O exemplo evidencia:",
    "alternatives": [
      {
        "id": "A",
        "text": "autossuficiência completa de cada cidade"
      },
      {
        "id": "B",
        "text": "ausência de relações entre cidades de tamanhos diferentes"
      },
      {
        "id": "C",
        "text": "hierarquia e fluxos diferenciados na rede urbana"
      },
      {
        "id": "D",
        "text": "conurbação obrigatória entre todas as cidades da região"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Cidades desempenham funções distintas e mantêm fluxos entre si. Serviços mais raros e especializados tendem a concentrar-se em centros de maior alcance regional.",
    "alternativeExplanations": {
      "A": "O deslocamento para serviços especializados mostra dependência funcional entre os centros.",
      "B": "O caso descreve exatamente relações entre cidades com funções distintas.",
      "C": "Correta. Cidades desempenham funções distintas e mantêm fluxos entre si. Serviços mais raros e especializados tendem a concentrar-se em centros de maior alcance regional.",
      "D": "Rede urbana não exige continuidade física das manchas urbanizadas."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "rede-urbana",
      "hierarquia-urbana"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma montadora escolhe instalar nova unidade próxima a fornecedores de autopeças,\n    a um entroncamento rodoviário e a um grande mercado consumidor, mesmo pagando por\n    terrenos mais caros do que em áreas mais distantes.\n\n    A escolha mostra que a localização industrial:",
    "alternatives": [
      {
        "id": "A",
        "text": "depende exclusivamente do menor preço da terra"
      },
      {
        "id": "B",
        "text": "é determinada apenas pela presença de recursos minerais"
      },
      {
        "id": "C",
        "text": "ignora completamente a infraestrutura de transportes"
      },
      {
        "id": "D",
        "text": "resulta da combinação de fatores logísticos, de mercado e de integração produtiva"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Empresas ponderam custos e vantagens diversas. Proximidade de fornecedores, infraestrutura e consumidores pode compensar o maior custo do terreno.",
    "alternativeExplanations": {
      "A": "O caso mostra que a empresa aceitou terra mais cara em troca de outras vantagens.",
      "B": "A atividade descrita não depende diretamente de jazidas locais.",
      "C": "O entroncamento rodoviário aparece como fator importante da decisão.",
      "D": "Correta. Empresas ponderam custos e vantagens diversas. Proximidade de fornecedores, infraestrutura e consumidores pode compensar o maior custo do terreno."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "localizacao-industrial",
      "fatores-locacionais"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma região amplia rapidamente uma monocultura voltada à exportação. A produção cresce,\n    mas aumenta também a dependência do preço internacional de um único produto.\n\n    Qual vulnerabilidade econômica está mais diretamente associada a esse quadro?",
    "alternatives": [
      {
        "id": "A",
        "text": "maior exposição às oscilações do mercado externo dessa commodity"
      },
      {
        "id": "B",
        "text": "desaparecimento automático de toda atividade industrial"
      },
      {
        "id": "C",
        "text": "fim da necessidade de infraestrutura logística"
      },
      {
        "id": "D",
        "text": "eliminação dos riscos ambientais ligados ao uso da terra"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Quando a pauta produtiva fica concentrada em um produto exportável, quedas de preço ou demanda internacional podem afetar fortemente a renda regional.",
    "alternativeExplanations": {
      "A": "Correta. Quando a pauta produtiva fica concentrada em um produto exportável, quedas de preço ou demanda internacional podem afetar fortemente a renda regional.",
      "B": "A expansão agrícola não implica necessariamente eliminação da indústria.",
      "C": "Produção exportadora depende intensamente de transporte e armazenagem.",
      "D": "Monoculturas extensivas podem manter ou ampliar pressões ambientais."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "producao",
      "commodities"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Um país produz 75% de sua eletricidade com fontes renováveis, mas seus transportes\n    dependem majoritariamente de derivados de petróleo.\n\n    Qual conclusão é correta?",
    "alternatives": [
      {
        "id": "A",
        "text": "a matriz elétrica inclui apenas combustíveis usados por automóveis"
      },
      {
        "id": "B",
        "text": "uma matriz elétrica renovável não significa necessariamente uma matriz energética igualmente renovável"
      },
      {
        "id": "C",
        "text": "o petróleo deixa de fazer parte da matriz energética porque não gera a maior parte da eletricidade"
      },
      {
        "id": "D",
        "text": "as expressões matriz elétrica e matriz energética são equivalentes"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A eletricidade é apenas uma parcela do consumo total de energia. Combustíveis usados no transporte e em outros setores também entram na matriz energética.",
    "alternativeExplanations": {
      "A": "Matriz elétrica refere-se às fontes de geração de eletricidade.",
      "B": "Correta. A eletricidade é apenas uma parcela do consumo total de energia. Combustíveis usados no transporte e em outros setores também entram na matriz energética.",
      "C": "Combustíveis de transporte continuam compondo a matriz energética.",
      "D": "Elas têm abrangências diferentes."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "matriz-energetica",
      "matriz-eletrica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em negociações internacionais, diferentes atores exercem maior influência em temas distintos:\n    alguns concentram capacidade militar, outros dominam tecnologias estratégicas, mercados\n    consumidores ou redes financeiras.\n\n    Esse quadro é compatível com uma ordem multipolar porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "todo país passa a possuir o mesmo peso diplomático"
      },
      {
        "id": "B",
        "text": "nenhum ator consegue influenciar decisões externas"
      },
      {
        "id": "C",
        "text": "o poder internacional pode distribuir-se entre vários centros e dimensões, sem exigir igualdade entre eles"
      },
      {
        "id": "D",
        "text": "as relações internacionais deixam de envolver competição"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Multipolaridade não significa que todos os atores tenham as mesmas capacidades; diferentes polos podem exercer influência assimétrica e especializada.",
    "alternativeExplanations": {
      "A": "As assimetrias permanecem mesmo em sistemas com vários polos.",
      "B": "A existência de polos pressupõe justamente capacidade de influência.",
      "C": "Correta. Multipolaridade não significa que todos os atores tenham as mesmas capacidades; diferentes polos podem exercer influência assimétrica e especializada.",
      "D": "Vários centros de poder podem cooperar e competir simultaneamente."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "multipolaridade",
      "dimensoes-do-poder"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma cidade adota duas políticas: eletrifica parte da frota de ônibus e amplia reservatórios\n    de retenção para reduzir alagamentos durante chuvas intensas.\n\n    As duas medidas correspondem, respectivamente, a:",
    "alternatives": [
      {
        "id": "A",
        "text": "adaptação e mitigação"
      },
      {
        "id": "B",
        "text": "duas medidas apenas de mitigação"
      },
      {
        "id": "C",
        "text": "duas medidas apenas de adaptação"
      },
      {
        "id": "D",
        "text": "mitigação e adaptação"
      }
    ],
    "correctAnswer": "D",
    "explanation": "A eletrificação pode reduzir emissões do transporte, atuando sobre causas da mudança climática; os reservatórios reduzem vulnerabilidade a impactos de chuvas intensas.",
    "alternativeExplanations": {
      "A": "A ordem está invertida em relação às funções descritas.",
      "B": "A retenção de águas pluviais é principalmente uma resposta a impactos.",
      "C": "A redução de emissões da frota atua sobre a causa climática.",
      "D": "Correta. A eletrificação pode reduzir emissões do transporte, atuando sobre causas da mudança climática; os reservatórios reduzem vulnerabilidade a impactos de chuvas intensas."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "mitigacao-e-adaptacao",
      "politicas-climaticas"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em um mapa na escala 1:250.000, uma rodovia mede 6 cm entre dois pontos.\n    Qual é a distância real aproximada?",
    "alternatives": [
      {
        "id": "A",
        "text": "15 km"
      },
      {
        "id": "B",
        "text": "1,5 km"
      },
      {
        "id": "C",
        "text": "25 km"
      },
      {
        "id": "D",
        "text": "150 km"
      }
    ],
    "correctAnswer": "A",
    "explanation": "1 cm representa 250.000 cm, ou 2,5 km. Assim, 6 cm correspondem a 15 km.",
    "alternativeExplanations": {
      "A": "Correta. 1 cm representa 250.000 cm, ou 2,5 km. Assim, 6 cm correspondem a 15 km.",
      "B": "Esse resultado desloca uma casa decimal na conversão.",
      "C": "Esse valor não corresponde a seis vezes 2,5 km.",
      "D": "Esse resultado superestima a distância por um fator dez."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "calculo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Em clima quente e úmido, água infiltra em fraturas de uma rocha e participa de reações\n    que alteram seus minerais. Parte do material alterado é posteriormente transportada pela chuva.\n\n    A sequência envolve, principalmente:",
    "alternatives": [
      {
        "id": "A",
        "text": "erosão seguida de tectonismo"
      },
      {
        "id": "B",
        "text": "intemperismo químico seguido de erosão"
      },
      {
        "id": "C",
        "text": "sedimentação seguida de vulcanismo"
      },
      {
        "id": "D",
        "text": "apenas intemperismo, sem qualquer erosão"
      }
    ],
    "correctAnswer": "B",
    "explanation": "A alteração mineral pela água é intemperismo químico; a remoção e o transporte posteriores correspondem à erosão.",
    "alternativeExplanations": {
      "A": "O caso não envolve forças internas da crosta.",
      "B": "Correta. A alteração mineral pela água é intemperismo químico; a remoção e o transporte posteriores correspondem à erosão.",
      "C": "Não há deposição inicial nem atividade magmática descrita.",
      "D": "O transporte pela chuva é explicitamente mencionado."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "erosao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Durante uma sequência de noites sem chuva e com pouco vento, sensores mostram que bairros\n    densamente construídos resfriam mais lentamente que áreas arborizadas próximas.\n\n    Qual fator contribui para esse padrão?",
    "alternatives": [
      {
        "id": "A",
        "text": "maior altitude obrigatória dos centros urbanos"
      },
      {
        "id": "B",
        "text": "ausência de qualquer radiação solar durante o dia"
      },
      {
        "id": "C",
        "text": "armazenamento e liberação de calor por materiais urbanos, combinados à menor evapotranspiração"
      },
      {
        "id": "D",
        "text": "formação automática de neve em áreas impermeáveis"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Concreto e asfalto podem armazenar energia durante o dia e liberá-la à noite; menor vegetação reduz o resfriamento associado à evapotranspiração.",
    "alternativeExplanations": {
      "A": "Centros urbanos não são necessariamente mais elevados que áreas vegetadas.",
      "B": "O armazenamento térmico depende justamente da energia recebida ao longo do dia.",
      "C": "Correta. Concreto e asfalto podem armazenar energia durante o dia e liberá-la à noite; menor vegetação reduz o resfriamento associado à evapotranspiração.",
      "D": "Esse processo não explica o aquecimento urbano observado."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "balanco-de-energia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-m-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "A conversão de áreas nativas do Cerrado em extensas áreas agrícolas pode afetar não apenas\n    a biodiversidade, mas também rios que nascem ou recebem contribuição hídrica de áreas do bioma.\n\n    A afirmação é geograficamente relevante porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "biomas não mantêm relação com bacias hidrográficas"
      },
      {
        "id": "B",
        "text": "a agricultura não modifica processos de escoamento ou erosão"
      },
      {
        "id": "C",
        "text": "todo uso agrícola produz exatamente o mesmo impacto"
      },
      {
        "id": "D",
        "text": "vegetação, solos, uso da terra e dinâmica hídrica estão conectados no território"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Mudanças de cobertura vegetal podem alterar infiltração, escoamento, erosão e habitats, produzindo efeitos integrados sobre biodiversidade e recursos hídricos.",
    "alternativeExplanations": {
      "A": "Os sistemas ambientais se sobrepõem e interagem espacialmente.",
      "B": "O manejo do solo e a cobertura da terra influenciam esses processos.",
      "C": "Os efeitos variam conforme cultivo, manejo, escala e condições locais.",
      "D": "Correta. Mudanças de cobertura vegetal podem alterar infiltração, escoamento, erosão e habitats, produzindo efeitos integrados sobre biodiversidade e recursos hídricos."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "interacoes-ambientais"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Uma cidade pode ocupar posição elevada na rede urbana por concentrar serviços especializados e fluxos regionais, mesmo que população absoluta não seja o único critério de hierarquia.",
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
    "explanation": "Hierarquia urbana envolve funções, alcance dos serviços, conexões e capacidade de polarização, não apenas número de habitantes.",
    "alternativeExplanations": {
      "V": "Correto. Centralidade funcional e fluxos ajudam a definir o papel de uma cidade na rede.",
      "F": "Incorreto. População é relevante, mas não é o único indicador possível de centralidade."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "rede-urbana",
      "centralidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A desconcentração industrial dentro de um país significa necessariamente que a participação nacional da indústria na economia está diminuindo.",
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
    "explanation": "Desconcentração é uma mudança espacial da produção; ela pode ocorrer mesmo com indústria nacional estável ou crescente.",
    "alternativeExplanations": {
      "V": "Incorreto. Redistribuição territorial e perda de peso econômico da indústria são processos distintos.",
      "F": "Correto. Uma fábrica pode sair de uma metrópole e se instalar em outra região sem desaparecer do país."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "desconcentracao",
      "diferenciacao-de-processos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Aumento de produtividade agrícola pode ocorrer ao mesmo tempo que concentração fundiária; um fenômeno não elimina automaticamente o outro.",
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
    "explanation": "Produtividade mede relação entre produção e recursos/área, enquanto concentração fundiária trata da distribuição da propriedade da terra.",
    "alternativeExplanations": {
      "V": "Correto. Os indicadores se referem a dimensões diferentes da estrutura agrária.",
      "F": "Incorreto. Ganhos técnicos não determinam, por si sós, distribuição mais igualitária da terra."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "producao",
      "estrutura-fundiaria"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Toda fonte renovável de energia é ambientalmente isenta de impactos, independentemente de localização, escala e tecnologia utilizada.",
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
    "explanation": "Fontes renováveis podem reduzir certos impactos, mas hidrelétricas, eólicas, solares e biomassa também apresentam efeitos territoriais e ambientais que precisam ser avaliados.",
    "alternativeExplanations": {
      "V": "Incorreto. Renovável não significa impacto zero.",
      "F": "Correto. A análise deve considerar ciclo de vida, implantação e características locais."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "fontes-renovaveis",
      "avaliacao-de-impactos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A existência de interdependência econômica entre grandes potências impede conflitos comerciais e disputas por tecnologia.",
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
    "explanation": "Interdependência pode elevar custos de conflito, mas não elimina competição, sanções, disputas comerciais ou estratégias de autonomia.",
    "alternativeExplanations": {
      "V": "Incorreto. Cooperação econômica e competição geopolítica podem coexistir.",
      "F": "Correto. Relações internacionais não são determinadas por uma única dimensão."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "interdependencia",
      "conflito-e-cooperacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Uma medida de adaptação climática pode reduzir vulnerabilidade a enchentes sem reduzir diretamente a concentração de gases de efeito estufa.",
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
    "explanation": "Adaptação atua sobre exposição e vulnerabilidade aos impactos, enquanto mitigação atua sobre emissões e remoções.",
    "alternativeExplanations": {
      "V": "Correto. Um sistema de drenagem, por exemplo, pode proteger uma área sem cortar emissões de modo direto.",
      "F": "Incorreto. Mitigação e adaptação possuem objetivos diferentes, embora complementares."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "adaptacao",
      "mudanca-climatica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Mantido o mesmo tamanho físico da folha, uma escala cartográfica maior tende a representar uma área menor com mais detalhe.",
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
    "explanation": "Escalas maiores, como 1:25.000, reduzem a proporção entre mapa e realidade e permitem detalhar melhor uma área limitada.",
    "alternativeExplanations": {
      "V": "Correto. A relação entre escala, extensão espacial e detalhe é inversa.",
      "F": "Incorreto. Mapas de escala pequena, como 1:10.000.000, generalizam mais o conteúdo."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "generalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Intemperismo pode alterar uma rocha no próprio local antes que qualquer agente erosivo remova o material resultante.",
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
    "explanation": "Alteração e fragmentação in situ são próprias do intemperismo; o transporte pode ocorrer depois por erosão.",
    "alternativeExplanations": {
      "V": "Correto. Os processos podem estar associados, mas são distinguíveis.",
      "F": "Incorreto. Transporte não é condição necessária para que exista intemperismo."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "sequencia-de-processos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "A intensidade da ilha de calor urbana é obrigatoriamente igual em todos os bairros e horários de uma mesma cidade.",
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
    "explanation": "Cobertura vegetal, densidade construída, materiais, relevo, vento e horário fazem a intensidade variar no espaço e no tempo.",
    "alternativeExplanations": {
      "V": "Incorreto. O fenômeno é espacialmente heterogêneo.",
      "F": "Correto. Medições em diferentes pontos podem apresentar contrastes significativos."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "variabilidade-espacial"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Como o fogo faz parte da ecologia do Cerrado, impedir ou provocar queimadas em qualquer frequência produz sempre o mesmo efeito sobre o bioma.",
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
    "explanation": "Regime de fogo envolve frequência, intensidade, extensão e estação. Alterações nesses parâmetros podem modificar profundamente comunidades e processos ecológicos.",
    "alternativeExplanations": {
      "V": "Incorreto. O efeito depende do regime e das condições do ecossistema.",
      "F": "Correto. Generalizar qualquer ocorrência de fogo como equivalente é inadequado."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "regime-de-fogo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Desmatamento e erosão em áreas a montante podem aumentar a carga de sedimentos transportada para trechos a jusante da mesma bacia.",
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
    "explanation": "O escoamento conecta diferentes setores da bacia e pode transferir sedimentos gerados nas vertentes para rios e reservatórios.",
    "alternativeExplanations": {
      "V": "Correto. O efeito espacial pode se propagar pelo sistema de drenagem.",
      "F": "Incorreto. As partes de uma bacia não funcionam de maneira isolada."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacias",
      "conectividade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-m-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Todos os países percorrem a transição demográfica nas mesmas datas, com a mesma velocidade e sem influência de migrações, políticas públicas ou condições econômicas.",
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
    "explanation": "O modelo descreve tendências gerais, mas trajetórias reais variam historicamente e são influenciadas por múltiplos fatores sociais, econômicos e políticos.",
    "alternativeExplanations": {
      "V": "Incorreto. O modelo não é um cronograma universal rígido.",
      "F": "Correto. Países podem apresentar ritmos e combinações distintas de mudanças demográficas."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "limites-do-modelo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma região agrícola apresentou os seguintes dados:\n\n    - 2005: 100 mil ha cultivados; 200 mil t produzidas.\n    - 2025: 180 mil ha cultivados; 450 mil t produzidas.\n\n    Qual interpretação é mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "houve simultaneamente expansão da área cultivada e aumento da produtividade média por hectare"
      },
      {
        "id": "B",
        "text": "todo o aumento da produção decorreu apenas da expansão da área"
      },
      {
        "id": "C",
        "text": "a produtividade caiu porque a área cultivada aumentou"
      },
      {
        "id": "D",
        "text": "os dados provam que não houve qualquer impacto territorial"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A produtividade passou de 2 t/ha para 2,5 t/ha, enquanto a área aumentou de 100 para 180 mil hectares. O crescimento da produção combina expansão territorial e ganho de rendimento.",
    "alternativeExplanations": {
      "A": "Correta. A produtividade passou de 2 t/ha para 2,5 t/ha, enquanto a área aumentou de 100 para 180 mil hectares. O crescimento da produção combina expansão territorial e ganho de rendimento.",
      "B": "A produtividade também aumentou de 2 para 2,5 t/ha.",
      "C": "A relação produção/área aumentou, não diminuiu.",
      "D": "Produção e área não permitem concluir ausência de impactos socioambientais."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "producao",
      "analise-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um país depende fortemente de hidrelétricas. Em anos de seca prolongada, precisa acionar\n    termelétricas mais caras e emissoras. O governo planeja ampliar solar, eólica, transmissão\n    e armazenamento.\n\n    Qual é a justificativa mais consistente para o conjunto de medidas?",
    "alternatives": [
      {
        "id": "A",
        "text": "solar e eólica eliminam qualquer necessidade de redes e armazenamento"
      },
      {
        "id": "B",
        "text": "diversificar fontes e infraestrutura pode reduzir a vulnerabilidade a um único risco hidrológico, embora novas fontes também exijam integração ao sistema"
      },
      {
        "id": "C",
        "text": "a seca não tem relação possível com a geração hidrelétrica"
      },
      {
        "id": "D",
        "text": "diversificar significa abandonar imediatamente todas as fontes existentes"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Uma matriz muito dependente de hidrologia fica exposta a secas. Diversificação pode aumentar resiliência, mas fontes variáveis demandam redes, armazenamento, gestão da demanda ou complementaridade.",
    "alternativeExplanations": {
      "A": "Fontes variáveis precisam ser integradas ao sistema elétrico.",
      "B": "Correta. Uma matriz muito dependente de hidrologia fica exposta a secas. Diversificação pode aumentar resiliência, mas fontes variáveis demandam redes, armazenamento, gestão da demanda ou complementaridade.",
      "C": "Vazões e níveis de reservatórios influenciam a capacidade de geração.",
      "D": "Diversificação não implica retirada instantânea de toda a infraestrutura anterior."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "matriz",
      "seguranca-energetica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma disputa internacional envolve controle de semicondutores avançados, acesso a minerais\n    estratégicos, sanções financeiras e domínio de rotas logísticas.\n\n    O caso evidencia que, em uma ordem multipolar:",
    "alternatives": [
      {
        "id": "A",
        "text": "o poder militar deixou de ter qualquer importância"
      },
      {
        "id": "B",
        "text": "todos os países possuem as mesmas capacidades em todos os setores"
      },
      {
        "id": "C",
        "text": "o poder geopolítico pode combinar capacidades tecnológicas, financeiras, produtivas e territoriais"
      },
      {
        "id": "D",
        "text": "sanções e cadeias produtivas não têm efeitos geopolíticos"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Poder internacional não se reduz ao território ou às forças armadas; cadeias produtivas, tecnologia, finanças e infraestrutura logística também podem gerar dependência e capacidade de pressão.",
    "alternativeExplanations": {
      "A": "A ampliação das dimensões de poder não elimina a relevância militar.",
      "B": "Multipolaridade convive com fortes assimetrias.",
      "C": "Correta. Poder internacional não se reduz ao território ou às forças armadas; cadeias produtivas, tecnologia, finanças e infraestrutura logística também podem gerar dependência e capacidade de pressão.",
      "D": "O próprio cenário mostra como instrumentos econômicos e tecnológicos podem ser usados politicamente."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "poder",
      "geoeconomia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma cidade costeira combina eletrificação do transporte público, restauração de manguezais,\n    elevação de vias vulneráveis e metas de eficiência energética.\n\n    Por que o plano combina mitigação e adaptação?",
    "alternatives": [
      {
        "id": "A",
        "text": "porque toda adaptação necessariamente retira CO₂ da atmosfera"
      },
      {
        "id": "B",
        "text": "porque mitigação e adaptação são sinônimos"
      },
      {
        "id": "C",
        "text": "porque nenhuma das ações possui relação com riscos climáticos"
      },
      {
        "id": "D",
        "text": "porque algumas medidas reduzem emissões, enquanto outras diminuem exposição e vulnerabilidade aos impactos climáticos"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Eficiência e eletrificação podem reduzir emissões; elevação de vias e restauração de ecossistemas costeiros podem diminuir danos associados a eventos e mudanças do nível do mar.",
    "alternativeExplanations": {
      "A": "Adaptação não precisa reduzir diretamente gases de efeito estufa.",
      "B": "São estratégias distintas e complementares.",
      "C": "O plano atua tanto sobre causas quanto sobre impactos.",
      "D": "Correta. Eficiência e eletrificação podem reduzir emissões; elevação de vias e restauração de ecossistemas costeiros podem diminuir danos associados a eventos e mudanças do nível do mar."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "mitigacao-e-adaptacao",
      "planejamento-climatico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "O mesmo terreno é representado primeiro em um mapa 1:250.000 e depois em outro 1:50.000.\n    Supondo que a forma seja preservada, uma área desenhada no segundo mapa ocupará,\n    aproximadamente, quantas vezes a área gráfica que ocupava no primeiro?",
    "alternatives": [
      {
        "id": "A",
        "text": "25 vezes"
      },
      {
        "id": "B",
        "text": "5 vezes"
      },
      {
        "id": "C",
        "text": "10 vezes"
      },
      {
        "id": "D",
        "text": "50 vezes"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A escala linear aumentou por um fator 5 (250.000/50.000). Como áreas variam com o quadrado da escala linear, a representação ocupa 5² = 25 vezes mais área gráfica.",
    "alternativeExplanations": {
      "A": "Correta. A escala linear aumentou por um fator 5 (250.000/50.000). Como áreas variam com o quadrado da escala linear, a representação ocupa 5² = 25 vezes mais área gráfica.",
      "B": "Cinco é o fator linear, não o fator de área.",
      "C": "Esse valor não corresponde ao quadrado da razão entre as escalas.",
      "D": "Esse resultado dobra indevidamente o fator de área."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "razao-de-area"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em uma encosta tropical úmida, a rocha apresenta espesso manto alterado. Após retirada\n    da cobertura vegetal, chuvas intensas aumentam o escoamento superficial e removem rapidamente\n    parte desse material.\n\n    Qual leitura integra melhor os processos?",
    "alternatives": [
      {
        "id": "A",
        "text": "a erosão criou primeiro a rocha e só depois ocorreu intemperismo"
      },
      {
        "id": "B",
        "text": "o intemperismo produziu material alterado e a mudança de uso do solo favoreceu sua erosão e transporte"
      },
      {
        "id": "C",
        "text": "apenas forças internas explicam a remoção do material superficial"
      },
      {
        "id": "D",
        "text": "a vegetação não interfere em infiltração nem proteção do solo"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Clima quente e úmido pode favorecer intemperismo intenso. A retirada de cobertura vegetal aumenta exposição e escoamento, facilitando a mobilização do material pela erosão.",
    "alternativeExplanations": {
      "A": "A sequência física descrita é inversa.",
      "B": "Correta. Clima quente e úmido pode favorecer intemperismo intenso. A retirada de cobertura vegetal aumenta exposição e escoamento, facilitando a mobilização do material pela erosão.",
      "C": "A chuva e o escoamento são agentes externos explícitos.",
      "D": "Cobertura vegetal altera interceptação, infiltração e resistência à erosão."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "processos-de-vertente"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Para investigar o efeito da cobertura urbana sobre a temperatura, pesquisadores instalam\n    sensores em dois bairros. Um fica a 900 m de altitude e o outro a 50 m, além de possuírem\n    densidades construídas diferentes.\n\n    Qual melhoria metodológica torna a comparação mais convincente?",
    "alternatives": [
      {
        "id": "A",
        "text": "medir apenas o bairro mais quente"
      },
      {
        "id": "B",
        "text": "escolher bairros cada vez mais distantes e climaticamente distintos"
      },
      {
        "id": "C",
        "text": "comparar locais com altitude e condições meteorológicas semelhantes, variando principalmente a cobertura e a forma urbana"
      },
      {
        "id": "D",
        "text": "substituir todas as medições por opiniões de moradores"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Altitude também influencia temperatura. Controlar fatores como altitude, horário, vento e condições atmosféricas reduz variáveis de confusão e ajuda a isolar o efeito da urbanização.",
    "alternativeExplanations": {
      "A": "Sem referência comparável, fica difícil atribuir a diferença à urbanização.",
      "B": "Isso aumenta as variáveis de confusão.",
      "C": "Correta. Altitude também influencia temperatura. Controlar fatores como altitude, horário, vento e condições atmosféricas reduz variáveis de confusão e ajuda a isolar o efeito da urbanização.",
      "D": "Percepção pode complementar, mas não substitui medidas térmicas para testar a hipótese."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "analise-de-evidencias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Em área de Cerrado, pesquisadores comparam duas situações: fogo de baixa intensidade em\n    intervalo compatível com o manejo ecológico planejado e incêndios extensos que se repetem\n    anualmente no fim da estação seca.\n\n    Qual conclusão é mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "qualquer fogo produz necessariamente o mesmo efeito ecológico"
      },
      {
        "id": "B",
        "text": "a adaptação de algumas espécies torna incêndios anuais sempre benéficos"
      },
      {
        "id": "C",
        "text": "a ausência de vegetação seria necessária para existir Cerrado"
      },
      {
        "id": "D",
        "text": "os efeitos dependem do regime de fogo; frequência e intensidade excessivas podem superar a capacidade de recuperação de espécies e habitats"
      }
    ],
    "correctAnswer": "D",
    "explanation": "O Cerrado possui adaptações ao fogo, mas isso não torna todos os regimes equivalentes. Incêndios muito frequentes, intensos ou em épocas inadequadas podem alterar composição, mortalidade e regeneração.",
    "alternativeExplanations": {
      "A": "O regime de fogo modifica a resposta do ecossistema.",
      "B": "Adaptação não implica benefício sob qualquer frequência e intensidade.",
      "C": "O Cerrado inclui formações vegetais diversas e elevada biodiversidade.",
      "D": "Correta. O Cerrado possui adaptações ao fogo, mas isso não torna todos os regimes equivalentes. Incêndios muito frequentes, intensos ou em épocas inadequadas podem alterar composição, mortalidade e regeneração."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "regime-de-fogo"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um reservatório construído no alto curso de um rio retém parte dos sedimentos e altera\n    a sazonalidade das vazões. Comunidades e ecossistemas a centenas de quilômetros a jusante\n    registram mudanças.\n\n    O caso reforça a gestão por bacia porque:",
    "alternatives": [
      {
        "id": "A",
        "text": "intervenções em um trecho podem produzir efeitos hidrológicos e sedimentares em outros territórios conectados pelo rio"
      },
      {
        "id": "B",
        "text": "cada município controla uma água fisicamente independente"
      },
      {
        "id": "C",
        "text": "os sedimentos nunca atravessam fronteiras políticas"
      },
      {
        "id": "D",
        "text": "barragens afetam apenas o ponto exato onde foram construídas"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A água, os sedimentos e os usos estabelecem conexões montante-jusante que ultrapassam limites administrativos, exigindo coordenação na escala da bacia.",
    "alternativeExplanations": {
      "A": "Correta. A água, os sedimentos e os usos estabelecem conexões montante-jusante que ultrapassam limites administrativos, exigindo coordenação na escala da bacia.",
      "B": "O mesmo sistema fluvial conecta vários territórios.",
      "C": "Fronteiras administrativas não interrompem o transporte fluvial.",
      "D": "Mudanças de vazão e sedimentos podem se propagar a jusante."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacias",
      "gestao-integrada"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um país apresenta fecundidade abaixo do nível de reposição há vários anos, aumento da\n    expectativa de vida e forte crescimento da proporção de pessoas acima de 65 anos.\n\n    Qual desafio é coerente com essa estrutura, sem tratá-lo como consequência automática e única?",
    "alternatives": [
      {
        "id": "A",
        "text": "esperar necessariamente uma explosão de matrículas na educação infantil"
      },
      {
        "id": "B",
        "text": "adaptar políticas de saúde, previdência, cuidado e mercado de trabalho a uma população mais envelhecida"
      },
      {
        "id": "C",
        "text": "concluir que a economia entrará inevitavelmente em colapso"
      },
      {
        "id": "D",
        "text": "assumir que migração não pode influenciar a estrutura etária"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Envelhecimento altera demandas sociais e a razão entre grupos etários. Os efeitos econômicos dependem de produtividade, participação no trabalho, migração e políticas públicas, por isso não há um único resultado inevitável.",
    "alternativeExplanations": {
      "A": "Fecundidade baixa tende a reduzir a participação das coortes mais jovens.",
      "B": "Correta. Envelhecimento altera demandas sociais e a razão entre grupos etários. Os efeitos econômicos dependem de produtividade, participação no trabalho, migração e políticas públicas, por isso não há um único resultado inevitável.",
      "C": "Demografia cria pressões e oportunidades, mas resultados dependem de instituições e políticas.",
      "D": "Fluxos migratórios podem alterar composição e oferta de trabalho."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "envelhecimento"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Dois municípios não possuem mancha urbana totalmente contínua, mas milhares de pessoas\n    se deslocam diariamente entre eles para trabalho e estudo, e compartilham hospitais,\n    universidades e sistemas de transporte.\n\n    O caso mostra que:",
    "alternatives": [
      {
        "id": "A",
        "text": "sem continuidade física não pode existir relação metropolitana ou regional"
      },
      {
        "id": "B",
        "text": "rede urbana depende apenas de fronteiras administrativas"
      },
      {
        "id": "C",
        "text": "integração funcional na rede urbana pode existir mesmo sem conurbação física completa"
      },
      {
        "id": "D",
        "text": "conurbação e rede urbana são exatamente o mesmo fenômeno"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Fluxos de pessoas, serviços e infraestrutura podem integrar municípios de forma intensa. Conurbação é continuidade física; integração funcional é uma relação mais ampla.",
    "alternativeExplanations": {
      "A": "Fluxos podem ligar fortemente cidades separadas por áreas não urbanizadas.",
      "B": "A rede é definida por conexões e funções, não só por limites políticos.",
      "C": "Correta. Fluxos de pessoas, serviços e infraestrutura podem integrar municípios de forma intensa. Conurbação é continuidade física; integração funcional é uma relação mais ampla.",
      "D": "Um conceito descreve continuidade da mancha; o outro, relações entre centros."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "rede-urbana",
      "integracao-funcional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-mc-a-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma indústria de alta tecnologia escolhe uma cidade com terreno caro, mas próxima de\n    universidades, mão de obra especializada, aeroporto internacional, fornecedores e centros\n    de pesquisa.\n\n    O caso demonstra que:",
    "alternatives": [
      {
        "id": "A",
        "text": "indústrias sempre escolhem o local com o terreno mais barato"
      },
      {
        "id": "B",
        "text": "universidades não influenciam atividades tecnológicas"
      },
      {
        "id": "C",
        "text": "infraestrutura aérea é irrelevante para empresas integradas globalmente"
      },
      {
        "id": "D",
        "text": "economias de aglomeração e acesso a conhecimento podem compensar custos fundiários elevados"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Atividades intensivas em conhecimento valorizam redes de inovação, trabalho qualificado e conectividade. O menor custo da terra é apenas um dos fatores possíveis de localização.",
    "alternativeExplanations": {
      "A": "A decisão apresentada mostra o contrário.",
      "B": "Elas podem fornecer pesquisa, formação de mão de obra e redes de inovação.",
      "C": "Conectividade pode ser um ativo importante em cadeias de alto valor.",
      "D": "Correta. Atividades intensivas em conhecimento valorizam redes de inovação, trabalho qualificado e conectividade. O menor custo da terra é apenas um dos fatores possíveis de localização."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "localizacao",
      "economias-de-aglomeracao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-01",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Geopolítica",
    "subtopic": "Poder",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Multipolaridade pode envolver vários centros de poder sem eliminar hierarquias, dependências e capacidades desiguais entre eles.",
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
    "explanation": "A existência de vários polos relevantes não pressupõe simetria; diferentes atores podem dominar recursos ou dimensões específicas de poder.",
    "alternativeExplanations": {
      "V": "Correto. Multipolaridade descreve distribuição plural do poder, não igualdade absoluta.",
      "F": "Incorreto. Assimetrias são compatíveis com uma ordem multipolar."
    },
    "tags": [
      "geopolitica",
      "multipolaridade",
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
      "geopolitica",
      "multipolaridade",
      "assimetrias"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-02",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Questões ambientais",
    "subtopic": "Mudança climática",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Capturar carbono de uma fonte industrial é uma medida exclusivamente de adaptação, pois não atua sobre emissões de gases de efeito estufa.",
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
    "explanation": "Quando efetivamente reduz a quantidade de CO₂ liberada à atmosfera ou a remove, a captura de carbono se insere principalmente em estratégias de mitigação.",
    "alternativeExplanations": {
      "V": "Incorreto. A medida atua sobre a causa do aquecimento, não apenas sobre seus impactos.",
      "F": "Correto. Adaptação seria reduzir vulnerabilidade aos efeitos climáticos."
    },
    "tags": [
      "meio-ambiente",
      "mitigacao",
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
      "meio-ambiente",
      "mitigacao",
      "captura-de-carbono"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-03",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Cartografia",
    "subtopic": "Escala",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em mapas de pequena escala que representam continentes ou o planeta, a generalização cartográfica tende a omitir ou simplificar detalhes que poderiam aparecer em mapas de maior escala.",
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
    "explanation": "Representar áreas muito extensas em espaço limitado exige selecionar e simplificar feições para manter legibilidade.",
    "alternativeExplanations": {
      "V": "Correto. Generalização é uma consequência cartográfica importante da redução de escala.",
      "F": "Incorreto. Seria impossível representar todos os detalhes locais com a mesma precisão em um mapa continental pequeno."
    },
    "tags": [
      "cartografia",
      "escala",
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
      "cartografia",
      "escala",
      "generalizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-04",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Relevo",
    "subtopic": "Agentes externos",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A intensidade do intemperismo químico depende apenas da quantidade de chuva; temperatura, composição mineralógica e tempo de exposição não exercem influência relevante.",
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
    "explanation": "Água é importante, mas temperatura, mineralogia, acidez, atividade biológica, fraturas e duração da exposição também condicionam as reações.",
    "alternativeExplanations": {
      "V": "Incorreto. O processo resulta de múltiplos fatores ambientais e litológicos.",
      "F": "Correto. Reduzi-lo a uma única variável produz uma explicação inadequada."
    },
    "tags": [
      "relevo",
      "intemperismo",
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
      "relevo",
      "intemperismo",
      "fatores-condicionantes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-05",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Clima",
    "subtopic": "Urbanização",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Ilhas de calor podem permanecer expressivas durante a noite porque materiais urbanos liberam parte da energia armazenada durante o dia.",
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
    "explanation": "Superfícies construídas possuem propriedades térmicas que podem retardar o resfriamento, enquanto vegetação e umidade modificam o balanço de energia.",
    "alternativeExplanations": {
      "V": "Correto. O contraste urbano-rural pode até se tornar evidente após o pôr do sol.",
      "F": "Incorreto. O fenômeno não depende apenas da radiação solar instantânea."
    },
    "tags": [
      "clima",
      "ilha-de-calor",
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
      "clima",
      "ilha-de-calor",
      "balanco-termico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-06",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Vegetação",
    "subtopic": "Biomas",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Como algumas espécies do Cerrado rebrotam após o fogo, aumentar indefinidamente a frequência de incêndios não altera a composição nem a capacidade de regeneração do bioma.",
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
    "explanation": "Intervalos muito curtos podem impedir maturação, reprodução e recuperação de espécies, além de favorecer mortalidade e mudanças na estrutura da vegetação.",
    "alternativeExplanations": {
      "V": "Incorreto. Adaptação ao fogo possui limites e depende do regime de ocorrência.",
      "F": "Correto. Frequência excessiva pode transformar o ecossistema."
    },
    "tags": [
      "vegetacao",
      "cerrado",
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
      "vegetacao",
      "cerrado",
      "resiliencia"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-07",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Hidrografia",
    "subtopic": "Bacias",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Planejar a qualidade da água apenas por limites municipais pode ser insuficiente quando as fontes de poluição e os usuários estão conectados pela mesma bacia hidrográfica.",
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
    "explanation": "Poluentes e vazões atravessam fronteiras administrativas; por isso, a gestão integrada por bacia pode coordenar interesses montante-jusante.",
    "alternativeExplanations": {
      "V": "Correto. A unidade física da drenagem ultrapassa limites políticos.",
      "F": "Incorreto. Problemas hídricos frequentemente exigem coordenação intermunicipal ou interestadual."
    },
    "tags": [
      "hidrografia",
      "bacia",
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
      "hidrografia",
      "bacias",
      "governanca"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-08",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "População",
    "subtopic": "Transição demográfica",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma taxa de fecundidade abaixo do nível de reposição provoca necessariamente queda imediata da população total no mesmo ano.",
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
    "explanation": "A estrutura etária, o número de pessoas em idade reprodutiva, a mortalidade e a migração podem manter o crescimento por algum tempo, fenômeno relacionado ao momentum demográfico.",
    "alternativeExplanations": {
      "V": "Incorreto. Fecundidade baixa não produz efeito instantâneo e isolado sobre o tamanho total.",
      "F": "Correto. A dinâmica populacional depende da composição por idade e de outros componentes."
    },
    "tags": [
      "populacao",
      "demografia",
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
      "populacao",
      "transicao-demografica",
      "inercia-demografica"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-09",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Urbanização",
    "subtopic": "Rede urbana",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Conurbação é condição obrigatória para que duas cidades mantenham intensos fluxos de trabalho, serviços e transporte entre si.",
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
    "explanation": "Cidades podem estar funcionalmente integradas sem continuidade física completa das manchas urbanas.",
    "alternativeExplanations": {
      "V": "Incorreto. Redes urbanas são construídas por fluxos, não apenas por continuidade espacial.",
      "F": "Correto. Conurbação e integração funcional são fenômenos relacionados, mas distintos."
    },
    "tags": [
      "urbanizacao",
      "conurbacao",
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
      "urbanizacao",
      "rede-urbana",
      "conurbacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-10",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Industrialização",
    "subtopic": "Localização",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A desconcentração de plantas industriais pode ocorrer ao mesmo tempo que sedes corporativas, serviços avançados e funções de comando permanecem concentrados em grandes metrópoles.",
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
    "explanation": "Etapas produtivas e funções de gestão podem ter lógicas locacionais diferentes; a produção pode se dispersar sem que todos os centros de decisão façam o mesmo.",
    "alternativeExplanations": {
      "V": "Correto. A organização territorial das empresas pode ser seletiva e hierarquizada.",
      "F": "Incorreto. Desconcentração fabril não exige dispersão idêntica de todas as funções empresariais."
    },
    "tags": [
      "industrializacao",
      "desconcentracao",
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
      "industrializacao",
      "desconcentracao",
      "funcoes-de-comando"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-11",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Agricultura",
    "subtopic": "Produção",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A adoção de agricultura de precisão torna uma produção automaticamente sustentável, independentemente do consumo de água, do uso de insumos, da conservação do solo e da expansão da área cultivada.",
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
    "explanation": "Tecnologias de precisão podem melhorar eficiência, mas sustentabilidade depende de um conjunto mais amplo de práticas, impactos e relações territoriais.",
    "alternativeExplanations": {
      "V": "Incorreto. Uma tecnologia isolada não garante resultado ambiental global.",
      "F": "Correto. É preciso avaliar uso de recursos, solo, biodiversidade e escala da produção."
    },
    "tags": [
      "agricultura",
      "agronegocio",
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
      "agricultura",
      "producao",
      "sustentabilidade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "geografia-vest-v1-vf-a-12",
    "area": "Ciências Humanas",
    "subject": "geografia",
    "subjectName": "Geografia",
    "topic": "Energia",
    "subtopic": "Matriz",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma matriz com maior participação de fontes renováveis pode reduzir emissões de certos setores, mas ainda exige análise de impactos territoriais, confiabilidade do sistema e infraestrutura.",
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
    "explanation": "Transição energética envolve benefícios e trade-offs. Renováveis não são sinônimo de impacto zero e precisam ser integradas tecnicamente ao sistema.",
    "alternativeExplanations": {
      "V": "Correto. Avaliação energética combina clima, território, custo, segurança e infraestrutura.",
      "F": "Incorreto. A origem renovável não elimina todos os demais critérios de planejamento."
    },
    "tags": [
      "energia",
      "matriz-energetica",
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
      "energia",
      "matriz",
      "transicao-energetica"
    ],
    "origin": "nabulab"
  }
];
