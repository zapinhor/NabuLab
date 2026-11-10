import { questionBank } from "@/data/questions";
import { contentCatalog } from "@/lib/content/catalog";
import { lessonCatalog } from "@/lib/content/lessons";
import { concursoSubjects, detranSubjects, oabSubjects, vestibularSubjects } from "@/lib/study-focus";
import type { SubjectId } from "@/types/question";

/**
 * Páginas de entrada por tipo de prova (/simulado-detran, /simulado-enem...).
 * Os fatos sobre cada prova vêm de fontes públicas conferidas em nov/2026;
 * os números do NabuLab são calculados do banco no build.
 */
export type ExamLandingId = "detran" | "enem" | "oab" | "concurso";

type LandingCopy = {
  id: ExamLandingId;
  path: `/${string}`;
  guestTrack: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  examTitle: string;
  examFacts: string[];
  howTo: string[];
  faq: Array<{ q: string; a: string }>;
  subjectIds: SubjectId[];
};

const COPY: LandingCopy[] = [
  {
    id: "detran",
    path: "/simulado-detran",
    guestTrack: "detran",
    title: "Simulado DETRAN grátis: questões da prova teórica da CNH",
    description: "Treine para a prova teórica do DETRAN com questões comentadas de legislação, sinalização, direção defensiva, primeiros socorros e meio ambiente. Comece sem cadastro.",
    eyebrow: "Prova teórica da CNH",
    h1: "Simulado DETRAN grátis para a prova teórica da CNH",
    intro: "Pratique com questões no estilo da prova teórica do DETRAN, veja a explicação de cada resposta e descubra quais temas ainda precisam de revisão antes do exame.",
    examTitle: "Como é a prova teórica do DETRAN",
    examFacts: [
      "A prova tem 30 questões de múltipla escolha.",
      "Para ser aprovado, você precisa acertar pelo menos 21 questões (70%).",
      "Os temas seguem o curso teórico-técnico definido pelo CONTRAN (Resolução nº 789/2020): legislação de trânsito, direção defensiva, primeiros socorros, meio ambiente e convivência no trânsito e noções de funcionamento do veículo.",
      "Cada DETRAN estadual organiza a aplicação, então confira local, horário e regras no site do órgão do seu estado.",
    ],
    howTo: [
      "Comece pelo simulado grátis de 3 questões para sentir o nível.",
      "Com a conta grátis, faça simulados de até 10 questões por dia. No Premium, monte simulados de 30 questões, como na prova oficial.",
      "No Premium, use “Treinar erros” para revisar só as questões que você errou.",
      "Leia as aulas curtas de infrações, marcas viárias e normas de circulação.",
    ],
    faq: [
      { q: "Quantas questões tem a prova teórica do DETRAN?", a: "São 30 questões de múltipla escolha, e é preciso acertar pelo menos 21 (70%) para ser aprovado." },
      { q: "O simulado do NabuLab é grátis?", a: "Sim. Você responde 3 questões sem cadastro e, com uma conta grátis, pode responder até 10 questões por dia com correção comentada." },
      { q: "Quais temas caem na prova?", a: "Os do curso teórico-técnico: legislação de trânsito, direção defensiva, primeiros socorros, meio ambiente e convivência e funcionamento do veículo. No NabuLab você treina legislação, sinalização, direção defensiva, primeiros socorros e meio ambiente." },
      { q: "As questões são oficiais do DETRAN?", a: "Não. São questões elaboradas no estilo da prova, com base no Código de Trânsito Brasileiro e nas resoluções do CONTRAN, sempre com explicação." },
    ],
    subjectIds: detranSubjects.map((subject) => subject.id),
  },
  {
    id: "enem",
    path: "/simulado-enem",
    guestTrack: "misturado",
    title: "Simulado ENEM grátis com questões comentadas",
    description: "Faça simulados no estilo ENEM com questões comentadas de linguagens, humanas, natureza e matemática. Veja seus erros, revise por tema e acompanhe sua evolução.",
    eyebrow: "ENEM e vestibulares",
    h1: "Simulado ENEM grátis com correção comentada",
    intro: "Treine as quatro áreas do ENEM com questões no estilo da prova, entenda cada resposta e descubra em quais temas você mais perde pontos.",
    examTitle: "Como é a prova do ENEM",
    examFacts: [
      "São 180 questões de múltipla escolha, 45 em cada área: Linguagens, Ciências Humanas, Ciências da Natureza e Matemática.",
      "A prova é aplicada em dois domingos. No 1º dia caem Linguagens, Humanas e a redação (5h30). No 2º dia, Natureza e Matemática (5h).",
      "As questões objetivas são corrigidas pela TRI (Teoria de Resposta ao Item): acertar questões fáceis com consistência pesa na nota.",
      "A redação vale até 1.000 pontos, avaliada em cinco competências de até 200 pontos cada.",
    ],
    howTo: [
      "Faça o teste grátis de 3 questões em “Um pouco de tudo”.",
      "Monte simulados por área ou misture matérias, como no ENEM.",
      "Revise primeiro os temas em que você mais erra: o histórico mostra cada questão corrigida.",
      "Use as aulas curtas para revisar a teoria antes de voltar às questões.",
    ],
    faq: [
      { q: "Quantas questões tem o ENEM?", a: "São 180 questões objetivas, 45 por área, além da redação, divididas em dois dias de prova." },
      { q: "O simulado serve para outros vestibulares?", a: "Sim. As matérias do ensino médio são as mesmas, e você pode montar simulados só das matérias que caem no seu vestibular." },
      { q: "O NabuLab corrige redação?", a: "Ainda não. Por enquanto o NabuLab trabalha com questões objetivas comentadas." },
      { q: "Preciso pagar para treinar?", a: "Não. A conta grátis permite 10 questões por dia. O Premium libera questões sem limite, o nível avançado e simulados maiores." },
    ],
    subjectIds: vestibularSubjects.map((subject) => subject.id),
  },
  {
    id: "oab",
    path: "/simulado-oab",
    guestTrack: "oab",
    title: "Simulado OAB 1ª fase grátis: questões comentadas",
    description: "Treine para a 1ª fase do Exame de Ordem com questões comentadas de Ética, Constitucional, Civil, Penal, Processo e mais. Comece sem cadastro.",
    eyebrow: "Exame de Ordem",
    h1: "Simulado OAB 1ª fase grátis com questões comentadas",
    intro: "Pratique as disciplinas da 1ª fase do Exame de Ordem, com explicação de cada alternativa e revisão focada nos seus erros.",
    examTitle: "Como é a 1ª fase da OAB",
    examFacts: [
      "A prova objetiva tem 80 questões de múltipla escolha, com quatro alternativas.",
      "Para passar para a 2ª fase, é preciso acertar pelo menos 40 questões (50%).",
      "A banca é a FGV.",
      "Ética Profissional é a disciplina com mais questões (8), por isso vale começar por ela.",
    ],
    howTo: [
      "Faça o teste grátis de 3 questões da OAB.",
      "Comece por Ética e pelas disciplinas com mais questões na prova.",
      "Monte simulados mistos para treinar a troca de assunto, como no exame.",
      "Revise com as aulas de sanções disciplinares e controle de constitucionalidade.",
    ],
    faq: [
      { q: "Quantas questões preciso acertar na 1ª fase da OAB?", a: "Pelo menos 40 das 80 questões, ou seja, 50% da prova." },
      { q: "Qual disciplina tem mais questões?", a: "Ética Profissional, com 8 questões. Constitucional, Civil, Processo Civil, Penal e Processo Penal vêm em seguida." },
      { q: "As questões são de provas anteriores?", a: "Não. São questões elaboradas no estilo da FGV, com base na legislação e com explicação de cada resposta." },
      { q: "Dá para estudar pelo celular?", a: "Sim. O NabuLab funciona no navegador do celular, sem instalar nada." },
    ],
    subjectIds: oabSubjects.map((subject) => subject.id),
  },
  {
    id: "concurso",
    path: "/simulado-concurso",
    guestTrack: "concursos",
    title: "Simulado para concursos grátis: bancários, Correios e polícia",
    description: "Questões comentadas para concursos públicos e bancários: Constitucional, Administrativo, conhecimentos bancários, Lei 8.112 e mais. Comece sem cadastro.",
    eyebrow: "Concursos públicos e bancários",
    h1: "Simulado para concursos grátis com questões comentadas",
    intro: "Treine as matérias que mais caem em concursos públicos e bancários, entenda cada resposta e acompanhe em quais assuntos você está pronto.",
    examTitle: "Como estudar para concurso com simulados",
    examFacts: [
      "Cada concurso tem seu edital: confira as matérias, o número de questões e a banca antes de montar seu plano.",
      "Direito Constitucional, Direito Administrativo e Português aparecem na maioria dos editais da área pública.",
      "Concursos bancários costumam cobrar conhecimentos bancários, matemática financeira e vendas e negociação.",
      "Treinar com tempo e revisar os erros por assunto ajuda a identificar o que ainda falta antes da prova.",
    ],
    howTo: [
      "Faça o teste grátis de 3 questões de concursos.",
      "Monte simulados só com as matérias do seu edital.",
      "No Premium, use “Treinar erros” para fixar os assuntos que você mais erra.",
      "No Premium, acompanhe o domínio por matéria para saber quando avançar.",
    ],
    faq: [
      { q: "Para quais concursos o NabuLab tem questões?", a: "Há matérias para concursos públicos em geral, bancários, Correios, Petrobras e carreiras policiais. A lista completa está abaixo." },
      { q: "As questões são de provas anteriores?", a: "Não. São questões elaboradas no estilo das principais bancas, com base na legislação e com explicação." },
      { q: "Posso montar um simulado só com as matérias do meu edital?", a: "Sim. Na criação do simulado você escolhe as matérias e a quantidade de questões." },
      { q: "Preciso pagar?", a: "Não. A conta grátis permite 10 questões por dia. O Premium libera questões sem limite e simulados de até 50 questões." },
    ],
    subjectIds: concursoSubjects.map((subject) => subject.id),
  },
];

