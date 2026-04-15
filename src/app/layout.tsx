import type { Metadata } from "next";
import { DM_Serif_Display, DM_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lais Bandeira — Engenheira de Computação",
  description:
    "Engenheira de Computação formada pelo CIn-UFPE, mestranda pesquisando sistemas elétricos em tempo real. Entusiasta da cultura Maker.",
  keywords: ["engenharia", "computação", "IoT", "maker", "UFPE", "Recife"],
  authors: [{ name: "Lais Bandeira" }],
  openGraph: {
    title: "Lais Bandeira — Engenheira de Computação",
    description:
      "Engenheira de Computação formada pelo CIn-UFPE. Pesquisa, IoT, cultura Maker.",
    url: "https://lbandeira.com.br",
    siteName: "Lais Bandeira",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSerif.variable} ${dmMono.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
