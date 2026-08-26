"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search,
  FileSpreadsheet,
  FileCode,
  Printer,
  X,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Building2,
  UserCheck,
  PackageCheck,
} from "lucide-react";
import {
  InspectionRecord,
  getStoredInspections,
  searchInspections,
} from "@/lib/store/inspectionRepository";
import {
  exportInspectionToCsv,
  exportInspectionToJson,
  printOrSavePdfReport,
} from "@/lib/utils/reportExporter";

interface InspectionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InspectionHistoryModal({ isOpen, onClose }: InspectionHistoryModalProps) {
  const [query, setQuery] = useState("");
  const [filterVerdict, setFilterVerdict] = useState<"ALL" | "COMPLIANT" | "VIOLATION">("ALL");
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      const data = searchInspections(query, filterVerdict);
      setRecords(data);
      if (data.length > 0 && !selectedRecord) {
        setSelectedRecord(data[0]);
      }
    }
  }, [isOpen, query, filterVerdict]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="flex h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-2xl overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <PackageCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Inspection Repository & Audit Records
              </h2>
              <p className="text-xs text-slate-400">
                Search, retrieve, and export legal metrology compliance certificates & evidence logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportInspectionToCsv(records)}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-950/60 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-800 transition-colors"
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => exportInspectionToJson(records)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <FileCode size={14} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-6 py-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product name, brand, inspection ID, category, or inspector..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Filter Verdict:</span>
            <div className="flex rounded-lg border border-slate-700 bg-slate-950 p-1">
              {(["ALL", "COMPLIANT", "VIOLATION"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setFilterVerdict(v)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                    filterVerdict === v
                      ? v === "COMPLIANT"
                        ? "bg-emerald-600 text-white"
                        : v === "VIOLATION"
                        ? "bg-red-600 text-white"
                        : "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Inspection List */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto p-4 space-y-2.5">
            {records.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No inspection records match your search criteria.
              </div>
            ) : (
              records.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className={`cursor-pointer rounded-xl border p-3 transition-all ${
                    selectedRecord?.id === rec.id
                      ? "border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50"
                      : "border-slate-800 bg-slate-950/60 hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.68rem] font-bold text-slate-400">{rec.id}</span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[0.62rem] font-extrabold uppercase ${
                            rec.overallVerdict === "COMPLIANT"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {rec.overallVerdict}
                        </span>
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-white truncate max-w-[240px]">
                        {rec.productName}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{rec.brand}</p>
                    </div>

                    <div className="text-right text-[0.66rem] text-slate-400">
                      {new Date(rec.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Record Details & PDF Export */}
          <div className="md:col-span-7 overflow-y-auto p-6 bg-slate-950/40 space-y-4">
            {selectedRecord ? (
              <>
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400">{selectedRecord.id}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{selectedRecord.productName}</h3>
                    <p className="text-xs text-slate-400">Brand: {selectedRecord.brand} • {selectedRecord.category}</p>
                  </div>

                  <button
                    onClick={() => printOrSavePdfReport(selectedRecord)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
                  >
                    <Printer size={15} />
                    <span>Print PDF Certificate</span>
                  </button>
                </div>

                {/* Verdict Box */}
                <div
                  className={`rounded-xl border p-3.5 ${
                    selectedRecord.overallVerdict === "COMPLIANT"
                      ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-200"
                      : "border-red-500/30 bg-red-950/30 text-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm flex items-center gap-2">
                      {selectedRecord.overallVerdict === "COMPLIANT" ? (
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      ) : (
                        <AlertTriangle size={18} className="text-red-400" />
                      )}
                      Inspection Verdict: {selectedRecord.overallVerdict === "COMPLIANT" ? "LAW COMPLIANT" : "ILLEGAL / DEFECTIVE PACK"}
                    </span>
                    {selectedRecord.penaltyAmountInr && selectedRecord.penaltyAmountInr > 0 ? (
                      <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                        Penalty: ₹{selectedRecord.penaltyAmountInr.toLocaleString("en-IN")}
                      </span>
                    ) : null}
                  </div>

                  {selectedRecord.violationsSummary.length > 0 && (
                    <div className="mt-3 border-t border-red-500/20 pt-2.5 space-y-1">
                      <p className="text-xs font-bold text-red-300">Identified Rule Violations:</p>
                      <ul className="list-disc pl-5 text-xs space-y-0.5 text-red-200">
                        {selectedRecord.violationsSummary.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Declarations Checklist */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                    Rule 6 Mandatory 7 Declarations Audit
                  </h4>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">1. Generic Name:</span>
                      <span className="font-semibold text-white">{selectedRecord.declarations.genericName.value}</span>
                    </div>

                    <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">2. Net Qty & Symbol:</span>
                      <span className={`font-bold ${selectedRecord.declarations.unitSymbol.compliant ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedRecord.declarations.netQty.value}
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">3. Maximum Retail Price:</span>
                      <span className={`font-semibold ${selectedRecord.declarations.mrp.compliant ? "text-white" : "text-red-400"}`}>
                        {selectedRecord.declarations.mrp.value}
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">4. Mfg / Packing Date:</span>
                      <span className="font-semibold text-white">{selectedRecord.declarations.mfgDate.value}</span>
                    </div>

                    <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">5. Manufacturer Address:</span>
                      <span className="font-semibold text-white truncate max-w-[280px]">{selectedRecord.declarations.mfgAddress.value}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence Notes & Photos */}
                {selectedRecord.evidenceNotes && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-slate-400 flex items-center gap-1.5">
                      <FileText size={14} className="text-emerald-400" />
                      <span>Inspector Evidence Notes:</span>
                    </p>
                    <p>{selectedRecord.evidenceNotes}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center text-slate-500 text-sm">
                Select an inspection record to view compliance details & PDF certificate.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
