"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { IconChevronLeft, IconChevronRight, IconPlus } from "@/components/ui/icons";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/citizen";

  // Protect internal officer enforcement routes
  useEffect(() => {
    if (!isPublicRoute && !isAuthenticated) {
      router.push("/?auth=required");
    }
  }, [pathname, isAuthenticated, isPublicRoute, router]);

  // Render public landing page or login page without desktop app frame wrapper
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return <div className="min-h-screen w-full bg-white font-sans text-slate-950 antialiased">{children}</div>;
  }

  // If unauthenticated trying to access protected route before redirect finishes
  if (!isPublicRoute && !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 p-2 sm:p-3 md:p-4 font-sans text-slate-900">
      {/* Desktop Window Container (Linear / Aceternity App Frame) */}
      <div className="flex flex-1 flex-col h-full w-full rounded-xl md:rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {/* Top Window Header Bar */}
        <div className="flex h-9 w-full items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 text-xs select-none shrink-0">
          {/* Left Nav Arrows */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-slate-400">
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60 transition-colors cursor-pointer">
                <IconChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60 transition-colors cursor-pointer">
                <IconChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider ml-1">
              LegalMetrix System
            </span>
          </div>

          {/* Center Tab Pill Indicator */}
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1 border border-slate-200 text-[11px] font-medium text-slate-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span>LegalMetrix Enforcement Portal</span>
            <span className="text-slate-400 font-mono">›</span>
            <span className="text-slate-900 font-semibold capitalize">
              {pathname === "/dashboard"
                ? "Executive Overview"
                : pathname.replace("/", "").replace("-", " ")}
            </span>
          </div>

          {/* Right Window Action Button */}
          <div className="flex items-center gap-2 text-slate-400">
            <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer">
              <IconPlus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Outer Split View Window Body */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Hierarchical Linear Sidebar */}
          <Sidebar />

          {/* Main Viewport Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden min-w-0 bg-white">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
              <div className="mx-auto max-w-7xl space-y-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppShellContent>{children}</AppShellContent>
    </AuthProvider>
  );
}
