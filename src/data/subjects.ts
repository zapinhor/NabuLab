import type {
  SubjectId,
} from "@/types/question";

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  area: string;
  description: string;
  icon: string;
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
    icon: "📖",
  },

  {
    id: "literatura",
    name: "Literatura",
    area: "Linguagens",
    description:
      "Teoria literária, escolas literárias, literatura brasileira, portuguesa e africana em língua portuguesa.",
    icon: "📚",
  },

  {
    id: "ingles",
    name: "Inglês",
    area: "Linguagens",
    description:
      "Interpretação, vocabulário, gramática, estruturas da língua e compreensão de textos em inglês.",
    icon: "🌐",
  },

  {
    id: "espanhol",
    name: "Espanhol",
    area: "Linguagens",
    description:
      "Compreensão textual, vocabulário, gramática, conectores e variações da língua espanhola.",
    icon: "🗣️",
  },

  {
    id: "arte",
    name: "Arte",
    area: "Linguagens",
    description:
      "História da arte, linguagens visuais, música, teatro, dança, cinema e cultura brasileira.",
    icon: "🎨",
  },

  {
    id: "educacao-fisica",
    name: "Educação Física",
    area: "Linguagens",
    description:
      "Cultura corporal, esportes, jogos, lutas, dança, saúde, inclusão e corpo em sociedade.",
    icon: "🏃",
  },

  {
    id: "matematica",
    name: "Matemática",
    area: "Matemática",
    description:
      "Aritmética, porcentagem, proporção, álgebra, geometria, estatística e probabilidade.",
    icon: "📐",
  },

  {
    id: "raciocinio-logico",
    name: "Raciocínio Lógico",
    area: "Matemática",
    description:
      "Sequências, proposições, conectivos, equivalências, diagramas e organização lógica de informações.",
    icon: "🧩",
  },

  {
    id: "fisica",
    name: "Física",
    area: "Ciências da Natureza",
    description:
      "Movimento, forças, energia, termologia, ondas, óptica, eletricidade e física moderna.",
    icon: "⚛️",
  },

  {
    id: "quimica",
    name: "Química",
    area: "Ciências da Natureza",
    description:
      "Estrutura da matéria, reações, soluções, equilíbrio, eletroquímica, química orgânica e ambiental.",
    icon: "🧪",
  },

  {
    id: "biologia",
    name: "Biologia",
    area: "Ciências da Natureza",
    description:
      "Citologia, genética, evolução, ecologia, fisiologia, microbiologia e diversidade dos seres vivos.",
    icon: "🧬",
  },

  {
    id: "ciencias",
    name: "Ciências",
    area: "Ciências da Natureza",
    description:
      "Matéria, energia, corpo humano, seres vivos, Terra, ambiente e saúde no Ensino Fundamental.",
    icon: "🔬",
  },

  {
    id: "historia",
    name: "História",
    area: "Ciências Humanas",
    description:
      "Processos históricos mundiais e brasileiros, sociedades, conflitos, revoluções e cidadania.",
    icon: "🏛️",
  },

  {
    id: "geografia",
    name: "Geografia",
    area: "Ciências Humanas",
    description:
      "Espaço geográfico, população, economia, cartografia, geopolítica e questões ambientais.",
    icon: "🌎",
  },

  {
    id: "filosofia",
    name: "Filosofia",
    area: "Ciências Humanas",
    description:
      "Pensamento filosófico, ética, política, conhecimento e autores da Antiguidade à contemporaneidade.",
    icon: "💭",
  },

  {
    id: "sociologia",
    name: "Sociologia",
    area: "Ciências Humanas",
    description:
      "Cultura, sociedade, trabalho, desigualdade, Estado, cidadania, identidade e globalização.",
    icon: "👥",
  },

  {
    id: "informatica",
    name: "Informática",
    area: "Tecnologia",
    description:
      "Hardware, software, sistemas operacionais, internet, segurança digital e ferramentas de produtividade.",
    icon: "💻",
  },

];
