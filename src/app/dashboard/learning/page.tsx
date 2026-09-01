import Link from "next/link";

type Resource = {
  title: string;
  source: string;
  url: string;
  cost: "Free" | "Paid" | "Covered";
  species: string[];
  topic: string;
  description: string;
  featured?: boolean;
};

const resources: Resource[] = [
  // --- Featured Free ---
  {
    title: "Horse Owner's Guide to Emergency Preparedness",
    source: "University of Illinois Extension",
    url: "https://extension.illinois.edu",
    cost: "Free",
    species: ["Equine"],
    topic: "Emergency",
    description:
      "Comprehensive guide covering emergency plans, evacuation routes, and documentation every horse owner should have ready.",
    featured: true,
  },
  {
    title: "Small Ruminant Care & Management",
    source: "Iowa State University Extension",
    url: "https://www.extension.iastate.edu",
    cost: "Free",
    species: ["Goats", "Sheep"],
    topic: "Animal Care",
    description:
      "Covers nutrition, health monitoring, housing, and seasonal management for goats and sheep operations.",
    featured: true,
  },
  {
    title: "Biosecurity for Backyard Poultry Flocks",
    source: "USDA APHIS",
    url: "https://www.aphis.usda.gov",
    cost: "Free",
    species: ["Poultry"],
    topic: "Biosecurity",
    description:
      "Essential biosecurity practices for protecting your flock from disease introduction and spread.",
    featured: true,
  },

  // --- Equine ---
  {
    title: "Equine Nutrition Fundamentals",
    source: "Missouri Extension",
    url: "https://extension.missouri.edu",
    cost: "Free",
    species: ["Equine"],
    topic: "Nutrition",
    description:
      "In-depth review of forage, grain, supplements, and water requirements for horses at different life stages.",
  },
  {
    title: "Horse Body Condition Scoring",
    source: "Purina Animal Nutrition",
    url: "https://www.purinamills.com",
    cost: "Free",
    species: ["Equine"],
    topic: "Health",
    description:
      "Visual guide and scoring system (1–9 scale) for assessing and maintaining healthy body weight in horses.",
  },
  {
    title: "Equine First Aid Certificate",
    source: "American Association of Equine Practitioners",
    url: "https://www.aaep.org",
    cost: "Paid",
    species: ["Equine"],
    topic: "First Aid",
    description:
      "Structured online course covering wound care, vital signs, colic recognition, and when to call a vet.",
  },

  // --- Livestock Safety & Biosecurity ---
  {
    title: "Livestock Handling & Low-Stress Techniques",
    source: "Nebraska Extension",
    url: "https://extension.unl.edu",
    cost: "Free",
    species: ["Cattle", "Goats", "Sheep"],
    topic: "Safety",
    description:
      "Covers flight zones, herd behavior, and humane low-stress handling techniques for large livestock.",
  },
  {
    title: "On-Farm Biosecurity Planning",
    source: "Iowa State University Extension",
    url: "https://www.extension.iastate.edu",
    cost: "Free",
    species: ["Cattle", "Poultry", "Swine"],
    topic: "Biosecurity",
    description:
      "Step-by-step biosecurity plan framework adaptable to any farm operation and species mix.",
  },
  {
    title: "Zoonotic Disease Awareness for Farm Workers",
    source: "CDC / NIOSH",
    url: "https://www.cdc.gov",
    cost: "Free",
    species: ["Cattle", "Goats", "Poultry", "Swine"],
    topic: "Safety",
    description:
      "Overview of diseases transmissible between animals and humans, with prevention protocols for farm workers.",
  },

  // --- Poultry ---
  {
    title: "Poultry Health Management",
    source: "University of Illinois Extension",
    url: "https://extension.illinois.edu",
    cost: "Free",
    species: ["Poultry"],
    topic: "Health",
    description:
      "Covers common poultry diseases, vaccination schedules, respiratory illness recognition, and flock observation.",
  },
  {
    title: "Backyard Poultry Production",
    source: "Missouri Extension",
    url: "https://extension.missouri.edu",
    cost: "Free",
    species: ["Poultry"],
    topic: "Animal Care",
    description:
      "Comprehensive guide from chick selection through laying hen management, coop setup, and egg handling.",
  },

  // --- Certifications ---
  {
    title: "Master Gardener Volunteer Program",
    source: "University of Illinois Extension",
    url: "https://extension.illinois.edu",
    cost: "Covered",
    species: ["Plants"],
    topic: "Certification",
    description:
      "Extension-certified plant and garden knowledge — relevant for operators offering plant and garden care services.",
  },
  {
    title: "Certified Livestock Manager",
    source: "Illinois Department of Agriculture",
    url: "https://www2.illinois.gov/sites/agr",
    cost: "Paid",
    species: ["Cattle", "Swine", "Poultry"],
    topic: "Certification",
    description:
      "State certification for managers of livestock operations — demonstrates compliance and professional standards.",
  },

  // --- Community / Extension Partners ---
  {
    title: "Illinois Farm Bureau Learning Center",
    source: "Illinois Farm Bureau",
    url: "https://www.ilfb.org",
    cost: "Free",
    species: ["Cattle", "Equine", "Goats", "Poultry"],
    topic: "Community",
    description:
      "Member resources, webinars, and agricultural education programs available through the Illinois Farm Bureau network.",
  },
  {
    title: "4-H Animal Science Resources",
    source: "University of Illinois 4-H",
    url: "https://extension.illinois.edu/4h",
    cost: "Free",
    species: ["Cattle", "Equine", "Goats", "Sheep", "Poultry"],
    topic: "Community",
    description:
      "Youth-focused but resource-rich: species guides, care calendars, and animal project record books.",
  },
];

