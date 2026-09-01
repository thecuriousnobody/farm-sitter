# CLAUDE.md — Farm Sitter Project Context

## What This Project Is

The Farm Sitter is a national platform for training, credentialing, referring, and optionally brand-licensing independent farm-sitting operators. It started as a validated local farm-sitting business and is scaling into a national certification, referral, and operator-support platform.

**This is NOT a booking/dispatch marketplace.** It is a certification-first, standards-driven platform where:
- **Primary paying customer** = the farm sitter / operator
- **Downstream demand driver** = the animal owner / farm client

## Core Business Model (3 Operator Pathways)

1. **Education Only** — Pay for training/workshop, access course materials. No referral listing.
2. **Credentialed Independent** — Complete training + practical exam → earn credential → operate under own brand → optional referral listing.
3. **Licensed Brand Affiliate** — Credential + license The Farm Sitter brand → enhanced placement, territory preference, brand-use rights, annual fees.

These are distinct commercial states, not just membership labels. The DB and UI must treat them differently.

## Critical Legal Positioning

- Operators are **independent business owners**, NOT employees
- The platform is **NOT a franchisor** — avoid franchise-style operational control
- Certification-first, non-employment, non-franchise positioning
- Customer booking happens **directly with the operator**, not through the platform
- Territory "preference" not "exclusivity"
- All UI language, agreements, and policies must reinforce independent operator status

## Credentialing Model — Critical Rules

- **Applicants must bring existing hands-on farm animal experience.** The Academy does NOT teach basic animal care from scratch.
- The Academy makes experienced handlers into better, safer, more accountable business operators.
- No experience = disqualified from enrollment. Pre-screening routes them to experience-building resources (volunteer work, Extension office, 4-H, etc.).
- The credential is earned through a **practical exam** — an in-person, on-farm activity in the **Greater Peoria area** to start.
- As the network grows, practical assessments may be verified by qualified local farm owners attesting to operator competency.
- Track 1 (Animal Care) curriculum = professional protocols and standards for experienced handlers — NOT introductory content.
- "Coursework Only" track = deepening professional knowledge, NOT a beginner stepping stone.
- Language must never imply "we'll teach you about farm animals." Correct framing: "we make experienced handlers better professionals."

## User Roles

| Role | Description |
|------|-------------|
| Public Lead | Browsing, submitting inquiry or interest |
| Operator Prospect | Registered, going through onboarding |
| Trainee | Paid for program, accessing coursework |
| Credentialed Operator | Passed training/practical exam, earned credential |
| Licensed Affiliate | Credentialed + brand license active |
| Animal Owner | Seeking a farm sitter (no account required) |
| Admin | Internal team managing everything |
| Instructor | Workshop/training facilitator |

## Animal Care Tier System & Pricing

Pricing is **internal only — never displayed publicly**. Animal owners contract directly with operators.

| Tier | Animals | Duration | Base Price |
|------|---------|----------|------------|
| Tier 1 | Cats, chickens, ducks, fish, rabbits, caged pets, lizards | ≤20 min | $20/visit |
| Tier 2 | Goats, sheep, llamas, alpacas, turkeys, exotic birds | 30–60 min | $30/visit |
| Tier 3 | Horses, donkeys, mini horses, stalled livestock | 60–90 min | $40/visit |
| Tier 4 | Milking, medication, rehab, specialty | Varies | $50/visit |
| Dogs | Dogs only (standalone) | 30–60 min | $25/visit |
| Plants | Gardens/greenhouses (standalone) | 30–60 min | $30/visit |

**Add-ons:** Dog care ($5–$10/dog), overnight ($50–$60/night), holiday ($10/visit), special instructions ($5), garbage ($5), key exchange ($5), home entry ($1 — T1/T2 only), plants add-on ($30 — T1/T2 only), meet & greet ($10 one-time).

**Tier 3, 4, and Dogs standalone** include key exchange, home entry, holiday, garbage, plants, and mail at no extra charge.

**Operators set their own base prices** in their dashboard (relative to their market). Add-on rules are platform-defined. Calculator is in `src/lib/pricing.ts`.

## Key Business Rules

- Every first-time customer/sitter relationship requires a **meet and greet**
- Customer inquiry must be captured **even when no sitter is available** (expansion signals for expansion)
- No-coverage zones are **strategic expansion data**
- Credentialing is a **trust gate** — not just a label
- Affiliate/brand usage is **optional and separate** from basic training
- Revenue comes from education, credentials, licensing, renewals, subscriptions — NOT from controlling field transactions
- **Background check required before enrollment** — paid by the operator applicant, processed through Sterling
- **Enrollment contingent on passing background check AND existing animal experience**
- **Dashboard access requires active monthly subscription** (post-credential)
- Proof of sitter liability insurance required before listing is activated
- Training values: **Positive Attitude & Grace** (not "hard work and grit")

