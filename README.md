# LegalMatrix

LegalMatrix is a comprehensive compliance enforcement platform and citizen portal designed to enforce the Legal Metrology (Packaged Commodities) Rules. It streamlines inspections, tracks mandatory declarations, and monitors regulatory compliance for manufacturers, importers, and packers.

---

## 📂 Directory Structure

The repository is structured as a multi-workspace project following strict architectural guidelines:

* **[frontend/](file:///c:/Users/Pratham%20Arora/OneDrive/Desktop/SIH-26/frontend)**: Next.js frontend application containing dashboards, analytics, inspection workflows, and the citizen portal.
* **[backend/](file:///c:/Users/Pratham%20Arora/OneDrive/Desktop/SIH-26/backend)**: Folder designated for future backend services and APIs.
* **[docs/](file:///c:/Users/Pratham%20Arora/OneDrive/Desktop/SIH-26/docs)**: Documentation and system architectural diagrams.

---

## ✨ Key Features

### 📊 Regulatory Dashboard & Analytics
* High-level statistical summaries (Compliance Rate, Active Entities, Pending Verifications, Notices Issued).
* Interactive risk rating distributions and compliance score graphs.

### 🔍 Packaged Commodity Verification
* **Mandatory Declarations Checklist**: Rule-by-rule auditing for key declarations:
  * **Rule 6(1)(a)**: Name & Address of Manufacturer / Packer / Importer.
  * **Rule 6(1)(aa)**: Country of Origin.
  * **Rule 6(1)(b)**: Common or Generic Name.
  * **Rule 6(1)(c)**: Net Quantity & Mass Standard.
  * **Rule 6(1)(d)**: Month & Year of Manufacture / Packing.
  * **Rule 6(1)(e)**: Maximum Retail Price (MRP) inclusive of all taxes.
  * **Rule 6(1)(g)**: Consumer Care Cell contact details.
  * **Rule 6(11)**: Unit Sale Price (USP).
* Compliance scoring based on verified declarations.

### ⚖️ Enforcement & Notice Management
* Issue, track, and manage official notices for non-compliant commodities.
* Track status of notices (e.g., `PENDING_RESPONSE`, `EXPLANATION_RECEIVED`, `COMPOUNDED`, `ESCALATED_TO_COURT`, `CLOSED`).
* Log specific sections violated (e.g., Section 18 / 36 of the Legal Metrology Act) and track assigned officers.

### 🏢 Entity Registry
* Detailed directory of Manufacturers, Packers, and Importers.
* Compliance scoring, historical notices, and risk tier categorization (`LOW`, `MEDIUM`, `HIGH`).
* Registration status tracker (`REGISTERED`, `LICENSE_EXPIRED`, `SUSPENDED`).

---

## 🛠️ Technology Stack (Frontend)

* **Framework**: Next.js (using App Router)
* **Libraries**: React 19, Motion (Framer Motion)
* **Styling**: Tailwind CSS v4, Lucide React (Icons)
* **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18.x or later) and npm installed.

### Setup and Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
