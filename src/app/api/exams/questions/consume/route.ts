import { NextResponse } from "next/server";

import { recordAuthenticatedAnalyticsEvent } from "@/lib/analytics/server";
import {
  consumeStudentQuestionQuota,
  getCurrentStudentAccess,
} from "@/lib/entitlements/server";

function validKey(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 120;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { examId?: unknown; questionId?: unknown };
    if (!validKey(body.examId) || !validKey(body.questionId)) {
      return NextResponse.json({ error: "Identificação da questão inválida." }, { status: 400 });
    }

    const { userId } = await getCurrentStudentAccess();
    const quota = await consumeStudentQuestionQuota(body.examId, body.questionId);

    if (quota.counted && quota.used === 1) {
      await recordAuthenticatedAnalyticsEvent("first_question_answered", userId, {
        sourceEventKey: `student:${userId}:first-question`,
        path: "/simulado/prova",
      });
    }
    if (quota.counted && quota.limit !== null && quota.used === quota.limit) {
      await recordAuthenticatedAnalyticsEvent("free_question_limit_reached", userId, {
        sourceEventKey: `student:${userId}:free-limit`,
        path: "/simulado/prova",
        properties: { questions: quota.used },
      });
    }

    return NextResponse.json({ quota });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ error: "Sessão expirada. Entre novamente." }, { status: 401 });
    }
    console.error(
      "[student-question-quota] Não foi possível registrar a resposta:",
      error instanceof Error ? error.message : "erro desconhecido",
    );
    return NextResponse.json({ error: "Não foi possível registrar esta resposta." }, { status: 500 });
  }
}
