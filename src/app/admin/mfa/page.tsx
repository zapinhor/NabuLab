import { AdminShell } from "@/components/admin/admin-shell";
import { MfaEnrollment } from "@/components/admin/mfa-enrollment";
import { requirePlatformAdmin } from "@/lib/admin/auth";
import { safeNextPath } from "@/lib/routing";

export default async function AdminMfaPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  await requirePlatformAdmin();
  const params = await searchParams;
  const returnTo = safeNextPath(params.returnTo, "/admin");
  return (
    <AdminShell title="Proteja sua conta administrativa" description="Áreas financeiras, assinaturas e sistema exigem uma sessão AAL2 para super_admin.">
      <MfaEnrollment returnTo={returnTo} />
    </AdminShell>
  );
}
