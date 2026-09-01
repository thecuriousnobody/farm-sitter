// ─────────────────────────────────────────────────────────────────────────────
// Pricing Engine — The Farm Sitter
// All monetary values stored in cents (integers) to avoid floating-point issues.
// Display: divide by 100 for dollars.
// ─────────────────────────────────────────────────────────────────────────────

export type PrimaryService = "tier1" | "tier2" | "tier3" | "tier4" | "dogs";

// ── Default platform pricing (cents) ─────────────────────────────────────────
// These are the baseline rules. Operators can override base prices in their
// dashboard. Add-on prices are currently platform-defined.

export const DEFAULT_PRICING: PricingConfig = {
  // Base prices per visit
  tier1Base: 2000,  // $20 — Cats, chickens, ducks, fish, caged pets, rabbits, lizards
  tier2Base: 3000,  // $30 — Goats, sheep, llamas, alpacas, turkeys, exotic birds
  tier3Base: 4000,  // $40 — Horses, donkeys, mini horses, stalled livestock
  tier4Base: 5000,  // $50 — Milking, medication, rehab, specialty
  dogsBase:  2500,  // $25 — Dogs standalone
  plantsBase: 3000, // $30 — Plants/garden standalone

  // Add-on prices (per occurrence unless noted)
  dogBasic:          500,  // $5  per dog — basic feeding/watering/waste
  dogAdditional:     1000, // $10 per dog — extended/additional dog services
  overnightT1T2:     6000, // $60 per night — Tier 1 / Tier 2
  overnightT3:       5000, // $50 per night — Tier 3
  overnightT4:       6000, // $60 per night — Tier 4
  overnightDogs:     5000, // $50 per night — Dogs standalone
  meetAndGreet:      1000, // $10 — one-time, required for first visit
  holidayPerVisit:   1000, // $10 per visit on holidays
  holidayMinCents:   2000, // $20 minimum per holiday event
  specialInstructions: 500, // $5 per visit
  garbageServices:     500, // $5 per visit
  keyExchange:         500, // $5 per exchange (one-time per trip)
  homeEntry:           100, // $1 per visit
  plantsAddon:        3000, // $30 per visit — plants added to T1/T2 visit
};

// ── Add-ons included at no charge by tier ─────────────────────────────────────
// Tier 3, Tier 4, and Dogs-standalone include these at $0.
// Tier 1 and Tier 2 charge for all add-ons.

const INCLUDED_AT_TIER3_4_DOGS = new Set([
  "keyExchange",
  "homeEntry",
  "holiday",
  "garbage",
  "plants",
  "mail",
]);

