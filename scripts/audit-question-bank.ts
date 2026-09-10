import { auditQuestionBank } from "../src/lib/question-bank-audit";

const audit = auditQuestionBank();

console.log("NABULAB — BANCO VESTIBULARES");
console.log("");
console.log(`MATÉRIAS                  ${String(audit.subjects.length).padStart(5)}`);
console.log(`QUESTÕES                  ${String(audit.totalQuestions).padStart(5)}`);
console.log("");
console.log(`INICIANTE                 ${String(audit.byDifficulty.iniciante).padStart(5)}`);
console.log(`MÉDIO                     ${String(audit.byDifficulty.medio).padStart(5)}`);
console.log(`AVANÇADO                  ${String(audit.byDifficulty.avancado).padStart(5)}`);
console.log("");
console.log(`MÚLTIPLA ESCOLHA          ${String(audit.byType.multipleChoice).padStart(5)}`);
console.log(`VERDADEIRO/FALSO          ${String(audit.byType.trueFalse).padStart(5)}`);
console.log("");
console.log(`ERROS                     ${String(audit.totalErrors).padStart(5)}`);
console.log(`WARNINGS                  ${String(audit.totalWarnings).padStart(5)}`);
console.log("");

for (const subject of audit.subjects) {
  const mc = subject.combinations["multiple-choice"];
  const vf = subject.combinations["true-false"];

  console.log(
    `${subject.subjectName}: ${subject.total} questões | ` +
    `I ${subject.iniciante} · M ${subject.medio} · A ${subject.avancado} | ` +
    `MC ${subject.multipleChoice} · V/F ${subject.trueFalse} | ` +
    `células MC ${mc.iniciante}/${mc.medio}/${mc.avancado} · ` +
    `V/F ${vf.iniciante}/${vf.medio}/${vf.avancado}`
  );
}

if (audit.issues.length > 0) {
  console.log("");

  for (const issue of audit.issues) {
    console.log(`[${issue.severity.toUpperCase()}] ${issue.code} · ${issue.questionId}: ${issue.message}`);
  }
}

if (audit.totalErrors > 0 || audit.totalWarnings > 0) {
  process.exitCode = 1;
}
