import type { RuleVersion } from "@/lib/types";

/**
 * Version-aware rule resolution.
 *
 * This is the piece of the system that stops us going obsolete every
 * time the Department of Consumer Affairs publishes a notification.
 * A rule is never hard-coded; it is a row carrying its source
 * notification and the date it comes into force. An inspection is
 * always evaluated against the text that was in force on the date of
 * that inspection — never against today's text.
 *
 * Worked example, and the one to show a judge:
 *   sub-rule 6(10A) was inserted by G.S.R. 128(E) with effect from
 *   1 July 2026, then substituted by G.S.R. 312(E) with effect from
 *   1 July 2027. Same sub-rule, two versions, notified ten weeks
 *   apart. resolveVersion() returns the right one for any date.
 */

export interface ResolvedRule {
  ruleId: string;
  /** The version in force on the given date, or null if none yet is. */
  applicable: RuleVersion | null;
  /** Every version, oldest first, for display as a timeline. */
  history: RuleVersion[];
  /** The next version due to commence after the given date, if any. */
  pending: RuleVersion | null;
}

const byEffectiveDate = (a: RuleVersion, b: RuleVersion) =>
  a.effectiveFrom.localeCompare(b.effectiveFrom);

/** All versions of one rule id, oldest first. */
export function versionsOf(registry: RuleVersion[], ruleId: string): RuleVersion[] {
  return registry.filter((r) => r.ruleId === ruleId).sort(byEffectiveDate);
}

/**
 * The version of `ruleId` in force on `asOn` (an ISO date string).
 * Returns the latest version whose commencement date is on or before
 * the given date.
 */
export function resolveVersion(
  registry: RuleVersion[],
  ruleId: string,
  asOn: string,
): ResolvedRule {
  const history = versionsOf(registry, ruleId);
  const inForce = history.filter((r) => r.effectiveFrom <= asOn);
  const upcoming = history.filter((r) => r.effectiveFrom > asOn);

  return {
    ruleId,
    applicable: inForce.length ? inForce[inForce.length - 1] : null,
    history,
    pending: upcoming.length ? upcoming[0] : null,
  };
}

/**
 * The whole rule set applicable on a date: one version per rule id.
 * This is what an inspection is actually evaluated against.
 */
export function ruleSetAsOn(registry: RuleVersion[], asOn: string): RuleVersion[] {
  const ids = Array.from(new Set(registry.map((r) => r.ruleId)));
  return ids
    .map((id) => resolveVersion(registry, id, asOn).applicable)
    .filter((r): r is RuleVersion => r !== null);
}

/* ------------------------------------------------------------------
   Rule 7 — principal display panel geometry and minimum character
   height. Substituted into the Rules by G.S.R. 629(E) dated
   23 June 2017. Applies to both numerals and letters.
   ------------------------------------------------------------------ */

export interface HeightBand {
  /** Upper bound of the band in cm², inclusive. Infinity for the top band. */
  upToCm2: number;
  label: string;
  minMm: number;
  /** Higher minimum where the declaration is blown, formed or moulded. */
  minMouldedMm: number;
}

export const HEIGHT_TABLE_I: HeightBand[] = [
  { upToCm2: 50, label: "Up to 50", minMm: 1.0, minMouldedMm: 1.5 },
  { upToCm2: 100, label: "Above 50 and up to 100", minMm: 1.5, minMouldedMm: 3.0 },
  { upToCm2: 500, label: "Above 100 and up to 500", minMm: 2.5, minMouldedMm: 4.0 },
  { upToCm2: 2500, label: "Above 500 and up to 2500", minMm: 4.0, minMouldedMm: 6.0 },
  { upToCm2: Infinity, label: "Above 2500", minMm: 6.0, minMouldedMm: 6.0 },
];

export type PackShape = "rectangular" | "cylindrical" | "other";

/**
 * Rule 7(4): how the principal display panel area is computed.
 * Tops, bottoms, can flanges and bottle shoulders and necks are
 * excluded, which is why the caller passes only display-face figures.
 */
export function panelAreaCm2(
  shape: PackShape,
  dims: { heightCm: number; widthCm?: number; circumferenceCm?: number; totalSurfaceCm2?: number },
): number {
  switch (shape) {
    case "rectangular":
      return dims.heightCm * (dims.widthCm ?? 0);
    case "cylindrical":
      return 0.4 * dims.heightCm * (dims.circumferenceCm ?? 0);
    case "other":
      return 0.4 * (dims.totalSurfaceCm2 ?? 0);
  }
}

export function bandFor(areaCm2: number): HeightBand {
  return HEIGHT_TABLE_I.find((b) => areaCm2 <= b.upToCm2) ?? HEIGHT_TABLE_I[HEIGHT_TABLE_I.length - 1];
}

export function minimumHeightMm(areaCm2: number, moulded = false): number {
  const band = bandFor(areaCm2);
  return moulded ? band.minMouldedMm : band.minMm;
}

export type HeightVerdict = "meets" | "below" | "inconclusive";

/**
 * Compare a measured character height against the requirement, taking
 * the measurement uncertainty seriously.
 *
 * A photograph carries no scale, so every height we derive has a
 * tolerance band. If that band straddles the legal threshold we return
 * "inconclusive" and the finding goes to a human. We only ever return
 * "below" when the entire band sits under the requirement. This is the
 * difference between a demo and something an officer could rely on.
 */
export function assessHeight(
  measuredMm: number,
  toleranceMm: number,
  requiredMm: number,
): HeightVerdict {
  if (measuredMm - toleranceMm >= requiredMm) return "meets";
  if (measuredMm + toleranceMm < requiredMm) return "below";
  return "inconclusive";
}

/** Rule 7(3): width must be at least one third of height. */
export const NARROW_GLYPH_EXCEPTIONS = ["1", "i", "I", "l"];

export function assessWidthRatio(ratio: number): "meets" | "below" {
  return ratio >= 1 / 3 ? "meets" : "below";
}

/**
 * Derive image scale from a reference object of known real-world size.
 * Without one of these, millimetres cannot be recovered from pixels
 * at all — which is why calibration is a required step in the capture
 * workflow rather than an optional one.
 */
export function pixelsPerMm(referencePx: number, referenceMm: number): number {
  if (referenceMm <= 0) throw new Error("Reference size must be positive");
  return referencePx / referenceMm;
}
