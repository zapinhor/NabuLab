import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/commercial/auth-card";
import { LoginForm } from "@/components/security/login-form";
import { createPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = createPrivateMetadata(
  "Entrar",
  "Entre na sua conta NabuLab para continuar seus estudos e acessar seu histórico acadêmico.",
);

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mensagem?: string; next?: string }>;
}) {
  const { mensagem, next } = await searchParams;
  const teacherIntent = next?.startsWith("/professor") ?? false;
  return (
    <AuthCard
      title={teacherIntent ? "Entre para continuar como professor" : "Entrar no NabuLab"}
      description={teacherIntent ? "Use sua conta existente. O módulo Professor será ativado sem criar outra conta." : "Acesse sua conta para continuar seus estudos em qualquer dispositivo."}
      message={mensagem}
    >
      <LoginForm next={next ?? "/dashboard"} />
      <p className="mt-4 text-center text-sm"><Link className="font-bold text-blue-700" href="/recuperar-senha">Esqueci minha senha</Link></p>
      <p className="mt-5 text-center text-sm text-slate-600">
        Ainda não tem conta? <Link className="font-bold text-blue-700" href={`/cadastro?next=${encodeURIComponent(next ?? "/dashboard")}`}>Cadastre-se</Link>
      </p>
    </AuthCard>
  );
}
