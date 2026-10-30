"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import StudentAvatar from "@/components/student/student-avatar";
import { createClient } from "@/lib/supabase/client";

const MAX_INPUT_BYTES = 8 * 1024 * 1024;
const SIZE = 400;

/** Recorta a imagem no centro, em quadrado de 400 px, e converte para WebP. */
async function toSquareWebp(file: File) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas");
  context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, SIZE, SIZE);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
  if (!blob) throw new Error("blob");
  return blob;
}

export function AvatarUploader({ userId, name, avatarUrl }: { userId: string; name: string; avatarUrl: string | null }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [status, setStatus] = useState<{ kind: "idle" | "busy" | "error" | "ok"; text?: string }>({ kind: "idle" });

  async function removeOld(supabase: ReturnType<typeof createClient>, keep?: string) {
    const { data } = await supabase.storage.from("avatars").list(userId);
    const old = (data ?? []).map((item) => `${userId}/${item.name}`).filter((path) => path !== keep);
    if (old.length) await supabase.storage.from("avatars").remove(old);
  }

  async function upload(file: File) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setStatus({ kind: "error", text: "Envie uma imagem JPG, PNG ou WebP." });
    if (file.size > MAX_INPUT_BYTES) return setStatus({ kind: "error", text: "A imagem pode ter no máximo 8 MB." });
    setStatus({ kind: "busy", text: "Enviando foto…" });
    try {
      const blob = await toSquareWebp(file);
      const supabase = createClient();
      const path = `${userId}/avatar-${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, blob, { contentType: "image/webp", cacheControl: "31536000", upsert: false });
      if (uploadError) throw uploadError;
      const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
      const { error: profileError } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", userId);
      if (profileError) throw profileError;
      await removeOld(supabase, path);
      setPreview(url);
      setStatus({ kind: "ok", text: "Foto atualizada." });
      router.refresh();
    } catch {
      setStatus({ kind: "error", text: "Não foi possível enviar a foto. Tente outra imagem." });
    }
  }

  async function remove() {
    setStatus({ kind: "busy", text: "Removendo foto…" });
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
    if (error) return setStatus({ kind: "error", text: "Não foi possível remover a foto agora." });
    await removeOld(supabase);
    setPreview(null);
    setStatus({ kind: "ok", text: "Foto removida." });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <StudentAvatar name={name} avatarUrl={preview} size="lg" />
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => input.current?.click()} disabled={status.kind === "busy"} className="min-h-11 rounded-xl bg-[#0B2D6B] px-4 py-2 text-sm font-black text-white disabled:opacity-60">
            {preview ? "Trocar foto" : "Adicionar foto"}
          </button>
          {preview && (
            <button type="button" onClick={remove} disabled={status.kind === "busy"} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-60">
              Remover
            </button>
          )}
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">JPG, PNG ou WebP. A foto é cortada em quadrado e aparece para seus professores e colegas de turma.</p>
        {status.text && <p role="status" className={`mt-1 text-sm font-bold ${status.kind === "error" ? "text-red-700" : "text-emerald-700"}`}>{status.text}</p>}
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Escolher foto de perfil" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void upload(file); }} />
      </div>
    </div>
  );
}
