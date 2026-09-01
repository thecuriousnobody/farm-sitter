"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BackgroundCheckPage() {
  const router = useRouter();
  const [initiated, setInitiated] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    // TODO: PATCH /api/onboarding/status { status: "BG_CHECK_INITIATED" }
    // For now, simulate the state change
    await new Promise((r) => setTimeout(r, 800));
    setInitiated(true);
    setSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 1 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Background Check Required</h1>
        <p className="text-earth-dark mt-2 leading-relaxed">
          A background check is required before you can enroll in any Farm Sitter
          certification program. This protects the animal owners who will trust you
          with their property and livestock.
        </p>
      </div>

      {/* Sterling info card */}
      <div className="bg-white rounded-xl border border-wheat p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-barn-dark rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-lg">🔍</span>
          </div>
          <div>
            <h2 className="font-bold text-barn">Our Background Check Provider: Sterling</h2>
            <p className="text-sm text-earth-dark mt-1">
              The Farm Sitter uses Sterling, a leading background screening company, for all
              operator background checks. Sterling conducts criminal history, identity
              verification, and other checks as required by our certification standards.
            </p>
          </div>
        </div>

        <div className="border-t border-wheat pt-4 space-y-3 text-sm text-earth-dark">
          <div className="flex gap-3">
            <span className="text-barn font-bold w-5 shrink-0">✓</span>
            <span>The cost of the background check is your responsibility as the applying operator.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-barn font-bold w-5 shrink-0">✓</span>
            <span>Program enrollment and payment are only available <strong>after</strong> your background check passes.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-barn font-bold w-5 shrink-0">✓</span>
            <span>Results are typically returned within 1–3 business days.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-barn font-bold w-5 shrink-0">✓</span>
            <span>If your background check does not clear, you will not be eligible to enroll.</span>
          </div>
        </div>

        <a
          href="https://www.sterlingcheck.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-5 py-3 bg-barn text-white rounded-lg hover:bg-barn-light transition-colors font-semibold text-sm"
        >
          <span>Begin Background Check at Sterling →</span>
          <span className="text-cream/60 text-xs">Opens in new tab</span>
        </a>
      </div>

      {/* Confirmation */}
      {!initiated ? (
        <div className="bg-wheat-light/40 border border-wheat rounded-xl p-5 space-y-4">
          <p className="text-sm font-semibold text-barn">After completing your Sterling submission:</p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="accent-barn mt-0.5 w-4 h-4 shrink-0"
            />
            <span className="text-sm text-earth-dark">
              I have submitted my background check through Sterling and understand that
              enrollment is contingent on a passed result. I authorize The Farm Sitter to
              receive and review my screening results.
            </span>
          </label>
          <button
            onClick={handleConfirm}
            disabled={!confirmed || submitting}
            className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "I've Submitted My Background Check"}
          </button>
        </div>
      ) : (
        <div className="bg-sage-light/20 border border-sage rounded-xl p-6 text-center space-y-3">
          <div className="text-3xl">⏳</div>
          <h3 className="font-bold text-barn">Background Check Pending</h3>
          <p className="text-sm text-earth-dark max-w-sm mx-auto">
            We&rsquo;re waiting for your results from Sterling. You&rsquo;ll receive an email
            notification once your check is complete. Results typically arrive within 1–3
            business days.
          </p>
          <p className="text-xs text-earth-light">
            Once your background check passes, you&rsquo;ll be able to select your program and
            enroll.
          </p>
          <div className="pt-2">
            <button
              onClick={() => router.push("/onboarding/program")}
              className="text-sm text-rust underline hover:no-underline"
            >
              Continue to program selection (for preview)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
