import type { Question } from "@/types/question";
import type { PremiumUpsell } from "@/lib/exam-generation-client";
import type {
  ExamMode,
  ExamProgress,
  ExamSession,
  ExamSubmission,
} from "@/types/exam";

/*
 * =========================================================
 * STORAGE — NABULAB
 * =========================================================
 *
 * Estas chaves são exclusivas do NabuLab.
 *
 * * As sessões de versões anteriores continuam
 * preservadas no navegador.
 * =========================================================
 */

const SESSION_KEY =
  "nabulab:exam:current-session:v1";

const PROGRESS_KEY =
  "nabulab:exam:current-progress:v1";

const SUBMISSION_KEY =
  "nabulab:exam:current-submission:v1";
const GRADED_KEY =
  "nabulab:exam:current-graded:v1";

/*
 * =========================================================
 * VALIDAR MODALIDADE
 * =========================================================
 */

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
   * Não aceitamos sessões sem modalidade válida.
   *
   * Isso evita que problemas de criação da sessão
   * sejam silenciosamente convertidos em outro modo.
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
     * Se a modalidade estiver ausente ou inválida,
     * a sessão é rejeitada.
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
      questions:
        Array.isArray(parsed.questions)
          ? parsed.questions
          : undefined,
      token:
        typeof parsed.token === "string"
          ? parsed.token
          : undefined,
    };
  } catch (error) {
    console.error(
      "Erro ao carregar sessão do NabuLab:",
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
      "Erro ao carregar progresso do NabuLab:",
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
      "Erro ao carregar submissão do NabuLab:",
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

  sessionStorage.removeItem(
    GRADED_KEY
  );
}
/*
 * =========================================================
 * CORREÇÃO DO SERVIDOR
 * =========================================================
 *
 * Questões corrigidas (com gabarito) da última prova entregue,
 * para a tela de resultado.
 */

export function saveGradedQuestions(
  sessionId: string,
  questions: Question[],
  upsell: PremiumUpsell | null = null
) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    GRADED_KEY,
    JSON.stringify({ sessionId, questions, upsell })
  );
}

/** Prévia do Premium da última correção (só plano gratuito). */
export function loadGradedUpsell(
  sessionId: string
): PremiumUpsell | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(GRADED_KEY) ?? "null"
    ) as { sessionId?: string; upsell?: PremiumUpsell | null } | null;
    return parsed?.sessionId === sessionId ? parsed.upsell ?? null : null;
  } catch {
    return null;
  }
}

export function loadGradedQuestions(
  sessionId: string
): (Question & { locked?: boolean })[] | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(GRADED_KEY) ?? "null"
    ) as { sessionId?: string; questions?: Question[] } | null;
    return parsed?.sessionId === sessionId && Array.isArray(parsed.questions)
      ? parsed.questions
      : null;
  } catch {
    return null;
  }
}
