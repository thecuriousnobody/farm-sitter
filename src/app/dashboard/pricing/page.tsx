"use client";

import { useState } from "react";
import { DEFAULT_PRICING, formatDollars, type PricingConfig } from "@/lib/pricing";

type BaseOverrides = {
  tier1Base: number;
  tier2Base: number;
  tier3Base: number;
  tier4Base: number;
  dogsBase: number;
  plantsBase: number;
};

const TIERS: { key: keyof BaseOverrides; label: string; animals: string; defaultKey: keyof PricingConfig }[] = [
  {
    key: "tier1Base",
    label: "Tier 1 — Small & Companion",
    animals: "Cats, chickens, ducks, fish, caged pets, rabbits, lizards",
    defaultKey: "tier1Base",
  },
  {
    key: "tier2Base",
    label: "Tier 2 — Herd & Flock",
    animals: "Goats, sheep, llamas, alpacas, turkeys, exotic birds",
    defaultKey: "tier2Base",
  },
  {
    key: "tier3Base",
    label: "Tier 3 — Stalled & Equine",
    animals: "Horses, donkeys, mini horses, stalled livestock",
    defaultKey: "tier3Base",
  },
  {
    key: "tier4Base",
    label: "Tier 4 — Specialized Care",
    animals: "Milking, medication, rehab, exotic animals",
    defaultKey: "tier4Base",
  },
  {
    key: "dogsBase",
    label: "Dogs Only",
    animals: "Standalone dog care visits",
    defaultKey: "dogsBase",
  },
  {
    key: "plantsBase",
    label: "Plants & Garden",
    animals: "Standalone plant/garden care visits",
    defaultKey: "plantsBase",
  },
];

function centsToDisplay(cents: number): string {
  return (cents / 100).toFixed(2);
}

function displayToCents(value: string): number {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return 0;
  return Math.round(num * 100);
}

export default function PricingSettingsPage() {
  const [prices, setPrices] = useState<BaseOverrides>({
    tier1Base: DEFAULT_PRICING.tier1Base,
    tier2Base: DEFAULT_PRICING.tier2Base,
    tier3Base: DEFAULT_PRICING.tier3Base,
    tier4Base: DEFAULT_PRICING.tier4Base,
    dogsBase: DEFAULT_PRICING.dogsBase,
    plantsBase: DEFAULT_PRICING.plantsBase,
  });

  const [displayValues, setDisplayValues] = useState<Record<keyof BaseOverrides, string>>({
    tier1Base: centsToDisplay(DEFAULT_PRICING.tier1Base),
    tier2Base: centsToDisplay(DEFAULT_PRICING.tier2Base),
    tier3Base: centsToDisplay(DEFAULT_PRICING.tier3Base),
    tier4Base: centsToDisplay(DEFAULT_PRICING.tier4Base),
    dogsBase: centsToDisplay(DEFAULT_PRICING.dogsBase),
    plantsBase: centsToDisplay(DEFAULT_PRICING.plantsBase),
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleChange(key: keyof BaseOverrides, raw: string) {
    setDisplayValues((prev) => ({ ...prev, [key]: raw }));
    setPrices((prev) => ({ ...prev, [key]: displayToCents(raw) }));
    setSaved(false);
  }

  function resetToDefaults() {
    const reset: BaseOverrides = {
      tier1Base: DEFAULT_PRICING.tier1Base,
      tier2Base: DEFAULT_PRICING.tier2Base,
      tier3Base: DEFAULT_PRICING.tier3Base,
      tier4Base: DEFAULT_PRICING.tier4Base,
      dogsBase: DEFAULT_PRICING.dogsBase,
      plantsBase: DEFAULT_PRICING.plantsBase,
    };
    setPrices(reset);
    setDisplayValues(
      Object.fromEntries(
        Object.entries(reset).map(([k, v]) => [k, centsToDisplay(v)])
      ) as Record<keyof BaseOverrides, string>
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/operator/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prices),
      });
      if (res.ok) setSaved(true);
    } catch {
      // handle silently for now
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-barn">My Pricing</h1>
        <p className="text-sm text-earth-dark mt-1">
          Set your base visit price for each tier relative to your local market. These rates are
          used by the calculator to estimate job costs. Add-on pricing follows platform guidelines.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-wheat divide-y divide-wheat">
        {TIERS.map(({ key, label, animals, defaultKey }) => {
          const platformDefault = DEFAULT_PRICING[defaultKey] as number;
          const current = prices[key];
          const diff = current - platformDefault;
          const diffLabel =
            diff === 0
              ? null
              : diff > 0
              ? `+${formatDollars(diff)} above standard`
              : `${formatDollars(diff)} below standard`;

          return (
            <div key={key} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-barn">{label}</p>
                <p className="text-xs text-earth-light truncate">{animals}</p>
                {diffLabel && (
                  <p
                    className={`text-xs mt-0.5 ${
                      diff > 0 ? "text-rust" : "text-sage-dark"
                    }`}
                  >
                    {diffLabel}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-earth-dark">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={displayValues[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-24 px-3 py-2 border border-wheat rounded-lg text-sm text-barn-dark text-right focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
                <span className="text-xs text-earth-light w-16">/ visit</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-ons reference (read-only) */}
      <div className="mt-6 bg-cream-dark rounded-xl border border-wheat p-5">
        <h2 className="text-sm font-bold text-barn mb-3">Add-On Pricing Reference</h2>
        <p className="text-xs text-earth-dark mb-3">
          These are platform-standard add-on rates reflected in the calculator. Operators may
          adjust these with clients directly — this is for reference only.
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-earth-dark">
          <div className="flex justify-between">
            <span>Dog care (basic)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.dogBasic)} / dog</span>
          </div>
          <div className="flex justify-between">
            <span>Dog care (additional)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.dogAdditional)} / dog</span>
          </div>
          <div className="flex justify-between">
            <span>Overnight (Tier 1/2)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.overnightT1T2)} / night</span>
          </div>
          <div className="flex justify-between">
            <span>Overnight (Tier 3)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.overnightT3)} / night</span>
          </div>
          <div className="flex justify-between">
            <span>Overnight (Tier 4 / Dogs)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.overnightT4)} / night</span>
          </div>
          <div className="flex justify-between">
            <span>Meet &amp; Greet</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.meetAndGreet)}</span>
          </div>
          <div className="flex justify-between">
            <span>Holiday service</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.holidayPerVisit)} / visit</span>
          </div>
          <div className="flex justify-between">
            <span>Special instructions</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.specialInstructions)} / visit</span>
          </div>
          <div className="flex justify-between">
            <span>Key exchange</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.keyExchange)}</span>
          </div>
          <div className="flex justify-between">
            <span>Entering home (Tier 1/2)</span>
            <span className="font-medium">{formatDollars(DEFAULT_PRICING.homeEntry)} / visit</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={resetToDefaults}
          className="text-sm text-earth-dark hover:text-barn transition-colors underline"
        >
          Reset to platform defaults
        </button>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-sage-dark font-medium">✓ Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save My Pricing"}
          </button>
        </div>
      </div>
    </div>
  );
}
