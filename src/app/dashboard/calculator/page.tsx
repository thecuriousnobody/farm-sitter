"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  DEFAULT_PRICING,
  calculateTrip,
  formatDollars,
  isIncluded,
  type PrimaryService,
  type TripOptions,
} from "@/lib/pricing";

const SERVICE_OPTIONS: { value: PrimaryService; label: string; desc: string }[] = [
  { value: "tier1", label: "Tier 1 — Small & Companion", desc: "Cats, chickens, ducks, fish, caged pets, rabbits, lizards" },
  { value: "tier2", label: "Tier 2 — Herd & Flock", desc: "Goats, sheep, llamas, alpacas, turkeys, exotic birds" },
  { value: "tier3", label: "Tier 3 — Stalled & Equine", desc: "Horses, donkeys, mini horses, stalled livestock" },
  { value: "tier4", label: "Tier 4 — Specialized Care", desc: "Milking, medication, rehab, exotic" },
  { value: "dogs", label: "Dogs Only", desc: "Standalone dog care (other tiers can add dogs as an add-on)" },
];

const DEFAULT_OPTS: TripOptions = {
  primaryService: "tier1",
  dogCount: 0,
  dogServiceLevel: "none",
  hasPlants: false,
  isHoliday: false,
  needsSpecialInstructions: false,
  needsGarbageService: false,
  needsHomeEntry: false,
  visitsPerDay: 1,
  numberOfDays: 1,
  isOvernight: false,
  needsKeyExchange: false,
  needsMeetAndGreet: true,
};

