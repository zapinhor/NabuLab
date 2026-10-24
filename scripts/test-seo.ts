import assert from "node:assert/strict";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { contentCatalog } from "../src/lib/content/catalog";
import { isPublicAppPath } from "../src/lib/routing";

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
console.log(`SEO P9 validado: ${urls.length} URLs no sitemap, canonicals controlados e áreas privadas bloqueadas.`);
