"use client";

import type { FormEvent } from "react";
import {
  removeStudentFromClass,
  revokeClassInvite,
  setClassArchived,
} from "@/app/comercial/turmas/actions";

function confirm(event: FormEvent<HTMLFormElement>, message: string) {
  if (!window.confirm(message)) event.preventDefault();
}

export function RemoveStudentForm({
  classId,
  studentId,
  studentName,
}: {
  classId: string;
  studentId: string;
  studentName: string;
}) {
  return (
    <form
      action={removeStudentFromClass}
      onSubmit={(event) =>
        confirm(
          event,
          `Remover ${studentName} somente desta turma? O vínculo com a instituição será mantido.`,
        )
      }
    >
      <input type="hidden" name="class_id" value={classId} />
      <input type="hidden" name="student_id" value={studentId} />
      <button className="text-xs font-bold text-red-700 hover:underline">
        Remover da turma
      </button>
    </form>
  );
}

export function RevokeClassInviteForm({
  classId,
  inviteId,
  email,
}: {
  classId: string;
  inviteId: string;
  email: string;
}) {
  return (
    <form
      action={revokeClassInvite}
      onSubmit={(event) =>
        confirm(event, `Revogar o convite enviado para ${email}?`)
      }
    >
      <input type="hidden" name="class_id" value={classId} />
      <input type="hidden" name="invite_id" value={inviteId} />
      <button className="text-xs font-bold text-red-700 hover:underline">
        Revogar
      </button>
    </form>
  );
}

export function ArchiveClassForm({
  classId,
  archived,
}: {
  classId: string;
  archived: boolean;
}) {
  const label = archived ? "Restaurar turma" : "Arquivar turma";
  return (
    <form
      action={setClassArchived}
      onSubmit={(event) =>
        confirm(
          event,
          archived
            ? "Restaurar esta turma para a lista ativa?"
            : "Arquivar esta turma? Os dados serão preservados.",
        )
      }
    >
      <input type="hidden" name="class_id" value={classId} />
      <input type="hidden" name="archived" value={String(!archived)} />
      <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
        {label}
      </button>
    </form>
  );
}
