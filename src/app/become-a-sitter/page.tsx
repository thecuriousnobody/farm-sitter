import Link from "next/link";
import PreScreeningAssessment from "@/components/PreScreeningAssessment";

const WHAT_WE_DO = [
  {
    icon: "🐄",
    title: "Daily Animal Care",
    desc: "Feed, water, and monitor the health of all farm animals according to the owner's written care plan.",
  },
  {
    icon: "📅",
    title: "Flexible Visit Schedules",
    desc: "Accommodate various visit types: daily drop-ins, overnight stays, or extended farm sitting assignments.",
  },
  {
    icon: "🚨",
    title: "Emergency Response",
    desc: "Recognize and respond to animal health emergencies, following the owner's protocol and contacting veterinarians when needed.",
  },
  {
    icon: "🧹",
    title: "Basic Chores",
    desc: "Maintain clean stalls, coops, and pastures. Handle basic farm equipment, feed, and supplies safely.",
  },
  {
    icon: "🤝",
    title: "Companionship & Enrichment",
    desc: "Provide social interaction, exercise, and enrichment activities for the animals in your care.",
  },
  {
    icon: "🏡",
    title: "Property Management",
    desc: "Monitor farm property, check fencing, manage gates, and report any issues to the owner promptly.",
  },
];

const FOUR_CS = [
  {
    letter: "C",
    title: "Capable",
    color: "bg-sage",
    desc: "Trained and skilled professionals ready to care for your animals.",
    points: [
      "Comprehensive animal care training",
      "Species-specific knowledge",
      "Emergency response preparedness",
      "Ongoing education requirements",
    ],
  },
  {
    letter: "C",
    title: "Committed",
    color: "bg-earth",
    desc: "Reliable and dedicated to providing consistent, quality care.",
    points: [
      "Punctual and dependable service",
      "Follow-through on care plans",
      "Regular communication with owners",
      "Long-term relationship focus",
    ],
  },
  {
    letter: "C",
    title: "Consistent",
    color: "bg-barn",
    desc: "Adhering to proven standards and best practices every time.",
    points: [
      "Standardized care protocols",
      "Quality assurance checks",
      "Detailed documentation and reporting",
      "Adherence to safety guidelines",
    ],
  },
  {
    letter: "C",
    title: "Compassionate",
    color: "bg-rust",
    desc: "Genuine love and empathy for animals drives everything we do.",
    points: [
      "Gentle handling techniques",
      "Stress-free environment focus",
      "Individual animal attention",
      "Emotional wellbeing awareness",
    ],
  },
];

const NOT_INCLUDED = [
  "Background check fees (paid separately to Sterling, non-refundable)",
  "Sitter liability insurance (your responsibility, required before listing activation)",
  "Business license or entity fees — unless enrolled in Business Formation track",
  "Equipment or supplies",
];

const INCLUDED = [
  "Access to all training modules",
  "Certification assessment (Certification track and above)",
  "Farm Sitter credential and digital badge upon completion",
  "Community forum access",
  "Continuing education materials",
];

