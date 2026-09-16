export type AuthenticatorLevel = string | null;

export type MfaBootstrapDecision =
  | "verified"
  | "challenge"
  | "enroll"
  | "inconsistent";

export function decideMfaBootstrap(
  currentLevel: AuthenticatorLevel,
  nextLevel: AuthenticatorLevel,
  verifiedTotpCount: number,
): MfaBootstrapDecision {
  if (currentLevel === "aal2" && nextLevel === "aal2") return "verified";
  if (verifiedTotpCount > 0) {
    return nextLevel === "aal2" ? "challenge" : "inconsistent";
  }
  return "enroll";
}
