import { lessonLinks, type LessonLink } from "@/data/lessons/links.generated";

export type { LessonLink };

const LESSON_READ_KEY = "nabulab_lesson_read";

/** A aula de um assunto, se existir (índice leve, seguro para o navegador). */
export function findLessonLink(subject: string, topic: string): LessonLink | null {
  return lessonLinks.find((link) => link.subject === subject && link.topic === topic) ?? null;
}

/**
 * Aula sugerida para hoje: a do assunto com erro mais prioritário que tenha
 * aula; sem isso, a primeira aula da lista.
 */
export function suggestLesson(topicsByPriority: { subject: string; topic: string }[]): { link: LessonLink; fromErrors: boolean } | null {
  for (const item of topicsByPriority) {
    const link = findLessonLink(item.subject, item.topic);
    if (link) return { link, fromErrors: true };
  }
  return lessonLinks[0] ? { link: lessonLinks[0], fromErrors: false } : null;
}

/** Registra neste aparelho que uma aula foi aberta hoje (conta para a meta do dia). */
export function markLessonRead(dateKey: string, href: string) {
  try {
    localStorage.setItem(LESSON_READ_KEY, JSON.stringify({ dateKey, href }));
  } catch {
    /* navegação privada */
  }
}

export function readLessonReadToday(dateKey: string): string | null {
  try {
    const raw = localStorage.getItem(LESSON_READ_KEY);
    const value = raw ? (JSON.parse(raw) as { dateKey: string; href: string }) : null;
    return value && value.dateKey === dateKey ? value.href : null;
  } catch {
    return null;
  }
}
