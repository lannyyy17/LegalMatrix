# LegalMatrix — frontend

Compliance verification for packaged commodities under the Legal Metrology
(Packaged Commodities) Rules, 2011. Built for Smart India Hackathon,
Problem Statement 26034, Department of Consumer Affairs.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15, App Router |
| UI | React 19 |
| Animation | Motion (`motion/react`) |
| Styling | Tailwind CSS v4, tokens declared in `app/globals.css` via `@theme` |
| Icons | lucide-react |
| Language | TypeScript, strict |

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Fonts are loaded through `next/font/google`, so the first build needs
network access to fonts.googleapis.com.

## Layout

```
app/
  layout.tsx          gov masthead, side nav, Noto font wiring
  page.tsx            enforcement dashboard
  scan/               capture, calibration, analysis pipeline
  report/             evidence viewer, findings, measurements, unit checks
  cross-channel/      pack vs QR vs listing, plus the platform-level 6(10A) test
  repository/         searchable history of scanned products
  violations/         notice lifecycle and register
  entities/           manufacturer registry and recurring-pattern analytics
  audit/              append-only activity log and role model
  citizen/            public portal

components/
  layout/             GovHeader, SideNav, PageHeader, TextSizeControl
  ui/                 Card, Callout, Chip, StatTile, MeterBar, DataTable
  scan/               PipelineRunner
  report/             LabelEvidenceViewer, FindingsList, ScoreDial
  rules/              RuleVersionExplorer
  citizen/            CitizenTabs

lib/
  types.ts            shared domain types
  rules/engine.ts     version resolution + Rule 7 geometry and thresholds
  data/               fixtures standing in for the API
```

## The part worth reading first

`lib/rules/engine.ts`. Everything else is presentation; this file is the
argument.

**Version resolution.** Rules are rows carrying a source notification and a
commencement date, never `if` statements. `resolveVersion(registry, ruleId,
asOn)` returns the text in force on a given date. The worked case is
sub-rule 6(10A): inserted by G.S.R. 128(E) with effect from 1 July 2026,
substituted by G.S.R. 312(E) with effect from 1 July 2027 — the same
sub-rule, two versions, notified ten weeks apart. Reopening a 2026
inspection in 2028 still evaluates it against the 2026 text.

**Rule 7 geometry.** `panelAreaCm2()` implements the Rule 7(4) computation
per pack shape; `HEIGHT_TABLE_I` is the minimum-height table substituted by
G.S.R. 629(E) dated 23 June 2017; `assessHeight()` compares a measurement
against the threshold *including its tolerance band* and returns
`inconclusive` rather than `below` when the band straddles the limit. A
photograph has no scale, so calibration against a reference of known size is
a required step in the capture flow and every derived measurement carries
uncertainty. We only fail a pack when the entire band sits under the
requirement.

## Provenance

Rules in `lib/data/rules.ts` carry a `provenance` field. Entries marked
`needs-citation` were seeded during setup and have not been checked against
the consolidated text; the UI shows this rather than hiding it, and findings
they produce are routed for manual review. Verify them against the current
consolidated Rules from the Department of Consumer Affairs before relying on
them.

Note that the Legal Metrology (National Standards) Rules, 2011 are a
*different* notification from the Packaged Commodities Rules. They are used
here only for the unit-symbol checks (Third Schedule, clauses 5–7, and
Rule 18), which is what lets us say `500 gms` is a defective declaration and
cite a source for it.

## Next

The `backend/` workspace holds the FastAPI service: OCR with bounding boxes,
OpenCV calibration and perspective correction, barcode and QR decoding, and
the evaluation endpoints. The fixtures in `lib/data/` match the shapes those
endpoints will return, so swapping them for `fetch` calls is a local change.
