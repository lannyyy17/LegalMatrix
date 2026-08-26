import Link from "next/link";
import { PageHeader, Button } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { MeterBar } from "@/components/ui/StatTile";
import { ScoreDial } from "@/components/report/ScoreDial";
import { ReportClient } from "./ReportClient";
import { INSPECTION, MEASUREMENTS, SCORE_DIMENSIONS } from "@/lib/data/inspection";
import { UNIT_CHECKS } from "@/lib/data/rules";

export default function ReportPage() {
  return (
    <>
      <PageHeader
        crumb="Enforcement › New inspection › Compliance report"
        title={`${INSPECTION.product} — ${INSPECTION.netQuantity}`}
        intro={`${INSPECTION.id} · ${INSPECTION.entity} · inspected ${INSPECTION.at} by ${INSPECTION.officer}`}
        actions={
          <>
            <Link
              href="/cross-channel"
              className="rounded-gov border border-line-strong bg-white px-3.5 py-1.5 text-[0.88rem] font-semibold text-matcha hover:bg-tint-2"
            >
              Cross-channel check
            </Link>
            <Button variant="secondary">Export PDF</Button>
            <Button>Export DOCX</Button>
          </>
        }
      />

      <div className="mb-4 grid gap-4 xl:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <ScoreDial score={INSPECTION.score} />
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-ink-3">
                Compliance score
              </p>
              <p className="my-1">
                <Chip tone="bad">Non-compliant</Chip>
              </p>
              <p className="text-[0.85rem] text-ink-3">
                Enforcement risk <b className="font-mono">{INSPECTION.risk}</b> — high priority
              </p>
            </div>
          </div>
        </Card>

        <Card
          title="Score by dimension"
          subtitle="Each dimension traces to the rules evaluated below"
          className="xl:col-span-3"
        >
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {SCORE_DIMENSIONS.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-[0.84rem]">
                  <span>{d.label}</span>
                  <b className="font-mono">{d.value}%</b>
                </div>
                <MeterBar value={d.value} tone={d.value >= 80 ? undefined : d.value >= 60 ? "warn" : "bad"} />
                <p className="text-[0.75rem] text-ink-3">{d.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ReportClient />

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="Measurement record" subtitle="Rule 7(2) Table-I and Rule 7(3)" padded={false}>
          <DataTable headers={["Element", "Measured height", "Width / height", "Required", "Result"]}>
            {MEASUREMENTS.map((m) => (
              <Tr key={m.element}>
                <Td>{m.element}</Td>
                <Td mono>
                  {m.measuredMm.toFixed(2)} mm ± {m.toleranceMm}
                </Td>
                <Td mono>{m.widthRatio.toFixed(2)}</Td>
                <Td mono>{m.requiredMm ? `${m.requiredMm.toFixed(2)} mm` : "—"}</Td>
                <Td>
                  {m.verdict === "below" && <Chip tone="bad">Below minimum</Chip>}
                  {m.verdict === "threshold" && <Chip tone="warn">At the threshold</Chip>}
                  {m.verdict === "meets" && <Chip tone="ok">Meets minimum</Chip>}
                  {m.verdict === "note" && <Chip tone="bad">{m.note}</Chip>}
                </Td>
              </Tr>
            ))}
          </DataTable>
          <div className="p-4">
            <p className="text-[0.82rem] text-ink-3">
              The principal display panel computes to {INSPECTION.panelAreaCm2} cm² by the Rule 7(4)
              method for a rectangular pack, giving a Table-I minimum of 2.50 mm. Rule 7(3)
              additionally requires width to be at least one third of height. A measurement whose
              tolerance band crosses a threshold is never auto-failed — it is routed for manual
              verification.
            </p>
          </div>
        </Card>

        <Card
          title="Unit and symbol validation"
          subtitle="Legal Metrology (National Standards) Rules, 2011"
          padded={false}
        >
          <div className="px-4 pt-3">
            <p className="text-[0.85rem] text-ink-3">
              A quantity can be present, legible and still wrongly written. These checks come from the
              Third Schedule, which fixes how unit symbols may be printed.
            </p>
          </div>
          <div className="mt-2">
            <DataTable headers={["As it would appear", "Verdict", "Basis"]}>
              {UNIT_CHECKS.map((u) => (
                <Tr key={u.written}>
                  <Td mono>
                    <b>{u.written}</b>
                  </Td>
                  <Td>
                    {u.verdict === "correct" && <Chip tone="ok">Correct</Chip>}
                    {u.verdict === "defective" && <Chip tone="warn">Defective</Chip>}
                    {u.verdict === "not-permitted" && <Chip tone="bad">Not permitted</Chip>}
                  </Td>
                  <Td className="text-ink-3">{u.basis}</Td>
                </Tr>
              ))}
            </DataTable>
          </div>
          <div className="p-4">
            <p className="text-[0.82rem] text-ink-3">
              This pack declares <span className="font-mono">500 g</span> and passes every syntax
              check.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Callout title="Advisory output" tone="warn">
          LegalMatrix produces findings for an officer to act on. It does not determine that an
          offence has been committed, and no notice is issued without confirmation by an authorised
          Legal Metrology Officer.
        </Callout>
      </div>
    </>
  );
}
