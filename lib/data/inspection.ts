import type {
  ChannelRow,
  ExtractedField,
  Finding,
  Measurement,
} from "@/lib/types";

export const INSPECTION = {
  id: "PKG-2026-08-14472",
  product: "Premium Basmati Rice",
  netQuantity: "500 g",
  brand: "Annapurna Select",
  category: "Food — Cereal / Rice (pre-packed)",
  entity: "Annapurna Foods Pvt. Ltd.",
  registration: "LM/TN/2019/004417",
  place: "Nilgiris Supermarket, T. Nagar, Chennai",
  officer: "R. Krishnan",
  at: "14 Aug 2026, 11:42",
  /** ISO date the inspection was carried out — drives rule selection. */
  onDate: "2026-08-14",
  score: 64,
  risk: 83,
  panelAreaCm2: 168,
  pxPerMm: 11.42,
  pxPerMmTolerance: 0.61,
} as const;

export const SCORE_DIMENSIONS = [
  { label: "Mandatory declarations present", value: 86, note: "6 of 7 required declarations located" },
  { label: "Net quantity declaration", value: 72, note: "Present; character height below threshold" },
  { label: "Retail sale price", value: 55, note: "Prominence conflict with promotional price" },
  { label: "Manufacturer information", value: 40, note: "Address incomplete — no PIN code" },
  { label: "Country of origin", value: 30, note: "Conflicts with the e-commerce listing" },
  { label: "Legibility and character height", value: 68, note: "Two declarations below the Rule 7 minimum" },
  { label: "Online / offline consistency", value: 35, note: "Three fields differ from the marketplace listing" },
];

export const EXTRACTED: ExtractedField[] = [
  { field: "Common or generic name", value: "Basmati Rice", confidence: 98, source: "Front panel", state: "ok" },
  { field: "Net quantity", value: "500 g", confidence: 96, source: "Front panel", state: "minor" },
  { field: "Retail sale price", value: "\u20b9 499.00 (incl. of all taxes)", confidence: 94, source: "Front panel", state: "minor" },
  { field: "Promotional price text", value: "\u20b9 99 ONLY*", confidence: 99, source: "Front panel (starburst)", state: "major" },
  { field: "Manufacturer / packer", value: "Annapurna Foods Pvt. Ltd., Ambattur, Chennai", confidence: 91, source: "Back panel", state: "major" },
  { field: "Month and year of packing", value: "03 / 2026", confidence: 97, source: "Back panel", state: "ok" },
  { field: "Consumer care", value: "care@annapurnafoods.in \u00b7 1800-XXX-4417", confidence: 89, source: "Back panel", state: "ok" },
  { field: "Country of origin", value: "India", confidence: 93, source: "Back panel", state: "major" },
  { field: "Barcode (EAN-13)", value: "8901234567890", confidence: 99, source: "Back panel", state: "ok" },
  { field: "Unit sale price", value: "\u2014 not detected \u2014", confidence: 0, source: "\u2014", state: "major" },
];

