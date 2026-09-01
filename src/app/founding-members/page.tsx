"use client";

import { useState } from "react";
import Link from "next/link";

const ANIMAL_OPTIONS = [
  "Horses / Equine",
  "Goats / Sheep / Llamas",
  "Cattle / Livestock",
  "Pigs",
  "Poultry / Chickens / Ducks",
  "Dogs",
  "Cats",
  "Rabbits / Small Animals",
  "Specialty / Exotic",
];

const FOUNDING_BENEFITS = [
  {
    icon: "🔔",
    title: "First to Know",
    desc: "The moment a credentialed sitter is active in your area, you'll be the first person we call.",
  },
  {
    icon: "🏆",
    title: "Founding Member Status",
    desc: "Permanent recognition as a founding community member on your profile and in our records.",
  },
  {
    icon: "📍",
    title: "Shape Our Expansion",
    desc: "Your location signals tell us exactly where to recruit next. You're driving where we grow.",
  },
  {
    icon: "📬",
    title: "Expansion Updates",
    desc: "Monthly email updates on sitter credentialing activity near your ZIP — no noise, just signal.",
  },
  {
    icon: "📚",
    title: "Free Resource Access",
    desc: "Immediate access to our full animal care resource library — vet contacts, care guides, checklists.",
  },
  {
    icon: "🤝",
    title: "Direct Line to Our Team",
    desc: "Have a care need now? Founding Members get a direct response from our team, not a form letter.",
  },
];

const VIP_BENEFITS = [
  "Everything in Founding Member",
  "Personal call from our team when coverage reaches your area",
  "Priority queue for new sitter referrals",
  "Guaranteed 24-hour response to every inquiry",
  "Dedicated care coordinator assigned to your property",
  "Invitation to provide feedback on new sitters in your area",
  "Early access to new platform features",
];

type FormState = "idle" | "submitting" | "done" | "error";

