import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminPeriod = 7 | 30 | 90;
export type AdminRange = { preset: AdminPeriod | "custom"; from: string; to: string; label: string; start: string; end: string };
const DAY = /^\d{4}-\d{2}-\d{2}$/;
export function saoPauloDay(date: Date) { return new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date); }
function shiftDay(day: string, delta: number) { const date = new Date(`${day}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + delta); return date.toISOString().slice(0, 10); }
function validDay(value: string | undefined): value is string { return typeof value === "string" && DAY.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value; }
const brDay = (day: string) => day.split("-").reverse().join("/");
export function parsePeriod(value?: string): AdminPeriod { return value === "7" || value === "90" ? Number(value) as AdminPeriod : 30; }
/** Período do admin em dias corridos de São Paulo (inclusive). Personalizado: ?from=AAAA-MM-DD&to=AAAA-MM-DD. */
export function resolveRange(search: { days?: string; from?: string; to?: string }, now = new Date()): AdminRange {
  const today = saoPauloDay(now);
  let preset: AdminRange["preset"] = parsePeriod(search.days);
  let from = shiftDay(today, -(preset - 1)); let to = today;
  if (validDay(search.from) && validDay(search.to)) {
    const a = search.from <= search.to ? search.from : search.to; const b = search.from <= search.to ? search.to : search.from;
    if (a <= today) { preset = "custom"; from = a; to = b > today ? today : b; }
  }
  const label = preset === "custom" ? `${brDay(from)} a ${brDay(to)}` : `últimos ${preset} dias`;
  return { preset, from, to, label, start: new Date(`${from}T00:00:00-03:00`).toISOString(), end: new Date(`${shiftDay(to, 1)}T00:00:00-03:00`).toISOString() };
}
export function since(period: AdminPeriod) { return new Date(Date.now() - period * 86_400_000).toISOString(); }
export async function count(table: string, filters: Array<[string,string]> = [], range?: Pick<AdminRange, "start" | "end">, column = "created_at") {
  let query = createAdminClient().from(table).select("*", { count: "exact", head: true });
  for (const [name,value] of filters) query = query.eq(name, value);
  if (range) query = query.gte(column, range.start).lt(column, range.end);
  const { count: total, error } = await query;
  if (error) throw error;
  return total ?? 0;
}
export async function analyticsCounts(range: AdminPeriod | Pick<AdminRange, "start" | "end">) {
  const bounds = typeof range === "number" ? { start: since(range), end: new Date(Date.now() + 60_000).toISOString() } : range;
  const result = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await createAdminClient().from("analytics_events").select("event_name").gte("created_at", bounds.start).lt("created_at", bounds.end).order("created_at", { ascending: true }).range(from, from + 999);
    if (error) throw error;
    for (const event of data ?? []) result.set(event.event_name, (result.get(event.event_name) ?? 0) + 1);
    if (!data || data.length < 1000) break;
  }
  return result;
}

export async function birthDates() {
  const admin = createAdminClient();
  const values: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await admin.from("profile_private").select("birth_date").not("birth_date", "is", null).range(from, from + 999);
    if (error) throw error;
    for (const row of data ?? []) if (row.birth_date) values.push(row.birth_date as string);
    if (!data || data.length < 1000) break;
  }
  return values;
}
