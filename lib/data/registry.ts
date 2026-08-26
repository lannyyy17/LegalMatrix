import type { Additive, AuditEntry, Entity, Notice, QueueItem, RepositoryRow } from "@/lib/types";

export const PRIORITY_QUEUE: QueueItem[] = [
  { product: "Herbal Face Wash 100 ml", entity: "Vedika Personal Care", risk: 94, drivers: "3 open \u00b7 repeat MRP overprint \u00b7 imported", action: "Inspect immediately" },
  { product: "Instant Noodles 280 g (4\u00d770 g)", entity: "Sunrise Foods", risk: 91, drivers: "Multipiece declaration missing on units", action: "Inspect immediately" },
  { product: "Almonds 250 g", entity: "DryFruit Direct LLP", risk: 88, drivers: "Origin mismatch \u00b7 listing versus pack", action: "High priority" },
  { product: "Premium Basmati Rice 500 g", entity: "Annapurna Foods Pvt. Ltd.", risk: 83, drivers: "Address incomplete \u00b7 price prominence", action: "High priority" },
  { product: "LED Bulb 9 W", entity: "Lumex Electricals", risk: 76, drivers: "Consumer care number unreachable", action: "High priority" },
  { product: "Detergent Bar 125 g", entity: "Shakti Home Products", risk: 61, drivers: "Character height borderline", action: "Review" },
  { product: "Filter Coffee Powder 200 g", entity: "Kaveri Beverages", risk: 38, drivers: "Prior violation closed 2026", action: "Routine" },
  { product: "Toothpaste 150 g", entity: "Oralcare India", risk: 14, drivers: "No findings in the last three cycles", action: "Low priority" },
];

export const VIOLATION_TYPES = [
  { label: "Incomplete manufacturer or packer address", count: 412, pct: 100 },
  { label: "Character height below the Rule 7 minimum", count: 388, pct: 94 },
  { label: "MRP not clearly declared or misleading price", count: 301, pct: 73 },
  { label: "Country of origin missing or inconsistent", count: 264, pct: 64 },
  { label: "Consumer care particulars missing", count: 187, pct: 45 },
  { label: "Month and year of packing absent", count: 96, pct: 23 },
];

export const REPOSITORY: RepositoryRow[] = [
  { id: "PKG-2026-08-14472", name: "Premium Basmati Rice 500 g", entity: "Annapurna Foods Pvt. Ltd.", category: "Food — Cereal", inspected: "14 Aug 2026", score: 64, status: "Non-compliant" },
  { id: "PKG-2026-08-14468", name: "Herbal Face Wash 100 ml", entity: "Vedika Personal Care", category: "Cosmetic", inspected: "14 Aug 2026", score: 41, status: "Non-compliant" },
  { id: "PKG-2026-08-14455", name: "Filter Coffee Powder 200 g", entity: "Kaveri Beverages", category: "Food — Beverage", inspected: "13 Aug 2026", score: 96, status: "Compliant" },
  { id: "PKG-2026-08-14441", name: "LED Bulb 9 W", entity: "Lumex Electricals", category: "Electrical goods", inspected: "13 Aug 2026", score: 71, status: "Under review" },
  { id: "PKG-2026-08-14430", name: "Almonds 250 g", entity: "DryFruit Direct LLP", category: "Food — Dry fruit", inspected: "12 Aug 2026", score: 58, status: "Non-compliant" },
  { id: "PKG-2026-08-14418", name: "Toothpaste 150 g", entity: "Oralcare India", category: "Cosmetic", inspected: "12 Aug 2026", score: 99, status: "Compliant" },
  { id: "PKG-2026-08-14402", name: "Detergent Bar 125 g", entity: "Shakti Home Products", category: "Household", inspected: "11 Aug 2026", score: 77, status: "Under review" },
  { id: "PKG-2026-08-14391", name: "Instant Noodles 280 g", entity: "Sunrise Foods", category: "Food — Ready to cook", inspected: "11 Aug 2026", score: 49, status: "Non-compliant" },
];

export const NOTICES: Notice[] = [
  { id: "NTC-TN-2026-0891", entity: "Annapurna Foods Pvt. Ltd.", product: "Premium Basmati Rice 500 g", section: "Section 36", status: "PENDING_RESPONSE", officer: "R. Krishnan", issued: "14 Aug 2026", due: "28 Aug 2026" },
  { id: "NTC-TN-2026-0884", entity: "Vedika Personal Care", product: "Herbal Face Wash 100 ml", section: "Section 18 / 36", status: "EXPLANATION_RECEIVED", officer: "S. Meenakshi", issued: "09 Aug 2026", due: "23 Aug 2026" },
  { id: "NTC-TN-2026-0877", entity: "DryFruit Direct LLP", product: "Almonds 250 g", section: "Section 36", status: "COMPOUNDED", officer: "R. Krishnan", issued: "02 Aug 2026", due: "\u2014" },
  { id: "NTC-TN-2026-0863", entity: "Sunrise Foods", product: "Instant Noodles 280 g", section: "Section 18", status: "ESCALATED_TO_COURT", officer: "A. Ramesh", issued: "24 Jul 2026", due: "\u2014" },
  { id: "NTC-TN-2026-0851", entity: "Shakti Home Products", product: "Detergent Bar 125 g", section: "Section 36", status: "CLOSED", officer: "S. Meenakshi", issued: "18 Jul 2026", due: "\u2014" },
];

