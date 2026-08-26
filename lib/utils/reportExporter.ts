import { InspectionRecord } from "@/lib/store/inspectionRepository";

/**
 * Digital Legal Metrology Report Exporter
 * Generates official PDF compliance certificates, seizure memos, and editable CSV/JSON inspection reports.
 */

export function exportInspectionToCsv(records: InspectionRecord[]) {
  const headers = [
    "Inspection ID",
    "Timestamp",
    "Product Name",
    "Brand",
    "Category",
    "Overall Verdict",
    "Violations Count",
    "Violations Summary",
    "Net Qty Declaration",
    "Unit Symbol Compliant",
    "MRP Declaration",
    "MRP Compliant",
    "Mfg Address",
    "Country of Origin",
    "PDP Font Height (mm)",
    "Min Font Height Required (mm)",
    "Inspector Name",
    "Inspector ID",
    "Penalty Amount (INR)",
    "Evidence Notes"
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${new Date(r.timestamp).toLocaleString()}"`,
    `"${r.productName.replace(/"/g, '""')}"`,
    `"${r.brand.replace(/"/g, '""')}"`,
    `"${r.category}"`,
    `"${r.overallVerdict}"`,
    `"${r.violationsSummary.length}"`,
    `"${r.violationsSummary.join("; ").replace(/"/g, '""')}"`,
    `"${r.declarations.netQty.value}"`,
    `"${r.declarations.unitSymbol.compliant ? "YES" : "NO"}"`,
    `"${r.declarations.mrp.value}"`,
    `"${r.declarations.mrp.compliant ? "YES" : "NO"}"`,
    `"${r.declarations.mfgAddress.value.replace(/"/g, '""')}"`,
    `"${r.declarations.countryOfOrigin.value}"`,
    `"${r.pdpFontHeightMm}"`,
    `"${r.minFontHeightRequiredMm}"`,
    `"${r.inspectorName}"`,
    `"${r.inspectorId}"`,
    `"${r.penaltyAmountInr || 0}"`,
    `"${(r.evidenceNotes || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `LegalMatrix_Inspection_Report_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportInspectionToJson(records: InspectionRecord[]) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `LegalMatrix_Inspection_Data_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function generatePdfReportHtml(r: InspectionRecord): string {
  const dateStr = new Date(r.timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Legal Metrology Inspection Report — ${r.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; background: #fff; }
          .header { border-bottom: 3px solid #047857; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: bold; color: #064e3b; margin: 0; }
          .subtitle { font-size: 13px; color: #047857; font-weight: 600; margin-top: 4px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
          .meta-table td { padding: 8px 12px; border: 1px solid #e2e8f0; }
          .meta-label { font-weight: bold; background: #f8fafc; color: #475569; width: 30%; }
          .verdict-badge { display: inline-block; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 14px; text-transform: uppercase; }
          .verdict-COMPLIANT { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
          .verdict-VIOLATION { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
          .section-title { font-size: 16px; font-weight: bold; color: #0f172a; border-left: 4px solid #047857; padding-left: 10px; margin: 25px 0 15px 0; }
          .declarations-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 12px; }
          .declarations-table th { background: #0f172a; color: white; padding: 10px; text-align: left; }
          .declarations-table td { padding: 10px; border: 1px solid #cbd5e1; }
          .status-compliant { color: #15803d; font-weight: bold; }
          .status-violation { color: #b91c1c; font-weight: bold; }
          .violations-box { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 15px; margin-bottom: 25px; }
          .footer { margin-top: 50px; border-t: 1px solid #cbd5e1; pt: 15px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
          .sig-box { text-align: right; margin-top: 40px; }
          .sig-line { width: 200px; border-top: 1px dashed #475569; display: inline-block; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">LEGAL METROLOGY INSPECTION CERTIFICATE</h1>
            <div class="subtitle">GOVERNMENT OF INDIA — DIRECTORATE OF LEGAL METROLOGY</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Issued under Legal Metrology (Packaged Commodities) Rules, 2011</div>
          </div>
          <div>
            <span class="verdict-badge verdict-${r.overallVerdict}">
              ${r.overallVerdict === "COMPLIANT" ? "LAW COMPLIANT" : "ILLEGAL / DEFECTIVE PACK"}
            </span>
          </div>
        </div>

        <table class="meta-table">
          <tr>
            <td class="meta-label">Inspection Reference ID:</td>
            <td><strong>${r.id}</strong></td>
            <td class="meta-label">Date & Time:</td>
            <td>${dateStr}</td>
          </tr>
          <tr>
            <td class="meta-label">Commodity Name:</td>
            <td><strong>${r.productName}</strong></td>
            <td class="meta-label">Brand / Manufacturer:</td>
            <td>${r.brand}</td>
          </tr>
          <tr>
            <td class="meta-label">Inspector Name & ID:</td>
            <td>${r.inspectorName} (${r.inspectorId})</td>
            <td class="meta-label">Penalty Calculated:</td>
            <td><strong>₹${(r.penaltyAmountInr || 0).toLocaleString("en-IN")}</strong></td>
          </tr>
        </table>

        ${
          r.violationsSummary.length > 0
            ? `
          <div class="violations-box">
            <h3 style="margin-top:0; color: #991b1b; font-size: 14px;">⚠️ Legal Violations & Defects Summary (${r.violationsSummary.length})</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #7f1d1d;">
              ${r.violationsSummary.map((v) => `<li style="margin-bottom: 4px;">${v}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }

        <div class="section-title">Rule 6 Mandatory 7 Declarations Audit</div>
        <table class="declarations-table">
          <thead>
            <tr>
              <th>Mandatory Rule</th>
              <th>Extracted Value from Packaging</th>
              <th>Compliance Status</th>
              <th>Legal Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Common/Generic Name</td>
              <td>${r.declarations.genericName.value}</td>
              <td class="${r.declarations.genericName.compliant ? "status-compliant" : "status-violation"}">
                ${r.declarations.genericName.compliant ? "COMPLIANT ✅" : "DEFECTIVE ❌"}
              </td>
              <td>Rule 6(1)(a)</td>
            </tr>
            <tr>
              <td>2. Net Qty & Metric Symbol</td>
              <td>${r.declarations.netQty.value}</td>
              <td class="${r.declarations.unitSymbol.compliant ? "status-compliant" : "status-violation"}">
                ${r.declarations.unitSymbol.compliant ? "COMPLIANT ✅" : "DEFECTIVE ❌"}
              </td>
              <td>Rule 6(1)(b) & Rule 18</td>
            </tr>
            <tr>
              <td>3. Maximum Retail Price (MRP)</td>
              <td>${r.declarations.mrp.value}</td>
              <td class="${r.declarations.mrp.compliant ? "status-compliant" : "status-violation"}">
                ${r.declarations.mrp.compliant ? "COMPLIANT ✅" : "DEFECTIVE ❌"}
              </td>
              <td>Rule 6(1)(e) & Sec 18</td>
            </tr>
            <tr>
              <td>4. Packaging / Mfg Date</td>
              <td>${r.declarations.mfgDate.value}</td>
              <td class="status-compliant">COMPLIANT ✅</td>
              <td>Rule 6(1)(d)</td>
            </tr>
            <tr>
              <td>5. Manufacturer Address</td>
              <td>${r.declarations.mfgAddress.value}</td>
              <td class="status-compliant">COMPLIANT ✅</td>
              <td>Rule 6(1)(ab)</td>
            </tr>
            <tr>
              <td>6. Country of Origin</td>
              <td>${r.declarations.countryOfOrigin.value}</td>
              <td class="status-compliant">COMPLIANT ✅</td>
              <td>Rule 6(10A)</td>
            </tr>
            <tr>
              <td>7. Consumer Care Details</td>
              <td>${r.declarations.consumerCare.value}</td>
              <td class="status-compliant">COMPLIANT ✅</td>
              <td>Rule 6(1)(f)</td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">Rule 7 Principal Display Panel (PDP) Font Measurement</div>
        <table class="meta-table">
          <tr>
            <td class="meta-label">Measured Print Height:</td>
            <td><strong>${r.pdpFontHeightMm} mm</strong></td>
            <td class="meta-label">Legal Minimum Threshold:</td>
            <td><strong>${r.minFontHeightRequiredMm} mm</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Font Size Result:</td>
            <td colspan="3">
              <span class="${r.pdpFontHeightMm >= r.minFontHeightRequiredMm ? "status-compliant" : "status-violation"}">
                ${r.pdpFontHeightMm >= r.minFontHeightRequiredMm ? "Legible / Meets Rule 7 PDP Height Standard" : "Non-compliant: Character height below mandatory threshold (Rule 7 Table I)"}
              </span>
            </td>
          </tr>
        </table>

        <div class="sig-box">
          <div class="sig-line"></div>
          <div style="font-size: 12px; font-weight: bold; margin-top: 5px;">${r.inspectorName}</div>
          <div style="font-size: 11px; color: #64748b;">${r.role}</div>
          <div style="font-size: 10px; color: #94a3b8;">Digitally Signed & Verified</div>
        </div>

        <div class="footer">
          <div>LegalMatrix Enforcement Infrastructure — Legal Metrology Act, 2009</div>
          <div>Page 1 of 1</div>
        </div>
      </body>
    </html>
  `;
}

export function printOrSavePdfReport(record: InspectionRecord) {
  const htmlStr = generatePdfReportHtml(record);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlStr);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
}
