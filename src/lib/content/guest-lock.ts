import type { GuestTrackId } from "@/lib/content/guest-quiz";

/** Chave do teste grátis (área + semente), usada no cookie e no progresso salvo no navegador. */
export function encodeGuestLock(trackId: GuestTrackId, seed: number) {
  return `${trackId}.${seed >>> 0}`;
}
