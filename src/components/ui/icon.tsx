// NabuLab icons — linha 24x24, traço 2px, herda a cor do texto (currentColor).
// Uso: <Icon name="inicio" className="h-5 w-5 text-[#3B82F6]" />
import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  "inicio": <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9"/></>,
  "materias": <><path d="M2.5 5.5C5 4.5 8.8 4.6 12 7c3.2-2.4 7-2.5 9.5-1.5v13.3c-2.5-1-6.3-.9-9.5 1.5-3.2-2.4-7-2.5-9.5-1.5z"/><path d="M12 7v13.3"/></>,
  "desempenho": <><path d="M3 21h18"/><rect x="5" y="13" width="3" height="5" rx="1"/><rect x="10.5" y="8" width="3" height="10" rx="1"/><rect x="16" y="4" width="3" height="14" rx="1"/></>,
  "evolucao": <><path d="M3 3v17a1 1 0 0 0 1 1h17"/><path d="m7 15 4-4 3 3 6-6.5"/></>,
  "analise": <><circle cx="10.5" cy="10.5" r="7"/><path d="m20.5 20.5-5-5"/><path d="M7.5 12.5v-1.5M10.5 12.5V8M13.5 12.5V10"/></>,
  "dominio": <><path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/></>,
  "metas": <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
  "recomendado": <><path d="M11 3.5l1.9 5.1L18 10.5l-5.1 1.9L11 17.5l-1.9-5.1L4 10.5l5.1-1.9z"/><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></>,
  "treinar-erros": <><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/><path d="m10 10 4 4M14 10l-4 4"/></>,
  "historico": <><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/><path d="M12 7.5V12l3 2"/></>,
  "turmas": <><path d="M9 4h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6"/><circle cx="6.5" cy="11" r="2.5"/><path d="M2.5 20.5c0-2.8 1.8-5 4-5s4 2.2 4 5"/><path d="m9.5 15 4-3.5"/></>,
  "notificacoes": <><path d="M18 11a6 6 0 0 0-12 0v5l-1.5 2h15L18 16z"/><path d="M10 21h4"/></>,
  "auditoria": <><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="m9 13 2 2 4-4"/></>,
  "novo-simulado": <><path d="M12 21H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7l5 5v3"/><path d="M13 3v5h5"/><path d="M8.5 12.5h5M8.5 16h2.5"/><path d="m18.5 13.5 2 2-5.5 5.5h-2v-2z"/></>,
  "gestao-institucional": <><path d="M2 21h20"/><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h3M8 12h3M8 16h3"/></>,
  "suporte": <><path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"/><path d="M12 7.5v4"/><path d="M12 14h.01"/></>,
  "menu": <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  "fechar": <><path d="M6 6l12 12M18 6 6 18"/></>,
  "portugues": <><path d="m3 19 5.5-14h1L15 19"/><path d="M5.3 13.5h6.4"/><circle cx="18" cy="16.2" r="2.8"/><path d="M20.8 13v6"/></>,
  "literatura": <><path d="M20 4C12.5 4 7 9.5 7 17"/><path d="M20 4c0 7.5-5.5 13-13 13"/><path d="m3.5 20.5 3.5-3.5"/><path d="M11 13h4.5M13.5 9.5H18"/></>,
  "ingles": <><path d="M3 4h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 2.5V12H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M16 9h5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v2.5L17 17h-5a1 1 0 0 1-1-1v-1.5"/></>,
  "espanhol": <><path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M7.5 8.5h9M7.5 12h5.5"/></>,
  "arte": <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="9.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="14" cy="7" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="10.5" r="1.2" fill="currentColor" stroke="none"/></>,
  "educacao-fisica": <><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></>,
  "matematica": <><path d="M7 4v6M4 7h6"/><path d="M14 7h6"/><path d="m4.5 14.5 5 5M9.5 14.5l-5 5"/><path d="M14 15.5h6M14 18.5h6"/></>,
  "raciocinio-logico": <><path d="M3 9a1 1 0 0 1 1-1h5a2 2 0 1 1 4 0h5a1 1 0 0 1 1 1v4.5a2 2 0 1 1 0 4V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></>,
  "fisica": <><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/></>,
  "quimica": <><path d="M9 3h6"/><path d="M10 3v6.2L4.8 18.2a1.5 1.5 0 0 0 1.3 2.3h11.8a1.5 1.5 0 0 0 1.3-2.3L14 9.2V3"/><path d="M7.2 14.5h9.6"/></>,
  "biologia": <><path d="M7 3c0 4.5 10 4.5 10 9s-10 4.5-10 9"/><path d="M17 3c0 4.5-10 4.5-10 9s10 4.5 10 9"/><path d="M8.5 5h7M7.5 12h9M8.5 19h7"/></>,
  "ciencias": <><path d="M7 3.5 11 5.8 7.8 11.3 3.8 9z"/><path d="m6.5 11.2-1 1.8"/><path d="M10.2 8a6 6 0 0 1 3.3 11"/><path d="M4 21h16"/><path d="M8 18h6"/></>,
  "historia": <><path d="M3 21h18M4 18h16"/><path d="M12 3l9 5H3z"/><path d="M6 11v7M10 11v7M14 11v7M18 11v7"/></>,
  "geografia": <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></>,
  "filosofia": <><path d="M9.5 17.5h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v1.6h5v-1.6c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/></>,
  "sociologia": <><circle cx="12" cy="7.5" r="3"/><path d="M6.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><circle cx="5" cy="10" r="2"/><path d="M1.5 18c0-2.2 1.4-3.8 3.5-3.8"/><circle cx="19" cy="10" r="2"/><path d="M22.5 18c0-2.2-1.4-3.8-3.5-3.8"/></>,
  "informatica": <><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/><path d="m10 8-2 2 2 2M14 8l2 2-2 2"/></>,
  "carregando": <><path d="M12 3a9 9 0 1 1-9 9"/></>,
  "vazio": <><path d="M3 13h5l1.5 3h5l1.5-3h5"/><path d="M5.5 5h13L21 13v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z"/></>,
  "alerta": <><path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4"/><path d="M12 17h.01"/></>,
  "nao-encontrado": <><path d="M12 3v18M9 21h6"/><path d="M5 5h10l3 2.5L15 10H5z"/><path d="M19 12.5H9l-3 2.5 3 2.5h10z"/></>,
  "pontos-fortes": <><path d="M12 21v-8"/><path d="M12 13c0-4-3-6.5-7-6.5 0 4 3 6.5 7 6.5z"/><path d="M12 11c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6z"/></>,
  "busca-vazia": <><circle cx="10.5" cy="10.5" r="7"/><path d="m20.5 20.5-5-5"/><path d="m8.5 8.5 4 4M12.5 8.5l-4 4"/></>,
  "simulado-nao-encontrado": <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/><path d="M10 12a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5"/><path d="M12 18h.01"/></>,
  "mapa-inicio": <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/></>,
  "calendario": <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/></>,
  "celebrar": <><path d="M4 20.5 8.5 9l7 7z"/><path d="M6.5 14.5l3 3"/><path d="M14 3.5v2M20.5 10h-2M18.5 5.5 17 7"/><path d="M12.5 9.5c.8-1.6 2.6-2.3 4.3-1.8"/></>,
  "modo-manual": <><path d="M4 6h9M17 6h3"/><circle cx="15" cy="6" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="9" cy="12" r="2"/><path d="M4 18h11M19 18h1"/><circle cx="17" cy="18" r="2"/></>,
  "erro-recorrente": <><path d="m17 2 3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="m7 22-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></>,
  "baixo-dominio": <><path d="M3.5 18a8.5 8.5 0 1 1 17 0"/><path d="m12 18-4.2-4.2"/><circle cx="12" cy="18" r="1" fill="currentColor"/><path d="M12 9.5v1.5M17.8 12.2l-1 1"/></>,
  "pouco-explorado": <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></>,
  "reforco": <><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.3-7.5 9.5-4.3-1.2-7.5-5-7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></>,
  "tendencia-sobe": <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
  "tendencia-desce": <><path d="m3 7 6 6 4-4 8 8"/><path d="M15 17h6v-6"/></>,
  "estavel": <><path d="M4 12h16"/><path d="m16 8 4 4-4 4"/></>,
  "atencao": <><circle cx="12" cy="12" r="9"/><path d="M12 7.5V13"/><path d="M12 16.5h.01"/></>,
  "correta": <><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.5"/></>,
  "incorreta": <><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></>,
  "em-branco": <><circle cx="12" cy="12" r="9" strokeDasharray="3.2 3"/></>,
  "marcada": <><path d="M6 3h12v18l-6-4-6 4z"/></>,
  "bandeira": <><path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/></>,
  "bandeira-marcada": <><path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5z" fill="currentColor"/></>,
  "multipla-escolha": <><circle cx="5" cy="5.5" r="2.2"/><path d="M10.5 5.5H21"/><circle cx="5" cy="12" r="2.2" fill="currentColor"/><path d="M10.5 12H21"/><circle cx="5" cy="18.5" r="2.2"/><path d="M10.5 18.5H21"/></>,
  "verdadeiro-falso": <><path d="m3 12.5 2.5 2.5L10 9.5"/><path d="M12 4v16"/><path d="m15 9.5 5.5 5.5M20.5 9.5 15 15"/></>,
  "misto": <><path d="M3 7h3.5a4 4 0 0 1 3.3 1.8l4.4 6.4a4 4 0 0 0 3.3 1.8H21"/><path d="M3 17h3.5a4 4 0 0 0 3.3-1.8l.4-.6M13.8 8.4l.4-.6A4 4 0 0 1 17.5 7H21"/><path d="m18 4 3 3-3 3M18 14l3 3-3 3"/></>,
  "duracao": <><circle cx="12" cy="13.5" r="7.5"/><path d="M10 2.5h4M12 13.5v-4"/><path d="m18.5 6.5 1.2-1.2"/></>,
  "sequencia": <><path d="M12 21.5c-3.9 0-7-2.9-7-6.8 0-3.6 2.5-5.8 3.8-8.2.5 2 1.6 3.3 2.9 3.8.3-3 1.3-5.5.8-7.8C16 4.5 19 8.6 19 14.7c0 3.9-3.1 6.8-7 6.8z"/><path d="M12 21.5c-1.7 0-3-1.3-3-3 0-2 1.6-3 2.4-4.6.9 1.3 3.6 2.5 3.6 4.6 0 1.7-1.3 3-3 3z"/></>,
  "questoes": <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5v.4"/><path d="M12 17h.01"/></>,
  "dias-estudo": <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15.5 2 2 4-4"/></>,
  "trofeu": <><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5.5a3 3 0 0 0 3 4.5M16 6h2.5a3 3 0 0 1-3 4.5"/><path d="M12 13v4M9 21h6M10 17h4v4"/></>,
  "sincronizado": <><path d="M7 19a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 10z"/><path d="m9.5 14 2 2 3.5-3.5"/></>,
  "check": <><path d="m5 12.5 4.5 4.5L19 7.5"/></>,
  "avatar": <><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.5c1.3-2 3.3-3 5.5-3s4.2 1 5.5 3"/></>,
  "perfil": <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></>,
  "sair": <><path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></>,
  "voltar": <><path d="M20 12H4"/><path d="m10 6-6 6 6 6"/></>,
  "avancar": <><path d="M4 12h16"/><path d="m14 6 6 6-6 6"/></>,
  "anterior": <><path d="m15 5-7 7 7 7"/></>,
  "proxima": <><path d="m9 5 7 7-7 7"/></>,
};

