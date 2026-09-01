"use client";

import { useState } from "react";
import Link from "next/link";

type FaqItem = { q: string; a: React.ReactNode };
type FaqSection = { title: string; icon: string; items: FaqItem[] };

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "About Farm Sitting",
    icon: "🐄",
    items: [
      {
        q: "What is farm sitting?",
        a: "Farm sitting is professional, in-person care for farm animals, livestock, and rural properties while the owner is away. A farm sitter follows your written care plan, maintains your daily routines, monitors animal health, handles basic chores, and keeps you informed throughout your trip. It is not a hobby or a favor — it is a professional service delivered by trained, credentialed individuals.",
      },
      {
        q: "What animals do farm sitters care for?",
        a: (
          <>
            Our credentialed sitters are trained across a 4-tier animal care system:
            <ul className="mt-2 space-y-1 list-none">
              <li><strong>Tier 1</strong> — Cats, chickens, ducks, rabbits, fish, caged pets, and lizards</li>
              <li><strong>Tier 2</strong> — Goats, sheep, llamas, alpacas, turkeys, and exotic birds</li>
              <li><strong>Tier 3</strong> — Horses, donkeys, mini horses, and stalled livestock</li>
              <li><strong>Tier 4</strong> — Specialized care: milking animals, animals on medication, and rehabilitation cases</li>
            </ul>
            <p className="mt-2">Dogs and plant/garden care are also available as standalone or add-on services. Individual sitters may have specific species experience — we match based on your animals&rsquo; actual needs.</p>
          </>
        ),
      },
      {
        q: "How is farm sitting different from pet sitting?",
        a: "Traditional pet sitters are trained for dogs and cats in residential settings. Farm sitters are trained in livestock handling, equine care, poultry management, rural property security, and emergency response for animals that require specialized knowledge. The physical demands, skill requirements, equipment, and liability are entirely different — which is why our sitters go through a dedicated credentialing process and carry farm-specific liability insurance.",
      },
      {
        q: "What services do farm sitters provide?",
        a: (
          <>
            Core services include:
            <ul className="mt-2 space-y-1 list-none">
              <li>• Daily feeding, watering, and health monitoring</li>
              <li>• Stall cleaning, coop management, and basic chores</li>
              <li>• Medication administration per written instructions</li>
              <li>• Pasture checks, fence monitoring, and gate management</li>
              <li>• Companionship and enrichment for animals in care</li>
              <li>• Emergency response following your established protocol</li>
              <li>• Property monitoring and owner communication</li>
            </ul>
            <p className="mt-2">Specific services vary by sitter and assignment. Everything is agreed upon before the visit begins.</p>
          </>
        ),
      },
    ],
  },
  {
    title: "For Animal Owners",
    icon: "🏡",
    items: [
      {
        q: "How do I find a farm sitter near me?",
        a: (
          <>
            Use our{" "}
            <Link href="/find-a-sitter" className="text-barn font-semibold hover:underline">
              Find a Sitter
            </Link>{" "}
            form to submit a care request. Tell us about your animals, your property, and your travel dates. Our team will review your inquiry and match you with a qualified credentialed sitter in your area. All introductions are facilitated by our team — the booking and care agreement happen directly between you and the sitter.
            <p className="mt-2">If we don&rsquo;t have coverage in your area yet, your inquiry is saved and we&rsquo;ll notify you when a sitter becomes available near you.</p>
          </>
        ),
      },
      {
        q: "Is registration really free for animal owners?",
        a: "Yes — submitting a care request through The Farm Sitter is completely free. No account is required, no subscription, no fees. Animal owners pay their sitter directly for services rendered. We do not charge a booking commission or take a cut of the transaction.",
      },
      {
        q: "What credentials do farm sitters have?",
        a: "Every sitter in our network has completed The Farm Sitter Training Academy — a comprehensive program covering animal care, emergency protocols, property management, client relations, and business ethics. Credentialed sitters have passed the certification exam, cleared a background check through our screening partner Sterling, and carry active sitter liability insurance. You can verify any sitter&rsquo;s credential status through our platform.",
      },
      {
        q: "What's the difference between a certified sitter and a brand-affiliated sitter?",
        a: "A Credentialed Independent has completed our full training and certification program. They operate under their own business name and set their own rates. A Licensed Brand Affiliate has earned their credential and also licensed The Farm Sitter brand — they operate under our brand name, meet additional standards, and benefit from enhanced placement in our referral network. Both are fully credentialed; the brand affiliation is an optional additional layer.",
      },
      {
        q: "What if something goes wrong while I'm away?",
        a: (
          <>
            Every sitter follows a structured emergency protocol established before your trip begins. This includes:
            <ul className="mt-2 space-y-1 list-none">
              <li>• Contacting you immediately as the first step</li>
              <li>• Reaching your designated emergency backup if you&rsquo;re unreachable</li>
              <li>• Contacting your primary veterinarian per your written instructions</li>
              <li>• Emergency vet escalation if no response within the protocol window</li>
            </ul>
            <p className="mt-2">Sitters are trained to identify and document signs of illness or injury and to act within your written care plan at all times. Major medical decisions remain yours — the sitter&rsquo;s job is to reach you and follow your protocol, not to make decisions on your behalf.</p>
          </>
        ),
      },
      {
        q: "How much does farm sitting typically cost?",
        a: "Farm sitting rates are set by individual operators based on their local market, the animals involved, visit length, and any specialized care required. We do not publish or set prices for our operators — they are independent business owners who determine their own rates. When you submit a care request, your matched sitter will provide their pricing directly. We recommend discussing rates during your meet-and-greet before the assignment begins.",
      },
      {
        q: "Can I get a free farm sitting checklist?",
        a: (
          <>
            Yes. Our{" "}
            <Link href="/resources" className="text-barn font-semibold hover:underline">
              Free Resource Library
            </Link>{" "}
            includes daily care checklists, emergency prep templates, meet-and-greet guides, and more — all free to download with no account required. These resources are designed to help animal owners prepare for a professional farm sitting engagement.
          </>
        ),
      },
      {
        q: "Who sets the pricing for farm sitting services?",
        a: "Each farm sitter sets their own rates. The Farm Sitter provides a pricing framework and training on how to value services appropriately, but our operators are independent business owners — not employees — and they control their own business decisions, including pricing. This ensures rates reflect local market conditions and the specific complexity of your care needs.",
      },
    ],
  },
  {
    title: "For Aspiring Farm Sitters",
    icon: "🎓",
    items: [
      {
        q: "What pathways are available to become a certified farm sitter?",
        a: (
          <>
            We offer three program tiers through The Farm Sitter Academy:
            <ul className="mt-2 space-y-1 list-none">
              <li><strong>The Farm Sitter Experience</strong> — Coursework and training materials. No credential issued. For those who want to deepen their professional knowledge without pursuing the full credential.</li>
              <li><strong>Coursework + Certification</strong> — Full curriculum plus an in-person practical assessment. Pass the practical exam to earn your official Farm Sitter credential and directory eligibility.</li>
              <li><strong>Coursework + Certification + Business Formation</strong> — Everything above, plus guided business entity formation with filing fees covered by The Farm Sitter Inc.</li>
            </ul>
            <p className="mt-2">All programs require existing hands-on farm animal experience. Visit the{" "}
              <Link href="/become-a-sitter" className="text-barn font-semibold hover:underline">Become a Farm Sitter</Link>{" "}
              page to start the pre-screening assessment.
            </p>
          </>
        ),
      },
      {
        q: "What does the credentialing assessment involve?",
        a: "The credential is earned through a practical exam — an in-person, on-farm activity conducted in the Greater Peoria area. It is not a written or online-only test. The exam evaluates your real-world animal handling skills, your application of the protocols covered in the curriculum, and your readiness to serve clients professionally. As the network grows, practical assessments may also be verified by qualified local farm owners who can attest to an operator's demonstrated competency in the field.",
      },
      {
        q: "How do I learn more about the investment and costs?",
        a: (
          <>
            Full program details and pricing are available on our{" "}
            <Link href="/training" className="text-barn font-semibold hover:underline">Training Academy</Link>{" "}
            and{" "}
            <Link href="/become-a-sitter" className="text-barn font-semibold hover:underline">Become a Farm Sitter</Link>{" "}
            pages. Enrollment pricing, payment options (including Affirm installment plans), and what&rsquo;s included in each program tier are all detailed there. Note that background check fees (paid to our screening partner Sterling) are separate and non-refundable.
          </>
        ),
      },
      {
        q: "What's included in The Farm Sitter Experience level?",
        a: "The Farm Sitter Experience is our entry-level coursework-only track. It gives you access to all training modules, animal care curriculum, and ongoing education materials. It does not include the certification exam, credential issuance, or directory listing eligibility. It's a great option if you want to build your knowledge and skills before committing to full credentialing.",
      },
      {
        q: "Do I need previous experience with farm animals?",
        a: "Yes — hands-on farm animal experience is a requirement for enrollment, not something we provide from scratch. The Farm Sitter Academy is a professional credentialing program: we take experienced handlers and make them better, safer, and more accountable business operators. If you don't yet have meaningful hands-on experience with horses, livestock, poultry, or similar animals, we encourage you to volunteer at an equine facility, help on a local hobby farm, connect with your county Extension office, or participate in a 4-H or Farm Bureau program first. Once you have real experience, come back.",
      },
      {
        q: "What are the background check requirements?",
        a: "All applicants must complete a comprehensive background check through our screening partner, Sterling, before enrollment is unlocked. The fee is paid by the applicant and is non-refundable regardless of outcome. This is a non-negotiable requirement — it protects the animal owners who trust our credentialed network and ensures the integrity of our platform.",
      },
      {
        q: "Will I own my own business as a farm sitter?",
        a: "Yes. Credentialed operators in our network are independent business owners — not employees of The Farm Sitter. You set your own rates, your own schedule, and your own service area. You contract directly with your clients. The Farm Sitter provides training, credentialing, referral access, and platform tools — but your business is yours. Our Business Formation program tier includes guided entity setup if you want help establishing your LLC or business structure.",
      },
      {
        q: "How much can I earn as a farm sitter?",
        a: "Earnings vary based on your market, the services you offer, how many clients you take on, and the complexity of the care you provide. Farm sitting rates are set by each operator individually. Our training includes guidance on pricing your services competitively for your local area. Because operators are independent business owners, your income reflects your effort and the market you serve.",
      },
      {
        q: "Can I operate part-time as a farm sitter?",
        a: "Yes. Many credentialed farm sitters operate on a part-time or seasonal basis alongside other work. Our training is fully online and self-paced, so you can complete it on your schedule. Visit schedules are arranged directly with your clients, giving you full control over your availability. There is no minimum number of clients or visits required.",
      },
      {
        q: "What continuing education is available?",
        a: "Credentialed operators are required to complete continuing education (CE) to maintain their credential at renewal. The Farm Sitter provides ongoing education materials, updated care protocols, species-specific deep-dives, and community resources. CE requirements are built into the credentialing renewal process — your dashboard tracks your CE progress and renewal date.",
      },
      {
        q: "Can I access the free checklist as a farm sitter?",
        a: (
          <>
            Yes. Our{" "}
            <Link href="/resources" className="text-barn font-semibold hover:underline">
              Free Resource Library
            </Link>{" "}
            is available to everyone — no account required. Farm sitters often use these checklists as a reference during client onboarding, meet-and-greets, and daily care visits. Enrolled trainees and credentialed operators also have access to additional operator-specific resources through the dashboard.
          </>
        ),
      },
    ],
  },
];

function AccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? "border-barn/40 shadow-sm" : "border-wheat"}`}>
      <button
        className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-cream-dark transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-barn-dark pr-4 leading-snug">{q}</span>
        <span className={`text-earth text-xl shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-cream-dark border-t border-wheat text-sm text-earth-dark leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-cream/70 text-lg">
            Everything you need to know about farm sitting and our credentialing network.
          </p>
        </div>
      </section>

      {/* Section nav */}
      <section className="bg-cream-dark border-b border-wheat sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {FAQ_SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-earth-dark hover:text-barn hover:bg-wheat/40 transition-colors"
              >
                <span>{s.icon}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-14">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{section.icon}</span>
              <h2 className="text-2xl font-bold text-barn-dark">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Still have questions */}
      <section className="bg-cream-dark border-t border-wheat py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-barn-dark mb-3">Still have questions?</h2>
          <p className="text-earth-dark text-sm mb-6 leading-relaxed">
            We&rsquo;re happy to help. Whether you&rsquo;re an animal owner trying to find care or
            someone exploring becoming a farm sitter, our team is here to point you in the right direction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-2.5 bg-barn text-cream font-semibold rounded-lg hover:bg-barn-light transition-colors text-sm"
            >
              Contact Us
            </a>
            <a
              href="/find-a-sitter"
              className="px-6 py-2.5 border border-barn text-barn font-semibold rounded-lg hover:bg-barn/5 transition-colors text-sm"
            >
              Find a Sitter
            </a>
            <a
              href="/become-a-sitter"
              className="px-6 py-2.5 border border-wheat text-earth-dark font-semibold rounded-lg hover:bg-wheat/40 transition-colors text-sm"
            >
              Become a Farm Sitter
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
