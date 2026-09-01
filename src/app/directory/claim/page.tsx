"use client";

import { useState } from "react";
import Link from "next/link";
import { DIRECTORY_CATEGORIES } from "@/lib/directory-data";

type FormStep = "type" | "details" | "contact" | "done";
type ListingType = "new" | "claim";

export default function ClaimPage() {
  const [step, setStep] = useState<FormStep>("type");
  const [listingType, setListingType] = useState<ListingType>("new");
  const [form, setForm] = useState({
    businessName: "",
    categoryId: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    city: "",
    state: "IL",
    zip: "",
    serviceRadius: "",
    phone: "",
    website: "",
    description: "",
    speciesServed: [] as string[],
    emergencyAvailable: false,
    existingSlug: "",
  });

  const SPECIES = ["Horses", "Donkeys / Mules", "Cattle", "Goats", "Sheep", "Llamas / Alpacas", "Pigs", "Poultry", "Dogs / Cats"];

  function toggleSpecies(s: string) {
    setForm((f) => ({
      ...f,
      speciesServed: f.speciesServed.includes(s)
        ? f.speciesServed.filter((x) => x !== s)
        : [...f.speciesServed, s],
    }));
  }

  if (step === "done") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="text-5xl mb-5">🎉</div>
          <h1 className="text-2xl font-bold text-barn-dark mb-3">
            Thank you — we&rsquo;ll be in touch!
          </h1>
          <p className="text-earth-dark leading-relaxed mb-6">
            Your submission has been received. Our team will review your information and reach out
            to confirm your listing or claim within 2–3 business days.
          </p>
          <div className="bg-wheat-light/50 border border-wheat rounded-xl p-5 text-left mb-6">
            <p className="text-sm font-semibold text-barn mb-2">What happens next?</p>
            <ol className="space-y-2 text-sm text-earth-dark">
              <li className="flex gap-2"><span className="text-barn font-bold">1.</span> We review your submission for accuracy and completeness.</li>
              <li className="flex gap-2"><span className="text-barn font-bold">2.</span> Your listing is published as <strong>Listed</strong> or <strong>Claimed</strong> depending on verification.</li>
              <li className="flex gap-2"><span className="text-barn font-bold">3.</span> You&rsquo;ll receive email confirmation with a link to your profile.</li>
            </ol>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/directory" className="px-6 py-2.5 bg-barn text-cream font-semibold rounded-lg hover:bg-barn-light transition-colors text-sm">
              Browse the Directory
            </Link>
            <Link href="/" className="px-6 py-2.5 bg-transparent border border-wheat text-barn font-semibold rounded-lg hover:bg-wheat-light transition-colors text-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-barn-dark py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/directory" className="text-earth-light text-sm hover:text-wheat-light mb-4 inline-flex items-center gap-1">
            ← Rural Services Directory
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-3">
            Join the Founding Directory
          </h1>
          <p className="text-cream/70 leading-relaxed max-w-xl mx-auto">
            List your rural or equine service business at no cost. Help horse owners and farmers
            in your area find the trusted support they need.
          </p>
          <p className="text-wheat/70 text-sm mt-3">
            Free to join &middot; No credit card &middot; No long-term commitment
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-wheat-light border-b border-wheat">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {(["type", "details", "contact"] as FormStep[]).map((s, i) => {
              const labels: Record<string, string> = { type: "Listing Type", details: "Business Info", contact: "Contact & Submit" };
              const stepNums: Record<string, number> = { type: 1, details: 2, contact: 3 };
              const done = stepNums[step] > stepNums[s];
              const active = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <div className={`h-px w-8 ${done ? "bg-sage" : "bg-wheat"}`} />}
                  <div className={`flex items-center gap-2 text-xs font-semibold ${active ? "text-barn" : done ? "text-sage" : "text-earth-light"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${active ? "bg-rust text-white" : done ? "bg-sage text-white" : "bg-wheat text-earth"}`}>
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="hidden sm:inline">{labels[s]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Step 1: Type */}
        {step === "type" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-barn-dark mb-2">What would you like to do?</h2>
              <p className="text-earth-dark text-sm">We may already have a listing for your business. You can claim it and take control, or add a brand new listing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { type: "claim" as ListingType, title: "Claim an Existing Listing", desc: "We may have already added your business. Claim it to update your info and take ownership.", icon: "📋" },
                { type: "new" as ListingType, title: "Add a New Listing", desc: "Your business isn't in the directory yet. Create a new listing from scratch.", icon: "➕" },
              ] as const).map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setListingType(opt.type)}
                  className={`text-left p-6 rounded-xl border-2 transition-all ${listingType === opt.type ? "border-barn bg-barn/5" : "border-wheat bg-white hover:border-earth-light"}`}
                >
                  <span className="text-3xl mb-3 block">{opt.icon}</span>
                  <h3 className="font-bold text-barn-dark mb-1">{opt.title}</h3>
                  <p className="text-sm text-earth-dark leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>

            {listingType === "claim" && (
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Search for your business name</label>
                <input
                  type="text"
                  placeholder="Enter your business name..."
                  value={form.existingSlug}
                  onChange={(e) => setForm({ ...form, existingSlug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
                <p className="text-xs text-earth-light mt-1">
                  We&rsquo;ll check our records. If we find your listing, we&rsquo;ll connect you to it.
                </p>
              </div>
            )}

            <button
              onClick={() => setStep("details")}
              className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === "details" && (
          <form
            onSubmit={(e) => { e.preventDefault(); setStep("contact"); }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-barn-dark">Business Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-barn mb-1">Business Name *</label>
                <input
                  required
                  type="text"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-barn mb-1">Service Category *</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                >
                  <option value="">Select a category...</option>
                  {DIRECTORY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                  <option value="other">Other (not listed)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-barn mb-1">City *</label>
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">State *</label>
                <select
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                >
                  {["IL", "IA", "MO", "IN", "WI", "MN", "OH", "MI", "KY", "TN", "Other"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">ZIP Code</label>
                <input
                  type="text"
                  maxLength={5}
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Service Radius</label>
                <input
                  type="text"
                  placeholder="e.g. 30 miles, Regional, Statewide"
                  value={form.serviceRadius}
                  onChange={(e) => setForm({ ...form, serviceRadius: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Business Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Website or Facebook</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Species Served</label>
              <div className="flex flex-wrap gap-2">
                {SPECIES.map((s) => {
                  const active = form.speciesServed.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpecies(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${active ? "bg-sage/20 border-sage text-barn" : "bg-white border-wheat text-earth-dark hover:border-earth-light"}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">
                Brief Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your services, experience, and service area in a few sentences..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth resize-none"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.emergencyAvailable}
                onChange={(e) => setForm({ ...form, emergencyAvailable: e.target.checked })}
                className="accent-rust"
              />
              <span className="text-sm text-earth-dark">I offer emergency or urgent-response services</span>
            </label>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep("type")} className="px-6 py-2.5 border border-wheat text-barn font-semibold rounded-lg hover:bg-wheat-light transition-colors text-sm">
                ← Back
              </button>
              <button type="submit" className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors">
                Continue →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Contact + Submit */}
        {step === "contact" && (
          <form
            onSubmit={(e) => { e.preventDefault(); setStep("done"); }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-barn-dark mb-1">Your Contact Information</h2>
              <p className="text-sm text-earth-dark">Used only to confirm and manage your listing. Not published without your approval.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-barn mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            {/* Review summary */}
            <div className="bg-wheat-light/50 border border-wheat rounded-xl p-5">
              <h3 className="text-sm font-bold text-barn mb-3">Review Your Submission</h3>
              <dl className="space-y-1.5 text-sm">
                <div className="flex gap-3"><dt className="text-earth-light w-28 shrink-0">Business</dt><dd className="text-barn-dark font-medium">{form.businessName || "—"}</dd></div>
                <div className="flex gap-3"><dt className="text-earth-light w-28 shrink-0">Category</dt><dd className="text-barn-dark">{DIRECTORY_CATEGORIES.find((c) => c.id === form.categoryId)?.name || form.categoryId || "—"}</dd></div>
                <div className="flex gap-3"><dt className="text-earth-light w-28 shrink-0">Location</dt><dd className="text-barn-dark">{form.city}, {form.state} {form.zip}</dd></div>
                <div className="flex gap-3"><dt className="text-earth-light w-28 shrink-0">Service Area</dt><dd className="text-barn-dark">{form.serviceRadius || "—"}</dd></div>
                <div className="flex gap-3"><dt className="text-earth-light w-28 shrink-0">Emergency</dt><dd className="text-barn-dark">{form.emergencyAvailable ? "Yes" : "No"}</dd></div>
              </dl>
            </div>

            <div className="bg-sage/10 border border-sage/30 rounded-xl p-4 text-sm text-earth-dark leading-relaxed">
              By submitting, you confirm that the information provided is accurate and that you represent this business. Your listing will be reviewed before publishing and will display a <strong>Claimed</strong> badge once verified.
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep("details")} className="px-6 py-2.5 border border-wheat text-barn font-semibold rounded-lg hover:bg-wheat-light transition-colors text-sm">
                ← Back
              </button>
              <button type="submit" className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors">
                Submit My Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
