import Link from "next/link";
import Image from "next/image";
import ZipChecker from "@/components/ZipChecker";

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

const trustSignals = [
  { icon: "🔍", label: "Background Checked" },
  { icon: "🛡️", label: "Fully Insured" },
  { icon: "🤝", label: "Meet & Greet Required" },
  { icon: "🐄", label: "Farm-Animal Trained" },
  { icon: "🚨", label: "Emergency Protocol Certified" },
  { icon: "✅", label: "Verified Credential" },
];

const testimonials = [
  {
    quote:
      "Left for 10 days knowing my three horses were in experienced hands. She followed our feeding and turnout schedule exactly — no surprises, no stress.",
    name: "Sarah M.",
    detail: "Horse owner · Pekin, IL",
    tag: "Equine Care",
  },
  {
    quote:
      "We have chickens, goats, and two farm dogs. Finding someone who understood all of them was impossible until The Farm Sitter matched us with exactly the right person.",
    name: "Tom & Karen R.",
    detail: "Hobby farm · Morton, IL",
    tag: "Hobby Farm",
  },
  {
    quote:
      "Our sitter stayed overnight for 5 nights. She sent updates every morning. We felt like we were home the whole time.",
    name: "Jessica L.",
    detail: "Overnight stay · East Peoria, IL",
    tag: "Overnight",
  },
  {
    quote:
      "One of my goats got sick mid-trip. Our sitter followed the emergency protocol, contacted our vet, and kept me informed every step of the way. Incredible.",
    name: "Mike D.",
    detail: "Goat owner · Chillicothe, IL",
    tag: "Emergency",
  },
  {
    quote:
      "200 laying hens. I was skeptical anyone could handle it. She nailed the routine from day one. Egg counts were normal all week.",
    name: "Randy S.",
    detail: "Poultry operation · Washington, IL",
    tag: "Poultry",
  },
  {
    quote:
      "The training and credential process was thorough. I learned things about animal care I didn't know after 10 years of farming. My clients trust me because of the credential.",
    name: "Danielle P.",
    detail: "Credentialed Farm Sitter · Peoria, IL",
    tag: "Farm Sitter",
  },
];

const emergencyCanDo = [
  "Follow your emergency contact and vet protocol",
  "Administer medications per written instructions",
  "Identify and document signs of illness or injury",
  "Reach you or your emergency backup immediately",
  "Document all visits with photos and notes",
  "Secure animals and property in unexpected weather",
];

const emergencyRequiresOwner = [
  "Diagnosis or prescription changes",
  "Major medical procedures or surgery decisions",
  "Any action outside your written care plan",
  "Euthanasia decisions",
];

