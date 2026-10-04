export type TeacherMember = { user_id: string; status: string; full_name: string | null; username: string | null };
export type TeacherActivity = { id: string; title: string; status: string; created_at: string; due_at: string | null };
export type TeacherAttempt = {
  attempt_id: string; activity_id: string; student_id: string; attempt_number: number;
  status: string; started_at: string | null; submitted_at: string | null;
  score: number | null; correct_count: number | null; total_questions: number | null;
};
export type TeacherAnswer = {
  activity_id: string; question_position: number; subject: string; topic: string;
  difficulty: string; statement: string; response_count: number; correct_count: number; error_count: number;
};
export type TeacherAnalyticsFilters = { from: string; to: string; activityId: string; subject: string; topic: string; difficulty: string };
export type ContentMetric = { label: string; responses: number; correct: number; errors: number; accuracy: number };
export type StudentMetric = { id: string; name: string; username: string | null; completed: number; pending: number; average: number | null; accuracy: number | null; evolution: number | null; lastActivity: string | null };
export type ActivityMetric = { id: string; title: string; average: number | null; participation: number; completion: number; accuracy: number | null; completed: number };
export type QuestionMetric = { key: string; statement: string; subject: string; topic: string; responses: number; errors: number; errorRate: number };

const day = (value: string | Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
const percent = (part: number, total: number) => total ? Math.round(part / total * 1000) / 10 : null;
const mean = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length * 10) / 10 : null;
const score = (attempt: TeacherAttempt) => Number(attempt.score ?? 0);

export function parseTeacherFilters(input: Record<string, string | string[] | undefined>, now = new Date()): TeacherAnalyticsFilters {
  const today = day(now);
  const since = new Date(now.getTime() - 29 * 86_400_000);
  const from = typeof input.from === "string" ? input.from : "";
  const to = typeof input.to === "string" ? input.to : "";
  const valid = /^\d{4}-\d{2}-\d{2}$/;
  const custom = valid.test(from) && valid.test(to) && from <= to && to <= today
    && !Number.isNaN(Date.parse(from)) && !Number.isNaN(Date.parse(to))
    && (Date.parse(to) - Date.parse(from)) <= 366 * 86_400_000;
  const value = (key: string, limit: number) => typeof input[key] === "string" ? (input[key] as string).trim().slice(0, limit) : "";
  return { from: custom ? from : day(since), to: custom ? to : today,
    activityId: value("activity", 36), subject: value("subject", 80), topic: value("topic", 120), difficulty: value("difficulty", 20) };
}

