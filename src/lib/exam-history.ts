import { db } from "@/lib/db";
import { createQuestionSnapshot } from "@/lib/question-snapshot";

import type {
  ExamProgress,
  ExamSession,
  ExamSubmission,
} from "@/types/exam";

import type {
  Question,
  SubjectId,
} from "@/types/question";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

interface SaveCompletedExamParams {
  session:
    ExamSession;

  progress:
    ExamProgress;

  submission:
    ExamSubmission;

  questions:
    Question[];
}

/*
 * =========================================================
 * SALVAR PROVA CONCLUÍDA
 * =========================================================
 */

export async function saveCompletedExam({
  session,
  progress,
  submission,
  questions,
}: SaveCompletedExamParams) {
  let correct = 0;

  let answered = 0;

  /*
   * =======================================================
   * RESPOSTAS
   * =======================================================
   */

  const answers:
    StoredAnswer[] =
    questions.map(
      (question) => {
        const selectedAnswer =
          submission.answers[
            question.id
          ] ?? null;

        const wasAnswered =
          selectedAnswer !==
          null;

        const isCorrect =
          selectedAnswer ===
          question.correctAnswer;

        if (
          wasAnswered
        ) {
          answered++;
        }

        if (
          isCorrect
        ) {
          correct++;
        }

        return {
          id:
            `${session.id}:${question.id}`,

          examId:
            session.id,

          questionId:
            question.id,

          subject:
            question.subject,

          subjectName:
            question.subjectName,

          area:
            question.area,

          topic:
            question.topic,

          subtopic:
            question.subtopic,

          difficulty:
            question.difficulty,

          selectedAnswer,

          correctAnswer:
            question.correctAnswer,

          isCorrect,

          wasAnswered,

          markedForReview:
            submission
              .reviewQuestionIds
              .includes(
                question.id
              ),

          questionSnapshot:
            createQuestionSnapshot(
              question
            ),
        };
      }
    );

  /*
   * =======================================================
   * RESULTADO
   * =======================================================
   */

  const totalQuestions =
    questions.length;

  const unanswered =
    totalQuestions -
    answered;

  const incorrect =
    totalQuestions -
    correct;

  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round(
          (correct /
            totalQuestions) *
            100
        );

  /*
   * =======================================================
   * DURAÇÃO
   * =======================================================
   */

  const startedTime =
    new Date(
      progress.startedAt
    ).getTime();

  const submittedTime =
    new Date(
      submission.submittedAt
    ).getTime();

  const durationSeconds =
    Number.isFinite(
      startedTime
    ) &&
    Number.isFinite(
      submittedTime
    )
      ? Math.max(
          0,

          Math.round(
            (
              submittedTime -
              startedTime
            ) /
              1000
          )
        )
      : 0;

  /*
   * =======================================================
   * MATÉRIAS REAIS
   * =======================================================
   */

  const actualSubjects =
    Array.from(
      new Set(
        questions.map(
          (question) =>
            question.subject
        )
      )
    ) as SubjectId[];

  /*
   * =======================================================
   * PROVA
   * =======================================================
   */

  const exam:
    StoredExam = {
    id:
      session.id,

    createdAt:
      session.createdAt,

    startedAt:
      progress.startedAt,

    submittedAt:
      submission.submittedAt,

    durationSeconds,

    /*
     * NÃO tentamos adivinhar a modalidade.
     *
     * A sessão já deve possuir o valor
     * correto.
     */
    mode:
      session.mode,

    totalQuestions,

    answered,

    unanswered,

    correct,

    incorrect,

    percentage,

    difficulty:
      session.config
        .difficulty,

    questionType:
      session.config
        .questionType,

    selectedSubjects: [
      ...session.config
        .subjects,
    ],

    subjects:
      actualSubjects,

    questionIds:
      questions.map(
        (question) =>
          question.id
      ),

    alternativeOrders:
      Object.fromEntries(
        Object.entries(
          session
            .alternativeOrders
        ).map(
          ([
            questionId,
            order,
          ]) => [
            questionId,

            [
              ...order,
            ],
          ]
        )
      ),
  };

  /*
   * =======================================================
   * SALVAR
   * =======================================================
   */

  await db.transaction(
    "rw",

    db.exams,

    db.answers,

    async () => {
      await db.exams.put(
        exam
      );

      await db.answers.bulkPut(
        answers
      );
    }
  );

  try {
    const { pushCompletedExamToCloud } = await import("@/lib/academic-sync");
    await pushCompletedExamToCloud(exam, answers);
  } catch (error) {
    console.warn("A prova ficou pendente de sincronização com a conta:", error);
  }

  return exam;
}
