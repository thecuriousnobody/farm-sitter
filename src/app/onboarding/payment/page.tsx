"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"full" | "affirm" | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handlePay() {
    if (!method) return;
    setProcessing(true);

    if (method === "affirm") {
      // TODO: Redirect to Affirm checkout
      // window.location.href = affirmCheckoutUrl;
      alert("Affirm integration coming soon. Redirecting to full payment for now.");
    }

    // TODO: Initiate Stripe checkout session
    // const res = await fetch("/api/payments/checkout", { method: "POST", body: JSON.stringify({ program: selectedProgram }) })
    // const { url } = await res.json()
    // router.push(url) ← Stripe hosted checkout

    // Simulate payment success for flow preview
    await new Promise((r) => setTimeout(r, 1000));
    setProcessing(false);
    router.push("/onboarding/training");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 3 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Program Enrollment &amp; Payment</h1>
        <p className="text-earth-dark mt-2">
          Your background check has been approved. Complete payment to begin your training.
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-wheat p-5">
        <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-3">Order Summary</h2>
        <div className="flex justify-between text-sm text-earth-dark py-2 border-b border-wheat">
          <span>Coursework + Certification Program</span>
          <span className="font-semibold text-barn">TBD</span>
        </div>
        <div className="flex justify-between text-sm text-earth-light py-2">
          <span>Background check (paid to Sterling)</span>
          <span>Completed ✓</span>
        </div>
        <div className="flex justify-between font-bold text-barn pt-3">
          <span>Total Due Today</span>
          <span>TBD</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white rounded-xl border border-wheat p-5 space-y-3">
        <h2 className="text-sm font-bold text-barn uppercase tracking-wide mb-1">
          Select Payment Method
        </h2>

        <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${method === "full" ? "border-rust bg-rust/5" : "border-wheat hover:border-earth-light"}`}>
          <input
            type="radio"
            name="method"
            value="full"
            checked={method === "full"}
            onChange={() => setMethod("full")}
            className="accent-rust mt-0.5"
          />
          <div>
            <p className="font-semibold text-barn text-sm">Pay in Full</p>
            <p className="text-xs text-earth-dark mt-0.5">
              One-time payment. Processed securely via Stripe.
            </p>
          </div>
        </label>

        <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${method === "affirm" ? "border-rust bg-rust/5" : "border-wheat hover:border-earth-light"}`}>
          <input
            type="radio"
            name="method"
            value="affirm"
            checked={method === "affirm"}
            onChange={() => setMethod("affirm")}
            className="accent-rust mt-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-barn text-sm">Monthly Payments via Affirm</p>
              <span className="text-xs bg-wheat-light text-earth-dark px-2 py-0.5 rounded-full">
                Buy Now, Pay Later
              </span>
            </div>
            <p className="text-xs text-earth-dark mt-0.5">
              Split your enrollment into monthly installments. Subject to Affirm approval.
              0% APR options may be available.
            </p>
          </div>
        </label>
      </div>

      <div className="text-xs text-earth-light text-center leading-relaxed">
        By completing payment you agree to the{" "}
        <a href="/terms" className="underline hover:text-barn">Enrollment Terms</a> and{" "}
        <a href="/refund-policy" className="underline hover:text-barn">Refund Policy</a>.
        Payments are non-refundable after course access is granted.
      </div>

      <button
        onClick={handlePay}
        disabled={!method || processing}
        className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {processing
          ? "Processing..."
          : method === "affirm"
          ? "Continue with Affirm →"
          : "Complete Enrollment →"}
      </button>
    </div>
  );
}
