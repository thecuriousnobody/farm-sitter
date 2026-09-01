import Link from "next/link";
import {
  DIRECTORY_CATEGORIES,
  FUTURE_CATEGORIES,
  getFeaturedProviders,
  getProviderCount,
  BADGE_CONFIG,
} from "@/lib/directory-data";

export const metadata = {
  title: "Rural Services Directory | The Farm Sitter",
  description:
    "Find trusted farriers, equine vets, equine dentists, bodyworkers, livestock haulers, and feed suppliers near you. A curated directory for the rural and equine community.",
};

export default function DirectoryPage() {
  const featured = getFeaturedProviders();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-barn-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark via-barn to-earth-dark opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-4">
              The Farm Sitter &mdash; Rural Services Directory
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-5">
              Find Trusted{" "}
              <span className="text-wheat">Rural &amp; Equine Services</span>{" "}
              Near You
            </h1>
            <p className="text-lg text-cream/70 leading-relaxed mb-8 max-w-2xl">
              A curated directory of farriers, equine veterinarians, dentists, bodyworkers,
              livestock haulers, and feed suppliers serving the rural and equine community.
              Browse by category — find local support before, during, or after your travels.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#categories"
                className="px-7 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
              >
                Browse the Directory
              </a>
              <Link
                href="/directory/claim"
                className="px-7 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors"
              >
                Add Your Business — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-wheat-light border-b border-wheat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🔍", title: "Browse by Category", desc: "Find farriers, vets, haulers, and more organized by service type." },
              { icon: "📍", title: "Filter by Region", desc: "Narrow results by state, ZIP code, or search radius — local discovery built in." },
              { icon: "📞", title: "Connect Directly", desc: "Contact providers straight from their listing. No middleman, no booking fee." },
            ].map((s) => (
              <div key={s.title} className="flex flex-col items-center">
                <span className="text-3xl mb-3">{s.icon}</span>
                <h3 className="font-bold text-barn mb-1">{s.title}</h3>
                <p className="text-sm text-earth-dark leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
            Browse by Service Type
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            Six Categories at Launch
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Focused on the services rural and equine owners need most. More categories expanding as the directory grows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIRECTORY_CATEGORIES.map((cat) => {
            const count = getProviderCount(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/directory/${cat.id}`}
                className="group bg-white rounded-xl border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <div className="flex items-center gap-2">
                    {cat.emergencyRelevant && (
                      <span className="text-xs bg-rust/10 text-rust border border-rust/30 px-2 py-0.5 rounded-full font-semibold">
                        Emergency
                      </span>
                    )}
                    <span className="text-xs text-earth-light bg-cream px-2 py-0.5 rounded-full">
                      {count} {count === 1 ? "listing" : "listings"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-barn mb-2 group-hover:text-rust transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-earth-dark leading-relaxed flex-1">{cat.shortDesc}</p>
                <div className="mt-4 text-sm font-semibold text-rust group-hover:underline">
                  Browse {cat.name} →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
              Highlighted Listings
            </p>
            <h2 className="text-3xl font-bold text-barn-dark">
              Featured Providers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((p) => {
              const badge = BADGE_CONFIG[p.badge];
              const cat = DIRECTORY_CATEGORIES.find((c) => c.id === p.categoryId);
              return (
                <Link
                  key={p.id}
                  href={`/directory/${p.categoryId}/${p.slug}`}
                  className="group bg-white rounded-xl border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-earth-light mb-1">
                        {cat?.icon} {cat?.name}
                      </p>
                      <h3 className="font-bold text-barn group-hover:text-rust transition-colors">
                        {p.businessName}
                      </h3>
                      <p className="text-xs text-earth-dark mt-0.5">
                        {p.city}, {p.state} &middot; {p.serviceRadius}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-sm text-earth-dark leading-relaxed line-clamp-2 flex-1 mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.speciesServed.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs bg-cream px-2 py-0.5 rounded text-earth">
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.emergencyAvailable && (
                    <span className="inline-flex items-center gap-1 text-xs text-rust font-semibold">
                      🚨 Emergency available
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Badge System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-barn-dark mb-3">
              Understanding Listing Status
            </h2>
            <p className="text-earth-dark text-sm max-w-xl mx-auto">
              Every listing displays a status badge so you know how the information was collected and verified.
              Directory inclusion does not equal endorsement. Always evaluate providers independently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.entries(BADGE_CONFIG) as [keyof typeof BADGE_CONFIG, typeof BADGE_CONFIG[keyof typeof BADGE_CONFIG]][]).map(([key, cfg]) => (
              <div key={key} className="bg-white border border-wheat rounded-xl p-5">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${cfg.color}`}>
                  {cfg.label}
                </span>
                <p className="text-sm text-earth-dark leading-relaxed">{cfg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Categories */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-barn-dark mb-2">More Categories Coming</h2>
            <p className="text-earth-dark text-sm">
              The directory expands as our network grows. Here&rsquo;s what&rsquo;s planned next.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {FUTURE_CATEGORIES.map((cat) => (
              <span key={cat} className="text-xs bg-white border border-wheat text-earth px-3 py-1.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-barn py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">
            Serve the Rural Community?
          </h2>
          <p className="text-cream/70 mb-3 max-w-2xl mx-auto leading-relaxed">
            Get listed in the Rural Services Directory at no cost during our founding phase.
            Horse owners, farmers, and rural families in your area are looking for exactly
            what you offer.
          </p>
          <p className="text-wheat/70 text-sm mb-8">
            Free to join &middot; No long-term commitment &middot; Optional upgrades later
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/directory/claim"
              className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
            >
              Claim or Add Your Free Listing
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors"
            >
              Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-earth-light leading-relaxed">
          The Farm Sitter Rural Services Directory is provided for informational purposes only.
          Inclusion in this directory does not constitute endorsement or recommendation of any provider.
          Badge status (Listed, Claimed, Verified) indicates listing origin and review level, not a guarantee of
          performance, quality, or safety. Users are encouraged to independently evaluate all providers before
          engaging services.
        </p>
      </section>
    </>
  );
}
