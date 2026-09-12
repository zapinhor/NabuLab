import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import StudentAvatar from "@/components/student/student-avatar";
import NabuLabBrand from "@/components/ui/nabulab-brand";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/login?next=%2Fperfil");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,username,email,avatar_url")
    .eq("id", userData.user.id)
    .maybeSingle();

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
            <div className="grid gap-4 sm:grid-cols-2">
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
