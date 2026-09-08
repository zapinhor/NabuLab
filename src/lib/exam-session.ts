import type {
  ExamMode,
  ExamProgress,
  ExamSession,
  ExamSubmission,
} from "@/types/exam";

const SESSION_KEY =
  "fisio-simulado-current-session";

const PROGRESS_KEY =
  "fisio-simulado-current-progress";

const SUBMISSION_KEY =
  "fisio-simulado-current-submission";

function isExamMode(
  value: unknown
): value is ExamMode {
  return (
    value === "manual" ||
    value === "review" ||
    value === "recommended"
  );
}

/*
 * =========================================================
 * SESSÃO
 * =========================================================
 */

export function saveExamSession(
  session: ExamSession
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  /*
   * A partir da Fase 14 NÃO aceitamos
   * mais sessões sem modalidade.
   *
   * Isso evita que um problema seja
   * silenciosamente convertido em manual.
   */

  if (
    !isExamMode(
      session.mode
    )
  ) {
    console.error(
      "Tentativa de salvar sessão sem mode:",
      session
    );

    throw new Error(
      "A sessão do simulado não possui uma modalidade válida."
    );
  }

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(
      session
    )
  );
}

export function loadExamSession():
  ExamSession | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const raw =
    sessionStorage.getItem(
      SESSION_KEY
    );

  if (!raw) {
    return null;
  }

  try {
    const parsed =
      JSON.parse(
        raw
      ) as Partial<ExamSession>;

    if (
      !parsed.id ||
      !parsed.createdAt ||
      !parsed.config ||
      !Array.isArray(
        parsed.questionIds
      )
    ) {
      console.error(
        "Sessão inválida:",
        parsed
      );

      return null;
    }

    /*
     * IMPORTANTE:
     *
     * Não existe mais:
     *
     * mode ?? "manual"
     *
     * Se mode sumir, queremos descobrir
     * o erro em vez de mascará-lo.
     */

    if (
      !isExamMode(
        parsed.mode
      )
    ) {
      console.error(
        "Sessão encontrada sem mode:",
        parsed
      );

      return null;
    }

    return {
      id:
        parsed.id,

      createdAt:
        parsed.createdAt,

      mode:
        parsed.mode,

      config:
        parsed.config,

      questionIds:
        parsed.questionIds,

      alternativeOrders:
        parsed.alternativeOrders ??
        {},
    };
  } catch (error) {
    console.error(
      "Erro ao carregar sessão:",
      error
    );

    return null;
  }
}

/*
 * =========================================================
 * PROGRESSO
 * =========================================================
 */

export function createInitialExamProgress(
  sessionId: string
): ExamProgress {
  return {
    sessionId,

    startedAt:
      new Date().toISOString(),

    currentIndex:
      0,

    answers: {},

    reviewQuestionIds: [],
  };
}

export function saveExamProgress(
  progress: ExamProgress
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify(
      progress
    )
  );
}

export function loadExamProgress():
  ExamProgress | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const raw =
    sessionStorage.getItem(
      PROGRESS_KEY
    );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(
      raw
    ) as ExamProgress;
  } catch (error) {
    console.error(
      "Erro ao carregar progresso:",
      error
    );

    return null;
  }
}

/*
 * =========================================================
 * SUBMISSÃO
 * =========================================================
 */

export function saveExamSubmission(
  submission: ExamSubmission
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.setItem(
    SUBMISSION_KEY,
    JSON.stringify(
      submission
    )
  );
}

export function loadExamSubmission():
  ExamSubmission | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const raw =
    sessionStorage.getItem(
      SUBMISSION_KEY
    );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(
      raw
    ) as ExamSubmission;
  } catch (error) {
    console.error(
      "Erro ao carregar submissão:",
      error
    );

    return null;
  }
}

/*
 * =========================================================
 * LIMPEZAS
 * =========================================================
 */

export function clearExamSubmission() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.removeItem(
    SUBMISSION_KEY
  );
}

export function clearExamProgress() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.removeItem(
    PROGRESS_KEY
  );
}

export function clearExamSession() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.removeItem(
    SESSION_KEY
  );
}

export function clearCurrentExam() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  sessionStorage.removeItem(
    SESSION_KEY
  );

  sessionStorage.removeItem(
    PROGRESS_KEY
  );

  sessionStorage.removeItem(
    SUBMISSION_KEY
  );
}