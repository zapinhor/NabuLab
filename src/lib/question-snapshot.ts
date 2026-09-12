import type { Question } from "@/types/question";
import type { QuestionSnapshot } from "@/types/storage";

export function createQuestionSnapshot(question: Question): QuestionSnapshot {
  return {
    area: question.area,
    subject: question.subject,
    subjectName: question.subjectName,
    topic: question.topic,
    subtopic: question.subtopic,
    difficulty: question.difficulty,
    type: question.type,
    statement: question.statement,
    alternatives: question.alternatives.map((alternative) => ({ ...alternative })),
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    alternativeExplanations: { ...question.alternativeExplanations },
  };
}

export function questionFromSnapshot(
  questionId: string,
  value: unknown,
): Question | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const snapshot = value as Partial<QuestionSnapshot>;
  const alternatives = snapshot.alternatives;
  const alternativesAreValid =
    Array.isArray(alternatives) &&
    alternatives.every(
      (alternative) =>
        Boolean(alternative) &&
        typeof alternative.id === "string" &&
        typeof alternative.text === "string",
    );

  if (
    typeof snapshot.area !== "string" ||
    typeof snapshot.subject !== "string" ||
    typeof snapshot.subjectName !== "string" ||
    typeof snapshot.topic !== "string" ||
    typeof snapshot.subtopic !== "string" ||
    !["iniciante", "medio", "avancado"].includes(snapshot.difficulty ?? "") ||
    !["multiple-choice", "true-false"].includes(snapshot.type ?? "") ||
    typeof snapshot.statement !== "string" ||
    !alternativesAreValid ||
    typeof snapshot.correctAnswer !== "string" ||
    typeof snapshot.explanation !== "string" ||
    !snapshot.alternativeExplanations ||
    typeof snapshot.alternativeExplanations !== "object" ||
    Array.isArray(snapshot.alternativeExplanations)
  ) {
    return null;
  }

  return {
    id: questionId,
    ...(snapshot as QuestionSnapshot),
    alternatives: alternatives.map((alternative) => ({ ...alternative })),
    alternativeExplanations: { ...snapshot.alternativeExplanations },
    tags: [],
  };
}
