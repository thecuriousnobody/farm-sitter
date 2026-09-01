"use client";

import { useState } from "react";

// ── Mock travel network requests ────────────────────────────────────────────

type TravelRequest = {
  id: string;
  zip: string;
  city: string;
  state: string;
  animalSummary: string; // short display string
  animalCategories: string[];
  tripStart: string;
  tripEnd: string;
  visitsPerDay: number;
  overnight: boolean;
  specialCare: boolean;
  specialCareNote?: string;
  postedAt: string; // ISO date
  expiresAt: string; // ISO date
  status: "open" | "matched" | "expired";
};

const MOCK_REQUESTS: TravelRequest[] = [
  {
    id: "tnr-001",
    zip: "62701",
    city: "Springfield",
    state: "IL",
    animalSummary: "3 horses, 2 goats",
    animalCategories: ["Equine", "Livestock"],
    tripStart: "2026-04-12",
    tripEnd: "2026-04-19",
    visitsPerDay: 2,
    overnight: false,
    specialCare: false,
    postedAt: "2026-03-24",
    expiresAt: "2026-04-23",
    status: "open",
  },
  {
    id: "tnr-002",
    zip: "61820",
    city: "Champaign",
    state: "IL",
    animalSummary: "6 chickens, 4 ducks, 2 cats",
    animalCategories: ["Poultry", "Small Animals"],
    tripStart: "2026-04-05",
    tripEnd: "2026-04-10",
    visitsPerDay: 1,
    overnight: false,
    specialCare: false,
    postedAt: "2026-03-22",
    expiresAt: "2026-04-21",
    status: "open",
  },
  {
    id: "tnr-003",
    zip: "61801",
    city: "Urbana",
    state: "IL",
    animalSummary: "1 horse (medication), 3 sheep",
    animalCategories: ["Equine", "Livestock"],
    tripStart: "2026-04-18",
    tripEnd: "2026-04-25",
    visitsPerDay: 2,
    overnight: true,
    specialCare: true,
    specialCareNote: "Horse requires twice-daily oral medication",
    postedAt: "2026-03-23",
    expiresAt: "2026-04-22",
    status: "open",
  },
  {
    id: "tnr-004",
    zip: "62901",
    city: "Carbondale",
    state: "IL",
    animalSummary: "2 llamas, 5 goats",
    animalCategories: ["Livestock"],
    tripStart: "2026-05-01",
    tripEnd: "2026-05-07",
    visitsPerDay: 1,
    overnight: false,
    specialCare: false,
    postedAt: "2026-03-20",
    expiresAt: "2026-04-19",
    status: "open",
  },
  {
    id: "tnr-005",
    zip: "60901",
    city: "Kankakee",
    state: "IL",
    animalSummary: "4 horses, 2 donkeys",
    animalCategories: ["Equine"],
    tripStart: "2026-04-08",
    tripEnd: "2026-04-14",
    visitsPerDay: 3,
    overnight: true,
    specialCare: false,
    postedAt: "2026-03-18",
    expiresAt: "2026-04-17",
    status: "open",
  },
  {
    id: "tnr-006",
    zip: "62959",
    city: "Marion",
    state: "IL",
    animalSummary: "Dairy goats (2), chickens (12)",
    animalCategories: ["Livestock", "Poultry"],
    tripStart: "2026-04-20",
    tripEnd: "2026-04-27",
    visitsPerDay: 2,
    overnight: false,
    specialCare: true,
    specialCareNote: "Goats need to be milked each morning",
    postedAt: "2026-03-25",
    expiresAt: "2026-04-24",
    status: "open",
  },
];

const ALL_STATES = ["IL", "IA", "IN", "MO", "WI"];
const ALL_CATEGORIES = ["Equine", "Livestock", "Poultry", "Small Animals", "Dogs", "Plants"];

function daysAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}

function daysUntil(iso: string): number {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
}

