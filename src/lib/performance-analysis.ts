import { db } from "@/lib/db";

import type {
  StoredAnswer,
} from "@/types/storage";

import type {
  SubjectId,
} from "@/types/question";

export interface ContentPerformance {
  key: string;

  subject: SubjectId;

  subjectName: string;

  area: string;

  topic: string;

  subtopic?: string;

  total: number;

  correct: number;

  incorrect: number;

  percentage: number;

  confidence:
    | "baixa"
    | "media"
    | "alta";
}

export interface SubjectAnalysis {
  subject: SubjectId;

  subjectName: string;

  area: string;

  total: number;

  correct: number;

  incorrect: number;

  percentage: number;

  topics: ContentPerformance[];

  subtopics: ContentPerformance[];
}

export interface PerformanceAnalysis {
  totalAnswers: number;

  totalCorrect: number;

  totalIncorrect: number;

  overallPercentage: number;

  subjects: SubjectAnalysis[];

  strongestTopics: ContentPerformance[];

  weakestTopics: ContentPerformance[];

  strongestSubtopics: ContentPerformance[];

  weakestSubtopics: ContentPerformance[];
}

/*
 * =========================================================
 * CONFIANÇA DA AMOSTRA
 * =========================================================
 */

function getConfidence(
  total: number
):
  | "baixa"
  | "media"
  | "alta" {
  if (total >= 5) {
    return "alta";
  }

  if (total >= 3) {
    return "media";
  }

  return "baixa";
}

/*
 * =========================================================
 * AGRUPAR POR TÓPICO
 * =========================================================
 */

function buildTopicStats(
  answers: StoredAnswer[]
): ContentPerformance[] {
  const map =
    new Map<
      string,
      {
        subject: SubjectId;
        subjectName: string;
        area: string;
        topic: string;
        total: number;
        correct: number;
      }
    >();

  for (const answer of answers) {
    const key =
      `${answer.subject}::${answer.topic}`;

    const current =
      map.get(key) ?? {
        subject:
          answer.subject,

        subjectName:
          answer.subjectName,

        area:
          answer.area,

        topic:
          answer.topic,

        total: 0,

        correct: 0,
      };

    current.total++;

    if (answer.isCorrect) {
      current.correct++;
    }

    map.set(
      key,
      current
    );
  }

  return Array.from(
    map.entries()
  ).map(
    ([
      key,
      data,
    ]) => ({
      key,

      subject:
        data.subject,

      subjectName:
        data.subjectName,

      area:
        data.area,

      topic:
        data.topic,

      total:
        data.total,

      correct:
        data.correct,

      incorrect:
        data.total -
        data.correct,

      percentage:
        data.total === 0
          ? 0
          : Math.round(
              (data.correct /
                data.total) *
                100
            ),

      confidence:
        getConfidence(
          data.total
        ),
    })
  );
}

/*
 * =========================================================
 * AGRUPAR POR SUBTÓPICO
 * =========================================================
 */

function buildSubtopicStats(
  answers: StoredAnswer[]
): ContentPerformance[] {
  const map =
    new Map<
      string,
      {
        subject: SubjectId;
        subjectName: string;
        area: string;
        topic: string;
        subtopic: string;
        total: number;
        correct: number;
      }
    >();

  for (const answer of answers) {
    const key =
      `${answer.subject}::${answer.topic}::${answer.subtopic}`;

    const current =
      map.get(key) ?? {
        subject:
          answer.subject,

        subjectName:
          answer.subjectName,

        area:
          answer.area,

        topic:
          answer.topic,

        subtopic:
          answer.subtopic,

        total: 0,

        correct: 0,
      };

    current.total++;

    if (answer.isCorrect) {
      current.correct++;
    }

    map.set(
      key,
      current
    );
  }

  return Array.from(
    map.entries()
  ).map(
    ([
      key,
      data,
    ]) => ({
      key,

      subject:
        data.subject,

      subjectName:
        data.subjectName,

      area:
        data.area,

      topic:
        data.topic,

      subtopic:
        data.subtopic,

      total:
        data.total,

      correct:
        data.correct,

      incorrect:
        data.total -
        data.correct,

      percentage:
        data.total === 0
          ? 0
          : Math.round(
              (data.correct /
                data.total) *
                100
            ),

      confidence:
        getConfidence(
          data.total
        ),
    })
  );
}

