import { PageHeader, Button } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { RuleVersionExplorer } from "@/components/rules/RuleVersionExplorer";
import { RULE_REGISTRY } from "@/lib/data/rules";
import { HEIGHT_TABLE_I } from "@/lib/rules/engine";

export default function RulesPage() {
  return (
    <>
      <PageHeader
        crumb="System › Rule engine"
        title="Rule registry"
        intro="The Rules are not a fixed checklist. Each rule is stored with its source notification and the date it takes effect, so an inspection is always evaluated against the text that was in force on the date of inspection."
      />

      <Card
        title="Rule 6(10A) — country-of-origin filter"
        subtitle="Amended twice in three months. This is why versioning matters."
        className="mb-4"
      >
        <RuleVersionExplorer />
      </Card>

      <Card
        title="Rule 7 — Table-I"
        subtitle="Minimum height of numerals and letters by area of the principal display panel"
        padded={false}
        className="mb-4"
      >
        <DataTable
          headers={[
            "Area of principal display panel (cm²)",
            "Minimum height (mm)",
            "Minimum height when blown, formed or moulded (mm)",
          ]}
        >
          {HEIGHT_TABLE_I.map((b) => (
            <Tr key={b.label}>
              <Td>{b.label}</Td>
              <Td mono>{b.minMm.toFixed(1)}</Td>
              <Td mono>{b.minMouldedMm.toFixed(1)}</Td>
            </Tr>
          ))}
        </DataTable>
        <div className="p-4">
          <p className="text-[0.85rem] text-ink-3">
            Table substituted by G.S.R. 629(E) dated 23 June 2017. Rule 7(3) additionally requires the
            width of a letter or numeral to be at least one third of its height, except for the
            numeral 1 and the letters i, I and l. Rule 7(4) sets how the panel area is computed: for a
            rectangular pack, height × width of the display side; for a cylindrical pack, 40% of
            height × circumference; for any other shape, 40% of the total surface area.
          </p>
        </div>
      </Card>

      <Card
        title="Machine-checkable rules"
        subtitle={`${RULE_REGISTRY.length} of 214 shown`}
        right={<Button variant="secondary">Add rule version</Button>}
        padded={false}
      >
        <DataTable
          headers={["Rule ID", "Requirement", "Applies to", "Effective from", "Source notification", "Evidence", "Provenance"]}
        >
          {RULE_REGISTRY.map((r) => (
            <Tr key={`${r.ruleId}-${r.effectiveFrom}`}>
              <Td mono>{r.ruleId}</Td>
              <Td>{r.title}</Td>
              <Td className="text-ink-3">{r.appliesTo}</Td>
              <Td mono>{r.effectiveFrom}</Td>
              <Td mono className="text-[0.78rem] text-ink-3">
                {r.source}
              </Td>
              <Td className="text-ink-3">{r.evidence}</Td>
              <Td>
                {r.provenance === "cited" ? (
                  <Chip tone="ok">Cited</Chip>
                ) : (
                  <Chip tone="warn">Needs citation</Chip>
                )}
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <div className="mt-4">
        <Callout title="Seed data" tone="warn">
          Rules marked &ldquo;needs citation&rdquo; carry provisional values entered during setup. The
          engine will evaluate them, but every finding they produce is routed for manual review and
          cannot be the sole basis for a notice until an officer attaches the gazette reference.
        </Callout>
      </div>
    </>
  );
}
