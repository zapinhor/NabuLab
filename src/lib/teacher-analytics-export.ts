import type { buildTeacherReport } from "@/lib/teacher-analytics";

type Report = ReturnType<typeof buildTeacherReport>;
export type ExportKind = "students" | "activities" | "questions";

function csvCell(value: string | number | null | undefined): string {
  let text = String(value ?? "");
  if (/^[\s]*[=+@\-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function teacherAnalyticsCsv(report: Report, kind: ExportKind): string {
  const rows: (string | number | null | undefined)[][] = kind === "students"
    ? [["Aluno", "Username", "Atividades realizadas", "Pendentes", "Média (%)", "Taxa de acerto (%)", "Evolução (p.p.)", "Última atividade"],
      ...report.students.map((row) => [row.name, row.username, row.completed, row.pending, row.average, row.accuracy, row.evolution, row.lastActivity])]
    : kind === "activities"
      ? [["Atividade", "Média (%)", "Participação (%)", "Conclusão (%)", "Taxa de acerto (%)", "Conclusões"],
        ...report.activities.map((row) => [row.title, row.average, row.participation, row.completion, row.accuracy, row.completed])]
      : [["Questão do snapshot", "Matéria", "Assunto", "Respostas", "Erros", "Taxa de erro (%)"],
        ...report.questions.slice(0, 30).map((row) => [row.statement, row.subject, row.topic, row.responses, row.errors, row.errorRate])];
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(";")).join("\r\n")}\r\n`;
}
