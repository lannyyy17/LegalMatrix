export interface MandatoryDeclaration {
  id: string;
  ruleNumber: string;
  field: string;
  description: string;
  status: "PASSED" | "FAILED" | "WARNING" | "NOT_APPLICABLE";
  valueFound: string;
  requiredFormat: string;
  notes?: string;
}

export interface PackagedCommodity {
  id: string;
  barcode: string;
  productName: string;
  genericName: string;
  category: "Food & Beverages" | "Cosmetics & Personal Care" | "Electronics" | "Pharmaceuticals" | "Household Goods" | "Agricultural / Chemicals";
  manufacturer: {
    name: string;
    licenseNo: string;
    address: string;
    state: string;
  };
  importer?: {
    name: string;
    countryOfOrigin: string;
    registrationNo: string;
  };
  netQuantity: string;
  mrp: number; // in INR
  unitSalePrice: string;
  mfgDate: string;
  expiryDate?: string;
  consumerCare: {
    phone: string;
    email: string;
    contactPersonAddress: string;
  };
  complianceScore: number; // 0 to 100
  overallStatus: "COMPLIANT" | "NON_COMPLIANT" | "UNDER_REVIEW" | "NOTICE_ISSUED";
  lastInspectedAt: string;
  inspectorName: string;
  declarations: MandatoryDeclaration[];
  violationsCount: number;
  riskRating: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  imageUrl?: string;
}

export interface EnforcementNotice {
  id: string;
  noticeNumber: string;
  commodityId: string;
  commodityName: string;
  entityName: string;
  issueDate: string;
  dueDate: string;
  sectionViolated: string; // e.g. "Section 18 / Rule 6(1)"
  violationSummary: string;
  penaltyAmount?: number;
  status: "PENDING_RESPONSE" | "EXPLANATION_RECEIVED" | "COMPOUNDED" | "ESCALATED_TO_COURT" | "CLOSED";
  assignedOfficer: string;
  division: string;
}

export interface ManufacturerEntity {
  id: string;
  name: string;
  registrationNumber: string;
  entityType: "Manufacturer" | "Packer" | "Importer";
  state: string;
  city: string;
  registeredAddress: string;
  directorName: string;
  contactEmail: string;
  totalProductsInspected: number;
  compliancePercentage: number;
  noticesIssued: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  status: "REGISTERED" | "LICENSE_EXPIRED" | "SUSPENDED";
}

export interface ComplianceStat {
  totalInspections: number;
  compliantCount: number;
  nonCompliantCount: number;
  noticesIssuedCount: number;
  complianceRate: number;
  pendingVerifications: number;
  activeEntitiesCount: number;
}

export const MOCK_STATS: ComplianceStat = {
  totalInspections: 14820,
  compliantCount: 12140,
  nonCompliantCount: 2680,
  noticesIssuedCount: 1845,
  complianceRate: 81.9,
  pendingVerifications: 342,
  activeEntitiesCount: 2940,
};

