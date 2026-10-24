const MUTATION_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function isRequestBodyTooLarge(request: Request, maxBytes: number) {
  const value = request.headers.get("content-length");
  if (!value) return false;
  const bytes = Number(value);
  return !Number.isSafeInteger(bytes) || bytes < 0 || bytes > maxBytes;
}

export function isTrustedMutationOrigin(request: Request) {
  if (!MUTATION_METHODS.has(request.method.toUpperCase())) return true;
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim()?.replace(/\/$/, "");
  return origin === requestOrigin || Boolean(configuredOrigin && origin === configuredOrigin);
}
