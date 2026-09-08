import Link from "next/link";
import { signIn } from "@/app/auth/actions";
import { AuthCard, buttonClass, inputClass } from "@/components/commercial/auth-card";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ mensagem?: string }> }) {
  const { mensagem } = await searchParams;
  return (
    <AuthCard title="Entrar no NabuLab" description="Acesse seu ambiente individual ou institucional." message={mensagem}>
      <form action={signIn} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">E-mail
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block text-sm font-semibold text-slate-700">Senha
          <input className={inputClass} type="password" name="password" autoComplete="current-password" minLength={8} required />
        </label>
        <button className={buttonClass} type="submit">Entrar</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">Ainda não tem conta? <Link className="font-bold text-blue-700" href="/cadastro">Cadastre-se</Link></p>
    </AuthCard>
  );
}
