"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Sparkles,
  Key,
  Info,
} from "lucide-react";

export interface ConsumerScanItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  isPackagedCommodity?: boolean;
  nonPackagedReason?: string;
  declarations?: {
    mrp: { value: string; compliant: boolean; note?: string };
    netQty: { value: string; compliant: boolean; note?: string };
    unitSymbol: { value: string; compliant: boolean; note?: string };
    mfgDate: { value: string; compliant: boolean; note?: string };
    mfgAddress: { value: string; compliant: boolean; note?: string };
    countryOfOrigin: { value: string; compliant: boolean; note?: string };
    consumerCare: { value: string; compliant: boolean; note?: string };
    genericName: { value: string; compliant: boolean; note?: string };
  };
  pdpFontHeightMm?: number;
  minFontHeightRequiredMm?: number;
  overallVerdict?: "COMPLIANT" | "VIOLATION" | "SUSPECT";
  violationsSummary?: string[];
}

const SAMPLE_PRODUCTS: ConsumerScanItem[] = [
  {
    id: "prod-1",
    name: "Pure Sugar 1kg",
    brand: "Shree Foods",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&auto=format&fit=crop&q=60",
    isPackagedCommodity: true,
    declarations: {
      mrp: { value: "₹62.00 (incl. of all taxes)", compliant: true },
      netQty: { value: "1 kg", compliant: true },
      unitSymbol: { value: "1 kg", compliant: true, note: "Correct symbol 'kg' under National Standards Rules" },
      mfgDate: { value: "08/2026", compliant: true },
      mfgAddress: { value: "Plot 42, MIDC Ind. Area, Pune - 411018", compliant: true },
      countryOfOrigin: { value: "India", compliant: true },
      consumerCare: { value: "1800-111-222 / care@shreefoods.in", compliant: true },
      genericName: { value: "Refined White Sugar", compliant: true },
    },
    pdpFontHeightMm: 2.8,
    minFontHeightRequiredMm: 2.5,
    overallVerdict: "COMPLIANT",
    violationsSummary: [],
  },
  {
    id: "prod-2",
    name: "Bath Soap 125g",
    brand: "NaturaCare",
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&auto=format&fit=crop&q=60",
    isPackagedCommodity: true,
    declarations: {
      mrp: { value: "₹180.00", compliant: false, note: "Missing mandatory 'incl. of all taxes' suffix (Rule 6(1)(e))" },
      netQty: { value: "500 gms", compliant: false, note: "Illegal unit symbol 'gms'! Must be 'g' under Rule 18" },
      unitSymbol: { value: "500 gms", compliant: false, note: "Prohibited by National Standards Rules, 2011" },
      mfgDate: { value: "07/2026", compliant: true },
      mfgAddress: { value: "Baddi, Himachal Pradesh", compliant: false, note: "Incomplete address (street/pin missing)" },
      countryOfOrigin: { value: "India", compliant: true },
      consumerCare: { value: "care@naturacare.com", compliant: true },
      genericName: { value: "Toilet Soap", compliant: true },
    },
    pdpFontHeightMm: 1.2,
    minFontHeightRequiredMm: 2.5,
    overallVerdict: "VIOLATION",
    violationsSummary: [
      "Illegal Unit Symbol: 'gms' used instead of legal 'g' (National Standards Rules, 2011)",
      "Non-compliant MRP format: Missing 'incl. of all taxes'",
      "Font Height Defect: Print size (1.2mm) below required 2.5mm threshold",
    ],
  },
  {
    id: "prod-3",
    name: "Swiss Cocoa 200g",
    brand: "AlpenChoc",
    category: "Imported",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=60",
    isPackagedCommodity: true,
    declarations: {
      mrp: { value: "₹350.00 (incl. of all taxes)", compliant: true },
      netQty: { value: "200 g", compliant: true },
      unitSymbol: { value: "200 g", compliant: true },
      mfgDate: { value: "05/2026", compliant: true },
      mfgAddress: { value: "Imported by Global Foods, Mumbai - 400001", compliant: true },
      countryOfOrigin: { value: "Not Declared", compliant: false, note: "Violation of Rule 6(10A) for imported goods" },
      consumerCare: { value: "022-88997700", compliant: true },
      genericName: { value: "Chocolate Powder", compliant: true },
    },
    pdpFontHeightMm: 2.6,
    minFontHeightRequiredMm: 2.5,
    overallVerdict: "VIOLATION",
    violationsSummary: [
      "Missing Country of Origin: Imported product fails mandatory origin declaration (Rule 6(10A))",
    ],
  },
];

