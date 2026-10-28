import assert from "node:assert/strict";
import sitemap from "../src/app/sitemap";
import { lessonCatalog, lessonDiagnostics, getLessonEntry, getLessonForTopic } from "../src/lib/content/lessons";
import { getTopicContent } from "../src/lib/content/catalog";
import { isPublicAppPath } from "../src/lib/routing";
import { ANALYTICS_EVENT_NAMES } from "../src/lib/analytics/events";

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
console.log(`Estudos MVP validado: ${lessonCatalog.length} aulas, sitemap, rotas públicas e eventos.`);
