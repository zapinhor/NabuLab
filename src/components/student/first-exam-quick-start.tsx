"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import { subjects } from "@/data/subjects";
import { concursoSubjects, vestibularSubjects, type StudyFocus } from "@/lib/study-focus";
import { generateManualExam } from "@/lib/exam-generation-client";
import {
  clearExamSubmission,
  createInitialExamProgress,
  saveExamProgress,
  saveExamSession,
} from "@/lib/exam-session";
import type { ExamConfig } from "@/types/exam";
import type { SubjectId } from "@/types/question";

/** Mesma chave do teste sem conta (components/guest-quiz). */
const GUEST_RESULT_KEY = "nabulab_guest_quiz";
const FIRST_EXAM_SIZE = 5;

type Track = { label: string; subjectIds: SubjectId[] };

const ids = (list: { id: SubjectId }[]) => list.map((subject) => subject.id);
const byArea = (area: string) => ids(subjects.filter((subject) => subject.area === area));

/** Áreas do teste sem conta (mesmos ids de GUEST_TRACKS). */
const TRACK_AREAS: Record<string, Track> = {
  misturado: { label: "várias matérias de vestibular", subjectIds: ids(vestibularSubjects) },
  matematica: { label: "Matemática", subjectIds: byArea("Matemática") },
  linguagens: { label: "Linguagens", subjectIds: byArea("Linguagens") },
  natureza: { label: "Ciências da Natureza", subjectIds: byArea("Ciências da Natureza") },
  humanas: { label: "Ciências Humanas", subjectIds: byArea("Ciências Humanas") },
  concursos: { label: "matérias de concursos", subjectIds: ids(concursoSubjects) },
};

/** Sem teste sem conta, vale o foco escolhido no cadastro. */
const FOCUS_TRACKS: Record<StudyFocus, Track> = {
  vestibular: TRACK_AREAS.misturado,
  concursos: TRACK_AREAS.concursos,
  ambos: { label: "vestibular e concursos", subjectIds: ids(subjects) },
};

function readGuestTrack(): string | null {
  try {
    const raw = localStorage.getItem(GUEST_RESULT_KEY);
    const track = raw ? (JSON.parse(raw) as { track?: unknown }).track : null;
    return typeof track === "string" && track in TRACK_AREAS ? track : null;
  } catch {
    return null;
  }
}

/**
 * Primeiro simulado em um toque: 5 questões de nível iniciante, sem passar
 * pela tela de configuração. Se a pessoa fez o teste sem conta, usa a mesma área;
 * senão, o foco de estudo do cadastro (vestibular, concursos ou os dois).
 */
export function FirstExamQuickStart({ studyFocus = null }: { studyFocus?: StudyFocus | null }) {
  const router = useRouter();
  const guestTrack = useSyncExternalStore(() => () => {}, readGuestTrack, () => null);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const track = guestTrack ? TRACK_AREAS[guestTrack] : FOCUS_TRACKS[studyFocus ?? "vestibular"];

  async function start() {
    if (starting) return;
    setStarting(true);
    setError(null);
    void trackEvent("first_exam_quickstart_clicked", { track: guestTrack ?? "misturado", focus: studyFocus ?? "none" });
    const config: ExamConfig = {
      amount: FIRST_EXAM_SIZE,
      subjects: track.subjectIds,
      difficulty: "iniciante",
      questionType: "misto",
      shuffleQuestions: true,
      shuffleAlternatives: true,
    };
    try {
      const session = await generateManualExam(config);
      clearExamSubmission();
      saveExamSession(session);
      saveExamProgress(createInitialExamProgress(session.id));
      router.push("/simulado/prova");
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Não foi possível começar agora. Tente de novo.");
      setStarting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={starting}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#F4C430] px-6 py-3.5 text-center text-base font-black text-[#0B2D6B] shadow-lg shadow-blue-950/20 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-80 sm:w-auto"
      >
        <Icon name={starting ? "carregando" : "novo-simulado"} size={20} className={starting ? "animate-spin" : undefined} />
        {starting ? "Preparando suas questões…" : `Começar meu primeiro simulado · ${FIRST_EXAM_SIZE} questões`}
      </button>
      <p className="mt-2 text-xs leading-5 text-blue-100">
        Nível iniciante, {track.label}{guestTrack ? " (a área do seu teste)" : studyFocus ? " (seu foco de estudo)" : ""}. Leva uns 5 minutos.
      </p>
      {error && <p role="alert" className="mt-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-amber-200">{error}</p>}
    </div>
  );
}
