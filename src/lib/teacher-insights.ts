import type { buildTeacherReport } from "@/lib/teacher-analytics";

export const P6_CRITERIA = {
  minContentResponses: 12,
  minContentStudents: 3,
  minQuestionResponses: 8,
  minTrendActivitiesPerWindow: 3,
  minActivityCompletions: 3,
  minRecurringActivities: 2,
  minRecurringResponses: 6,
  difficultyGapPoints: 10,
  strengthGapPoints: 10,
  trendChangePoints: 8,
  stableChangePoints: 4,
  lowAccuracy: 55,
  strongAccuracy: 75,
  problematicQuestionErrorRate: 85,
  problematicQuestionGapPoints: 25,
} as const;

export type P6ContentEvidence = { subject: string; topic: string; difficulty: string; responses: number; correct: number; errors: number; students: number };
export type P6QuestionEvidence = P6ContentEvidence & { activity_id: string; position: number; statement: string };
export type P6StudentTopicEvidence = { student_id: string; subject: string; topic: string; activities: number; responses: number; correct: number; errors: number };
export type P6Evidence = { content: P6ContentEvidence[]; questions: P6QuestionEvidence[]; student_topics: P6StudentTopicEvidence[] };

export type TeacherInsight = {
  id: string;
  kind: "difficulty" | "strength" | "trend" | "attention" | "recurring" | "question" | "pending";
  priority: number;
  evidence: "moderada" | "forte";
  title: string;
  detail: string;
  action?: { label: string; href?: string; review?: { subject: string; topic: string; difficulty: string; preferEasier: boolean } };
};

