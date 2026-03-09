"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Ticket,
  Droplets,
  Wallet,
  ArrowLeftRight,
  BookOpen,
  ChevronRight,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Map", href: "/map", icon: Map },
  { label: "Vouchers", href: "/vouchers", icon: Ticket },
  { label: "Pools", href: "/pools", icon: Droplets },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

const createItems = [
  {
    label: "Current Voucher Wizard",
    href: "/vouchers/create",
    icon: Plus,
    description: "sarafu.network style",
  },
  {
    label: "New Offer & Voucher Wizard",
    href: "/offers/create",
    icon: Sparkles,
    description: "redesigned flow",
    highlight: true,
  },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
        <div className="w-9 h-9 rounded-md bg-[#3d2b1f] flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 14c0-1 1-2 2-2h3l2-3h3c1 0 2 1 2 2v2c0 1-1 2-2 2H7c-1 0-2-1-2-2z" fill="#c9a96e" />
            <path d="M5 10c0-1 .8-1.5 2-1l5 2" stroke="#c9a96e" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm text-gray-900 leading-tight">Sarafu Network</div>
          <div className="text-xs text-gray-500">prototype</div>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Mock user bar */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700">Rob</span>
          <span className="text-xs text-gray-500">200.53 CELO</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}

        {/* Divider + Create section */}
        <div className="pt-4 pb-1">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 px-3 font-semibold mb-2">
            Create Wizards
          </div>
          {createItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                  active
                    ? item.highlight
                      ? "bg-amber-50 text-amber-800"
                      : "bg-green-50 text-green-700"
                    : item.highlight
                    ? "text-amber-700 hover:bg-amber-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium leading-tight">{item.label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{item.description}</div>
                </div>
                <ChevronRight size={14} className="mt-0.5 opacity-40 group-hover:opacity-70" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">Grassroots Economics Foundation</p>
      </div>
    </aside>
  );
}
