import { streamText, tool, stepCountIs, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod/v4";

// ---------------------------------------------------------------------------
// In-memory mock data (will be replaced by Prisma DB)
// ---------------------------------------------------------------------------

const mockOperators = [
  {
    id: "op-1",
    name: "Sarah Mitchell",
    state: "IL",
    city: "Peoria",
    zip: "61602",
    credential: "credentialed",
    animals: ["horses", "goats", "chickens", "dogs", "cats"],
    radius_miles: 30,
    accepting_clients: true,
    years_experience: 8,
    bio: "Lifelong equestrian and hobby farmer. 8 years experience caring for horses, goats, and poultry across central Illinois.",
  },
  {
    id: "op-2",
    name: "Tom Brennan",
    state: "IL",
    city: "Morton",
    zip: "61550",
    credential: "affiliate",
    animals: ["horses", "cattle", "goats", "sheep", "chickens", "dogs"],
    radius_miles: 40,
    accepting_clients: true,
    years_experience: 15,
    bio: "Third-generation farmer and Licensed Affiliate. Specializes in cattle, equine, and mixed livestock operations.",
  },
  {
    id: "op-3",
    name: "Lisa Chen",
    state: "IL",
    city: "Bloomington",
    zip: "61701",
    credential: "credentialed",
    animals: ["horses", "goats", "llamas", "alpacas", "chickens"],
    radius_miles: 25,
    accepting_clients: false,
    years_experience: 4,
    bio: "Specializes in small ruminants and fiber animals. Not currently accepting new clients.",
  },
  {
    id: "op-4",
    name: "Mike Davis",
    state: "IN",
    city: "Indianapolis",
    zip: "46201",
    credential: "credentialed",
    animals: ["horses", "dogs", "cats", "chickens"],
    radius_miles: 35,
    accepting_clients: true,
    years_experience: 6,
    bio: "Equine-focused sitter serving the greater Indianapolis area.",
  },
];

const mockInquiries = [
  {
    id: "inq-1",
    customer_name: "Janet Walker",
    city: "East Peoria",
    state: "IL",
    zip: "61611",
    animals: ["horses (3)", "chickens (12)", "dogs (2)"],
    dates: "Mar 20 – Mar 28, 2026",
    status: "new",
    notes: "3 horses need twice-daily turnout/feeding. 12 chickens, egg collection. 2 farm dogs.",
    overnight: false,
  },
  {
    id: "inq-2",
    customer_name: "Robert Kim",
    city: "Normal",
    state: "IL",
    zip: "61761",
    animals: ["goats (8)", "chickens (20)", "cats (3)"],
    dates: "Apr 5 – Apr 12, 2026",
    status: "new",
    notes: "Small hobby farm. Goats need AM/PM feeding and pen checks. Chickens free-range during day.",
    overnight: false,
  },
  {
    id: "inq-3",
    customer_name: "Diana Patel",
    city: "Champaign",
    state: "IL",
    zip: "61820",
    animals: ["horses (2)", "llamas (4)"],
    dates: "Apr 15 – Apr 22, 2026",
    status: "matched",
    matched_operator: "Lisa Chen",
    notes: "2 horses stalled, need turnout. 4 llamas, pasture-kept.",
    overnight: false,
  },
];

const mockWorkshops = [
  {
    id: "ws-1",
    title: "Farm Sitter Training Academy — Spring 2026",
    date: "May 16-18, 2026",
    location: "Peoria, IL",
    spots_remaining: 8,
    total_spots: 15,
    status: "open",
  },
  {
    id: "ws-2",
    title: "Farm Sitter Training Academy — Summer 2026",
    date: "Aug 8-10, 2026",
    location: "Indianapolis, IN",
    spots_remaining: 15,
    total_spots: 15,
    status: "upcoming",
  },
];

const mockCurriculum = [
  // Track 1 — Animal Care
  { track: 1, trackName: "Animal Care", module: "1.1", title: "Introduction to Hobby Farm Animals", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.2", title: "Horse Care Fundamentals", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.3", title: "Goat & Pig Care Essentials", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.4", title: "Poultry: Chickens, Ducks & More", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.5", title: "Feeding Schedules & Nutrition", type: "EBOOK" },
  { track: 1, trackName: "Animal Care", module: "1.6", title: "Animal Health & Emergency Response", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.7", title: "Farm Chores: Fencing & Maintenance", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.8", title: "Seasonal Care: Heat, Cold & Weather", type: "EBOOK" },
  { track: 1, trackName: "Animal Care", module: "1.9", title: "Safe Handling & Animal Psychology", type: "VIDEO" },
  { track: 1, trackName: "Animal Care", module: "1.10", title: "Record Keeping for Animal Care", type: "EBOOK" },
  // Track 2 — Business Foundations
  { track: 2, trackName: "Business Foundations", module: "2.1", title: "Company Formation & Legal Structures", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.2", title: "Basic Accounting for Small Business", type: "EBOOK" },
  { track: 2, trackName: "Business Foundations", module: "2.3", title: "Pricing Strategies That Win Business", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.4", title: "Contracts, Liability & Insurance", type: "EBOOK" },
  { track: 2, trackName: "Business Foundations", module: "2.5", title: "Marketing Your Farm Sitting Business", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.6", title: "Social Media for Rural Entrepreneurs", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.7", title: "Customer Service & Client Relationships", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.8", title: "Conflict Resolution & Hard Conversations", type: "VIDEO" },
  { track: 2, trackName: "Business Foundations", module: "2.9", title: "Scaling: Hiring & Growing Your Team", type: "EBOOK" },
  { track: 2, trackName: "Business Foundations", module: "2.10", title: "Cashflow, Taxes & Financial Planning", type: "VIDEO" },
  // Track 3 — Leadership & Character
  { track: 3, trackName: "Leadership & Character", module: "3.1", title: "What It Means to Lead", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.2", title: "Building a Reputation Worth Keeping", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.3", title: "Grit, Resilience & Showing Up Every Day", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.4", title: "Values-Based Leadership in Business", type: "EBOOK" },
  { track: 3, trackName: "Leadership & Character", module: "3.5", title: "Servant Leadership in Your Community", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.6", title: "Decision Making Under Pressure", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.7", title: "Mentorship: Paying It Forward", type: "VIDEO" },
  { track: 3, trackName: "Leadership & Character", module: "3.8", title: "Building Your Legacy", type: "REFLECTION" },
  // Track 4 — Final Certification
  { track: 4, trackName: "Final Certification", module: "4.1", title: "Certification Exam Prep Guide", type: "EBOOK" },
  { track: 4, trackName: "Final Certification", module: "4.2", title: "Practice Exam: Animal Care", type: "QUIZ" },
  { track: 4, trackName: "Final Certification", module: "4.3", title: "Practice Exam: Business Fundamentals", type: "QUIZ" },
  { track: 4, trackName: "Final Certification", module: "4.4", title: "Practice Exam: Leadership & Ethics", type: "QUIZ" },
  { track: 4, trackName: "Final Certification", module: null, title: "Final Certification Exam", type: "EXAM" },
  { track: 4, trackName: "Final Certification", module: "4.5", title: "Certificate Issuance & Directory Listing", type: "STEP" },
  { track: 4, trackName: "Final Certification", module: "4.6", title: "Business Launch Day — Go Time", type: "VIDEO" },
];

const mockResources = [
  { name: "Client Welcome Packet", category: "Marketing", format: "PDF", details: "8 pages" },
  { name: "Farm Sitting Service Agreement & Contract", category: "Legal", format: "DOCX", details: "4 pages" },
  { name: "Pricing Calculator", category: "Finance", format: "XLSX", details: "Interactive" },
  { name: "Social Media Starter Kit", category: "Marketing", format: "PDF + Canva Link", details: null },
  { name: "Emergency Animal Health Response Checklist", category: "Animal Care", format: "PDF", details: "2 pages" },
  { name: "Daily Farm Sitter Visit Log & Client Report Form", category: "Operations", format: "PDF", details: "Fillable" },
  { name: "How to Form Your LLC — Step-by-Step by State", category: "Business", format: "PDF", details: "12 pages" },
  { name: "Referral Program Cards", category: "Marketing", format: "PDF", details: "Print-ready" },
  { name: "Quarterly Tax Prep for the Self-Employed Farm Sitter", category: "Finance", format: "PDF", details: "8 pages" },
  { name: "Google Business Profile Setup", category: "Marketing", format: "PDF", details: "Illustrated" },
  { name: "Conflict Resolution Scripts for Difficult Client Situations", category: "Leadership", format: "PDF", details: "6 pages" },
  { name: "New Client Intake Form", category: "Operations", format: "PDF", details: "Fillable" },
];

const mockPricing = {
  certification: {
    price: 4000,
    description: "One-time investment, Lifetime certification",
    includes: [
      "Full access to all 34 training modules across 4 tracks",
      "Downloadable resource library (templates, contracts, checklists)",
      "Practice exams and final certification exam",
      "Official Farm Sitter credential upon passing",
      "Listing in the national Farm Sitter directory",
      "Digital badge and certificate for marketing use",
      "Access to the Farm Sitter community and peer network",
      "One full year of membership included",
    ],
  },
  membership: {
    monthly: 50,
    annual: 500,
    includes: [
      "Continued directory listing and referral eligibility",
      "Access to updated training materials and new modules",
      "Resource library updates (new templates, guides, tools)",
      "Community access, mentorship opportunities, and ongoing support",
    ],
  },
};

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are the Farm Sitter Assistant — an AI-powered management system for The Farm Sitter platform.

The Farm Sitter is a national platform for training, credentialing, and referring independent farm-sitting operators. You help manage the platform's day-to-day operations.

You have tools to:
- Search and list operators (credentialed farm sitters)
- View and manage customer inquiries
- Match inquiries to qualified operators
- View workshop/training schedules
- Look up credential status
- Get platform statistics
- Browse the full Farm Sitter Academy curriculum (34 modules across 4 tracks)
- View the member resource library (templates, contracts, checklists, guides)
- Provide pricing information for certification and membership

When answering:
- Be warm, professional, and concise — Midwestern friendly
- When showing lists, format them clearly
- When matching, explain your reasoning (animal experience, location, availability)
- If a tool returns data, summarize it naturally — don't just dump JSON
- You can suggest actions: "Would you like me to match this inquiry to Sarah Mitchell?"

You are speaking with a platform admin. They can see everything.`;

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  const { messages: uiMessages } = await req.json();
  const messages = await convertToModelMessages(uiMessages);

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: SYSTEM_PROMPT,
    messages,
    tools: {
      search_operators: tool({
        description:
          "Search for farm sitter operators by state, city, credential level, animal experience, or availability.",
        inputSchema: z.object({
          state: z.string().describe("2-letter state code, e.g. IL, or 'any' for all states"),
          credential: z
            .enum(["credentialed", "affiliate", "any"])
            .describe("Filter by credential level, or 'any'"),
          animal_type: z
            .string()
            .describe("e.g. horses, goats, cattle, or 'any' for all"),
        }),
        execute: async ({ state, credential, animal_type }) => {
          let results = [...mockOperators];
          if (state && state !== "any")
            results = results.filter((o) => o.state === state.toUpperCase());
          if (credential && credential !== "any")
            results = results.filter((o) => o.credential === credential);
          if (animal_type && animal_type !== "any")
            results = results.filter((o) =>
              o.animals.some((a) =>
                a.toLowerCase().includes(animal_type.toLowerCase()),
              ),
            );
          return { count: results.length, operators: results };
        },
      }),

      list_inquiries: tool({
        description:
          "List customer care inquiries, optionally filtered by status (new, matched, closed).",
        inputSchema: z.object({
          status: z
            .enum(["new", "matched", "closed", "all"])
            .describe("Filter by status, or 'all' for everything"),
        }),
        execute: async ({ status }) => {
          const results =
            status === "all"
              ? mockInquiries
              : mockInquiries.filter((i) => i.status === status);
          return { count: results.length, inquiries: results };
        },
      }),

      get_inquiry: tool({
        description: "Get details of a specific customer inquiry by ID.",
        inputSchema: z.object({
          inquiry_id: z.string().describe("The inquiry ID"),
        }),
        execute: async ({ inquiry_id }) => {
          const inquiry = mockInquiries.find((i) => i.id === inquiry_id);
          return inquiry || { error: "Inquiry not found" };
        },
      }),

      match_inquiry: tool({
        description:
          "Match a customer inquiry to an operator. Finds the best-fit operator based on location, animal experience, and availability.",
        inputSchema: z.object({
          inquiry_id: z.string().describe("The inquiry ID to match"),
          operator_id: z.string().describe("Specific operator ID to match, or 'auto' for best-fit recommendation"),
        }),
        execute: async ({ inquiry_id, operator_id }) => {
          const inquiry = mockInquiries.find((i) => i.id === inquiry_id);
          if (!inquiry) return { error: "Inquiry not found" };

          if (operator_id && operator_id !== "auto") {
            const op = mockOperators.find((o) => o.id === operator_id);
            if (!op) return { error: "Operator not found" };
            return {
              matched: true,
              inquiry: inquiry.id,
              customer: inquiry.customer_name,
              operator: op.name,
              message: `Matched ${inquiry.customer_name} with ${op.name}. Next step: facilitate introduction and schedule meet-and-greet.`,
            };
          }

          const available = mockOperators.filter(
            (o) => o.accepting_clients && o.state === inquiry.state,
          );
          if (available.length === 0) {
            return {
              matched: false,
              message: `No available operators in ${inquiry.state}. Consider posting to the bulletin board.`,
              suggestion: "Post to bulletin board or expand search radius.",
            };
          }

          const best = available[0];
          return {
            matched: true,
            inquiry: inquiry.id,
            customer: inquiry.customer_name,
            recommended_operator: best.name,
            reason: `${best.name} is a ${best.credential} operator in ${best.city}, ${best.state} with ${best.years_experience} years experience. Service radius: ${best.radius_miles} miles.`,
            message: `Recommended match: ${best.name}. Shall I confirm this match?`,
          };
        },
      }),

      list_workshops: tool({
        description: "List upcoming Training Academy workshops.",
        inputSchema: z.object({
          filter: z.string().optional().describe("Optional filter, e.g. 'open' or 'all'"),
        }),
        execute: async () => {
          return { count: mockWorkshops.length, workshops: mockWorkshops };
        },
      }),

      check_credential: tool({
        description: "Check the credential status of an operator by name or ID.",
        inputSchema: z.object({
          query: z.string().describe("Operator ID or name to look up"),
        }),
        execute: async ({ query }) => {
          const op = mockOperators.find(
            (o) =>
              o.id === query ||
              o.name.toLowerCase().includes(query.toLowerCase()),
          );
          if (!op) return { error: "Operator not found" };
          return {
            name: op.name,
            credential: op.credential,
            status: "active",
            accepting_clients: op.accepting_clients,
            animals: op.animals,
            location: `${op.city}, ${op.state}`,
          };
        },
      }),

      platform_stats: tool({
        description: "Get overall platform statistics — operator count, inquiry count, workshop status.",
        inputSchema: z.object({
          detail: z.string().optional().describe("Optional detail level"),
        }),
        execute: async () => {
          return {
            total_operators: mockOperators.length,
            credentialed: mockOperators.filter((o) => o.credential === "credentialed").length,
            affiliates: mockOperators.filter((o) => o.credential === "affiliate").length,
            accepting_clients: mockOperators.filter((o) => o.accepting_clients).length,
            total_inquiries: mockInquiries.length,
            new_inquiries: mockInquiries.filter((i) => i.status === "new").length,
            matched_inquiries: mockInquiries.filter((i) => i.status === "matched").length,
            upcoming_workshops: mockWorkshops.length,
            states_covered: [...new Set(mockOperators.map((o) => o.state))],
          };
        },
      }),

      list_curriculum: tool({
        description:
          "Lists all Farm Sitter Academy training modules, optionally filtered by track number (1 = Animal Care, 2 = Business Foundations, 3 = Leadership & Character, 4 = Final Certification).",
        inputSchema: z.object({
          track: z
            .number()
            .optional()
            .describe("Track number 1-4 to filter by, or omit for all tracks"),
        }),
        execute: async ({ track }) => {
          const results = track
            ? mockCurriculum.filter((m) => m.track === track)
            : mockCurriculum;
          return {
            count: results.length,
            total_modules: mockCurriculum.length,
            modules: results,
          };
        },
      }),

      list_resources: tool({
        description:
          "Lists all member resources in the Farm Sitter resource library, optionally filtered by category (Marketing, Legal, Finance, Animal Care, Operations, Business, Leadership).",
        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe("Resource category to filter by, or omit for all resources"),
        }),
        execute: async ({ category }) => {
          const results = category
            ? mockResources.filter(
                (r) => r.category.toLowerCase() === category.toLowerCase(),
              )
            : mockResources;
          return { count: results.length, resources: results };
        },
      }),

      get_pricing: tool({
        description:
          "Returns pricing information for Farm Sitter Academy certification and ongoing membership.",
        inputSchema: z.object({}),
        execute: async () => {
          return mockPricing;
        },
      }),
    },
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse();
}
