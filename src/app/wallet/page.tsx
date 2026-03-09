import { AppLayout } from "@/components/layout/AppLayout";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

const holdings = [
  { symbol: "ROB", name: "Rob's Services", amount: 200, value: "200 KES", type: "own" },
  { symbol: "FARM", name: "Kamau's Farm", amount: 50, value: "2,500 KES", type: "holding" },
  { symbol: "JANE", name: "Jane's Crafts", amount: 15, value: "3,000 KES", type: "holding" },
  { symbol: "KES", name: "Kenyan Shilling (stablecoin)", amount: 340, value: "340 KES", type: "stable" },
];

const history = [
  { type: "received", label: "Received 50 FARM from Kamau", amount: "+50 FARM", time: "2h ago" },
  { type: "sent", label: "Sent 5 JANE to Fatima", amount: "-5 JANE", time: "Yesterday" },
  { type: "swap", label: "Swapped 20 ROB → 20 FARM", amount: "swap", time: "2 days ago" },
  { type: "received", label: "Purchase: 100 ROB sold", amount: "+100 ROB debt", time: "3 days ago" },
];

export default function WalletPage() {
  return (
    <AppLayout>
      <div className="p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your personal holdings — what you&apos;re carrying right now.
          </p>
        </div>

        {/* Balance summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-700 text-white rounded-2xl p-5">
            <div className="text-sm opacity-80 mb-1">Your Credit</div>
            <div className="text-3xl font-bold">6,040</div>
            <div className="text-sm opacity-70">KES equivalent</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-sm text-gray-500 mb-1">Your Debt</div>
            <div className="text-3xl font-bold text-gray-900">200</div>
            <div className="text-sm text-gray-400">vouchers outstanding</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 mb-8">
          {[
            { label: "Send", icon: ArrowUpRight, color: "text-green-700" },
            { label: "Receive", icon: ArrowDownLeft, color: "text-blue-700" },
            { label: "Swap", icon: ArrowLeftRight, color: "text-purple-700" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Icon size={20} className={a.color} />
                <span className="text-xs font-medium text-gray-700">{a.label}</span>
              </button>
            );
          })}
        </div>

        {/* Holdings */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Holdings
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-50">
            {holdings.map((h) => (
              <div key={h.symbol} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      h.type === "own"
                        ? "bg-green-100 text-green-800"
                        : h.type === "stable"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {h.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{h.name}</div>
                    <div className="text-xs text-gray-400">{h.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{h.amount}</div>
                  <div className="text-xs text-gray-400">{h.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Recent History
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-50">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      h.type === "received"
                        ? "bg-green-500"
                        : h.type === "sent"
                        ? "bg-orange-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <span className="text-sm text-gray-700">{h.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-600">{h.amount}</div>
                  <div className="text-xs text-gray-400">{h.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
