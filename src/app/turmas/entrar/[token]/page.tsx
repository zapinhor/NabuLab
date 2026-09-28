import Link from "next/link";
import { joinClassByToken } from "@/app/turmas/actions";
import { createClient } from "@/lib/supabase/server";

type ClassPreview = { public_name: string; teacher_name: string; school_name: string | null; subject: string | null; description: string | null };

export default async function JoinClassPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ mensagem?: string }> }) {
  const { token } = await params;
  const { mensagem } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: previewData } = await supabase.rpc("preview_teacher_class_by_token", { p_token: token });
  const preview = (previewData?.[0] ?? null) as ClassPreview | null;
  return <main className="grid min-h-screen place-items-center bg-[#F5F7FB] px-4"><section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><Link href="/" className="font-black text-[#0B2D6B]">NabuLab</Link><p className="mt-8 text-sm font-black uppercase tracking-[.16em] text-blue-700">Convite de turma</p>{preview ? <><h1 className="mt-3 text-3xl font-black">{preview.public_name}</h1><p className="mt-3 font-bold text-blue-800">Prof. {preview.teacher_name}</p><p className="mt-1 text-sm text-slate-500">{[preview.subject, preview.school_name].filter(Boolean).join(" · ")}</p>{preview.description && <p className="mt-4 leading-7 text-slate-600">{preview.description}</p>}<p className="mt-4 text-sm text-slate-600">Sua entrada ficará aguardando aprovação do professor quando necessário.</p></> : <><h1 className="mt-3 text-3xl font-black">Este convite não está disponível.</h1><p className="mt-4 leading-7 text-slate-600">O link pode ter sido desativado ou substituído pelo professor.</p></>}{mensagem && <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{mensagem}</p>}{preview && (data.user ? <form action={joinClassByToken} className="mt-7"><input type="hidden" name="token" value={token}/><button className="w-full rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Solicitar entrada</button></form> : <div className="mt-7 grid gap-3"><Link href={`/login?next=${encodeURIComponent(`/turmas/entrar/${token}`)}`} className="rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Entrar</Link><Link href={`/cadastro?next=${encodeURIComponent(`/turmas/entrar/${token}`)}`} className="rounded-xl border border-slate-300 px-5 py-3 font-bold">Criar conta</Link></div>)}</section></main>;
}
