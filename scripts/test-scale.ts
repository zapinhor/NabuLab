import assert from "node:assert/strict";

type Answer = { student: number; activity: number; subject: string; topic: string; correct: boolean };

function syntheticReport(students: number, activities: number, questionsPerActivity: number) {
  const answers: Answer[] = [];
  for (let student = 0; student < students; student += 1) {
    for (let activity = 0; activity < activities; activity += 1) {
      for (let question = 0; question < questionsPerActivity; question += 1) {
        answers.push({
          student, activity,
          subject: question % 2 ? "Física" : "Matemática",
          topic: question % 3 ? "Cinemática" : "Álgebra",
          correct: (student + activity + question) % 4 !== 0,
        });
      }
    }
  }
  const byStudent = new Map<number, { responses: number; correct: number }>();
  const byTopic = new Map<string, { responses: number; correct: number }>();
  for (const answer of answers) {
    const student = byStudent.get(answer.student) ?? { responses: 0, correct: 0 };
    student.responses += 1; student.correct += Number(answer.correct); byStudent.set(answer.student, student);
    const topic = byTopic.get(answer.topic) ?? { responses: 0, correct: 0 };
    topic.responses += 1; topic.correct += Number(answer.correct); byTopic.set(answer.topic, topic);
  }
  return { answers: answers.length, students: byStudent.size, topics: byTopic.size };
}

for (const scenario of [
  { name: "Free", students: 40, activities: 20, questions: 20 },
  { name: "Pro", students: 70, activities: 30, questions: 20 },
  { name: "Avançado", students: 100, activities: 40, questions: 25 },
]) {
  const started = performance.now();
  const result = syntheticReport(scenario.students, scenario.activities, scenario.questions);
  const durationMs = performance.now() - started;
  assert.equal(result.answers, scenario.students * scenario.activities * scenario.questions);
  assert.equal(result.students, scenario.students);
  assert.ok(durationMs < 2_000, `${scenario.name} excedeu o teto local defensivo`);
  console.log(JSON.stringify({ scenario: scenario.name, ...result, durationMs: Number(durationMs.toFixed(2)) }));
}

console.log("Escala P8: agregação sintética local aprovada; latência de banco deve ser medida separadamente no staging.");
