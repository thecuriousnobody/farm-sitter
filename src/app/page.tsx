import Link from "next/link";

const animalCards = [
  {
    icon: "🐴",
    title: "Horses & Equine",
    desc: "Stall cleaning, turnout, blanketing, feeding, and routine handling by experienced professionals.",
  },
  {
    icon: "🐐",
    title: "Goats, Sheep & Llamas",
    desc: "Herd management, feeding schedules, health checks, and secure enclosure monitoring.",
  },
  {
    icon: "🐔",
    title: "Poultry & Fowl",
    desc: "Egg collection, coop management, predator protection, and flock health observation.",
  },
  {
    icon: "🐄",
    title: "Cattle & Livestock",
    desc: "Feeding, water systems, pasture rotation, and daily welfare checks for large animals.",
  },
  {
    icon: "🐕",
    title: "Farm Dogs & Cats",
    desc: "Companion animal care alongside your livestock — feeding, meds, and plenty of love.",
  },
  {
    icon: "🐇",
    title: "Small & Specialty Animals",
    desc: "Rabbits, ducks, miniatures, exotics — whatever calls your property home.",
  },
];

const stats = [
  { value: "4-Tier", label: "Care System" },
  { value: "Certified", label: "Professionals" },
  { value: "Nationwide", label: "Coverage" },
  { value: "24/7", label: "Peace of Mind" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-barn-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark via-barn to-earth-dark opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-4">
              Professional Farm &amp; Livestock Care
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-cream leading-tight mb-6">
              Your animals deserve{" "}
              <span className="text-wheat">the best care</span> while
              you&rsquo;re away
            </h1>
            <p className="text-lg text-cream/70 leading-relaxed mb-8 max-w-2xl">
              The Farm Sitter trains, credentials, and connects independent
              farm-sitting professionals with animal owners who need trusted,
              qualified care for their horses, livestock, and property.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/find-a-sitter"
                className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-lg"
              >
                Find a Sitter
              </Link>
              <Link
                href="/become-a-sitter"
                className="px-8 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors text-lg"
              >
                Become a Sitter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-wheat-light border-y border-wheat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-barn">{s.value}</div>
                <div className="text-sm text-earth-dark">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            Care for Every Animal on Your Property
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            From a small hobby farm to a working ranch, our credentialed sitters
            are trained to handle the full spectrum of rural animal care.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animalCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-6 border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="text-lg font-bold text-barn mb-2">{card.title}</h3>
              <p className="text-sm text-earth-dark leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark text-center mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Owners */}
            <div>
              <h3 className="text-xl font-bold text-barn mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-rust text-white rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </span>
                For Animal Owners
              </h3>
              <ol className="space-y-4">
                {[
                  "Tell us about your animals, property, and trip dates",
                  "We match you with a credentialed sitter in your area",
                  "Meet your sitter for a walkthrough before your trip",
                  "Travel with confidence — your animals are in expert hands",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 bg-earth text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-earth-dark">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            {/* For Sitters */}
            <div>
              <h3 className="text-xl font-bold text-barn mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-sage text-white rounded-full flex items-center justify-center text-sm font-bold">
                  B
                </span>
                For Farm Sitters
              </h3>
              <ol className="space-y-4">
                {[
                  "Apply and enroll in our Training Academy",
                  "Complete coursework, testing, and earn your credential",
                  "Set up your profile — service area, animals, availability",
                  "Start receiving referrals and build your business",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 bg-sage text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-earth-dark">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-barn py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto">
            Whether you need a sitter for your animals or want to build a
            farm-sitting career, we&rsquo;re here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/find-a-sitter"
              className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
            >
              Find a Sitter
            </Link>
            <Link
              href="/become-a-sitter"
              className="px-8 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors"
            >
              Start Your Career
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
