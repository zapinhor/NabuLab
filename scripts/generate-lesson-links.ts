/*
 * Gera src/data/lessons/links.generated.ts: um índice leve das aulas (sem o
 * texto delas) para as telas do aluno, que rodam no navegador, saberem se um
 * assunto tem aula. Use --check para só conferir se o arquivo está em dia.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { lessonCatalog } from "../src/lib/content/lessons";

const target = "src/data/lessons/links.generated.ts";
const links = lessonCatalog.map((entry) => ({
  subject: entry.lesson.subject,
  topic: entry.lesson.topic,
  title: entry.lesson.title,
  readingMinutes: entry.lesson.readingMinutes,
  href: entry.href,
}));
const content = `// Arquivo gerado por scripts/generate-lesson-links.ts. Não edite à mão.
import type { SubjectId } from "@/types/question";

export type LessonLink = { subject: SubjectId; topic: string; title: string; readingMinutes: number; href: \`/\${string}\` };

export const lessonLinks: LessonLink[] = ${JSON.stringify(links, null, 2)};
`;

if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(target, "utf8");
  } catch {
    /* ainda não existe */
  }
  if (current !== content) {
    console.error(`${target} está desatualizado. Rode npm run generate:lesson-links.`);
    process.exit(1);
  }
  console.log(`${target} em dia (${links.length} aulas).`);
} else {
  writeFileSync(target, content);
  console.log(`${target}: ${links.length} aulas.`);
}
