import { Camera } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, Callout } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { PipelineRunner } from "@/components/scan/PipelineRunner";
import { INSPECTION } from "@/lib/data/inspection";

const PANELS = [
  { title: "Front panel", note: "Sharp · 4.1 MP", ok: true },
  { title: "Back panel", note: "Sharp · 4.1 MP", ok: true },
  { title: "Side panel A", note: "Soft focus · re-capture advised", ok: false },
  { title: "Close-up: MRP block", note: "Sharp · macro", ok: true },
];

export default function ScanPage() {
  return (
    <>
      <PageHeader
        crumb="Enforcement › New inspection"
        title="New inspection"
        intro="Capture the pack, calibrate the scale, then run the analysis. Calibration is required — character height cannot be measured in millimetres without a reference of known size in the frame."
      />

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
        <div className="space-y-4">
          <Card
            title="1 · Capture panels"
            subtitle="Front, back and both sides"
            right={<Chip tone="ok">4 of 4 captured</Chip>}
          >
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {PANELS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-gov border-2 border-dashed border-line-strong bg-tint-2 p-2 text-center text-[0.78rem]"
                >
                  <div className="mb-1.5 grid h-[74px] place-items-center border border-line bg-white">
                    <Camera size={30} strokeWidth={1.5} className="text-matcha-mid" aria-hidden />
                  </div>
                  <b className="block">{p.title}</b>
                  <Chip tone={p.ok ? "ok" : "warn"}>{p.note}</Chip>
                </div>
              ))}
            </div>

            <hr className="my-4 border-line" />

            <div className="grid gap-3 sm:grid-cols-3">
              <LabelledInput id="place" label="Place of inspection" defaultValue={INSPECTION.place} />
              <LabelledSelect id="channel" label="Channel" options={["Retail premises", "Warehouse", "E-commerce listing"]} />
              <LabelledInput id="date" label="Date of inspection" type="date" defaultValue={INSPECTION.onDate} />
            </div>
          </Card>

          <Card title="2 · Scale calibration" subtitle="Required for Rule 7 measurement">
            <Callout>
              A photograph carries no absolute scale. LegalMatrix derives millimetres from a
              reference of known size in the same plane as the text, and reports every measurement
              with a tolerance band.
            </Callout>

            <div className="my-3.5 grid gap-3 sm:grid-cols-2">
              <LabelledSelect
                id="ref"
                label="Reference method"
                options={[
                  "EAN-13 barcode — nominal 37.29 mm at 100% magnification",
                  "₹5 coin placed on the pack — 23.00 mm diameter",
                  "Calibration card issued to the officer",
                  "Operator-entered pack dimensions",
                ]}
              />
              <LabelledSelect id="mag" label="Barcode magnification" options={["Detected: 92%", "Enter manually…"]} />
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.87rem]">
              <dt className="text-ink-3">Derived resolution</dt>
              <dd className="m-0 font-mono">
                {INSPECTION.pxPerMm} px/mm ± {INSPECTION.pxPerMmTolerance}
              </dd>
              <dt className="text-ink-3">Plane correction</dt>
              <dd className="m-0">Applied — front panel tilt of 7.4° corrected</dd>
              <dt className="text-ink-3">Principal display panel</dt>
              <dd className="m-0 font-mono">
                {INSPECTION.panelAreaCm2} cm² — Rule 7(4), rectangular pack
              </dd>
              <dt className="text-ink-3">Measurement confidence</dt>
              <dd className="m-0">
                <Chip tone="warn">Moderate — soft focus on side panel A</Chip>
              </dd>
            </dl>
          </Card>

          <Card title="3 · Run analysis">
            <PipelineRunner />
          </Card>
        </div>

        <Card title="Capture guidance" subtitle="What makes a photograph usable">
          <ul className="space-y-2.5 text-[0.9rem]">
            <li>
              <b>Fill the frame with the panel.</b> Cropping in software after the fact loses the
              resolution the height measurement depends on.
            </li>
            <li>
              <b>Keep the reference object flat against the pack.</b> A coin held above the surface
              sits in a different plane and corrupts the scale.
            </li>
            <li>
              <b>Shoot square to the panel.</b> We correct for tilt, but correction widens the
              tolerance band, and a wide band means more findings go to manual review.
            </li>
            <li>
              <b>Avoid direct flash on glossy laminate.</b> Specular highlights destroy the small
              print exactly where the declarations usually sit.
            </li>
            <li>
              <b>Capture every panel, not just the front.</b> A declaration we never photographed is
              reported as &ldquo;not detected&rdquo;, not as missing — but that still costs the
              officer a second visit.
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}

function LabelledInput({
  id,
  label,
  defaultValue,
  type = "text",
}: {
  id: string;
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-gov border border-line-strong px-2.5 py-1.5 text-[0.9rem]"
      />
    </div>
  );
}

function LabelledSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8rem] font-semibold text-ink-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-gov border border-line-strong bg-white px-2.5 py-1.5 text-[0.9rem]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
