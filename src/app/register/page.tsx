"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", city: "", state: "", zip: "",
    password: "", confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error ?? "Registration failed.");
        setLoading(false);
        return;
      }

      // Auto sign-in after registration
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.error) {
        // DB not connected in dev — still navigate to onboarding
        router.push("/onboarding/background-check");
      } else {
        router.push("/onboarding/background-check");
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const input = "w-full px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="The Farm Sitter" width={160} height={64} className="h-16 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-barn-dark">Create Your Operator Account</h1>
          <p className="text-sm text-earth-dark mt-1 max-w-sm mx-auto">
            Start your path to becoming a certified Farm Sitter. Registration is free — certification fees apply later.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-wheat shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">First Name *</label>
                <input type="text" required className={input} value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Last Name *</label>
                <input type="text" required className={input} value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Email Address *</label>
              <input type="email" required className={input} value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">Phone</label>
              <input type="tel" className={input} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-barn mb-1">City</label>
                <input type="text" className={input} value={form.city} onChange={(e) => setField("city", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">State</label>
                <input type="text" maxLength={2} placeholder="IL" className={input} value={form.state} onChange={(e) => setField("state", e.target.value.toUpperCase())} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-barn mb-1">ZIP Code</label>
              <input type="text" className={input} value={form.zip} onChange={(e) => setField("zip", e.target.value)} />
            </div>

            <div className="border-t border-wheat pt-4">
              <div>
                <label className="block text-sm font-semibold text-barn mb-1">Password *</label>
                <input type="password" required className={input} value={form.password} onChange={(e) => setField("password", e.target.value)} placeholder="Minimum 8 characters" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-barn mb-1">Confirm Password *</label>
                <input type="password" required className={input} value={form.confirmPassword} onChange={(e) => setField("confirmPassword", e.target.value)} />
              </div>
            </div>

            {error && (
              <div className="bg-rust/10 border border-rust/30 text-rust rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <p className="text-xs text-earth-light">
              By registering, you agree to our{" "}
              <a href="/terms" className="underline hover:text-barn">Terms of Service</a> and{" "}
              <a href="/privacy" className="underline hover:text-barn">Privacy Policy</a>.
              You are registering as an independent business operator, not an employee.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account & Continue"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-wheat text-center text-sm text-earth-dark">
            Already have an account?{" "}
            <Link href="/login" className="text-rust font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
