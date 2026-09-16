"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Enrollment = { factorId: string; qrCode: string; secret: string };
type MfaState = "checking" | "challenge" | "cleaning" | "enrolling" | "verifyEnrollment" | "verified" | "error";
const REMOTE_TIMEOUT_MS = 12_000;

function developmentLog(step: string, details?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") console.info(`[mfa] ${step}`, details ?? "");
}

function authErrorDetails(error: { name: string; message: string; code?: string; status?: number }) {
  return { name: error.name, code: error.code ?? null, status: error.status ?? null, message: error.message };
}

function logAuthError(step: string, error: unknown) {
  if (process.env.NODE_ENV !== "development") return;
  if (error instanceof Error) console.error(`[mfa] ${step}`, authErrorDetails(error));
  else console.error(`[mfa] ${step}`, { name: "UnknownError", code: null, status: null, message: "Erro não identificado." });
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
  const initializedRef = useRef(false);
  const verifyingRef = useRef(false);
  const [run, setRun] = useState(0);
  const [state, setState] = useState<MfaState>("checking");
  const [verifying, setVerifying] = useState(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("Verificando sua autenticação…");
  const qrCodeSrc = enrollment?.qrCode?.trim();

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    let active = true;

    async function bootstrap() {
      developmentLog("bootstrap:start");
      setState("checking");
      setMessage("Verificando sua autenticação…");
      setEnrollment(null);
      try {
        const supabase = createClient();
        developmentLog("aal:start");
        const { data: assurance, error: assuranceError } = await withTimeout(supabase.auth.mfa.getAuthenticatorAssuranceLevel(), "getAuthenticatorAssuranceLevel");
        if (!active) return;
        if (assuranceError) throw assuranceError;
        developmentLog("aal:done", { currentLevel: assurance.currentLevel, nextLevel: assurance.nextLevel });
        if (assurance.currentLevel === "aal2" && assurance.nextLevel === "aal2") {
          setState("verified");
          setMessage("MFA ativado. Redirecionando…");
          developmentLog("bootstrap:verified");
          router.push(returnTo);
          router.refresh();
          return;
        }

        developmentLog("factors:list:start");
        const { data: factors, error: listError } = await withTimeout(supabase.auth.mfa.listFactors(), "listFactors");
        if (!active) return;
        if (listError) throw listError;
        const totpFactors = factors.all.filter((factor) => factor.factor_type === "totp");
        developmentLog("factors:list:done", {
          total: totpFactors.length,
          factors: totpFactors.map((factor) => ({ status: factor.status, friendlyName: factor.friendly_name ?? null, idPrefix: factor.id.slice(0, 8) })),
        });

        const verified = totpFactors.find((factor) => factor.status === "verified");
        developmentLog("verified:detected", { found: Boolean(verified) });
        if (verified) {
          if (assurance.nextLevel !== "aal2") {
            developmentLog("verified:inconsistent", { currentLevel: assurance.currentLevel, nextLevel: assurance.nextLevel });
            throw new Error("Existe um fator TOTP verificado, mas a sessão não o reconhece como próximo nível AAL2.");
          }
          setEnrollment({ factorId: verified.id, qrCode: "", secret: "" });
          setState("challenge");
          setMessage("Digite o código atual do seu aplicativo autenticador.");
          developmentLog("bootstrap:challenge");
          return;
        }

        const abandoned = totpFactors.filter((factor) => factor.status === "unverified");
        developmentLog("unverified:detected", { total: abandoned.length });
        if (abandoned.length) {
          setState("cleaning");
          setMessage("Limpando um cadastro MFA incompleto…");
          developmentLog("cleanup:start", { total: abandoned.length });
          for (const factor of abandoned) {
            const { error } = await withTimeout(supabase.auth.mfa.unenroll({ factorId: factor.id }), "unenroll");
            if (!active) return;
            if (error) throw error;
          }
          developmentLog("cleanup:done");
        }

        setState("enrolling");
        setMessage("Preparando um novo autenticador…");
        developmentLog("enroll:start");
        const { data, error: enrollError } = await withTimeout(supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "NabuLab Admin" }), "enroll");
        if (!active) return;
        if (enrollError) {
          logAuthError("enroll:error", enrollError);
          throw enrollError;
        }
        developmentLog("enroll:done", { factorIdPrefix: data.id.slice(0, 8) });
        setEnrollment({ factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret });
        setState("verifyEnrollment");
        setMessage("Escaneie o QR e confirme o código. O MFA ainda não está ativado.");
        developmentLog("bootstrap:verifyEnrollment");
      } catch (error) {
        if (!active) return;
        logAuthError("bootstrap:error", error);
        setState("error");
        setMessage("Não foi possível preparar a autenticação em duas etapas.");
      } finally {
        developmentLog("bootstrap:finish");
      }
    }

    void bootstrap();
    return () => { active = false; };
  }, [returnTo, router, run]);

  function retry() {
    initializedRef.current = false;
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
    verifyingRef.current = true;
    setVerifying(true);
    try {
      const supabase = createClient();
      developmentLog("challenge:start");
      const { data: challenge, error: challengeError } = await withTimeout(supabase.auth.mfa.challenge({ factorId: enrollment.factorId }), "challenge");
      if (challengeError) throw challengeError;
      developmentLog("challenge:done");

      developmentLog("verify:start");
      const { error: verifyError } = await withTimeout(supabase.auth.mfa.verify({ factorId: enrollment.factorId, challengeId: challenge.id, code }), "verify");
      if (verifyError) throw verifyError;
      developmentLog("verify:done");

      developmentLog("refreshSession:start");
      const { error: refreshError } = await withTimeout(supabase.auth.refreshSession(), "refreshSession");
      if (refreshError) throw refreshError;
      developmentLog("refreshSession:done");

      const { data: assurance, error: assuranceError } = await withTimeout(supabase.auth.mfa.getAuthenticatorAssuranceLevel(), "getAuthenticatorAssuranceLevel pós-verify");
      if (assuranceError) throw assuranceError;
      developmentLog("verify:aal", { currentLevel: assurance.currentLevel, nextLevel: assurance.nextLevel });
      if (assurance.currentLevel !== "aal2" || assurance.nextLevel !== "aal2") throw new Error("A sessão não chegou aos níveis currentLevel=aal2 e nextLevel=aal2.");

      setState("verified");
      setMessage("MFA ativado. Redirecionando…");
      router.push(returnTo);
      router.refresh();
    } catch (error) {
      logAuthError("verify:error", error);
      setState("error");
      setMessage("Não foi possível confirmar a autenticação em duas etapas.");
    } finally {
      verifyingRef.current = false;
      setVerifying(false);
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
