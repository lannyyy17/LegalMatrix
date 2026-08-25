"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconSearch,
  IconBell,
  IconBuilding,
  IconShieldCheck,
  IconPlus,
  IconAlertTriangle,
  IconCheckCircle,
  IconX,
  IconUser,
  IconSlidersHorizontal,
  IconLogOut,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    router.push("/");
  };

  return (
    <header className="flex flex-col w-full border-b border-slate-200 bg-white select-none">
      {/* Row 1: Top Tab Navigation & Controls */}
      <div className="flex h-12 w-full items-center justify-between px-4 border-b border-slate-100 text-xs">
        {/* Left: Context Pills & Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {/* Team Context Badge Pill */}
          <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-slate-700 font-semibold border border-slate-200 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Central Zone</span>
          </div>

          {/* Tab Filter Pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-slate-900 font-semibold border border-slate-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              All Issues
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                activeTab === "active"
                  ? "bg-white text-slate-900 font-semibold border border-slate-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Active Audit (14)
            </button>
            <button
              onClick={() => setActiveTab("backlog")}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                activeTab === "backlog"
                  ? "bg-white text-slate-900 font-semibold border border-slate-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Backlog (33)
            </button>
            <button
              onClick={() => setActiveTab("notices")}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                activeTab === "notices"
                  ? "bg-white text-slate-900 font-semibold border border-slate-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Notices (3)
            </button>
          </div>
        </div>

        {/* Right: Display & Profile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Notifications"
            >
              <IconBell className="h-3.5 w-3.5" />
              <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-900">Enforcement Alerts</span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="py-2 space-y-2">
                  <div className="flex gap-2">
                    <IconAlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Dual MRP Violation</p>
                      <p className="text-slate-500 text-[11px]">ProTech PowerBank sticker override.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Display Options Button */}
          <button className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium">
            <IconSlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
            <span>Display</span>
            <span className="text-slate-400 text-[10px]">▾</span>
          </button>

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 p-1 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="h-5 w-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                RK
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 z-50 text-xs">
                <div className="p-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">Rajesh Kumar</p>
                  <p className="text-slate-500 text-[10px]">r.kumar@legalmetrology.gov.in</p>
                </div>
                <div className="py-1">
                  <Link href="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2 px-2 py-1 text-slate-700 hover:bg-slate-100 rounded">
                    <IconUser className="h-3.5 w-3.5 text-slate-500" />
                    Profile & Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-left mt-1 border-t border-slate-100 font-medium cursor-pointer">
                    <IconLogOut className="h-3.5 w-3.5 text-red-600" />
                    Log Out of Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Filter Bar */}
      <div className="flex h-10 w-full items-center justify-between px-4 bg-slate-50/50 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <IconSlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <span>Filter</span>
            <span className="text-slate-400 text-[10px]">▾</span>
          </div>

          <div className="h-4 w-px bg-slate-200" />

          {/* Quick Search */}
          <div className="relative">
            <IconSearch className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search issues, barcodes, rule grounds..."
              className="h-7 w-64 rounded-md border border-slate-200 bg-white pl-7 pr-3 text-xs text-slate-900 outline-none focus:border-blue-600 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span>Showing <strong>14.8k</strong> packaged commodities</span>
        </div>
      </div>
    </header>
  );
}