export default function CalculatorPage() {
  const params = useSearchParams();
  const [opts, setOpts] = useState<TripOptions>(DEFAULT_OPTS);
  const [inquiryContext, setInquiryContext] = useState<{ id: string; name: string } | null>(null);

  // Pre-populate from inquiry URL params (set by the Inquiries page)
  useEffect(() => {
    const tier = params.get("tier") as TripOptions["primaryService"] | null;
    const dogs = parseInt(params.get("dogs") ?? "0");
    const days = parseInt(params.get("days") ?? "1");
    const vpd = parseInt(params.get("vpd") ?? "1");
    const inquiryId = params.get("inquiryId");
    const name = params.get("name");

    if (tier) {
      setOpts((prev) => ({
        ...prev,
        primaryService: tier,
        dogCount: dogs > 0 ? dogs : 0,
        dogServiceLevel: dogs > 0 ? "basic" : "none",
        numberOfDays: days || 1,
        visitsPerDay: vpd || 1,
      }));
    }
    if (inquiryId && name) {
      setInquiryContext({ id: inquiryId, name });
    }
  }, [params]);

  function set<K extends keyof TripOptions>(key: K, value: TripOptions[K]) {
    setOpts((prev) => ({ ...prev, [key]: value }));
  }

  // Use system defaults for now — will pull from operator's saved pricing later
  const pricing = DEFAULT_PRICING;
  const estimate = calculateTrip(opts, pricing);
  const svc = opts.primaryService;

  const keyExchangeIncluded = isIncluded("keyExchange", svc);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-barn">Visit Calculator</h1>
        <p className="text-sm text-earth-dark mt-1">
          Estimate the cost of a job based on service tier and visit details. Prices use your
          configured rates — set them in{" "}
          <a href="/dashboard/pricing" className="text-rust underline">
            My Pricing
          </a>
          .
        </p>
        {inquiryContext && (
          <div className="mt-3 inline-flex items-center gap-2 bg-wheat-light/60 border border-wheat rounded-lg px-3 py-1.5 text-sm text-earth-dark">
            <span className="text-earth-light">Inquiry:</span>
            <span className="font-medium text-barn">{inquiryContext.name}</span>
            <a
              href="/dashboard/inquiries"
              className="text-xs text-rust hover:underline ml-1"
            >
              ← Back to inquiries
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Inputs ── */}
        <div className="space-y-5">
          {/* Primary service */}
          <div className="bg-white rounded-xl border border-wheat p-5">
            <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-3">
              Primary Service
            </h2>
            <div className="space-y-2">
              {SERVICE_OPTIONS.map(({ value, label, desc }) => (
                <label
                  key={value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    opts.primaryService === value
                      ? "border-rust bg-rust/5"
                      : "border-wheat hover:bg-cream-dark"
                  }`}
                >
                  <input
                    type="radio"
                    name="primaryService"
                    value={value}
                    checked={opts.primaryService === value}
                    onChange={() => set("primaryService", value)}
                    className="mt-0.5 accent-rust"
                  />
                  <div>
                    <div className="text-sm font-semibold text-barn">{label}</div>
                    <div className="text-xs text-earth-dark mt-0.5">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dogs add-on (only shown when primary is not dogs) */}
          {svc !== "dogs" && (
            <div className="bg-white rounded-xl border border-wheat p-5">
              <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-3">
                Dog Care Add-On
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <label className="flex items-center gap-2 text-sm text-earth-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={opts.dogCount > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        set("dogCount", 1);
                        set("dogServiceLevel", "basic");
                      } else {
                        set("dogCount", 0);
                        set("dogServiceLevel", "none");
                      }
                    }}
                    className="accent-barn"
                  />
                  Include dog care
                </label>
              </div>
              {opts.dogCount > 0 && (
                <div className="space-y-3 pl-1">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-barn w-20">Dogs:</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={opts.dogCount}
                      onChange={(e) => set("dogCount", parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-1.5 border border-wheat rounded-lg text-sm text-barn-dark focus:outline-none focus:border-earth"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-barn w-20">Service:</label>
                    <div className="flex gap-3">
                      {(["basic", "additional"] as const).map((level) => (
                        <label key={level} className="flex items-center gap-1.5 text-sm text-earth-dark cursor-pointer capitalize">
                          <input
                            type="radio"
                            name="dogServiceLevel"
                            value={level}
                            checked={opts.dogServiceLevel === level}
                            onChange={() => set("dogServiceLevel", level)}
                            className="accent-barn"
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add-ons */}
          <div className="bg-white rounded-xl border border-wheat p-5">
            <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-3">
              Add-Ons & Services
            </h2>
            <div className="space-y-2">
              {[
                { key: "hasPlants", label: "Plants & Garden Care", addonKey: "plants" },
                { key: "isHoliday", label: "Holiday Service", addonKey: "holiday" },
                { key: "needsSpecialInstructions", label: "Special Instructions", addonKey: "none" },
                { key: "needsGarbageService", label: "Garbage Services", addonKey: "garbage" },
                { key: "needsHomeEntry", label: "Entering Home", addonKey: "homeEntry" },
              ].map(({ key, label, addonKey }) => {
                const included = addonKey !== "none" && isIncluded(addonKey, svc);
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between gap-3 py-1.5 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm text-earth-dark">
                      <input
                        type="checkbox"
                        checked={opts[key as keyof TripOptions] as boolean}
                        onChange={(e) =>
                          set(key as keyof TripOptions, e.target.checked as never)
                        }
                        className="accent-barn"
                      />
                      {label}
                    </span>
                    {included && (
                      <span className="text-xs text-sage-dark bg-sage-light/30 px-2 py-0.5 rounded-full">
                        Included
                      </span>
                    )}
                  </label>
                );
              })}
              <label className="flex items-center justify-between gap-3 py-1.5 cursor-pointer">
                <span className="flex items-center gap-2 text-sm text-earth-dark">
                  <input
                    type="checkbox"
                    checked={opts.needsKeyExchange}
                    onChange={(e) => set("needsKeyExchange", e.target.checked)}
                    className="accent-barn"
                  />
                  Key Exchange (one-time)
                </span>
                {keyExchangeIncluded && (
                  <span className="text-xs text-sage-dark bg-sage-light/30 px-2 py-0.5 rounded-full">
                    Included
                  </span>
                )}
              </label>
              <label className="flex items-center gap-2 py-1.5 cursor-pointer text-sm text-earth-dark">
                <input
                  type="checkbox"
                  checked={opts.needsMeetAndGreet}
                  onChange={(e) => set("needsMeetAndGreet", e.target.checked)}
                  className="accent-barn"
                />
                Meet &amp; Greet (one-time, recommended)
              </label>
              <label className="flex items-center gap-2 py-1.5 cursor-pointer text-sm text-earth-dark">
                <input
                  type="checkbox"
                  checked={opts.isOvernight}
                  onChange={(e) => set("isOvernight", e.target.checked)}
                  className="accent-barn"
                />
                Overnight Care (per night)
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl border border-wheat p-5">
            <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-3">
              Visit Schedule
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-barn mb-1">
                  Visits per day
                </label>
                <select
                  value={opts.visitsPerDay}
                  onChange={(e) => set("visitsPerDay", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-wheat rounded-lg text-sm text-barn-dark focus:outline-none focus:border-earth"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}x / day</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-barn mb-1">
                  Number of days
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={opts.numberOfDays}
                  onChange={(e) => set("numberOfDays", parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-wheat rounded-lg text-sm text-barn-dark focus:outline-none focus:border-earth"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Estimate ── */}
        <div className="lg:sticky lg:top-6 space-y-4 self-start">
          <div className="bg-white rounded-xl border border-wheat p-5">
            <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-4">
              Cost Estimate
            </h2>

            {/* Per-visit breakdown */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-earth-dark uppercase tracking-wide mb-2">
                Per Visit
              </p>
              <div className="space-y-2">
                {estimate.visitEstimate.lineItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={item.isIncluded ? "text-sage-dark" : "text-earth-dark"}>
                      {item.label}
                      {item.note && (
                        <span className="ml-1 text-xs text-sage-dark">({item.note})</span>
                      )}
                    </span>
                    <span className={`font-medium tabular-nums ${item.isIncluded ? "text-sage-dark" : "text-barn"}`}>
                      {item.isIncluded ? "Incl." : formatDollars(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm font-bold text-barn border-t border-wheat mt-3 pt-3">
                <span>Per Visit Total</span>
                <span className="tabular-nums">{formatDollars(estimate.visitEstimate.perVisitTotal)}</span>
              </div>
            </div>

            {/* Trip summary */}
            <div className="border-t border-wheat pt-4 space-y-2">
              <p className="text-xs font-semibold text-earth-dark uppercase tracking-wide mb-2">
                Trip Summary
              </p>
              <div className="flex justify-between text-sm text-earth-dark">
                <span>
                  {formatDollars(estimate.visitEstimate.perVisitTotal)} ×{" "}
                  {estimate.totalVisits} visit{estimate.totalVisits !== 1 ? "s" : ""}
                </span>
                <span className="tabular-nums font-medium text-barn">
                  {formatDollars(estimate.visitsCost)}
                </span>
              </div>

              {estimate.overnightCost > 0 && (
                <div className="flex justify-between text-sm text-earth-dark">
                  <span>
                    Overnight ({opts.numberOfDays} night{opts.numberOfDays !== 1 ? "s" : ""})
                  </span>
                  <span className="tabular-nums font-medium text-barn">
                    {formatDollars(estimate.overnightCost)}
                  </span>
                </div>
              )}

              {estimate.keyExchangeCost > 0 && (
                <div className="flex justify-between text-sm text-earth-dark">
                  <span>Key Exchange (one-time)</span>
                  <span className="tabular-nums font-medium text-barn">
                    {formatDollars(estimate.keyExchangeCost)}
                  </span>
                </div>
              )}

              {estimate.meetAndGreetCost > 0 && (
                <div className="flex justify-between text-sm text-earth-dark">
                  <span>Meet &amp; Greet (one-time)</span>
                  <span className="tabular-nums font-medium text-barn">
                    {formatDollars(estimate.meetAndGreetCost)}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-bold text-barn text-lg border-t border-wheat mt-3 pt-3">
                <span>Total Estimate</span>
                <span className="tabular-nums">{formatDollars(estimate.grandTotal)}</span>
              </div>

              <p className="text-xs text-earth-light pt-1">
                {opts.visitsPerDay}x/day × {opts.numberOfDays} day
                {opts.numberOfDays !== 1 ? "s" : ""} = {estimate.totalVisits} visit
                {estimate.totalVisits !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="bg-wheat-light/40 border border-wheat rounded-xl p-4 text-xs text-earth-dark leading-relaxed">
            <strong className="text-barn">Note:</strong> This estimate is for your planning
            purposes only. Final pricing is set by you and agreed directly with the animal owner.
            The Farm Sitter does not set or collect fees for individual jobs.
          </div>
        </div>
      </div>
    </div>
  );
}
