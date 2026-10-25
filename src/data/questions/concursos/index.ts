import type { Question } from "@/types/question";

import { conhecimentosBancariosQuestions } from "@/data/questions/concursos/conhecimentos-bancarios-bank";
import { matematicaFinanceiraQuestions } from "@/data/questions/concursos/matematica-financeira-bank";
import { vendasNegociacaoQuestions } from "@/data/questions/concursos/vendas-negociacao-bank";
import { direitoConstitucionalQuestions } from "@/data/questions/concursos/direito-constitucional-bank";
import { direitoAdministrativoQuestions } from "@/data/questions/concursos/direito-administrativo-bank";
import { eticaServicoPublicoQuestions } from "@/data/questions/concursos/etica-servico-publico-bank";
import { conhecimentosGeraisCorreiosQuestions } from "@/data/questions/concursos/conhecimentos-gerais-correios-bank";
import { codigoCondutaCorreiosQuestions } from "@/data/questions/concursos/codigo-conduta-correios-bank";
import { smsPetrobrasQuestions } from "@/data/questions/concursos/sms-petrobras-bank";
import { leiDasEstataisQuestions } from "@/data/questions/concursos/lei-das-estatais-bank";

export const concursoQuestions: Question[] = [
  ...conhecimentosBancariosQuestions,
  ...matematicaFinanceiraQuestions,
  ...vendasNegociacaoQuestions,
  ...direitoConstitucionalQuestions,
  ...direitoAdministrativoQuestions,
  ...eticaServicoPublicoQuestions,
  ...conhecimentosGeraisCorreiosQuestions,
  ...codigoCondutaCorreiosQuestions,
  ...smsPetrobrasQuestions,
  ...leiDasEstataisQuestions,
];
