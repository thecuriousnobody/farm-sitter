"use client";

import { useState, useEffect } from "react";
import { ANIMAL_TIERS_SITTER, ANIMALS_STORAGE_KEY } from "@/lib/animals";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning", "Midday", "Evening", "Overnight"];

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    businessName: "",
    website: "",
    bio: "",
    serviceZips: "",
    serviceRadius: "25",
    animals: [] as string[],
    days: [] as string[],
    times: [] as string[],
    contactPreference: "email",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ANIMALS_STORAGE_KEY);
      if (stored) {
        const animals = JSON.parse(stored);
        setForm((f) => ({ ...f, animals }));
      }
    } catch {}
  }, []);

  function toggleArray(field: "animals" | "days" | "times", value: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(form.animals));
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-barn-dark">My Profile</h1>
        <p className="text-earth-dark text-sm mt-1">
          This information appears on your referral listing when your profile is approved.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Profile Photo */}
        <section>
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-4">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-wheat-light border-2 border-wheat flex items-center justify-center text-3xl">
              🧑‍🌾
            </div>
            <div>
              <button
                type="button"
                className="px-4 py-2 bg-wheat-light border border-wheat text-barn text-sm font-semibold rounded-lg hover:bg-wheat/30 transition-colors"
              >
                Upload Photo
              </button>
              <p className="text-xs text-earth-light mt-1.5">JPG or PNG, max 5 MB. Square crops best.</p>
            </div>
          </div>
        </section>

        {/* Identity */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide">Identity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Display Name *</label>
              <input
                required
                type="text"
                placeholder="Jane D."
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Business Name</label>
              <input
                type="text"
                placeholder="Sunrise Farm Care"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-barn mb-1">Business Website</label>
            <input
              type="url"
              placeholder="https://yourbusiness.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-barn mb-1">Bio / About You *</label>
            <textarea
              required
              rows={4}
              placeholder="Tell animal owners about your background, experience, and what makes your care special..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth resize-none"
            />
            <p className="text-xs text-earth-light mt-1">{form.bio.length}/500 characters</p>
          </div>
        </section>

        {/* Service Area */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide">Service Area</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">ZIP Codes Served *</label>
              <input
                required
                type="text"
                placeholder="61604, 61611, 61550"
                value={form.serviceZips}
                onChange={(e) => setForm({ ...form, serviceZips: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              />
              <p className="text-xs text-earth-light mt-1">Comma-separated. Your primary service ZIP codes.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Travel Radius</label>
              <select
                value={form.serviceRadius}
                onChange={(e) => setForm({ ...form, serviceRadius: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark text-sm focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
              >
                <option value="10">Up to 10 miles</option>
                <option value="25">Up to 25 miles</option>
                <option value="50">Up to 50 miles</option>
                <option value="75">Up to 75 miles</option>
                <option value="100">Up to 100 miles</option>
              </select>
            </div>
          </div>
        </section>

        {/* Animals */}
        <section>
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-sm font-bold text-barn uppercase tracking-wide">Animals You Care For *</h2>
            {form.animals.length > 0 && (
              <span className="text-xs text-sage font-semibold">{form.animals.length} selected</span>
            )}
          </div>
          <p className="text-xs text-earth-dark mb-4">
            Select every animal type you have hands-on experience with.
          </p>
          <div className="space-y-4">
            {ANIMAL_TIERS_SITTER.map((tier) => (
              <div key={tier.label}>
                <p className="text-xs font-semibold text-earth uppercase tracking-wide mb-2">{tier.label}</p>
                <div className="flex flex-wrap gap-2">
                  {tier.animals.map((a) => {
                    const active = form.animals.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleArray("animals", a)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          active
                            ? "bg-sage/20 border-sage text-barn"
                            : "bg-white border-wheat text-earth-dark hover:border-earth-light"
                        }`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-wheat-light/50 border border-wheat rounded-lg px-4 py-3">
            <p className="text-xs text-earth-dark leading-relaxed">
              <strong className="text-barn">Keep this current.</strong> Update your animal experience
              as you grow — add new species after gaining hands-on experience or completing
              CEU training through the Academy. Your listing reflects what you actively
              and confidently care for today.
            </p>
          </div>
        </section>

        {/* Availability */}
        <section className="space-y-5">
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide">Availability</h2>
          <div>
            <p className="text-sm text-earth-dark mb-3">Days available</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => {
                const active = form.days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleArray("days", d)}
                    className={`w-14 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      active
                        ? "bg-rust text-white border-rust"
                        : "bg-white border-wheat text-earth-dark hover:border-earth-light"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm text-earth-dark mb-3">Preferred visit times</p>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => {
                const active = form.times.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleArray("times", t)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      active
                        ? "bg-rust text-white border-rust"
                        : "bg-white border-wheat text-earth-dark hover:border-earth-light"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Preference */}
        <section>
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-4">
            Preferred Contact Method
          </h2>
          <div className="flex gap-4">
            {["email", "phone", "either"].map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contact"
                  value={c}
                  checked={form.contactPreference === c}
                  onChange={() => setForm({ ...form, contactPreference: c })}
                  className="accent-rust"
                />
                <span className="text-sm text-earth-dark capitalize">{c}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
          >
            Save Profile
          </button>
          {saved && (
            <span className="text-sage font-semibold text-sm flex items-center gap-1.5">
              ✓ Saved successfully
            </span>
          )}
        </div>

        <p className="text-xs text-earth-light border-t border-wheat pt-6">
          Your listing is reviewed by our team before going live. Changes to service area or
          animal types may require re-verification.
        </p>
      </form>
    </div>
  );
}
