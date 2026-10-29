import type { IconName } from "@/components/ui/icon";
import type {
  SubjectId,
} from "@/types/question";

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  area: string;
  description: string;
  icon: IconName;
}

/*
 * =========================================================
 * MATÉRIAS — NABULAB
 * =========================================================
 */

export const subjects: SubjectInfo[] = [
  {
    id: "portugues",
    name: "Português",
    area: "Linguagens",
    description:
      "Interpretação de texto, gramática, ortografia, pontuação, sintaxe e semântica.",
    icon: "portugues",
  },

  {
    id: "literatura",
    name: "Literatura",
    area: "Linguagens",
    description:
      "Teoria literária, escolas literárias, literatura brasileira, portuguesa e africana em língua portuguesa.",
    icon: "literatura",
  },

  {
    id: "ingles",
    name: "Inglês",
    area: "Linguagens",
    description:
      "Interpretação, vocabulário, gramática, estruturas da língua e compreensão de textos em inglês.",
    icon: "ingles",
  },

  {
    id: "espanhol",
    name: "Espanhol",
    area: "Linguagens",
    description:
      "Compreensão textual, vocabulário, gramática, conectores e variações da língua espanhola.",
    icon: "espanhol",
  },

  {
    id: "arte",
    name: "Arte",
    area: "Linguagens",
    description:
      "História da arte, linguagens visuais, música, teatro, dança, cinema e cultura brasileira.",
    icon: "arte",
  },

  {
    id: "educacao-fisica",
    name: "Educação Física",
    area: "Linguagens",
    description:
      "Cultura corporal, esportes, jogos, lutas, dança, saúde, inclusão e corpo em sociedade.",
    icon: "educacao-fisica",
  },

  {
    id: "matematica",
    name: "Matemática",
    area: "Matemática",
    description:
      "Aritmética, porcentagem, proporção, álgebra, geometria, estatística e probabilidade.",
    icon: "matematica",
  },

  {
    id: "raciocinio-logico",
    name: "Raciocínio Lógico",
    area: "Matemática",
    description:
      "Sequências, proposições, conectivos, equivalências, diagramas e organização lógica de informações.",
    icon: "raciocinio-logico",
  },

  {
    id: "fisica",
    name: "Física",
    area: "Ciências da Natureza",
    description:
      "Movimento, forças, energia, termologia, ondas, óptica, eletricidade e física moderna.",
    icon: "fisica",
  },

  {
    id: "quimica",
    name: "Química",
    area: "Ciências da Natureza",
    description:
      "Estrutura da matéria, reações, soluções, equilíbrio, eletroquímica, química orgânica e ambiental.",
    icon: "quimica",
  },

  {
    id: "biologia",
    name: "Biologia",
    area: "Ciências da Natureza",
    description:
      "Citologia, genética, evolução, ecologia, fisiologia, microbiologia e diversidade dos seres vivos.",
    icon: "biologia",
  },

  {
    id: "ciencias",
    name: "Ciências",
    area: "Ciências da Natureza",
    description:
      "Matéria, energia, corpo humano, seres vivos, Terra, ambiente e saúde no Ensino Fundamental.",
    icon: "ciencias",
  },

  {
    id: "historia",
    name: "História",
    area: "Ciências Humanas",
    description:
      "Processos históricos mundiais e brasileiros, sociedades, conflitos, revoluções e cidadania.",
    icon: "historia",
  },

  {
    id: "geografia",
    name: "Geografia",
    area: "Ciências Humanas",
    description:
      "Espaço geográfico, população, economia, cartografia, geopolítica e questões ambientais.",
    icon: "geografia",
  },

  {
    id: "filosofia",
    name: "Filosofia",
    area: "Ciências Humanas",
    description:
      "Pensamento filosófico, ética, política, conhecimento e autores da Antiguidade à contemporaneidade.",
    icon: "filosofia",
  },

  {
    id: "sociologia",
    name: "Sociologia",
    area: "Ciências Humanas",
    description:
      "Cultura, sociedade, trabalho, desigualdade, Estado, cidadania, identidade e globalização.",
    icon: "sociologia",
  },

  {
    id: "informatica",
    name: "Informática",
    area: "Tecnologia",
    description:
      "Hardware, software, sistemas operacionais, internet, segurança digital e ferramentas de produtividade.",
    icon: "informatica",
  },


  /*
   * =======================================================
   * CONCURSOS BANCÁRIOS (Banco do Brasil, Caixa, Bradesco…)
   * =======================================================
   */

  {
    id: "conhecimentos-bancarios",
    name: "Conhecimentos Bancários",
    area: "Concursos Bancários",
    description:
      "Sistema Financeiro Nacional, política monetária, produtos e serviços bancários, garantias, Pix, FGC e prevenção à lavagem de dinheiro.",
    icon: "gestao-institucional",
  },

  {
    id: "matematica-financeira",
    name: "Matemática Financeira",
    area: "Concursos Bancários",
    description:
      "Juros simples e compostos, taxas equivalentes, descontos, inflação, séries de pagamentos e sistemas de amortização.",
    icon: "tendencia-sobe",
  },

  {
    id: "vendas-negociacao",
    name: "Vendas e Negociação",
    area: "Concursos Bancários",
    description:
      "Técnicas de vendas, negociação, marketing de relacionamento, qualidade no atendimento e direitos do consumidor.",
    icon: "pontos-fortes",
  },

  {
    id: "legislacao-bancaria",
    name: "Atendimento e Legislação Bancária",
    area: "Concursos Bancários",
    description:
      "CDC e súmulas do STJ para bancos, sigilo bancário, LGPD, prevenção à lavagem de dinheiro, ouvidoria, cheque, superendividamento e suitability.",
    icon: "check",
  },

  {
    id: "direito-constitucional",
    name: "Direito Constitucional",
    area: "Concursos Públicos",
    description:
      "Princípios fundamentais, direitos e garantias, remédios constitucionais, organização do Estado, administração pública e processo legislativo.",
    icon: "bandeira",
  },

  {
    id: "direito-administrativo",
    name: "Direito Administrativo",
    area: "Concursos Públicos",
    description:
      "Princípios, organização administrativa, poderes e atos administrativos, licitações, servidores públicos, responsabilidade do Estado e improbidade.",
    icon: "auditoria",
  },

  {
    id: "etica-servico-publico",
    name: "Ética no Serviço Público",
    area: "Concursos Públicos",
    description:
      "Código de Ética do servidor, deveres e proibições, Lei de Acesso à Informação, conflito de interesses, LGPD e combate à corrupção.",
    icon: "check",
  },

  {
    id: "conhecimentos-gerais-correios",
    name: "Conhecimentos Gerais",
    area: "Concursos Correios",
    description:
      "Geografia do Brasil cobrada nos Correios: cartografia, aspectos físicos e biomas, espaço agrário e urbano, população e divisão político-administrativa.",
    icon: "geografia",
  },

  {
    id: "codigo-conduta-correios",
    name: "Código de Conduta dos Correios",
    area: "Concursos Correios",
    description:
      "Código de Conduta Ética e Integridade dos Correios: valores, princípios, compromissos, presentes e brindes, Comissão de Ética e canais de denúncia.",
    icon: "gestao-institucional",
  },

  {
    id: "sms-petrobras",
    name: "Segurança, Meio Ambiente e Saúde (SMS)",
    area: "Concursos Petrobras",
    description:
      "Gestão de riscos, normas regulamentadoras, acidentes de trabalho, prevenção de incêndios, meio ambiente e a política de SMS e as Regras de Ouro da Petrobras.",
    icon: "atencao",
  },

  {
    id: "lei-das-estatais",
    name: "Lei das Estatais",
    area: "Concursos Petrobras",
    description:
      "Lei 13.303/2016: empresas públicas e sociedades de economia mista, governança, integridade, licitações e contratos das estatais.",
    icon: "auditoria",
  },

  /*
   * =======================================================
   * CONCURSOS INSS E POLICIAIS
   * =======================================================
   */

  {
    id: "direito-previdenciario",
    name: "Direito Previdenciário",
    area: "Concursos INSS",
    description:
      "Seguridade social, segurados e dependentes, carência, qualidade de segurado, benefícios do RGPS, BPC, custeio e as regras da EC 103/2019.",
    icon: "gestao-institucional",
  },

  {
    id: "lei-8112",
    name: "Regime Jurídico dos Servidores (Lei 8.112)",
    area: "Concursos INSS",
    description:
      "Provimento, vacância, remoção e redistribuição, direitos e vantagens, licenças, regime disciplinar, sindicância e processo administrativo disciplinar.",
    icon: "auditoria",
  },

  {
    id: "direito-penal-policial",
    name: "Direito Penal (Polícia)",
    area: "Concursos Policiais",
    description:
      "Lei penal, teoria do crime, excludentes, imputabilidade, penas e os crimes contra a pessoa, o patrimônio e a administração pública mais cobrados em PM e PC.",
    icon: "atencao",
  },

  {
    id: "processo-penal-policial",
    name: "Processo Penal (Polícia)",
    area: "Concursos Policiais",
    description:
      "Inquérito policial, prisão em flagrante, prisões cautelares, audiência de custódia, provas, cadeia de custódia, ação penal e termo circunstanciado.",
    icon: "auditoria",
  },

  {
    id: "legislacao-penal-especial",
    name: "Legislação Penal Especial",
    area: "Concursos Policiais",
    description:
      "Lei de Drogas, Estatuto do Desarmamento, crimes hediondos, tortura, abuso de autoridade, Maria da Penha, organizações criminosas, racismo e crimes de trânsito.",
    icon: "atencao",
  },

  {
    id: "direitos-humanos-policial",
    name: "Direitos Humanos (Polícia)",
    area: "Concursos Policiais",
    description:
      "Teoria geral, sistemas global e interamericano, tratados, uso da força e da arma de fogo, abordagem, algemas e garantias do preso.",
    icon: "check",
  },

  {
    id: "criminologia",
    name: "Criminologia",
    area: "Concursos Policiais",
    description:
      "Objeto e método, escolas clássica e positiva, teorias sociológicas do crime, vitimologia, controle social, prevenção e cifras da criminalidade.",
    icon: "pontos-fortes",
  },

  {
    id: "nocoes-logistica",
    name: "Noções de Logística",
    area: "Concursos Correios",
    description:
      "Cadeia de suprimentos, modais de transporte, armazenagem, estoques (PEPS, curva ABC, ponto de pedido, lote econômico), distribuição, última milha, logística reversa e indicadores.",
    icon: "metas",
  },

  {
    id: "nocoes-administracao",
    name: "Noções de Administração",
    area: "Concursos Petrobras",
    description:
      "Funções administrativas, planejamento, SWOT, estruturas organizacionais, liderança, motivação, controle, eficiência e eficácia, PDCA, 5S e ferramentas da qualidade.",
    icon: "gestao-institucional",
  },

  {
    id: "legislacao-transito",
    name: "Legislação de Trânsito",
    area: "DETRAN",
    description:
      "Código de Trânsito Brasileiro: habilitação, normas de circulação, infrações, pontuação, Lei Seca e crimes de trânsito.",
    icon: "auditoria",
  },

  {
    id: "sinalizacao-transito",
    name: "Sinalização de Trânsito",
    area: "DETRAN",
    description:
      "Placas de regulamentação, advertência e indicação, marcas viárias, semáforos, gestos e apitos do agente e a hierarquia da sinalização.",
    icon: "atencao",
  },

  {
    id: "direcao-defensiva",
    name: "Direção Defensiva",
    area: "DETRAN",
    description:
      "Condições adversas, distância de seguimento, aquaplanagem, ponto cego, ultrapassagem segura e noções de mecânica básica.",
    icon: "check",
  },

  {
    id: "primeiros-socorros",
    name: "Primeiros Socorros",
    area: "DETRAN",
    description:
      "Sinalização do local, acionamento do socorro, cuidados com a vítima, hemorragias, queimaduras, fraturas e reanimação.",
    icon: "reforco",
  },

  {
    id: "meio-ambiente-cidadania",
    name: "Meio Ambiente e Cidadania",
    area: "DETRAN",
    description:
      "Poluição do ar e sonora, resíduos, convivência com pedestres e ciclistas, acessibilidade e educação para o trânsito.",
    icon: "geografia",
  },

  {
    id: "oab-etica",
    name: "Ética Profissional (OAB)",
    area: "OAB",
    description:
      "Estatuto da Advocacia (Lei 8.906/94), Código de Ética e Disciplina, prerrogativas, honorários, incompatibilidades e infrações.",
    icon: "check",
  },

  {
    id: "oab-constitucional",
    name: "Direito Constitucional (OAB)",
    area: "OAB",
    description:
      "Direitos fundamentais, remédios constitucionais, organização do Estado e dos Poderes e controle de constitucionalidade.",
    icon: "bandeira",
  },

  {
    id: "oab-civil",
    name: "Direito Civil (OAB)",
    area: "OAB",
    description:
      "Parte geral, negócio jurídico, prescrição, obrigações, contratos, responsabilidade civil, direitos reais, família e sucessões.",
    icon: "gestao-institucional",
  },

  {
    id: "oab-processo-civil",
    name: "Processo Civil (OAB)",
    area: "OAB",
    description:
      "Normas fundamentais, prazos, competência, tutela provisória, procedimento comum, recursos e execução no CPC/2015.",
    icon: "auditoria",
  },

  {
    id: "oab-penal",
    name: "Direito Penal (OAB)",
    area: "OAB",
    description:
      "Aplicação da lei penal, teoria do crime, excludentes, penas, prescrição e crimes contra a pessoa, o patrimônio e a Administração.",
    icon: "atencao",
  },

  {
    id: "oab-processo-penal",
    name: "Processo Penal (OAB)",
    area: "OAB",
    description:
      "Inquérito, ação penal, competência, provas, prisões e cautelares, procedimentos, júri, recursos e Juizados Especiais Criminais.",
    icon: "auditoria",
  },

  {
    id: "oab-administrativo",
    name: "Direito Administrativo (OAB)",
    area: "OAB",
    description:
      "Princípios, atos e poderes administrativos, Administração indireta, licitações, servidores, improbidade e responsabilidade do Estado.",
    icon: "gestao-institucional",
  },

  {
    id: "oab-trabalho",
    name: "Direito do Trabalho (OAB)",
    area: "OAB",
    description:
      "Relação de emprego, jornada, férias, remuneração, estabilidades, extinção do contrato e Reforma Trabalhista.",
    icon: "pontos-fortes",
  },

  {
    id: "oab-processo-trabalho",
    name: "Processo do Trabalho (OAB)",
    area: "OAB",
    description:
      "Competência, audiência, provas, recursos, depósito recursal, execução e procedimentos da CLT após a Reforma Trabalhista.",
    icon: "auditoria",
  },

  {
    id: "oab-tributario",
    name: "Direito Tributário (OAB)",
    area: "OAB",
    description:
      "Conceito e espécies de tributos, competência, princípios, imunidades, crédito tributário, responsabilidade e Reforma Tributária.",
    icon: "tendencia-sobe",
  },

  {
    id: "oab-empresarial",
    name: "Direito Empresarial (OAB)",
    area: "OAB",
    description:
      "Empresário, sociedades, estabelecimento, títulos de crédito, propriedade industrial, falência e recuperação judicial.",
    icon: "gestao-institucional",
  },

  {
    id: "oab-consumidor",
    name: "Direito do Consumidor (OAB)",
    area: "OAB",
    description:
      "Relação de consumo, responsabilidade, vícios, prazos, oferta, publicidade, práticas e cláusulas abusivas e superendividamento.",
    icon: "check",
  },

  {
    id: "oab-direitos-humanos",
    name: "Direitos Humanos (OAB)",
    area: "OAB",
    description:
      "Sistemas global e interamericano, tratados, incorporação no Brasil, TPI e casos contra o Brasil.",
    icon: "bandeira",
  },

  {
    id: "oab-eca",
    name: "ECA (OAB)",
    area: "OAB",
    description:
      "Estatuto da Criança e do Adolescente: direitos fundamentais, adoção, Conselho Tutelar, ato infracional e medidas socioeducativas.",
    icon: "pontos-fortes",
  },

  {
    id: "oab-ambiental",
    name: "Direito Ambiental (OAB)",
    area: "OAB",
    description:
      "Princípios, art. 225, responsabilidade, licenciamento, unidades de conservação, Código Florestal e resíduos sólidos.",
    icon: "geografia",
  },

  {
    id: "oab-internacional",
    name: "Direito Internacional (OAB)",
    area: "OAB",
    description:
      "LINDB, tratados, cooperação jurídica, imunidade de jurisdição, extradição, migração e Mercosul.",
    icon: "geografia",
  },

  {
    id: "oab-filosofia",
    name: "Filosofia do Direito (OAB)",
    area: "OAB",
    description:
      "Jusnaturalismo, positivismo, pós-positivismo, teorias da justiça e grandes pensadores do direito.",
    icon: "filosofia",
  },
];
