import { db } from "@/lib/db";
import { questionBank } from "@/data/questions";
import { subjects } from "@/data/subjects";

import type {
  Question,
  SubjectId,
} from "@/types/question";

import type {
  StoredAnswer,
} from "@/types/storage";

/*
 * =========================================================
 * NÍVEIS DE DOMÍNIO
 * =========================================================
 */

export type MasteryLevel =
  | "nao-estudado"
  | "poucos-dados"
  | "precisa-revisar"
  | "em-aprendizado"
  | "bom-dominio"
  | "dominado";

/*
 * =========================================================
 * ITEM DE DOMÍNIO
 * =========================================================
 */

export interface MasteryItem {
  key: string;

  subject: SubjectId;

  subjectName: string;

  area: string;

  topic?: string;

  subtopic?: string;

  /*
   * Quantidade de respostas dadas.
   *
   * Se você respondeu a mesma questão
   * quatro vezes, teremos 4 tentativas.
   */
  attempts: number;

  correct: number;

  incorrect: number;

  accuracy: number;

  /*
   * Questões diferentes que já apareceram.
   */
  uniqueQuestionsSeen: number;

  /*
   * Quantas questões deste conteúdo
   * existem atualmente no banco.
   */
  totalQuestionsAvailable: number;

  /*
   * Quantos % do banco daquele conteúdo
   * você já viu pelo menos uma vez.
   */
  coveragePercentage: number;

  /*
   * Desempenho nas últimas 3 tentativas.
   */
  recentAccuracy: number;

  /*
   * Quantos acertos consecutivos existem
   * no final do histórico.
   */
  correctStreak: number;

  lastAttemptCorrect:
    boolean | null;

  level: MasteryLevel;
}

/*
 * =========================================================
 * MATÉRIA
 * =========================================================
 */

export interface SubjectMastery
  extends MasteryItem {
  icon: string;

  topics: MasteryItem[];

  subtopics: MasteryItem[];
}

/*
 * =========================================================
 * RESUMO
 * =========================================================
 */

export interface MasterySummary {
  totalQuestionsBank: number;

  uniqueQuestionsSeen: number;

  overallCoverage: number;

  totalAttempts: number;

  totalCorrect: number;

  totalIncorrect: number;

  overallAccuracy: number;

  subjects: SubjectMastery[];

  needsAttention: MasteryItem[];

  strongestTopics: MasteryItem[];

  underexploredTopics: MasteryItem[];
}

/*
 * =========================================================
 * DADOS DE TEMPO DAS TENTATIVAS
 * =========================================================
 */

function sortAnswersByDate(
  answers: StoredAnswer[],
  examDateMap: Map<
    string,
    number
  >
) {
  return [...answers].sort(
    (a, b) => {
      const dateA =
        examDateMap.get(
          a.examId
        ) ?? 0;

      const dateB =
        examDateMap.get(
          b.examId
        ) ?? 0;

      return dateA - dateB;
    }
  );
}

/*
 * =========================================================
 * DESEMPENHO RECENTE
 * =========================================================
 */

function calculateRecentAccuracy(
  answers: StoredAnswer[],
  examDateMap: Map<
    string,
    number
  >
) {
  if (
    answers.length === 0
  ) {
    return 0;
  }

  const sorted =
    sortAnswersByDate(
      answers,
      examDateMap
    );

  const recent =
    sorted.slice(-3);

  const correct =
    recent.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  return Math.round(
    (correct /
      recent.length) *
      100
  );
}

/*
 * =========================================================
 * SEQUÊNCIA DE ACERTOS
 * =========================================================
 */

function calculateCorrectStreak(
  answers: StoredAnswer[],
  examDateMap: Map<
    string,
    number
  >
) {
  if (
    answers.length === 0
  ) {
    return 0;
  }

  const sorted =
    sortAnswersByDate(
      answers,
      examDateMap
    );

  let streak = 0;

  for (
    let index =
      sorted.length - 1;
    index >= 0;
    index--
  ) {
    if (
      sorted[index].isCorrect
    ) {
      streak++;

      continue;
    }

    break;
  }

  return streak;
}

