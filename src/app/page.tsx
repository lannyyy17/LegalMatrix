"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, type Variants } from "motion/react";
import {
  IconScale,
  IconArrowRight,
  IconCamera,
  IconShieldCheck,
  IconShieldAlert,
  IconUserCheck,
  IconX,
  IconCheckCircle,
} from "@/components/ui/icons";
import { useAuth } from "@/lib/auth-context";

// Simple Google SVG Icon for Auth Modal
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, login } = useAuth();
  const [showOfficerLoginModal, setShowOfficerLoginModal] = useState(false);

  // If user was redirected from protected officer route
  useEffect(() => {
    if (searchParams.get("auth") === "required") {
      setShowOfficerLoginModal(true);
    }
  }, [searchParams]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 26,
      },
    },
  };

  const handleOfficerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Save auth state
    setShowOfficerLoginModal(false);
    router.push("/dashboard");
  };

  const handleProtectedAction = (targetRoute?: string) => {
    if (isAuthenticated) {
      router.push(targetRoute || "/dashboard");
    } else {
      setShowOfficerLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#08090a] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Linear-Style Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#08090a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold transition-transform group-hover:scale-105">
              <IconScale className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              Legal<span className="text-blue-500">Metrix</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-slate-100 transition-colors">
              Features
            </a>
            <button onClick={() => handleProtectedAction("/scan")} className="hover:text-slate-100 transition-colors cursor-pointer">
              AI OCR Scanner
            </button>
            <Link href="/citizen" className="hover:text-slate-100 transition-colors">
              Citizen Public Portal
            </Link>
            <a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="hover:text-slate-100 transition-colors">
              LM Act 2009
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/citizen">
              <button className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                Citizen Portal
              </button>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
              >
                <IconCheckCircle className="h-4 w-4" />
                <span>Go to Officer Portal</span>
              </button>
            ) : (
              <button
                onClick={() => setShowOfficerLoginModal(true)}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm hover:shadow-blue-500/20"
              >
                Enforcement Officer Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center max-w-5xl mx-auto space-y-8">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1 text-xs text-slate-300 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span>LegalMetrix • Packaged Commodities Compliance & Enforcement System</span>
          <span className="text-slate-500">›</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
          The enforcement system for packaged commodity compliance.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Purpose-built for statutory speed and precision. Extract Rule 6 mandatory declarations, analyze Rule 7 font heights, and issue Section 18 enforcement notices in milliseconds.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleProtectedAction("/dashboard")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-all cursor-pointer shadow-lg shadow-blue-600/20"
          >
            <span>{isAuthenticated ? "Go to Officer Workspace" : "Enforcement Officer Sign In"}</span>
            <IconArrowRight className="h-4 w-4" />
          </button>

          <Link href="/citizen" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all cursor-pointer">
              <IconUserCheck className="h-4 w-4 text-slate-400" />
              <span>Public Citizen Portal</span>
            </button>
          </Link>
        </div>

        {/* Interactive Linear App Mockup Frame */}
        <div className="pt-10 relative">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-2 sm:p-3 shadow-2xl shadow-blue-500/10 overflow-hidden">
            <div className="rounded-xl border border-slate-800 bg-[#0c0d0e] p-4 text-left font-mono text-xs space-y-4">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-slate-800" />
                  <span className="h-3 w-3 rounded-full bg-slate-800" />
                  <span className="h-3 w-3 rounded-full bg-slate-800" />
                  <span className="text-[11px] text-slate-400 font-sans ml-2">
                    LegalMetrix Enforcement Portal • Central Zone (Delhi NCR)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-sans">● Live Engine</span>
              </div>

              {/* Sample Columns Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Backlog (33)</span>
                    <span>•••</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                    <p className="font-bold text-white">CMD-179 • NutriCrunch Cookies</p>
                    <p className="text-[10px] text-slate-500 mt-1">Rule 6 Check • Food & Bev</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-blue-900/50 bg-blue-950/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
                    <span>Active Audit (4)</span>
                    <span>•••</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-blue-800/80 text-xs">
                    <p className="font-bold text-blue-300">CMD-228 • Unit Sale Price Format</p>
                    <p className="text-[10px] text-blue-400 mt-1">OCR Extracted 8/8 Declarations</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-red-900/50 bg-red-950/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-red-400">
                    <span>Notice Issued (5)</span>
                    <span>•••</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-red-800/80 text-xs">
                    <p className="font-bold text-red-300">CMD-243 • PowerBank Dual MRP</p>
                    <p className="text-[10px] text-red-400 mt-1">Section 18 Notice • ₹50,000 Fine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linear Design Pillars / Features Grid */}
      <section id="features" className="py-20 border-t border-slate-800/80 bg-[#0b0c0e] px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Built for statutory compliance enforcement.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Four core pillars designed to eliminate non-standard packaging, overcharging, and label omission across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center">
                <IconCamera className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Rule 6 AI OCR Declaration Extractor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan label photographs to automatically extract Manufacturer Address, Net Quantity, MRP (incl. of all taxes), Month/Year of Packing, and Country of Origin in under 800ms.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-500 flex items-center justify-center">
                <IconShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Rule 7 Font Size & Height Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculates Principal Display Panel surface area (cm²) and compares measured OCR font height against statutory minimum font height tables (1.0mm, 1.5mm, 2.5mm, 4.0mm).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center">
                <IconShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Section 18 & 36 Notice Workflow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate show-cause statutory compounding notices for dual MRP sticker overrides, overcharging above printed MRP, or prohibited phrases like "Taxes Extra".
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-purple-600/10 text-purple-500 flex items-center justify-center">
                <IconUserCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Citizen Public Verification & Grievances</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empower consumers to scan EAN-13 barcodes, verify registered package details, and submit overcharging grievances directly to consumer protection teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Linear Footer */}
      <footer className="border-t border-slate-800/80 py-10 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <IconScale className="h-4 w-4 text-blue-500" />
            <span className="font-bold text-slate-300">LegalMetrix</span>
            <span>• Packaged Commodities Compliance System</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <button onClick={() => handleProtectedAction("/dashboard")} className="hover:text-white cursor-pointer">Officer Portal</button>
            <button onClick={() => handleProtectedAction("/scan")} className="hover:text-white cursor-pointer">AI Scanner</button>
            <Link href="/citizen" className="hover:text-white">Citizen Verification</Link>
            <a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="hover:text-white">Legal Metrology Act 2009</a>
          </div>
        </div>
      </footer>

      {/* 70% SCREEN SIZE OFFICER LOGIN MODAL POPUP */}
      {showOfficerLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 sm:p-6 transition-all animate-fadeIn">
          {/* Modal Container Occupying ~70% Screen Width/Height */}
          <div className="relative w-[92vw] max-w-5xl h-[85vh] max-h-[750px] rounded-2xl md:rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl flex flex-col">
            {/* Top Close Button Bar */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setShowOfficerLoginModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Close Login Modal"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            {/* Embedded Auth7 Component */}
            <div className="flex h-full w-full bg-white font-sans text-neutral-950 antialiased overflow-hidden">
              <div className="flex h-full w-full overflow-hidden">
                {/* Left Form Section */}
                <div className="flex h-full w-full flex-col justify-between p-6 md:p-10 lg:w-1/2 overflow-y-auto">
                  {/* Top Logo Branding Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                      <IconScale className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-neutral-900">
                      LEGAL<span className="text-blue-600">METRIX</span>
                    </span>
                  </div>

                  {/* Centered Form Wrapper */}
                  <div className="my-auto py-4 w-full max-w-[380px] mx-auto">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="w-full space-y-5"
                    >
                      {/* Left-Aligned Clean Titles */}
                      <motion.div variants={itemVariants} className="space-y-1 text-left">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                          Officer Sign In
                        </h2>
                        <p className="text-xs text-neutral-500">
                          Sign in to Legal Metrology Packaged Commodities Enforcement Portal
                        </p>
                      </motion.div>

                      {/* Google Login Button */}
                      <motion.div variants={itemVariants}>
                        <button
                          type="button"
                          onClick={() => {
                            login();
                            setShowOfficerLoginModal(false);
                            router.push("/dashboard");
                          }}
                          className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer"
                        >
                          <GoogleIcon className="text-base" />
                          Sign in with Google
                        </button>
                      </motion.div>

                      {/* Divider */}
                      <motion.div variants={itemVariants} className="relative flex items-center">
                        <div className="grow border-t border-neutral-200"></div>
                        <span className="px-3 text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                          or
                        </span>
                        <div className="grow border-t border-neutral-200"></div>
                      </motion.div>

                      {/* Form */}
                      <form onSubmit={handleOfficerLoginSubmit} className="space-y-3.5">
                        <motion.div variants={itemVariants} className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-neutral-700">
                            Officer Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Rajesh Kumar"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:bg-white focus:border-blue-600"
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-neutral-700">
                            Official Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue="r.kumar@legalmetrology.gov.in"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:bg-white focus:border-blue-600"
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1 text-left">
                          <label className="text-xs font-semibold text-neutral-700">
                            Password
                          </label>
                          <input
                            type="password"
                            defaultValue="••••••••••••"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:bg-white focus:border-blue-600"
                          />
                        </motion.div>

                        {/* Sign In Button */}
                        <motion.div variants={itemVariants} className="pt-1">
                          <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-700 cursor-pointer"
                          >
                            <span>Sign In to Enforcement Portal</span>
                            <IconArrowRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      </form>
                    </motion.div>
                  </div>

                  {/* Footer Copyright */}
                  <div className="text-[10px] text-neutral-400 text-left pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span>© 2026 LegalMetrix • Enforcement Portal</span>
                    <span>LM (PC) Rules 2011</span>
                  </div>
                </div>

                {/* Right Image Section */}
                <div className="hidden lg:block lg:w-1/2 p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-6">
                    <img
                      src="/login-illustration.jpg"
                      alt="Legal Metrology Compliance Modern Illustration"
                      className="h-full w-full object-contain max-h-[90%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090a]" />}>
      <LandingPageContent />
    </Suspense>
  );
}
