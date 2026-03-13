"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a farm sitter?",
    a: "A farm sitter is a trained professional who cares for your farm animals, livestock, and property while you're away. Unlike general pet sitters, farm sitters are specifically trained in livestock handling, equine care, poultry management, and rural property security.",
  },
  {
    q: "How is this different from a pet sitter?",
    a: "Pet sitters typically handle dogs and cats in urban/suburban settings. Farm sitters are trained in our 4-tier care system covering everything from basic poultry care to specialized tasks like milking, medication administration, and horse management. Different skill set, different training, different insurance.",
  },
  {
    q: "How do I know the sitters are qualified?",
    a: "Every sitter in our network has completed The Farm Sitter Training Academy, passed certification testing, and carries appropriate insurance. Background checks are required. You can verify any sitter's credential status through our platform.",
  },
  {
    q: "What does the Training Academy involve?",
    a: "Our Training Academy includes an in-person workshop covering animal handling, emergency protocols, property management, client relations, and business fundamentals. This is supplemented by digital coursework through our LMS platform. After completing all requirements and passing testing, you earn your credential.",
  },
  {
    q: "What animals can your sitters care for?",
    a: "Our 4-tier system covers: Tier 1 (cats, chickens, rabbits, fish), Tier 2 (goats, sheep, llamas, alpacas), Tier 3 (horses, donkeys, stalled animals), and Tier 4 (specialized care like milking, medication, and rehab). Individual sitters' experience varies — we match based on your specific needs.",
  },
  {
    q: "What does it cost to become a farm sitter?",
    a: "We offer three pathways: Education Only (training and materials), Credentialed Operator (training + certification + referral eligibility), and Licensed Affiliate (all of the above + brand licensing). Contact us for current pricing on each pathway.",
  },
  {
    q: "Is this a franchise?",
    a: "No. The Farm Sitter is a certification and referral platform. Our credentialed operators are independent business owners who set their own pricing, schedules, and terms. The optional Licensed Affiliate pathway allows qualified operators to use The Farm Sitter brand, but this is a brand license — not a franchise relationship.",
  },
  {
    q: "What area do you serve?",
    a: "We're building a nationwide network. Our roots are in central Illinois, and we're actively expanding. If there isn't a sitter in your area yet, submitting an inquiry helps us know where to focus our expansion efforts.",
  },
  {
    q: "What happens during a meet-and-greet?",
    a: "Every first-time customer-sitter relationship requires a meet-and-greet. The sitter visits your property, meets your animals, learns your routines, reviews your emergency contacts and vet info, and ensures they're confident handling your specific care needs. It's required — non-negotiable.",
  },
  {
    q: "How do I book a farm sitter?",
    a: "Submit an inquiry through our Find a Sitter page. We'll match you with a qualified sitter in your area, facilitate the introduction, and the booking happens directly between you and the sitter. This ensures a direct, accountable relationship.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-wheat rounded-lg overflow-hidden">
      <button
        className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-cream-dark transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-barn pr-4">{q}</span>
        <span className="text-earth text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-cream-dark border-t border-wheat">
          <p className="text-sm text-earth-dark leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-cream/70 text-lg">
            Everything you need to know about The Farm Sitter
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </>
  );
}
