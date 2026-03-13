# CLAUDE.md — Farm Sitter Project Context

## What This Project Is

The Farm Sitter is a national platform for training, credentialing, referring, and optionally brand-licensing independent farm-sitting operators. It started as a validated local farm-sitting business and is scaling into a national certification, referral, and operator-support platform.

**This is NOT a booking/dispatch marketplace.** It is a certification-first, standards-driven platform where:
- **Primary paying customer** = the farm sitter / operator
- **Downstream demand driver** = the animal owner / farm client

## Core Business Model (3 Operator Pathways)

1. **Education Only** — Pay for training/workshop, access course materials. No referral listing.
2. **Credentialed Independent** — Complete training + testing → earn credential → operate under own brand → optional referral listing.
3. **Licensed Brand Affiliate** — Credential + license The Farm Sitter brand → enhanced placement, territory preference, brand-use rights, annual fees.

These are distinct commercial states, not just membership labels. The DB and UI must treat them differently.

## Critical Legal Positioning

- Operators are **independent business owners**, NOT employees
- The platform is **NOT a franchisor** — avoid franchise-style operational control
- Certification-first, non-employment, non-franchise positioning
- Customer booking happens **directly with the operator**, not through the platform
- Territory "preference" not "exclusivity"

## User Roles

| Role | Description |
|------|-------------|
| Public Lead | Browsing, submitting inquiry or interest |
| Operator Prospect | Completed intake, applying for training |
| Trainee | Paid for workshop, accessing LMS/resources |
| Credentialed Operator | Passed training/testing, earned credential |
| Licensed Affiliate | Credentialed + brand license active |
| Animal Owner | Seeking a farm sitter |
| Admin | Internal team managing everything |
| Instructor | Workshop/training facilitator |

## Animal Care Tier System (from direct-service history)

- **Tier 1**: Cats, chickens, ducks, fish, rabbits, caged pets, lizards — 1-2 visits/day
- **Tier 2**: Goats, sheep, llamas, alpacas, turkeys, exotic birds — 2 visits/day, group care
- **Tier 3**: Horses, donkeys, mini horses, stalled animals — 60-90 min, 2+ visits/day
- **Tier 4**: Milking, medication, rehab, time-sensitive/specialized care — custom pricing

## Tech Stack (Target)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), Tailwind CSS |
| Backend | Next.js API routes / Node + TypeScript |
| Database | PostgreSQL |
| Auth | Email/password + role-based access control |
| Payments | Stripe (workshops, credentials, renewals, affiliate fees) |
| Storage | Secure file storage (insurance docs, background checks, badge assets, PDFs) |
| LMS | TBD — embedded or integrated learning system |
| Maps | Geocoding for territory/coverage/search |

## Key Business Rules

- Every first-time customer/sitter relationship requires a **meet and greet**
- Customer inquiry must be captured **even when no sitter is available** (expansion signals)
- No-coverage zones are **strategic expansion data**
- Credentialing is a **trust gate** — not just a label
- Affiliate/brand usage is **optional and separate** from basic training
- Revenue comes from education, credentials, licensing, renewals — NOT from controlling field transactions
- Background check + insurance timing should be **configurable by program tier**

## Referral Priority Logic

1. Licensed affiliates with local coverage → highest priority
2. Credentialed independents within expanded range → second
3. No match → post to bulletin board / capture as unmet demand

## Project Structure

```
farm-sitter/
  apps/
    web/                    # Next.js — marketing site + authenticated portal
    admin/                  # Admin dashboard (may be same app with role gates)
  packages/
    ui/                     # Shared UI components
    types/                  # Shared TypeScript types
    config/                 # Shared config
  services/                 # Domain logic modules
    auth/
    users/
    operators/
    customers/
    inquiries/
    training/
    credentials/
    affiliates/
    billing/
    notifications/
  docs/
    product/
    business-rules/
    api/
    roadmap/
    legal/
  content/
    guides/
    landing-pages/
    emails/
  prisma/                   # Database schema
  scripts/
```

## MVP Scope (Phase 1)

Build the certification and referral core:
- Marketing website + lead capture
- Operator application flow + workshop registration
- Basic LMS / resource access
- Credential status tracking
- Operator profile management
- Customer inquiry form
- Admin-managed referral matching
- Directory records + compliance tracking
- Payment collection (Stripe)

**Do NOT build yet:** automated dispatch, mobile app, dynamic pricing engine, public live booking, franchise territory enforcement.

## Running the Project

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Database
npx prisma migrate dev
npx prisma studio
```

## Environment Variables

See `.env.example` for the full list.

## Contact

Chris Youngmark — President
www.TheFarmSitter.com
