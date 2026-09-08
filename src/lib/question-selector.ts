import {
  questionBank,
} from "@/data/questions";

import type {
  ExamConfig,
} from "@/types/exam";

import type {
  Question,
} from "@/types/question";

/*
 * =========================================================
 * EMBARALHAR ARRAY
 * =========================================================
 *
 * Fisher-Yates.
 *
 * Retorna uma nova lista e nunca altera
 * o array original.
 */

export function shuffleArray<T>(
  items: T[]
): T[] {
  const result = [
    ...items,
  ];

  for (
    let index =
      result.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index + 1)
      );

    [
      result[index],
      result[randomIndex],
    ] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

/*
 * =========================================================
 * FILTRO BASE
 * =========================================================
 *
 * Este filtro considera:
 *
 * - matérias
 * - dificuldade
 *
 * O tipo da questão é tratado depois,
 * principalmente porque o modo "misto"
 * precisa de uma seleção especial.
 */

function getBaseQuestionPool(
  config: ExamConfig
): Question[] {
  /*
   * Nenhuma matéria selecionada
   * significa configuração inválida.
   */

  if (
    config.subjects.length ===
    0
  ) {
    return [];
  }

  return questionBank.filter(
    (question) => {
      /*
       * ===================================================
       * MATÉRIA
       * ===================================================
       */

      const subjectMatches =
        config.subjects.includes(
          question.subject
        );

      if (
        !subjectMatches
      ) {
        return false;
      }

      /*
       * ===================================================
       * DIFICULDADE
       * ===================================================
       */

      if (
        config.difficulty !==
          "misto" &&
        question.difficulty !==
          config.difficulty
      ) {
        return false;
      }

      return true;
    }
  );
}

/*
 * =========================================================
 * QUESTÕES DISPONÍVEIS
 * =========================================================
 *
 * Serve também para telas que precisam
 * mostrar quantas questões existem com
 * aqueles filtros.
 */

export function getAvailableQuestions(
  config: ExamConfig
): Question[] {
  const basePool =
    getBaseQuestionPool(
      config
    );

  /*
   * No tipo misto todas as questões
   * compatíveis entram na contagem.
   */

  if (
    config.questionType ===
    "misto"
  ) {
    return basePool;
  }

  return basePool.filter(
    (question) =>
      question.type ===
      config.questionType
  );
}

/*
 * =========================================================
 * ALIASES DE CONTAGEM
 * =========================================================
 *
 * Deixamos essas funções simples
 * disponíveis para qualquer tela do
 * projeto que precise mostrar a
 * disponibilidade do banco.
 */

export function getAvailableQuestionsCount(
  config: ExamConfig
) {
  return getAvailableQuestions(
    config
  ).length;
}

export function getAvailableQuestionCount(
  config: ExamConfig
) {
  return getAvailableQuestionsCount(
    config
  );
}

export function countAvailableQuestions(
  config: ExamConfig
) {
  return getAvailableQuestionsCount(
    config
  );
}

/*
 * =========================================================
 * SELECIONAR LISTA
 * =========================================================
 */

function selectFromPool(
  pool: Question[],
  amount: number,
  shuffle: boolean
) {
  if (
    amount <= 0 ||
    pool.length === 0
  ) {
    return [];
  }

  const prepared =
    shuffle
      ? shuffleArray(
          pool
        )
      : [
          ...pool,
        ];

  return prepared.slice(
    0,
    amount
  );
}

/*
 * =========================================================
 * INTERCALAR TIPOS
 * =========================================================
 *
 * Quando "embaralhar questões" estiver
 * desligado, não queremos entregar:
 *
 * MC
 * MC
 * MC
 * MC
 * V/F
 * V/F
 * V/F
 *
 * Então distribuímos os formatos ao
 * longo da prova de maneira previsível.
 *
 * A composição continua 60/40.
 */

function interleaveMixedQuestions(
  multipleChoice:
    Question[],
  trueFalse:
    Question[]
): Question[] {
  const result:
    Question[] = [];

  let mcIndex = 0;
  let tfIndex = 0;

  /*
   * Padrão aproximado:
   *
   * MC
   * V/F
   * MC
   * MC
   * V/F
   *
   * = 3 MC / 2 V/F
   */

  const pattern = [
    "mc",
    "tf",
    "mc",
    "mc",
    "tf",
  ] as const;

  while (
    mcIndex <
      multipleChoice.length ||
    tfIndex <
      trueFalse.length
  ) {
    let addedSomething =
      false;

    for (
      const type of
      pattern
    ) {
      if (
        type ===
          "mc" &&
        mcIndex <
          multipleChoice.length
      ) {
        result.push(
          multipleChoice[
            mcIndex
          ]
        );

        mcIndex++;

        addedSomething =
          true;

        continue;
      }

      if (
        type ===
          "tf" &&
        tfIndex <
          trueFalse.length
      ) {
        result.push(
          trueFalse[
            tfIndex
          ]
        );

        tfIndex++;

        addedSomething =
          true;
      }
    }

    /*
     * Proteção contra loop infinito.
     */

    if (
      !addedSomething
    ) {
      break;
    }
  }

  return result;
}

/*
 * =========================================================
 * SELEÇÃO DO MODO MISTO
 * =========================================================
 *
 * Objetivo:
 *
 * 60% múltipla escolha
 * 40% verdadeiro/falso
 *
 * Exemplos:
 *
 * 5  → 3 MC + 2 V/F
 * 10 → 6 MC + 4 V/F
 * 15 → 9 MC + 6 V/F
 * 20 → 12 MC + 8 V/F
 * 30 → 18 MC + 12 V/F
 * 50 → 30 MC + 20 V/F
 */

