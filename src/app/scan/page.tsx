"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconCamera,
  IconQrCode,
  IconCheckCircle,
  IconXCircle,
  IconAlertTriangle,
  IconShieldAlert,
  IconDownload,
  IconFileSpreadsheet,
  IconInfo,
  IconSave,
  IconArrowRight,
  IconSlidersHorizontal,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Sample pre-loaded scan specimens
const SAMPLE_SPECIMENS = [
  {
    id: "SPEC-01",
    name: "PureFlow Mineral Water 500ml",
    category: "Food & Beverages",
    barcode: "8901030829104",
    status: "COMPLIANT",
    packageArea: 110,
    requiredFontMm: 2.5,
    measuredFontMm: 2.6,
    mrp: "20.00",
    netQty: "500 ml",
    declarationsFound: 8,
    missingCount: 0,
    misleadingPhrases: [],
  },
  {
    id: "SPEC-02",
    name: "ProTech 10000mAh PowerBank",
    category: "Electronics",
    barcode: "8901234567890",
    status: "NON_COMPLIANT",
    packageArea: 180,
    requiredFontMm: 2.5,
    measuredFontMm: 1.6, // Font deficit
    mrp: "1,499.00 (Sticker Overlaid)",
    netQty: "1 Unit",
    declarationsFound: 6,
    missingCount: 2,
    misleadingPhrases: [
      "Sticker Re-labeling Over Original MRP ₹ 999.00",
      "Missing Country of Origin for Imported Electronic Item",
    ],
  },
  {
    id: "SPEC-03",
    name: "NutriCrunch Almond Cookies 250g",
    category: "Food & Beverages",
    barcode: "8901098765432",
    status: "UNDER_REVIEW",
    packageArea: 80,
    requiredFontMm: 1.5,
    measuredFontMm: 1.5,
    mrp: "85.00 (Taxes Extra Printed)",
    netQty: "250 g",
    declarationsFound: 7,
    missingCount: 1,
    misleadingPhrases: ["Prohibited Phrase: 'Local Taxes Extra'"],
  },
];

