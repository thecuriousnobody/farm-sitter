"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PROGRAMS = [
  {
    id: "COURSEWORK_ONLY",
    title: "Coursework Only",
    subtitle: "Access to training materials",
    description:
      "Complete the Farm Sitter training curriculum at your own pace. Gain foundational knowledge in animal care, client communication, farm safety, and professional standards.",
    includes: [
      "Full access to training course modules",
      "Downloadable guides and reference materials",
      "Self-paced learning with no test requirement",
    ],
    notIncluded: [
      "Certification credential",
      "Directory listing eligibility",
      "Business formation guidance",
    ],
    price: "TBD",
    color: "sage",
  },
  {
    id: "COURSEWORK_CERTIFICATION",
    title: "Coursework + Certification",
    subtitle: "Earn your credential",
    description:
      "Complete the full training program and pass the certification assessment to earn your official Farm Sitter credential. Required for referral directory eligibility.",
    includes: [
      "Everything in Coursework Only",
      "Certification assessment",
      "Official Farm Sitter credential and digital badge",
      "Eligibility for referral directory listing",
      "Eligibility for monthly subscription access",
    ],
    notIncluded: ["Business formation guidance"],
    price: "TBD",
    color: "barn",
    recommended: true,
  },
  {
    id: "COURSEWORK_CERTIFICATION_BUSINESS",
    title: "Coursework + Certification + Business Formation",
    subtitle: "Full operator launch package",
    description:
      "The complete pathway for operators launching or formalizing their independent farm-sitting business. Includes everything in the certification track plus guided business formation support.",
    includes: [
      "Everything in Coursework + Certification",
      "Business formation guidance and templates",
      "Entity structure recommendations",
      "Business documentation and policy templates",
      "Accelerated onboarding support",
    ],
    notIncluded: [],
    price: "TBD",
    color: "rust",
  },
];

export default function ProgramSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleContinue() {
    if (!selected) return;
    setSaving(true);
    // TODO: PATCH /api/onboarding/status { status: "PROGRAM_SELECTED", program: selected }
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    router.push("/onboarding/payment");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 2 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Select Your Program</h1>
        <p className="text-earth-dark mt-2 leading-relaxed">
          Choose the certification pathway that fits your goals. All programs begin with the same
          foundational training curriculum.
        </p>
      </div>

      <div className="space-y-4">
        {PROGRAMS.map((program) => (
          <label
            key={program.id}
            className={`block rounded-xl border-2 p-5 cursor-pointer transition-all ${
              selected === program.id
                ? "border-rust bg-rust/5"
                : "border-wheat bg-white hover:border-earth-light"
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="program"
                value={program.id}
                checked={selected === program.id}
                onChange={() => setSelected(program.id)}
                className="accent-rust mt-1 w-4 h-4 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-barn">{program.title}</h3>
                  {program.recommended && (
                    <span className="text-xs font-semibold bg-rust text-white px-2 py-0.5 rounded-full">
                      Most Common
                    </span>
                  )}
                  <span className="text-xs text-earth-light ml-auto font-semibold">
                    Pricing: {program.price}
                  </span>
                </div>
                <p className="text-xs text-earth-dark mt-0.5 mb-2">{program.subtitle}</p>
                <p className="text-sm text-earth-dark leading-relaxed">{program.description}</p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {program.includes.map((item) => (
                    <div key={item} className="flex gap-2 text-xs text-sage-dark">
                      <span className="shrink-0">✓</span> {item}
                    </div>
                  ))}
                  {program.notIncluded.map((item) => (
                    <div key={item} className="flex gap-2 text-xs text-earth-light">
                      <span className="shrink-0">–</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-wheat-light/40 border border-wheat rounded-xl p-4 text-xs text-earth-dark">
        <strong className="text-barn">Pricing note:</strong> Final program pricing will be
        displayed at checkout. Payment may be made in full or financed through Affirm. All
        payments are processed securely.
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected || saving}
        className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Continue to Payment →"}
      </button>
    </div>
  );
}
