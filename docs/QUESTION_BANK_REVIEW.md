# Revisão do Banco Vestibulares v1

## Estado da revisão

A revisão técnica foi concluída, mas a aprovação pedagógica final permanece pendente. A amostragem manual obrigatória identificou questões avançadas baseadas apenas em associação conceitual e itens V/F falsos construídos com conceitos excessivamente distantes. Por esse motivo, este documento não declara o banco pedagogicamente aprovado.

No estado atual, **Física, Química, Biologia e História** concluíram a revisão pedagógica individual aprofundada e foram aprovadas em suas amostragens disciplinares. As outras 13 matérias permanecem no estado técnico materializado atual e serão revisadas pedagogicamente em etapas posteriores; elas não são declaradas aprovadas.

## Estrutura preservada

- 17 matérias e 1.224 questões.
- 72 questões por matéria.
- 408 questões em cada dificuldade.
- 612 questões de múltipla escolha e 612 de verdadeiro/falso.
- 12 questões em cada combinação de matéria, tipo e dificuldade.
- 140 IDs originais preservados.
- Metadados `examTags`, `skills`, `educationLevel`, `origin` e `tags` preservados.

## Alterações realizadas

- 140 questões legadas preservadas sem troca de ID.
- 1.084 questões antes produzidas em runtime foram materializadas em arquivos TypeScript por matéria.
- `generator.ts` e os blueprints usados para geração em runtime foram removidos.
- 1.084 explicações receberam revisão estrutural; 572 explicações V/F foram diferenciadas por dificuldade, tópico e subtópico.
- 512 conjuntos de distratores materializados foram inspecionados estruturalmente; a revisão pedagógica dos distratores ainda não está aprovada.
- 364 questões avançadas materializadas foram inspecionadas por detector e amostragem; parte delas ainda requer substituição pedagógica.
- 572 questões V/F materializadas foram inspecionadas; parte das falsas ainda requer substituição pedagógica.
- `examTags` deixaram de ser aplicadas indiscriminadamente às questões legadas e passaram a variar por matéria e dificuldade.

## Amostragem manual

Foram amostradas 102 questões: seis por matéria, sendo duas iniciantes, duas médias e duas avançadas. Foram avaliados clareza, resposta, dificuldade, distratores, naturalidade, explicações e presença de molde.

Resultado: **reprovado para conclusão pedagógica**. A amostra confirmou clareza factual e coerência da resposta em grande parte dos itens, mas também mostrou repetição de estruturas de reconhecimento, dificuldade avançada superestimada e falsidades por troca de conceitos pouco próximos.

## Padrões removidos

| Padrão | Antes | Depois |
| --- | ---: | ---: |
| Geração em runtime (`generator.ts`) | 1 arquivo / 6 funções centrais | 0 |
| `buildStatement`, `rotateConcepts`, `buildMultipleChoice`, `buildTrueFalse` | 4 funções | 0 |
| `ConceptBlueprint` / `SubjectBlueprint` | 2 tipos | 0 |
| “A análise correta mobiliza” | 0 | 0 |
| “O ponto decisivo é interpretar” | 0 | 0 |
| “sem acrescentar condições inexistentes” | 0 | 0 |
| “ignora a informação central apresentada” | 0 | 0 |
| “apenas porque pertence à mesma matéria” | 0 | 0 |
| “descartar o contexto” | 0 | 0 |
| “limita a conclusão ao que as evidências permitem afirmar” | 0 | 0 |
| “não autoriza generalização automática” | 0 | 0 |
| “II exige restringir o alcance” | 0 | 0 |
| “a sequência entre I e II demonstra causalidade” | 0 | 0 |
| Explicações quase idênticas detectadas (Jaccard ≥ 0,94) | 276 | 0 |

## Auditoria e diversidade

