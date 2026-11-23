import "server-only";

import { subjects } from "@/data/subjects";
import { concursoSubjects, detranSubjects, oabSubjects, vestibularSubjects } from "@/lib/study-focus";
import type { IconName } from "@/components/ui/icon";
import { contentCatalog, getTopicSamples } from "@/lib/content/catalog";
import type { Question, SubjectId } from "@/types/question";

/** Quantas questões o visitante responde antes de criar a conta. */
export const GUEST_QUIZ_SIZE = 3;

export type GuestTrackId = "misturado" | "matematica" | "linguagens" | "natureza" | "humanas" | "concursos" | "oab" | "detran";

export type GuestTrack = {
  id: GuestTrackId;
  label: string;
  hint: string;
  icon: IconName;
  subjects: SubjectId[];
};

const byArea = (area: string) => subjects.filter((subject) => subject.area === area).map((subject) => subject.id);

const ALL_GUEST_TRACKS: GuestTrack[] = [
  { id: "misturado", label: "Um pouco de tudo", hint: "Estilo ENEM, várias matérias", icon: "misto", subjects: vestibularSubjects.map((subject) => subject.id) },
  { id: "matematica", label: "Matemática", hint: "Matemática e raciocínio lógico", icon: "matematica", subjects: byArea("Matemática") },
  { id: "linguagens", label: "Linguagens", hint: "Português, literatura e idiomas", icon: "portugues", subjects: byArea("Linguagens") },
  { id: "natureza", label: "Ciências da Natureza", hint: "Física, química e biologia", icon: "biologia", subjects: byArea("Ciências da Natureza") },
  { id: "humanas", label: "Ciências Humanas", hint: "História, geografia, filosofia e sociologia", icon: "historia", subjects: byArea("Ciências Humanas") },
  { id: "concursos", label: "Concursos", hint: "Bancários, públicos, Correios e Petrobras", icon: "gestao-institucional", subjects: concursoSubjects.map((subject) => subject.id) },
  { id: "oab", label: "OAB", hint: "1ª fase do Exame de Ordem", icon: "auditoria", subjects: oabSubjects.map((subject) => subject.id) },
  { id: "detran", label: "CNH (DETRAN)", hint: "Prova teórica: leis, placas, direção defensiva e socorros", icon: "atencao", subjects: detranSubjects.map((subject) => subject.id) },
];

/** Só as áreas que já têm questões no banco. */
export const GUEST_TRACKS = ALL_GUEST_TRACKS.filter((track) => track.subjects.length > 0);

export function findGuestTrack(id: string | undefined) {
  return GUEST_TRACKS.find((track) => track.id === id) ?? null;
}

/** O que o navegador do visitante recebe: só o necessário para responder e corrigir. */
export type GuestQuestion = Pick<Question, "id" | "subject" | "subjectName" | "topic" | "difficulty" | "type" | "statement" | "alternatives" | "correctAnswer" | "explanation"> & {
  topicHref: string | null;
};

/**
 * Banco do teste sem conta: somente as questões que já são públicas nas
 * páginas de assunto (/questoes/...), então nada novo do banco fica exposto.
 */
const publicPool: GuestQuestion[] = contentCatalog.flatMap((subject) =>
  subject.topics.flatMap((topic) =>
    getTopicSamples(subject.id, topic.name).map((question) => ({
      id: question.id,
      subject: question.subject,
      subjectName: question.subjectName,
      topic: question.topic,
      difficulty: question.difficulty,
      type: question.type,
      statement: question.statement,
      alternatives: question.alternatives,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      topicHref: subject.indexable && topic.indexable ? `/questoes/${subject.slug}/${topic.slug}` : null,
    })),
  ),
);

/** Gerador determinístico (mulberry32): a mesma semente sempre sorteia as mesmas questões. */
function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Sorteia as questões do teste: começa por uma de nível iniciante (primeiro
 * acerto rápido) e evita repetir matéria enquanto houver opção.
 */
export function pickGuestQuestions(track: GuestTrack, seed: number, size = GUEST_QUIZ_SIZE) {
  const pool = shuffle(publicPool.filter((question) => track.subjects.includes(question.subject)), seededRandom(seed));
  const picks: GuestQuestion[] = [];
  const usedSubjects = new Set<SubjectId>();
  const take = (question: GuestQuestion | undefined) => {
    if (!question || picks.includes(question)) return;
    picks.push(question);
    usedSubjects.add(question.subject);
  };

  take(pool.find((question) => question.difficulty === "iniciante"));
  while (picks.length < size) {
    const next = pool.find((question) => !picks.includes(question) && !usedSubjects.has(question.subject))
      ?? pool.find((question) => !picks.includes(question));
    if (!next) break;
    take(next);
  }
  return picks;
}

export const guestPoolSize = publicPool.length;

const questionLength = (question: GuestQuestion) => question.statement.length + question.alternatives.reduce((sum, alternative) => sum + alternative.text.length, 0);

/**
 * Sorteio fixo das landings de anúncio: entre as primeiras sementes, a que abre
 * com uma questão de tamanho médio (cabe na primeira tela do celular). A mesma semente
 * vai para /experimente/iniciar, então a questão respondida na landing é a 1 de 3.
 */
export function landingGuestQuiz(trackId: GuestTrackId, candidates = 300) {
  const track = findGuestTrack(trackId);
  if (!track) return null;
  let best: { seed: number; questions: GuestQuestion[]; size: number } | null = null;
  for (let seed = 1; seed <= candidates; seed += 1) {
    const questions = pickGuestQuestions(track, seed);
    const first = questions[0];
    if (!first || questions.length < GUEST_QUIZ_SIZE) continue;
    // Curta o bastante para caber na tela do celular, mas não uma conta trivial.
    const size = Math.abs(questionLength(first) - 260) + (first.statement.length < 70 ? 1000 : 0);
    if (!best || size < best.size) best = { seed, questions, size };
  }
  return best ? { track, seed: best.seed, question: best.questions[0] } : null;
}

/** Semente informada pela landing (?seed=); só vale se for um inteiro de 32 bits. */
export function parseGuestSeed(value: string | null | undefined) {
  if (!value || !/^\d{1,10}$/.test(value)) return null;
  const seed = Number(value);
  return seed <= 0xffffffff ? seed : null;
}

/** Questões já públicas nas páginas de assunto (seguras para enviar ao navegador). */
export function getPublicQuestionPool(): readonly GuestQuestion[] {
  return publicPool;
}

/*
 * Limite do teste: cada navegador faz UM teste de 3 questões. Ao escolher a
 * área, o servidor grava a área e a semente do sorteio neste cookie; depois
 * disso a página sempre mostra as mesmas 3 questões (ou o resultado), mesmo
 * que a pessoa recarregue ou tente outra área.
 */
export const GUEST_QUIZ_COOKIE = "nabulab_guest_quiz";
export const GUEST_QUIZ_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type GuestQuizLock = { track: GuestTrack; seed: number };

export { encodeGuestLock } from "@/lib/content/guest-lock";

export function parseGuestLock(value: string | undefined): GuestQuizLock | null {
  const match = value?.match(/^([a-z]+)\.(\d{1,10})$/);
  const track = findGuestTrack(match?.[1]);
  if (!match || !track) return null;
  return { track, seed: Number(match[2]) >>> 0 };
}