const escalationSteps = [
  "Contact you (owner) first",
  "Contact your designated emergency backup",
  "Reach your primary veterinarian",
  "Emergency vet clinic if no response within protocol time",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-barn-dark overflow-hidden">
        <Image
          src="/Untitled design.svg"
          alt="Horse on a farm"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark/75 via-barn/60 to-earth-dark/70" />
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

      {/* Trust Strip */}
      <section className="bg-barn border-b border-barn-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustSignals.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-base">{s.icon}</span>
                <span className="text-sm font-medium text-cream/80">{s.label}</span>
              </div>
            ))}
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
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-earth-dark mb-14 max-w-xl mx-auto">
            Two simple paths — one for animal owners, one for aspiring farm sitters.
          </p>

          {/* For Animal Owners */}
          <div className="mb-16">
            <div className="flex items-center gap-3 justify-center mb-8">
              <span className="w-9 h-9 bg-rust text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">A</span>
              <h3 className="text-xl font-bold text-barn">For Animal Owners</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: "📋", step: "1", title: "Tell Us About Your Animals", desc: "Share your animals, property details, and trip dates." },
                { icon: "🔍", step: "2", title: "We Find Your Match", desc: "We connect you with a credentialed sitter in your area." },
                { icon: "🤝", step: "3", title: "Meet Your Sitter", desc: "Walk through your property and care plan together before you leave." },
                { icon: "✈️", step: "4", title: "Travel With Confidence", desc: "Your animals are in expert, trusted hands while you're away." },
              ].map((item, i, arr) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="bg-white border-2 border-rust/20 rounded-2xl p-6 w-full shadow-sm hover:shadow-md hover:border-rust/40 transition-all">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="w-6 h-6 bg-rust text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-barn text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-earth-dark leading-relaxed">{item.desc}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-rust/40 text-2xl">›</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-5xl mx-auto mb-16">
            <div className="flex-1 border-t border-wheat" />
            <span className="text-xs font-semibold text-earth-light uppercase tracking-widest px-2">or</span>
            <div className="flex-1 border-t border-wheat" />
          </div>

          {/* For Farm Sitters */}
          <div>
            <div className="flex items-center gap-3 justify-center mb-8">
              <span className="w-9 h-9 bg-sage text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">B</span>
              <h3 className="text-xl font-bold text-barn">For Farm Sitters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: "📝", step: "1", title: "Apply & Enroll", desc: "Pass pre-screening and enroll in the Training Academy." },
                { icon: "🎓", step: "2", title: "Earn Your Credential", desc: "Complete coursework, testing, and your in-person practical exam." },
                { icon: "👤", step: "3", title: "Set Up Your Profile", desc: "Define your service area, animals you cover, and availability." },
                { icon: "💼", step: "4", title: "Build Your Business", desc: "Start receiving referrals and grow your farm-sitting career." },
              ].map((item, i, arr) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="bg-white border-2 border-sage/20 rounded-2xl p-6 w-full shadow-sm hover:shadow-md hover:border-sage/40 transition-all">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="w-6 h-6 bg-sage text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-barn text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-earth-dark leading-relaxed">{item.desc}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sage/40 text-2xl">›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
            Real Experiences
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark">
            Trusted by Owners Across Central Illinois
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-6 border border-wheat shadow-sm flex flex-col"
            >
              <span className="inline-block mb-4 px-2.5 py-0.5 bg-wheat-light text-barn text-xs font-semibold rounded-full self-start">
                {t.tag}
              </span>
              <p className="text-earth-dark text-sm leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-barn text-sm">{t.name}</p>
                <p className="text-xs text-earth-light">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Map */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
              Where We Operate
            </p>
            <h2 className="text-3xl font-bold text-barn-dark mb-3">
              Growing Across Central Illinois
            </h2>
            <p className="text-earth-dark max-w-xl mx-auto">
              We&rsquo;re building a network of credentialed farm sitters from our roots in Peoria —
              with new coverage areas coming as more operators earn their credentials.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">
            {/* SVG Map */}
            <div className="shrink-0">
              <svg
                viewBox="0 0 210 300"
                width="260"
                height="371"
                className="drop-shadow-md"
                aria-label="Illinois coverage map"
              >
                {/* Illinois state outline */}
                <path
                  d="M 49,6 L 155,6 L 168,10 L 182,18 L 193,28 L 188,52 L 178,78 L 174,110 L 170,132 L 158,158 L 162,182 L 156,210 L 142,238 L 126,254 L 103,274 L 88,260 L 74,240 L 60,218 L 46,196 L 32,172 L 18,148 L 6,138 L 14,118 L 24,96 L 32,72 L 36,52 L 42,30 Z"
                  fill="#e8e0d0"
                  stroke="#c4b89a"
                  strokeWidth="1.5"
                />

                {/* Central Illinois highlight region */}
                <ellipse
                  cx="95"
                  cy="108"
                  rx="38"
                  ry="32"
                  fill="#4a7c3f"
                  fillOpacity="0.18"
                  stroke="#4a7c3f"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />

                {/* Peoria */}
                <circle cx="88" cy="104" r="6" fill="#8b2e00" stroke="white" strokeWidth="1.5" />
                <text x="96" y="108" fontSize="8" fill="#3b1e00" fontWeight="bold">Peoria</text>

                {/* East Peoria */}
                <circle cx="100" cy="108" r="4" fill="#8b2e00" stroke="white" strokeWidth="1.5" />

                {/* Morton */}
                <circle cx="103" cy="115" r="4" fill="#8b2e00" stroke="white" strokeWidth="1.5" />
                <text x="108" y="118" fontSize="7" fill="#3b1e00">Morton</text>

                {/* Washington */}
                <circle cx="108" cy="105" r="4" fill="#8b2e00" stroke="white" strokeWidth="1.5" />

                {/* Chillicothe */}
                <circle cx="88" cy="94" r="4" fill="#8b2e00" stroke="white" strokeWidth="1.5" />
                <text x="93" y="97" fontSize="7" fill="#3b1e00">Chillicothe</text>

                {/* Pekin */}
                <circle cx="90" cy="114" r="4" fill="#8b2e00" stroke="white" strokeWidth="1.5" />
                <text x="78" y="122" fontSize="7" fill="#3b1e00">Pekin</text>

                {/* Expansion dots */}
                <circle cx="118" cy="120" r="4" fill="none" stroke="#8b2e00" strokeWidth="1.5" strokeDasharray="2 1" />
                <text x="123" y="123" fontSize="7" fill="#8b2e00" fillOpacity="0.7">Bloomington</text>

                <circle cx="58" cy="100" r="4" fill="none" stroke="#8b2e00" strokeWidth="1.5" strokeDasharray="2 1" />
                <text x="40" y="97" fontSize="7" fill="#8b2e00" fillOpacity="0.7">Galesburg</text>

                <circle cx="90" cy="146" r="4" fill="none" stroke="#8b2e00" strokeWidth="1.5" strokeDasharray="2 1" />
                <text x="95" y="149" fontSize="7" fill="#8b2e00" fillOpacity="0.7">Springfield</text>

                <text x="105" y="200" fontSize="9" fill="#c4b89a" fontWeight="bold" textAnchor="middle">ILLINOIS</text>
              </svg>
            </div>

            {/* Legend + ZIP checker */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rust shrink-0" />
                  <span className="text-sm font-semibold text-barn">Active Coverage</span>
                  <span className="text-sm text-earth-light">— Credentialed sitters available now</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full border-2 border-rust shrink-0" />
                  <span className="text-sm font-semibold text-barn">Expanding Soon</span>
                  <span className="text-sm text-earth-light">— New operators in training</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-sage/40 border border-sage-dark shrink-0" />
                  <span className="text-sm font-semibold text-barn">Coverage Zone</span>
                  <span className="text-sm text-earth-light">— Peoria Metro region</span>
                </div>
              </div>

              <div className="bg-wheat-light/50 border border-wheat rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-barn-dark">Central Illinois — Current Hub</h3>
                <ul className="text-sm text-earth-dark space-y-1">
                  <li>Peoria · East Peoria · Pekin</li>
                  <li>Morton · Washington · Chillicothe</li>
                </ul>
                <p className="text-xs text-earth-light">
                  Based at Peoria Next Innovation Center and Distillery Labs —
                  two of Central Illinois&rsquo; leading innovation hubs.
                </p>
              </div>

              <ZipChecker />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Readiness */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-rust text-sm font-semibold uppercase tracking-widest mb-2">
            When It Matters Most
          </p>
          <h2 className="text-3xl font-bold text-barn-dark mb-3">
            Every Sitter Has an Emergency Protocol
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Before every assignment, your sitter reviews your written care plan, emergency contacts,
            and veterinarian information. They know exactly what to do — and who to call — if
            something unexpected happens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Can Do */}
          <div className="bg-sage/10 border border-sage/40 rounded-xl p-6">
            <h3 className="font-bold text-barn mb-4 flex items-center gap-2">
              <span className="text-sage text-lg">✓</span> Your Sitter Is Prepared To
            </h3>
            <ul className="space-y-2.5">
              {emergencyCanDo.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-sage font-bold text-sm shrink-0 mt-0.5">✓</span>
                  <span className="text-earth-dark text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requires Owner */}
          <div className="bg-wheat-light/50 border border-wheat rounded-xl p-6">
            <h3 className="font-bold text-barn mb-4 flex items-center gap-2">
              <span className="text-earth text-lg">○</span> Requires Your Decision
            </h3>
            <ul className="space-y-2.5">
              {emergencyRequiresOwner.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-earth-light font-bold text-sm shrink-0 mt-0.5">○</span>
                  <span className="text-earth-dark text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-earth-light mt-4 border-t border-wheat pt-3">
              Your sitter will always reach you before taking any action outside the care plan.
            </p>
          </div>

          {/* Escalation Protocol */}
          <div className="bg-rust/5 border border-rust/20 rounded-xl p-6">
            <h3 className="font-bold text-barn mb-4 flex items-center gap-2">
              <span className="text-rust text-lg">🚨</span> Escalation Order
            </h3>
            <ol className="space-y-3">
              {escalationSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-rust text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-earth-dark text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Free Resources teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-wheat-light/40 border border-wheat rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
              Free for Animal Owners
            </p>
            <h2 className="text-2xl font-bold text-barn-dark mb-3">
              Resource Library — Guides, Checklists & Templates
            </h2>
            <p className="text-earth-dark leading-relaxed">
              Download free farm care guides, daily visit checklists, emergency prep templates, and
              more — no account required. Created by professionals who understand rural and livestock
              care.
            </p>
          </div>
          <Link
            href="/resources"
            className="shrink-0 px-7 py-3 bg-barn text-cream font-semibold rounded-lg hover:bg-barn-light transition-colors"
          >
            Browse Resources →
          </Link>
        </div>
      </section>

      {/* Founding Members */}
      <section className="bg-sage py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                Not in our coverage area yet?
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join Our Founding Members List
              </h2>
              <p className="text-white/75 leading-relaxed mb-4">
                We&rsquo;re growing — and your location shapes where we go next. Founding Members are
                the first people we contact when a credentialed sitter becomes active in their area.
                Free to join. Takes 60 seconds.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  "First notification when coverage arrives",
                  "Your ZIP drives our expansion",
                  "Free resource library access",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-white/80">
                    <span className="text-wheat font-bold">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-center">
              <Link
                href="/founding-members"
                className="inline-block px-8 py-3.5 bg-white text-sage font-bold rounded-lg hover:bg-wheat transition-colors text-base mb-2"
              >
                Join Free →
              </Link>
              <p className="text-white/40 text-xs">
                Or{" "}
                <Link href="/founding-members#vip" className="hover:text-white/70 underline">
                  learn about VIP access
                </Link>
              </p>
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
