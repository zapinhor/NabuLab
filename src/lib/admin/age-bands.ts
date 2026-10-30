import { ageOn } from "@/lib/forms/signup-validation";

export const AGE_BANDS = ["Menos de 12", "12 a 14", "15 a 17", "18 a 24", "25 a 34", "35 a 44", "45 ou mais"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export function ageBand(age: number): AgeBand {
  if (age < 12) return "Menos de 12";
  if (age <= 14) return "12 a 14";
  if (age <= 17) return "15 a 17";
  if (age <= 24) return "18 a 24";
  if (age <= 34) return "25 a 34";
  if (age <= 44) return "35 a 44";
  return "45 ou mais";
}

/** Agrega datas de nascimento em faixas; nenhuma data individual sai daqui. */
export function summarizeAges(birthDates: string[], totalUsers: number, today = new Date()) {
  const bands = new Map<AgeBand, number>(AGE_BANDS.map((band) => [band, 0]));
  const ages: number[] = [];
  for (const value of birthDates) {
    const age = ageOn(value, today);
    if (!Number.isFinite(age) || age < 0 || age > 120) continue;
    ages.push(age);
    const band = ageBand(age);
    bands.set(band, (bands.get(band) ?? 0) + 1);
  }
  ages.sort((a, b) => a - b);
  const median = ages.length ? (ages.length % 2 ? ages[(ages.length - 1) / 2] : (ages[ages.length / 2 - 1] + ages[ages.length / 2]) / 2) : null;
  return {
    informed: ages.length,
    notInformed: Math.max(0, totalUsers - ages.length),
    median,
    bands: AGE_BANDS.map((band) => ({ band, count: bands.get(band) ?? 0 })),
  };
}