## Operator Program Tiers & Pricing

| ID | Name | Price | Includes |
|----|------|-------|----------|
| `COURSEWORK_ONLY` | The Farm Sitter Experience | $3,500 | Training materials + 40+ modules, no credential |
| `COURSEWORK_CERTIFICATION` | Coursework + Certification | $4,999 | Full curriculum + in-person practical exam + credential + directory eligibility |
| `COURSEWORK_CERTIFICATION_BUSINESS` | + Business Formation | $8,999 | Everything + LLC formation via LegalZoom/IncFile, filing fees covered by The Farm Sitter Inc. |

- Pay in full (Stripe) or via Affirm installments
- All tuition payments non-refundable

## Operator Onboarding Flow (6 Steps)

All at `/onboarding/`:

1. **`/background-check`** — Sterling link + consent. Locks enrollment until passed.
2. **`/program`** — Select program tier.
3. **`/payment`** — Full pay (Stripe) or monthly installments (Affirm).
4. **`/training`** — 40+ modules across 4 tracks. LMS integration pending.
5. **`/credential`** — Issued after passing in-person practical exam.
6. **`/compliance`** — Upload sitter liability insurance + policy agreement + monthly subscription (Stripe). Dashboard unlocks after this step.

## Referral Priority Logic

1. Licensed affiliates with local coverage → highest priority
2. Credentialed independents within expanded range → second
3. No match → Travel Network escalation (with owner consent) + capture as unmet demand

## Travel Network (No-Coverage Escalation)

- Triggered only after standard inquiry flow finds no local match
- Customer-facing name: "Expanded Travel Network"
- Owner must consent before their request is posted
- Credentialed sitters browse and express interest; admin mediates all introductions
- No direct owner contact info shown to sitters
- Requests expire after 30 days
- Free at launch (Phase 1)
- Admin pipeline at `/admin/travel-network`
- Sitter board at `/dashboard/travel-network`

## Founding Members / VIP Program

- Animal owners who join before a sitter is available in their area
- **Founding Member** (free): first notification when coverage arrives, expansion updates, resource library access, founding recognition
- **VIP** (free at launch, invite-based): everything above + personal call when coverage arrives, priority queue, dedicated care coordinator
- Captures email + ZIP + animal types → `FoundingMemberLead` model in DB
- Source tracked: `"find-a-sitter"` | `"homepage"` | `"founding-members-page"`
- Landing page at `/founding-members`
- API endpoint at `/api/founding-member`
- No-coverage flow in find-a-sitter routes owners to this as the primary CTA

## Rural Services Directory

- Separate from the farm sitter referral network — lists rural service providers (farriers, equine vets, dentists, bodywork/rehab, transport, feed/hay)
- Badge system: `LISTED` (sourced/public data) → `CLAIMED` (provider confirmed) → `VERIFIED` (docs reviewed by TFS)
- Tier system: `FREE` (basic, free at launch) → `PRO` (enhanced, paid) → `PARTNER` (top placement, sponsorship)
- 6 launch categories; 15 future categories planned
- Mock data in `src/lib/directory-data.ts` — swaps cleanly to Prisma
- Routes: `/directory`, `/directory/[category]`, `/directory/[category]/[slug]`, `/directory/claim`
- Admin management at `/admin/directory`

## Tech Stack (Actual)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), Tailwind CSS v4 |
| Backend | Next.js API routes, TypeScript |
| Database | PostgreSQL + Prisma ORM (v7) |
| Auth | next-auth v5 (beta) — credentials provider, JWT sessions |
| Passwords | bcryptjs |
| Payments | Stripe (planned) — enrollment + monthly subscription |
| Financing | Affirm (planned) — monthly payment option at enrollment |
| Storage | Planned — insurance docs, background checks, badge assets, PDFs |
| LMS | TBD — module stubs built, integration point marked |
| Background Check | Sterling (3rd party) — operator pays, must pass before enrollment |
| Script runner | tsx (dev) |

## Current File Structure (Built)

