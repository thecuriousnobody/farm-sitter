"use client";

import { useState } from "react";
import Link from "next/link";
import { ANIMAL_TIERS_SITTER, ANIMALS_STORAGE_KEY } from "@/lib/animals";

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

type Option = { label: string; value: string; weight: number };
type Question = { id: string; text: string; subtext?: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "experience",
    text: "How would you describe your hands-on experience with farm animals?",
    subtext: "Existing experience is required for enrollment. The Academy trains experienced handlers to be better professionals — it does not teach basic animal care from scratch.",
    options: [
      { label: "I have substantial hands-on experience and feel confident caring for farm animals", value: "strong", weight: 2 },
      { label: "I have meaningful experience — I've worked with or cared for farm animals regularly", value: "some", weight: 1 },
      { label: "I have little or no hands-on farm animal experience", value: "none", weight: -99 },
    ],
  },
  {
    id: "physical",
    text: "Are you physically able to perform farm chores?",
    subtext: "Including heavy lifting, stall cleaning, and working in all weather conditions.",
    options: [
      { label: "Yes — I'm fully capable with no physical limitations", value: "capable", weight: 2 },
      { label: "I have some limitations but can manage most farm tasks", value: "limited", weight: 1 },
      { label: "I have significant physical limitations that would affect farm work", value: "restricted", weight: -1 },
    ],
  },
  {
    id: "transportation",
    text: "Do you have reliable transportation to reach rural properties?",
    subtext: "Many farm clients are located outside city limits, often on gravel or rural roads.",
    options: [
      { label: "Yes — I have a reliable personal vehicle", value: "yes", weight: 2 },
      { label: "Somewhat — depends on distance and location", value: "sometimes", weight: 1 },
      { label: "I don't have reliable personal transportation", value: "no", weight: -2 },
    ],
  },
  {
    id: "availability",
    text: "Can you commit to flexible scheduling — including early mornings, evenings, weekends, and holidays?",
    subtext: "Animals don't take days off. Farm sitting requires consistent availability.",
    options: [
      { label: "Yes — I can accommodate flexible and early/late visit schedules", value: "flexible", weight: 2 },
      { label: "I have some constraints but can offer reasonable flexibility", value: "moderate", weight: 1 },
      { label: "My current schedule doesn't allow consistent farm sitting", value: "unavailable", weight: -2 },
    ],
  },
  {
    id: "background",
    text: "Are you willing to undergo a comprehensive background check as a required step before enrollment?",
    subtext: "This is a non-negotiable requirement. The background check fee is paid by the applicant and is non-refundable.",
    options: [
      { label: "Yes — I fully understand and accept this requirement", value: "yes", weight: 2 },
      { label: "I have some questions before I can commit", value: "questions", weight: 0 },
      { label: "No — I am not willing to undergo a background check", value: "no", weight: -99 },
    ],
  },
  {
    id: "cruelty",
    text: "Have you ever been convicted of animal cruelty, neglect, or a related offense?",
    subtext: "This is a disqualifying factor for enrollment in The Farm Sitter network.",
    options: [
      { label: "No", value: "no", weight: 0 },
      { label: "Yes", value: "yes", weight: -99 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

type ResultType = "pass" | "resource" | "experience-needed" | "disqualified";

function scoreAnswers(answers: Record<string, string>): ResultType {
  // Hard disqualifiers
  if (answers["background"] === "no") return "disqualified";
  if (answers["cruelty"] === "yes") return "disqualified";

  // Experience is required — no experience = cannot enroll yet
  if (answers["experience"] === "none") return "experience-needed";

  // Logistics barriers
  if (answers["transportation"] === "no") return "resource";
  if (answers["availability"] === "unavailable") return "resource";

  return "pass";
}

// ---------------------------------------------------------------------------
// Program cards — shown after pass
// ---------------------------------------------------------------------------

const PROGRAMS = [
  {
    id: "COURSEWORK_ONLY",
    name: "Coursework Only",
    tagline: "Deepen your professional knowledge",
    color: "bg-sage",
    price: "$3,500",
    description: "Full access to the Academy curriculum — professional protocols, care standards, business operations, and client relations. No credential issued.",
    includes: [
      "All 4 curriculum tracks (40+ modules)",
      "Downloadable care guides and references",
      "Self-paced — no deadlines",
      "Certificate of completion",
    ],
    notIncluded: ["Certification credential", "Directory eligibility"],
    cta: "Enroll in Coursework",
    recommended: false,
  },
  {
    id: "COURSEWORK_CERTIFICATION",
    name: "Coursework + Certification",
    tagline: "Earn your credential",
    color: "bg-barn",
    price: "$4,999",
    description: "The full professional path. Complete the curriculum, then demonstrate your skills in an in-person practical assessment. Pass to earn your Farm Sitter credential.",
    includes: [
      "Everything in Coursework",
      "In-person practical assessment (on-farm, Greater Peoria area)",
      "Official Farm Sitter credential & badge",
      "Referral directory eligibility",
      "Monthly subscription access",
    ],
    notIncluded: ["Business entity formation"],
    cta: "Get Credentialed",
    recommended: true,
  },
  {
    id: "COURSEWORK_CERTIFICATION_BUSINESS",
    name: "+ Business Formation",
    tagline: "Launch your business",
    color: "bg-rust",
    price: "$8,999",
    description: "The complete launch package. Everything in Certification plus your business entity formed for you — filing fees covered.",
    includes: [
      "Everything in Coursework + Certification",
      "LLC formation via LegalZoom or IncFile",
      "Filing fees covered by The Farm Sitter",
      "Policy & contract templates",
      "Priority onboarding support",
    ],
    notIncluded: [],
    cta: "Launch Your Business",
    recommended: false,
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PreScreeningAssessment() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ firstName: "", email: "" });
  const [leadAnimals, setLeadAnimals] = useState<string[]>([]);
  const [notifyForm, setNotifyForm] = useState({ email: "" });
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  function toggleLeadAnimal(animal: string) {
    setLeadAnimals((prev) =>
      prev.includes(animal) ? prev.filter((a) => a !== animal) : [...prev, animal]
    );
  }

  function handleNext() {
    if (!selected) return;
    const q = QUESTIONS[current];
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
      setSelected("");
    } else {
      setResult(scoreAnswers(newAnswers));
    }
  }

  function handleBack() {
    if (current === 0) {
      setStarted(false);
      setAnswers({});
      setSelected("");
      setCurrent(0);
      setResult(null);
      return;
    }
    const prev = current - 1;
    setCurrent(prev);
    setSelected(answers[QUESTIONS[prev].id] || "");
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers({});
    setSelected("");
    setResult(null);
  }

  // ── Not started ────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="bg-white border-2 border-barn rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center shadow-sm">
        <div className="text-5xl mb-5">🌾</div>
        <h3 className="text-2xl font-bold text-barn-dark mb-3">Pre-Screening Assessment</h3>
        <p className="text-earth-dark leading-relaxed mb-3">
          Before you enroll, take our short assessment to confirm farm sitting is the right fit
          for you right now. It takes about 3 minutes and helps us point you in the right direction.
        </p>
        <p className="text-sm text-earth-light mb-8">
          6 questions &middot; No personal information required &middot; Results are instant
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-10 py-3.5 bg-rust text-white font-bold rounded-lg hover:bg-rust-light transition-colors text-lg"
        >
          Start Pre-Screening Assessment
        </button>
        <p className="text-xs text-earth-light mt-4">
          Assessment results do not create an account or submit any application.
        </p>
      </div>
    );
  }

  // ── Result: Pass — lead capture gate ──────────────────────────────────────
  if (result === "pass" && !leadCaptured) {
    const canSubmit = leadForm.firstName.trim() && leadForm.email.trim();
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-sage/10 border-2 border-sage rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-barn-dark mb-3">
            You&rsquo;re a great fit for farm sitting!
          </h3>
          <p className="text-earth-dark leading-relaxed">
            Based on your responses, you meet the foundational requirements for The Farm Sitter
            network. Tell us where to send your program details and next steps.
          </p>
        </div>

        <div className="bg-white border border-wheat rounded-2xl p-8 shadow-sm">
          <h4 className="text-lg font-bold text-barn-dark mb-1">See Your Program Options</h4>
          <p className="text-sm text-earth-dark mb-6">
            Enter your name and email to unlock pricing, curriculum details, and enrollment steps.
            No account created — no spam.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">First Name *</label>
                <input
                  type="text"
                  value={leadForm.firstName}
                  onChange={(e) => setLeadForm((f) => ({ ...f, firstName: e.target.value }))}
                  placeholder="Your first name"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Email Address *</label>
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
                <p className="text-xs text-earth-light mt-1">
                  We&rsquo;ll send enrollment details and next steps.
                </p>
              </div>
            </div>

            {/* Optional animal familiarity */}
            <div className="border border-wheat rounded-xl p-4">
              <p className="text-sm font-semibold text-barn mb-1">
                Which animals do you have experience with?{" "}
                <span className="font-normal text-earth-light">(optional — you can update this later)</span>
              </p>
              <p className="text-xs text-earth-light mb-3">
                This pre-fills your operator profile. Your selections carry forward so you won&rsquo;t enter them twice.
              </p>
              <div className="space-y-3">
                {ANIMAL_TIERS_SITTER.map((tier) => (
                  <div key={tier.label}>
                    <p className="text-xs font-semibold text-earth uppercase tracking-wide mb-1.5">{tier.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.animals.map((animal) => {
                        const active = leadAnimals.includes(animal);
                        return (
                          <button
                            key={animal}
                            type="button"
                            onClick={() => toggleLeadAnimal(animal)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              active
                                ? "bg-sage/20 border-sage text-barn"
                                : "bg-white border-wheat text-earth-dark hover:border-earth-light"
                            }`}
                          >
                            {animal}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={async () => {
                if (!canSubmit) return;
                if (typeof window !== "undefined") {
                  localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(leadAnimals));
                }
                await fetch("/api/sitter-lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    firstName: leadForm.firstName,
                    email: leadForm.email,
                    assessmentResult: "pass",
                    animalTypes: leadAnimals,
                  }),
                }).catch(() => {});
                setLeadCaptured(true);
              }}
              disabled={!canSubmit}
              className="w-full py-3 bg-rust text-white font-bold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Show Me the Programs →
            </button>
          </div>
        </div>

        <div className="text-center">
          <button onClick={restart} className="text-sm text-earth-light hover:text-earth transition-colors">
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  // ── Result: Pass — program cards ───────────────────────────────────────────
  if (result === "pass") {
    return (
      <div className="space-y-12">
        <div className="bg-sage/10 border-2 border-sage rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-barn-dark mb-3">
            Welcome, {leadForm.firstName}! Here are your options.
          </h3>
          <p className="text-earth-dark leading-relaxed mb-2">
            You meet the foundational requirements for The Farm Sitter network. The next step is
            to create your account, complete a background check, and choose your enrollment program.
          </p>
          <p className="text-sm text-earth-light">
            All programs include the full curriculum. Choose the level that fits your goals.
          </p>
        </div>

        {/* Program cards */}
        <div>
          <h3 className="text-xl font-bold text-barn-dark text-center mb-6">Choose Your Program</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PROGRAMS.map((p) => (
              <div
                key={p.id}
                className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col ${
                  p.recommended ? "border-barn ring-2 ring-barn/20" : "border-wheat"
                }`}
              >
                {p.recommended && (
                  <div className="bg-barn text-white text-xs font-bold text-center py-1.5 tracking-wide uppercase">
                    Most Popular
                  </div>
                )}
                <div className={`${p.color} px-5 py-4`}>
                  <h4 className="text-base font-bold text-white">{p.name}</h4>
                  <p className="text-white/70 text-xs mt-0.5">{p.tagline}</p>
                  <p className="text-2xl font-bold text-white mt-2">{p.price}</p>
                  <p className="text-xs text-white/60">One-time · pay in full or via Affirm</p>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-earth-dark leading-relaxed mb-4">{p.description}</p>
                  <ul className="space-y-2 flex-1 mb-4">
                    {p.includes.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-earth-dark">
                        <span className="text-sage mt-0.5 shrink-0">✓</span>{f}
                      </li>
                    ))}
                    {p.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-earth-light">
                        <span className="shrink-0 mt-0.5">–</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`block text-center px-4 py-2.5 rounded-lg font-semibold text-white text-sm hover:opacity-90 transition-opacity ${p.color}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-earth-light mt-4">
            All enrollment includes a required background check (fee paid by applicant, non-refundable). Tuition payments are non-refundable.
          </p>
        </div>

        <div className="text-center">
          <button onClick={restart} className="text-sm text-earth-light hover:text-earth transition-colors">
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  // ── Result: Experience needed ──────────────────────────────────────────────
  if (result === "experience-needed") {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="bg-wheat-light/60 border-2 border-wheat rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">🌾</div>
          <h3 className="text-2xl font-bold text-barn-dark mb-3">
            Farm experience is required before you enroll
          </h3>
          <p className="text-earth-dark leading-relaxed">
            The Farm Sitter Academy is a professional credentialing program — not an
            introduction to farm animal care. Applicants are expected to bring existing
            hands-on experience with farm animals. We make experienced handlers better,
            safer, and more accountable business operators.
          </p>
          <p className="text-sm text-earth-light mt-3">
            The good news: experience can be built. Here&rsquo;s how.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-barn-dark">Ways to Build the Experience You Need</h3>

          {[
            {
              icon: "🐴",
              title: "Work or Volunteer at an Equine Facility",
              desc: "Horse barns, equine rescues, and therapeutic riding centers are excellent places to develop hands-on skills with large animals. Even part-time barn help counts.",
            },
            {
              icon: "🐐",
              title: "Help at a Small Farm or Hobby Operation",
              desc: "Reach out to local farm owners and offer to help with daily chores in exchange for experience. Many hobby farmers welcome reliable, motivated helpers.",
            },
            {
              icon: "🌾",
              title: "Seek Farm Work Through Your Local Extension Office",
              desc: "University Extension programs connect community members with farms and ranches seeking help. They also offer low-cost animal care education and farm safety training.",
            },
            {
              icon: "🤝",
              title: "Join 4-H or a Farm Bureau Group",
              desc: "Both organizations connect you with experienced farmers and hands-on learning opportunities. 4-H livestock programs in particular are an excellent foundation.",
            },
            {
              icon: "📅",
              title: "Come Back When You're Ready",
              desc: "Once you have meaningful hands-on experience, retake this assessment. Our team is happy to talk through what level of experience is right for enrollment.",
            },
          ].map((r) => (
            <div key={r.title} className="bg-white border border-wheat rounded-xl p-5 flex gap-4">
              <span className="text-2xl shrink-0">{r.icon}</span>
              <div>
                <h4 className="font-semibold text-barn-dark text-sm mb-1">{r.title}</h4>
                <p className="text-sm text-earth-dark leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify me when ready */}
        <div className="bg-white border border-wheat rounded-2xl p-7 max-w-2xl mx-auto">
          <h4 className="font-bold text-barn-dark mb-1">Want a reminder when you&rsquo;re ready?</h4>
          <p className="text-sm text-earth-dark mb-4">
            Drop your email and we&rsquo;ll reach out when you&rsquo;re ready to apply — no pressure, no spam.
          </p>
          {notifySubmitted ? (
            <p className="text-sm text-sage font-semibold">✓ Got it — we&rsquo;ll be in touch!</p>
          ) : (
            <div className="flex gap-3">
              <input
                type="email"
                value={notifyForm.email}
                onChange={(e) => setNotifyForm({ email: e.target.value })}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth text-sm"
              />
              <button
                onClick={async () => {
                  if (!notifyForm.email.trim()) return;
                  await fetch("/api/sitter-lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: notifyForm.email, assessmentResult: result }),
                  }).catch(() => {});
                  setNotifySubmitted(true);
                }}
                disabled={!notifyForm.email.trim()}
                className="px-5 py-2.5 bg-sage text-white font-semibold rounded-lg hover:bg-sage/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Notify Me
              </button>
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-earth-dark">Questions about experience requirements?</p>
          <Link href="/contact" className="text-sm text-rust font-semibold hover:underline">
            Contact us — we&rsquo;re happy to help →
          </Link>
          <div className="pt-2">
            <button onClick={restart} className="text-xs text-earth-light hover:text-earth transition-colors">
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result: Resource path ──────────────────────────────────────────────────
  if (result === "resource") {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="bg-wheat-light/60 border-2 border-wheat rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-barn-dark mb-3">
            Not quite there yet — but you can get there
          </h3>
          <p className="text-earth-dark leading-relaxed">
            Based on your responses, there are a few barriers to farm sitting right now — like
            transportation or scheduling. That doesn&rsquo;t mean this door is closed. Here are
            ways to build toward it.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-barn-dark">Ways to Build Toward Farm Sitting</h3>

          {[
            {
              icon: "🐴",
              title: "Volunteer at an Equine Rescue or Humane Society",
              desc: "Hands-on experience with horses, livestock, and farm animals is the best foundation. Local equine rescues and humane societies often welcome volunteers.",
            },
            {
              icon: "🐴",
              title: "Build or Expand Your Farm Animal Experience",
              desc: "Enrollment in any Academy program requires existing hands-on experience. Volunteer at an equine rescue, work on a hobby farm, or connect with your local Extension office to build or verify your qualifications.",
            },
            {
              icon: "🌾",
              title: "Connect with Your Local Extension Office",
              desc: "University Extension programs offer free and low-cost animal care education, farm safety training, and volunteer opportunities in your county.",
            },
            {
              icon: "🤝",
              title: "Join 4-H or a Farm Bureau Group",
              desc: "4-H programs and Farm Bureau networks connect you with experienced farmers and animal owners who can help you build real-world experience.",
            },
            {
              icon: "📅",
              title: "Revisit When Your Situation Changes",
              desc: "Transportation, scheduling, and life circumstances change. When you're ready, come back and take the assessment again.",
            },
          ].map((r) => (
            <div key={r.title} className="bg-white border border-wheat rounded-xl p-5 flex gap-4">
              <span className="text-2xl shrink-0">{r.icon}</span>
              <div>
                <h4 className="font-semibold text-barn-dark text-sm mb-1">{r.title}</h4>
                <p className="text-sm text-earth-dark leading-relaxed">{r.desc}</p>
                {r.link && (
                  <Link href={r.link.href} className="text-xs text-rust font-semibold hover:underline mt-1.5 inline-block">
                    {r.link.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notify me when ready */}
        <div className="bg-white border border-wheat rounded-2xl p-7 max-w-2xl mx-auto">
          <h4 className="font-bold text-barn-dark mb-1">Want a reminder when your situation changes?</h4>
          <p className="text-sm text-earth-dark mb-4">
            Leave your email and we&rsquo;ll check in — no pressure, no spam.
          </p>
          {notifySubmitted ? (
            <p className="text-sm text-sage font-semibold">✓ Got it — we&rsquo;ll be in touch!</p>
          ) : (
            <div className="flex gap-3">
              <input
                type="email"
                value={notifyForm.email}
                onChange={(e) => setNotifyForm({ email: e.target.value })}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth text-sm"
              />
              <button
                onClick={async () => {
                  if (!notifyForm.email.trim()) return;
                  await fetch("/api/sitter-lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: notifyForm.email, assessmentResult: result }),
                  }).catch(() => {});
                  setNotifySubmitted(true);
                }}
                disabled={!notifyForm.email.trim()}
                className="px-5 py-2.5 bg-sage text-white font-semibold rounded-lg hover:bg-sage/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Notify Me
              </button>
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-earth-dark">Have questions about your results?</p>
          <Link href="/contact" className="text-sm text-rust font-semibold hover:underline">
            Contact us — we're happy to help →
          </Link>
          <div className="pt-2">
            <button onClick={restart} className="text-xs text-earth-light hover:text-earth transition-colors">
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result: Disqualified ───────────────────────────────────────────────────
  if (result === "disqualified") {
    return (
      <div className="bg-rust/5 border-2 border-rust/30 rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <div className="text-5xl mb-4">🚫</div>
        <h3 className="text-2xl font-bold text-barn-dark mb-3">
          Enrollment not available at this time
        </h3>
        <p className="text-earth-dark leading-relaxed mb-6">
          Based on your responses, you do not currently meet the enrollment requirements for
          The Farm Sitter network. Our program requires a completed background check, and any
          history of animal cruelty or neglect disqualifies an applicant from participation.
        </p>
        <p className="text-sm text-earth-light">
          If you believe there has been an error or have questions about this result, please
          contact us directly.
        </p>
        <Link href="/contact" className="inline-block mt-4 text-sm text-rust font-semibold hover:underline">
          Contact Us →
        </Link>
        <div className="mt-6">
          <button onClick={restart} className="text-xs text-earth-light hover:text-earth transition-colors">
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  // ── Active questionnaire ───────────────────────────────────────────────────
  const q = QUESTIONS[current];
  const progress = Math.round(((current) / QUESTIONS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-earth-dark">
            Question {current + 1} of {QUESTIONS.length}
          </span>
          <span className="text-xs text-earth-light">{progress}% complete</span>
        </div>
        <div className="h-1.5 bg-wheat rounded-full overflow-hidden">
          <div
            className="h-full bg-rust rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-wheat rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-barn-dark mb-1">{q.text}</h3>
        {q.subtext && (
          <p className="text-sm text-earth-light mb-6">{q.subtext}</p>
        )}

        <div className="space-y-3 mt-6">
          {q.options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelected(opt.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium leading-snug ${
                  isSelected
                    ? "border-barn bg-barn/5 text-barn-dark"
                    : "border-wheat bg-white text-earth-dark hover:border-earth-light hover:bg-cream/50"
                }`}
              >
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 shrink-0 align-middle transition-colors ${
                  isSelected ? "border-barn bg-barn" : "border-wheat"
                }`}>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 border border-wheat text-barn font-semibold rounded-lg hover:bg-wheat-light transition-colors text-sm"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected}
            className="px-8 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {current + 1 === QUESTIONS.length ? "See My Results" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
