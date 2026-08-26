import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { CROSS_CHANNEL, INSPECTION } from "@/lib/data/inspection";

export default function CrossChannelPage() {
  return (
    <>
      <PageHeader
        crumb="Enforcement › Cross-channel check"
        title="Cross-channel verification"
        intro="The same commodity is compared across three sources of truth: the physical pack, the declarations retrieved from the pack's QR code, and the live marketplace listing."
        actions={
          <Link
            href="/report"
            className="rounded-gov border border-line-strong bg-white px-3.5 py-1.5 text-[0.88rem] font-semibold text-matcha hover:bg-tint-2"
          >
            Back to the report
          </Link>
        }
      />

      <div className="mb-4">
        <Callout title="Why three sources">
          A pack can be compliant on the shelf and misdeclared online, or the reverse. Rule 6(10A)
          made the listing itself checkable, so the listing is evidence in its own right — not a
          convenience copy of the label.
        </Callout>
      </div>

      <Card
        title={`${INSPECTION.product} — ${INSPECTION.netQuantity}`}
        subtitle="GTIN 8901234567890 · listing captured 14 Aug 2026, 12:01"
        right={<Chip tone="bad">2 mismatches · 3 discrepancies</Chip>}
        padded={false}
        className="mb-4"
      >
        <DataTable
          headers={["Declaration", "Physical pack", "QR / digital record", "Marketplace listing", "Result"]}
        >
          {CROSS_CHANNEL.map((c) => (
            <Tr key={c.field}>
              <Td>
                <b>{c.field}</b>
              </Td>
              <Td>{c.pack}</Td>
              <Td>{c.qr}</Td>
              <Td className={c.state === "mismatch" ? "font-semibold text-bad" : ""}>{c.listing}</Td>
              <Td>
                {c.state === "match" && <Chip tone="ok">Match</Chip>}
                {c.state === "discrepancy" && <Chip tone="warn">Discrepancy</Chip>}
                {c.state === "mismatch" && <Chip tone="bad">Mismatch</Chip>}
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Platform-level check — Rule 6(10A)" subtitle="Tested against the marketplace, not the listing">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.87rem]">
            <dt className="text-ink-3">Platform</dt>
            <dd className="m-0">marketplace-example.in</dd>
            <dt className="text-ink-3">Rule version applied</dt>
            <dd className="m-0 font-mono text-[0.82rem]">G.S.R. 128(E) — in force 1 July 2026</dd>
            <dt className="text-ink-3">Origin filter present</dt>
            <dd className="m-0">
              <Chip tone="bad">Not found in category navigation</Chip>
            </dd>
            <dt className="text-ink-3">Filter searchable</dt>
            <dd className="m-0">
              <Chip tone="bad">No</Chip>
            </dd>
            <dt className="text-ink-3">Filter sortable</dt>
            <dd className="m-0">
              <Chip tone="bad">No</Chip>
            </dd>
            <dt className="text-ink-3">Imported listings in category</dt>
            <dd className="m-0 font-mono">1,842</dd>
          </dl>

          <div className="mt-3.5">
            <Callout tone="warn">
              This is a platform obligation, not a seller obligation. The finding attaches to the
              e-commerce entity and is routed to the Controller for the circle rather than to the
              packer.
            </Callout>
          </div>
        </Card>

        <Card title="Where the declarations diverge">
          <p className="mb-3 text-[0.88rem]">
            The QR record matches the pack on every field, which rules out a printing error and points
            to the listing as the source of divergence. Two consequences follow.
          </p>
          <ol className="ml-2 list-none border-l-2 border-line-strong pl-4">
            {[
              ["Net quantity: 500 g on the pack, 1 kg online", "A consumer ordering from the listing receives half the declared quantity at a lower displayed price. Referred as a major finding.", true],
              ["Origin: India on the pack, China online", "One of the two is incorrect. The importer registration on file references a Chinese consignor, so the pack declaration is the one to verify first.", true],
              ["Price: ₹499 on the pack, ₹449 online", "Selling below the MRP is not itself a violation. Flagged as a discrepancy for context, not as a finding.", false],
            ].map(([title, note, active]) => (
              <li key={title as string} className="relative pb-4">
                <span
                  aria-hidden
                  className={`absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] ${
                    active ? "border-matcha bg-matcha" : "border-line-strong bg-white"
                  }`}
                />
                <b>{title as string}</b>
                <br />
                <span className="text-[0.87rem] text-ink-3">{note as string}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
