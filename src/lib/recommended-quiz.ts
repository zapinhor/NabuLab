import {
  questionBank,
} from "@/data/questions";

import {
  db,
} from "@/lib/db";

import {
  getSubjectEvolutionSummary,
  type SubjectEvolution,
} from "@/lib/subject-evolution";

import type {
  Question,
  SubjectId,
} from "@/types/question";

import type {
  StoredAnswer,
  StoredExam,
} from "@/types/storage";

/*
 * =========================================================
 * CATEGORIAS
 * =========================================================
 */

export type RecommendationCategory =
  | "erro-recorrente"
  | "baixo-dominio"
  | "pouco-explorado"
  | "reforco";

/*
 * =========================================================
 * QUESTÃO RECOMENDADA
 * =========================================================
 */

export interface RecommendedQuestion {
  question:
    Question;

  category:
    RecommendationCategory;

  score:
    number;

  attempts:
    number;

  correct:
    number;

  errors:
    number;

  accuracy:
    number;

  recentAccuracy:
    number;

  lastAttemptCorrect:
    boolean | null;

  subjectTrend:
    SubjectEvolution["trend"];

  subjectRecentAverage:
    number;

  subjectSlope:
    number;

  reasons:
    string[];
}

/*
 * =========================================================
 * RESUMO
 * =========================================================
 */

export interface RecommendedQuizSummary {
  totalQuestions:
    number;

  recurringErrors:
    number;

  lowMastery:
    number;

  underexplored:
    number;

  reinforcement:
    number;

  questions:
    RecommendedQuestion[];
}

/*
 * =========================================================
 * ESTATÍSTICAS INTERNAS
 * =========================================================
 */

interface QuestionHistory {
  attempts:
    number;

  correct:
    number;

  errors:
    number;

  accuracy:
    number;

  recentAccuracy:
    number;

  lastAttemptCorrect:
    boolean | null;

  lastExamIndex:
    number | null;
}

/*
 * =========================================================
 * AGRUPAR RESPOSTAS
 * =========================================================
 */

function groupAnswersByQuestion(
  answers:
    StoredAnswer[]
) {
  const map =
    new Map<
      string,
      StoredAnswer[]
    >();

  for (
    const answer of
    answers
  ) {
    const current =
      map.get(
        answer.questionId
      ) ?? [];

    current.push(
      answer
    );

    map.set(
      answer.questionId,
      current
    );
  }

  return map;
}

/*
 * =========================================================
 * MAPA DE ORDEM DAS PROVAS
 * =========================================================
 */

function buildExamIndexMap(
  exams:
    StoredExam[]
) {
  const ordered =
    [...exams].sort(
      (
        a,
        b
      ) =>
        new Date(
          a.submittedAt
        ).getTime() -
        new Date(
          b.submittedAt
        ).getTime()
    );

  return new Map(
    ordered.map(
      (
        exam,
        index
      ) => [
        exam.id,
        index,
      ]
    )
  );
}

/*
 * =========================================================
 * HISTÓRICO DE UMA QUESTÃO
 * =========================================================
 */

function buildQuestionHistory(
  answers:
    StoredAnswer[],
  examIndexMap:
    Map<string, number>
): QuestionHistory {
  if (
    answers.length ===
    0
  ) {
    return {
      attempts:
        0,

      correct:
        0,

      errors:
        0,

      accuracy:
        0,

      recentAccuracy:
        0,

      lastAttemptCorrect:
        null,

      lastExamIndex:
        null,
    };
  }

  const ordered =
    [...answers].sort(
      (
        a,
        b
      ) =>
        (
          examIndexMap.get(
            a.examId
          ) ??
          -1
        ) -
        (
          examIndexMap.get(
            b.examId
          ) ??
          -1
        )
    );

  const attempts =
    ordered.length;

  const correct =
    ordered.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const errors =
    attempts -
    correct;

  const accuracy =
    Math.round(
      (
        correct /
        attempts
      ) *
        100
    );

  const recent =
    ordered.slice(
      -3
    );

  const recentCorrect =
    recent.filter(
      (answer) =>
        answer.isCorrect
    ).length;

  const recentAccuracy =
    recent.length ===
    0
      ? 0
      : Math.round(
          (
            recentCorrect /
            recent.length
          ) *
            100
        );

  const last =
    ordered[
      ordered.length - 1
    ];

  return {
    attempts,

    correct,

    errors,

    accuracy,

    recentAccuracy,

    lastAttemptCorrect:
      last.isCorrect,

    lastExamIndex:
      examIndexMap.get(
        last.examId
      ) ??
      null,
  };
}

