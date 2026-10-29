import type { Lesson } from "@/types/lesson";

import { portuguesPontuacaoLesson } from "@/data/lessons/portugues-pontuacao";
import { inglesGramaticaLesson } from "@/data/lessons/ingles-gramatica";
import { quimicaTermoquimicaLesson } from "@/data/lessons/quimica-termoquimica";
import { matematicaGeometriaLesson } from "@/data/lessons/matematica-geometria";
import { informaticaRedesLesson } from "@/data/lessons/informatica-redes";
import { matematicaAlgebraLesson } from "@/data/lessons/matematica-algebra";
import { fisicaOndasLesson } from "@/data/lessons/fisica-ondas";
import { informaticaSegurancaLesson } from "@/data/lessons/informatica-seguranca";
import { inglesInterpretacaoLesson } from "@/data/lessons/ingles-interpretacao";
import { educacaoFisicaJogosLesson } from "@/data/lessons/educacao-fisica-jogos";
import { matematicaFinanceiraLesson } from "@/data/lessons/matematica-financeira";
import { historiaBrasilImperioLesson } from "@/data/lessons/historia-brasil-imperio";
import { detranNormasCirculacaoLesson } from "@/data/lessons/detran-normas-circulacao";
import { detranInfracoesPenalidadesLesson } from "@/data/lessons/detran-infracoes-penalidades";
import { detranMarcasViariasLesson } from "@/data/lessons/detran-marcas-viarias";
import { detranCondicoesAdversasLesson } from "@/data/lessons/detran-condicoes-adversas";
import { oabSancoesDisciplinaresLesson } from "@/data/lessons/oab-sancoes-disciplinares";
import { oabControleConstitucionalidadeLesson } from "@/data/lessons/oab-controle-constitucionalidade";
import { lei8112ProvimentoLesson } from "@/data/lessons/lei-8112-provimento";
import { constitucionalDireitosGarantiasLesson } from "@/data/lessons/constitucional-direitos-garantias";

/*
 * Vestibular: ordem = assuntos com mais respostas registradas no NabuLab
 * (exam_answers, outubro de 2026). DETRAN, OAB e concursos ainda não têm
 * respostas suficientes; ali a escolha seguiu o peso dos assuntos nas provas
 * e a quantidade de questões no banco.
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
  inglesInterpretacaoLesson,
  educacaoFisicaJogosLesson,
  matematicaFinanceiraLesson,
  historiaBrasilImperioLesson,
  detranNormasCirculacaoLesson,
  detranInfracoesPenalidadesLesson,
  detranMarcasViariasLesson,
  detranCondicoesAdversasLesson,
  oabSancoesDisciplinaresLesson,
  oabControleConstitucionalidadeLesson,
  lei8112ProvimentoLesson,
  constitucionalDireitosGarantiasLesson,
];
