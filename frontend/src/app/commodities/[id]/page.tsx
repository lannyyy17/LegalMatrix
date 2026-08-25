"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  IconArrowLeft,
  IconCheckCircle,
  IconXCircle,
  IconAlertTriangle,
  IconShieldAlert,
  IconInfo,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_COMMODITIES, PackagedCommodity, MandatoryDeclaration } from "@/lib/mock-data";

export default function CommodityDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Find commodity or fallback to CMD-2026-002
  const initialCommodity =
    MOCK_COMMODITIES.find((c) => c.id === id) || MOCK_COMMODITIES[1];

  const [commodity, setCommodity] = useState<PackagedCommodity>(initialCommodity);
  const [declarations, setDeclarations] = useState<MandatoryDeclaration[]>(
    initialCommodity.declarations
  );
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  // Function to toggle rule pass/fail state for interactive audit demonstration
  const handleToggleRuleStatus = (decId: string) => {
    const updated = declarations.map((dec) => {
      if (dec.id === decId) {
        const nextStatus =
          dec.status === "PASSED"
            ? "FAILED"
            : dec.status === "FAILED"
            ? "WARNING"
            : "PASSED";
        return { ...dec, status: nextStatus as MandatoryDeclaration["status"] };
      }
      return dec;
    });

    setDeclarations(updated);

    // Recalculate compliance score
    const passedCount = updated.filter((d) => d.status === "PASSED").length;
    const totalCount = updated.length;
    const newScore = Math.round((passedCount / totalCount) * 100);

    let newStatus: PackagedCommodity["overallStatus"] = "COMPLIANT";
    if (newScore < 70) newStatus = "NON_COMPLIANT";
    else if (newScore < 100) newStatus = "UNDER_REVIEW";

    setCommodity({
      ...commodity,
      complianceScore: newScore,
      overallStatus: newStatus,
      violationsCount: updated.filter((d) => d.status === "FAILED").length,
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/commodities">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <IconArrowLeft className="h-4 w-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {commodity.productName}
              </h1>
              <Badge variant="outline" className="font-mono text-[10px]">
                {commodity.barcode}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Legal Metrology (Packaged Commodities) Rule 6 Audit • Inspected by {commodity.inspectorName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {commodity.overallStatus === "NON_COMPLIANT" || commodity.violationsCount > 0 ? (
            <Button
              variant="danger"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => setShowNoticeModal(true)}
            >
              <IconShieldAlert className="h-4 w-4" />
              Generate Section 18 Enforcement Notice
            </Button>
          ) : (
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <IconCheckCircle className="h-4 w-4" />
              Issue Rule Compliance Certificate
            </Button>
          )}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Spec Sheet & Package Specimen Mockup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Label Specimen Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Label Specimen & Digital Twin
                </CardTitle>

                <Badge
                  variant={
                    commodity.overallStatus === "COMPLIANT"
                      ? "success"
                      : commodity.overallStatus === "NON_COMPLIANT"
                      ? "danger"
                      : "warning"
                  }
                >
                  Score: {commodity.complianceScore}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Mock Label Surface Visualizer */}
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-100/70 p-5 space-y-3 font-sans text-xs text-slate-800">
                <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{commodity.productName}</h3>
                    <p className="text-[11px] text-slate-500">Generic: {commodity.genericName}</p>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-bold">
                    PACKAGED GOOD
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Net Quantity</span>
                    <span className="font-semibold text-slate-900">{commodity.netQuantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">MRP (Incl. All Taxes)</span>
                    <span className="font-bold text-blue-700">₹ {commodity.mrp.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Mfg Date</span>
                    <span className="font-medium text-slate-800">{commodity.mfgDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Unit Sale Price</span>
                    <span className="font-medium text-slate-800">{commodity.unitSalePrice}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[10px] space-y-1 text-slate-600">
                  <p><span className="font-semibold text-slate-800">Packer:</span> {commodity.manufacturer.name}</p>
                  <p><span className="font-semibold text-slate-800">Address:</span> {commodity.manufacturer.address}</p>
                  <p><span className="font-semibold text-slate-800">Helpline:</span> {commodity.consumerCare.phone} | {commodity.consumerCare.email}</p>
                </div>
              </div>

              {/* Technical Attributes Grid */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Manufacturer License</span>
                  <span className="font-mono font-medium text-slate-800">{commodity.manufacturer.licenseNo}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Category</span>
                  <span className="font-medium text-slate-800">{commodity.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Risk Assessment</span>
                  <Badge variant={commodity.riskRating === "HIGH" ? "danger" : "neutral"} className="text-[10px]">
                    {commodity.riskRating} RISK
                  </Badge>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Last Inspection Date</span>
                  <span className="font-medium text-slate-800">{commodity.lastInspectedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Rule 6 Mandatory Declarations Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Rule 6 Mandatory Declarations Checklist
                  </CardTitle>
                  <CardDescription>
                    Legal Metrology (Packaged Commodities) Rules, 2011 Requirements
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <IconInfo className="h-3.5 w-3.5 text-blue-600" />
                  <span>Click badge to test audit rule</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {declarations.map((dec) => (
                <div
                  key={dec.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    dec.status === "PASSED"
                      ? "border-slate-200 bg-white"
                      : dec.status === "FAILED"
                      ? "border-red-200 bg-red-50/40"
                      : "border-amber-200 bg-amber-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => handleToggleRuleStatus(dec.id)}
                        className="mt-0.5 shrink-0 cursor-pointer"
                        title="Click to toggle Pass / Fail audit status"
                      >
                        {dec.status === "PASSED" && (
                          <IconCheckCircle className="h-5 w-5 text-emerald-600 hover:text-emerald-700" />
                        )}
                        {dec.status === "FAILED" && (
                          <IconXCircle className="h-5 w-5 text-red-600 hover:text-red-700" />
                        )}
                        {dec.status === "WARNING" && (
                          <IconAlertTriangle className="h-5 w-5 text-amber-600 hover:text-amber-700" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700">
                            {dec.ruleNumber}
                          </span>
                          <h4 className="text-xs font-semibold text-slate-900">
                            {dec.field}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {dec.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleRuleStatus(dec.id)}
                      className="shrink-0 cursor-pointer"
                    >
                      <Badge
                        variant={
                          dec.status === "PASSED"
                            ? "success"
                            : dec.status === "FAILED"
                            ? "danger"
                            : "warning"
                        }
                        className="text-[10px]"
                      >
                        {dec.status}
                      </Badge>
                    </button>
                  </div>

                  {/* Specification Breakdown */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="rounded bg-slate-50 p-2 border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        Declaration Found on Package
                      </span>
                      <span className="font-medium text-slate-900 text-xs">
                        {dec.valueFound}
                      </span>
                    </div>

                    <div className="rounded bg-slate-50 p-2 border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        Required Statutory Standard
                      </span>
                      <span className="font-medium text-slate-700 text-xs">
                        {dec.requiredFormat}
                      </span>
                    </div>
                  </div>

                  {dec.notes && (
                    <p className="mt-2 text-[11px] font-semibold text-red-700 bg-red-100/60 px-2 py-1 rounded border border-red-200">
                      Violation Note: {dec.notes}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enforcement Notice Modal Drawer */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <IconShieldAlert className="h-5 w-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Generate Statutory Notice (Section 18 / 36)
                </h3>
              </div>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p><span className="font-semibold">Target Entity:</span> {commodity.manufacturer.name}</p>
                <p><span className="font-semibold">Commodity:</span> {commodity.productName} ({commodity.barcode})</p>
                <p><span className="font-semibold">Statutory Ground:</span> Violation of Rule 6(1) & Section 18 of Legal Metrology Act, 2009.</p>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Draft Notice Summary & Statutory Offence Description
                </label>
                <textarea
                  className="w-full rounded-md border border-slate-300 p-2 text-xs text-slate-900 h-24 focus:border-blue-600 outline-none"
                  defaultValue={`Whereas on inspection of package '${commodity.productName}', barcode ${commodity.barcode}, the label was found to contain non-compliant declarations failing Rule 6 requirements. You are hereby called upon to show cause within 7 days.`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Standard Compounding Fine (₹)</label>
                  <input
                    type="number"
                    defaultValue={25000}
                    className="w-full rounded-md border border-slate-300 p-2 text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Response Due Window</label>
                  <select className="w-full rounded-md border border-slate-300 p-2 text-xs bg-white">
                    <option>7 Days (Standard)</option>
                    <option>15 Days (Extended)</option>
                    <option>48 Hours (Urgent Market Seizure)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoticeModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  alert("Legal Notice generated and dispatched to Packer email!");
                  setShowNoticeModal(false);
                }}
              >
                Issue & Dispatch Notice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
