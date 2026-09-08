import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fisio Simulado",
    template: "%s | Fisio Simulado",
  },

  description:
    "Plataforma de simulados para estudo de anatomia, fisiologia e bioquímica.",

  applicationName:
    "Fisio Simulado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f4f7fb] text-slate-900 antialiased`}
      >
        {/*
         * =====================================================
         * PULAR PARA O CONTEÚDO
         * =====================================================
         *
         * Normalmente fica invisível.
         *
         * Ao usuário pressionar Tab logo ao entrar na página,
         * o botão aparece no canto superior esquerdo.
         */}

        <a
          href="#conteudo-principal"
          className="fixed left-4 top-4 z-[9999] -translate-y-24 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Pular para o conteúdo
        </a>

        {/*
         * =====================================================
         * CONTEÚDO DA ROTA
         * =====================================================
         *
         * Não usamos <main> aqui porque as próprias páginas
         * já possuem seus elementos <main>.
         *
         * Isso evita gerar <main> dentro de <main>.
         */}

        <div
          id="conteudo-principal"
          tabIndex={-1}
          className="min-h-screen"
        >
          {children}
        </div>
      </body>
    </html>
  );
}