/*
 * =========================================================
 * CATEGORIA
 * =========================================================
 */

function classifyQuestion(
  history:
    QuestionHistory
): RecommendationCategory {
  /*
   * Erro recorrente
   */

  if (
    history.errors >= 2 &&
    (
      history.lastAttemptCorrect ===
        false ||
      history.accuracy <=
        60
    )
  ) {
    return "erro-recorrente";
  }

  /*
   * Baixo domínio
   */

  if (
    history.attempts >= 2 &&
    (
      history.accuracy <
        65 ||
      history.recentAccuracy <
        60
    )
  ) {
    return "baixo-dominio";
  }

  /*
   * Pouco explorado
   */

  if (
    history.attempts <=
    1
  ) {
    return "pouco-explorado";
  }

  return "reforco";
}

/*
 * =========================================================
 * SCORE BASE
 * =========================================================
 */

function getCategoryBaseScore(
  category:
    RecommendationCategory
) {
  switch (
    category
  ) {
    case "erro-recorrente":
      return 100;

    case "baixo-dominio":
      return 75;

    case "pouco-explorado":
      return 50;

    case "reforco":
      return 25;
  }
}

/*
 * =========================================================
 * EVOLUÇÃO DA MATÉRIA
 * =========================================================
 */

function getSubjectEvolutionModifier(
  evolution:
    SubjectEvolution | undefined
) {
  if (!evolution) {
    return {
      score:
        0,

      reasons:
        [] as string[],
    };
  }

  let score = 0;

  const reasons:
    string[] = [];

  /*
   * Tendência
   */

  if (
    evolution.trend ===
    "caindo"
  ) {
    score += 22;

    reasons.push(
      "A matéria apresenta tendência recente de queda."
    );
  }

  if (
    evolution.trend ===
    "subindo"
  ) {
    score -= 8;

    reasons.push(
      "A matéria está apresentando evolução recente."
    );
  }

  /*
   * Média recente
   */

  if (
    evolution.recentAverage <
      50 &&
    evolution.totalExams >
      0
  ) {
    score += 15;

    reasons.push(
      "O desempenho recente da matéria está abaixo de 50%."
    );
  } else if (
    evolution.recentAverage <
      65 &&
    evolution.totalExams >
      0
  ) {
    score += 8;

    reasons.push(
      "O desempenho recente da matéria ainda está baixo."
    );
  } else if (
    evolution.recentAverage >=
      85
  ) {
    score -= 8;
  }

  /*
   * Inclinação
   */

  if (
    evolution.slope <=
    -10
  ) {
    score += 8;
  }

  return {
    score,

    reasons,
  };
}

/*
 * =========================================================
 * SCORE DA QUESTÃO
 * =========================================================
 */

