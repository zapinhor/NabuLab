/**
 * Textos de preço calculados a partir dos valores reais configurados
 * (ex.: "R$ 4,77" contra "R$ 9,90"), para nunca ficarem desatualizados.
 */

/** "R$ 4,77" → 4.77 */
export function parseBRL(value: string): number | null {
  const match = value.replace(/\s/g, "").match(/(\d+(?:\.\d{3})*),(\d{2})/);
  if (!match) return null;
  return Number(`${match[1].replace(/\./g, "")}.${match[2]}`);
}

function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/** Desconto em % arredondado para baixo (nunca exagera): 4,77 de 9,90 → 51. */
export function discountPercent(price: string, regularPrice: string | null): number | null {
  if (!regularPrice) return null;
  const current = parseBRL(price);
  const regular = parseBRL(regularPrice);
  if (current === null || regular === null || regular <= current) return null;
  return Math.floor((1 - current / regular) * 100);
}

/** Preço mensal por dia, considerando 30 dias: 4,77 → "menos de R$ 0,16 por dia". */
export function pricePerDay(price: string): string | null {
  const monthly = parseBRL(price);
  if (monthly === null) return null;
  const daily = monthly / 30;
  const roundedUp = Math.ceil(daily * 100) / 100;
  return roundedUp > daily + 1e-9 ? `menos de ${formatBRL(roundedUp)} por dia` : `${formatBRL(roundedUp)} por dia`;
}
