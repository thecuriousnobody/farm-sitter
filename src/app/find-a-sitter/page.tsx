"use client";

import { useState } from "react";
import Link from "next/link";

const ANIMAL_TIERS = [
  {
    tier: 1,
    label: "Tier 1 — Small & Companion Animals",
    note: "Cats, poultry, small caged pets",
    animals: ["Cats", "Chickens", "Ducks", "Rabbits", "Fish", "Caged Pets", "Lizards / Reptiles"],
  },
  {
    tier: 2,
    label: "Tier 2 — Herd & Flock Animals",
    note: "Goats, sheep, llamas, exotic birds",
    animals: ["Goats", "Sheep", "Llamas", "Alpacas", "Turkeys", "Exotic Birds"],
  },
  {
    tier: 3,
    label: "Tier 3 — Stalled & Equine",
    note: "Horses, donkeys, stalled livestock",
    animals: ["Horses", "Donkeys", "Mini Horses", "Stalled Livestock"],
  },
  {
    tier: 4,
    label: "Tier 4 — Specialized Care",
    note: "Milking, medication, rehab — custom scheduling",
    animals: [
      "Dairy / Milking Animals",
      "Animals on Medication",
      "Rehab or Injured Animals",
      "Other Specialty Care",
    ],
  },
];

const DOG_SIZES = ["Small (under 25 lbs)", "Medium (25–65 lbs)", "Large (65+ lbs)"];
const DOG_COUNTS = ["1", "2", "3", "4", "5", "6+"];

const PLANT_TYPES = ["Indoor houseplants", "Outdoor garden / beds", "Greenhouse"];
const PLANT_COUNTS = ["1 area", "2 areas", "3 areas", "4+ areas"];

const VISIT_TIMES = ["Morning", "Midday", "Evening", "Overnight"];
const VISITS_PER_DAY = ["1", "2", "3", "4+"];

const PROPERTY_TYPES = [
  "Small hobby farm",
  "Working farm / Ranch",
  "Rural residential",
  "Acreage / Small homestead",
  "Other",
];

const QUANTITIES = ["1", "2", "3", "4", "5", "6–10", "11–20", "20+"];

// ZIPs with active local coverage — mirrors ZipChecker logic
const COVERED_ZIPS = new Set([
  "61601", "61602", "61603", "61604", "61605", "61606",
  "61607", "61608", "61610", "61612", "61613", "61614", "61615", "61616",
  "61611", "61523", "61550", "61554", "61555", "61571",
]);

type AnimalEntry = { type: string; tier: number; quantity: string };

type DogInfo = {
  count: string;
  sizes: string[];
};

type PlantInfo = {
  count: string;
  types: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  animals: AnimalEntry[];
  dogs: DogInfo | null;
  plants: PlantInfo | null;
  tripStart: string;
  tripEnd: string;
  visitsPerDay: string;
  visitTimes: string[];
  propertyType: string;
  specialNotes: string;
  marketingConsent: boolean;
  privacyAccepted: boolean;
};

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  animals: [],
  dogs: null,
  plants: null,
  tripStart: "",
  tripEnd: "",
  visitsPerDay: "1",
  visitTimes: [],
  propertyType: "",
  specialNotes: "",
  marketingConsent: false,
  privacyAccepted: false,
};

const STEPS = ["Contact", "Animals & Services", "Details", "Confirm"];

