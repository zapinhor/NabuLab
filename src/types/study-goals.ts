/*
 * =========================================================
 * METAS DE ESTUDO
 * =========================================================
 */

export interface StudyGoals {
  weeklyQuestions: number;

  weeklyExams: number;

  weeklyStudyDays: number;

  updatedAt: string;
}

/*
 * =========================================================
 * PROGRESSO DE UMA META
 * =========================================================
 */

export interface StudyGoalProgress {
  current: number;

  target: number;

  percentage: number;

  completed: boolean;
}

/*
 * =========================================================
 * RESUMO DAS METAS
 * =========================================================
 */

export interface StudyGoalsProgress {
  questions:
    StudyGoalProgress;

  exams:
    StudyGoalProgress;

  studyDays:
    StudyGoalProgress;

  completedGoals: number;

  totalGoals: number;
}