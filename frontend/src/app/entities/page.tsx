"use client";

import React, { useState } from "react";
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconMail,
  IconMapPin,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MOCK_MANUFACTURERS } from "@/lib/mock-data";

export default function EntitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("ALL");

  const filteredEntities = MOCK_MANUFACTURERS.filter((entity) => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = selectedRisk === "ALL" || entity.riskLevel === selectedRisk;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Packers & Importers Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Registration & Compliance History of Manufacturers, Packers, and Importers (LM Rule 27)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <IconDownload className="h-4 w-4" />
            Export Directory (CSV)
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5 text-xs">
            <IconPlus className="h-4 w-4" />
            Register New Packer
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Entity Name, Registration Number, or City..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="LOW">Low Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="HIGH">High Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Entity Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">
            Registered Legal Metrology Entities ({filteredEntities.length})
          </CardTitle>
          <CardDescription>Rule 27 Packer Registration Records</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration No.</TableHead>
                <TableHead>Entity Details</TableHead>
                <TableHead>Type & Location</TableHead>
                <TableHead>Compliance Rating</TableHead>
                <TableHead>Notices</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntities.map((entity) => (
                <TableRow key={entity.id}>
                  <TableCell className="font-mono text-xs font-bold text-blue-700">
                    {entity.registrationNumber}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-xs text-slate-900">{entity.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <IconMail className="h-3 w-3 text-slate-400" />
                      {entity.contactEmail}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="font-medium text-slate-800">{entity.entityType}</span>
                    <div className="text-[10px] text-slate-500 flex items-center gap-0.5">
                      <IconMapPin className="h-3 w-3 text-slate-400" />
                      {entity.city}, {entity.state}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {entity.compliancePercentage}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({entity.totalProductsInspected} items)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {entity.noticesIssued > 0 ? (
                      <span className="text-red-600">{entity.noticesIssued} Issued</span>
                    ) : (
                      <span className="text-emerald-600">0 Violations</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        entity.status === "REGISTERED"
                          ? "success"
                          : entity.status === "SUSPENDED"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {entity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      View Profile
                    </Button>
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