export default function FindASitterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverageResult, setCoverageResult] = useState<"matched" | "no-coverage" | null>(null);
  const [travelNetworkConsented, setTravelNetworkConsented] = useState(false);
  const [travelNetworkSubmitted, setTravelNetworkSubmitted] = useState(false);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // ── Animal tier helpers ──────────────────────────────────────────────────
  function toggleAnimal(type: string, tier: number) {
    setForm((prev) => {
      const exists = prev.animals.find((a) => a.type === type);
      if (exists) return { ...prev, animals: prev.animals.filter((a) => a.type !== type) };
      return { ...prev, animals: [...prev.animals, { type, tier, quantity: "1" }] };
    });
  }

  function setAnimalQty(type: string, quantity: string) {
    setForm((prev) => ({
      ...prev,
      animals: prev.animals.map((a) => (a.type === type ? { ...a, quantity } : a)),
    }));
  }

  const isChecked = (type: string) => form.animals.some((a) => a.type === type);
  const getQty = (type: string) => form.animals.find((a) => a.type === type)?.quantity ?? "1";

  // ── Dog helpers ──────────────────────────────────────────────────────────
  function toggleDogs() {
    setForm((prev) => ({
      ...prev,
      dogs: prev.dogs ? null : { count: "1", sizes: [] },
    }));
  }

  function setDogCount(count: string) {
    setForm((prev) => ({
      ...prev,
      dogs: prev.dogs ? { ...prev.dogs, count } : { count, sizes: [] },
    }));
  }

  function toggleDogSize(size: string) {
    setForm((prev) => {
      if (!prev.dogs) return prev;
      const sizes = prev.dogs.sizes.includes(size)
        ? prev.dogs.sizes.filter((s) => s !== size)
        : [...prev.dogs.sizes, size];
      return { ...prev, dogs: { ...prev.dogs, sizes } };
    });
  }

  // ── Plant helpers ────────────────────────────────────────────────────────
  function togglePlants() {
    setForm((prev) => ({
      ...prev,
      plants: prev.plants ? null : { count: "1 area", types: [] },
    }));
  }

  function setPlantCount(count: string) {
    setForm((prev) => ({
      ...prev,
      plants: prev.plants ? { ...prev.plants, count } : { count, types: [] },
    }));
  }

  function togglePlantType(type: string) {
    setForm((prev) => {
      if (!prev.plants) return prev;
      const types = prev.plants.types.includes(type)
        ? prev.plants.types.filter((t) => t !== type)
        : [...prev.plants.types, type];
      return { ...prev, plants: { ...prev.plants, types } };
    });
  }

  // ── Visit time helpers ───────────────────────────────────────────────────
  function toggleVisitTime(time: string) {
    setForm((prev) => {
      const times = prev.visitTimes.includes(time)
        ? prev.visitTimes.filter((t) => t !== time)
        : [...prev.visitTimes, time];
      return { ...prev, visitTimes: times };
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        const localMatch = COVERED_ZIPS.has(form.zip.trim());
        setCoverageResult(localMatch ? "matched" : "no-coverage");
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setError("Unable to submit. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const hasAnySvc = form.animals.length > 0 || form.dogs !== null || form.plants !== null;
  const canNext1 =
    form.firstName && form.lastName && form.email && form.city && form.state && form.zip;
  const canNext2 = hasAnySvc;

  function serviceSummary() {
    const parts: string[] = [];
    if (form.animals.length > 0)
      parts.push(form.animals.map((a) => `${a.quantity} ${a.type}`).join(", "));
    if (form.dogs)
      parts.push(
        `${form.dogs.count} dog${parseInt(form.dogs.count) !== 1 ? "s" : ""}` +
          (form.dogs.sizes.length ? ` (${form.dogs.sizes.join(", ")})` : "")
      );
    if (form.plants)
      parts.push(
        `Plants — ${form.plants.count}` +
          (form.plants.types.length ? ` (${form.plants.types.join(", ")})` : "")
      );
    return parts.join(" · ");
  }

  // ── Local match found ──────────────────────────────────────────────────────
  if (submitted && coverageResult === "matched") {
    return (
      <>
        <section className="bg-barn-dark py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-cream">Request Submitted</h1>
          </div>
        </section>
        <section className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="bg-sage/10 border border-sage rounded-2xl p-10">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-barn mb-3">We received your request</h2>
            <p className="text-earth-dark mb-3 max-w-md mx-auto leading-relaxed">
              Our team will review your inquiry and match you with a credentialed sitter in your
              area. You&rsquo;ll hear from us within 24–48 hours.
            </p>
            <p className="text-sm text-earth-light mb-8">
              Check your email for a confirmation. We&rsquo;ll be in touch shortly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/" className="px-6 py-2.5 bg-barn text-white rounded-lg font-semibold hover:bg-barn-light transition-colors">
                Back to Home
              </Link>
              <Link href="/resources" className="px-6 py-2.5 border border-barn text-barn rounded-lg font-semibold hover:bg-barn/5 transition-colors">
                Browse Free Resources
              </Link>
            </div>
          </div>
        </section>
        {/* Founding member upsell for matched owners too */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          <div className="bg-cream-dark border border-wheat rounded-2xl p-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-2">Founding Member Program</p>
            <h3 className="text-lg font-bold text-barn-dark mb-2">
              Join our Founding Members list for future trips
            </h3>
            <p className="text-sm text-earth-dark mb-5 max-w-md mx-auto">
              Be the first to hear about new sitters, service expansions, and early-access perks —
              reserved for our founding community of animal owners.
            </p>
            <Link
              href="/founding-members"
              className="inline-block px-7 py-2.5 bg-sage text-white font-semibold rounded-lg hover:bg-sage/80 transition-colors text-sm"
            >
              Learn About Founding Members →
            </Link>
          </div>
        </section>
      </>
    );
  }

  // ── No local coverage → Founding Member + Travel Network ──────────────────
  if (submitted && coverageResult === "no-coverage") {
    if (travelNetworkSubmitted) {
      return (
        <>
          <section className="bg-sage py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="text-4xl mb-3">✓</div>
              <h1 className="text-3xl font-bold text-white">You&rsquo;re in the network</h1>
              <p className="text-white/70 mt-2 text-lg">Your request is now visible to our Travel Network sitters.</p>
            </div>
          </section>
          <section className="max-w-2xl mx-auto px-4 py-10 space-y-5">
            {/* What happens next */}
            <div className="bg-white border border-wheat rounded-2xl p-7">
              <h2 className="text-base font-bold text-barn-dark mb-4">What happens next</h2>
              <div className="space-y-4">
                {[
                  { icon: "👀", text: "Credentialed sitters with your animal types can see your request — city, animal summary, and care window only." },
                  { icon: "✋", text: "A sitter who is interested and able to travel will express interest to our team." },
                  { icon: "📞", text: "We'll review their profile, confirm they're a fit, and reach out to you directly to make the introduction." },
                  { icon: "🤝", text: "You connect directly from there. Your care request expires in 30 days." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <p className="text-sm text-earth-dark leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-wheat pt-4">
                <p className="text-xs text-earth/60 leading-relaxed">
                  Your personal contact information is never shown to sitters directly. All introductions are
                  facilitated by our team. This does not guarantee a match.
                </p>
              </div>
            </div>

            {/* Founding member CTA */}
            <div className="bg-barn-dark rounded-2xl p-7 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-earth-light mb-2">
                While you wait
              </p>
              <h3 className="text-xl font-bold text-cream mb-3">
                Be first when a local sitter joins
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-5 max-w-md mx-auto">
                Your ZIP is on our expansion radar. Join our Founding Members list and you&rsquo;ll be
                the first person we contact the moment a credentialed sitter becomes active near{" "}
                <strong className="text-wheat">{form.city || form.zip}</strong>.
              </p>
              <Link
                href={`/founding-members?zip=${form.zip}&source=travel-network`}
                className="inline-block px-7 py-3 bg-sage text-white font-bold rounded-lg hover:bg-sage/80 transition-colors"
              >
                Join as a Founding Member — Free →
              </Link>
              <p className="text-cream/30 text-xs mt-3">Takes 60 seconds &middot; No spam</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/resources" className="text-sm text-barn font-semibold hover:underline">
                Browse free animal care resources →
              </Link>
              <span className="text-earth-light text-sm">or</span>
              <Link href="/" className="text-sm text-earth hover:text-barn transition-colors">
                Return to home
              </Link>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        {/* Hero — warm, forward-looking, not apologetic */}
        <section className="bg-barn-dark py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-4xl mb-3">📍</div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream mb-3">
              Your request is saved.<br />
              <span className="text-wheat">Your area is on our map.</span>
            </h1>
            <p className="text-cream/60 text-lg max-w-xl mx-auto">
              We don&rsquo;t have local coverage near{" "}
              <strong className="text-cream/90">{form.city || form.zip}</strong> yet —
              but we&rsquo;re actively expanding, and your inquiry is exactly how we decide where to go next.
            </p>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-10 space-y-5">
          {/* Primary: Founding Member CTA */}
          <div className="bg-white border-2 border-sage rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="text-xs font-bold text-sage uppercase tracking-wide">Founding Member Program</p>
                <p className="text-lg font-bold text-barn-dark">Be first when we come to your area</p>
              </div>
            </div>
            <p className="text-sm text-earth-dark leading-relaxed mb-5">
              Join our Founding Members list and we&rsquo;ll notify you the moment a credentialed
              sitter becomes active near you. Your location is now part of our expansion data —
              Founding Members in an area are the first people we call when coverage arrives.
            </p>
            <div className="bg-sage/5 border border-sage/20 rounded-xl px-5 py-4 mb-5 space-y-2">
              {[
                "First notification when a sitter covers your ZIP",
                "Monthly expansion updates for your region",
                "Permanent Founding Member recognition",
                "Free access to our full animal care resource library",
                "Direct line to our team for urgent care needs",
              ].map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-earth-dark">
                  <span className="text-sage font-bold shrink-0">✓</span>
                  {b}
                </div>
              ))}
            </div>
            <Link
              href={`/founding-members?zip=${form.zip}&firstName=${encodeURIComponent(form.firstName)}&email=${encodeURIComponent(form.email)}&source=find-a-sitter`}
              className="block w-full text-center py-3 bg-sage text-white font-bold rounded-lg hover:bg-sage/80 transition-colors"
            >
              Join as a Founding Member — Free →
            </Link>
            <p className="text-xs text-earth/50 text-center mt-2">60 seconds &middot; No account &middot; No spam</p>
          </div>

          {/* Secondary: Travel Network */}
          <div className="bg-white border border-wheat rounded-2xl p-7">
            <h3 className="text-base font-bold text-barn-dark mb-2 flex items-center gap-2">
              <span>✈️</span> Need care for an upcoming trip?
            </h3>
            <p className="text-sm text-earth-dark leading-relaxed mb-5">
              We can also broadcast your request to our <strong>Expanded Travel Network</strong> —
              credentialed sitters willing to travel for the right assignment. If a sitter
              expresses interest, our team facilitates the introduction.
            </p>

            <div className="bg-cream-dark rounded-lg px-4 py-3 mb-5 space-y-1.5 text-xs text-earth-dark">
              <div className="flex items-start gap-2">
                <span className="text-sage font-bold shrink-0">✓</span>
                <span>Your contact information is never shown to sitters directly</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sage font-bold shrink-0">✓</span>
                <span>Only credentialed, background-checked sitters can see requests</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sage font-bold shrink-0">✓</span>
                <span>All introductions are facilitated by our team — no unsolicited contact</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-earth-light font-bold shrink-0">○</span>
                <span className="text-earth-light">Does not guarantee a match &middot; Request expires in 30 days</span>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-5">
              <input
                type="checkbox"
                checked={travelNetworkConsented}
                onChange={(e) => setTravelNetworkConsented(e.target.checked)}
                className="accent-rust mt-0.5"
              />
              <span className="text-sm text-earth-dark leading-relaxed">
                I consent to submitting my request to The Farm Sitter&rsquo;s Expanded Travel Network.
                I understand my personal contact details will not be shared publicly.
              </span>
            </label>

            <button
              onClick={() => setTravelNetworkSubmitted(true)}
              disabled={!travelNetworkConsented}
              className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Submit to Expanded Travel Network
            </button>
          </div>

          {/* Decline */}
          <div className="text-center pt-2">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/resources" className="text-sm text-barn font-semibold hover:underline">
                Browse free resources →
              </Link>
              <Link href="/contact" className="text-sm text-earth hover:text-barn transition-colors">
                Contact us directly
              </Link>
              <Link href="/" className="text-sm text-earth hover:text-barn transition-colors">
                Return to home
              </Link>
            </div>
            <p className="text-xs text-earth-light mt-4 max-w-md mx-auto">
              Your inquiry is already saved. We track every unmet-demand signal and use it to
              prioritize new areas for operator recruitment.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-barn-dark py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-3">Find a Farm Sitter</h1>
          <p className="text-cream/70 text-lg">
            Tell us about your animals and we&rsquo;ll connect you with a qualified sitter in your
            area.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12">
        {/* Step progress */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i < step
                      ? "bg-sage text-white"
                      : i === step
                      ? "bg-rust text-white"
                      : "bg-wheat text-earth"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block text-center ${
                    i === step ? "text-rust" : "text-earth-light"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-sage" : "bg-wheat"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 1: Contact ── */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-barn-dark">About You</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-barn mb-1">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">State *</label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="IL"
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">ZIP Code *</label>
              <input
                type="text"
                value={form.zip}
                onChange={(e) => setField("zip", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(1)}
                disabled={!canNext1}
                className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Animals & Services →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Animals & Services ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-barn-dark">Animals & Services</h2>
              <p className="text-sm text-earth-dark mt-1">
                Select all that apply. Check each type and fill in quantities — this helps us
                find the right sitter for your specific needs.
              </p>
            </div>

            {ANIMAL_TIERS.map(({ tier, label, note, animals }) => (
              <div key={tier} className="border border-wheat rounded-xl overflow-hidden">
                <div className="bg-wheat-light px-4 py-2.5 flex items-center justify-between">
                  <span className="font-semibold text-barn text-sm">{label}</span>
                  <span className="text-xs text-earth-dark">{note}</span>
                </div>
                <div className="p-3 space-y-2">
                  {animals.map((animal) => {
                    const checked = isChecked(animal);
                    return (
                      <div
                        key={animal}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors ${
                          checked ? "border-earth bg-cream-dark" : "border-wheat bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={`animal-${animal}`}
                          checked={checked}
                          onChange={() => toggleAnimal(animal, tier)}
                          className="accent-barn w-4 h-4 shrink-0"
                        />
                        <label
                          htmlFor={`animal-${animal}`}
                          className="flex-1 text-sm text-earth-dark cursor-pointer"
                        >
                          {animal}
                        </label>
                        {checked && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-earth-light">Qty:</span>
                            <select
                              value={getQty(animal)}
                              onChange={(e) => setAnimalQty(animal, e.target.value)}
                              className="text-sm px-2 py-1 rounded border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth"
                            >
                              {QUANTITIES.map((q) => (
                                <option key={q} value={q}>
                                  {q}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Dogs section */}
            <div
              className={`border rounded-xl overflow-hidden transition-colors ${
                form.dogs ? "border-earth" : "border-wheat"
              }`}
            >
              <div
                className={`px-4 py-3 flex items-center gap-3 cursor-pointer ${
                  form.dogs ? "bg-cream-dark" : "bg-wheat-light"
                }`}
                onClick={toggleDogs}
              >
                <input
                  type="checkbox"
                  checked={form.dogs !== null}
                  onChange={toggleDogs}
                  className="accent-barn w-4 h-4 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <span className="font-semibold text-barn text-sm">Dogs</span>
                  <span className="text-xs text-earth-dark ml-2">— standalone dog care</span>
                </div>
              </div>
              {form.dogs && (
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <p className="text-xs font-semibold text-barn mb-2">How many dogs?</p>
                    <div className="flex flex-wrap gap-2">
                      {DOG_COUNTS.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setDogCount(n)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                            form.dogs?.count === n
                              ? "bg-barn text-white border-barn"
                              : "bg-white text-earth-dark border-wheat hover:border-earth"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-barn mb-2">
                      Size(s) — select all that apply
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DOG_SIZES.map((size) => {
                        const active = form.dogs?.sizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleDogSize(size)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                              active
                                ? "bg-barn text-white border-barn"
                                : "bg-white text-earth-dark border-wheat hover:border-earth"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-earth-light mt-2">
                      Size and breed mix helps your sitter prepare. All details confirmed at meet
                      &amp; greet.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Plants section */}
            <div
              className={`border rounded-xl overflow-hidden transition-colors ${
                form.plants ? "border-earth" : "border-wheat"
              }`}
            >
              <div
                className={`px-4 py-3 flex items-center gap-3 cursor-pointer ${
                  form.plants ? "bg-cream-dark" : "bg-wheat-light"
                }`}
                onClick={togglePlants}
              >
                <input
                  type="checkbox"
                  checked={form.plants !== null}
                  onChange={togglePlants}
                  className="accent-barn w-4 h-4 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <span className="font-semibold text-barn text-sm">Plants / Garden Care</span>
                  <span className="text-xs text-earth-dark ml-2">
                    — indoor, outdoor, or greenhouse
                  </span>
                </div>
              </div>
              {form.plants && (
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <p className="text-xs font-semibold text-barn mb-2">Type of plant care</p>
                    <div className="flex flex-wrap gap-2">
                      {PLANT_TYPES.map((type) => {
                        const active = form.plants?.types.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => togglePlantType(type)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                              active
                                ? "bg-sage text-white border-sage"
                                : "bg-white text-earth-dark border-wheat hover:border-earth"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-barn mb-2">Number of areas / zones</p>
                    <div className="flex flex-wrap gap-2">
                      {PLANT_COUNTS.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setPlantCount(n)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                            form.plants?.count === n
                              ? "bg-sage text-white border-sage"
                              : "bg-white text-earth-dark border-wheat hover:border-earth"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {hasAnySvc && (
              <div className="bg-sage-light/20 border border-sage-light rounded-lg p-3 text-sm text-sage-dark">
                <strong>Selected:</strong> {serviceSummary()}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-2.5 text-earth-dark border border-wheat rounded-lg hover:bg-cream-dark transition-colors text-sm"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!canNext2}
                className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Care Details →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Details ── */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-barn-dark">Care Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Trip Start Date
                </label>
                <input
                  type="date"
                  value={form.tripStart}
                  onChange={(e) => setField("tripStart", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Trip End Date</label>
                <input
                  type="date"
                  value={form.tripEnd}
                  onChange={(e) => setField("tripEnd", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-2">
                Visits Needed Per Day
              </label>
              <div className="flex gap-2 flex-wrap">
                {VISITS_PER_DAY.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setField("visitsPerDay", n)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      form.visitsPerDay === n
                        ? "bg-barn text-white border-barn"
                        : "bg-white text-earth-dark border-wheat hover:border-earth"
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">
                Preferred Visit Times{" "}
                <span className="font-normal text-earth-light">(select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {VISIT_TIMES.map((time) => {
                  const active = form.visitTimes.includes(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleVisitTime(time)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        active
                          ? "bg-barn text-white border-barn"
                          : "bg-white text-earth-dark border-wheat hover:border-earth"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Property Type</label>
              <select
                value={form.propertyType}
                onChange={(e) => setField("propertyType", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              >
                <option value="">Select...</option>
                {PROPERTY_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">
                Additional Notes
              </label>
              <textarea
                rows={4}
                value={form.specialNotes}
                onChange={(e) => setField("specialNotes", e.target.value)}
                placeholder="Special care needs, medications, access instructions, anything else we should know..."
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark placeholder-earth-light focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth resize-none"
              />
            </div>
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-earth-dark border border-wheat rounded-lg hover:bg-cream-dark transition-colors text-sm"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
              >
                Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Confirm ── */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-barn-dark">Review & Submit</h2>

            <div className="bg-cream-dark rounded-xl p-5 space-y-3 text-sm">
              <Row label="Name" value={`${form.firstName} ${form.lastName}`} />
              <Row label="Email" value={form.email} />
              {form.phone && <Row label="Phone" value={form.phone} />}
              <Row label="Location" value={`${form.city}, ${form.state} ${form.zip}`} />
              {form.animals.length > 0 && (
                <Row
                  label="Farm Animals"
                  value={form.animals.map((a) => `${a.quantity} ${a.type}`).join(", ")}
                />
              )}
              {form.dogs && (
                <Row
                  label="Dogs"
                  value={
                    `${form.dogs.count} dog${parseInt(form.dogs.count) !== 1 ? "s" : ""}` +
                    (form.dogs.sizes.length ? ` — ${form.dogs.sizes.join(", ")}` : "")
                  }
                />
              )}
              {form.plants && (
                <Row
                  label="Plants"
                  value={
                    form.plants.count +
                    (form.plants.types.length ? ` — ${form.plants.types.join(", ")}` : "")
                  }
                />
              )}
              {(form.tripStart || form.tripEnd) && (
                <Row
                  label="Dates"
                  value={[form.tripStart, form.tripEnd].filter(Boolean).join(" → ")}
                />
              )}
              <Row label="Visits/day" value={`${form.visitsPerDay}x`} />
              {form.visitTimes.length > 0 && (
                <Row label="Visit times" value={form.visitTimes.join(", ")} />
              )}
              {form.propertyType && <Row label="Property" value={form.propertyType} />}
              {form.specialNotes && <Row label="Notes" value={form.specialNotes} />}
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketingConsent}
                  onChange={(e) => setField("marketingConsent", e.target.checked)}
                  className="accent-barn mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-sm text-earth-dark">
                  Send me a reminder before peak travel seasons and occasional free farm care
                  resources. No account needed — unsubscribe anytime.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(e) => setField("privacyAccepted", e.target.checked)}
                  className="accent-barn mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-sm text-earth-dark">
                  I agree to the{" "}
                  <a href="/privacy" className="text-barn underline hover:text-rust">
                    Privacy Policy
                  </a>{" "}
                  and understand my information will be used to match me with a certified Farm
                  Sitter. *
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-rust/10 border border-rust/30 text-rust rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-earth-dark border border-wheat rounded-lg hover:bg-cream-dark transition-colors text-sm"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.privacyAccepted || submitting}
                className="px-8 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-semibold text-barn w-28 shrink-0">{label}:</span>
      <span className="text-earth-dark">{value}</span>
    </div>
  );
}
