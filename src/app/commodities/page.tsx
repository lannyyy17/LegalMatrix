"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconFileSpreadsheet,
  IconPlus,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MOCK_COMMODITIES } from "@/lib/mock-data";

export default function CommoditiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filteredCommodities = MOCK_COMMODITIES.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm) ||
      item.manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "ALL" || item.overallStatus === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Packaged Commodities Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit and verify Legal Metrology Rule 6 mandatory label declarations for registered goods.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconFileSpreadsheet className="h-4 w-4 text-emerald-600" />
            Export Audit Manifest (CSV)
          </Button>
          <Link href="/commodities/CMD-2026-002">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <IconPlus className="h-4 w-4" />
              New Label Verification
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Barcode, Commodity Name, or Packer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
                <option value="Electronics">Electronics</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Household Goods">Household Goods</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="w-full md:w-52">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="ALL">All Compliance Statuses</option>
                <option value="COMPLIANT">Compliant Only</option>
                <option value="NON_COMPLIANT">Non-Compliant Only</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="NOTICE_ISSUED">Notice Issued</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Commodity Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Audited Commodities Directory ({filteredCommodities.length})
              </CardTitle>
              <CardDescription>
                Mandatory declarations rule compliance status per Rule 6 (LM Rules 2011)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barcode / ID</TableHead>
                <TableHead>Commodity & Generic Name</TableHead>
                <TableHead>Packer / Importer</TableHead>
                <TableHead>Net Qty & MRP</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommodities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500 text-xs">
                    No packaged commodities found matching search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCommodities.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs font-semibold text-blue-700">
                      <div>{item.barcode}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 text-xs">
                          {item.productName}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.genericName} • {item.category}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-slate-800">
                          {item.manufacturer.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {item.importer ? `Imp: ${item.importer.countryOfOrigin}` : `State: ${item.manufacturer.state}`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="font-semibold text-slate-900">₹{item.mrp.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-500">Net: {item.netQuantity}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${
                              item.complianceScore === 100
                                ? "bg-emerald-600"
                                : item.complianceScore >= 70
                                ? "bg-amber-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${item.complianceScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          {item.complianceScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.overallStatus === "COMPLIANT" && (
                        <Badge variant="success">Compliant</Badge>
                      )}
                      {item.overallStatus === "NON_COMPLIANT" && (
                        <Badge variant="danger">Non-Compliant</Badge>
                      )}
                      {item.overallStatus === "UNDER_REVIEW" && (
                        <Badge variant="warning">Under Review</Badge>
                      )}
                      {item.overallStatus === "NOTICE_ISSUED" && (
                        <Badge variant="danger">Notice Issued</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/commodities/${item.id}`}>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Inspect Label
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
