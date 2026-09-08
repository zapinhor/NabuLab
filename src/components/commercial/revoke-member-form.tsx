"use client";

import type { FormEvent } from "react";
import { revokeOrganizationMember } from "@/app/comercial/actions";

export function RevokeMemberForm({
  organizationId,
  userId,
  memberName,
}: {
  organizationId: string;
  userId: string;
  memberName: string;
}) {
  function confirmRevocation(event: FormEvent<HTMLFormElement>) {
    const confirmed = window.confirm(
      `Tem certeza que deseja revogar as permissões de ${memberName}?`,
    );

    if (!confirmed) event.preventDefault();
  }

  return (
    <form action={revokeOrganizationMember} onSubmit={confirmRevocation}>
      <input type="hidden" name="organization_id" value={organizationId} />
      <input type="hidden" name="user_id" value={userId} />
      <button className="text-xs font-bold text-red-700 hover:underline">
        Revogar acesso
      </button>
    </form>
  );
}