/*
 * =========================================================
 * ÚLTIMA TENTATIVA
 * =========================================================
 */

function getLastAttemptCorrect(
  answers: StoredAnswer[],
  examDateMap: Map<
    string,
    number
  >
): boolean | null {
  if (
    answers.length === 0
  ) {
    return null;
  }

  const sorted =
    sortAnswersByDate(
      answers,
      examDateMap
    );

  return (
    sorted[
      sorted.length - 1
    ]?.isCorrect ?? null
  );
}

/*
 * =========================================================
 * CLASSIFICAR DOMÍNIO
 * =========================================================
 *
 * Importante:
 *
 * O percentual sozinho NÃO define
 * que o conteúdo está dominado.
 */

function classifyMastery({
  attempts,
  accuracy,
  recentAccuracy,
  correctStreak,
  coveragePercentage,
}: {
  attempts: number;

  accuracy: number;

  recentAccuracy: number;

  correctStreak: number;

  coveragePercentage: number;
}): MasteryLevel {
  /*
   * Nunca respondeu.
   */

  if (
    attempts === 0
  ) {
    return "nao-estudado";
  }

  /*
   * Uma ou duas tentativas ainda
   * não são suficientes.
   */

  if (
    attempts < 3
  ) {
    return "poucos-dados";
  }

  /*
   * DOMINADO
   *
   * Exigimos:
   *
   * - pelo menos 5 tentativas;
   * - precisão >= 85%;
   * - bom desempenho recente;
   * - pelo menos 2 acertos seguidos;
   * - cobertura razoável do conteúdo.
   */

  if (
    attempts >= 5 &&
    accuracy >= 85 &&
    recentAccuracy >= 80 &&
    correctStreak >= 2 &&
    coveragePercentage >= 60
  ) {
    return "dominado";
  }

  /*
   * BOM DOMÍNIO
   */

  if (
    accuracy >= 70 &&
    recentAccuracy >= 67
  ) {
    return "bom-dominio";
  }

  /*
   * PRECISA REVISAR
   *
   * Desempenho geral muito baixo
   * ou desempenho recente ruim.
   */

  if (
    accuracy < 50 ||
    recentAccuracy < 34
  ) {
    return "precisa-revisar";
  }

  /*
   * Caso contrário está em processo
   * de consolidação.
   */

  return "em-aprendizado";
}

/*
 * =========================================================
 * CONSTRUIR ITEM
 * =========================================================
 */

function buildMasteryItem({
  key,
  subject,
  subjectName,
  area,
  topic,
  subtopic,
  availableQuestions,
  answers,
  examDateMap,
}: {
  key: string;

  subject: SubjectId;

  subjectName: string;

  area: string;

  topic?: string;

  subtopic?: string;

  availableQuestions:
    Question[];

  answers:
    StoredAnswer[];

  examDateMap:
    Map<
      string,
      number
    >;
}): MasteryItem {
  const attempts =
    answers.length;

  const correct =
    answers.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const incorrect =
    attempts -
    correct;

  const accuracy =
    attempts === 0
      ? 0
      : Math.round(
          (correct /
            attempts) *
            100
        );

  /*
   * Questões diferentes respondidas.
   */

  const uniqueQuestionIds =
    new Set(
      answers.map(
        (answer) =>
          answer.questionId
      )
    );

  const uniqueQuestionsSeen =
    uniqueQuestionIds.size;

  const totalQuestionsAvailable =
    availableQuestions.length;

  const coveragePercentage =
    totalQuestionsAvailable === 0
      ? 0
      : Math.round(
          (uniqueQuestionsSeen /
            totalQuestionsAvailable) *
            100
        );

  const recentAccuracy =
    calculateRecentAccuracy(
      answers,
      examDateMap
    );

  const correctStreak =
    calculateCorrectStreak(
      answers,
      examDateMap
    );

  const lastAttemptCorrect =
    getLastAttemptCorrect(
      answers,
      examDateMap
    );

  const level =
    classifyMastery({
      attempts,

      accuracy,

      recentAccuracy,

      correctStreak,

      coveragePercentage,
    });

  return {
    key,

    subject,

    subjectName,

    area,

    topic,

    subtopic,

    attempts,

    correct,

    incorrect,

    accuracy,

    uniqueQuestionsSeen,

    totalQuestionsAvailable,

    coveragePercentage,

    recentAccuracy,

    correctStreak,

    lastAttemptCorrect,

    level,
  };
}

