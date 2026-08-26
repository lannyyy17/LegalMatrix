"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FileSearch,
  Gauge,
  History,
  Landmark,
  Layers,
  ScanLine,
  ScrollText,
  Store,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: "Enforcement",
    items: [
      { href: "/", label: "Dashboard", icon: Gauge },
      { href: "/scan", label: "New inspection", icon: ScanLine },
      { href: "/report", label: "Compliance report", icon: FileSearch },
      { href: "/cross-channel", label: "Cross-channel check", icon: Layers },
      { href: "/violations", label: "Violations & notices", icon: ClipboardList, badge: "386" },
    ],
  },
  {
    group: "Records",
    items: [
      { href: "/repository", label: "Product repository", icon: Store },
      { href: "/entities", label: "Entity registry", icon: Users },
      { href: "/audit", label: "Audit trail", icon: History },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/rules", label: "Rule engine", icon: ScrollText },
      { href: "/citizen", label: "Citizen portal", icon: Landmark },
    ],
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="no-print hidden w-[238px] shrink-0 bg-deep pb-8 pt-2 md:block"
    >
      {GROUPS.map(({ group, items }) => (
        <div key={group}>
          <p className="px-[1.15rem] pb-1 pt-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-matcha-mid">
            {group}
          </p>
          {items.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 border-l-[3px] px-[1.15rem] py-2 text-[0.92rem] ${
                  active
                    ? "border-l-matcha-mid bg-deep-2 font-semibold text-white"
                    : "border-l-transparent text-tint hover:bg-deep-2 hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={1.9} aria-hidden />
                {label}
                {badge && (
                  <span className="ml-auto rounded-[9px] bg-bad px-1.5 text-[0.68rem] font-semibold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
