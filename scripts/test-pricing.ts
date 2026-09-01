/**
 * The Farm Sitter — Pricing Calculator Test Script
 *
 * Run:  npx tsx scripts/test-pricing.ts
 *
 * Tests the core pricing engine against real-world scenarios.
 * No browser, no server, no database required.
 */

import {
  calculateTrip,
  buildPricingConfig,
  formatDollars,
  DEFAULT_PRICING,
  type TripOptions,
  type PricingConfig,
} from "../src/lib/pricing";

// ── Terminal formatting helpers ───────────────────────────────────────────────

const W = 54;
const line  = "─".repeat(W);
const dline = "═".repeat(W);

function pad(label: string, value: string, width = W): string {
  const gap = width - label.length - value.length;
  return `  ${label}${" ".repeat(Math.max(1, gap))}${value}`;
}

function header(title: string) {
  console.log(`\n${dline}`);
  console.log(`  ${title}`);
  console.log(dline);
}

function section(title: string) {
  console.log(`\n  ${title}`);
  console.log(`  ${line}`);
}

function printEstimate(opts: TripOptions, pricing: PricingConfig = DEFAULT_PRICING) {
  const est = calculateTrip(opts, pricing);

  section("Per-Visit Breakdown");
  for (const item of est.visitEstimate.lineItems) {
    const val = item.isIncluded ? "Incl." : formatDollars(item.amount);
    const label = item.isIncluded ? `${item.label} (${item.note})` : item.label;
    console.log(pad(label, val));
  }
  console.log(`  ${line}`);
  console.log(pad("Per-Visit Total", formatDollars(est.visitEstimate.perVisitTotal)));

  section("Trip Summary");
  console.log(
    pad(
      `${formatDollars(est.visitEstimate.perVisitTotal)} × ${est.totalVisits} visit${est.totalVisits !== 1 ? "s" : ""} (${opts.visitsPerDay}x/day × ${opts.numberOfDays} day${opts.numberOfDays !== 1 ? "s" : ""})`,
      formatDollars(est.visitsCost)
    )
  );
  if (est.overnightCost > 0) {
    console.log(
      pad(`Overnight (${opts.numberOfDays} night${opts.numberOfDays !== 1 ? "s" : ""})`, formatDollars(est.overnightCost))
    );
  }
  if (est.keyExchangeCost > 0) {
    console.log(pad("Key Exchange (one-time)", formatDollars(est.keyExchangeCost)));
  }
  if (est.meetAndGreetCost > 0) {
    console.log(pad("Meet & Greet (one-time)", formatDollars(est.meetAndGreetCost)));
  }
  console.log(`  ${line}`);
  console.log(pad("GRAND TOTAL", formatDollars(est.grandTotal)));
  console.log();
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

header("The Farm Sitter — Pricing Calculator");
console.log(`  Platform defaults loaded. Running ${6} scenarios.\n`);

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 1: Tier 1 — Cats & Chickens, 3 days, 1x/day");
console.log("  Basic small-animal care, no add-ons, with meet & greet.\n");

printEstimate({
  primaryService: "tier1",
  dogCount: 0,
  dogServiceLevel: "none",
  hasPlants: false,
  isHoliday: false,
  needsSpecialInstructions: false,
  needsGarbageService: false,
  needsHomeEntry: true,
  visitsPerDay: 1,
  numberOfDays: 3,
  isOvernight: false,
  needsKeyExchange: true,
  needsMeetAndGreet: true,
});

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 2: Tier 2 — Goats & Sheep + 2 Dogs, 5 days, 2x/day");
console.log("  Herd animals with dog add-on (basic), plants, garbage.\n");

printEstimate({
  primaryService: "tier2",
  dogCount: 2,
  dogServiceLevel: "basic",
  hasPlants: true,
  isHoliday: false,
  needsSpecialInstructions: false,
  needsGarbageService: true,
  needsHomeEntry: false,
  visitsPerDay: 2,
  numberOfDays: 5,
  isOvernight: false,
  needsKeyExchange: true,
  needsMeetAndGreet: true,
});

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 3: Tier 3 — 2 Horses, 7 days, 2x/day + Overnight");
console.log("  Equine care with overnight. Key exchange, home entry, garbage included.\n");

printEstimate({
  primaryService: "tier3",
  dogCount: 1,
  dogServiceLevel: "additional",
  hasPlants: true,
  isHoliday: false,
  needsSpecialInstructions: false,
  needsGarbageService: true,
  needsHomeEntry: true,
  visitsPerDay: 2,
  numberOfDays: 7,
  isOvernight: true,
  needsKeyExchange: true,
  needsMeetAndGreet: true,
});

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 4: Tier 4 — Milking Cow + Special Instructions, 4 days, 2x/day");
console.log("  Specialized care with time-sensitive milking routine.\n");

printEstimate({
  primaryService: "tier4",
  dogCount: 0,
  dogServiceLevel: "none",
  hasPlants: false,
  isHoliday: false,
  needsSpecialInstructions: true,
  needsGarbageService: false,
  needsHomeEntry: true,
  visitsPerDay: 2,
  numberOfDays: 4,
  isOvernight: false,
  needsKeyExchange: true,
  needsMeetAndGreet: true,
});

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 5: Tier 1 — Holiday Visit (Thanksgiving)");
console.log("  Single holiday visit with holiday add-on surcharge.\n");

printEstimate({
  primaryService: "tier1",
  dogCount: 0,
  dogServiceLevel: "none",
  hasPlants: false,
  isHoliday: true,
  needsSpecialInstructions: false,
  needsGarbageService: false,
  needsHomeEntry: true,
  visitsPerDay: 1,
  numberOfDays: 1,
  isOvernight: false,
  needsKeyExchange: false,
  needsMeetAndGreet: false,
});

// ─────────────────────────────────────────────────────────────────────────────
header("Scenario 6: Custom Operator Pricing — Tier 3 Market Adjustment");
console.log("  Same as Scenario 3 but operator charges $55/visit (above standard $40).\n");

const customPricing = buildPricingConfig({ tier3Base: 5500 });

printEstimate(
  {
    primaryService: "tier3",
    dogCount: 1,
    dogServiceLevel: "additional",
    hasPlants: true,
    isHoliday: false,
    needsSpecialInstructions: false,
    needsGarbageService: true,
    needsHomeEntry: true,
    visitsPerDay: 2,
    numberOfDays: 7,
    isOvernight: true,
    needsKeyExchange: true,
    needsMeetAndGreet: true,
  },
  customPricing
);

// ─────────────────────────────────────────────────────────────────────────────
console.log(dline);
console.log("  All scenarios complete.");
console.log(dline);
console.log();
