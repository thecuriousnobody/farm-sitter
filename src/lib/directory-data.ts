// ---------------------------------------------------------------------------
// Rural Services Directory — Types & Mock Data
// Replace data functions with Prisma queries once DATABASE_URL is configured.
// ---------------------------------------------------------------------------

export type DirectoryBadge = "LISTED" | "CLAIMED" | "VERIFIED";

export type DirectoryCategory = {
  id: string;          // slug — used in URL
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  emergencyRelevant: boolean;
  fields: string[];    // category-specific field labels shown on profiles
  futureCategory?: boolean;
};

export type DirectoryProvider = {
  id: string;
  slug: string;
  businessName: string;
  categoryId: string;
  badge: DirectoryBadge;
  city: string;
  state: string;
  zip: string;
  serviceRadius: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  description: string;
  speciesServed: string[];
  specialties: string[];
  credentials?: string;
  insured: boolean;
  emergencyAvailable: boolean;
  emergencyPhone?: string;
  featured: boolean;
  categoryData?: Record<string, string | boolean | string[]>;
};

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

export const DIRECTORY_CATEGORIES: DirectoryCategory[] = [
  {
    id: "farriers",
    name: "Farriers",
    icon: "🐴",
    shortDesc: "Hoof care, trimming, shoeing, and corrective work for horses and equine.",
    longDesc:
      "Find certified and experienced farriers offering hoof trimming, shoeing, and corrective care for horses, donkeys, and mules. Listings include mobile service areas, certification status, and specialty work.",
    emergencyRelevant: false,
    fields: ["Services (trims, shoes, corrective)", "Mobile service radius", "Certification / association"],
  },
  {
    id: "equine-vets",
    name: "Equine & Large Animal Vets",
    icon: "🩺",
    shortDesc: "Large animal veterinary care, wellness exams, and emergency services.",
    longDesc:
      "Connect with equine and large animal veterinarians offering mobile and clinic-based care. Listings include species served, emergency availability, after-hours contacts, and practice type.",
    emergencyRelevant: true,
    fields: ["Practice type (mobile / clinic / both)", "Species served", "Emergency availability", "After-hours contact"],
  },
  {
    id: "equine-dentists",
    name: "Equine Dentists",
    icon: "🦷",
    shortDesc: "Floating, oral exams, and dental care for horses and equine.",
    longDesc:
      "Browse equine dental practitioners offering routine floating, oral examinations, and specialty dental procedures. Listings include mobile service area, specialties, and sedation coordination information.",
    emergencyRelevant: false,
    fields: ["Mobile service area", "Specialties", "Sedation coordination"],
  },
  {
    id: "equine-bodywork",
    name: "Bodywork & Rehab Support",
    icon: "🤲",
    shortDesc: "Equine massage, chiropractic, and rehabilitation support services.",
    longDesc:
      "Find equine massage therapists, bodyworkers, and rehabilitation support practitioners in your area. Listings use careful language and do not imply veterinary endorsement. Always consult your veterinarian for medical concerns.",
    emergencyRelevant: false,
    fields: ["Service type (massage, chiropractic, rehab)", "Mobile / in-facility", "Species served"],
  },
  {
    id: "livestock-transport",
    name: "Livestock Transport",
    icon: "🚚",
    shortDesc: "Hauling and emergency transport for horses, cattle, and livestock.",
    longDesc:
      "Locate livestock haulers and emergency transport providers for horses, cattle, goats, and other farm animals. Listings include trailer type, species capacity, service range, and emergency availability.",
    emergencyRelevant: true,
    fields: ["Trailer type", "Species served", "Max distance", "Emergency availability", "Insurance status"],
  },
  {
    id: "feed-suppliers",
    name: "Feed, Hay & Bedding",
    icon: "🌾",
    shortDesc: "Local hay, grain, bedding, and farm supply — delivery or pickup.",
    longDesc:
      "Find local feed stores, independent hay suppliers, and bedding vendors near you. Listings include products carried, delivery availability, pickup options, and seasonal inventory notes.",
    emergencyRelevant: false,
    fields: ["Products carried", "Delivery available", "Pickup available", "Seasonal notes"],
  },
];

