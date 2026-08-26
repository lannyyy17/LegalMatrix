"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Printer,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Calendar,
  ShieldAlert,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { MeterBar } from "@/components/ui/StatTile";
import { ScoreDial } from "@/components/report/ScoreDial";
import {
  getStoredInspections,
  InspectionRecord,
} from "@/lib/store/inspectionRepository";
import {
  printOrSavePdfReport,
  exportInspectionToCsv,
} from "@/lib/utils/reportExporter";

export default function ReportPage() {
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null);

  useEffect(() => {
    const data = getStoredInspections();
    setRecords(data);
    if (data.length > 0) {
      setSelectedRecord(data[0]); // Load latest scanned record
    }
  }, []);

  if (!selectedRecord) {
    return (
      <div className="py-20 text-center space-y-3 font-sans">
        <h2 className="text-xl font-bold text-slate-800">No Inspection Records Found</h2>
        <p className="text-sm text-slate-600">Scan or upload a product to generate an official compliance report.</p>
        <Link
          href="/scan"
          className="inline-block rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-800"
        >
          Go to New Inspection / Scan
        </Link>
      </div>
    );
  }

  const isCompliant = selectedRecord.overallVerdict === "COMPLIANT";
  const score = isCompliant ? 100 : 45;
  const dateStr = new Date(selectedRecord.timestamp).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        crumb={`Enforcement › Inspection Report › ${selectedRecord.id}`}
        title={`${selectedRecord.productName}`}
        intro={`${selectedRecord.id} · Brand: ${selectedRecord.brand} · Inspected ${dateStr} by ${selectedRecord.inspectorName}`}
        actions={
          <div className="flex items-center gap-2">
            {records.length > 1 && (
              <select
                onChange={(e) => {
                  const rec = records.find((r) => r.id === e.target.value);
                  if (rec) setSelectedRecord(rec);
                }}
                value={selectedRecord.id}
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                {records.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.id} — {r.productName.slice(0, 25)}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={() => printOrSavePdfReport(selectedRecord)}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              <Printer size={14} />
              <span>Export PDF Certificate</span>
            </button>

            <button
              onClick={() => exportInspectionToCsv([selectedRecord])}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <FileSpreadsheet size={14} className="text-emerald-700" />
              <span>Export CSV</span>
            </button>
          </div>
        }
      />

      {/* Compliance Score & Dimensions */}
      <div className="grid gap-4 xl:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <ScoreDial score={score} />
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500">
                Compliance Score
              </p>
              <p className="my-1">
                <Chip tone={isCompliant ? "ok" : "bad"}>
                  {isCompliant ? "LAW COMPLIANT" : "ILLEGAL / DEFECTIVE PACK"}
                </Chip>
              </p>
              <p className="text-[0.82rem] text-slate-600 font-medium">
                Enforcement Risk: <b className="font-mono text-slate-900">{isCompliant ? "Low (10)" : "High (85)"}</b>
              </p>
            </div>
          </div>
        </Card>

        <Card
          title="Score by Dimension"
          subtitle="Evaluated against Legal Metrology Rules, 2011"
          className="xl:col-span-3"
        >
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 text-xs">
            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Mandatory Rule 6 Declarations</span>
                <b className="font-mono text-slate-900">{selectedRecord.violationsSummary.length === 0 ? "100%" : "65%"}</b>
              </div>
              <MeterBar value={selectedRecord.violationsSummary.length === 0 ? 100 : 65} tone={selectedRecord.violationsSummary.length === 0 ? undefined : "bad"} />
              <p className="text-[0.7rem] text-slate-500 mt-0.5">Generic Name, Net Qty, MRP, Packing Date, Mfg Address, Origin, Consumer Care</p>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Rule 18 Unit Symbol Standardization</span>
                <b className="font-mono text-slate-900">{selectedRecord.declarations.unitSymbol.compliant ? "100%" : "0%"}</b>
              </div>
              <MeterBar value={selectedRecord.declarations.unitSymbol.compliant ? 100 : 0} tone={selectedRecord.declarations.unitSymbol.compliant ? undefined : "bad"} />
              <p className="text-[0.7rem] text-slate-500 mt-0.5">Legal metric symbols ('g', 'kg', 'L', 'ml') vs illegal 'gms'</p>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Rule 6(1)(e) MRP Tax Format</span>
                <b className="font-mono text-slate-900">{selectedRecord.declarations.mrp.compliant ? "100%" : "40%"}</b>
              </div>
              <MeterBar value={selectedRecord.declarations.mrp.compliant ? 100 : 40} tone={selectedRecord.declarations.mrp.compliant ? undefined : "bad"} />
              <p className="text-[0.7rem] text-slate-500 mt-0.5">Explicit "incl. of all taxes" tax declaration format</p>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Rule 7 PDP Font Height Legibility</span>
                <b className="font-mono text-slate-900">{selectedRecord.pdpFontHeightMm >= selectedRecord.minFontHeightRequiredMm ? "100%" : "50%"}</b>
              </div>
              <MeterBar value={selectedRecord.pdpFontHeightMm >= selectedRecord.minFontHeightRequiredMm ? 100 : 50} tone={selectedRecord.pdpFontHeightMm >= selectedRecord.minFontHeightRequiredMm ? undefined : "warn"} />
              <p className="text-[0.7rem] text-slate-500 mt-0.5">Measured height ({selectedRecord.pdpFontHeightMm}mm) vs legal minimum ({selectedRecord.minFontHeightRequiredMm}mm)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Evidence Viewer & Findings */}
      <div className="grid gap-4 xl:grid-cols-12">
        {/* Left Column: Uploaded Image Evidence Viewer */}
        <div className="xl:col-span-5 space-y-3">
          <Card title="Uploaded Evidence Photo" subtitle="High-resolution packaging audit frame">
            <div className="relative rounded-xl border border-slate-300 bg-slate-950 overflow-hidden flex items-center justify-center min-h-[300px] shadow-inner">
              {selectedRecord.image ? (
                <img
                  src={selectedRecord.image}
                  alt={selectedRecord.productName}
                  className="max-h-[360px] w-auto object-contain"
                />
              ) : (
                <div className="text-center p-8 text-slate-400">
                  <ImageIcon size={36} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No packaging photo attached</p>
                </div>
              )}

              <div className="absolute top-2 left-2 rounded bg-slate-900/80 px-2 py-1 text-[0.66rem] font-bold text-white backdrop-blur-xs">
                PDP Area: 168 cm² • 11.42 px/mm
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-700 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <p className="font-bold text-slate-900">Inspector Verification Note:</p>
              <p className="text-slate-600">{selectedRecord.evidenceNotes || "Photographed and verified under Section 15 of Legal Metrology Act, 2009."}</p>
            </div>
          </Card>
        </div>

        {/* Right Column: Rule Findings Checklist */}
        <div className="xl:col-span-7 space-y-3">
          <Card
            title="Legal Metrology Findings & Rule Audit"
            subtitle={`7 mandatory rules evaluated • ${selectedRecord.violationsSummary.length} violations detected`}
          >
            {selectedRecord.violationsSummary.length > 0 ? (
              <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-950 space-y-2 mb-3">
                <div className="flex items-center gap-2 font-bold text-red-800 text-xs">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>Defects Identified ({selectedRecord.violationsSummary.length})</span>
                </div>
                <ul className="list-disc pl-5 text-xs space-y-1 text-slate-800">
                  {selectedRecord.violationsSummary.map((v, i) => (
                    <li key={i} className="font-medium leading-tight">{v}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-950 space-y-1 mb-3">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-xs">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>All 7 Mandatory Declarations Law Compliant</span>
                </div>
                <p className="text-xs text-slate-700">No violations detected on packaging label under Legal Metrology Rules, 2011.</p>
              </div>
            )}

            {/* Declarations Table */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-900 border-b pb-1">Mandatory Declarations Breakdown:</h4>

              <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">1. Generic Commodity Name</span>
                <span className="font-semibold text-slate-900 max-w-[260px] truncate">{selectedRecord.declarations.genericName.value}</span>
              </div>

              <div className={`p-2 rounded border flex flex-col gap-0.5 ${selectedRecord.declarations.unitSymbol.compliant ? "bg-slate-50 border-slate-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">2. Net Quantity & Symbol</span>
                  <span className={`font-bold ${selectedRecord.declarations.unitSymbol.compliant ? "text-emerald-700" : "text-red-700"}`}>
                    {selectedRecord.declarations.netQty.value}
                  </span>
                </div>
                {selectedRecord.declarations.unitSymbol.note && (
                  <span className="text-[0.66rem] font-bold text-red-700">⚠️ {selectedRecord.declarations.unitSymbol.note}</span>
                )}
              </div>

              <div className={`p-2 rounded border flex flex-col gap-0.5 ${selectedRecord.declarations.mrp.compliant ? "bg-slate-50 border-slate-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">3. Maximum Retail Price (MRP)</span>
                  <span className="font-semibold text-slate-900 max-w-[260px] truncate">{selectedRecord.declarations.mrp.value}</span>
                </div>
                {selectedRecord.declarations.mrp.note && (
                  <span className="text-[0.66rem] font-bold text-red-700">⚠️ {selectedRecord.declarations.mrp.note}</span>
                )}
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">4. Month & Year of Packing</span>
                <span className="font-semibold text-slate-900">{selectedRecord.declarations.mfgDate.value}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">5. Manufacturer Address</span>
                <span className="font-semibold text-slate-900 max-w-[260px] truncate">{selectedRecord.declarations.mfgAddress.value}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">6. Country of Origin</span>
                <span className="font-semibold text-slate-900">{selectedRecord.declarations.countryOfOrigin.value}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
