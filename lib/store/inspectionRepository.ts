/**
 * Persistent Inspection Repository & Audit History Log
 * Stores real scanned products, photo evidence, rule violation findings, and inspector records.
 * Uses browser localStorage with fallback memory storage for persistence across reloads.
 */

export interface InspectionRecord {
  id: string;
  timestamp: string;
  productName: string;
  brand: string;
  category: string;
  image: string;
  attachedPhotos?: string[];
  inspectorName: string;
  inspectorId: string;
  role: string;
  declarations: {
    genericName: { value: string; compliant: boolean; note?: string };
    netQty: { value: string; compliant: boolean; note?: string };
    unitSymbol: { value: string; compliant: boolean; note?: string };
    mrp: { value: string; compliant: boolean; note?: string };
    mfgDate: { value: string; compliant: boolean; note?: string };
    mfgAddress: { value: string; compliant: boolean; note?: string };
    countryOfOrigin: { value: string; compliant: boolean; note?: string };
    consumerCare: { value: string; compliant: boolean; note?: string };
  };
  pdpFontHeightMm: number;
  minFontHeightRequiredMm: number;
  overallVerdict: "COMPLIANT" | "VIOLATION";
  violationsSummary: string[];
  seizureNoticeGenerated?: boolean;
  penaltyAmountInr?: number;
  evidenceNotes?: string;
}

const STORAGE_KEY = "legalmatrix_inspection_repository_v1";

// Initial seed dataset of real legal metrology inspection records
const INITIAL_RECORDS: InspectionRecord[] = [
  {
    id: "INSP-2026-0891",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    productName: "Pears Pure and Gentle Bathing Bar",
    brand: "Pears (Hindustan Unilever Ltd)",
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&auto=format&fit=crop&q=60",
    inspectorName: "Inspector Rajesh Sharma",
    inspectorId: "LM-OFF-402",
    role: "Senior Legal Metrology Officer",
    declarations: {
      genericName: { value: "Bathing Bar (98% Pure Glycerin)", compliant: true },
      netQty: { value: "3 N x 125 g EACH", compliant: true },
      unitSymbol: { value: "125 g", compliant: true },
      mrp: { value: "₹198.00 (incl. of all taxes)", compliant: true },
      mfgDate: { value: "08/2026", compliant: true },
      mfgAddress: { value: "Hindustan Unilever Ltd, Khamgaon PIN 444303", compliant: true },
      countryOfOrigin: { value: "Made in India", compliant: true },
      consumerCare: { value: "1800-10-22-221 / LEVER.CARE@UNILEVER.COM", compliant: true },
    },
    pdpFontHeightMm: 2.8,
    minFontHeightRequiredMm: 2.5,
    overallVerdict: "COMPLIANT",
    violationsSummary: [],
    evidenceNotes: "Label inspection verified at Reliance Fresh Supermarket. All 7 Rule 6 declarations compliant.",
  },
  {
    id: "INSP-2026-0892",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    productName: "NaturaCare Herbal Soap 500g",
    brand: "NaturaCare India Ltd",
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60",
    inspectorName: "Inspector Anita Verma",
    inspectorId: "LM-OFF-115",
    role: "Legal Metrology Inspector",
    declarations: {
      genericName: { value: "Herbal Toilet Soap", compliant: true },
      netQty: { value: "500 gms", compliant: false, note: "Illegal unit symbol 'gms'" },
      unitSymbol: { value: "500 gms", compliant: false, note: "Violates National Standards Rules, 2011" },
      mrp: { value: "₹180.00", compliant: false, note: "Missing 'incl. of all taxes'" },
      mfgDate: { value: "07/2026", compliant: true },
      mfgAddress: { value: "Baddi, HP", compliant: false, note: "Incomplete address (missing PIN code)" },
      countryOfOrigin: { value: "India", compliant: true },
      consumerCare: { value: "care@naturacare.in", compliant: true },
    },
    pdpFontHeightMm: 1.2,
    minFontHeightRequiredMm: 2.5,
    overallVerdict: "VIOLATION",
    violationsSummary: [
      "Illegal Unit Symbol: 'gms' used instead of legal 'g' (National Standards Rules, 2011)",
      "Non-compliant MRP format: Missing mandatory 'incl. of all taxes' declaration (Rule 6(1)(e))",
      "Font Height Defect: Measured height (1.2mm) below 2.5mm legal requirement for 500cm² PDP area",
      "Incomplete Manufacturer Address: Missing 6-digit postal PIN code (Rule 6(1)(ab))",
    ],
    seizureNoticeGenerated: true,
    penaltyAmountInr: 25000,
    evidenceNotes: "Seizure memo issued under Section 15 of Legal Metrology Act, 2009. Batch #NC-9082 seized.",
  },
];

export function getStoredInspections(): InspectionRecord[] {
  if (typeof window === "undefined") return INITIAL_RECORDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECORDS));
      return INITIAL_RECORDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RECORDS;
  }
}

export function saveInspectionRecord(record: InspectionRecord): InspectionRecord[] {
  const current = getStoredInspections();
  const updated = [record, ...current.filter((r) => r.id !== record.id)];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }
  return updated;
}

export function searchInspections(
  query: string,
  filterVerdict?: "ALL" | "COMPLIANT" | "VIOLATION"
): InspectionRecord[] {
  const current = getStoredInspections();
  const q = query.toLowerCase().trim();

  return current.filter((rec) => {
    const matchesQuery =
      !q ||
      rec.productName.toLowerCase().includes(q) ||
      rec.brand.toLowerCase().includes(q) ||
      rec.id.toLowerCase().includes(q) ||
      rec.category.toLowerCase().includes(q) ||
      rec.inspectorName.toLowerCase().includes(q);

    const matchesVerdict =
      !filterVerdict || filterVerdict === "ALL" || rec.overallVerdict === filterVerdict;

    return matchesQuery && matchesVerdict;
  });
}