function calculateQuestionScore({
  category,
  history,
  evolution,
  latestExamIndex,
}: {
  category:
    RecommendationCategory;

  history:
    QuestionHistory;

  evolution:
    SubjectEvolution | undefined;

  latestExamIndex:
    number;
}) {
  let score =
    getCategoryBaseScore(
      category
    );

  const reasons:
    string[] = [];

  /*
   * =======================================================
   * ERROS
   * =======================================================
   */

  score +=
    history.errors *
    14;

  if (
    history.errors >=
    2
  ) {
    reasons.push(
      `Você já errou esta questão ${history.errors} vezes.`
    );
  }

  /*
   * =======================================================
   * TAXA DE ACERTO
   * =======================================================
   */

  if (
    history.attempts >
    0
  ) {
    score +=
      (
        100 -
        history.accuracy
      ) *
      0.22;
  }

  if (
    history.accuracy <
      50 &&
    history.attempts >=
      2
  ) {
    reasons.push(
      `Seu aproveitamento histórico nesta questão é de ${history.accuracy}%.`
    );
  }

  /*
   * =======================================================
   * ÚLTIMA RESPOSTA
   * =======================================================
   */

  if (
    history.lastAttemptCorrect ===
    false
  ) {
    score += 16;

    reasons.push(
      "Você errou esta questão na tentativa mais recente."
    );
  }

  /*
   * =======================================================
   * DESEMPENHO RECENTE
   * =======================================================
   */

  if (
    history.attempts >=
      2 &&
    history.recentAccuracy <
      50
  ) {
    score += 12;

    reasons.push(
      "Seu desempenho recente nesta questão continua baixo."
    );
  }

  /*
   * =======================================================
   * QUESTÃO NOVA
   * =======================================================
   */

  if (
    history.attempts ===
    0
  ) {
    score += 18;

    reasons.push(
      "Esta questão ainda não apareceu em seus simulados."
    );
  } else if (
    history.attempts ===
    1
  ) {
    score += 8;

    reasons.push(
      "Esta questão ainda foi pouco explorada."
    );
  }

  /*
   * =======================================================
   * EVOLUÇÃO DA MATÉRIA
   * =======================================================
   */

  const evolutionModifier =
    getSubjectEvolutionModifier(
      evolution
    );

  score +=
    evolutionModifier.score;

  reasons.push(
    ...evolutionModifier.reasons
  );

  /*
   * =======================================================
   * PENALIDADE POR REPETIÇÃO
   * =======================================================
   *
   * Evita recomendar sempre as mesmas
   * questões.
   */

  score -=
    Math.min(
      history.attempts *
        2,
      18
    );

  /*
   * =======================================================
   * PENALIDADE POR APARIÇÃO MUITO RECENTE
   * =======================================================
   */

  if (
    history.lastExamIndex !==
      null
  ) {
    const distance =
      latestExamIndex -
      history.lastExamIndex;

    if (
      distance === 0
    ) {
      score -= 18;
    } else if (
      distance === 1
    ) {
      score -= 10;
    } else if (
      distance === 2
    ) {
      score -= 5;
    }
  }

  return {
    score:
      Math.round(
        score *
          10
      ) /
      10,

    reasons,
  };
}

/*
 * =========================================================
 * RESUMO COMPLETO
 * =========================================================
 */

export async function getRecommendedQuizSummary(): Promise<RecommendedQuizSummary> {
  const [
    exams,
    answers,
    evolutionSummary,
  ] =
    await Promise.all([
      db.exams.toArray(),

      db.answers.toArray(),

      getSubjectEvolutionSummary(),
    ]);

  const answersByQuestion =
    groupAnswersByQuestion(
      answers
    );

  const examIndexMap =
    buildExamIndexMap(
      exams
    );

  const latestExamIndex =
    exams.length -
    1;

  const evolutionMap =
    new Map<
      SubjectId,
      SubjectEvolution
    >(
      evolutionSummary.subjects.map(
        (subject) => [
          subject.subject,
          subject,
        ]
      )
    );

  const questions:
    RecommendedQuestion[] =
    questionBank.map(
      (question) => {
        const history =
          buildQuestionHistory(
            answersByQuestion.get(
              question.id
            ) ?? [],
            examIndexMap
          );

        const category =
          classifyQuestion(
            history
          );

        const evolution =
          evolutionMap.get(
            question.subject
          );

        const ranking =
          calculateQuestionScore({
            category,

            history,

            evolution,

            latestExamIndex,
          });

        return {
          question,

          category,

          score:
            ranking.score,

          attempts:
            history.attempts,

          correct:
            history.correct,

          errors:
            history.errors,

          accuracy:
            history.accuracy,

          recentAccuracy:
            history.recentAccuracy,

          lastAttemptCorrect:
            history.lastAttemptCorrect,

          subjectTrend:
            evolution?.trend ??
            "poucos-dados",

          subjectRecentAverage:
            evolution?.recentAverage ??
            0,

          subjectSlope:
            evolution?.slope ??
            0,

          reasons:
            ranking.reasons,
        };
      }
    );

  questions.sort(
    (
      a,
      b
    ) =>
      b.score -
      a.score
  );

  return {
    totalQuestions:
      questions.length,

    recurringErrors:
      questions.filter(
        (item) =>
          item.category ===
          "erro-recorrente"
      ).length,

    lowMastery:
      questions.filter(
        (item) =>
          item.category ===
          "baixo-dominio"
      ).length,

    underexplored:
      questions.filter(
        (item) =>
          item.category ===
          "pouco-explorado"
      ).length,

    reinforcement:
      questions.filter(
        (item) =>
          item.category ===
          "reforco"
      ).length,

    questions,
  };
}

/*
 * =========================================================
 * EMBARALHAR PEQUENAS VARIAÇÕES
 * =========================================================
 */

