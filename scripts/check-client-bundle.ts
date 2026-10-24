/**
 * Depois do build: garante que nenhum JavaScript enviado ao navegador
 * (.next/static) contém gabaritos ou explicações do banco de questões.
 *   npm run build && npm run check:bundle
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { questionBank } from "@/data/questions";

const root = join(process.cwd(), ".next/static");
const files: string[] = [];
(function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".js")) files.push(path);
  }
})(root);

const bundle = files.map((file) => readFileSync(file, "utf8")).join("\n");
const leaks = questionBank.filter((question) => {
  const sample = question.explanation.trim().slice(0, 60);
  return sample.length >= 30 && bundle.includes(JSON.stringify(sample).slice(1, -1));
});

console.log(`${files.length} arquivos JS verificados, ${(bundle.length / 1024).toFixed(0)} KB no total.`);
if (leaks.length) {
  console.error(`FALHOU: ${leaks.length} explicações do banco aparecem no JavaScript público (ex.: ${leaks.slice(0, 5).map((q) => q.id).join(", ")}).`);
  process.exit(1);
}
console.log(`OK: nenhuma das ${questionBank.length} explicações do banco está no JavaScript público.`);
