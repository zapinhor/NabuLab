import type { Question } from "@/types/question";

import { oabEticaQuestions } from "@/data/questions/oab/oab-etica-bank";
import { oabConstitucionalQuestions } from "@/data/questions/oab/oab-constitucional-bank";
import { oabCivilQuestions } from "@/data/questions/oab/oab-civil-bank";
import { oabProcessoCivilQuestions } from "@/data/questions/oab/oab-processo-civil-bank";
import { oabPenalQuestions } from "@/data/questions/oab/oab-penal-bank";
import { oabProcessoPenalQuestions } from "@/data/questions/oab/oab-processo-penal-bank";
import { oabAdministrativoQuestions } from "@/data/questions/oab/oab-administrativo-bank";
import { oabTrabalhoQuestions } from "@/data/questions/oab/oab-trabalho-bank";
import { oabProcessoTrabalhoQuestions } from "@/data/questions/oab/oab-processo-trabalho-bank";
import { oabTributarioQuestions } from "@/data/questions/oab/oab-tributario-bank";
import { oabEmpresarialQuestions } from "@/data/questions/oab/oab-empresarial-bank";
import { oabConsumidorQuestions } from "@/data/questions/oab/oab-consumidor-bank";
import { oabDireitosHumanosQuestions } from "@/data/questions/oab/oab-direitos-humanos-bank";
import { oabEcaQuestions } from "@/data/questions/oab/oab-eca-bank";
import { oabAmbientalQuestions } from "@/data/questions/oab/oab-ambiental-bank";
import { oabInternacionalQuestions } from "@/data/questions/oab/oab-internacional-bank";
import { oabFilosofiaQuestions } from "@/data/questions/oab/oab-filosofia-bank";

export const oabQuestions: Question[] = [
  ...oabEticaQuestions,
  ...oabConstitucionalQuestions,
  ...oabCivilQuestions,
  ...oabProcessoCivilQuestions,
  ...oabPenalQuestions,
  ...oabProcessoPenalQuestions,
  ...oabAdministrativoQuestions,
  ...oabTrabalhoQuestions,
  ...oabProcessoTrabalhoQuestions,
  ...oabTributarioQuestions,
  ...oabEmpresarialQuestions,
  ...oabConsumidorQuestions,
  ...oabDireitosHumanosQuestions,
  ...oabEcaQuestions,
  ...oabAmbientalQuestions,
  ...oabInternacionalQuestions,
  ...oabFilosofiaQuestions,
];
