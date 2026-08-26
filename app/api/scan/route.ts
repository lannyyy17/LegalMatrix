import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { LEGAL_METROLOGY_RULES_DATASET, validateUnitSymbol, validateMrpFormat } from "@/lib/data/rulesDataset";
import { analyzePackageImage } from "@/lib/rules/imageOcrEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, imageUrl, userApiKey } = body;

    if (!imageBase64 && !imageUrl) {
      return NextResponse.json({ error: "Missing imageBase64 or imageUrl" }, { status: 400 });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        let imagePart: { inlineData: { mimeType: string; data: string } };

        if (imageBase64) {
          const match = imageBase64.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
          if (match) {
            imagePart = {
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
            };
          } else {
            imagePart = {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, ""),
              },
            };
          }
        } else {
          // Fetch image from URL
          const res = await fetch(imageUrl);
          const arrayBuffer = await res.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const mimeType = res.headers.get("content-type") || "image/jpeg";
          imagePart = {
            inlineData: {
              mimeType,
              data: base64,
            },
          };
        }

        const systemPrompt = `You are an official Legal Metrology Officer in India performing automated OCR and legal verification on package labels under the Legal Metrology (Packaged Commodities) Rules, 2011 and National Standards Rules, 2011.

STEP 1: Determine if the image contains a pre-packaged commodity, product label, or packaging declarations.
- If the image is NOT a packaged product label (e.g. selfie, face, meme, random object, landscape, non-product text), set "isPackagedCommodity": false and provide "reason".

STEP 2: If it IS a pre-packaged commodity, extract the ACTUAL text printed on the label and evaluate against the Legal Metrology Rules Dataset:
- Rule 6(1)(a) Generic/Common Name: Extract name of product.
- Rule 6(1)(b) Net Quantity & Unit Symbol: Check if non-permitted symbols ('gms', 'gms.', 'lts', 'kgs', 'gm') are printed instead of legal metric symbols ('g', 'kg', 'L', 'ml').
- Rule 6(1)(e) MRP: Check if price states "incl. of all taxes" or "inclusive of all taxes".
- Rule 6(1)(d) Date: Month/Year of mfg/packing.
- Rule 6(1)(ab) Address: Manufacturer/packer name & complete address with PIN code.
- Rule 6(10A) Country of Origin: Declaration of country of origin.
- Rule 6(1)(f) Consumer Care: Contact details.
- Rule 7 Font Height: Estimate numeral/letter print height in mm.

Return ONLY a raw valid JSON object (NO markdown formatting, NO triple backticks) matching this JSON structure:
{
  "isPackagedCommodity": true,
  "name": "Actual Product Name from Image",
  "brand": "Actual Brand from Image",
  "category": "Product Category",
  "declarations": {
    "genericName": { "value": "...", "compliant": true/false, "note": "..." },
    "netQty": { "value": "...", "compliant": true/false, "note": "..." },
    "unitSymbol": { "value": "...", "compliant": true/false, "note": "..." },
    "mrp": { "value": "...", "compliant": true/false, "note": "..." },
    "mfgDate": { "value": "...", "compliant": true/false, "note": "..." },
    "mfgAddress": { "value": "...", "compliant": true/false, "note": "..." },
    "countryOfOrigin": { "value": "...", "compliant": true/false, "note": "..." },
    "consumerCare": { "value": "...", "compliant": true/false, "note": "..." }
  },
  "pdpFontHeightMm": 2.5,
  "minFontHeightRequiredMm": 2.5,
  "overallVerdict": "COMPLIANT" or "VIOLATION",
  "violationsSummary": ["Actual violation 1 identified from label", "Actual violation 2 identified from label"]
}

If "isPackagedCommodity" is false:
{
  "isPackagedCommodity": false,
  "reason": "No pre-packaged commodity label or Legal Metrology declarations detected in this photo."
}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [systemPrompt, imagePart],
        });

        const textResult = response.text || "";
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json(parsed);
        }
      } catch (geminiErr) {
        console.warn("Gemini API call error:", geminiErr);
      }
    }

    // Real Image OCR & Feature Extraction Engine
    if (imageBase64) {
      const ocrResult = analyzePackageImage(imageBase64);
      return NextResponse.json(ocrResult);
    }

    return NextResponse.json({
      isPackagedCommodity: false,
      reason: "No pre-packaged commodity label or Legal Metrology declarations detected in this photo.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process scan" }, { status: 500 });
  }
}
