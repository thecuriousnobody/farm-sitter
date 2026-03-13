"use client";

import { useState } from "react";
import Link from "next/link";

export default function FindASitterPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">
            Find a Farm Sitter
          </h1>
          <p className="text-cream/70 text-lg">
            Tell us about your animals and we&rsquo;ll connect you with a
            qualified sitter in your area
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-16">
        {submitted ? (
          <div className="bg-sage-light/20 border border-sage rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">&#10003;</div>
            <h2 className="text-2xl font-bold text-barn mb-3">
              Inquiry Submitted!
            </h2>
            <p className="text-earth-dark mb-6">
              We&rsquo;ve received your request and will match you with a
              qualified sitter in your area. You&rsquo;ll hear from us within
              24-48 hours.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-barn text-white rounded-lg font-semibold hover:bg-barn-light transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  First Name *
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Last Name *
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  City *
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  State *
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Zip Code *
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-2">
                What animals need care? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Horses",
                  "Goats",
                  "Sheep",
                  "Cattle",
                  "Chickens/Poultry",
                  "Dogs",
                  "Cats",
                  "Llamas/Alpacas",
                  "Pigs",
                  "Rabbits",
                  "Donkeys/Mules",
                  "Other",
                ].map((animal) => (
                  <label
                    key={animal}
                    className="flex items-center gap-2 text-sm text-earth-dark bg-white p-2 rounded border border-wheat cursor-pointer hover:bg-cream-dark"
                  >
                    <input type="checkbox" className="accent-barn" />
                    {animal}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Trip Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">
                  Trip End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">
                Tell us about your care needs
              </label>
              <textarea
                rows={4}
                placeholder="How many of each animal, any special needs, medications, overnight care needed, etc."
                className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark placeholder-earth-light focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors text-lg"
            >
              Submit Inquiry
            </button>

            <p className="text-xs text-earth-light text-center">
              We&rsquo;ll match you with a qualified sitter and get back to you
              within 24-48 hours. No obligation.
            </p>
          </form>
        )}
      </section>
    </>
  );
}