O auditor agora procura os boilerplates proibidos no enunciado, explicação, alternativas e explicações por alternativa. Também compara explicações dentro da mesma matéria por tokens normalizados e similaridade de Jaccard. Palavras isoladas como “evidência”, “dados” ou conectivos não são usadas como prova de complexidade.

Os detectores automáticos registram zero ocorrências dos boilerplates proibidos e zero explicações quase idênticas no limiar configurado. Isso não substitui o resultado da amostragem manual, que permanece reprovado.

## Validações

- `npm run audit`: aprovado — 1.224 questões, 17 matérias, 0 erros e 0 warnings.
- `npm run verify:bank`: aprovado — 204 combinações de matéria, dificuldade e tipo.
- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm run build`: aprovado — compilação e geração das 19 páginas concluídas.

## Próxima etapa necessária

Substituir cirurgicamente as questões reprovadas, priorizando as avançadas e as V/F falsas, com problemas, fontes, dados, experimentos, cálculos e interpretações próprios de cada disciplina. A conclusão só deve ser declarada após nova amostra aleatória de 102 itens sem molde evidente.

## Lote disciplinar — Física

Física foi revisada individualmente em 48 registros: 24 avançados, 12 MC médios e 12 V/F falsos adicionais dos níveis iniciante e médio. As 18 afirmações falsas abrangidas pelo lote passaram a usar erros físicos plausíveis, e os 24 conjuntos de distratores das MC médias e avançadas foram reescritos com erros de fórmula, sinal, unidade, proporcionalidade ou interpretação. Foram atualizadas 48 explicações principais e 144 explicações de alternativas.

### Amostra manual de Física

| ID | Tópico | Dificuldade | Tipo | Resultado | Justificativa |
| --- | --- | --- | --- | --- | --- |
| fisica-vest-v1-mc-i-01 | Cinemática | iniciante | MC | aprovada | Reconhecimento direto, claro e adequado ao nível. |
| fisica-vest-v1-vf-i-04 | Hidrostática | iniciante | V/F | aprovada | Confunde de modo plausível Pascal com variação hidrostática. |
| fisica-vest-v1-vf-i-08 | Óptica | iniciante | V/F | aprovada | Trabalha a confusão frequente entre frequência e comprimento de onda. |
| fisica-vest-v1-mc-i-10 | Dinâmica | iniciante | MC | aprovada | Aplicação direta da segunda lei com resposta verificável. |
| fisica-vest-v1-mc-m-03 | Termologia | médio | MC | aprovada | Exige conversão de tempo e cálculo de potência térmica. |
| fisica-vest-v1-vf-m-04 | Óptica | médio | V/F | aprovada | A proposição combina uma conclusão correta com justificativa parcialmente errada. |
| fisica-vest-v1-mc-m-09 | Cinemática | médio | MC | aprovada | Distingue deslocamento de distância e velocidade de rapidez média. |
| fisica-vest-v1-vf-m-12 | Hidrostática | médio | V/F | aprovada | Avalia corretamente a proporcionalidade entre força e área. |
| fisica-vest-v1-mc-a-03 | Eletricidade | avançado | MC | aprovada | Combina associação de resistores, Lei de Ohm e potência. |
| fisica-vest-v1-mc-a-07 | Energia e colisões | avançado | MC | aprovada | Exige conservação do momento seguida de conservação da energia. |
| fisica-vest-v1-vf-a-02 | Física moderna | avançado | V/F | aprovada | Distingue intensidade, frequência e energia cinética fotoelétrica. |
| fisica-vest-v1-vf-a-10 | Termodinâmica | avançado | V/F | aprovada | Exige convenção de sinais e aplicação numérica da primeira lei. |

Resultado da amostra: **12 aprovadas, 0 reprovadas**. A matéria cobre Cinemática, Dinâmica, Energia, Impulso, Gravitação, Hidrostática, Termologia, Termodinâmica, Ondas, Óptica, Eletricidade e Física Moderna. Física está pedagogicamente aprovada neste lote; as demais matérias permanecem pendentes.

## Lote disciplinar — Química

A inspeção das 48 questões inicialmente priorizadas mostrou que o molde antigo também persistia nos 24 registros que seriam preservados. Por isso, as 72 questões de Química foram revisadas individualmente, sem alteração de IDs, tipos ou dificuldades. Foram corrigidas 24 avançadas, 18 V/F falsas e 12 MC médias prioritárias; ao final, os 36 conjuntos de alternativas MC, as 72 explicações principais e as 216 explicações por alternativa estavam revisados.

### Amostra manual de Química

A amostra foi obtida com semente fixa `20260909`, sem reutilizar a seleção diagnóstica anterior.

| ID | Tópico | Dificuldade | Tipo | Resultado | Justificativa |
| --- | --- | --- | --- | --- | --- |
| quimica-vest-v1-mc-i-10 | Eletroquímica | iniciante | MC | aprovada | Reconhecimento claro de oxidação no ânodo, com distratores do mesmo sistema. |
| quimica-vest-v1-mc-i-01 | Estrutura atômica | iniciante | MC | aprovada | Relaciona perda de elétrons e carga do cátion sem ambiguidade. |
| quimica-vest-v1-vf-i-08 | Eletroquímica | iniciante | V/F | aprovada | Falsidade plausível pela inversão entre ânodo e cátodo. |
| quimica-vest-v1-vf-i-10 | Química ambiental | iniciante | V/F | aprovada | Corrige a generalização sobre CO₂ e chuva ácida. |
| quimica-vest-v1-vf-m-03 | Equilíbrio | médio | V/F | aprovada | Exige contar mols gasosos para inferir o efeito da pressão. |
| quimica-vest-v1-mc-m-11 | Ligações químicas | médio | MC | aprovada | Integra polaridade das ligações e geometria molecular. |
| quimica-vest-v1-vf-m-01 | Termoquímica | médio | V/F | aprovada | Combina cálculo molar e sinal de entalpia. |
| quimica-vest-v1-mc-m-07 | Química orgânica | médio | MC | aprovada | Distingue álcool e fenol pelo ambiente estrutural da hidroxila. |
| quimica-vest-v1-vf-a-09 | Tabela periódica | avançado | V/F | aprovada | Integra carga nuclear efetiva, raio e eletronegatividade. |
| quimica-vest-v1-vf-a-07 | Eletroquímica | avançado | V/F | aprovada | Combina potenciais, espontaneidade, eletrodos e fluxo eletrônico. |
| quimica-vest-v1-mc-a-07 | Eletroquímica | avançado | MC | aprovada | Exige selecionar eletrodos e calcular a ddp padrão. |
| quimica-vest-v1-mc-a-03 | Equilíbrio iônico | avançado | MC | aprovada | Exige converter pH em concentração, diluir e recalcular o pH. |

Resultado da amostra: **12 aprovadas, 0 reprovadas**. Foram conferidos correção química, balanceamento, unidades, sinais de ΔH, pH, cargas, potenciais, dificuldade, distratores, explicações e naturalidade.

### Cobertura de Química

O lote contempla estrutura atômica, propriedades periódicas, ligações e polaridade, forças intermoleculares, estequiometria, reagente limitante, soluções, diluição, pH, equilíbrio, cinética, termoquímica, gases, pilhas, eletrólise, oxidação e redução, funções orgânicas, isomeria e química ambiental.

### Validações após Química

- `npm run audit`: aprovado — 1.224 questões, 17 matérias, 0 erros e 0 warnings.
- `npm run verify:bank`: aprovado — 204 combinações de matéria, dificuldade e tipo.
- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm run build`: aprovado — compilação e geração das 19 páginas concluídas.

