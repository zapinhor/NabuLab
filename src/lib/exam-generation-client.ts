import type { ExamConfig, ExamMode, ExamSession } from "@/types/exam";
import type { StudentQuestionQuotaStatus } from "@/lib/entitlements";
import type { Question } from "@/types/question";

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

/** Erro de correção com mensagem pronta para mostrar ao aluno. */
export class ExamGradeError extends Error {}

export type GradedQuestion = Question & { locked?: boolean };

/** Prévia do Premium devolvida pelo servidor para quem está no plano gratuito. */
export type PremiumUpsell = { price: string; regularPrice: string | null; founder: boolean; firstExam: boolean };

/** Envia as respostas para o servidor corrigir; devolve as questões com gabarito. */
export async function gradeExamOnServer(token: string, answers: Record<string, string>) {
  let response: Response;
  try {
    response = await fetch("/api/exams/grade", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, answers }),
    });
  } catch {
    throw new ExamGradeError("Sem conexão para corrigir o simulado. Verifique a internet e tente enviar de novo.");
  }
  const payload = (await response.json().catch(() => ({}))) as {
    questions?: GradedQuestion[];
    correct?: number;
    answered?: number;
    total?: number;
    upsell?: PremiumUpsell | null;
    error?: string;
  };
  if (!response.ok || !Array.isArray(payload.questions)) {
    throw new ExamGradeError(payload.error ?? "Não foi possível corrigir o simulado agora. Tente novamente.");
  }
  return {
    questions: payload.questions,
    correct: payload.correct ?? 0,
    answered: payload.answered ?? 0,
    total: payload.total ?? payload.questions.length,
    upsell: payload.upsell ?? null,
  };
}

/** Oferta vigente do Premium (só vem para o plano gratuito). */
export type PremiumOffer = { price: string; regularPrice: string | null; founder: boolean };

export async function getQuotaAndOffer(): Promise<{ quota: StudentQuestionQuotaStatus; offer: PremiumOffer | null }> {
  const response = await fetch("/api/exams/generate", { method: "GET", cache: "no-store" });
  const payload = (await response.json()) as { quota?: StudentQuestionQuotaStatus; offer?: PremiumOffer | null; error?: string };
  if (!response.ok || !payload.quota) {
    throw new Error(payload.error ?? "Não foi possível consultar suas questões gratuitas.");
  }
  return { quota: payload.quota, offer: payload.offer ?? null };
}
