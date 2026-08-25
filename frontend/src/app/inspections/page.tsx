"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconFileCheck,
  IconShieldAlert,
  IconCheckCircle,
  IconGavel,
  IconSearch,
  IconPlus,
  IconDownload,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MOCK_NOTICES } from "@/lib/mock-data";

export default function InspectionsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = MOCK_NOTICES.filter((notice) => {
    const matchesSearch =
      notice.noticeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.commodityName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "ALL" || notice.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Enforcement & Prosecutions Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Section 18 & 36 Notices, Compounding Fines, and Court Prosecutions Tracker
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconDownload className="h-4 w-4" />
            Download Prosecution Report
          </Button>
          <Link href="/commodities/CMD-2026-004">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <IconPlus className="h-4 w-4" />
              File New Notice
            </Button>
          </Link>
        </div>
      </div>

      {/* Enforcement Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <IconFileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Cases Issued</p>
              <p className="text-lg font-bold text-slate-900">1,845</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <IconShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Response</p>
              <p className="text-lg font-bold text-red-600">342</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <IconCheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Fines Compounded</p>
              <p className="text-lg font-bold text-emerald-600">₹ 4.82 Cr</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <IconGavel className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Escalated to Court</p>
              <p className="text-lg font-bold text-amber-700">48 Cases</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Notice Table & Filters */}
      <Tabs defaultValue="ALL" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="ALL">All Notices ({MOCK_NOTICES.length})</TabsTrigger>
            <TabsTrigger value="PENDING_RESPONSE">Pending Response</TabsTrigger>
            <TabsTrigger value="EXPLANATION_RECEIVED">Explanation Received</TabsTrigger>
            <TabsTrigger value="COMPOUNDED">Compounded</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-72">
            <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by Notice # or Entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notice Reference</TableHead>
                    <TableHead>Packer / Entity</TableHead>
                    <TableHead>Offence & Section</TableHead>
                    <TableHead>Fine Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-mono text-xs font-bold text-blue-700">
                        {notice.noticeNumber}
                        <div className="text-[10px] text-slate-400 font-normal">
                          Issued: {notice.issueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-xs text-slate-900">
                          {notice.entityName}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {notice.commodityName}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs text-xs">
                        <span className="font-semibold text-slate-800 block">
                          {notice.sectionViolated}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">
                          {notice.violationSummary}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-900">
                        ₹{notice.penaltyAmount?.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs text-slate-700">
                        {notice.dueDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            notice.status === "PENDING_RESPONSE"
                              ? "danger"
                              : notice.status === "COMPOUNDED"
                              ? "success"
                              : "warning"
                          }
                        >
                          {notice.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                          Manage Case
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
