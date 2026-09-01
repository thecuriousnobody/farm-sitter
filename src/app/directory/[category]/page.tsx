import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DIRECTORY_CATEGORIES,
  getProvidersByCategory,
  getCategoryById,
  BADGE_CONFIG,
} from "@/lib/directory-data";

export function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const cat = getCategoryById(params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} | Rural Services Directory | The Farm Sitter`,
    description: cat.longDesc,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryById(params.category);
  if (!cat) notFound();

  const providers = getProvidersByCategory(params.category);
  const emergencyProviders = providers.filter((p) => p.emergencyAvailable);

  return (
    <>
      {/* Header */}
      <section className="bg-barn-dark py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/directory"
            className="text-earth-light text-sm hover:text-wheat-light transition-colors mb-4 inline-flex items-center gap-1"
          >
            ← Rural Services Directory
          </Link>
          <div className="flex items-start gap-4 mt-3">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-1">
                Rural Services Directory
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-cream mb-2">{cat.name}</h1>
              <p className="text-cream/70 max-w-2xl leading-relaxed">{cat.longDesc}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {cat.emergencyRelevant && (
                  <span className="text-xs bg-rust/20 text-rust border border-rust/40 px-3 py-1 rounded-full font-semibold">
                    🚨 Emergency listings available
                  </span>
                )}
                <span className="text-xs bg-wheat/20 text-wheat border border-wheat/40 px-3 py-1 rounded-full">
                  {providers.length} {providers.length === 1 ? "listing" : "listings"} in directory
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="bg-white border border-wheat rounded-xl p-5 space-y-6 sticky top-20">
              <div>
                <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">Filter by State</h3>
                <div className="space-y-2">
                  {["IL", "IA", "MO", "IN", "WI"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={s === "IL"} className="accent-rust" />
                      <span className="text-sm text-earth-dark">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {cat.emergencyRelevant && (
                <div>
                  <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">Availability</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-rust" />
                    <span className="text-sm text-earth-dark">Emergency available only</span>
                  </label>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">Badge Level</h3>
                <div className="space-y-2">
                  {(["VERIFIED", "CLAIMED", "LISTED"] as const).map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-rust" />
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${BADGE_CONFIG[b].color}`}>
                        {BADGE_CONFIG[b].label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-wheat">
                <Link
                  href="/directory/claim"
                  className="block text-center text-xs font-semibold text-rust hover:underline"
                >
                  + Add Your Business
                </Link>
              </div>
            </div>
          </aside>

          {/* Provider grid */}
          <div className="flex-1 min-w-0">
            {/* Emergency callout */}
            {cat.emergencyRelevant && emergencyProviders.length > 0 && (
              <div className="mb-8 bg-rust/5 border border-rust/20 rounded-xl p-5">
                <h3 className="font-bold text-barn-dark mb-3 flex items-center gap-2">
                  <span>🚨</span> Emergency-Available Providers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {emergencyProviders.map((p) => (
                    <Link
                      key={p.id}
                      href={`/directory/${cat.id}/${p.slug}`}
                      className="bg-white border border-rust/20 rounded-lg px-4 py-3 hover:border-rust/40 transition-colors"
                    >
                      <p className="font-semibold text-barn text-sm">{p.businessName}</p>
                      <p className="text-xs text-earth-dark mt-0.5">
                        {p.city}, {p.state} &middot; {p.emergencyPhone || p.phone}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {providers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-earth-dark text-lg mb-2">No listings yet in this category.</p>
                <p className="text-earth-light text-sm mb-6">
                  Be the first provider listed in your area.
                </p>
                <Link
                  href="/directory/claim"
                  className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
                >
                  Add Your Business Free
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {providers.map((p) => {
                  const badge = BADGE_CONFIG[p.badge];
                  return (
                    <Link
                      key={p.id}
                      href={`/directory/${cat.id}/${p.slug}`}
                      className="group bg-white rounded-xl border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all p-5 flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <h2 className="font-bold text-barn-dark text-base group-hover:text-rust transition-colors truncate">
                            {p.businessName}
                          </h2>
                          <p className="text-xs text-earth-dark mt-0.5">
                            {p.city}, {p.state} &middot; {p.serviceRadius}
                          </p>
                        </div>
                        <div className="shrink-0 ml-3 flex flex-col items-end gap-1.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                            {badge.label}
                          </span>
                          {p.emergencyAvailable && (
                            <span className="text-xs text-rust font-semibold">🚨 Emergency</span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-earth-dark leading-relaxed line-clamp-2 mb-4 flex-1">
                        {p.description}
                      </p>

                      <div className="space-y-2">
                        {p.speciesServed.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {p.speciesServed.map((s) => (
                              <span key={s} className="text-xs bg-cream px-2 py-0.5 rounded text-earth">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {p.specialties.length > 0 && (
                          <p className="text-xs text-earth-light truncate">
                            {p.specialties.join(" · ")}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-wheat-light">
                          {p.phone && (
                            <span className="text-xs text-earth-dark">{p.phone}</span>
                          )}
                          <span className="text-xs text-rust font-semibold ml-auto">View Profile →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Provider CTA */}
            <div className="mt-10 bg-wheat-light/50 border border-wheat rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-barn-dark">
                  Are you a {cat.name.toLowerCase().replace(/s$/, "")} serving this area?
                </p>
                <p className="text-sm text-earth-dark mt-0.5">
                  Join the founding directory at no cost. Get discovered by horse owners and farmers in your region.
                </p>
              </div>
              <Link
                href="/directory/claim"
                className="shrink-0 px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-sm"
              >
                Get Listed Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="bg-cream-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold text-barn uppercase tracking-wide mb-5">
            Other Categories in the Directory
          </h3>
          <div className="flex flex-wrap gap-3">
            {DIRECTORY_CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
              <Link
                key={c.id}
                href={`/directory/${c.id}`}
                className="flex items-center gap-2 bg-white border border-wheat text-barn text-sm font-medium px-4 py-2 rounded-lg hover:border-earth-light hover:shadow-sm transition-all"
              >
                <span>{c.icon}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
