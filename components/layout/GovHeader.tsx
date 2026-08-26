import Link from "next/link";
import { Scale } from "lucide-react";
import { TextSizeControl } from "./TextSizeControl";

export function GovHeader() {
  return (
    <>
      {/* Tricolour rule, as carried by Government of India portals. */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(to right, var(--color-saffron) 0 33.3%, #fff 33.3% 66.6%, var(--color-india-green) 66.6% 100%)",
        }}
      />

      <div className="no-print flex flex-wrap justify-between gap-3 bg-deep px-5 py-1.5 text-[0.76rem] text-tint">
        <span>
          भारत सरकार · Government of India — Ministry of Consumer Affairs, Food &amp; Public
          Distribution · Department of Consumer Affairs
        </span>
        <span className="flex gap-2">
          <a href="#main" className="underline">
            Skip to content
          </a>
          <span aria-hidden>·</span>
          <a href="#" className="underline">
            हिन्दी
          </a>
        </span>
      </div>

      <header className="flex flex-wrap items-center gap-4 border-b-2 border-line bg-white px-5 py-3">
        <div
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-full border border-matcha bg-tint-2 text-matcha"
        >
          <Scale size={22} strokeWidth={1.7} />
        </div>

        <div>
          <Link href="/" className="block font-serif text-[1.18rem] font-bold leading-tight text-ink">
            LegalMatrix
          </Link>
          <span className="text-[0.79rem] text-ink-3">
            Compliance verification system · Legal Metrology (Packaged Commodities) Rules, 2011
          </span>
        </div>

        <div className="no-print ml-auto flex flex-wrap items-center gap-3">
          <TextSizeControl />
          <Link
            href="/citizen"
            className="rounded-gov border border-line-strong bg-white px-3 py-1.5 text-[0.88rem] font-semibold text-matcha hover:bg-tint-2"
          >
            Citizen portal
          </Link>
          <div className="flex items-center gap-2 border-l border-line pl-3">
            <span className="grid size-9 place-items-center rounded-full bg-matcha text-[0.82rem] font-semibold text-white">
              RK
            </span>
            <span className="leading-tight">
              <b className="block text-[0.85rem] font-semibold">R. Krishnan</b>
              <small className="text-[0.72rem] text-ink-3">
                Legal Metrology Officer · Chennai (South)
              </small>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
