import assert from "node:assert/strict";
import { questionBank } from "../src/data/questions";
import { CONTENT_BASELINE, contentCatalog, contentDiagnostics, searchContent, slugifyContent } from "../src/lib/content/catalog";

assert.equal(questionBank.length, CONTENT_BASELINE.questions, "O banco deve preservar 2.144 questões (1.224 de vestibulares, 400 de concursos, 200 do DETRAN e 320 da OAB).");
assert.equal(contentCatalog.length, CONTENT_BASELINE.subjects, "O banco deve preservar 40 matérias.");
assert.equal(new Set(questionBank.map((question) => question.id)).size, questionBank.length, "IDs devem continuar únicos.");
assert.equal(contentDiagnostics().problems.length, 0, "Não pode haver problema estrutural novo.");
assert.equal(contentDiagnostics().duplicateCandidates.length, 0, "Não pode haver enunciado exatamente duplicado.");
assert.equal(slugifyContent("Função Quadrática"), "funcao-quadratica");
assert.equal(slugifyContent("Educação Física"), "educacao-fisica");
assert.ok(searchContent({ q: "cinematica" }).length > 0, "Busca textual deve encontrar Cinemática.");
assert.ok(searchContent({ subject: "fisica", difficulty: "avancado" }).every(({ subject, topic }) => subject.id === "fisica" && topic.difficulties.avancado > 0));
assert.ok(contentCatalog.every((subject) => new Set(subject.topics.map((topic) => topic.slug)).size === subject.topics.length), "Slugs de assunto devem ser únicos dentro da matéria.");
console.log(`Content P9 validado: ${questionBank.length} questões, ${contentDiagnostics().topics} assuntos, ${contentDiagnostics().indexableTopics} assuntos elegíveis.`);
