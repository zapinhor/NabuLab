import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { AnalyticsEventName } from "@/lib/analytics/events";

const cards: Array<[AnalyticsEventName, string]> = [
  ["landing_view", "Landing views"],
  ["signup_cta_clicked", "Cliques Começar grátis"],
  ["signup_completed", "Cadastros"],
  ["free_exam_completed", "Simulados Free concluídos"],
  ["premium_page_viewed", "Visitas Premium"],
  ["checkout_started", "Checkouts iniciados"],
  ["purchase_approved", "Compras aprovadas"],
];

export default async function AnalyticsAdminPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?next=%2Fadmin%2Fanalytics");
  const { data: role } = await supabase.from("platform_admins").select("user_id").eq("user_id", userData.user.id).maybeSingle();
  if (!role) redirect("/dashboard");

  const { data: events, error } = await createAdminClient()
    .from("analytics_events")
    .select("event_name");
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const event of events ?? []) counts.set(event.event_name, (counts.get(event.event_name) ?? 0) + 1);
  const landingViews = counts.get("landing_view") ?? 0;
  const purchases = counts.get("purchase_approved") ?? 0;
  const conversion = landingViews ? (purchases / landingViews) * 100 : 0;

  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8 sm:px-6"><div className="mx-auto max-w-6xl"><header className="flex items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-wider text-blue-700">Admin protegido</p><h1 className="mt-2 text-3xl font-black">Analytics do funil</h1><p className="mt-2 text-sm text-slate-500">Acumulado desde a ativação da C3</p></div><Link href="/dashboard" className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-bold text-[#0B2D6B]">Dashboard</Link></header><section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([name,label]) => <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-[#0B2D6B]">{counts.get(name) ?? 0}</p></article>)}<article className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm text-amber-900">Conversão landing → compra</p><p className="mt-2 text-3xl font-black text-[#0B2D6B]">{conversion.toFixed(2)}%</p></article></section><p className="mt-6 text-xs leading-5 text-slate-500">Métrica operacional simples. Eventos duplicados de webhook são impedidos pela chave de origem; o painel não expõe dados pessoais.</p></div></main>;
}
