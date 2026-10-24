"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { AppNotification } from "@/lib/notifications";
import { createClient } from "@/lib/supabase/client";

export type NotificationSummary = { unread: number; items: AppNotification[] };

/** Intervalo de segurança caso o tempo real caia (rede, aba suspensa etc.). */
const FALLBACK_POLL_MS = 60_000;

/**
 * Resumo de notificações que se atualiza sozinho:
 * - tempo real (Supabase Realtime) quando uma notificação do usuário é criada ou lida;
 * - nova busca quando a aba volta a ficar visível;
 * - busca periódica de segurança a cada 60 s.
 * Também mostra o total de não lidas no título e no ícone da aba.
 */
export function useNotificationSummary() {
  const [summary, setSummary] = useState<NotificationSummary | null>(null);
  const instanceId = useId();
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      const response = await fetch("/api/notifications/summary", { cache: "no-store" });
      if (response.ok) setSummary((await response.json()) as NotificationSummary);
    } catch {
      // Mantém o último resumo; a próxima tentativa acontece no próximo evento.
    } finally {
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    let channel: ReturnType<typeof supabase.channel> | null = null;

    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      void refresh();
      const userId = data.user?.id;
      if (!userId) return;
      channel = supabase
        .channel(`notifications:${userId}:${instanceId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "notifications", filter: `recipient_user_id=eq.${userId}` },
          () => void refresh(),
        )
        .subscribe();
    });

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, FALLBACK_POLL_MS);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.clearInterval(timer);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [instanceId, refresh]);

  useTabBadge(instanceId, summary?.unread ?? 0);

  return { summary, refresh };
}

/* ------------------------------------------------------------------ */
/* Aviso na aba: "(3) NabuLab — …" e um ponto vermelho no ícone.        */
/* ------------------------------------------------------------------ */

const COUNT_PREFIX = /^\(\d+\+?\)\s/;
let originalIcons: Array<{ link: HTMLLinkElement; href: string }> | null = null;
let badgeImage: Promise<HTMLImageElement | null> | null = null;

function loadBaseIcon(href: string) {
  badgeImage ??= new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = href;
  });
  return badgeImage;
}

async function setFaviconBadge(unread: number) {
  const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'));
  if (!links.length) return;
  originalIcons ??= links.map((link) => ({ link, href: link.href }));

  if (unread <= 0) {
    originalIcons.forEach(({ link, href }) => { link.href = href; });
    return;
  }

  const base = await loadBaseIcon(originalIcons.find(({ href }) => href.includes(".png"))?.href ?? originalIcons[0].href);
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return;
  if (base) context.drawImage(base, 0, 0, size, size);
  context.beginPath();
  context.arc(size - 16, 16, 15, 0, Math.PI * 2);
  context.fillStyle = "#DC2626";
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = "#FFFFFF";
  context.stroke();
  const badged = canvas.toDataURL("image/png");
  originalIcons.forEach(({ link }) => { link.href = badged; });
}

/*
 * A página pode ter mais de um sino (ex.: barra do desktop + menu do celular).
 * Por isso o aviso na aba é único: cada sino informa seu total e a aba mostra
 * o maior. Um único observador reaplica o contador quando o Next troca o
 * título — e como todos miram o mesmo valor, não há disputa (antes, dois
 * observadores com totais diferentes reescreviam o título em laço infinito
 * e travavam o navegador).
 */
const badgeCounts = new Map<string, number>();
let titleObserver: MutationObserver | null = null;
let faviconCount = 0;

function desiredUnread() {
  let max = 0;
  badgeCounts.forEach((value) => { if (value > max) max = value; });
  return max;
}

function applyTitle() {
  const unread = desiredUnread();
  const clean = document.title.replace(COUNT_PREFIX, "");
  const next = unread > 0 ? `(${unread > 99 ? "99+" : unread}) ${clean}` : clean;
  if (document.title !== next) document.title = next;
}

function syncTabBadge() {
  applyTitle();

  const unread = desiredUnread();
  if (unread !== faviconCount) {
    faviconCount = unread;
    void setFaviconBadge(unread);
  }

  if (badgeCounts.size > 0 && !titleObserver) {
    titleObserver = new MutationObserver(applyTitle);
    titleObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
  } else if (badgeCounts.size === 0 && titleObserver) {
    titleObserver.disconnect();
    titleObserver = null;
  }
}

function useTabBadge(id: string, unread: number) {
  useEffect(() => {
    badgeCounts.set(id, unread);
    syncTabBadge();
    return () => {
      badgeCounts.delete(id);
      syncTabBadge();
    };
  }, [id, unread]);
}
