import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { MeterBar, StatTile } from "@/components/ui/StatTile";
import { PRIORITY_QUEUE, VIOLATION_TYPES } from "@/lib/data/registry";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        crumb="Enforcement"
        title="Enforcement dashboard"
        intro="Chennai (South) circle · period 1–14 August 2026. Figures refresh as inspections are recorded."
        actions={
          <>
            <Link
              href="/rules"
              className="rounded-gov border border-line-strong bg-white px-3.5 py-1.5 text-[0.88rem] font-semibold text-matcha hover:bg-tint-2"
            >
              Rule registry
            </Link>
            <Link
              href="/scan"
              className="rounded-gov border border-matcha bg-matcha px-3.5 py-1.5 text-[0.88rem] font-semibold text-white hover:bg-matcha-hover"
            >
              Start new inspection
            </Link>
          </>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Inspections recorded" value="1,284" detail="+118 against the previous period" />
        <StatTile label="Compliance rate" value="71.4%" detail="917 packs cleared without findings" tone="warn" />
        <StatTile label="Open violations" value="386" detail="142 major · 244 minor" tone="bad" />
        <StatTile label="Notices awaiting response" value="92" detail="17 past the response date" tone="info" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
        <Card
          title="Inspection priority queue"
          subtitle="Ranked by composite risk, not by scan order"
          right={<span className="text-[0.82rem] text-ink-3">1,284 scanned · 8 shown</span>}
          padded={false}
        >
          <DataTable headers={["Product", "Entity", "Risk", "Drivers", "Recommendation"]}>
            {PRIORITY_QUEUE.map((q) => (
              <Tr key={q.product}>
                <Td>
                  <b>{q.product}</b>
                </Td>
                <Td>{q.entity}</Td>
                <Td>
                  <span className="flex items-center gap-2">
                    <span className="w-[70px]">
                      <MeterBar value={q.risk} tone={q.risk >= 80 ? "bad" : q.risk >= 60 ? "warn" : undefined} />
                    </span>
                    <b className="font-mono">{q.risk}</b>
                  </span>
                </Td>
                <Td className="text-ink-3">{q.drivers}</Td>
                <Td>
                  <Chip tone={q.risk >= 90 ? "bad" : q.risk >= 70 ? "warn" : q.risk >= 40 ? "info" : "mute"}>
                    {q.action}
                  </Chip>
                </Td>
              </Tr>
            ))}
          </DataTable>
        </Card>

        <div className="space-y-4">
          <Card title="Most frequent violations" subtitle="Rolling 90 days">
            <div className="space-y-2.5">
              {VIOLATION_TYPES.map((v) => (
                <div key={v.label}>
                  <div className="flex justify-between text-[0.85rem]">
                    <span>{v.label}</span>
                    <b className="font-mono">{v.count}</b>
                  </div>
                  <MeterBar value={v.pct} />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Rule changes affecting this circle">
            <ol className="ml-2 list-none border-l-2 border-line-strong pl-4 text-[0.87rem]">
              <li className="relative pb-4">
                <span aria-hidden className="absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] border-matcha bg-matcha" />
                <b>Rule 6(10A) in force</b> — 1 July 2026
                <br />
                <span className="text-ink-3">
                  G.S.R. 128(E). A country-of-origin filter is required on listings of imported
                  products. 214 listings in this circle are now in scope.
                </span>
              </li>
              <li className="relative pb-1">
                <span aria-hidden className="absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] border-dashed border-line-strong bg-white" />
                <b>Rule 6(10A) substituted</b> — 1 July 2027
                <br />
                <span className="text-ink-3">
                  G.S.R. 312(E). Evaluations dated on or after this date will use the substituted
                  text automatically.
                </span>
              </li>
            </ol>
            <Link href="/rules" className="text-[0.88rem] font-semibold text-matcha underline">
              Open the rule registry
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
