"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconDashboard,
  IconPackage,
  IconFileCheck,
  IconBuilding,
  IconAnalytics,
  IconSettings,
  IconSearch,
  IconPlus,
  IconScale,
  IconLogOut,
  IconShieldAlert,
  IconCamera,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out shrink-0 select-none z-20",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* 1. Top Brand Dropdown Header */}
      <div className="flex h-12 items-center justify-between px-3 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            <IconScale className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1 font-bold text-xs text-slate-900 truncate">
              <span>LegalMetrix</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="flex items-center gap-1 text-slate-400">
            <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer">
              <IconSearch className="h-3.5 w-3.5" />
            </button>
            <Link href="/scan">
              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer">
                <IconPlus className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* 2. Sidebar Navigation Items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
        {/* AI Scanner Primary Module */}
        <div className="space-y-1">
          <Link
            href="/scan"
            className={cn(
              "flex items-center justify-between rounded-md px-2.5 py-1.5 font-semibold transition-colors border",
              pathname === "/scan"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-50/70 text-blue-800 border-blue-200 hover:bg-blue-100/70"
            )}
          >
            <div className="flex items-center gap-2">
              <IconCamera className="h-4 w-4 shrink-0" />
              {!collapsed && <span>AI Label Scanner</span>}
            </div>
            {!collapsed && (
              <Badge variant="info" className="text-[9px] px-1.5 py-0 bg-white text-blue-800 border-none font-bold">
                OCR AI
              </Badge>
            )}
          </Link>
        </div>

        {/* Quick Inspector Section */}
        <div className="space-y-0.5">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center justify-between rounded-md px-2.5 py-1.5 font-medium transition-colors",
              pathname === "/dashboard"
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <div className="flex items-center gap-2.5">
              <IconDashboard className="h-4 w-4 text-slate-500" />
              {!collapsed && <span>Enforcement Inbox</span>}
            </div>
            {!collapsed && (
              <span className="rounded bg-slate-200/70 px-1.5 py-0.2 font-mono text-[10px] text-slate-600 font-semibold">
                12
              </span>
            )}
          </Link>

          <Link
            href="/commodities"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 font-medium transition-colors",
              pathname.startsWith("/commodities")
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <IconPackage className="h-4 w-4 text-slate-500" />
            {!collapsed && <span>My Inspections</span>}
          </Link>
        </div>

        {/* Workspace Section */}
        {!collapsed && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Workspace</span>
              <span>▾</span>
            </div>
            <div className="space-y-0.5 pl-1">
              <Link
                href="/commodities"
                className="flex items-center gap-2 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <span className="text-slate-400">◇</span>
                <span>Commodities</span>
              </Link>
              <Link
                href="/inspections"
                className="flex items-center gap-2 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <span className="text-slate-400">◇</span>
                <span>Seizure Orders</span>
              </Link>
              <Link
                href="/entities"
                className="flex items-center gap-2 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <span className="text-slate-400">◇</span>
                <span>Packers Directory</span>
              </Link>
            </div>
          </div>
        )}

        {/* Enforcement Divisions Tree */}
        {!collapsed && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Enforcement Teams</span>
              <span>▾</span>
            </div>

            {/* Division Team 1 */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Central Zone (Delhi NCR)</span>
                <span className="text-[10px] text-slate-400">🔒▾</span>
              </div>

              <div className="space-y-0.5 pl-3 border-l border-slate-200 ml-2">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors",
                    pathname === "/dashboard"
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <IconFileCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span>Issues & Violations</span>
                </Link>

                <Link
                  href="/commodities"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors",
                    pathname === "/commodities"
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <IconPackage className="h-3.5 w-3.5 text-slate-500" />
                  <span>Active Sweeps</span>
                </Link>

                <Link
                  href="/inspections"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors",
                    pathname === "/inspections"
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <IconShieldAlert className="h-3.5 w-3.5 text-slate-500" />
                  <span>Court Prosecution</span>
                </Link>
              </div>
            </div>

            {/* Division Team 2 */}
            <div className="pt-1">
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="truncate">Maharashtra Circle</span>
                <span className="text-[10px] text-slate-400">▾</span>
              </div>
            </div>
          </div>
        )}

        {/* Regulatory Resources */}
        {!collapsed && (
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Regulatory Rules</span>
              <span>▾</span>
            </div>
            <div className="space-y-0.5">
              <Link
                href="/analytics"
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  pathname === "/analytics" && "bg-slate-100 font-semibold text-slate-900"
                )}
              >
                <IconAnalytics className="h-3.5 w-3.5 text-slate-500" />
                <span>Analytics Reports</span>
              </Link>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  pathname === "/settings" && "bg-slate-100 font-semibold text-slate-900"
                )}
              >
                <IconSettings className="h-3.5 w-3.5 text-slate-500" />
                <span>Rule 7 Thresholds</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Footer Profile & Logout Option */}
      <div className="p-2 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            RK
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 text-xs">
              <span className="font-semibold text-slate-900 truncate leading-none">R. Kumar</span>
              <span className="text-[10px] text-slate-500 truncate mt-0.5">Senior Inspector</span>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer shrink-0"
          title="Log Out of Officer Session"
        >
          <IconLogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
