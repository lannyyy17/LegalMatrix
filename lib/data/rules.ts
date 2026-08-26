import type { RuleVersion, UnitCheck } from "@/lib/types";

/**
 * The rule registry. Each row is one version of one rule, carrying the
 * gazette notification it comes from and the date it takes effect.
 *
 * Rows marked "needs-citation" were seeded during setup and have not
 * yet been checked against the consolidated text. The engine will
 * still evaluate them, but findings they produce are routed for manual
 * review and cannot be the sole basis for a notice. Showing this in
 * the interface is deliberate: a wrong citation in an enforcement
 * report is worse than an admitted gap.
 */
export const RULE_REGISTRY: RuleVersion[] = [
  {
    ruleId: "LMPC-6(1)(a)",
    title: "Name and complete address of the manufacturer, packer or importer",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(1)(b)",
    title: "Common or generic name of the commodity (a brand name alone is not enough)",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(1)(c)",
    title: "Net quantity in standard units of weight, measure or number",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(1)(d)",
    title: "Month and year of manufacture, pre-packing or import",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(1)(e)",
    title: "Retail sale price — \u201cMaximum Retail Price \u20b9 \u2026 inclusive of all taxes\u201d",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(1)(f)",
    title: "Consumer care particulars — name, address, telephone number and email",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(1)",
    provenance: "cited",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-6(10)",
    title: "Importer particulars and country of origin; declarations to appear on the listing",
    appliesTo: "Imported packages and e-commerce listings",
    effectiveFrom: "2011-04-01",
    source: "LMPC Rules, 2011 — Rule 6(10)",
    provenance: "needs-citation",
    evidence: "Label + listing",
  },
  {
    ruleId: "LMPC-6(10A)",
    title:
      "Every e-commerce entity offering an imported product for sale must provide listings with a searchable and sortable filter specifying the country of origin",
    appliesTo: "E-commerce entities",
    effectiveFrom: "2026-07-01",
    source: "G.S.R. 128(E) dated 13 February 2026",
    provenance: "cited",
    evidence: "Platform",
  },
  {
    ruleId: "LMPC-6(10A)",
    title: "Substituted country-of-origin filter obligation for e-commerce entities",
    appliesTo: "E-commerce entities",
    effectiveFrom: "2027-07-01",
    source: "G.S.R. 312(E) dated 27 April 2026",
    provenance: "cited",
    evidence: "Platform",
  },
  {
    ruleId: "LMPC-6(11)",
    title: "Unit sale price; not required where it equals the retail sale price",
    appliesTo: "Retail packages, not wholesale packages",
    effectiveFrom: "2022-04-01",
    source: "LMPC (Amendment) Rules, 2021 / 2022",
    provenance: "needs-citation",
    evidence: "Label",
  },
  {
    ruleId: "LMPC-7(2)",
    title: "Minimum height of numerals and letters by area of the principal display panel (Table-I)",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-03-07",
    source: "LMPC Rule 7(2), substituted by G.S.R. 629(E) dated 23 June 2017",
    provenance: "cited",
    evidence: "Label (measured)",
  },
  {
    ruleId: "LMPC-7(3)",
    title:
      "Width of a letter or numeral not less than one third of its height, except 1, i, I and l",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-03-07",
    source: "LMPC Rule 7(3), substituted by G.S.R. 629(E) dated 23 June 2017",
    provenance: "cited",
    evidence: "Label (measured)",
  },
  {
    ruleId: "LMPC-7(4)",
    title: "Method of computing the principal display panel area by package shape",
    appliesTo: "All pre-packaged commodities",
    effectiveFrom: "2011-03-07",
    source: "LMPC Rule 7(4)",
    provenance: "cited",
    evidence: "Geometry",
  },
  {
    ruleId: "LMNS-3",
    title: "Every unit of weight or measure shall be based on the metric system",
    appliesTo: "All declarations",
    effectiveFrom: "2011-04-01",
    source: "LM (National Standards) Rules, 2011 — Rule 3",
    provenance: "cited",
    evidence: "Text of declaration",
  },
  {
    ruleId: "LMNS-Sch3-7",
    title:
      "Unit symbols in upright roman type, unaltered in the plural, no full stop, a space after the numeral",
    appliesTo: "All declarations",
    effectiveFrom: "2011-04-01",
    source: "LM (National Standards) Rules, 2011 — Third Schedule, clause 7",
    provenance: "cited",
    evidence: "Text of declaration",
  },
  {
    ruleId: "LMNS-Sch3-5/6",
    title: "One prefix only; multiples of mass formed on \u201cgram\u201d (write mg, not \u00b5kg)",
    appliesTo: "All declarations",
    effectiveFrom: "2011-04-01",
    source: "LM (National Standards) Rules, 2011 — Third Schedule, clauses 5 and 6",
    provenance: "cited",
    evidence: "Text of declaration",
  },
  {
    ruleId: "LMNS-18",
    title: "CGS units and units outside the SI not to be used except in research",
    appliesTo: "All declarations",
    effectiveFrom: "2011-04-01",
    source: "LM (National Standards) Rules, 2011 — Rule 18",
    provenance: "cited",
    evidence: "Text of declaration",
  },
];

/**
 * A quantity can be present, legible and still wrongly written. These
 * checks come from the National Standards Rules, which fix how unit
 * symbols may be printed. No other compliance tool does this.
 */
export const UNIT_CHECKS: UnitCheck[] = [
  {
    written: "500 g",
    verdict: "correct",
    basis: "Lower case, upright, no full stop, one space after the numeral.",
  },
  {
    written: "500 gms",
    verdict: "not-permitted",
    basis: "Unit symbols are not pluralised. There is no symbol \u201cgms\u201d. Third Schedule, clause 7(1)(b).",
  },
  {
    written: "500g",
    verdict: "defective",
    basis: "A space is required between the numerical value and the symbol. Clause 7(1)(d).",
  },
  {
    written: "500 Gm.",
    verdict: "not-permitted",
    basis: "Wrong case, abbreviated as a word, and a trailing full stop. Clauses 7(1)(c) and 7(2).",
  },
  {
    written: "0.5 Kg",
    verdict: "defective",
    basis: "The prefix symbol for kilo is a lower-case k. Third Schedule, Table 1.",
  },
  {
    written: "17.6 oz",
    verdict: "not-permitted",
    basis: "The ounce is outside the SI and not usable on an Indian retail pack. Rule 18.",
  },
];