export function getExamLanding(id: ExamLandingId) {
  const copy = COPY.find((item) => item.id === id)!;
  const ids = new Set<string>(copy.subjectIds);
  const subjects = contentCatalog
    .filter((subject) => ids.has(subject.id))
    .sort((a, b) => b.total - a.total)
    .map((subject) => ({ name: subject.name, slug: subject.slug, total: subject.total, indexable: subject.indexable }));
  const topics = contentCatalog
    .filter((subject) => ids.has(subject.id))
    .flatMap((subject) => subject.topics.filter((topic) => topic.indexable).map((topic) => ({ name: topic.name, subjectName: subject.name, total: topic.total, href: `/questoes/${subject.slug}/${topic.slug}` })))
    .sort((a, b) => b.total - a.total)
    .slice(0, 12);
  const lessons = lessonCatalog.filter((entry) => ids.has(entry.lesson.subject)).map((entry) => ({ title: entry.lesson.title, href: entry.href, minutes: entry.lesson.readingMinutes }));
  const questionCount = questionBank.filter((question) => ids.has(question.subject)).length;
  return { ...copy, subjects, topics, lessons, questionCount };
}

export const EXAM_LANDINGS = COPY.map(({ id, path, eyebrow }) => ({ id, path, label: eyebrow }));
