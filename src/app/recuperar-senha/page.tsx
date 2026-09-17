import { requestPasswordReset } from "@/app/auth/actions";
import { AuthCard, buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField } from "@/components/security/turnstile-field";

export default async function RecoverPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ mensagem?: string }>;
}) {
  const { mensagem } = await searchParams;

  return (
    <AuthCard
      title="Recuperar senha"
      description="Informe seu e-mail. A resposta será sempre genérica para proteger sua conta."
      message={mensagem}
    >
      <form action={requestPasswordReset} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          E-mail
          <input className={inputClass} type="email" name="email" autoComplete="email" required />
        </label>
        <TurnstileField inputName="captcha_token" />
        <button className={buttonClass}>Enviar instruções</button>
      </form>
    </AuthCard>
  );
}
