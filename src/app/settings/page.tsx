"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconSave,
  IconCheckCircle,
  IconLock,
  IconLogOut,
} from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System & Regulatory Rule Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure Legal Metrology Act rules, enforcement thresholds, and officer profile details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5 text-xs cursor-pointer" onClick={handleSave}>
            <IconSave className="h-4 w-4" />
            {saved ? "Saved Configuration!" : "Save Settings"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <IconCheckCircle className="h-4 w-4 text-emerald-600" />
          Settings updated successfully! Changes applied to enforcement audit engine.
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="RULES">
        <TabsList>
          <TabsTrigger value="RULES">Rule Parameters (LM Rules 2011)</TabsTrigger>
          <TabsTrigger value="OFFICER">Officer Profile</TabsTrigger>
          <TabsTrigger value="NOTIFICATIONS">Alert Preferences</TabsTrigger>
        </TabsList>

        {/* Rule 6 Parameters Tab */}
        <TabsContent value="RULES" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                Rule 6 Statutory Font Size & Declaration Requirements
              </CardTitle>
              <CardDescription>Legal Metrology (Packaged Commodities) Rules, 2011 Rule 7 Specifications</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Minimum Font Height for Area &lt; 50 cm² (mm)
                  </label>
                  <Input defaultValue="1.0" className="text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Minimum Font Height for Area 50 to 100 cm² (mm)
                  </label>
                  <Input defaultValue="1.5" className="text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Minimum Font Height for Area 100 to 500 cm² (mm)
                  </label>
                  <Input defaultValue="2.5" className="text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Minimum Font Height for Area &gt; 500 cm² (mm)
                  </label>
                  <Input defaultValue="4.0" className="text-xs" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs">Penalty & Compounding Fine Defaults</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      First Offence Default Fine (₹)
                    </label>
                    <Input defaultValue="25000" className="text-xs font-mono font-bold text-slate-900" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      Second / Subsequent Offence Fine (₹)
                    </label>
                    <Input defaultValue="50000" className="text-xs font-mono font-bold text-slate-900" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Officer Profile Tab */}
        <TabsContent value="OFFICER">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                Enforcement Officer Credentials
              </CardTitle>
              <CardDescription>Government Identity & Official Designation</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Full Name</label>
                  <Input defaultValue="Rajesh Kumar" className="text-xs font-semibold" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Designation</label>
                  <Input defaultValue="Senior Enforcement Inspector" className="text-xs" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Official Email</label>
                  <Input defaultValue="r.kumar@legalmetrology.gov.in" className="text-xs font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Assigned Division</label>
                  <Input defaultValue="Central Delhi Enforcement Zone" className="text-xs" />
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconLock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900 text-xs">Digital Signature & Token Active</p>
                    <p className="text-[10px] text-slate-500">Government Class 3 e-Sign active for Section 18 notices.</p>
                  </div>
                </div>
                <Badge variant="info">Verified</Badge>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-xs">Session Security</p>
                  <p className="text-[11px] text-slate-500">Sign out of current enforcement portal session.</p>
                </div>
                <Button variant="danger" size="sm" className="gap-1.5 text-xs cursor-pointer" onClick={handleLogout}>
                  <IconLogOut className="h-4 w-4" />
                  Log Out of Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Preferences Tab */}
        <TabsContent value="NOTIFICATIONS">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                Automated System & Sweep Alerts
              </CardTitle>
              <CardDescription>Notification triggers for market inspection teams</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">Dual MRP Violation Immediate SMS</p>
                  <p className="text-[11px] text-slate-500">Alert senior inspector when dual pricing is flagged in market sweep.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded cursor-pointer" />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">Daily Notice Deadline Expiry Digest</p>
                  <p className="text-[11px] text-slate-500">Receive morning email summary of show-cause notices expiring within 48h.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
