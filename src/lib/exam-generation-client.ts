import type { ExamConfig, ExamMode, ExamSession } from "@/types/exam";
import type { StudentQuestionQuotaStatus } from "@/lib/entitlements";

async function requestSession(body: object): Promise<ExamSession> {
  const response = await fetch("/api/exams/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as { session?: ExamSession; error?: string };
  if (!response.ok || !payload.session) {
    throw new Error(payload.error ?? "Não foi possível gerar o simulado.");
  }
  return payload.session;
}

export function generateManualExam(config: ExamConfig) {
  return requestSession({ kind: "manual", config });
}

export function generateExamFromQuestionIds(
  questionIds: string[],
  shuffleAlternatives: boolean,
  mode: Extract<ExamMode, "review" | "recommended">,
) {
  return requestSession({ kind: "question-ids", questionIds, shuffleAlternatives, mode });
}

export async function getExamQuotaStatus(): Promise<StudentQuestionQuotaStatus> {
  const response = await fetch("/api/exams/generate", { method: "GET", cache: "no-store" });
  const payload = (await response.json()) as { quota?: StudentQuestionQuotaStatus; error?: string };
  if (!response.ok || !payload.quota) {
    throw new Error(payload.error ?? "Não foi possível consultar suas questões gratuitas.");
  }
  return payload.quota;
}

export async function consumeQuestionQuota(examId: string, questionId: string) {
  const response = await fetch("/api/exams/questions/consume", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ examId, questionId }),
  });
  const payload = (await response.json()) as {
    quota?: StudentQuestionQuotaStatus & { allowed: boolean; counted: boolean };
    error?: string;
  };
  if (!response.ok || !payload.quota) {
    throw new Error(payload.error ?? "Não foi possível registrar esta resposta.");
  }
  return payload.quota;
}
