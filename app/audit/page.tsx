import { PageHeader, Button } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { AUDIT, ROLES } from "@/lib/data/registry";

export default function AuditPage() {
  return (
    <>
      <PageHeader
        crumb="Records › Audit trail"
        title="Audit trail"
        intro="An append-only record of every action taken in the system. Entries cannot be edited or deleted by any role, including administrators."
        actions={<Button variant="secondary">Export trail</Button>}
      />

      <Card title="Recent activity" subtitle="All roles · Chennai (South)" padded={false} className="mb-4">
        <DataTable headers={["Timestamp", "User", "Action", "Object", "Source"]}>
          {AUDIT.map((a) => (
            <Tr key={a.at + a.action}>
              <Td mono>{a.at}</Td>
              <Td>
                <b>{a.user}</b>
              </Td>
              <Td>{a.action}</Td>
              <Td mono>{a.object}</Td>
              <Td mono className="text-ink-3">
                {a.source}
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Roles in this deployment">
          <dl className="space-y-2 text-[0.87rem]">
            {ROLES.map((r) => (
              <div key={r.role}>
                <dt className="font-semibold">{r.role}</dt>
                <dd className="m-0 text-ink-3">{r.scope}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title="Separation of duties" className="xl:col-span-2">
          <p className="mb-3 text-[0.9rem]">
            The officer who captures an inspection cannot also be the sole confirmer of a major
            finding, and the administrator who manages accounts has no route to alter a finding or a
            notice. Rule authoring sits with the Controller and requires a gazette citation. These
            constraints are what make the output usable as evidence rather than as an internal note.
          </p>
          <Callout>
            Sensitive actions — confirming a violation, issuing a notice, amending a rule, exporting a
            report — are recorded with the user, the object, the source address and the exact time,
            and are retained for the statutory period.
          </Callout>
        </Card>
      </div>
    </>
  );
}
