"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Smartphone, Database, ShieldCheck, UserCheck, Building2, Scale as MagistrateIcon } from "lucide-react";
import { TextSizeControl } from "./TextSizeControl";
import { useAuth, UserRole } from "@/lib/context/AuthContext";
import { InspectionHistoryModal } from "@/components/enforcement/InspectionHistoryModal";

export function GovHeader() {
  const { currentUser, setRole } = useAuth();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <InspectionHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      {/* Tricolour rule */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(to right, var(--color-saffron) 0 33.3%, #fff 33.3% 66.6%, var(--color-india-green) 66.6% 100%)",
        }}
      />

      <div className="no-print flex flex-wrap justify-between gap-3 bg-slate-950 px-5 py-1.5 text-[0.76rem] text-slate-300">
        <span>
          भारत सरकार · Government of India — Ministry of Consumer Affairs, Food &amp; Public
          Distribution · Department of Consumer Affairs
        </span>
        <span className="flex gap-2">
          <a href="#main" className="underline hover:text-white">
            Skip to content
          </a>
          <span aria-hidden>·</span>
          <a href="#" className="underline hover:text-white">
            हिन्दी
          </a>
        </span>
      </div>

      <header className="flex flex-wrap items-center gap-4 border-b-2 border-slate-200 bg-white px-5 py-3 shadow-2xs">
        <div
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-full border border-emerald-600 bg-emerald-50 text-emerald-700"
        >
          <Scale size={22} strokeWidth={1.7} />
        </div>

        <div>
          <Link href="/" className="block font-serif text-[1.18rem] font-bold leading-tight text-slate-900">
            LegalMatrix
          </Link>
          <span className="text-[0.79rem] text-slate-600">
            Compliance verification system · Legal Metrology (Packaged Commodities) Rules, 2011
          </span>
        </div>

        <div className="no-print ml-auto flex flex-wrap items-center gap-2.5">
          {/* Inspection Repository Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-[0.82rem] font-bold text-slate-800 hover:bg-slate-200 transition-all"
          >
            <Database size={15} className="text-emerald-700" />
            <span>Inspection Repository</span>
          </button>

          <TextSizeControl />

          <Link
            href="/citizen"
            className="flex items-center gap-1.5 rounded-lg border-2 border-emerald-600 bg-emerald-50 px-3 py-1.5 text-[0.82rem] font-bold text-emerald-800 shadow-xs hover:bg-emerald-600 hover:text-white transition-all"
          >
            <Smartphone size={16} />
            <span>Consumer Mobile View</span>
          </Link>

          {/* Role-Based Access Control Switcher */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="relative">
              <select
                value={currentUser.role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-2.5 pr-6 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none cursor-pointer"
              >
                <option value="OFFICER">🛡️ Inspector Officer</option>
                <option value="MAGISTRATE">⚖️ Magistrate</option>
                <option value="MANUFACTURER">🏭 Manufacturer</option>
                <option value="CONSUMER">📱 Consumer</option>
              </select>
            </div>

            <div className="leading-tight hidden sm:block">
              <b className="block text-[0.82rem] font-bold text-slate-900">{currentUser.name}</b>
              <small className="text-[0.7rem] text-slate-600 truncate max-w-[140px] block">
                {currentUser.roleTitle}
              </small>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
