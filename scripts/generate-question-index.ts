/**
 * Gera src/data/question-index.ts: a classificação de cada questão do banco,
 * SEM enunciado, alternativas, gabarito ou explicações. É esse índice que o
 * navegador usa para contar questões, montar filtros, domínio e recomendações.
 *
 * Roda automaticamente antes do build (prebuild). Para conferir sem gravar:
 *   npm run check:question-index
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { questionBank } from "@/data/questions";
import type { QuestionMeta } from "@/types/question";

const target = join(process.cwd(), "src/data/question-index.ts");

const rows: QuestionMeta[] = questionBank.map((question) => ({
  id: question.id,
  area: question.area,
  subject: question.subject,
  subjectName: question.subjectName,
  topic: question.topic,
  subtopic: question.subtopic,
  difficulty: question.difficulty,
  type: question.type,
}));

const content = `// ARQUIVO GERADO por scripts/generate-question-index.ts — não edite à mão.
// Classificação das questões sem enunciado nem gabarito (seguro para o navegador).
import type { QuestionMeta } from "@/types/question";

export const questionIndex: readonly QuestionMeta[] = JSON.parse(${JSON.stringify(JSON.stringify(rows))});

const indexById = new Map(questionIndex.map((question) => [question.id, question]));

export function getQuestionMeta(id: string) {
  return indexById.get(id);
}

export function getTotalQuestions() {
  return questionIndex.length;
}
`;

const current = (() => { try { return readFileSync(target, "utf8"); } catch { return ""; } })();
if (process.argv.includes("--check")) {
  if (current !== content) {
    console.error("src/data/question-index.ts está desatualizado. Rode: npm run generate:question-index");
    process.exit(1);
  }
  console.log(`Índice de questões em dia (${rows.length} questões).`);
} else {
  if (current !== content) writeFileSync(target, content);
  console.log(`Índice de questões gerado (${rows.length} questões).`);
}
