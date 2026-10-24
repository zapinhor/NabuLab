import type { ReactNode } from "react";
import { requirePlatformAdmin } from "@/lib/admin/auth";

// A auditoria do banco de questões é uma ferramenta interna: só administradores acessam.
export default async function AuditLayout({ children }: { children: ReactNode }) {
  await requirePlatformAdmin({ returnTo: "/auditoria" });
  return children;
}
