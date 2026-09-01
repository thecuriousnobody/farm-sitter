import Image from "next/image";
import Link from "next/link";

const STEPS = [
  { label: "Background Check", path: "background-check" },
  { label: "Select Program", path: "program" },
  { label: "Payment", path: "payment" },
  { label: "Training", path: "training" },
  { label: "Credential", path: "credential" },
  { label: "Compliance & Subscribe", path: "compliance" },
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      {/* Top bar */}
      <div className="bg-barn-dark border-b border-barn-light/20 py-4 px-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="The Farm Sitter" width={120} height={48} className="h-10 w-auto" />
        </Link>
        <span className="text-sm text-cream/60">Operator Enrollment</span>
      </div>

      {/* Step progress */}
      <div className="bg-white border-b border-wheat px-6 py-3 overflow-x-auto">
        <div className="flex items-center gap-0 max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.path} className="flex items-center">
              <div className="flex flex-col items-center gap-0.5 px-3">
                <div className="w-6 h-6 rounded-full bg-wheat text-earth text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span className="text-xs text-earth-light whitespace-nowrap hidden sm:block">
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-0.5 bg-wheat shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
