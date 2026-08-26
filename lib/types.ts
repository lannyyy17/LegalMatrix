export type Severity = "major" | "minor" | "review" | "ok";
export type MatchState = "match" | "discrepancy" | "mismatch";
export type Provenance = "cited" | "needs-citation";

export type EvidenceKind =
  | "Label"
  | "Platform"
  | "Label + listing"
  | "Label (measured)"
  | "Geometry"
  | "Text of declaration";

/**
 * A single version of a rule. The Rules are edited by gazette
 * notification, so one rule id can carry several versions, each with
 * its own commencement date. Nothing is ever mutated in place — an
 * amendment adds a row.
 */
export interface RuleVersion {
  ruleId: string;
  title: string;
  appliesTo: string;
  /** ISO date on which this version comes into force. */
  effectiveFrom: string;
  /** The gazette notification this text comes from. */
  source: string;
  provenance: Provenance;
  evidence: EvidenceKind;
}

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  /** Region on the label this finding points at, if any. */
  regionId: string | null;
  rule: string;
  ruleVersion: string;
  confidence: number;
  evidence: string;
  requirement: string;
  correction: string;
}

export interface ExtractedField {
  field: string;
  value: string;
  confidence: number;
  source: string;
  state: Severity;
}

export interface Measurement {
  element: string;
  measuredMm: number;
  toleranceMm: number;
  widthRatio: number;
  requiredMm: number | null;
  verdict: "meets" | "below" | "threshold" | "note";
  note?: string;
}

export interface UnitCheck {
  written: string;
  verdict: "correct" | "defective" | "not-permitted";
  basis: string;
}

export interface QueueItem {
  product: string;
  entity: string;
  risk: number;
  drivers: string;
  action: string;
}

export interface RepositoryRow {
  id: string;
  name: string;
  entity: string;
  category: string;
  inspected: string;
  score: number;
  status: "Compliant" | "Non-compliant" | "Under review";
}

export interface Notice {
  id: string;
  entity: string;
  product: string;
  section: string;
  status:
    | "PENDING_RESPONSE"
    | "EXPLANATION_RECEIVED"
    | "COMPOUNDED"
    | "ESCALATED_TO_COURT"
    | "CLOSED";
  officer: string;
  issued: string;
  due: string;
}

export interface Entity {
  name: string;
  registration: string;
  type: string;
  location: string;
  score: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  status: "REGISTERED" | "LICENSE_EXPIRED" | "SUSPENDED";
  inspections: number;
  violations: number;
}

export interface ChannelRow {
  field: string;
  pack: string;
  qr: string;
  listing: string;
  state: MatchState;
}

export interface AuditEntry {
  at: string;
  user: string;
  action: string;
  object: string;
  source: string;
}

export interface Additive {
  ins: string;
  name: string;
  fn: string;
  status: string;
  iarc: string;
  note: string;
}