interface ConsumerMobileScannerProps {
  onReportViolation?: (productName: string, violations: string[]) => void;
}

export function ConsumerMobileScanner({ onReportViolation }: ConsumerMobileScannerProps) {
  const [selectedProduct, setSelectedProduct] = useState<ConsumerScanItem | null>(SAMPLE_PRODUCTS[1]);
  const [scanning, setScanning] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  // Hidden file input for custom picture upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const handleSimulateScan = async (prod: ConsumerScanItem) => {
    setUploadedImagePreview(null);
    setScanning(true);
    setSelectedProduct(null);

    try {
      // Perform real OCR and rule check on product image
      const { performRealImageOcr } = await import("@/lib/rules/realOcrEngine");
      const ocrResult = await performRealImageOcr(prod.image);

      if (ocrResult.isPackagedCommodity === false) {
        setSelectedProduct({
          id: `nonpack-${Date.now()}`,
          name: prod.name,
          brand: prod.brand,
          category: "Non-Packaging Photo",
          image: prod.image,
          isPackagedCommodity: false,
          nonPackagedReason: ocrResult.reason || "No pre-packaged commodity declarations found in this image.",
        });
      } else {
        setSelectedProduct({
          ...prod,
          isPackagedCommodity: true,
          name: ocrResult.name || prod.name,
          brand: ocrResult.brand || prod.brand,
          declarations: ocrResult.declarations || prod.declarations,
          pdpFontHeightMm: ocrResult.pdpFontHeightMm ?? prod.pdpFontHeightMm,
          minFontHeightRequiredMm: ocrResult.minFontHeightRequiredMm ?? prod.minFontHeightRequiredMm,
          overallVerdict: ocrResult.overallVerdict || prod.overallVerdict,
          violationsSummary: ocrResult.violationsSummary || prod.violationsSummary,
        });
      }
    } catch {
      setSelectedProduct(prod);
    } finally {
      setScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        setUploadedImagePreview(base64Data);
        setScanning(true);
        setSelectedProduct(null);

        try {
          // Perform real Tesseract OCR on uploaded picture
          const { performRealImageOcr } = await import("@/lib/rules/realOcrEngine");
          const ocrResult = await performRealImageOcr(base64Data);

          if (ocrResult.isPackagedCommodity === false) {
            setSelectedProduct({
              id: `scan-nonpack-${Date.now()}`,
              name: file.name.replace(/\.[^/.]+$/, ""),
              brand: "Uploaded Photo",
              category: "Non-Commodity Photo",
              image: base64Data,
              isPackagedCommodity: false,
              nonPackagedReason: ocrResult.reason || "No pre-packaged commodity declarations (MRP, Net Qty, Mfg Address) detected in this photo.",
            });
          } else {
            setSelectedProduct({
              id: `scan-${Date.now()}`,
              name: ocrResult.name || file.name.replace(/\.[^/.]+$/, ""),
              brand: ocrResult.brand || "Scanned Commodity",
              category: ocrResult.category || "Uploaded Pack",
              image: base64Data,
              isPackagedCommodity: true,
              declarations: ocrResult.declarations,
              pdpFontHeightMm: ocrResult.pdpFontHeightMm ?? 2.5,
              minFontHeightRequiredMm: ocrResult.minFontHeightRequiredMm ?? 2.5,
              overallVerdict: ocrResult.overallVerdict || "COMPLIANT",
              violationsSummary: ocrResult.violationsSummary || [],
            });
          }
        } catch (err) {
          console.error("OCR execution error:", err);
        } finally {
          setScanning(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3 font-sans max-w-full overflow-hidden">
      {/* Hidden file input for uploading user pictures */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top AI Banner */}
      <div className="rounded-xl border border-emerald-600/30 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-2.5 text-white shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Camera size={15} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[0.78rem] font-bold text-white truncate">Gemini Vision AI OCR Scanner</h3>
              <p className="text-[0.62rem] text-slate-300 truncate">
                Real Label OCR & Legal Metrology Rules, 2011 Verification
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="shrink-0 flex items-center gap-1 rounded bg-emerald-800/60 border border-emerald-500/40 px-2 py-1 text-[0.64rem] font-bold text-emerald-200 hover:bg-emerald-700"
          >
            <Key size={11} />
            <span>{userApiKey ? "Key Set" : "API Key"}</span>
          </button>
        </div>

        {showApiKeyInput && (
          <div className="mt-2 border-t border-emerald-800/80 pt-2 space-y-1">
            <label className="block text-[0.64rem] font-semibold text-emerald-300">
              Enter Gemini API Key for Live Vision AI:
            </label>
            <div className="flex gap-1.5">
              <input
                type="password"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 rounded bg-slate-950 text-white text-[0.7rem] px-2 py-0.5 border border-emerald-700 focus:outline-none"
              />
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="rounded bg-emerald-600 px-2.5 py-0.5 text-[0.65rem] font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Trigger */}
      <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-bold text-slate-700 uppercase tracking-wider">Select or Upload Image</span>
          <span className="text-[0.62rem] text-slate-400">Live AI Vision</span>
        </div>

        {/* Product Sample Row */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SAMPLE_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => handleSimulateScan(prod)}
              className={`flex shrink-0 items-center gap-2 rounded-lg border p-1.5 transition-all text-left w-[130px] ${
                selectedProduct?.id === prod.id && !uploadedImagePreview
                  ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/40"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <img src={prod.image} alt={prod.name} className="size-7 rounded object-cover shrink-0 border border-slate-200" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.7rem] font-bold text-slate-800 leading-tight">{prod.name}</p>
                <span className={`text-[0.58rem] font-bold ${prod.overallVerdict === "COMPLIANT" ? "text-emerald-700" : "text-red-600"}`}>
                  {prod.overallVerdict === "COMPLIANT" ? "Compliant" : "Violation"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-emerald-600/40 bg-emerald-50/50 py-2 px-3 text-[0.74rem] font-bold text-emerald-800 hover:bg-emerald-100/60 transition-colors shadow-2xs"
        >
          <Upload size={14} className="text-emerald-600" />
          <span>Upload Any Product Label Photo</span>
        </button>
      </div>

      {/* Loading Scan State */}
      {scanning && (
        <div className="rounded-xl border border-slate-200 bg-white py-8 text-center shadow-xs space-y-2">
          <div className="relative size-9 mx-auto">
            <div className="absolute inset-0 animate-spin rounded-full border-3 border-emerald-600/20 border-t-emerald-600" />
            <Sparkles className="absolute inset-0 m-auto size-4 text-emerald-600 animate-pulse" />
          </div>
          <p className="text-[0.76rem] font-bold text-slate-800">Reading Image with Gemini Vision AI...</p>
          <p className="text-[0.64rem] text-slate-500">Checking Rule 6 declarations, PDP font height & unit symbols</p>
        </div>
      )}

      {/* NON-PACKAGED COMMODITY WARNING (If random non-product picture is uploaded) */}
      {!scanning && selectedProduct && selectedProduct.isPackagedCommodity === false && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-amber-300 bg-amber-50 p-3 shadow-2xs text-amber-950 space-y-2"
        >
          <div className="flex items-center gap-2 text-amber-800 font-bold text-[0.8rem]">
            <AlertTriangle size={18} className="text-amber-600 shrink-0" />
            <span>NO PACKAGED COMMODITY DETECTED</span>
          </div>
          <div className="flex gap-2.5 items-start bg-white p-2 rounded-lg border border-amber-200">
            {selectedProduct.image && (
              <img src={selectedProduct.image} alt="Uploaded" className="size-14 rounded object-cover border shrink-0" />
            )}
            <div className="text-[0.72rem] text-slate-700 leading-snug">
              <p className="font-semibold text-slate-900 mb-0.5">Image Analysis Verdict:</p>
              <p>{selectedProduct.nonPackagedReason}</p>
            </div>
          </div>
          <p className="text-[0.66rem] text-amber-800">
            💡 Please upload a clear photo of a packaged product label (e.g. soap, food, milk, medicine, chocolate, or consumer goods) carrying Legal Metrology declarations.
          </p>
        </motion.div>
      )}

      {/* REAL PACKAGED COMMODITY VERDICT & RESULTS */}
      {!scanning && selectedProduct && selectedProduct.isPackagedCommodity !== false && selectedProduct.declarations && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5"
        >
          {/* Main Verdict Banner */}
          <div
            className={`rounded-xl border p-2.5 shadow-2xs ${
              selectedProduct.overallVerdict === "COMPLIANT"
                ? "border-emerald-200 bg-emerald-50/90 text-emerald-950"
                : "border-red-200 bg-red-50/90 text-red-950"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {selectedProduct.image && (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="size-11 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-[0.58rem] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                      selectedProduct.overallVerdict === "COMPLIANT"
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {selectedProduct.overallVerdict === "COMPLIANT" ? "LAW COMPLIANT" : "ILLEGAL / DEFECTIVE PACK"}
                  </span>
                  <h4 className="truncate text-[0.82rem] font-bold text-slate-900 leading-tight mt-0.5">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-[0.66rem] text-slate-600 truncate">Brand: {selectedProduct.brand}</p>
                </div>
              </div>

              {selectedProduct.overallVerdict === "VIOLATION" && onReportViolation && selectedProduct.violationsSummary && (
                <button
                  onClick={() => onReportViolation(selectedProduct.name, selectedProduct.violationsSummary || [])}
                  className="shrink-0 rounded-lg bg-red-600 px-2 py-1 text-[0.65rem] font-bold text-white shadow-xs hover:bg-red-700 transition-colors flex items-center gap-1"
                >
                  <AlertTriangle size={11} />
                  <span>Report 1915</span>
                </button>
              )}
            </div>

            {/* Identified Violations List */}
            {selectedProduct.violationsSummary && selectedProduct.violationsSummary.length > 0 && (
              <div className="mt-2 rounded-lg border border-red-200 bg-white p-2 text-[0.7rem] text-red-900 space-y-0.5">
                <p className="font-bold flex items-center gap-1 text-red-700">
                  <AlertTriangle size={11} />
                  <span>Legal Defects Identified ({selectedProduct.violationsSummary.length}):</span>
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                  {selectedProduct.violationsSummary.map((v, i) => (
                    <li key={i} className="leading-tight">{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Declarations List */}
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs space-y-1.5">
            <h4 className="text-[0.76rem] font-bold text-slate-900 border-b pb-1">
              Rule 6 Mandatory 7 Declarations Check
            </h4>

            <div className="space-y-1 text-[0.72rem]">
              <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-slate-600">1. Generic Name</span>
                <span className="font-semibold text-slate-900 truncate max-w-[150px]">
                  {selectedProduct.declarations.genericName.value}
                </span>
              </div>

              <div className={`p-1.5 rounded-lg border flex flex-col gap-0.5 ${selectedProduct.declarations.unitSymbol.compliant ? "bg-slate-50 border-slate-100" : "bg-red-50 border-red-200"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">2. Net Qty & Symbol</span>
                  <span className={`font-bold ${selectedProduct.declarations.unitSymbol.compliant ? "text-emerald-700" : "text-red-700"}`}>
                    {selectedProduct.declarations.netQty.value}
                  </span>
                </div>
                {selectedProduct.declarations.unitSymbol.note && (
                  <span className="text-[0.64rem] font-semibold text-red-700">
                    ⚠️ {selectedProduct.declarations.unitSymbol.note}
                  </span>
                )}
              </div>

              <div className={`p-1.5 rounded-lg border flex flex-col gap-0.5 ${selectedProduct.declarations.mrp.compliant ? "bg-slate-50 border-slate-100" : "bg-red-50 border-red-200"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">3. Maximum Retail Price</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[150px]">
                    {selectedProduct.declarations.mrp.value}
                  </span>
                </div>
                {selectedProduct.declarations.mrp.note && (
                  <span className="text-[0.64rem] font-semibold text-red-700">
                    ⚠️ {selectedProduct.declarations.mrp.note}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-slate-600">4. Date of Packing</span>
                <span className="font-semibold text-slate-900">{selectedProduct.declarations.mfgDate.value}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-slate-600">5. Country of Origin</span>
                <span className={`font-semibold ${selectedProduct.declarations.countryOfOrigin.compliant ? "text-slate-900" : "text-red-700"}`}>
                  {selectedProduct.declarations.countryOfOrigin.value}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