export const FUTURE_CATEGORIES = [
  "Fence Repair & Handyman",
  "Barn Cleaning & Manure Management",
  "Mowing & Pasture Care",
  "Snow Removal",
  "Well & Water Systems",
  "Generator & Electrical Service",
  "Trailer Repair",
  "Tack & Blanket Cleaning / Repair",
  "Boarding Facilities",
  "Agricultural Insurance Agents",
  "Agricultural Attorneys",
  "Nutrition Consultants",
  "Extension & Educational Partners",
  "Mental Health & Rural Support",
  "Farm & Feed Supply Stores",
];

// ---------------------------------------------------------------------------
// MOCK PROVIDERS
// ---------------------------------------------------------------------------

export const MOCK_PROVIDERS: DirectoryProvider[] = [
  // ── FARRIERS ──────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "prairie-hoof-works",
    businessName: "Prairie Hoof Works",
    categoryId: "farriers",
    badge: "VERIFIED",
    city: "Peoria",
    state: "IL",
    zip: "61604",
    serviceRadius: "50 miles",
    phone: "309-555-0142",
    email: "info@prairiehoof.com",
    website: "https://prairiehoof.com",
    description:
      "Full-service farriery serving Central Illinois for over 15 years. Specializing in corrective and therapeutic shoeing for horses with chronic hoof issues. AFA-certified. Gentle, methodical approach with horses of all temperaments.",
    speciesServed: ["Horses", "Donkeys", "Mules"],
    specialties: ["Corrective shoeing", "Therapeutic work", "Barefoot trimming"],
    credentials: "American Farrier's Association (AFA) Certified Farrier",
    insured: true,
    emergencyAvailable: false,
    featured: true,
    categoryData: {
      services: "Trims, front shoes, four shoes, corrective, therapeutic",
      mobile: true,
    },
  },
  {
    id: "2",
    slug: "heartland-farrier-service",
    businessName: "Heartland Farrier Service",
    categoryId: "farriers",
    badge: "CLAIMED",
    city: "Morton",
    state: "IL",
    zip: "61550",
    serviceRadius: "40 miles",
    phone: "309-555-0287",
    description:
      "Family-owned farriery serving Tazewell and Peoria counties. Routine trims and shoeings, competitive scheduling, and strong relationships with local equine vets for coordinated care.",
    speciesServed: ["Horses"],
    specialties: ["Routine trims", "Cold and hot shoeing"],
    insured: true,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      services: "Trims, shoes",
      mobile: true,
    },
  },
  {
    id: "3",
    slug: "midwest-equine-farriery",
    businessName: "Midwest Equine Farriery",
    categoryId: "farriers",
    badge: "LISTED",
    city: "Normal",
    state: "IL",
    zip: "61761",
    serviceRadius: "35 miles",
    phone: "309-555-0391",
    description:
      "Serving McLean County and surrounding areas. Focused on routine maintenance and working closely with horse owners to build consistent care schedules.",
    speciesServed: ["Horses", "Donkeys"],
    specialties: ["Routine trims", "Basic shoeing"],
    insured: false,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      services: "Trims, shoes",
      mobile: true,
    },
  },

  // ── EQUINE VETS ───────────────────────────────────────────────────────────
  {
    id: "4",
    slug: "central-illinois-equine-clinic",
    businessName: "Central Illinois Equine Clinic",
    categoryId: "equine-vets",
    badge: "VERIFIED",
    city: "Peoria",
    state: "IL",
    zip: "61607",
    serviceRadius: "60 miles",
    phone: "309-555-0519",
    email: "reception@ciequelineclinic.com",
    website: "https://ciec.com",
    description:
      "Full-service equine and large animal veterinary practice with clinic and mobile units. Serving Central Illinois for over 20 years. Emergency line staffed 24/7. Wellness, lameness, surgery, reproduction, and emergency care.",
    speciesServed: ["Horses", "Donkeys", "Mules", "Cattle", "Llamas", "Alpacas"],
    specialties: ["Lameness evaluation", "Reproduction", "Surgery", "Emergency"],
    credentials: "AVMA-accredited practice, Dr. Lisa Harte DVM & associates",
    insured: true,
    emergencyAvailable: true,
    emergencyPhone: "309-555-0911",
    featured: true,
    categoryData: {
      practiceType: "Clinic + Mobile",
      afterHours: "Emergency line: 309-555-0911",
    },
  },
  {
    id: "5",
    slug: "river-valley-large-animal",
    businessName: "River Valley Large Animal Practice",
    categoryId: "equine-vets",
    badge: "CLAIMED",
    city: "Pekin",
    state: "IL",
    zip: "61554",
    serviceRadius: "50 miles",
    phone: "309-555-0633",
    description:
      "Mobile large animal practice covering Tazewell, Peoria, and Mason counties. Routine wellness, vaccinations, dental, and reproductive services for horses and cattle. Emergency by arrangement.",
    speciesServed: ["Horses", "Cattle", "Goats", "Sheep"],
    specialties: ["Wellness & vaccination", "Dental", "Reproductive services"],
    insured: true,
    emergencyAvailable: true,
    featured: false,
    categoryData: {
      practiceType: "Mobile",
      afterHours: "Call main number, emergency by arrangement",
    },
  },
  {
    id: "6",
    slug: "prairie-animal-health",
    businessName: "Prairie Animal Health",
    categoryId: "equine-vets",
    badge: "LISTED",
    city: "Bloomington",
    state: "IL",
    zip: "61701",
    serviceRadius: "40 miles",
    phone: "309-555-0748",
    description:
      "Mixed practice serving McLean County and surrounding areas. Equine wellness, cattle herd health, and small ruminant care. Call ahead for appointment scheduling.",
    speciesServed: ["Horses", "Cattle", "Sheep", "Goats"],
    specialties: ["Herd health", "Wellness", "Vaccination programs"],
    insured: true,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      practiceType: "Clinic + Mobile",
    },
  },

  // ── EQUINE DENTISTS ───────────────────────────────────────────────────────
  {
    id: "7",
    slug: "heartland-equine-dental",
    businessName: "Heartland Equine Dental Services",
    categoryId: "equine-dentists",
    badge: "CLAIMED",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    serviceRadius: "90 miles",
    phone: "217-555-0182",
    email: "schedule@heartlandequinedental.com",
    description:
      "Mobile equine dental practice serving Central and Southern Illinois. Routine floating, wolf tooth extraction, and oral examinations. Works closely with your veterinarian for sedation coordination. Appointment scheduling available online.",
    speciesServed: ["Horses", "Donkeys", "Mules"],
    specialties: ["Routine floating", "Wolf tooth extraction", "Oral exams"],
    credentials: "IAED member — International Association of Equine Dentistry",
    insured: true,
    emergencyAvailable: false,
    featured: true,
    categoryData: {
      sedationCoordination: "Yes — works with your vet",
      mobile: true,
    },
  },
  {
    id: "8",
    slug: "prairie-float-dental",
    businessName: "Prairie Float Dental",
    categoryId: "equine-dentists",
    badge: "VERIFIED",
    city: "Peoria",
    state: "IL",
    zip: "61604",
    serviceRadius: "70 miles",
    phone: "309-555-0256",
    description:
      "Certified equine dental practitioner serving the greater Peoria Metro area. Routine maintenance floats and comprehensive oral evaluations. Available for farm calls with advance scheduling.",
    speciesServed: ["Horses"],
    specialties: ["Routine floating", "Comprehensive oral exams", "Senior horse dental care"],
    credentials: "Certified Equine Dental Practitioner",
    insured: true,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      sedationCoordination: "Available on request",
      mobile: true,
    },
  },

  // ── EQUINE BODYWORK ───────────────────────────────────────────────────────
  {
    id: "9",
    slug: "aligned-equine-bodywork",
    businessName: "Aligned Equine Bodywork",
    categoryId: "equine-bodywork",
    badge: "CLAIMED",
    city: "Morton",
    state: "IL",
    zip: "61550",
    serviceRadius: "50 miles",
    phone: "309-555-0374",
    email: "appointments@alignedequine.com",
    description:
      "Equine massage and bodywork services designed to support comfort, mobility, and performance. Services are complementary wellness support and are not a substitute for veterinary care. Always consult your vet with health concerns.",
    speciesServed: ["Horses"],
    specialties: ["Equine massage", "Myofascial release", "Post-performance bodywork"],
    insured: true,
    emergencyAvailable: false,
    featured: true,
    categoryData: {
      serviceType: "Equine massage, myofascial release",
      location: "Mobile — comes to your farm",
    },
  },
  {
    id: "10",
    slug: "prairie-wind-equine-wellness",
    businessName: "Prairie Wind Equine Wellness",
    categoryId: "equine-bodywork",
    badge: "LISTED",
    city: "Washington",
    state: "IL",
    zip: "61571",
    serviceRadius: "40 miles",
    phone: "309-555-0491",
    description:
      "Equine massage and rehabilitation support for horses recovering from injury or returning to work. Complementary wellness services. Works alongside your veterinary and rehabilitation team.",
    speciesServed: ["Horses"],
    specialties: ["Equine massage", "Rehabilitation support", "Pre/post-competition care"],
    insured: false,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      serviceType: "Equine massage, rehabilitation support",
      location: "Mobile",
    },
  },

  // ── LIVESTOCK TRANSPORT ───────────────────────────────────────────────────
  {
    id: "11",
    slug: "central-il-livestock-hauling",
    businessName: "Central Illinois Livestock Hauling",
    categoryId: "livestock-transport",
    badge: "VERIFIED",
    city: "Peoria",
    state: "IL",
    zip: "61605",
    serviceRadius: "Regional — IL, IA, MO, IN, WI",
    phone: "309-555-0527",
    email: "dispatch@cilhauling.com",
    description:
      "Licensed and insured livestock hauling for horses, cattle, hogs, goats, and sheep. Local moves to interstate hauls. Emergency hauling available with advance coordination. Climate-controlled trailer available for horses.",
    speciesServed: ["Horses", "Cattle", "Hogs", "Goats", "Sheep"],
    specialties: ["Emergency hauling", "Interstate transport", "Horse transport"],
    credentials: "DOT licensed, USDA-compliant, fully insured",
    insured: true,
    emergencyAvailable: true,
    emergencyPhone: "309-555-0527",
    featured: true,
    categoryData: {
      trailerType: "Stock trailer, gooseneck, climate-controlled horse trailer",
      maxDistance: "Interstate",
      range: "IL, IA, MO, IN, WI",
    },
  },
  {
    id: "12",
    slug: "prairie-transport-services",
    businessName: "Prairie Transport Services",
    categoryId: "livestock-transport",
    badge: "CLAIMED",
    city: "Bloomington",
    state: "IL",
    zip: "61701",
    serviceRadius: "100 miles",
    phone: "309-555-0648",
    description:
      "Local and regional livestock hauling serving Central Illinois. Horses, cattle, and small ruminants. Call ahead for scheduling. Not available for emergency same-day hauls.",
    speciesServed: ["Horses", "Cattle", "Goats"],
    specialties: ["Local moves", "Sale barn transport", "Vet appointment hauls"],
    insured: true,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      trailerType: "Stock trailer, gooseneck",
      maxDistance: "100 miles",
      range: "Central IL",
    },
  },

  // ── FEED SUPPLIERS ────────────────────────────────────────────────────────
  {
    id: "13",
    slug: "prairie-feed-farm-supply",
    businessName: "Prairie Feed & Farm Supply",
    categoryId: "feed-suppliers",
    badge: "VERIFIED",
    city: "Morton",
    state: "IL",
    zip: "61550",
    serviceRadius: "30-mile delivery area",
    phone: "309-555-0713",
    website: "https://prairiefeedsupply.com",
    description:
      "Full-service farm supply store and feed dealer. Carrying major brands including Purina, Nutrena, and Triple Crown alongside locally sourced hay and straw. Delivery available within 30 miles. Open Monday–Saturday.",
    speciesServed: ["Horses", "Cattle", "Goats", "Sheep", "Poultry", "Swine"],
    specialties: ["Equine feed", "Hay & straw", "Bedding", "Supplements"],
    insured: true,
    emergencyAvailable: false,
    featured: true,
    categoryData: {
      products: "Grain, hay, straw, bedding, supplements, minerals",
      deliveryAvailable: true,
      pickupAvailable: true,
      seasonalNote: "First-cutting hay available May–June; call for current inventory",
    },
  },
  {
    id: "14",
    slug: "central-il-hay-co",
    businessName: "Central Illinois Hay Co.",
    categoryId: "feed-suppliers",
    badge: "CLAIMED",
    city: "Chillicothe",
    state: "IL",
    zip: "61523",
    serviceRadius: "50 miles",
    phone: "309-555-0832",
    description:
      "Local hay producer selling direct to horse owners and farms. First and second cutting available. Square and round bales. Call for current inventory and pricing. Delivery available for larger orders.",
    speciesServed: ["Horses", "Cattle", "Goats", "Sheep"],
    specialties: ["First-cut hay", "Second-cut hay", "Square bales", "Round bales"],
    insured: false,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      products: "Hay (grass, mixed, alfalfa mix), straw",
      deliveryAvailable: true,
      pickupAvailable: true,
      seasonalNote: "Call for current inventory — seasonal supply",
    },
  },
  {
    id: "15",
    slug: "heartland-farm-store",
    businessName: "Heartland Farm Store",
    categoryId: "feed-suppliers",
    badge: "LISTED",
    city: "Washington",
    state: "IL",
    zip: "61571",
    serviceRadius: "In-store + local delivery",
    phone: "309-555-0957",
    description:
      "Independent farm supply store serving Tazewell County. Grain, feed, supplements, bedding, and basic fencing supplies. Friendly local staff with real farm knowledge.",
    speciesServed: ["Horses", "Cattle", "Poultry", "Goats"],
    specialties: ["Grain & feed", "Bedding", "Fencing supplies"],
    insured: true,
    emergencyAvailable: false,
    featured: false,
    categoryData: {
      products: "Grain, mixed feed, bedding, fencing, supplement",
      deliveryAvailable: false,
      pickupAvailable: true,
    },
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

export function getCategoryById(id: string): DirectoryCategory | undefined {
  return DIRECTORY_CATEGORIES.find((c) => c.id === id);
}

export function getProvidersByCategory(categoryId: string): DirectoryProvider[] {
  return MOCK_PROVIDERS.filter((p) => p.categoryId === categoryId);
}

export function getProviderBySlug(slug: string): DirectoryProvider | undefined {
  return MOCK_PROVIDERS.find((p) => p.slug === slug);
}

export function getFeaturedProviders(): DirectoryProvider[] {
  return MOCK_PROVIDERS.filter((p) => p.featured);
}

export function getProviderCount(categoryId: string): number {
  return MOCK_PROVIDERS.filter((p) => p.categoryId === categoryId).length;
}

export const BADGE_CONFIG: Record<DirectoryBadge, { label: string; color: string; desc: string }> = {
  LISTED: {
    label: "Listed",
    color: "bg-wheat-light text-earth border-wheat",
    desc: "Basic information sourced or submitted. Not yet confirmed by provider.",
  },
  CLAIMED: {
    label: "Claimed",
    color: "bg-sage/20 text-barn border-sage/40",
    desc: "Provider has confirmed and updated their profile information.",
  },
  VERIFIED: {
    label: "Verified",
    color: "bg-rust/10 text-rust border-rust/30",
    desc: "Provider has submitted additional documentation reviewed by The Farm Sitter.",
  },
};

export const STATES_INITIAL = ["IL", "IA", "MO", "IN", "WI"];
