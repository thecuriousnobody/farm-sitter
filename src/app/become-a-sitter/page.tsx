import Link from "next/link";

const pathways = [
  {
    tier: "Education Only",
    color: "bg-sage",
    features: [
      "In-person Training Academy workshop",
      "Digital course materials & resources",
      "LMS access for self-paced modules",
      "Certificate of completion",
      "Business startup guides",
    ],
    cta: "Enroll in Training",
  },
  {
    tier: "Credentialed Operator",
    color: "bg-earth",
    features: [
      "Everything in Education, plus:",
      "Certification testing & credential",
      "Digital verification badge",
      "Referral network eligibility",
      "Compliance support (insurance, background)",
      "Operator business toolkit",
    ],
    cta: "Get Credentialed",
    highlighted: true,
  },
  {
    tier: "Licensed Affiliate",
    color: "bg-rust",
    features: [
      "Everything in Credentialed, plus:",
      'Use "The Farm Sitter" brand',
      "Priority placement in referrals",
      "Territory preference",
      "Brand assets & marketing materials",
      "Enhanced business support",
    ],
    cta: "Apply for License",
  },
];

export default function BecomeASitterPage() {
  return (
    <>
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">
            Become a Farm Sitter
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Turn your love for animals into a professional farm-sitting
            business. Three pathways to fit your goals.
          </p>
        </div>
      </section>

      {/* Pathways */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((p) => (
            <div
              key={p.tier}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
                p.highlighted
                  ? "border-earth ring-2 ring-earth/20 scale-[1.02]"
                  : "border-wheat"
              }`}
            >
              <div className={`${p.color} px-6 py-4`}>
                <h3 className="text-lg font-bold text-white">{p.tier}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {p.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-earth-dark"
                    >
                      <span className="text-sage mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center px-4 py-3 rounded-lg font-semibold text-white transition-colors ${p.color} hover:opacity-90`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-barn-dark text-center mb-10">
            What You&rsquo;ll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Animal handling & safety for horses, livestock, and poultry",
              "Emergency protocols and veterinary communication",
              "Property security and daily checklists",
              "Business setup — pricing, insurance, marketing",
              "Client communication and the meet-and-greet process",
              "Specialized care — milking, medication, rehab routines",
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white p-4 rounded-lg border border-wheat"
              >
                <span className="w-6 h-6 bg-barn text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-earth-dark text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-barn py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">
            Ready to Start Your Farm Sitting Career?
          </h2>
          <p className="text-cream/70 mb-8">
            Our next Training Academy workshop is coming up. Reserve your spot
            today.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-lg"
          >
            Contact Us to Enroll
          </Link>
        </div>
      </section>
    </>
  );
}
