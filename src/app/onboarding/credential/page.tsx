"use client";

import { useRouter } from "next/navigation";

export default function CredentialPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 5 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Credential Earned</h1>
      </div>

      {/* Credential card */}
      <div className="bg-barn-dark rounded-2xl p-8 text-center text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-barn-dark via-barn to-earth-dark opacity-80" />
        <div className="relative space-y-3">
          <div className="w-20 h-20 bg-wheat-light rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-4xl">🏆</span>
          </div>
          <p className="text-wheat-light text-sm font-semibold uppercase tracking-widest">
            Certified Farm Sitter
          </p>
          <h2 className="text-3xl font-bold text-cream">[Operator Name]</h2>
          <p className="text-cream/70 text-sm">
            Has successfully completed the Farm Sitter Certification Program
            and met all standards required for professional independent farm-sitting operations.
          </p>
          <div className="flex justify-center gap-6 pt-2 text-xs text-cream/50">
            <span>Issued: [Date]</span>
            <span>Credential #: [ID]</span>
            <span>Expires: [Date]</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-wheat p-5 space-y-3">
        <h2 className="font-bold text-barn">What this credential means</h2>
        <div className="space-y-2 text-sm text-earth-dark">
          <div className="flex gap-3">
            <span className="text-sage-dark shrink-0">✓</span>
            <span>You have completed the full Farm Sitter training curriculum and passed the certification assessment.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-sage-dark shrink-0">✓</span>
            <span>You are now eligible to subscribe to the Farm Sitter operator portal and referral directory.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-sage-dark shrink-0">✓</span>
            <span>You operate as an independent business owner — The Farm Sitter is not your employer.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-sage-dark shrink-0">✓</span>
            <span>Your credential requires annual renewal. Continuing education may be required.</span>
          </div>
        </div>
      </div>

      <div className="bg-wheat-light/40 border border-wheat rounded-xl p-4 text-sm text-earth-dark">
        <strong className="text-barn">Next step:</strong> To activate your directory listing and
        access your operator dashboard, you must submit proof of current liability insurance and
        complete your subscription enrollment.
      </div>

      <button
        onClick={() => router.push("/onboarding/compliance")}
        className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
      >
        Continue to Compliance &amp; Subscription →
      </button>
    </div>
  );
}
