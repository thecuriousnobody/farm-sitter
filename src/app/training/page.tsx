import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "72M+", label: "Hobby Farms in the U.S." },
  { value: "$3.8B", label: "Addressable Market" },
  { value: "40+", label: "Training Modules" },
  { value: "$0", label: "Royalties Ever" },
];

const valuePillars = [
  {
    title: "Positive Attitude & Grace",
    desc: "Approach every visit with care, warmth, and genuine love for the animals in your charge. Your attitude sets the tone.",
  },
  {
    title: "Trust Above All",
    desc: "People let you into their homes, their barns, their lives. You earn that trust every single day — and it's worth protecting.",
  },
  {
    title: "Entrepreneurial Spirit",
    desc: "You own your business, set your prices, and build your reputation. We give you the tools and the credential to back it up.",
  },
  {
    title: "Community First",
    desc: "Neighbor helping neighbor. That's the backbone of rural America and the heart of what we do.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Enroll & Begin",
    desc: "Pay once, get lifetime access. Start the self-paced digital curriculum immediately after enrollment.",
  },
  {
    step: "02",
    title: "Learn, Quiz & Build",
    desc: "Work through 4 tracks of video lessons, ebooks, quizzes, and reflections. Build your business plan as you go.",
  },
  {
    step: "03",
    title: "Practical Exam, Credential & Launch",
    desc: "Complete an in-person, on-farm practical assessment in the Greater Peoria area. Pass to receive your official Farm Sitter credential and launch your business.",
  },
];

const curriculum = [
  {
    track: "Track 1",
    title: "Animal Care",
    color: "bg-sage",
    moduleCount: "12 Modules · Video + Written · Assumes prior animal experience",
    modules: [
      { num: "1.1",  title: "Professional Care Standards for Hobby Farm Animals", format: "VIDEO" },
      { num: "1.2",  title: "Horse Care: Professional Protocols & Client Standards", format: "VIDEO" },
      { num: "1.3",  title: "Goat & Pig Care Essentials",                 format: "VIDEO" },
      { num: "1.4",  title: "Poultry: Chickens, Ducks & More",            format: "VIDEO" },
      { num: "1.5",  title: "Feeding Schedules & Nutrition",              format: "EBOOK" },
      { num: "1.6",  title: "Animal Health & Emergency Response",         format: "VIDEO" },
      { num: "1.7",  title: "Farm Chores: Fencing & Maintenance",         format: "VIDEO" },
      { num: "1.8",  title: "Seasonal Care: Heat, Cold & Weather",        format: "EBOOK" },
      { num: "1.9",  title: "Safe Handling & Animal Psychology",          format: "VIDEO" },
      { num: "1.10", title: "Record Keeping for Animal Care",             format: "EBOOK" },
      { num: "1.11", title: "Dogs, Cats & Companion Animals on the Farm", format: "VIDEO" },
      { num: "1.12", title: "Specialty Species: Pigs, Alpacas & Exotics", format: "VIDEO" },
    ],
  },
  {
    track: "Track 2",
    title: "Business Foundations",
    color: "bg-earth",
    moduleCount: "18 Modules · Video + Worksheets",
    modules: [
      { num: "2.1",  title: "Company Formation & Legal Structures",          format: "VIDEO" },
      { num: "2.2",  title: "Basic Accounting for Small Business",           format: "EBOOK" },
      { num: "2.3",  title: "Pricing Strategies That Win Business",          format: "VIDEO" },
      { num: "2.4",  title: "Contracts, Liability & Insurance",              format: "EBOOK" },
      { num: "2.5",  title: "Marketing Your Farm Sitting Business",          format: "VIDEO" },
      { num: "2.6",  title: "Social Media for Rural Entrepreneurs",          format: "VIDEO" },
      { num: "2.7",  title: "Customer Service & Client Relationships",       format: "VIDEO" },
      { num: "2.8",  title: "Conflict Resolution & Hard Conversations",      format: "VIDEO" },
      { num: "2.9",  title: "Scaling: Hiring & Growing Your Team",           format: "EBOOK" },
      { num: "2.10", title: "Cashflow, Taxes & Financial Planning",          format: "VIDEO" },
      { num: "2.11", title: "Building Your Online Presence & Website",       format: "VIDEO" },
      { num: "2.12", title: "Client Retention & Referral Programs",          format: "VIDEO" },
      { num: "2.13", title: "Handling Emergencies & Business Continuity",    format: "EBOOK" },
      { num: "2.14", title: "Setting Boundaries & Managing Scope Creep",     format: "VIDEO" },
      { num: "2.15", title: "Networking with Vets, Feed Stores & Community", format: "VIDEO" },
      { num: "2.16", title: "Building a Local Reputation",                   format: "EBOOK" },
      { num: "2.17", title: "Business Planning & Goal Setting",              format: "VIDEO" },
      { num: "2.18", title: "Business Foundations Final Review",             format: "REFLECTION" },
    ],
  },
  {
    track: "Track 3",
    title: "Leadership & Character",
    color: "bg-barn",
    moduleCount: "8 Modules · Video + Reflection",
    modules: [
      { num: "3.1", title: "What It Means to Lead",                   format: "VIDEO" },
      { num: "3.2", title: "Building a Reputation Worth Keeping",     format: "VIDEO" },
      { num: "3.3", title: "Resilience, Grace & Showing Up for Others",  format: "VIDEO" },
      { num: "3.4", title: "Values-Based Leadership in Business",     format: "EBOOK" },
      { num: "3.5", title: "Servant Leadership in Your Community",    format: "VIDEO" },
      { num: "3.6", title: "Decision Making Under Pressure",          format: "VIDEO" },
      { num: "3.7", title: "Mentorship: Paying It Forward",           format: "VIDEO" },
      { num: "3.8", title: "Building Your Legacy",                    format: "REFLECTION" },
    ],
  },
  {
    track: "Track 4",
    title: "Final Certification",
    color: "bg-rust",
    moduleCount: "Exam + Verification + Launch",
    modules: [
      { num: "4.1", title: "Certification Exam Prep Guide",         format: "EBOOK" },
      { num: "4.2", title: "Practice Exam: Animal Care",            format: "QUIZ" },
      { num: "4.3", title: "Practice Exam: Business Fundamentals",  format: "QUIZ" },
      { num: "4.4", title: "Practice Exam: Leadership & Ethics",    format: "QUIZ" },
      { num: "★",   title: "Final Certification Exam",              format: "EXAM" },
      { num: "4.5", title: "Certificate Issuance & Directory Listing", format: "STEP" },
      { num: "4.6", title: "Business Launch Day — Go Time",         format: "VIDEO" },
    ],
  },
];