export const FINDINGS: Finding[] = [
  {
    id: "F1",
    severity: "major",
    title: "Manufacturer address incomplete",
    regionId: "mfg",
    rule: "Rule 6(1) — manufacturer particulars",
    ruleVersion: "LMPC Rules, 2011 as consolidated",
    confidence: 92,
    evidence:
      "Extracted text reads \u201cAnnapurna Foods Pvt. Ltd., Ambattur, Chennai\u201d. No PIN code and no street or premises identifier were located on any captured panel.",
    requirement:
      "The name and complete address of the manufacturer, packer or importer must appear on the principal display panel or an adjacent panel.",
    correction:
      "Add the complete postal address including street, locality and PIN code to the back panel artwork.",
  },
  {
    id: "F2",
    severity: "major",
    title: "Country of origin conflicts across channels",
    regionId: "origin",
    rule: "Rule 6(10) read with Rule 6(10A)",
    ruleVersion: "G.S.R. 128(E), in force 1 July 2026",
    confidence: 88,
    evidence:
      "The pack declares India. The marketplace listing for the same GTIN declares China. The importer registration on file references a Chinese consignor.",
    requirement:
      "Origin declared on the package and on the e-commerce listing must be consistent, and imported products must be filterable by country of origin on the platform.",
    correction:
      "Reconcile the declaration. If the goods are imported, the pack must carry importer particulars and the listing must expose an origin filter.",
  },
  {
    id: "F3",
    severity: "major",
    title: "Promotional price competes with the declared MRP",
    regionId: "promo",
    rule: "Rule 6(1) retail sale price, read with Rule 7",
    ruleVersion: "LMPC Rules, 2011 as consolidated",
    confidence: 79,
    evidence:
      "\u201c\u20b9 99 ONLY*\u201d is set at 14.20 mm character height on the principal display panel. The declared retail sale price \u20b9 499.00 is set at 2.60 mm on the same panel — a ratio of 5.5 to 1.",
    requirement:
      "The retail sale price must be declared clearly and prominently. A more prominent price that is not the MRP is liable to mislead.",
    correction:
      "Reduce the prominence of the promotional device or remove it, and ensure the MRP is the dominant price element.",
  },
  {
    id: "F4",
    severity: "minor",
    title: "Net quantity below the minimum character height",
    regionId: "qty",
    rule: "Rule 7(2) read with Table-I",
    ruleVersion: "Substituted by G.S.R. 629(E), 23 June 2017",
    confidence: 74,
    evidence:
      "Measured character height 1.60 mm \u00b1 0.18 mm. The principal display panel computes to 168 cm\u00b2 by the Rule 7(4) method for a rectangular pack, placing it in the band above 100 and up to 500 cm\u00b2, which requires 2.5 mm.",
    requirement:
      "The height of any numeral and letter in a declaration required under these rules shall be as per Table-I, by area of the principal display panel.",
    correction:
      "Increase the net quantity characters to at least 2.5 mm. Referred for manual verification because the computed area sits near a band boundary.",
  },
  {
    id: "F5",
    severity: "review",
    title: "Unit sale price not detected",
    regionId: null,
    rule: "Rule 6(11)",
    ruleVersion: "Base rules as amended — clause to be verified",
    confidence: 61,
    evidence:
      "No unit sale price string matched on any captured panel. Two panels were captured below the target sharpness, so absence is not conclusive.",
    requirement:
      "The unit sale price must be declared where the commodity falls in a category to which the requirement applies.",
    correction: "Re-capture the side panels at higher resolution before recording this as a violation.",
  },
  {
    id: "F6",
    severity: "ok",
    title: "Month and year of packing correctly declared",
    regionId: "date",
    rule: "Rule 6(1) — date of packing",
    ruleVersion: "LMPC Rules, 2011 as consolidated",
    confidence: 97,
    evidence: "\u201cPacked: 03/2026\u201d located on the back panel at 2.55 mm character height.",
    requirement: "Month and year in which the commodity was manufactured, pre-packed or imported.",
    correction: "\u2014",
  },
];

export const MEASUREMENTS: Measurement[] = [
  { element: "Net quantity characters", measuredMm: 1.6, toleranceMm: 0.18, widthRatio: 0.41, requiredMm: 2.5, verdict: "below" },
  { element: "Retail sale price", measuredMm: 2.6, toleranceMm: 0.18, widthRatio: 0.38, requiredMm: 2.5, verdict: "threshold" },
  { element: "Promotional price \u201c\u20b999\u201d", measuredMm: 14.2, toleranceMm: 0.2, widthRatio: 0.52, requiredMm: null, verdict: "note", note: "5.5\u00d7 the declared MRP" },
  { element: "Manufacturer block", measuredMm: 1.9, toleranceMm: 0.18, widthRatio: 0.36, requiredMm: 2.5, verdict: "below" },
  { element: "Consumer care block", measuredMm: 2.55, toleranceMm: 0.18, widthRatio: 0.35, requiredMm: 2.5, verdict: "threshold" },
];

export const CROSS_CHANNEL: ChannelRow[] = [
  { field: "Common or generic name", pack: "Basmati Rice", qr: "Basmati Rice", listing: "Basmati Rice (Premium)", state: "match" },
  { field: "Net quantity", pack: "500 g", qr: "500 g", listing: "1 kg", state: "mismatch" },
  { field: "Retail sale price", pack: "\u20b9 499.00", qr: "\u20b9 499.00", listing: "\u20b9 449.00", state: "discrepancy" },
  { field: "Country of origin", pack: "India", qr: "India", listing: "China", state: "mismatch" },
  { field: "Manufacturer address", pack: "Incomplete (no PIN)", qr: "Complete with PIN 600053", listing: "Not shown on listing", state: "discrepancy" },
  { field: "Month and year of packing", pack: "03 / 2026", qr: "03 / 2026", listing: "Not shown on listing", state: "discrepancy" },
  { field: "Consumer care", pack: "Present", qr: "Present", listing: "Present", state: "match" },
];

export const PIPELINE_STAGES = [
  "Image quality",
  "Scale calibration",
  "Text extraction",
  "Category detection",
  "Rule evaluation",
  "Report",
] as const;
