"use client";

import { motion } from "motion/react";

export interface Region {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  state: "ok" | "warn" | "bad";
}

/**
 * Regions detected on the captured front panel. In production these
 * coordinates come from the OCR stage, which is why we require an
 * engine that returns bounding boxes rather than plain text: every
 * finding has to be able to point at the pixels it came from.
 */
export const REGIONS: Region[] = [
  { id: "name", x: 40, y: 84, w: 250, h: 26, state: "ok" },
  { id: "promo", x: 326, y: 82, w: 92, h: 92, state: "bad" },
  { id: "qty", x: 40, y: 163, w: 120, h: 18, state: "warn" },
  { id: "mrp", x: 40, y: 188, w: 196, h: 14, state: "warn" },
  { id: "mfg", x: 40, y: 214, w: 268, h: 28, state: "bad" },
  { id: "date", x: 40, y: 247, w: 86, h: 13, state: "ok" },
  { id: "origin", x: 132, y: 247, w: 138, h: 13, state: "bad" },
  { id: "care", x: 40, y: 263, w: 262, h: 13, state: "ok" },
  { id: "bar", x: 326, y: 228, w: 86, h: 52, state: "ok" },
];

const STROKE = { ok: "#2e6b4f", warn: "#8a5d0b", bad: "#993030" };

export function LabelEvidenceViewer({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-gov border border-line bg-[#edf1e9] p-2.5">
      <svg
        viewBox="0 0 460 320"
        className="block h-auto w-full"
        role="img"
        aria-label="Captured front panel of the pack with detection overlays"
      >
        <rect width="460" height="320" fill="#dde3d8" />
        <rect x="26" y="14" width="408" height="292" rx="6" fill="#f2ecdc" stroke="#c6bfa6" />
        <rect x="26" y="14" width="408" height="52" rx="6" fill="#3d6b4a" />
        <text x="44" y="38" fontFamily="serif" fontSize="17" fontWeight="700" fill="#f3f7f1">
          Annapurna Select
        </text>
        <text x="44" y="55" fontSize="11" fill="#c8dcc9">
          Since 1994 · Sona Masoori &amp; Basmati
        </text>
        <text x="44" y="100" fontFamily="serif" fontSize="25" fontWeight="700" fill="#2a2418">
          Premium Basmati Rice
        </text>
        <text x="44" y="126" fontSize="13" fill="#5a5240">
          Aged 12 months · Extra long grain
        </text>

        <circle cx="372" cy="128" r="46" fill="#c1462f" />
        <text x="372" y="122" textAnchor="middle" fontSize="21" fontWeight="700" fill="#fff">
          ₹99
        </text>
        <text x="372" y="141" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fbe3d8">
          ONLY*
        </text>

        <text x="44" y="176" fontSize="14" fontWeight="600" fill="#2a2418">
          Net Qty: 500 g
        </text>
        <text x="44" y="198" fontSize="9" fill="#2a2418">
          M.R.P. ₹ 499.00 (incl. of all taxes)
        </text>
        <text x="44" y="224" fontSize="9" fill="#4a4433">
          Mfd &amp; Packed by: Annapurna Foods Pvt. Ltd.,
        </text>
        <text x="44" y="236" fontSize="9" fill="#4a4433">
          Ambattur, Chennai
        </text>
        <text x="44" y="256" fontSize="9" fill="#4a4433">
          Packed: 03/2026 · Country of Origin: India
        </text>
        <text x="44" y="272" fontSize="9" fill="#4a4433">
          Consumer care: care@annapurnafoods.in · 1800-XXX-4417
        </text>

        <g transform="translate(330,232)">
          {Array.from({ length: 26 }, (_, i) => (
            <rect
              key={i}
              x={i * 3.1}
              y={0}
              width={i % 3 ? 1.3 : 2.2}
              height={34}
              fill="#2a2418"
            />
          ))}
          <text x="0" y="46" fontFamily="monospace" fontSize="8" fill="#2a2418">
            8901234567890
          </text>
        </g>

        {REGIONS.map((r) => {
          const isSel = selected === r.id;
          return (
            <motion.rect
              key={r.id}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={2}
              onClick={() => onSelect(r.id)}
              className="cursor-pointer"
              animate={{
                fill: isSel ? "rgba(224,123,37,0.16)" : "rgba(0,0,0,0)",
                stroke: isSel ? "#b8860b" : STROKE[r.state],
                strokeWidth: isSel ? 3 : 2,
              }}
              transition={{ duration: 0.18 }}
              strokeDasharray={isSel || r.state === "ok" ? undefined : "5 3"}
            >
              <title>{r.id}</title>
            </motion.rect>
          );
        })}
      </svg>
    </div>
  );
}
