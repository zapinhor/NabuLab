"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Icon } from "@/components/ui/icon";
import { subjects } from "@/data/subjects";
import { generateManualExam } from "@/lib/exam-generation-client";
import {
  clearExamSubmission,
  createInitialExamProgress,
  saveExamProgress,
  saveExamSession,
} from "@/lib/exam-session";
import type { ExamConfig } from "@/types/exam";

/** Mesma chave do teste sem conta (components/guest-quiz). */
const GUEST_RESULT_KEY = "nabulab_guest_quiz";
const FIRST_EXAM_SIZE = 5;

const TRACK_AREAS: Record<string, { label: string; area: string | null }> = {
  misturado: { label: "várias matérias", area: null },
  matematica: { label: "Matemática", area: "Matemática" },
  linguagens: { label: "Linguagens", area: "Linguagens" },
  natureza: { label: "Ciências da Natureza", area: "Ciências da Natureza" },
  humanas: { label: "Ciências Humanas", area: "Ciências Humanas" },
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
 * pela tela de configuração. Se a pessoa fez o teste sem conta, usa a mesma área.
 */
export function FirstExamQuickStart() {
  const router = useRouter();
  const guestTrack = useSyncExternalStore(() => () => {}, readGuestTrack, () => null);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const track = guestTrack ? TRACK_AREAS[guestTrack] : TRACK_AREAS.misturado;
  const areaSubjects = track.area ? subjects.filter((subject) => subject.area === track.area) : subjects;

  async function start() {
    if (starting) return;
    setStarting(true);
    setError(null);
    void trackEvent("first_exam_quickstart_clicked", { track: guestTrack ?? "misturado" });
    const config: ExamConfig = {
      amount: FIRST_EXAM_SIZE,
      subjects: areaSubjects.map((subject) => subject.id),
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
        Nível iniciante, {track.label}{guestTrack ? " (a área do seu teste)" : ""}. Leva uns 5 minutos.
      </p>
      {error && <p role="alert" className="mt-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-amber-200">{error}</p>}
    </div>
  );
}
