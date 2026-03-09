import { AppLayout } from "@/components/layout/AppLayout";

const mockPools = [
  {
    name: "Rob's Home Pool",
    vouchers: ["ROB", "FARM", "JANE", "KES"],
    totalValue: "1,240 KES",
    members: 3,
    type: "Personal",
  },
  {
    name: "Kilifii Community Pool",
    vouchers: ["FARM", "JANE", "MAMA", "KES"],
    totalValue: "8,500 KES",
    members: 12,
    type: "Community",
  },
];

export default function PoolsPage() {
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pools</h1>
          <p className="text-gray-500 text-sm mt-1">
            Pools are curated collections of vouchers that enable exchange between members.
            Think of your pool as your shop — it holds what you accept and what you offer.
          </p>
        </div>

        <div className="space-y-4">
          {mockPools.map((pool) => (
            <div key={pool.name} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{pool.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {pool.members} members · {pool.type}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{pool.totalValue}</div>
                  <div className="text-xs text-gray-400">total pool value</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1.5">Vouchers in pool:</div>
                <div className="flex gap-2 flex-wrap">
                  {pool.vouchers.map((v) => (
                    <span
                      key={v}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <strong>How pools work:</strong> When someone pays you with a different voucher, the swap
          happens automatically through your pool. You set credit limits for each voucher you
          accept. Your pool auto-created when you published your first voucher.
        </div>
      </div>
    </AppLayout>
  );
}
