import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { AcademicSyncBoundary } from "@/components/academic-sync-boundary";
import { ConsentManager } from "@/components/analytics/consent-manager";
import { GaRouteEvent } from "@/components/analytics/ga-route-event";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NabuLab — Simulados, revisão e evolução para vestibulares",
    template: "%s | NabuLab",
  },

  description:
    "Pratique para vestibulares com simulados, correção comentada, revisão de erros e acompanhamento de desempenho em 17 matérias.",

  applicationName: "NabuLab",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  keywords: [
    "NabuLab",
    "educação",
    "simulados",
    "aprendizado",
    "revisão",
    "desempenho",
    "estudos",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "NabuLab",
    title: "NabuLab — Simulados, revisão e evolução para vestibulares",
    description: "Simulados, correção comentada e acompanhamento do seu desempenho em um só lugar.",
    images: [{ url: "/branding/Logo-principal.png", width: 1024, height: 1024, alt: "NabuLab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NabuLab — Simulados, revisão e evolução para vestibulares",
    description: "Pratique, corrija e acompanhe sua evolução para os vestibulares.",
    images: ["/branding/Logo-principal.png"],
  },
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
        <ConsentManager />
        <GaRouteEvent />
      </body>
    </html>
  );
}
