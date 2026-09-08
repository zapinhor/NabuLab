import type {
  StudyConsistency,
} from "@/lib/study-consistency";

import type {
  StudyGoalProgress,
  StudyGoals,
  StudyGoalsProgress,
} from "@/types/study-goals";

/*
 * =========================================================
 * STORAGE
 * =========================================================
 */

const STUDY_GOALS_KEY =
  "fisio-simulado-study-goals";

/*
 * =========================================================
 * METAS PADRÃO
 * =========================================================
 */

export const DEFAULT_STUDY_GOALS:
  StudyGoals = {
  weeklyQuestions: 100,

  weeklyExams: 5,

  weeklyStudyDays: 4,

  updatedAt:
    new Date().toISOString(),
};

/*
 * =========================================================
 * LIMITES
 * =========================================================
 */

const LIMITS = {
  weeklyQuestions: {
    min: 1,
    max: 1000,
  },

  weeklyExams: {
    min: 1,
    max: 100,
  },

  weeklyStudyDays: {
    min: 1,
    max: 7,
  },
};

/*
 * =========================================================
 * GARANTIR NÚMERO VÁLIDO
 * =========================================================
 */

function clampInteger(
  value: unknown,
  min: number,
  max: number,
  fallback: number
) {
  const number =
    Number(value);

  if (
    !Number.isFinite(
      number
    )
  ) {
    return fallback;
  }

  const rounded =
    Math.round(
      number
    );

  return Math.min(
    max,
    Math.max(
      min,
      rounded
    )
  );
}

/*
 * =========================================================
 * NORMALIZAR METAS
 * =========================================================
 */

export function normalizeStudyGoals(
  goals:
    Partial<StudyGoals>
): StudyGoals {
  return {
    weeklyQuestions:
      clampInteger(
        goals.weeklyQuestions,
        LIMITS
          .weeklyQuestions
          .min,
        LIMITS
          .weeklyQuestions
          .max,
        DEFAULT_STUDY_GOALS
          .weeklyQuestions
      ),

    weeklyExams:
      clampInteger(
        goals.weeklyExams,
        LIMITS
          .weeklyExams
          .min,
        LIMITS
          .weeklyExams
          .max,
        DEFAULT_STUDY_GOALS
          .weeklyExams
      ),

    weeklyStudyDays:
      clampInteger(
        goals.weeklyStudyDays,
        LIMITS
          .weeklyStudyDays
          .min,
        LIMITS
          .weeklyStudyDays
          .max,
        DEFAULT_STUDY_GOALS
          .weeklyStudyDays
      ),

    updatedAt:
      goals.updatedAt ??
      new Date().toISOString(),
  };
}

/*
 * =========================================================
 * CARREGAR
 * =========================================================
 */

export function loadStudyGoals():
  StudyGoals {
  if (
    typeof window ===
    "undefined"
  ) {
    return {
      ...DEFAULT_STUDY_GOALS,
    };
  }

  const raw =
    localStorage.getItem(
      STUDY_GOALS_KEY
    );

  if (!raw) {
    return {
      ...DEFAULT_STUDY_GOALS,
    };
  }

  try {
    const parsed =
      JSON.parse(
        raw
      ) as Partial<StudyGoals>;

    return normalizeStudyGoals(
      parsed
    );
  } catch (error) {
    console.error(
      "Erro ao carregar metas:",
      error
    );

    return {
      ...DEFAULT_STUDY_GOALS,
    };
  }
}

/*
 * =========================================================
 * SALVAR
 * =========================================================
 */

export function saveStudyGoals(
  goals:
    Partial<StudyGoals>
): StudyGoals {
  const normalized =
    normalizeStudyGoals({
      ...goals,

      updatedAt:
        new Date().toISOString(),
    });

  if (
    typeof window !==
    "undefined"
  ) {
    localStorage.setItem(
      STUDY_GOALS_KEY,
      JSON.stringify(
        normalized
      )
    );
  }

  return normalized;
}

/*
 * =========================================================
 * RESTAURAR PADRÃO
 * =========================================================
 */

export function resetStudyGoals():
  StudyGoals {
  const defaults = {
    ...DEFAULT_STUDY_GOALS,

    updatedAt:
      new Date().toISOString(),
  };

  if (
    typeof window !==
    "undefined"
  ) {
    localStorage.setItem(
      STUDY_GOALS_KEY,
      JSON.stringify(
        defaults
      )
    );
  }

  return defaults;
}

/*
 * =========================================================
 * PROGRESSO INDIVIDUAL
 * =========================================================
 */

function buildGoalProgress(
  current: number,
  target: number
): StudyGoalProgress {
  const safeTarget =
    Math.max(
      1,
      target
    );

  const percentage =
    Math.round(
      (
        current /
        safeTarget
      ) *
        100
    );

  return {
    current,

    target:
      safeTarget,

    percentage,

    completed:
      current >=
      safeTarget,
  };
}

/*
 * =========================================================
 * PROGRESSO GERAL
 * =========================================================
 */

export function calculateStudyGoalsProgress(
  consistency:
    StudyConsistency,
  goals:
    StudyGoals
): StudyGoalsProgress {
  const questions =
    buildGoalProgress(
      consistency
        .questionsThisWeek,

      goals.weeklyQuestions
    );

  const exams =
    buildGoalProgress(
      consistency
        .examsThisWeek,

      goals.weeklyExams
    );

  const studyDays =
    buildGoalProgress(
      consistency
        .activeDaysThisWeek,

      goals.weeklyStudyDays
    );

  const completedGoals =
    [
      questions,
      exams,
      studyDays,
    ].filter(
      (goal) =>
        goal.completed
    ).length;

  return {
    questions,

    exams,

    studyDays,

    completedGoals,

    totalGoals: 3,
  };
}