export const ENTITIES: Entity[] = [
  { name: "Annapurna Foods Pvt. Ltd.", registration: "LM/TN/2019/004417", type: "Manufacturer / Packer", location: "Ambattur, Chennai", score: 58, risk: "HIGH", status: "REGISTERED", inspections: 34, violations: 23 },
  { name: "Vedika Personal Care", registration: "LM/TN/2021/009901", type: "Manufacturer", location: "Hosur, Tamil Nadu", score: 44, risk: "HIGH", status: "LICENSE_EXPIRED", inspections: 19, violations: 17 },
  { name: "DryFruit Direct LLP", registration: "LM/DL/2022/002210", type: "Importer", location: "Okhla, New Delhi", score: 61, risk: "MEDIUM", status: "REGISTERED", inspections: 12, violations: 7 },
  { name: "Kaveri Beverages", registration: "LM/TN/2017/001188", type: "Manufacturer", location: "Coimbatore", score: 93, risk: "LOW", status: "REGISTERED", inspections: 22, violations: 2 },
  { name: "Sunrise Foods", registration: "LM/KA/2020/006654", type: "Manufacturer / Packer", location: "Bengaluru", score: 39, risk: "HIGH", status: "SUSPENDED", inspections: 28, violations: 26 },
];

export const RECURRING_PATTERN = [
  { label: "Incomplete manufacturer address", count: 17, baseline: 4 },
  { label: "Net quantity character height", count: 11, baseline: 5 },
  { label: "MRP declaration defects", count: 8, baseline: 3 },
  { label: "Package versus listing mismatch", count: 6, baseline: 2 },
];

export const ENTITY_HISTORY = [
  { when: "14 Aug 2026", title: "Notice NTC-TN-2026-0891", note: "Incomplete address and price prominence. Awaiting response.", active: true },
  { when: "02 Mar 2026", title: "Compounded", note: "Net quantity character height. \u20b9 25,000 realised.", active: false },
  { when: "19 Nov 2025", title: "Notice closed", note: "Consumer care particulars corrected on new artwork.", active: false },
  { when: "07 Jun 2025", title: "Compounded", note: "Incomplete address on a different SKU — the same defect as the current finding.", active: false },
];

export const AUDIT: AuditEntry[] = [
  { at: "14 Aug 2026, 12:04", user: "R. Krishnan (LMO)", action: "Exported compliance report", object: "PKG-2026-08-14472", source: "10.42.8.19" },
  { at: "14 Aug 2026, 11:58", user: "R. Krishnan (LMO)", action: "Confirmed finding F1 as a major violation", object: "PKG-2026-08-14472", source: "10.42.8.19" },
  { at: "14 Aug 2026, 11:51", user: "System (rule engine v2026.08)", action: "Evaluated 17 rules \u00b7 3 major, 1 minor, 1 review", object: "PKG-2026-08-14472", source: "\u2014" },
  { at: "14 Aug 2026, 11:44", user: "System (extraction)", action: "Extracted 9 declarations from 4 images", object: "PKG-2026-08-14472", source: "\u2014" },
  { at: "14 Aug 2026, 11:42", user: "R. Krishnan (LMO)", action: "Created inspection and uploaded 4 images", object: "PKG-2026-08-14472", source: "10.42.8.19" },
  { at: "14 Aug 2026, 09:15", user: "A. Ramesh (Controller)", action: "Amended rule LMPC-6(10A) — added the G.S.R. 312(E) version", object: "Rule registry", source: "10.42.8.4" },
  { at: "13 Aug 2026, 17:30", user: "S. Meenakshi (Inspector)", action: "Recorded explanation received", object: "NTC-TN-2026-0884", source: "10.42.9.71" },
];

export const ROLES = [
  { role: "Administrator", scope: "User and role management. No access to findings." },
  { role: "Controller", scope: "Rule authoring, circle-wide dashboards, escalation." },
  { role: "Legal Metrology Officer", scope: "Inspections, confirming findings, issuing notices." },
  { role: "Inspector", scope: "Capture and submit. Cannot confirm findings." },
  { role: "Viewer", scope: "Read-only reporting access." },
];

/**
 * Advisory reference for the citizen portal only. This never produces
 * a Legal Metrology finding. Additive limits are set by FSSAI under
 * the Food Safety and Standards Act, 2006 — a different statute and a
 * different ministry. IARC groups describe the strength of the
 * evidence, not the size of any risk.
 */
export const ADDITIVES: Additive[] = [
  { ins: "INS 102", name: "Tartrazine", fn: "Synthetic colour", status: "Permitted with limits", iarc: "Not classified by IARC", note: "Must be declared on the label. Some regulators require an additional advisory relating to children's attention and behaviour." },
  { ins: "INS 211", name: "Sodium benzoate", fn: "Preservative", status: "Permitted with limits", iarc: "Not classified by IARC", note: "Studied for benzene formation when combined with ascorbic acid in beverages." },
  { ins: "INS 621", name: "Monosodium glutamate", fn: "Flavour enhancer", status: "Permitted; label declaration required", iarc: "Not classified by IARC", note: "Packs containing added MSG generally carry a specific declaration. Not permitted in foods for infants." },
  { ins: "INS 250", name: "Sodium nitrite", fn: "Preservative for cured meats", status: "Permitted with limits", iarc: "IARC Group 2A", note: "Group 2A is IARC's category for \u201cprobably carcinogenic to humans\u201d, applied to ingested nitrite under conditions resulting in endogenous nitrosation." },
  { ins: "INS 320", name: "Butylated hydroxyanisole (BHA)", fn: "Antioxidant", status: "Permitted with limits", iarc: "IARC Group 2B", note: "Group 2B is IARC's category for \u201cpossibly carcinogenic to humans\u201d. Widely permitted at restricted levels." },
  { ins: "\u2014", name: "Partially hydrogenated vegetable oil", fn: "Fat and trans fat source", status: "Restricted — industrial trans fat limits apply", iarc: "Not classified by IARC", note: "Check the nutrition panel for declared trans fat content per 100 g." },
];