export default function ScanPage() {
  const [selectedSpecimen, setSelectedSpecimen] = useState(SAMPLE_SPECIMENS[1]);
  const [isScanning, setIsScanning] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [userRole, setUserRole] = useState<"INSPECTOR" | "MANUFACTURER" | "CITIZEN">("INSPECTOR");

  const handleRunScan = (specimen: typeof SAMPLE_SPECIMENS[0]) => {
    setIsScanning(true);
    setSelectedSpecimen(specimen);
    setTimeout(() => {
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar with Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Product Label Scanner & Rule Extractor
            </h1>
            <Badge variant="info" className="font-mono text-[10px]">Rule 6 & 7 AI Engine v3.2</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload packaging photographs to automatically extract Rule 6 mandatory declarations, measure Rule 7 font height, and detect misleading or missing statements.
          </p>
        </div>

        {/* Role-Based Access Control Switcher Demo */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 text-xs">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">Access Role:</span>
          <button
            onClick={() => setUserRole("INSPECTOR")}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              userRole === "INSPECTOR"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Enforcement Officer
          </button>
          <button
            onClick={() => setUserRole("MANUFACTURER")}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              userRole === "MANUFACTURER"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Packer Pre-Audit
          </button>
        </div>
      </div>

      {/* Main Scanner Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Bounding Box Overlay (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Label Specimen Photograph & OCR Layer
                </CardTitle>
                <Badge variant="neutral" className="text-[10px]">Resolution: 300 DPI</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Drag and Drop Image Dropzone */}
              <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center space-y-2 hover:bg-slate-100/50 transition-colors">
                <IconCamera className="h-8 w-8 text-blue-600 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Drag & Drop Packaging Photo or Click to Upload</p>
                  <p className="text-[10px] text-slate-500">Supports JPG, PNG, WEBP high-res label scans</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs mt-1">
                  Select Photo File
                </Button>
              </div>

              {/* Sample Label Specimen Switcher */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Test Sample Label Specimens:
                </span>
                <div className="space-y-1.5">
                  {SAMPLE_SPECIMENS.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => handleRunScan(spec)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        selectedSpecimen.id === spec.id
                          ? "border-blue-600 bg-blue-50/50 font-semibold"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="text-slate-900 font-bold block truncate">{spec.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Barcode: {spec.barcode}</span>
                      </div>
                      <Badge
                        variant={spec.status === "COMPLIANT" ? "success" : "danger"}
                        className="text-[10px] shrink-0"
                      >
                        {spec.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Bounding Box Visualizer */}
              <div className="relative rounded-xl border border-slate-200 bg-slate-900 p-4 min-h-[220px] flex flex-col justify-between overflow-hidden text-white font-mono text-xs">
                {isScanning && (
                  <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-2">
                    <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">
                      AI OCR Extracting Declarations...
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start text-[10px] text-slate-400">
                  <span>[OCR VISION LAYER ACTIVE]</span>
                  <span>CONFIDENCE: 98.4%</span>
                </div>

                {/* Overlaid Detected Text Bounding Boxes */}
                <div className="my-auto space-y-2 py-2">
                  <div className="rounded border border-emerald-400 bg-emerald-500/20 p-1.5 text-[11px] flex justify-between items-center">
                    <span className="font-semibold text-emerald-300">✓ NET QTY: {selectedSpecimen.netQty}</span>
                    <span className="text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-bold">Rule 6(1)(c)</span>
                  </div>

                  <div className={`rounded border p-1.5 text-[11px] flex justify-between items-center ${
                    selectedSpecimen.status === "COMPLIANT"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                      : "border-red-400 bg-red-500/20 text-red-300"
                  }`}>
                    <span className="font-semibold">
                      {selectedSpecimen.status === "COMPLIANT" ? "✓ STATUTORY MRP: ₹ " : "⚠ DUAL MRP / STICKER: ₹ "}
                      {selectedSpecimen.mrp}
                    </span>
                    <span className={`text-[9px] px-1 rounded font-bold ${
                      selectedSpecimen.status === "COMPLIANT" ? "bg-emerald-500 text-slate-950" : "bg-red-500 text-white"
                    }`}>Rule 6(1)(e)</span>
                  </div>

                  <div className={`rounded border p-1.5 text-[11px] flex justify-between items-center ${
                    selectedSpecimen.measuredFontMm < selectedSpecimen.requiredFontMm
                      ? "border-amber-400 bg-amber-500/20 text-amber-300"
                      : "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                  }`}>
                    <span className="font-semibold">
                      MEASURED FONT: {selectedSpecimen.measuredFontMm}mm (REQ: {selectedSpecimen.requiredFontMm}mm)
                    </span>
                    <span className="text-[9px] bg-amber-500 text-slate-950 px-1 rounded font-bold">Rule 7</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
                  <span>SPECIMEN: {selectedSpecimen.id}</span>
                  <span>AREA: {selectedSpecimen.packageArea} cm²</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Rule Extraction & Readability Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Rule 7 Font Size & Readability Analysis Widget */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Rule 7 Font Size & Readability Analysis
                  </CardTitle>
                  <CardDescription>
                    Statutory font height requirements based on principal display panel surface area
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    selectedSpecimen.measuredFontMm >= selectedSpecimen.requiredFontMm
                      ? "success"
                      : "danger"
                  }
                >
                  {selectedSpecimen.measuredFontMm >= selectedSpecimen.requiredFontMm
                    ? "Font Height Passed"
                    : "Font Size Deficit Flagged"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 font-semibold text-[10px] block uppercase">Package Display Area</span>
                  <span className="text-lg font-bold text-slate-900">{selectedSpecimen.packageArea} cm²</span>
                  <span className="text-[10px] text-slate-500 block">Category: 100 to 500 cm²</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 font-semibold text-[10px] block uppercase">Required Minimum Font</span>
                  <span className="text-lg font-bold text-blue-700">{selectedSpecimen.requiredFontMm} mm</span>
                  <span className="text-[10px] text-slate-500 block">Per Rule 7 Table 1</span>
                </div>

                <div className={`p-3 border rounded-lg ${
                  selectedSpecimen.measuredFontMm >= selectedSpecimen.requiredFontMm
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-red-50 border-red-200"
                }`}>
                  <span className="text-slate-500 font-semibold text-[10px] block uppercase">Measured OCR Font</span>
                  <span className={`text-lg font-bold ${
                    selectedSpecimen.measuredFontMm >= selectedSpecimen.requiredFontMm
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}>
                    {selectedSpecimen.measuredFontMm} mm
                  </span>
                  <span className="text-[10px] block">
                    {selectedSpecimen.measuredFontMm >= selectedSpecimen.requiredFontMm
                      ? "✓ Compliant (+0.1mm margin)"
                      : `⚠ Deficit (${(selectedSpecimen.requiredFontMm - selectedSpecimen.measuredFontMm).toFixed(1)}mm below standard)`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Misleading & Non-Standard Declaration Alert Panel */}
          {selectedSpecimen.misleadingPhrases.length > 0 && (
            <Card className="border-red-200 bg-red-50/40">
              <CardHeader className="pb-2 border-b border-red-100">
                <div className="flex items-center gap-2 text-red-900">
                  <IconAlertTriangle className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-sm font-bold">
                    Misleading / Prohibited Statutory Phrases Detected ({selectedSpecimen.misleadingPhrases.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                {selectedSpecimen.misleadingPhrases.map((phrase, idx) => (
                  <div key={idx} className="p-2.5 rounded border border-red-200 bg-white text-red-900 font-medium flex items-center justify-between">
                    <span>{phrase}</span>
                    <Badge variant="danger" className="text-[9px]">Prohibited</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Extracted Mandatory Declarations List */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Rule 6 Mandatory Disclosures Extracted ({selectedSpecimen.declarationsFound} / 8)
                  </CardTitle>
                  <CardDescription>
                    Extracted text mapped against statutory requirements under Legal Metrology Rules 2011
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setShowReportModal(true)}
                >
                  <IconDownload className="h-4 w-4 text-blue-600" />
                  Export PDF Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rule 6(1)(a) Manufacturer / Packer Name & Address</span>
                  <Badge variant="success">Extracted</Badge>
                </div>
                <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                  {selectedSpecimen.name} Industries Ltd, Plot 42 MIDC Industrial Area, Pune 411018.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rule 6(1)(c) Net Quantity & Unit Sale Price</span>
                  <Badge variant="success">Extracted</Badge>
                </div>
                <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                  Net Qty: {selectedSpecimen.netQty} | Unit Sale Price: ₹ 0.04 / ml
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rule 6(1)(e) Maximum Retail Price (MRP)</span>
                  <Badge variant={selectedSpecimen.status === "COMPLIANT" ? "success" : "danger"}>
                    {selectedSpecimen.status === "COMPLIANT" ? "Extracted" : "Violation Flagged"}
                  </Badge>
                </div>
                <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                  MRP: ₹ {selectedSpecimen.mrp}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export Printable PDF Compliance Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <IconCheckCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Statutory Compliance Audit Report
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-800">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p><span className="font-bold">Product:</span> {selectedSpecimen.name}</p>
                <p><span className="font-bold">Barcode:</span> {selectedSpecimen.barcode}</p>
                <p><span className="font-bold">Audit Status:</span> {selectedSpecimen.status}</p>
                <p><span className="font-bold">Font Height Analysis:</span> {selectedSpecimen.measuredFontMm}mm measured vs {selectedSpecimen.requiredFontMm}mm statutory requirement.</p>
              </div>
              <p className="text-slate-500 text-[11px]">
                This report is generated automatically by LegalMetrix AI OCR Engine under Section 18 of the Legal Metrology Act, 2009.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setShowReportModal(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert("PDF Compliance Audit Report downloaded to downloads folder!");
                  setShowReportModal(false);
                }}
              >
                Download Printable PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