function generateMixedExamQuestions(
  pool: Question[],
  amount: number,
  shuffleQuestions: boolean
): Question[] {
  if (
    amount <= 0
  ) {
    return [];
  }

  /*
   * =======================================================
   * SEPARAR OS DOIS FORMATOS
   * =======================================================
   */

  const multipleChoicePool =
    pool.filter(
      (question) =>
        question.type ===
        "multiple-choice"
    );

  const trueFalsePool =
    pool.filter(
      (question) =>
        question.type ===
        "true-false"
    );

  /*
   * =======================================================
   * ALVO 60 / 40
   * =======================================================
   */

  let multipleChoiceTarget =
    Math.ceil(
      amount *
        0.6
    );

  let trueFalseTarget =
    amount -
    multipleChoiceTarget;

  /*
   * Para provas com pelo menos
   * duas questões garantimos que,
   * sempre que houver disponibilidade,
   * os dois formatos apareçam.
   */

  if (
    amount >= 2
  ) {
    if (
      multipleChoicePool.length >
        0 &&
      trueFalsePool.length >
        0
    ) {
      multipleChoiceTarget =
        Math.max(
          1,
          multipleChoiceTarget
        );

      trueFalseTarget =
        Math.max(
          1,
          trueFalseTarget
        );

      /*
       * Como os Math.max acima podem
       * alterar o total em casos muito
       * pequenos, normalizamos novamente.
       */

      while (
        multipleChoiceTarget +
          trueFalseTarget >
        amount
      ) {
        if (
          multipleChoiceTarget >
          trueFalseTarget
        ) {
          multipleChoiceTarget--;
        } else {
          trueFalseTarget--;
        }
      }
    }
  }

  /*
   * =======================================================
   * LIMITAR PELA DISPONIBILIDADE
   * =======================================================
   */

  let multipleChoiceAmount =
    Math.min(
      multipleChoiceTarget,
      multipleChoicePool.length
    );

  let trueFalseAmount =
    Math.min(
      trueFalseTarget,
      trueFalsePool.length
    );

  /*
   * =======================================================
   * COMPLETAR FALTAS
   * =======================================================
   *
   * Exemplo:
   *
   * usuário pede 20 questões
   *
   * alvo:
   * 12 MC + 8 V/F
   *
   * mas o filtro possui:
   * 12 MC + 4 V/F
   *
   * tentamos completar as 4 restantes
   * usando MC disponível.
   */

  let selectedTotal =
    multipleChoiceAmount +
    trueFalseAmount;

  let missing =
    amount -
    selectedTotal;

  if (
    missing >
    0
  ) {
    /*
     * Primeiro tentamos completar
     * usando MC.
     */

    const extraMcAvailable =
      multipleChoicePool.length -
      multipleChoiceAmount;

    const extraMc =
      Math.min(
        missing,
        extraMcAvailable
      );

    multipleChoiceAmount +=
      extraMc;

    missing -=
      extraMc;
  }

  if (
    missing >
    0
  ) {
    /*
     * Depois tentamos completar
     * usando V/F.
     */

    const extraTfAvailable =
      trueFalsePool.length -
      trueFalseAmount;

    const extraTf =
      Math.min(
        missing,
        extraTfAvailable
      );

    trueFalseAmount +=
      extraTf;

    missing -=
      extraTf;
  }

  /*
   * =======================================================
   * SELECIONAR
   * =======================================================
   */

  const selectedMc =
    selectFromPool(
      multipleChoicePool,
      multipleChoiceAmount,
      shuffleQuestions
    );

  const selectedTf =
    selectFromPool(
      trueFalsePool,
      trueFalseAmount,
      shuffleQuestions
    );

  /*
   * =======================================================
   * ORDEM FINAL
   * =======================================================
   */

  if (
    shuffleQuestions
  ) {
    return shuffleArray([
      ...selectedMc,
      ...selectedTf,
    ]);
  }

  /*
   * Sem embaralhamento, intercalamos
   * os dois formatos.
   */

  return interleaveMixedQuestions(
    selectedMc,
    selectedTf
  );
}

/*
 * =========================================================
 * GERAR QUESTÕES DO SIMULADO
 * =========================================================
 */

export function generateExamQuestions(
  config: ExamConfig
): Question[] {
  const requestedAmount =
    Math.max(
      0,
      Math.floor(
        config.amount
      )
    );

  if (
    requestedAmount ===
    0
  ) {
    return [];
  }

  /*
   * =======================================================
   * FILTROS DE MATÉRIA + DIFICULDADE
   * =======================================================
   */

  const basePool =
    getBaseQuestionPool(
      config
    );

  if (
    basePool.length ===
    0
  ) {
    return [];
  }

  /*
   * =======================================================
   * MODO MISTO
   * =======================================================
   */

  if (
    config.questionType ===
    "misto"
  ) {
    return generateMixedExamQuestions(
      basePool,
      requestedAmount,
      config.shuffleQuestions
    );
  }

  /*
   * =======================================================
   * APENAS MÚLTIPLA ESCOLHA OU V/F
   * =======================================================
   */

  const filteredPool =
    basePool.filter(
      (question) =>
        question.type ===
        config.questionType
    );

  return selectFromPool(
    filteredPool,
    Math.min(
      requestedAmount,
      filteredPool.length
    ),
    config.shuffleQuestions
  );
}