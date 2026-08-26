import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip, scoreTone } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { MeterBar } from "@/components/ui/StatTile";
import { ENTITIES, ENTITY_HISTORY, RECURRING_PATTERN } from "@/lib/data/registry";

export default function EntitiesPage() {
  return (
    <>
      <PageHeader
        crumb="Records › Entity registry"
        title="Entity registry"
        intro="Manufacturers, packers and importers, with their registration status and compliance history across all inspections."
      />

      <Card title="Registered entities" subtitle="2,417 total · 5 shown" padded={false} className="mb-4">
        <DataTable
          headers={["Entity", "Registration", "Type", "Location", "Inspections", "Violations", "Score", "Risk tier", "Status"]}
        >
          {ENTITIES.map((e) => (
            <Tr key={e.registration}>
              <Td>
                <b>{e.name}</b>
              </Td>
              <Td mono>{e.registration}</Td>
              <Td className="text-ink-3">{e.type}</Td>
              <Td>{e.location}</Td>
              <Td mono>{e.inspections}</Td>
              <Td mono>{e.violations}</Td>
              <Td>
                <Chip tone={scoreTone(e.score)}>{e.score}</Chip>
              </Td>
              <Td>
                <Chip tone={e.risk === "HIGH" ? "bad" : e.risk === "MEDIUM" ? "warn" : "ok"}>
                  {e.risk.charAt(0) + e.risk.slice(1).toLowerCase()}
                </Chip>
              </Td>
              <Td>
                <Chip tone={e.status === "REGISTERED" ? "ok" : e.status === "LICENSE_EXPIRED" ? "warn" : "bad"}>
                  {e.status.replace(/_/g, " ").toLowerCase()}
                </Chip>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card
          title="Annapurna Foods Pvt. Ltd."
          subtitle="LM/TN/2019/004417 · 34 inspections since 2019"
          right={<Chip tone="bad">High risk</Chip>}
        >
          <p className="mb-3 text-[0.9rem]">
            This entity&rsquo;s declaration-related findings run consistently above the baseline for
            pre-packed cereal manufacturers in the same circle. The pattern is concentrated in address
            completeness rather than spread evenly across rules, which is the signature of an artwork
            problem rather than an isolated batch.
          </p>

          <div className="space-y-3">
            {RECURRING_PATTERN.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between text-[0.85rem]">
                  <span>{p.label}</span>
                  <span>
                    <b className="font-mono">{p.count}</b>{" "}
                    <span className="text-ink-3">versus baseline {p.baseline}</span>
                  </span>
                </div>
                <MeterBar value={(p.count / 20) * 100} tone="bad" />
                <div className="mt-0.5 h-[5px] overflow-hidden rounded-sm bg-tint">
                  <div className="h-full bg-matcha-mid" style={{ width: `${(p.baseline / 20) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[0.78rem] text-ink-3">
            Upper bar: this entity. Lower bar: the category baseline for the circle.
          </p>
        </Card>

        <Card title="History">
          <ol className="ml-2 list-none border-l-2 border-line-strong pl-4">
            {ENTITY_HISTORY.map((h) => (
              <li key={h.when} className="relative pb-4">
                <span
                  aria-hidden
                  className={`absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] ${
                    h.active ? "border-matcha bg-matcha" : "border-line-strong bg-white"
                  }`}
                />
                <b>
                  {h.when} — {h.title}
                </b>
                <br />
                <span className="text-[0.87rem] text-ink-3">{h.note}</span>
              </li>
            ))}
          </ol>
          <Callout tone="warn">
            The same address defect has now recurred across three separate products. Recommend a
            licence-level review rather than another product-level notice.
          </Callout>
        </Card>
      </div>
    </>
  );
}
