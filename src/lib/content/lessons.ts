import { lessons } from "@/data/lessons";
import { questionBank } from "@/data/questions";
import { subjects } from "@/data/subjects";
import { slugifyContent } from "@/lib/content/catalog";
import { CATEGORY_LABELS, subjectCategory } from "@/lib/study-focus";
import type { Lesson } from "@/types/lesson";
import type { SubjectId } from "@/types/question";

export type LessonEntry = ReturnType<typeof buildEntry>;

function buildEntry(lesson: Lesson, index: number) {
  const subject = subjects.find((item) => item.id === lesson.subject)!;
  const questionCount = questionBank.filter((question) => question.subject === lesson.subject && question.topic === lesson.topic).length;
  return {
    lesson,
    rank: index + 1,
    subjectName: subject.name,
    subjectSlug: slugifyContent(lesson.subject),
    topicSlug: slugifyContent(lesson.topic),
    category: CATEGORY_LABELS[subjectCategory(subject)],
    questionCount,
    href: `/estudar/${slugifyContent(lesson.subject)}/${slugifyContent(lesson.topic)}` as `/${string}`,
    questionsHref: `/questoes/${slugifyContent(lesson.subject)}/${slugifyContent(lesson.topic)}`,
    practiceHref: `/cadastro?next=${encodeURIComponent(`/simulado/novo?materia=${lesson.subject}`)}`,
  };
}

export const lessonCatalog = lessons.map(buildEntry);

export function getLessonEntry(subjectSlug: string, topicSlug: string) {
  return lessonCatalog.find((entry) => entry.subjectSlug === subjectSlug && entry.topicSlug === topicSlug) ?? null;
}

export function getLessonForTopic(subjectId: SubjectId, topic: string) {
  return lessonCatalog.find((entry) => entry.lesson.subject === subjectId && entry.lesson.topic === topic) ?? null;
}

/** Problemas estruturais das aulas. A lista deve ficar vazia. */
export function lessonDiagnostics() {
  const problems: string[] = [];
  const keys = new Set<string>();
  for (const entry of lessonCatalog) {
    const { lesson } = entry;
    const key = `${lesson.subject}/${lesson.topic}`;
    if (keys.has(key)) problems.push(`${key}: aula duplicada`);
    keys.add(key);
    if (entry.questionCount === 0) problems.push(`${key}: assunto sem questões no banco`);
    if (lesson.sections.length < 2) problems.push(`${key}: menos de 2 seções`);
    if (lesson.workedExamples.length < 1) problems.push(`${key}: sem exemplo resolvido`);
    if (lesson.summary.length < 3) problems.push(`${key}: resumo curto`);
    if (lesson.commonMistakes.length < 2) problems.push(`${key}: poucos erros comuns`);
    for (const section of lesson.sections) {
      if (!section.heading.trim() || section.paragraphs.length === 0) problems.push(`${key}: seção vazia`);
      if (section.table && section.table.rows.some((row) => row.length !== section.table!.headers.length)) problems.push(`${key}: tabela desalinhada em "${section.heading}"`);
    }
    for (const example of lesson.workedExamples) {
      if (!example.statement.trim() || example.steps.length === 0 || !example.answer.trim()) problems.push(`${key}: exemplo incompleto`);
    }
  }
  return problems;
}