## Lote disciplinar — Biologia

As 72 questões de Biologia foram analisadas individualmente. Nenhuma foi preservada sem alteração pedagógica: a inspeção confirmou que o molde anterior também comprometia os itens fora dos grupos prioritários. Assim, 72 questões foram completamente reautorizadas, preservando IDs, tipos, dificuldades e metadados estruturais. Foram corrigidas as 24 avançadas, as 18 V/F falsas inicialmente identificadas e as 12 MC médias prioritárias. Ao final, os 36 conjuntos de alternativas MC, as 72 explicações principais e as 216 explicações por alternativa estavam revisados.

### Amostra manual de Biologia

| ID | Tópico | Dificuldade | Tipo | Resultado | Justificativa |
| --- | --- | --- | --- | --- | --- |
| biologia-vest-v1-mc-i-03 | Metabolismo | iniciante | MC | aprovada | Relaciona gradiente de prótons e fosforilação oxidativa com clareza adequada ao nível. |
| biologia-vest-v1-vf-i-06 | Evolução | iniciante | V/F | aprovada | Corrige uma concepção teleológica comum sobre resistência bacteriana. |
| biologia-vest-v1-mc-i-08 | Botânica | iniciante | MC | aprovada | Avalia diretamente a função do xilema com alternativas biologicamente definidas. |
| biologia-vest-v1-vf-i-10 | Fisiologia humana | iniciante | V/F | aprovada | A falsidade inverte de modo plausível o efeito da insulina e o tipo de feedback. |
| biologia-vest-v1-mc-m-02 | Bioquímica | médio | MC | aprovada | Exige interpretar duas regiões de uma curva térmica e distinguir colisão de desnaturação. |
| biologia-vest-v1-vf-m-05 | Biotecnologia | médio | V/F | aprovada | Interpreta corretamente o controle negativo de PCR e sua implicação experimental. |
| biologia-vest-v1-mc-m-07 | Ecologia | médio | MC | aprovada | Encadeia nutrientes, biomassa, decomposição, respiração microbiana e hipóxia. |
| biologia-vest-v1-vf-m-12 | Imunologia | médio | V/F | aprovada | Usa uma confusão plausível sobre formação e persistência de células de memória. |
| biologia-vest-v1-mc-a-06 | Evolução | avançado | MC | aprovada | Compara deriva, seleção, efeito fundador e fluxo gênico a partir de um gargalo. |
| biologia-vest-v1-vf-a-03 | Metabolismo | avançado | V/F | aprovada | Integra gradiente de prótons, consumo de oxigênio, ATP e dissipação de calor. |
| biologia-vest-v1-mc-a-12 | Imunologia | avançado | MC | aprovada | Infere memória e maturação de afinidade a partir de três resultados imunológicos. |
| biologia-vest-v1-vf-a-09 | Zoologia | avançado | V/F | aprovada | Contrasta semelhança morfológica, convergência e evidência molecular de parentesco. |

