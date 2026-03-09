import { AppLayout } from "@/components/layout/AppLayout";
import Link from "next/link";
import { Plus } from "lucide-react";

const mockVouchers = [
  {
    symbol: "ROB",
    name: "Rob's Services",
    supply: 200,
    value: "1 ROB = 100 KES",
    type: "Standard",
    status: "Active",
  },
  {
    symbol: "FARM",
    name: "Kamau's Farm",
    supply: 500,
    value: "1 FARM = 50 KES",
    type: "Standard",
    status: "Active",
  },
  {
    symbol: "JANE",
    name: "Jane's Crafts",
    supply: 150,
    value: "1 JANE = 200 KES",
    type: "Decaying",
    status: "Active",
  },
];

export default function VouchersPage() {
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vouchers</h1>
            <p className="text-gray-500 text-sm mt-1">
              Your community asset vouchers (gift cards)
            </p>
          </div>
          <Link
            href="/vouchers/create"
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800"
          >
            <Plus size={16} />
            Create Voucher
          </Link>
        </div>

        <div className="space-y-3">
          {mockVouchers.map((v) => (
            <div
              key={v.symbol}
              className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800 text-sm">
                  {v.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{v.name}</div>
                  <div className="text-xs text-gray-500">
                    {v.symbol} · {v.value} · Supply: {v.supply}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    v.type === "Decaying"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {v.type}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-medium">
                  {v.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <p className="text-sm text-gray-500 mb-3">Want to try the new offer-first flow?</p>
          <Link
            href="/offers/create"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:underline"
          >
            ✨ Create with the new wizard →
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