export default function BecomeASitterPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-barn-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark via-barn to-earth-dark opacity-90" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-3">
            The Farm Sitter Academy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-5 leading-tight">
            Turn Your Passion for Animals<br />
            Into a <span className="text-wheat">Professional Business</span>
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Join our network of certified farm care professionals. The journey starts with a short
            pre-screening assessment to make sure farm sitting is the right fit for you right now.
          </p>
          <p className="text-wheat/70 text-sm mb-10">
            100% online &middot; Self-paced &middot; No classrooms, no commute
          </p>
          <a
            href="#assessment"
            className="inline-block px-10 py-3.5 bg-rust text-white font-bold rounded-lg hover:bg-rust-light transition-colors text-lg"
          >
            Start Pre-Screening Assessment
          </a>
          <p className="text-cream/40 text-xs mt-3">
            Takes about 3 minutes &middot; No account required &middot; Results are instant
          </p>
        </div>
      </section>

      {/* ── What Does a Farm Sitter Do? ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
            The Role
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            What Does a Farm Sitter Do?
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Farm sitting is professional animal care — not a hobby. Every visit matters, and
            every client is trusting you with animals they love and a property they depend on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_DO.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 border border-wheat shadow-sm hover:shadow-md hover:border-earth-light transition-all">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-barn mb-2">{item.title}</h3>
              <p className="text-sm text-earth-dark leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 C's ────────────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
              Our Core Values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
              The 4 C&rsquo;s
            </h2>
            <p className="text-earth-dark max-w-xl mx-auto">
              Every sitter in our network is expected to embody these four values in every visit, every client relationship, and every animal interaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_CS.map((c) => (
              <div key={c.title} className="bg-white rounded-xl overflow-hidden border border-wheat shadow-sm">
                <div className={`${c.color} px-6 py-5`}>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    {c.letter}
                  </div>
                  <h3 className="text-xl font-bold text-white">{c.title}</h3>
                  <p className="text-white/70 text-xs mt-1">{c.desc}</p>
                </div>
                <ul className="p-5 space-y-2.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-earth-dark">
                      <span className="text-sage font-bold mt-0.5 shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Background Check Requirement ─────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-rust/5 border border-rust/20 rounded-2xl p-7 flex gap-5">
          <span className="text-3xl shrink-0 mt-0.5">🔍</span>
          <div>
            <h3 className="font-bold text-barn-dark mb-2">Background Check Requirement</h3>
            <p className="text-earth-dark text-sm leading-relaxed mb-2">
              All farm sitters in our network must complete a comprehensive background check
              through our screening partner, Sterling, before enrollment opens. This is a
              non-negotiable requirement that ensures the safety and trust of every animal owner
              who works with our credentialed network.
            </p>
            <p className="text-sm font-semibold text-rust">
              Background check fees are paid by the applicant and are non-refundable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pre-Screening Assessment ──────────────────────────────────── */}
      <section id="assessment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
            Step 1
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            Are You Ready?
          </h2>
          <p className="text-earth-dark max-w-xl mx-auto">
            Take our quick pre-screening assessment to see if farm sitting is the right fit for
            you right now. A pass leads to enrollment. A fail leads to resources to help you
            get ready.
          </p>
        </div>
        <PreScreeningAssessment />
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-barn-dark text-center mb-10">
            The Full Enrollment Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Pass Pre-Screening", desc: "Take the short assessment above to confirm farm sitting is the right fit right now." },
              { step: "2", title: "Background Check", desc: "Submit your background check through Sterling. Enrollment opens once cleared." },
              { step: "3", title: "Choose & Pay", desc: "Select your program — Coursework, Certification, or Business Formation. Pay in full or via Affirm." },
              { step: "4", title: "Learn & Certify", desc: "Complete 40+ modules across 4 tracks at your own pace. Pass the final exam to earn your credential." },
              { step: "5", title: "Subscribe & Get Listed", desc: "Upload proof of insurance, activate your subscription, and your profile goes live in the directory." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-wheat p-4 text-center">
                <div className="w-9 h-9 bg-barn text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-barn mb-2">{s.title}</h3>
                <p className="text-xs text-earth-dark leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum teaser ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-wheat-light/50 border border-wheat rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-barn-dark text-lg mb-2">See the Full Curriculum</h3>
            <p className="text-earth-dark text-sm leading-relaxed max-w-xl">
              40+ modules across 4 tracks: Animal Care, Business Foundations, Leadership &amp; Character,
              and Final Certification. Every module is fully online and self-paced.
            </p>
          </div>
          <Link
            href="/training"
            className="shrink-0 px-6 py-3 bg-barn text-cream font-semibold rounded-lg hover:bg-barn-light transition-colors text-sm"
          >
            Explore the Curriculum →
          </Link>
        </div>
      </section>

      {/* ── Requirements callout ─────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white border border-wheat rounded-2xl p-8">
          <h2 className="text-lg font-bold text-barn mb-5">Before You Enroll</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-earth-dark">
            <div className="flex gap-3">
              <span className="text-barn font-bold shrink-0">1.</span>
              <div>
                <p className="font-semibold text-barn">Background Check</p>
                <p className="text-xs mt-0.5 leading-relaxed">Required before enrollment opens. Processed through Sterling. Fee paid by applicant, non-refundable.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-barn font-bold shrink-0">2.</span>
              <div>
                <p className="font-semibold text-barn">Sitter Liability Insurance</p>
                <p className="text-xs mt-0.5 leading-relaxed">Required before your listing is activated. Must be maintained annually.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-barn font-bold shrink-0">3.</span>
              <div>
                <p className="font-semibold text-barn">Monthly Subscription</p>
                <p className="text-xs mt-0.5 leading-relaxed">Dashboard, directory listing, and referral tools require an active subscription after credentialing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment Policy ───────────────────────────────────────────── */}
      <section className="bg-cream-dark py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-wheat rounded-2xl p-8">
            <h2 className="text-lg font-bold text-barn mb-5">Payment &amp; Refund Policy</h2>
            <p className="text-sm text-earth-dark leading-relaxed mb-6">
              All training and certification payments are non-refundable. Once you enroll, you retain
              access to completed training modules even if you choose not to continue. Please review all
              program details carefully before making a payment commitment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">
                  Included with Enrollment
                </h3>
                <ul className="space-y-2">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-earth-dark">
                      <span className="text-sage font-bold mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold text-barn uppercase tracking-wide mb-3">
                  NOT Included
                </h3>
                <ul className="space-y-2">
                  {NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-earth-dark">
                      <span className="text-rust font-bold mt-0.5 shrink-0">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="bg-barn py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Join a growing network of professional farm sitters and make a real difference in
            the lives of animals and the families who care for them.
          </p>
          <a
            href="#assessment"
            className="inline-block px-10 py-3.5 bg-rust text-white font-bold rounded-lg hover:bg-rust-light transition-colors text-lg"
          >
            Start the Pre-Screening Assessment
          </a>
          <p className="text-cream/40 text-xs mt-3">
            Or{" "}
            <Link href="/contact" className="hover:text-cream/60 underline">
              contact us
            </Link>{" "}
            with questions before you begin.
          </p>
        </div>
      </section>
    </>
  );
}
