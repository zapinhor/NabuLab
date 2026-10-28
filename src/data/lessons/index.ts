import type { Lesson } from "@/types/lesson";

import { portuguesPontuacaoLesson } from "@/data/lessons/portugues-pontuacao";
import { inglesGramaticaLesson } from "@/data/lessons/ingles-gramatica";
import { quimicaTermoquimicaLesson } from "@/data/lessons/quimica-termoquimica";
import { matematicaGeometriaLesson } from "@/data/lessons/matematica-geometria";
import { informaticaRedesLesson } from "@/data/lessons/informatica-redes";
import { matematicaAlgebraLesson } from "@/data/lessons/matematica-algebra";
import { fisicaOndasLesson } from "@/data/lessons/fisica-ondas";
import { informaticaSegurancaLesson } from "@/data/lessons/informatica-seguranca";

/*
 * Ordem = assuntos com mais respostas registradas no NabuLab (exam_answers,
 * outubro de 2026). A lista abre a área de estudos em "Mais estudados".
 */
export const lessons: Lesson[] = [
  portuguesPontuacaoLesson,
  inglesGramaticaLesson,
  quimicaTermoquimicaLesson,
  matematicaGeometriaLesson,
  informaticaRedesLesson,
  matematicaAlgebraLesson,
  fisicaOndasLesson,
  informaticaSegurancaLesson,
];