export function buildTeacherReport(input: { members: TeacherMember[]; activities: TeacherActivity[]; attempts: TeacherAttempt[]; answers: TeacherAnswer[]; filters: TeacherAnalyticsFilters }) {
  const { filters } = input;
  const members = input.members.filter((member) => member.status === "active");
  const memberIds = new Set(members.map((member) => member.user_id));
  const attemptedInPeriod = new Set(input.attempts.map((attempt) => attempt.activity_id));
  const eligibleActivities = input.activities.filter((activity) => ["published", "closed"].includes(activity.status)
    && (day(activity.created_at) >= filters.from && day(activity.created_at) <= filters.to
      || attemptedInPeriod.has(activity.id)));
  const activities = eligibleActivities.filter((activity) => !filters.activityId || activity.id === filters.activityId);
  const activityIds = new Set(activities.map((activity) => activity.id));
  const attempts = input.attempts.filter((attempt) => activityIds.has(attempt.activity_id) && memberIds.has(attempt.student_id));
  const submitted = attempts.filter((attempt) => attempt.status === "submitted" && attempt.submitted_at);
  const latestByPair = new Map<string, TeacherAttempt>();
  for (const attempt of submitted) {
    const key = `${attempt.activity_id}:${attempt.student_id}`;
    const previous = latestByPair.get(key);
    if (!previous || attempt.attempt_number > previous.attempt_number
      || (attempt.attempt_number === previous.attempt_number && (attempt.submitted_at ?? "") > (previous.submitted_at ?? ""))) latestByPair.set(key, attempt);
  }
  const latest = [...latestByPair.values()];
  const availableAnswers = input.answers.filter((answer) => activityIds.has(answer.activity_id));
  const facets = {
    subjects: [...new Set(availableAnswers.map((answer) => answer.subject))].sort(),
    topics: [...new Set(availableAnswers.map((answer) => answer.topic))].sort(),
    difficulties: [...new Set(availableAnswers.map((answer) => answer.difficulty))].sort(),
  };
  const answers = availableAnswers.filter((answer) =>
    (!filters.subject || answer.subject === filters.subject)
    && (!filters.topic || answer.topic === filters.topic)
    && (!filters.difficulty || answer.difficulty === filters.difficulty));
  const aggregate = (getLabel: (answer: TeacherAnswer) => string): ContentMetric[] => {
    const groups = new Map<string, ContentMetric>();
    for (const answer of answers) {
      const label = getLabel(answer);
      const row = groups.get(label) ?? { label, responses: 0, correct: 0, errors: 0, accuracy: 0 };
      row.responses += Number(answer.response_count); row.correct += Number(answer.correct_count); row.errors += Number(answer.error_count);
      groups.set(label, row);
    }
    return [...groups.values()].map((row) => ({ ...row, accuracy: percent(row.correct, row.responses) ?? 0 }))
      .sort((a, b) => b.responses - a.responses);
  };
  const students: StudentMetric[] = members.map((member) => {
    const own = latest.filter((attempt) => attempt.student_id === member.user_id)
      .sort((a, b) => (a.submitted_at ?? "").localeCompare(b.submitted_at ?? ""));
    const totalCorrect = own.reduce((sum, attempt) => sum + Number(attempt.correct_count ?? 0), 0);
    const totalQuestions = own.reduce((sum, attempt) => sum + Number(attempt.total_questions ?? 0), 0);
    return { id: member.user_id, name: member.full_name || member.username || "Aluno", username: member.username,
      completed: own.length, pending: Math.max(activities.length - own.length, 0),
      average: mean(own.map(score)), accuracy: percent(totalCorrect, totalQuestions),
      evolution: own.length >= 2 ? Math.round((score(own.at(-1)!) - score(own[0])) * 10) / 10 : null,
      lastActivity: own.length ? activities.find((activity) => activity.id === own.at(-1)?.activity_id)?.title ?? null : null };
  });
  const activityMetrics: ActivityMetric[] = activities.map((activity) => {
    const completed = latest.filter((attempt) => attempt.activity_id === activity.id);
    const started = new Set(attempts.filter((attempt) => attempt.activity_id === activity.id).map((attempt) => attempt.student_id));
    return { id: activity.id, title: activity.title, average: mean(completed.map(score)),
      participation: percent(started.size, members.length) ?? 0, completion: percent(completed.length, members.length) ?? 0,
      accuracy: percent(completed.reduce((sum, item) => sum + Number(item.correct_count ?? 0), 0),
        completed.reduce((sum, item) => sum + Number(item.total_questions ?? 0), 0)), completed: completed.length };
  });
  const questionMetrics: QuestionMetric[] = answers.map((answer) => ({
    key: `${answer.activity_id}:${answer.question_position}`, statement: answer.statement,
    subject: answer.subject, topic: answer.topic, responses: Number(answer.response_count),
    errors: Number(answer.error_count), errorRate: percent(Number(answer.error_count), Number(answer.response_count)) ?? 0,
  })).sort((a, b) => b.errors - a.errors || b.errorRate - a.errorRate);
  const byDay = new Map<string, number[]>();
  for (const attempt of latest) {
    const key = day(attempt.submitted_at!);
    const values = byDay.get(key) ?? []; values.push(score(attempt)); byDay.set(key, values);
  }
  const evolution = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, values]) => ({ date, average: mean(values) ?? 0, count: values.length }));
  const history = latest.map((attempt) => ({ id: attempt.attempt_id, studentId: attempt.student_id,
    activity: activities.find((activity) => activity.id === attempt.activity_id)?.title ?? "Atividade",
    submittedAt: attempt.submitted_at!, score: score(attempt), correct: Number(attempt.correct_count ?? 0),
    total: Number(attempt.total_questions ?? 0), attemptNumber: attempt.attempt_number }))
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  const distribution = [0, 20, 40, 60, 80].map((lower, index) => ({
    label: `${lower}–${lower + 20}%`, count: latest.filter((attempt) => score(attempt) >= lower && (index === 4 ? score(attempt) <= 100 : score(attempt) < lower + 20)).length,
  }));
  return {
    summary: { students: members.length, activities: activities.length,
      participation: percent(new Set(attempts.map((attempt) => attempt.student_id)).size, members.length),
      completion: percent(latest.length, members.length * activities.length),
      average: mean(latest.map(score)), lastAverage: activityMetrics.length ? activityMetrics.at(-1)!.average : null,
      recentChange: evolution.length >= 2 ? Math.round((evolution.at(-1)!.average - evolution[0].average) * 10) / 10 : null,
      pendingStudents: students.filter((student) => student.pending > 0).length },
    students, activities: activityMetrics, activityOptions: eligibleActivities.map((activity) => ({ id: activity.id, title: activity.title })), bySubject: aggregate((answer) => answer.subject),
    byTopic: aggregate((answer) => answer.topic), byDifficulty: aggregate((answer) => answer.difficulty),
    byActivity: aggregate((answer) => activities.find((activity) => activity.id === answer.activity_id)?.title ?? "Atividade"),
    questions: questionMetrics, distribution, evolution, history, facets,
  };
}
