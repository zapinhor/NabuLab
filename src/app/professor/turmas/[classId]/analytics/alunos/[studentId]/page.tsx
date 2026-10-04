import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { TeacherAnalyticsReport } from "@/components/professor/teacher-analytics-report";
import { parseTeacherFilters } from "@/lib/teacher-analytics";
import { getTeacherAnalytics } from "@/lib/teacher-analytics-server";

export default async function TeacherStudentAnalyticsPage({ params, searchParams }: {
  params: Promise<{ classId: string; studentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { classId, studentId } = await params;
  const filters = parseTeacherFilters(await searchParams);
  const result = await getTeacherAnalytics(classId, filters, studentId);
  if (result.state === "unauthenticated") redirect(`/login?next=${encodeURIComponent(`/professor/turmas/${classId}/analytics`)}`);
  if (result.state === "not_found") notFound();
  const student = result.report.students[0];
  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8 sm:px-6"><div className="mx-auto max-w-7xl">
    <Link href={`/professor/turmas/${classId}/analytics`} className="text-sm font-bold text-blue-700">← Desempenho da turma</Link>
    <h1 className="mt-3 text-3xl font-black">{student?.name ?? "Aluno"}</h1>
    <p className="mt-2 mb-7 text-sm text-slate-600">Resultados somente das atividades em {result.room.public_name}. O histórico Student pessoal não é exibido.</p>
    <TeacherAnalyticsReport classId={classId} report={result.report} filters={filters} studentId={studentId}/>
  </div></main>;
}
