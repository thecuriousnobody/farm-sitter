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
            Questions about farm sitting, training, or partnerships? We&rsquo;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-barn mb-4">
                Get in Touch
              </h2>
              <p className="text-earth-dark leading-relaxed">
                Whether you&rsquo;re an animal owner looking for care, an
                aspiring farm sitter, or interested in partnering with us,
                we&rsquo;re here to help.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 bg-wheat-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  &#x1F4DE;
                </span>
                <div>
                  <p className="font-semibold text-barn text-sm">Phone</p>
                  <p className="text-earth-dark">309-925-1140</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 bg-wheat-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  &#x1F4CD;
                </span>
                <div>
                  <p className="font-semibold text-barn text-sm">Location</p>
                  <p className="text-earth-dark">Peoria, Illinois</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 bg-wheat-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  &#x1F310;
                </span>
                <div>
                  <p className="font-semibold text-barn text-sm">Web</p>
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
                <h3 className="text-xl font-bold text-barn mb-2">
                  Message Sent!
                </h3>
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
                    I am a...
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth">
                    <option>Animal owner looking for a sitter</option>
                    <option>Interested in becoming a farm sitter</option>
                    <option>Current operator with a question</option>
                    <option>Partnership or media inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-barn mb-1">
                    Message *
                  </label>
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
