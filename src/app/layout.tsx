import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { AcademicSyncBoundary } from "@/components/academic-sync-boundary";

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
    default: "NabuLab",
    template: "%s | NabuLab",
  },

  description:
    "Plataforma educacional de simulados, revisão e acompanhamento de desempenho.",

  applicationName: "NabuLab",

  keywords: [
    "NabuLab",
    "educação",
    "simulados",
    "aprendizado",
    "revisão",
    "desempenho",
    "estudos",
  ],
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
        <a
          href="#conteudo-principal"
          className="fixed left-4 top-4 z-[9999] -translate-y-24 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Pular para o conteúdo
        </a>

        <div
          id="conteudo-principal"
          tabIndex={-1}
          className="min-h-screen"
        >
          <AcademicSyncBoundary>{children}</AcademicSyncBoundary>
        </div>
      </body>
    </html>
  );
}