```
src/
  app/
    page.tsx                        # Homepage — trust strip, testimonials, emergency readiness, ZIP checker, founding members CTA
    layout.tsx                      # Root layout + SessionProvider
    login/page.tsx                  # Operator login
    register/page.tsx               # Operator registration
    about/page.tsx
    contact/page.tsx                # HQ: Peoria Next (801 W Main, 61606) + co-located Distillery Labs (201 SW Adams, 61602)
    faq/page.tsx                    # 3 sections, 22 questions: About Farm Sitting / For Animal Owners / For Aspiring Farm Sitters
    become-a-sitter/page.tsx        # Academy page — pre-screening assessment, 4 C's, background check, payment policy
    training/page.tsx               # Full curriculum (40+ modules, 4 tracks), pricing tiers, how it works
    find-a-sitter/page.tsx          # 4-step intake + no-coverage escalation (founding member CTA + travel network)
    founding-members/page.tsx       # Founding Member / VIP signup — tier selector, benefits, email form
    resources/page.tsx              # Free PDF library for animal owners
    directory/
      page.tsx                      # Directory landing — 6 category cards, featured providers, badge explainer
      [category]/page.tsx           # Category listing with filters
      [category]/[slug]/page.tsx    # Provider profile page
      claim/page.tsx                # 3-step claim/add listing form
    dashboard/
      layout.tsx                    # Dashboard layout with sidebar nav
      page.tsx                      # AI chat assistant
      inquiries/page.tsx            # Submitted referral requests (mock data)
      calculator/page.tsx           # Live pricing calculator
      pricing/page.tsx              # Operator sets own base rates
      learning/page.tsx             # Animal care learning hub (15 curated resources)
      profile/page.tsx              # Operator profile edit page
      travel-network/page.tsx       # Travel Network sitter board — filters, request cards, express interest
    onboarding/
      layout.tsx                    # Onboarding shell with step progress bar
      background-check/page.tsx     # Step 1 — Sterling + consent
      program/page.tsx              # Step 2 — Program selection
      payment/page.tsx              # Step 3 — Stripe / Affirm
      training/page.tsx             # Step 4 — Module progress
      credential/page.tsx           # Step 5 — Credential display
      compliance/page.tsx           # Step 6 — Insurance + subscription
    admin/
      layout.tsx                    # Admin sidebar: Overview, Inquiries, Operators, Background Checks, Rural Directory, Coverage Map, Travel Network
      page.tsx                      # Admin overview — metrics, inquiry pipeline, operator pipeline, BG check queue, unmet demand ZIPs
      directory/page.tsx            # Directory admin — listings, claim queue, badge management
      travel-network/page.tsx       # Travel Network admin — request pipeline, interest queue, territory intelligence
    api/
      auth/[...nextauth]/route.ts   # next-auth handlers
      auth/register/route.ts        # Operator registration endpoint
      inquiries/route.ts            # POST — animal owner intake form
      operator/pricing/route.ts     # GET/POST — operator pricing settings
      chat/route.ts                 # AI assistant
      founding-member/route.ts      # POST — founding member / VIP email signup
  components/
    Navbar.tsx                      # Session-aware; links: Home · Find a Sitter · Join the Community · Rural Services · Resources · Become a Farm Sitter · About · FAQ · Contact
    Footer.tsx
    DashboardNav.tsx                # Sidebar: Overview · Inquiries · Calculator · My Pricing · Learning Hub · Travel Network · My Profile
    SessionProvider.tsx             # next-auth SessionProvider wrapper
    PreScreeningAssessment.tsx      # 6-question assessment; 4 outcomes: pass / experience-needed / resource / disqualified
    ZipChecker.tsx                  # ZIP coverage checker component (used on homepage)
  lib/
    pricing.ts                      # Pricing engine — defaults, calculator, types
    prisma.ts                       # Prisma singleton
    directory-data.ts               # Mock directory data — categories, providers, helpers (swap to Prisma when DB is ready)
  types/
    next-auth.d.ts                  # Session type augmentation
  auth.ts                           # next-auth config (credentials + JWT)
middleware.ts                       # Route protection + onboarding step routing
scripts/
  test-pricing.ts                   # Run: npm run pricing
prisma/
  schema.prisma                     # Full schema — see section below
public/
  logo.png                          # Company logo
  resources/                        # Drop PDFs here for resource library
```

## Prisma Schema — Key Models