export const MOCK_COMMODITIES: PackagedCommodity[] = [
  {
    id: "CMD-2026-001",
    barcode: "8901030829104",
    productName: "Golden Harvest Refined Sunflower Oil 1L",
    genericName: "Edible Sunflower Oil",
    category: "Food & Beverages",
    manufacturer: {
      name: "Apex Agri Products Foods Pvt Ltd",
      licenseNo: "LM/2023/DEL/8841",
      address: "Plot 42, Industrial Area Phase II, Okhla",
      state: "Delhi",
    },
    netQuantity: "1 L (910 g at 30°C)",
    mrp: 145.0,
    unitSalePrice: "₹0.145 per ml",
    mfgDate: "01/2026",
    expiryDate: "09/2026",
    consumerCare: {
      phone: "1800-11-9022",
      email: "care@apexagri.in",
      contactPersonAddress: "Manager Consumer Care, Plot 42 Industrial Area, Okhla, New Delhi 110020",
    },
    complianceScore: 100,
    overallStatus: "COMPLIANT",
    lastInspectedAt: "2026-02-18",
    inspectorName: "Rajesh Kumar (Senior Inspector)",
    declarations: [
      {
        id: "DEC-1",
        ruleNumber: "Rule 6(1)(a)",
        field: "Name & Address of Manufacturer / Packer",
        description: "Must clearly specify complete address with PIN code.",
        status: "PASSED",
        valueFound: "Apex Agri Products Foods Pvt Ltd, Plot 42, Okhla Phase II, New Delhi 110020",
        requiredFormat: "Complete postal address with state and pincode.",
      },
      {
        id: "DEC-2",
        ruleNumber: "Rule 6(1)(aa)",
        field: "Country of Origin",
        description: "Mandatory for all imported/domestic packaged commodities.",
        status: "PASSED",
        valueFound: "India",
        requiredFormat: "Country Name clearly printed.",
      },
      {
        id: "DEC-3",
        ruleNumber: "Rule 6(1)(b)",
        field: "Common or Generic Name",
        description: "Name of the commodity contained in package.",
        status: "PASSED",
        valueFound: "Edible Sunflower Oil",
        requiredFormat: "Clear generic product descriptor.",
      },
      {
        id: "DEC-4",
        ruleNumber: "Rule 6(1)(c)",
        field: "Net Quantity & Mass Standard",
        description: "Net quantity in standard units of weight/volume.",
        status: "PASSED",
        valueFound: "1 L (910 g at 30°C)",
        requiredFormat: "Standard SI units with mass equivalency for liquids.",
      },
      {
        id: "DEC-5",
        ruleNumber: "Rule 6(1)(d)",
        field: "Month and Year of Manufacture / Packing",
        description: "Date format MM/YYYY or Month Year.",
        status: "PASSED",
        valueFound: "01/2026",
        requiredFormat: "MM/YYYY or Month YYYY.",
      },
      {
        id: "DEC-6",
        ruleNumber: "Rule 6(1)(e)",
        field: "Maximum Retail Price (MRP)",
        description: "Inclusive of all taxes in Indian Rupees.",
        status: "PASSED",
        valueFound: "MRP ₹ 145.00 (Incl. of all taxes)",
        requiredFormat: "MRP ₹ xx.xx (inclusive of all taxes).",
      },
      {
        id: "DEC-7",
        ruleNumber: "Rule 6(1)(g)",
        field: "Consumer Care Cell Details",
        description: "Name, address, phone number, and email of person who can be reached.",
        status: "PASSED",
        valueFound: "Phone: 1800-11-9022, Email: care@apexagri.in",
        requiredFormat: "Phone number, email and contact address.",
      },
      {
        id: "DEC-8",
        ruleNumber: "Rule 6(11)",
        field: "Unit Sale Price (USP)",
        description: "Mandatory for packages > 1g / 1ml.",
        status: "PASSED",
        valueFound: "₹ 0.145 / ml",
        requiredFormat: "Price per gram/ml/kg/liter.",
      },
    ],
    violationsCount: 0,
    riskRating: "LOW",
  },
  {
    id: "CMD-2026-002",
    barcode: "8904092100412",
    productName: "NutriCrunch Almond Cookies 250g",
    genericName: "Biscuits / Cookies",
    category: "Food & Beverages",
    manufacturer: {
      name: "Sunrise Bakeries Ltd",
      licenseNo: "LM/2022/MAH/4109",
      address: "Gat No 104, Chakan MIDC",
      state: "Maharashtra",
    },
    netQuantity: "250 g",
    mrp: 95.0,
    unitSalePrice: "Missing",
    mfgDate: "02/26",
    consumerCare: {
      phone: "Not Provided",
      email: "feedback@sunrisebakeries.com",
      contactPersonAddress: "Sunrise Bakeries MIDC Chakan",
    },
    complianceScore: 62,
    overallStatus: "NON_COMPLIANT",
    lastInspectedAt: "2026-02-21",
    inspectorName: "Anita Sharma (Inspector)",
    declarations: [
      {
        id: "DEC-1",
        ruleNumber: "Rule 6(1)(a)",
        field: "Name & Address of Manufacturer / Packer",
        description: "Must clearly specify complete address with PIN code.",
        status: "WARNING",
        valueFound: "Sunrise Bakeries Ltd, Gat 104 Chakan MIDC (Missing PIN code)",
        requiredFormat: "Complete postal address with state and pincode.",
        notes: "PIN code omitted on back panel.",
      },
      {
        id: "DEC-2",
        ruleNumber: "Rule 6(1)(aa)",
        field: "Country of Origin",
        description: "Mandatory for all imported/domestic packaged commodities.",
        status: "PASSED",
        valueFound: "Made in India",
        requiredFormat: "Country Name clearly printed.",
      },
      {
        id: "DEC-3",
        ruleNumber: "Rule 6(1)(b)",
        field: "Common or Generic Name",
        description: "Name of the commodity contained in package.",
        status: "PASSED",
        valueFound: "Almond Cookies",
        requiredFormat: "Clear generic product descriptor.",
      },
      {
        id: "DEC-4",
        ruleNumber: "Rule 6(1)(c)",
        field: "Net Quantity & Mass Standard",
        description: "Net quantity in standard units of weight/volume.",
        status: "PASSED",
        valueFound: "250 g",
        requiredFormat: "Standard SI units.",
      },
      {
        id: "DEC-5",
        ruleNumber: "Rule 6(1)(d)",
        field: "Month and Year of Manufacture / Packing",
        description: "Date format MM/YYYY or Month Year.",
        status: "PASSED",
        valueFound: "02/26",
        requiredFormat: "MM/YYYY.",
      },
      {
        id: "DEC-6",
        ruleNumber: "Rule 6(1)(e)",
        field: "Maximum Retail Price (MRP)",
        description: "Inclusive of all taxes in Indian Rupees.",
        status: "FAILED",
        valueFound: "MRP ₹ 95.00 (Taxes Extra)",
        requiredFormat: "MRP must explicitly state 'inclusive of all taxes'.",
        notes: "Printed 'Taxes Extra' which violates Section 18 of LM Act.",
      },
      {
        id: "DEC-7",
        ruleNumber: "Rule 6(1)(g)",
        field: "Consumer Care Cell Details",
        description: "Name, address, phone number, and email.",
        status: "FAILED",
        valueFound: "Telephone number missing.",
        requiredFormat: "Phone number mandatory.",
        notes: "No helpline phone number provided.",
      },
      {
        id: "DEC-8",
        ruleNumber: "Rule 6(11)",
        field: "Unit Sale Price (USP)",
        description: "Mandatory for packages > 1g.",
        status: "FAILED",
        valueFound: "Not printed",
        requiredFormat: "₹ 0.38 per g mandatory declaration.",
        notes: "Missing mandatory Unit Sale Price declaration.",
      },
    ],
    violationsCount: 3,
    riskRating: "HIGH",
  },
  {
    id: "CMD-2026-003",
    barcode: "8902201994015",
    productName: "GlowRadiance Hydrating Serum 50ml",
    genericName: "Face Serum",
    category: "Cosmetics & Personal Care",
    importer: {
      name: "LuxeCare Imports India Pvt Ltd",
      countryOfOrigin: "South Korea",
      registrationNo: "IMP/LM/2024/7701",
    },
    manufacturer: {
      name: "K-Beauty Labs Co Ltd, Seoul",
      licenseNo: "KR-88192-COS",
      address: "124 Gangnam-daero, Seoul",
      state: "Seoul (South Korea)",
    },
    netQuantity: "50 ml",
    mrp: 1299.0,
    unitSalePrice: "₹25.98 / ml",
    mfgDate: "11/2025",
    expiryDate: "11/2027",
    consumerCare: {
      phone: "1800-425-0019",
      email: "support@luxecare.co.in",
      contactPersonAddress: "LuxeCare Towers, Cyber City, Gurugram, Haryana 122002",
    },
    complianceScore: 88,
    overallStatus: "UNDER_REVIEW",
    lastInspectedAt: "2026-02-23",
    inspectorName: "Sanjay Verma (Inspector)",
    declarations: [
      {
        id: "DEC-1",
        ruleNumber: "Rule 6(1)(a)",
        field: "Importer Name & Address Label",
        description: "Must bear imported sticker with Indian importer address.",
        status: "PASSED",
        valueFound: "LuxeCare Imports India Pvt Ltd, Cyber City, Gurugram 122002",
        requiredFormat: "Complete Indian address of Importer.",
      },
      {
        id: "DEC-2",
        ruleNumber: "Rule 6(1)(aa)",
        field: "Country of Origin",
        description: "Mandatory declaration for imported packaged goods.",
        status: "PASSED",
        valueFound: "Country of Origin: South Korea",
        requiredFormat: "Clear country name statement.",
      },
      {
        id: "DEC-3",
        ruleNumber: "Rule 6(1)(e)",
        field: "MRP Declaration Font Size",
        description: "Height of numeral declarations per package area.",
        status: "WARNING",
        valueFound: "Height 1.5mm (Required 2.0mm)",
        requiredFormat: "Minimum font height 2mm for surface area > 100cm².",
        notes: "Numeral font size borderline below LM Rule 7 spec.",
      },
    ],
    violationsCount: 1,
    riskRating: "MEDIUM",
  },
  {
    id: "CMD-2026-004",
    barcode: "8901234567890",
    productName: "ProTech FastCharge PowerBank 10000mAh",
    genericName: "External Battery Pack",
    category: "Electronics",
    importer: {
      name: "VoltTech Digital Distribution Pvt Ltd",
      countryOfOrigin: "China",
      registrationNo: "IMP/LM/2025/1192",
    },
    manufacturer: {
      name: "Shenzhen Electronics Ltd",
      licenseNo: "CN-6612-EL",
      address: "Baoan District, Shenzhen, China",
      state: "Guangdong",
    },
    netQuantity: "1 N (Contains 1 PowerBank + 1 Cable)",
    mrp: 1999.0,
    unitSalePrice: "₹1999.00 / N",
    mfgDate: "12/2025",
    consumerCare: {
      phone: "011-49001122",
      email: "help@volttech.in",
      contactPersonAddress: "VoltTech Service Desk, Nehru Place, New Delhi 110019",
    },
    complianceScore: 40,
    overallStatus: "NOTICE_ISSUED",
    lastInspectedAt: "2026-02-24",
    inspectorName: "Rajesh Kumar (Senior Inspector)",
    declarations: [
      {
        id: "DEC-1",
        ruleNumber: "Rule 6(1)(aa)",
        field: "Country of Origin",
        description: "Mandatory declaration of origin.",
        status: "FAILED",
        valueFound: "Omitted on outer carton box.",
        requiredFormat: "Mandatory Country of Origin display.",
        notes: "Origin concealed under barcode sticker.",
      },
      {
        id: "DEC-2",
        ruleNumber: "Rule 6(1)(c)",
        field: "Net Quantity Dimension Standard",
        description: "Number of units & dimensions included.",
        status: "FAILED",
        valueFound: "1 Piece (Missing unit dimension & capacity rating in standard units)",
        requiredFormat: "1 N with specs.",
      },
      {
        id: "DEC-3",
        ruleNumber: "Rule 6(1)(e)",
        field: "Over-smudged MRP",
        description: "MRP must be indelible and non-alterable.",
        status: "FAILED",
        valueFound: "Paper sticker pasted over lower MRP ₹1499.",
        requiredFormat: "No dual pricing or sticker re-labeling allowed.",
        notes: "Violation of Rule 18(2) - Dual MRP re-labeling detected.",
      },
    ],
    violationsCount: 3,
    riskRating: "CRITICAL",
  },
];

