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
];
