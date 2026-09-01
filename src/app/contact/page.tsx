"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-cream mb-4">Contact Us</h1>
          <p className="text-cream/70 text-lg">
            Questions about farm sitting, training, or partnerships? We&rsquo;d love to hear from
            you.
          </p>
        </div>
      </section>

      {/* Location Cards */}
      <section className="bg-cream-dark py-14 border-b border-wheat">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-earth text-sm font-semibold uppercase tracking-widest mb-2">
              Establishing Roots in Central Illinois
            </p>
            <h2 className="text-2xl font-bold text-barn-dark">Where We Operate</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Peoria Next */}
            <div className="rounded-2xl overflow-hidden border border-wheat shadow-md">
              {/* Photo area — drop peoria-next.jpg into /public/locations/ to activate */}
              <div
                className="h-52 bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/locations/peoria-next.jpg')",
                  backgroundColor: "#2d4a1e",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-barn-dark/80 via-barn-dark/30 to-transparent flex items-end p-5">
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Peoria Next<br />Innovation Center
                  </h3>
                </div>
              </div>
              <div className="bg-white p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-barn mt-0.5 shrink-0 font-bold text-lg">&#x1F4CD;</span>
                  <div>
                    <p className="text-earth-dark text-sm">801 W Main St</p>
                    <p className="text-earth-dark text-sm">Peoria, Illinois 61606</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-barn mt-0.5 shrink-0 font-bold text-lg">&#x1F310;</span>
                  <a
                    href="https://peorianext.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rust text-sm hover:underline"
                  >
                    peorianext.com
                  </a>
                </div>
                <div className="pt-2 border-t border-wheat">
                  <p className="text-xs font-semibold text-barn uppercase tracking-wide mb-1">
                    Affiliated With
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-earth-dark text-sm font-semibold">Bradley University</span>
                    <span className="text-xs text-earth-light">— Peoria&rsquo;s flagship research university</span>
                  </div>
                  <p className="text-xs text-earth-dark mt-1.5 leading-relaxed">
                    Peoria Next is a Bradley University–affiliated innovation hub driving
                    entrepreneurship and economic development in Central Illinois.
                  </p>
                </div>
                <div className="bg-wheat-light/60 rounded-lg px-3 py-2">
                  <p className="text-xs font-semibold text-barn">Company Headquarters</p>
                </div>
              </div>
            </div>

            {/* Distillery Labs */}
            <div className="rounded-2xl overflow-hidden border border-wheat shadow-md">
              {/* Photo area — drop distillery-labs.jpg into /public/locations/ to activate */}
              <div
                className="h-52 bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/locations/distillery-labs.jpg')",
                  backgroundColor: "#3b2a1a",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-barn-dark/80 via-barn-dark/30 to-transparent flex items-end p-5">
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Distillery Labs
                  </h3>
                </div>
              </div>
              <div className="bg-white p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-barn mt-0.5 shrink-0 font-bold text-lg">&#x1F4CD;</span>
                  <div>
                    <p className="text-earth-dark text-sm">201 SW Adams Street</p>
                    <p className="text-earth-dark text-sm">Peoria, Illinois 61602</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-barn mt-0.5 shrink-0 font-bold text-lg">&#x1F310;</span>
                  <a
                    href="https://distillerylabs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rust text-sm hover:underline"
                  >
                    distillerylabs.org
                  </a>
                </div>
                <div className="pt-2 border-t border-wheat">
                  <p className="text-xs font-semibold text-barn uppercase tracking-wide mb-1">
                    Affiliated With
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-earth-dark text-sm font-semibold">Illinois Innovation Network</span>
                    <span className="text-xs text-earth-light">— IIN</span>
                  </div>
                  <p className="text-xs text-earth-dark mt-1.5 leading-relaxed">
                    Distillery Labs is an IIN-affiliated startup hub and co-working space, part of
                    the statewide network connecting Illinois innovators and entrepreneurs.
                  </p>
                </div>
                <div className="bg-wheat-light/60 rounded-lg px-3 py-2">
                  <p className="text-xs font-semibold text-barn">Co-located Here</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-earth-light mt-6">
            The Farm Sitter, Inc. is proud to be embedded in Central Illinois&rsquo; innovation
            ecosystem as we build a national platform from Peoria.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-barn mb-4">Get in Touch</h2>
              <p className="text-earth-dark leading-relaxed">
                Whether you&rsquo;re an animal owner looking for care, an aspiring farm sitter,
                or interested in partnering with us, we&rsquo;re here to help.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 bg-wheat-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  &#x1F4DE;
                </span>
                <div>
                  <p className="font-semibold text-barn text-sm">Phone</p>
                  <p className="text-earth-dark">855-FARMSIT (855-327-6748)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 bg-wheat-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  &#x1F310;
                </span>
                <div>
                  <p className="font-semibold text-barn text-sm">Website</p>
                  <p className="text-earth-dark">www.TheFarmSitter.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-sage-light/20 border border-sage rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-xl font-bold text-barn mb-2">Message Sent!</h3>
                <p className="text-earth-dark text-sm">
                  We&rsquo;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-semibold text-barn mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-barn mb-1">I am a...</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth">
                    <option>Animal owner looking for a sitter</option>
                    <option>Interested in becoming a farm sitter</option>
                    <option>Current operator with a question</option>
                    <option>Partnership or media inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-barn mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
