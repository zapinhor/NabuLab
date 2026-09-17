import Link from "next/link";
import { signUp } from "@/app/auth/actions";
import { AuthCard, buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField } from "@/components/security/turnstile-field";
import { USERNAME_HTML_PATTERN } from "@/lib/forms/patterns";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ mensagem?: string; next?: string }> }) {
  const { mensagem, next } = await searchParams;
  return (
    <AuthCard title="Criar sua conta" description="Sua conta é pessoal e pode participar de diferentes instituições e turmas." message={mensagem}>
      <form action={signUp} className="space-y-4">
        <input type="hidden" name="next" value={next ?? "/dashboard"} />
        <label className="block text-sm font-semibold text-slate-700">Nome completo
          <input className={inputClass} name="full_name" autoComplete="name" required minLength={2} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">Username
          <input className={inputClass} name="username" autoComplete="username" required minLength={3} maxLength={32} pattern={USERNAME_HTML_PATTERN} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">E-mail
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </label>
        <label className="block text-sm font-semibold text-slate-700">Senha
          <input className={inputClass} type="password" name="password" autoComplete="new-password" minLength={8} required />
        </label>
        <TurnstileField inputName="captcha_token" />
        <button className={buttonClass} type="submit">Criar conta</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">Já tem conta? <Link className="font-bold text-blue-700" href={`/login?next=${encodeURIComponent(next ?? "/dashboard")}`}>Entrar</Link></p>
    </AuthCard>
  );
}
