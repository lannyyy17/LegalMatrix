import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "LegalMetrix - Legal Metrology Compliance & Enforcement System",
  description:
    "Packaged Commodities Compliance & Legal Metrology Act Enforcement Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased light">
      <body className="h-full bg-slate-50 text-slate-900 overflow-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
