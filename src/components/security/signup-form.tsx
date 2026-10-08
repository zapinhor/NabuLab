"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/auth/actions";
import { trackEvent } from "@/components/analytics/track-event";
import { buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField } from "@/components/security/turnstile-field";
import {
  getPasswordStrength,
  validateEmail,
  validatePassword,
  validateSignup,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from "@/lib/forms/signup-validation";

const INITIAL_VALUES: SignupValues = { email: "", password: "" };
const FIELD_HELP: Record<SignupField, string> = {
  email: "Use um endereço completo ao qual você tenha acesso.",
  password: "Mínimo de 8 caracteres. Letras, números, espaços e símbolos são aceitos.",
};
const VALIDATORS = { email: validateEmail, password: validatePassword } as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className={buttonClass} type="submit" disabled={pending}>{pending ? "Criando sua conta…" : "Criar conta grátis"}</button>;
}

function FieldMessage({ field, error }: { field: SignupField; error?: string }) {
  return <p id={`${field}-help`} className={`mt-1.5 text-xs leading-5 ${error ? "font-semibold text-red-700" : "text-slate-500"}`} aria-live="polite">{error ?? FIELD_HELP[field]}</p>;
}

export function SignupForm({ next }: { next: string }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignupField, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const startedRef = useRef(false);
  const strength = getPasswordStrength(values.password);
  const canSubmit = useCallback(() => Object.keys(validateSignup(values)).length === 0, [values]);

  function trackStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    void trackEvent("signup_started", { form: "student_fast_signup" });
  }

  function updateField(field: SignupField, nextValue: string) {
    trackStarted();
    setValues((current) => ({ ...current, [field]: nextValue }));
    if (touched[field]) {
      const error = VALIDATORS[field](nextValue);
      setErrors((current) => ({ ...current, [field]: error ?? undefined }));
    }
  }

  function validateField(field: SignupField) {
    setTouched((current) => ({ ...current, [field]: true }));
    const error = VALIDATORS[field](values[field]);
    setErrors((current) => ({ ...current, [field]: error ?? undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    trackStarted();
    const nextErrors = validateSignup(values);
    if (Object.keys(nextErrors).length === 0) return;
    event.preventDefault();
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    const firstInvalid = (Object.keys(nextErrors) as SignupField[])[0];
    requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
  }

  function fieldClasses(field: SignupField) {
    return `${inputClass} ${errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}`;
  }

  return (
    <form action={signUp} onSubmitCapture={handleSubmit} noValidate className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
        E-mail
        <input id="email" className={fieldClasses("email")} type="email" inputMode="email" name="email" autoComplete="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => validateField("email")} aria-invalid={Boolean(errors.email)} aria-describedby="email-help" autoFocus />
        <FieldMessage field="email" error={errors.email} />
      </label>
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Senha</label>
        <div className="relative">
          <input id="password" className={`${fieldClasses("password")} pr-20`} type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" value={values.password} onChange={(event) => updateField("password", event.target.value)} onBlur={() => validateField("password")} aria-invalid={Boolean(errors.password)} aria-describedby="password-help password-strength" />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute inset-y-0 right-0 mt-1 flex items-center px-3 text-xs font-bold text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} aria-pressed={showPassword}>{showPassword ? "Ocultar" : "Mostrar"}</button>
        </div>
        <FieldMessage field="password" error={errors.password} />
        <div id="password-strength" className="mt-2" aria-live="polite">
          <div className="flex items-center justify-between gap-3 text-xs"><span className="font-semibold text-slate-600">Força da senha</span><span className="font-bold text-slate-700">{strength.label}</span></div>
          <div className="mt-1.5 grid grid-cols-5 gap-1" aria-hidden="true">{[1, 2, 3, 4, 5].map((step) => <span key={step} className={`h-1.5 rounded-full ${step <= strength.score ? strength.color : "bg-slate-200"}`} />)}</div>
        </div>
      </div>
      <TurnstileField inputName="captcha_token" canSubmit={canSubmit} />
      <SubmitButton />
      <p className="text-center text-xs leading-5 text-slate-500">Ao criar sua conta, você concorda com os termos e a política de privacidade do NabuLab.</p>
    </form>
  );
}