export type IconName = "inicio" | "materias" | "desempenho" | "evolucao" | "analise" | "dominio" | "metas" | "recomendado" | "treinar-erros" | "historico" | "turmas" | "notificacoes" | "auditoria" | "novo-simulado" | "gestao-institucional" | "suporte" | "menu" | "fechar" | "portugues" | "literatura" | "ingles" | "espanhol" | "arte" | "educacao-fisica" | "matematica" | "raciocinio-logico" | "fisica" | "quimica" | "biologia" | "ciencias" | "historia" | "geografia" | "filosofia" | "sociologia" | "informatica" | "carregando" | "vazio" | "alerta" | "nao-encontrado" | "pontos-fortes" | "busca-vazia" | "simulado-nao-encontrado" | "mapa-inicio" | "calendario" | "celebrar" | "modo-manual" | "erro-recorrente" | "baixo-dominio" | "pouco-explorado" | "reforco" | "tendencia-sobe" | "tendencia-desce" | "estavel" | "atencao" | "correta" | "incorreta" | "em-branco" | "marcada" | "bandeira" | "bandeira-marcada" | "multipla-escolha" | "verdadeiro-falso" | "misto" | "duracao" | "sequencia" | "questoes" | "dias-estudo" | "trofeu" | "sincronizado" | "check" | "avatar" | "perfil" | "sair" | "voltar" | "avancar" | "anterior" | "proxima";

export const ICON_NAMES = Object.keys(paths) as IconName[];

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  /** Texto para leitores de tela. Sem ele, o ícone é decorativo (aria-hidden). */
  label?: string;
};

export function Icon({ name, size = 20, strokeWidth = 2, label, className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      // Inline por padrão: o preflight do Tailwind deixa SVG como bloco, o que joga o ícone para a linha de cima do texto.
      className={`inline-block shrink-0 align-[-0.2em]${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
