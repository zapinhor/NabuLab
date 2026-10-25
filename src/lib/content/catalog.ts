import { questionBank } from "@/data/questions";
import { subjects } from "@/data/subjects";
import type { Difficulty, Question, SubjectId } from "@/types/question";

export const CONTENT_BASELINE = { subjects: 27, questions: 1624 } as const;
export const TOPIC_INDEX_MIN_QUESTIONS = 6;

export function slugifyContent(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function normalizedText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function difficultyCounts(questions: Question[]) {
  return Object.fromEntries((["iniciante", "medio", "avancado"] as Difficulty[])
    .map((difficulty) => [difficulty, questions.filter((question) => question.difficulty === difficulty).length])) as Record<Difficulty, number>;
}

export type TopicContent = ReturnType<typeof buildTopic>;
export type SubjectContent = ReturnType<typeof buildSubject>;

function buildTopic(subjectId: SubjectId, topic: string) {
  const questions = questionBank.filter((question) => question.subject === subjectId && question.topic === topic);
  const difficulties = difficultyCounts(questions);
  const subtopics = [...new Set(questions.map((question) => question.subtopic).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const examTags = [...new Set(questions.flatMap((question) => question.examTags ?? []))].sort();
  const completeExplanations = questions.filter((question) => question.explanation.trim()).length;
  const indexable = questions.length >= TOPIC_INDEX_MIN_QUESTIONS
    && Object.values(difficulties).every((count) => count > 0)
    && completeExplanations === questions.length
    && subtopics.length > 0;
  return { name: topic, slug: slugifyContent(topic), total: questions.length, difficulties, subtopics, examTags, completeExplanations, indexable };
}

function buildSubject(subjectId: SubjectId) {
  const metadata = subjects.find((subject) => subject.id === subjectId)!;
  const questions = questionBank.filter((question) => question.subject === subjectId);
  const topicNames = [...new Set(questions.map((question) => question.topic))];
  const topics = topicNames.map((topic) => buildTopic(subjectId, topic)).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "pt-BR"));
  return {
    id: subjectId, slug: slugifyContent(subjectId), name: metadata.name, area: metadata.area,
    description: metadata.description, total: questions.length, difficulties: difficultyCounts(questions), topics,
    indexable: questions.length >= 24 && topics.length >= 3,
  };
}

export const contentCatalog = subjects.map((subject) => buildSubject(subject.id));

export function getSubjectContent(slug: string) {
  return contentCatalog.find((subject) => subject.slug === slug);
}

export function getTopicContent(subjectSlug: string, topicSlug: string) {
  const subject = getSubjectContent(subjectSlug);
  const topic = subject?.topics.find((item) => item.slug === topicSlug);
  return subject && topic ? { subject, topic } : null;
}

export function contentDiagnostics() {
  const statementGroups = new Map<string, string[]>();
  for (const question of questionBank) {
    const key = normalizedText(question.statement);
    statementGroups.set(key, [...(statementGroups.get(key) ?? []), question.id]);
  }
  const duplicateCandidates = [...statementGroups.values()].filter((ids) => ids.length > 1);
  const tokenized = questionBank.map((question) => ({ id: question.id, subject: question.subject, tokens: new Set(normalizedText(question.statement).split(" ").filter((token) => token.length > 3)) }));
  const similarCandidates: Array<{ first: string; second: string; similarity: number }> = [];
  for (let i = 0; i < tokenized.length; i += 1) for (let j = i + 1; j < tokenized.length; j += 1) {
    const first = tokenized[i]; const second = tokenized[j];
    if (first.subject !== second.subject || first.tokens.size < 8 || second.tokens.size < 8) continue;
    const intersection = [...first.tokens].filter((token) => second.tokens.has(token)).length;
    const union = new Set([...first.tokens, ...second.tokens]).size;
    const similarity = union ? intersection / union : 0;
    if (similarity >= 0.92) similarCandidates.push({ first: first.id, second: second.id, similarity: Number(similarity.toFixed(3)) });
  }
  const problems = questionBank.flatMap((question) => {
    const issues: string[] = [];
    if (!question.statement.trim()) issues.push("enunciado vazio");
    if (!question.explanation.trim()) issues.push("explicação ausente");
    if (!question.alternatives.length) issues.push("sem alternativas");
    if (!question.alternatives.some((alternative) => alternative.id === question.correctAnswer)) issues.push("resposta inválida");
    if (!question.topic.trim() || !question.subtopic.trim()) issues.push("classificação incompleta");
    return issues.map((issue) => ({ id: question.id, issue }));
  });
  return {
    total: questionBank.length,
    subjects: contentCatalog.length,
    topics: contentCatalog.reduce((sum, subject) => sum + subject.topics.length, 0),
    indexableSubjects: contentCatalog.filter((subject) => subject.indexable).length,
    indexableTopics: contentCatalog.flatMap((subject) => subject.topics).filter((topic) => topic.indexable).length,
    lowCoverageTopics: contentCatalog.flatMap((subject) => subject.topics.map((topic) => ({ subject: subject.name, ...topic }))).filter((topic) => topic.total < TOPIC_INDEX_MIN_QUESTIONS),
    duplicateCandidates,
    similarCandidates,
    problems,
  };
}

export function searchContent(query: { q?: string; subject?: string; difficulty?: string; exam?: string }) {
  const term = normalizedText(query.q ?? "");
  return contentCatalog.flatMap((subject) => subject.topics.map((topic) => ({ subject, topic })))
    .filter(({ subject }) => !query.subject || subject.slug === query.subject)
    .filter(({ topic }) => !query.difficulty || topic.difficulties[query.difficulty as Difficulty] > 0)
    .filter(({ topic }) => !query.exam || topic.examTags.includes(query.exam as never))
    .filter(({ subject, topic }) => !term || normalizedText(`${subject.name} ${topic.name} ${topic.subtopics.join(" ")}`).includes(term))
    .slice(0, 60);
}

/** Quantas questões de amostra cada página de assunto mostra publicamente. */
export const TOPIC_SAMPLE_QUESTIONS = 2;

/**
 * Questões de amostra para a página pública de um assunto: uma de nível
 * iniciante e uma de nível médio, sempre as mesmas (ordem por id), para o
 * conteúdo da página não mudar entre builds. Questões avançadas ficam só no app.
 */
export function getTopicSamples(subjectId: SubjectId, topicName: string, limit = TOPIC_SAMPLE_QUESTIONS) {
  const pool = questionBank
    .filter((question) => question.subject === subjectId && question.topic === topicName && question.explanation.trim())
    .sort((a, b) => a.id.localeCompare(b.id));
  const picks: Question[] = [];
  for (const difficulty of ["iniciante", "medio"] as Difficulty[]) {
    const found = pool.find((question) => question.difficulty === difficulty && !picks.includes(question));
    if (found) picks.push(found);
  }
  for (const question of pool) {
    if (picks.length >= limit) break;
    if (question.difficulty !== "avancado" && !picks.includes(question)) picks.push(question);
  }
  return picks.slice(0, limit);
}
