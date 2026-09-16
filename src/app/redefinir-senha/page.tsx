import { updatePassword } from "@/app/auth/actions";
import { AuthCard, buttonClass, inputClass } from "@/components/commercial/auth-card";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ mensagem?: string }> }) {
  const { mensagem } = await searchParams;
  return <AuthCard title="Definir nova senha" description="Escolha uma senha nova para sua conta." message={mensagem}>
    <form action={updatePassword} className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">Nova senha<input className={inputClass} type="password" name="password" autoComplete="new-password" minLength={8} required /></label>
      <label className="block text-sm font-semibold text-slate-700">Confirmar senha<input className={inputClass} type="password" name="password_confirmation" autoComplete="new-password" minLength={8} required /></label>
      <button className={buttonClass}>Atualizar senha</button>
    </form>
  </AuthCard>;
}
