import assert from "node:assert/strict";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { contentCatalog } from "../src/lib/content/catalog";
import { isPublicAppPath } from "../src/lib/routing";
import { EXAM_LANDINGS, getExamLanding } from "../src/lib/content/exam-landings";
import { existsSync } from "node:fs";

const entries = sitemap(); const urls = entries.map((entry) => entry.url);
assert.ok(urls.includes("https://nabulab.org/questoes"));
for (const subject of contentCatalog.filter((item) => item.indexable)) assert.ok(urls.includes(`https://nabulab.org/questoes/${subject.slug}`));
for (const subject of contentCatalog) for (const topic of subject.topics) {
  assert.equal(urls.includes(`https://nabulab.org/questoes/${subject.slug}/${topic.slug}`), topic.indexable, `Elegibilidade incorreta: ${subject.name}/${topic.name}`);
}
assert.equal(new Set(urls).size, urls.length, "Sitemap não pode conter URLs duplicadas.");
const policy = robots(); const serialized = JSON.stringify(policy);
assert.match(serialized, /\/admin\//); assert.match(serialized, /\/api\//); assert.match(serialized, /\/dashboard/); assert.match(serialized, /\/professor\//);
assert.match(serialized, /\/questoes/);
assert.equal(isPublicAppPath("/questoes"), true);
assert.equal(isPublicAppPath("/questoes/fisica/cinematica"), true);
// Páginas de entrada por prova: públicas, no sitemap, liberadas no robots e com conteúdo próprio.
for (const landing of EXAM_LANDINGS) {
  assert.ok(urls.includes(`https://nabulab.org${landing.path}`), `${landing.path} fora do sitemap`);
  assert.equal(isPublicAppPath(landing.path), true, `${landing.path} exige login`);
  assert.ok(existsSync(`src/app${landing.path}/page.tsx`), `${landing.path} sem página`);
  assert.doesNotMatch(serialized, new RegExp(`"${landing.path}"[^\\]]*disallow`));
  const page = getExamLanding(landing.id);
  assert.ok(page.title.length <= 70 && page.description.length <= 170, `${landing.path}: título/descrição longos`);
  assert.ok(page.faq.length >= 3 && page.examFacts.length >= 3 && page.subjects.length > 0 && page.questionCount > 0, `${landing.path}: conteúdo insuficiente`);
}
assert.equal(new Set(EXAM_LANDINGS.map((landing) => getExamLanding(landing.id).title)).size, EXAM_LANDINGS.length, "títulos repetidos");
console.log(`SEO P9 validado: ${urls.length} URLs no sitemap, canonicals controlados e áreas privadas bloqueadas.`);
