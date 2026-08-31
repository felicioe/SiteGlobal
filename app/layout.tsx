import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Associação Capitular Adonhiramita",
  description: "Portal institucional da Loja de Perfeição Adonhiram e do Sublime Capítulo Adonhiramita Ayres Gevaerd.",
  manifest: "/manifest.webmanifest",
  applicationName: "Associação Adonhiramita",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Associação" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/icons/apple-touch-icon.png" },
  themeColor: "#0b1626",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
