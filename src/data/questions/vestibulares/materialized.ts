import { portuguesQuestions } from "@/data/questions/vestibulares/portugues-bank";
import { inglesQuestions } from "@/data/questions/vestibulares/ingles-bank";
import { matematicaQuestions } from "@/data/questions/vestibulares/matematica-bank";
import { informaticaQuestions } from "@/data/questions/vestibulares/informatica-bank";
import { literaturaQuestions } from "@/data/questions/vestibulares/literatura-bank";
import { espanholQuestions } from "@/data/questions/vestibulares/espanhol-bank";
import { arteQuestions } from "@/data/questions/vestibulares/arte-bank";
import { educacaoFisicaQuestions } from "@/data/questions/vestibulares/educacao-fisica-bank";
import { raciocinioLogicoQuestions } from "@/data/questions/vestibulares/raciocinio-logico-bank";
import { fisicaQuestions } from "@/data/questions/vestibulares/fisica-bank";
import { quimicaQuestions } from "@/data/questions/vestibulares/quimica-bank";
import { biologiaQuestions } from "@/data/questions/vestibulares/biologia-bank";
import { cienciasQuestions } from "@/data/questions/vestibulares/ciencias-bank";
import { historiaQuestions } from "@/data/questions/vestibulares/historia-bank";
import { geografiaQuestions } from "@/data/questions/vestibulares/geografia-bank";
import { filosofiaQuestions } from "@/data/questions/vestibulares/filosofia-bank";
import { sociologiaQuestions } from "@/data/questions/vestibulares/sociologia-bank";

import type { Question } from "@/types/question";

export const vestibularQuestions: Question[] = [
  ...portuguesQuestions,
  ...inglesQuestions,
  ...matematicaQuestions,
  ...informaticaQuestions,
  ...literaturaQuestions,
  ...espanholQuestions,
  ...arteQuestions,
  ...educacaoFisicaQuestions,
  ...raciocinioLogicoQuestions,
  ...fisicaQuestions,
  ...quimicaQuestions,
  ...biologiaQuestions,
  ...cienciasQuestions,
  ...historiaQuestions,
  ...geografiaQuestions,
  ...filosofiaQuestions,
  ...sociologiaQuestions,
];
