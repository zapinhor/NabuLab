import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminPeriod = 7 | 30 | 90;
export function parsePeriod(value?: string): AdminPeriod { return value === "7" || value === "90" ? Number(value) as AdminPeriod : 30; }
export function since(period: AdminPeriod) { return new Date(Date.now() - period * 86_400_000).toISOString(); }
export async function count(table: string, filters: Array<[string,string]> = []) {
  let query = createAdminClient().from(table).select("*", { count: "exact", head: true });
  for (const [column,value] of filters) query = query.eq(column, value);
  const { count: total, error } = await query;
  if (error) throw error;
  return total ?? 0;
}
export async function analyticsCounts(period: AdminPeriod) {
  const { data, error } = await createAdminClient().from("analytics_events").select("event_name,created_at").gte("created_at", since(period));
  if (error) throw error;
  const result = new Map<string, number>();
  for (const event of data ?? []) result.set(event.event_name, (result.get(event.event_name) ?? 0) + 1);
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
