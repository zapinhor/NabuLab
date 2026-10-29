import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentShell } from "@/components/content/content-shell";
import { lessonCatalog } from "@/lib/content/lessons";
import { CATEGORY_LABELS } from "@/lib/study-focus";
import { createPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = createPublicMetadata({
  title: "Estudar: resumos, exemplos resolvidos e prática",
  description: "Aulas curtas para vestibular, concursos, OAB e CNH, com resumo, exemplos resolvidos, erros comuns e questões para praticar em seguida.",
  path: "/estudar",
});

const LESSON_GROUPS = [
  { id: "vestibular", label: CATEGORY_LABELS.vestibular, hint: "ENEM e vestibulares, começando pelos assuntos com mais questões respondidas no NabuLab." },
  { id: "concursos", label: CATEGORY_LABELS.concursos, hint: "Os assuntos que mais aparecem nas provas de concursos públicos." },
  { id: "oab", label: CATEGORY_LABELS.oab, hint: "Temas frequentes da 1ª fase do Exame de Ordem." },
  { id: "detran", label: CATEGORY_LABELS.detran, hint: "Prova teórica da CNH: legislação, sinalização e direção defensiva." },
];

export default function StudyHubPage() {
  return <ContentShell><div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
    <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Estudar" }]} />
    <header className="mt-7">
      <p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Área de estudos</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Estude o assunto e pratique em seguida</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Cada aula traz o essencial do assunto, exemplos resolvidos passo a passo, os erros mais comuns e questões do banco para você testar o que aprendeu.</p>
    </header>
    {LESSON_GROUPS.map((group) => {
      const entries = lessonCatalog.filter((entry) => entry.category === group.label);
      if (entries.length === 0) return null;
      return <section key={group.id} className="mt-10" aria-labelledby={`aulas-${group.id}`}>
        <h2 id={`aulas-${group.id}`} className="text-2xl font-black">{group.label}</h2>
        <p className="mt-2 text-sm text-slate-600">{group.hint}</p>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">{entries.map((entry) => <li key={entry.href}>
          <Link href={entry.href} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
            <span className="text-xs font-black uppercase tracking-[.14em] text-blue-700">{entry.subjectName}</span>
            <span className="mt-2 text-lg font-black text-slate-950">{entry.lesson.title}</span>
            <span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{entry.lesson.intro}</span>
            <span className="mt-4 text-sm font-bold text-[#0B2D6B]">{entry.lesson.readingMinutes} min de leitura · {entry.questionCount} questões para praticar</span>
          </Link>
        </li>)}</ol>
      </section>;
    })}
    <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-7">
      <h2 className="text-2xl font-black">Prefere começar praticando?</h2>
      <p className="mt-3 leading-7 text-slate-700">Monte um simulado e use a correção comentada para descobrir o que estudar primeiro.</p>
      <Link href="/questoes" className="mt-5 inline-block rounded-xl bg-[#0B2D6B] px-5 py-3 font-bold text-white">Ver questões por matéria</Link>
    </section>
  </div></ContentShell>;
}
