import type { ExamConfig, ExamMode, ExamSession } from "@/types/exam";
import type { DailyExamQuotaStatus } from "@/lib/entitlements";

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

export async function getExamQuotaStatus(): Promise<DailyExamQuotaStatus> {
  const response = await fetch("/api/exams/generate", { method: "GET", cache: "no-store" });
  const payload = (await response.json()) as { quota?: DailyExamQuotaStatus; error?: string };
  if (!response.ok || !payload.quota) {
    throw new Error(payload.error ?? "Não foi possível consultar os simulados de hoje.");
  }
  return payload.quota;
}
