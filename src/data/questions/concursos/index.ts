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
import { direitoPrevidenciarioQuestions } from "@/data/questions/concursos/direito-previdenciario-bank";
import { lei8112Questions } from "@/data/questions/concursos/lei-8112-bank";
import { legislacaoBancariaQuestions } from "@/data/questions/concursos/legislacao-bancaria-bank";
import { direitoPenalPolicialQuestions } from "@/data/questions/concursos/direito-penal-policial-bank";
import { processoPenalPolicialQuestions } from "@/data/questions/concursos/processo-penal-policial-bank";
import { legislacaoPenalEspecialQuestions } from "@/data/questions/concursos/legislacao-penal-especial-bank";
import { direitosHumanosPolicialQuestions } from "@/data/questions/concursos/direitos-humanos-policial-bank";
import { criminologiaQuestions } from "@/data/questions/concursos/criminologia-bank";

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
  ...direitoPrevidenciarioQuestions,
  ...lei8112Questions,
  ...legislacaoBancariaQuestions,
  ...direitoPenalPolicialQuestions,
  ...processoPenalPolicialQuestions,
  ...legislacaoPenalEspecialQuestions,
  ...direitosHumanosPolicialQuestions,
  ...criminologiaQuestions,
];
