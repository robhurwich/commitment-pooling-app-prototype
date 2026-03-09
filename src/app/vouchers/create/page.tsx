"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StepProgress } from "@/components/ui/StepProgress";
import { WizardNav } from "@/components/ui/WizardNav";
import { ChevronDown, ChevronUp, Info, MapPin, X, Plus } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductOffering {
  id: string;
  name: string;
  description: string;
  quantity: string;
  frequency: string;
}

interface FormData {
  // Step 2
  issuerType: "personal" | "entity";
  name: string;
  email: string;
  website: string;
  locationName: string;
  // Step 3
  voucherName: string;
  symbol: string;
  description: string;
  products: ProductOffering[];
  // Step 4
  unitOfAccount: string;
  valuePerUnit: string;
  supply: string;
  // Step 5
  voucherType: "standard" | "expiring" | "demurrage";
  expiryDate: string;
  decayRate: string;
  redistributionPeriod: string;
  communityFundAddress: string;
  // Step 6
  acceptTerms: boolean;
  acceptPath: boolean;
}

const STEPS = [
  "Introduction",
  "About You",
  "Name & Offers",
  "Value & Supply",
  "Expiration",
  "Signing & Publishing",
];

const INITIAL_FORM: FormData = {
  issuerType: "personal",
  name: "",
  email: "",
  website: "",
  locationName: "",
  voucherName: "",
  symbol: "",
  description: "",
  products: [{ id: "1", name: "", description: "", quantity: "1", frequency: "Monthly" }],
  unitOfAccount: "USD",
  valuePerUnit: "",
  supply: "",
  voucherType: "standard",
  expiryDate: "",
  decayRate: "",
  redistributionPeriod: "",
  communityFundAddress: "",
  acceptTerms: false,
  acceptPath: false,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function WizardHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-16 h-16 rounded-lg bg-[#3d2b1f] flex items-center justify-center mb-4">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <path d="M8 24c0-2 2-4 4-4h6l4-6h5c2 0 4 2 4 4v4c0 2-2 4-4 4H12c-2 0-4-2-4-4z" fill="#c9a96e" />
          <path d="M8 17c0-2 1.5-3 3-2l9 4" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">Create your own Voucher</h1>
    </div>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {hint && <span className="text-xs font-normal text-gray-400 ml-2">{hint}</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function InfoBox({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "orange" }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
        color === "blue" ? "bg-blue-50 text-blue-800" : "bg-orange-50 text-orange-800"
      }`}
    >
      <Info size={16} className="mt-0.5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1Introduction() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Info size={16} />
        <span>Introduction</span>
      </div>

      <div className="prose prose-sm max-w-none text-gray-700">
        <p>
          Community Asset Vouchers (CAVs) are offers for goods or services, published on a
          decentralized, autonomous platform on the blockchain. They are similar to loyalty points or
          gift cards or certificates for actions completed. This guide will help you design and
          publish a CAV.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Process Overview</h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>About you:</strong> Who are you as the issuer creating and publishing the CAV?
          </li>
          <li>
            <strong>Naming & Purpose:</strong> What&apos;s your CAV&apos;s name and what does it represent?
          </li>
          <li>
            <strong>Valuation & Amount:</strong> How many CAVs do you want to create and what&apos;s their
            total worth?
          </li>
          <li>
            <strong>Expiry:</strong> Does your CAV expire over time and are they renewed?
          </li>
          <li>
            <strong>Finalization:</strong> How you&apos;ll sign and publish the CAV on the Celo ledger.
          </li>
        </ol>
      </div>

      {/* Disclaimer toggle */}
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          What is a CAV?
        </button>
        {open && (
          <div className="mt-3 text-sm text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4">
            <p>
              A Community Asset Voucher (CAV) is a formal commitment or contractual promise that can
              be offered and exchanged. For example, if you create a CAV called &ldquo;COCONUT&rdquo;, you could
              specify that 1 COCONUT is redeemable as payment for 1 hour of your carpentry. Another
              CAV called MANGO could be proof of one mango. Anyone who holds your CAV has the right
              to trade them to someone else or redeem them as payment for goods or services.
            </p>
            <p className="mt-2">
              Some CAV issuers will issue their CAV after getting an insurance or guarantee from a
              group pool, meaning that anyone holding the CAV could be redeemed from a pool if an
              issuer cannot fulfil their obligations.
            </p>
          </div>
        )}
      </div>

      <InfoBox>
        Sarafu Network and Grassroots Economics Foundation are not going to provide financial advice
        and are not responsible for usage and impact of your CAV.
      </InfoBox>
    </div>
  );
}

function Step2AboutYou({
  form,
  update,
}: {
  form: FormData;
  update: (k: keyof FormData, v: unknown) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>👤</span>
        <span>About you</span>
      </div>

      <div>
        <FieldLabel>Who is the issuer of this voucher?</FieldLabel>
        <div className="space-y-2">
          {[
            { val: "personal", label: "Personal (You yourself)" },
            { val: "entity", label: "Entity, Association or Organization that you duly represent" },
          ].map((opt) => (
            <label key={opt.val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="radio"
                name="issuerType"
                value={opt.val}
                checked={form.issuerType === opt.val}
                onChange={() => update("issuerType", opt.val)}
                className="accent-green-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Your Name</FieldLabel>
        <Input value={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
      </div>

      <div>
        <FieldLabel>Contact Information</FieldLabel>
        <Input
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="email@example.com"
          type="email"
        />
        <p className="text-xs text-gray-400 mt-1">
          This is the email address that people can contact you on.
        </p>
      </div>

      <div>
        <FieldLabel>Website</FieldLabel>
        <Input
          value={form.website}
          onChange={(v) => update("website", v)}
          placeholder="https://example.com"
        />
        <p className="text-xs text-gray-400 mt-1">If you have a website, you can enter it here.</p>
      </div>

      <div>
        <FieldLabel>Where is this Voucher&apos;s services based?</FieldLabel>
        <p className="text-xs text-gray-400 mb-2">
          If it is a non-local offering please indicate the country you reside in.
        </p>
        {/* Map placeholder */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100 h-40 flex items-center justify-center mb-2">
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <MapPin size={24} />
            <span className="text-xs">Map — click to set location</span>
          </div>
          <div className="absolute top-2 left-2 right-2">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs shadow-sm"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400">
          This is the name of the location where the voucher is valid or the issuer resides.
        </p>
      </div>

      <div>
        <FieldLabel>Location Name</FieldLabel>
        <Input
          value={form.locationName}
          onChange={(v) => update("locationName", v)}
          placeholder="Location Name"
        />
      </div>
    </div>
  );
}

function Step3NameAndOffers({
  form,
  update,
}: {
  form: FormData;
  update: (k: keyof FormData, v: unknown) => void;
}) {
  const addProduct = () => {
    const newProduct: ProductOffering = {
      id: Date.now().toString(),
      name: "",
      description: "",
      quantity: "1",
      frequency: "Monthly",
    };
    update("products", [...form.products, newProduct]);
  };

  const removeProduct = (id: string) => {
    update(
      "products",
      form.products.filter((p) => p.id !== id)
    );
  };

  const updateProduct = (id: string, field: keyof ProductOffering, value: string) => {
    update(
      "products",
      form.products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const hasProducts = form.products.some((p) => p.name.trim() !== "");

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>🃏</span>
        <span>Name and Offers</span>
      </div>

      <InfoBox color="blue">
        <strong>More Information:</strong> Your voucher name and symbol identify your commitment in
        the network. Offers describe what people can redeem your voucher for.
      </InfoBox>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel hint="Name used for the Voucher">Voucher Name</FieldLabel>
          <Input
            value={form.voucherName}
            onChange={(v) => update("voucherName", v)}
            placeholder="e.g. Amina's Farm"
          />
        </div>
        <div>
          <FieldLabel hint="How your CAV will appear in digital wallets">Symbol</FieldLabel>
          <Input
            value={form.symbol}
            onChange={(v) => update("symbol", v.toUpperCase())}
            placeholder="e.g. AMINA"
            className="uppercase"
          />
        </div>
      </div>

      <div>
        <FieldLabel>Voucher Description</FieldLabel>
        <Textarea
          value={form.description}
          onChange={(v) => update("description", v)}
          placeholder="Tell people about what this voucher represents"
        />
      </div>

      {/* Products section */}
      {!hasProducts && (
        <InfoBox color="orange">
          <strong>Add Product Offers</strong>
          <br />
          Adding at least 1 product offering or achievement is required
        </InfoBox>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 text-sm">Product(s):</h3>
          <button
            onClick={addProduct}
            className="flex items-center gap-1.5 text-xs font-medium text-green-700 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-50"
          >
            <Plus size={14} />
            Add Product Offering or Achievement
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {form.products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl p-4 relative bg-white"
            >
              <button
                onClick={() => removeProduct(product.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>

              <div className="space-y-3">
                <div>
                  <FieldLabel>Product Offering Name</FieldLabel>
                  <Input
                    value={product.name}
                    onChange={(v) => updateProduct(product.id, "name", v)}
                    placeholder="e.g. 1 hour carpentry"
                  />
                  <p className="text-xs text-gray-400 mt-1">What does our Voucher represent?</p>
                </div>

                <div>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    value={product.description}
                    onChange={(v) => updateProduct(product.id, "description", v)}
                    placeholder="e.g. Education on public awareness"
                  />
                  <p className="text-xs text-gray-400 mt-1">What should we know about it?</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Quantity available</FieldLabel>
                    <Input
                      value={product.quantity}
                      onChange={(v) => updateProduct(product.id, "quantity", v)}
                      type="number"
                    />
                    <p className="text-xs text-gray-400 mt-1">How much is available?</p>
                  </div>
                  <div>
                    <FieldLabel>Frequency</FieldLabel>
                    <Select
                      value={product.frequency}
                      onChange={(v) => updateProduct(product.id, "frequency", v)}
                      options={["Daily", "Weekly", "Monthly", "Yearly", "One-time"]}
                    />
                    <p className="text-xs text-gray-400 mt-1">How often is it available?</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4ValueAndSupply({
  form,
  update,
}: {
  form: FormData;
  update: (k: keyof FormData, v: unknown) => void;
}) {
  const total =
    form.valuePerUnit && form.supply
      ? (parseFloat(form.valuePerUnit) * parseFloat(form.supply)).toFixed(2)
      : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>⭕</span>
        <span>Value and Supply</span>
      </div>

      <InfoBox color="blue">
        <strong>More Information:</strong> Define how much your voucher is worth in a reference
        currency and how many you want to create initially.
      </InfoBox>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel hint="How do you measure the value of your voucher?">
            Unit of Account
          </FieldLabel>
          <Select
            value={form.unitOfAccount}
            onChange={(v) => update("unitOfAccount", v)}
            options={["USD", "KES", "EUR", "GBP"]}
          />
        </div>
        <div>
          <FieldLabel hint={`e.g. 1 CAV is redeemable for 3 ${form.unitOfAccount} of products`}>
            Value per unit
          </FieldLabel>
          <Input
            value={form.valuePerUnit}
            onChange={(v) => update("valuePerUnit", v)}
            type="number"
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <div>
        <FieldLabel hint="The number of vouchers that will be created in your account.">
          Supply
        </FieldLabel>
        <Input
          value={form.supply}
          onChange={(v) => update("supply", v)}
          type="number"
          placeholder="e.g. 100"
        />
      </div>

      {total && (
        <InfoBox color="orange">
          <strong>Total Value of your CAVs</strong>
          <br />
          You are going to create {form.supply} {form.symbol || "CAV"} — valued at {total}{" "}
          {form.unitOfAccount}
        </InfoBox>
      )}
    </div>
  );
}

function Step5Expiration({
  form,
  update,
}: {
  form: FormData;
  update: (k: keyof FormData, v: unknown) => void;
}) {
  const types = [
    {
      id: "standard",
      label: "Standard Voucher",
      badge: "Standard",
      badgeColor: "bg-[#3d2b1f] text-white",
      desc: "Fixed or flexible supply with minting/burning capabilities",
      features: ["Vouchers circulate forever", "Fixed or flexible supply", "Minting/burning capabilities"],
      perfectFor: "Loyalty points, stable vouchers",
    },
    {
      id: "expiring",
      label: "Expiring Voucher (Time Limited)",
      badge: "Time Limited",
      badgeColor: "bg-red-500 text-white",
      desc: "Transfer of vouchers stops working after a specific date",
      features: [
        "All features of Standard Voucher",
        "Hard expiration date (vouchers become non-transferable)",
      ],
      perfectFor: "Promotional vouchers, time-limited campaigns",
    },
    {
      id: "demurrage",
      label: "Gradually Expiring Vouchers",
      badge: "Decaying",
      badgeColor: "bg-orange-500 text-white",
      desc: "A voucher that continuously expires over time, with the lost vouchers going to a community fund",
      features: [
        "Vouchers gradually expire at a set rate",
        "Expired Vouchers are redistributed to a community fund after a period",
        "Encourages spending instead of holding",
      ],
      perfectFor: "Local currencies, community vouchers, circulation incentives",
    },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>⏱</span>
        <span>Expiration</span>
      </div>

      <h3 className="font-semibold text-gray-900">Choose Your Voucher Type</h3>

      {types.map((t) => (
        <div
          key={t.id}
          onClick={() => update("voucherType", t.id)}
          className={`border rounded-xl p-4 cursor-pointer transition-all ${
            form.voucherType === t.id
              ? "border-blue-400 ring-2 ring-blue-200 bg-white"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input
                type="radio"
                name="voucherType"
                checked={form.voucherType === t.id}
                onChange={() => update("voucherType", t.id)}
                className="accent-blue-600 mt-0.5 flex-shrink-0"
                readOnly
              />
              <div>
                <div className="font-semibold text-sm text-gray-900">{t.label}</div>
                <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${t.badgeColor}`}>
              {t.badge}
            </span>
          </div>

          {form.voucherType === t.id && (
            <div className="mt-3 ml-6 space-y-1.5">
              <p className="text-xs font-semibold text-gray-700">Features:</p>
              <ul className="space-y-0.5">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="text-green-500 mt-0.5">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-gray-700 mt-2">Perfect for:</p>
              <p className="text-xs text-blue-600">{t.perfectFor}</p>

              {/* Extra fields for expiring */}
              {t.id === "expiring" && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <FieldLabel>Expiry Date</FieldLabel>
                  <Input
                    value={form.expiryDate}
                    onChange={(v) => update("expiryDate", v)}
                    type="date"
                  />
                </div>
              )}

              {/* Extra fields for demurrage */}
              {t.id === "demurrage" && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm">Demurrage Settings</h4>
                  <p className="text-xs text-gray-500">
                    Configure how your vouchers will decay over time and where the decayed value goes
                  </p>
                  <div>
                    <FieldLabel hint="How much value decays per redistribution period">
                      Decay Rate (%)
                    </FieldLabel>
                    <Input
                      value={form.decayRate}
                      onChange={(v) => update("decayRate", v)}
                      placeholder="e.g., 2"
                    />
                  </div>
                  <div>
                    <FieldLabel hint="How often decayed value moves to the community fund">
                      Redistribution Period
                    </FieldLabel>
                    <Select
                      value={form.redistributionPeriod}
                      onChange={(v) => update("redistributionPeriod", v)}
                      options={["", "Monthly", "Quarterly", "Yearly"]}
                    />
                  </div>
                  <div>
                    <FieldLabel hint="Where the decayed value goes for redistribution">
                      Community Fund Address
                    </FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        value={form.communityFundAddress}
                        onChange={(v) => update("communityFundAddress", v)}
                        placeholder="0x..."
                      />
                      <button className="px-3 py-2 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                        Use My Address
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Step6SigningAndPublishing({
  form,
  update,
}: {
  form: FormData;
  update: (k: keyof FormData, v: unknown) => void;
}) {
  const today = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const total =
    form.valuePerUnit && form.supply
      ? (parseFloat(form.valuePerUnit) * parseFloat(form.supply)).toFixed(2)
      : "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>⬆️</span>
        <span>Signing And Publishing</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
        <h2 className="text-lg font-bold text-gray-900">Community Asset Voucher (CAV) Declaration</h2>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Preamble</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            I, <strong>{form.name || "issuer"}</strong>, hereby agree to publish a Community Asset
            Voucher on the Celo ledger and do not hold Grassroots Economics Foundation liable for
            any damages and understand there is no warranty included or implied.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">CAV Info</h3>
          <div className="text-sm space-y-1.5">
            {[
              ["Name:", form.voucherName || "—"],
              ["Description:", form.description || "—"],
              ["Symbol:", form.symbol || "—"],
              ["Supply:", form.supply || "—"],
              ["Unit of Account:", form.unitOfAccount],
              [
                "Value:",
                form.valuePerUnit
                  ? `1 ${form.symbol || "CAV"} is worth ${form.valuePerUnit} ${form.unitOfAccount} of Goods and Services`
                  : "—",
              ],
              ["Contact Email:", form.email || "—"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-500 flex-shrink-0">{label}</span>
                <span className="text-gray-900 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {total !== "—" && (
          <InfoBox color="orange">
            <strong>Total Value of Vouchers</strong>
            <br />
            You will be creating an initial amount of {form.supply} {form.symbol || "CAV"} — valued
            at {total} {form.unitOfAccount}. This will represent the following offerings:
          </InfoBox>
        )}

        {form.products.filter((p) => p.name).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Product Offering and Value:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              {form.products
                .filter((p) => p.name)
                .map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      {p.quantity} {p.name} will be available every {p.frequency.toLowerCase()} using{" "}
                      {form.symbol || "CAV"}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Addendum</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Good Faith: You as the User of this CAV and any holders of this CAV as per this
            agreement in good faith hold harmless Grassroots Economics Foundation. This agreement
            represents your consent (and/or that of the association your are duly representing).
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Official Signatories</h3>
          <div className="text-sm space-y-1 text-gray-600">
            <div>Title: {form.issuerType === "personal" ? "Individual" : "Organization"}</div>
            <div>Full Name: {form.name || "—"}</div>
            <div>Contact Address: {form.email || "—"}</div>
            <div>Website: {form.website || "—"}</div>
            <div>On behalf of: {form.name || "—"}</div>
            <div>Date of Signing: {today}</div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => update("acceptTerms", e.target.checked)}
            className="accent-green-600 mt-0.5 w-4 h-4 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
              <span className="text-green-600">✓</span> Accept Terms and Conditions
            </div>
            <div className="text-xs text-gray-500">
              You agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.acceptPath}
            onChange={(e) => update("acceptPath", e.target.checked)}
            className="accent-green-600 mt-0.5 w-4 h-4 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
              <span className="text-green-600">✓</span> Accept Public Awareness & Transparent
              Heritage (PATH) License
            </div>
            <div className="text-xs text-gray-500">
              You allow your voucher to be traded and exchanged.
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VoucherCreatePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [published, setPublished] = useState(false);

  const update = (key: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canPublish = form.acceptTerms && form.acceptPath;

  if (published) {
    return (
      <AppLayout>
        <div className="p-8 max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Voucher Published!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your Community Asset Voucher <strong>{form.symbol}</strong> has been created and is
              live on the Celo ledger.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/vouchers"
                className="px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800"
              >
                View My Vouchers
              </Link>
              <button
                onClick={() => {
                  setPublished(false);
                  setStep(0);
                  setForm(INITIAL_FORM);
                }}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-8 max-w-2xl">
        <WizardHeader title="Create your own Voucher" />

        {/* Step indicator label */}
        <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500">
          <span className="font-medium">{STEPS[step]}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <StepProgress steps={STEPS} currentStep={step} />
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 min-h-[400px]">
          {step === 0 && <Step1Introduction />}
          {step === 1 && <Step2AboutYou form={form} update={update} />}
          {step === 2 && <Step3NameAndOffers form={form} update={update} />}
          {step === 3 && <Step4ValueAndSupply form={form} update={update} />}
          {step === 4 && <Step5Expiration form={form} update={update} />}
          {step === 5 && <Step6SigningAndPublishing form={form} update={update} />}

          <WizardNav
            onPrev={() => setStep((s) => Math.max(0, s - 1))}
            onNext={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            isFirst={step === 0}
            isLast={step === STEPS.length - 1}
            lastLabel="Publish"
            onSubmit={() => setPublished(true)}
            disabled={step === STEPS.length - 1 && !canPublish}
          />
        </div>
      </div>
    </AppLayout>
  );
}
