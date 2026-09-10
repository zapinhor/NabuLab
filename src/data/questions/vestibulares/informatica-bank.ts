import type { Question } from "@/types/question";

export const informaticaQuestions: Question[] = [
  {
    "id": "informatica-vest-v1-mc-i-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Hardware",
    "subtopic": "Memória",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Um computador possui SSD de 512 GB e 4 GB de memória RAM. Ao abrir simultaneamente navegador, editor de texto e videoconferência, o sistema fica lento, embora ainda haja muito espaço livre no SSD. Qual melhoria tende a ajudar mais nesse cenário?",
    "alternatives": [
      {
        "id": "A",
        "text": "Aumentar a quantidade de memória RAM"
      },
      {
        "id": "B",
        "text": "Trocar o monitor por um de maior resolução"
      },
      {
        "id": "C",
        "text": "Aumentar apenas a capacidade do SSD para 1 TB"
      },
      {
        "id": "D",
        "text": "Instalar um segundo teclado"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A RAM mantém temporariamente dados e instruções dos programas em execução. Com apenas 4 GB e vários aplicativos abertos, pode faltar memória de trabalho, levando o sistema a recorrer mais ao armazenamento secundário, que é mais lento.",
    "alternativeExplanations": {
      "A": "Correta. Mais RAM permite manter mais dados dos programas ativos em memória sem recorrer tanto à memória virtual.",
      "B": "A resolução do monitor não resolve a limitação de memória descrita.",
      "C": "Mais capacidade de armazenamento não aumenta, por si só, a quantidade de memória disponível aos programas em execução.",
      "D": "O teclado não interfere na capacidade de memória do computador."
    },
    "tags": [
      "hardware",
      "memoria",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "hardware",
      "memoria",
      "diagnostico-basico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-i-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Software",
    "subtopic": "Licenciamento",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Uma escola deseja utilizar um programa cujo código-fonte possa ser estudado e modificado por sua equipe, respeitando os termos da licença. Qual característica deve procurar?",
    "alternatives": [
      {
        "id": "A",
        "text": "Software de código aberto"
      },
      {
        "id": "B",
        "text": "Programa obrigatoriamente gratuito e sem licença"
      },
      {
        "id": "C",
        "text": "Arquivo executável sem acesso ao código-fonte"
      },
      {
        "id": "D",
        "text": "Software que só pode ser usado conectado à internet"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Software de código aberto disponibiliza o código-fonte sob uma licença que define direitos e obrigações de uso, estudo, modificação e redistribuição.",
    "alternativeExplanations": {
      "A": "Correta. O acesso ao código e as permissões concedidas pela licença atendem ao requisito.",
      "B": "Código aberto não significa ausência de licença nem implica necessariamente gratuidade.",
      "C": "Ter apenas o executável não permite estudar ou modificar o código-fonte.",
      "D": "A necessidade de internet não define o modelo de licenciamento do software."
    },
    "tags": [
      "software",
      "codigo-aberto",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "software",
      "licenciamento",
      "aplicacao-de-conceito"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-i-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Sistemas operacionais",
    "subtopic": "Processos",
    "difficulty": "iniciante",
    "type": "multiple-choice",
    "statement": "Em um computador com vários programas abertos, o sistema operacional alterna o uso do processador entre navegador, reprodutor de música e editor de texto. Qual função do sistema operacional está diretamente envolvida nessa distribuição do tempo de CPU?",
    "alternatives": [
      {
        "id": "A",
        "text": "Formatação de disco"
      },
      {
        "id": "B",
        "text": "Escalonamento de processos"
      },
      {
        "id": "C",
        "text": "Compactação de arquivos"
      },
      {
        "id": "D",
        "text": "Resolução de nomes de domínio"
      }
    ],
    "correctAnswer": "B",
    "explanation": "O escalonador do sistema operacional decide qual processo pronto para executar utilizará o processador em cada momento.",
    "alternativeExplanations": {
      "A": "Formatação organiza um sistema de arquivos em uma unidade de armazenamento, não distribui tempo de CPU.",
      "B": "Correta. O escalonamento coordena o compartilhamento do processador entre processos.",
      "C": "Compactação reduz ou reorganiza dados de arquivos, sem decidir qual processo usa a CPU.",
      "D": "Resolução de nomes relaciona domínios a endereços de rede e não é a função descrita."
    },
    "tags": [
      "sistema-operacional",
      "processos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sistemas-operacionais",
      "processos",
      "identificacao-de-funcao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Sistemas operacionais",
    "subtopic": "Processos",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Um processo pode ser entendido como um programa em execução, com recursos como memória e estado de execução administrados pelo sistema operacional.",
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
    "explanation": "Um arquivo de programa armazenado e uma instância desse programa em execução não são a mesma coisa. Quando executado, ele passa a existir como processo, cujo estado e recursos são gerenciados pelo sistema operacional.",
    "alternativeExplanations": {
      "V": "Correto. Processos representam instâncias em execução e são unidades administradas pelo sistema operacional.",
      "F": "Incorreto. A descrição corresponde ao funcionamento básico de um processo."
    },
    "tags": [
      "sistema-operacional",
      "processos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sistemas-operacionais",
      "processos",
      "compreensao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Internet",
    "subtopic": "Web",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "A presença de HTTPS em um endereço garante que o site é legítimo e que nenhum conteúdo malicioso pode existir nele.",
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
    "explanation": "HTTPS protege a comunicação entre cliente e servidor por meio de criptografia e autenticação do servidor por certificado, mas não garante que o conteúdo do site seja confiável ou livre de golpes.",
    "alternativeExplanations": {
      "V": "Incorreto. Um site malicioso também pode usar HTTPS.",
      "F": "Correto. HTTPS protege o transporte dos dados, não certifica a honestidade do conteúdo."
    },
    "tags": [
      "internet",
      "https",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "internet",
      "https",
      "seguranca-na-web"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Redes",
    "subtopic": "Endereçamento",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Dois dispositivos configurados manualmente com o mesmo endereço IPv4 na mesma rede local podem usar esse endereço simultaneamente sem risco de conflito, pois seus endereços físicos são diferentes.",
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
    "explanation": "Mesmo com endereços físicos distintos, a duplicidade de endereço IPv4 na mesma rede pode causar conflito e falhas de comunicação.",
    "alternativeExplanations": {
      "V": "Incorreto. O endereço físico não torna seguro o uso simultâneo do mesmo IPv4 por dois dispositivos na mesma rede.",
      "F": "Correto. Cada interface precisa de endereçamento IP adequado para evitar ambiguidades na entrega dos pacotes."
    },
    "tags": [
      "redes",
      "ip",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "redes",
      "enderecamento-ip",
      "diagnostico-basico"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-04",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Segurança",
    "subtopic": "Engenharia social",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma mensagem que imita o banco do usuário, cria senso de urgência e pede que ele clique em um link para confirmar a senha apresenta características típicas de phishing.",
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
    "explanation": "Phishing usa engenharia social para se passar por uma fonte confiável e induzir a vítima a fornecer dados, abrir arquivos ou acessar páginas fraudulentas.",
    "alternativeExplanations": {
      "V": "Correto. A imitação de identidade, a urgência e a solicitação de credenciais são sinais comuns desse golpe.",
      "F": "Incorreto. O cenário descrito é compatível com uma tentativa de phishing."
    },
    "tags": [
      "seguranca",
      "phishing",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "seguranca",
      "phishing",
      "reconhecimento-de-risco"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-05",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Privacidade",
    "subtopic": "Dados pessoais",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Se um formulário precisa apenas confirmar se o usuário é maior de 18 anos, solicitar também CPF, endereço completo e renda sem outra finalidade pode contrariar o princípio de minimização de dados.",
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
    "explanation": "Minimização de dados orienta que sejam coletados apenas os dados adequados, relevantes e necessários à finalidade informada.",
    "alternativeExplanations": {
      "V": "Correto. Os dados extras precisam de uma finalidade legítima própria; sem ela, a coleta é excessiva para o objetivo descrito.",
      "F": "Incorreto. Coletar dados desnecessários à finalidade pode contrariar a minimização."
    },
    "tags": [
      "privacidade",
      "dados-pessoais",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "privacidade",
      "minimizacao-de-dados",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-06",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Computação em nuvem",
    "subtopic": "Serviços",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em um serviço SaaS acessado pelo navegador, é responsabilidade normal do usuário administrar diretamente o sistema operacional e os servidores em que a aplicação é executada.",
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
    "explanation": "No modelo SaaS, a aplicação é fornecida pela rede e a infraestrutura subjacente é administrada pelo provedor, não pelo usuário final.",
    "alternativeExplanations": {
      "V": "Incorreto. Administrar servidores e sistema operacional subjacente não é a responsabilidade típica do consumidor de SaaS.",
      "F": "Correto. O usuário utiliza a aplicação enquanto o provedor gerencia a infraestrutura necessária para executá-la."
    },
    "tags": [
      "nuvem",
      "saas",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "computacao-em-nuvem",
      "saas",
      "compreensao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-07",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Editores de texto",
    "subtopic": "Formatação",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Usar estilos de título em um editor de texto ajuda a manter a formatação consistente e pode facilitar recursos como geração automática de sumário.",
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
    "explanation": "Estilos aplicam conjuntos reutilizáveis de propriedades a elementos do documento e permitem que programas reconheçam semanticamente títulos e níveis de seção.",
    "alternativeExplanations": {
      "V": "Correto. Além da consistência visual, estilos podem apoiar navegação e sumários automáticos.",
      "F": "Incorreto. A utilização de estilos oferece justamente essas vantagens sobre a formatação manual isolada."
    },
    "tags": [
      "editor-de-texto",
      "estilos",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "editores-de-texto",
      "estilos",
      "produtividade"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-08",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Planilhas",
    "subtopic": "Referências",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Em uma planilha, a referência $B$2 permanece apontando para a célula B2 quando a fórmula é copiada para outra posição.",
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
    "explanation": "Os cifrões fixam tanto a coluna B quanto a linha 2, tornando a referência absoluta.",
    "alternativeExplanations": {
      "V": "Correto. Nem a linha nem a coluna são ajustadas durante a cópia.",
      "F": "Incorreto. $B$2 é uma referência absoluta justamente porque mantém as duas coordenadas fixas."
    },
    "tags": [
      "planilhas",
      "referencia-absoluta",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "planilhas",
      "referencia-absoluta",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-i-09",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Banco de dados",
    "subtopic": "Chaves",
    "difficulty": "iniciante",
    "type": "true-false",
    "statement": "Uma coluna escolhida como chave primária pode repetir o mesmo valor em vários registros, desde que as demais colunas sejam diferentes.",
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
    "explanation": "A chave primária precisa identificar cada registro de forma única. Portanto, seus valores — ou combinações de valores, quando composta — não podem se repetir entre registros.",
    "alternativeExplanations": {
      "V": "Incorreto. Repetições impediriam a identificação única das linhas.",
      "F": "Correto. A unicidade é uma propriedade essencial da chave primária."
    },
    "tags": [
      "banco-de-dados",
      "chave-primaria",
      "vestibulares",
      "iniciante"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "banco-de-dados",
      "chave-primaria",
      "compreensao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-m-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Redes",
    "subtopic": "Endereçamento",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Um computador está configurado com IPv4 192.168.10.25 e máscara 255.255.255.0. Qual endereço pertence à mesma rede local, considerando essa máscara?",
    "alternatives": [
      {
        "id": "A",
        "text": "192.168.10.80"
      },
      {
        "id": "B",
        "text": "192.168.11.25"
      },
      {
        "id": "C",
        "text": "192.168.20.10"
      },
      {
        "id": "D",
        "text": "10.0.0.25"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Com máscara 255.255.255.0 (/24), os três primeiros octetos identificam a rede. Assim, endereços 192.168.10.x pertencem à mesma sub-rede, respeitadas as reservas de rede e broadcast.",
    "alternativeExplanations": {
      "A": "Correta. 192.168.10.80 compartilha o prefixo 192.168.10 com o computador.",
      "B": "O terceiro octeto muda de 10 para 11, indicando outra rede /24.",
      "C": "Também possui terceiro octeto diferente e pertence a outra rede /24.",
      "D": "O prefixo é completamente diferente do endereço informado."
    },
    "tags": [
      "redes",
      "ip",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "redes",
      "enderecamento-ip",
      "sub-redes"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-m-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Segurança",
    "subtopic": "Engenharia social",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Um funcionário recebe um e-mail com logotipo da empresa dizendo que sua conta será bloqueada em 10 minutos. O link aponta para `portal-empresa-seguranca.example`, diferente do domínio corporativo real. Qual é a conduta mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "Clicar rapidamente para evitar o bloqueio."
      },
      {
        "id": "B",
        "text": "Responder ao e-mail enviando a senha para confirmar identidade."
      },
      {
        "id": "C",
        "text": "Não usar o link, acessar o serviço pelo endereço oficial e reportar a mensagem ao setor responsável."
      },
      {
        "id": "D",
        "text": "Encaminhar o e-mail a colegas para saber se o link funciona."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Urgência artificial, imitação visual e domínio diferente são sinais de phishing. A forma segura de verificar a situação é acessar o serviço por um caminho conhecido e reportar a tentativa.",
    "alternativeExplanations": {
      "A": "A urgência é justamente um mecanismo usado para reduzir a atenção da vítima.",
      "B": "Senhas não devem ser enviadas por e-mail e a solicitação reforça a suspeita de golpe.",
      "C": "Correta. Evita o link suspeito e verifica a conta por um canal confiável.",
      "D": "Encaminhar o link pode ampliar a exposição de outras pessoas ao golpe."
    },
    "tags": [
      "seguranca",
      "phishing",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "seguranca",
      "phishing",
      "tomada-de-decisao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-m-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Privacidade",
    "subtopic": "Dados pessoais",
    "difficulty": "medio",
    "type": "multiple-choice",
    "statement": "Uma plataforma de inscrição precisa confirmar apenas a faixa etária e a cidade do participante para gerar estatísticas. Qual formulário aplica melhor o princípio de minimização de dados?",
    "alternatives": [
      {
        "id": "A",
        "text": "Nome completo, CPF, endereço, renda, telefone, faixa etária e cidade."
      },
      {
        "id": "B",
        "text": "CPF, data de nascimento completa e cidade."
      },
      {
        "id": "C",
        "text": "Faixa etária e cidade."
      },
      {
        "id": "D",
        "text": "Nome completo, foto e cidade."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Se a finalidade declarada exige somente faixa etária e cidade, esses são os dados suficientes para realizar a análise proposta.",
    "alternativeExplanations": {
      "A": "Coleta diversas informações que não são necessárias à finalidade descrita.",
      "B": "CPF e data completa de nascimento são mais dados do que o necessário para obter apenas a faixa etária.",
      "C": "Correta. Limita a coleta ao conjunto necessário para a finalidade.",
      "D": "Nome e foto não são necessários às estatísticas informadas."
    },
    "tags": [
      "privacidade",
      "dados-pessoais",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "privacidade",
      "minimizacao-de-dados",
      "analise-de-cenario"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Privacidade",
    "subtopic": "Dados pessoais",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Substituir o CPF de cada pessoa por um código interno reversivelmente associado ao CPF elimina, por si só, o caráter pessoal dos dados.",
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
    "explanation": "Se a organização consegue reverter ou relacionar o código à pessoa por meio de informação adicional, há pseudonimização, não necessariamente anonimização. Os dados continuam vinculáveis ao titular.",
    "alternativeExplanations": {
      "V": "Incorreto. A possibilidade de reidentificação mantém relevância de proteção aos dados.",
      "F": "Correto. Trocar o identificador visível por um código não garante anonimização."
    },
    "tags": [
      "privacidade",
      "dados-pessoais",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "privacidade",
      "dados-pessoais",
      "pseudonimizacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Computação em nuvem",
    "subtopic": "Serviços",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Usar um aplicativo no modelo SaaS elimina a necessidade de pensar em backup e recuperação dos dados, porque qualquer serviço em nuvem garante cópias recuperáveis para o usuário.",
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
    "explanation": "SaaS descreve a forma de disponibilização da aplicação, não uma garantia universal de retenção, histórico ou recuperação. Essas condições dependem do serviço contratado e de sua política.",
    "alternativeExplanations": {
      "V": "Incorreto. O modelo SaaS não substitui uma estratégia de proteção e recuperação dos dados.",
      "F": "Correto. É preciso verificar as garantias específicas do provedor e, quando necessário, manter mecanismos adicionais."
    },
    "tags": [
      "nuvem",
      "saas",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "computacao-em-nuvem",
      "saas",
      "avaliacao-de-risco"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Editores de texto",
    "subtopic": "Formatação",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em um documento longo, aplicar manualmente fonte e tamanho em cada título oferece a mesma facilidade de manutenção global que usar um estilo de título compartilhado.",
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
    "explanation": "Com um estilo compartilhado, uma alteração na definição pode ser propagada aos elementos que usam esse estilo. Formatação manual exige alterar ocorrências individualmente ou usar outros recursos de busca e substituição.",
    "alternativeExplanations": {
      "V": "Incorreto. Os estilos reduzem retrabalho e favorecem consistência em documentos extensos.",
      "F": "Correto. A manutenção global é uma das vantagens práticas dos estilos."
    },
    "tags": [
      "editor-de-texto",
      "estilos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "editores-de-texto",
      "estilos",
      "manutencao-de-documentos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-04",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Planilhas",
    "subtopic": "Referências",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Se a fórmula `=$A1*B$2` está na célula C3 e é copiada uma coluna para a direita e duas linhas para baixo, a referência resultante será `=$A3*C$2`.",
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
    "explanation": "A coluna A está fixa e a linha 1 é relativa, passando a 3. Em B$2, a coluna B é relativa e passa a C, enquanto a linha 2 permanece fixa.",
    "alternativeExplanations": {
      "V": "Correto. A combinação de referências absolutas e relativas produz exatamente `=$A3*C$2`.",
      "F": "Incorreto. É preciso observar separadamente quais partes possuem cifrão e quais devem se deslocar."
    },
    "tags": [
      "planilhas",
      "referencia-absoluta",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "planilhas",
      "referencias-mistas",
      "aplicacao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-05",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Banco de dados",
    "subtopic": "Chaves",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Em uma tabela `matriculas`, o par (`aluno_id`, `disciplina_id`) pode ser usado como chave primária composta quando a combinação deve ser única, ainda que cada coluna isoladamente se repita.",
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
    "explanation": "Uma chave primária pode ser formada por mais de uma coluna. Nesse caso, a unicidade é exigida para o conjunto dos valores, permitindo que um aluno apareça em várias disciplinas e uma disciplina em vários alunos.",
    "alternativeExplanations": {
      "V": "Correto. O par identifica cada matrícula mesmo que seus componentes se repitam isoladamente.",
      "F": "Incorreto. Chaves primárias não precisam ser obrigatoriamente formadas por uma única coluna."
    },
    "tags": [
      "banco-de-dados",
      "chave-primaria",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "banco-de-dados",
      "chave-composta",
      "modelagem"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-06",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Algoritmos",
    "subtopic": "Controle",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "No pseudocódigo `i = 1; enquanto i <= 5: exibir(i); i = i + 1`, os valores exibidos são 1, 2, 3, 4 e 5.",
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
    "explanation": "A condição é avaliada antes de cada iteração. Os valores de 1 a 5 satisfazem `i <= 5`; após exibir 5, i passa a 6 e o laço termina.",
    "alternativeExplanations": {
      "V": "Correto. O limite 5 está incluído pela condição `<=`.",
      "F": "Incorreto. A condição permite uma quinta iteração com i igual a 5."
    },
    "tags": [
      "algoritmos",
      "repeticao",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "algoritmos",
      "estruturas-de-repeticao",
      "rastreio"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-07",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Hardware",
    "subtopic": "Memória",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Adicionar mais memória RAM pode reduzir o uso de memória virtual quando faltava RAM, mas não torna automaticamente o processador mais rápido.",
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
    "explanation": "Mais RAM pode diminuir acessos ao armazenamento usados como extensão de memória, melhorando a responsividade em cenários limitados por memória. A frequência e a capacidade de processamento da CPU, porém, não são aumentadas por isso.",
    "alternativeExplanations": {
      "V": "Correto. O ganho depende do gargalo; RAM e CPU desempenham funções diferentes.",
      "F": "Incorreto. Aumentar RAM não altera diretamente a velocidade de execução do processador."
    },
    "tags": [
      "hardware",
      "memoria",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "hardware",
      "memoria",
      "analise-de-desempenho"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-08",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Software",
    "subtopic": "Licenciamento",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Todo software de código aberto pertence ao domínio público e, por isso, pode ser usado sem observar qualquer condição de licença.",
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
    "explanation": "Código aberto normalmente é distribuído sob uma licença que concede permissões e também pode impor condições. Domínio público e software de código aberto são conceitos diferentes.",
    "alternativeExplanations": {
      "V": "Incorreto. A licença continua relevante mesmo quando o código-fonte é aberto.",
      "F": "Correto. É necessário respeitar os termos da licença aplicável."
    },
    "tags": [
      "software",
      "codigo-aberto",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "software",
      "licenciamento",
      "diferenciacao-de-conceitos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-m-09",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Sistemas operacionais",
    "subtopic": "Processos",
    "difficulty": "medio",
    "type": "true-false",
    "statement": "Mesmo em um computador com um único núcleo de CPU, vários processos podem permanecer no estado de pronto, enquanto o escalonador decide qual deles executará a seguir.",
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
    "explanation": "O estado de pronto indica que o processo pode executar quando receber tempo de CPU. Com um único núcleo, vários processos podem aguardar nesse estado, embora apenas um execute naquele núcleo em um instante.",
    "alternativeExplanations": {
      "V": "Correto. Concorrência não exige que todos os processos estejam executando simultaneamente.",
      "F": "Incorreto. A fila de processos prontos é justamente uma situação administrada pelo escalonador."
    },
    "tags": [
      "sistema-operacional",
      "processos",
      "vestibulares",
      "medio"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sistemas-operacionais",
      "processos",
      "escalonamento"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-a-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Editores de texto",
    "subtopic": "Formatação",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um relatório de 180 páginas possui dezenas de títulos de nível 1 e 2. A equipe precisa alterar a aparência de todos os títulos de nível 1 e gerar um sumário automático confiável. Qual estratégia é mais adequada?",
    "alternatives": [
      {
        "id": "A",
        "text": "Aplicar estilos estruturados aos títulos e modificar a definição do estilo de nível 1."
      },
      {
        "id": "B",
        "text": "Selecionar manualmente cada título e alterar fonte e tamanho um a um."
      },
      {
        "id": "C",
        "text": "Inserir os títulos como imagens para impedir alterações."
      },
      {
        "id": "D",
        "text": "Usar somente espaços e tabulações para diferenciar os níveis."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Estilos permitem associar formatação e estrutura semântica aos títulos. Alterar a definição de um estilo pode atualizar suas ocorrências, e os níveis reconhecidos pelo editor podem alimentar o sumário automático.",
    "alternativeExplanations": {
      "A": "Correta. Resolve simultaneamente consistência, manutenção global e reconhecimento estrutural.",
      "B": "Pode produzir aparência semelhante, mas aumenta retrabalho e não oferece a mesma estrutura reutilizável.",
      "C": "Imagens dificultam edição, acessibilidade e geração automática de sumário.",
      "D": "Espaços e tabulações não fornecem estrutura semântica confiável ao documento."
    },
    "tags": [
      "editor-de-texto",
      "estilos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "editores-de-texto",
      "estilos",
      "estrutura-de-documentos"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-a-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Planilhas",
    "subtopic": "Referências",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Na célula C2 de uma planilha está a fórmula `=$A2*B$1`. Ela é copiada para a célula D4. Qual fórmula aparecerá em D4?",
    "alternatives": [
      {
        "id": "A",
        "text": "=$A2*B$1"
      },
      {
        "id": "B",
        "text": "=$A4*C$1"
      },
      {
        "id": "C",
        "text": "=A4*C1"
      },
      {
        "id": "D",
        "text": "=$B4*C$3"
      }
    ],
    "correctAnswer": "B",
    "explanation": "O deslocamento é de uma coluna à direita e duas linhas abaixo. Em `$A2`, a coluna A fica fixa e a linha passa de 2 para 4. Em `B$1`, a coluna passa de B para C e a linha 1 permanece fixa.",
    "alternativeExplanations": {
      "A": "Ignora as partes relativas das duas referências.",
      "B": "Correta. O resultado respeita os componentes fixos e relativos.",
      "C": "Remove os cifrões, mudando o tipo de referência.",
      "D": "Move também a coluna A e a linha 1, embora estejam fixas."
    },
    "tags": [
      "planilhas",
      "referencia-absoluta",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "planilhas",
      "referencias-mistas",
      "rastreio-de-formula"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-a-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Banco de dados",
    "subtopic": "Chaves",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Uma tabela `matriculas` registra alunos inscritos em disciplinas. Um aluno pode cursar várias disciplinas e uma disciplina pode conter vários alunos, mas o mesmo aluno não pode ser matriculado duas vezes na mesma disciplina. Qual chave representa diretamente essa regra?",
    "alternatives": [
      {
        "id": "A",
        "text": "Somente `aluno_id` como chave primária"
      },
      {
        "id": "B",
        "text": "Somente `disciplina_id` como chave primária"
      },
      {
        "id": "C",
        "text": "O par (`aluno_id`, `disciplina_id`) como chave composta ou restrição de unicidade equivalente"
      },
      {
        "id": "D",
        "text": "O nome do aluno como única chave, mesmo que existam homônimos"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A regra de negócio exige unicidade da combinação aluno-disciplina. Cada coluna isoladamente precisa poder se repetir para representar a relação muitos-para-muitos.",
    "alternativeExplanations": {
      "A": "Impediria que o mesmo aluno aparecesse em mais de uma disciplina.",
      "B": "Impediria que uma disciplina tivesse vários alunos.",
      "C": "Correta. A combinação identifica unicamente cada matrícula.",
      "D": "Nomes podem se repetir e não representam a relação entre aluno e disciplina."
    },
    "tags": [
      "banco-de-dados",
      "chave-primaria",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "banco-de-dados",
      "chaves",
      "modelagem-relacional"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-a-04",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Algoritmos",
    "subtopic": "Controle",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Considere o pseudocódigo:\n\n`total = 0`\n`para i de 1 até 4:`\n`    para j de 1 até i:`\n`        total = total + j`\n\nQual será o valor de `total` ao final?",
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
        "text": "20"
      },
      {
        "id": "D",
        "text": "24"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Para i=1 soma-se 1; para i=2, 1+2=3; para i=3, 1+2+3=6; para i=4, 1+2+3+4=10. Logo, total = 1+3+6+10 = 20.",
    "alternativeExplanations": {
      "A": "10 é apenas a soma executada na última passagem do laço externo.",
      "B": "Esse valor não considera corretamente todas as iterações acumuladas.",
      "C": "Correta. O acumulador recebe 1, depois 3, depois 6 e depois 10.",
      "D": "Superestima o número ou o valor das somas realizadas."
    },
    "tags": [
      "algoritmos",
      "repeticao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "algoritmos",
      "estruturas-de-repeticao",
      "rastreio-de-execucao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-mc-a-05",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Hardware",
    "subtopic": "Memória",
    "difficulty": "avancado",
    "type": "multiple-choice",
    "statement": "Um computador possui 4 GB de RAM e apresenta uso intenso de memória virtual ao executar uma aplicação que trabalha frequentemente com um conjunto de dados de 7 GB. Qual alteração tende a reduzir mais diretamente a paginação para o armazenamento, mantendo o restante do sistema igual?",
    "alternatives": [
      {
        "id": "A",
        "text": "Aumentar a RAM para uma capacidade capaz de comportar melhor o conjunto de trabalho."
      },
      {
        "id": "B",
        "text": "Trocar o mouse por um modelo com maior taxa de atualização."
      },
      {
        "id": "C",
        "text": "Aumentar a resolução do monitor."
      },
      {
        "id": "D",
        "text": "Renomear o arquivo da aplicação."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Quando o conjunto de trabalho excede significativamente a RAM disponível, o sistema pode transferir páginas entre RAM e armazenamento com frequência. Aumentar a memória física disponível tende a reduzir essa pressão.",
    "alternativeExplanations": {
      "A": "Correta. Ataca diretamente o gargalo de capacidade de memória física descrito.",
      "B": "O periférico não altera a capacidade de memória do sistema.",
      "C": "A resolução da tela não resolve a pressão causada pelo conjunto de dados da aplicação.",
      "D": "O nome do arquivo não interfere no gerenciamento de páginas de memória."
    },
    "tags": [
      "hardware",
      "memoria",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "hardware",
      "memoria",
      "memoria-virtual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-01",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Banco de dados",
    "subtopic": "Chaves",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Adicionar uma coluna `id` autoincremental como chave primária em `matriculas` garante, por si só, que o mesmo par (`aluno_id`, `disciplina_id`) nunca seja inserido duas vezes.",
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
    "explanation": "A chave `id` garante unicidade apenas de seu próprio valor. Para impedir matrículas duplicadas, é necessária também uma restrição de unicidade sobre (`aluno_id`, `disciplina_id`) ou uma chave composta equivalente.",
    "alternativeExplanations": {
      "V": "Incorreto. Registros diferentes podem ter IDs distintos e repetir o mesmo aluno e disciplina.",
      "F": "Correto. A regra de negócio precisa de uma restrição própria além da chave substituta."
    },
    "tags": [
      "banco-de-dados",
      "chave-primaria",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "banco-de-dados",
      "chaves",
      "integridade-de-dados"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-02",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Algoritmos",
    "subtopic": "Controle",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "No pseudocódigo `i = 1; enquanto i < 20: i = i * 2`, o corpo do laço é executado cinco vezes.",
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
    "explanation": "Os valores de i no início das iterações são 1, 2, 4, 8 e 16. Depois da quinta execução, i passa a 32 e a condição `i < 20` se torna falsa.",
    "alternativeExplanations": {
      "V": "Correto. Há cinco avaliações verdadeiras da condição antes de i alcançar 32.",
      "F": "Incorreto. Contar apenas os valores finais pode levar a erro; o corpo executa com i igual a 1, 2, 4, 8 e 16."
    },
    "tags": [
      "algoritmos",
      "repeticao",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "algoritmos",
      "estruturas-de-repeticao",
      "analise-de-execucao"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-03",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Hardware",
    "subtopic": "Memória",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Quando a RAM está esgotada, o uso de memória virtual em SSD oferece necessariamente o mesmo desempenho que manter os mesmos dados diretamente na RAM.",
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
    "explanation": "Memória virtual permite ampliar o espaço endereçável usando armazenamento secundário, mas acesso a SSD continua muito mais lento e com características diferentes de acesso à RAM. Paginação intensa pode degradar bastante o desempenho.",
    "alternativeExplanations": {
      "V": "Incorreto. Capacidade adicional por memória virtual não equivale a desempenho de RAM física.",
      "F": "Correto. Memória virtual é um mecanismo de gerenciamento e não uma substituição de desempenho equivalente à RAM."
    },
    "tags": [
      "hardware",
      "memoria",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "hardware",
      "memoria",
      "memoria-virtual"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-04",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Software",
    "subtopic": "Licenciamento",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma licença de código aberto necessariamente proíbe que o software seja vendido ou utilizado em atividade comercial.",
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
    "explanation": "Licenças de código aberto podem permitir uso e distribuição comerciais. O que deve ser observado são as condições específicas da licença, como obrigações de atribuição, disponibilização de código em certas distribuições ou preservação de avisos.",
    "alternativeExplanations": {
      "V": "Incorreto. Código aberto não significa proibição geral de uso comercial.",
      "F": "Correto. É a licença específica que define as condições aplicáveis."
    },
    "tags": [
      "software",
      "codigo-aberto",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "software",
      "licenciamento",
      "analise-de-licenca"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-05",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Sistemas operacionais",
    "subtopic": "Processos",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Em escalonamento Round-Robin, reduzir muito o quantum de tempo pode aumentar a frequência de trocas de contexto e, portanto, o overhead do sistema.",
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
    "explanation": "No Round-Robin, processos recebem fatias de tempo. Quanto menor o quantum, mais frequentemente o sistema pode precisar interromper um processo e alternar para outro, elevando o custo das trocas de contexto.",
    "alternativeExplanations": {
      "V": "Correto. Um quantum pequeno melhora a frequência de alternância, mas pode aumentar o overhead.",
      "F": "Incorreto. O tamanho do quantum influencia diretamente a frequência potencial de preempções e trocas."
    },
    "tags": [
      "sistema-operacional",
      "processos",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "sistemas-operacionais",
      "processos",
      "escalonamento"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-06",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Internet",
    "subtopic": "Web",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Se uma página usa HTTPS e apresenta certificado válido, pode-se concluir que qualquer dado digitado nela será usado de forma legítima e que o site não pode ser uma página de phishing.",
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
    "explanation": "HTTPS fornece proteção criptográfica do canal e ajuda a autenticar o domínio apresentado pelo certificado, mas um atacante pode operar um domínio próprio com certificado válido. A legitimidade da finalidade e do conteúdo precisa ser avaliada separadamente.",
    "alternativeExplanations": {
      "V": "Incorreto. Certificado válido não transforma automaticamente um domínio malicioso em confiável.",
      "F": "Correto. É necessário verificar domínio, contexto e finalidade, além da segurança do transporte."
    },
    "tags": [
      "internet",
      "https",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "internet",
      "https",
      "avaliacao-de-seguranca"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-07",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Redes",
    "subtopic": "Endereçamento",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "Uma sub-rede IPv4 `192.168.1.0/26` possui 64 endereços no total e, no modelo tradicional, 62 podem ser usados como endereços de hosts, pois um é reservado para a rede e outro para broadcast.",
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
    "explanation": "Uma máscara /26 deixa 6 bits para endereços dentro da sub-rede: 2⁶ = 64 endereços. Descontando endereço de rede e broadcast, restam 62 endereços de host no uso tradicional.",
    "alternativeExplanations": {
      "V": "Correto. O cálculo de tamanho da sub-rede e das reservas resulta em 62 hosts utilizáveis.",
      "F": "Incorreto. /26 corresponde a blocos de 64 endereços, não de 256."
    },
    "tags": [
      "redes",
      "ip",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "redes",
      "enderecamento-ip",
      "cidr"
    ],
    "origin": "nabulab"
  },
  {
    "id": "informatica-vest-v1-vf-a-08",
    "area": "Tecnologia",
    "subject": "informatica",
    "subjectName": "Informática",
    "topic": "Segurança",
    "subtopic": "Engenharia social",
    "difficulty": "avancado",
    "type": "true-false",
    "statement": "A ativação de autenticação em dois fatores torna impossível um ataque de phishing obter acesso à conta do usuário.",
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
    "explanation": "Autenticação em dois fatores aumenta muito a segurança, mas não elimina todos os ataques. Técnicas de engenharia social, roubo de sessão, páginas intermediárias em tempo real e outros métodos podem tentar contornar fatores adicionais.",
    "alternativeExplanations": {
      "V": "Incorreto. A proteção adicional reduz o risco, mas não permite afirmar impossibilidade absoluta.",
      "F": "Correto. Segurança deve ser tratada em camadas, sem considerar um único controle infalível."
    },
    "tags": [
      "seguranca",
      "phishing",
      "vestibulares",
      "avancado"
    ],
    "examTags": [
      "etec",
      "fatec"
    ],
    "educationLevel": "fundamental-e-medio",
    "skills": [
      "seguranca",
      "phishing",
      "autenticacao"
    ],
    "origin": "nabulab"
  }
];
