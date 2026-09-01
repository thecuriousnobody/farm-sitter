import Link from "next/link";
import {
  MOCK_PROVIDERS,
  DIRECTORY_CATEGORIES,
  BADGE_CONFIG,
  type DirectoryBadge,
} from "@/lib/directory-data";

const badgeCounts = (MOCK_PROVIDERS.reduce(
  (acc, p) => { acc[p.badge] = (acc[p.badge] || 0) + 1; return acc; },
  {} as Record<DirectoryBadge, number>
));

const categoryCounts = DIRECTORY_CATEGORIES.map((cat) => ({
  ...cat,
  count: MOCK_PROVIDERS.filter((p) => p.categoryId === cat.id).length,
  verified: MOCK_PROVIDERS.filter((p) => p.categoryId === cat.id && p.badge === "VERIFIED").length,
}));

// Mock claim submissions
const mockClaims = [
  { id: "CLM-001", businessName: "Hill Top Farrier", contactName: "Jake Morrow", email: "jake@hilltop.com", category: "farriers", city: "Galesburg", state: "IL", submitted: "Mar 21", status: "PENDING" },
  { id: "CLM-002", businessName: "Tri-County Livestock Hauling", contactName: "Rachel Burns", email: "rachel@tricounty.com", category: "livestock-transport", city: "Springfield", state: "IL", submitted: "Mar 22", status: "PENDING" },
  { id: "CLM-003", businessName: "Prairie Hoof Works", contactName: "Ben Kessler", email: "ben@prairiehoof.com", category: "farriers", city: "Peoria", state: "IL", submitted: "Mar 18", status: "APPROVED" },
  { id: "CLM-004", businessName: "Sunrise Equine Dental", contactName: "Amy Park", email: "amy@sunrisedental.com", category: "equine-dentists", city: "Bloomington", state: "IL", submitted: "Mar 19", status: "APPROVED" },
];

export default function AdminDirectoryPage() {
  const totalListings = MOCK_PROVIDERS.length;
  const featured = MOCK_PROVIDERS.filter((p) => p.featured).length;
  const emergencyEnabled = MOCK_PROVIDERS.filter((p) => p.emergencyAvailable).length;
  const pendingClaims = mockClaims.filter((c) => c.status === "PENDING").length;

  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-barn-dark">Rural Services Directory</h1>
          <p className="text-earth-dark text-sm mt-1">Manage listings, claim requests, and badge status.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/directory"
            target="_blank"
            className="px-4 py-2 bg-white border border-wheat text-barn text-sm font-semibold rounded-lg hover:bg-wheat-light transition-colors"
          >
            View Directory ↗
          </Link>
          <button className="px-4 py-2 bg-rust text-white text-sm font-semibold rounded-lg hover:bg-rust-light transition-colors">
            + Add Listing
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Listings", value: totalListings, color: "text-barn" },
          { label: "Verified", value: badgeCounts["VERIFIED"] || 0, color: "text-rust" },
          { label: "Claimed", value: badgeCounts["CLAIMED"] || 0, color: "text-sage" },
          { label: "Listed", value: badgeCounts["LISTED"] || 0, color: "text-earth" },
          { label: "Pending Claims", value: pendingClaims, color: "text-earth" },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-wheat rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-earth-dark mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Listings by Category */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat">
            <h2 className="font-bold text-barn-dark">Listings by Category</h2>
          </div>
          <div className="divide-y divide-wheat">
            {categoryCounts.map((cat) => (
              <div key={cat.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>{cat.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-barn-dark">{cat.name}</p>
                    <p className="text-xs text-earth-light">{cat.verified} verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(cat.count, 5) }).map((_, i) => (
                      <div key={i} className="w-2 h-4 bg-barn/30 rounded-sm" />
                    ))}
                    {Array.from({ length: Math.max(5 - cat.count, 0) }).map((_, i) => (
                      <div key={i} className="w-2 h-4 bg-wheat rounded-sm" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-barn w-4 text-right">{cat.count}</span>
                  <Link
                    href={`/directory/${cat.id}`}
                    target="_blank"
                    className="text-xs text-rust hover:underline shrink-0"
                  >
                    View ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Submissions Queue */}
        <div className="bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">Claim Submissions</h2>
            {pendingClaims > 0 && (
              <span className="text-xs bg-rust/10 text-rust border border-rust/30 px-2 py-0.5 rounded-full font-semibold">
                {pendingClaims} pending
              </span>
            )}
          </div>
          <div className="divide-y divide-wheat">
            {mockClaims.map((claim) => {
              const cat = DIRECTORY_CATEGORIES.find((c) => c.id === claim.category);
              const isPending = claim.status === "PENDING";
              return (
                <div key={claim.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-earth-light">{claim.id}</span>
                        {isPending && (
                          <span className="text-xs bg-earth/20 text-earth font-semibold px-2 py-0.5 rounded-full">
                            Pending Review
                          </span>
                        )}
                        {!isPending && (
                          <span className="text-xs bg-sage/20 text-sage font-semibold px-2 py-0.5 rounded-full">
                            Approved
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-barn-dark text-sm mt-0.5">{claim.businessName}</p>
                      <p className="text-xs text-earth-dark">
                        {cat?.icon} {cat?.name} &middot; {claim.city}, {claim.state}
                      </p>
                      <p className="text-xs text-earth-light mt-0.5">
                        {claim.contactName} &middot; {claim.email} &middot; Submitted {claim.submitted}
                      </p>
                    </div>
                  </div>
                  {isPending && (
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1.5 bg-sage text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-wheat text-earth text-xs font-semibold rounded-lg hover:bg-wheat-light transition-colors">
                        Review Info
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-rust/30 text-rust text-xs font-semibold rounded-lg hover:bg-rust/5 transition-colors">
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* All Listings Table */}
        <div className="xl:col-span-2 bg-white border border-wheat rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-wheat flex items-center justify-between">
            <h2 className="font-bold text-barn-dark">All Listings</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-earth-light">{totalListings} total</span>
              <button className="text-xs text-rust font-semibold hover:underline">Export CSV</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Business</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Category</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Location</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Badge</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Emergency</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Featured</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-earth-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wheat-light">
                {MOCK_PROVIDERS.map((p) => {
                  const badge = BADGE_CONFIG[p.badge];
                  const cat = DIRECTORY_CATEGORIES.find((c) => c.id === p.categoryId);
                  return (
                    <tr key={p.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-barn-dark">{p.businessName}</p>
                        <p className="text-xs text-earth-light font-mono">{p.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-earth-dark">{cat?.icon} {cat?.name}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-earth-dark">
                        {p.city}, {p.state}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.emergencyAvailable ? (
                          <span className="text-rust text-sm">🚨</span>
                        ) : (
                          <span className="text-earth-light text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.featured ? (
                          <span className="text-wheat text-sm">⭐</span>
                        ) : (
                          <span className="text-earth-light text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/directory/${p.categoryId}/${p.slug}`}
                            target="_blank"
                            className="text-xs text-rust hover:underline"
                          >
                            View
                          </Link>
                          <button className="text-xs text-earth hover:text-barn transition-colors">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
