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
    id: "matematica",
    name: "Matemática",
    area: "Matemática",
    description:
      "Aritmética, porcentagem, proporção, álgebra, geometria, estatística e probabilidade.",
    icon: "📐",
  },

  {
    id: "informatica",
    name: "Informática",
    area: "Tecnologia",
    description:
      "Hardware, software, sistemas operacionais, internet, segurança digital e ferramentas de produtividade.",
    icon: "💻",
  },

  {
    id: "ingles",
    name: "Inglês",
    area: "Linguagens",
    description:
      "Interpretação, vocabulário, gramática, estruturas da língua e compreensão de textos em inglês.",
    icon: "🌐",
  },
];