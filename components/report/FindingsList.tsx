"use client";

import { AnimatePresence, motion } from "motion/react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/layout/PageHeader";
import type { Finding, Severity } from "@/lib/types";

const DOT: Record<Severity, string> = {
  major: "bg-bad",
  minor: "bg-warn",
  review: "bg-info",
  ok: "bg-ok",
};

function severityChip(s: Severity) {
  if (s === "major") return <Chip tone="bad">Major violation</Chip>;
  if (s === "minor") return <Chip tone="warn">Minor issue</Chip>;
  if (s === "review") return <Chip tone="info">Needs human review</Chip>;
  return <Chip tone="ok">Compliant</Chip>;
}

export function FindingsList({
  findings,
  selected,
  onSelect,
}: {
  findings: Finding[];
  selected: string | null;
  onSelect: (regionId: string | null) => void;
}) {
  return (
    <div className="space-y-2.5">
      {findings.map((f) => {
        const open = selected !== null && selected === f.regionId;
        return (
          <div
            key={f.id}
            id={`finding-${f.id}`}
            className={`rounded-gov border bg-white transition-shadow ${
              open ? "border-[#b8860b] shadow-[0_0_0_2px_rgba(184,134,11,0.18)]" : "border-line"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(f.regionId)}
              aria-expanded={open}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
            >
              <span className={`size-2.5 shrink-0 rounded-full ${DOT[f.severity]}`} aria-hidden />
              <span className="flex-1">
                <b className="block">{f.title}</b>
                <span className="font-mono text-[0.78rem] text-ink-3">{f.rule}</span>
              </span>
              {severityChip(f.severity)}
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-dashed border-line px-3.5 py-3 text-[0.86rem]">
                    <dt className="text-ink-3">Evidence</dt>
                    <dd className="m-0">{f.evidence}</dd>
                    <dt className="text-ink-3">Requirement</dt>
                    <dd className="m-0">{f.requirement}</dd>
                    <dt className="text-ink-3">Rule version</dt>
                    <dd className="m-0 font-mono text-[0.8rem]">{f.ruleVersion}</dd>
                    <dt className="text-ink-3">Confidence</dt>
                    <dd className="m-0 font-mono">{f.confidence}%</dd>
                    <dt className="text-ink-3">Correction</dt>
                    <dd className="m-0">{f.correction}</dd>
                  </dl>

                  {f.severity !== "ok" && (
                    <div className="flex flex-wrap gap-2 px-3.5 pb-3.5">
                      <Button>Confirm as violation</Button>
                      <Button variant="secondary">Dismiss with reason</Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
