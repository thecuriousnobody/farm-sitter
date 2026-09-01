import Link from "next/link";

// Mock data — replace with real DB queries after database setup
const metrics = [
  { label: "Total Inquiries", value: "47", sub: "+8 this week", color: "text-barn" },
  { label: "Active Operators", value: "3", sub: "2 licensed affiliates", color: "text-sage" },
  { label: "In Onboarding", value: "6", sub: "2 awaiting background check", color: "text-earth" },
  { label: "Unmet Demand ZIPs", value: "12", sub: "No coverage available", color: "text-rust" },
];

const recentInquiries = [
  {
    id: "INQ-047",
    name: "Linda Kraft",
    zip: "61604",
    services: "Horses, Poultry",
    dates: "Apr 12–18",
    status: "Pending Match",
    statusColor: "bg-earth/20 text-earth",
  },
  {
    id: "INQ-046",
    name: "Bob Simmons",
    zip: "61550",
    services: "Goats, Dogs",
    dates: "Apr 5–10",
    status: "Matched",
    statusColor: "bg-sage/20 text-sage",
  },
  {
    id: "INQ-045",
    name: "Amy Chen",
    zip: "62704",
    services: "Cattle",
    dates: "Mar 28–31",
    status: "No Coverage",
    statusColor: "bg-rust/20 text-rust",
  },
  {
    id: "INQ-044",
    name: "Dave Olson",
    zip: "61611",
    services: "Farm Dogs, Plants",
    dates: "Mar 20–25",
    status: "Completed",
    statusColor: "bg-wheat-light text-earth-dark",
  },
  {
    id: "INQ-043",
    name: "Rachel Torres",
    zip: "61571",
    services: "Horses",
    dates: "Mar 14–21",
    status: "Completed",
    statusColor: "bg-wheat-light text-earth-dark",
  },
];

const operatorQueue = [
  {
    name: "Marcus Webb",
    email: "marcus@example.com",
    step: "Background Check",
    stepNum: 1,
    flagged: true,
    flag: "Awaiting Sterling result",
  },
  {
    name: "Tina Barlow",
    email: "tina@example.com",
    step: "Payment",
    stepNum: 3,
    flagged: false,
    flag: "",
  },
  {
    name: "Greg Faulkner",
    email: "greg@example.com",
    step: "Training",
    stepNum: 4,
    flagged: false,
    flag: "",
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    step: "Compliance",
    stepNum: 6,
    flagged: true,
    flag: "Insurance pending review",
  },
  {
    name: "Jake Hensley",
    email: "jake@example.com",
    step: "Credential",
    stepNum: 5,
    flagged: false,
    flag: "",
  },
  {
    name: "Carla Dunn",
    email: "carla@example.com",
    step: "Program Selection",
    stepNum: 2,
    flagged: false,
    flag: "",
  },
];

const backgroundChecks = [
  { name: "Marcus Webb", submitted: "Mar 20", status: "Pending", statusColor: "bg-earth/20 text-earth" },
  { name: "Yolanda Price", submitted: "Mar 18", status: "Passed", statusColor: "bg-sage/20 text-sage" },
  { name: "Derek Snell", submitted: "Mar 15", status: "Failed", statusColor: "bg-rust/20 text-rust" },
  { name: "Carla Dunn", submitted: "Mar 22", status: "Pending", statusColor: "bg-earth/20 text-earth" },
];

const noCoverageZips = [
  { zip: "62704", city: "Springfield", inquiries: 4 },
  { zip: "61401", city: "Galesburg", inquiries: 3 },
  { zip: "61701", city: "Bloomington", inquiries: 3 },
  { zip: "62901", city: "Carbondale", inquiries: 2 },
  { zip: "61832", city: "Danville", inquiries: 1 },
];

export default function AdminPage() {
  return (
    <div className="p-6 md:p-10 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-barn-dark">Admin Overview</h1>
        <p className="text-earth-dark text-sm mt-1">Internal dashboard — not visible to operators or public.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-wheat rounded-xl p-5">
            <div className={`text-3xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-sm font-semibold text-barn-dark mt-1">{m.label}</div>
            <div className="text-xs text-earth-light mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-rust font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-wheat">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-5 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-earth-light font-mono">{inq.id}</span>
                    <span className="font-semibold text-barn-dark text-sm">{inq.name}</span>
                  </div>
                  <div className="text-xs text-earth-dark mt-0.5">
                    {inq.services} · {inq.zip} · {inq.dates}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${inq.statusColor}`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Operator Pipeline */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">Operator Onboarding Pipeline</h2>
            <Link href="/admin/operators" className="text-xs text-rust font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-wheat">
            {operatorQueue.map((op) => (
              <div key={op.email} className="px-5 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-barn-dark text-sm">{op.name}</span>
                    {op.flagged && (
                      <span className="text-xs bg-rust/10 text-rust border border-rust/30 px-1.5 py-0.5 rounded font-semibold">
                        Action Needed
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-earth-dark mt-0.5">
                    Step {op.stepNum}: {op.step}
                    {op.flag && <span className="text-rust ml-2">— {op.flag}</span>}
                  </div>
                </div>
                {/* Step progress dots */}
                <div className="flex gap-1 shrink-0">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className={`w-2 h-2 rounded-full ${
                        n < op.stepNum
                          ? "bg-sage"
                          : n === op.stepNum
                          ? "bg-rust"
                          : "bg-wheat"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Check Queue */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">Background Check Queue</h2>
            <Link href="/admin/background-checks" className="text-xs text-rust font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-wheat">
            {backgroundChecks.map((bc) => (
              <div key={bc.name} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-barn-dark text-sm">{bc.name}</p>
                  <p className="text-xs text-earth-light">Submitted {bc.submitted}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${bc.statusColor}`}>
                  {bc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* No-Coverage ZIP Demand */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">Unmet Demand by ZIP</h2>
            <Link href="/admin/coverage" className="text-xs text-rust font-semibold hover:underline">
              Coverage map →
            </Link>
          </div>
          <div className="p-5">
            <p className="text-xs text-earth-dark mb-4">
              ZIPs with submitted inquiries and no active coverage — prioritize for expansion recruiting.
            </p>
            <div className="space-y-3">
              {noCoverageZips.map((z) => (
                <div key={z.zip} className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm text-barn">{z.zip}</span>
                    <span className="text-sm text-earth-dark ml-2">{z.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 bg-rust/30 rounded-full"
                      style={{ width: `${z.inquiries * 16}px` }}
                    />
                    <span className="text-xs text-earth-dark font-semibold w-12 text-right">
                      {z.inquiries} req.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
