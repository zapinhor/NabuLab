export const PUBLIC_APP_PATHS = [
  "/",
  "/login",
  "/entrar",
  "/cadastro",
  "/termos",
  "/privacidade",
  "/suporte",
  "/auth/confirm",
  "/api/analytics/events",
  "/api/webhooks/hotmart",
  "/sitemap.xml",
  "/robots.txt",
] as const;

export function isPublicAppPath(pathname: string) {
  return PUBLIC_APP_PATHS.some(
    (path) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
  );
}

export function safeNextPath(value: string | null | undefined, fallback = "/dashboard") {
  return value?.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
