"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type AccountRoles = {
  /** Conta com o módulo Professor ativado (teacher_accounts). */
  isTeacher: boolean;
  /** Administrador global da plataforma (platform_admins). */
  isPlatformAdmin: boolean;
  /** Membro de alguma instituição (organization_members). */
  hasOrganization: boolean;
  /** Quantidade de turmas de professores em que o aluno está ativo. */
  activeClassCount: number;
};

type AccountRolesState = AccountRoles & { loading: boolean };

const EMPTY: AccountRoles = {
  isTeacher: false,
  isPlatformAdmin: false,
  hasOrganization: false,
  activeClassCount: 0,
};

/**
 * Lê os papéis da conta logada. Cada consulta só enxerga as linhas do próprio
 * usuário (políticas RLS), então o resultado serve apenas para decidir o que
 * mostrar na interface. As páginas protegidas continuam validando no servidor.
 */
export function useAccountRoles(): AccountRolesState {
  const [state, setState] = useState<AccountRolesState>({ ...EMPTY, loading: true });

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) {
        if (active) setState({ ...EMPTY, loading: false });
        return;
      }

      const [teacher, admin, organizations, classes] = await Promise.all([
        supabase.from("teacher_accounts").select("user_id").eq("user_id", userId).maybeSingle(),
        supabase.from("platform_admins").select("user_id").eq("user_id", userId).maybeSingle(),
        supabase.from("organization_members").select("organization_id", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("teacher_class_members").select("class_id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "active"),
      ]);

      if (!active) return;
      setState({
        isTeacher: Boolean(teacher.data),
        isPlatformAdmin: Boolean(admin.data),
        hasOrganization: (organizations.count ?? 0) > 0,
        activeClassCount: classes.count ?? 0,
        loading: false,
      });
    }

    void load().catch((error) => {
      console.error("[account-roles] Não foi possível carregar os papéis:", error);
      if (active) setState({ ...EMPTY, loading: false });
    });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