- `User` — all users, roles array, passwordHash, Auth.js relations, travelInterests relation
- `OperatorProfile` — onboardingStatus, programSelected, credentialLevel, insuranceVerified, subscriptionActive, listingApproved/Active
- `CustomerProfile` — animal owner data, marketing consent
- `CareRequest` — animal owner inquiry, status, matched operator; travel network fields: `travelNetworkConsent`, `travelNetworkPostedAt`, `travelNetworkExpiresAt`, `travelNetworkStatus`
- `TravelNetworkInterest` — sitter expresses interest in a no-coverage request; `TravelInterestStatus` enum (PENDING/INTRODUCED/DECLINED); unique on `[careRequestId, operatorId]`
- `FoundingMemberLead` — animal owner early-access list; `FoundingMemberTier` enum (FOUNDING/VIP); tracks source, linked careRequestId, notifiedAt, convertedAt
- `OperatorPricing` — per-operator base price overrides (cents)
- `Document` — resource library (PUBLIC/ANIMAL_OWNER/OPERATOR/etc audience)
- `DirectoryCategory`, `DirectoryProvider`, `DirectoryClaimRequest` — Rural Services Directory
- `Course`, `Enrollment`, `CredentialRecord`, `AffiliateRecord`, `ComplianceRecord`
- Auth.js models: `Account`, `Session`, `VerificationToken`

Key enums: `OnboardingStatus`, `ProgramType`, `InquiryStatus` (NO_COVERAGE, DUPLICATE), `DocumentAudience`, `DirectoryBadge` (LISTED/CLAIMED/VERIFIED), `DirectoryTier` (FREE/PRO/PARTNER), `TravelInterestStatus`, `FoundingMemberTier`

## Pre-Screening Assessment Logic

4 result outcomes:
1. **`pass`** — Strong or meaningful experience + no logistics barriers + background check consent + no cruelty history → show program cards
2. **`experience-needed`** — Little/no farm animal experience → respectful decline with 5 experience-building resources (equine volunteer, hobby farm help, Extension office, 4-H, come back when ready)
3. **`resource`** — Has experience but transportation or scheduling barriers → 5 resources to address barriers
4. **`disqualified`** — Refused background check OR animal cruelty history → firm decline, contact us link

## Running the Project

```bash
# Dev server (port 3000)
npm run dev

# Test pricing calculator (no DB needed)
npm run pricing

# Database setup (requires DATABASE_URL in .env.local)
npx prisma migrate dev
npx prisma studio
```

## Environment Variables (.env.local)

```
AUTH_SECRET=<generated>             # Required — already set
DATABASE_URL=                       # PostgreSQL connection string — NOT YET SET
STRIPE_SECRET_KEY=                  # Enrollment + subscription payments
STRIPE_WEBHOOK_SECRET=              # Stripe webhook verification
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Client-side Stripe
EMAIL_FROM=                         # Transactional email sender
EMAIL_API_KEY=                      # Resend / Postmark / SendGrid
STERLING_API_KEY=                   # Background check integration (future)
```

## Find a Sitter — No-Coverage Flow

After form submission, ZIP is checked against COVERED_ZIPS:
1. **Match found** → success screen + founding member upsell for future trips
2. **No coverage** → hero: "Your area is on our map" (forward-looking, not apologetic)
   - Primary CTA: Join Founding Members (free, first notification when coverage arrives)
   - Secondary CTA: Submit to Expanded Travel Network (consent required, 30-day expiry)
3. **Travel network submitted** → confirmation with "what happens next" timeline + founding member CTA

## What Is NOT Built Yet (Next Priorities)

- [ ] Database setup (DATABASE_URL + prisma migrate dev + prisma generate)
- [ ] GitHub repo + Vercel deployment + Neon PostgreSQL (go-live)
- [ ] Stripe integration (enrollment payment + monthly subscription)
- [ ] Affirm integration (installment payments at enrollment)
- [ ] Sterling webhook (auto-update background check status)
- [ ] Email automation (confirmation, onboarding reminders, renewal, founding member notifications)
- [ ] Email platform integration for FoundingMemberLead (Resend/Mailchimp/Klaviyo)
- [ ] Real inquiry data wired to dashboard (currently mock)
- [ ] Insurance file upload to secure storage
- [ ] LMS integration (training module content + practical exam scheduling)
- [ ] `/api/onboarding/status` PATCH route (update onboarding step)
- [ ] Session refresh after onboarding step changes
- [ ] Geographic matching for referral routing
- [ ] Public operator directory
- [ ] Admin operator management, background check, and coverage map sub-pages (stubs in nav)
- [ ] Stripe subscription for directory PRO/PARTNER tiers
- [ ] Community forum (explicitly deferred)

## Pricing Rules (Do Not Display Publicly)

See `src/lib/pricing.ts` for full engine. Test with `npm run pricing`.
Operators set their own base prices in `/dashboard/pricing`.
Add-on rules are platform-defined and shown as reference only.

## Company Locations

- **Headquarters:** Peoria Next Innovation Center, 801 W Main St, Peoria, IL 61606 — peorianext.com
- **Co-located at:** Distillery Labs, 201 SW Adams Street, Peoria, IL 61602 — distillerylabs.org

## Contact

Chris Youngmark — President
www.TheFarmSitter.com
