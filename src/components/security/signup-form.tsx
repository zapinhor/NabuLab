"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/auth/actions";
import { trackEvent } from "@/components/analytics/track-event";
import { buttonClass, inputClass } from "@/components/commercial/auth-card";
import { TurnstileField } from "@/components/security/turnstile-field";
import { createClient } from "@/lib/supabase/client";
import {
  GUARDIAN_CONSENT_AGE,
  USERNAME_RULES,
  ageOn,
  getPasswordStrength,
  normalizeUsername,
  validateBirthDate,
  validateEmail,
  validatePassword,
  validateSignup,
  validateUsername,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from "@/lib/forms/signup-validation";
import type { SignupProfile } from "@/lib/forms/signup-profile";
import type { StudyFocus } from "@/lib/study-focus";

const INITIAL_VALUES: SignupValues = { username: "", birth_date: "", email: "", password: "" };
const FIELD_HELP: Record<SignupField, string> = {
  username: USERNAME_RULES,
  birth_date: "Usada só para conhecermos a faixa de idade do nosso público. Não aparece para outras pessoas.",
  email: "Use um endereço completo ao qual você tenha acesso.",
  password: "Mínimo de 8 caracteres. Letras, números, espaços e símbolos são aceitos.",
};
const VALIDATORS = { username: validateUsername, birth_date: (value: string) => validateBirthDate(value), email: validateEmail, password: validatePassword } as const;
const ALL_TOUCHED = { username: true, birth_date: true, email: true, password: true };

type Availability = "idle" | "checking" | "available" | "taken" | "error";

/** Confere, enquanto a pessoa digita, se o @username ainda está livre. */
function useUsernameAvailability(username: string) {
  const [state, setState] = useState<{ username: string; status: Availability }>({ username: "", status: "idle" });
  const normalized = normalizeUsername(username);
  const valid = validateUsername(username) === null;
  useEffect(() => {
    if (!valid) return;
    let active = true;
    const timer = setTimeout(async () => {
      setState({ username: normalized, status: "checking" });
      const { data, error } = await createClient().rpc("username_available", { p_username: normalized });
      if (active) setState({ username: normalized, status: error ? "error" : data ? "available" : "taken" });
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [normalized, valid]);
  if (!valid) return "idle";
  return state.username === normalized ? state.status : "checking";
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className={buttonClass} type="submit" disabled={pending}>{pending ? "Criando sua conta…" : "Criar conta grátis"}</button>;
}

function FieldMessage({ field, error }: { field: SignupField; error?: string }) {
  return <p id={`${field}-help`} className={`mt-1.5 text-xs leading-5 ${error ? "font-semibold text-red-700" : "text-slate-500"}`} aria-live="polite">{error ?? FIELD_HELP[field]}</p>;
}

export function SignupForm({ next, intent = "student", profile, studyFocus }: { next: string; intent?: "student" | "teacher"; profile?: SignupProfile | null; studyFocus?: StudyFocus | null }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignupField, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const startedRef = useRef(false);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const strength = getPasswordStrength(values.password);
  const availability = useUsernameAvailability(values.username);
  const needsGuardian = validateBirthDate(values.birth_date) === null && ageOn(values.birth_date) < GUARDIAN_CONSENT_AGE;
  const blockedByExtras = availability === "taken" || (needsGuardian && !guardianConsent);
  const canSubmit = useCallback(() => Object.keys(validateSignup(values)).length === 0 && !blockedByExtras, [values, blockedByExtras]);

  function trackStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    void trackEvent("signup_started", { form: intent === "teacher" ? "teacher_fast_signup" : "student_fast_signup", intent, ...(profile ? { profile } : {}) });
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
    if (availability === "taken") nextErrors.username = "Esse @username já está em uso. Escolha outro.";
    if (Object.keys(nextErrors).length === 0 && !(needsGuardian && !guardianConsent)) return;
    event.preventDefault();
    if (Object.keys(nextErrors).length === 0) {
      requestAnimationFrame(() => document.getElementById("guardian_consent")?.focus());
      return;
    }
    setErrors(nextErrors);
    setTouched(ALL_TOUCHED);
    const firstInvalid = (Object.keys(nextErrors) as SignupField[])[0];
    requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
  }

  function fieldClasses(field: SignupField) {
    return `${inputClass} ${errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}`;
  }

  return (
    <form action={signUp} onSubmitCapture={handleSubmit} noValidate className="space-y-4">
      <input type="hidden" name="next" value={next} />
      {profile && <input type="hidden" name="signup_profile" value={profile} />}
      {studyFocus && <input type="hidden" name="study_focus" value={studyFocus} />}
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="username">Seu @username</label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 mt-1 flex items-center pl-4 font-bold text-slate-400" aria-hidden="true">@</span>
          <input id="username" className={`${fieldClasses("username")} pl-9`} type="text" name="username" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={25} value={values.username} onChange={(event) => updateField("username", event.target.value.replace(/^@+/, "").toLowerCase())} onBlur={() => validateField("username")} aria-invalid={Boolean(errors.username) || availability === "taken"} aria-describedby="username-help username-status" autoFocus />
        </div>
        <p id="username-status" className="mt-1.5 text-xs font-bold" aria-live="polite">
          {availability === "checking" && <span className="text-slate-500">Conferindo se está livre…</span>}
          {availability === "available" && <span className="text-emerald-700">@{normalizeUsername(values.username)} está livre.</span>}
          {availability === "taken" && <span className="text-red-700">@{normalizeUsername(values.username)} já está em uso. Escolha outro.</span>}
        </p>
        <FieldMessage field="username" error={errors.username} />
      </div>
      <label className="block text-sm font-semibold text-slate-700" htmlFor="birth_date">
        Data de nascimento
        <input id="birth_date" className={fieldClasses("birth_date")} type="date" name="birth_date" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} value={values.birth_date} onChange={(event) => updateField("birth_date", event.target.value)} onBlur={() => validateField("birth_date")} aria-invalid={Boolean(errors.birth_date)} aria-describedby="birth_date-help" />
        <FieldMessage field="birth_date" error={errors.birth_date} />
      </label>
      {needsGuardian && (
        <label htmlFor="guardian_consent" className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <input id="guardian_consent" name="guardian_consent" type="checkbox" value="1" checked={guardianConsent} onChange={(event) => setGuardianConsent(event.target.checked)} className="mt-1 h-4 w-4" />
          <span>Tenho menos de 12 anos e meu pai, minha mãe ou o responsável por mim autorizou este cadastro.</span>
        </label>
      )}
      <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
        E-mail
        <input id="email" className={fieldClasses("email")} type="email" inputMode="email" name="email" autoComplete="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => validateField("email")} aria-invalid={Boolean(errors.email)} aria-describedby="email-help" />
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
      <p className="text-center text-xs leading-5 text-slate-500">Ao criar sua conta, você concorda com os <a className="font-bold underline" href="/termos">termos</a> e a <a className="font-bold underline" href="/privacidade">política de privacidade</a> do NabuLab.</p>
    </form>
  );
}
