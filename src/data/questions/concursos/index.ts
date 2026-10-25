import type { Question } from "@/types/question";

import { conhecimentosBancariosQuestions } from "@/data/questions/concursos/conhecimentos-bancarios-bank";
import { matematicaFinanceiraQuestions } from "@/data/questions/concursos/matematica-financeira-bank";
import { vendasNegociacaoQuestions } from "@/data/questions/concursos/vendas-negociacao-bank";

export const concursoQuestions: Question[] = [
  ...conhecimentosBancariosQuestions,
  ...matematicaFinanceiraQuestions,
  ...vendasNegociacaoQuestions,
];
