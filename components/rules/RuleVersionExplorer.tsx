"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Callout } from "@/components/ui/Card";
import { RULE_REGISTRY } from "@/lib/data/rules";
import { resolveVersion } from "@/lib/rules/engine";

const RULE_ID = "LMPC-6(10A)";

/**
 * The single most important interaction in the product. Change the
 * date and watch which text of sub-rule 6(10A) applies. The engine
 * function doing the work is lib/rules/engine.ts — nothing about the
 * two versions is hard-coded into this component.
 */
export function RuleVersionExplorer() {
  const [asOn, setAsOn] = useState("2026-08-14");

  const resolved = useMemo(() => resolveVersion(RULE_REGISTRY, RULE_ID, asOn), [asOn]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="ason" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
            Evaluate as on
          </label>
          <input
            id="ason"
            type="date"
            value={asOn}
            onChange={(e) => setAsOn(e.target.value)}
            className="rounded-gov border border-line-strong bg-white px-2.5 py-1.5 text-[0.9rem]"
          />
        </div>
        <p className="pb-1.5 text-[0.9rem]">
          <span className="text-ink-3">Text applied on this date: </span>
          <motion.b
            key={resolved.applicable?.source ?? "none"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[0.84rem]"
          >
            {resolved.applicable?.source ?? "Not yet in force"}
          </motion.b>
        </p>
      </div>

      <ol className="ml-2 list-none border-l-2 border-line-strong pl-4">
        <TimelineItem
          active={asOn < "2026-07-01"}
          title="Before 1 July 2026 — no filter obligation"
          note="Listings of imported products carried no platform-level origin requirement under these Rules."
        />
        {resolved.history.map((v) => {
          const isApplied = resolved.applicable?.source === v.source;
          return (
            <TimelineItem
              key={v.source}
              active={isApplied}
              future={v.effectiveFrom > asOn}
              title={`${formatDate(v.effectiveFrom)} — ${
                v.source.startsWith("G.S.R. 128") ? "sub-rule 6(10A) inserted" : "sub-rule 6(10A) substituted"
              }`}
              source={v.source}
              note={v.title}
            />
          );
        })}
      </ol>

      <div className="mt-4">
        <Callout title="Why this matters for enforcement">
          A listing inspected in September 2026 is judged against the inserted text; the same listing
          inspected in September 2027 is judged against the substituted text. Reopening an old
          inspection re-runs it against the version in force on its original date, never against
          today&rsquo;s.
        </Callout>
      </div>
    </>
  );
}

function TimelineItem({
  active,
  future,
  title,
  source,
  note,
}: {
  active: boolean;
  future?: boolean;
  title: string;
  source?: string;
  note: string;
}) {
  return (
    <li className="relative pb-4">
      <span
        aria-hidden
        className={`absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] ${
          active ? "border-matcha bg-matcha" : future ? "border-dashed border-line-strong bg-white" : "border-line-strong bg-white"
        }`}
      />
      <b>{title}</b>
      <br />
      {source && <span className="font-mono text-[0.8rem] text-ink-3">{source}. </span>}
      <span className="text-[0.87rem] text-ink-3">{note}</span>
    </li>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
