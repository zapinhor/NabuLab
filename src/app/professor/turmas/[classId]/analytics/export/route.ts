import type { NextRequest } from "next/server";
import { parseTeacherFilters } from "@/lib/teacher-analytics";
import { teacherAnalyticsCsv, type ExportKind } from "@/lib/teacher-analytics-export";
import { getTeacherAnalytics } from "@/lib/teacher-analytics-server";

export async function GET(request: NextRequest, context: { params: Promise<{ classId: string }> }) {
  const { classId } = await context.params;
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const kind = params.kind;
  if (!["students", "activities", "questions"].includes(kind)) return Response.json({ error: "Exportação inválida." }, { status: 400 });
  const filters = parseTeacherFilters(params);
  const result = await getTeacherAnalytics(classId, filters, params.student || undefined);
  if (result.state === "unauthenticated") return Response.json({ error: "Sessão necessária." }, { status: 401 });
  if (result.state === "not_found") return Response.json({ error: "Relatório não disponível." }, { status: 404 });
  return new Response(teacherAnalyticsCsv(result.report, kind as ExportKind), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="nabulab-${kind}-${filters.from}-${filters.to}.csv"`, "Cache-Control": "private, no-store" },
  });
}
