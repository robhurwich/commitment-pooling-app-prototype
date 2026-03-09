"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StepProgress } from "@/components/ui/StepProgress";
import { WizardNav } from "@/components/ui/WizardNav";
import {
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  Share2,
  Store,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OfferFormData {
  // Step 1 — Offer basics
  offerName: string;
  offerDescription: string;
  category: string;
  // Step 2 — Pricing
  price: string;
  unit: string;
  quantity: string;
  frequency: string;
  // Advanced offer options
  currency: string;
  // Step 3 — Voucher (auto-filled, minimal)
  voucherName: string;
  voucherAbout: string;
  voucherValue: string;
  // Advanced voucher options
  symbol: string;
  location: string;
  contact: string;
}

const STEPS = ["Create Your Offer", "Price Your Offer", "Your Voucher", "Confirm & Publish"];

const CATEGORIES = [
  "Food & Agriculture",
  "Crafts & Artisan",
  "Services & Labour",
  "Education & Training",
  "Health & Wellness",
  "Transport & Logistics",
  "Technology",
  "Other",
];

const FREQUENCIES = ["per day", "per week", "per month", "per year", "one-time"];
const UNITS = ["unit", "hour", "kg", "litre", "item", "session", "batch"];

const INITIAL: OfferFormData = {
  offerName: "",
  offerDescription: "",
  category: "",
  price: "",
  unit: "unit",
  quantity: "",
  frequency: "per month",
  currency: "KES",
  voucherName: "",
  voucherAbout: "",
  voucherValue: "",
  symbol: "",
  location: "",
  contact: "",
};

// ─── Shared primitives (local to this file) ───────────────────────────────────

function FieldLabel({
  children,
  hint,
  optional,
}: {
  children: React.ReactNode;
  hint?: string;
  optional?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {optional && <span className="text-xs font-normal text-gray-400 ml-1">(optional)</span>}
      {hint && <div className="text-xs font-normal text-gray-400 mt-0.5">{hint}</div>}
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
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SummaryCard({
  offer,
  price,
  unit,
  quantity,
  frequency,
  currency,
  label = "Your Offer:",
}: {
  offer: string;
  price: string;
  unit: string;
  quantity: string;
  frequency: string;
  currency: string;
  label?: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm space-y-1">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
      {offer && <div className="font-medium text-gray-900">{offer}</div>}
      {price && (
        <div className="text-gray-600">
          {price} {currency} per {unit}
        </div>
      )}
      {quantity && frequency && (
        <div className="text-gray-500 text-xs">
          Roughly {quantity} {unit}(s) available {frequency}
        </div>
      )}
    </div>
  );
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg p-2.5 mt-1">
      <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function AdvancedAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 bg-white"
      >
        <span className="flex items-center gap-2">
          <span>⚙️</span>
          {label}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-4 pb-4 pt-2 bg-white space-y-4 border-t border-gray-100">{children}</div>}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1CreateOffer({
  form,
  update,
}: {
  form: OfferFormData;
  update: (k: keyof OfferFormData, v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Create Your Offer</h2>
        <p className="text-sm text-gray-500 mt-1">
          Start by describing what you offer. This becomes your first listing on the network.
        </p>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg p-3">
        Think of this like listing an item in a marketplace — except instead of cash, people can
        pay you with their own vouchers (gift cards) or top up with local currency.
      </p>

      <div>
        <FieldLabel hint="Give your offer a clear, specific name">Offer Name</FieldLabel>
        <Input
          value={form.offerName}
          onChange={(v) => update("offerName", v)}
          placeholder="e.g. Organic Butternut Squash, 1 Hour Carpentry, Maths Tutoring..."
        />
        <p className="text-xs text-gray-400 mt-1">Be specific — this is what buyers will see.</p>
      </div>

      <div>
        <FieldLabel optional>Description</FieldLabel>
        <Textarea
          value={form.offerDescription}
          onChange={(v) => update("offerDescription", v)}
          placeholder="Tell people more about your offer — quality, sourcing, what's included..."
        />
      </div>

      <div>
        <FieldLabel>Category</FieldLabel>
        <Select
          value={form.category}
          onChange={(v) => update("category", v)}
          options={CATEGORIES}
          placeholder="Select a category..."
        />
      </div>

      <div>
        <FieldLabel optional>Offer Photo</FieldLabel>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 bg-gray-50 cursor-pointer hover:border-gray-300 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Plus size={16} className="text-gray-500" />
          </div>
          <span className="text-xs text-gray-500 font-medium">Add Photo</span>
          <span className="text-xs text-gray-400">Helps buyers find and trust your offer</span>
        </div>
      </div>

      <Tooltip>
        Not sure what to offer? You can add more offers later from your shop. Start with just one
        thing you&apos;re confident in providing.
      </Tooltip>

      <div className="pt-2">
        <button className="text-xs text-blue-600 underline hover:no-underline">
          View examples of offers →
        </button>
      </div>
    </div>
  );
}

function Step2PriceOffer({
  form,
  update,
}: {
  form: OfferFormData;
  update: (k: keyof OfferFormData, v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Price Your Offer</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set the price and availability of your offer. This is how buyers will understand your
          voucher&apos;s value.
        </p>
      </div>

      <Tooltip>
        Set a fair market price in local currency. Buyers can pay with vouchers (gift cards) from
        other shops, or top up with cash. You don&apos;t need to set everything perfectly — you can update
        this later.
      </Tooltip>

      {/* Price row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Price</FieldLabel>
          <Input
            value={form.price}
            onChange={(v) => update("price", v)}
            type="number"
            placeholder="e.g. 200"
          />
          <p className="text-xs text-gray-400 mt-1">Price in {form.currency}</p>
        </div>
        <div>
          <FieldLabel>Per (unit of measure)</FieldLabel>
          <Select
            value={form.unit}
            onChange={(v) => update("unit", v)}
            options={UNITS}
          />
          <p className="text-xs text-gray-400 mt-1">
            e.g. per kg, per hour, per item
          </p>
        </div>
      </div>

      {/* Quantity + Frequency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel hint="How much can you supply?">Quantity available</FieldLabel>
          <Input
            value={form.quantity}
            onChange={(v) => update("quantity", v)}
            type="number"
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <FieldLabel>Frequency</FieldLabel>
          <Select
            value={form.frequency}
            onChange={(v) => update("frequency", v)}
            options={FREQUENCIES}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400">
        e.g. &ldquo;10 kg available per week&rdquo; — buyers will see this as your supply cadence.
      </p>

      {/* Live summary */}
      {(form.offerName || form.price) && (
        <SummaryCard
          offer={form.offerName}
          price={form.price}
          unit={form.unit}
          quantity={form.quantity}
          frequency={form.frequency}
          currency={form.currency}
        />
      )}

      {/* Advanced options */}
      <AdvancedAccordion label="Advanced options">
        <div>
          <FieldLabel hint="Default: KES. Change if you price in a different currency.">
            Currency
          </FieldLabel>
          <Select
            value={form.currency}
            onChange={(v) => update("currency", v)}
            options={["KES", "USD", "EUR", "GBP"]}
          />
        </div>
        <div>
          <FieldLabel optional hint="Override the auto-generated voucher symbol (e.g. AMINA)">
            Voucher Symbol
          </FieldLabel>
          <Input
            value={form.symbol}
            onChange={(v) => update("symbol", v.toUpperCase())}
            placeholder="e.g. AMINA"
            className="uppercase"
          />
          <p className="text-xs text-gray-400 mt-1">
            Auto-generated from your name if left blank. Max 6 chars.
          </p>
        </div>
        <div>
          <FieldLabel optional>Total Supply (number of vouchers to mint)</FieldLabel>
          <Input
            value=""
            onChange={() => {}}
            placeholder="Default: unlimited (flexible supply)"
          />
        </div>
      </AdvancedAccordion>
    </div>
  );
}

function Step3Voucher({
  form,
  update,
}: {
  form: OfferFormData;
  update: (k: keyof OfferFormData, v: string) => void;
}) {
  // Auto-suggest voucher name from offer
  const suggestedName = form.offerName
    ? `${form.offerName.split(" ").slice(0, 2).join(" ")} Voucher`
    : "My Voucher";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Voucher (Gift Card)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Your offer gets packaged into a voucher — a gift card people can buy, trade, and redeem.
          We&apos;ve pre-filled the details based on your offer.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 space-y-1">
        <div className="font-semibold">What&apos;s a voucher?</div>
        <p>
          Think of it like a gift card for your shop. When someone buys your voucher, they&apos;re
          pre-purchasing the right to redeem your offers. You fulfill the order when they show up.
          Their payment — even if it&apos;s another shop&apos;s voucher — gets converted automatically.
        </p>
      </div>

      {/* Offer summary */}
      <SummaryCard
        label="Your Offer:"
        offer={form.offerName || suggestedName}
        price={form.price}
        unit={form.unit}
        quantity={form.quantity}
        frequency={form.frequency}
        currency={form.currency}
      />

      <div>
        <FieldLabel hint="This is the name of your shop / gift card. We've suggested one below.">
          Voucher (Gift Card) Name
        </FieldLabel>
        <Input
          value={form.voucherName || suggestedName}
          onChange={(v) => update("voucherName", v)}
          placeholder={suggestedName}
        />
        <p className="text-xs text-gray-400 mt-1">
          Default: &ldquo;{suggestedName}&rdquo; — feel free to change to your business name.
        </p>
      </div>

      <div>
        <FieldLabel optional>About your shop (shown on your voucher page)</FieldLabel>
        <Textarea
          value={form.voucherAbout}
          onChange={(v) => update("voucherAbout", v)}
          placeholder="A short description of your business or what you stand for..."
          rows={2}
        />
      </div>

      {/* Value display */}
      <div>
        <FieldLabel hint="How much is 1 of your vouchers worth in local currency?">
          Voucher Value
        </FieldLabel>
        <div className="flex items-center gap-3">
          <div className="w-24">
            <Input
              value={form.voucherValue || form.price}
              onChange={(v) => update("voucherValue", v)}
              type="number"
              placeholder={form.price || "200"}
            />
          </div>
          <span className="text-sm text-gray-500">
            {form.currency} worth of goods &amp; services
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Default: same as your offer price ({form.price || "—"} {form.currency}).
        </p>
      </div>

      {/* Advanced voucher options */}
      <AdvancedAccordion label="Advanced voucher settings">
        <div>
          <FieldLabel optional hint="Defaults to the currency you chose on the previous step.">
            Unit of Account
          </FieldLabel>
          <Select
            value={form.currency}
            onChange={(v) => update("currency", v)}
            options={["KES", "USD", "EUR"]}
          />
        </div>
        <div>
          <FieldLabel optional>Voucher Symbol</FieldLabel>
          <Input
            value={form.symbol}
            onChange={(v) => update("symbol", v.toUpperCase())}
            placeholder="e.g. AMINA"
            className="uppercase"
          />
          <p className="text-xs text-gray-400 mt-1">
            Short ticker symbol. Auto-generated if left blank.
          </p>
        </div>
        <div>
          <FieldLabel optional>Location</FieldLabel>
          <Input
            value={form.location}
            onChange={(v) => update("location", v)}
            placeholder="City, Country — or leave blank for remote/global"
          />
        </div>
        <div>
          <FieldLabel optional>Contact Email</FieldLabel>
          <Input
            value={form.contact}
            onChange={(v) => update("contact", v)}
            placeholder="email@example.com"
            type="email"
          />
        </div>
        <div>
          <FieldLabel optional hint="Standard = circulates forever. Expiring or Decaying types available.">
            Voucher Type
          </FieldLabel>
          <Select
            value="standard"
            onChange={() => {}}
            options={["Standard (circulates forever)", "Expiring (time-limited)", "Gradually Expiring (demurrage)"]}
          />
          <p className="text-xs text-gray-400 mt-1">
            Most users should leave this as Standard.
          </p>
        </div>
      </AdvancedAccordion>
    </div>
  );
}

function Step4Confirm({
  form,
  onPublish,
}: {
  form: OfferFormData;
  onPublish: () => void;
}) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPath, setAcceptPath] = useState(false);
  const canPublish = acceptTerms && acceptPath;

  const voucherName =
    form.voucherName ||
    (form.offerName
      ? `${form.offerName.split(" ").slice(0, 2).join(" ")} Voucher`
      : "My Voucher");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Confirm &amp; Publish</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review your offer and voucher, then publish to the network.
        </p>
      </div>

      {/* Full summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 text-sm">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Your Shop (Voucher)
          </div>
          <div className="font-semibold text-gray-900">{voucherName}</div>
          {form.voucherAbout && (
            <div className="text-gray-500 text-xs mt-0.5">{form.voucherAbout}</div>
          )}
          {form.symbol && (
            <div className="text-gray-400 text-xs mt-0.5">Symbol: {form.symbol}</div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Accepts:
          </div>
          <div className="text-gray-700">KES</div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Your First Offer:
          </div>
          <div className="font-medium text-gray-900">{form.offerName || "—"}</div>
          {form.price && (
            <div className="text-gray-600">
              {form.price} {form.currency} per {form.unit}
            </div>
          )}
          {form.quantity && form.frequency && (
            <div className="text-gray-400 text-xs">
              ~{form.quantity} {form.unit}(s) {form.frequency}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
            <Plus size={12} />
            Add another offer →
          </button>
        </div>
      </div>

      {/* Declaration note */}
      <div className="text-xs text-gray-500 leading-relaxed">
        By publishing, you confirm that you can fulfill the offers listed above and you agree to
        hold harmless Grassroots Economics Foundation for any disputes or damages.
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="accent-green-600 mt-0.5 w-4 h-4 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-medium text-gray-800">Accept Terms and Conditions</div>
            <div className="text-xs text-gray-500">
              You agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptPath}
            onChange={(e) => setAcceptPath(e.target.checked)}
            className="accent-green-600 mt-0.5 w-4 h-4 flex-shrink-0"
          />
          <div>
            <div className="text-sm font-medium text-gray-800">Accept PATH License</div>
            <div className="text-xs text-gray-500">
              You allow your voucher to be traded and exchanged on the network.
            </div>
          </div>
        </label>
      </div>

      <button
        onClick={onPublish}
        disabled={!canPublish}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
          canPublish
            ? "bg-green-700 text-white hover:bg-green-800"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Create My Voucher! 🎉
      </button>
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ form }: { form: OfferFormData }) {
  const voucherName =
    form.voucherName ||
    (form.offerName
      ? `${form.offerName.split(" ").slice(0, 2).join(" ")} Voucher`
      : "My Voucher");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl mb-2">🎉</div>
        <h2 className="text-xl font-bold text-gray-900">Your voucher is live!</h2>
        <p className="text-sm text-gray-500 mt-1">Here&apos;s what just happened:</p>
      </div>

      {/* What was created */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm space-y-3">
        <div>
          <div className="font-semibold text-gray-900">{voucherName}</div>
          <div className="text-xs text-gray-500">Your Voucher &amp; Home Pool (Marketplace)</div>
        </div>
        <div className="text-xs text-gray-500">Accepts: KES</div>
        <div className="border-t border-gray-200 pt-3">
          <div className="text-xs text-gray-500 mb-1">Your Offer:</div>
          <div className="font-medium text-gray-800">{form.offerName}</div>
          {form.price && (
            <div className="text-gray-500">
              {form.price} {form.currency} per {form.unit}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          ✅ Your <strong>offer</strong> is listed on the marketplace.
          <br />
          ✅ Your <strong>voucher</strong> (gift card) is published on the network.
          <br />
          ✅ Your <strong>pool</strong> was automatically created and is ready to accept payments.
        </p>
      </div>

      <div className="text-xs text-gray-500">
        <Info size={12} className="inline mr-1 text-blue-500" />
        People can now buy your voucher and redeem it for your offers.
      </div>

      {/* Next steps */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">What do you want to do next?</h3>
        <div className="space-y-2">
          <button className="w-full flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 text-left transition-colors">
            <Share2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">Share Your Shop</div>
              <div className="text-xs text-gray-400">
                Get the word out! Share a link to your voucher so people can buy and redeem your
                offers.
              </div>
            </div>
            <ArrowRight size={14} className="text-gray-300 mt-1" />
          </button>

          <button className="w-full flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 text-left transition-colors">
            <Store size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                Accept other&apos;s shop credits in your shop
              </div>
              <div className="text-xs text-gray-400">
                See what others are offering nearby and start trading vouchers.
              </div>
            </div>
            <ArrowRight size={14} className="text-gray-300 mt-1" />
          </button>

          <Link
            href="/wallet"
            className="w-full flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 text-left transition-colors"
          >
            <BookOpen size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">Go to your shop</div>
              <div className="text-xs text-gray-400">
                Understand how pools and credit work, and customize your setup.
              </div>
            </div>
            <ArrowRight size={14} className="text-gray-300 mt-1" />
          </Link>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 underline">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function OffersCreatePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OfferFormData>(INITIAL);
  const [published, setPublished] = useState(false);

  const update = (key: keyof OfferFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (published) {
    return (
      <AppLayout>
        <div className="p-8 max-w-xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <SuccessScreen form={form} />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-8 max-w-xl">
        {/* Header */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full mb-4">
            ✨ New flow
          </div>
          <h1 className="text-xl font-bold text-gray-900">Create Your Offer &amp; Shop</h1>
          <p className="text-xs text-gray-400 mt-1">Offer-first • {STEPS.length} steps</p>
        </div>

        {/* Step label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <StepProgress steps={STEPS} currentStep={step} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 min-h-[400px]">
          {step === 0 && <Step1CreateOffer form={form} update={update} />}
          {step === 1 && <Step2PriceOffer form={form} update={update} />}
          {step === 2 && <Step3Voucher form={form} update={update} />}
          {step === 3 && <Step4Confirm form={form} onPublish={() => setPublished(true)} />}

          {step < 3 && (
            <WizardNav
              onPrev={() => setStep((s) => Math.max(0, s - 1))}
              onNext={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              isFirst={step === 0}
              isLast={false}
            />
          )}
          {step === 3 && (
            <div className="pt-4">
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
