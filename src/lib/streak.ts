/*
 * Sequência de dias estudados com "folga da semana".
 *
 * Regra: um único dia sem estudo é perdoado se nenhum outro dia daquela
 * semana (segunda a domingo) já foi perdoado. Dois dias seguidos sem estudo
 * encerram a sequência. O dia de folga não soma à sequência, só a mantém.
 *
 * Funções puras sobre chaves de data "AAAA-MM-DD", usadas no navegador
 * (histórico local) e no servidor (lembrete por e-mail).
 */

const DAY_MS = 86_400_000;

function keyToUtc(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function addDaysToKey(key: string, amount: number) {
  const date = new Date(keyToUtc(key) + amount * DAY_MS);
  return date.toISOString().slice(0, 10);
}

export function daysBetweenKeys(later: string, earlier: string) {
  return Math.round((keyToUtc(later) - keyToUtc(earlier)) / DAY_MS);
}

/** Segunda-feira da semana da data (chave). */
export function weekStartKey(key: string) {
  const weekday = new Date(keyToUtc(key)).getUTCDay(); // 0 = domingo
  return addDaysToKey(key, weekday === 0 ? -6 : 1 - weekday);
}

/** Chave da data no fuso informado (padrão: horário de Brasília). */
export function dateKeyInTimeZone(value: Date | string, timeZone = "America/Sao_Paulo") {
  const date = value instanceof Date ? value : new Date(value);
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Chave da data no fuso do próprio aparelho (navegador). */
export function localDateKey(value: Date | string | number = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export type StreakResult = {
  current: number;
  longest: number;
  /** Dias perdoados na sequência atual (chaves). */
  freezesInCurrent: string[];
  /** Se ainda há folga disponível nesta semana. */
  freezeAvailableThisWeek: boolean;
  /** Estudou hoje. */
  studiedToday: boolean;
  /** A sequência continua viva hoje, mas só se estudar hoje (ou amanhã com folga). */
  atRisk: boolean;
};

/**
 * Percorre as datas de estudo e monta as sequências permitindo uma folga por semana.
 * `studyKeys` não precisa estar ordenado nem ser único.
 */
export function computeStreak(studyKeys: Iterable<string>, todayKey: string): StreakResult {
  const keys = [...new Set(studyKeys)].filter((key) => daysBetweenKeys(todayKey, key) >= 0).sort();
  const studiedToday = keys.at(-1) === todayKey;

  // Constrói sequências do passado para o presente.
  let longest = 0;
  let current = 0;
  let freezes: string[] = [];
  let usedWeeks = new Set<string>();
  let previous: string | null = null;

  for (const key of keys) {
    if (previous === null) {
      current = 1;
    } else {
      const gap = daysBetweenKeys(key, previous);
      const missed = addDaysToKey(previous, 1);
      if (gap === 1) {
        current += 1;
      } else if (gap === 2 && !usedWeeks.has(weekStartKey(missed))) {
        current += 1;
        freezes.push(missed);
        usedWeeks.add(weekStartKey(missed));
      } else {
        current = 1;
        freezes = [];
        usedWeeks = new Set();
      }
    }
    longest = Math.max(longest, current);
    previous = key;
  }

  const thisWeek = weekStartKey(todayKey);
  let alive = false;
  if (previous) {
    const distance = daysBetweenKeys(todayKey, previous);
    if (distance <= 1) {
      alive = true;
    } else if (distance === 2) {
      // Ontem ficou sem estudo: a folga da semana de ontem cobre, se ainda existir.
      const yesterday = addDaysToKey(todayKey, -1);
      if (!usedWeeks.has(weekStartKey(yesterday))) {
        alive = true;
        freezes = [...freezes, yesterday];
        usedWeeks.add(weekStartKey(yesterday));
      }
    }
  }

  return {
    current: alive ? current : 0,
    longest,
    freezesInCurrent: alive ? freezes : [],
    freezeAvailableThisWeek: !(alive ? usedWeeks : new Set<string>()).has(thisWeek),
    studiedToday,
    atRisk: alive && !studiedToday,
  };
}
