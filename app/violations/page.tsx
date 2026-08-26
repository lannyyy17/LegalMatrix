import { PageHeader, Button } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip, type ChipTone } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { NOTICES } from "@/lib/data/registry";
import type { Notice } from "@/lib/types";

const LIFECYCLE = [
  "Detected by system",
  "Confirmed by officer",
  "Notice issued",
  "Explanation received",
  "Compounded / escalated",
  "Closed",
];

const STATUS_TONE: Record<Notice["status"], ChipTone> = {
  PENDING_RESPONSE: "warn",
  EXPLANATION_RECEIVED: "info",
  COMPOUNDED: "ok",
  ESCALATED_TO_COURT: "bad",
  CLOSED: "mute",
};

export default function ViolationsPage() {
  return (
    <>
      <PageHeader
        crumb="Enforcement › Violations & notices"
        title="Violations and notices"
        intro="Findings confirmed by an officer become violations. A violation may be escalated into a notice against the entity."
        actions={<Button>Issue notice</Button>}
      />

      <Card title="Finding lifecycle" subtitle="Nothing advances without a named officer" className="mb-4">
        <div className="flex flex-wrap items-center gap-1.5 text-[0.85rem]">
          {LIFECYCLE.map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span
                className={`rounded-full border px-2.5 py-1 ${
                  i < 2
                    ? "border-ok/30 bg-ok-bg font-semibold text-ok"
                    : i === 2
                      ? "border-matcha bg-matcha font-semibold text-white"
                      : "border-line bg-white text-ink-3"
                }`}
              >
                {s}
              </span>
              {i < LIFECYCLE.length - 1 && <span className="text-ink-3">›</span>}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[0.85rem] text-ink-3">
          A finding dismissed at any stage requires a written reason, which is retained permanently in
          the audit trail alongside the identity of the officer who dismissed it.
        </p>
      </Card>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Open violations" value="386" detail="142 major" tone="bad" />
        <StatTile label="Notices pending response" value="92" detail="17 past the due date" tone="warn" />
        <StatTile label="Compounded this year" value="148" detail="₹ 21.4 lakh realised" tone="info" />
        <StatTile label="Escalated to court" value="23" detail="6 listed this month" />
      </div>

      <Card title="Notices" subtitle="Chennai (South) circle" padded={false}>
        <DataTable
          headers={["Notice no.", "Entity", "Commodity", "Section", "Status", "Officer", "Issued", "Response due"]}
        >
          {NOTICES.map((n) => (
            <Tr key={n.id}>
              <Td mono>{n.id}</Td>
              <Td>
                <b>{n.entity}</b>
              </Td>
              <Td>{n.product}</Td>
              <Td mono>{n.section}</Td>
              <Td>
                <Chip tone={STATUS_TONE[n.status]}>{n.status.replace(/_/g, " ").toLowerCase()}</Chip>
              </Td>
              <Td>{n.officer}</Td>
              <Td>{n.issued}</Td>
              <Td>{n.due}</Td>
            </Tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}
