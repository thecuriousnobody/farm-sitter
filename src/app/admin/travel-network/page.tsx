// ── Admin — Travel Network Management ───────────────────────────────────────

type TravelStatus = "open" | "matched" | "expired" | "hidden";

type AdminTravelRequest = {
  id: string;
  zip: string;
  city: string;
  state: string;
  animalSummary: string;
  animalCategories: string[];
  tripStart: string;
  tripEnd: string;
  visitsPerDay: number;
  overnight: boolean;
  specialCare: boolean;
  specialCareNote?: string;
  postedAt: string;
  expiresAt: string;
  status: TravelStatus;
  consentGiven: boolean;
  interestedSitters: string[]; // sitter names/IDs
  introductionsMade: number;
};

type InterestSubmission = {
  id: string;
  requestId: string;
  sitterName: string;
  sitterCity: string;
  submittedAt: string;
  status: "pending" | "introduced" | "declined";
};

const MOCK_REQUESTS: AdminTravelRequest[] = [
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
    consentGiven: true,
    interestedSitters: ["Sarah K.", "Mike D."],
    introductionsMade: 0,
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
    consentGiven: true,
    interestedSitters: [],
    introductionsMade: 0,
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
    consentGiven: true,
    interestedSitters: ["Jennifer W."],
    introductionsMade: 1,
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
    status: "matched",
    consentGiven: true,
    interestedSitters: ["Chris T.", "Amanda R."],
    introductionsMade: 2,
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
    consentGiven: true,
    interestedSitters: [],
    introductionsMade: 0,
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
    status: "hidden",
    consentGiven: false,
    interestedSitters: [],
    introductionsMade: 0,
  },
];

const MOCK_INTERESTS: InterestSubmission[] = [
  { id: "ti-001", requestId: "tnr-001", sitterName: "Sarah K.", sitterCity: "Morton, IL", submittedAt: "2026-03-25", status: "pending" },
  { id: "ti-002", requestId: "tnr-001", sitterName: "Mike D.", sitterCity: "East Peoria, IL", submittedAt: "2026-03-24", status: "pending" },
  { id: "ti-003", requestId: "tnr-003", sitterName: "Jennifer W.", sitterCity: "Normal, IL", submittedAt: "2026-03-24", status: "introduced" },
];

// ── Territory Intelligence ───────────────────────────────────────────────────

const TOP_UNMET_ZIPS = [
  { zip: "60901", city: "Kankakee, IL", requests: 3, categories: ["Equine", "Livestock"] },
  { zip: "62701", city: "Springfield, IL", requests: 2, categories: ["Equine"] },
  { zip: "61820", city: "Champaign, IL", requests: 2, categories: ["Poultry", "Small Animals"] },
  { zip: "62901", city: "Carbondale, IL", requests: 1, categories: ["Livestock"] },
  { zip: "61801", city: "Urbana, IL", requests: 1, categories: ["Equine", "Livestock"] },
];

const TOP_ANIMAL_CATEGORIES = [
  { category: "Equine", requests: 4, pct: 80 },
  { category: "Livestock", requests: 4, pct: 80 },
  { category: "Poultry", requests: 2, pct: 40 },
  { category: "Small Animals", requests: 1, pct: 20 },
];

const STATUS_BADGE: Record<TravelStatus, { label: string; cls: string }> = {
  open: { label: "Open", cls: "bg-sage/20 text-sage" },
  matched: { label: "Matched", cls: "bg-barn/20 text-barn" },
  expired: { label: "Expired", cls: "bg-earth/20 text-earth" },
  hidden: { label: "Hidden", cls: "bg-rust/20 text-rust" },
};

const INTEREST_BADGE: Record<InterestSubmission["status"], string> = {
  pending: "bg-wheat text-barn",
  introduced: "bg-sage/20 text-sage",
  declined: "bg-rust/10 text-rust",
};

