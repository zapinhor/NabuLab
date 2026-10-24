import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/commercial/auth-card";
import { SignupProfileStep } from "@/components/security/signup-profile-step";
import { GuestResultNote } from "@/components/guest-quiz/guest-result-note";
import { isSignupProfile, profileFromNext } from "@/lib/forms/signup-profile";
import { safeNextPath } from "@/lib/routing";
import { createPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = createPrivateMetadata(
  "Criar conta",
  "Crie sua conta gratuita no NabuLab para salvar simulados, acompanhar seu desempenho e estudar em qualquer dispositivo.",
);

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ mensagem?: string; next?: string; perfil?: string }> }) {
  const { mensagem, next: rawNext, perfil } = await searchParams;
  const next = safeNextPath(rawNext);
  const teacherIntent = next.startsWith("/professor");
  const initialProfile = isSignupProfile(perfil) ? perfil : profileFromNext(next);
  return (
    <AuthCard title={teacherIntent ? "Comece grátis como professor" : "Comece grátis"} description={teacherIntent ? "Use sua conta NabuLab para criar turmas, atividades e acompanhar seus alunos." : "Crie sua conta em poucos segundos. Você entra direto no NabuLab e recebe 10 questões gratuitas por dia."} message={mensagem}>
      {!teacherIntent && <GuestResultNote />}
      <SignupProfileStep next={next} initialProfile={initialProfile} />
      <p className="mt-5 text-center text-sm text-slate-600">Já tem conta? <Link className="font-bold text-blue-700" href={`/login?next=${encodeURIComponent(next)}`}>Entrar</Link></p>
    </AuthCard>
  );
}