function addSmallRandomVariation(
  items:
    RecommendedQuestion[]
) {
  return items
    .map(
      (item) => ({
        item,

        randomScore:
          item.score +
          Math.random() *
            4,
      })
    )
    .sort(
      (
        a,
        b
      ) =>
        b.randomScore -
        a.randomScore
    )
    .map(
      (entry) =>
        entry.item
    );
}

/*
 * =========================================================
 * SELEÇÃO COM DIVERSIDADE
 * =========================================================
 */

function selectWithDiversity({
  candidates,
  amount,
  alreadySelected,
}: {
  candidates:
    RecommendedQuestion[];

  amount:
    number;

  alreadySelected:
    RecommendedQuestion[];
}) {
  const selected:
    RecommendedQuestion[] =
    [];

  const remaining =
    addSmallRandomVariation(
      candidates
    );

  while (
    selected.length <
      amount &&
    remaining.length >
      0
  ) {
    let bestIndex = 0;

    let bestScore =
      Number.NEGATIVE_INFINITY;

    for (
      let index = 0;
      index <
      remaining.length;
      index++
    ) {
      const candidate =
        remaining[
          index
        ];

      const allSelected = [
        ...alreadySelected,
        ...selected,
      ];

      const sameSubject =
        allSelected.filter(
          (item) =>
            item.question.subject ===
            candidate.question.subject
        ).length;

      const sameTopic =
        allSelected.filter(
          (item) =>
            item.question.topic ===
            candidate.question.topic
        ).length;

      const diversityScore =
        candidate.score -
        sameSubject *
          6 -
        sameTopic *
          9;

      if (
        diversityScore >
        bestScore
      ) {
        bestScore =
          diversityScore;

        bestIndex =
          index;
      }
    }

    const [
      chosen,
    ] =
      remaining.splice(
        bestIndex,
        1
      );

    selected.push(
      chosen
    );
  }

  return selected;
}

/*
 * =========================================================
 * SELECIONAR QUESTÕES
 * =========================================================
 */

export function selectRecommendedQuestions(
  summary:
    RecommendedQuizSummary,
  amount:
    number
): RecommendedQuestion[] {
  const safeAmount =
    Math.max(
      1,
      Math.min(
        amount,
        summary.questions.length
      )
    );

  /*
   * Distribuição aproximada:
   *
   * 40% erros
   * 30% baixo domínio
   * 20% pouco explorado
   * 10% reforço
   */

  const recurringTarget =
    Math.round(
      safeAmount *
        0.4
    );

  const lowMasteryTarget =
    Math.round(
      safeAmount *
        0.3
    );

  const underexploredTarget =
    Math.round(
      safeAmount *
        0.2
    );

  const reinforcementTarget =
    Math.max(
      0,
      safeAmount -
        recurringTarget -
        lowMasteryTarget -
        underexploredTarget
    );

  const byCategory = (
    category:
      RecommendationCategory
  ) =>
    summary.questions.filter(
      (item) =>
        item.category ===
        category
    );

  const selected:
    RecommendedQuestion[] =
    [];

  const addCategory = (
    category:
      RecommendationCategory,
    target:
      number
  ) => {
    const available =
      byCategory(
        category
      ).filter(
        (candidate) =>
          !selected.some(
            (item) =>
              item.question.id ===
              candidate.question.id
          )
      );

    const chosen =
      selectWithDiversity({
        candidates:
          available,

        amount:
          target,

        alreadySelected:
          selected,
      });

    selected.push(
      ...chosen
    );
  };

  addCategory(
    "erro-recorrente",
    recurringTarget
  );

  addCategory(
    "baixo-dominio",
    lowMasteryTarget
  );

  addCategory(
    "pouco-explorado",
    underexploredTarget
  );

  addCategory(
    "reforco",
    reinforcementTarget
  );

  /*
   * Se alguma categoria não tiver
   * questões suficientes, completamos
   * com o ranking geral.
   */

  if (
    selected.length <
    safeAmount
  ) {
    const remaining =
      summary.questions.filter(
        (candidate) =>
          !selected.some(
            (item) =>
              item.question.id ===
              candidate.question.id
          )
      );

    const fill =
      selectWithDiversity({
        candidates:
          remaining,

        amount:
          safeAmount -
          selected.length,

        alreadySelected:
          selected,
      });

    selected.push(
      ...fill
    );
  }

  return selected.slice(
    0,
    safeAmount
  );
}