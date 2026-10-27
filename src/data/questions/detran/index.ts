import type { Question } from "@/types/question";

import { legislacaoTransitoQuestions } from "@/data/questions/detran/legislacao-transito-bank";
import { sinalizacaoTransitoQuestions } from "@/data/questions/detran/sinalizacao-transito-bank";
import { direcaoDefensivaQuestions } from "@/data/questions/detran/direcao-defensiva-bank";
import { primeirosSocorrosQuestions } from "@/data/questions/detran/primeiros-socorros-bank";
import { meioAmbienteCidadaniaQuestions } from "@/data/questions/detran/meio-ambiente-cidadania-bank";

export const detranQuestions: Question[] = [
  ...legislacaoTransitoQuestions,
  ...sinalizacaoTransitoQuestions,
  ...direcaoDefensivaQuestions,
  ...primeirosSocorrosQuestions,
  ...meioAmbienteCidadaniaQuestions,
];
