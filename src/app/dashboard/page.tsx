"use client";

import React from "react";
import Link from "next/link";
import {
  IconPackage,
  IconShieldAlert,
  IconAlertTriangle,
  IconCheckCircle,
  IconClock,
  IconTrendingUp,
  IconSearch,
  IconPlus,
  IconFileCheck,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_STATS, MOCK_COMMODITIES, MOCK_NOTICES } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider block">
              Total Inspected
            </span>
            <span className="text-xl font-bold text-slate-900 mt-0.5 block">
              {MOCK_STATS.totalInspections.toLocaleString()}
            </span>
          </div>
          <div className="h-8 w-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <IconPackage className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3.5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider block">
              Compliance Rate
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-0.5 block">
              {MOCK_STATS.complianceRate}%
            </span>
          </div>
          <div className="h-8 w-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <IconCheckCircle className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3.5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider block">
              Notices Issued
            </span>
            <span className="text-xl font-bold text-red-600 mt-0.5 block">
              {MOCK_STATS.noticesIssuedCount.toLocaleString()}
            </span>
          </div>
          <div className="h-8 w-8 rounded bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <IconShieldAlert className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3.5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider block">
              Pending Sweeps
            </span>
            <span className="text-xl font-bold text-amber-600 mt-0.5 block">
              {MOCK_STATS.pendingVerifications}
            </span>
          </div>
          <div className="h-8 w-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <IconClock className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Main Aceternity / Linear-Style Kanban Enforcement Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start select-none">
        {/* Column 1: Backlog 33 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-slate-400" />
              <span>Backlog</span>
              <span className="text-slate-400 font-normal">33</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">•••</button>
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">+</button>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 font-medium">CMD-179</span>
                <div className="h-5 w-5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center">RK</div>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                NutriCrunch Almond Cookies 250g
              </p>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Badge variant="warning">Rule 6 Check</Badge>
                <span className="text-slate-400">Food & Bev</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 font-medium">CMD-148</span>
                <div className="h-5 w-5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center">AS</div>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                Sunrise Bakeries Label Audit
              </p>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Badge variant="danger">Taxes Extra</Badge>
                <span className="text-slate-400">MIDC Pune</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 font-medium">CMD-213</span>
                <div className="h-5 w-5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center">SV</div>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                PureFlow Mineral Water 500ml
              </p>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Badge variant="neutral">Pending Net Qty Test</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Active Audit 4 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-blue-500 bg-blue-100" />
              <span>Active Audit</span>
              <span className="text-slate-400 font-normal">4</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">•••</button>
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">+</button>
            </div>
          </div>

          <div className="space-y-2.5">
            <Link href="/commodities/CMD-2026-002" className="block">
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-3 space-y-2 hover:border-blue-300 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-blue-700 font-bold">CMD-228</span>
                  <div className="h-5 w-5 rounded-full bg-blue-600 text-[9px] font-bold text-white flex items-center justify-center">RK</div>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-snug">
                  Optimize Rule 6(11) Unit Sale Price Format
                </p>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <Badge variant="info">In Progress</Badge>
                  <span className="text-slate-500 font-medium">95.00 MRP</span>
                </div>
              </div>
            </Link>

            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 font-medium">CMD-199</span>
                <div className="h-5 w-5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center">PM</div>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                GlowRadiance Hydrating Serum 50ml
              </p>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Badge variant="warning">Importer Sticker</Badge>
                <span className="text-slate-400">South Korea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Notice Issued 5 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Notice Issued</span>
              <span className="text-slate-400 font-normal">5</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">•••</button>
              <button className="h-5 w-5 rounded flex items-center justify-center hover:bg-slate-200/60">+</button>
            </div>
          </div>

          <div className="space-y-2.5">
            <Link href="/commodities/CMD-2026-004" className="block">
              <div className="rounded-xl border border-red-200 bg-red-50/40 p-3 space-y-2 hover:border-red-300 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-red-700 font-bold">CMD-243</span>
                  <div className="h-5 w-5 rounded-full bg-red-600 text-[9px] font-bold text-white flex items-center justify-center">RK</div>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-snug">
                  ProTech PowerBank Dual MRP Sticker Override
                </p>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <Badge variant="danger">Section 18 Notice</Badge>
                  <span className="text-red-700 font-bold">₹ 50,000 Fine</span>
                </div>
              </div>
            </Link>

            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 font-medium">CMD-250</span>
                <div className="h-5 w-5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center">VM</div>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                VoltTech Digital Distribution Omission Notice
              </p>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Badge variant="warning">Pending Explanation</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Hidden Columns / Prosecuted Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">▾</span>
              <span>Resolved Summary</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconCheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-slate-800">Done / Compliant</span>
              </div>
              <span className="font-mono font-bold text-slate-900">133</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
              <div className="flex items-center gap-2">
                <IconShieldAlert className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-slate-800">Compounded Penalties</span>
              </div>
              <span className="font-mono font-bold text-slate-900">48</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
              <div className="flex items-center gap-2">
                <IconAlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-slate-800">Escalated to Court</span>
              </div>
              <span className="font-mono font-bold text-slate-900">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