export default function TravelNetworkPage() {
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [overnightOnly, setOvernightOnly] = useState(false);
  const [specialCareOnly, setSpecialCareOnly] = useState(false);
  const [expressedInterest, setExpressedInterest] = useState<Set<string>>(new Set());
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const filtered = MOCK_REQUESTS.filter((r) => {
    if (r.status !== "open") return false;
    if (stateFilter.length && !stateFilter.includes(r.state)) return false;
    if (categoryFilter.length && !r.animalCategories.some((c) => categoryFilter.includes(c))) return false;
    if (overnightOnly && !r.overnight) return false;
    if (specialCareOnly && !r.specialCare) return false;
    return true;
  });

  function toggleState(s: string) {
    setStateFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }
  function toggleCategory(c: string) {
    setCategoryFilter((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  }
  function handleExpressInterest(id: string) {
    setExpressedInterest((prev) => new Set([...prev, id]));
    setConfirmingId(null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-barn-dark">Travel Network Requests</h1>
        <p className="text-earth-dark text-sm mt-1 max-w-2xl">
          These are animal owners outside your primary coverage area who are looking for a
          credentialed farm sitter willing to travel. Express interest and an admin will
          facilitate the introduction — no direct contact info is shared without consent.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-wheat-light/60 border border-wheat rounded-xl p-4 flex gap-3 mb-6 text-sm">
        <span className="text-xl shrink-0">🗺️</span>
        <div className="text-earth-dark leading-relaxed">
          <strong className="text-barn-dark">How this works:</strong> Express interest on a request.
          Our team will review your profile, confirm you're a good fit, and make a warm introduction
          to the animal owner. You then coordinate directly from there.
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className="w-52 shrink-0 space-y-5">
          <div>
            <p className="text-xs font-bold text-barn uppercase tracking-wide mb-2">State</p>
            <div className="space-y-1.5">
              {ALL_STATES.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm text-earth-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stateFilter.includes(s)}
                    onChange={() => toggleState(s)}
                    className="accent-barn"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-barn uppercase tracking-wide mb-2">Animal Type</p>
            <div className="space-y-1.5">
              {ALL_CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-earth-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryFilter.includes(c)}
                    onChange={() => toggleCategory(c)}
                    className="accent-barn"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-earth-dark cursor-pointer">
              <input
                type="checkbox"
                checked={overnightOnly}
                onChange={(e) => setOvernightOnly(e.target.checked)}
                className="accent-barn"
              />
              Overnight only
            </label>
            <label className="flex items-center gap-2 text-sm text-earth-dark cursor-pointer">
              <input
                type="checkbox"
                checked={specialCareOnly}
                onChange={(e) => setSpecialCareOnly(e.target.checked)}
                className="accent-barn"
              />
              Special care needed
            </label>
          </div>

          {(stateFilter.length > 0 || categoryFilter.length > 0 || overnightOnly || specialCareOnly) && (
            <button
              onClick={() => { setStateFilter([]); setCategoryFilter([]); setOvernightOnly(false); setSpecialCareOnly(false); }}
              className="text-xs text-rust hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Request cards */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white border border-wheat rounded-xl p-12 text-center">
              <p className="text-earth text-4xl mb-3">🔍</p>
              <p className="font-semibold text-barn-dark mb-1">No requests match your filters</p>
              <p className="text-sm text-earth-dark">Try removing some filters to see more results.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-earth-dark mb-3">
                Showing <strong>{filtered.length}</strong> open request{filtered.length !== 1 ? "s" : ""}
              </p>
              {filtered.map((req) => {
                const interested = expressedInterest.has(req.id);
                const confirming = confirmingId === req.id;
                const expires = daysUntil(req.expiresAt);

                return (
                  <div
                    key={req.id}
                    className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
                      interested ? "border-sage/50 bg-sage/5" : "border-wheat hover:border-earth-light"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: request info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-bold text-barn-dark text-sm">
                            {req.city}, {req.state} {req.zip}
                          </span>
                          {req.overnight && (
                            <span className="text-xs bg-barn text-cream px-2 py-0.5 rounded-full font-medium">
                              Overnight
                            </span>
                          )}
                          {req.specialCare && (
                            <span className="text-xs bg-rust text-white px-2 py-0.5 rounded-full font-medium">
                              Special Care
                            </span>
                          )}
                          {expires <= 5 && (
                            <span className="text-xs bg-wheat text-barn px-2 py-0.5 rounded-full font-medium">
                              Expires in {expires}d
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-earth-dark mb-1">
                          <span className="font-medium text-barn">Animals:</span> {req.animalSummary}
                        </p>

                        <p className="text-sm text-earth-dark mb-1">
                          <span className="font-medium text-barn">Care window:</span>{" "}
                          {req.tripStart} – {req.tripEnd} &middot; {req.visitsPerDay}x daily
                        </p>

                        {req.specialCareNote && (
                          <p className="text-xs text-rust mt-1 bg-rust/5 rounded px-2 py-1">
                            ⚠ {req.specialCareNote}
                          </p>
                        )}

                        <div className="flex gap-3 mt-3 flex-wrap">
                          {req.animalCategories.map((c) => (
                            <span key={c} className="text-xs bg-cream-dark text-earth-dark px-2 py-0.5 rounded-full">
                              {c}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-earth/60 mt-3">
                          Posted {daysAgo(req.postedAt)} &middot; Expires in {expires} day{expires !== 1 ? "s" : ""}
                        </p>
                      </div>

                      {/* Right: action */}
                      <div className="shrink-0 text-right">
                        {interested ? (
                          <div className="text-sm text-sage font-semibold">
                            ✓ Interest sent
                            <p className="text-xs text-earth/60 font-normal mt-0.5">
                              We&apos;ll be in touch
                            </p>
                          </div>
                        ) : confirming ? (
                          <div className="space-y-2 text-left min-w-[180px]">
                            <p className="text-xs text-earth-dark leading-relaxed">
                              We&apos;ll notify the owner and facilitate an introduction if you&apos;re a fit.
                            </p>
                            <button
                              onClick={() => handleExpressInterest(req.id)}
                              className="w-full px-4 py-2 bg-sage text-white text-sm font-semibold rounded-lg hover:bg-sage/80 transition-colors"
                            >
                              Confirm Interest
                            </button>
                            <button
                              onClick={() => setConfirmingId(null)}
                              className="w-full text-xs text-earth hover:text-barn"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingId(req.id)}
                            className="px-4 py-2 bg-barn text-cream text-sm font-semibold rounded-lg hover:bg-barn-light transition-colors"
                          >
                            Express Interest
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Privacy footer */}
      <div className="mt-8 text-xs text-earth/50 text-center max-w-2xl mx-auto">
        Animal owner contact information is never displayed directly. All introductions are
        facilitated by The Farm Sitter team after reviewing both parties.
      </div>
    </div>
  );
}
