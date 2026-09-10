import {
  questionBank,
} from "@/data/questions";

import {
  subjects,
} from "@/data/subjects";

import type {
  Difficulty,
  EducationLevel,
  ExamTag,
  QuestionType,
  SubjectId,
} from "@/types/question";

/*
 * =========================================================
 * TIPOS
 * =========================================================
 */

export type AuditSeverity =
  | "error"
  | "warning";

export interface AuditIssue {
  severity: AuditSeverity;

  code: string;

  questionId: string;

  message: string;
}

export interface SubjectAuditStats {
  subject: SubjectId;

  subjectName: string;

  area: string;

  total: number;

  multipleChoice: number;

  trueFalse: number;

  iniciante: number;

  medio: number;

  avancado: number;

  combinations: Record<
    QuestionType,
    Record<Difficulty, number>
  >;

  topics: number;

  subtopics: number;
}

export interface QuestionBankAudit {
  totalQuestions: number;

  validQuestions: number;

  invalidQuestions: number;

  totalErrors: number;

  totalWarnings: number;

  duplicateIds: string[];

  duplicateStatements: number;

  structureValid: boolean;

  subjectBalanced: boolean;

  difficultyBalanced: boolean;

  subjectBalanceSpread: number;

  difficultyBalanceSpread: number;

  byType: {
    multipleChoice: number;

    trueFalse: number;
  };

  byDifficulty: {
    iniciante: number;

    medio: number;

    avancado: number;
  };

  subjects: SubjectAuditStats[];

  totalTopics: number;

  totalSubtopics: number;

  issues: AuditIssue[];
}

/*
 * =========================================================
 * CONSTANTES
 * =========================================================
 */

const VALID_DIFFICULTIES:
  Difficulty[] = [
    "iniciante",
    "medio",
    "avancado",
  ];

const VALID_TYPES:
  QuestionType[] = [
    "multiple-choice",
    "true-false",
  ];

const MULTIPLE_CHOICE_IDS = [
  "A",
  "B",
  "C",
  "D",
];

const TRUE_FALSE_IDS = [
  "V",
  "F",
];

const VALID_EXAM_TAGS: ExamTag[] = [
  "enem",
  "fuvest",
  "unesp",
  "fatec",
  "etec",
];

const VALID_EDUCATION_LEVELS: EducationLevel[] = [
  "ensino-fundamental",
  "ensino-medio",
  "fundamental-e-medio",
];

/*
 * =========================================================
 * UTILITÁRIOS
 * =========================================================
 */

function normalizeText(
  value: string
) {
  return value
    .trim()
    .toLocaleLowerCase(
      "pt-BR"
    )
    .replace(
      /\s+/g,
      " "
    );
}

const PEDAGOGICAL_BOILERPLATE = [
  "a análise correta mobiliza",
  "o ponto decisivo é interpretar",
  "sem acrescentar condições inexistentes",
  "ignora a informação central apresentada",
  "apenas porque pertence à mesma matéria",
  "descartar o contexto",
  "limita a conclusão ao que as evidências permitem afirmar",
  "não autoriza generalização automática",
  "ii exige restringir o alcance",
  "a sequência entre i e ii demonstra causalidade",
];

function tokenSet(value: string) {
  return new Set(
    normalizeText(value)
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .split(" ")
      .filter((token) => token.length > 2)
  );
}

function jaccard(first: Set<string>, second: Set<string>) {
  const intersection = [...first].filter((token) => second.has(token)).length;
  const union = new Set([...first, ...second]).size;
  return union === 0 ? 0 : intersection / union;
}

function arraysContainSameValues(
  first: string[],
  second: string[]
) {
  if (
    first.length !==
    second.length
  ) {
    return false;
  }

  const a =
    [...first].sort();

  const b =
    [...second].sort();

  return a.every(
    (
      value,
      index
    ) =>
      value ===
      b[index]
  );
}

/*
 * =========================================================
 * AUDITORIA
 * =========================================================
 */

