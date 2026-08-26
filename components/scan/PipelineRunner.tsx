"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { EXTRACTED, PIPELINE_STAGES } from "@/lib/data/inspection";

export function PipelineRunner() {
  const [stage, setStage] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const done = stage >= PIPELINE_STAGES.length - 1;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage(0);
    PIPELINE_STAGES.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(setTimeout(() => setStage(i), i * 520));
    });
  }, []);

  const progress = stage < 0 ? 0 : (stage / (PIPELINE_STAGES.length - 1)) * 100;

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 text-[0.8rem]">
        {PIPELINE_STAGES.map((s, i) => {
          const state = stage < 0 ? "idle" : i < stage ? "done" : i === stage ? "now" : "idle";
          return (
            <span key={s} className="flex items-center gap-1.5">
              <span
                className={`rounded-full border px-2.5 py-1 ${
                  state === "done"
                    ? "border-ok/30 bg-ok-bg font-semibold text-ok"
                    : state === "now"
                      ? "border-matcha bg-matcha font-semibold text-white"
                      : "border-line bg-white text-ink-3"
                }`}
              >
                {s}
              </span>
              {i < PIPELINE_STAGES.length - 1 && <span className="text-ink-3">›</span>}
            </span>
          );
        })}
      </div>

      <div className="my-2.5 h-1.5 overflow-hidden rounded-sm bg-tint">
        <motion.div
          className="h-full bg-matcha"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {stage < 0 && (
        <p className="text-[0.85rem] text-ink-3">Analysis has not been run for this inspection.</p>
      )}

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Callout>
            <b>Category detected:</b> Food — Cereal / Rice (pre-packed), confidence 95%. Rule set{" "}
            <span className="font-mono text-[0.82rem]">LMPC + LMNS as on 14 Aug 2026</span> selected
            automatically — 17 rules applicable.
          </Callout>

          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="bad">3 major</Chip>
            <Chip tone="warn">1 minor</Chip>
            <Chip tone="info">1 needs review</Chip>
            <Chip tone="ok">5 compliant</Chip>
            <Link
              href="/report"
              className="rounded-gov border border-matcha bg-matcha px-3.5 py-1.5 text-[0.88rem] font-semibold text-white hover:bg-matcha-hover"
            >
              Open compliance report
            </Link>
          </div>

          <DataTable headers={["Declaration", "Extracted value", "Conf.", "Source"]}>
            {EXTRACTED.map((e) => (
              <Tr key={e.field}>
                <Td>
                  <b>{e.field}</b>
                </Td>
                <Td>{e.value}</Td>
                <Td mono>{e.confidence ? `${e.confidence}%` : "—"}</Td>
                <Td className="text-ink-3">{e.source}</Td>
              </Tr>
            ))}
          </DataTable>
        </motion.div>
      )}

      {!done && stage >= 0 && (
        <p className="text-[0.85rem] text-ink-3">Running {PIPELINE_STAGES[stage]}…</p>
      )}

      <div className="mt-3">
        <Button onClick={run}>{stage < 0 ? "Run analysis" : "Run again"}</Button>
      </div>
    </>
  );
}
