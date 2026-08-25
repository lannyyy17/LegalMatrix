# LegalMatrix System Documentation

LegalMatrix is a modular, high-compliance portal built to enforce the **Legal Metrology (Packaged Commodities) Rules**. It is structured to facilitate seamless audit checks for internal officers and dynamic compliance inquiries for citizens.

---

## 🏗️ System Architecture

The application is structured into three main blocks at the workspace root:
1. **/frontend**: The web portal, written using React, Next.js (App Router), Tailwind CSS v4, Lucide React, and Framer Motion.
2. **/backend**: Designated directory for external backend integration APIs and databases.
3. **/docs**: Developer guides, compliance rule specifications, and user documentation.

### Frontend App Structure
```
frontend/
├── public/                 # Static asset definitions
└── src/
    ├── app/                # Next.js routes and pages
    │   ├── analytics/      # Statistical performance indicators & graphs
    │   ├── citizen/        # Public-facing citizen portal
    │   ├── commodities/    # Commodity index, checklists, & inspection details
    │   ├── dashboard/      # Unified overview showing compliance metrics
    │   ├── entities/       # Manufacturer, packer, and importer directories
    │   ├── inspections/    # Internal officer audit lists
    │   ├── login/          # Officer authentication portal
    │   ├── scan/           # Scanner emulator for packaged commodity barcodes
    │   └── settings/       # System preferences and portal configuration
    ├── components/         # Reusable layouts and custom UI controls
    │   ├── layout/         # AppShell, Header, and Sidebar
    │   └── ui/             # Badge, Button, Card, Table, Tabs, Input
    └── lib/                # Context providers, helper functions, and mock data
```

---

## 🛠️ Key Components & Flows

### 1. App Shell Architecture (`AppShell`)
The frontend layout uses a customized premium shell layout (`AppShell`) mimicking a modern desktop operating system window:
* **Interactive Header Control**: Features path history, tab indicators, and current screen title displays.
* **Hierarchical Sidebar**: Collapsible navigational structure linked to key pages:
  * **Executive Overview** (`/dashboard`)
  * **Commodities Database** (`/commodities`)
  * **Manufacturer Registry** (`/entities`)
  * **Pending Inspections** (`/inspections`)
  * **Notice Center** (Enforcement Notices)
  * **Scan Scanner** (`/scan`)
  * **Analytics Panel** (`/analytics`)
  * **Citizen Portal** (`/citizen`)

### 2. Officer Authentication Guard (`auth-context`)
Access to internal officer tools is protected by `auth-context`:
* Routing check on page load redirects unauthenticated requests targeting protected routes back to `/login` or the home screen.

### 3. Compliance Rule Validation engine
Every commodity is tested against standard declarations specified in **Rule 6 of the Legal Metrology Rules**:
* **Compliance Scoring**: Numeric values assigned dynamically based on failed or warnings raised during auditing.
* **Risk Categorization**: Products marked as `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL` risk depending on severity of violations (e.g., dual MRP pricing or missing contact phone number).