/*
 * =========================================================
 * ANÁLISE PRINCIPAL
 * =========================================================
 */

export async function getPerformanceAnalysis(): Promise<PerformanceAnalysis> {
  const answers =
    await db.answers.toArray();

  const totalAnswers =
    answers.length;

  const totalCorrect =
    answers.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const totalIncorrect =
    totalAnswers -
    totalCorrect;

  const overallPercentage =
    totalAnswers === 0
      ? 0
      : Math.round(
          (totalCorrect /
            totalAnswers) *
            100
        );

  const topics =
    buildTopicStats(
      answers
    );

  const subtopics =
    buildSubtopicStats(
      answers
    );

  /*
   * =======================================================
   * MATÉRIAS
   * =======================================================
   */

  const subjectMap =
    new Map<
      SubjectId,
      StoredAnswer[]
    >();

  for (const answer of answers) {
    const current =
      subjectMap.get(
        answer.subject
      ) ?? [];

    current.push(
      answer
    );

    subjectMap.set(
      answer.subject,
      current
    );
  }

  const subjects:
    SubjectAnalysis[] =
    Array.from(
      subjectMap.entries()
    ).map(
      ([
        subjectId,
        subjectAnswers,
      ]) => {
        const correct =
          subjectAnswers.filter(
            (answer) =>
              answer.isCorrect
          ).length;

        const total =
          subjectAnswers.length;

        const first =
          subjectAnswers[0];

        return {
          subject:
            subjectId,

          subjectName:
            first.subjectName,

          area:
            first.area,

          total,

          correct,

          incorrect:
            total -
            correct,

          percentage:
            total === 0
              ? 0
              : Math.round(
                  (correct /
                    total) *
                    100
                ),

          topics:
            topics
              .filter(
                (topic) =>
                  topic.subject ===
                  subjectId
              )
              .sort(
                (a, b) =>
                  b.total -
                  a.total
              ),

          subtopics:
            subtopics
              .filter(
                (subtopic) =>
                  subtopic.subject ===
                  subjectId
              )
              .sort(
                (a, b) =>
                  b.total -
                  a.total
              ),
        };
      }
    );

  /*
   * =======================================================
   * RANKINGS
   *
   * Conteúdos com mais tentativas
   * têm prioridade em empates.
   * =======================================================
   */

  const strongestTopics =
    [...topics]
      .sort(
        (a, b) => {
          if (
            b.percentage !==
            a.percentage
          ) {
            return (
              b.percentage -
              a.percentage
            );
          }

          return (
            b.total -
            a.total
          );
        }
      )
      .slice(
        0,
        5
      );

  const weakestTopics =
    [...topics]
      .sort(
        (a, b) => {
          if (
            a.percentage !==
            b.percentage
          ) {
            return (
              a.percentage -
              b.percentage
            );
          }

          return (
            b.total -
            a.total
          );
        }
      )
      .slice(
        0,
        5
      );

  const strongestSubtopics =
    [...subtopics]
      .sort(
        (a, b) => {
          if (
            b.percentage !==
            a.percentage
          ) {
            return (
              b.percentage -
              a.percentage
            );
          }

          return (
            b.total -
            a.total
          );
        }
      )
      .slice(
        0,
        5
      );

  const weakestSubtopics =
    [...subtopics]
      .sort(
        (a, b) => {
          if (
            a.percentage !==
            b.percentage
          ) {
            return (
              a.percentage -
              b.percentage
            );
          }

          return (
            b.total -
            a.total
          );
        }
      )
      .slice(
        0,
        5
      );

  return {
    totalAnswers,

    totalCorrect,

    totalIncorrect,

    overallPercentage,

    subjects,

    strongestTopics,

    weakestTopics,

    strongestSubtopics,

    weakestSubtopics,
  };
}