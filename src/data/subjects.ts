import { SubjectId } from "@/types/question";

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  area: string;
  description: string;
  icon: string;
}

export const subjects: SubjectInfo[] = [
  {
    id: "sistema-respiratorio",
    name: "Sistema Respiratório",
    area: "Anatomia Funcional",
    description:
      "Vias aéreas, pulmões, pleuras, alvéolos, ventilação e mecânica respiratória.",
    icon: "🫁",
  },

  {
    id: "homeostase",
    name: "Homeostase",
    area: "Fisiologia Humana",
    description:
      "Feedback, meio interno, receptores, efetores e controle fisiológico.",
    icon: "⚖️",
  },

  {
    id: "fisiologia-celular",
    name: "Fisiologia Celular",
    area: "Fisiologia Humana",
    description:
      "Membranas, transporte celular, osmose, gradientes e potenciais elétricos.",
    icon: "🔬",
  },

  {
    id: "sistema-nervoso",
    name: "Sistema Nervoso",
    area: "Fisiologia Humana",
    description:
      "SNC, SNP, neurônios, sinapses, reflexos e controle motor.",
    icon: "🧠",
  },

  {
    id: "biologia-celular",
    name: "Biologia Celular",
    area: "Bioquímica Fundamental",
    description:
      "Organelas, ATP, mitocôndrias, síntese proteica e metabolismo celular.",
    icon: "🧬",
  },

  {
    id: "bioquimica-agua",
    name: "Bioquímica da Água",
    area: "Bioquímica Fundamental",
    description:
      "Polaridade, pH, tampões, osmolaridade e equilíbrio ácido-base.",
    icon: "💧",
  },
];