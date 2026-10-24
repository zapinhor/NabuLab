/**
 * "Pré-registro": como a pessoa se identifica ao criar a conta.
 * Serve só para orientar a entrada e medir o público — todas as contas têm o
 * mesmo acesso ao NabuLab padrão (questões e simulados de vestibular).
 */
export const SIGNUP_PROFILES = ["estudante", "aluno", "professor"] as const;
export type SignupProfile = (typeof SIGNUP_PROFILES)[number];

export function isSignupProfile(value: unknown): value is SignupProfile {
  return typeof value === "string" && SIGNUP_PROFILES.includes(value as SignupProfile);
}

/** Para onde levar a pessoa logo após o cadastro, quando ela não veio de um link específico. */
export function profileLandingPath(profile: SignupProfile, next: string) {
  const [path, query = ""] = next.split("?");
  if (path !== "/dashboard") return next;
  const keep = new URLSearchParams(query);
  const suffix = keep.toString() ? `?${keep.toString()}` : "";
  if (profile === "professor") return `/professor${suffix}`;
  if (profile === "aluno") return `/turmas${suffix}#codigo`;
  return next;
}

/** Perfil sugerido a partir do destino (ex.: veio da página de professores). */
export function profileFromNext(next: string): SignupProfile | null {
  if (next.startsWith("/professor")) return "professor";
  if (next.startsWith("/turmas")) return "aluno";
  if (next.includes("origem=teste")) return "estudante";
  return null;
}