export const MOCK_NOTICES: EnforcementNotice[] = [
  {
    id: "NTC-2026-8801",
    noticeNumber: "LM/ENF/2026/0881",
    commodityId: "CMD-2026-004",
    commodityName: "ProTech FastCharge PowerBank 10000mAh",
    entityName: "VoltTech Digital Distribution Pvt Ltd",
    issueDate: "2026-02-24",
    dueDate: "2026-03-03",
    sectionViolated: "Section 18(1) & Section 36(1) read with Rule 6(1)(aa), Rule 18(2)",
    violationSummary: "Omission of Country of Origin and illegal dual MRP re-labeling sticker over-stamped on package.",
    penaltyAmount: 50000,
    status: "PENDING_RESPONSE",
    assignedOfficer: "Rajesh Kumar (Senior Inspector)",
    division: "Central Delhi Enforcement Division",
  },
  {
    id: "NTC-2026-8802",
    noticeNumber: "LM/ENF/2026/0879",
    commodityId: "CMD-2026-002",
    commodityName: "NutriCrunch Almond Cookies 250g",
    entityName: "Sunrise Bakeries Ltd",
    issueDate: "2026-02-22",
    dueDate: "2026-03-01",
    sectionViolated: "Section 18 read with Rule 6(1)(e), Rule 6(1)(g), Rule 6(11)",
    violationSummary: "Printed 'Taxes Extra' on MRP declaration, missing consumer care helpline phone, and absent Unit Sale Price.",
    penaltyAmount: 25000,
    status: "EXPLANATION_RECEIVED",
    assignedOfficer: "Anita Sharma (Inspector)",
    division: "Pune Sector 2 Division",
  },
  {
    id: "NTC-2026-8790",
    noticeNumber: "LM/ENF/2026/0790",
    commodityId: "CMD-2026-009",
    commodityName: "PureFlow Mineral Water 500ml",
    entityName: "AquaPure Beverages North Ltd",
    issueDate: "2026-02-10",
    dueDate: "2026-02-17",
    sectionViolated: "Section 36(2) Short Weighment / Volume Default",
    violationSummary: "Actual net content 465ml found against 500ml declared net volume across 12 test samples.",
    penaltyAmount: 100000,
    status: "COMPOUNDED",
    assignedOfficer: "Vikram Malhotra (Assistant Controller)",
    division: "Lucknow Enforcement Circle",
  },
];

