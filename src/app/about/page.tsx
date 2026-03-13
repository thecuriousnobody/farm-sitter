import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">About Us</h1>
          <p className="text-cream/70 text-lg">
            Born from real experience on real farms in the Midwest
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-barn mb-4">Our Story</h2>
          <p className="text-earth-dark leading-relaxed mb-4">
            The Farm Sitter started as a local farm-sitting service in central
            Illinois. What began as helping neighbors care for their horses and
            livestock while they traveled quickly revealed a massive, underserved
            need — there was no trusted, standardized way to find qualified care
            for farm animals.
          </p>
          <p className="text-earth-dark leading-relaxed">
            Pet sitters exist everywhere. Dog walkers, cat boarding, even
            luxury pet hotels. But when you own horses, goats, chickens, and
            cattle? Your options were limited to hoping a neighbor could help or
            simply never leaving your property.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-barn mb-4">Our Mission</h2>
          <p className="text-earth-dark leading-relaxed">
            We&rsquo;re building the national standard for professional farm
            sitting. Through our Training Academy, credentialing program, and
            referral network, we&rsquo;re creating a new category of trusted
            rural care professionals — trained, verified, insured, and ready
            to give your animals the same attention you would.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-barn mb-4">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Training First",
                desc: "Every sitter in our network has completed our Training Academy. No exceptions.",
              },
              {
                title: "Credentialed & Verified",
                desc: "Background checks, insurance verification, and ongoing compliance — not just a profile photo.",
              },
              {
                title: "Farm-Specific Expertise",
                desc: "Our 4-tier care system covers everything from chickens to horses to specialized medical care.",
              },
              {
                title: "Independent Operators",
                desc: "Our sitters are business owners, not gig workers. They bring professionalism and accountability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-5 rounded-xl border border-wheat shadow-sm"
              >
                <h3 className="font-bold text-barn mb-2">{item.title}</h3>
                <p className="text-sm text-earth-dark">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cream-dark p-8 rounded-xl border border-wheat text-center">
          <h2 className="text-2xl font-bold text-barn mb-3">
            Based in Peoria, Illinois
          </h2>
          <p className="text-earth-dark mb-6">
            Serving animal owners and aspiring farm sitters nationwide.
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
