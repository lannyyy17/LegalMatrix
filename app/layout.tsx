import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif, Noto_Sans_Mono } from "next/font/google";
import { GovHeader } from "@/components/layout/GovHeader";
import { SideNav } from "@/components/layout/SideNav";
import { AuthProvider } from "@/lib/context/AuthContext";
import "./globals.css";

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
        <AuthProvider>
          <GovHeader />

          <div className="flex min-h-[calc(100vh-120px)] items-stretch">
            <SideNav />
            <main id="main" className="min-w-0 flex-1 px-6 pb-16 pt-6">
              <div className="mx-auto max-w-[1400px]">{children}</div>
            </main>
          </div>

          <footer className="bg-slate-950 px-6 py-4 text-[0.78rem] text-slate-400 border-t border-slate-800">
            <b>LegalMatrix</b> — Legal Metrology Compliance &amp; Enforcement System ·
            Department of Consumer Affairs
            <br />
            Enforcing Legal Metrology (Packaged Commodities) Rules, 2011 and Legal Metrology Act, 2009.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
