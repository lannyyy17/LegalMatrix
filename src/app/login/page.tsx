"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { IconScale, IconArrowRight } from "@/components/ui/icons";

// Simple Google SVG Icon
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

export default function LoginPage() {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans text-neutral-950 antialiased p-3 md:p-4 lg:p-6 overflow-hidden">
      <div className="flex h-full w-full rounded-2xl md:rounded-3xl border border-slate-200 bg-white overflow-hidden">
        {/* Left Form Section */}
        <div className="flex h-full w-full flex-col justify-between p-6 md:p-10 lg:p-12 lg:w-1/2 overflow-y-auto">
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
          <div className="my-auto py-6 w-full max-w-[400px] mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full space-y-6"
            >
              {/* Left-Aligned Clean Titles */}
              <motion.div variants={itemVariants} className="space-y-1.5 text-left">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                  Create your Account
                </h1>
                <p className="text-xs md:text-sm text-neutral-500">
                  Sign in to Legal Metrology Packaged Commodities Enforcement Portal
                </p>
              </motion.div>

              {/* Google Login Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-xs md:text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.99] cursor-pointer"
                >
                  <GoogleIcon className="text-base md:text-lg" />
                  Sign in with Google
                </button>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="relative flex items-center"
              >
                <div className="grow border-t border-neutral-200"></div>
                <span className="px-3 text-xs text-neutral-400 font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="grow border-t border-neutral-200"></div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  variants={itemVariants}
                  className="space-y-1.5 text-left"
                >
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-neutral-700"
                  >
                    Officer Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    defaultValue="Rajesh Kumar"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-xs md:text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-1.5 text-left"
                >
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-neutral-700"
                  >
                    Official Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your official email"
                    defaultValue="r.kumar@legalmetrology.gov.in"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-xs md:text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-1.5 text-left"
                >
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-neutral-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    defaultValue="••••••••••••"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-xs md:text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                  />
                </motion.div>

                {/* Checkbox */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2.5 pt-1"
                >
                  <input
                    id="terms"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-neutral-600 cursor-pointer select-none">
                    I agree to Legal Metrology Enforcement Terms & Privacy Policy
                  </label>
                </motion.div>

                {/* Sign In Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs md:text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.99] cursor-pointer"
                  >
                    <span>Sign In to Portal</span>
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </form>

              {/* Footer text */}
              <motion.div
                variants={itemVariants}
                className="text-xs text-neutral-500 text-left pt-2"
              >
                Already registered?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/dashboard");
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Log in to Portal
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Copyright */}
          <div className="text-[11px] text-neutral-400 text-left pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span>© 2026 LegalMetrix • Enforcement Portal</span>
            <span>LM (PC) Rules 2011</span>
          </div>
        </div>

        {/* Right Image Section with Modern Legal Metrology Illustration */}
        <div className="hidden lg:block lg:w-1/2 p-3">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-8">
            <img
              src="/login-illustration.jpg"
              alt="Legal Metrology Compliance Modern Illustration"
              className="h-full w-full object-contain max-h-[92%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
