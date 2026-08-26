"use client";

import { useState } from "react";
import { LabelEvidenceViewer } from "@/components/report/LabelEvidenceViewer";
import { FindingsList } from "@/components/report/FindingsList";
import { Card } from "@/components/ui/Card";
import { FINDINGS } from "@/lib/data/inspection";

/**
 * Holds the one piece of state the report screen actually needs: which
 * region of the label is selected. Selecting a finding highlights the
 * pixels it came from, and clicking the pack opens the finding. That
 * link between claim and evidence is the point of the whole screen.
 */
export function ReportClient() {
  const [selected, setSelected] = useState<string | null>(null);

  function select(regionId: string | null) {
    if (!regionId) return;
    const next = selected === regionId ? null : regionId;
    setSelected(next);
    if (next) {
      const finding = FINDINGS.find((f) => f.regionId === next);
      if (finding) {
        document
          .getElementById(`finding-${finding.id}`)
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
      <Card
        title="Evidence viewer"
        subtitle="Select a finding to locate it on the pack"
        right={<span className="text-[0.82rem] text-ink-3">Front panel · 4.1 MP · 11.42 px/mm</span>}
      >
        <LabelEvidenceViewer selected={selected} onSelect={select} />
        <div className="mt-2.5 flex flex-wrap gap-4 text-[0.8rem] text-ink-3">
          <span>
            <b className="text-ok">▭</b> compliant
          </span>
          <span>
            <b className="text-warn">▭</b> below threshold
          </span>
          <span>
            <b className="text-bad">▭</b> violation
          </span>
          <span>Click any region on the pack to jump to its finding.</span>
        </div>
      </Card>

      <Card
        title="Findings"
        subtitle="17 rules evaluated"
        right={
          <span className="text-[0.82rem] text-ink-3">3 major · 1 minor · 1 review</span>
        }
      >
        <FindingsList findings={FINDINGS} selected={selected} onSelect={select} />
      </Card>
    </div>
  );
}