const resources = [
  { title: "Client Welcome Packet", type: "Template", format: "PDF" },
  { title: "Service Agreement", type: "Legal", format: "DOCX" },
  { title: "Pricing Calculator", type: "Tool", format: "XLSX" },
  { title: "Social Media Kit", type: "Marketing", format: "ZIP" },
  { title: "Emergency Checklist", type: "Operations", format: "PDF" },
  { title: "Visit Log", type: "Operations", format: "PDF" },
  { title: "LLC Guide", type: "Legal", format: "PDF" },
  { title: "Referral Cards", type: "Marketing", format: "PDF" },
  { title: "Tax Prep", type: "Finance", format: "XLSX" },
  { title: "Google Business Guide", type: "Marketing", format: "PDF" },
  { title: "Conflict Resolution Scripts", type: "Operations", format: "PDF" },
  { title: "Client Intake Form", type: "Template", format: "PDF" },
];

const certBenefits = [
  {
    title: "Directory Listing",
    desc: "Get listed in our national Certified Farm Sitter directory so animal owners in your area can find you.",
  },
  {
    title: "Trust Badge",
    desc: "Display the Certified Farm Sitter badge on your website, social media, and marketing materials.",
  },
  {
    title: "Business-in-a-Box",
    desc: "Launch with professional templates, contracts, pricing tools, and marketing assets from day one.",
  },
  {
    title: "Graduate Network",
    desc: "Join a private community of certified graduates to share advice, referrals, and support.",
  },
];

const testimonials = [
  {
    quote:
      "I went from zero experience to running a fully booked farm-sitting business in under 90 days. The Academy gave me everything I needed.",
    name: "Sarah M.",
    location: "Carbondale, IL",
  },
  {
    quote:
      "The curriculum is no joke. It's thorough, practical, and built by people who actually know farm life. Best investment I've made.",
    name: "Jake T.",
    location: "Terre Haute, IN",
  },
  {
    quote:
      "At 58 I thought starting over would be impossible. The Farm Sitter Academy proved me wrong. I have a career I love and clients who trust me.",
    name: "Donna R.",
    location: "Galesburg, IL",
  },
];

