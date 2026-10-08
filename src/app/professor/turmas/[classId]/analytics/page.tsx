import { notFound, redirect } from "next/navigation";
import { TeacherAnalyticsReport } from "@/components/professor/teacher-analytics-report";
import {
  TeacherBreadcrumbs,
  teacherSecondaryButton,
} from "@/components/professor/teacher-ui";
import { parseTeacherFilters } from "@/lib/teacher-analytics";
import { getTeacherAnalytics } from "@/lib/teacher-analytics-server";

export default async function TeacherClassAnalyticsPage({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { classId } = await params;
  const filters = parseTeacherFilters(await searchParams);
  const result = await getTeacherAnalytics(classId, filters);
  if (result.state === "unauthenticated")
    redirect(
      `/login?next=${encodeURIComponent(`/professor/turmas/${classId}/analytics`)}`,
    );
  if (result.state === "not_found") notFound();
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <TeacherBreadcrumbs
          items={[
            { label: "Professor", href: "/professor" },
            { label: "Turmas", href: "/professor#turmas" },
            {
              label: result.room.public_name,
              href: `/professor/turmas/${classId}`,
            },
            { label: "Desempenho" },
          ]}
        />
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#0B2D6B]">
              Desempenho da turma
            </h1>
            <p className="mt-2 text-slate-600">
              {result.room.public_name} · atividades, participação e evolução
              dos alunos.
            </p>
          </div>
          <a
            href={`/professor/turmas/${classId}`}
            className={teacherSecondaryButton}
          >
            Voltar à turma
          </a>
        </div>
        <TeacherAnalyticsReport
          classId={classId}
          report={result.report}
          filters={filters}
        />
      </div>
    </main>
  );
}
