"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { StudentAccount } from "@/types/student-account";

type StudentAccountState = {
  account: StudentAccount | null;
  loading: boolean;
};

export function useStudentAccount(): StudentAccountState {
  const [state, setState] = useState<StudentAccountState>({
    account: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function loadAccount() {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (!active) return;

      if (userError || !userData.user) {
        if (userError) {
          console.error("[student-account] Não foi possível carregar a sessão:", userError);
        }
        setState({ account: null, loading: false });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name,username,email,avatar_url")
        .eq("id", userData.user.id)
        .maybeSingle();

      if (!active) return;

      if (profileError) {
        console.error("[student-account] Não foi possível carregar o perfil:", profileError);
      }

      const metadata = userData.user.user_metadata;
      setState({
        account: {
          id: userData.user.id,
          email: profile?.email ?? userData.user.email ?? "",
          username: profile?.username ?? metadata.username ?? null,
          fullName: profile?.full_name ?? metadata.full_name ?? null,
          avatarUrl: profile?.avatar_url ?? metadata.avatar_url ?? null,
        },
        loading: false,
      });
    }

    void loadAccount();

    return () => {
      active = false;
    };
  }, []);

  return state;
}
