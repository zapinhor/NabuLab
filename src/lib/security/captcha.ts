export function captchaEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}

export function optionalCaptchaToken(value: unknown) {
  const token = typeof value === "string" ? value.trim() : "";
  return token || undefined;
}

export function requiredCaptchaToken(value: unknown) {
  const token = optionalCaptchaToken(value);
  if (captchaEnabled() && !token) throw new Error("CAPTCHA_REQUIRED");
  return token;
}
