/** Endereço público de uma imagem de questão do professor (bucket question-images). */
export function questionImageUrl(path: string | null | undefined) {
  if (!path || !/^[0-9a-f-]{36}\/[A-Za-z0-9._-]{1,120}$/.test(path)) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base.replace(/\/$/, "")}/storage/v1/object/public/question-images/${path}` : null;
}
