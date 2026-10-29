import assert from "node:assert/strict";
import sitemap from "../src/app/sitemap";
import { lessonCatalog, lessonDiagnostics, getLessonEntry, getLessonForTopic } from "../src/lib/content/lessons";
import { getTopicContent } from "../src/lib/content/catalog";
import { isPublicAppPath } from "../src/lib/routing";
import { ANALYTICS_EVENT_NAMES } from "../src/lib/analytics/events";
import { findLessonLink, suggestLesson } from "../src/lib/lesson-links";
import { lessonLinks } from "../src/data/lessons/links.generated";

assert.deepEqual(lessonDiagnostics(), [], "As aulas não podem ter problemas estruturais.");
assert.ok(lessonCatalog.length >= 8, "O MVP deve ter ao menos 8 aulas.");
const urls = sitemap().map((entry) => entry.url);
assert.ok(urls.includes("https://nabulab.org/estudar"), "/estudar deve estar no sitemap.");
for (const entry of lessonCatalog) {
  assert.ok(urls.includes(`https://nabulab.org${entry.href}`), `Aula fora do sitemap: ${entry.href}`);
  assert.equal(getLessonEntry(entry.subjectSlug, entry.topicSlug)?.href, entry.href);
  assert.equal(getLessonForTopic(entry.lesson.subject, entry.lesson.topic)?.href, entry.href);
  assert.ok(getTopicContent(entry.subjectSlug, entry.topicSlug), `Assunto sem página de questões: ${entry.href}`);
  assert.ok(entry.practiceHref.startsWith("/cadastro?next=%2Fsimulado%2Fnovo%3Fmateria%3D"), "O botão Praticar deve levar ao simulado com a matéria.");
}
assert.equal(isPublicAppPath("/estudar"), true);
assert.equal(isPublicAppPath(lessonCatalog[0].href), true);
assert.ok(ANALYTICS_EVENT_NAMES.includes("lesson_viewed") && ANALYTICS_EVENT_NAMES.includes("lesson_practice_started"));
assert.equal(lessonLinks.length, lessonCatalog.length, "links.generated.ts desatualizado: rode npm run generate:lesson-links.");
for (const entry of lessonCatalog) {
  const link = findLessonLink(entry.lesson.subject, entry.lesson.topic);
  assert.equal(link?.href, entry.href, `Índice leve sem a aula ${entry.href}`);
  assert.equal(link?.readingMinutes, entry.lesson.readingMinutes);
}
assert.equal(findLessonLink("portugues", "Assunto que não existe"), null);
const first = lessonCatalog[0].lesson;
assert.deepEqual(suggestLesson([{ subject: "portugues", topic: "Assunto que não existe" }, { subject: first.subject, topic: first.topic }])?.fromErrors, true);
assert.equal(suggestLesson([])?.fromErrors, false);
assert.ok(ANALYTICS_EVENT_NAMES.includes("lesson_review_clicked"));
console.log(`Estudos MVP validado: ${lessonCatalog.length} aulas, sitemap, rotas públicas e eventos.`);
