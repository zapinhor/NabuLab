import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createPublicMetadata } from "@/lib/seo";
import { joinClassByCode, requestClassJoin, respondClassInvite } from "@/app/turmas/actions";

export const metadata: Metadata = createPublicMetadata({
  title: "Turmas NabuLab",
  description: "Encontre a turma do seu professor, entre com um código e realize atividades pelo NabuLab.",
  path: "/turmas",
});

const field = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950";
const button = "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B2D6B] px-5 py-3 text-sm font-bold text-white";

type SearchClass = { id: string; public_name: string; teacher_name: string; school_name: string | null; subject: string | null; description: string | null; student_count: number; student_limit: number };
type Membership = { class_id: string; status: string; teacher_classes: { public_name: string } | null };
type PendingInvite = { id: string; teacher_classes: { public_name: string } | null };

export default async function ClassesPage({ searchParams }: { searchParams: Promise<{ busca?: string; mensagem?: string }> }) {
  const { busca = "", mensagem } = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data: results } = await supabase.rpc("search_teacher_classes", { p_query: busca });
  const [memberships, invites] = auth.user ? await Promise.all([
    supabase.from("teacher_class_members").select("class_id,status,teacher_classes(id,public_name,subject,school_name)").eq("user_id", auth.user.id).in("status", ["active", "pending"]),
    supabase.from("teacher_class_invites").select("id,class_id,status,expires_at,teacher_classes(public_name)").eq("status", "pending"),
  ]) : [{ data: [] }, { data: [] }];
  const membershipRows = (memberships.data ?? []) as unknown as Membership[];
  const inviteRows = (invites.data ?? []) as unknown as PendingInvite[];
  const searchRows = (results ?? []) as SearchClass[];

  return <main className="min-h-screen bg-[#F5F7FB] px-4 py-8 text-slate-950 sm:px-6">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xl font-black text-[#0B2D6B]">NabuLab</Link><div className="flex gap-2"><Link href={auth.user ? "/dashboard" : "/login?next=%2Fturmas"} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold">{auth.user ? "Voltar ao painel" : "Entrar"}</Link><Link href="/professor" className={button}>Para professores</Link></div></header>
      <section className="py-12 text-center"><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Turmas</p><h1 className="mt-3 text-4xl font-black">Estude com seu professor no NabuLab.</h1><p className="mx-auto mt-4 max-w-2xl text-slate-600">Encontre uma turma pública, use o código fornecido pelo professor ou acompanhe seus convites.</p></section>
      {mensagem && <p role="status" className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-950">{mensagem}</p>}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-2xl font-black">Encontrar turma</h2><form className="mt-4 flex gap-2"><label className="sr-only" htmlFor="busca">Nome, professor, escola ou matéria</label><input id="busca" name="busca" defaultValue={busca} className={field} placeholder="Ex.: Prof. Lívia ou Matemática"/><button className={button}>Pesquisar</button></form></section>
        <section id="codigo" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-2xl font-black">Entrar com código</h2><form action={joinClassByCode} className="mt-4 flex gap-2"><input type="hidden" name="return_to" value="/turmas"/><label className="sr-only" htmlFor="code">Código da turma</label><input id="code" name="code" required className={`${field} uppercase`} placeholder="LIVIA-9A-X7K2"/><button className={button}>Continuar</button></form></section>
      </div>
      {auth.user && <section className="mt-8"><h2 className="text-2xl font-black">Minhas turmas</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{membershipRows.map((item) => <Link key={item.class_id} href={`/turmas/${item.class_id}`} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-black">{item.teacher_classes?.public_name ?? "Turma"}</h3><p className="mt-1 text-sm text-slate-500">{item.status === "active" ? "Participando" : "Aguardando aprovação"}</p></Link>)}{membershipRows.length === 0 && <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">Você ainda não participa de nenhuma turma. Encontre uma turma ou entre usando o código fornecido pelo seu professor.</p>}</div></section>}
      {auth.user && inviteRows.length > 0 && <section className="mt-8"><h2 className="text-2xl font-black">Convites pendentes</h2><div className="mt-4 space-y-3">{inviteRows.map((invite) => <article key={invite.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div><h3 className="font-black">{invite.teacher_classes?.public_name ?? "Turma"}</h3><p className="text-sm text-slate-600">Convite disponível para sua conta.</p></div><form action={respondClassInvite} className="flex gap-2"><input type="hidden" name="invite_id" value={invite.id}/><button name="decision" value="accept" className={button}>Aceitar</button><button name="decision" value="reject" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold">Recusar</button></form></article>)}</div></section>}
      <section className="mt-8"><h2 className="text-2xl font-black">Resultados da busca</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{searchRows.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-black">{item.public_name}</h3><p className="mt-1 text-sm font-semibold text-blue-800">Prof. {item.teacher_name}</p><p className="mt-1 text-sm text-slate-500">{[item.subject,item.school_name].filter(Boolean).join(" · ")}</p>{item.description && <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>}<p className="mt-3 text-xs text-slate-500">{item.student_count} de {item.student_limit} alunos</p><form action={requestClassJoin} className="mt-4"><input type="hidden" name="class_id" value={item.id}/><input type="hidden" name="query" value={busca}/><button className={button}>Solicitar entrada</button></form></article>)}{busca && searchRows.length === 0 && <p className="text-slate-600">Nenhuma turma pública encontrada.</p>}</div></section>
    </div>
  </main>;
}
