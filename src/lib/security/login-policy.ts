export type LoginFailureState = { count: number; windowStartedAt: number; blockedUntil: number | null };
export type LoginPolicy = { maxAttempts: number; windowMs: number; cooldownMs: number };

export function nextFailureState(previous: LoginFailureState | null, now: number, policy: LoginPolicy): LoginFailureState {
  if (previous?.blockedUntil && previous.blockedUntil > now) return previous;
  const withinWindow = Boolean(previous && previous.windowStartedAt + policy.windowMs > now);
  const count = withinWindow ? previous!.count + 1 : 1;
  return { count, windowStartedAt: withinWindow ? previous!.windowStartedAt : now, blockedUntil: count >= policy.maxAttempts ? now + policy.cooldownMs : null };
}

export function isBlocked(state: LoginFailureState | null, now: number) {
  return Boolean(state?.blockedUntil && state.blockedUntil > now);
}
