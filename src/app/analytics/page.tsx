"use client";

import React from "react";
import {
  IconTrendingUp,
  IconDownload,
  IconCalendar,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const REGIONAL_STATS = [
  { region: "Delhi NCR Division", inspections: 4120, compliant: 3410, rate: 82.7, fines: "₹ 1.24 Cr" },
  { region: "Maharashtra West Division", inspections: 3890, compliant: 3100, rate: 79.6, fines: "₹ 1.85 Cr" },
  { region: "Karnataka South Circle", inspections: 2940, compliant: 2510, rate: 85.3, fines: "₹ 78.4 Lakhs" },
  { region: "Uttar Pradesh East Division", inspections: 2110, compliant: 1620, rate: 76.7, fines: "₹ 94.2 Lakhs" },
  { region: "Tamil Nadu Circle", inspections: 1760, compliant: 1500, rate: 85.2, fines: "₹ 42.1 Lakhs" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Regional Compliance & Prosecution Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            State-wise Legal Metrology Enforcement Performance & Statutory Violation Trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconCalendar className="h-4 w-4 text-slate-500" />
            Q1 2026 Audit Period
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5 text-xs">
            <IconDownload className="h-4 w-4" />
            Export Executive Report (PDF)
          </Button>
        </div>
      </div>

      {/* Analytical Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">
              National Compliance Average
            </CardTitle>
            <CardDescription>Target: 90.0% Minimum Threshold</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-blue-700">81.9%</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <IconTrendingUp className="h-3.5 w-3.5" /> +2.1% YoY
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: "81.9%" }} />
            </div>
            <p className="text-[11px] text-slate-500">
              12,140 out of 14,820 inspected packaged commodities met all Rule 6 standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Compounding Fine Recovery
            </CardTitle>
            <CardDescription>Total Statutory Penalties Collected</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">₹ 5.23 Cr</span>
              <Badge variant="success" className="text-[10px]">100% Realized</Badge>
            </div>
            <p className="text-[11px] text-slate-500">
              Across 1,845 compounding orders issued under Legal Metrology Act Section 48.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-900">
              E-Commerce Digital Disclosures
            </CardTitle>
            <CardDescription>Rule 6(10) Online Market Audit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-700">74.2%</span>
              <Badge variant="warning" className="text-[10px]">Improvement Needed</Badge>
            </div>
            <p className="text-[11px] text-slate-500">
              Digital marketplace platform mandatory declaration compliance rate.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Division Comparison Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">
            Zonal & Division Compliance Performance Matrix
          </CardTitle>
          <CardDescription>Comparative enforcement metrics across administrative zones</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Administrative Zone / Division</TableHead>
                <TableHead>Inspections Conducted</TableHead>
                <TableHead>Compliant Packaged Goods</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Fines Recovered</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REGIONAL_STATS.map((row) => (
                <TableRow key={row.region}>
                  <TableCell className="font-semibold text-xs text-slate-900">
                    {row.region}
                  </TableCell>
                  <TableCell className="text-xs text-slate-700 font-medium">
                    {row.inspections.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-slate-700 font-medium">
                    {row.compliant.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full"
                          style={{ width: `${row.rate}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{row.rate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-900">
                    {row.fines}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={row.rate >= 82 ? "success" : "warning"}>
                      {row.rate >= 82 ? "Optimal" : "Needs Sweeps"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
