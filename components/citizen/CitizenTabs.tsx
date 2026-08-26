"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Search,
  BookOpen,
  Send,
  Building,
  Info,
} from "lucide-react";

type Tab = "check" | "label" | "report";

const TABS: { id: Tab; label: string }[] = [
  { id: "check", label: "Check Declarations" },
  { id: "label", label: "Label Additives" },
  { id: "report", label: "Report a Pack" },
];

export function CitizenTabs() {
  const [tab, setTab] = useState<Tab>("check");

  return (
    <div className="space-y-3 font-sans">
      {/* High-Contrast Mobile Navigation Tabs */}
      <div className="flex gap-1 rounded-xl bg-slate-200/80 p-1 border border-slate-300">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg py-1.5 px-2 text-[0.74rem] font-bold transition-all text-center ${
              tab === t.id
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-800 hover:bg-slate-300/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
        {tab === "check" && <CheckPanel />}
        {tab === "label" && <LabelPanel />}
        {tab === "report" && <ReportPanel />}
      </motion.div>
    </div>
  );
}

function CheckPanel() {
  const mandatoryRules = [
    { title: "1. Generic / Common Name", note: "Must state generic commodity name", compliant: true },
    { title: "2. Net Quantity & Metric Symbol", note: "Standard metric unit symbols ('g', 'kg', 'L', 'ml')", compliant: true },
    { title: "3. Maximum Retail Price (MRP)", note: "Must state 'incl. of all taxes'", compliant: true },
    { title: "4. Packaging / Mfg Date", note: "Month & Year of packing (MM/YYYY)", compliant: true },
    { title: "5. Manufacturer / Importer Address", note: "Complete address with 6-digit PIN code", compliant: true },
    { title: "6. Country of Origin", note: "Mandatory for imported goods & e-commerce", compliant: true },
    { title: "7. Consumer Care Details", note: "Toll-free phone number and email ID", compliant: true },
  ];

  return (
    <div className="space-y-3">
      {/* What Must Be On The Pack */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
          <ShieldCheck size={16} className="text-emerald-700" />
          <h3 className="text-[0.82rem] font-bold text-slate-900">What Must Be On Every Pack</h3>
        </div>

        <p className="text-[0.72rem] font-medium text-slate-700 leading-snug">
          Every pre-packaged commodity sold in India must carry these 7 mandatory declarations under Rule 6(1) of Legal Metrology Rules, 2011:
        </p>

        <div className="space-y-1.5">
          {mandatoryRules.map((rule, index) => (
            <div key={index} className="flex items-start gap-2 rounded-lg bg-slate-50 p-2 border border-slate-200/80">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[0.76rem] font-bold text-slate-900 leading-tight">{rule.title}</h4>
                <p className="text-[0.66rem] font-medium text-slate-600 mt-0.5">{rule.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Rights Card */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 border-b border-emerald-200/80 pb-1.5">
          <Info size={16} className="text-emerald-800" />
          <h3 className="text-[0.82rem] font-bold text-emerald-950">Your Rights as a Consumer</h3>
        </div>

        <div className="space-y-2 text-[0.72rem] text-slate-800 leading-snug">
          <div className="rounded-lg bg-white p-2 border border-emerald-200">
            <b className="text-emerald-950 block mb-0.5">1. The MRP is a Ceiling Price:</b>
            <p className="text-slate-700">Retailers cannot charge above the printed Maximum Retail Price. Overcharging is punishable under Section 18 of the Legal Metrology Act, 2009.</p>
          </div>

          <div className="rounded-lg bg-white p-2 border border-emerald-200">
            <b className="text-emerald-950 block mb-0.5">2. Declared Quantity Must Match:</b>
            <p className="text-slate-700">If a package declares 1 kg, you must receive 1 kg. Shortage in net quantity is a punishable offence.</p>
          </div>

          <div className="rounded-lg bg-white p-2 border border-emerald-200">
            <b className="text-emerald-950 block mb-0.5">3. Country of Origin Disclosure:</b>
            <p className="text-slate-700">Imported products and e-commerce listings must disclose the Country of Origin under Rule 6(10A).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelPanel() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
        <BookOpen size={16} className="text-purple-700" />
        <h3 className="text-[0.82rem] font-bold text-slate-900">Food Additives &amp; INS Decoder</h3>
      </div>

      <p className="text-[0.72rem] text-slate-700 leading-snug">
        Enter or scan the ingredient list from any food package to decode INS numbers and FSSAI additive classifications:
      </p>

      <textarea
        rows={3}
        defaultValue="Rice, Iodised salt, Sunflower oil, Sodium benzoate (INS 211), Monosodium glutamate (INS 621), Tartrazine (INS 102)"
        className="w-full rounded-lg border border-slate-300 p-2 text-[0.76rem] text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
      />

      <button className="w-full rounded-lg bg-purple-700 py-1.5 text-[0.76rem] font-bold text-white hover:bg-purple-800 transition-colors shadow-2xs">
        Decode Ingredient INS Codes
      </button>

      <div className="space-y-1.5 pt-1">
        <h4 className="text-[0.74rem] font-bold text-slate-900">Decoded Additives:</h4>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-[0.7rem] space-y-1">
          <div className="flex justify-between items-center border-b pb-1">
            <span className="font-bold text-slate-900">INS 211: Sodium Benzoate</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">FSSAI Approved</span>
          </div>
          <p className="text-slate-600 text-[0.66rem]">Preservative used to inhibit mold and bacterial growth.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-[0.7rem] space-y-1">
          <div className="flex justify-between items-center border-b pb-1">
            <span className="font-bold text-slate-900">INS 621: Monosodium Glutamate (MSG)</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">FSSAI Approved</span>
          </div>
          <p className="text-slate-600 text-[0.66rem]">Flavor enhancer permitted within prescribed limits.</p>
        </div>
      </div>
    </div>
  );
}

function ReportPanel() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
        <Send size={16} className="text-red-600" />
        <h3 className="text-[0.82rem] font-bold text-slate-900">Report Non-Compliant Package</h3>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-center space-y-1 text-emerald-950">
          <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
          <h4 className="font-bold text-[0.84rem]">Report Filed Successfully</h4>
          <p className="text-[0.72rem] text-slate-700">Reference ID: <b>LM-REP-2026-8890</b></p>
          <p className="text-[0.66rem] text-emerald-800">Your complaint has been dispatched to the District Legal Metrology Inspector.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 rounded-lg bg-emerald-700 px-3 py-1 text-[0.72rem] font-bold text-white"
          >
            File Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-2 text-[0.74rem]">
          <div>
            <label className="block font-bold text-slate-800 mb-0.5">Product Name:</label>
            <input
              type="text"
              required
              placeholder="As printed on the package"
              className="w-full rounded-lg border border-slate-300 p-1.5 text-[0.76rem] text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-0.5">Brand / Manufacturer:</label>
            <input
              type="text"
              required
              placeholder="Brand name"
              className="w-full rounded-lg border border-slate-300 p-1.5 text-[0.76rem] text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-0.5">Violation Type:</label>
            <select className="w-full rounded-lg border border-slate-300 p-1.5 text-[0.76rem] text-slate-900 bg-white font-semibold">
              <option>Overcharging above printed MRP</option>
              <option>Illegal unit symbol (e.g. gms instead of g)</option>
              <option>Missing mandatory declarations</option>
              <option>Incomplete manufacturer address</option>
              <option>Missing Country of Origin</option>
              <option>Shortage in Net Quantity</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-1.5 text-[0.76rem] font-bold text-white hover:bg-red-700 transition-colors shadow-2xs"
          >
            Submit Complaint to Helpline 1915
          </button>
        </form>
      )}
    </div>
  );
}
