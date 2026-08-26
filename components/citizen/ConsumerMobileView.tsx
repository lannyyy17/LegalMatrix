"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Smartphone,
  Monitor,
  Camera,
  Search,
  BookOpen,
  AlertOctagon,
  ShieldCheck,
  CheckCircle,
  Home,
  Scale,
  Sparkles,
  Globe,
  FileText,
  AlertTriangle,
  HelpCircle,
  ShoppingBag,
  Info,
  ChevronRight,
  ArrowLeft,
  Bell,
  Check,
} from "lucide-react";
import { ConsumerMobileScanner } from "./ConsumerMobileScanner";
import { CitizenTabs } from "./CitizenTabs";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

type MobileModule = "home" | "scanner" | "mrp_check" | "origin_check" | "additives" | "report" | "rights";

export function ConsumerMobileView() {
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const [activeModule, setActiveModule] = useState<MobileModule>("home");
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // MRP Checker state
  const [mrpInput, setMrpInput] = useState("");
  const [chargedInput, setChargedInput] = useState("");
  const [mrpResult, setMrpResult] = useState<{ isViolation: boolean; diff: number } | null>(null);

  // Origin check search
  const [originSearch, setOriginSearch] = useState("");

  const handleReportFromScanner = (productName: string, violations: string[]) => {
    setActiveModule("report");
    setReportSuccess(`Pre-filled report created for "${productName}" with ${violations.length} legal violations.`);
  };

  const handleMrpCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const printed = parseFloat(mrpInput);
    const charged = parseFloat(chargedInput);
    if (!isNaN(printed) && !isNaN(charged)) {
      setMrpResult({
        isViolation: charged > printed,
        diff: charged - printed,
      });
    }
  };

  const appModules = [
    {
      id: "scanner" as MobileModule,
      title: "AI Rule Scanner",
      subtitle: "Scan label for font size & 7 declarations",
      icon: Camera,
      color: "bg-emerald-600 text-white",
      badge: "Scanner",
    },
    {
      id: "mrp_check" as MobileModule,
      title: "MRP Calculator",
      subtitle: "Verify retailer price legality (Sec 18)",
      icon: Scale,
      color: "bg-amber-600 text-white",
      badge: "Price",
    },
    {
      id: "origin_check" as MobileModule,
      title: "Origin Check",
      subtitle: "E-Commerce origin audit (Rule 6(10A))",
      icon: Globe,
      color: "bg-indigo-600 text-white",
      badge: "Origin",
    },
    {
      id: "additives" as MobileModule,
      title: "INS Additives",
      subtitle: "Decode food E-numbers & INS codes",
      icon: BookOpen,
      color: "bg-purple-600 text-white",
      badge: "FSSAI",
    },
    {
      id: "report" as MobileModule,
      title: "Report Violation",
      subtitle: "Direct complaint to Helpline 1915",
      icon: AlertOctagon,
      color: "bg-red-600 text-white",
      badge: "1915",
    },
    {
      id: "rights" as MobileModule,
      title: "Consumer Rights",
      subtitle: "Packaged goods rules & legal rights",
      icon: ShieldCheck,
      color: "bg-teal-600 text-white",
      badge: "Rights",
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      {/* Viewport Mode Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[0.84rem] font-bold text-slate-800">
            Consumer Smartphone Application Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameMode(true)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[0.8rem] font-bold transition-all ${
              deviceFrameMode
                ? "border-emerald-600 bg-emerald-700 text-white shadow-2xs"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Smartphone size={14} />
            <span>Smartphone Device View</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode(false)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[0.8rem] font-bold transition-all ${
              !deviceFrameMode
                ? "border-emerald-600 bg-emerald-700 text-white shadow-2xs"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Monitor size={14} />
            <span>Full View</span>
          </button>
        </div>
      </div>

      {/* Device Frame View vs Full View */}
      {deviceFrameMode ? (
        <div className="flex justify-center py-6 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          {/* Authentic Smartphone Shell — 375px x 680px */}
          <div className="relative w-[375px] h-[680px] max-w-full rounded-[44px] border-[12px] border-slate-950 bg-slate-950 shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-800">
            
            {/* Top Notch / Dynamic Island */}
            <div className="bg-slate-950 pt-2 pb-1 px-5 flex justify-between items-center text-white text-[0.66rem] font-mono shrink-0 z-50">
              <span className="font-bold text-slate-200">09:41</span>
              {/* Pill Notch */}
              <div className="w-20 h-3 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-inner">
                <div className="size-2 rounded-full bg-slate-950 mr-2 border border-slate-800" />
                <div className="w-6 h-1 rounded-full bg-slate-800" />
              </div>
              <div className="flex items-center gap-1 text-[0.62rem] text-slate-300 font-bold">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Native Mobile App Header */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-3.5 py-2 border-b border-emerald-900/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                {activeModule !== "home" && (
                  <button
                    onClick={() => setActiveModule("home")}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="font-bold text-[0.8rem] text-white tracking-tight">LegalMatrix Consumer</span>
                  </div>
                  <p className="text-[0.58rem] text-slate-300">Govt. Consumer Rights Portal</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveModule("report")}
                  className="text-[0.62rem] bg-red-600 hover:bg-red-700 px-2 py-0.5 rounded-full text-white font-extrabold flex items-center gap-1 shadow-2xs"
                >
                  <AlertOctagon size={10} />
                  <span>1915</span>
                </button>
              </div>
            </div>

            {/* Scrollable Mobile Body */}
            <div className="flex-1 overflow-y-auto p-2.5 text-slate-900 space-y-2.5 text-[0.82rem] bg-slate-200/90 scroll-smooth">
              {reportSuccess && (
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-2 text-[0.74rem] text-emerald-900 flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{reportSuccess}</p>
                    <p className="text-[0.68rem] text-emerald-800">Photo & legal finding attached.</p>
                  </div>
                </div>
              )}

              {/* MODULE: HOME APP LAUNCHER GRID */}
              {activeModule === "home" && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  {/* Hero App Banner */}
                  <div className="rounded-xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 p-3 text-white shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-emerald-300">
                          Dept. of Consumer Affairs
                        </span>
                        <h2 className="text-[0.9rem] font-extrabold leading-tight text-white mt-0.5">
                          Verify Packaged Commodities
                        </h2>
                        <p className="text-[0.66rem] text-emerald-100 mt-0.5">
                          Legal Metrology Rules, 2011 Verified
                        </p>
                      </div>
                      <Sparkles size={20} className="text-amber-300 opacity-90" />
                    </div>

                    {/* Quick Search */}
                    <div className="mt-2 relative">
                      <input
                        type="search"
                        placeholder="Search product, barcode or rule..."
                        className="w-full rounded-lg bg-white/95 text-slate-800 placeholder-slate-400 px-2.5 py-1 text-[0.74rem] pl-7 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <Search size={12} className="absolute left-2 top-2 text-slate-400" />
                    </div>
                  </div>

                  {/* Modules Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-[0.78rem] font-bold text-slate-900">App Modules</h3>
                      <span className="text-[0.65rem] text-slate-500 font-semibold">6 Services</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {appModules.map((mod) => {
                        const IconComponent = mod.icon;
                        return (
                          <button
                            key={mod.id}
                            onClick={() => setActiveModule(mod.id)}
                            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-2 text-left shadow-2xs hover:border-emerald-600 transition-all group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <div className={`grid size-6 place-items-center rounded-md ${mod.color}`}>
                                  <IconComponent size={13} />
                                </div>
                                <span className="text-[0.58rem] font-extrabold px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                                  {mod.badge}
                                </span>
                              </div>
                              <h4 className="font-bold text-[0.76rem] text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                                {mod.title}
                              </h4>
                              <p className="text-[0.65rem] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                                {mod.subtitle}
                              </p>
                            </div>

                            <div className="mt-1.5 flex items-center justify-end text-[0.65rem] font-bold text-emerald-700">
                              <span>Open</span>
                              <ChevronRight size={10} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consumer Awareness Pill */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-2 text-[0.72rem] text-amber-950 space-y-0.5">
                    <p className="font-bold flex items-center gap-1 text-amber-800">
                      <Info size={12} />
                      <span>Consumer Right: MRP Ceiling</span>
                    </p>
                    <p className="text-[0.66rem] text-slate-700 leading-tight">
                      Retailers cannot charge above printed MRP. Overcharging is punishable under Section 18 of Legal Metrology Act, 2009.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* MODULE 1: AI RULE SCANNER */}
              {activeModule === "scanner" && (
                <ConsumerMobileScanner onReportViolation={handleReportFromScanner} />
              )}

              {/* MODULE 2: MRP OVERCHARGE CHECKER */}
              {activeModule === "mrp_check" && (
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
                  <h4 className="text-[0.8rem] font-bold text-slate-900 border-b pb-1">MRP Overcharge Calculator</h4>
                  <form onSubmit={handleMrpCheck} className="space-y-2.5 text-[0.76rem]">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Printed MRP on Package (₹):</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={mrpInput}
                        onChange={(e) => setMrpInput(e.target.value)}
                        placeholder="e.g. 150.00"
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-[0.8rem]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Price Charged by Retailer (₹):</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={chargedInput}
                        onChange={(e) => setChargedInput(e.target.value)}
                        placeholder="e.g. 175.00"
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-[0.8rem]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-emerald-700 py-1.5 font-bold text-white hover:bg-emerald-800"
                    >
                      Verify Price Legality
                    </button>

                    {mrpResult && (
                      <div className="mt-2 text-[0.74rem]">
                        {mrpResult.isViolation ? (
                          <div className="border border-red-200 bg-red-50 text-red-950 p-2.5 rounded-lg space-y-1">
                            <div className="flex items-center gap-1 font-bold text-red-800">
                              <AlertTriangle size={14} />
                              <span>ILLEGAL OVERCHARGE</span>
                            </div>
                            <p>Overcharged by <b>₹{mrpResult.diff.toFixed(2)}</b> above MRP.</p>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveModule("report");
                                setReportSuccess(`Overcharge report initiated: Retailer charged ₹${chargedInput} for printed MRP ₹${mrpInput}.`);
                              }}
                              className="w-full rounded bg-red-600 py-1 text-white font-bold text-[0.7rem] mt-1"
                            >
                              Report to Helpline 1915
                            </button>
                          </div>
                        ) : (
                          <div className="border border-emerald-200 bg-emerald-50 text-emerald-950 p-2.5 rounded-lg">
                            <p className="font-bold text-emerald-800">✅ LEGAL PRICE</p>
                            <p>Charged price (₹{chargedInput}) is at or below printed MRP.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* MODULE 3: ORIGIN CHECK */}
              {activeModule === "origin_check" && (
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2 text-[0.76rem]">
                  <h4 className="font-bold text-slate-900 border-b pb-1">Country of Origin Checker</h4>
                  <p className="text-slate-600 text-[0.7rem]">
                    Sub-rule 6(10A) mandates explicit Country of Origin declaration on all imported goods & e-commerce listings.
                  </p>
                  <input
                    type="text"
                    value={originSearch}
                    onChange={(e) => setOriginSearch(e.target.value)}
                    placeholder="Search product or listing..."
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-1 text-[0.78rem]"
                  />
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-1 text-[0.7rem]">
                    <p className="font-bold text-slate-800">Imported Pack Checklist:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      <li>Country of origin explicitly declared</li>
                      <li>Name & address of importer specified</li>
                      <li>MRP declared in Indian Rupees (₹)</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* MODULE 4 & OTHERS via CitizenTabs */}
              {(activeModule === "additives" || activeModule === "report" || activeModule === "rights") && (
                <CitizenTabs />
              )}
            </div>

            {/* Native Bottom Smartphone App Navigation */}
            <div className="bg-white border-t border-slate-200 px-2 py-1.5 flex justify-around text-center text-[0.66rem] font-bold text-slate-500 shrink-0 z-50">
              <button
                onClick={() => setActiveModule("home")}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg ${
                  activeModule === "home" ? "text-emerald-700 bg-emerald-50" : "hover:text-slate-900"
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </button>

              <button
                onClick={() => setActiveModule("scanner")}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg ${
                  activeModule === "scanner" ? "text-emerald-700 bg-emerald-50" : "hover:text-slate-900"
                }`}
              >
                <Camera size={16} />
                <span>Scanner</span>
              </button>

              <button
                onClick={() => setActiveModule("mrp_check")}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg ${
                  activeModule === "mrp_check" ? "text-emerald-700 bg-emerald-50" : "hover:text-slate-900"
                }`}
              >
                <Scale size={16} />
                <span>MRP Check</span>
              </button>

              <button
                onClick={() => setActiveModule("report")}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg ${
                  activeModule === "report" ? "text-emerald-700 bg-emerald-50" : "hover:text-slate-900"
                }`}
              >
                <AlertOctagon size={16} />
                <span>Report 1915</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Full Desktop/Tablet View */
        <div className="space-y-4">
          <ConsumerMobileScanner onReportViolation={handleReportFromScanner} />
          <CitizenTabs />
        </div>
      )}
    </div>
  );
}