const sections = [
  {
    id: "featured",
    label: "⭐ Featured Free Learning",
    filter: (r: Resource) => r.featured === true,
  },
  {
    id: "equine",
    label: "🐴 Horse & Equine Care",
    filter: (r: Resource) => r.species.includes("Equine") && !r.featured,
  },
  {
    id: "poultry",
    label: "🐔 Poultry & Small Farm Animals",
    filter: (r: Resource) => r.species.includes("Poultry") && !r.featured,
  },
  {
    id: "livestock",
    label: "🐄 Livestock Safety & Biosecurity",
    filter: (r: Resource) =>
      (r.topic === "Biosecurity" || r.topic === "Safety") && !r.featured,
  },
  {
    id: "certifications",
    label: "🎓 Recommended Certifications",
    filter: (r: Resource) => r.topic === "Certification",
  },
  {
    id: "community",
    label: "🤝 Community, Extension & Farm Bureau",
    filter: (r: Resource) => r.topic === "Community",
  },
];

const costColors: Record<Resource["cost"], string> = {
  Free: "bg-sage/20 text-barn border-sage/40",
  Paid: "bg-wheat-light text-earth border-wheat",
  Covered: "bg-rust/10 text-rust border-rust/30",
};

function ResourceCard({ r }: { r: Resource }) {
  return (
    <div className="bg-white border border-wheat rounded-xl p-5 flex flex-col hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-barn-dark text-sm leading-snug">{r.title}</h3>
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${costColors[r.cost]}`}
        >
          {r.cost}
        </span>
      </div>
      <p className="text-xs text-earth-light mb-2">{r.source}</p>
      <p className="text-sm text-earth-dark leading-relaxed flex-1 mb-4">{r.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {r.species.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-cream px-2 py-0.5 rounded text-earth">
              {s}
            </span>
          ))}
        </div>
        <Link
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-rust font-semibold hover:underline shrink-0 ml-3"
        >
          Visit →
        </Link>
      </div>
    </div>
  );
}

export default function LearningPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-barn-dark mb-2">Animal Care Learning Hub</h1>
        <p className="text-earth-dark text-sm leading-relaxed">
          Curated resources from University Extension programs, USDA, Farm Bureau, and certified
          organizations. Continuing education keeps your skills sharp and your credential credible.
        </p>
      </div>

      {/* Cost legend */}
      <div className="flex flex-wrap gap-4 mb-10 p-4 bg-cream rounded-xl border border-wheat">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-sage/20 text-barn border-sage/40">Free</span>
          <span className="text-xs text-earth-dark">No cost — open access</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-wheat-light text-earth border-wheat">Paid</span>
          <span className="text-xs text-earth-dark">Third-party cost — may vary</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-rust/10 text-rust border-rust/30">Covered</span>
          <span className="text-xs text-earth-dark">The Farm Sitter may cover for active operators</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section) => {
          const items = resources.filter(section.filter);
          if (items.length === 0) return null;
          return (
            <div key={section.id}>
              <h2 className="text-lg font-bold text-barn-dark mb-5 pb-2 border-b border-wheat">
                {section.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map((r) => (
                  <ResourceCard key={r.title} r={r} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-5 bg-wheat-light/40 border border-wheat rounded-xl max-w-2xl">
        <p className="text-sm font-semibold text-barn mb-1">Know a resource we should add?</p>
        <p className="text-sm text-earth-dark">
          Email us at{" "}
          <a href="mailto:info@thefarmsitter.com" className="text-rust hover:underline">
            info@thefarmsitter.com
          </a>{" "}
          or use the contact form. We review all submissions and update this library regularly.
        </p>
      </div>
    </div>
  );
}