export function auditQuestionBank(): QuestionBankAudit {
  const issues:
    AuditIssue[] = [];

  /*
   * Guardamos os índices das questões
   * estruturalmente inválidas.
   *
   * Isso permite contar corretamente
   * mesmo se existirem IDs duplicados.
   */

  const invalidIndexes =
    new Set<number>();

  function addIssue(
    issue: AuditIssue,
    questionIndex?: number
  ) {
    issues.push(
      issue
    );

    if (
      issue.severity ===
        "error" &&
      questionIndex !==
        undefined
    ) {
      invalidIndexes.add(
        questionIndex
      );
    }
  }

  /*
   * =======================================================
   * MATÉRIAS VÁLIDAS
   * =======================================================
   */

  const subjectMap =
    new Map(
      subjects.map(
        (subject) => [
          subject.id,
          subject,
        ]
      )
    );

  /*
   * =======================================================
   * IDs DUPLICADOS
   * =======================================================
   */

  const idCount =
    new Map<
      string,
      number
    >();

  for (
    const question of
    questionBank
  ) {
    const id =
      question.id.trim();

    if (!id) {
      continue;
    }

    idCount.set(
      id,
      (
        idCount.get(
          id
        ) ?? 0
      ) + 1
    );
  }

  const duplicateIds =
    Array.from(
      idCount.entries()
    )
      .filter(
        (
          [
            ,
            count,
          ]
        ) =>
          count >
          1
      )
      .map(
        (
          [
            id,
          ]
        ) =>
          id
      );

  /*
   * =======================================================
   * ANALISAR QUESTÃO POR QUESTÃO
   * =======================================================
   */

  questionBank.forEach(
    (
      question,
      questionIndex
    ) => {
      const questionId =
        question.id.trim() ||
        `Questão sem ID #${questionIndex + 1}`;

      /*
       * ---------------------------------------------------
       * ID
       * ---------------------------------------------------
       */

      if (
        !question.id.trim()
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "EMPTY_ID",

            questionId,

            message:
              "A questão não possui ID.",
          },
          questionIndex
        );
      }

      if (
        question.id.trim() &&
        (
          idCount.get(
            question.id.trim()
          ) ?? 0
        ) >
          1
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "DUPLICATE_ID",

            questionId,

            message:
              `O ID "${question.id}" está sendo utilizado por mais de uma questão.`,
          },
          questionIndex
        );
      }

      /*
       * ---------------------------------------------------
       * CAMPOS OBRIGATÓRIOS
       * ---------------------------------------------------
       */

      const requiredFields = [
        {
          label:
            "área",

          value:
            question.area,
        },
        {
          label:
            "nome da matéria",

          value:
            question.subjectName,
        },
        {
          label:
            "tópico",

          value:
            question.topic,
        },
        {
          label:
            "subtópico",

          value:
            question.subtopic,
        },
        {
          label:
            "enunciado",

          value:
            question.statement,
        },
        {
          label:
            "explicação",

          value:
            question.explanation,
        },
      ];

      const pedagogicalText = normalizeText([
        question.statement,
        question.explanation,
        ...question.alternatives.map((alternative) => alternative.text),
        ...Object.values(question.alternativeExplanations),
      ].join(" "));

      for (const pattern of PEDAGOGICAL_BOILERPLATE) {
        if (pedagogicalText.includes(pattern)) {
          addIssue({
            severity: "error",
            code: "PEDAGOGICAL_BOILERPLATE",
            questionId,
            message: `A questão contém o padrão artificial proibido: "${pattern}".`,
          }, questionIndex);
        }
      }

      for (
        const field of
        requiredFields
      ) {
        if (
          !field.value.trim()
        ) {
          addIssue(
            {
              severity:
                "error",

              code:
                "EMPTY_REQUIRED_FIELD",

              questionId,

              message:
                `O campo "${field.label}" está vazio.`,
            },
            questionIndex
          );
        }
      }

      /*
       * ---------------------------------------------------
       * MATÉRIA
       * ---------------------------------------------------
       */

      const subjectMetadata =
        subjectMap.get(
          question.subject
        );

      if (
        !subjectMetadata
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_SUBJECT",

            questionId,

            message:
              `A matéria "${question.subject}" não existe em subjects.ts.`,
          },
          questionIndex
        );
      } else {
        if (
          question.subjectName !==
          subjectMetadata.name
        ) {
          addIssue(
            {
              severity:
                "warning",

              code:
                "SUBJECT_NAME_MISMATCH",

              questionId,

              message:
                `subjectName é "${question.subjectName}", mas a matéria cadastrada é "${subjectMetadata.name}".`,
            }
          );
        }

        if (
          question.area !==
          subjectMetadata.area
        ) {
          addIssue(
            {
              severity:
                "warning",

              code:
                "AREA_MISMATCH",

              questionId,

              message:
                `A área da questão é "${question.area}", mas subjects.ts informa "${subjectMetadata.area}".`,
            }
          );
        }
      }

      /*
       * ---------------------------------------------------
       * DIFICULDADE
       * ---------------------------------------------------
       */

      if (
        !VALID_DIFFICULTIES.includes(
          question.difficulty
        )
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_DIFFICULTY",

            questionId,

            message:
              `Dificuldade inválida: "${question.difficulty}".`,
          },
          questionIndex
        );
      }

      /*
       * ---------------------------------------------------
       * TIPO
       * ---------------------------------------------------
       */

      if (
        !VALID_TYPES.includes(
          question.type
        )
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_TYPE",

            questionId,

            message:
              `Tipo de questão inválido: "${question.type}".`,
          },
          questionIndex
        );
      }

      /*
       * ---------------------------------------------------
       * ALTERNATIVAS
       * ---------------------------------------------------
       */

      const alternatives =
        question.alternatives;

      if (
        !Array.isArray(
          alternatives
        ) ||
        alternatives.length ===
          0
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "NO_ALTERNATIVES",

            questionId,

            message:
              "A questão não possui alternativas.",
          },
          questionIndex
        );

        return;
      }

      /*
       * Quantidade
       */

      if (
        question.type ===
          "multiple-choice" &&
        alternatives.length !==
          4
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_MC_ALTERNATIVE_COUNT",

            questionId,

            message:
              `Questões de múltipla escolha devem possuir 4 alternativas. Esta possui ${alternatives.length}.`,
          },
          questionIndex
        );
      }

      if (
        question.type ===
          "true-false" &&
        alternatives.length !==
          2
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_TF_ALTERNATIVE_COUNT",

            questionId,

            message:
              `Questões V/F devem possuir exatamente 2 alternativas. Esta possui ${alternatives.length}.`,
          },
          questionIndex
        );
      }

      /*
       * IDs e textos
       */

      const alternativeIds =
        alternatives.map(
          (alternative) =>
            alternative.id
        );

      const normalizedAlternativeTexts =
        alternatives.map(
          (alternative) =>
            normalizeText(
              alternative.text
            )
        );

      for (
        const alternative of
        alternatives
      ) {
        if (
          !alternative.id.trim()
        ) {
          addIssue(
            {
              severity:
                "error",

              code:
                "EMPTY_ALTERNATIVE_ID",

              questionId,

              message:
                "Existe uma alternativa sem identificador.",
            },
            questionIndex
          );
        }

        if (
          !alternative.text.trim()
        ) {
          addIssue(
            {
              severity:
                "error",

              code:
                "EMPTY_ALTERNATIVE_TEXT",

              questionId,

              message:
                `A alternativa "${alternative.id}" não possui texto.`,
            },
            questionIndex
          );
        }
      }

      /*
       * IDs de alternativas duplicados
       */

      if (
        new Set(
          alternativeIds
        ).size !==
        alternativeIds.length
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "DUPLICATE_ALTERNATIVE_ID",

            questionId,

            message:
              "A questão possui identificadores de alternativas duplicados.",
          },
          questionIndex
        );
      }

      /*
       * Textos duplicados
       */

      if (
        new Set(
          normalizedAlternativeTexts
        ).size !==
        normalizedAlternativeTexts.length
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "DUPLICATE_ALTERNATIVE_TEXT",

            questionId,

            message:
              "A questão possui alternativas com o mesmo texto.",
          },
          questionIndex
        );
      }

      /*
       * ---------------------------------------------------
       * PADRÃO A/B/C/D
       * ---------------------------------------------------
       */

      if (
        question.type ===
          "multiple-choice" &&
        !arraysContainSameValues(
          alternativeIds,
          MULTIPLE_CHOICE_IDS
        )
      ) {
        addIssue(
          {
            severity:
              "warning",

            code:
              "NON_STANDARD_MC_IDS",

            questionId,

            message:
              "Questão MC não utiliza exatamente os IDs A, B, C e D.",
          }
        );
      }

      /*
       * ---------------------------------------------------
       * PADRÃO V/F
       * ---------------------------------------------------
       */

      if (
        question.type ===
        "true-false"
      ) {
        if (
          !arraysContainSameValues(
            alternativeIds,
            TRUE_FALSE_IDS
          )
        ) {
          addIssue(
            {
              severity:
                "error",

              code:
                "INVALID_TF_IDS",

              questionId,

              message:
                'Questões V/F devem utilizar os IDs "V" e "F".',
            },
            questionIndex
          );
        }

        const trueAlternative =
          alternatives.find(
            (alternative) =>
              alternative.id ===
              "V"
          );

        const falseAlternative =
          alternatives.find(
            (alternative) =>
              alternative.id ===
              "F"
          );

        if (
          trueAlternative &&
          normalizeText(
            trueAlternative.text
          ) !==
            "verdadeiro"
        ) {
          addIssue(
            {
              severity:
                "warning",

              code:
                "NON_STANDARD_TRUE_TEXT",

              questionId,

              message:
                'A alternativa "V" deveria utilizar o texto "Verdadeiro".',
            }
          );
        }

        if (
          falseAlternative &&
          normalizeText(
            falseAlternative.text
          ) !==
            "falso"
        ) {
          addIssue(
            {
              severity:
                "warning",

              code:
                "NON_STANDARD_FALSE_TEXT",

              questionId,

              message:
                'A alternativa "F" deveria utilizar o texto "Falso".',
            }
          );
        }
      }

      /*
       * ---------------------------------------------------
       * RESPOSTA CORRETA
       * ---------------------------------------------------
       */

      if (
        !question.correctAnswer.trim()
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "EMPTY_CORRECT_ANSWER",

            questionId,

            message:
              "correctAnswer está vazio.",
          },
          questionIndex
        );
      } else if (
        !alternativeIds.includes(
          question.correctAnswer
        )
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "CORRECT_ANSWER_NOT_FOUND",

            questionId,

            message:
              `A resposta correta "${question.correctAnswer}" não existe entre as alternativas.`,
          },
          questionIndex
        );
      }

      if (
        question.type ===
          "true-false" &&
        !TRUE_FALSE_IDS.includes(
          question.correctAnswer
        )
      ) {
        addIssue(
          {
            severity:
              "error",

            code:
              "INVALID_TF_CORRECT_ANSWER",

            questionId,

            message:
              'A resposta de uma questão V/F deve ser "V" ou "F".',
          },
          questionIndex
        );
      }

      /*
       * ---------------------------------------------------
       * EXPLICAÇÕES DAS ALTERNATIVAS
       * ---------------------------------------------------
       */

      for (
        const alternative of
        alternatives
      ) {
        const explanation =
          question
            .alternativeExplanations[
            alternative.id
          ];

        if (
          !explanation ||
          !explanation.trim()
        ) {
          addIssue(
            {
              severity:
                "error",

              code:
                "MISSING_ALTERNATIVE_EXPLANATION",

              questionId,

              message:
                `A alternativa "${alternative.id}" não possui explicação.`,
            },
            questionIndex
          );
        }
      }

      /*
       * Explicações que não correspondem
       * a nenhuma alternativa.
       */

      const explanationIds =
        Object.keys(
          question.alternativeExplanations
        );

      const unusedExplanationIds =
        explanationIds.filter(
          (id) =>
            !alternativeIds.includes(
              id
            )
        );

      if (
        unusedExplanationIds.length >
        0
      ) {
        addIssue(
          {
            severity:
              "warning",

            code:
              "UNUSED_ALTERNATIVE_EXPLANATION",

            questionId,

            message:
              `Existem explicações para alternativas inexistentes: ${unusedExplanationIds.join(", ")}.`,
          }
        );
      }

      /*
       * ---------------------------------------------------
       * TAGS
       * ---------------------------------------------------
       */

      if (
        !question.tags ||
        question.tags.length ===
          0
      ) {
        addIssue(
          {
            severity:
              "warning",

            code:
              "NO_TAGS",

            questionId,

            message:
              "A questão não possui nenhuma tag.",
          }
        );
      }

      if (
        !question.examTags ||
        question.examTags.length === 0
      ) {
        addIssue(
          {
            severity: "error",
            code: "NO_EXAM_TAGS",
            questionId,
            message: "A questão não possui examTags.",
          },
          questionIndex
        );
      } else {
        const invalidExamTags = question.examTags.filter(
          (examTag) => !VALID_EXAM_TAGS.includes(examTag)
        );

        if (invalidExamTags.length > 0) {
          addIssue(
            {
              severity: "error",
              code: "INVALID_EXAM_TAG",
              questionId,
              message: `examTags inválidas: ${invalidExamTags.join(", ")}.`,
            },
            questionIndex
          );
        }

        if (new Set(question.examTags).size !== question.examTags.length) {
          addIssue(
            {
              severity: "error",
              code: "DUPLICATE_EXAM_TAG",
              questionId,
              message: "A questão possui examTags duplicadas.",
            },
            questionIndex
          );
        }
      }

      if (
        !question.educationLevel ||
        !VALID_EDUCATION_LEVELS.includes(question.educationLevel)
      ) {
        addIssue(
          {
            severity: "error",
            code: "INVALID_EDUCATION_LEVEL",
            questionId,
            message: "A questão possui educationLevel ausente ou inválido.",
          },
          questionIndex
        );
      }

      if (!question.skills || question.skills.length === 0) {
        addIssue(
          {
            severity: "error",
            code: "NO_SKILLS",
            questionId,
            message: "A questão não possui habilidades associadas.",
          },
          questionIndex
        );
      }

      if (question.origin !== "nabulab") {
        addIssue(
          {
            severity: "error",
            code: "INVALID_ORIGIN",
            questionId,
            message: 'A origem da questão deve ser "nabulab".',
          },
          questionIndex
        );
      }
    }
  );

  /*
   * =======================================================
   * ENUNCIADOS DUPLICADOS
   * =======================================================
   */

  const statementMap =
    new Map<
      string,
      string[]
    >();

  for (
    const question of
    questionBank
  ) {
    const normalized =
      normalizeText(
        question.statement
      );

    if (!normalized) {
      continue;
    }

    const ids =
      statementMap.get(
        normalized
      ) ?? [];

    ids.push(
      question.id
    );

    statementMap.set(
      normalized,
      ids
    );
  }

  let duplicateStatements =
    0;

  for (
    const ids of
    statementMap.values()
  ) {
    if (
      ids.length <=
      1
    ) {
      continue;
    }

    duplicateStatements +=
      ids.length;

    for (
      const id of
      ids
    ) {
      addIssue({
        severity:
          "warning",

        code:
          "DUPLICATE_STATEMENT",

        questionId:
          id,

        message:
          `O enunciado também aparece nas questões: ${ids
            .filter(
              (otherId) =>
                otherId !== id
            )
            .join(", ")}.`,
      });
    }
  }

  const explanationTokens = questionBank.map((question) => tokenSet(question.explanation));
  for (let firstIndex = 0; firstIndex < questionBank.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < questionBank.length; secondIndex += 1) {
      if (questionBank[firstIndex].subject !== questionBank[secondIndex].subject) continue;
      if (explanationTokens[firstIndex].size < 12 || explanationTokens[secondIndex].size < 12) continue;
      if (jaccard(explanationTokens[firstIndex], explanationTokens[secondIndex]) >= 0.94) {
        addIssue({
          severity: "warning",
          code: "NEAR_DUPLICATE_EXPLANATION",
          questionId: questionBank[secondIndex].id,
          message: `Explicação quase idêntica à questão ${questionBank[firstIndex].id}.`,
        });
      }
    }
  }

  /*
   * =======================================================
   * DISTRIBUIÇÃO POR MATÉRIA
   * =======================================================
   */

  const subjectStats:
    SubjectAuditStats[] =
    subjects.map(
      (subject) => {
        const questions =
          questionBank.filter(
            (question) =>
              question.subject ===
              subject.id
          );

        return {
          subject:
            subject.id as SubjectId,

          subjectName:
            subject.name,

          area:
            subject.area,

          total:
            questions.length,

          multipleChoice:
            questions.filter(
              (question) =>
                question.type ===
                "multiple-choice"
            ).length,

          trueFalse:
            questions.filter(
              (question) =>
                question.type ===
                "true-false"
            ).length,

          iniciante:
            questions.filter(
              (question) =>
                question.difficulty ===
                "iniciante"
            ).length,

          medio:
            questions.filter(
              (question) =>
                question.difficulty ===
                "medio"
            ).length,

          avancado:
            questions.filter(
              (question) =>
                question.difficulty ===
                "avancado"
            ).length,

          combinations: {
            "multiple-choice": {
              iniciante: questions.filter(
                (question) => question.type === "multiple-choice" && question.difficulty === "iniciante"
              ).length,
              medio: questions.filter(
                (question) => question.type === "multiple-choice" && question.difficulty === "medio"
              ).length,
              avancado: questions.filter(
                (question) => question.type === "multiple-choice" && question.difficulty === "avancado"
              ).length,
            },
            "true-false": {
              iniciante: questions.filter(
                (question) => question.type === "true-false" && question.difficulty === "iniciante"
              ).length,
              medio: questions.filter(
                (question) => question.type === "true-false" && question.difficulty === "medio"
              ).length,
              avancado: questions.filter(
                (question) => question.type === "true-false" && question.difficulty === "avancado"
              ).length,
            },
          },

          topics:
            new Set(
              questions.map(
                (question) =>
                  question.topic
              )
            ).size,

          subtopics:
            new Set(
              questions.map(
                (question) =>
                  `${question.topic}::${question.subtopic}`
              )
            ).size,
        };
      }
    );

  /*
   * =======================================================
   * DISTRIBUIÇÃO GLOBAL
   * =======================================================
   */

  const byType = {
    multipleChoice:
      questionBank.filter(
        (question) =>
          question.type ===
          "multiple-choice"
      ).length,

    trueFalse:
      questionBank.filter(
        (question) =>
          question.type ===
          "true-false"
      ).length,
  };

  const byDifficulty = {
    iniciante:
      questionBank.filter(
        (question) =>
          question.difficulty ===
          "iniciante"
      ).length,

    medio:
      questionBank.filter(
        (question) =>
          question.difficulty ===
          "medio"
      ).length,

    avancado:
      questionBank.filter(
        (question) =>
          question.difficulty ===
          "avancado"
      ).length,
  };

  if (questionBank.length !== 1224) {
    addIssue({
      severity: "error",
      code: "INVALID_TOTAL_COUNT",
      questionId: "BANCO",
      message: `O Banco Vestibulares v1 deve possuir 1224 questões, mas possui ${questionBank.length}.`,
    });
  }

  const expectedGlobalCounts = [
    ["multiple-choice", byType.multipleChoice, 612],
    ["true-false", byType.trueFalse, 612],
    ["iniciante", byDifficulty.iniciante, 408],
    ["medio", byDifficulty.medio, 408],
    ["avancado", byDifficulty.avancado, 408],
  ] as const;

  for (const [label, actual, expected] of expectedGlobalCounts) {
    if (actual !== expected) {
      addIssue({
        severity: "error",
        code: "INVALID_GLOBAL_DISTRIBUTION",
        questionId: "BANCO",
        message: `A distribuição global de ${label} deveria ser ${expected}, mas é ${actual}.`,
      });
    }
  }

  for (const subject of subjectStats) {
    const expectedSubjectCounts = [
      ["total", subject.total, 72],
      ["múltipla escolha", subject.multipleChoice, 36],
      ["verdadeiro/falso", subject.trueFalse, 36],
      ["iniciante", subject.iniciante, 24],
      ["médio", subject.medio, 24],
      ["avançado", subject.avancado, 24],
    ] as const;

    for (const [label, actual, expected] of expectedSubjectCounts) {
      if (actual !== expected) {
        addIssue({
          severity: "error",
          code: "INVALID_SUBJECT_DISTRIBUTION",
          questionId: subject.subject,
          message: `${subject.subjectName}: ${label} deveria ser ${expected}, mas é ${actual}.`,
        });
      }
    }

    for (const type of VALID_TYPES) {
      for (const difficulty of VALID_DIFFICULTIES) {
        const actual = subject.combinations[type][difficulty];

        if (actual !== 12) {
          addIssue({
            severity: "error",
            code: "INVALID_SUBJECT_CELL",
            questionId: subject.subject,
            message: `${subject.subjectName}: ${type} + ${difficulty} deveria conter 12 questões, mas contém ${actual}.`,
          });
        }
      }
    }
  }

  /*
   * =======================================================
   * BALANCEAMENTO
   * =======================================================
   */

  const subjectTotals =
    subjectStats.map(
      (subject) =>
        subject.total
    );

  const subjectBalanceSpread =
    subjectTotals.length ===
    0
      ? 0
      : Math.max(
          ...subjectTotals
        ) -
        Math.min(
          ...subjectTotals
        );

  /*
   * Consideramos o banco perfeitamente
   * equilibrado por matéria quando existe
   * no máximo 1 questão de diferença.
   */

  const subjectBalanced =
    subjectBalanceSpread <=
    1;

  const difficultyTotals = [
    byDifficulty.iniciante,
    byDifficulty.medio,
    byDifficulty.avancado,
  ];

  const difficultyBalanceSpread =
    Math.max(
      ...difficultyTotals
    ) -
    Math.min(
      ...difficultyTotals
    );

  /*
   * Para dificuldade aceitamos uma
   * pequena diferença de até 5% do banco.
   */

  const difficultyTolerance =
    Math.max(
      1,
      Math.ceil(
        questionBank.length *
          0.05
      )
    );

  const difficultyBalanced =
    difficultyBalanceSpread <=
    difficultyTolerance;

  /*
   * =======================================================
   * TÓPICOS
   * =======================================================
   */

  const totalTopics =
    new Set(
      questionBank.map(
        (question) =>
          `${question.subject}::${question.topic}`
      )
    ).size;

  const totalSubtopics =
    new Set(
      questionBank.map(
        (question) =>
          `${question.subject}::${question.topic}::${question.subtopic}`
      )
    ).size;

  /*
   * =======================================================
   * RESULTADO
   * =======================================================
   */

  const totalErrors =
    issues.filter(
      (issue) =>
        issue.severity ===
        "error"
    ).length;

  const totalWarnings =
    issues.filter(
      (issue) =>
        issue.severity ===
        "warning"
    ).length;

  return {
    totalQuestions:
      questionBank.length,

    validQuestions:
      questionBank.length -
      invalidIndexes.size,

    invalidQuestions:
      invalidIndexes.size,

    totalErrors,

    totalWarnings,

    duplicateIds,

    duplicateStatements,

    structureValid:
      totalErrors ===
      0,

    subjectBalanced,

    difficultyBalanced,

    subjectBalanceSpread,

    difficultyBalanceSpread,

    byType,

    byDifficulty,

    subjects:
      subjectStats,

    totalTopics,

    totalSubtopics,

    issues,
  };
}
