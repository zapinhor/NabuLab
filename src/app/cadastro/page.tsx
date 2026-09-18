import Link from "next/link";
import { AuthCard } from "@/components/commercial/auth-card";
import { SignupForm } from "@/components/security/signup-form";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ mensagem?: string; next?: string }> }) {
  const { mensagem, next } = await searchParams;
  return (
    <AuthCard title="Criar sua conta" description="Sua conta é pessoal e pode participar de diferentes instituições e turmas." message={mensagem}>
      <SignupForm next={next ?? "/dashboard"} />
      <p className="mt-5 text-center text-sm text-slate-600">Já tem conta? <Link className="font-bold text-blue-700" href={`/login?next=${encodeURIComponent(next ?? "/dashboard")}`}>Entrar</Link></p>
    </AuthCard>
  );
}
