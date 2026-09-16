export function captchaEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export function optionalCaptchaToken(value: unknown) {
  const token = typeof value === "string" ? value.trim() : "";
  return token || undefined;
}
