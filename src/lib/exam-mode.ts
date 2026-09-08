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

  icon: string;

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
          "🎯",

        badgeClass:
          "border-violet-200 bg-violet-50 text-violet-700",

        cardClass:
          "border-violet-200 bg-violet-50",

        textClass:
          "text-violet-700",
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
          "✨",

        badgeClass:
          "border-indigo-200 bg-indigo-50 text-indigo-700",

        cardClass:
          "border-indigo-200 bg-indigo-50",

        textClass:
          "text-indigo-700",
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
          "📝",

        badgeClass:
          "border-blue-200 bg-blue-50 text-blue-700",

        cardClass:
          "border-blue-200 bg-blue-50",

        textClass:
          "text-blue-700",
      };
  }
}