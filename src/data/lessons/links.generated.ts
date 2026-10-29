// Arquivo gerado por scripts/generate-lesson-links.ts. Não edite à mão.
import type { SubjectId } from "@/types/question";

export type LessonLink = { subject: SubjectId; topic: string; title: string; readingMinutes: number; href: `/${string}` };

export const lessonLinks: LessonLink[] = [
  {
    "subject": "portugues",
    "topic": "Pontuação",
    "title": "Pontuação: quando usar e quando evitar a vírgula",
    "readingMinutes": 7,
    "href": "/estudar/portugues/pontuacao"
  },
  {
    "subject": "ingles",
    "topic": "Gramática",
    "title": "Gramática de inglês: os tempos e estruturas mais cobrados",
    "readingMinutes": 9,
    "href": "/estudar/ingles/gramatica"
  },
  {
    "subject": "quimica",
    "topic": "Termoquímica",
    "title": "Termoquímica: entalpia, calor e o sinal do ΔH",
    "readingMinutes": 7,
    "href": "/estudar/quimica/termoquimica"
  },
  {
    "subject": "matematica",
    "topic": "Geometria",
    "title": "Geometria plana: perímetro, área, Pitágoras e circunferência",
    "readingMinutes": 7,
    "href": "/estudar/matematica/geometria"
  },
  {
    "subject": "informatica",
    "topic": "Redes",
    "title": "Redes de computadores: IP, máscara, DNS, TCP e UDP",
    "readingMinutes": 8,
    "href": "/estudar/informatica/redes"
  },
  {
    "subject": "matematica",
    "topic": "Álgebra",
    "title": "Álgebra: equações, inequações e sistemas",
    "readingMinutes": 8,
    "href": "/estudar/matematica/algebra"
  },
  {
    "subject": "fisica",
    "topic": "Ondas",
    "title": "Ondas: frequência, comprimento de onda e velocidade",
    "readingMinutes": 6,
    "href": "/estudar/fisica/ondas"
  },
  {
    "subject": "informatica",
    "topic": "Segurança digital",
    "title": "Segurança digital: golpes, malware, senhas e criptografia",
    "readingMinutes": 8,
    "href": "/estudar/informatica/seguranca-digital"
  }
];
