import { NextResponse } from "next/server";

import { getCurrentStudentAccess } from "@/lib/entitlements/server";
import { gradeExam, verifyExamToken } from "@/lib/exam-grading";
import { consumeApiRateLimit, rateLimitIdentity } from "@/lib/security/api-rate-limit";
import { isRequestBodyTooLarge, isTrustedMutationOrigin } from "@/lib/security/request";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Corrige um simulado entregue. Só aceita provas geradas pelo servidor
 * (token assinado) para o próprio usuário. No plano gratuito, gabarito e
 * explicação aparecem apenas nas questões que a pessoa respondeu.
 */
export async function POST(request: Request) {
  if (!isTrustedMutationOrigin(request)) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }
  if (isRequestBodyTooLarge(request, 256_000)) {
    return NextResponse.json({ error: "Envio muito grande." }, { status: 413 });
  }
  try {
    const { entitlements, userId } = await getCurrentStudentAccess();
    const limit = await consumeApiRateLimit({
      bucketDigest: rateLimitIdentity(request, userId),
      action: "exam_grade",
      limit: 30,
      windowSeconds: 60,
    });
    if (!limit.allowed) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde um instante." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
    }

    const body = (await request.json()) as { token?: unknown; answers?: unknown };
    const session = verifyExamToken(body.token, userId);
    if (!session) {
      return NextResponse.json({ error: "Não foi possível validar este simulado. Gere um novo simulado." }, { status: 400 });
    }
    const answers = body.answers && typeof body.answers === "object" && !Array.isArray(body.answers)
      ? (body.answers as Record<string, unknown>)
      : {};

    let revealIds: Set<string> | null = null;
    if (entitlements.dailyQuestionLimit !== null) {
      const { data, error } = await createAdminClient()
        .from("student_question_usage_events")
        .select("question_id")
        .eq("user_id", userId)
        .eq("exam_id", session.id);
      if (error) throw error;
      revealIds = new Set((data ?? []).map((row) => row.question_id as string));
    }

    return NextResponse.json(gradeExam(session, answers, revealIds));
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ error: "Sessão expirada. Entre novamente." }, { status: 401 });
    }
    console.error("[exam-grade] Falha ao corrigir:", error instanceof Error ? error.message : "erro desconhecido");
    return NextResponse.json({ error: "Não foi possível corrigir o simulado agora. Tente novamente." }, { status: 500 });
  }
}