export const MOCK_MANUFACTURERS: ManufacturerEntity[] = [
  {
    id: "ENT-9901",
    name: "Apex Agri Products Foods Pvt Ltd",
    registrationNumber: "REG/LM/DEL/2022/9901",
    entityType: "Manufacturer",
    state: "Delhi",
    city: "New Delhi",
    registeredAddress: "Plot 42, Industrial Area Phase II, Okhla, New Delhi 110020",
    directorName: "Sunil Agarwal",
    contactEmail: "compliance@apexagri.in",
    totalProductsInspected: 48,
    compliancePercentage: 98.2,
    noticesIssued: 0,
    riskLevel: "LOW",
    status: "REGISTERED",
  },
  {
    id: "ENT-9902",
    name: "Sunrise Bakeries Ltd",
    registrationNumber: "REG/LM/MAH/2021/4412",
    entityType: "Packer",
    state: "Maharashtra",
    city: "Pune",
    registeredAddress: "Gat No 104, Chakan MIDC, Pune 410501",
    directorName: "Ramesh Deshmukh",
    contactEmail: "regulatory@sunrisebakeries.com",
    totalProductsInspected: 32,
    compliancePercentage: 71.8,
    noticesIssued: 4,
    riskLevel: "HIGH",
    status: "REGISTERED",
  },
  {
    id: "ENT-9903",
    name: "VoltTech Digital Distribution Pvt Ltd",
    registrationNumber: "IMP/LM/DEL/2024/1109",
    entityType: "Importer",
    state: "Delhi",
    city: "New Delhi",
    registeredAddress: "Unit 304, Nehru Place Commercial Complex, New Delhi 110019",
    directorName: "Karan Johar",
    contactEmail: "legal@volttech.in",
    totalProductsInspected: 19,
    compliancePercentage: 54.0,
    noticesIssued: 6,
    riskLevel: "HIGH",
    status: "SUSPENDED",
  },
  {
    id: "ENT-9904",
    name: "LuxeCare Imports India Pvt Ltd",
    registrationNumber: "IMP/LM/HAR/2023/7701",
    entityType: "Importer",
    state: "Haryana",
    city: "Gurugram",
    registeredAddress: "LuxeCare Towers, Cyber City, Gurugram 122002",
    directorName: "Pooja Mehta",
    contactEmail: "import.compliance@luxecare.co.in",
    totalProductsInspected: 64,
    compliancePercentage: 92.5,
    noticesIssued: 1,
    riskLevel: "MEDIUM",
    status: "REGISTERED",
  },
];
