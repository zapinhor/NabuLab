"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef } from "react";

import { createClient } from "@/lib/supabase/client";

export type LiveTable = "teacher_class_members" | "teacher_class_invites" | "teacher_class_activities" | "teacher_activity_attempts";
export type LiveSubscription = { table: LiveTable; filter?: string };

/** Intervalo de segurança caso o tempo real caia (rede, aba suspensa etc.). */
const FALLBACK_POLL_MS = 45_000;

/**
 * Recarrega os dados da página (router.refresh) quando algo muda nas tabelas da turma:
 * - tempo real (Supabase Realtime, respeitando o RLS de quem está vendo);
 * - quando a aba volta a ficar visível;
 * - a cada 45 s como segurança.
 */
export function LiveRefresh({ subscriptions }: { subscriptions: LiveSubscription[] }) {
  const router = useRouter();
  const instanceId = useId();
  const timer = useRef<number | null>(null);
  const key = JSON.stringify(subscriptions);

  useEffect(() => {
    const list = JSON.parse(key) as LiveSubscription[];
    const refresh = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => router.refresh(), 400);
    };
    const supabase = createClient();
    let channel = supabase.channel(`live:${instanceId}`);
    for (const item of list) {
      channel = channel.on("postgres_changes", { event: "*", schema: "public", table: item.table, ...(item.filter ? { filter: item.filter } : {}) }, refresh);
    }
    channel.subscribe();

    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    const poll = window.setInterval(() => { if (document.visibilityState === "visible") router.refresh(); }, FALLBACK_POLL_MS);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(poll);
      if (timer.current) window.clearTimeout(timer.current);
      void supabase.removeChannel(channel);
    };
  }, [key, instanceId, router]);

  return null;
}
