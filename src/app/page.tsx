import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { Ticket, Droplets, Wallet, Plus, Sparkles, ArrowRight } from "lucide-react";

const stats = [
  { label: "Vouchers", value: "3", sub: "active" },
  { label: "Pool Balance", value: "1,240 KES", sub: "total value" },
  { label: "Transactions", value: "47", sub: "this month" },
  { label: "Network Members", value: "128", sub: "in your area" },
];

const recentActivity = [
  { type: "received", label: "Received 50 AMINA from Kamau", time: "2h ago" },
  { type: "sent", label: "Sent 30 JANE to Fatima", time: "Yesterday" },
  { type: "swap", label: "Swapped 20 AMINA → 20 JANE", time: "2 days ago" },
  { type: "received", label: "New voucher purchase: 100 AMINA", time: "3 days ago" },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Rob</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Wizard CTAs */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Create Wizards — Prototype Comparison
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/vouchers/create"
              className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100">
                <Plus size={20} className="text-green-700" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">Current Voucher Wizard</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Modelled on the current sarafu.network flow — 6 steps
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-green-500 mt-0.5" />
            </Link>

            <Link
              href="/offers/create"
              className="flex items-start gap-4 bg-white border border-amber-200 rounded-xl p-5 hover:border-amber-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100">
                <Sparkles size={20} className="text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">New Offer & Voucher Wizard</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Redesigned offer-first flow — aligned with new Figma design
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-amber-500 mt-0.5" />
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "My Vouchers", href: "/vouchers", icon: Ticket },
            { label: "My Pools", href: "/pools", icon: Droplets },
            { label: "Wallet", href: "/wallet", icon: Wallet },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all"
              >
                <Icon size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      a.type === "received"
                        ? "bg-green-500"
                        : a.type === "sent"
                        ? "bg-orange-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <span className="text-sm text-gray-700">{a.label}</span>
                </div>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
