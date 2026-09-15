import { NextResponse } from "next/server";

import {
  consumeDailyExamQuota,
  getCurrentStudentAccess,
  getDailyExamQuotaStatus,
} from "@/lib/entitlements/server";
import { createExamSession, createExamSessionFromQuestionIds } from "@/lib/quiz-engine";
import type { ExamConfig, ExamMode } from "@/types/exam";
import type { ExamSession } from "@/types/exam";
import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";

type GenerateRequest =
  | { kind: "manual"; config: ExamConfig }
  | {
      kind: "question-ids";
      questionIds: string[];
      shuffleAlternatives: boolean;
      mode: Extract<ExamMode, "review" | "recommended">;
    };

function isQuestionMode(value: unknown): value is "review" | "recommended" {
  return value === "review" || value === "recommended";
}

function quotaReachedResponse(dailyLimit: number) {
  return NextResponse.json(
    {
      error:
        `Você usou seus ${dailyLimit} simulados gratuitos de hoje. Novos simulados estarão disponíveis amanhã.`,
    },
    { status: 429 },
  );
}

async function finishGeneration(session: ExamSession, userId: string, isPremium: boolean) {
  const quota = await consumeDailyExamQuota();
  if (quota.allowed && !isPremium) {
    await recordAuthenticatedAnalyticsEvent("free_exam_started", userId, {
      properties: { mode: session.mode, questions: session.questionIds.length },
    });
  }
  return quota.allowed
    ? NextResponse.json({ session, quota })
    : quotaReachedResponse(quota.limit ?? 0);
}

export async function GET() {
  try {
    return NextResponse.json({ quota: await getDailyExamQuotaStatus() });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ error: "Sessão expirada. Entre novamente." }, { status: 401 });
    }
    return NextResponse.json({ error: "Não foi possível consultar os simulados de hoje." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { entitlements, userId } = await getCurrentStudentAccess();
    const isPremium = entitlements.examsPerDay === null;
    const body = (await request.json()) as Partial<GenerateRequest>;

    if (body.kind === "manual" && body.config) {
      const session = createExamSession(body.config, entitlements);
      return session
        ? finishGeneration(session, userId, isPremium)
        : NextResponse.json({ error: "Não há questões disponíveis para essa configuração." }, { status: 422 });
    }

    if (
      body.kind === "question-ids" &&
      Array.isArray(body.questionIds) &&
      isQuestionMode(body.mode)
    ) {
      if (body.mode === "review" && !entitlements.trainErrors) {
        return NextResponse.json({ error: "O treino de erros está disponível no plano Premium." }, { status: 403 });
      }

      const limit =
        body.mode === "recommended" && entitlements.recommendedLimit !== null
          ? Math.min(entitlements.maxQuestionsPerExam, entitlements.recommendedLimit)
          : entitlements.maxQuestionsPerExam;
      const session = createExamSessionFromQuestionIds(
        body.questionIds.slice(0, limit),
        Boolean(body.shuffleAlternatives),
        body.mode,
        entitlements,
      );
      return session
        ? finishGeneration(session, userId, isPremium)
        : NextResponse.json({ error: "Não há questões acessíveis para iniciar este simulado." }, { status: 422 });
    }

    return NextResponse.json({ error: "Configuração de simulado inválida." }, { status: 400 });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ error: "Sessão expirada. Entre novamente." }, { status: 401 });
    }
    const message = error instanceof Error ? error.message : "Não foi possível gerar o simulado.";
    const status = /plano|Premium|quantidade/.test(message) ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
