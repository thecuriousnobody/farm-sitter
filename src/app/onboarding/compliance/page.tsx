"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompliancePage() {
  const router = useRouter();
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [insuranceUploaded, setInsuranceUploaded] = useState(false);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  async function handleInsuranceUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setInsuranceFile(file);
    // TODO: POST to /api/onboarding/insurance — upload to secure storage, update ComplianceRecord
    setInsuranceUploaded(true);
  }

  async function handleSubscribe() {
    setSubscribing(true);
    // TODO: Initiate Stripe subscription checkout
    // const res = await fetch("/api/payments/subscribe", { method: "POST" })
    // const { url } = await res.json()
    // router.push(url)
    await new Promise((r) => setTimeout(r, 1000));
    setSubscribing(false);
    router.push("/dashboard");
  }

  const canSubscribe = insuranceUploaded && policyAgreed;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 6 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Compliance &amp; Subscription</h1>
        <p className="text-earth-dark mt-2 leading-relaxed">
          Two final requirements before your operator portal is activated: proof of sitter
          liability insurance and your monthly subscription.
        </p>
      </div>

      {/* Insurance upload */}
      <div className="bg-white rounded-xl border border-wheat p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${insuranceUploaded ? "bg-sage text-white" : "bg-wheat text-earth"}`}>
            {insuranceUploaded ? "✓" : "1"}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-barn">Sitter Liability Insurance</h2>
            <p className="text-sm text-earth-dark mt-1">
              You must carry and maintain valid sitter liability insurance to be listed in the
              Farm Sitter directory. Upload a current certificate of insurance (COI) or
              declarations page. Your document will be reviewed by our team.
            </p>
          </div>
        </div>

        {!insuranceUploaded ? (
          <div className="border-2 border-dashed border-wheat rounded-lg p-6 text-center">
            <input
              type="file"
              id="insurance-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleInsuranceUpload}
              className="hidden"
            />
            <label
              htmlFor="insurance-upload"
              className="cursor-pointer space-y-2 block"
            >
              <div className="text-3xl">📄</div>
              <p className="text-sm font-semibold text-barn">Upload Insurance Document</p>
              <p className="text-xs text-earth-light">PDF, JPG, or PNG — max 10 MB</p>
              <span className="inline-block mt-2 px-4 py-2 bg-barn text-white text-sm font-semibold rounded-lg hover:bg-barn-light transition-colors">
                Choose File
              </span>
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-sage-light/20 border border-sage rounded-lg p-3 text-sm">
            <span className="text-sage-dark text-lg">✓</span>
            <div>
              <p className="font-semibold text-sage-dark">{insuranceFile?.name}</p>
              <p className="text-xs text-earth-dark">Uploaded — pending admin review</p>
            </div>
            <button
              onClick={() => { setInsuranceFile(null); setInsuranceUploaded(false); }}
              className="ml-auto text-xs text-earth-light hover:text-rust"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Policy agreement */}
      <div className="bg-white rounded-xl border border-wheat p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${policyAgreed ? "bg-sage text-white" : "bg-wheat text-earth"}`}>
            {policyAgreed ? "✓" : "2"}
          </div>
          <div>
            <h2 className="font-bold text-barn">Operator Policies &amp; Standards Agreement</h2>
          </div>
        </div>
        <div className="space-y-3 text-sm text-earth-dark pl-11">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={policyAgreed}
              onChange={(e) => setPolicyAgreed(e.target.checked)}
              className="accent-barn mt-0.5 shrink-0"
            />
            <span>
              I agree to the{" "}
              <a href="/policies/operator" className="text-barn underline hover:text-rust">Operator Standards &amp; Code of Conduct</a>,{" "}
              <a href="/policies/directory" className="text-barn underline hover:text-rust">Directory &amp; Referral Policies</a>, and confirm
              that I am operating as an independent business owner. I understand that The Farm
              Sitter is not my employer.
            </span>
          </label>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl border border-wheat p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-wheat text-earth flex items-center justify-center shrink-0 font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="font-bold text-barn">Monthly Subscription</h2>
            <p className="text-sm text-earth-dark mt-1">
              Access to the operator dashboard, calculator tools, referral directory listing, and
              bulletin board requires an active monthly subscription.
            </p>
          </div>
        </div>
        <div className="ml-11 bg-barn-dark rounded-xl p-5 text-cream space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-wheat-light">Operator Portal Subscription</span>
            <span className="text-2xl font-bold text-cream">TBD<span className="text-sm text-cream/60">/mo</span></span>
          </div>
          <ul className="text-sm text-cream/70 space-y-1">
            <li>✓ Operator dashboard access</li>
            <li>✓ Referral directory listing</li>
            <li>✓ Calculator &amp; pricing tools</li>
            <li>✓ Bulletin board access</li>
            <li>✓ Resources &amp; templates</li>
            <li>✓ Continuing education access</li>
          </ul>
          <p className="text-xs text-cream/40 pt-1">
            Cancel anytime. Listing deactivates if subscription lapses.
          </p>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={!canSubscribe || subscribing}
        className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {subscribing
          ? "Activating..."
          : !canSubscribe
          ? "Complete steps above to continue"
          : "Activate Subscription & Enter Dashboard →"}
      </button>
    </div>
  );
}