export default function AdminTravelNetworkPage() {
  const open = MOCK_REQUESTS.filter((r) => r.status === "open").length;
  const matched = MOCK_REQUESTS.filter((r) => r.status === "matched").length;
  const hidden = MOCK_REQUESTS.filter((r) => r.status === "hidden").length;
  const pendingInterests = MOCK_INTERESTS.filter((i) => i.status === "pending").length;
  const totalIntroductions = MOCK_REQUESTS.reduce((s, r) => s + r.introductionsMade, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-barn-dark">Travel Network</h1>
        <p className="text-earth-dark text-sm mt-1">
          Manage no-coverage escalation requests, sitter interest submissions, and territory intelligence.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "Open Requests", value: open, color: "text-sage" },
          { label: "Matched", value: matched, color: "text-barn" },
          { label: "Hidden / Draft", value: hidden, color: "text-rust" },
          { label: "Pending Interests", value: pendingInterests, color: "text-earth" },
          { label: "Introductions Made", value: totalIntroductions, color: "text-barn-dark" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-wheat p-4 text-center">
            <p className={`text-3xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-earth-dark mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Pending Interest Queue */}
      {MOCK_INTERESTS.filter((i) => i.status === "pending").length > 0 && (
        <section>
          <h2 className="text-base font-bold text-barn-dark mb-3">
            Pending Interest Submissions
            <span className="ml-2 text-xs font-normal bg-rust/10 text-rust px-2 py-0.5 rounded-full">
              {pendingInterests} action needed
            </span>
          </h2>
          <div className="bg-white rounded-xl border border-wheat overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream-dark">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Sitter</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Request</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Submitted</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wheat">
                {MOCK_INTERESTS.map((interest) => {
                  const req = MOCK_REQUESTS.find((r) => r.id === interest.requestId);
                  return (
                    <tr key={interest.id} className="hover:bg-cream-dark/30">
                      <td className="px-4 py-3">
                        <p className="font-medium text-barn-dark">{interest.sitterName}</p>
                        <p className="text-xs text-earth-dark">{interest.sitterCity}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-barn-dark">{req?.city}, {req?.state} {req?.zip}</p>
                        <p className="text-xs text-earth-dark">{req?.animalSummary}</p>
                      </td>
                      <td className="px-4 py-3 text-earth-dark">{interest.submittedAt}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${INTEREST_BADGE[interest.status]}`}>
                          {interest.status.charAt(0).toUpperCase() + interest.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="text-xs px-3 py-1.5 bg-sage text-white rounded-lg font-medium hover:bg-sage/80 transition-colors">
                            Make Intro
                          </button>
                          <button className="text-xs px-3 py-1.5 bg-earth/10 text-earth-dark rounded-lg hover:bg-earth/20 transition-colors">
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* All Requests Table */}
      <section>
        <h2 className="text-base font-bold text-barn-dark mb-3">All Requests</h2>
        <div className="bg-white rounded-xl border border-wheat overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Location</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Animals</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Care Window</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Flags</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Interest</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-barn uppercase tracking-wide">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wheat">
              {MOCK_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-cream-dark/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-barn-dark">{req.city}, {req.state}</p>
                    <p className="text-xs text-earth-dark">{req.zip}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-barn-dark">{req.animalSummary}</p>
                    <div className="flex gap-1 mt-0.5 flex-wrap">
                      {req.animalCategories.map((c) => (
                        <span key={c} className="text-xs bg-cream-dark text-earth px-1.5 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-earth-dark">
                    <p>{req.tripStart}</p>
                    <p className="text-xs">to {req.tripEnd}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {req.overnight && (
                        <span className="text-xs bg-barn/10 text-barn px-1.5 py-0.5 rounded">Overnight</span>
                      )}
                      {req.specialCare && (
                        <span className="text-xs bg-rust/10 text-rust px-1.5 py-0.5 rounded">Special Care</span>
                      )}
                      {!req.consentGiven && (
                        <span className="text-xs bg-wheat text-earth px-1.5 py-0.5 rounded">No Consent</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-barn-dark">{req.interestedSitters.length}</p>
                    <p className="text-xs text-earth-dark">{req.introductionsMade} intro{req.introductionsMade !== 1 ? "s" : ""}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[req.status].cls}`}>
                      {STATUS_BADGE[req.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {req.status === "open" && (
                        <>
                          <button className="text-xs px-2 py-1 bg-barn/10 text-barn rounded hover:bg-barn/20 transition-colors">Mark Matched</button>
                          <button className="text-xs px-2 py-1 bg-earth/10 text-earth-dark rounded hover:bg-earth/20 transition-colors">Hide</button>
                        </>
                      )}
                      {req.status === "hidden" && (
                        <button className="text-xs px-2 py-1 bg-sage/10 text-sage rounded hover:bg-sage/20 transition-colors">Make Live</button>
                      )}
                      {req.status === "matched" && (
                        <button className="text-xs px-2 py-1 bg-earth/10 text-earth-dark rounded hover:bg-earth/20 transition-colors">Re-open</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Territory Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Unmet ZIPs */}
        <section className="bg-white rounded-xl border border-wheat p-5">
          <h2 className="text-base font-bold text-barn-dark mb-4">Top Unmet ZIPs</h2>
          <div className="space-y-3">
            {TOP_UNMET_ZIPS.map((z) => (
              <div key={z.zip} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-barn-dark">{z.city}</p>
                  <p className="text-xs text-earth-dark">{z.zip} &middot; {z.categories.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rust">{z.requests}</p>
                  <p className="text-xs text-earth-dark">request{z.requests !== 1 ? "s" : ""}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-earth/50 mt-4 pt-3 border-t border-wheat">
            Use this data to identify high-demand expansion zones for sitter recruitment.
          </p>
        </section>

        {/* Top Animal Categories */}
        <section className="bg-white rounded-xl border border-wheat p-5">
          <h2 className="text-base font-bold text-barn-dark mb-4">Demand by Animal Type</h2>
          <div className="space-y-3">
            {TOP_ANIMAL_CATEGORIES.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-barn-dark">{c.category}</span>
                  <span className="text-earth-dark">{c.requests} request{c.requests !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-barn rounded-full"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-earth/50 mt-4 pt-3 border-t border-wheat">
            Equine and livestock dominate travel network demand — target credentialing in those specialties.
          </p>
        </section>
      </div>

      {/* Export note */}
      <div className="text-center">
        <button className="text-sm text-barn hover:underline">
          Export all travel network data as CSV →
        </button>
      </div>
    </div>
  );
}
