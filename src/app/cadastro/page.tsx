import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/commercial/auth-card";
import { SignupForm } from "@/components/security/signup-form";
import { createPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = createPrivateMetadata(
  "Criar conta",
  "Crie sua conta gratuita no NabuLab para salvar simulados, acompanhar seu desempenho e estudar em qualquer dispositivo.",
);

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ mensagem?: string; next?: string }> }) {
  const { mensagem, next } = await searchParams;
  const teacherIntent = next?.startsWith("/professor") ?? false;
  return (
    <AuthCard title={teacherIntent ? "Comece grátis como professor" : "Comece grátis"} description={teacherIntent ? "Use sua conta NabuLab para criar turmas, atividades e acompanhar seus alunos." : "Crie sua conta com e-mail e senha. Você entra direto no NabuLab e recebe 10 questões gratuitas por dia."} message={mensagem}>
      <SignupForm next={next ?? "/dashboard"} intent={teacherIntent ? "teacher" : "student"} />
      <p className="mt-5 text-center text-sm text-slate-600">Já tem conta? <Link className="font-bold text-blue-700" href={`/login?next=${encodeURIComponent(next ?? "/dashboard")}`}>Entrar</Link></p>
    </AuthCard>
  );
}
