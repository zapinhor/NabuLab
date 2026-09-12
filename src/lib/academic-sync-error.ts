export class AcademicSyncAuthError extends Error {
  constructor(options?: { cause?: unknown }) {
    super("A sessão do estudante não está disponível para sincronização.", options);
    this.name = "AcademicSyncAuthError";
  }
}

export function isAcademicSyncAuthError(error: unknown) {
  return (
    error instanceof AcademicSyncAuthError ||
    (error instanceof Error && error.name === "AcademicSyncAuthError")
  );
}

export function academicSyncAuthRedirect(error: unknown, pathname: string) {
  if (!isAcademicSyncAuthError(error)) return null;
  return `/login?next=${encodeURIComponent(pathname || "/")}`;
}
