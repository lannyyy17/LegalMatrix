import Link from "next/link";
import { PageHeader, Button } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip, scoreTone } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { REPOSITORY } from "@/lib/data/registry";

export default function RepositoryPage() {
  return (
    <>
      <PageHeader
        crumb="Records › Product repository"
        title="Product repository"
        intro="Every pack scanned in this circle, with its images, extracted declarations and full inspection history."
        actions={
          <>
            <Button variant="secondary">Export result set</Button>
            <Link
              href="/scan"
              className="rounded-gov border border-matcha bg-matcha px-3.5 py-1.5 text-[0.88rem] font-semibold text-white hover:bg-matcha-hover"
            >
              New inspection
            </Link>
          </>
        }
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[240px] flex-1">
            <label htmlFor="q" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
              Search
            </label>
            <input
              id="q"
              type="search"
              placeholder="Product, entity, GTIN or inspection number"
              className="w-full rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
            />
          </div>
          <Filter id="cat" label="Category" options={["All categories", "Food", "Cosmetic", "Household", "Electrical goods"]} />
          <Filter id="st" label="Status" options={["All", "Compliant", "Non-compliant", "Under review"]} />
          <div>
            <label htmlFor="from" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
              From
            </label>
            <input
              id="from"
              type="date"
              defaultValue="2026-08-01"
              className="rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
            />
          </div>
          <Button>Apply filters</Button>
        </div>
      </Card>

      <Card title="1,284 records" subtitle="Sorted by date of inspection" padded={false}>
        <DataTable
          headers={["Inspection no.", "Product", "Entity", "Category", "Inspected", "Score", "Status", ""]}
        >
          {REPOSITORY.map((r) => (
            <Tr key={r.id}>
              <Td mono>{r.id}</Td>
              <Td>
                <b>{r.name}</b>
              </Td>
              <Td>{r.entity}</Td>
              <Td className="text-ink-3">{r.category}</Td>
              <Td>{r.inspected}</Td>
              <Td>
                <Chip tone={scoreTone(r.score)}>{r.score}</Chip>
              </Td>
              <Td>
                <Chip tone={r.status === "Compliant" ? "ok" : r.status === "Non-compliant" ? "bad" : "info"}>
                  {r.status}
                </Chip>
              </Td>
              <Td>
                <Link href="/report" className="text-[0.82rem] font-semibold text-matcha underline">
                  Open
                </Link>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>
    </>
  );
}

function Filter({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
        {label}
      </label>
      <select
        id={id}
        className="rounded-gov border border-line-strong bg-white px-2.5 py-1.5 text-[0.9rem]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