export function isIncluded(addonKey: string, service: PrimaryService): boolean {
  if (service === "tier3" || service === "tier4" || service === "dogs") {
    return INCLUDED_AT_TIER3_4_DOGS.has(addonKey);
  }
  return false;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PricingConfig {
  tier1Base: number;
  tier2Base: number;
  tier3Base: number;
  tier4Base: number;
  dogsBase: number;
  plantsBase: number;
  dogBasic: number;
  dogAdditional: number;
  overnightT1T2: number;
  overnightT3: number;
  overnightT4: number;
  overnightDogs: number;
  meetAndGreet: number;
  holidayPerVisit: number;
  holidayMinCents: number;
  specialInstructions: number;
  garbageServices: number;
  keyExchange: number;
  homeEntry: number;
  plantsAddon: number;
}

export interface VisitOptions {
  primaryService: PrimaryService;
  dogCount: number;                           // 0 if no dogs
  dogServiceLevel: "basic" | "additional" | "none";
  hasPlants: boolean;
  isHoliday: boolean;
  needsSpecialInstructions: boolean;
  needsGarbageService: boolean;
  needsHomeEntry: boolean;
}

export interface TripOptions extends VisitOptions {
  visitsPerDay: number;
  numberOfDays: number;
  isOvernight: boolean;                       // applies once per night
  needsKeyExchange: boolean;                  // one-time per trip
  needsMeetAndGreet: boolean;                 // one-time
}

export interface LineItem {
  label: string;
  amount: number;   // cents — 0 if included
  note?: string;    // e.g. "Included at Tier 3"
  isIncluded: boolean;
}

export interface VisitEstimate {
  lineItems: LineItem[];
  perVisitTotal: number; // cents
}

export interface TripEstimate {
  visitEstimate: VisitEstimate;
  totalVisits: number;
  visitsCost: number;         // perVisitTotal × totalVisits
  overnightCost: number;      // per-night fee × nights
  keyExchangeCost: number;    // one-time
  meetAndGreetCost: number;   // one-time
  grandTotal: number;
}

// ── Base price lookup ──────────────────────────────────────────────────────────

function getBasePrice(service: PrimaryService, pricing: PricingConfig): number {
  switch (service) {
    case "tier1": return pricing.tier1Base;
    case "tier2": return pricing.tier2Base;
    case "tier3": return pricing.tier3Base;
    case "tier4": return pricing.tier4Base;
    case "dogs":  return pricing.dogsBase;
  }
}

function getOvernightPrice(service: PrimaryService, pricing: PricingConfig): number {
  switch (service) {
    case "tier1":
    case "tier2": return pricing.overnightT1T2;
    case "tier3": return pricing.overnightT3;
    case "tier4": return pricing.overnightT4;
    case "dogs":  return pricing.overnightDogs;
  }
}

// ── Per-visit calculator ───────────────────────────────────────────────────────

export function calculateVisit(opts: VisitOptions, pricing: PricingConfig): VisitEstimate {
  const items: LineItem[] = [];
  const svc = opts.primaryService;

  const labelMap: Record<PrimaryService, string> = {
    tier1: "Tier 1 Visit — Small & Companion Animals",
    tier2: "Tier 2 Visit — Herd & Flock Animals",
    tier3: "Tier 3 Visit — Stalled & Equine",
    tier4: "Tier 4 Visit — Specialized Care",
    dogs:  "Dogs Visit",
  };

  // Base
  items.push({
    label: labelMap[svc],
    amount: getBasePrice(svc, pricing),
    isIncluded: false,
  });

  // Dogs (add-on only — if primary service is not "dogs")
  if (svc !== "dogs" && opts.dogCount > 0 && opts.dogServiceLevel !== "none") {
    const perDog =
      opts.dogServiceLevel === "basic" ? pricing.dogBasic : pricing.dogAdditional;
    const total = perDog * opts.dogCount;
    items.push({
      label: `Dog Care (${opts.dogCount} dog${opts.dogCount > 1 ? "s" : ""}, ${opts.dogServiceLevel})`,
      amount: total,
      isIncluded: false,
    });
  }

  // Plants
  if (opts.hasPlants) {
    const included = isIncluded("plants", svc);
    items.push({
      label: "Plants & Garden Care",
      amount: included ? 0 : pricing.plantsAddon,
      note: included ? `Included at ${tierLabel(svc)}` : undefined,
      isIncluded: included,
    });
  }

  // Holiday
  if (opts.isHoliday) {
    const included = isIncluded("holiday", svc);
    items.push({
      label: "Holiday Service",
      amount: included ? 0 : pricing.holidayPerVisit,
      note: included ? `Included at ${tierLabel(svc)}` : undefined,
      isIncluded: included,
    });
  }

  // Special instructions
  if (opts.needsSpecialInstructions) {
    items.push({
      label: "Special Instructions",
      amount: pricing.specialInstructions,
      isIncluded: false,
    });
  }

  // Garbage services
  if (opts.needsGarbageService) {
    const included = isIncluded("garbage", svc);
    items.push({
      label: "Garbage Services",
      amount: included ? 0 : pricing.garbageServices,
      note: included ? `Included at ${tierLabel(svc)}` : undefined,
      isIncluded: included,
    });
  }

  // Home entry
  if (opts.needsHomeEntry) {
    const included = isIncluded("homeEntry", svc);
    items.push({
      label: "Entering Home",
      amount: included ? 0 : pricing.homeEntry,
      note: included ? `Included at ${tierLabel(svc)}` : undefined,
      isIncluded: included,
    });
  }

  const perVisitTotal = items.reduce((sum, i) => sum + i.amount, 0);

  return { lineItems: items, perVisitTotal };
}

// ── Full trip calculator ───────────────────────────────────────────────────────

export function calculateTrip(opts: TripOptions, pricing: PricingConfig): TripEstimate {
  const visitEstimate = calculateVisit(opts, pricing);
  const totalVisits = opts.visitsPerDay * opts.numberOfDays;
  const visitsCost = visitEstimate.perVisitTotal * totalVisits;

  const nights = opts.numberOfDays; // overnight fee applies each night
  const overnightCost = opts.isOvernight ? getOvernightPrice(opts.primaryService, pricing) * nights : 0;

  const keyExchangeIncluded = isIncluded("keyExchange", opts.primaryService);
  const keyExchangeCost = opts.needsKeyExchange && !keyExchangeIncluded
    ? pricing.keyExchange
    : 0;

  const meetAndGreetCost = opts.needsMeetAndGreet ? pricing.meetAndGreet : 0;

  const grandTotal = visitsCost + overnightCost + keyExchangeCost + meetAndGreetCost;

  return {
    visitEstimate,
    totalVisits,
    visitsCost,
    overnightCost,
    keyExchangeCost,
    meetAndGreetCost,
    grandTotal,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function tierLabel(svc: PrimaryService): string {
  const map: Record<PrimaryService, string> = {
    tier1: "Tier 1", tier2: "Tier 2", tier3: "Tier 3", tier4: "Tier 4", dogs: "Dogs",
  };
  return map[svc];
}

export { tierLabel };

// Merge operator overrides with system defaults
// Operators can only override base prices, not add-on rules (for now)
export function buildPricingConfig(overrides?: Partial<PricingConfig> | null): PricingConfig {
  if (!overrides) return DEFAULT_PRICING;
  return { ...DEFAULT_PRICING, ...overrides };
}
