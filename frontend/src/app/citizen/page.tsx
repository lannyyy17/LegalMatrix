"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconShieldCheck,
  IconShieldAlert,
  IconQrCode,
  IconCamera,
  IconSend,
  IconCheckCircle,
  IconXCircle,
  IconAlertTriangle,
  IconScale,
  IconUser,
  IconX,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_COMMODITIES } from "@/lib/mock-data";

export default function CitizenPortalPage() {
  const [barcodeQuery, setBarcodeQuery] = useState("8901030829104");
  const [activeTab, setActiveTab] = useState<"VERIFY" | "REPORT" | "MY_COMPLAINTS">("VERIFY");
  const [complaintSubmitted, setComplaintSubmitted] = useState<string | null>(null);
  const [showCitizenLoginModal, setShowCitizenLoginModal] = useState(false);
  const [isCitizenLoggedIn, setIsCitizenLoggedIn] = useState(false);
  const [citizenMobile, setCitizenMobile] = useState("9876543210");
  const [otpSent, setOtpSent] = useState(false);

  // Find verified commodity matching query
  const foundProduct = MOCK_COMMODITIES.find(
    (c) => c.barcode.includes(barcodeQuery) || c.productName.toLowerCase().includes(barcodeQuery.toLowerCase())
  ) || MOCK_COMMODITIES[0];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setComplaintSubmitted(generatedId);
  };

  const handleCitizenLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      setIsCitizenLoggedIn(true);
      setShowCitizenLoginModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased p-4 md:p-6 space-y-6">
      {/* Citizen Public Navigation Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 rounded-xl border">
        <Link href="/citizen" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            <IconScale className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Legal<span className="text-blue-600">Metrix</span> <span className="text-xs font-normal text-slate-500">• Citizen Portal</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="hidden sm:inline text-slate-500 hover:text-slate-900 font-medium">
            National Consumer Helpline: 1800-11-4000
          </a>
          {isCitizenLoggedIn ? (
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <IconUser className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-slate-800">+91 {citizenMobile}</span>
              <button
                onClick={() => setIsCitizenLoggedIn(false)}
                className="text-[10px] text-red-600 hover:underline ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCitizenLoginModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <IconUser className="h-3.5 w-3.5" />
              Citizen Sign In / OTP
            </button>
          )}
        </div>
      </header>

      {/* Citizen Portal Hero Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="info">Consumer Protection & Public Verification</Badge>
            <span className="text-xs text-slate-500 font-mono">Legal Metrology Act, 2009</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Packaged Goods Verification & Consumer Grievance Portal
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl">
            Verify mandatory Rule 6 label disclosures on packaged commodities, check registered statutory MRP, and report violations (overcharging, dual MRP, missing helpline) directly to consumer protection teams.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("VERIFY")}
            className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
              activeTab === "VERIFY"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            Verify Package
          </button>
          <button
            onClick={() => setActiveTab("REPORT")}
            className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
              activeTab === "REPORT"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            Report Violation
          </button>
          {isCitizenLoggedIn && (
            <button
              onClick={() => setActiveTab("MY_COMPLAINTS")}
              className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                activeTab === "MY_COMPLAINTS"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              My Complaints
            </button>
          )}
        </div>
      </div>

      {/* Main Mode Tabs */}
      {activeTab === "VERIFY" && (
        <div className="space-y-6">
          {/* Barcode Search & Scanner Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Instant Barcode & Label Verification
              </CardTitle>
              <CardDescription>
                Scan or type the 13-digit EAN barcode found on any packaged product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={barcodeQuery}
                    onChange={(e) => setBarcodeQuery(e.target.value)}
                    placeholder="Enter EAN-13 Barcode or Product Name (e.g., 8901030829104)..."
                    className="pl-9 h-10 text-xs font-mono font-semibold"
                  />
                </div>
                <Button variant="primary" className="h-10 gap-2 text-xs">
                  <IconQrCode className="h-4 w-4" />
                  Verify Package Label
                </Button>
              </div>

              {/* Quick Sample Test Buttons */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <span className="font-semibold">Quick Sample Searches:</span>
                <button
                  onClick={() => setBarcodeQuery("8901030829104")}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 text-[11px] font-mono cursor-pointer"
                >
                  8901030829104 (Compliant Water)
                </button>
                <button
                  onClick={() => setBarcodeQuery("8901234567890")}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 text-[11px] font-mono cursor-pointer"
                >
                  8901234567890 (PowerBank Non-Compliant)
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Verification Result Card */}
          {foundProduct && (
            <Card className="border-2 border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {foundProduct.overallStatus === "COMPLIANT" ? (
                      <IconShieldCheck className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <IconShieldAlert className="h-6 w-6 text-red-600" />
                    )}
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{foundProduct.productName}</h3>
                      <p className="text-xs text-slate-500">Generic: {foundProduct.genericName} • Barcode: {foundProduct.barcode}</p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      foundProduct.overallStatus === "COMPLIANT"
                        ? "success"
                        : "danger"
                    }
                    className="text-xs px-2.5 py-1"
                  >
                    {foundProduct.overallStatus === "COMPLIANT" ? "Rule 6 Verified Compliant" : "Violation Flagged"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Statutory Mandatory Disclosures Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-semibold text-[10px] block uppercase">Statutory MRP</span>
                    <span className="text-base font-bold text-blue-700">₹ {foundProduct.mrp.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Inclusive of all taxes</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-semibold text-[10px] block uppercase">Net Quantity</span>
                    <span className="text-base font-bold text-slate-900">{foundProduct.netQuantity}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Unit Sale Price: {foundProduct.unitSalePrice}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-semibold text-[10px] block uppercase">Manufacturer / Packer</span>
                    <span className="text-xs font-semibold text-slate-900 block truncate">{foundProduct.manufacturer.name}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{foundProduct.manufacturer.licenseNo}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-slate-400 font-semibold text-[10px] block uppercase">Consumer Care</span>
                    <span className="text-xs font-semibold text-slate-900 block truncate">{foundProduct.consumerCare.phone}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 truncate">{foundProduct.consumerCare.email}</span>
                  </div>
                </div>

                {/* Statutory Rule Checklist Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Statutory Rule 6 Declaration Checklist Audit
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {foundProduct.declarations.map((dec) => (
                      <div
                        key={dec.id}
                        className="p-2.5 rounded-md border border-slate-200 bg-white flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {dec.status === "PASSED" ? (
                            <IconCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <IconXCircle className="h-4 w-4 text-red-600 shrink-0" />
                          )}
                          <span className="font-semibold text-slate-800">{dec.field}</span>
                        </div>
                        <Badge
                          variant={dec.status === "PASSED" ? "success" : "danger"}
                          className="text-[10px]"
                        >
                          {dec.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* If Non-Compliant, Report Button Prompt */}
                {foundProduct.overallStatus !== "COMPLIANT" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-xs text-red-900">
                    <div className="flex items-center gap-2">
                      <IconAlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                      <div>
                        <p className="font-bold">Spotted a violation on this product at a retail store?</p>
                        <p className="text-[11px] text-red-700">You can file a formal consumer grievance with photo evidence.</p>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setActiveTab("REPORT")}
                    >
                      File Violation Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Report Violation Tab */}
      {activeTab === "REPORT" && (
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-semibold text-slate-900">
              File a Consumer Legal Metrology Grievance
            </CardTitle>
            <CardDescription>
              Report overcharging above MRP, sticker re-labeling, dual MRP, or missing declarations under Section 18 of the Legal Metrology Act, 2009.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {complaintSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
                <IconCheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">
                  Grievance Registered Successfully!
                </h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Your complaint reference ID is <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-900">{complaintSubmitted}</strong>. It has been submitted to regional consumer protection teams.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={() => setComplaintSubmitted(null)}>
                    File Another Grievance
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">Violation Category</label>
                    <select className="w-full rounded-md border border-slate-300 p-2 text-xs bg-white text-slate-900 outline-none focus:border-blue-600">
                      <option>Overcharging Above Printed MRP</option>
                      <option>Dual MRP / Sticker Re-labeling</option>
                      <option>Missing Consumer Care Helpline</option>
                      <option>Missing Country of Origin (Imported Product)</option>
                      <option>Short Net Quantity / Weight Deficiency</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">Product Barcode / Name</label>
                    <Input placeholder="e.g. 8901030829104 or Brand Name..." defaultValue={barcodeQuery} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">Retailer / Store Name & Location</label>
                    <Input placeholder="e.g. Metro Supermarket, Sector 18 Noida" required />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">Charged Price vs Printed MRP (₹)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Charged Price (e.g. 120)" required />
                      <Input placeholder="Printed MRP (e.g. 100)" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Description of Offence</label>
                  <textarea
                    className="w-full rounded-md border border-slate-300 p-2 text-xs text-slate-900 h-20 outline-none focus:border-blue-600"
                    placeholder="Provide details about store receipt, sticker placement, or refusal to issue receipt..."
                    required
                  />
                </div>

                {/* Photo Upload Mock Field */}
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center space-y-2 bg-slate-50/50">
                  <IconCamera className="h-6 w-6 text-slate-400 mx-auto" />
                  <p className="font-semibold text-slate-700">Upload Product Label Photo or Store Invoice</p>
                  <p className="text-[11px] text-slate-500">Supports JPG, PNG (Max 5MB)</p>
                  <Button type="button" variant="outline" size="sm" className="text-xs">
                    Choose Photo File
                  </Button>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" className="gap-2 text-xs">
                    <IconSend className="h-4 w-4" />
                    Submit Consumer Grievance
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* Track My Filed Complaints Tab */}
      {activeTab === "MY_COMPLAINTS" && isCitizenLoggedIn && (
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-semibold text-slate-900">
              My Filed Consumer Grievances & Status
            </CardTitle>
            <CardDescription>Registered under Citizen Mobile Number +91 {citizenMobile}</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-700">CIT-2026-8812</span>
                  <Badge variant="warning">Under Review</Badge>
                </div>
                <p className="font-semibold text-slate-900 mt-1">Dual MRP Sticker Overcharging — PowerBank 10000mAh</p>
                <p className="text-slate-500 text-[11px]">Metro Supermarket, Sector 18 Noida • Filed 2 days ago</p>
              </div>
              <span className="text-[11px] text-slate-400">Status: Dispatched to Local Officer</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-700">CIT-2026-4401</span>
                  <Badge variant="success">Resolved & Fined</Badge>
                </div>
                <p className="font-semibold text-slate-900 mt-1">Selling Above MRP (₹20 Charged vs ₹15 MRP)</p>
                <p className="text-slate-500 text-[11px]">AquaPure Retail Outlet • Filed 1 week ago</p>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold text-emerald-700">Compounding Penalty Deposited</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consumer Statutory Rights Quick Guide */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-semibold text-slate-900">
            Consumer Legal Metrology Rights & Helpline
          </CardTitle>
          <CardDescription>Section 18, Legal Metrology Act 2009 & Packaged Commodities Rules 2011</CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs">1. No Overcharging Above MRP</h4>
            <p className="text-slate-600 text-[11px]">
              No retailer can sell a packaged commodity at a price higher than the Maximum Retail Price (MRP) printed on the label.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs">2. Sticker Re-labeling Ban</h4>
            <p className="text-slate-600 text-[11px]">
              Stickers covering original MRP or dual MRP pricing on identical products are punishable offences.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs">3. National Consumer Helpline</h4>
            <p className="text-slate-600 text-[11px]">
              Toll-Free Helpline: <strong className="text-blue-700 font-mono">1800-11-4000</strong> or SMS <strong className="text-slate-900 font-mono">8130009809</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CITIZEN OTP LOGIN MODAL */}
      {showCitizenLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <IconUser className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Citizen Sign In
                </h3>
              </div>
              <button onClick={() => setShowCitizenLoginModal(false)} className="text-slate-400 hover:text-slate-600">
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCitizenLoginSubmit} className="space-y-3.5 text-xs">
              {!otpSent ? (
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Enter Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="flex items-center justify-center px-3 bg-slate-100 border border-slate-300 rounded-md font-mono text-slate-700 font-bold">
                      +91
                    </span>
                    <Input
                      value={citizenMobile}
                      onChange={(e) => setCitizenMobile(e.target.value)}
                      placeholder="10-digit Mobile Number"
                      className="font-mono text-xs font-semibold"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Enter 4-Digit OTP</label>
                  <Input
                    defaultValue="4812"
                    placeholder="Enter OTP (e.g. 4812)"
                    className="font-mono text-center text-sm font-bold tracking-widest"
                    required
                  />
                  <p className="text-[10px] text-slate-500 mt-1">OTP sent to +91 {citizenMobile}</p>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full text-xs">
                {otpSent ? "Verify OTP & Access My Grievances" : "Send OTP"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
