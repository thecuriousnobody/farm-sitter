import Link from "next/link";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "GUIDE" | "CHECKLIST" | "TEMPLATE" | "BROCHURE";
  category: string;
  fileUrl: string | null;
};

// Static seed data — replace with DB fetch from /api/resources when PDFs are uploaded
// To add a resource: upload PDF to /public/resources/ and add an entry here (or via admin panel)
const RESOURCES: Resource[] = [
  {
    id: "1",
    title: "New Client Farm Profile Sheet",
    description:
      "A fillable form to share with your farm sitter before your trip. Covers feeding schedules, daily routines, emergency contacts, and property access details.",
    type: "TEMPLATE",
    category: "Getting Started",
    fileUrl: null,
  },
  {
    id: "2",
    title: "Preparing Your Farm for a Sitter",
    description:
      "Step-by-step preparation guide covering supplies, communication, access instructions, and what your sitter will need to know before Day 1.",
    type: "GUIDE",
    category: "Getting Started",
    fileUrl: null,
  },
  {
    id: "3",
    title: "Animal Care Visit Checklist",
    description:
      "A standardized daily visit checklist covering observation, feeding, water systems, and condition checks for common farm animals.",
    type: "CHECKLIST",
    category: "Daily Care",
    fileUrl: null,
  },
  {
    id: "4",
    title: "Medication & Special Care Log",
    description:
      "Track daily medications, treatments, and observations for animals requiring specialized attention. Designed to be left on-site for your sitter.",
    type: "TEMPLATE",
    category: "Daily Care",
    fileUrl: null,
  },
  {
    id: "5",
    title: "Livestock Emergency Contact Card",
    description:
      "A printable quick-reference card for your sitter listing your vet, farrier, emergency contacts, and critical care instructions.",
    type: "TEMPLATE",
    category: "Emergency Prep",
    fileUrl: null,
  },
  {
    id: "6",
    title: "Signs of Distress by Animal Type",
    description:
      "A plain-language reference guide covering common signs of illness, injury, or distress for horses, goats, poultry, cattle, and small animals.",
    type: "GUIDE",
    category: "Emergency Prep",
    fileUrl: null,
  },
  {
    id: "7",
    title: "Understanding Farm Sitter Certification Levels",
    description:
      "A plain-language overview of our four-tier animal care system and what each credential level means for your animals and property.",
    type: "GUIDE",
    category: "About the Program",
    fileUrl: null,
  },
  {
    id: "8",
    title: "What to Expect: Your First Farm Sitter Visit",
    description:
      "Explains the meet-and-greet process, what your sitter will assess, and how the referral and care relationship works.",
    type: "GUIDE",
    category: "About the Program",
    fileUrl: null,
  },
  {
    id: "9",
    title: "Seasonal Farm Care Planning Guide",
    description:
      "Planning tips for winter feeding, summer water systems, seasonal health concerns, and preparing your farm for sitter visits year-round.",
    type: "GUIDE",
    category: "Seasonal",
    fileUrl: null,
  },
];

const TYPE_BADGE: Record<string, { label: string; className: string }> = {
  GUIDE: { label: "Guide", className: "bg-sage-light/40 text-sage-dark" },
  CHECKLIST: { label: "Checklist", className: "bg-earth-light/30 text-earth-dark" },
  TEMPLATE: { label: "Template", className: "bg-sky/30 text-barn" },
  BROCHURE: { label: "Brochure", className: "bg-wheat-light text-barn-dark" },
};

const categories = [...new Set(RESOURCES.map((r) => r.category))];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-barn-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-earth-light text-sm font-semibold uppercase tracking-widest mb-3">
            Free Resources
          </p>
          <h1 className="text-4xl font-bold text-cream mb-4">Animal Owner Resource Library</h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Free guides, checklists, and templates to help you prepare your farm and animals for
            professional care — no account required.
          </p>
        </div>
      </section>

      {/* Resource grid by category */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        {categories.map((category) => (
          <div key={category} className="mb-14">
            <h2 className="text-lg font-bold text-barn-dark mb-5 pb-2 border-b border-wheat">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {RESOURCES.filter((r) => r.category === category).map((resource) => {
                const badge = TYPE_BADGE[resource.type];
                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-xl border border-wheat p-5 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="mb-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-barn mb-2">{resource.title}</h3>
                    <p className="text-sm text-earth-dark leading-relaxed flex-1 mb-4">
                      {resource.description}
                    </p>
                    {resource.fileUrl ? (
                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-rust hover:text-rust-light transition-colors"
                      >
                        Download PDF ↓
                      </a>
                    ) : (
                      <span className="text-xs text-earth-light italic">
                        PDF coming soon
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-wheat-light/50 border border-wheat rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-barn mb-2">Ready to find a certified sitter?</h3>
          <p className="text-sm text-earth-dark mb-5 max-w-md mx-auto">
            Submit a care inquiry and we&rsquo;ll match you with a credentialed Farm Sitter in your
            area.
          </p>
          <Link
            href="/find-a-sitter"
            className="px-6 py-2.5 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors"
          >
            Request a Farm Sitter
          </Link>
        </div>
      </section>
    </>
  );
}