Resultado da amostra: **12 aprovadas, 0 reprovadas**. Foram avaliados correção biológica, clareza, dificuldade, plausibilidade dos distratores, qualidade das afirmações V/F, explicações, naturalidade e ausência do molde anterior.

### Cobertura de Biologia

O lote contempla citologia e transporte de membrana; enzimas; respiração e fermentação; genética mendeliana e ligada ao sexo; PCR e controles experimentais; seleção natural, deriva e filogenia; fluxo de energia, eutrofização e biomagnificação; tecidos e fisiologia vegetal; estrutura e função animal; controle glicêmico; vírus, bactérias e resistência a antibióticos; vacinação, imunidade adaptativa e memória imunológica.

### Validações após Biologia

- `npm run audit`: aprovado — 1.224 questões, 17 matérias, 0 erros e 0 warnings.
- `npm run verify:bank`: aprovado — 204 combinações de matéria, dificuldade e tipo.
- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm run build`: aprovado — compilação e geração das páginas concluídas.

## Lote disciplinar — História

As 72 questões de História foram analisadas individualmente. Nenhuma foi preservada sem alteração pedagógica: o molde anterior afetava também os itens iniciantes e médios, além de reduzir as avançadas a reconhecimento conceitual. As 72 foram completamente reescritas, preservando IDs, tipos, dificuldades e metadados estruturais. Foram corrigidas as 24 avançadas, as 18 V/F falsas originalmente identificadas e as 12 MC médias prioritárias. Ao final, os 36 conjuntos de alternativas MC, as 72 explicações principais e as 216 explicações por alternativa estavam revisados.

### Amostra manual de História

| ID | Tópico | Dificuldade | Tipo | Resultado | Justificativa |
| --- | --- | --- | --- | --- | --- |
| historia-vest-v1-mc-i-01 | Antiguidade | iniciante | MC | aprovada | Identifica os limites da cidadania ateniense com distratores historicamente próximos. |
| historia-vest-v1-vf-i-04 | Brasil Império | iniciante | V/F | aprovada | Corrige a confusão plausível entre monarquia constitucional e função apenas simbólica. |
| historia-vest-v1-mc-i-08 | Era Vargas | iniciante | MC | aprovada | Relaciona direitos trabalhistas e tutela sindical em linguagem adequada ao nível. |
| historia-vest-v1-vf-i-10 | História indígena | iniciante | V/F | aprovada | Rejeita a homogeneização das estratégias indígenas sem negar a violência colonial. |
| historia-vest-v1-mc-m-01 | Brasil Colônia | médio | MC | aprovada | Infere agência escrava a partir de anúncio de fuga e contextualiza o trabalho de ganho. |
| historia-vest-v1-vf-m-03 | Guerras Mundiais | médio | V/F | aprovada | Exige relacionar tecnologia defensiva, trincheiras e impasse militar. |
| historia-vest-v1-mc-m-06 | Guerra Fria | médio | MC | aprovada | Interpreta a projeção regional da bipolaridade por meio da Guerra da Coreia. |
| historia-vest-v1-vf-m-10 | Revoluções | médio | V/F | aprovada | Distingue direitos proclamados de inclusão política imediata e universal. |
| historia-vest-v1-mc-a-03 | Ditadura Militar | avançado | MC | aprovada | Compara autoria, finalidade e convergência entre fontes contraditórias. |
| historia-vest-v1-vf-a-04 | Idade Média | avançado | V/F | aprovada | Relaciona demografia, mercado de trabalho e variação institucional após a Peste Negra. |
| historia-vest-v1-mc-a-09 | Brasil Colônia | avançado | MC | aprovada | Infere conexões entre produção, tráfico e crédito sem transformar correlação em monocausalidade. |
| historia-vest-v1-vf-a-12 | Guerra Fria | avançado | V/F | aprovada | Evita tratar o Não Alinhamento como neutralidade absoluta e uniforme. |

Resultado da amostra: **12 aprovadas, 0 reprovadas**. Foram avaliados correção histórica, cronologia, autoria e crítica de fontes, relações de causa e consequência, dificuldade, plausibilidade dos distratores, qualidade das afirmações V/F, explicações, naturalidade e ausência do molde anterior.

### Cobertura de História

O lote contempla democracia e imperialismo atenienses; sociedade feudal, transformações medievais e Peste Negra; mercantilismo e colonialismo; Revolução Francesa e Revolução Haitiana; escravidão, resistência e economia atlântica; Estado imperial, Poder Moderador e abolição; coronelismo e Revolta da Vacina; trabalhismo e Estado Novo; Primeira Guerra, Versalhes e nazismo; bipolaridade, conflitos regionais, Crise dos Mísseis e Não Alinhamento; ditadura, repressão, abertura e memória; agência, alianças e políticas indigenistas.

### Validações após História

- `npm run audit`: aprovado — 1.224 questões, 17 matérias, 0 erros e 0 warnings.
- `npm run verify:bank`: aprovado — 204 combinações de matéria, dificuldade e tipo.
- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm run build`: aprovado — compilação e geração das páginas concluídas.