type Report = ReturnType<typeof buildTeacherReport>;
const accuracy = (correct: number, responses: number) => responses ? Math.round(correct / responses * 1000) / 10 : 0;
const percentage = (value: number) => `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
const studentName = (report: Report, id: string) => report.students.find((student) => student.id === id)?.name ?? "Este aluno";

function evidenceLevel(responses: number, students: number) {
  return responses >= P6_CRITERIA.minContentResponses * 2 && students >= P6_CRITERIA.minContentStudents * 2 ? "forte" as const : "moderada" as const;
}

function trend(values: number[]) {
  const valid = values.filter((value): value is number => value !== null);
  const n = P6_CRITERIA.minTrendActivitiesPerWindow;
  if (valid.length < n * 2) return null;
  const earlier = valid.slice(-n * 2, -n);
  const recent = valid.slice(-n);
  const average = (rows: number[]) => rows.reduce((sum, value) => sum + value, 0) / rows.length;
  return Math.round((average(recent) - average(earlier)) * 10) / 10;
}

export function buildTeacherInsights(report: Report, evidence: P6Evidence, studentId?: string) {
  const insights: TeacherInsight[] = [];
  const relevantContent = evidence.content.filter((row) => row.responses >= P6_CRITERIA.minContentResponses && row.students >= P6_CRITERIA.minContentStudents);
  const allResponses = relevantContent.reduce((sum, row) => sum + row.responses, 0);
  const allCorrect = relevantContent.reduce((sum, row) => sum + row.correct, 0);
  const baseline = accuracy(allCorrect, allResponses);

  for (const row of relevantContent) {
    const rate = accuracy(row.correct, row.responses);
    const common = { evidence: evidenceLevel(row.responses, row.students), priority: Math.round((100 - rate) * Math.min(row.responses, 40) / 4 + row.students * 3) };
    if (rate <= P6_CRITERIA.lowAccuracy && rate <= baseline - P6_CRITERIA.difficultyGapPoints) {
      insights.push({ id: `difficulty:${row.subject}:${row.topic}:${row.difficulty}`, kind: "difficulty", ...common,
        title: `${row.topic} precisa de atenção`,
        detail: `${percentage(rate)} de acerto em ${row.responses} respostas de ${row.students} aluno${row.students === 1 ? "" : "s"}. Média comparável da turma: ${percentage(baseline)}.`,
        action: { label: "Criar revisão", review: { subject: row.subject, topic: row.topic, difficulty: row.difficulty, preferEasier: rate < 45 } },
      });
    }
    if (rate >= P6_CRITERIA.strongAccuracy && rate >= baseline + P6_CRITERIA.strengthGapPoints) {
      insights.push({ id: `strength:${row.subject}:${row.topic}:${row.difficulty}`, kind: "strength", evidence: evidenceLevel(row.responses, row.students), priority: Math.round(rate * Math.min(row.responses, 30) / 6),
        title: `${row.topic} é um ponto forte`,
        detail: `${percentage(rate)} de acerto em ${row.responses} respostas de ${row.students} aluno${row.students === 1 ? "" : "s"}.`,
      });
    }
  }

  const activityValues = report.activities.filter((activity) => activity.completed >= P6_CRITERIA.minActivityCompletions).map((activity) => activity.average).filter((value): value is number => value !== null);
  const classTrend = trend(activityValues);
  if (classTrend !== null) {
    const state = classTrend >= P6_CRITERIA.trendChangePoints ? "melhorou" : classTrend <= -P6_CRITERIA.trendChangePoints ? "caiu" : Math.abs(classTrend) <= P6_CRITERIA.stableChangePoints ? "permaneceu estável" : null;
    if (state) insights.push({ id: studentId ? "trend:student" : "trend:class", kind: "trend", evidence: "forte", priority: 44 + Math.round(Math.abs(classTrend)),
      title: studentId ? `O desempenho recente deste aluno ${state}` : `O desempenho da turma ${state}`,
      detail: `${Math.abs(classTrend).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} pontos percentuais entre duas janelas equivalentes de ${P6_CRITERIA.minTrendActivitiesPerWindow} atividades com pelo menos ${P6_CRITERIA.minActivityCompletions} conclusões cada.`,
    });
  }

  if (!studentId) {
    for (const student of report.students.filter((row) => row.pending > 0)) {
      insights.push({ id: `pending:${student.id}`, kind: "pending", evidence: student.pending >= 2 ? "forte" : "moderada", priority: 40 + student.pending * 8,
        title: `${student.name} possui ${student.pending} atividade${student.pending === 1 ? "" : "s"} pendente${student.pending === 1 ? "" : "s"}`,
        detail: "A pendência considera apenas atividades desta turma no período selecionado.",
        action: { label: "Ver aluno", href: `alunos/${student.id}` },
      });
    }
    const histories = new Map<string, number[]>();
    for (const item of [...report.history].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt))) histories.set(item.studentId, [...(histories.get(item.studentId) ?? []), item.score]);
    for (const [id, scores] of histories) {
      const change = trend(scores);
      if (change !== null && change <= -P6_CRITERIA.trendChangePoints) insights.push({ id: `decline:${id}`, kind: "attention", evidence: "forte", priority: 58 + Math.round(Math.abs(change)),
        title: `${studentName(report, id)} apresentou tendência de queda`,
        detail: `A média caiu ${Math.abs(change).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} pontos percentuais entre duas janelas de atividades equivalentes.`,
        action: { label: "Ver aluno", href: `alunos/${id}` },
      });
    }
  }

  for (const row of evidence.student_topics.filter((item) => item.activities >= P6_CRITERIA.minRecurringActivities && item.responses >= P6_CRITERIA.minRecurringResponses && accuracy(item.correct, item.responses) <= P6_CRITERIA.lowAccuracy)) {
    insights.push({ id: `recurring:${row.student_id}:${row.subject}:${row.topic}`, kind: "recurring", evidence: "moderada", priority: 50 + row.activities * 7,
      title: `${studentName(report, row.student_id)} apresenta dificuldade recorrente em ${row.topic}`,
      detail: `${percentage(accuracy(row.correct, row.responses))} de acerto em ${row.responses} respostas distribuídas por ${row.activities} atividades desta turma.`,
      action: !studentId ? { label: "Ver aluno", href: `alunos/${row.student_id}` } : undefined,
    });
  }

  const topicRates = new Map(relevantContent.map((row) => [`${row.subject}:${row.topic}`, accuracy(row.correct, row.responses)]));
  for (const row of evidence.questions.filter((item) => item.responses >= P6_CRITERIA.minQuestionResponses)) {
    const errorRate = 100 - accuracy(row.correct, row.responses);
    const topicAccuracy = topicRates.get(`${row.subject}:${row.topic}`);
    if (errorRate >= P6_CRITERIA.problematicQuestionErrorRate && topicAccuracy !== undefined && errorRate - (100 - topicAccuracy) >= P6_CRITERIA.problematicQuestionGapPoints) {
      insights.push({ id: `question:${row.activity_id}:${row.position}`, kind: "question", evidence: evidenceLevel(row.responses, row.students), priority: 55 + Math.round(errorRate / 4),
        title: "Uma questão merece revisão", detail: `Esta questão teve ${percentage(errorRate)} de erro em ${row.responses} respostas, muito acima das demais respostas de ${row.topic}. Vale revisar o enunciado ou a dificuldade; isso não confirma erro na questão.`,
      });
    }
  }

  const ordered = insights.sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));
  const priority: TeacherInsight[] = [];
  const representedKinds = new Set<TeacherInsight["kind"]>();
  for (const insight of ordered) {
    if (representedKinds.has(insight.kind)) continue;
    priority.push(insight);
    representedKinds.add(insight.kind);
    if (priority.length === 5) break;
  }
  for (const insight of ordered) {
    if (priority.length === 5) break;
    if (!priority.includes(insight)) priority.push(insight);
  }
  return { priority, all: ordered, hasEnoughData: relevantContent.length > 0 || report.history.length > 0 };
}