/* ------------------------------------------------------------------ */
/*  FORMAT TAG COLORS                                                  */
/* ------------------------------------------------------------------ */

function formatTagColor(format: string) {
  switch (format) {
    case "VIDEO":
      return "bg-sky/20 text-sky";
    case "EBOOK":
      return "bg-earth-light/30 text-earth-dark";
    case "QUIZ":
      return "bg-wheat text-barn";
    case "EXAM":
      return "bg-rust/15 text-rust";
    case "REFLECTION":
      return "bg-sage-light/40 text-sage-dark";
    case "STEP":
      return "bg-barn-light/15 text-barn";
    default:
      return "bg-wheat-light text-earth-dark";
  }
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function TrainingPage() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-barn-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark via-barn to-earth-dark opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-4">
              Professional Certification Program
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-cream leading-tight mb-4">
              The Farm Sitter{" "}
              <span className="text-wheat">Academy</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-wheat-light mb-6">
              Care, Character &amp; Community.
            </p>
            <p className="text-lg text-cream/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              The first comprehensive certification program for
              independent farm-sitting professionals. Learn the skills,
              build the business, earn the credential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/become-a-sitter"
                className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-lg"
              >
                Enroll Now &mdash; From $3,500
              </Link>
              <a
                href="#curriculum"
                className="px-8 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors text-lg"
              >
                Explore the Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Bar ─────────────────────────────────────────── */}
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

      {/* ── 3. Mission ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-4">
            Neighbor helping neighbor.
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto text-lg leading-relaxed">
            Farm sitting has always existed. A neighbor feeds the chickens while
            you&rsquo;re at a funeral. A friend checks on the horses when you take
            the kids to the state fair. We&rsquo;re turning that tradition into a
            real career path &mdash; with training, standards, and the tools to
            build a business you&rsquo;re proud of.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-xl p-6 border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all"
            >
              <h3 className="text-lg font-bold text-barn mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-earth-dark leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. How It Works ──────────────────────────────────────── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark text-center mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-8 border border-wheat shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-barn text-cream rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-barn mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-earth-dark leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Full Curriculum ───────────────────────────────────── */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            Full Curriculum
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Four tracks. 34 modules. Everything you need to go from beginner to
            Certified Farm Sitter.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {curriculum.map((track) => (
            <div
              key={track.track}
              className="bg-white rounded-xl border border-wheat shadow-sm overflow-hidden"
            >
              <div className={`${track.color} px-6 py-4`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  {track.track}
                </p>
                <h3 className="text-lg font-bold text-white">{track.title}</h3>
              </div>
              <ul className="divide-y divide-wheat-light">
                {track.modules.map((mod) => (
                  <li
                    key={mod.num}
                    className="px-6 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-semibold text-earth-dark shrink-0">
                        {mod.num}
                      </span>
                      <span className="text-sm text-barn-dark truncate">
                        {mod.title}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${formatTagColor(
                        mod.format
                      )}`}
                    >
                      {mod.format}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Resource Center Preview ───────────────────────────── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
              Resource Center
            </h2>
            <p className="text-earth-dark max-w-2xl mx-auto">
              Every graduate gets access to professional templates, tools, and
              guides to run their business from day one.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.map((r) => (
              <div
                key={r.title}
                className="bg-white rounded-lg p-5 border border-wheat shadow-sm"
              >
                <h3 className="font-bold text-barn text-sm mb-2">{r.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-wheat-light text-earth-dark px-2 py-0.5 rounded-full">
                    {r.type}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-sky/15 text-sky px-2 py-0.5 rounded-full">
                    {r.format}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Pricing ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            Choose Your Program
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            One investment. No royalties. No franchise fees. You keep 100% of what you earn.
            Pay in full or monthly through Affirm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
          {/* Coursework Only */}
          <div className="bg-white rounded-xl border border-wheat shadow-sm overflow-hidden flex flex-col">
            <div className="bg-sage px-6 py-5 text-center">
              <h3 className="text-lg font-bold text-white">Coursework Only</h3>
              <p className="text-3xl font-bold text-white mt-1">$3,500</p>
              <p className="text-sm text-white/60">One-time · self-paced</p>
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {[
                "Full access to all 4 curriculum tracks",
                "40+ video lessons, ebooks & quizzes",
                "Business-in-a-Box resource library",
                "Certificate of completion",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-earth-dark">
                  <span className="text-sage font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
              {[
                "Certification credential or badge",
                "Referral directory eligibility",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-earth-light">
                  <span className="mt-0.5 shrink-0">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Link
                href="/become-a-sitter"
                className="block w-full text-center px-6 py-3 bg-sage text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Enroll in Coursework
              </Link>
            </div>
          </div>

          {/* Coursework + Certification */}
          <div className="bg-white rounded-xl border-2 border-barn shadow-md overflow-hidden flex flex-col relative">
            <div className="bg-barn text-white text-xs font-bold text-center py-1.5 tracking-wide uppercase">
              Most Popular
            </div>
            <div className="bg-barn px-6 py-5 text-center">
              <h3 className="text-lg font-bold text-cream">Coursework + Certification</h3>
              <p className="text-3xl font-bold text-wheat mt-1">$4,999</p>
              <p className="text-sm text-cream/60">One-time · earn your credential</p>
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {[
                "Everything in Coursework",
                "Online certification assessment",
                "Official Farm Sitter credential",
                "Verified digital badge",
                "Referral directory eligibility",
                "Monthly subscription access",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-earth-dark">
                  <span className="text-sage font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Link
                href="/become-a-sitter"
                className="block w-full text-center px-6 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
              >
                Get Credentialed
              </Link>
            </div>
          </div>

          {/* Business Formation */}
          <div className="bg-white rounded-xl border border-wheat shadow-sm overflow-hidden flex flex-col">
            <div className="bg-rust px-6 py-5 text-center">
              <h3 className="text-lg font-bold text-white">+ Business Formation</h3>
              <p className="text-3xl font-bold text-white mt-1">$8,999</p>
              <p className="text-sm text-white/60">One-time · launch ready</p>
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {[
                "Everything in Coursework + Certification",
                "Business entity formation included",
                "Handled via LegalZoom or IncFile",
                "Filing fees covered by The Farm Sitter",
                "Policy & contract templates",
                "Business documentation toolkit",
                "Priority onboarding support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-earth-dark">
                  <span className="text-sage font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Link
                href="/become-a-sitter"
                className="block w-full text-center px-6 py-3 bg-rust text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Launch Your Business
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-barn-dark text-center mb-6">
            How It Compares
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Traditional Franchise",
                cost: "$50K–$200K+",
                note: "Plus ongoing royalties",
                highlight: false,
              },
              {
                label: "Business School",
                cost: "$15K–$40K",
                note: "No industry-specific training",
                highlight: false,
              },
              {
                label: "Farm Sitter Academy",
                cost: "From $3,500",
                note: "Everything included. Zero royalties.",
                highlight: true,
              },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center justify-between rounded-lg px-6 py-4 ${
                  row.highlight
                    ? "bg-barn text-cream border-2 border-barn"
                    : "bg-white border border-wheat"
                }`}
              >
                <div>
                  <p className={`font-semibold ${row.highlight ? "text-cream" : "text-barn-dark"}`}>
                    {row.label}
                  </p>
                  <p className={`text-xs ${row.highlight ? "text-cream/60" : "text-earth-dark"}`}>
                    {row.note}
                  </p>
                </div>
                <p className={`text-xl font-bold ${row.highlight ? "text-wheat" : "text-barn"}`}>
                  {row.cost}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Certification ─────────────────────────────────────── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
              A Badge of Trust That Opens Doors
            </h2>
            <p className="text-earth-dark max-w-2xl mx-auto">
              Earning your Certified Farm Sitter credential tells clients,
              communities, and partners that you&rsquo;ve met the highest
              standard in the industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {certBenefits.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl p-6 border border-wheat shadow-sm text-center"
              >
                <h3 className="text-lg font-bold text-barn mb-2">{b.title}</h3>
                <p className="text-sm text-earth-dark leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Testimonials ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-barn-dark text-center mb-14">
          What Our Graduates Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-8 border border-wheat shadow-sm"
            >
              <p className="text-earth-dark leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-barn">{t.name}</p>
                <p className="text-sm text-earth-dark">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. Final CTA ────────────────────────────────────────── */}
      <section className="bg-barn py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto">
            Join a growing community of Certified Farm Sitters. One investment, no
            royalties, and a business you can be genuinely proud of.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/become-a-sitter"
              className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-lg"
            >
              Enroll Now &mdash; From $3,500
            </Link>
            <a
              href="#curriculum"
              className="px-8 py-3 bg-transparent border-2 border-wheat text-wheat font-semibold rounded-lg hover:bg-wheat/10 transition-colors text-lg"
            >
              Review the Curriculum
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
