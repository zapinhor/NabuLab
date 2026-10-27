import type { Question } from "@/types/question";

import { oabEticaQuestions } from "@/data/questions/oab/oab-etica-bank";
import { oabConstitucionalQuestions } from "@/data/questions/oab/oab-constitucional-bank";
import { oabCivilQuestions } from "@/data/questions/oab/oab-civil-bank";
import { oabProcessoCivilQuestions } from "@/data/questions/oab/oab-processo-civil-bank";

export const oabQuestions: Question[] = [
  ...oabEticaQuestions,
  ...oabConstitucionalQuestions,
  ...oabCivilQuestions,
  ...oabProcessoCivilQuestions,
];
