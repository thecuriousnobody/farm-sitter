import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MOCK_PROVIDERS,
  getCategoryById,
  getProviderBySlug,
  getProvidersByCategory,
  BADGE_CONFIG,
} from "@/lib/directory-data";

export function generateStaticParams() {
  return MOCK_PROVIDERS.map((p) => ({
    category: p.categoryId,
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const provider = getProviderBySlug(params.slug);
  if (!provider) return {};
  return {
    title: `${provider.businessName} | Rural Services Directory | The Farm Sitter`,
    description: provider.description,
  };
}

export default function ProviderProfilePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const provider = getProviderBySlug(params.slug);
  if (!provider || provider.categoryId !== params.category) notFound();

  const cat = getCategoryById(params.category);
  const badge = BADGE_CONFIG[provider.badge];

  // Other providers in this category (exclude current)
  const others = getProvidersByCategory(params.category)
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-wheat-light border-b border-wheat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-earth-light">
            <Link href="/directory" className="hover:text-rust">Directory</Link>
            <span>/</span>
            <Link href={`/directory/${params.category}`} className="hover:text-rust">
              {cat?.name}
            </Link>
            <span>/</span>
            <span className="text-earth-dark">{provider.businessName}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Info sidebar */}
          <aside className="space-y-5">
            {/* Business card */}
            <div className="bg-white border border-wheat rounded-xl p-6 space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-3xl">{cat?.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-barn-dark leading-snug">
                  {provider.businessName}
                </h1>
                <p className="text-sm text-earth-dark mt-1">
                  {cat?.name} &middot; {provider.city}, {provider.state}
                </p>
              </div>

              {provider.emergencyAvailable && (
                <div className="bg-rust/5 border border-rust/20 rounded-lg px-3 py-2">
                  <p className="text-xs font-bold text-rust flex items-center gap-1.5">
                    🚨 Emergency Available
                  </p>
                  {provider.emergencyPhone && (
                    <p className="text-xs text-earth-dark mt-0.5">
                      Emergency line: {provider.emergencyPhone}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2.5 border-t border-wheat pt-4">
                {provider.phone && (
                  <div className="flex items-center gap-3">
                    <span className="text-barn text-lg">📞</span>
                    <a href={`tel:${provider.phone}`} className="text-sm text-earth-dark hover:text-rust transition-colors">
                      {provider.phone}
                    </a>
                  </div>
                )}
                {provider.email && (
                  <div className="flex items-center gap-3">
                    <span className="text-barn text-lg">✉️</span>
                    <a href={`mailto:${provider.email}`} className="text-sm text-rust hover:underline break-all">
                      {provider.email}
                    </a>
                  </div>
                )}
                {provider.website && (
                  <div className="flex items-center gap-3">
                    <span className="text-barn text-lg">🌐</span>
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rust hover:underline break-all"
                    >
                      {provider.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {provider.facebook && (
                  <div className="flex items-center gap-3">
                    <span className="text-barn text-lg">📘</span>
                    <a
                      href={provider.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rust hover:underline"
                    >
                      Facebook Page
                    </a>
                  </div>
                )}
              </div>

              {(provider.phone || provider.email) && (
                <div className="border-t border-wheat pt-4">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="block w-full text-center px-4 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-sm mb-2"
                    >
                      Call {provider.businessName}
                    </a>
                  )}
                  {provider.email && (
                    <a
                      href={`mailto:${provider.email}`}
                      className="block w-full text-center px-4 py-2.5 bg-white border border-wheat text-barn font-semibold rounded-lg hover:bg-wheat-light transition-colors text-sm"
                    >
                      Send Email
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Service area */}
            <div className="bg-white border border-wheat rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-barn uppercase tracking-wide">Service Area</h3>
              <div>
                <p className="text-sm text-earth-dark">
                  📍 {provider.city}, {provider.state} {provider.zip}
                </p>
                <p className="text-sm text-earth-dark mt-1">
                  📡 {provider.serviceRadius}
                </p>
              </div>
            </div>

            {/* Species */}
            <div className="bg-white border border-wheat rounded-xl p-5">
              <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">Species Served</h3>
              <div className="flex flex-wrap gap-1.5">
                {provider.speciesServed.map((s) => (
                  <span key={s} className="text-xs bg-cream border border-wheat-light px-2.5 py-1 rounded-full text-earth-dark">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Insurance / credentials */}
            {(provider.insured || provider.credentials) && (
              <div className="bg-white border border-wheat rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-barn uppercase tracking-wide">Trust Indicators</h3>
                {provider.insured && (
                  <p className="text-sm text-earth-dark flex items-center gap-2">
                    <span className="text-sage">✓</span> Carries liability insurance
                  </p>
                )}
                {provider.credentials && (
                  <p className="text-sm text-earth-dark flex items-start gap-2">
                    <span className="text-sage shrink-0">✓</span>
                    <span>{provider.credentials}</span>
                  </p>
                )}
              </div>
            )}

            {/* Badge explanation */}
            <div className="bg-wheat-light/40 border border-wheat rounded-xl p-5">
              <p className="text-xs font-bold text-barn uppercase tracking-wide mb-2">
                About This Listing
              </p>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                {badge.label}
              </span>
              <p className="text-xs text-earth-dark mt-2 leading-relaxed">{badge.desc}</p>
              <p className="text-xs text-earth-light mt-2">
                Directory inclusion is not an endorsement. Independently evaluate all providers.
              </p>
            </div>
          </aside>

          {/* Right — Main content */}
          <main className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white border border-wheat rounded-xl p-7">
              <h2 className="text-lg font-bold text-barn-dark mb-4">About {provider.businessName}</h2>
              <p className="text-earth-dark leading-relaxed">{provider.description}</p>
            </div>

            {/* Specialties */}
            {provider.specialties.length > 0 && (
              <div className="bg-white border border-wheat rounded-xl p-7">
                <h2 className="text-lg font-bold text-barn-dark mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((s) => (
                    <span key={s} className="text-sm bg-sage/10 border border-sage/30 text-barn px-3 py-1.5 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Category-specific data */}
            {provider.categoryData && Object.keys(provider.categoryData).length > 0 && (
              <div className="bg-white border border-wheat rounded-xl p-7">
                <h2 className="text-lg font-bold text-barn-dark mb-4">Service Details</h2>
                <dl className="space-y-3">
                  {Object.entries(provider.categoryData).map(([key, val]) => {
                    if (typeof val === "boolean") return null; // skip pure booleans in detail view
                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())
                      .trim();
                    return (
                      <div key={key} className="flex gap-4">
                        <dt className="text-sm font-semibold text-barn w-40 shrink-0">{label}</dt>
                        <dd className="text-sm text-earth-dark">{String(val)}</dd>
                      </div>
                    );
                  })}
                  {/* Boolean indicators */}
                  {typeof provider.categoryData.deliveryAvailable === "boolean" && (
                    <div className="flex gap-4">
                      <dt className="text-sm font-semibold text-barn w-40 shrink-0">Delivery</dt>
                      <dd className="text-sm text-earth-dark">
                        {provider.categoryData.deliveryAvailable ? "✓ Available" : "Not available"}
                      </dd>
                    </div>
                  )}
                  {typeof provider.categoryData.pickupAvailable === "boolean" && (
                    <div className="flex gap-4">
                      <dt className="text-sm font-semibold text-barn w-40 shrink-0">Pickup</dt>
                      <dd className="text-sm text-earth-dark">
                        {provider.categoryData.pickupAvailable ? "✓ Available" : "Not available"}
                      </dd>
                    </div>
                  )}
                  {typeof provider.categoryData.mobile === "boolean" && (
                    <div className="flex gap-4">
                      <dt className="text-sm font-semibold text-barn w-40 shrink-0">Mobile Service</dt>
                      <dd className="text-sm text-earth-dark">
                        {provider.categoryData.mobile ? "✓ Comes to you" : "No"}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Claim / correction prompt */}
            <div className="bg-wheat-light/40 border border-wheat rounded-xl p-6">
              <p className="text-sm font-semibold text-barn mb-1">
                {provider.badge === "LISTED"
                  ? "Is this your business?"
                  : "Information out of date?"}
              </p>
              <p className="text-sm text-earth-dark mb-3">
                {provider.badge === "LISTED"
                  ? "Claim this listing to update your profile, add photos, and control how you appear to animal owners."
                  : "Submit a correction or update your profile information to keep your listing current."}
              </p>
              <Link
                href={`/directory/claim?slug=${provider.slug}&name=${encodeURIComponent(provider.businessName)}`}
                className="text-sm text-rust font-semibold hover:underline"
              >
                {provider.badge === "LISTED" ? "Claim this listing →" : "Update this listing →"}
              </Link>
            </div>
          </main>
        </div>

        {/* Other providers in category */}
        {others.length > 0 && (
          <div className="mt-16 pt-10 border-t border-wheat">
            <h3 className="font-bold text-barn-dark mb-6">
              Other {cat?.name} in the Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {others.map((p) => {
                const b = BADGE_CONFIG[p.badge];
                return (
                  <Link
                    key={p.id}
                    href={`/directory/${cat?.id}/${p.slug}`}
                    className="group bg-white border border-wheat rounded-xl p-5 hover:shadow-sm hover:border-earth-light transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-barn text-sm group-hover:text-rust transition-colors">
                        {p.businessName}
                      </h4>
                      <span className={`shrink-0 ml-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${b.color}`}>
                        {b.label}
                      </span>
                    </div>
                    <p className="text-xs text-earth-dark">
                      {p.city}, {p.state} &middot; {p.serviceRadius}
                    </p>
                    <p className="text-xs text-earth-dark mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-5">
              <Link
                href={`/directory/${params.category}`}
                className="text-sm text-rust font-semibold hover:underline"
              >
                View all {cat?.name} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
