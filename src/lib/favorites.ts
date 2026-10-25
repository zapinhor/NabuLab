"use client";

import { useEffect, useSyncExternalStore } from "react";

import { createClient } from "@/lib/supabase/client";

/*
 * Favoritas do aluno (tabela question_favorites, uma linha por questão).
 * Um único estado compartilhado entre todas as estrelas da página, carregado
 * uma vez por sessão e atualizado na hora ao marcar ou desmarcar.
 */

type FavoritesState = { loaded: boolean; ids: ReadonlySet<string> };

let state: FavoritesState = { loaded: false, ids: new Set() };
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit(next: FavoritesState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const SERVER_STATE: FavoritesState = { loaded: false, ids: new Set() };

async function load() {
  loading ??= (async () => {
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return emit({ loaded: true, ids: new Set() });
    const { data, error } = await supabase
      .from("question_favorites")
      .select("question_id")
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("[favorites] Não foi possível carregar as favoritas:", error.message);
      loading = null;
      return emit({ loaded: true, ids: state.ids });
    }
    emit({ loaded: true, ids: new Set((data ?? []).map((row) => row.question_id as string)) });
  })();
  return loading;
}

/** Lista de favoritas e se já carregou. */
export function useFavorites() {
  const current = useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
  useEffect(() => {
    void load();
  }, []);
  return current;
}

/** Marca ou desmarca; atualiza a tela antes da resposta e desfaz se der erro. */
export async function toggleFavorite(questionId: string): Promise<boolean> {
  const wasFavorite = state.ids.has(questionId);
  const optimistic = new Set(state.ids);
  if (wasFavorite) optimistic.delete(questionId);
  else optimistic.add(questionId);
  emit({ ...state, ids: optimistic });

  const supabase = createClient();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  const { error } = !userId
    ? { error: new Error("AUTH_REQUIRED") }
    : wasFavorite
      ? await supabase.from("question_favorites").delete().eq("user_id", userId).eq("question_id", questionId)
      : await supabase.from("question_favorites").insert({ user_id: userId, question_id: questionId });

  if (error) {
    const reverted = new Set(state.ids);
    if (wasFavorite) reverted.add(questionId);
    else reverted.delete(questionId);
    emit({ ...state, ids: reverted });
    throw new Error(error.message.includes("favorites_limit_reached")
      ? "Você chegou ao limite de 500 favoritas. Desmarque algumas para adicionar novas."
      : "Não foi possível salvar a favorita agora.");
  }
  return !wasFavorite;
}
