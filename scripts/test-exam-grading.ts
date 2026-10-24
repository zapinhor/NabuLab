/**
 * Gabarito no servidor: a prova chega ao navegador sem respostas, só provas
 * assinadas pelo servidor são corrigidas e o plano gratuito vê gabarito
 * apenas nas questões respondidas.
 */
import assert from "node:assert/strict";

import { questionIndex } from "../src/data/question-index";
import { questionBank } from "../src/data/questions";
import { PREMIUM_ENTITLEMENTS } from "../src/lib/entitlements";
import { gradeExam, signExamSession, verifyExamToken } from "../src/lib/exam-grading";
import { createExamSession, createExamSessionFromQuestionIds, getPublicSessionQuestions, getSessionQuestions } from "../src/lib/quiz-engine";
import type { ExamConfig } from "../src/types/exam";

// 1) Índice do navegador: mesmas questões, sem conteúdo nem gabarito.
assert.equal(questionIndex.length, questionBank.length, "índice deve cobrir o banco inteiro");
for (const meta of questionIndex) {
  for (const field of ["statement", "alternatives", "correctAnswer", "explanation", "alternativeExplanations"]) {
    assert.ok(!(field in meta), `índice não pode ter ${field} (${meta.id})`);
  }
}

// 2) Prova gerada: questões públicas sem gabarito, na mesma ordem/letras da correção.
const config: ExamConfig = {
  amount: 20,
  subjects: ["matematica", "portugues", "historia", "biologia"],
  difficulty: "misto",
  questionType: "misto",
  shuffleQuestions: true,
  shuffleAlternatives: true,
};
const session = createExamSession(config, PREMIUM_ENTITLEMENTS);
assert.ok(session, "deve gerar prova");
const publicQuestions = getPublicSessionQuestions(session!);
const fullQuestions = getSessionQuestions(session!);
assert.equal(publicQuestions.length, session!.questionIds.length);
for (const [index, question] of publicQuestions.entries()) {
  assert.ok(!("correctAnswer" in question) && !("explanation" in question) && !("alternativeExplanations" in question), "questão pública sem gabarito");
  assert.deepEqual(question.alternatives, fullQuestions[index].alternatives, "alternativas iguais às da correção");
}
assert.ok(!JSON.stringify(publicQuestions).includes(fullQuestions[0].explanation.slice(0, 40)), "explicação não vaza no JSON público");

// 3) Token: só vale para o mesmo usuário, sem alteração e dentro da validade.
const token = signExamSession(session!, "user-a");
assert.deepEqual(verifyExamToken(token, "user-a")?.questionIds, session!.questionIds, "token válido");
assert.equal(verifyExamToken(token, "user-b"), null, "token de outro usuário é recusado");
const [data, signature] = token.split(".");
const forged = JSON.parse(Buffer.from(data, "base64url").toString());
forged.s.questionIds = questionBank.slice(0, 50).map((question) => question.id);
assert.equal(verifyExamToken(`${Buffer.from(JSON.stringify(forged)).toString("base64url")}.${signature}`, "user-a"), null, "token alterado é recusado");
assert.equal(verifyExamToken("lixo", "user-a"), null);
assert.equal(verifyExamToken(undefined, "user-a"), null);
const realNow = Date.now;
Date.now = () => realNow() + 8 * 24 * 60 * 60 * 1000;
assert.equal(verifyExamToken(token, "user-a"), null, "token vencido é recusado");
Date.now = realNow;

// 4) Correção: tudo certo, tudo errado, resposta inválida ignorada.
const verified = verifyExamToken(token, "user-a")!;
const allRight = Object.fromEntries(fullQuestions.map((question) => [question.id, question.correctAnswer]));
const right = gradeExam(verified, allRight, null);
assert.equal(right.correct, right.total);
assert.equal(right.answered, right.total);
assert.ok(right.questions.every((question) => question.correctAnswer && !question.locked));
const wrong = Object.fromEntries(fullQuestions.map((question) => [question.id, question.alternatives.find((alternative) => alternative.id !== question.correctAnswer)!.id]));
assert.equal(gradeExam(verified, wrong, null).correct, 0);
assert.equal(gradeExam(verified, { [fullQuestions[0].id]: "Z" }, null).answered, 0, "alternativa inexistente não conta");

// 5) Plano gratuito: gabarito só nas questões respondidas (que contaram na cota).
const answeredIds = new Set(fullQuestions.slice(0, 3).map((question) => question.id));
const free = gradeExam(verified, Object.fromEntries([...answeredIds].map((id) => [id, allRight[id]])), answeredIds);
assert.equal(free.correct, 3);
for (const question of free.questions) {
  if (answeredIds.has(question.id)) assert.ok(question.correctAnswer && question.explanation && !question.locked);
  else assert.ok(question.locked && question.correctAnswer === "" && question.explanation === "" && Object.keys(question.alternativeExplanations).length === 0, "não respondida fica sem gabarito");
}

// 6) Treinar erros / recomendado também saem sem gabarito.
const fromIds = createExamSessionFromQuestionIds(questionBank.slice(0, 5).map((question) => question.id), true, "review", PREMIUM_ENTITLEMENTS);
assert.ok(fromIds && getPublicSessionQuestions(fromIds).every((question) => !("correctAnswer" in question)));

console.log(`Gabarito no servidor: índice de ${questionIndex.length} questões sem conteúdo, prova pública sem respostas, token e correção validados.`);
