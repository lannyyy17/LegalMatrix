import type { ReactNode } from "react";

export type ChipTone = "ok" | "warn" | "bad" | "info" | "mute";

const TONES: Record<ChipTone, string> = {
  ok: "bg-ok-bg text-ok border-ok/25",
  warn: "bg-warn-bg text-warn border-warn/25",
  bad: "bg-bad-bg text-bad border-bad/25",
  info: "bg-info-bg text-info border-info/25",
  mute: "bg-tint text-ink-3 border-line",
};

export function Chip({ tone = "mute", children }: { tone?: ChipTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-[1px] text-[0.74rem] font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function scoreTone(score: number): ChipTone {
  if (score >= 90) return "ok";
  if (score >= 70) return "warn";
  return "bad";
}
