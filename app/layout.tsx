import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif, Noto_Sans_Mono } from "next/font/google";
import { GovHeader } from "@/components/layout/GovHeader";
import { SideNav } from "@/components/layout/SideNav";
import "./globals.css";

/**
 * Noto is not an aesthetic flourish. It covers Devanagari, Tamil,
 * Bengali and the other Indic scripts this application has to render,
 * and it has the large x-height that keeps a government service
 * readable for older users.
 */
const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LegalMatrix — Legal Metrology Compliance System",
  description:
    "Compliance verification for packaged commodities under the Legal Metrology (Packaged Commodities) Rules, 2011.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable} ${notoMono.variable}`}>
      <body>
        <GovHeader />

        <div className="flex min-h-[calc(100vh-120px)] items-stretch">
          <SideNav />
          <main id="main" className="min-w-0 flex-1 px-6 pb-16 pt-6">
            <div className="mx-auto max-w-[1400px]">{children}</div>
          </main>
        </div>

        <footer className="bg-deep px-6 py-4 text-[0.78rem] text-tint">
          <b>LegalMatrix</b> — prototype for Smart India Hackathon, Problem Statement 26034 ·
          Department of Consumer Affairs
          <br />
          Rule text is seeded from the Gazette of India. Every determination in this system is
          advisory and requires confirmation by an authorised Legal Metrology Officer before any
          action is taken under the Legal Metrology Act, 2009.
        </footer>
      </body>
    </html>
  );
}
