"use client";

import { useState, useRef } from "react";
import { Camera, Upload, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, FileText, Printer, Scale, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { PipelineRunner } from "@/components/scan/PipelineRunner";
import { INSPECTION } from "@/lib/data/inspection";
import { performRealImageOcr, RealOcrScanResult } from "@/lib/rules/realOcrEngine";
import { saveInspectionRecord } from "@/lib/store/inspectionRepository";
import { printOrSavePdfReport } from "@/lib/utils/reportExporter";

interface CapturedPanel {
  id: string;
  title: string;
  imagePreview: string | null;
  status: "pending" | "captured" | "error";
  note: string;
}

export default function ScanPage() {
  const [panels, setPanels] = useState<CapturedPanel[]>([
    { id: "front", title: "Front Panel (PDP)", imagePreview: null, status: "pending", note: "Upload front label" },
    { id: "back", title: "Back Panel (Declarations)", imagePreview: null, status: "pending", note: "Upload declaration block" },
    { id: "side", title: "Side Panel (Mfg/Origin)", imagePreview: null, status: "pending", note: "Upload origin/address" },
    { id: "mrp", title: "Close-up: MRP Block", imagePreview: null, status: "pending", note: "Upload MRP & tax text" },
  ]);

  const [activePanelId, setActivePanelId] = useState<string>("front");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ocrResult, setOcrResult] = useState<RealOcrScanResult | null>(null);

  const [place, setPlace] = useState<string>(INSPECTION.place);
  const [channel, setChannel] = useState<string>("Retail premises");
  const [dateVal, setDateVal] = useState<string>(INSPECTION.onDate);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePanelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Update panel image preview
        setPanels((prev) =>
          prev.map((p) =>
            p.id === activePanelId
              ? { ...p, imagePreview: base64, status: "captured", note: `${file.name.slice(0, 15)}...` }
              : p
          )
        );

        // Run real Gemini Vision AI / Tesseract OCR on uploaded panel
        setIsAnalyzing(true);
        try {
          const apiRes = await fetch("/api/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          if (apiRes.ok) {
            const data = await apiRes.json();
            if (data && data.name && data.isPackagedCommodity !== false) {
              setOcrResult(data);
            } else {
              const res = await performRealImageOcr(base64);
              setOcrResult(res);
            }
          } else {
            const res = await performRealImageOcr(base64);
            setOcrResult(res);
          }
        } catch {
          const res = await performRealImageOcr(base64);
          setOcrResult(res);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadForPanel = (panelId: string) => {
    setActivePanelId(panelId);
    fileInputRef.current?.click();
  };

  const capturedCount = panels.filter((p) => p.status === "captured").length;

  const handleSaveToRepository = () => {
    const frontPanel = panels.find((p) => p.id === "front")?.imagePreview || "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&auto=format&fit=crop&q=60";
    
    const record = {
      id: `INSP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      productName: ocrResult?.name || "Scanned Commodity Pack",
      brand: ocrResult?.brand || "Inspected Brand",
      category: ocrResult?.category || "Packaged Product",
      image: frontPanel,
      inspectorName: "Inspector Rajesh Sharma",
      inspectorId: "LM-OFF-402",
      role: "Senior Legal Metrology Officer",
      declarations: ocrResult?.declarations || {
        genericName: { value: "Consumer Commodity", compliant: true },
        netQty: { value: "500 g", compliant: true },
        unitSymbol: { value: "500 g", compliant: true },
        mrp: { value: "₹180.00 (incl. of all taxes)", compliant: true },
        mfgDate: { value: "08/2026", compliant: true },
        mfgAddress: { value: "Registered Industrial Estate, City Area", compliant: true },
        countryOfOrigin: { value: "India", compliant: true },
        consumerCare: { value: "1800-111-222", compliant: true },
      },
      pdpFontHeightMm: ocrResult?.pdpFontHeightMm ?? 2.6,
      minFontHeightRequiredMm: ocrResult?.minFontHeightRequiredMm ?? 2.5,
      overallVerdict: ocrResult?.overallVerdict || "COMPLIANT",
      violationsSummary: ocrResult?.violationsSummary || [],
      evidenceNotes: `Official inspection recorded at ${place} (${channel}). Calibration: 11.42 px/mm. PDP Area: 168 cm².`,
      penaltyAmountInr: ocrResult?.overallVerdict === "VIOLATION" ? 25000 : 0,
    };

    saveInspectionRecord(record);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePanelUpload}
        accept="image/*"
        className="hidden"
      />

      <PageHeader
        crumb="Enforcement › New inspection"
        title="New Official Packaging Inspection"
        intro="Capture packaging panels, calibrate scale, and run real Gemini Vision AI & Tesseract OCR inspection. All photos and legal determinations are logged to the persistent Inspection Repository."
      />

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr] font-sans">
        <div className="space-y-4">
          {/* Panel Capture Card */}
          <Card
            title="1 · Interactive Panel Upload & Capture"
            subtitle="Click any panel box to upload custom packaging photos"
            right={
              <Chip tone={capturedCount > 0 ? "ok" : "warn"}>
                {capturedCount} of 4 captured
              </Chip>
            }
          >
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {panels.map((p) => (
                <button
                  key={p.id}
                  onClick={() => triggerUploadForPanel(p.id)}
                  className={`group relative flex flex-col justify-between rounded-lg border-2 border-dashed p-2 text-center transition-all ${
                    p.status === "captured"
                      ? "border-emerald-600 bg-emerald-50/60"
                      : "border-slate-300 bg-slate-50 hover:border-emerald-600 hover:bg-emerald-50/30"
                  }`}
                >
                  <div className="mb-1.5 grid h-[90px] w-full place-items-center rounded border border-slate-200 bg-white overflow-hidden">
                    {p.imagePreview ? (
                      <img src={p.imagePreview} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-emerald-700">
                        <Upload size={22} />
                        <span className="text-[0.62rem] font-bold">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <b className="block text-[0.76rem] font-bold text-slate-900 truncate">{p.title}</b>
                  <span className={`text-[0.62rem] font-semibold ${p.status === "captured" ? "text-emerald-700" : "text-slate-500"}`}>
                    {p.note}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Upload Button */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => triggerUploadForPanel("front")}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-emerald-600 bg-emerald-50/80 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <Camera size={16} className="text-emerald-600" />
                <span>📷 Upload Custom Package Label Photo</span>
              </button>
            </div>

            <hr className="my-4 border-slate-200" />

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Place of inspection:</label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Channel:</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-semibold"
                >
                  <option>Retail premises</option>
                  <option>Warehouse / Packer Godown</option>
                  <option>E-Commerce Marketplace Listing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of inspection:</label>
                <input
                  type="date"
                  value={dateVal}
                  onChange={(e) => setDateVal(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>
          </Card>

          {/* AI Analysis Loading / Results State */}
          {isAnalyzing && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-center shadow-2xs space-y-2">
              <Sparkles className="size-8 text-emerald-600 animate-spin mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">Processing Package Photo with Vision AI OCR...</h4>
              <p className="text-xs text-slate-600">Extracting Rule 6 mandatory declarations and Rule 7 font height parameters</p>
            </div>
          )}

          {/* Real Extracted OCR Results Card */}
          {ocrResult && !isAnalyzing && (
            <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <span className="text-[0.66rem] font-extrabold uppercase tracking-wider text-emerald-700">AI Vision OCR Findings</span>
                  <h3 className="text-base font-bold text-slate-900">{ocrResult.name}</h3>
                  <p className="text-xs text-slate-600">Brand: {ocrResult.brand} • Category: {ocrResult.category}</p>
                </div>
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-extrabold uppercase ${
                    ocrResult.overallVerdict === "COMPLIANT"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {ocrResult.overallVerdict === "COMPLIANT" ? "LAW COMPLIANT" : "ILLEGAL / DEFECTIVE PACK"}
                </span>
              </div>

              {/* Action Buttons: Save & Print PDF */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={handleSaveToRepository}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
                >
                  <Check size={14} />
                  <span>💾 Save to Inspection Repository</span>
                </button>

                {savedSuccess && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-300">
                    <CheckCircle2 size={14} /> Record Logged to Database!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Scale Calibration Card */}
          <Card title="2 · Scale calibration" subtitle="Required for Rule 7 measurement">
            <Callout>
              A photograph carries no absolute scale. LegalMatrix derives millimetres from a
              reference of known size in the same plane as the text, and reports every measurement
              with a tolerance band.
            </Callout>

            <div className="my-3.5 grid gap-3 sm:grid-cols-2">
              <LabelledSelect
                id="ref"
                label="Reference method"
                options={[
                  "EAN-13 barcode — nominal 37.29 mm at 100% magnification",
                  "₹5 coin placed on the pack — 23.00 mm diameter",
                  "Calibration card issued to the officer",
                  "Operator-entered pack dimensions",
                ]}
              />
              <LabelledSelect id="mag" label="Barcode magnification" options={["Detected: 92%", "Enter manually…"]} />
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.87rem]">
              <dt className="text-slate-600">Derived resolution</dt>
              <dd className="m-0 font-mono text-slate-900 font-bold">
                {INSPECTION.pxPerMm} px/mm ± {INSPECTION.pxPerMmTolerance}
              </dd>
              <dt className="text-slate-600">Plane correction</dt>
              <dd className="m-0 text-slate-900 font-semibold">Applied — front panel tilt of 7.4° corrected</dd>
              <dt className="text-slate-600">Principal display panel</dt>
              <dd className="m-0 font-mono text-slate-900 font-bold">
                {INSPECTION.panelAreaCm2} cm² — Rule 7(4), rectangular pack
              </dd>
              <dt className="text-slate-600">Measurement confidence</dt>
              <dd className="m-0">
                <Chip tone="warn">Moderate — soft focus on side panel</Chip>
              </dd>
            </dl>
          </Card>

          {/* Pipeline Execution Runner */}
          <Card title="3 · Run Pipeline Analysis">
            <PipelineRunner />
          </Card>
        </div>

        {/* Right Guidance Sidebar */}
        <Card title="Capture guidance" subtitle="What makes a photograph usable">
          <ul className="space-y-2.5 text-[0.88rem] text-slate-800 leading-snug">
            <li>
              <b>Fill the frame with the panel.</b> Cropping in software after the fact loses the
              resolution the height measurement depends on.
            </li>
            <li>
              <b>Keep the reference object flat against the pack.</b> A coin held above the surface
              sits in a different plane and corrupts the scale.
            </li>
            <li>
              <b>Shoot square to the panel.</b> We correct for tilt, but correction widens the
              tolerance band, and a wide band means more findings go to manual review.
            </li>
            <li>
              <b>Avoid direct flash on glossy laminate.</b> Specular highlights destroy the small
              print exactly where the declarations usually sit.
            </li>
            <li>
              <b>Capture every panel, not just the front.</b> A declaration we never photographed is
              reported as &ldquo;not detected&rdquo;, not as missing — but that still costs the
              officer a second visit.
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}

function LabelledSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8rem] font-bold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-semibold"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
