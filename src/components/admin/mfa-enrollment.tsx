"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { decideMfaBootstrap } from "@/lib/admin/mfa-state";

type Enrollment = { factorId: string; qrCode: string; secret: string };
type MfaState = "checking" | "challenge" | "cleaning" | "enrolling" | "verifyEnrollment" | "verified" | "error";
const REMOTE_TIMEOUT_MS = 12_000;

function authErrorDetails(error: { name: string; code?: string; status?: number }) {
  return { name: error.name, code: error.code ?? null, status: error.status ?? null };
}

function logAuthError(step: string, runId: number, error: unknown, severity: "warn" | "error" = "error") {
  if (process.env.NODE_ENV !== "development") return;
  const details = error instanceof Error
    ? { runId, ...authErrorDetails(error) }
    : { runId, name: "UnknownError", code: null, status: null };
  if (severity === "warn") console.warn(`[mfa] ${step}`, details);
  else console.error(`[mfa] ${step}`, details);
}

async function withTimeout<T>(operation: PromiseLike<T>, step: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.resolve(operation),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`Timeout em ${step}.`)), REMOTE_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function MfaEnrollment({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const runIdRef = useRef(0);
  const verifyingRef = useRef(false);
  const [run, setRun] = useState(0);
  const [state, setState] = useState<MfaState>("checking");
  const [verifying, setVerifying] = useState(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Verificando sua autenticação…");
  const qrCodeSrc = enrollment?.qrCode?.trim();

  useEffect(() => {
    const runId = ++runIdRef.current;
    const isCurrent = () => runIdRef.current === runId;
    function transition(nextState: MfaState, nextMessage: string) {
      if (!isCurrent()) return false;
      setState(nextState);
      setMessage(nextMessage);
      return true;
    }

    async function bootstrap() {
      transition("checking", "Verificando sua autenticação…");
      setEnrollment(null);
      try {
        const supabase = createClient();
        const { data: assurance, error: assuranceError } = await withTimeout(supabase.auth.mfa.getAuthenticatorAssuranceLevel(), "getAuthenticatorAssuranceLevel");
        if (!isCurrent()) return;
        if (assuranceError) throw assuranceError;
        if (decideMfaBootstrap(assurance.currentLevel, assurance.nextLevel, 0) === "verified") {
          transition("verified", "MFA ativado. Redirecionando…");
          router.push(returnTo);
          router.refresh();
          return;
        }

        const { data: factors, error: listError } = await withTimeout(supabase.auth.mfa.listFactors(), "listFactors");
        if (!isCurrent()) return;
        if (listError) throw listError;
        const verifiedFactors = factors.totp;
        const abandoned = factors.all.filter((factor) => factor.factor_type === "totp" && factor.status === "unverified");

        const decision = decideMfaBootstrap(assurance.currentLevel, assurance.nextLevel, verifiedFactors.length);
        const verified = verifiedFactors[0];
        if (decision === "inconsistent") throw new Error("Existe um fator TOTP verificado, mas a sessão não o reconhece como próximo nível AAL2.");
        if (decision === "challenge" && verified) {
          setEnrollment({ factorId: verified.id, qrCode: "", secret: "" });
          transition("challenge", "Digite o código atual do seu aplicativo autenticador.");
          return;
        }

        if (abandoned.length) {
          transition("cleaning", "Limpando um cadastro MFA incompleto…");
          for (const factor of abandoned) {
            const { error } = await withTimeout(supabase.auth.mfa.unenroll({ factorId: factor.id }), "unenroll");
            if (!isCurrent()) return;
            if (error) throw error;
          }
        }

        transition("enrolling", "Preparando um novo autenticador…");
        const { data, error: enrollError } = await withTimeout(supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "NabuLab Admin" }), "enroll");
        if (!isCurrent()) return;
        if (enrollError) {
          logAuthError("enroll:error", runId, enrollError);
          throw enrollError;
        }
        setEnrollment({ factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret });
        transition("verifyEnrollment", "Escaneie o QR e confirme o código. O MFA ainda não está ativado.");
      } catch (error) {
        if (!isCurrent()) return;
        logAuthError("bootstrap:error", runId, error);
        transition("error", "Não foi possível preparar a autenticação em duas etapas.");
      }
    }

    void bootstrap();
    return () => {
      if (runIdRef.current === runId) runIdRef.current += 1;
    };
  }, [returnTo, router, run]);

  function retry() {
    verifyingRef.current = false;
    setCode("");
    setRun((value) => value + 1);
  }

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (verifyingRef.current || !enrollment || !/^\d{6}$/.test(code)) {
      if (!verifyingRef.current) setMessage("Digite o código de 6 dígitos.");
      return;
    }
    const runId = runIdRef.current;
    const isCurrent = () => runIdRef.current === runId;
    verifyingRef.current = true;
    setVerifying(true);
    let verifySucceeded = false;
    try {
      const supabase = createClient();
      const { data: challenge, error: challengeError } = await withTimeout(supabase.auth.mfa.challenge({ factorId: enrollment.factorId }), "challenge");
      if (!isCurrent()) return;
      if (challengeError) throw challengeError;
      const { error: verifyError } = await withTimeout(supabase.auth.mfa.verify({ factorId: enrollment.factorId, challengeId: challenge.id, code }), "verify");
      if (!isCurrent()) return;
      if (verifyError) throw verifyError;
      verifySucceeded = true;

      const { error: refreshError } = await withTimeout(supabase.auth.refreshSession(), "refreshSession");
      if (!isCurrent()) return;
      if (refreshError) throw refreshError;

      const { data: assurance, error: assuranceError } = await withTimeout(supabase.auth.mfa.getAuthenticatorAssuranceLevel(), "getAuthenticatorAssuranceLevel pós-verify");
      if (!isCurrent()) return;
      if (assuranceError) throw assuranceError;
      if (assurance.currentLevel !== "aal2" || assurance.nextLevel !== "aal2") throw new Error("A sessão não chegou aos níveis currentLevel=aal2 e nextLevel=aal2.");

      setState("verified");
      setMessage("MFA ativado. Redirecionando…");
      router.push(returnTo);
      router.refresh();
    } catch (error) {
      if (!isCurrent()) return;
      if (verifySucceeded) {
        try {
          const supabase = createClient();
          const { data: assurance, error: assuranceError } = await withTimeout(
            supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
            "getAuthenticatorAssuranceLevel de recuperação",
          );
          if (!isCurrent()) return;
          if (!assuranceError && assurance.currentLevel === "aal2" && assurance.nextLevel === "aal2") {
            logAuthError("verify:recovered", runId, error, "warn");
            setState("verified");
            setMessage("MFA ativado. Redirecionando…");
            router.push(returnTo);
            router.refresh();
            return;
          }
        } catch {
          // A falha original continua sendo a causa terminal da execução atual.
        }
      }
      logAuthError("verify:error", runId, error);
      setState("error");
      setMessage("Não foi possível confirmar a autenticação em duas etapas.");
    } finally {
      verifyingRef.current = false;
      if (isCurrent()) setVerifying(false);
    }
  }

  const preparing = ["checking", "cleaning", "enrolling"].includes(state);

  return (
    <section className="max-w-xl rounded-2xl border bg-white p-6">
      <p className="text-sm leading-6 text-slate-600" aria-live="polite">{message}</p>
      {preparing ? <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" /></div> : null}
      {state === "error" ? <button type="button" onClick={retry} className="mt-5 rounded-xl border border-blue-700 px-5 py-3 font-bold text-blue-700">Tentar novamente</button> : null}
      {qrCodeSrc?.startsWith("data:image/svg+xml") ? (
        <div className="mt-5">
          <h2 className="font-bold text-slate-900">Etapa 1 — Escaneie o QR</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrCodeSrc} alt="QR code para cadastrar o autenticador do NabuLab" width={220} height={220} className="mt-3 h-[220px] w-[220px] rounded-xl border bg-white p-2" />
        </div>
      ) : null}
      {enrollment?.secret ? <div className="mt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Chave manual</p><code className="mt-1 block break-all rounded-lg bg-slate-100 p-3 text-sm">{enrollment.secret}</code></div> : null}
      {enrollment && (state === "challenge" || state === "verifyEnrollment") ? (
        <form onSubmit={verify} className="mt-5 space-y-3">
          <h2 className="font-bold text-slate-900">Etapa 2 — Digite o código do autenticador</h2>
          <label className="sr-only" htmlFor="totp-code">Código do autenticador</label>
          <input id="totp-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} className="w-full rounded-xl border px-4 py-3" />
          <h2 className="font-bold text-slate-900">Etapa 3 — Confirmar</h2>
          <button disabled={verifying || code.length !== 6} className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-50">Confirmar MFA</button>
        </form>
      ) : null}
    </section>
  );
}
