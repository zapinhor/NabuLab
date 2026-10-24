import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GuestQuiz } from "@/components/guest-quiz/guest-quiz";
import { Icon } from "@/components/ui/icon";
import { campaignQuery } from "@/lib/analytics/acquisition";
import { GUEST_QUIZ_COOKIE, GUEST_QUIZ_SIZE, GUEST_TRACKS, encodeGuestLock, parseGuestLock, pickGuestQuestions } from "@/lib/content/guest-quiz";
import { createPublicMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = createPublicMetadata({
  title: "Teste grátis: responda 3 questões sem cadastro",
  description: "Escolha uma área, responda 3 questões estilo vestibular e veja a correção comentada na hora. Sem cadastro e sem cartão.",
  path: "/experimente",
});

export default async function TryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = await searchParams;
  const params = new URLSearchParams();
  for (const [key, item] of Object.entries(values)) if (typeof item === "string") params.set(key, item);
  const campaign = campaignQuery(params);
  const withCampaign = (path: string) => (campaign ? `${path}${path.includes("?") ? "&" : "?"}${campaign}` : path);

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const authenticated = Boolean(data.user);

  // Um teste por navegador: a área e o sorteio ficam presos no cookie gravado em /experimente/iniciar.
  const lock = parseGuestLock((await cookies()).get(GUEST_QUIZ_COOKIE)?.value);
  if (!lock && typeof values.area === "string") {
    redirect(withCampaign(`/experimente/iniciar?area=${encodeURIComponent(values.area)}`));
  }
  const track = lock?.track ?? null;
  const questions = lock ? pickGuestQuestions(lock.track, lock.seed) : [];
  const dashboardPath = withCampaign("/dashboard?origem=teste");
  const signupHref = withCampaign(`/cadastro?next=${encodeURIComponent(dashboardPath)}`);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FB] text-slate-950">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="NabuLab — página inicial"><Image src="/branding/logo-horizontal.png" alt="NabuLab" width={166} height={43} className="h-8 w-auto sm:h-9" priority /></Link>
          {authenticated
            ? <Link href="/dashboard" className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B2D6B]">Ir ao painel</Link>
            : <Link href={withCampaign(`/login?next=${encodeURIComponent("/dashboard")}`)} className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-bold text-[#0B2D6B]">Já tenho conta</Link>}
        </div>
      </header>

      <div className="px-4 pb-48 pt-8 sm:px-6 sm:pb-40 sm:pt-12">
        {track && questions.length > 0 ? (
          <GuestQuiz
            key={encodeGuestLock(track.id, lock!.seed)}
            lockKey={encodeGuestLock(track.id, lock!.seed)}
            track={track.id}
            trackLabel={track.label}
            questions={questions}
            signupHref={signupHref}
            authenticated={authenticated}
          />
        ) : (
          <section aria-labelledby="escolha" className="mx-auto max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-[#0B2D6B]">
              <Icon name="duracao" size={14} /> Leva cerca de 2 minutos · sem cadastro
            </p>
            <h1 id="escolha" className="mt-4 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0B2D6B] sm:text-4xl">
              Responda {GUEST_QUIZ_SIZE} questões e veja a correção na hora
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">Escolha uma área para começar. Depois de cada resposta você vê a explicação comentada. O teste grátis pode ser feito uma vez.</p>
            <ul className="mt-7 grid gap-3">
              {GUEST_TRACKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={withCampaign(`/experimente/iniciar?area=${item.id}`)}
                    className="group flex min-h-16 items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition hover:border-[#3B82F6] hover:bg-blue-50"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#0B2D6B]"><Icon name={item.icon} size={22} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-black text-slate-950">{item.label}</span>
                      <span className="block text-sm text-slate-500">{item.hint}</span>
                    </span>
                    <Icon name="avancar" size={20} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#3B82F6]" />
                  </a>
                </li>
              ))}
            </ul>
            {!authenticated && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Prefere ir direto? <Link href={signupHref} className="font-bold text-[#3B82F6] underline-offset-4 hover:underline">Criar conta grátis</Link>
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
