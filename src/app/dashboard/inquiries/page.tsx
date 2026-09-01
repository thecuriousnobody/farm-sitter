// Dashboard — Inquiry List
// Shows submitted animal owner inquiries. Each row links to the calculator
// pre-populated with that inquiry's data so the operator can estimate the job.

const MOCK_INQUIRIES = [
  {
    id: "inq_001",
    name: "Sarah Mitchell",
    location: "Bloomington, IL 61701",
    submitted: "2026-03-20",
    animals: [
      { type: "Horses", tier: 3, quantity: "2" },
      { type: "Cats", tier: 1, quantity: "3" },
    ],
    tripStart: "2026-04-10",
    tripEnd: "2026-04-17",
    visitFrequency: "2x daily",
    status: "NEW",
    notes: "Horses need morning and evening feed. Cats indoor only.",
  },
  {
    id: "inq_002",
    name: "Dale Kowalski",
    location: "Peoria, IL 61602",
    submitted: "2026-03-21",
    animals: [
      { type: "Goats", tier: 2, quantity: "6–10" },
      { type: "Chickens", tier: 1, quantity: "20+" },
      { type: "Dogs", tier: 0, quantity: "2" },
    ],
    tripStart: "2026-04-05",
    tripEnd: "2026-04-08",
    visitFrequency: "2x daily",
    status: "NEW",
    notes: "One goat is pregnant — please monitor closely.",
  },
  {
    id: "inq_003",
    name: "Teresa Hanson",
    location: "Galesburg, IL 61401",
    submitted: "2026-03-22",
    animals: [
      { type: "Dairy / Milking Animals", tier: 4, quantity: "3" },
      { type: "Goats", tier: 2, quantity: "4" },
    ],
    tripStart: "2026-04-14",
    tripEnd: "2026-04-21",
    visitFrequency: "Morning & Evening",
    status: "UNDER_REVIEW",
    notes: "Milking required twice daily. Animals on supplement.",
  },
];

const STATUS_STYLE: Record<string, string> = {
  NEW: "bg-sky/30 text-barn",
  UNDER_REVIEW: "bg-wheat-light text-earth-dark",
  MATCHED: "bg-sage-light/40 text-sage-dark",
  NO_COVERAGE: "bg-rust/10 text-rust",
  CLOSED: "bg-cream-dark text-earth-light",
};

function buildCalculatorUrl(inq: (typeof MOCK_INQUIRIES)[0]): string {
  // Determine primary service from highest tier animal
  const maxTier = Math.max(...inq.animals.map((a) => a.tier));
  const tierMap: Record<number, string> = { 1: "tier1", 2: "tier2", 3: "tier3", 4: "tier4" };
  const primary = tierMap[maxTier] ?? "tier1";

  const dogEntry = inq.animals.find((a) => a.type === "Dogs");
  const dogs = dogEntry ? dogEntry.quantity : "0";

  const start = inq.tripStart ? new Date(inq.tripStart) : null;
  const end = inq.tripEnd ? new Date(inq.tripEnd) : null;
  const days =
    start && end
      ? Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000))
      : 1;

  const visitsPerDay = inq.visitFrequency?.includes("2") ? 2 : 1;

  const params = new URLSearchParams({
    tier: primary,
    dogs,
    days: String(days),
    vpd: String(visitsPerDay),
    inquiryId: inq.id,
    name: inq.name,
  });

  return `/dashboard/calculator?${params.toString()}`;
}

export default function InquiriesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-barn">Inquiries</h1>
        <p className="text-sm text-earth-dark mt-1">
          Animal owner referral requests. Use the calculator to estimate a job before responding.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-wheat overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-wheat-light/60 border-b border-wheat">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-barn">Owner</th>
              <th className="text-left px-4 py-3 font-semibold text-barn">Location</th>
              <th className="text-left px-4 py-3 font-semibold text-barn">Animals</th>
              <th className="text-left px-4 py-3 font-semibold text-barn">Dates</th>
              <th className="text-left px-4 py-3 font-semibold text-barn">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-wheat">
            {MOCK_INQUIRIES.map((inq) => (
              <tr key={inq.id} className="hover:bg-cream-dark/40 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-barn-dark">{inq.name}</div>
                  <div className="text-xs text-earth-light">{inq.submitted}</div>
                </td>
                <td className="px-4 py-3 text-earth-dark">{inq.location}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {inq.animals.map((a) => (
                      <span
                        key={a.type}
                        className="text-xs bg-cream-dark border border-wheat rounded-full px-2 py-0.5 text-earth-dark"
                      >
                        {a.quantity} {a.type}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-earth-dark text-xs">
                  {inq.tripStart && (
                    <>
                      {inq.tripStart}
                      <br />→ {inq.tripEnd}
                    </>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      STATUS_STYLE[inq.status] ?? STATUS_STYLE.NEW
                    }`}
                  >
                    {inq.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={buildCalculatorUrl(inq)}
                    className="px-3 py-1.5 text-xs font-semibold bg-rust text-white rounded-lg hover:bg-rust-light transition-colors"
                  >
                    Calculate →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-earth-light mt-3">
        Showing placeholder data — live inquiries will populate once the database is connected.
      </p>
    </div>
  );
}
