import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import StudentAvatar from "@/components/student/student-avatar";
import NabuLabBrand from "@/components/ui/nabulab-brand";
import { createClient } from "@/lib/supabase/server";
import { hasActivePremium, subscriptionFromRow } from "@/lib/entitlements";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ premium?: string }>;
}) {
  const query = await searchParams;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/login?next=%2Fperfil");

  const [profileResult, subscriptionResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name,username,email,avatar_url")
      .eq("id", userData.user.id)
      .maybeSingle(),
    supabase
      .from("subscriptions")
      .select("id,user_id,plan,status,price_tier,provider,current_period_start,current_period_end")
      .eq("user_id", userData.user.id)
      .maybeSingle(),
  ]);
  const profile = profileResult.data;
  const subscription = subscriptionFromRow(subscriptionResult.data);
  const premium = hasActivePremium(subscription);

  const metadata = userData.user.user_metadata;
  const email = profile?.email ?? userData.user.email ?? "E-mail não disponível";
  const username = profile?.username ?? metadata.username ?? null;
  const fullName =
    profile?.full_name?.trim() ||
    metadata.full_name?.trim() ||
    username ||
    email.split("@")[0] ||
    "Estudante";
  const avatarUrl = profile?.avatar_url ?? metadata.avatar_url ?? null;

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-4">
          <NabuLabBrand subtitle="Conta do estudante" />
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Voltar ao painel
          </Link>
        </header>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#071A3D] px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <StudentAvatar name={fullName} avatarUrl={avatarUrl} size="lg" />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4C430]">
                  Perfil do estudante
                </p>
                <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
                  {fullName}
                </h1>
                {username && (
                  <p className="mt-1 break-all text-sm text-blue-100">@{username}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            {query.premium === "required" && !premium && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
                <p className="font-bold">Disponível no NabuLab Premium</p>
                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Este recurso permanece visível no painel, mas exige uma assinatura Premium ativa.
                </p>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={`rounded-2xl border p-4 sm:col-span-2 ${
                premium ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50"
              }`}>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Plano atual</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <p className="text-lg font-bold text-slate-900">{premium ? "Premium" : "Free"}</p>
                  {premium && subscription?.priceTier === "founder_477" && (
                    <span className="rounded-full bg-amber-200 px-2.5 py-1 text-xs font-bold text-amber-900">
                      Fundador
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {premium
                    ? "Acesso completo ao banco, simulados e análises avançadas."
                    : "Acesso às 17 matérias, simulados de até 15 questões e sincronização na nuvem."}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Nome de exibição
                </p>
                <p className="mt-2 break-words font-semibold text-slate-900">{fullName}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Username
                </p>
                <p className="mt-2 break-all font-semibold text-slate-900">
                  {username ? `@${username}` : "Não informado"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  E-mail
                </p>
                <p className="mt-2 break-all font-semibold text-slate-900">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <span aria-hidden="true" className="mt-0.5">☁️</span>
              <div>
                <p className="font-bold">NabuLab Cloud conectado</p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Seu histórico, respostas e metas acadêmicas estão vinculados a esta conta.
                </p>
              </div>
            </div>

            {!premium && (
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-bold text-slate-900">Recursos Premium</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Simulados de até 50 questões, nível avançado, histórico completo, treino de erros,
                  recomendado completo, evolução, análise, domínio e metas completas.
                </p>
                <p className="mt-2 text-xs text-slate-500">A contratação ainda não está disponível nesta fase.</p>
              </div>
            )}

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                Sair da conta
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
