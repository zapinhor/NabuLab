import type { IconName } from "@/components/ui/icon";
import type {
  ExamMode,
} from "@/types/exam";

/*
 * =========================================================
 * INFORMAÇÕES VISUAIS DAS MODALIDADES
 * =========================================================
 */

export interface ExamModeInfo {
  mode: ExamMode;

  label: string;

  shortLabel: string;

  icon: IconName;

  badgeClass: string;

  cardClass: string;

  textClass: string;
}

/*
 * =========================================================
 * NORMALIZAR MODALIDADE
 * =========================================================
 *
 * Provas antigas foram criadas antes da Fase 14
 * e podem não possuir "mode".
 *
 * Por compatibilidade, tratamos essas provas
 * antigas como manuais.
 */

export function normalizeExamMode(
  mode?: ExamMode
): ExamMode {
  if (
    mode === "review" ||
    mode === "recommended" ||
    mode === "manual"
  ) {
    return mode;
  }

  return "manual";
}

/*
 * =========================================================
 * DADOS VISUAIS
 * =========================================================
 */

export function getExamModeInfo(
  mode?: ExamMode
): ExamModeInfo {
  const normalized =
    normalizeExamMode(
      mode
    );

  switch (normalized) {
    case "review":
      return {
        mode:
          "review",

        label:
          "Revisão de erros",

        shortLabel:
          "Revisão",

        icon:
          "treinar-erros",

        badgeClass:
          "border-[#F4C430]/50 bg-[#FFF7DA] text-[#8A6A00]",

        cardClass:
          "border-[#F4C430]/50 bg-[#FFF7DA]",

        textClass:
          "text-[#8A6A00]",
      };

    case "recommended":
      return {
        mode:
          "recommended",

        label:
          "Simulado recomendado",

        shortLabel:
          "Recomendado",

        icon:
          "recomendado",

        badgeClass:
          "border-blue-200 bg-blue-50 text-[#0B2D6B]",

        cardClass:
          "border-blue-200 bg-blue-50",

        textClass:
          "text-[#0B2D6B]",
      };

    default:
      return {
        mode:
          "manual",

        label:
          "Simulado manual",

        shortLabel:
          "Manual",

        icon:
          "modo-manual",

        badgeClass:
          "border-blue-200 bg-blue-50 text-blue-700",

        cardClass:
          "border-blue-200 bg-blue-50",

        textClass:
          "text-blue-700",
      };
  }
}