/**
 * Comprehensive Legal Metrology Rules Dataset
 * Source: Gazette of India notifications for:
 * 1. Legal Metrology (Packaged Commodities) Rules, 2011 (amended up to 2026)
 * 2. Legal Metrology (National Standards) Rules, 2011 (Third Schedule)
 */

export interface LegalRuleDefinition {
  ruleId: string;
  title: string;
  section: string;
  description: string;
  requirement: string;
  allowedValues?: string[];
  prohibitedValues?: string[];
}

export const LEGAL_METROLOGY_RULES_DATASET = {
  // Rule 6(1): Mandatory Declarations on Every Pre-Packaged Commodity
  rule6_declarations: [
    {
      ruleId: "RULE_6_1_A",
      title: "Common / Generic Name of Commodity",
      section: "Rule 6(1)(a)",
      description: "Every package shall bear the name of the commodity contained therein.",
      requirement: "Must specify generic or common name (e.g. 'Toilet Soap', 'Refined Sugar', 'Biscuits').",
    },
    {
      ruleId: "RULE_6_1_B",
      title: "Net Quantity & Metric Unit Symbol",
      section: "Rule 6(1)(b) & Rule 18 National Standards Rules",
      description: "Net quantity in standard metric units. Prohibits non-standard symbols like 'gms', 'lts', 'kgs'.",
      requirement: "Standard SI unit symbols only: 'g' for grams, 'kg' for kilograms, 'L' or 'l' for litres, 'mL' or 'ml' for millilitres.",
      allowedValues: ["g", "kg", "mg", "L", "l", "mL", "ml", "m", "cm", "mm", "N", "Pa"],
      prohibitedValues: ["gms", "gms.", "gm", "gms", "lts", "liters", "kgs", "kilo", "ctn", "doz"],
    },
    {
      ruleId: "RULE_6_1_C",
      title: "Month and Year of Manufacture / Packing / Import",
      section: "Rule 6(1)(d)",
      description: "Month and year in which the commodity is manufactured or packed or imported.",
      requirement: "Format: MM/YYYY or Month YYYY (e.g. '08/2026' or 'Aug 2026').",
    },
    {
      ruleId: "RULE_6_1_D",
      title: "Maximum Retail Price (MRP) Format",
      section: "Rule 6(1)(e)",
      description: "Maximum Retail Price inclusive of all taxes.",
      requirement: "Must explicitly contain 'incl. of all taxes' or 'inclusive of all taxes'. Selling above MRP violates Section 18 of the Legal Metrology Act, 2009.",
    },
    {
      ruleId: "RULE_6_1_E",
      title: "Complete Manufacturer / Packer / Importer Address",
      section: "Rule 6(1)(ab)",
      description: "Name and complete address of the manufacturer, packer or importer.",
      requirement: "Must contain complete address including premises number, street, city, state and PIN code.",
    },
    {
      ruleId: "RULE_6_10A",
      title: "Country of Origin",
      section: "Rule 6(10A)",
      description: "Mandatory declaration of Country of Origin on imported commodities and e-commerce listings.",
      requirement: "Explicit statement of Country of Origin (e.g. 'Country of Origin: India' or 'Made in Switzerland').",
    },
    {
      ruleId: "RULE_6_1_F",
      title: "Consumer Care Contact Details",
      section: "Rule 6(1)(f)",
      description: "Name, address, telephone number, and email address of the person or office to be contacted in case of consumer complaints.",
      requirement: "Valid phone number and/or email address for consumer grievance redressal.",
    },
  ],

  // Rule 7 Table I: Principal Display Panel Area vs Minimum Font Height
  rule7_font_height_table: [
    { upToCm2: 50, label: "Up to 50 cm²", minHeightMm: 1.0, minMouldedMm: 1.5 },
    { upToCm2: 100, label: "Above 50 and up to 100 cm²", minHeightMm: 1.5, minMouldedMm: 3.0 },
    { upToCm2: 500, label: "Above 100 and up to 500 cm²", minHeightMm: 2.5, minMouldedMm: 4.0 },
    { upToCm2: 2500, label: "Above 500 and up to 2500 cm²", minHeightMm: 4.0, minMouldedMm: 6.0 },
    { upToCm2: Infinity, label: "Above 2500 cm²", minHeightMm: 6.0, minMouldedMm: 6.0 },
  ],
};

/**
 * Validate Net Quantity unit symbol against Third Schedule of National Standards Rules, 2011
 */
export function validateUnitSymbol(text: string): { isValid: boolean; detectedSymbol?: string; errorNote?: string } {
  const prohibitedRegex = /\b(\d+)\s*(gms\.?|gm|gms|lts|kgs|liters|kilo)\b/i;
  const match = text.match(prohibitedRegex);
  if (match) {
    return {
      isValid: false,
      detectedSymbol: match[2],
      errorNote: `Illegal unit symbol '${match[2]}' detected! Must be legal metric symbol 'g', 'kg', 'L', or 'ml' (National Standards Rules, 2011).`,
    };
  }
  return { isValid: true };
}

/**
 * Validate MRP format against Rule 6(1)(e)
 */
export function validateMrpFormat(mrpText: string): { isValid: boolean; errorNote?: string } {
  if (!mrpText) {
    return { isValid: false, errorNote: "MRP declaration is missing from the package." };
  }
  const taxKeywords = ["incl", "inclusive", "all taxes", "tax"];
  const lower = mrpText.toLowerCase();
  const hasTax = taxKeywords.some((k) => lower.includes(k));
  if (!hasTax) {
    return {
      isValid: false,
      errorNote: "Non-compliant MRP format: Missing mandatory 'incl. of all taxes' declaration (Rule 6(1)(e)).",
    };
  }
  return { isValid: true };
}