/*
 * =========================================================
 * CONSULTA PRINCIPAL
 * =========================================================
 */

export async function getMasterySummary(): Promise<MasterySummary> {
  const [
    answers,
    exams,
  ] =
    await Promise.all([
      db.answers.toArray(),

      db.exams.toArray(),
    ]);

  /*
   * =======================================================
   * MAPA DE DATAS
   * =======================================================
   */

  const examDateMap =
    new Map<
      string,
      number
    >();

  for (const exam of exams) {
    examDateMap.set(
      exam.id,

      new Date(
        exam.submittedAt
      ).getTime()
    );
  }

  /*
   * =======================================================
   * MATÉRIAS
   * =======================================================
   */

  const subjectMasteries:
    SubjectMastery[] =
    subjects.map(
      (subject) => {
        /*
         * Todas as questões desta matéria.
         */

        const subjectQuestions =
          questionBank.filter(
            (question) =>
              question.subject ===
              subject.id
          );

        /*
         * Todas as respostas históricas
         * desta matéria.
         */

        const subjectAnswers =
          answers.filter(
            (answer) =>
              answer.subject ===
              subject.id
          );

        /*
         * =================================================
         * TÓPICOS PRESENTES NO BANCO
         * =================================================
         */

        const topicNames =
          Array.from(
            new Set(
              subjectQuestions.map(
                (question) =>
                  question.topic
              )
            )
          );

        const topics =
          topicNames.map(
            (topic) => {
              const availableQuestions =
                subjectQuestions.filter(
                  (question) =>
                    question.topic ===
                    topic
                );

              const topicAnswers =
                subjectAnswers.filter(
                  (answer) =>
                    answer.topic ===
                    topic
                );

              return buildMasteryItem({
                key:
                  `${subject.id}::${topic}`,

                subject:
                  subject.id,

                subjectName:
                  subject.name,

                area:
                  subject.area,

                topic,

                availableQuestions,

                answers:
                  topicAnswers,

                examDateMap,
              });
            }
          );

        /*
         * =================================================
         * SUBTÓPICOS PRESENTES NO BANCO
         * =================================================
         */

        const subtopicKeys =
          Array.from(
            new Set(
              subjectQuestions.map(
                (question) =>
                  `${question.topic}::${question.subtopic}`
              )
            )
          );

        const subtopics =
          subtopicKeys.map(
            (compoundKey) => {
              const separator =
                compoundKey.indexOf(
                  "::"
                );

              const topic =
                compoundKey.slice(
                  0,
                  separator
                );

              const subtopic =
                compoundKey.slice(
                  separator +
                    2
                );

              const availableQuestions =
                subjectQuestions.filter(
                  (question) =>
                    question.topic ===
                      topic &&
                    question.subtopic ===
                      subtopic
                );

              const subtopicAnswers =
                subjectAnswers.filter(
                  (answer) =>
                    answer.topic ===
                      topic &&
                    answer.subtopic ===
                      subtopic
                );

              return buildMasteryItem({
                key:
                  `${subject.id}::${topic}::${subtopic}`,

                subject:
                  subject.id,

                subjectName:
                  subject.name,

                area:
                  subject.area,

                topic,

                subtopic,

                availableQuestions,

                answers:
                  subtopicAnswers,

                examDateMap,
              });
            }
          );

        /*
         * =================================================
         * DOMÍNIO DA MATÉRIA
         * =================================================
         */

        const base =
          buildMasteryItem({
            key:
              subject.id,

            subject:
              subject.id,

            subjectName:
              subject.name,

            area:
              subject.area,

            availableQuestions:
              subjectQuestions,

            answers:
              subjectAnswers,

            examDateMap,
          });

        return {
          ...base,

          icon:
            subject.icon,

          topics,

          subtopics,
        };
      }
    );

  /*
   * =======================================================
   * DADOS GERAIS
   * =======================================================
   */

  const totalQuestionsBank =
    questionBank.length;

  const uniqueQuestionIds =
    new Set(
      answers.map(
        (answer) =>
          answer.questionId
      )
    );

  const uniqueQuestionsSeen =
    uniqueQuestionIds.size;

  const overallCoverage =
    totalQuestionsBank === 0
      ? 0
      : Math.round(
          (uniqueQuestionsSeen /
            totalQuestionsBank) *
            100
        );

  const totalAttempts =
    answers.length;

  const totalCorrect =
    answers.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const totalIncorrect =
    totalAttempts -
    totalCorrect;

  const overallAccuracy =
    totalAttempts === 0
      ? 0
      : Math.round(
          (totalCorrect /
            totalAttempts) *
            100
        );

  /*
   * =======================================================
   * TODOS OS TÓPICOS
   * =======================================================
   */

  const allTopics =
    subjectMasteries.flatMap(
      (subject) =>
        subject.topics
    );

  /*
   * =======================================================
   * MAIOR PRIORIDADE
   * =======================================================
   */

  const needsAttention =
    allTopics
      .filter(
        (topic) =>
          topic.attempts >=
            3 &&
          (
            topic.level ===
              "precisa-revisar" ||
            topic.level ===
              "em-aprendizado"
          )
      )
      .sort(
        (a, b) => {
          /*
           * Precisa revisar vem
           * antes de aprendizado.
           */

          if (
            a.level !==
            b.level
          ) {
            if (
              a.level ===
              "precisa-revisar"
            ) {
              return -1;
            }

            if (
              b.level ===
              "precisa-revisar"
            ) {
              return 1;
            }
          }

          if (
            a.accuracy !==
            b.accuracy
          ) {
            return (
              a.accuracy -
              b.accuracy
            );
          }

          return (
            b.attempts -
            a.attempts
          );
        }
      )
      .slice(
        0,
        6
      );

  /*
   * =======================================================
   * PONTOS FORTES
   * =======================================================
   */

  const strongestTopics =
    allTopics
      .filter(
        (topic) =>
          topic.level ===
            "bom-dominio" ||
          topic.level ===
            "dominado"
      )
      .sort(
        (a, b) => {
          if (
            b.accuracy !==
            a.accuracy
          ) {
            return (
              b.accuracy -
              a.accuracy
            );
          }

          return (
            b.attempts -
            a.attempts
          );
        }
      )
      .slice(
        0,
        6
      );

  /*
   * =======================================================
   * CONTEÚDOS POUCO EXPLORADOS
   * =======================================================
   */

  const underexploredTopics =
    allTopics
      .filter(
        (topic) =>
          topic.level ===
            "nao-estudado" ||
          topic.level ===
            "poucos-dados"
      )
      .sort(
        (a, b) => {
          if (
            a.attempts !==
            b.attempts
          ) {
            return (
              a.attempts -
              b.attempts
            );
          }

          return (
            a.coveragePercentage -
            b.coveragePercentage
          );
        }
      )
      .slice(
        0,
        6
      );

  return {
    totalQuestionsBank,

    uniqueQuestionsSeen,

    overallCoverage,

    totalAttempts,

    totalCorrect,

    totalIncorrect,

    overallAccuracy,

    subjects:
      subjectMasteries,

    needsAttention,

    strongestTopics,

    underexploredTopics,
  };
}