export default function FoundingMembersPage() {
  const [tier, setTier] = useState<"FOUNDING" | "VIP">("FOUNDING");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zip: "",
    city: "",
    state: "",
    animalTypes: [] as string[],
  });
  const [formState, setFormState] = useState<FormState>("idle");

  function toggleAnimal(a: string) {
    setForm((prev) => ({
      ...prev,
      animalTypes: prev.animalTypes.includes(a)
        ? prev.animalTypes.filter((x) => x !== a)
        : [...prev.animalTypes, a],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.zip) return;
    setFormState("submitting");
    try {
      const res = await fetch("/api/founding-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tier }),
      });
      setFormState(res.ok ? "done" : "error");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "done") {
    return (
      <>
        <section className="bg-sage py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="text-6xl mb-5">🌱</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {tier === "VIP" ? "Welcome, VIP Member" : "Welcome, Founding Member"}
            </h1>
            <p className="text-white/80 text-lg max-w-lg mx-auto">
              You&rsquo;re officially part of our founding community. We&rsquo;ll be in touch the
              moment coverage reaches your area.
            </p>
          </div>
        </section>
        <section className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white border border-wheat rounded-2xl p-10 space-y-6">
            <div>
              <p className="font-bold text-barn-dark text-lg mb-2">What happens next</p>
              <div className="space-y-3 text-sm text-earth-dark text-left max-w-md mx-auto">
                {[
                  "Check your inbox — a confirmation email is on its way.",
                  "We'll track sitter credentialing activity near your ZIP code.",
                  tier === "VIP"
                    ? "When a sitter becomes available, you'll receive a personal call from our team."
                    : "When a sitter becomes available in your area, you'll be first to hear about it.",
                  "In the meantime, browse our free resource library for your animals.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-sage text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/resources"
                className="px-6 py-2.5 bg-barn text-cream font-semibold rounded-lg hover:bg-barn-light transition-colors"
              >
                Browse Free Resources
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 border border-wheat text-earth-dark rounded-lg hover:bg-cream-dark transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-sage overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage to-earth opacity-80" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
            Early Access Program
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Be First When We Come<br />
            <span className="text-wheat">to Your Area</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            We&rsquo;re growing — and your community is on our map. Join as a Founding Member
            and you&rsquo;ll be the first person we contact the moment a credentialed farm sitter
            is active near you.
          </p>
          <a
            href="#join"
            className="inline-block px-10 py-3.5 bg-white text-sage font-bold rounded-lg hover:bg-wheat transition-colors text-lg"
          >
            Join Free — Takes 60 Seconds
          </a>
          <p className="text-white/40 text-xs mt-3">
            No account required &middot; No spam &middot; Cancel anytime
          </p>
        </div>
      </section>

      {/* ── What You're Joining ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sage text-sm font-semibold uppercase tracking-widest mb-2">
            Why It Matters
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-barn-dark mb-3">
            You&rsquo;re not on a waitlist.<br />You&rsquo;re on our radar.
          </h2>
          <p className="text-earth-dark max-w-2xl mx-auto leading-relaxed">
            Every farm owner who joins this list shapes where we recruit next. We don&rsquo;t
            expand randomly — we follow the demand. Your ZIP code tells us exactly where to
            focus our next credentialing push.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOUNDING_BENEFITS.map((b) => (
            <div key={b.title} className="bg-white border border-wheat rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sage/50 transition-all">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-barn-dark mb-2">{b.title}</h3>
              <p className="text-sm text-earth-dark leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tier Comparison ──────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sage text-sm font-semibold uppercase tracking-widest mb-2">
              Two Ways to Join
            </p>
            <h2 className="text-3xl font-bold text-barn-dark">
              Founding Member or VIP
            </h2>
            <p className="text-earth-dark mt-3 max-w-xl mx-auto">
              Both are completely free. VIP is invite-based and limited — it&rsquo;s for farm
              owners with multi-animal properties who need a deeper level of service commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founding */}
            <div
              onClick={() => setTier("FOUNDING")}
              className={`bg-white rounded-2xl border-2 p-7 cursor-pointer transition-all ${
                tier === "FOUNDING" ? "border-sage shadow-md" : "border-wheat hover:border-sage/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-sage uppercase tracking-wide">Founding Member</p>
                  <p className="text-2xl font-bold text-barn-dark mt-0.5">Free</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  tier === "FOUNDING" ? "border-sage bg-sage" : "border-earth-light"
                }`}>
                  {tier === "FOUNDING" && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
              <ul className="space-y-2.5">
                {FOUNDING_BENEFITS.map((b) => (
                  <li key={b.title} className="flex items-start gap-2 text-sm text-earth-dark">
                    <span className="text-sage font-bold shrink-0 mt-0.5">✓</span>
                    {b.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* VIP */}
            <div
              onClick={() => setTier("VIP")}
              className={`rounded-2xl border-2 p-7 cursor-pointer transition-all relative overflow-hidden ${
                tier === "VIP"
                  ? "border-barn bg-barn-dark shadow-md"
                  : "bg-white border-wheat hover:border-barn/50"
              }`}
            >
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  tier === "VIP" ? "bg-rust text-white" : "bg-rust/10 text-rust"
                }`}>
                  Limited
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wide ${tier === "VIP" ? "text-earth-light" : "text-barn"}`}>
                    VIP Member
                  </p>
                  <p className={`text-2xl font-bold mt-0.5 ${tier === "VIP" ? "text-cream" : "text-barn-dark"}`}>
                    Free at Launch
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  tier === "VIP" ? "border-cream bg-cream" : "border-earth-light"
                }`}>
                  {tier === "VIP" && <div className="w-2 h-2 bg-barn rounded-full" />}
                </div>
              </div>
              <ul className="space-y-2.5">
                {VIP_BENEFITS.map((b) => (
                  <li key={b} className={`flex items-start gap-2 text-sm ${tier === "VIP" ? "text-cream/80" : "text-earth-dark"}`}>
                    <span className={`font-bold shrink-0 mt-0.5 ${tier === "VIP" ? "text-wheat" : "text-barn"}`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Join Form ─────────────────────────────────────────────────────── */}
      <section id="join" className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <p className="text-sage text-sm font-semibold uppercase tracking-widest mb-2">
            Join Now
          </p>
          <h2 className="text-3xl font-bold text-barn-dark mb-3">
            Reserve Your Spot
          </h2>
          <p className="text-earth-dark">
            You&rsquo;re currently signed up as a{" "}
            <button
              onClick={() => setTier(tier === "VIP" ? "FOUNDING" : "VIP")}
              className="text-sage font-semibold hover:underline"
            >
              {tier === "VIP" ? "VIP Member — switch to Founding Member" : "Founding Member — upgrade to VIP"}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-wheat rounded-2xl p-8 space-y-5 shadow-sm">
          {/* Tier badge */}
          <div className={`rounded-lg px-4 py-3 flex items-center gap-3 ${
            tier === "VIP" ? "bg-barn-dark text-cream" : "bg-sage/10 text-sage"
          }`}>
            <span className="text-xl">{tier === "VIP" ? "⭐" : "🌱"}</span>
            <div>
              <p className="text-sm font-bold">{tier === "VIP" ? "VIP Member" : "Founding Member"}</p>
              <p className={`text-xs ${tier === "VIP" ? "text-cream/60" : "text-sage/70"}`}>
                {tier === "VIP"
                  ? "Personal outreach when coverage reaches your area"
                  : "First notification when a sitter is available near you"}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-barn mb-1.5">First Name *</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
                placeholder="Sarah"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-barn mb-1.5">Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
                placeholder="Mitchell"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-barn mb-1.5">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
              placeholder="you@example.com"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-barn mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
                placeholder="Springfield"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-barn mb-1.5">ZIP *</label>
              <input
                type="text"
                required
                value={form.zip}
                onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))}
                className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
                placeholder="62701"
                maxLength={5}
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-barn mb-1.5">State</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
              className="w-full border border-wheat rounded-lg px-3 py-2.5 text-sm text-barn-dark focus:outline-none focus:border-sage"
              placeholder="IL"
              maxLength={2}
            />
          </div>

          {/* Animals */}
          <div>
            <label className="block text-xs font-semibold text-barn mb-2">
              What animals do you have? <span className="text-earth font-normal">(select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ANIMAL_OPTIONS.map((a) => (
                <label key={a} className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 cursor-pointer border transition-all ${
                  form.animalTypes.includes(a)
                    ? "bg-sage/10 border-sage text-sage font-semibold"
                    : "border-wheat text-earth-dark hover:border-sage/50"
                }`}>
                  <input
                    type="checkbox"
                    checked={form.animalTypes.includes(a)}
                    onChange={() => toggleAnimal(a)}
                    className="sr-only"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          {formState === "error" && (
            <p className="text-sm text-rust text-center">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={formState === "submitting" || !form.firstName || !form.email || !form.zip}
            className={`w-full py-3.5 font-bold rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              tier === "VIP"
                ? "bg-barn text-cream hover:bg-barn-light"
                : "bg-sage text-white hover:bg-sage/80"
            }`}
          >
            {formState === "submitting"
              ? "Joining..."
              : tier === "VIP"
              ? "Join as VIP Member →"
              : "Join as Founding Member →"}
          </button>

          <p className="text-xs text-earth/50 text-center">
            No account required. We&rsquo;ll only email you about coverage in your area and relevant updates.
            Unsubscribe anytime.
          </p>
        </form>
      </section>

      {/* ── Expansion story ───────────────────────────────────────────────── */}
      <section className="bg-barn-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-3">
            The Bigger Picture
          </p>
          <h2 className="text-3xl font-bold text-cream mb-5">
            You&rsquo;re helping build something real
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Every inquiry we receive from a new ZIP code tells us where to recruit next. When
            enough founding members in the same area join, we activate our recruitment pipeline
            there — reaching out to experienced local animal caretakers and guiding them
            through our credentialing process.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "5", label: "Launch States" },
              { value: "40+", label: "Training Modules" },
              { value: "Growing", label: "Community" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-wheat">{s.value}</p>
                <p className="text-xs text-cream/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold text-barn-dark text-center mb-8">Common Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is this really free?",
              a: "Yes — both tiers are completely free to join right now. We're building our community first. Future premium features may carry a fee, but Founding Member status is locked in at no cost.",
            },
            {
              q: "What's the difference between Founding Member and VIP?",
              a: "Founding Members receive all updates and first notification. VIP members are a smaller, higher-touch group — when coverage reaches your area, we'll make a personal call rather than just an email, and you'll be at the front of every matching queue.",
            },
            {
              q: "How will I know when there's a sitter near me?",
              a: "We'll email you directly with the sitter's profile and service area the moment they're credentialed and active in your region. VIP members also get a personal call.",
            },
            {
              q: "Does joining guarantee a sitter will come to my area?",
              a: "We can't guarantee a timeline — but your signup genuinely influences our recruitment priorities. The more founding members in an area, the faster we act.",
            },
            {
              q: "Can I still submit a care inquiry if I join?",
              a: "Absolutely. Joining this list is separate from submitting a care request. Use the Find a Sitter form anytime — we'll do our best to match you, and if we can't, your founding member status means you'll be first in line when we can.",
            },
          ].map((faq) => (
            <details key={faq.q} className="bg-white border border-wheat rounded-xl p-5 group">
              <summary className="font-semibold text-barn-dark cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-earth-light text-lg">+</span>
              </summary>
              <p className="text-sm text-earth-dark mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-barn-dark font-bold text-lg mb-2">Ready to join?</p>
          <p className="text-earth-dark text-sm mb-6">
            It takes 60 seconds and costs nothing. You&rsquo;ll be part of something that changes
            how farm animal care works across the country.
          </p>
          <a
            href="#join"
            className="inline-block px-10 py-3.5 bg-sage text-white font-bold rounded-lg hover:bg-sage/80 transition-colors"
          >
            Join Free Now →
          </a>
          <p className="text-xs text-earth/50 mt-3">
            Already submitted a care request?{" "}
            <Link href="/find-a-sitter" className="hover:underline text-earth">
              Return to Find a Sitter
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
