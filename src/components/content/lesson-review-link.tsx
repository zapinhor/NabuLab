"use client";

import Link from "next/link";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import { findLessonLink } from "@/lib/lesson-links";

/**
 * "Revise este assunto": aparece junto de uma questão errada quando o assunto
 * tem aula. Leva à aula curta, para revisar a regra antes de tentar de novo.
 */
export function LessonReviewLink({ subject, topic, placement, className = "" }: { subject: string; topic: string; placement: string; className?: string }) {
  const link = findLessonLink(subject, topic);
  if (!link) return null;
  return (
    <Link
      href={link.href}
      onClick={() => void trackEvent("lesson_review_clicked", { placement, subject, topic })}
      className={`flex min-h-12 items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-[#0B2D6B] transition hover:border-blue-300 hover:bg-blue-100 ${className}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#3B82F6]" aria-hidden="true">
        <Icon name="materias" size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">Revise {topic} em {link.readingMinutes} min</span>
        <span className="block text-xs text-slate-600">Aula curta com a regra, exemplos resolvidos e erros comuns</span>
      </span>
      <Icon name="avancar" size={18} className="shrink-0 text-slate-400" />
    </Link>
  );
}

/** Até 3 aulas dos assuntos que a pessoa mais erra (em ordem de prioridade). */
export function LessonsForMistakes({ items, placement }: { items: { subject: string; topic: string }[]; placement: string }) {
  const seen = new Set<string>();
  const topics: { subject: string; topic: string }[] = [];
  for (const item of items) {
    const key = `${item.subject}/${item.topic}`;
    if (seen.has(key) || !findLessonLink(item.subject, item.topic)) continue;
    seen.add(key);
    topics.push(item);
    if (topics.length === 3) break;
  }
  if (topics.length === 0) return null;
  return (
    <section aria-labelledby="aulas-dos-erros" className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-9 sm:p-6">
      <h2 id="aulas-dos-erros" className="text-lg font-black text-[#0B2D6B]">Revise a regra antes de refazer</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">Estes assuntos estão entre os seus erros e têm aula curta no NabuLab.</p>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {topics.map((item) => (
          <LessonReviewLink key={`${item.subject}/${item.topic}`} subject={item.subject} topic={item.topic} placement={placement} />
        ))}
      </div>
    </section>
  );
}
