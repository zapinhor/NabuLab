import { addDaysToKey, daysBetweenKeys } from "@/lib/streak";

/*
 * Revisão espaçada dos erros.
 *
 * Depois de um erro, a questão volta em 1 dia. Cada acerto feito na data
 * prevista (ou depois) leva ao próximo intervalo: 1, 3, 7 e 14 dias. Um novo
 * erro volta para o começo. Depois de acertar no intervalo de 14 dias, a
 * questão sai da fila.
 *
 * Calculado só a partir do histórico de respostas: nada novo precisa ser salvo.
 */

export const REVIEW_INTERVALS = [1, 3, 7, 14] as const;

export type ReviewAttempt = { dateKey: string; correct: boolean };

export type SpacedReviewState = {
  /** 0 a 3 = intervalo atual; 4 = concluída. */
  stage: number;
  /** Quando volta (chave de data), ou null se concluída / sem erros. */
  dueKey: string | null;
};

export function spacedReviewState(attempts: ReviewAttempt[]): SpacedReviewState {
  const ordered = [...attempts].sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  let stage = -1; // -1 = nunca errou
  let anchor: string | null = null;

  for (const attempt of ordered) {
    if (!attempt.correct) {
      stage = 0;
      anchor = attempt.dateKey;
      continue;
    }
    if (stage < 0 || anchor === null || stage >= REVIEW_INTERVALS.length) continue;
    const due = addDaysToKey(anchor, REVIEW_INTERVALS[stage]);
    // Acerto antes da data (por exemplo, no mesmo simulado) não avança o intervalo.
    if (daysBetweenKeys(attempt.dateKey, due) >= 0) {
      stage += 1;
      anchor = attempt.dateKey;
    }
  }

  if (stage < 0 || anchor === null) return { stage: 0, dueKey: null };
  if (stage >= REVIEW_INTERVALS.length) return { stage: REVIEW_INTERVALS.length, dueKey: null };
  return { stage, dueKey: addDaysToKey(anchor, REVIEW_INTERVALS[stage]) };
}

export function isDue(state: SpacedReviewState, todayKey: string) {
  return state.dueKey !== null && daysBetweenKeys(todayKey, state.dueKey) >= 0;
}
