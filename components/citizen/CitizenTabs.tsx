"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { ADDITIVES } from "@/lib/data/registry";

type Tab = "check" | "label" | "report";

const TABS: { id: Tab; label: string }[] = [
  { id: "check", label: "Check declarations" },
  { id: "label", label: "Label intelligence" },
  { id: "report", label: "Report a pack" },
];

export function CitizenTabs() {
  const [tab, setTab] = useState<Tab>("check");

  return (
    <>
      <div role="tablist" className="mb-4 flex flex-wrap gap-0.5 border-b-2 border-line-strong">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`border-b-[3px] px-3.5 py-2 text-[0.9rem] ${
              tab === t.id
                ? "border-b-matcha font-semibold text-matcha"
                : "border-b-transparent text-ink-2 hover:text-matcha"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        {tab === "check" && <CheckPanel />}
        {tab === "label" && <LabelPanel />}
        {tab === "report" && <ReportPanel />}
      </motion.div>
    </>
  );
}

function CheckPanel() {
  const rows: [string, "ok" | "warn" | "bad", string][] = [
    ["Name and complete address of the manufacturer, packer or importer", "bad", "Address incomplete"],
    ["Common or generic name of the commodity", "ok", "Present"],
    ["Net quantity", "warn", "Present but small print"],
    ["Month and year of packing", "ok", "Present"],
    ["Maximum Retail Price, inclusive of all taxes", "warn", "Present but not prominent"],
    ["Consumer care details", "ok", "Present"],
    ["Country of origin", "bad", "Differs from the online listing"],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="What must be on the pack">
        <p className="mb-3 text-[0.9rem]">
          Photograph the pack or enter what you can see. Every pre-packaged commodity sold in India
          must carry these declarations.
        </p>
        <div className="mb-4 flex gap-2">
          <input
            type="search"
            placeholder="Scan barcode or enter product name"
            aria-label="Scan barcode or enter product name"
            className="flex-1 rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
          />
          <Button>Check</Button>
        </div>
        <DataTable headers={["Declaration", "On this pack"]}>
          {rows.map(([label, tone, verdict]) => (
            <Tr key={label}>
              <Td>{label}</Td>
              <Td>
                <Chip tone={tone}>{verdict}</Chip>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <Card title="Your rights on a packaged commodity">
        <div className="space-y-3 text-[0.9rem]">
          <p>
            <b>The MRP is a ceiling, not a fixed price.</b> A seller may charge less. Charging more
            than the printed maximum retail price is an offence.
          </p>
          <p>
            <b>The declared quantity is what you must receive.</b> If a listing says 1 kg and the
            pack says 500 g, the pack is what arrived and the listing was wrong.
          </p>
          <p>
            <b>Consumer care details must work.</b> A number that does not connect is itself a
            defect.
          </p>
          <p>
            <b>Imported goods must show a country of origin.</b> From 1 July 2026, marketplaces
            selling imported products must also let you filter listings by country of origin.
          </p>
          <hr className="border-line" />
          <p className="text-[0.82rem] text-ink-3">
            National Consumer Helpline: 1915 · Department of Consumer Affairs, Government of India.
          </p>
        </div>
      </Card>
    </div>
  );
}

function LabelPanel() {
  return (
    <div className="space-y-4">
      <Callout title="Advisory information only" tone="warn">
        This section explains additives that a pack declares in its ingredient list. It is not a
        determination under the Legal Metrology Rules, it does not assess whether a food is safe for
        you, and it is not medical advice. Additive limits are set by FSSAI under the Food Safety and
        Standards Act, 2006. Classifications below are those published by the International Agency
        for Research on Cancer, which describe the strength of the evidence, not the size of any
        risk.
      </Callout>

      <Card>
        <label htmlFor="ing" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
          Paste or scan the ingredient list from the pack
        </label>
        <textarea
          id="ing"
          rows={3}
          defaultValue="Rice, Iodised salt, Sunflower oil, Sodium benzoate (INS 211), Monosodium glutamate (INS 621), Tartrazine (INS 102)"
          className="w-full rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
        />
        <div className="mt-2.5">
          <Button>Explain these ingredients</Button>
        </div>
      </Card>

      <Card title="Additives identified" subtitle="6 matched against the additive reference" padded={false}>
        <DataTable headers={["INS", "Additive", "Function", "Status in India", "IARC classification"]}>
          {ADDITIVES.map((a) => (
            <Tr key={a.name}>
              <Td mono>{a.ins}</Td>
              <Td>
                <b>{a.name}</b>
                <p className="text-[0.78rem] text-ink-3">{a.note}</p>
              </Td>
              <Td className="text-ink-3">{a.fn}</Td>
              <Td>
                <Chip tone={a.status.startsWith("Restricted") ? "warn" : "ok"}>{a.status}</Chip>
              </Td>
              <Td>
                <Chip tone={a.iarc.startsWith("IARC") ? "warn" : "mute"}>{a.iarc}</Chip>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      <Callout>
        An additive appearing here is not a violation and not a warning. Every additive listed is
        permitted in India within specified limits. What this screen tells you is what a name in the
        ingredient list actually refers to, so that the declaration on the pack is meaningful to you
        rather than opaque.
      </Callout>
    </div>
  );
}

function ReportPanel() {
  const steps = [
    ["You get a reference number", "Keep it. You can check the status at any time with the number alone."],
    ["An officer reviews the photographs", "Your report joins the inspection queue for your district, weighted by how often the same product has been reported."],
    ["The pack is inspected", "If the officer confirms the defect, a notice may be issued to the manufacturer, packer or importer."],
    ["You are told the outcome", "Your identity is not disclosed to the entity."],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Report a non-compliant pack">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="r1" label="Product name" placeholder="As printed on the pack" />
          <Field id="r2" label="Brand or manufacturer" />
          <Field id="r3" label="Where you bought it" placeholder="Shop and locality, or website" />
          <div>
            <label htmlFor="r4" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
              District
            </label>
            <select
              id="r4"
              className="w-full rounded-gov border border-line-strong bg-white px-2.5 py-1.5 text-[0.9rem]"
            >
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Madurai</option>
              <option>Salem</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="r5" className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
            What is wrong with the pack
          </label>
          <select
            id="r5"
            className="w-full rounded-gov border border-line-strong bg-white px-2.5 py-1.5 text-[0.9rem]"
          >
            <option>Price charged above the printed MRP</option>
            <option>Declarations missing from the pack</option>
            <option>Quantity received differs from what was declared</option>
            <option>Online listing differs from the pack</option>
            <option>Print too small to read</option>
            <option>Something else</option>
          </select>
        </div>

        <div className="mt-3 rounded-gov border-2 border-dashed border-line-strong bg-tint-2 p-5 text-center text-[0.82rem]">
          Attach up to four photographs — front, back, the price area and the shop bill.
        </div>

        <div className="mt-3.5">
          <Button>Submit report</Button>
        </div>
      </Card>

      <Card title="What happens next">
        <ol className="ml-2 list-none border-l-2 border-line-strong pl-4">
          {steps.map(([title, note], i) => (
            <li key={title} className="relative pb-4">
              <span
                aria-hidden
                className={`absolute -left-[1.36rem] top-1.5 size-[11px] rounded-full border-[2.5px] ${
                  i === 0 ? "border-matcha bg-matcha" : "border-line-strong bg-white"
                }`}
              />
              <b>{title}</b>
              <br />
              <span className="text-[0.87rem] text-ink-3">{note}</span>
            </li>
          ))}
        </ol>
        <Callout>
          Repeated reports about the same product raise its enforcement risk score, which moves it up
          the inspection queue. Reporting a pack is the fastest route to getting it checked.
        </Callout>
      </Card>
    </div>
  );
}

function Field({ id, label, placeholder }: { id: string; label: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
      />
    </div>
  );
}
