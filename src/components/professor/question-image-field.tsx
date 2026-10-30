"use client";

/* eslint-disable @next/next/no-img-element -- imagem do Supabase Storage enviada pelo professor */
import { useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { questionImageUrl } from "@/lib/question-images";

const MAX_INPUT_BYTES = 10 * 1024 * 1024;
const MAX_SIDE = 1600;

/** Reduz para no máximo 1600 px no maior lado e converte para WebP. */
async function toWebp(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
  if (!blob) throw new Error("blob");
  return blob;
}

/** Campo "Imagem da questão" do formulário do professor: envia para o Storage e guarda o caminho. */
export function QuestionImageField({ initialPath }: { initialPath: string | null }) {
  const input = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(initialPath ?? "");
  const [status, setStatus] = useState<{ kind: "idle" | "busy" | "error"; text?: string }>({ kind: "idle" });
  const url = questionImageUrl(path);

  async function upload(file: File) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setStatus({ kind: "error", text: "Envie uma imagem JPG, PNG ou WebP." });
    if (file.size > MAX_INPUT_BYTES) return setStatus({ kind: "error", text: "A imagem pode ter no máximo 10 MB." });
    setStatus({ kind: "busy", text: "Enviando imagem…" });
    try {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("auth");
      const blob = await toWebp(file);
      const nextPath = `${auth.user.id}/q-${Date.now()}.webp`;
      const { error } = await supabase.storage.from("question-images").upload(nextPath, blob, { contentType: "image/webp", cacheControl: "31536000", upsert: false });
      if (error) throw error;
      setPath(nextPath);
      setStatus({ kind: "idle" });
    } catch {
      setStatus({ kind: "error", text: "Não foi possível enviar a imagem. Tente outra." });
    }
  }

  return (
    <div className="text-sm font-bold text-slate-800 md:col-span-2">
      Imagem da questão (opcional)
      <input type="hidden" name="image_path" value={path} />
      <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
        {url ? (
          <div className="flex flex-wrap items-start gap-3">
            <img src={url} alt="Imagem da questão" className="max-h-48 max-w-full rounded-lg border border-slate-200 bg-white object-contain" />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => input.current?.click()} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">Trocar imagem</button>
              <button type="button" onClick={() => setPath("")} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-red-700">Remover</button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => input.current?.click()} disabled={status.kind === "busy"} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#0B2D6B] shadow-sm disabled:opacity-60">
            {status.kind === "busy" ? "Enviando…" : "Adicionar imagem"}
          </button>
        )}
        <p className="mt-2 text-xs font-normal leading-5 text-slate-500">Gráfico, mapa, tabela ou figura. JPG, PNG ou WebP. A imagem aparece para os alunos acima das alternativas.</p>
        {status.kind === "error" && <p role="alert" className="mt-1 text-xs font-bold text-red-700">{status.text}</p>}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Escolher imagem da questão" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) void upload(file); }} />
    </div>
  );
}
