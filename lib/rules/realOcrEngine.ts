import { createWorker } from "tesseract.js";
import { parseOcrTextToRules, ParsedLabelData } from "@/lib/rules/smartOcrParser";

export interface RealOcrScanResult extends ParsedLabelData {
  extractedRawText?: string;
}

/**
 * Performs REAL Optical Character Recognition (OCR) on an image source
 * using Tesseract.js and evaluates against the Legal Metrology Rules Dataset.
 */
export async function performRealImageOcr(imageSource: string): Promise<RealOcrScanResult> {
  let rawText = "";
  try {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(imageSource);
    rawText = ret.data.text || "";
    await worker.terminate();
  } catch (err) {
    console.warn("Tesseract OCR worker notice:", err);
  }

  const cleanText = rawText.trim();
  const lowerText = cleanText.toLowerCase();

  // Essential Legal Metrology packaging keywords
  const packageKeywords = [
    "mrp", "net", "qty", "quantity", "pkd", "mfg", "exp", "batch",
    "ingredients", "consumer care", "incl", "taxes", "address", "origin",
    "soap", "pears", "sugar", "chocolate", "biscuit", "milk", "tea", "oil",
    "flour", "salt", "rice", "spice", "gram", "gms", "kg", "ml", "l", "ltd", "pvt"
  ];

  const matchedKeywords = packageKeywords.filter(kw => lowerText.includes(kw));

  // If OCR extracted very little text or zero packaging keywords, determine if it's non-packaging
  if (cleanText.length < 5 && matchedKeywords.length === 0) {
    return {
      isPackagedCommodity: false,
      name: "Non-Commodity Photo",
      brand: "Unknown",
      category: "Non-Packaging",
      declarations: {
        genericName: { value: "Unknown", compliant: false },
        netQty: { value: "N/A", compliant: false },
        unitSymbol: { value: "N/A", compliant: false },
        mrp: { value: "N/A", compliant: false },
        mfgDate: { value: "N/A", compliant: false },
        mfgAddress: { value: "N/A", compliant: false },
        countryOfOrigin: { value: "N/A", compliant: false },
        consumerCare: { value: "N/A", compliant: false },
      },
      pdpFontHeightMm: 0,
      minFontHeightRequiredMm: 2.5,
      overallVerdict: "VIOLATION",
      violationsSummary: [],
      reason: "OCR text extraction found no pre-packaged product label or Legal Metrology declarations in this image. Please upload a clear, sharp photo of a product package label.",
      extractedRawText: cleanText,
    };
  }

  // Parse extracted OCR text using Smart Entity Normalizer
  const parsedResult = parseOcrTextToRules(cleanText);

  return {
    ...parsedResult,
    extractedRawText: cleanText,
  };
}
